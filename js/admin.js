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
    const dashboardView = document.getElementById('dashboardView');
    const tableWrap = document.querySelector('.admin-table-wrap');
    const totalPagesCount = document.getElementById('totalPagesCount');
    const mostVisitedPage = document.getElementById('mostVisitedPage');
    const mostVisitedCount = document.getElementById('mostVisitedCount');
    const topPagesList = document.getElementById('topPagesList');
    const dailyList = document.getElementById('dailyList');
    const weeklyList = document.getElementById('weeklyList');
    const monthlyList = document.getElementById('monthlyList');

    function setError(msg) {
        if (err) err.textContent = msg || '';
    }

    function renderTable(rows) {
        tableBody.innerHTML = '';
        rows.forEach((row) => {
            const tr = document.createElement('tr');

            const nameTd = document.createElement('td');
            nameTd.textContent = row.name;

            const pagesTd = document.createElement('td');
            const pageList = document.createElement('div');
            pageList.className = 'page-list';
            (row.pages || []).forEach((p) => {
                const item = document.createElement('span');
                const hours = (Number(p.totalMs || 0) / 3600000).toFixed(2);
                const lastSeen = p.lastSeenMs ? new Date(p.lastSeenMs).toLocaleString() : '-';
                item.textContent = `${p.page} (${p.count}) | ${hours}h | ${lastSeen}`;
                pageList.appendChild(item);
            });
            pagesTd.appendChild(pageList);

            const totalTd = document.createElement('td');
            totalTd.textContent = String(row.total || 0);

            const loginCountTd = document.createElement('td');
            loginCountTd.textContent = String(row.loginCount || 0);

            const lastLoginTd = document.createElement('td');
            lastLoginTd.textContent = row.lastLogin
                ? new Date(row.lastLogin).toLocaleString()
                : '-';

            const uaTd = document.createElement('td');
            const uaList = document.createElement('div');
            uaList.className = 'ua-list';
            (row.userAgents || []).forEach((ua) => {
                const item = document.createElement('span');
                item.textContent = ua;
                uaList.appendChild(item);
            });
            uaTd.appendChild(uaList);

            tr.appendChild(nameTd);
            tr.appendChild(pagesTd);
            tr.appendChild(loginCountTd);
            tr.appendChild(lastLoginTd);
            tr.appendChild(totalTd);
            tr.appendChild(uaTd);
            tableBody.appendChild(tr);
        });
    }

    function renderDashboard(dashboard) {
        if (!dashboard) return;
        totalPagesCount.textContent = String(dashboard.totalPages || 0);
        if (dashboard.mostVisitedPage) {
            mostVisitedPage.textContent = dashboard.mostVisitedPage.page;
            mostVisitedCount.textContent = `${dashboard.mostVisitedPage.count} visits`;
        } else {
            mostVisitedPage.textContent = '-';
            mostVisitedCount.textContent = '0 visits';
        }

        topPagesList.innerHTML = '';
        (dashboard.topPages || []).forEach((p) => {
            const item = document.createElement('span');
            item.textContent = `${p.page} (${p.count})`;
            topPagesList.appendChild(item);
        });

        renderList(dailyList, dashboard.daily || []);
        renderList(weeklyList, dashboard.weekly || []);
        renderList(monthlyList, dashboard.monthly || []);
    }

    function renderList(container, items) {
        container.innerHTML = '';
        items.forEach((i) => {
            const item = document.createElement('span');
            item.textContent = `${i.label} (${i.count})`;
            container.appendChild(item);
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

    async function handleLogin(ev) {
        ev.preventDefault();
        setError('');
        const username = document.getElementById('adminUser').value.trim();
        const password = document.getElementById('adminPass').value.trim();
        try {
            const data = await fetchStats(username, password);
            loginCard.classList.add('hidden');
            statsCard.classList.remove('hidden');
            renderTable(data.stats || []);
            renderDashboard(data.dashboard || {});
            showTable();
            refreshBtn.onclick = async () => {
                try {
                    const latest = await fetchStats(username, password);
                    renderTable(latest.stats || []);
                    renderDashboard(latest.dashboard || {});
                } catch {
                    setError('Failed to refresh');
                }
            };
            if (dashboardBtn && tableBtn) {
                dashboardBtn.onclick = showDashboard;
                tableBtn.onclick = showTable;
            }
        } catch (e) {
            setError('Invalid username or password');
        }
    }

    function showDashboard() {
        if (dashboardView) dashboardView.classList.remove('hidden');
        if (tableWrap) tableWrap.classList.add('hidden');
    }

    function showTable() {
        if (dashboardView) dashboardView.classList.add('hidden');
        if (tableWrap) tableWrap.classList.remove('hidden');
    }

    if (form) {
        form.addEventListener('submit', handleLogin);
    }
})();
