(() => {
    'use strict';

    const endpoint = window.VISIT_ENDPOINT || '';
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
        const globalBadge = container.querySelector('#globalBadge');
        const adminBadge = container.querySelector('#adminBadge');
        const tabs = container.querySelectorAll('.chat-tab');
        let current = 'global';
        let networkOk = true;
        let pollTimer = null;
        let minimized = false;
        let bounceTimer = null;
        let driftTimer = null;

        const bubble = document.createElement('button');
        bubble.type = 'button';
        bubble.className = 'chat-bubble hidden';
        bubble.textContent = 'Chat';
        document.body.appendChild(bubble);

        const resizer = document.createElement('div');
        resizer.className = 'chat-resizer';
        container.appendChild(resizer);

        function setMinimized(next) {
            minimized = next;
            if (minimized) {
                container.classList.add('chat-minimized');
                bubble.classList.remove('hidden');
                try { sessionStorage.setItem('chatMinimized', '1'); } catch {}
                schedulePoll(30000);
                startBubbleEffects();
            } else {
                container.classList.remove('chat-minimized');
                bubble.classList.add('hidden');
                try { sessionStorage.setItem('chatMinimized', '0'); } catch {}
                stopBubbleEffects();
                poll();
            }
        }

        minBtn?.addEventListener('click', () => setMinimized(true));

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

        function startBubbleEffects() {
            if (bounceTimer || driftTimer) return;
            bounceTimer = setInterval(() => {
                bubble.classList.add('chat-bounce');
                setTimeout(() => bubble.classList.remove('chat-bounce'), 600);
            }, 5000);
            driftTimer = setInterval(() => {
                const x = Math.max(10, Math.min(window.innerWidth - 70, Math.random() * (window.innerWidth - 70)));
                const y = Math.max(10, Math.min(window.innerHeight - 70, Math.random() * (window.innerHeight - 70)));
                bubble.style.left = `${x}px`;
                bubble.style.top = `${y}px`;
            }, 30000);
        }

        function stopBubbleEffects() {
            if (bounceTimer) clearInterval(bounceTimer);
            if (driftTimer) clearInterval(driftTimer);
            bounceTimer = null;
            driftTimer = null;
            bubble.classList.remove('chat-bounce');
        }

    tabs.forEach((t) => {
        t.addEventListener('click', () => {
            tabs.forEach((x) => x.classList.remove('active'));
            t.classList.add('active');
            current = t.dataset.tab;
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
        autosizeInput();
        poll();
        });

        input.addEventListener('keydown', (ev) => {
            if (ev.key === 'Enter' && !ev.shiftKey) {
                ev.preventDefault();
                form.requestSubmit();
            }
        });
        input.addEventListener('input', autosizeInput);
        autosizeInput();

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

        async function fetchMessages(scope, markSeen) {
        if (!endpoint || !user) return { messages: [], unseenCount: 0 };
        try {
            const res = await fetch(endpoint, {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({
                    eventType: 'message_fetch',
                    scope: scope === 'global' ? 'global' : 'user',
                    user,
                    markSeen: Boolean(markSeen)
                })
            });
            if (!res.ok) throw new Error('Fetch failed');
            const json = await res.json().catch(() => ({}));
            showStatus('');
            return { messages: json.messages || [], unseenCount: Number(json.unseenCount || 0) };
        } catch {
            networkOk = false;
            showStatus('Chat is blocked by the browser or network.');
            return { messages: [], unseenCount: 0 };
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

        function render(list) {
        bodyEl.innerHTML = '';
        const items = list.slice(-50).map((m) => {
            const dt = new Date(m.time || Date.now());
            return { m, dt, label: dayLabel(dt) };
        });
        let currentLabel = '';
        items.forEach(({ m, dt, label }) => {
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
            body.textContent = m.message || '';
            row.appendChild(meta);
            row.appendChild(body);
            if (m.seenAt && (m.from || '').toLowerCase() === (user || '').toLowerCase()) {
                const seen = document.createElement('div');
                seen.className = 'chat-seen';
                seen.textContent = `seen ${new Date(m.seenAt).toLocaleString()}`;
                row.appendChild(seen);
            }
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
        if (minimized) {
            schedulePoll(30000);
            return;
        }
        if (document.visibilityState === 'hidden') {
            schedulePoll(30000);
            return;
        }
        try {
            const currentRes = await fetchMessages(current, true);
            render(currentRes.messages);
            const other = current === 'global' ? 'admin' : 'global';
            const otherRes = await fetchMessages(other, false);
            if (current === 'global') {
                setBadge(globalBadge, 0);
                setBadge(adminBadge, otherRes.unseenCount);
            } else {
                setBadge(adminBadge, 0);
                setBadge(globalBadge, otherRes.unseenCount);
            }
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
        try {
            const saved = sessionStorage.getItem('chatMinimized') === '1';
            if (saved) setMinimized(true);
        } catch {}
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
