(() => {
    'use strict';

    const VISIT_KEY = 'visitRecorded';
    const NAME_KEY = 'visitorName';
    const KNOWN_KEY = 'knownUser';
    const WELCOME_KEY = 'welcomeMessage';
    const ANON_KEY = 'anonRecorded';
    const INTRO_KEY = 'introSeen';

    function $(id) { return document.getElementById(id); }

    function getNextParam() {
        const params = new URLSearchParams(window.location.search);
        return params.get('next') || '';
    }

    function safeNextUrl(next) {
        try {
            const url = new URL(next, window.location.origin);
            if (url.origin !== window.location.origin) return '';
            const parts = window.location.pathname.split('/').filter(Boolean);
            const base = parts.length > 0 ? `/${parts[0]}/` : '/';
            if (!url.pathname.startsWith(base)) return '';
            return url.href;
        } catch {
            return '';
        }
    }

    function showModal() {
        const modal = $('visitModal');
        if (!modal) return;
        modal.classList.remove('hidden');
        const input = $('loginUser');
        if (input) input.focus();
    }

    function hideModal() {
        const modal = $('visitModal');
        if (!modal) return;
        modal.classList.add('hidden');
    }

    function getIntroMode() {
        const raw = String(window.INTRO_MODE || '').trim().toLowerCase();
        if (raw === 'once' || raw === 'session' || raw === 'always') return raw;
        return 'always';
    }

    function hasSeenIntro() {
        const mode = getIntroMode();
        if (mode === 'once') {
            try { return localStorage.getItem(INTRO_KEY) === '1'; } catch {}
        }
        if (mode === 'session') {
            try { return sessionStorage.getItem(INTRO_KEY) === '1'; } catch {}
        }
        return false;
    }

    function markIntroSeen() {
        const mode = getIntroMode();
        if (mode === 'once') {
            try { localStorage.setItem(INTRO_KEY, '1'); } catch {}
            return;
        }
        if (mode === 'session') {
            try { sessionStorage.setItem(INTRO_KEY, '1'); } catch {}
        }
    }

    function showIntroIfNeeded(onDone) {
        const modal = $('introModal');
        if (!modal) {
            if (typeof onDone === 'function') onDone();
            return;
        }
        if (hasSeenIntro()) {
            if (typeof onDone === 'function') onDone();
            return;
        }

        let finished = false;
        function finish() {
            if (finished) return;
            finished = true;
            modal.classList.add('hidden');
            markIntroSeen();
            if (typeof onDone === 'function') onDone();
        }

        modal.classList.remove('hidden');
        const continueBtn = $('introContinue');
        const closeBtn = $('introClose');
        continueBtn?.addEventListener('click', finish);
        closeBtn?.addEventListener('click', finish);
        modal.addEventListener('click', (ev) => {
            if (ev.target === modal) finish();
        });
        document.addEventListener('keydown', (ev) => {
            if (ev.key === 'Escape') finish();
        }, { once: true });
    }

    function validateName(name) {
        const trimmed = String(name || '').trim();
        if (trimmed.length < 2 || trimmed.length > 40) return '';
        if (!/^[A-Za-z0-9][A-Za-z0-9._-]*$/.test(trimmed)) return '';
        return trimmed;
    }

    function setError(msg) {
        const el = $('visitError');
        if (el) el.textContent = msg || '';
    }

    function showBanner(message) {
        const banner = $('welcomeBanner');
        if (!banner) return;
        banner.textContent = message;
        banner.classList.remove('hidden');
    }

    function getStoredGeo() {
        try {
            const raw = sessionStorage.getItem('geo');
            return raw ? JSON.parse(raw) : null;
        } catch {
            return null;
        }
    }

    function storeGeo(geo) {
        try {
            sessionStorage.setItem('geo', JSON.stringify(geo));
        } catch {}
    }

    function getGeoAsync() {
        return new Promise((resolve) => {
            if (!navigator.geolocation) return resolve(null);
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const geo = {
                        lat: pos.coords.latitude,
                        lng: pos.coords.longitude,
                        accuracy: pos.coords.accuracy
                    };
                    resolve(geo);
                },
                () => resolve(null),
                { enableHighAccuracy: false, timeout: 5000, maximumAge: 600000 }
            );
        });
    }

    async function sendLogin(username, password) {
        const endpoint = window.VISIT_ENDPOINT || '';
        if (!endpoint) return { knownUser: false };

        const geo = getStoredGeo();
        const payload = {
            eventType: 'auth',
            username,
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
            platform: navigator.platform || '',
            vendor: navigator.vendor || '',
            hardwareConcurrency: navigator.hardwareConcurrency || '',
            deviceMemory: navigator.deviceMemory || '',
            connection: navigator.connection?.effectiveType || '',
            languages: navigator.languages?.join(',') || '',
            cookiesEnabled: navigator.cookieEnabled,
            geo: geo || undefined,
        };

        try {
            const res = await fetch(endpoint, {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(payload),
            });
            const json = await res.json().catch(() => ({}));
            if (!res.ok) return { ok: false };
            return { ok: true, knownUser: Boolean(json.knownUser) };
        } catch (e) {
            // Ignore network errors to avoid blocking UX
            return { ok: false };
        }
    }

    async function sendSignup(username, password) {
        const endpoint = window.VISIT_ENDPOINT || '';
        if (!endpoint) return { ok: false };
        const payload = {
            eventType: 'signup',
            username,
            password
        };
        try {
            const res = await fetch(endpoint, {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(payload),
            });
            if (!res.ok) return { ok: false, status: res.status };
            return { ok: true };
        } catch {
            return { ok: false };
        }
    }

    async function sendAnonymousVisit() {
        const endpoint = window.VISIT_ENDPOINT || '';
        if (!endpoint) return;
        if (sessionStorage.getItem(ANON_KEY)) return;
        sessionStorage.setItem(ANON_KEY, '1');
        const payload = {
            eventType: 'anon',
            name: 'anonymous',
            clientTime: new Date().toISOString(),
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || '',
            locale: navigator.language || '',
            page: window.location.href,
            referrer: document.referrer || '',
            userAgent: navigator.userAgent || ''
        };
        try {
            await fetch(endpoint, {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(payload),
                keepalive: true,
            });
        } catch {}
    }

    function bind() {
        const next = getNextParam();
        const nextUrl = safeNextUrl(next);
        const pageStart = Date.now();

        if (sessionStorage.getItem(VISIT_KEY)) {
            const name = sessionStorage.getItem(NAME_KEY) || '';
            const known = sessionStorage.getItem(KNOWN_KEY) === '1';
            const msg = known ? `Welcome back, ${name}` : `Welcome, ${name}`;
            if (name) showBanner(msg);
            if (nextUrl) window.location.replace(nextUrl);
            return;
        }

        sendAnonymousVisit();
        showIntroIfNeeded(showModal);

        const loginForm = $('loginForm');
        const loginUser = $('loginUser');
        const loginPass = $('loginPass');
        const loginError = $('loginError');
        const signupForm = $('signupForm');
        const signupUser = $('signupUser');
        const signupPass = $('signupPass');
        const signupConfirm = $('signupConfirm');
        const signupError = $('signupError');
        const loginTab = $('loginTab');
        const signupTab = $('signupTab');
        const loginPanel = $('loginPanel');
        const signupPanel = $('signupPanel');
        const visitClose = $('visitClose');

        if (!loginForm || !loginUser || !loginPass) return;

        function showLogin() {
            loginTab.classList.add('active');
            signupTab.classList.remove('active');
            loginPanel.classList.remove('hidden');
            signupPanel.classList.add('hidden');
        }

        function showSignup() {
            signupTab.classList.add('active');
            loginTab.classList.remove('active');
            signupPanel.classList.remove('hidden');
            loginPanel.classList.add('hidden');
        }

        loginTab?.addEventListener('click', showLogin);
        signupTab?.addEventListener('click', showSignup);
        visitClose?.addEventListener('click', hideModal);

        // Default to login only
        showLogin();

        loginForm.addEventListener('submit', async (ev) => {
            ev.preventDefault();
            if (loginError) loginError.textContent = '';
            const username = validateName(loginUser.value);
            const password = String(loginPass.value || '');
            if (!username || password.length < 6) {
                if (loginError) loginError.textContent = 'Enter valid username and password.';
                return;
            }
            const result = await sendLogin(username, password);
            if (!result.ok) {
                if (loginError) loginError.textContent = 'Invalid username or password.';
                return;
            }
            sessionStorage.setItem(VISIT_KEY, '1');
            sessionStorage.setItem(NAME_KEY, username);
            hideModal();
            const geo = await getGeoAsync();
            if (geo) storeGeo(geo);
            sessionStorage.setItem(KNOWN_KEY, result.knownUser ? '1' : '0');
            const msg = `Welcome back, ${username}`;
            sessionStorage.setItem(WELCOME_KEY, msg);
            showBanner(msg);
            document.dispatchEvent(new CustomEvent('visit-login', { detail: { username } }));

            // Track index page view + exit after login
            const endpoint = window.VISIT_ENDPOINT || '';
            if (endpoint) {
                let geoData = null;
                try {
                    const raw = sessionStorage.getItem('geo');
                    geoData = raw ? JSON.parse(raw) : null;
                } catch {}
                const basePayload = {
                    eventType: 'page_view',
                    name: username,
                    clientTime: new Date().toISOString(),
                    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || '',
                    locale: navigator.language || '',
                    page: window.location.href,
                    referrer: document.referrer || '',
                    userAgent: navigator.userAgent || '',
                    geo: geoData || undefined,
                };
                fetch(endpoint, {
                    method: 'POST',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify(basePayload),
                    keepalive: true,
                }).catch(() => {});

                let sentExit = false;
                function sendExit() {
                    if (sentExit) return;
                    sentExit = true;
                    const durationMs = Date.now() - pageStart;
                    const payload = {
                        ...basePayload,
                        eventType: 'page_exit',
                        durationMs
                    };
                    const body = JSON.stringify(payload);
                    if (navigator.sendBeacon) {
                        try {
                            const blob = new Blob([body], { type: 'application/json' });
                            navigator.sendBeacon(endpoint, blob);
                            return;
                        } catch {}
                    }
                    fetch(endpoint, {
                        method: 'POST',
                        headers: { 'content-type': 'application/json' },
                        body,
                        keepalive: true,
                    }).catch(() => {});
                }
                window.addEventListener('beforeunload', sendExit);
                document.addEventListener('visibilitychange', () => {
                    if (document.visibilityState === 'hidden') sendExit();
                });
            }

            if (nextUrl) window.location.replace(nextUrl);
        });

        signupForm?.addEventListener('submit', async (ev) => {
            ev.preventDefault();
            if (signupError) signupError.textContent = '';
            const username = validateName(signupUser.value);
            const password = String(signupPass.value || '');
            const confirm = String(signupConfirm.value || '');
            if (!username || password.length < 6) {
                if (signupError) signupError.textContent = 'Enter valid username and password.';
                return;
            }
            if (password !== confirm) {
                if (signupError) signupError.textContent = 'Passwords do not match.';
                return;
            }
            const result = await sendSignup(username, password);
            if (!result.ok) {
                if (result.status === 409) {
                    if (signupError) signupError.textContent = 'Username already exists.';
                } else {
                    if (signupError) signupError.textContent = 'Signup failed.';
                }
                return;
            }
            // Switch to login after signup
            signupPass.value = '';
            signupConfirm.value = '';
            showLogin();
            if (loginError) loginError.textContent = 'Signup successful. Please login.';
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', bind);
    } else {
        bind();
    }
})();
