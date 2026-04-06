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
    const dashboardView = document.getElementById('dashboardView');
    const tableWrap = document.querySelector('.admin-table-wrap');
    const messagesView = document.getElementById('messagesView');
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

    let topPagesChart = null;
    let mostVisitedOriginChart = null;
    let dailyChart = null;
    let weeklyChart = null;
    let monthlyChart = null;
    let adminCreds = { username: '', password: '' };
    let messagesActive = false;

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
                ...payload
            })
        });
        if (!res.ok) throw new Error('Send failed');
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
        if (!res.ok) throw new Error('Fetch failed');
        const json = await res.json();
        return json.messages || [];
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
            if ((m.from || '').toLowerCase() === (adminCreds.username || '').toLowerCase()) {
                item.classList.add('chat-item-own');
            }
            const meta = document.createElement('div');
            meta.className = 'message-meta';
            const timeText = m.time ? fmtTime(dt) : '';
            meta.textContent = `${m.from || ''} -> ${m.to || ''} * ${timeText}`;
            const body = document.createElement('div');
            body.className = 'message-body';
            body.textContent = m.message || '';
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
            delBtn.dataset.index = String(index);
            actions.appendChild(copyBtn);
            actions.appendChild(delBtn);
            item.appendChild(meta);
            item.appendChild(body);
            if (m.seenAt && (m.from || '').toLowerCase() === (adminCreds.username || '').toLowerCase()) {
                const seen = document.createElement('div');
                seen.className = 'chat-seen';
                seen.textContent = `seen ${new Date(m.seenAt).toLocaleString()}`;
                item.appendChild(seen);
            }
            item.appendChild(actions);
            container.appendChild(item);
        });
    }

    async function handleLogin(ev) {
        ev.preventDefault();
        setError('');
        const username = document.getElementById('adminUser').value.trim();
        const password = document.getElementById('adminPass').value.trim();
        try {
            const data = await fetchStats(username, password);
            adminCreds = { username, password };
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
        messagesActive = false;
        setActiveTab('dashboard');
    }

    function showTable() {
        if (dashboardView) dashboardView.classList.add('hidden');
        if (tableWrap) tableWrap.classList.remove('hidden');
        if (messagesView) messagesView.classList.add('hidden');
        messagesActive = false;
        setActiveTab('table');
    }

    function showMessages() {
        if (dashboardView) dashboardView.classList.add('hidden');
        if (tableWrap) tableWrap.classList.add('hidden');
        if (messagesView) messagesView.classList.remove('hidden');
        messagesActive = true;
        setActiveTab('messages');
        pollMessages();
    }

    function setActiveTab(tab) {
        dashboardBtn?.classList.toggle('active', tab === 'dashboard');
        tableBtn?.classList.toggle('active', tab === 'table');
        messagesBtn?.classList.toggle('active', tab === 'messages');
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
        adminSendForm?.addEventListener('submit', async (ev) => {
            ev.preventDefault();
            const to = (adminToUser?.value || '').trim();
            const raw = adminMessage?.value || '';
            if (!to || !raw.trim()) return;
            await sendAdminMessage('user', to, raw);
            adminMessage.value = '';
            await pollMessages();
        });
        adminGlobalForm?.addEventListener('submit', async (ev) => {
            ev.preventDefault();
            const raw = adminGlobalMessage?.value || '';
            if (!raw.trim()) return;
            await sendAdminMessage('global', '', raw);
            adminGlobalMessage.value = '';
            await pollMessages();
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
            const inbox = await fetchMessages('admin');
            const global = await fetchMessages('global');
            renderMessages(adminInbox, inbox, 'admin');
            renderMessages(globalMessages, global, 'global');
        } catch {}
        schedulePoll(10000);
    }

    async function deleteMessages(scope, index, deleteAll, id) {
        if (!endpoint) throw new Error('Missing endpoint');
        const res = await fetch(endpoint, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                eventType: 'message_delete',
                scope,
                index,
                deleteAll,
                username: adminCreds.username,
                password: adminCreds.password
            })
        });
        if (!res.ok) throw new Error('Delete failed');
    }

    adminInbox?.addEventListener('click', async (ev) => {
        const copyBtn = ev.target?.closest('.message-copy-btn');
        if (copyBtn) {
            const item = copyBtn.closest('.message-item');
            const msg = item?.querySelector('.message-body')?.textContent || '';
            copyText(msg);
            return;
        }
        const btn = ev.target?.closest('button[data-index]');
        if (!btn) return;
        const idx = Number(btn.dataset.index);
        const id = btn.dataset.id || '';
        const scope = btn.dataset.scope || 'admin';
        await deleteMessages(scope, idx, false, id);
        await pollMessages();
    });

    globalMessages?.addEventListener('click', async (ev) => {
        const copyBtn = ev.target?.closest('.message-copy-btn');
        if (copyBtn) {
            const item = copyBtn.closest('.message-item');
            const msg = item?.querySelector('.message-body')?.textContent || '';
            copyText(msg);
            return;
        }
        const btn = ev.target?.closest('button[data-index]');
        if (!btn) return;
        const idx = Number(btn.dataset.index);
        const id = btn.dataset.id || '';
        const scope = btn.dataset.scope || 'global';
        await deleteMessages(scope, idx, false, id);
        await pollMessages();
    });

    adminInboxClear?.addEventListener('click', async () => {
        await deleteMessages('admin', 0, true, '');
        await pollMessages();
    });

    globalMessagesClear?.addEventListener('click', async () => {
        await deleteMessages('global', 0, true, '');
        await pollMessages();
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
