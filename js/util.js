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

    async function sendLogin(name) {
        const endpoint = window.VISIT_ENDPOINT || '';
        if (!endpoint) return { knownUser: false };

        const geo = getStoredGeo();
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
            geo: geo || undefined,
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
        const pageStart = Date.now();

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
            const geo = await getGeoAsync();
            if (geo) storeGeo(geo);
            const result = await sendLogin(name);
            sessionStorage.setItem(KNOWN_KEY, result.knownUser ? '1' : '0');
            const msg = result.knownUser ? `Welcome back, ${name}` : `Welcome new user, ${name}`;
            sessionStorage.setItem(WELCOME_KEY, msg);
            showBanner(msg);

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
                    name,
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
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', bind);
    } else {
        bind();
    }
})();
