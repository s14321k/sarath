(() => {
    'use strict';

    const endpoint = window.VISIT_ENDPOINT || '';
    let user = sessionStorage.getItem('visitorName') || '';

    const container = document.createElement('div');
    container.className = 'chat-widget';
    container.innerHTML = `
        <div class="chat-header">Messages</div>
        <div class="chat-status hidden" id="chatStatus"></div>
        <div class="chat-tabs">
            <button type="button" class="chat-tab active" data-tab="global">Global</button>
            <button type="button" class="chat-tab" data-tab="admin">Admin</button>
        </div>
        <div class="chat-body" id="chatBody"></div>
        <form class="chat-form" id="chatForm">
            <input type="text" id="chatInput" placeholder="Type a message...">
            <button type="submit">Send</button>
        </form>
    `;
    document.body.appendChild(container);

    const bodyEl = container.querySelector('#chatBody');
    const form = container.querySelector('#chatForm');
    const input = container.querySelector('#chatInput');
    const statusEl = container.querySelector('#chatStatus');
    const tabs = container.querySelectorAll('.chat-tab');
    let current = 'global';
    let networkOk = true;
    let pollTimer = null;

    tabs.forEach((t) => {
        t.addEventListener('click', () => {
            tabs.forEach((x) => x.classList.remove('active'));
            t.classList.add('active');
            current = t.dataset.tab;
            poll();
        });
    });

    form.addEventListener('submit', async (ev) => {
        ev.preventDefault();
        if (!endpoint || !user) {
            showStatus('Chat is unavailable. Please login and allow requests.');
            return;
        }
        const msg = (input.value || '').trim();
        if (!msg) return;
        await sendMessage(current, msg);
        input.value = '';
        poll();
    });

    async function sendMessage(scope, message) {
        if (!endpoint || !user) return;
        try {
            const res = await fetch(endpoint, {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({
                    eventType: 'message_send',
                    scope: scope === 'global' ? 'global' : 'admin',
                    from: user,
                    to: scope === 'admin' ? 'admin' : '',
                    message
                })
            });
            if (!res.ok) throw new Error('Send failed');
            showStatus('');
        } catch {
            networkOk = false;
            showStatus('Chat is blocked by the browser or network.');
        }
    }

    async function fetchMessages(scope) {
        if (!endpoint || !user) return [];
        try {
            const res = await fetch(endpoint, {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({
                    eventType: 'message_fetch',
                    scope: scope === 'global' ? 'global' : 'user',
                    user
                })
            });
            if (!res.ok) throw new Error('Fetch failed');
            const json = await res.json().catch(() => ({}));
            showStatus('');
            return json.messages || [];
        } catch {
            networkOk = false;
            showStatus('Chat is blocked by the browser or network.');
            return [];
        }
    }

    function render(list) {
        bodyEl.innerHTML = '';
        list.slice(-50).forEach((m) => {
            const row = document.createElement('div');
            row.className = 'chat-item';
            row.innerHTML = `<div class="chat-meta">${m.from || ''} • ${m.time || ''}</div><div>${m.message || ''}</div>`;
            bodyEl.appendChild(row);
        });
        bodyEl.scrollTop = bodyEl.scrollHeight;
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

    function schedulePoll(delay) {
        if (pollTimer) clearTimeout(pollTimer);
        pollTimer = setTimeout(poll, delay);
    }

    async function poll() {
        if (document.visibilityState === 'hidden') {
            schedulePoll(30000);
            return;
        }
        try {
            const list = await fetchMessages(current);
            render(list);
        } catch {}
        schedulePoll(networkOk ? 10000 : 30000);
    }

    if (!endpoint || !user) {
        showStatus('Chat is unavailable until you login.');
    }
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
            poll();
        }
    });
    document.addEventListener('visit-login', (ev) => {
        const name = ev?.detail?.username || sessionStorage.getItem('visitorName') || '';
        if (name) {
            user = name;
            showStatus('');
            poll();
        }
    });
    poll();
})();
