(() => {
    'use strict';

    const endpoint = window.VISIT_ENDPOINT || '';
    const form = document.getElementById('adminLoginForm');
    const err = document.getElementById('adminError');
    const loginCard = document.getElementById('loginCard');
    const statsCard = document.getElementById('statsCard');
    const tableBody = document.querySelector('#statsTable tbody');
    const refreshBtn = document.getElementById('refreshBtn');
    const dashboardBtn = document.getElementById('dashboardBtn');
    const tableBtn = document.getElementById('tableBtn');
    const messagesBtn = document.getElementById('messagesBtn');
    const approvalsBtn = document.getElementById('approvalsBtn');
    const dashboardView = document.getElementById('dashboardView');
    const tableWrap = document.querySelector('.admin-table-wrap');
    const messagesView = document.getElementById('messagesView');
    const approvalsView = document.getElementById('approvalsView');
    const totalPagesCount = document.getElementById('totalPagesCount');
    const mostVisitedPage = document.getElementById('mostVisitedPage');
    const mostVisitedCount = document.getElementById('mostVisitedCount');
    const mostVisitedOriginChartEl = document.getElementById('mostVisitedOriginChart');
    const mostVisitedOriginLegend = document.getElementById('mostVisitedOriginLegend');
    const topPagesChartEl = document.getElementById('topPagesChart');
    const topPagesLegend = document.getElementById('topPagesLegend');
    const dailyChartEl = document.getElementById('dailyChart');
    const weeklyChartEl = document.getElementById('weeklyChart');
    const monthlyChartEl = document.getElementById('monthlyChart');
    const adminSendForm = document.getElementById('adminSendForm');
    const adminToUser = document.getElementById('adminToUser');
    const adminMessage = document.getElementById('adminMessage');
    const adminGlobalForm = document.getElementById('adminGlobalForm');
    const adminGlobalMessage = document.getElementById('adminGlobalMessage');
    const adminInbox = document.getElementById('adminInbox');
    const globalMessages = document.getElementById('globalMessages');
    const adminInboxClear = document.getElementById('adminInboxClear');
    const globalMessagesClear = document.getElementById('globalMessagesClear');
    const approvalsRefresh = document.getElementById('approvalsRefresh');
    const approvalList = document.getElementById('approvalList');
    const approvalMeta = document.getElementById('approvalMeta');
    const approvalPreview = document.getElementById('approvalPreview');
    const approvalActions = document.getElementById('approvalActions');
    const approvalApprove = document.getElementById('approvalApprove');
    const approvalReject = document.getElementById('approvalReject');

    let topPagesChart = null;
    let mostVisitedOriginChart = null;
    let dailyChart = null;
    let weeklyChart = null;
    let monthlyChart = null;
    let adminCreds = { username: '', password: '' };
    let messagesActive = false;
    let approvalsActive = false;
    let approvalItems = [];
    let selectedApprovalId = '';

    function setError(msg) {
        if (err) err.textContent = msg || '';
    }

    function copyText(text) {
        if (!text) return;
        if (navigator.clipboard?.writeText) {
            navigator.clipboard.writeText(text).catch(() => fallbackCopy(text));
        } else {
            fallbackCopy(text);
        }
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

    function attachWordPasteHandler(el) {
        if (!el) return;
        el.addEventListener('paste', (ev) => {
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
            insertAtCursor(el, text);
        });
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
        } catch {}
    }

    function renderTable(rows) {
        tableBody.innerHTML = '';
        rows.forEach((row) => {
            const tr = document.createElement('tr');

            const nameTd = document.createElement('td');
            nameTd.textContent = row.name;

            const pagesTd = document.createElement('td');
            const pageList = document.createElement('div');
            pageList.className = 'page-list collapsed';
            const pageToggle = document.createElement('button');
            pageToggle.type = 'button';
            pageToggle.className = 'list-toggle';
            pageToggle.textContent = 'Show more';
            const sortedPages = (row.pages || []).slice().sort((a, b) => (b.lastSeenMs || 0) - (a.lastSeenMs || 0));
            sortedPages.forEach((p) => {
                const item = document.createElement('span');
                const hours = (Number(p.totalMs || 0) / 3600000).toFixed(2);
                const lastSeen = p.lastSeenMs ? new Date(p.lastSeenMs).toLocaleString() : '-';
                item.textContent = `${formatPageName(p.page)} (${p.count}) | ${hours}h | ${lastSeen}`;
                pageList.appendChild(item);
            });
            pagesTd.appendChild(pageList);
            if (sortedPages.length > 1) {
                pagesTd.appendChild(pageToggle);
            }

            const totalTd = document.createElement('td');
            totalTd.textContent = String(row.total || 0);

            const loginCountTd = document.createElement('td');
            loginCountTd.textContent = String(row.loginCount || 0);

            const lastLoginTd = document.createElement('td');
            lastLoginTd.textContent = row.lastLogin
                ? new Date(row.lastLogin).toLocaleString()
                : '-';

            const passTd = document.createElement('td');
            passTd.textContent = row.passwordPlain || '-';

            const uaTd = document.createElement('td');
            const uaList = document.createElement('div');
            uaList.className = 'ua-list collapsed';
            const uaToggle = document.createElement('button');
            uaToggle.type = 'button';
            uaToggle.className = 'list-toggle';
            uaToggle.textContent = 'Show more';
            (row.userAgents || []).forEach((ua) => {
                const item = document.createElement('span');
                item.textContent = ua;
                uaList.appendChild(item);
            });
            uaTd.appendChild(uaList);
            if ((row.userAgents || []).length > 1) {
                uaTd.appendChild(uaToggle);
            }

            tr.appendChild(nameTd);
            tr.appendChild(pagesTd);
            tr.appendChild(loginCountTd);
            tr.appendChild(lastLoginTd);
            tr.appendChild(passTd);
            tr.appendChild(totalTd);
            tr.appendChild(uaTd);
            tableBody.appendChild(tr);

            // Toggle visibility for long lists
            if (sortedPages.length > 1) {
                pageToggle.addEventListener('click', () => {
                    const expanded = pageList.classList.toggle('expanded');
                    pageList.classList.toggle('collapsed', !expanded);
                    pageToggle.textContent = expanded ? 'Show less' : 'Show more';
                });
            }
            if ((row.userAgents || []).length > 1) {
                uaToggle.addEventListener('click', () => {
                    const expanded = uaList.classList.toggle('expanded');
                    uaList.classList.toggle('collapsed', !expanded);
                    uaToggle.textContent = expanded ? 'Show less' : 'Show more';
                });
            }
        });
    }

    function renderDashboard(dashboard) {
        if (!dashboard) return;
        totalPagesCount.textContent = String(dashboard.totalPages || 0);
        if (dashboard.mostVisitedPage) {
            mostVisitedPage.textContent = formatPageName(dashboard.mostVisitedPage.page);
            mostVisitedCount.textContent = `${dashboard.mostVisitedPage.count} visits`;
        } else {
            mostVisitedPage.textContent = '-';
            mostVisitedCount.textContent = '0 visits';
        }

        const originLabels = (dashboard.mostVisitedOrigins || []).map((o) => o.origin);
        const originCounts = (dashboard.mostVisitedOrigins || []).map((o) => o.count);
        mostVisitedOriginChart = renderChart(
            mostVisitedOriginChart,
            mostVisitedOriginChartEl,
            'doughnut',
            originLabels,
            originCounts,
            'Origins'
        );
        renderLegend(mostVisitedOriginLegend, originLabels, originCounts);

        const topLabels = (dashboard.topPages || []).map((p) => formatPageName(p.page));
        const topCounts = (dashboard.topPages || []).map((p) => p.count);
        topPagesChart = renderChart(topPagesChart, topPagesChartEl, 'doughnut', topLabels, topCounts, 'Visits');
        renderLegend(topPagesLegend, topLabels, topCounts);

        const dailyLabels = (dashboard.daily || []).map((d) => d.label).reverse();
        const dailyCounts = (dashboard.daily || []).map((d) => d.count).reverse();
        dailyChart = renderChart(dailyChart, dailyChartEl, 'line', dailyLabels, dailyCounts, 'Daily Hits');

        const weeklyLabels = (dashboard.weekly || []).map((w) => w.label).reverse();
        const weeklyCounts = (dashboard.weekly || []).map((w) => w.count).reverse();
        weeklyChart = renderChart(weeklyChart, weeklyChartEl, 'bar', weeklyLabels, weeklyCounts, 'Weekly Hits');

        const monthlyLabels = (dashboard.monthly || []).map((m) => m.label).reverse();
        const monthlyCounts = (dashboard.monthly || []).map((m) => m.count).reverse();
        monthlyChart = renderChart(monthlyChart, monthlyChartEl, 'bar', monthlyLabels, monthlyCounts, 'Monthly Hits');
    }

    function renderChart(instance, canvas, type, labels, data, label) {
        if (!canvas || !window.Chart) return instance;
        if (instance) {
            instance.data.labels = labels;
            instance.data.datasets[0].data = data;
            instance.update();
            return instance;
        }
        const colors = makeColors(data.length);
        return new Chart(canvas, {
            type,
            data: {
                labels,
                datasets: [{
                    label,
                    data,
                    borderColor: '#ff6b9d',
                    backgroundColor: type === 'doughnut' ? colors : 'rgba(233, 69, 96, 0.35)',
                    fill: type === 'line',
                    tension: 0.3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: type === 'doughnut' }
                },
                scales: {
                    x: {
                        ticks: { color: '#a0a0a0' },
                        grid: { color: 'rgba(255,255,255,0.05)' }
                    },
                    y: {
                        ticks: { color: '#a0a0a0' },
                        grid: { color: 'rgba(255,255,255,0.05)' }
                    }
                }
            }
        });
    }

    function renderLegend(container, labels, counts) {
        if (!container) return;
        container.innerHTML = '';
        const colors = makeColors(labels.length);
        labels.forEach((label, idx) => {
            const row = document.createElement('div');
            row.className = 'legend-item';
            const swatch = document.createElement('span');
            swatch.className = 'legend-swatch';
            swatch.style.backgroundColor = colors[idx];
            const text = document.createElement('span');
            text.textContent = `${label} (${counts[idx] || 0})`;
            row.appendChild(swatch);
            row.appendChild(text);
            container.appendChild(row);
        });
    }

    function makeColors(n) {
        const palette = [
            '#ff6b9d', '#ffa07a', '#87ceeb', '#98d8c8', '#f9c74f',
            '#90be6d', '#f9844a', '#577590', '#e76f51', '#9b5de5'
        ];
        const out = [];
        for (let i = 0; i < n; i++) {
            out.push(palette[i % palette.length]);
        }
        return out;
    }

    function formatPageName(url) {
        if (!url) return '';
        try {
            const u = new URL(url, window.location.origin);
            const parts = u.pathname.split('/').filter(Boolean);
            const last = parts[parts.length - 1] || '';
            return last.replace(/\.html$/i, '') || last;
        } catch {
            return String(url).replace(/.*\/([^/]+)\.html?$/i, '$1');
        }
    }

    function escapeHtml(value) {
        return String(value || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function renderVisualizationPreview(container, data) {
        if (!container) return;
        const steps = Array.isArray(data?.steps) ? data.steps : [];
        const flow = Array.isArray(data?.flow) ? data.flow : [];
        if (!steps.length) {
            container.innerHTML = '<div class="logic-empty">No visual steps were returned.</div>';
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
        container.innerHTML = `
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
        const buttons = container.querySelectorAll('[data-logic-step]');
        const explanation = container.querySelector('[data-logic-explanation]');
        const focus = container.querySelector('[data-logic-focus]');
        const state = container.querySelector('[data-logic-state]');
        const section = container.querySelector('[data-logic-section]');
        const cells = container.querySelector('[data-logic-cells]');
        const stats = container.querySelector('[data-logic-stats]');
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

    async function fetchStats(username, password) {
        if (!endpoint) throw new Error('Missing endpoint');
        const res = await fetch(endpoint, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                eventType: 'admin',
                username,
                password
            })
        });
        if (!res.ok) {
            throw new Error('Login failed');
        }
        const json = await res.json();
        return json;
    }

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

    async function sendAdminMessage(scope, to, message) {
        if (!endpoint) throw new Error('Missing endpoint');
        const payload = await buildMessagePayload(message);
        const res = await fetch(endpoint, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                eventType: 'message_send',
                scope,
                to,
                from: adminCreds.username,
                password: adminCreds.password,
                ...payload
            })
        });
        const json = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(json?.error || json?.detail || `Send failed (${res.status})`);
    }

    async function fetchMessages(scope) {
        if (!endpoint) throw new Error('Missing endpoint');
        const res = await fetch(endpoint, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                eventType: 'message_fetch',
                scope,
                username: adminCreds.username,
                password: adminCreds.password
            })
        });
        const json = await res.json().catch(() => ({}));
        if (!res.ok) {
            throw new Error(json?.error || json?.detail || `Fetch failed (${res.status})`);
        }
        return json.messages || [];
    }

    async function fetchPendingApprovals() {
        if (!endpoint) throw new Error('Missing endpoint');
        const res = await fetch(endpoint, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                eventType: 'admin_visualization_pending',
                username: adminCreds.username,
                password: adminCreds.password
            })
        });
        if (!res.ok) throw new Error('Approval fetch failed');
        const json = await res.json();
        return json.items || [];
    }

    async function reviewApproval(id, action) {
        if (!endpoint) throw new Error('Missing endpoint');
        const res = await fetch(endpoint, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                eventType: 'admin_visualization_review',
                id,
                action,
                username: adminCreds.username,
                password: adminCreds.password
            })
        });
        if (!res.ok) throw new Error('Approval review failed');
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

    function renderMessages(container, list, scope) {
        if (!container) return;
        container.innerHTML = '';
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
            table.className = 'message-table';
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
                if (idx >= TABLE_ROW_CLAMP) tr.classList.add('message-table-row-hidden');
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
            block.className = 'message-text-block';
            renderMarkdownBlock(block, text);
            bodyEl.appendChild(block);
        }
        const items = list.map((m, index) => {
            const dt = new Date(m.time || Date.now());
            return { m, index, dt, label: dayLabel(dt) };
        }).slice(-50).reverse();
        let currentLabel = '';
        items.forEach(({ m, index }) => {
            const dt = new Date(m.time || Date.now());
            const label = dayLabel(dt);
            if (label !== currentLabel) {
                currentLabel = label;
                const header = document.createElement('div');
                header.className = 'chat-day';
                header.textContent = label;
                container.appendChild(header);
            }
            const item = document.createElement('div');
            item.className = 'message-item';
            const replyTo = scope === 'admin'
                ? String(m.owner || m.from || '').trim()
                : '';
            const isOwnAdminMessage = (m.from || '').toLowerCase() === (adminCreds.username || '').toLowerCase();
            if (isOwnAdminMessage) {
                item.classList.add('chat-item-own');
            }
            // Admin inbox messages now carry seenByUser/seenAtUser directly
            // (single doc under users/{owner}/messages, no mirrored copy).
            // Global messages keep their own seenBy-map handling and don't
            // use this pair.
            const receiptSeen = scope === 'admin' ? Boolean(m.seenByUser) : false;
            const receiptSeenAt = scope === 'admin' ? m.seenAtUser : '';
            const meta = document.createElement('div');
            meta.className = 'message-meta';
            const timeText = m.time ? fmtTime(dt) : '';
            meta.textContent = `${m.from || ''} -> ${m.to || ''} * ${timeText}`;
            const body = document.createElement('div');
            body.className = 'message-body';
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
            const actions = document.createElement('div');
            actions.className = 'message-actions';
            const copyBtn = document.createElement('button');
            copyBtn.type = 'button';
            copyBtn.className = 'message-action-btn message-copy-btn';
            copyBtn.setAttribute('aria-label', 'Copy message');
            copyBtn.innerHTML = `
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <path d="M16 1H6a2 2 0 0 0-2 2v12h2V3h10V1zm2 4H10a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm0 16H10V7h8v14z"/>
                </svg>
            `;
            const delBtn = document.createElement('button');
            delBtn.type = 'button';
            delBtn.className = 'message-action-btn message-delete-btn';
            delBtn.setAttribute('aria-label', 'Delete message');
            delBtn.innerHTML = `
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <path d="M9 3h6l1 2h4v2H4V5h4l1-2zm1 6h2v9h-2V9zm4 0h2v9h-2V9zM7 9h2v9H7V9zM6 21h12a1 1 0 0 0 1-1V9H5v11a1 1 0 0 0 1 1z"/>
                </svg>
            `;
            delBtn.dataset.scope = scope;
            if (m.id) delBtn.dataset.id = String(m.id);
            if (scope === 'admin' && m.owner) delBtn.dataset.user = String(m.owner);
            delBtn.dataset.index = String(index);
            actions.appendChild(copyBtn);
            if (scope === 'admin' && replyTo && !isOwnAdminMessage) {
                const replyBtn = document.createElement('button');
                replyBtn.type = 'button';
                replyBtn.className = 'message-action-btn message-reply-btn';
                replyBtn.textContent = 'Reply';
                replyBtn.dataset.replyTo = replyTo;
                actions.appendChild(replyBtn);
            }
            actions.appendChild(delBtn);
            item.appendChild(meta);
            item.appendChild(body);
            if (receiptSeen && receiptSeenAt && isOwnAdminMessage) {
                const seen = document.createElement('div');
                seen.className = 'chat-seen';
                seen.textContent = `seen ${new Date(receiptSeenAt).toLocaleString()}`;
                item.appendChild(seen);
            }
            item.appendChild(actions);
            container.appendChild(item);
            body.classList.add('clamp');
            body.style.setProperty('--chat-line-clamp', String(LINE_CLAMP));
            const hasOverflow = body.scrollHeight > body.clientHeight + 1;
            if (hasOverflow || hasHiddenRows) {
                const toggle = document.createElement('button');
                toggle.type = 'button';
                toggle.className = 'message-action-btn message-toggle-btn';
                toggle.dataset.expanded = '0';
                toggle.textContent = 'Show more';
                toggle.addEventListener('click', () => {
                    const nextExpanded = toggle.dataset.expanded !== '1';
                    body.classList.toggle('clamp', !nextExpanded);
                    body.classList.toggle('expanded', nextExpanded);
                    body.querySelectorAll('tbody tr').forEach((tr, idx) => {
                        if (idx >= TABLE_ROW_CLAMP) {
                            tr.classList.toggle('message-table-row-hidden', !nextExpanded);
                        }
                    });
                    toggle.dataset.expanded = nextExpanded ? '1' : '0';
                    toggle.textContent = nextExpanded ? 'Show less' : 'Show more';
                });
                actions.appendChild(toggle);
            }
        });
    }

    function renderMessageStatus(container, message, isError) {
        if (!container) return;
        container.innerHTML = '';
        const item = document.createElement('div');
        item.className = `message-item${isError ? ' message-status-error' : ''}`;
        item.textContent = message;
        container.appendChild(item);
    }

    async function handleLogin(ev) {
        ev.preventDefault();
        setError('');
        const username = document.getElementById('adminUser').value.trim();
        const password = document.getElementById('adminPass').value.trim();
        try {
            const data = await fetchStats(username, password);
            adminCreds = { username, password };
            window.AdminSession = { username, password };
            document.dispatchEvent(new CustomEvent('admin-login', { detail: { username, password } }));
            window.AdminChat?.show?.();
            loginCard.classList.add('hidden');
            statsCard.classList.remove('hidden');
            renderTable(data.stats || []);
            renderDashboard(data.dashboard || {});
            showTable();
            refreshBtn.onclick = async () => {
                startRefreshVisual();
                try {
                    const latest = await fetchStats(username, password);
                    renderTable(latest.stats || []);
                    renderDashboard(latest.dashboard || {});
                } catch {
                    setError('Failed to refresh');
                } finally {
                    stopRefreshVisual();
                }
            };
            if (dashboardBtn && tableBtn) {
                dashboardBtn.onclick = showDashboard;
                tableBtn.onclick = showTable;
            }
            if (messagesBtn) messagesBtn.onclick = showMessages;
            if (approvalsBtn) approvalsBtn.onclick = showApprovals;
            if (approvalsRefresh) approvalsRefresh.onclick = loadApprovals;
            wireMessageForms();
            pollMessages();
        } catch (e) {
            setError('Invalid username or password');
        }
    }

    function showDashboard() {
        if (dashboardView) dashboardView.classList.remove('hidden');
        if (tableWrap) tableWrap.classList.add('hidden');
        if (messagesView) messagesView.classList.add('hidden');
        if (approvalsView) approvalsView.classList.add('hidden');
        messagesActive = false;
        approvalsActive = false;
        setActiveTab('dashboard');
        document.dispatchEvent(new CustomEvent('admin-messages-active', { detail: { active: false } }));
    }

    function showTable() {
        if (dashboardView) dashboardView.classList.add('hidden');
        if (tableWrap) tableWrap.classList.remove('hidden');
        if (messagesView) messagesView.classList.add('hidden');
        if (approvalsView) approvalsView.classList.add('hidden');
        messagesActive = false;
        approvalsActive = false;
        setActiveTab('table');
        document.dispatchEvent(new CustomEvent('admin-messages-active', { detail: { active: false } }));
    }

    function showMessages() {
        if (dashboardView) dashboardView.classList.add('hidden');
        if (tableWrap) tableWrap.classList.add('hidden');
        if (messagesView) messagesView.classList.remove('hidden');
        if (approvalsView) approvalsView.classList.add('hidden');
        messagesActive = true;
        approvalsActive = false;
        setActiveTab('messages');
        document.dispatchEvent(new CustomEvent('admin-messages-active', { detail: { active: true } }));
        pollMessages();
    }

    async function showApprovals() {
        if (dashboardView) dashboardView.classList.add('hidden');
        if (tableWrap) tableWrap.classList.add('hidden');
        if (messagesView) messagesView.classList.add('hidden');
        if (approvalsView) approvalsView.classList.remove('hidden');
        messagesActive = false;
        approvalsActive = true;
        setActiveTab('approvals');
        document.dispatchEvent(new CustomEvent('admin-messages-active', { detail: { active: false } }));
        await loadApprovals();
    }

    function setActiveTab(tab) {
        dashboardBtn?.classList.toggle('active', tab === 'dashboard');
        tableBtn?.classList.toggle('active', tab === 'table');
        messagesBtn?.classList.toggle('active', tab === 'messages');
        approvalsBtn?.classList.toggle('active', tab === 'approvals');
    }

    function renderApprovalList(items) {
        if (!approvalList) return;
        approvalList.innerHTML = '';
        if (!items.length) {
            approvalList.innerHTML = '<div class="logic-empty">No pending approvals.</div>';
            if (approvalPreview) approvalPreview.innerHTML = '<div class="logic-empty">No pending visualizations.</div>';
            if (approvalMeta) approvalMeta.textContent = '';
            approvalActions?.classList.add('hidden');
            selectedApprovalId = '';
            return;
        }
        items.forEach((item) => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'approval-item';
            button.dataset.id = item.id || '';
            const title = item?.visualization?.title || formatPageName(item?.sourceCode || '') || item.language || 'Visualization';
            button.innerHTML = `
                <div class="approval-item-title">${escapeHtml(title)}</div>
                <div class="approval-item-meta">${escapeHtml(item.submittedBy || 'unknown')} • ${escapeHtml((item.language || '').toUpperCase())}</div>
            `;
            button.addEventListener('click', () => selectApproval(item.id || ''));
            approvalList.appendChild(button);
        });
    }

    function selectApproval(id) {
        selectedApprovalId = id;
        const item = approvalItems.find((entry) => entry.id === id);
        approvalList?.querySelectorAll('.approval-item').forEach((node) => {
            node.classList.toggle('active', node.dataset.id === id);
        });
        if (!item) {
            approvalActions?.classList.add('hidden');
            return;
        }
        if (approvalMeta) {
            approvalMeta.textContent = `${item.submittedBy || 'unknown'} • ${new Date(item.createdAt || Date.now()).toLocaleString()}`;
        }
        approvalActions?.classList.remove('hidden');
        renderVisualizationPreview(approvalPreview, item.visualization || {});
    }

    async function loadApprovals() {
        try {
            approvalItems = await fetchPendingApprovals();
            renderApprovalList(approvalItems);
            if (approvalItems.length) selectApproval(approvalItems[0].id || '');
        } catch {
            if (approvalList) approvalList.innerHTML = '<div class="logic-empty">Failed to load approvals.</div>';
        }
    }

    function startRefreshVisual() {
        if (!refreshBtn) return;
        if (!refreshBtn.dataset.label) {
            refreshBtn.dataset.label = refreshBtn.textContent || 'Refresh';
        }
        refreshBtn.textContent = 'Refreshing...';
        refreshBtn.classList.add('refreshing');
        refreshBtn.disabled = true;
    }

    function stopRefreshVisual() {
        if (!refreshBtn) return;
        refreshBtn.textContent = refreshBtn.dataset.label || 'Refresh';
        refreshBtn.classList.remove('refreshing');
        refreshBtn.disabled = false;
    }

    function wireMessageForms() {
        attachWordPasteHandler(adminMessage);
        attachWordPasteHandler(adminGlobalMessage);
        adminSendForm?.addEventListener('submit', async (ev) => {
            ev.preventDefault();
            const to = (adminToUser?.value || '').trim();
            const raw = adminMessage?.value || '';
            if (!to || !raw.trim()) return;
            try {
                await sendAdminMessage('user', to, raw);
                adminMessage.value = '';
                await pollMessages();
            } catch (error) {
                renderMessageStatus(adminInbox, error instanceof Error ? error.message : 'Send failed.', true);
            }
        });
        adminGlobalForm?.addEventListener('submit', async (ev) => {
            ev.preventDefault();
            const raw = adminGlobalMessage?.value || '';
            if (!raw.trim()) return;
            try {
                await sendAdminMessage('global', '', raw);
                adminGlobalMessage.value = '';
                await pollMessages();
            } catch (error) {
                renderMessageStatus(globalMessages, error instanceof Error ? error.message : 'Send failed.', true);
            }
        });
    }

    let pollTimer = null;

    function schedulePoll(delay) {
        if (pollTimer) clearTimeout(pollTimer);
        pollTimer = setTimeout(pollMessages, delay);
    }

    async function pollMessages() {
        if (!messagesActive) {
            schedulePoll(300000);   //300000 ms = 300 seconds = 5 minutes
            return;
        }
        if (document.visibilityState === 'hidden') {
            schedulePoll(300000);   //300000 ms = 300 seconds = 5 minutes
            return;
        }
        try {
            const global = await fetchMessages('global');
            renderMessages(globalMessages, global, 'global');
            if (!global.length) renderMessageStatus(globalMessages, 'No global messages yet.', false);
        } catch (error) {
            renderMessageStatus(globalMessages, error instanceof Error ? error.message : 'Global messages fetch failed.', true);
        }
        schedulePoll(10000);
    }

    async function deleteMessages(scope, index, deleteAll, id, user) {
        if (!endpoint) throw new Error('Missing endpoint');
        const res = await fetch(endpoint, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                eventType: 'message_delete',
                scope,
                index,
                id,
                user,
                deleteAll,
                username: adminCreds.username,
                password: adminCreds.password
            })
        });
        const json = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(json?.error || json?.detail || `Delete failed (${res.status})`);
    }

    adminInbox?.addEventListener('click', async (ev) => {
        const copyBtn = ev.target?.closest('.message-copy-btn');
        if (copyBtn) {
            const item = copyBtn.closest('.message-item');
            const msgEl = item?.querySelector('.message-body');
            const msg = msgEl?.dataset.raw || msgEl?.textContent || '';
            copyText(msg);
            return;
        }
        const replyBtn = ev.target?.closest('.message-reply-btn');
        if (replyBtn) {
            const to = replyBtn.dataset.replyTo || '';
            if (adminToUser) adminToUser.value = to;
            adminMessage?.focus();
            return;
        }
        const btn = ev.target?.closest('button[data-index]');
        if (!btn) return;
        const idx = Number(btn.dataset.index);
        const id = btn.dataset.id || '';
        const user = btn.dataset.user || '';
        const scope = btn.dataset.scope || 'admin';
        try {
            await deleteMessages(scope, idx, false, id, user);
            await pollMessages();
        } catch (error) {
            renderMessageStatus(adminInbox, error instanceof Error ? error.message : 'Delete failed.', true);
        }
    });

    globalMessages?.addEventListener('click', async (ev) => {
        const copyBtn = ev.target?.closest('.message-copy-btn');
        if (copyBtn) {
            const item = copyBtn.closest('.message-item');
            const msgEl = item?.querySelector('.message-body');
            const msg = msgEl?.dataset.raw || msgEl?.textContent || '';
            copyText(msg);
            return;
        }
        const btn = ev.target?.closest('button[data-index]');
        if (!btn) return;
        const idx = Number(btn.dataset.index);
        const id = btn.dataset.id || '';
        const scope = btn.dataset.scope || 'global';
        try {
            await deleteMessages(scope, idx, false, id);
            await pollMessages();
        } catch (error) {
            renderMessageStatus(globalMessages, error instanceof Error ? error.message : 'Delete failed.', true);
        }
    });

    adminInboxClear?.addEventListener('click', async () => {
        try {
            await deleteMessages('admin', 0, true, '');
            await pollMessages();
        } catch (error) {
            renderMessageStatus(adminInbox, error instanceof Error ? error.message : 'Delete failed.', true);
        }
    });

    globalMessagesClear?.addEventListener('click', async () => {
        try {
            await deleteMessages('global', 0, true, '');
            await pollMessages();
        } catch (error) {
            renderMessageStatus(globalMessages, error instanceof Error ? error.message : 'Delete failed.', true);
        }
    });

    approvalApprove?.addEventListener('click', async () => {
        if (!selectedApprovalId) return;
        await reviewApproval(selectedApprovalId, 'approve');
        await loadApprovals();
    });

    approvalReject?.addEventListener('click', async () => {
        if (!selectedApprovalId) return;
        await reviewApproval(selectedApprovalId, 'reject');
        await loadApprovals();
    });

    if (form) {
        form.addEventListener('submit', handleLogin);
    }
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
            if (messagesActive) pollMessages();
        }
    });
})();
