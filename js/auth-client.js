(() => {
    'use strict';

    const SESSION_KEYS = {
        visit: 'visitRecorded',
        user: 'visitorName',
        known: 'knownUser',
        token: 'visitSessionToken',
        welcome: 'welcomeMessage'
    };

    function validateName(value) {
        const name = String(value || '').trim();
        if (name.length < 2 || name.length > 40) return '';
        return /^[A-Za-z0-9][A-Za-z0-9._-]*$/.test(name) ? name : '';
    }

    function safeNextUrl(next) {
        try {
            const url = new URL(next || 'index.html', window.location.href);
            if (url.origin !== window.location.origin) return 'index.html';
            return url.href;
        } catch {
            return 'index.html';
        }
    }

    function getSession() {
        try {
            return {
                user: sessionStorage.getItem(SESSION_KEYS.user) || '',
                token: sessionStorage.getItem(SESSION_KEYS.token) || '',
                visitRecorded: sessionStorage.getItem(SESSION_KEYS.visit) === '1'
            };
        } catch {
            return { user: '', token: '', visitRecorded: false };
        }
    }

    function isAuthenticated() {
        const session = getSession();
        return Boolean(session.visitRecorded && session.user && session.token);
    }

    function saveSession(username, result) {
        sessionStorage.setItem(SESSION_KEYS.visit, '1');
        sessionStorage.setItem(SESSION_KEYS.user, username);
        sessionStorage.setItem(SESSION_KEYS.known, result?.knownUser ? '1' : '0');
        sessionStorage.setItem(SESSION_KEYS.token, String(result?.sessionToken || ''));
        sessionStorage.setItem(SESSION_KEYS.welcome, `Welcome back, ${username}`);
    }

    function clearSession() {
        Object.values(SESSION_KEYS).forEach((key) => {
            try { sessionStorage.removeItem(key); } catch {}
        });
    }

    async function postVisit(payload) {
        const endpoint = window.VISIT_ENDPOINT || '';
        if (!endpoint) throw new Error('VISIT_ENDPOINT is not configured');
        const response = await fetch(endpoint, {
            method: 'POST',
            body: encodeVisitPayload(payload)
        });
        const data = await response.json().catch(() => ({}));
        if (!response.ok) {
            const err = new Error(data?.error || data?.detail || `HTTP ${response.status}`);
            // Surface backend lockout/attempt info (see index.js's eventType
            // 'auth' handler) so the UI can show a concrete attempts-left
            // count or a wait-time warning instead of a generic message.
            if (data && typeof data.remainingAttempts !== 'undefined') {
                err.remainingAttempts = data.remainingAttempts;
            }
            if (data && typeof data.retryAfterMs !== 'undefined') {
                err.retryAfterMs = data.retryAfterMs;
            }
            if (response.status === 423) {
                err.locked = true;
            }
            throw err;
        }
        return data;
    }

    function encodeVisitPayload(payload) {
        const params = new URLSearchParams();
        Object.entries(payload || {}).forEach(([key, value]) => {
            if (typeof value === 'undefined' || value === null) return;
            params.set(key, typeof value === 'object' ? JSON.stringify(value) : String(value));
        });
        return params;
    }

    async function login(username, password) {
        const user = validateName(username);
        if (!user || String(password || '').length < 6) {
            throw new Error('Enter valid username and password.');
        }
        const result = await postVisit({
            eventType: 'auth',
            username: user,
            password,
            clientTime: new Date().toISOString(),
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || '',
            locale: navigator.language || '',
            page: window.location.href,
            referrer: document.referrer || '',
            userAgent: navigator.userAgent || '',
            screen: `${screen.width}x${screen.height}`,
            windowSize: `${window.innerWidth}x${window.innerHeight}`,
            colorDepth: screen.colorDepth || '',
            platform: navigator.platform || ''
        });
        if (!result?.sessionToken) {
            throw new Error('Login succeeded but no session token was returned. Redeploy the backend session-token changes.');
        }
        saveSession(user, result);
        return result;
    }

    async function signup(username, password) {
        const user = validateName(username);
        if (!user || String(password || '').length < 6) {
            throw new Error('Enter valid username and password.');
        }
        return postVisit({ eventType: 'signup', username: user, password });
    }

    window.AuthClient = {
        clearSession,
        getSession,
        isAuthenticated,
        login,
        safeNextUrl,
        signup,
        validateName
    };
})();
