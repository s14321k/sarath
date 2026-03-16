(() => {
    'use strict';

    const VISIT_KEY = 'visitRecorded';
    const NAME_KEY = 'visitorName';
    const KNOWN_KEY = 'knownUser';
    const WELCOME_KEY = 'welcomeMessage';

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
        const input = $('visitName');
        if (input) input.focus();
    }

    function hideModal() {
        const modal = $('visitModal');
        if (!modal) return;
        modal.classList.add('hidden');
    }

    function validateName(name) {
        const trimmed = String(name || '').trim();
        if (trimmed.length < 2 || trimmed.length > 40) return '';
        if (!/^[A-Za-z][A-Za-z\s.'-]*$/.test(trimmed)) return '';
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

    async function sendLogin(name) {
        const endpoint = window.VISIT_ENDPOINT || '';
        if (!endpoint) return { knownUser: false };

        const payload = {
            eventType: 'login',
            name,
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
        };

        try {
            const res = await fetch(endpoint, {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(payload),
            });
            const json = await res.json().catch(() => ({}));
            return { knownUser: Boolean(json.knownUser) };
        } catch (e) {
            // Ignore network errors to avoid blocking UX
            return { knownUser: false };
        }
    }

    function bind() {
        const next = getNextParam();
        const nextUrl = safeNextUrl(next);

        if (sessionStorage.getItem(VISIT_KEY)) {
            const name = sessionStorage.getItem(NAME_KEY) || '';
            const known = sessionStorage.getItem(KNOWN_KEY) === '1';
            const msg = known ? `Welcome back, ${name}` : `Welcome, ${name}`;
            if (name) showBanner(msg);
            if (nextUrl) window.location.replace(nextUrl);
            return;
        }

        showModal();

        const form = $('visitForm');
        const input = $('visitName');
        if (!form || !input) return;

        form.addEventListener('submit', async (ev) => {
            ev.preventDefault();
            const name = validateName(input.value);
            if (!name) {
                setError('Enter a valid name (letters, spaces, 2-40 chars).');
                return;
            }
            setError('');
            sessionStorage.setItem(VISIT_KEY, '1');
            sessionStorage.setItem(NAME_KEY, name);
            hideModal();
            const result = await sendLogin(name);
            sessionStorage.setItem(KNOWN_KEY, result.knownUser ? '1' : '0');
            const msg = result.knownUser ? `Welcome back, ${name}` : `Welcome new user, ${name}`;
            sessionStorage.setItem(WELCOME_KEY, msg);
            showBanner(msg);
            if (nextUrl) window.location.replace(nextUrl);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', bind);
    } else {
        bind();
    }
})();
