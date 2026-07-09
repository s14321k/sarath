// Shared AI settings module.
//
// Consolidates the AI-settings modal/API logic that used to be duplicated
// in main.js (code runner) and chat.js (chat AI tab), and brings both in
// line with the multi-key backend shape from index.js:
//
//   ai_config_get        -> { ok, activeKeyId, keys: [{ id, label, provider,
//                              model, baseUrl, keyLast4, updatedAt, createdAt }] }
//   ai_config_save        -> body: { keyId?, label?, provider, model, baseUrl,
//                              apiKey?, setActive? }
//                              - omit keyId + include apiKey -> create a new key
//                              - pass keyId -> update that key in place
//                                (apiKey optional; blank keeps the stored one)
//   ai_config_set_active  -> body: { keyId } - switch active key only
//   ai_config_delete      -> body: { keyId } - delete one key by id
//
// This is a page-level singleton: only one modal/one piece of state exists
// per page, shared by every caller (chat widget, code runner, markdown
// editor, etc). Each caller calls AiSettings.init(...) once with its own
// callApi()/getUser()/getSessionToken() wiring (safe to call init() more
// than once - later callers just patch in any options they pass), then
// uses AiSettings.open(), AiSettings.getActiveKey(), AiSettings.hasUsableKey(),
// and AiSettings.onChange(fn) to react to config changes.
(function (global) {
    'use strict';

    if (global.AiSettings) return; // already installed by an earlier <script>

    const state = {
        // --- wiring supplied by callers via init() ---
        callApi: null,                 // async (payload) => data   (must throw on !ok)
        getUser: () => '',
        getSessionToken: () => '',
        requiresSessionUpgrade: () => false,
        redirectToReLogin: () => {},

        // --- config state ---
        keys: [],
        activeKeyId: '',
        loadedForUser: null,           // null = never loaded; '' = loaded logged-out
        loading: false,

        // --- modal state ---
        modal: null,
        els: {},
        editingKeyId: '',              // '' => the form represents a brand-new key
        listeners: new Set()
    };

    function notify() {
        const snapshot = { keys: state.keys.slice(), activeKeyId: state.activeKeyId };
        state.listeners.forEach((fn) => {
            try { fn(snapshot); } catch (e) { console.error('AiSettings listener error:', e); }
        });
    }

    function escapeHtml(value) {
        return String(value ?? '').replace(/[&<>"']/g, (ch) => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
        }[ch]));
    }

    const PROVIDER_DEFAULTS = {
        openai: ['https://api.openai.com/v1', 'gpt-5.5'],
        anthropic: ['https://api.anthropic.com/v1', 'claude-3-5-sonnet-latest'],
        gemini: ['https://generativelanguage.googleapis.com/v1beta', 'gemini-2.5-flash'],
        openrouter: ['https://openrouter.ai/api/v1', 'openai/gpt-4.1-mini'],
        groq: ['https://api.groq.com/openai/v1', 'llama-3.1-8b-instant'],
        together: ['https://api.together.xyz/v1', 'meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo']
    };

    const PROVIDER_HELP = {
        openai: ['OpenAI', 'Use an OpenAI API key from platform.openai.com. Recommended model: gpt-5.5.'],
        anthropic: ['Anthropic', 'Use an Anthropic Console API key. Recommended model: claude-3-5-sonnet-latest.'],
        gemini: ['Gemini', 'Create a Gemini API key in Google AI Studio. Recommended model: gemini-2.5-flash.'],
        openrouter: ['OpenRouter', 'Use an OpenRouter API key and a model id such as openai/gpt-4.1-mini.'],
        groq: ['Groq', 'Use a Groq API key and a Groq-supported model id. Recommended default: llama-3.1-8b-instant.'],
        together: ['Together', 'Use a Together API key and model id. Recommended default: meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo.']
    };

    function getKeyById(keyId) {
        return state.keys.find((k) => k.id === keyId) || null;
    }

    function getActiveKey() {
        return getKeyById(state.activeKeyId) || state.keys[0] || null;
    }

    function hasUsableKey() {
        const active = getActiveKey();
        // The frontend never receives the real key. Newer responses expose
        // keyLast4; older ones expose hasApiKey. Treat a loaded active key
        // with a model as usable unless the backend explicitly says no key.
        return Boolean(active && active.model && active.hasApiKey !== false);
    }

    function normalizeConfigResponse(data) {
        let keys = Array.isArray(data?.keys) ? data.keys.slice() : [];
        let activeKeyId = data?.activeKeyId || '';

        if (!keys.length && (data?.hasApiKey || data?.model || data?.provider || data?.baseUrl)) {
            keys = [{
                id: data?.keyId || 'legacy-active-key',
                legacy: !data?.keyId,
                label: data?.label || '',
                provider: data?.provider || 'openai',
                model: data?.model || '',
                baseUrl: data?.baseUrl || '',
                keyLast4: data?.keyLast4 || '',
                hasApiKey: Boolean(data?.hasApiKey),
                updatedAt: data?.updatedAt || ''
            }];
            activeKeyId = keys[0].id;
        }

        keys = keys.map((key) => ({
            ...key,
            id: key.id || key.keyId || 'saved-key',
            hasApiKey: key.hasApiKey !== undefined ? Boolean(key.hasApiKey) : true
        }));

        if (!activeKeyId || !keys.some((key) => key.id === activeKeyId)) {
            activeKeyId = keys[0]?.id || '';
        }

        return { keys, activeKeyId };
    }

    // ---------------------------------------------------------------
    // Config load / save / delete / switch
    // ---------------------------------------------------------------

    async function loadConfig(forceReload) {
        const user = state.getUser();
        const token = state.getSessionToken();

        if (state.requiresSessionUpgrade && state.requiresSessionUpgrade()) {
            state.redirectToReLogin('Please log in again to use AI features.');
            return null;
        }
        if (!user || !token) {
            state.keys = [];
            state.activeKeyId = '';
            state.loadedForUser = '';
            notify();
            return null;
        }
        if (!forceReload && state.loadedForUser === user) {
            return { keys: state.keys, activeKeyId: state.activeKeyId };
        }
        try {
            state.loading = true;
            const data = await state.callApi({ eventType: 'ai_config_get', user, sessionToken: token });
            const config = normalizeConfigResponse(data);
            state.keys = config.keys;
            state.activeKeyId = config.activeKeyId;
            state.loadedForUser = user;
            return { keys: state.keys, activeKeyId: state.activeKeyId };
        } catch (e) {
            state.keys = [];
            state.activeKeyId = '';
            state.loadedForUser = user;
            throw e;
        } finally {
            state.loading = false;
            notify();
        }
    }

    // Creates a new key (keyId omitted, apiKey required) or updates an
    // existing one in place (keyId provided; apiKey optional - blank keeps
    // the currently stored key). `setActive` defaults to true for new keys.
    async function saveKey(input) {
        const user = state.getUser();
        const token = state.getSessionToken();
        if (!user || !token) throw new Error('Login is required before saving AI settings.');
        const payload = {
            eventType: 'ai_config_save',
            user,
            sessionToken: token,
            keyId: input.keyId && input.keyId !== 'legacy-active-key' ? input.keyId : undefined,
            label: input.label || '',
            provider: input.provider || 'openai',
            baseUrl: input.baseUrl || '',
            model: input.model || '',
            apiKey: input.apiKey || '',
            setActive: input.setActive !== false
        };
        if (!payload.model.trim()) throw new Error('Model is required.');
        if (!payload.keyId && !payload.apiKey) throw new Error('API key is required for a new key.');
        const result = await state.callApi(payload);
        await loadConfig(true);
        return result;
    }

    async function setActiveKey(keyId) {
        const user = state.getUser();
        const token = state.getSessionToken();
        if (!user || !token) throw new Error('Login is required before switching AI keys.');
        if (!keyId) throw new Error('keyId is required.');
        const result = await state.callApi({ eventType: 'ai_config_set_active', user, sessionToken: token, keyId });
        await loadConfig(true);
        return result;
    }

    async function deleteKey(keyId) {
        const user = state.getUser();
        const token = state.getSessionToken();
        if (!user || !token) throw new Error('Login is required before deleting AI settings.');
        if (!keyId) throw new Error('keyId is required.');
        const result = await state.callApi({ eventType: 'ai_config_delete', user, sessionToken: token, keyId });
        await loadConfig(true);
        return result;
    }

    // ---------------------------------------------------------------
    // Modal UI
    // ---------------------------------------------------------------

    function ensureModal() {
        if (state.modal) return state.modal;

        const modal = document.createElement('div');
        modal.className = 'ai-settings-modal chat-ai-modal hidden';
        modal.innerHTML = `
            <div class="ai-settings-backdrop chat-ai-backdrop" data-ai-close="1"></div>
            <section class="ai-settings-panel" role="dialog" aria-modal="true" aria-label="AI settings">
                <div class="ai-settings-header">
                    <div>
                        <div class="ai-settings-title">AI Settings</div>
                        <div class="ai-settings-subtitle">Saved per authenticated user - multiple keys supported</div>
                    </div>
                    <button type="button" class="code-runner-button secondary" data-ai-close="1">Close</button>
                </div>
                <div class="ai-settings-body">
                    <div class="ai-key-list" data-ai-key-list></div>
                    <button type="button" class="code-runner-button secondary ai-key-add-btn" data-ai-action="new-key">+ Add key</button>

                    <label class="code-runner-label" for="aiSettingsLabel">Label (optional)</label>
                    <input id="aiSettingsLabel" class="code-runner-text" type="text" placeholder="e.g. Work OpenAI key">

                    <label class="code-runner-label" for="aiSettingsProvider">Provider</label>
                    <select id="aiSettingsProvider" class="code-runner-select">
                        <option value="openai">OpenAI</option>
                        <option value="anthropic">Claude / Anthropic</option>
                        <option value="gemini">Gemini</option>
                        <option value="openrouter">OpenRouter</option>
                        <option value="groq">Groq</option>
                        <option value="together">Together</option>
                    </select>

                    <label class="code-runner-label" for="aiSettingsBaseUrl">Base URL</label>
                    <input id="aiSettingsBaseUrl" class="code-runner-text" type="text" placeholder="https://api.openai.com/v1">

                    <label class="code-runner-label" for="aiSettingsModel">Model</label>
                    <input id="aiSettingsModel" class="code-runner-text" type="text" placeholder="gpt-5.5">

                    <label class="code-runner-label" for="aiSettingsApiKey">API Key</label>
                    <input id="aiSettingsApiKey" class="code-runner-text" type="password" placeholder="Leave blank to keep saved key">

                    <div class="ai-provider-help" data-ai-provider-help></div>
                    <div class="ai-settings-status" data-ai-config-status></div>

                    <div class="ai-settings-actions">
                        <button type="button" class="code-runner-button primary" data-ai-action="save">Save</button>
                        <button type="button" class="code-runner-button secondary" data-ai-action="set-active">Set Active</button>
                        <button type="button" class="code-runner-button secondary" data-ai-action="refresh">Refresh</button>
                        <button type="button" class="code-runner-button secondary" data-ai-action="delete">Remove</button>
                    </div>
                </div>
            </section>
        `;
        document.body.appendChild(modal);

        state.modal = modal;
        state.els = {
            keyList: modal.querySelector('[data-ai-key-list]'),
            label: modal.querySelector('#aiSettingsLabel'),
            provider: modal.querySelector('#aiSettingsProvider'),
            baseUrl: modal.querySelector('#aiSettingsBaseUrl'),
            model: modal.querySelector('#aiSettingsModel'),
            apiKey: modal.querySelector('#aiSettingsApiKey'),
            help: modal.querySelector('[data-ai-provider-help]'),
            status: modal.querySelector('[data-ai-config-status]'),
            setActiveBtn: modal.querySelector('[data-ai-action="set-active"]'),
            deleteBtn: modal.querySelector('[data-ai-action="delete"]')
        };

        state.els.provider.addEventListener('change', () => applyProviderDefaults(true));

        modal.addEventListener('click', async (ev) => {
            if (ev.target.closest('[data-ai-close="1"]')) {
                close();
                return;
            }
            const keyItem = ev.target.closest('[data-ai-key-id]');
            if (keyItem && !ev.target.closest('[data-ai-action]')) {
                selectKeyForEdit(keyItem.dataset.aiKeyId);
                return;
            }
            const action = ev.target.closest('[data-ai-action]')?.dataset.aiAction;
            if (!action) return;
            await handleAction(action);
        });

        document.addEventListener('keydown', (ev) => {
            if (ev.key === 'Escape' && state.modal && !state.modal.classList.contains('hidden')) {
                close();
            }
        });

        return modal;
    }

    function setStatus(message, isError) {
        if (!state.els.status) return;
        state.els.status.textContent = message || '';
        state.els.status.classList.toggle('is-error', Boolean(isError));
    }

    function applyProviderDefaults(force) {
        const provider = state.els.provider?.value || 'openai';
        const defaults = PROVIDER_DEFAULTS[provider] || PROVIDER_DEFAULTS.openai;
        if (state.els.baseUrl && (force || !state.els.baseUrl.value.trim())) state.els.baseUrl.value = defaults[0];
        if (state.els.model && (force || !state.els.model.value.trim())) state.els.model.value = defaults[1];
        updateProviderHelp();
    }

    function updateProviderHelp() {
        if (!state.els.help) return;
        const provider = state.els.provider?.value || 'openai';
        const [title, body] = PROVIDER_HELP[provider] || PROVIDER_HELP.openai;
        state.els.help.innerHTML = `<strong>${escapeHtml(title)}:</strong> ${escapeHtml(body)}`;
    }

    function renderKeyList() {
        if (!state.els.keyList) return;
        if (!state.keys.length) {
            state.els.keyList.innerHTML = '<div class="ai-key-empty">No saved keys yet.</div>';
            return;
        }
        state.els.keyList.innerHTML = state.keys.map((k) => {
            const isActive = k.id === state.activeKeyId;
            const isEditing = k.id === state.editingKeyId;
            const label = k.label || `${k.provider || 'openai'} key`;
            const last4 = k.keyLast4 ? `...${escapeHtml(k.keyLast4)}` : '';
            return `
                <div class="ai-key-item${isActive ? ' is-active' : ''}${isEditing ? ' is-editing' : ''}" data-ai-key-id="${escapeHtml(k.id)}">
                    <div class="ai-key-item-main">
                        <div class="ai-key-item-label">${escapeHtml(label)}${isActive ? ' <span class="ai-key-active-badge">Active</span>' : ''}</div>
                        <div class="ai-key-item-meta">${escapeHtml(k.provider || 'openai')} - ${escapeHtml(k.model || '')} ${last4}</div>
                    </div>
                </div>
            `;
        }).join('');
    }

    function selectKeyForEdit(keyId) {
        const key = getKeyById(keyId);
        state.editingKeyId = key ? key.id : '';
        if (state.els.label) state.els.label.value = key?.label || '';
        if (state.els.provider) state.els.provider.value = key?.provider || 'openai';
        if (state.els.baseUrl) state.els.baseUrl.value = key?.baseUrl || '';
        if (state.els.model) state.els.model.value = key?.model || '';
        if (state.els.apiKey) state.els.apiKey.value = '';
        applyProviderDefaults(false);
        if (state.els.setActiveBtn) state.els.setActiveBtn.disabled = !key || key.id === state.activeKeyId;
        if (state.els.deleteBtn) state.els.deleteBtn.disabled = !key;
        setStatus(
            key
                ? (key.id === state.activeKeyId ? 'This is your active key. Leave API Key blank to keep it unchanged.' : 'Editing a saved key. Leave API Key blank to keep it unchanged.')
                : 'Enter a new API key and model, then Save to add it.',
            false
        );
        renderKeyList();
    }

    function startNewKey() {
        state.editingKeyId = '';
        if (state.els.label) state.els.label.value = '';
        if (state.els.provider) state.els.provider.value = 'openai';
        if (state.els.baseUrl) state.els.baseUrl.value = '';
        if (state.els.model) state.els.model.value = '';
        if (state.els.apiKey) state.els.apiKey.value = '';
        applyProviderDefaults(true);
        if (state.els.setActiveBtn) state.els.setActiveBtn.disabled = true;
        if (state.els.deleteBtn) state.els.deleteBtn.disabled = true;
        setStatus('Enter a new API key and model, then Save to add it.', false);
        renderKeyList();
    }

    async function handleAction(action) {
        try {
            if (action === 'new-key') {
                startNewKey();
                return;
            }
            if (action === 'refresh') {
                setStatus('Refreshing...', false);
                await loadConfig(true);
                renderKeyList();
                selectKeyForEdit(state.editingKeyId || state.activeKeyId);
                return;
            }
            if (action === 'save') {
                setStatus('Saving AI settings...', false);
                await saveKey({
                    keyId: state.editingKeyId,
                    label: state.els.label?.value || '',
                    provider: state.els.provider?.value || 'openai',
                    baseUrl: state.els.baseUrl?.value || '',
                    model: state.els.model?.value || '',
                    apiKey: state.els.apiKey?.value || '',
                    setActive: !state.editingKeyId // new keys become active by default
                });
                renderKeyList();
                selectKeyForEdit(state.editingKeyId || state.activeKeyId);
                setStatus('AI settings saved.', false);
                return;
            }
            if (action === 'set-active') {
                if (!state.editingKeyId) return;
                setStatus('Switching active key...', false);
                await setActiveKey(state.editingKeyId);
                renderKeyList();
                selectKeyForEdit(state.editingKeyId);
                setStatus('Active key switched.', false);
                return;
            }
            if (action === 'delete') {
                if (!state.editingKeyId) return;
                setStatus('Removing key...', false);
                await deleteKey(state.editingKeyId);
                state.editingKeyId = '';
                renderKeyList();
                selectKeyForEdit(state.activeKeyId);
                setStatus('Key removed.', false);
            }
        } catch (error) {
            setStatus(error instanceof Error ? error.message : 'AI settings action failed.', true);
        }
    }

    async function open() {
        ensureModal();
        state.modal.classList.remove('hidden');
        document.body.classList.add('ai-settings-open');
        setStatus('Loading...', false);
        try {
            await loadConfig(true);
            renderKeyList();
            selectKeyForEdit(state.activeKeyId || (state.keys[0]?.id || ''));
        } catch (error) {
            setStatus(error instanceof Error ? error.message : 'Unable to load AI settings.', true);
        }
    }

    function close() {
        if (!state.modal) return;
        state.modal.classList.add('hidden');
        document.body.classList.remove('ai-settings-open');
    }

    // ---------------------------------------------------------------
    // Public API
    // ---------------------------------------------------------------

    global.AiSettings = {
        // Merge in wiring. Safe to call from multiple scripts (chat.js,
        // main.js, ...); later calls only override the keys they pass.
        init(options) {
            if (options?.callApi) state.callApi = options.callApi;
            if (options?.getUser) state.getUser = options.getUser;
            if (options?.getSessionToken) state.getSessionToken = options.getSessionToken;
            if (options?.requiresSessionUpgrade) state.requiresSessionUpgrade = options.requiresSessionUpgrade;
            if (options?.redirectToReLogin) state.redirectToReLogin = options.redirectToReLogin;
            return global.AiSettings;
        },
        open,
        close,
        loadConfig,
        getActiveKey,
        hasUsableKey,
        getKeys: () => state.keys.slice(),
        getActiveKeyId: () => state.activeKeyId,
        // Subscribe to config changes (load/save/delete/switch all notify).
        // Returns an unsubscribe function.
        onChange(fn) {
            if (typeof fn !== 'function') return () => {};
            state.listeners.add(fn);
            return () => state.listeners.delete(fn);
        }
    };
})(window);
