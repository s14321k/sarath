(() => {
    'use strict';

    const endpoint = window.VISIT_ENDPOINT || '';
    const state = {
        mode: 'edit',
        path: '',
        sha: '',
        folder: 'md2',
        page: '',
        view: 'raw'
    };

    function sessionUser() {
        try { return sessionStorage.getItem('visitorName') || ''; } catch {}
        return '';
    }

    function sessionToken() {
        try { return sessionStorage.getItem('visitSessionToken') || ''; } catch {}
        return '';
    }

    function isLoggedIn() {
        try { return sessionStorage.getItem('visitRecorded') === '1'; } catch {}
        return false;
    }

    function currentRoute() {
        const url = new URL(window.location.href);

        // Generic page.html?page=gcp pattern
        const pageParam = url.searchParams.get('page');
        if (pageParam && /\/pages1?\/page\.html$/i.test(url.pathname)) {
            const folder = url.pathname.includes('/pages1/') ? 'md1' : 'md2';
            const clean = pageParam.replace(/[^a-zA-Z0-9_-]/g, '');
            if (clean && clean !== 'pdf-viewer') {
                return { folder, page: clean };
            }
        }

        // Original: path-based /pages/gcp.html pattern
        let pageRef = '';
        if (/\/pages1?\//.test(url.pathname)) {
            const parts = url.pathname.split('/').filter(Boolean);
            const idx = parts.findIndex((part) => part === 'pages' || part === 'pages1');
            if (idx >= 0 && parts[idx + 1]) pageRef = `${parts[idx]}/${parts[idx + 1]}`;
        }
        const clean = pageRef.replace(/^(\.\/|\.\.\/)+/, '');
        const match = clean.match(/^(pages|pages1)\/([^/?#]+)\.html/i);
        if (!match || match[2] === 'pdf-viewer' || match[2] === 'page') return null;
        return {
            folder: match[1] === 'pages1' ? 'md1' : 'md2',
            page: match[2]
        };
    }

    function ensureStyles() {
        if (document.getElementById('mdEditorStyles')) return;
        const style = document.createElement('style');
        style.id = 'mdEditorStyles';
        style.textContent = `
            .md-editor-actions {
                position: fixed;
                right: 22px;
                bottom: 220px;
                z-index: 10;
                display: flex;
                flex-direction: column;
                gap: 10px;
            }
            .md-editor-btn {
                border: 1px solid rgba(255,255,255,.18);
                border-radius: 999px;
                background: linear-gradient(135deg, #143d4a, #e85d3f);
                color: #fff;
                padding: 10px 16px;
                font: 700 13px/1.2 'Work Sans', sans-serif;
                cursor: pointer;
                box-shadow: 0 12px 28px rgba(0,0,0,.28);
            }
            .md-editor-btn[hidden] { display: none; }
            .md-editor-modal.hidden { display: none; }
            .md-editor-modal {
                position: fixed;
                inset: 0;
                z-index: 4000;
                background: rgba(5, 8, 14, .72);
                backdrop-filter: blur(10px);
                display: grid;
                place-items: center;
                padding: 0;
            }
            .md-editor-panel {
                width: 100vw;
                height: 100vh;
                display: grid;
                grid-template-rows: auto auto auto 1fr auto;
                gap: 12px;
                background: #101923;
                border: 1px solid rgba(255,255,255,.14);
                border-radius: 0;
                color: #f4f7fb;
                padding: 18px;
                box-shadow: 0 26px 80px rgba(0,0,0,.45);
            }
            .md-editor-head {
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 12px;
            }
            .md-editor-head h2 {
                margin: 0;
                font: 800 22px/1.2 'Work Sans', sans-serif;
            }
            .md-editor-grid {
                display: grid;
                grid-template-columns: 1fr 1.4fr;
                gap: 10px;
            }
            .md-editor-input,
            .md-editor-textarea {
                width: 100%;
                border: 1px solid rgba(255,255,255,.14);
                border-radius: 12px;
                background: rgba(255,255,255,.06);
                color: #f4f7fb;
                padding: 10px 12px;
                font: 500 14px/1.4 'JetBrains Mono', monospace;
                box-sizing: border-box;
            }
            .md-editor-textarea {
                resize: none;
                height: 100%;
                min-height: 420px;
                line-height: 1.55;
            }
            .md-editor-preview {
                display: none;
                height: 100%;
                min-height: 420px;
                border: 1px solid rgba(255,255,255,.14);
                border-radius: 12px;
                background: rgba(255,255,255,.06);
                color: #f4f7fb;
                padding: 12px;
                overflow: auto;
                font: 500 14px/1.6 'Work Sans', sans-serif;
            }
            .md-editor-preview h1,
            .md-editor-preview h2,
            .md-editor-preview h3,
            .md-editor-preview h4 {
                margin: 0 0 12px;
                line-height: 1.3;
            }
            .md-editor-preview p,
            .md-editor-preview ul,
            .md-editor-preview ol {
                margin: 0 0 10px;
            }
            .md-editor-preview code {
                background: rgba(255,255,255,.14);
                border-radius: 6px;
                padding: 1px 5px;
                font: 500 13px/1.4 'JetBrains Mono', monospace;
            }
            .md-editor-preview pre {
                background: rgba(0,0,0,.35);
                border-radius: 10px;
                padding: 10px;
                overflow: auto;
            }
            .md-editor-preview pre code {
                background: transparent;
                padding: 0;
            }
            .md-editor-preview img {
                max-width: 100%;
                height: auto;
                border-radius: 8px;
                border: 1px solid rgba(255,255,255,.14);
                display: block;
                margin: 8px 0 12px;
            }
            .md-editor-preview table {
                width: 100%;
                border-collapse: collapse;
                margin: 0 0 12px;
            }
            .md-editor-preview th,
            .md-editor-preview td {
                border: 1px solid rgba(255,255,255,.18);
                padding: 8px 10px;
                text-align: left;
                vertical-align: top;
            }
            .md-editor-preview th {
                background: rgba(255,255,255,.08);
                font-weight: 700;
            }
            .md-editor-actions-row {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 12px;
            }
            .md-editor-ai-row {
                display: grid;
                grid-template-columns: 1fr auto auto auto auto auto;
                gap: 8px;
                align-items: center;
            }
            .md-editor-status {
                min-height: 20px;
                color: #9fd8c9;
                font: 600 13px/1.3 'Work Sans', sans-serif;
            }
            .md-editor-status.is-error { color: #ffb4a8; }
            .md-editor-panel button {
                border: 0;
                border-radius: 10px;
                padding: 10px 14px;
                font-weight: 800;
                cursor: pointer;
            }
            .md-editor-save { background: #9fd8c9; color: #06221c; }
            .md-editor-close { background: rgba(255,255,255,.12); color: #fff; }
            .md-editor-ai { background: rgba(159,216,201,.16); color: #d9fff5; }
            .md-editor-view {
                background: rgba(255,255,255,.1);
                color: #eef4fb;
            }
            .md-editor-view.is-active {
                background: rgba(159,216,201,.28);
                color: #d9fff5;
            }
            @media (max-width: 760px) {
                .md-editor-grid { grid-template-columns: 1fr; }
                .md-editor-ai-row { grid-template-columns: 1fr 1fr; }
                .md-editor-ai-row input { grid-column: 1 / -1; }
                .md-editor-panel { height: 100vh; }
                .md-editor-actions { right: 14px; bottom: 155px; }
            }
        `;
        document.head.appendChild(style);
    }

    function ensureModal() {
        let modal = document.getElementById('mdEditorModal');
        if (modal) return modal;
        modal = document.createElement('div');
        modal.id = 'mdEditorModal';
        modal.className = 'md-editor-modal hidden';
        modal.innerHTML = `
            <section class="md-editor-panel" role="dialog" aria-modal="true" aria-label="Markdown editor">
                <div class="md-editor-head">
                    <h2 id="mdEditorTitle">Edit Markdown</h2>
                    <button type="button" class="md-editor-close" data-md-close="1">Close</button>
                </div>
                <div class="md-editor-grid">
                    <input id="mdEditorFilename" class="md-editor-input" placeholder="Filename, e.g. Java Notes.md">
                    <input id="mdEditorCommit" class="md-editor-input" placeholder="Commit message">
                </div>
                <div class="md-editor-ai-row">
                    <input id="mdEditorAiPrompt" class="md-editor-input" placeholder="Ask AI about this Markdown">
                    <button type="button" class="md-editor-ai" data-md-ai="settings">AI Settings</button>
                    <button type="button" class="md-editor-ai" data-md-ai="improve">Improve</button>
                    <button type="button" class="md-editor-ai" data-md-ai="summarize">Summarize</button>
                    <button type="button" class="md-editor-ai" data-md-ai="append">Append Answer</button>
                    <button type="button" class="md-editor-view" data-md-view-toggle="1">Preview</button>
                </div>
                <textarea id="mdEditorText" class="md-editor-textarea" spellcheck="false"></textarea>
                <div id="mdEditorPreview" class="md-editor-preview" aria-live="polite"></div>
                <div class="md-editor-actions-row">
                    <div id="mdEditorStatus" class="md-editor-status"></div>
                    <button type="button" id="mdEditorSave" class="md-editor-save">Commit & Run Converter</button>
                </div>
            </section>
        `;
        document.body.appendChild(modal);
        modal.addEventListener('click', (ev) => {
            if (ev.target === modal || ev.target.closest('[data-md-close="1"]')) closeModal();
        });
        document.getElementById('mdEditorSave')?.addEventListener('click', saveMarkdown);
        document.getElementById('mdEditorText')?.addEventListener('input', refreshPreview);
        modal.addEventListener('click', (ev) => {
            const action = ev.target?.closest?.('[data-md-ai]')?.dataset.mdAi;
            if (action) runMarkdownAi(action);
        });
        modal.addEventListener('click', (ev) => {
            if (ev.target?.closest?.('[data-md-view-toggle="1"]')) {
                setView(state.view === 'raw' ? 'preview' : 'raw');
            }
        });
        return modal;
    }

    function escapeHtml(text) {
        return (text || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }

    function parseInlineMarkdown(text) {
        return escapeHtml(text || '')
            .replace(/!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)/g, (match, alt, src, title) => {
                const safeAlt = alt || '';
                const safeTitle = title ? ` title="${title}"` : '';
                return `<img src="${src}" alt="${safeAlt}"${safeTitle}>`;
            })
            .replace(/`([^`]+)`/g, '<code>$1</code>')
            .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
            .replace(/\*([^*]+)\*/g, '<em>$1</em>');
    }

    function parseTableRow(line) {
        if (!line || !line.includes('|')) return null;
        const normalized = line.trim();
        if (!normalized) return null;
        const cells = normalized
            .replace(/^\|/, '')
            .replace(/\|$/, '')
            .split('|')
            .map((cell) => cell.trim());
        return cells.length ? cells : null;
    }

    function isTableDividerLine(line) {
        const cells = parseTableRow(line);
        if (!cells || !cells.length) return false;
        return cells.every((cell) => /^:?-{3,}:?$/.test(cell));
    }

    function markdownToHtml(source) {
        const lines = (source || '').replace(/\r\n/g, '\n').split('\n');
        const html = [];
        let inCodeBlock = false;
        let listType = '';

        const closeList = () => {
            if (!listType) return;
            html.push(listType === 'ol' ? '</ol>' : '</ul>');
            listType = '';
        };

        for (let i = 0; i < lines.length; i += 1) {
            const line = lines[i];
            if (line.trim().startsWith('```')) {
                closeList();
                if (inCodeBlock) {
                    html.push('</code></pre>');
                    inCodeBlock = false;
                } else {
                    html.push('<pre><code>');
                    inCodeBlock = true;
                }
                continue;
            }
            if (inCodeBlock) {
                html.push(`${escapeHtml(line)}\n`);
                continue;
            }

            const heading = line.match(/^(#{1,4})\s+(.+)$/);
            if (heading) {
                closeList();
                const level = heading[1].length;
                html.push(`<h${level}>${parseInlineMarkdown(heading[2])}</h${level}>`);
                continue;
            }

            const currentRow = parseTableRow(line);
            const nextLine = lines[i + 1] || '';
            if (currentRow && isTableDividerLine(nextLine)) {
                closeList();
                const headerCells = currentRow.map((cell) => `<th>${parseInlineMarkdown(cell)}</th>`).join('');
                html.push(`<table><thead><tr>${headerCells}</tr></thead><tbody>`);
                i += 1;
                while (i + 1 < lines.length) {
                    const rowCells = parseTableRow(lines[i + 1]);
                    if (!rowCells || isTableDividerLine(lines[i + 1])) break;
                    const rowHtml = rowCells.map((cell) => `<td>${parseInlineMarkdown(cell)}</td>`).join('');
                    html.push(`<tr>${rowHtml}</tr>`);
                    i += 1;
                }
                html.push('</tbody></table>');
                continue;
            }

            const unordered = line.match(/^\s*[-*]\s+(.+)$/);
            if (unordered) {
                if (listType !== 'ul') {
                    closeList();
                    html.push('<ul>');
                    listType = 'ul';
                }
                html.push(`<li>${parseInlineMarkdown(unordered[1])}</li>`);
                continue;
            }

            const ordered = line.match(/^\s*\d+\.\s+(.+)$/);
            if (ordered) {
                if (listType !== 'ol') {
                    closeList();
                    html.push('<ol>');
                    listType = 'ol';
                }
                html.push(`<li>${parseInlineMarkdown(ordered[1])}</li>`);
                continue;
            }

            closeList();
            if (!line.trim()) continue;
            html.push(`<p>${parseInlineMarkdown(line)}</p>`);
        }

        if (inCodeBlock) html.push('</code></pre>');
        closeList();
        return html.join('');
    }

    function refreshPreview() {
        const source = document.getElementById('mdEditorText')?.value || '';
        const preview = document.getElementById('mdEditorPreview');
        if (!preview) return;
        preview.innerHTML = markdownToHtml(source);
    }

    function setView(nextView) {
        state.view = nextView === 'preview' ? 'preview' : 'raw';
        const textarea = document.getElementById('mdEditorText');
        const preview = document.getElementById('mdEditorPreview');
        const viewToggle = document.querySelector('[data-md-view-toggle="1"]');
        if (textarea) textarea.style.display = state.view === 'raw' ? 'block' : 'none';
        if (preview) preview.style.display = state.view === 'preview' ? 'block' : 'none';
        if (viewToggle) {
            viewToggle.textContent = state.view === 'raw' ? 'Preview' : 'Raw';
            viewToggle.classList.toggle('is-active', state.view === 'preview');
        }
        if (state.view === 'preview') refreshPreview();
    }

    function setStatus(message, isError) {
        const el = document.getElementById('mdEditorStatus');
        if (!el) return;
        el.textContent = message || '';
        el.classList.toggle('is-error', Boolean(isError));
    }

    function closeModal() {
        document.getElementById('mdEditorModal')?.classList.add('hidden');
    }

    async function callApi(body) {
        if (!endpoint) throw new Error('VISIT_ENDPOINT is not configured');
        const res = await fetch(endpoint, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                user: sessionUser(),
                sessionToken: sessionToken(),
                ...body
            })
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data?.error || data?.detail || `HTTP ${res.status}`);
        return data;
    }

    function aiResponseText(data) {
        return data?.markdown || data?.reply || data?.message || data?.text || data?.content || data?.answer || '';
    }

    async function askAiForMarkdown(action) {
        const content = document.getElementById('mdEditorText')?.value || '';
        const prompt = document.getElementById('mdEditorAiPrompt')?.value || '';
        const filename = document.getElementById('mdEditorFilename')?.value || '';
        const payload = {
            eventType: 'ai_markdown_assist',
            action,
            prompt,
            markdown: content,
            filename,
            folder: state.folder,
            page: state.page
        };
        if (window.VisitAi?.ask) {
            return window.VisitAi.ask(payload);
        }
        const data = await callApi(payload);
        return aiResponseText(data);
    }

    async function runMarkdownAi(action) {
        if (action === 'settings') {
            if (window.VisitAi?.openSettings) {
                window.VisitAi.openSettings();
                return;
            }
            setStatus('Open AI Settings from the code runner or AI chat tab first.', true);
            return;
        }
        const textarea = document.getElementById('mdEditorText');
        if (!textarea) return;
        const original = textarea.value || '';
        if (!original.trim() && action !== 'append') {
            setStatus('Markdown content is required before using AI.', true);
            return;
        }
        const labels = {
            improve: 'Improving Markdown...',
            summarize: 'Summarizing Markdown...',
            append: 'Asking AI...'
        };
        setStatus(labels[action] || 'Asking AI...');
        try {
            const result = await askAiForMarkdown(action);
            if (!result.trim()) throw new Error('No AI response returned.');
            if (action === 'append') {
                textarea.value = `${original.replace(/\s*$/, '')}\n\n${result.trim()}\n`;
            } else {
                textarea.value = result.trim();
            }
            textarea.dispatchEvent(new Event('input', { bubbles: true }));
            setStatus('AI update applied. Review before committing.');
        } catch (error) {
            setStatus(error.message || 'AI request failed.', true);
        }
    }

    function openModal(title) {
        ensureStyles();
        const modal = ensureModal();
        document.getElementById('mdEditorTitle').textContent = title;
        modal.classList.remove('hidden');
        setView('raw');
    }

    async function openEdit() {
        const route = currentRoute();
        if (!route) return;
        state.mode = 'edit';
        state.folder = route.folder;
        state.page = route.page;
        state.path = '';
        state.sha = '';
        openModal('Edit Markdown');
        setStatus('Loading Markdown...');
        try {
            const data = await callApi({
                eventType: 'md_get',
                folder: route.folder,
                page: route.page
            });
            state.path = data.path || '';
            state.sha = data.sha || '';
            document.getElementById('mdEditorFilename').value = data.filename || '';
            document.getElementById('mdEditorFilename').disabled = true;
            document.getElementById('mdEditorCommit').value = `Update ${data.filename || route.page}`;
            document.getElementById('mdEditorText').value = data.content || '';
            setStatus('');
        } catch (error) {
            setStatus(error.message || 'Unable to load Markdown.', true);
        }
    }

    function openNew() {
        state.mode = 'new';
        state.folder = 'md2';
        state.page = '';
        state.path = '';
        state.sha = '';
        openModal('New Markdown Page');
        document.getElementById('mdEditorFilename').disabled = false;
        document.getElementById('mdEditorFilename').value = '';
        document.getElementById('mdEditorCommit').value = 'Add new markdown page';
        document.getElementById('mdEditorText').value = '# New Page\n\nAdd content here.\n';
        setStatus('New files are created under md2/.');
    }

    async function saveMarkdown() {
        const filename = document.getElementById('mdEditorFilename')?.value || '';
        const commitMessage = document.getElementById('mdEditorCommit')?.value || '';
        const content = document.getElementById('mdEditorText')?.value || '';
        const isNew = state.mode === 'new';
        if (!commitMessage.trim()) return setStatus('Commit message is required.', true);
        if (!content.trim()) return setStatus('Markdown content is required.', true);
        if (isNew && !filename.trim()) return setStatus('Filename is required.', true);
        setStatus('Committing Markdown and triggering converter...');
        try {
            const data = await callApi({
                eventType: 'md_save',
                folder: state.folder,
                path: state.path,
                filename,
                sha: state.sha,
                content,
                commitMessage,
                isNew
            });
            state.path = data.path || state.path;
            state.sha = '';
            setStatus(data.workflow?.triggered
                ? 'Committed. Converter workflow triggered.'
                : `Committed. Workflow not triggered: ${data.workflow?.reason || 'not configured'}`);
        } catch (error) {
            setStatus(error.message || 'Save failed.', true);
        }
    }

    function ensureButtons() {
        ensureStyles();
        let wrap = document.getElementById('mdEditorActions');
        if (!wrap) {
            wrap = document.createElement('div');
            wrap.id = 'mdEditorActions';
            wrap.className = 'md-editor-actions';
            wrap.innerHTML = `
                <button type="button" id="mdNewBtn" class="md-editor-btn">New MD</button>
                <button type="button" id="mdEditBtn" class="md-editor-btn" hidden>Edit MD</button>
            `;
            document.body.appendChild(wrap);
            document.getElementById('mdNewBtn')?.addEventListener('click', openNew);
            document.getElementById('mdEditBtn')?.addEventListener('click', openEdit);
        }
        const visible = isLoggedIn();
        wrap.hidden = !visible;
        const editBtn = document.getElementById('mdEditBtn');
        if (editBtn) editBtn.hidden = !currentRoute();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', ensureButtons);
    } else {
        ensureButtons();
    }
    window.addEventListener('popstate', ensureButtons);
    window.addEventListener('spaRouteChanged', ensureButtons);
    window.addEventListener('pageContentLoaded', ensureButtons);
    document.addEventListener('visit-login', ensureButtons);
})();
