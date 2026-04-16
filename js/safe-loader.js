// Loader for TOC and Content via backend (private repo).
// Usage: <script src="../js/safe-loader.js" data-page="springboot" data-load="toc,content"></script>
(function(){
    'use strict';

    function isLoggedIn() {
        try { return sessionStorage.getItem('visitRecorded') === '1'; } catch {}
        return false;
    }

    if (!isLoggedIn()) return;

    function getAttr(script, name) { return script ? script.getAttribute(name) : null; }

    function injectTo(id, html) {
        const el = document.getElementById(id);
        if (!el) return;
        el.innerHTML = html;
    }

    function showUnavailableMessage(kind) {
        if (kind !== 'content') return;
        injectTo('content', '<section class="content-section"><p>Content is temporarily unavailable. Please try again later.</p></section>');
    }

    function fetchPage(endpoint, page, kind) {
        return fetch(endpoint, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                eventType: 'page_content',
                page,
                kind
            })
        }).then((resp) => {
            if (!resp.ok) throw new Error('HTTP ' + resp.status);
            return resp.json();
        }).then((data) => data && data.html ? data.html : '');
    }

    function fetchLocalPage(page, kind) {
        const url = new URL('../private-repo/visit-data-repo/data/pages/' + encodeURIComponent(page) + '-' + encodeURIComponent(kind) + '.json', window.location.href);
        return fetch(url.toString())
            .then((resp) => {
                if (!resp.ok) throw new Error('HTTP ' + resp.status);
                return resp.json();
            })
            .then((data) => data && data.html ? data.html : '');
    }

    function loadPage(endpoint, page, kind) {
        return fetchLocalPage(page, kind).catch((localErr) => {
            if (!endpoint) throw localErr;
            console.warn('safe-loader: local fallback unavailable for ' + kind + ', trying backend', localErr);
            return fetchPage(endpoint, page, kind).catch((remoteErr) => {
                console.warn('safe-loader: backend load failed for ' + kind, remoteErr);
                throw remoteErr;
            });
        });
    }

    const scripts = document.getElementsByTagName('script');
    let me = null;
    for (let i = scripts.length - 1; i >= 0; i--) {
        const s = scripts[i];
        if (s.src && s.src.indexOf('safe-loader.js') !== -1) { me = s; break; }
    }
    if (!me) return;

    const page = getAttr(me, 'data-page');
    if (!page) { console.error('safe-loader: missing data-page attribute'); return; }
    const loadAttr = (getAttr(me, 'data-load') || 'toc,content').split(',').map(s => s.trim().toLowerCase());
    const endpoint = window.VISIT_ENDPOINT || '';
    if (!endpoint) console.warn('safe-loader: missing VISIT_ENDPOINT, using local content only');

    const tasks = [];
    if (loadAttr.indexOf('toc') !== -1) {
        tasks.push(loadPage(endpoint, page, 'toc')
            .then((html) => injectTo('toc', html))
            .catch((err) => console.warn('safe-loader: failed to load toc', err)));
    }
    if (loadAttr.indexOf('content') !== -1) {
        tasks.push(loadPage(endpoint, page, 'content')
            .then((html) => injectTo('content', html))
            .catch((err) => {
                console.warn('safe-loader: failed to load content', err);
                showUnavailableMessage('content');
            }));
    }

    Promise.all(tasks).then(() => {
        try { window.dispatchEvent(new CustomEvent('pageContentLoaded', { detail: { page } })); } catch (e) {}
    });
})();

