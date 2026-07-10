(() => {
    'use strict';

    const endpoint = window.VISIT_ENDPOINT || '';
    const ADMIN_CHAT_PAGE_SIZE = 5;
    const placeholder = document.getElementById('adminChat');
    const root = document.createElement('div');
    root.className = 'admin-chat-float hidden';
    document.body.appendChild(root);
    if (placeholder) {
        placeholder.innerHTML = '<div class="admin-chat-empty">Use the floating User Chats window.</div>';
    }

    let creds = window.AdminSession || { username: '', password: '' };
    let active = false;
    let selectedUser = '';
    let timer = null;
    let messages = [];
    let pollingEnabled = false;
    let threadPages = new Map();

    root.innerHTML = `
        <button type="button" class="admin-chat-toggle" data-chat-toggle>User Chats</button>
        <div class="admin-chat-panel hidden" data-chat-panel>
            <div class="admin-chat-panel-head">
                <strong>User Chats</strong>
                <div class="admin-chat-head-actions">
                    <button type="button" data-chat-refresh>Refresh</button>
                    <button type="button" data-chat-poll aria-pressed="false">Polling Off</button>
                    <button type="button" data-chat-close>Close</button>
                </div>
            </div>
            <div class="admin-chat-shell">
                <aside class="admin-chat-users" data-chat-users></aside>
                <section class="admin-chat-thread">
                    <div class="admin-chat-status" data-chat-status>Select a user conversation.</div>
                    <div class="admin-chat-messages" data-chat-messages></div>
                    <form class="admin-chat-compose" data-chat-compose>
                        <textarea data-chat-input placeholder="Reply to selected user"></textarea>
                        <button type="submit">Send</button>
                    </form>
                </section>
            </div>
        </div>
    `;

    const panel = root.querySelector('[data-chat-panel]');
    const toggle = root.querySelector('[data-chat-toggle]');
    const closeBtn = root.querySelector('[data-chat-close]');
    const refreshBtn = root.querySelector('[data-chat-refresh]');
    const pollBtn = root.querySelector('[data-chat-poll]');
    const usersEl = root.querySelector('[data-chat-users]');
    const messagesEl = root.querySelector('[data-chat-messages]');
    const statusEl = root.querySelector('[data-chat-status]');
    const form = root.querySelector('[data-chat-compose]');
    const input = root.querySelector('[data-chat-input]');

    function setStatus(message, isError) {
        if (!statusEl) return;
        statusEl.textContent = message || '';
        statusEl.classList.toggle('is-error', Boolean(isError));
    }

    function schedule(delay) {
        if (timer) clearTimeout(timer);
        if (!pollingEnabled) return;
        timer = setTimeout(refresh, delay);
    }

    function setPollingEnabled(enabled) {
        pollingEnabled = Boolean(enabled);
        if (pollBtn) {
            pollBtn.textContent = pollingEnabled ? 'Polling On' : 'Polling Off';
            pollBtn.setAttribute('aria-pressed', pollingEnabled ? 'true' : 'false');
        }
        if (!pollingEnabled && timer) {
            clearTimeout(timer);
            timer = null;
        }
        if (pollingEnabled && active) refresh();
    }

    function openPanel() {
        panel?.classList.remove('hidden');
        active = true;
        refresh(true);
    }

    function closePanel() {
        panel?.classList.add('hidden');
        active = false;
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
    }

    function escapeHtml(value) {
        return String(value ?? '').replace(/[&<>"']/g, (ch) => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
        }[ch]));
    }

    function groupMessages(list) {
        const map = new Map();
        list.forEach((msg) => {
            const owner = String(msg.owner || msg.from || msg.to || '').trim();
            if (!owner) return;
            if (!map.has(owner)) map.set(owner, []);
            map.get(owner).push(msg);
        });
        return Array.from(map.entries())
            .map(([user, items]) => ({
                user,
                items: items.slice().sort((a, b) => String(a.time || '').localeCompare(String(b.time || ''))),
                lastTime: items.reduce((last, item) => String(item.time || '') > last ? String(item.time || '') : last, ''),
                unread: items.filter((item) => !item.seenByAdmin && String(item.from || '').toLowerCase() !== String(creds.username || '').toLowerCase()).length
            }))
            .sort((a, b) => String(b.lastTime || '').localeCompare(String(a.lastTime || '')));
    }

    async function api(body) {
        if (!endpoint) throw new Error('Missing endpoint');
        const res = await fetch(endpoint, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(body)
        });
        const json = await res.json().catch(() => ({}));
        if (!res.ok) {
            const error = new Error(json?.message || json?.detail || json?.error || `HTTP ${res.status}`);
            error.code = json?.code || '';
            error.action = json?.action || '';
            error.indexUrl = json?.indexUrl || '';
            throw error;
        }
        return json;
    }

    async function fetchAdminMessages(markSeenUser) {
        const body = {
            eventType: 'message_fetch',
            scope: 'admin',
            username: creds.username,
            password: creds.password,
            limit: 300
        };
        if (markSeenUser) {
            body.markSeen = true;
            body.markSeenUser = markSeenUser;
        }
        const json = await api(body);
        return Array.isArray(json.messages) ? json.messages : [];
    }

    function mergeMessages(existing, incoming) {
        const map = new Map();
        [...(existing || []), ...(incoming || [])].forEach((msg) => {
            const key = msg.id || `${msg.time || ''}:${msg.from || ''}:${msg.message || ''}`;
            map.set(key, msg);
        });
        return Array.from(map.values()).sort((a, b) => String(a.time || '').localeCompare(String(b.time || '')));
    }

    async function fetchUserThread(user, options = {}) {
        const body = {
            eventType: 'message_fetch',
            scope: 'admin',
            threadUser: user,
            username: creds.username,
            password: creds.password,
            limit: options.limit || ADMIN_CHAT_PAGE_SIZE
        };
        if (options.beforeTime) body.beforeTime = options.beforeTime;
        if (options.markSeen) {
            body.markSeen = true;
            body.markSeenUser = user;
        }
        const json = await api(body);
        return {
            messages: Array.isArray(json.messages) ? json.messages : [],
            hasMore: Boolean(json.hasMore)
        };
    }

    async function sendToUser(user, message) {
        await api({
            eventType: 'message_send',
            scope: 'user',
            to: user,
            from: creds.username,
            password: creds.password,
            message
        });
    }

    async function deleteMessage(id, user) {
        await api({
            eventType: 'message_delete',
            scope: 'admin',
            id,
            user,
            username: creds.username,
            password: creds.password
        });
    }

    function renderUsers(groups) {
        if (!usersEl) return;
        if (!groups.length) {
            usersEl.innerHTML = '<div class="admin-chat-empty">No user chats yet.</div>';
            return;
        }
        if (!selectedUser || !groups.some((group) => group.user === selectedUser)) {
            selectedUser = groups[0].user;
        }
        usersEl.innerHTML = groups.map((group) => `
            <button type="button" class="admin-chat-user${group.user === selectedUser ? ' active' : ''}" data-user="${escapeHtml(group.user)}">
                <span>${escapeHtml(group.user)}</span>
                ${group.unread ? `<strong>${group.unread}</strong>` : ''}
            </button>
        `).join('');
    }

    function renderThread(groups) {
        const group = groups.find((item) => item.user === selectedUser);
        const page = threadPages.get(selectedUser);
        const threadItems = page?.messages || group?.items || [];
        if (!messagesEl) return;
        messagesEl.innerHTML = '';
        if (!group && !page) {
            setStatus('Select a user conversation.', false);
            if (form) form.classList.add('hidden');
            return;
        }
        if (form) form.classList.remove('hidden');
        setStatus(`Chat with ${selectedUser}`, false);
        if (page?.hasMore && threadItems.length) {
            const loadBtn = document.createElement('button');
            loadBtn.type = 'button';
            loadBtn.className = 'admin-chat-load-more';
            loadBtn.textContent = page.loadingOlder ? 'Loading...' : 'Load older messages';
            loadBtn.dataset.loadOlderThread = selectedUser;
            messagesEl.appendChild(loadBtn);
        }
        threadItems.forEach((msg) => {
            const isAdmin = String(msg.from || '').toLowerCase() === String(creds.username || '').toLowerCase();
            const row = document.createElement('div');
            row.className = `admin-chat-msg${isAdmin ? ' own' : ''}`;
            row.innerHTML = `
                <div class="admin-chat-meta">
                    <span>${escapeHtml(msg.from || '')}</span>
                    <span>${msg.time ? escapeHtml(new Date(msg.time).toLocaleString()) : ''}</span>
                </div>
                <div class="admin-chat-text">${escapeHtml(msg.message || '')}</div>
                <div class="admin-chat-actions">
                    <button type="button" data-delete-id="${escapeHtml(msg.id || '')}" data-delete-user="${escapeHtml(msg.owner || selectedUser || '')}">Delete</button>
                </div>
            `;
            const seenAt = isAdmin ? msg.seenAtUser : msg.seenAtAdmin;
            const seenLabel = isAdmin ? 'seen by user' : 'seen by admin';
            if (seenAt) {
                const seen = document.createElement('div');
                seen.className = 'admin-chat-seen';
                seen.textContent = `${seenLabel} ${new Date(seenAt).toLocaleString()}`;
                row.appendChild(seen);
            }
            messagesEl.appendChild(row);
        });
        messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    function render() {
        const groups = groupMessages(messages);
        renderUsers(groups);
        renderThread(groups);
    }

    function isIndexRequiredError(error) {
        return error?.code === 'FIRESTORE_MESSAGES_TIME_INDEX_REQUIRED'
            || /collection-group index|COLLECTION_GROUP_DESC|FAILED_PRECONDITION/i.test(String(error?.message || ''));
    }

    function renderIndexRequiredError(error) {
        if (usersEl) {
            usersEl.innerHTML = '<div class="admin-chat-empty">Index setup needed.</div>';
        }
        if (messagesEl) {
            messagesEl.innerHTML = '';
            const item = document.createElement('div');
            item.className = 'admin-chat-empty admin-chat-setup';
            const text = document.createElement('p');
            text.textContent = `${error.message || 'User Chats needs a Firestore index.'} ${error.action || 'Deploy gcp/firestore.indexes.json and wait until the index is ready.'}`;
            item.appendChild(text);
            if (error.indexUrl) {
                const link = document.createElement('a');
                link.href = error.indexUrl;
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
                link.textContent = 'Open Firebase index';
                item.appendChild(link);
            }
            messagesEl.appendChild(item);
        }
        if (form) form.classList.add('hidden');
        setStatus('Firestore index required for User Chats.', true);
    }

    async function refresh(markSelectedSeen = false) {
        if (!active || !creds.username || !creds.password) {
            schedule(300000);
            return;
        }
        try {
            messages = await fetchAdminMessages(markSelectedSeen ? selectedUser : '');
            render();
            if (selectedUser) {
                await loadSelectedThread(markSelectedSeen, true);
            }
            schedule(10000);
        } catch (error) {
            if (isIndexRequiredError(error)) {
                renderIndexRequiredError(error);
                schedule(300000);
                return;
            }
            setStatus(error instanceof Error ? error.message : 'Failed to load user chats.', true);
            schedule(30000);
        }
    }

    async function loadSelectedThread(markSeen, preserveLoaded = false) {
        if (!selectedUser) return;
        const currentPage = threadPages.get(selectedUser);
        const loadedCount = preserveLoaded ? Math.max(currentPage?.messages?.length || 0, ADMIN_CHAT_PAGE_SIZE) : ADMIN_CHAT_PAGE_SIZE;
        const wasNearBottom = messagesEl
            ? messagesEl.scrollTop + messagesEl.clientHeight >= messagesEl.scrollHeight - 40
            : true;
        const prevHeight = messagesEl?.scrollHeight || 0;
        const prevTop = messagesEl?.scrollTop || 0;
        const result = await fetchUserThread(selectedUser, { markSeen, limit: loadedCount });
        threadPages.set(selectedUser, {
            messages: result.messages,
            hasMore: result.hasMore,
            loadingOlder: false
        });
        render();
        if (messagesEl && preserveLoaded) {
            if (wasNearBottom) {
                messagesEl.scrollTop = messagesEl.scrollHeight;
            } else {
                messagesEl.scrollTop = Math.max(0, prevTop + (messagesEl.scrollHeight - prevHeight));
            }
        }
    }

    async function loadOlderThread() {
        if (!selectedUser) return;
        const page = threadPages.get(selectedUser);
        if (!page || page.loadingOlder || !page.hasMore || !page.messages.length) return;
        const beforeTime = page.messages[0]?.time || '';
        if (!beforeTime) return;
        const prevHeight = messagesEl.scrollHeight;
        page.loadingOlder = true;
        render();
        try {
            const result = await fetchUserThread(selectedUser, { beforeTime });
            threadPages.set(selectedUser, {
                messages: mergeMessages(result.messages, page.messages),
                hasMore: result.hasMore,
                loadingOlder: false
            });
            render();
            messagesEl.scrollTop = Math.max(0, messagesEl.scrollHeight - prevHeight);
        } catch (error) {
            page.loadingOlder = false;
            if (isIndexRequiredError(error)) renderIndexRequiredError(error);
            else setStatus(error instanceof Error ? error.message : 'Failed to load older messages.', true);
        }
    }

    usersEl?.addEventListener('click', (ev) => {
        const btn = ev.target.closest('[data-user]');
        if (!btn) return;
        selectedUser = btn.dataset.user || '';
        loadSelectedThread(true);
        input?.focus();
    });

    messagesEl?.addEventListener('click', async (ev) => {
        if (ev.target.closest('[data-load-older-thread]')) {
            await loadOlderThread();
            return;
        }
        const btn = ev.target.closest('[data-delete-id]');
        const id = btn?.dataset.deleteId || '';
        const user = btn?.dataset.deleteUser || selectedUser || '';
        if (!id) return;
        try {
            await deleteMessage(id, user);
            threadPages.delete(selectedUser);
            await refresh();
        } catch (error) {
            setStatus(error instanceof Error ? error.message : 'Delete failed.', true);
        }
    });

    messagesEl?.addEventListener('scroll', () => {
        if (messagesEl.scrollTop <= 16) loadOlderThread();
    });

    form?.addEventListener('submit', async (ev) => {
        ev.preventDefault();
        const message = input?.value || '';
        if (!selectedUser || !message.trim()) return;
        try {
            await sendToUser(selectedUser, message);
            input.value = '';
            threadPages.delete(selectedUser);
            await refresh(true);
        } catch (error) {
            setStatus(error instanceof Error ? error.message : 'Send failed.', true);
        }
    });

    toggle?.addEventListener('click', () => {
        if (panel?.classList.contains('hidden')) {
            openPanel();
        } else {
            closePanel();
        }
    });

    refreshBtn?.addEventListener('click', refresh);
    pollBtn?.addEventListener('click', () => setPollingEnabled(!pollingEnabled));
    closeBtn?.addEventListener('click', closePanel);

    document.addEventListener('admin-login', (ev) => {
        creds = ev.detail || creds;
        root.classList.remove('hidden');
    });

    document.addEventListener('admin-messages-active', (ev) => {
        active = Boolean(ev.detail?.active);
        if (active) openPanel();
    });

    window.AdminChat = {
        open: openPanel,
        close: closePanel,
        refresh,
        show() {
            root.classList.remove('hidden');
        }
    };

    if (creds.username && creds.password) {
        root.classList.remove('hidden');
    }
})();
