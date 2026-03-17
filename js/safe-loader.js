// Loader for TOC and Content via backend (private repo).
// Usage: <script src="../js/safe-loader.js" data-page="springboot" data-load="toc,content"></script>
(function(){
    'use strict';

    function getAttr(script, name) { return script ? script.getAttribute(name) : null; }

    function injectTo(id, html) {
        const el = document.getElementById(id);
        if (!el) return;
        el.innerHTML = html;
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
    if (!endpoint) {
        console.warn('safe-loader: missing VISIT_ENDPOINT');
        return;
    }

    const tasks = [];
    if (loadAttr.indexOf('toc') !== -1) {
        tasks.push(fetchPage(endpoint, page, 'toc')
            .then((html) => injectTo('toc', html))
            .catch((err) => console.warn('safe-loader: failed to load toc', err)));
    }
    if (loadAttr.indexOf('content') !== -1) {
        tasks.push(fetchPage(endpoint, page, 'content')
            .then((html) => injectTo('content', html))
            .catch((err) => console.warn('safe-loader: failed to load content', err)));
    }

    Promise.all(tasks).then(() => {
        try { window.dispatchEvent(new CustomEvent('pageContentLoaded', { detail: { page } })); } catch (e) {}
    });
})();

