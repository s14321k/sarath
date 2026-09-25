(() => {
    'use strict';

    const endpoint = window.VISIT_ENDPOINT || '';
    const state = {
        mode: 'edit',
        path: '',
        sha: '',
        folder: 'md2',
        page: '',
        selectedImages: [],
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
            const folder = url.searchParams.get('folder') || (url.pathname.includes('/pages1/') ? 'md1' : 'md2');
            const clean = pageParam.replace(/[^a-zA-Z0-9_-]/g, '');
            if (clean && clean !== 'pdf-viewer' && /^(md1|md2)(\/[a-zA-Z0-9 _.-]+)*$/.test(folder)) {
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
                grid-template-rows: auto auto auto auto auto 1fr auto;
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
            .md-editor-folder-select,
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
                padding-bottom: 38px;
            }
            .md-editor-input-wrap {
                position: relative;
                min-height: 420px;
            }
            .md-editor-count {
                position: absolute;
                bottom: 10px;
                left: 50%;
                transform: translateX(-50%);
                z-index: 1;
                padding: 4px 10px;
                border: 1px solid rgba(255,255,255,.16);
                border-radius: 999px;
                background: rgba(16,25,35,.9);
                color: #c5d3df;
                font: 600 12px/1.2 'Work Sans', sans-serif;
                pointer-events: none;
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
            .md-editor-new-folder-row {
                display: flex;
                align-items: center;
                gap: 10px;
                color: #c5d3df;
                font: 600 13px/1.3 'Work Sans', sans-serif;
                visibility: hidden;
            }
            .md-editor-new-folder-row.is-visible { visibility: visible; }
            .md-editor-folder-select {
                width: auto;
                min-width: 220px;
                background-color: darkslategray;
            }
            .md-editor-image-row {
                display: flex;
                align-items: center;
                gap: 10px;
                flex-wrap: wrap;
            }
            .md-editor-image-row label { color: #c5d3df; font: 600 13px/1.3 'Work Sans', sans-serif; }
            .md-editor-image-row input[type="text"] { max-width: 220px; }
            .md-editor-file-picker { position: relative; display: inline-flex; }
            .md-editor-file-input {
                position: absolute;
                width: 1px;
                height: 1px;
                padding: 0;
                margin: -1px;
                overflow: hidden;
                clip: rect(0, 0, 0, 0);
                white-space: nowrap;
                border: 0;
            }
            .md-editor-file-choose {
                display: inline-flex;
                align-items: center;
                gap: 9px;
                min-height: 42px;
                padding: 0 16px;
                border: 1px solid rgba(159,216,201,.42);
                border-radius: 12px;
                background: linear-gradient(135deg, rgba(27,75,83,.95), rgba(31,48,67,.98));
                color: #e9fff9 !important;
                font: 700 13px/1 'Work Sans', sans-serif !important;
                cursor: pointer;
                box-shadow: 0 8px 22px rgba(0,0,0,.22), inset 0 1px rgba(255,255,255,.08);
                transition: transform .18s ease, border-color .18s ease, box-shadow .18s ease;
            }
            .md-editor-file-choose::before { content: '＋'; font-size: 18px; color: #9fd8c9; }
            .md-editor-file-choose:hover {
                transform: translateY(-1px);
                border-color: #9fd8c9;
                box-shadow: 0 11px 26px rgba(0,0,0,.3), 0 0 18px rgba(159,216,201,.12);
            }
            .md-editor-file-input:focus-visible + .md-editor-file-choose {
                outline: 2px solid #9fd8c9;
                outline-offset: 3px;
            }
            .md-editor-selected-file {
                position: relative;
                display: inline-flex;
                align-items: center;
                min-height: 36px;
                max-width: 260px;
                padding: 0 18px 0 11px;
                border: 1px solid rgba(159,216,201,.24);
                border-radius: 10px;
                background: rgba(159,216,201,.08);
                color: #e4f4ef;
                font: 600 12px/1.3 'Work Sans', sans-serif;
            }
            .md-editor-selected-file[hidden] { display: none; }
            .md-editor-selected-images { display: flex; flex-wrap: wrap; gap: 10px; }
            .md-editor-selected-images[hidden] { display: none; }
            .md-editor-selected-name { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
            .md-editor-file-remove {
                position: absolute;
                top: -9px;
                right: -9px;
                width: 21px;
                height: 21px;
                display: grid;
                place-items: center;
                padding: 0 !important;
                border: 1px solid rgba(255,255,255,.7) !important;
                border-radius: 50% !important;
                background: #d94c60 !important;
                color: #fff !important;
                font: 700 15px/1 'Work Sans', sans-serif !important;
                cursor: pointer;
                box-shadow: 0 2px 8px rgba(0,0,0,.38);
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
                <div class="md-editor-new-folder-row" id="mdEditorNewFolderRow">
                    <span>New files are created under</span>
                    <select id="mdEditorFolderSelect" class="md-editor-folder-select" aria-label="Folder for new Markdown file">
                        <option value="md2">md2/</option>
                    </select>
                </div>
                <div class="md-editor-ai-row">
                    <input id="mdEditorAiPrompt" class="md-editor-input" placeholder="Ask AI about this Markdown">
                    <button type="button" class="md-editor-ai" data-md-ai="settings">AI Settings</button>
                    <button type="button" class="md-editor-ai" data-md-ai="improve">Improve</button>
                    <button type="button" class="md-editor-ai" data-md-ai="summarize">Summarize</button>
                    <button type="button" class="md-editor-ai" data-md-ai="append">Append Answer</button>
                    <button type="button" class="md-editor-view" data-md-view-toggle="1">Preview</button>
                </div>
                <div class="md-editor-image-row">
                    <div class="md-editor-file-picker">
                        <input id="mdEditorImageFile" class="md-editor-file-input" type="file" accept="image/png,image/jpeg,image/gif,image/webp,image/svg+xml,.svg" multiple>
                        <label class="md-editor-file-choose" for="mdEditorImageFile">Choose image</label>
                    </div>
                    <div id="mdEditorSelectedImages" class="md-editor-selected-images" hidden>
                    </div>
                    <select id="mdEditorImageFolder" class="md-editor-folder-select" aria-label="Choose image subfolder">
                        <option value="">Loading image folders…</option>
                    </select>
                    <input id="mdEditorNewImageFolder" class="md-editor-input" type="text" placeholder="New child folder name" hidden>
                    <button type="button" id="mdEditorUploadImage" class="md-editor-ai">Upload &amp; Insert</button>
                </div>
                <div class="md-editor-input-wrap">
                    <textarea id="mdEditorText" class="md-editor-textarea" spellcheck="false"></textarea>
                    <output id="mdEditorCount" class="md-editor-count" aria-live="polite">0 characters</output>
                </div>
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
        document.getElementById('mdEditorUploadImage')?.addEventListener('click', uploadEditorImage);
        document.getElementById('mdEditorImageFile')?.addEventListener('change', (ev) => {
            const incoming = Array.from(ev.target.files || []);
            const keys = new Set(state.selectedImages.map((file) => `${file.name}:${file.size}:${file.lastModified}`));
            for (const file of incoming) {
                const key = `${file.name}:${file.size}:${file.lastModified}`;
                if (!keys.has(key)) state.selectedImages.push(file);
                keys.add(key);
            }
            ev.target.value = '';
            renderSelectedImages();
        });
        document.getElementById('mdEditorImageFolder')?.addEventListener('change', (ev) => {
            const isNewFolder = ev.target.value === '__new__';
            document.getElementById('mdEditorNewImageFolder').hidden = !isNewFolder;
            if (isNewFolder) document.getElementById('mdEditorNewImageFolder').focus();
        });
        document.getElementById('mdEditorFolderSelect')?.addEventListener('change', (ev) => {
            state.folder = ev.target.value || 'md2';
        });
        document.getElementById('mdEditorText')?.addEventListener('input', refreshPreview);
        modal.addEventListener('click', (ev) => {
            const removeImage = ev.target?.closest?.('[data-remove-image]');
            if (removeImage) {
                removeSelectedImage(Number(removeImage.dataset.removeImage));
                return;
            }
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
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
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
        const count = document.getElementById('mdEditorCount');
        if (count) {
            const total = Array.from(source).length;
            count.textContent = `${total.toLocaleString()} ${total === 1 ? 'character' : 'characters'}`;
        }
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

    async function loadMarkdownFolderOptions() {
        const select = document.getElementById('mdEditorFolderSelect');
        if (!select) return;
        const cacheKey = 'mdEditorMarkdownFolders';
        const validFolder = (folder) => /^md2(?:\/[a-zA-Z0-9 _.-]+)*$/.test(folder);
        const renderOptions = (folders) => {
            const uniqueFolders = [...new Set(['md2', ...folders.filter(validFolder)])];
            const selected = state.folder || 'md2';
            select.innerHTML = uniqueFolders.map((folder) =>
                `<option value="${escapeHtml(folder)}">${escapeHtml(folder)}/</option>`
            ).join('');
            select.value = uniqueFolders.includes(selected) ? selected : 'md2';
            state.folder = select.value;
        };

        // Restore the last known folder list immediately while the index refreshes.
        try {
            const cached = JSON.parse(sessionStorage.getItem(cacheKey) || '[]');
            if (Array.isArray(cached)) renderOptions(cached);
        } catch {}

        let data = null;
        if (endpoint) {
            try {
                const response = await fetch(endpoint, {
                    method: 'POST',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify({ eventType: 'index_content' })
                });
                if (response.ok) data = await response.json();
            } catch {}
        }
        const hasTree = Array.isArray(data?.markdownTree) || Array.isArray(data?.cards) || Array.isArray(data);
        if (!hasTree) {
            try {
                const response = await fetch('data/index.json', { cache: 'no-store' });
                if (response.ok) data = await response.json();
            } catch {}
        }
        const folders = [];
        const visit = (items, parent) => {
            for (const item of (Array.isArray(items) ? items : [])) {
                if (item.type === 'folder' && item.name) {
                    const path = `${parent}/${item.name}`;
                    if (validFolder(path)) folders.push(path);
                    visit(item.children, path);
                } else if (item.type === 'page' && validFolder(item.folder || '')) {
                    const parts = item.folder.split('/');
                    for (let i = 2; i <= parts.length; i += 1) folders.push(parts.slice(0, i).join('/'));
                }
            }
        };
        const addFoldersFrom = (sourceData) => {
            const sources = [sourceData?.markdownTree, sourceData?.cards, Array.isArray(sourceData) ? sourceData : null];
            for (const source of sources) visit(source, 'md2');
        };
        addFoldersFrom(data);
        // A legacy Cloud Run response may contain flat cards but omit markdownTree.
        // In that case use the locally deployed index tree if it is available.
        if (!folders.length && endpoint) {
            try {
                const response = await fetch('data/index.json', { cache: 'no-store' });
                if (response.ok) addFoldersFrom(await response.json());
            } catch {}
        }
        if (folders.length) {
            try { sessionStorage.setItem(cacheKey, JSON.stringify([...new Set(folders)])); } catch {}
            renderOptions(folders);
        }
    }

    async function loadImageFolderOptions() {
        const select = document.getElementById('mdEditorImageFolder');
        if (!select) return;
        select.innerHTML = '<option value="">Loading image folders…</option>';
        try {
            const data = await callApi({ eventType: 'image_folders' });
            const folders = Array.isArray(data.folders) ? data.folders : [];
            const options = folders.map((folder) =>
                `<option value="${escapeHtml(folder)}">images/${escapeHtml(folder)}/</option>`
            ).join('');
            select.innerHTML = options + '<option value="__new__">Create a new folder…</option>';
            if (folders.length) {
                select.value = folders[0];
                document.getElementById('mdEditorNewImageFolder').hidden = true;
            } else {
                select.innerHTML = '<option value="">No child folders found</option>' + select.innerHTML;
                select.value = '';
                document.getElementById('mdEditorNewImageFolder').hidden = true;
                setStatus(`Cloud Run found no child folders under images/ in ${data.repo || 'the configured GH_FE_REPO'} (${data.branch || 'configured branch'}).`, true);
            }
        } catch (error) {
            select.innerHTML = '<option value="">Existing folders unavailable</option><option value="__new__">Create a new folder…</option>';
            select.value = '';
            document.getElementById('mdEditorNewImageFolder').hidden = true;
            setStatus(error.message || 'Unable to load image folders from the configured GitHub repository.', true);
        }
    }

    async function uploadEditorImage() {
        const files = [...state.selectedImages];
        const folderSelect = document.getElementById('mdEditorImageFolder');
        const folder = folderSelect?.value === '__new__'
            ? (document.getElementById('mdEditorNewImageFolder')?.value || '').trim()
            : (folderSelect?.value || '');
        if (!files.length) return setStatus('Choose one or more image files to upload.', true);
        if (!folder) return setStatus('Choose an existing image folder or enter a new folder name.', true);
        const supportedMimes = {
            png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg',
            gif: 'image/gif', webp: 'image/webp', svg: 'image/svg+xml'
        };
        const invalid = files.find((file) => {
            const extension = file.name.split('.').pop().toLowerCase();
            return !supportedMimes[extension] || (file.type && file.type !== supportedMimes[extension]) || file.size > 8 * 1024 * 1024;
        });
        if (invalid) {
            return setStatus(`${invalid.name} is unsupported. Choose PNG, JPEG, GIF, WebP, or SVG files up to 8 MB each.`, true);
        }
        const uploadedMarkdown = [];
        const failedFiles = [];
        for (let index = 0; index < files.length; index += 1) {
            const file = files[index];
            setStatus(`Uploading image ${index + 1} of ${files.length}: ${file.name}`);
            try {
                const dataUrl = await new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = () => resolve(String(reader.result || ''));
                    reader.onerror = () => reject(new Error('Unable to read the selected image.'));
                    reader.readAsDataURL(file);
                });
                const extension = file.name.split('.').pop().toLowerCase();
                const result = await callApi({
                    eventType: 'image_upload',
                    folder,
                    filename: file.name,
                    mimeType: file.type || supportedMimes[extension],
                    contentBase64: dataUrl.slice(dataUrl.indexOf(',') + 1)
                });
                const imageUrl = `/${result.path.split('/').map((part) => encodeURIComponent(part)).join('/')}`;
                const alt = file.name.replace(/\.[^.]+$/, '').replace(/[\[\]]/g, '');
                uploadedMarkdown.push(`![${alt}](${imageUrl})`);
            } catch (error) {
                failedFiles.push({ file, error: error.message || 'Upload failed.' });
            }
        }

        if (uploadedMarkdown.length) {
            const textarea = document.getElementById('mdEditorText');
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            const before = textarea.value.slice(0, start);
            const after = textarea.value.slice(end);
            const block = uploadedMarkdown.join('\n');
            const prefix = before && !before.endsWith('\n') ? '\n' : '';
            const suffix = after && !after.startsWith('\n') ? '\n' : '';
            const insertion = `${prefix}${block}${suffix}`;
            textarea.value = `${before}${insertion}${after}`;
            textarea.focus();
            textarea.selectionStart = textarea.selectionEnd = start + insertion.length;
            textarea.dispatchEvent(new Event('input', { bubbles: true }));
        }
        state.selectedImages = failedFiles.map((entry) => entry.file);
        renderSelectedImages();
        if (failedFiles.length) {
            setStatus(`Uploaded ${uploadedMarkdown.length} image(s). ${failedFiles.length} failed: ${failedFiles.map((entry) => `${entry.file.name} (${entry.error})`).join('; ')}`, true);
        } else {
            setStatus(`Uploaded and inserted ${uploadedMarkdown.length} image(s).`);
        }
    }

    function renderSelectedImages() {
        const container = document.getElementById('mdEditorSelectedImages');
        if (!container) return;
        container.innerHTML = state.selectedImages.map((file, index) => `
            <span class="md-editor-selected-file" title="${escapeHtml(file.name)}">
                <span class="md-editor-selected-name">${escapeHtml(file.name)}</span>
                <button type="button" class="md-editor-file-remove" data-remove-image="${index}" aria-label="Remove ${escapeHtml(file.name)}">&#215;</button>
            </span>
        `).join('');
        container.hidden = state.selectedImages.length === 0;
    }

    function removeSelectedImage(index) {
        if (!Number.isInteger(index) || index < 0 || index >= state.selectedImages.length) return;
        state.selectedImages.splice(index, 1);
        renderSelectedImages();
    }

    async function openEdit() {
        const route = currentRoute();
        if (!route) return;
        state.selectedImages = [];
        state.mode = 'edit';
        state.folder = route.folder;
        state.page = route.page;
        state.path = '';
        state.sha = '';
        openModal('Edit Markdown');
        renderSelectedImages();
        loadImageFolderOptions();
        document.getElementById('mdEditorNewFolderRow')?.classList.remove('is-visible');
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
            refreshPreview();
            setStatus('');
        } catch (error) {
            setStatus(error.message || 'Unable to load Markdown.', true);
        }
    }

    function openNew() {
        state.selectedImages = [];
        state.mode = 'new';
        state.folder = 'md2';
        state.page = '';
        state.path = '';
        state.sha = '';
        openModal('New Markdown Page');
        renderSelectedImages();
        loadImageFolderOptions();
        document.getElementById('mdEditorNewFolderRow')?.classList.add('is-visible');
        loadMarkdownFolderOptions();
        document.getElementById('mdEditorFilename').disabled = false;
        document.getElementById('mdEditorFilename').value = '';
        document.getElementById('mdEditorCommit').value = 'Add new markdown page';
        document.getElementById('mdEditorText').value = '# New Page\n\nAdd content here.\n';
        refreshPreview();
        setStatus('');
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
