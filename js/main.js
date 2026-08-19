// Shared UI behavior for content pages
(function () {
    'use strict';

    // Helpers
    const $ = (sel, ctx = document) => ctx.querySelector(sel);
    const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

    function safe(fn) {
        try { fn(); } catch (e) { console.error('main.js error:', e); }
    }

    function scrollToAnchorId(id) {
        if (!id) return false;
        const target = document.getElementById(id);
        if (!target) return false;
        const top = window.scrollY + target.getBoundingClientRect().top - 20;
        window.scrollTo({ top, behavior: 'smooth' });
        return true;
    }

    // Gate access if name was not provided on index page
    safe(() => {
        if (sessionStorage.getItem('visitRecorded')) return;
        const current = window.location.href;
        const indexUrl = new URL('../index.html', window.location.href);
        indexUrl.searchParams.set('next', current);
        window.location.replace(indexUrl.toString());
    });

    // Ensure a global logout button is available on every page when a session exists
    safe(() => {
        try {
            if (sessionStorage.getItem('visitRecorded')) {
                if (!document.getElementById('globalLogoutButton')) {
                    const logoutBtn = document.createElement('button');
                    logoutBtn.id = 'globalLogoutButton';
                    logoutBtn.type = 'button';
                    logoutBtn.className = 'logout-button';
                    logoutBtn.textContent = 'Logout';
                    logoutBtn.style.position = 'fixed';
                    logoutBtn.style.top = '12px';
                    logoutBtn.style.right = '12px';
                    logoutBtn.style.zIndex = '200';
                    logoutBtn.addEventListener('click', () => {
                        [
                            'visitRecorded',
                            'visitorName',
                            'knownUser',
                            'visitSessionToken',
                            'welcomeMessage'
                        ].forEach((k) => { try { sessionStorage.removeItem(k); } catch {} });
                        try { window.location.replace('../login.html'); } catch { window.location.href = '../login.html'; }
                    });
                    document.body.appendChild(logoutBtn);
                }
            }
        } catch (e) { /* silent */ }
    });

    // Show welcome banner on content pages (after redirect)
    safe(() => {
        const msg = sessionStorage.getItem('welcomeMessage');
        if (!msg) return;
        const banner = document.createElement('div');
        banner.className = 'welcome-banner';
        banner.textContent = msg;
        document.body.appendChild(banner);
        sessionStorage.removeItem('welcomeMessage');
        setTimeout(() => banner.classList.add('fade'), 3000);
        setTimeout(() => banner.remove(), 4500);
        // Add a global logout button so users can sign out from any page
        try {
            // Only add when a session is present
            if (sessionStorage.getItem('visitRecorded')) {
                if (!document.getElementById('globalLogoutButton')) {
                    const logoutBtn = document.createElement('button');
                    logoutBtn.id = 'globalLogoutButton';
                    logoutBtn.type = 'button';
                    logoutBtn.className = 'logout-button';
                    logoutBtn.textContent = 'Logout';
                    // Ensure the button is visible even if page CSS doesn't include .logout-button
                    logoutBtn.style.position = 'fixed';
                    logoutBtn.style.top = '12px';
                    logoutBtn.style.right = '12px';
                    logoutBtn.style.zIndex = '200';
                    // Click handler: clear known session keys and redirect to login
                    logoutBtn.addEventListener('click', () => {
                        [
                            'visitRecorded',
                            'visitorName',
                            'knownUser',
                            'visitSessionToken',
                            'welcomeMessage'
                        ].forEach((k) => { try { sessionStorage.removeItem(k); } catch {} });
                        try { window.location.replace('../login.html'); } catch { window.location.href = '../login.html'; }
                    });
                    document.body.appendChild(logoutBtn);
                }
            }
        } catch (e) { /* silent */ }
    });

    // Track page views and time on page
    safe(() => {
        const endpoint = window.VISIT_ENDPOINT || '';
        const name = sessionStorage.getItem('visitorName') || '';
        if (!endpoint || !name) return;
        const key = `pv:${window.location.pathname}`;
        const last = Number(sessionStorage.getItem(key) || '0');
        const now = Date.now();
        if (now - last < 30000) return; // 30s throttle per page
        sessionStorage.setItem(key, String(now));
        let geo = null;
        try {
            const raw = sessionStorage.getItem('geo');
            geo = raw ? JSON.parse(raw) : null;
        } catch {}
        const basePayload = {
            eventType: 'page_view',
            name,
            clientTime: new Date().toISOString(),
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || '',
            locale: navigator.language || '',
            page: window.location.href,
            referrer: document.referrer || '',
            userAgent: navigator.userAgent || '',
            geo: geo || undefined,
        };
        fetch(endpoint, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(basePayload),
            keepalive: true,
        }).catch(() => {});

        const start = Date.now();
        let sentExit = false;

        function sendExit() {
            if (sentExit) return;
            sentExit = true;
            const durationMs = Date.now() - start;
            const payload = {
                ...basePayload,
                eventType: 'page_exit',
                durationMs
            };
            const body = JSON.stringify(payload);
            if (navigator.sendBeacon) {
                try {
                    const blob = new Blob([body], { type: 'application/json' });
                    navigator.sendBeacon(endpoint, blob);
                    return;
                } catch {}
            }
            fetch(endpoint, {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body,
                keepalive: true,
            }).catch(() => {});
        }

        window.addEventListener('beforeunload', sendExit);
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'hidden') sendExit();
        });
    });

    // Menu toggle for mobile
    safe(() => {
        const menuToggle = $('#menuToggle');
        const sidebar = $('#sidebar');
        if (menuToggle && sidebar) {
            menuToggle.addEventListener('click', () => {
                sidebar.classList.toggle('open');
                menuToggle.classList.toggle('active');
            });

            // Close sidebar when clicking outside (mobile)
            document.addEventListener('click', (ev) => {
                if (window.innerWidth > 900) return; // only on small screens
                if (!sidebar.classList.contains('open')) return;
                const target = ev.target;
                if (!sidebar.contains(target) && target !== menuToggle) {
                    sidebar.classList.remove('open');
                    menuToggle.classList.remove('active');
                }
            });
        }
    });

    // Smooth scrolling for TOC links
    safe(() => {
        const toc = $('#toc');
        if (!toc) return;
        toc.addEventListener('click', (ev) => {
            const a = ev.target.closest('a');
            if (!a) return;
            const href = a.getAttribute('href');
            if (!href || !href.startsWith('#')) return; // external links can be normal
            ev.preventDefault();
            const id = href.slice(1);
            if (scrollToAnchorId(id)) {
                // close sidebar on small screens
                const sidebar = $('#sidebar');
                const menuToggle = $('#menuToggle');
                if (sidebar && menuToggle && window.innerWidth < 900) {
                    sidebar.classList.remove('open');
                    menuToggle.classList.remove('active');
                }
            } else {
                // If there's no matching id, still try a normal navigation (some toc items link to external URLs)
                const hrefFull = a.getAttribute('href');
                if (hrefFull) window.location.href = hrefFull;
            }
        });
    });

    // Open cross-page and external content links in a new tab
    safe(() => {
        const content = $('#content');
        if (!content) return;

        function normalizeContentLinks() {
            $$('a[href]', content).forEach((link) => {
                const href = (link.getAttribute('href') || '').trim();
                if (!href || href.startsWith('#') || href.toLowerCase().startsWith('javascript:')) {
                    link.removeAttribute('target');
                    const rel = (link.getAttribute('rel') || '')
                        .split(/\s+/)
                        .filter((part) => part && part !== 'noopener' && part !== 'noreferrer')
                        .join(' ');
                    if (rel) link.setAttribute('rel', rel);
                    else link.removeAttribute('rel');
                    return;
                }
                link.setAttribute('target', '_blank');
                link.setAttribute('rel', 'noopener noreferrer');
            });
        }

        normalizeContentLinks();
        const observer = new MutationObserver(() => normalizeContentLinks());
        observer.observe(content, { childList: true, subtree: true });
        window.addEventListener('pageContentLoaded', () => normalizeContentLinks());
    });

    // Code blocks: syntax colors, copy button, and online run modal
    safe(() => {
        const content = $('#content');
        if (!content) return;
        const compilerConfig = {
            endpoint: 'https://ce.judge0.com',
            languageMap: {
                java: { id: 62, label: 'Java' },
                javascript: { id: 63, label: 'JavaScript' },
                js: { id: 63, label: 'JavaScript' },
                python: { id: 71, label: 'Python' },
                py: { id: 71, label: 'Python' },
                c: { id: 50, label: 'C' },
                cpp: { id: 54, label: 'C++' },
                'c++': { id: 54, label: 'C++' }
            }
        };
        let runnerModal = null;
        let runnerTitle = null;
        let runnerStatus = null;
        let runnerEditor = null;
        let runnerInput = null;
        let runnerMeta = null;
        let runnerOutput = null;
        let runnerRunButton = null;
        let runnerVisualizeButton = null;
        let runnerForceVisualizeButton = null;
        let runnerSaveVisualButton = null;
        let runnerHistoryButton = null;
        let runnerAiSettingsButton = null;
        let runnerVisualMode = null;
        let runnerAudienceLevel = null;
        let runnerVisualization = null;
        let runnerHistoryContainer = null;
        let runnerCode = '';
        let runnerLanguage = null;
        let currentVisualization = null;
        let currentVisualizationSource = '';
        let currentVisualizationHistory = [];
        let aiSettingsModal = null;
        let aiProviderHelp = null;
        let aiConfigStatus = null;
        const AI_PREFS_KEY = 'aiVisualPrefs:v1';

        window.AiSettings.init({
            callApi: callVisitApi,
            getUser: getCurrentUser,
            getSessionToken: getSessionToken,
            requiresSessionUpgrade,
            redirectToReLogin
        });

        // Future cleanup
        // function updateAiUiState() {
        //     const hasConfig = window.AiSettings.hasUsableKey();
        //     if (runnerForceVisualizeButton) {
        //         runnerForceVisualizeButton.disabled = !hasConfig;
        //         runnerForceVisualizeButton.textContent = hasConfig ? 'Use AI Again' : 'AI Setup Required';
        //     }
        //     if (runnerSaveVisualButton) runnerSaveVisualButton.disabled = !currentVisualization;
        //     if (runnerVisualization && !hasConfig && !runnerVisualization.innerHTML.trim()) {
        //         runnerVisualization.innerHTML = '<div class="logic-empty">Add AI settings to generate a visual explanation for this program.</div>';
        //     }
        // }
        // window.AiSettings.onChange(updateAiUiState);

        function fallbackCopy(text) {
            const area = document.createElement('textarea');
            area.value = text;
            area.setAttribute('readonly', '');
            area.style.position = 'fixed';
            area.style.opacity = '0';
            document.body.appendChild(area);
            area.select();
            let ok = false;
            try {
                ok = document.execCommand('copy');
            } catch {}
            area.remove();
            return ok;
        }

        function setCopyState(button, label, className) {
            button.textContent = label;
            button.classList.remove('is-copied', 'is-error');
            if (className) button.classList.add(className);
            clearTimeout(button._resetTimer);
            button._resetTimer = setTimeout(() => {
                button.textContent = 'Copy';
                button.classList.remove('is-copied', 'is-error');
            }, 1800);
        }

        function detectCodeLanguage(code) {
            const classes = Array.from(code.classList || []);
            for (const className of classes) {
                const match = className.match(/^language-(.+)$/);
                if (!match) continue;
                const key = match[1].toLowerCase();
                if (compilerConfig.languageMap[key]) {
                    return compilerConfig.languageMap[key];
                }
            }
            return null;
        }

        function normalizeJavaSource(source) {
            if (!source) return source;
            let normalized = source.replace(/\r\n/g, '\n');
            const publicClassMatch = normalized.match(/\bpublic\s+class\s+([A-Za-z_][A-Za-z0-9_]*)/);
            if (publicClassMatch) {
                return normalized.replace(/\bpublic\s+class\s+([A-Za-z_][A-Za-z0-9_]*)/, 'public class Main');
            }

            const packageMatch = normalized.match(/^\s*package\s+[\w.]+\s*;/m);
            if (packageMatch) {
                return normalized;
            }

            const classMatch = normalized.match(/\bclass\s+([A-Za-z_][A-Za-z0-9_]*)/);
            if (classMatch && classMatch[1] !== 'Main') {
                return normalized.replace(/\bclass\s+([A-Za-z_][A-Za-z0-9_]*)/, 'class Main');
            }

            return normalized;
        }

        function prepareSourceForExecution(source, language) {
            if (!language) return source;
            if (language.label === 'Java') {
                return normalizeJavaSource(source);
            }
            return source;
        }

        function getCurrentUser() {
            return sessionStorage.getItem('visitorName') || '';
        }

        function getSessionToken() {
            return sessionStorage.getItem('visitSessionToken') || '';
        }

        function requiresSessionUpgrade() {
            return Boolean(sessionStorage.getItem('visitRecorded') && getCurrentUser() && !getSessionToken());
        }

        function redirectToReLogin(message) {
            if (message) {
                try { sessionStorage.setItem('welcomeMessage', message); } catch {}
            }
            try {
                sessionStorage.removeItem('visitRecorded');
                sessionStorage.removeItem('visitorName');
                sessionStorage.removeItem('knownUser');
                sessionStorage.removeItem('visitSessionToken');
            } catch {}
            const indexUrl = new URL('../index.html', window.location.href);
            indexUrl.searchParams.set('next', window.location.href);
            window.location.replace(indexUrl.toString());
        }

        function readAiPrefs() {
            try {
                const raw = localStorage.getItem(AI_PREFS_KEY);
                return raw ? JSON.parse(raw) : {};
            } catch {
                return {};
            }
        }

        function writeAiPrefs(next) {
            try {
                localStorage.setItem(AI_PREFS_KEY, JSON.stringify(next || {}));
            } catch {}
        }

        async function callVisitApi(payload) {
            const endpoint = window.VISIT_ENDPOINT || '';
            if (!endpoint) throw new Error('VISIT_ENDPOINT is not configured');

            // Don't add Authorization header - it triggers CORS preflight
            // sessionToken is already included in the payload body
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const data = await response.json().catch(() => ({}));
            if (!response.ok) {
                throw new Error(data?.error || data?.detail || `HTTP ${response.status}`);
            }
            return data;
        }

        function setAiConfigStatus(message, isError) {
            if (!aiConfigStatus) return;
            aiConfigStatus.textContent = message || '';
            aiConfigStatus.classList.toggle('is-error', Boolean(isError));
        }



        function updateAiUiState() {
            const hasConfig = window.AiSettings.hasUsableKey();
            if (runnerVisualizeButton) {
                runnerVisualizeButton.disabled = false;
                runnerVisualizeButton.textContent = 'Visualize Logic';
            }
            if (runnerForceVisualizeButton) {
                runnerForceVisualizeButton.disabled = !hasConfig;
                runnerForceVisualizeButton.textContent = hasConfig ? 'Use AI Again' : 'AI Setup Required';
            }
            if (runnerSaveVisualButton) {
                runnerSaveVisualButton.disabled = !currentVisualization;
            }
            if (runnerVisualization && !hasConfig && !runnerVisualization.innerHTML.trim()) {
                runnerVisualization.innerHTML = '<div class="logic-empty">Add AI settings to generate a visual explanation for this program.</div>';
            }
        }
        window.AiSettings.onChange(updateAiUiState);


        function renderVisualization(data) {
            if (!runnerVisualization) return;
            currentVisualization = data && typeof data === 'object' ? data : null;
            if (runnerSaveVisualButton) runnerSaveVisualButton.disabled = !currentVisualization;
            const steps = Array.isArray(data?.steps) ? data.steps : [];
            const flow = Array.isArray(data?.flow) ? data.flow : [];
            if (!steps.length) {
                runnerVisualization.innerHTML = '<div class="logic-empty">No visual steps were returned.</div>';
                return;
            }

            const phaseButtons = steps.map((step, index) => (
                `<button type="button" class="logic-phase-btn${index === 0 ? ' active' : ''}" data-logic-step="${index}">${escapeHtml(step.label || `Step ${index + 1}`)}</button>`
            )).join('');

            const toneClass = (tone) => {
                const value = String(tone || '').trim();
                return value ? ` logic-tone-${escapeHtml(value)}` : '';
            };

            const stateCards = (step) => Array.isArray(step?.state) && step.state.length
                ? step.state.map((entry) => `
                    <div class="logic-state-card">
                        <div class="logic-state-name">${escapeHtml(entry.name || '')}</div>
                        <div class="logic-state-value">${escapeHtml(String(entry.value ?? ''))}</div>
                        <div class="logic-state-role">${escapeHtml(entry.role || '')}</div>
                    </div>
                `).join('')
                : '<div class="logic-empty small">No tracked variables for this step.</div>';

            const stepStats = (step) => Array.isArray(step?.stats) && step.stats.length
                ? step.stats.map((entry) => `
                    <div class="logic-stat-card${toneClass(entry.tone)}">
                        <div class="logic-stat-label">${escapeHtml(entry.label || '')}</div>
                        <div class="logic-stat-value">${escapeHtml(String(entry.value ?? ''))}</div>
                    </div>
                `).join('')
                : '<div class="logic-empty small">No summary metrics for this step.</div>';

            const stepCells = (step) => Array.isArray(step?.cells) && step.cells.length
                ? step.cells.map((entry) => `
                    <div class="logic-cell${toneClass(entry.tone)}">
                        <div class="logic-cell-index">${escapeHtml(entry.index || '')}</div>
                        <div class="logic-cell-value">${escapeHtml(String(entry.value ?? ''))}</div>
                        <div class="logic-cell-tag">${escapeHtml(entry.tag || '')}</div>
                    </div>
                `).join('')
                : '<div class="logic-empty small">No sequence view for this step.</div>';

            const flowHtml = flow.length
                ? flow.map((item) => `<div class="logic-flow-item logic-flow-${escapeHtml(item.type || 'process')}">${escapeHtml(item.text || '')}</div>`).join('')
                : '<div class="logic-empty small">No flow outline returned.</div>';

            const firstExplanation = escapeHtml(steps[0].explanation || '');
            const firstFocus = escapeHtml(steps[0].focus || '');

            runnerVisualization.innerHTML = `
                <div class="logic-visual-shell">
                    <div class="logic-visual-header">
                        <div>
                            <div class="logic-visual-title">${escapeHtml(data.title || 'Program Logic')}</div>
                            <div class="logic-visual-summary">${escapeHtml(data.summary || '')}</div>
                        </div>
                        <div class="logic-complexity">
                            <span>Time: ${escapeHtml(data?.complexity?.time || 'n/a')}</span>
                            <span>Space: ${escapeHtml(data?.complexity?.space || 'n/a')}</span>
                        </div>
                    </div>
                    <div class="logic-phase-row">${phaseButtons}</div>
                    <div class="logic-step-panel">
                        <div class="logic-step-panel-title" data-logic-section>${escapeHtml(steps[0].sectionTitle || 'Current View')}</div>
                        <div class="logic-cell-row" data-logic-cells>${stepCells(steps[0])}</div>
                        <div class="logic-stat-row" data-logic-stats>${stepStats(steps[0])}</div>
                    </div>
                    <div class="logic-step-view">
                        <div class="logic-step-explanation${firstExplanation ? '' : ' hidden'}" data-logic-explanation>${firstExplanation}</div>
                        <div class="logic-step-focus${firstFocus ? '' : ' hidden'}" data-logic-focus>${firstFocus}</div>
                        <div class="logic-state-grid" data-logic-state>${stateCards(steps[0])}</div>
                    </div>
                    <div class="logic-flow-panel">${flowHtml}</div>
                </div>
            `;

            const buttons = runnerVisualization.querySelectorAll('[data-logic-step]');
            const explanation = runnerVisualization.querySelector('[data-logic-explanation]');
            const focus = runnerVisualization.querySelector('[data-logic-focus]');
            const state = runnerVisualization.querySelector('[data-logic-state]');
            const section = runnerVisualization.querySelector('[data-logic-section]');
            const cells = runnerVisualization.querySelector('[data-logic-cells]');
            const stats = runnerVisualization.querySelector('[data-logic-stats]');
            buttons.forEach((button) => {
                button.addEventListener('click', () => {
                    const index = Number(button.dataset.logicStep);
                    const step = steps[index] || steps[0];
                    buttons.forEach((item) => item.classList.toggle('active', item === button));
                    if (section) section.textContent = step?.sectionTitle || 'Current View';
                    if (explanation) {
                        explanation.textContent = step?.explanation || '';
                        explanation.classList.toggle('hidden', !step?.explanation);
                    }
                    if (focus) {
                        focus.textContent = step?.focus || '';
                        focus.classList.toggle('hidden', !step?.focus);
                    }
                    if (state) state.innerHTML = stateCards(step);
                    if (cells) cells.innerHTML = stepCells(step);
                    if (stats) stats.innerHTML = stepStats(step);
                });
            });
        }

        function escapeHtml(value) {
            return String(value || '')
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;');
        }

        async function fetchApprovedVisualization(sourceCode) {
            return callVisitApi({
                eventType: 'ai_visualization_get',
                language: runnerLanguage?.label?.toLowerCase() || '',
                sourceCode
            });
        }

        async function submitVisualizationForApproval() {
            const user = getCurrentUser();
            const sessionToken = getSessionToken();
            if (requiresSessionUpgrade()) {
                redirectToReLogin('Please log in again to use AI features.');
                return;
            }
            if (!user || !sessionToken) {
                if (runnerVisualization) {
                    runnerVisualization.innerHTML = '<div class="logic-empty">Login is required before saving a visualization for approval.</div>';
                }
                return;
            }
            if (!currentVisualization) return;
            const sourceCode = runnerEditor?.value || runnerCode;
            if (runnerStatus) runnerStatus.textContent = 'Submitting visualization for admin approval...';
            try {
                const result = await callVisitApi({
                    eventType: 'ai_visualization_submit',
                    user,
                    sessionToken,
                    language: runnerLanguage?.label?.toLowerCase() || '',
                    sourceCode,
                    visualization: currentVisualization
                });
                if (runnerStatus) {
                    if (result?.duplicate) {
                        const status = String(result?.status || '');
                        runnerStatus.textContent = status === 'approved_exists'
                            ? 'This exact visualization is already approved.'
                            : status === 'rejected'
                                ? 'This exact visualization was already rejected. Submit a changed version.'
                                : 'This exact visualization is already pending approval.';
                    } else {
                        runnerStatus.textContent = 'Visualization submitted for admin approval.';
                    }
                }
            } catch (error) {
                if (runnerStatus) runnerStatus.textContent = error instanceof Error ? error.message : 'Failed to submit visualization.';
            }
        }

        async function fetchVisualizationHistory(sourceCode) {
            return callVisitApi({
                eventType: 'ai_visualization_history',
                language: runnerLanguage?.label?.toLowerCase() || '',
                sourceCode
            });
        }

        function summarizeVisualization(data) {
            const steps = Array.isArray(data?.steps) ? data.steps : [];
            return {
                title: data?.title || 'Program Logic',
                summary: data?.summary || '',
                time: data?.complexity?.time || 'n/a',
                space: data?.complexity?.space || 'n/a',
                stepCount: String(steps.length || 0),
                stepLabels: steps.map((step) => step?.label || '').filter(Boolean).join(', ') || 'n/a'
            };
        }

        function renderVisualizationHistoryComparison(items) {
            if (!runnerHistoryContainer) return;
            if (!items.length) {
                runnerHistoryContainer.innerHTML = '<div class="logic-empty">No approved history yet for this program.</div>';
                return;
            }
            const baseline = currentVisualization || items[0]?.visualization || {};
            const summary = summarizeVisualization(baseline);
            const currentId = items[0]?.id || 'current';
            const optionHtml = items.map((item, index) => {
                const label = index === 0 ? 'Current approved' : `Approved ${index + 1}`;
                const when = item?.approvedAt ? new Date(item.approvedAt).toLocaleString() : '';
                return `<option value="${escapeHtml(item.id || '')}">${escapeHtml(label)}${when ? ` - ${escapeHtml(when)}` : ''}</option>`;
            }).join('');
            runnerHistoryContainer.innerHTML = `
                <div class="logic-history-shell">
                    <div class="logic-history-toolbar">
                        <div class="logic-history-title">Approved History Comparison</div>
                        <select class="code-runner-select logic-history-select" data-history-select>${optionHtml}</select>
                    </div>
                    <div class="logic-history-compare" data-history-compare></div>
                </div>
            `;
            const compareEl = runnerHistoryContainer.querySelector('[data-history-compare]');
            const selectEl = runnerHistoryContainer.querySelector('[data-history-select]');

            const renderCompare = (selectedId) => {
                const selected = items.find((item) => item.id === selectedId) || items[0];
                const other = summarizeVisualization(selected?.visualization || {});
                compareEl.innerHTML = `
                    <div class="logic-history-card">
                        <div class="logic-history-card-title">Current View</div>
                        <div class="logic-history-grid">
                            <div><span>Title</span><strong>${escapeHtml(summary.title)}</strong></div>
                            <div><span>Time</span><strong>${escapeHtml(summary.time)}</strong></div>
                            <div><span>Space</span><strong>${escapeHtml(summary.space)}</strong></div>
                            <div><span>Steps</span><strong>${escapeHtml(summary.stepCount)}</strong></div>
                        </div>
                        <div class="logic-history-body">${escapeHtml(summary.summary)}</div>
                        <div class="logic-history-steps">${escapeHtml(summary.stepLabels)}</div>
                    </div>
                    <div class="logic-history-card">
                        <div class="logic-history-card-title">${escapeHtml(selected?.approvedAt ? `Approved ${new Date(selected.approvedAt).toLocaleDateString()}` : 'Selected History')}</div>
                        <div class="logic-history-grid">
                            <div><span>Title</span><strong>${escapeHtml(other.title)}</strong></div>
                            <div><span>Time</span><strong>${escapeHtml(other.time)}</strong></div>
                            <div><span>Space</span><strong>${escapeHtml(other.space)}</strong></div>
                            <div><span>Steps</span><strong>${escapeHtml(other.stepCount)}</strong></div>
                        </div>
                        <div class="logic-history-body">${escapeHtml(other.summary)}</div>
                        <div class="logic-history-steps">${escapeHtml(other.stepLabels)}</div>
                    </div>
                `;
            };

            renderCompare(currentId);
            if (selectEl) {
                selectEl.value = currentId;
                selectEl.addEventListener('change', () => renderCompare(selectEl.value));
            }
        }

        async function openVisualizationHistory() {
            if (!runnerHistoryContainer) return;
            const sourceCode = runnerEditor?.value || runnerCode;
            runnerHistoryContainer.innerHTML = '<div class="logic-empty">Loading approved history...</div>';
            try {
                const result = await fetchVisualizationHistory(sourceCode);
                currentVisualizationHistory = Array.isArray(result?.items) ? result.items : [];
                renderVisualizationHistoryComparison(currentVisualizationHistory);
            } catch (error) {
                runnerHistoryContainer.innerHTML = `<div class="logic-empty">History failed: ${escapeHtml(error instanceof Error ? error.message : 'Unknown error')}</div>`;
            }
        }

        async function visualizeCurrentCode(forceAi) {
            const user = getCurrentUser();
            const sessionToken = getSessionToken();
            const sourceCode = runnerEditor?.value || runnerCode;
            if (!forceAi) {
                if (runnerVisualization) {
                    runnerVisualization.innerHTML = '<div class="logic-empty">Loading visualization...</div>';
                }
                try {
                    const cached = await fetchApprovedVisualization(sourceCode);
                    if (cached?.found && cached?.visualization) {
                        currentVisualizationSource = 'approved';
                        if (runnerStatus) runnerStatus.textContent = 'Showing approved visualization.';
                        renderVisualization(cached.visualization || {});
                        return;
                    }
                } catch {}
            }
            if (requiresSessionUpgrade()) {
                redirectToReLogin('Please log in again to use AI features.');
                return;
            }
            if (!user || !sessionToken) {
                if (runnerVisualization) {
                    runnerVisualization.innerHTML = '<div class="logic-empty">No approved visualization found. Log in to generate one with AI.</div>';
                }
                return;
            }
            await window.AiSettings.loadConfig(false);
            if (!window.AiSettings.hasUsableKey()) {
                window.AiSettings.open();
                if (runnerVisualization) runnerVisualization.innerHTML = '<div class="logic-empty">No approved visualization found. Save AI settings to generate one.</div>';
                return;
            }
            const prefs = readAiPrefs();
            if (runnerVisualization) {
                runnerVisualization.innerHTML = '<div class="logic-empty">Generating visual explanation...</div>';
            }
            try {
                const result = await callVisitApi({
                    eventType: 'ai_visualize',
                    user,
                    sessionToken,
                    language: runnerLanguage?.label?.toLowerCase() || '',
                    sourceCode,
                    stdin: runnerInput?.value || '',
                    programOutput: runnerOutput?.textContent || '',
                    visualMode: runnerVisualMode?.value || prefs.visualMode || 'step-by-step',
                    audienceLevel: runnerAudienceLevel?.value || prefs.audienceLevel || 'interview'
                });
                currentVisualizationSource = 'ai';
                if (runnerStatus) runnerStatus.textContent = 'AI visualization ready. Save for approval if it looks good.';
                renderVisualization(result?.visualization || {});
            } catch (error) {
                if (runnerVisualization) {
                    let errorTitle = 'Visualization failed';
                    let errorDetail = error instanceof Error ? error.message : 'Unknown error';

                    // If the error is a JSON response with error/detail fields, parse it
                    try {
                        const parsed = typeof error === 'string' ? JSON.parse(error) : error;
                        if (parsed?.error) errorTitle = parsed.error;
                        if (parsed?.detail) errorDetail = parsed.detail;
                    } catch (_) {
                        // not JSON, fall back to error.message as detail
                    }
                    runnerVisualization.innerHTML = `<div class="logic-empty">Visualization failed: ${escapeHtml(errorTitle)}</div>`;
                }
            }
        }

        function ensureRunnerModal() {
            if (runnerModal) return;
            runnerModal = document.createElement('div');
            runnerModal.className = 'code-runner-modal hidden';
            runnerModal.innerHTML = `
                <div class="code-runner-backdrop" data-runner-close="1"></div>
                <section class="code-runner-panel" role="dialog" aria-modal="true" aria-label="Run code">
                    <div class="code-runner-toolbar">
                        <div>
                            <div class="code-runner-title">Run Code</div>
                            <div class="code-runner-status" data-runner-status>Ready</div>
                        </div>
                        <div class="code-runner-actions">
                            <button type="button" class="code-runner-button secondary" data-runner-action="ai-settings">AI Settings</button>
                            <button type="button" class="code-runner-button secondary" data-runner-action="visualize">Visualize Logic</button>
                            <button type="button" class="code-runner-button secondary" data-runner-action="visualize-ai">Use AI Again</button>
                            <button type="button" class="code-runner-button secondary" data-runner-action="save-visual" disabled>Save for Approval</button>
                            <button type="button" class="code-runner-button secondary" data-runner-action="history">History</button>
                            <button type="button" class="code-runner-button secondary" data-runner-action="open-ide">Open IDE</button>
                            <button type="button" class="code-runner-button secondary" data-runner-close="1">Close</button>
                        </div>
                    </div>
                    <div class="code-runner-body">
                        <label class="code-runner-label" for="codeRunnerEditor">Program</label>
                        <textarea id="codeRunnerEditor" class="code-runner-editor" spellcheck="false"></textarea>
                        <label class="code-runner-label" for="codeRunnerInput">Program input</label>
                        <textarea id="codeRunnerInput" class="code-runner-input" placeholder="Optional stdin"></textarea>
                        <div class="code-runner-controls">
                            <select class="code-runner-select" id="codeRunnerVisualMode">
                                <option value="step-by-step">Step by Step</option>
                                <option value="flowchart">Flowchart</option>
                                <option value="dry-run">Dry Run</option>
                            </select>
                            <select class="code-runner-select" id="codeRunnerAudience">
                                <option value="interview">Interview</option>
                                <option value="beginner">Beginner</option>
                                <option value="deep-dive">Deep Dive</option>
                            </select>
                            <button type="button" class="code-runner-button primary" data-runner-action="run">Run</button>
                        </div>
                        <div class="code-runner-output-header">
                            <label class="code-runner-label" for="codeRunnerOutput">Output</label>
                            <div class="code-runner-meta" data-runner-meta></div>
                        </div>
                        <pre id="codeRunnerOutput" class="code-runner-output"></pre>
                        <div class="logic-visual-container" id="logicVisualContainer">
                            <div class="logic-empty">Add AI settings to generate a visual explanation for this program.</div>
                        </div>
                        <div class="logic-history-container" id="logicHistoryContainer"></div>
                    </div>
                </section>
            `;
            document.body.appendChild(runnerModal);
            runnerTitle = runnerModal.querySelector('.code-runner-title');
            runnerStatus = runnerModal.querySelector('[data-runner-status]');
            runnerEditor = runnerModal.querySelector('#codeRunnerEditor');
            runnerInput = runnerModal.querySelector('#codeRunnerInput');
            runnerMeta = runnerModal.querySelector('[data-runner-meta]');
            runnerOutput = runnerModal.querySelector('#codeRunnerOutput');
            runnerRunButton = runnerModal.querySelector('[data-runner-action="run"]');
            runnerVisualizeButton = runnerModal.querySelector('[data-runner-action="visualize"]');
            runnerForceVisualizeButton = runnerModal.querySelector('[data-runner-action="visualize-ai"]');
            runnerSaveVisualButton = runnerModal.querySelector('[data-runner-action="save-visual"]');
            runnerHistoryButton = runnerModal.querySelector('[data-runner-action="history"]');
            runnerAiSettingsButton = runnerModal.querySelector('[data-runner-action="ai-settings"]');
            runnerVisualMode = runnerModal.querySelector('#codeRunnerVisualMode');
            runnerAudienceLevel = runnerModal.querySelector('#codeRunnerAudience');
            runnerVisualization = runnerModal.querySelector('#logicVisualContainer');
            runnerHistoryContainer = runnerModal.querySelector('#logicHistoryContainer');

            const prefs = readAiPrefs();
            if (runnerVisualMode && prefs.visualMode) runnerVisualMode.value = prefs.visualMode;
            if (runnerAudienceLevel && prefs.audienceLevel) runnerAudienceLevel.value = prefs.audienceLevel;
            runnerVisualMode?.addEventListener('change', () => writeAiPrefs({
                ...readAiPrefs(),
                visualMode: runnerVisualMode.value,
                audienceLevel: runnerAudienceLevel?.value || 'interview'
            }));
            runnerAudienceLevel?.addEventListener('change', () => writeAiPrefs({
                ...readAiPrefs(),
                visualMode: runnerVisualMode?.value || 'step-by-step',
                audienceLevel: runnerAudienceLevel.value
            }));

            runnerModal.addEventListener('click', (ev) => {
                if (ev.target.closest('[data-runner-close="1"]')) {
                    closeRunnerModal();
                    return;
                }
                const action = ev.target.closest('[data-runner-action]')?.dataset.runnerAction;
                if (action === 'run') {
                    runCurrentCode();
                } else if (action === 'visualize') {
                    visualizeCurrentCode(false);
                } else if (action === 'visualize-ai') {
                    visualizeCurrentCode(true);
                } else if (action === 'save-visual') {
                    submitVisualizationForApproval();
                } else if (action === 'history') {
                    openVisualizationHistory();
                } else if (action === 'ai-settings') {
                    window.AiSettings.open();
                } else if (action === 'open-ide') {
                    openJudge0Ide();
                }
            });

            document.addEventListener('keydown', (ev) => {
                if (ev.key === 'Escape' && runnerModal && !runnerModal.classList.contains('hidden')) {
                    closeRunnerModal();
                }
            });
        }

        function setRunnerState(statusText, outputText, isRunning) {
            if (runnerStatus) runnerStatus.textContent = statusText;
            if (typeof outputText === 'string' && runnerOutput) runnerOutput.textContent = outputText;
            if (runnerRunButton) {
                runnerRunButton.disabled = Boolean(isRunning);
                runnerRunButton.textContent = isRunning ? 'Running...' : 'Run';
            }
        }

        function setRunnerMeta(data) {
            if (!runnerMeta) return;
            if (!data) {
                runnerMeta.textContent = '';
                runnerMeta.classList.remove('has-meta');
                return;
            }

            const parts = [];
            if (data.statusText) parts.push(`Status: ${data.statusText}`);
            if (typeof data.time !== 'undefined' && data.time !== null && data.time !== '') {
                parts.push(`Time: ${data.time}s`);
            }
            if (typeof data.memory !== 'undefined' && data.memory !== null && data.memory !== '') {
                parts.push(`Memory: ${data.memory} KB`);
            }

            runnerMeta.textContent = parts.join(' | ');
            runnerMeta.classList.toggle('has-meta', parts.length > 0);
        }

        function openRunnerModal(codeText, language) {
            ensureRunnerModal();
            runnerCode = codeText;
            runnerLanguage = language;
            currentVisualization = null;
            currentVisualizationSource = '';
            currentVisualizationHistory = [];
            runnerTitle.textContent = `Run ${language.label}`;
            if (runnerEditor) runnerEditor.value = codeText;
            setRunnerMeta(null);
            setRunnerState(`Ready to run on Judge0 CE (${language.label})`, '', false);
            runnerModal.classList.remove('hidden');
            document.body.classList.add('code-runner-open');
            if (runnerVisualization) {
                runnerVisualization.innerHTML = '<div class="logic-empty">Check approved visualization or use AI to generate one.</div>';
            }
            if (runnerHistoryContainer) {
                runnerHistoryContainer.innerHTML = '';
            }
            window.AiSettings.loadConfig(false)
                .then(updateAiUiState)
                .catch(updateAiUiState);
            updateAiUiState();
            setTimeout(() => runnerEditor?.focus(), 0);
        }

        function closeRunnerModal() {
            if (!runnerModal) return;
            runnerModal.classList.add('hidden');
            document.body.classList.remove('code-runner-open');
        }

        function formatExecutionResult(data) {
            const sections = [];
            if (data?.compile_output) {
                sections.push(`Compile Output:\n${data.compile_output}`);
            }
            if (data?.stderr) {
                sections.push(`Error:\n${data.stderr}`);
            }
            if (data?.message) {
                sections.push(`Message:\n${data.message}`);
            }
            if (data?.stdout) {
                sections.push(`Output:\n${data.stdout}`);
            }
            if (sections.length === 1) {
                sections.push('No output.');
            }
            return sections.join('\n\n');
        }

        async function createSubmission(payload) {
            const response = await fetch(`${compilerConfig.endpoint}/submissions/?base64_encoded=false&wait=false`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const data = await response.json().catch(() => ({}));
            if (!response.ok || !data?.token) {
                throw new Error(data?.message || data?.error || `Submission failed (${response.status})`);
            }
            return data.token;
        }

        async function pollSubmission(token) {
            const fields = [
                'stdout',
                'stderr',
                'compile_output',
                'message',
                'status',
                'time',
                'memory'
            ].join(',');
            for (let attempt = 0; attempt < 20; attempt++) {
                await new Promise((resolve) => setTimeout(resolve, attempt === 0 ? 800 : 1200));
                const response = await fetch(`${compilerConfig.endpoint}/submissions/${encodeURIComponent(token)}?base64_encoded=false&fields=${fields}`);
                const data = await response.json().catch(() => ({}));
                if (!response.ok) {
                    throw new Error(data?.message || `Status check failed (${response.status})`);
                }
                const statusId = data?.status?.id;
                if (statusId !== 1 && statusId !== 2) {
                    return data;
                }
                setRunnerState(`Running on Judge0 CE (${data?.status?.description || 'Processing'})`, runnerOutput?.textContent || '', true);
            }
            throw new Error('Execution timed out while waiting for Judge0 CE.');
        }

        async function runCurrentCode() {
            if (!runnerLanguage) return;
            const sourceToRun = runnerEditor?.value || runnerCode;
            setRunnerState(`Submitting ${runnerLanguage.label} code to Judge0 CE...`, 'Waiting for execution...', true);
            setRunnerMeta({ statusText: 'Submitting' });
            try {
                const token = await createSubmission({
                    source_code: prepareSourceForExecution(sourceToRun, runnerLanguage),
                    language_id: runnerLanguage.id,
                    stdin: runnerInput?.value || ''
                });
                setRunnerState(`Submission accepted. Waiting for Judge0 CE result...`, runnerOutput?.textContent || '', true);
                setRunnerMeta({ statusText: 'Queued' });
                const result = await pollSubmission(token);
                setRunnerMeta({
                    statusText: result?.status?.description || 'Completed',
                    time: result?.time,
                    memory: result?.memory
                });
                setRunnerState(`Finished: ${result?.status?.description || 'Completed'}`, formatExecutionResult(result), false);
            } catch (error) {
                const message = error instanceof Error ? error.message : 'Execution failed.';
                setRunnerMeta({ statusText: 'Error' });
                setRunnerState(
                    'Unable to run code',
                    `${message}\n\nIf the public Judge0 instance is unavailable, switch to your own Judge0 host in js/main.js.`,
                    false
                );
            }
        }

        function openJudge0Ide() {
            if (!runnerLanguage) return;
            const sourceToOpen = runnerEditor?.value || runnerCode;
            const url = new URL('https://ide.judge0.com/');
            url.searchParams.set('source_code', sourceToOpen);
            url.searchParams.set('language_id', String(runnerLanguage.id));
            url.searchParams.set('stdin', runnerInput?.value || '');
            window.open(url.toString(), '_blank', 'noopener,noreferrer');
        }

        function ensureCodeBlocks(root) {
            $$('pre', root).forEach((pre) => {
                const code = $('code', pre);
                if (!code) return;
                if (!pre.parentElement || !pre.parentElement.classList.contains('code-block-shell')) {
                    const shell = document.createElement('div');
                    shell.className = 'code-block-shell';
                    const actions = document.createElement('div');
                    actions.className = 'code-block-actions';
                    const button = document.createElement('button');
                    button.type = 'button';
                    button.className = 'code-copy-button';
                    button.textContent = 'Copy';
                    button.setAttribute('aria-label', 'Copy code block');
                    button.addEventListener('click', async () => {
                        const raw = code.textContent || '';
                        try {
                            if (navigator.clipboard && navigator.clipboard.writeText) {
                                await navigator.clipboard.writeText(raw);
                            } else if (!fallbackCopy(raw)) {
                                throw new Error('Copy failed');
                            }
                            setCopyState(button, 'Copied', 'is-copied');
                        } catch {
                            setCopyState(button, 'Retry', 'is-error');
                        }
                    });
                    actions.appendChild(button);

                    const runLanguage = detectCodeLanguage(code);
                    if (runLanguage) {
                        const runButton = document.createElement('button');
                        runButton.type = 'button';
                        runButton.className = 'code-run-button';
                        runButton.textContent = 'Run';
                        runButton.setAttribute('aria-label', `Run ${runLanguage.label} code`);
                        runButton.addEventListener('click', () => {
                            openRunnerModal(code.textContent || '', runLanguage);
                        });
                        actions.appendChild(runButton);
                    }

                    pre.parentNode.insertBefore(shell, pre);
                    shell.appendChild(actions);
                    shell.appendChild(pre);
                }
                if (window.hljs && typeof window.hljs.highlightElement === 'function') {
                    window.hljs.highlightElement(code);
                }
            });
        }

        window.enhanceCodeBlocks = ensureCodeBlocks;
        ensureCodeBlocks(content);

        const observer = new MutationObserver(() => ensureCodeBlocks(content));
        observer.observe(content, { childList: true, subtree: true });
        window.addEventListener('pageContentLoaded', () => ensureCodeBlocks(content));
    });

    // Preview same-page and cross-page section links on hover
    safe(() => {
        const content = $('#content');
        if (!content) return;

        let preview = null;
        let previewBody = null;
        let previewTitle = null;
        let activeLink = null;
        let hideTimer = null;
        let previewRequestId = 0;
        const remotePreviewCache = new Map();

        function ensurePreview() {
            if (preview) return;
            preview = document.createElement('aside');
            preview.className = 'anchor-preview hidden';
            preview.innerHTML = `
                <div class="anchor-preview-title"></div>
                <div class="anchor-preview-body"></div>
            `;
            document.body.appendChild(preview);
            previewTitle = preview.querySelector('.anchor-preview-title');
            previewBody = preview.querySelector('.anchor-preview-body');

            preview.addEventListener('mouseenter', () => {
                if (hideTimer) {
                    clearTimeout(hideTimer);
                    hideTimer = null;
                }
            });

            preview.addEventListener('mouseleave', () => scheduleHide());
        }

        function isSectionHeading(node) {
            return Boolean(node?.tagName && /^H[1-6]$/.test(node.tagName));
        }

        function getHeadingLevel(node) {
            return isSectionHeading(node) ? Number(node.tagName.slice(1)) : 7;
        }

        function stripCloneIds(root) {
            if (!root?.querySelectorAll) return;
            if (root.id) root.removeAttribute('id');
            root.querySelectorAll('[id]').forEach((el) => el.removeAttribute('id'));
        }

        function buildSectionFragment(target) {
            const fragment = document.createDocumentFragment();
            const startLevel = getHeadingLevel(target);
            let node = target;
            while (node) {
                if (node !== target && isSectionHeading(node) && getHeadingLevel(node) <= startLevel) break;
                const clone = node.cloneNode(true);
                stripCloneIds(clone);
                fragment.appendChild(clone);
                node = node.nextElementSibling;
            }
            return fragment;
        }

        function positionPreview(link) {
            if (!preview) return;
            const rect = link.getBoundingClientRect();
            const viewportPad = 16;
            const preferredWidth = Math.min(520, Math.max(360, Math.floor(window.innerWidth * 0.34)));
            preview.style.width = `${preferredWidth}px`;
            preview.style.maxWidth = `calc(100vw - ${viewportPad * 2}px)`;
            preview.style.visibility = 'hidden';
            preview.classList.remove('hidden');

            const box = preview.getBoundingClientRect();
            let left = rect.right + 14;
            if (left + box.width > window.innerWidth - viewportPad) {
                left = rect.left - box.width - 14;
            }
            if (left < viewportPad) {
                left = Math.max(viewportPad, window.innerWidth - box.width - viewportPad);
            }

            let top = rect.top;
            if (top + box.height > window.innerHeight - viewportPad) {
                top = window.innerHeight - box.height - viewportPad;
            }
            top = Math.max(viewportPad, top);

            preview.style.left = `${left}px`;
            preview.style.top = `${top}px`;
            preview.style.visibility = 'visible';
        }

        function hidePreview() {
            activeLink = null;
            if (!preview) return;
            preview.classList.add('hidden');
            preview.style.visibility = '';
        }

        function scheduleHide() {
            if (hideTimer) clearTimeout(hideTimer);
            hideTimer = setTimeout(() => hidePreview(), 120);
        }

        function parseRemoteRoot(html) {
            const root = document.createElement('div');
            root.innerHTML = html || '';
            return root;
        }

        function getSectionTarget(root, id) {
            if (!root) return null;
            if (id) return root.querySelector(`#${CSS.escape(id)}`);
            return root.querySelector('h1, h2, h3, h4, h5, h6');
        }

        function resolvePreviewLink(link) {
            const href = (link.getAttribute('href') || '').trim();
            if (!href || href.toLowerCase().startsWith('javascript:')) return null;
            if (href.startsWith('#')) {
                const id = href.slice(1);
                if (!id) return null;
                return { type: 'local', id };
            }
            try {
                const url = new URL(href, window.location.href);
                if (url.origin !== window.location.origin) return null;
                if (!url.pathname.toLowerCase().endsWith('.html')) return null;
                const fileName = url.pathname.split('/').pop() || '';
                const pageName = fileName.replace(/\.html$/i, '');
                if (!pageName) return null;
                return {
                    type: 'remote',
                    page: pageName,
                    id: url.hash ? decodeURIComponent(url.hash.slice(1)) : ''
                };
            } catch {
                return null;
            }
        }

        function fetchRemotePreviewHtml(page) {
            if (remotePreviewCache.has(page)) {
                return Promise.resolve(remotePreviewCache.get(page));
            }
            const endpoint = window.VISIT_ENDPOINT || '';
            if (!endpoint) return Promise.resolve('');
            return fetch(endpoint, {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({
                    eventType: 'page_content',
                    page,
                    kind: 'content'
                })
            }).then((resp) => {
                if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
                return resp.json();
            }).then((data) => {
                const html = data && data.html ? data.html : '';
                remotePreviewCache.set(page, html);
                return html;
            }).catch(() => '');
        }

        function renderPreview(link, title, fragment) {
            ensurePreview();
            if (hideTimer) {
                clearTimeout(hideTimer);
                hideTimer = null;
            }
            activeLink = link;
            previewTitle.textContent = title || 'Preview';
            previewBody.innerHTML = '';
            if (fragment) previewBody.appendChild(fragment);
            positionPreview(link);
        }

        async function showPreview(link) {
            const target = resolvePreviewLink(link);
            if (!target) return;
            const requestId = ++previewRequestId;

            if (target.type === 'local') {
                const localTarget = document.getElementById(target.id);
                if (!localTarget) return;
                renderPreview(link, localTarget.textContent.trim() || target.id, buildSectionFragment(localTarget));
                return;
            }

            ensurePreview();
            if (hideTimer) {
                clearTimeout(hideTimer);
                hideTimer = null;
            }
            activeLink = link;
            previewTitle.textContent = 'Loading preview...';
            previewBody.innerHTML = '<p>Loading linked section...</p>';
            positionPreview(link);

            const html = await fetchRemotePreviewHtml(target.page);
            if (requestId !== previewRequestId || activeLink !== link) return;
            if (!html) {
                previewTitle.textContent = 'Preview unavailable';
                previewBody.innerHTML = '<p>Unable to load the linked page preview.</p>';
                positionPreview(link);
                return;
            }

            const root = parseRemoteRoot(html);
            const remoteTarget = getSectionTarget(root, target.id);
            if (!remoteTarget) {
                previewTitle.textContent = 'Preview unavailable';
                previewBody.innerHTML = '<p>The linked section was not found.</p>';
                positionPreview(link);
                return;
            }

            renderPreview(link, remoteTarget.textContent.trim() || target.page, buildSectionFragment(remoteTarget));
        }

        function getPreviewableContentLink(source) {
            const link = source?.closest?.('#content a[href]');
            if (!link) return null;
            return resolvePreviewLink(link) ? link : null;
        }

        content.addEventListener('mouseover', (ev) => {
            const link = getPreviewableContentLink(ev.target);
            if (!link) return;
            showPreview(link);
        });

        content.addEventListener('mouseout', (ev) => {
            const link = getPreviewableContentLink(ev.target);
            if (!link || link !== activeLink) return;
            const next = ev.relatedTarget;
            if (preview?.contains(next)) return;
            scheduleHide();
        });

        content.addEventListener('focusin', (ev) => {
            const link = getPreviewableContentLink(ev.target);
            if (!link) return;
            showPreview(link);
        });

        content.addEventListener('focusout', (ev) => {
            const link = getPreviewableContentLink(ev.target);
            if (!link || link !== activeLink) return;
            const next = ev.relatedTarget;
            if (preview?.contains(next)) return;
            scheduleHide();
        });

        content.addEventListener('click', (ev) => {
            const link = getPreviewableContentLink(ev.target);
            if (!link) return;
            const target = resolvePreviewLink(link);
            if (!target || target.type !== 'local') return;
            const didScroll = scrollToAnchorId(target.id);
            if (!didScroll) return;
            ev.preventDefault();
            try {
                history.pushState(null, '', `#${target.id}`);
            } catch {
                window.location.hash = target.id;
            }
            hidePreview();
        });

        window.addEventListener('scroll', () => hidePreview(), { passive: true });
        window.addEventListener('resize', () => hidePreview());
    });

    // Scroll-to-top button
    safe(() => {
        const scrollTop = $('#scrollTop');
        if (!scrollTop) return;
        const showAt = 300;
        function update() {
            if (window.scrollY > showAt) scrollTop.classList.add('visible');
            else scrollTop.classList.remove('visible');
        }
        window.addEventListener('scroll', throttle(update, 100));
        update();
        scrollTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    });

    // Expand/Collapse all <details>
    safe(() => {
        let toggleBtn = null;
        let initializedOpen = false;

        function getDetails() {
            return $$('details');
        }

        function allOpen(details) {
            return details.length > 0 && details.every((d) => d.hasAttribute('open'));
        }

        function updateLabel(details) {
            if (!toggleBtn) return;
            const label = allOpen(details) ? 'Minimize All' : 'Maximize All';
            toggleBtn.textContent = label;
            toggleBtn.setAttribute('aria-label', label);
        }

        function ensureButton() {
            if (toggleBtn) return toggleBtn;
            toggleBtn = document.createElement('button');
            toggleBtn.id = 'detailsToggle';
            toggleBtn.className = 'details-toggle';
            toggleBtn.type = 'button';
            toggleBtn.textContent = 'Maximize All';
            toggleBtn.setAttribute('aria-label', 'Maximize All');
            toggleBtn.style.position = 'fixed';
            toggleBtn.style.top = '52px';
            toggleBtn.style.right = '12px';
            toggleBtn.style.zIndex = '9998';
            document.body.appendChild(toggleBtn);
            return toggleBtn;
        }

        function setup() {
            const details = getDetails();
            if (!details.length) return;
            const btn = ensureButton();

            if (!initializedOpen) {
                details.forEach((d) => d.setAttribute('open', ''));
                initializedOpen = true;
            }

            updateLabel(details);

            if (!btn.dataset.bound) {
                btn.addEventListener('click', () => {
                    const current = getDetails();
                    const openAll = !allOpen(current);
                    current.forEach((d) => {
                        if (openAll) d.setAttribute('open', '');
                        else d.removeAttribute('open');
                    });
                    updateLabel(current);
                });
                btn.dataset.bound = 'true';
            }

            details.forEach((d) => {
                if (d.dataset.boundToggle) return;
                d.addEventListener('toggle', () => updateLabel(getDetails()));
                d.dataset.boundToggle = 'true';
            });
        }

        setup();

        const content = $('#content');
        if (content) {
            const observer = new MutationObserver(() => setup());
            observer.observe(content, { childList: true, subtree: true });
        }
    });

    // Mermaid diagrams (supports both .mermaid blocks and code.language-mermaid)
    safe(() => {
        const content = $('#content');
        if (!content) return;
        let mermaidLoaded = false;
        let mermaidLoading = false;

        function ensureMermaid(cb) {
            if (mermaidLoaded && window.mermaid) {
                cb();
                return;
            }
            if (mermaidLoading) return;
            mermaidLoading = true;
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js';
            script.async = true;
            script.onload = () => {
                mermaidLoaded = true;
                mermaidLoading = false;
                if (window.mermaid && window.mermaid.initialize) {
                    window.mermaid.initialize({ startOnLoad: false, theme: 'dark' });
                }
                cb();
            };
            script.onerror = () => { mermaidLoading = false; };
            document.head.appendChild(script);
        }

        function normalizeMermaidBlocks() {
            const codeBlocks = $$('pre > code.language-mermaid', content);
            codeBlocks.forEach((code) => {
                const pre = code.parentElement;
                const div = document.createElement('div');
                div.className = 'mermaid';
                div.textContent = code.textContent;
                pre.replaceWith(div);
            });
        }

        let modal = null;
        let modalViewport = null;
        let modalStage = null;
        let modalTitle = null;
        const modalState = { scale: 1, index: 0, baseWidth: 1, baseHeight: 1 };

        function clampScale(value) {
            return Math.max(0.4, Math.min(3, value));
        }

        function getSvgMetrics(svg) {
            if (!svg) return { width: 1, height: 1 };
            const width = svg.viewBox?.baseVal?.width || svg.width?.baseVal?.value || svg.getBoundingClientRect().width || 1;
            const height = svg.viewBox?.baseVal?.height || svg.height?.baseVal?.value || svg.getBoundingClientRect().height || 1;
            return { width, height };
        }

        function ensureModal() {
            if (modal) return;
            modal = document.createElement('div');
            modal.className = 'mermaid-modal hidden';
            modal.innerHTML = `
                <div class="mermaid-modal-backdrop" data-mermaid-close="1"></div>
                <section class="mermaid-modal-panel" role="dialog" aria-modal="true" aria-label="Mermaid diagram viewer">
                    <div class="mermaid-modal-toolbar">
                        <span class="mermaid-modal-title" data-mermaid-title>Diagram</span>
                        <div class="mermaid-modal-actions">
                            <button type="button" class="mermaid-tool-btn" data-action="zoom-out" aria-label="Zoom out">-</button>
                            <button type="button" class="mermaid-tool-btn" data-action="zoom-in" aria-label="Zoom in">+</button>
                            <button type="button" class="mermaid-tool-btn" data-action="fit" aria-label="Fit diagram">Fit</button>
                            <button type="button" class="mermaid-tool-btn" data-action="reset" aria-label="Reset zoom">Reset</button>
                            <button type="button" class="mermaid-tool-btn" data-action="download" aria-label="Download SVG">SVG</button>
                            <button type="button" class="mermaid-tool-btn mermaid-close-btn" data-mermaid-close="1" aria-label="Close diagram">Close</button>
                        </div>
                    </div>
                    <div class="mermaid-modal-viewport">
                        <div class="mermaid-modal-stage"></div>
                    </div>
                </section>
            `;
            document.body.appendChild(modal);
            modalViewport = modal.querySelector('.mermaid-modal-viewport');
            modalStage = modal.querySelector('.mermaid-modal-stage');
            modalTitle = modal.querySelector('[data-mermaid-title]');

            modal.addEventListener('click', (ev) => {
                const action = ev.target.closest('[data-action]')?.dataset.action;
                if (action === 'zoom-in') return zoomModal(0.15);
                if (action === 'zoom-out') return zoomModal(-0.15);
                if (action === 'fit') return fitModal();
                if (action === 'reset') return resetModal();
                if (action === 'download') return downloadModal();
                if (ev.target.closest('[data-mermaid-close="1"]')) closeModal();
            });

            modalViewport.addEventListener('wheel', (ev) => {
                if (!ev.ctrlKey) return;
                ev.preventDefault();
                zoomModal(ev.deltaY < 0 ? 0.1 : -0.1);
            }, { passive: false });

            let dragActive = false;
            let startX = 0;
            let startY = 0;
            let startLeft = 0;
            let startTop = 0;

            modalViewport.addEventListener('pointerdown', (ev) => {
                if (ev.button !== 0) return;
                if (!ev.target.closest('svg')) return;
                dragActive = true;
                startX = ev.clientX;
                startY = ev.clientY;
                startLeft = modalViewport.scrollLeft;
                startTop = modalViewport.scrollTop;
                modalViewport.classList.add('is-dragging');
                modalViewport.setPointerCapture(ev.pointerId);
                ev.preventDefault();
            });

            modalViewport.addEventListener('pointermove', (ev) => {
                if (!dragActive) return;
                modalViewport.scrollLeft = startLeft - (ev.clientX - startX);
                modalViewport.scrollTop = startTop - (ev.clientY - startY);
            });

            function stopDrag(ev) {
                if (!dragActive) return;
                dragActive = false;
                modalViewport.classList.remove('is-dragging');
                try { modalViewport.releasePointerCapture(ev.pointerId); } catch {}
            }

            modalViewport.addEventListener('pointerup', stopDrag);
            modalViewport.addEventListener('pointercancel', stopDrag);

            document.addEventListener('keydown', (ev) => {
                if (ev.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
                    closeModal();
                }
            });
        }

        function getModalDiagram() {
            return modalStage?.querySelector('.mermaid-modal-diagram') || null;
        }

        function updateModalScale() {
            const diagram = getModalDiagram();
            const svg = diagram?.querySelector('svg');
            if (!diagram || !svg) return;
            svg.style.width = `${modalState.baseWidth * modalState.scale}px`;
            svg.style.height = `${modalState.baseHeight * modalState.scale}px`;
        }

        function fitModal() {
            const diagram = getModalDiagram();
            const svg = diagram?.querySelector('svg');
            if (!diagram || !svg || !modalViewport) return;
            const metrics = getSvgMetrics(svg);
            const viewportWidth = Math.max(modalViewport.clientWidth - 36, 320);
            modalState.baseWidth = metrics.width;
            modalState.baseHeight = metrics.height;
            modalState.scale = clampScale(viewportWidth / metrics.width);
            updateModalScale();
            modalViewport.scrollLeft = 0;
            modalViewport.scrollTop = 0;
        }

        function resetModal() {
            modalState.scale = 1;
            updateModalScale();
            if (modalViewport) {
                modalViewport.scrollLeft = 0;
                modalViewport.scrollTop = 0;
            }
        }

        function zoomModal(delta) {
            modalState.scale = clampScale(modalState.scale + delta);
            updateModalScale();
        }

        function downloadModal() {
            const svg = modalStage?.querySelector('svg');
            if (!svg) return;
            const serializer = new XMLSerializer();
            let source = serializer.serializeToString(svg);
            if (!source.includes('xmlns=')) {
                source = source.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
            }
            const blob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `mermaid-diagram-${modalState.index + 1}.svg`;
            document.body.appendChild(link);
            link.click();
            link.remove();
            setTimeout(() => URL.revokeObjectURL(url), 1000);
        }

        function closeModal() {
            if (!modal) return;
            modal.classList.add('hidden');
            document.body.classList.remove('mermaid-modal-open');
            if (modalStage) modalStage.innerHTML = '';
        }

        function openModal(node, index) {
            ensureModal();
            const svg = node.querySelector('svg');
            if (!svg) return;
            modalState.index = index;
            const metrics = getSvgMetrics(svg);
            modalState.baseWidth = metrics.width;
            modalState.baseHeight = metrics.height;
            if (modalTitle) modalTitle.textContent = `Diagram ${index + 1}`;
            modalStage.innerHTML = '';
            const diagram = document.createElement('div');
            diagram.className = 'mermaid-modal-diagram';
            const clone = svg.cloneNode(true);
            clone.removeAttribute('style');
            clone.style.width = `${modalState.baseWidth}px`;
            clone.style.height = `${modalState.baseHeight}px`;
            diagram.appendChild(clone);
            modalStage.appendChild(diagram);
            modal.classList.remove('hidden');
            document.body.classList.add('mermaid-modal-open');
            requestAnimationFrame(() => fitModal());
        }

        function wrapInlineNode(node, index) {
            if (node.closest('.mermaid-shell')) return;
            const shell = document.createElement('section');
            shell.className = 'mermaid-shell';
            shell.innerHTML = `
                <button type="button" class="mermaid-open-btn" aria-label="Open Mermaid diagram">Open</button>
                <div class="mermaid-inline-stage"></div>
                <div class="mermaid-inline-hint">Click diagram to expand</div>
            `;
            const parent = node.parentNode;
            parent.replaceChild(shell, node);
            shell.querySelector('.mermaid-inline-stage').appendChild(node);
            shell.addEventListener('click', (ev) => {
                if (!ev.target.closest('.mermaid-open-btn') && !ev.target.closest('.mermaid') && !ev.target.closest('svg')) return;
                openModal(node, index);
            });
        }

        function fitInline(node) {
            const svg = node.querySelector('svg');
            if (!svg) return;
            const shell = node.closest('.mermaid-shell');
            const stage = shell?.querySelector('.mermaid-inline-stage');
            const metrics = getSvgMetrics(svg);
            const availableWidth = Math.max((stage?.clientWidth || node.clientWidth || metrics.width) - 4, 240);
            const maxPreviewHeight = Math.max(Math.min(window.innerHeight * 0.5, 520), 220);
            const scale = Math.min(1, availableWidth / metrics.width, maxPreviewHeight / metrics.height);
            svg.style.display = 'block';
            svg.style.width = `${Math.max(1, metrics.width * scale)}px`;
            svg.style.height = `${Math.max(1, metrics.height * scale)}px`;
            svg.style.maxWidth = '100%';
        }

        function enhanceRenderedNodes() {
            const nodes = $$('.mermaid', content);
            nodes.forEach((node, index) => {
                if (!node.querySelector('svg')) return;
                wrapInlineNode(node, index);
                fitInline(node);
            });
        }

        function renderMermaid() {
            normalizeMermaidBlocks();
            const nodes = $$('.mermaid', content);
            if (!nodes.length) return;
            ensureMermaid(() => {
                if (!window.mermaid) return;
                let renderResult = null;
                if (typeof window.mermaid.run === 'function') {
                    renderResult = window.mermaid.run({ nodes });
                } else if (typeof window.mermaid.init === 'function') {
                    renderResult = window.mermaid.init(undefined, nodes);
                }
                Promise.resolve(renderResult).finally(() => enhanceRenderedNodes());
            });
        }

        const observer = new MutationObserver(() => renderMermaid());
        observer.observe(content, { childList: true, subtree: true });
        document.addEventListener('DOMContentLoaded', () => setTimeout(renderMermaid, 200));
        renderMermaid();
    });

    // Active TOC highlighting based on scroll position
    safe(() => {
        let tocScrollHandler = null;
        let tocResizeHandler = null;
        let searchScrolled = false;
        const searchQuery = (() => {
            try { return new URLSearchParams(window.location.search).get('q') || ''; } catch {}
            return '';
        })();

        function setupActiveToc() {
            const toc = $('#toc');
            const content = $('#content');
            if (!toc || !content) return;
            const headings = $$('h1, h2, h3, h4', content).filter(h => h.id);
            if (!headings.length) return;

            const tocItems = $$('a.toc-item', toc).reduce((map, a) => {
                const key = a.dataset.target || a.getAttribute('href')?.slice(1);
                if (key) map[key] = a;
                return map;
            }, {});

            function onScroll() {
                const offset = 120; // how far from top to consider active
                const scrollPos = window.scrollY + offset;
                let currentId = headings[0].id;
                for (let i = 0; i < headings.length; i++) {
                    const h = headings[i];
                    if (h.offsetTop <= scrollPos) currentId = h.id;
                    else break;
                }
                // Clear previous
                $$('.toc-item', toc).forEach(a => a.classList.remove('active'));
                const active = tocItems[currentId];
                if (active) {
                    active.classList.add('active');
                    const scrollHost = active.closest('.sidebar') || toc;
                    const hostRect = scrollHost.getBoundingClientRect();
                    const itemRect = active.getBoundingClientRect();
                    const topPadding = 20;
                    const bottomPadding = 20;
                    if (itemRect.top < hostRect.top + topPadding) {
                        scrollHost.scrollTop -= (hostRect.top + topPadding - itemRect.top);
                    } else if (itemRect.bottom > hostRect.bottom - bottomPadding) {
                        scrollHost.scrollTop += (itemRect.bottom - (hostRect.bottom - bottomPadding));
                    }
                }
            }

            if (tocScrollHandler) window.removeEventListener('scroll', tocScrollHandler);
            if (tocResizeHandler) window.removeEventListener('resize', tocResizeHandler);
            tocScrollHandler = throttle(onScroll, 100);
            tocResizeHandler = throttle(onScroll, 200);
            window.addEventListener('scroll', tocScrollHandler);
            window.addEventListener('resize', tocResizeHandler);
            setTimeout(onScroll, 50);
        }

        function elementMatches(el, query) {
            const text = (el.textContent || '').toLowerCase();
            const q = String(query || '').trim().toLowerCase();
            if (!q) return false;
            if (text.includes(q)) return true;
            const terms = q.split(/\s+/).filter(Boolean);
            if (terms.length > 1) return terms.every((t) => text.includes(t));
            return false;
        }

        function scrollToSearchMatch() {
            if (!searchQuery || searchScrolled) return;
            const content = $('#content');
            if (!content) return;
            const candidates = $$('.content h1, .content h2, .content h3, .content h4, .content p, .content li, .content blockquote, .content pre');
            const match = candidates.find((el) => elementMatches(el, searchQuery));
            if (!match) return;
            searchScrolled = true;
            const top = window.scrollY + match.getBoundingClientRect().top - 20;
            window.scrollTo({ top, behavior: 'smooth' });
        }

        setupActiveToc();
        setTimeout(scrollToSearchMatch, 80);
        window.addEventListener('pageContentLoaded', () => {
            setTimeout(setupActiveToc, 50);
            setTimeout(scrollToSearchMatch, 80);
        });
        const content = $('#content');
        if (content) {
            const observer = new MutationObserver(() => scrollToSearchMatch());
            observer.observe(content, { childList: true, subtree: true });
        }
    });

    // Utility: throttle
    function throttle(fn, wait) {
        let last = 0;
        let timer = null;
        return function (...args) {
            const now = Date.now();
            const remaining = wait - (now - last);
            if (remaining <= 0) {
                if (timer) { clearTimeout(timer); timer = null; }
                last = now;
                fn.apply(this, args);
            } else if (!timer) {
                timer = setTimeout(() => {
                    last = Date.now();
                    timer = null;
                    fn.apply(this, args);
                }, remaining);
            }
        };
    }

})();

// Chat widget (for content pages)
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('/pages/')) {
        const script = document.createElement('script');
        script.src = '../js/chat.js';
        document.body.appendChild(script);

        const kuralScript = document.createElement('script');
        kuralScript.src = '../js/kural-widget.js';
        document.body.appendChild(kuralScript);

        const mdEditorScript = document.createElement('script');
        mdEditorScript.src = '../js/md-editor.js';
        document.body.appendChild(mdEditorScript);
    }
});
