(() => {
    'use strict';

    const endpoint = window.VISIT_ENDPOINT || '';
    const POLLING_KEY = 'chatPollingEnabled';
    const CHAT_CACHE_PREFIX = 'chatCache:v1:';
    let user = sessionStorage.getItem('visitorName') || '';

    function initChat() {
        const container = document.createElement('div');
        container.className = 'chat-widget';
        container.innerHTML = `
        <div class="chat-header">
            <span>Messages</span>
            <button type="button" class="chat-min-btn" id="chatMinBtn" aria-label="Minimize">-</button>
        </div>
        <div class="chat-status hidden" id="chatStatus"></div>
        <div class="chat-tabs">
            <button type="button" class="chat-tab active" data-tab="global">
                Global <span class="chat-badge hidden" id="globalBadge"></span>
            </button>
            <button type="button" class="chat-tab" data-tab="admin">
                Admin <span class="chat-badge hidden" id="adminBadge"></span>
            </button>
            <button type="button" class="chat-tab" data-tab="ai">
                AI
            </button>
        </div>
        <div class="chat-tools">
            <button type="button" class="chat-tool-btn chat-poll-toggle" id="chatPollToggle" aria-pressed="false" title="Enable auto polling">
                Polling Off
            </button>
            <button type="button" class="chat-tool-btn hidden" id="chatAiSettings" title="AI settings">
                AI Settings
            </button>
            <button type="button" class="chat-tool-btn hidden" id="chatDeleteAll" aria-label="Delete all messages" title="Delete all messages">
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <path d="M9 3h6l1 2h4v2H4V5h4l1-2zm1 6h2v9h-2V9zm4 0h2v9h-2V9zM7 9h2v9H7V9zM6 21h12a1 1 0 0 0 1-1V9H5v11a1 1 0 0 0 1 1z"/>
                </svg>
            </button>
        </div>
        <div class="chat-body" id="chatBody"></div>
        <form class="chat-form" id="chatForm">
            <textarea id="chatInput" placeholder="Type a message..." rows="2"></textarea>
            <button type="submit">Send</button>
        </form>
    `;
        document.body.appendChild(container);

        const bodyEl = container.querySelector('#chatBody');
        const form = container.querySelector('#chatForm');
        const input = container.querySelector('#chatInput');
        const statusEl = container.querySelector('#chatStatus');
        const minBtn = container.querySelector('#chatMinBtn');
        const pollToggleBtn = container.querySelector('#chatPollToggle');
        const aiSettingsBtn = container.querySelector('#chatAiSettings');
        const globalBadge = container.querySelector('#globalBadge');
        const adminBadge = container.querySelector('#adminBadge');
        const deleteAllBtn = container.querySelector('#chatDeleteAll');
        const tabs = container.querySelectorAll('.chat-tab');
        let current = 'global';
        let networkOk = true;
        let pollTimer = null;
        let minimized = false;
        let pollingEnabled = getStoredPollingEnabled();
        let lastUnseen = { global: 0, admin: 0 };
        let lastLengths = { global: 0, admin: 0 };
        let bubbleStatePrimed = false;
        let aiMessages = [];
        let aiBusy = false;
        let aiSettingsModal = null;
        let aiConfigCache = null;
        let aiConfigLoadedForUser = '';

        function chatCacheKey(scope) {
            return `${CHAT_CACHE_PREFIX}${String(user || '').toLowerCase()}:${scope}`;
        }

        function readChatCache(scope) {
            try {
                const raw = localStorage.getItem(chatCacheKey(scope));
                if (!raw) return null;
                const parsed = JSON.parse(raw);
                if (!parsed || !Array.isArray(parsed.messages)) return null;
                return {
                    messages: parsed.messages,
                    unseenCount: Number(parsed.unseenCount || 0),
                    version: String(parsed.version || '')
                };
            } catch {
                return null;
            }
        }

        function writeChatCache(scope, payload) {
            try {
                localStorage.setItem(chatCacheKey(scope), JSON.stringify({
                    messages: Array.isArray(payload?.messages) ? payload.messages : [],
                    unseenCount: Number(payload?.unseenCount || 0),
                    version: String(payload?.version || ''),
                    cachedAt: Date.now()
                }));
            } catch {}
        }

        function primeChatFromCache() {
            const currentCache = readChatCache(current);
            if (currentCache) {
                hasNewActivity(current, currentCache);
                render(currentCache.messages);
            }
            const other = current === 'global' ? 'admin' : 'global';
            const otherCache = readChatCache(other);
            if (current === 'global') {
                setBadge(globalBadge, 0);
                setBadge(adminBadge, Number(otherCache?.unseenCount || 0));
            } else {
                setBadge(adminBadge, 0);
                setBadge(globalBadge, Number(otherCache?.unseenCount || 0));
            }
        }

        const bubble = document.createElement('button');
        bubble.type = 'button';
        bubble.className = 'chat-bubble hidden';
        bubble.textContent = 'Chat';
        document.body.appendChild(bubble);

        const resizer = document.createElement('div');
        resizer.className = 'chat-resizer';
        container.appendChild(resizer);

        function getStoredPollingEnabled() {
            try {
                return sessionStorage.getItem(POLLING_KEY) === '1';
            } catch {
                return false;
            }
        }

        function storePollingEnabled(value) {
            try {
                sessionStorage.setItem(POLLING_KEY, value ? '1' : '0');
            } catch {}
        }

        function clearPollTimer() {
            if (pollTimer) {
                clearTimeout(pollTimer);
                pollTimer = null;
            }
        }

        function updatePollingUi() {
            if (!pollToggleBtn) return;
            pollToggleBtn.textContent = pollingEnabled ? 'Polling On' : 'Polling Off';
            pollToggleBtn.setAttribute('aria-pressed', pollingEnabled ? 'true' : 'false');
            pollToggleBtn.classList.toggle('is-on', pollingEnabled);
            pollToggleBtn.title = pollingEnabled ? 'Disable auto polling' : 'Enable auto polling';
        }

        function setPollingEnabled(next) {
            pollingEnabled = Boolean(next);
            storePollingEnabled(pollingEnabled);
            updatePollingUi();
            clearPollTimer();
            if (pollingEnabled && !minimized) {
                poll();
            }
        }

        function setMinimized(next) {
            minimized = next;
            if (minimized) {
                container.classList.add('chat-minimized');
                bubble.classList.remove('hidden');
                try { sessionStorage.setItem('chatMinimized', '1'); } catch {}
                clearPollTimer();
            } else {
                container.classList.remove('chat-minimized');
                bubble.classList.add('hidden');
                try { sessionStorage.setItem('chatMinimized', '0'); } catch {}
                poll();
            }
        }

        minBtn?.addEventListener('click', () => setMinimized(true));
        pollToggleBtn?.addEventListener('click', () => setPollingEnabled(!pollingEnabled));

        // Draggable bubble
        let dragActive = false;
        let dragOffsetX = 0;
        let dragOffsetY = 0;
        let dragMoved = false;

        bubble.addEventListener('pointerdown', (ev) => {
            dragActive = true;
            dragMoved = false;
            bubble.setPointerCapture(ev.pointerId);
            const rect = bubble.getBoundingClientRect();
            dragOffsetX = ev.clientX - rect.left;
            dragOffsetY = ev.clientY - rect.top;
        });
        bubble.addEventListener('pointermove', (ev) => {
            if (!dragActive) return;
            dragMoved = true;
            const x = Math.max(10, Math.min(window.innerWidth - 70, ev.clientX - dragOffsetX));
            const y = Math.max(10, Math.min(window.innerHeight - 70, ev.clientY - dragOffsetY));
            bubble.style.left = `${x}px`;
            bubble.style.top = `${y}px`;
        });
        bubble.addEventListener('pointerup', () => {
            dragActive = false;
        });

        bubble.addEventListener('click', (ev) => {
            if (dragMoved) {
                ev.preventDefault();
                return;
            }
            setMinimized(false);
        });

        // Resize handle
        let resizeActive = false;
        let startW = 0;
        let startH = 0;
        let startX = 0;
        let startY = 0;

        resizer.addEventListener('pointerdown', (ev) => {
            resizeActive = true;
            resizer.setPointerCapture(ev.pointerId);
            const rect = container.getBoundingClientRect();
            startW = rect.width;
            startH = rect.height;
            startX = ev.clientX;
            startY = ev.clientY;
            container.style.right = `${window.innerWidth - rect.right}px`;
            container.style.bottom = `${window.innerHeight - rect.bottom}px`;
        });
        resizer.addEventListener('pointermove', (ev) => {
            if (!resizeActive) return;
            const dx = startX - ev.clientX;
            const dy = startY - ev.clientY;
            const maxW = Math.min(window.innerWidth * 0.95, 1200);
            const maxH = Math.min(window.innerHeight * 0.95, window.innerHeight - 20);
            const nextW = Math.min(maxW, Math.max(280, startW + dx));
            const nextH = Math.min(maxH, Math.max(320, startH + dy));
            container.style.width = `${nextW}px`;
            container.style.height = `${nextH}px`;
        });
        resizer.addEventListener('pointerup', () => {
            resizeActive = false;
        });

        function triggerBubbleNotification() {
            bubble.classList.remove('chat-bounce');
            bubble.style.right = '20px';
            bubble.style.bottom = window.innerWidth <= 768 ? '136px' : '148px';
            bubble.style.left = '';
            bubble.style.top = '';
            void bubble.offsetHeight;
            bubble.classList.add('chat-bounce');
            setTimeout(() => bubble.classList.remove('chat-bounce'), 650);
        }

        function hasNewActivity(scope, result) {
            const nextUnseen = Number(result?.unseenCount || 0);
            const nextLength = Array.isArray(result?.messages) ? result.messages.length : 0;
            const increased = bubbleStatePrimed && (nextUnseen > (lastUnseen[scope] || 0) || nextLength > (lastLengths[scope] || 0));
            lastUnseen[scope] = nextUnseen;
            lastLengths[scope] = nextLength;
            return increased;
        }

    tabs.forEach((t) => {
        t.addEventListener('click', () => {
            tabs.forEach((x) => x.classList.remove('active'));
            t.classList.add('active');
            current = t.dataset.tab;
            updateDeleteAllVisibility();
            if (current === 'ai') {
                clearPollTimer();
                render(aiMessages);
                input.placeholder = 'Ask AI...';
                return;
            }
            input.placeholder = 'Type a message...';
            poll();
        });
    });

        function autosizeInput() {
            if (!input) return;
            input.style.height = 'auto';
            const styles = window.getComputedStyle(input);
            const max = Number.parseInt(styles.maxHeight || '', 10) || 140;
            const next = Math.min(input.scrollHeight, max);
            input.style.height = `${next}px`;
            input.style.overflowY = input.scrollHeight > max ? 'auto' : 'hidden';
        }

        function insertAtCursor(el, text) {
            const start = el.selectionStart ?? el.value.length;
            const end = el.selectionEnd ?? el.value.length;
            const value = el.value || '';
            el.value = value.slice(0, start) + text + value.slice(end);
            const pos = start + text.length;
            el.selectionStart = pos;
            el.selectionEnd = pos;
            el.dispatchEvent(new Event('input', { bubbles: true }));
        }

        function htmlToTextWithTables(html) {
            try {
                const doc = new DOMParser().parseFromString(html, 'text/html');
                const body = doc.body;
                if (!body) return '';
                const isBlock = (tag) => [
                    'P', 'DIV', 'SECTION', 'ARTICLE', 'HEADER', 'FOOTER',
                    'BLOCKQUOTE', 'PRE', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'LI'
                ].includes(tag);
                const tableToTsv = (table) => {
                    const rows = Array.from(table.querySelectorAll('tr'));
                    return rows.map((row) => {
                        const cells = Array.from(row.querySelectorAll('th, td'));
                        return cells.map((cell) => String(cell.textContent || '').replace(/\s+/g, ' ').trim()).join('\t');
                    }).join('\n');
                };
                const nodeToText = (node) => {
                    if (node.nodeType === Node.TEXT_NODE) return node.nodeValue || '';
                    if (node.nodeType !== Node.ELEMENT_NODE) return '';
                    const tag = node.tagName;
                    if (tag === 'BR') return '\n';
                    if (tag === 'TABLE') {
                        const tsv = tableToTsv(node);
                        return tsv ? `\n${tsv}\n` : '';
                    }
                    let text = '';
                    node.childNodes.forEach((child) => { text += nodeToText(child); });
                    if (tag === 'LI') {
                        const trimmed = text.trim();
                        if (trimmed && !/^[•\-\*]\s/.test(trimmed)) {
                            text = `• ${trimmed}`;
                        } else {
                            text = trimmed;
                        }
                        text += '\n';
                        return text;
                    }
                    if (isBlock(tag)) {
                        if (!text.endsWith('\n')) text += '\n';
                    }
                    return text;
                };
                let out = nodeToText(body);
                out = out.split('\n').map((l) => l.trimEnd()).join('\n');
                out = out.replace(/\n{3,}/g, '\n\n').trim();
                return out;
            } catch {
                return '';
            }
        }

        form.addEventListener('submit', async (ev) => {
        ev.preventDefault();
        if (!endpoint || !user) {
            showStatus('Chat is unavailable. Please login and allow requests.');
            return;
        }
        const raw = input.value || '';
        if (!raw.trim()) return;
        const msg = raw;
        if (current === 'ai') {
            await sendAiMessage(msg);
            input.value = '';
            autosizeInput();
            return;
        }
        await sendMessage(current, msg);
        input.value = '';
        autosizeInput();
        poll();
        });

        input.addEventListener('keydown', (ev) => {
            if (ev.key === 'Enter' && !ev.shiftKey) {
                ev.preventDefault();
                form.requestSubmit();
            }
        });
        input.addEventListener('paste', (ev) => {
            const clipboard = ev.clipboardData;
            if (!clipboard) return;
            const html = clipboard.getData('text/html');
            if (!html) return;
            const looksLikeWord = /class="?Mso|urn:schemas-microsoft-com|<meta name=generator[^>]*Word/i.test(html);
            const hasTable = /<table[\s>]/i.test(html);
            if (!looksLikeWord && !hasTable) return;
            const text = htmlToTextWithTables(html);
            if (!text) return;
            ev.preventDefault();
            insertAtCursor(input, text);
        });
        input.addEventListener('input', autosizeInput);
        autosizeInput();

        async function gzipToBase64(text) {
        if (!('CompressionStream' in window)) return '';
        const encoder = new TextEncoder();
        const stream = new CompressionStream('gzip');
        const writer = stream.writable.getWriter();
        writer.write(encoder.encode(text));
        writer.close();
        const buffer = await new Response(stream.readable).arrayBuffer();
        const bytes = new Uint8Array(buffer);
        let binary = '';
        const chunkSize = 0x8000;
        for (let i = 0; i < bytes.length; i += chunkSize) {
            binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
        }
        return btoa(binary);
    }

        async function buildMessagePayload(message) {
        if (message.length <= 1000) return { message };
        try {
            const gz = await gzipToBase64(message);
            if (!gz) return { message };
            return {
                messageGzipBase64: gz,
                messageEncoding: 'gzip+base64',
                messageLength: message.length
            };
        } catch {
            return { message };
        }
    }

        async function sendMessage(scope, message) {
        if (!endpoint || !user) return;
        try {
            const payload = await buildMessagePayload(message);
            const res = await fetch(endpoint, {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({
                    eventType: 'message_send',
                    scope: scope === 'global' ? 'global' : 'admin',
                    from: user,
                    to: scope === 'admin' ? 'admin' : '',
                    ...payload
                })
            });
            if (!res.ok) throw new Error('Send failed');
            showStatus('');
        } catch {
            networkOk = false;
            showStatus('Chat is blocked by the browser or network.');
        }
    }

        async function callAiApi(body) {
        // Ensure AI calls include both recognized identity fields and an Authorization header
        // to remain compatible with different backend expectations.
        if (!endpoint) throw new Error('VISIT_ENDPOINT is not configured');
        const sessionToken = sessionStorage.getItem('visitSessionToken') || '';
        const name = sessionStorage.getItem('visitorName') || '';
        if (!name || !sessionToken) throw new Error('Login is required for AI.');

        const headers = { 'content-type': 'application/json' };
        // Only add Authorization header for specific AI management/visualization events.
        // Some endpoints (e.g. ai_chat) expect the token in the body and the server
        // may not include `authorization` in Access-Control-Allow-Headers — avoid it there.
        const authRequiredEvents = new Set([
            'ai_config_get',
            'ai_config_save',
            'ai_config_delete',
            'ai_visualize',
            'ai_visualization_get',
            'ai_visualization_submit',
            'ai_visualization_history'
        ]);
        if (sessionToken && authRequiredEvents.has(body?.eventType)) {
            headers['authorization'] = `Bearer ${sessionToken}`;
        }

        // Include multiple identity keys in the body for compatibility; do NOT rely on the
        // Authorization header being present for every event type.
        const payload = {
            user: name,
            name,
            username: name,
            sessionToken,
            ...body
        };

        const res = await fetch(endpoint, {
            method: 'POST',
            headers,
            body: JSON.stringify(payload)
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data?.error || data?.detail || `HTTP ${res.status}`);
        return data;
    }

        function getAiText(data) {
        return data?.reply || data?.message || data?.text || data?.content || data?.answer || '';
    }

        async function loadAiConfig(forceReload) {
        // Use the same lightweight visit POST pattern as main.js to avoid
        // Authorization header / CORS preflight issues for ai_config_get.
        if (!forceReload && aiConfigCache && aiConfigLoadedForUser === user) return aiConfigCache;
        const sessionToken = sessionStorage.getItem('visitSessionToken') || '';
        if (!user || !sessionToken) {
            aiConfigCache = null;
            aiConfigLoadedForUser = '';
            return null;
        }
        try {
            const res = await fetch(endpoint, {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({
                    eventType: 'ai_config_get',
                    user,
                    sessionToken
                })
            });
            const data = await res.json().catch(() => ({}));
            if (!res.ok) throw new Error(data?.error || data?.detail || `HTTP ${res.status}`);
            aiConfigCache = {
                hasApiKey: Boolean(data?.hasApiKey),
                provider: data?.provider || 'openai',
                model: data?.model || '',
                baseUrl: data?.baseUrl || '',
                updatedAt: data?.updatedAt || ''
            };
        } catch (error) {
            aiConfigCache = null;
            throw error;
        } finally {
            aiConfigLoadedForUser = user;
        }
        return aiConfigCache;
    }

        function ensureAiSettingsModal() {
        if (aiSettingsModal) return aiSettingsModal;
        aiSettingsModal = document.createElement('div');
        aiSettingsModal.className = 'ai-settings-modal chat-ai-modal hidden';
        aiSettingsModal.innerHTML = `
            <div class="ai-settings-backdrop chat-ai-backdrop" data-ai-close="1"></div>
            <section class="ai-settings-panel chat-ai-panel" role="dialog" aria-modal="true" aria-label="AI settings">
                <div class="ai-settings-header chat-ai-head">
                    <div>
                        <div class="ai-settings-title">AI Settings</div>
                        <div class="ai-settings-subtitle">Saved per authenticated user</div>
                    </div>
                    <button type="button" class="code-runner-button secondary" data-ai-close="1">Close</button>
                </div>
                <div class="ai-settings-body">
                    <label class="code-runner-label" for="chatAiProvider">Provider</label>
                    <select id="chatAiProvider" class="code-runner-select">
                        <option value="openai">OpenAI</option>
                        <option value="anthropic">Claude / Anthropic</option>
                        <option value="gemini">Gemini</option>
                        <option value="openrouter">OpenRouter</option>
                        <option value="groq">Groq</option>
                        <option value="together">Together</option>
                    </select>
                    <label class="code-runner-label" for="chatAiBaseUrl">Base URL</label>
                    <input id="chatAiBaseUrl" class="code-runner-text" type="text" placeholder="https://api.openai.com/v1">
                    <label class="code-runner-label" for="chatAiModel">Model</label>
                    <input id="chatAiModel" class="code-runner-text" type="text" placeholder="gpt-5.5">
                    <label class="code-runner-label" for="chatAiApiKey">API Key</label>
                    <input id="chatAiApiKey" class="code-runner-text" type="password" placeholder="Leave blank to keep saved key">
                    <div class="ai-provider-help chat-ai-help" data-ai-provider-help></div>
                    <div class="ai-settings-status chat-ai-status" id="chatAiStatus" data-ai-config-status></div>
                    <div class="ai-settings-actions chat-ai-actions">
                        <button type="button" class="code-runner-button primary" data-ai-action="save">Save</button>
                        <button type="button" class="code-runner-button secondary" data-ai-action="refresh">Refresh</button>
                        <button type="button" class="code-runner-button secondary" data-ai-action="delete">Remove</button>
                    </div>
                </div>
            </section>
        `;
        document.body.appendChild(aiSettingsModal);
        aiSettingsModal.querySelector('#chatAiProvider')?.addEventListener('change', () => applyProviderDefaults(true));
        aiSettingsModal.addEventListener('click', async (ev) => {
            if (ev.target.closest('[data-ai-close="1"]')) {
                aiSettingsModal.classList.add('hidden');
                document.body.classList.remove('ai-settings-open');
                return;
            }
            const action = ev.target.closest('[data-ai-action]')?.dataset.aiAction;
            if (!action) return;
            await handleAiSettingsAction(action);
        });
        return aiSettingsModal;
    }

        function setAiSettingsStatus(message, isError) {
        const el = document.getElementById('chatAiStatus');
        if (!el) return;
        el.textContent = message || '';
        el.classList.toggle('is-error', Boolean(isError));
    }

        function updateAiProviderHelp() {
        const help = aiSettingsModal?.querySelector('[data-ai-provider-help]');
        const provider = document.getElementById('chatAiProvider')?.value || 'openai';
        if (!help) return;
        let title = 'Provider notes';
        let body = 'Save the API key once for this authenticated user. It stays on the backend in encrypted form.';
        if (provider === 'gemini') {
            title = 'Gemini';
            body = 'Create a Gemini API key in Google AI Studio. Recommended model: gemini-2.5-flash.';
        } else if (provider === 'openai') {
            title = 'OpenAI';
            body = 'Use an OpenAI API key from platform.openai.com. Recommended model: gpt-5.5.';
        } else if (provider === 'anthropic') {
            title = 'Anthropic';
            body = 'Use an Anthropic Console API key. Recommended model: claude-3-5-sonnet-latest.';
        } else if (provider === 'openrouter') {
            title = 'OpenRouter';
            body = 'Use an OpenRouter API key and a model id such as openai/gpt-4.1-mini.';
        } else if (provider === 'groq') {
            title = 'Groq';
            body = 'Use a Groq API key and a Groq-supported model id. Recommended default: llama-3.1-8b-instant.';
        } else if (provider === 'together') {
            title = 'Together';
            body = 'Use a Together API key and model id. Recommended default: meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo.';
        }
        help.innerHTML = `<strong>${renderInlineMarkdown(title)}</strong>: ${renderInlineMarkdown(body)}`;
    }

        function applyProviderDefaults(force) {
        const provider = document.getElementById('chatAiProvider')?.value || 'openai';
        const base = document.getElementById('chatAiBaseUrl');
        const model = document.getElementById('chatAiModel');
        const defaults = {
            openai: ['https://api.openai.com/v1', 'gpt-5.5'],
            anthropic: ['https://api.anthropic.com/v1', 'claude-3-5-sonnet-latest'],
            gemini: ['https://generativelanguage.googleapis.com/v1beta', 'gemini-2.5-flash'],
            openrouter: ['https://openrouter.ai/api/v1', 'openai/gpt-4.1-mini'],
            groq: ['https://api.groq.com/openai/v1', 'llama-3.1-8b-instant'],
            together: ['https://api.together.xyz/v1', 'meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo']
        };
        if (base && (force || !base.value.trim())) base.value = defaults[provider]?.[0] || '';
        if (model && (force || !model.value.trim())) model.value = defaults[provider]?.[1] || '';
        updateAiProviderHelp();
    }

        function fillAiSettingsForm() {
        document.getElementById('chatAiProvider').value = aiConfigCache?.provider || 'openai';
        document.getElementById('chatAiBaseUrl').value = aiConfigCache?.baseUrl || '';
        document.getElementById('chatAiModel').value = aiConfigCache?.model || '';
        document.getElementById('chatAiApiKey').value = '';
        applyProviderDefaults(false);
        setAiSettingsStatus(
            aiConfigCache?.hasApiKey
                ? 'API key saved for this user. Leave blank to keep it unchanged.'
                : 'Enter an API key and model to enable AI.',
            false
        );
    }

        async function openAiSettings() {
        ensureAiSettingsModal();
        aiSettingsModal.classList.remove('hidden');
        document.body.classList.add('ai-settings-open');
        setAiSettingsStatus('Loading...', false);
        try {
            await loadAiConfig(true);
            fillAiSettingsForm();
        } catch (error) {
            setAiSettingsStatus(error.message || 'Unable to load AI settings.', true);
        }
    }

        async function handleAiSettingsAction(action) {
        try {
            if (action === 'refresh') {
                aiConfigCache = null;
                await openAiSettings();
                return;
            }
            if (action === 'delete') {
                setAiSettingsStatus('Removing AI settings...', false);
                await callAiApi({ eventType: 'ai_config_delete' });
                aiConfigCache = {
                    hasApiKey: false,
                    provider: 'openai',
                    model: '',
                    baseUrl: '',
                    updatedAt: ''
                };
                fillAiSettingsForm();
                setAiSettingsStatus('AI settings removed.', false);
                return;
            }
            const model = document.getElementById('chatAiModel')?.value || '';
            if (!model.trim()) {
                setAiSettingsStatus('Model is required.', true);
                return;
            }
            setAiSettingsStatus('Saving AI settings...', false);
            await callAiApi({
                eventType: 'ai_config_save',
                provider: document.getElementById('chatAiProvider')?.value || 'openai',
                baseUrl: document.getElementById('chatAiBaseUrl')?.value || '',
                model,
                apiKey: document.getElementById('chatAiApiKey')?.value || ''
            });
            aiConfigCache = null;
            await loadAiConfig(true);
            fillAiSettingsForm();
            setAiSettingsStatus('AI settings saved.', false);
        } catch (error) {
            setAiSettingsStatus(error.message || 'AI settings failed.', true);
        }
    }

        async function sendAiMessage(message) {
        if (aiBusy) return;
        aiBusy = true;
        aiMessages.push({ from: user || 'You', message, time: new Date().toISOString() });
        aiMessages.push({ from: 'AI', message: 'Thinking...', time: new Date().toISOString(), pending: true });
        render(aiMessages);
        try {
            const config = await loadAiConfig(false);
            if (!config?.hasApiKey || !config?.model) {
                openAiSettings();
                throw new Error('Save AI settings before chatting with AI.');
            }
            const data = await callAiApi({
                eventType: 'ai_chat',
                message,
                history: aiMessages.filter((m) => !m.pending).slice(-12).map((m) => ({
                    role: (m.from || '').toLowerCase() === 'ai' ? 'assistant' : 'user',
                    content: m.message || ''
                })),
                page: window.location.href
            });
            aiMessages = aiMessages.filter((m) => !m.pending);
            aiMessages.push({ from: 'AI', message: getAiText(data) || 'No AI response returned.', time: new Date().toISOString() });
        } catch (error) {
            aiMessages = aiMessages.filter((m) => !m.pending);
            aiMessages.push({ from: 'AI', message: error.message || 'AI request failed.', time: new Date().toISOString() });
        } finally {
            aiBusy = false;
            render(aiMessages);
        }
    }

        async function askAi(payload) {
        const config = await loadAiConfig(false);
        if (!config?.hasApiKey || !config?.model) {
            openAiSettings();
            throw new Error('Save AI settings before using AI.');
        }
        const data = await callAiApi(payload);
        return getAiText(data) || '';
    }

        window.VisitAi = {
        openSettings: openAiSettings,
        ask: askAi
    };

        async function deleteMessages(scope, id, index, deleteAll) {
        if (!endpoint || !user) return;
        const body = {
            eventType: 'message_delete',
            scope,
            deleteAll: Boolean(deleteAll),
            index: Number.isFinite(index) ? index : 0,
            requestor: user
        };
        if (id) body.id = id;
        if (scope === 'user') body.user = user;
        try {
            const res = await fetch(endpoint, {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(body)
            });
            if (!res.ok) throw new Error('Delete failed');
        } catch {
            showStatus('Delete failed. Try again.');
        }
    }

        async function fetchMessages(scope, markSeen) {
        if (!endpoint || !user) return { messages: [], unseenCount: 0 };
        const cached = readChatCache(scope);
        try {
            const res = await fetch(endpoint, {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({
                    eventType: 'message_fetch',
                    scope: scope === 'global' ? 'global' : 'user',
                    user,
                    markSeen: Boolean(markSeen),
                    knownVersion: cached?.version || ''
                })
            });
            if (!res.ok) throw new Error('Fetch failed');
            const json = await res.json().catch(() => ({}));
            if (json.notModified && cached) {
                showStatus('');
                return cached;
            }
            const payload = {
                messages: json.messages || [],
                unseenCount: Number(json.unseenCount || 0),
                version: String(json.version || '')
            };
            writeChatCache(scope, payload);
            showStatus('');
            return payload;
        } catch {
            networkOk = false;
            showStatus('Chat is blocked by the browser or network.');
            return cached || { messages: [], unseenCount: 0, version: '' };
        }
    }

        function dayLabel(date) {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const that = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        const diffDays = Math.round((today - that) / 86400000);
        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        return that.toLocaleDateString();
    }

        function fmtTime(date) {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

        const LINE_CLAMP = 5;
        const TABLE_ROW_CLAMP = 6;

        function escapeHtml(value) {
        return String(value ?? '').replace(/[&<>"']/g, (ch) => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        }[ch]));
    }

        function renderInlineMarkdown(text) {
        let html = escapeHtml(text);
        html = html.replace(/`([^`\n]+)`/g, '<code>$1</code>');
        html = html.replace(/\*\*([^*\n][\s\S]*?[^*\n])\*\*/g, '<strong>$1</strong>');
        html = html.replace(/\[([^\]\n]+)\]\((https?:\/\/[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
        return html;
    }

        function renderMarkdownBlock(bodyEl, text) {
        const lines = String(text || '').split(/\r?\n/);
        let paragraph = [];
        let list = null;
        let codeLines = [];
        let inCode = false;

        const flushParagraph = () => {
            if (!paragraph.length) return;
            const p = document.createElement('p');
            p.innerHTML = renderInlineMarkdown(paragraph.join('\n'));
            bodyEl.appendChild(p);
            paragraph = [];
        };
        const flushList = () => {
            if (!list) return;
            bodyEl.appendChild(list);
            list = null;
        };
        const flushCode = () => {
            const pre = document.createElement('pre');
            const code = document.createElement('code');
            code.textContent = codeLines.join('\n');
            pre.appendChild(code);
            bodyEl.appendChild(pre);
            codeLines = [];
        };

        lines.forEach((line) => {
            if (/^```/.test(line.trim())) {
                if (inCode) {
                    flushCode();
                    inCode = false;
                } else {
                    flushParagraph();
                    flushList();
                    inCode = true;
                    codeLines = [];
                }
                return;
            }
            if (inCode) {
                codeLines.push(line);
                return;
            }

            const trimmed = line.trim();
            if (!trimmed) {
                flushParagraph();
                flushList();
                return;
            }
            if (/^([-*_])\1\1+$/.test(trimmed)) {
                flushParagraph();
                flushList();
                bodyEl.appendChild(document.createElement('hr'));
                return;
            }
            const heading = trimmed.match(/^(#{1,6})\s+(.+)$/);
            if (heading) {
                flushParagraph();
                flushList();
                const h = document.createElement(`h${heading[1].length}`);
                h.innerHTML = renderInlineMarkdown(heading[2]);
                bodyEl.appendChild(h);
                return;
            }
            const bullet = trimmed.match(/^[-*•]\s+(.+)$/);
            if (bullet) {
                flushParagraph();
                if (!list) list = document.createElement('ul');
                const li = document.createElement('li');
                li.innerHTML = renderInlineMarkdown(bullet[1]);
                list.appendChild(li);
                return;
            }
            flushList();
            paragraph.push(line);
        });
        if (inCode) flushCode();
        flushParagraph();
        flushList();
    }

        function parseMessageParts(message) {
        const lines = String(message || '').split(/\r?\n/);
        const parts = [];
        const textLines = [];
        const tableLines = [];

        const isTableLine = (line) => line.trim().length > 0 && line.includes('\t') && line.split('\t').length >= 2;
        const flushText = () => {
            const text = textLines.join('\n');
            textLines.length = 0;
            if (text.trim()) parts.push({ type: 'text', text });
        };
        const flushTable = () => {
            if (tableLines.length < 2) {
                textLines.push(...tableLines);
                tableLines.length = 0;
                return;
            }
            flushText();
            const rows = tableLines.map((line) => line.split('\t').map((cell) => cell.trim()));
            tableLines.length = 0;
            const colCount = Math.max(...rows.map((row) => row.length));
            if (colCount < 2) {
                textLines.push(...rows.map((row) => row.join('\t')));
                return;
            }
            rows.forEach((row) => {
                while (row.length < colCount) row.push('');
            });
            parts.push({ type: 'table', rows });
        };

        lines.forEach((line) => {
            if (isTableLine(line)) {
                tableLines.push(line);
                return;
            }
            flushTable();
            textLines.push(line);
        });
        flushTable();
        flushText();
        return parts;
    }

        function renderTable(bodyEl, rows) {
        const table = document.createElement('table');
        table.className = 'chat-table';
        const thead = document.createElement('thead');
        const headRow = document.createElement('tr');
        rows[0].forEach((cell) => {
            const th = document.createElement('th');
            th.textContent = cell;
            headRow.appendChild(th);
        });
        thead.appendChild(headRow);
        table.appendChild(thead);
        const tbody = document.createElement('tbody');
        rows.slice(1).forEach((row, idx) => {
            const tr = document.createElement('tr');
            if (idx >= TABLE_ROW_CLAMP) tr.classList.add('chat-table-row-hidden');
            row.forEach((cell) => {
                const td = document.createElement('td');
                td.textContent = cell;
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        });
        table.appendChild(tbody);
        bodyEl.appendChild(table);
        return rows.length - 1 > TABLE_ROW_CLAMP;
    }

        function renderTextBlock(bodyEl, text) {
        const block = document.createElement('div');
        block.className = 'chat-text-block';
        renderMarkdownBlock(block, text);
        bodyEl.appendChild(block);
    }

        function render(list) {
        const prevScrollTop = bodyEl.scrollTop;
        const prevScrollHeight = bodyEl.scrollHeight;
        const nearBottom = prevScrollTop + bodyEl.clientHeight >= prevScrollHeight - 40;
        bodyEl.innerHTML = '';
        const items = list.map((m, index) => {
            const dt = new Date(m.time || Date.now());
            return { m, dt, label: dayLabel(dt), index };
        }).slice(-50);
        let currentLabel = '';
        const userLower = (user || '').toLowerCase();
        items.forEach(({ m, dt, label, index }) => {
            if (label !== currentLabel) {
                currentLabel = label;
                const header = document.createElement('div');
                header.className = 'chat-day';
                header.textContent = label;
                bodyEl.appendChild(header);
            }
            const row = document.createElement('div');
            row.className = 'chat-item';
            if ((m.from || '').toLowerCase() === (user || '').toLowerCase()) {
                row.classList.add('chat-item-own');
            }
            const meta = document.createElement('div');
            meta.className = 'chat-meta';
            const name = document.createElement('span');
            name.textContent = m.from || '';
            const time = document.createElement('span');
            time.className = 'chat-time';
            time.textContent = fmtTime(dt);
            meta.appendChild(name);
            meta.appendChild(time);
            const body = document.createElement('div');
            body.className = 'chat-message';
            const rawMessage = m.message || '';
            body.dataset.raw = rawMessage;
            const messageParts = parseMessageParts(rawMessage);
            const hasTable = messageParts.some((part) => part.type === 'table');
            let hasHiddenRows = false;
            if (hasTable) {
                messageParts.forEach((part) => {
                    if (part.type === 'table') {
                        hasHiddenRows = renderTable(body, part.rows) || hasHiddenRows;
                    } else {
                        renderTextBlock(body, part.text);
                    }
                });
            } else {
                renderMarkdownBlock(body, rawMessage);
            }
            row.appendChild(meta);
            row.appendChild(body);
            const isOwn = (m.from || '').toLowerCase() === userLower;
            const canDelete = current === 'admin' || (current === 'global' && isOwn);
            const actions = document.createElement('div');
            actions.className = 'chat-actions';
            const copyBtn = document.createElement('button');
            copyBtn.type = 'button';
            copyBtn.className = 'chat-copy-btn';
            copyBtn.setAttribute('aria-label', 'Copy message');
            copyBtn.innerHTML = `
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <path d="M16 1H6a2 2 0 0 0-2 2v12h2V3h10V1zm2 4H10a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm0 16H10V7h8v14z"/>
                </svg>
            `;
            actions.appendChild(copyBtn);
            if (canDelete) {
                const del = document.createElement('button');
                del.type = 'button';
                del.className = 'chat-delete-btn';
                del.setAttribute('aria-label', 'Delete message');
                del.innerHTML = `
                    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                        <path d="M9 3h6l1 2h4v2H4V5h4l1-2zm1 6h2v9h-2V9zm4 0h2v9h-2V9zM7 9h2v9H7V9zM6 21h12a1 1 0 0 0 1-1V9H5v11a1 1 0 0 0 1 1z"/>
                    </svg>
                `;
                del.dataset.scope = current === 'global' ? 'global' : 'user';
                if (m.id) del.dataset.id = String(m.id);
                del.dataset.index = String(index);
                actions.appendChild(del);
            }
            row.appendChild(actions);
            if (m.seenAt && (m.from || '').toLowerCase() === (user || '').toLowerCase()) {
                const seen = document.createElement('div');
                seen.className = 'chat-seen';
                seen.textContent = `seen ${new Date(m.seenAt).toLocaleString()}`;
                row.appendChild(seen);
            }
            bodyEl.appendChild(row);
            body.classList.add('clamp');
            body.style.setProperty('--chat-line-clamp', String(LINE_CLAMP));
            const hasOverflow = body.scrollHeight > body.clientHeight + 1;
            if (hasOverflow || hasHiddenRows) {
                const toggle = document.createElement('button');
                toggle.type = 'button';
                toggle.className = 'chat-toggle-btn';
                toggle.dataset.expanded = '0';
                toggle.textContent = 'Show more';
                toggle.addEventListener('click', () => {
                    const nextExpanded = toggle.dataset.expanded !== '1';
                    body.classList.toggle('clamp', !nextExpanded);
                    body.classList.toggle('expanded', nextExpanded);
                    body.querySelectorAll('tbody tr').forEach((tr, idx) => {
                        if (idx >= TABLE_ROW_CLAMP) {
                            tr.classList.toggle('chat-table-row-hidden', !nextExpanded);
                        }
                    });
                    toggle.dataset.expanded = nextExpanded ? '1' : '0';
                    toggle.textContent = nextExpanded ? 'Show less' : 'Show more';
                });
                actions.appendChild(toggle);
            }
        });
        if (nearBottom) {
            bodyEl.scrollTop = bodyEl.scrollHeight;
        } else {
            const delta = bodyEl.scrollHeight - prevScrollHeight;
            bodyEl.scrollTop = prevScrollTop + delta;
        }
    }

        function showStatus(text) {
        if (!statusEl) return;
        if (!text) {
            statusEl.classList.add('hidden');
            statusEl.textContent = '';
            return;
        }
        statusEl.textContent = text;
        statusEl.classList.remove('hidden');
    }

        function updateDeleteAllVisibility() {
        if (!deleteAllBtn) return;
        const show = current === 'admin';
        deleteAllBtn.classList.toggle('hidden', !show);
        aiSettingsBtn?.classList.toggle('hidden', current !== 'ai');
        pollToggleBtn?.classList.toggle('hidden', current === 'ai');
    }

    function schedulePoll(delay) {
        clearPollTimer();
        if (!pollingEnabled || minimized || current === 'ai') return;
        pollTimer = setTimeout(poll, delay);
    }

        function setBadge(el, count) {
        if (!el) return;
        if (count > 0) {
            el.textContent = String(count);
            el.classList.remove('hidden');
        } else {
            el.textContent = '';
            el.classList.add('hidden');
        }
    }

        async function poll() {
        if (minimized) return;
        if (current === 'ai') return;
        if (document.visibilityState === 'hidden') {
            if (pollingEnabled) schedulePoll(300000);   //300000 ms = 300 seconds = 5 minutes
            return;
        }
        try {
            const currentRes = await fetchMessages(current, true);
            hasNewActivity(current, currentRes);
            render(currentRes.messages);
            const other = current === 'global' ? 'admin' : 'global';
            const otherRes = await fetchMessages(other, false);
            hasNewActivity(other, otherRes);
            if (current === 'global') {
                setBadge(globalBadge, 0);
                setBadge(adminBadge, otherRes.unseenCount);
            } else {
                setBadge(adminBadge, 0);
                setBadge(globalBadge, otherRes.unseenCount);
            }
        } catch {}
        if (pollingEnabled) {
            schedulePoll(networkOk ? 30000 : 300000);   //30000 ms = 30 seconds, 300000 ms = 300 seconds = 5 minutes
        }
    }
        if (!endpoint || !user) {
            showStatus('Chat is unavailable until you login.');
        }
        deleteAllBtn?.addEventListener('click', async () => {
            if (current !== 'admin') return;
            await deleteMessages('user', '', 0, true);
            poll();
        });
        aiSettingsBtn?.addEventListener('click', openAiSettings);
        function copyText(text) {
            if (!text) return;
            if (navigator.clipboard?.writeText) {
                navigator.clipboard.writeText(text).then(() => {
                    showStatus('Copied message.');
                    setTimeout(() => showStatus(''), 1500);
                }).catch(() => {
                    fallbackCopy(text);
                });
            } else {
                fallbackCopy(text);
            }
        }

        function fallbackCopy(text) {
            try {
                const textarea = document.createElement('textarea');
                textarea.value = text;
                textarea.setAttribute('readonly', '');
                textarea.style.position = 'absolute';
                textarea.style.left = '-9999px';
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                textarea.remove();
                showStatus('Copied message.');
                setTimeout(() => showStatus(''), 1500);
            } catch {}
        }

        bodyEl?.addEventListener('click', async (ev) => {
            const copyBtn = ev.target?.closest('.chat-copy-btn');
            if (copyBtn) {
                const item = copyBtn.closest('.chat-item');
                const msgEl = item?.querySelector('.chat-message');
                const msg = msgEl?.dataset.raw || msgEl?.textContent || '';
                copyText(msg);
                return;
            }
            const btn = ev.target?.closest('.chat-delete-btn');
            if (!btn) return;
            const scope = btn.dataset.scope || 'user';
            const id = btn.dataset.id || '';
            const index = Number(btn.dataset.index);
            await deleteMessages(scope, id, index, false);
            poll();
        });
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible' && !minimized && pollingEnabled) {
                poll();
            }
        });
        try {
            const saved = sessionStorage.getItem('chatMinimized') === '1';
            if (saved) setMinimized(true);
        } catch {}
        updatePollingUi();
        updateDeleteAllVisibility();
        primeChatFromCache();
        poll();
    }

    if (user) {
        initChat();
    }
    document.addEventListener('visit-login', (ev) => {
        const name = ev?.detail?.username || sessionStorage.getItem('visitorName') || '';
        if (name && !user) {
            user = name;
            initChat();
        }
    });
})();
