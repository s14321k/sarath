(() => {
    'use strict';

    const endpoint = window.VISIT_ENDPOINT || '';
    const form = document.getElementById('adminLoginForm');
    const err = document.getElementById('adminError');
    const loginCard = document.getElementById('loginCard');
    const statsCard = document.getElementById('statsCard');
    const tableBody = document.querySelector('#statsTable tbody');
    const refreshBtn = document.getElementById('refreshBtn');

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
        return json.stats || [];
    }

    async function handleLogin(ev) {
        ev.preventDefault();
        setError('');
        const username = document.getElementById('adminUser').value.trim();
        const password = document.getElementById('adminPass').value.trim();
        try {
            const stats = await fetchStats(username, password);
            loginCard.classList.add('hidden');
            statsCard.classList.remove('hidden');
            renderTable(stats);
            refreshBtn.onclick = async () => {
                try {
                    const latest = await fetchStats(username, password);
                    renderTable(latest);
                } catch {
                    setError('Failed to refresh');
                }
            };
        } catch (e) {
            setError('Invalid username or password');
        }
    }

    if (form) {
        form.addEventListener('submit', handleLogin);
    }
})();
