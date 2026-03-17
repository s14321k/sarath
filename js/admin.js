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
    const topPagesChartEl = document.getElementById('topPagesChart');
    const topPagesLegend = document.getElementById('topPagesLegend');
    const dailyChartEl = document.getElementById('dailyChart');
    const weeklyChartEl = document.getElementById('weeklyChart');
    const monthlyChartEl = document.getElementById('monthlyChart');

    let topPagesChart = null;
    let dailyChart = null;
    let weeklyChart = null;
    let monthlyChart = null;

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
                item.textContent = `${formatPageName(p.page)} (${p.count}) | ${hours}h | ${lastSeen}`;
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
            mostVisitedPage.textContent = formatPageName(dashboard.mostVisitedPage.page);
            mostVisitedCount.textContent = `${dashboard.mostVisitedPage.count} visits`;
        } else {
            mostVisitedPage.textContent = '-';
            mostVisitedCount.textContent = '0 visits';
        }

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
