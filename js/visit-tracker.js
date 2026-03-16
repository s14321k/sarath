(() => {
    'use strict';

    const VISIT_KEY = 'visitRecorded';

    function $(id) { return document.getElementById(id); }

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

    async function sendVisit(name) {
        const endpoint = window.VISIT_ENDPOINT || '';
        if (!endpoint) return;

        const payload = {
            name,
            clientTime: new Date().toISOString(),
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || '',
            locale: navigator.language || '',
            page: window.location.href,
            referrer: document.referrer || '',
            userAgent: navigator.userAgent || '',
        };

        try {
            await fetch(endpoint, {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(payload),
            });
        } catch (e) {
            // Ignore network errors to avoid blocking UX
        }
    }

    function bind() {
        if (sessionStorage.getItem(VISIT_KEY)) return;
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
            hideModal();
            await sendVisit(name);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', bind);
    } else {
        bind();
    }
})();
