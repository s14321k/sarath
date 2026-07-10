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

    function normalizePageData(data) {
        return {
            tocHtml: data && (data.tocHtml || data.toc || ''),
            contentHtml: data && (data.contentHtml || data.content || data.html || '')
        };
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

    function fetchPageBundle(endpoint, page) {
        return fetch(endpoint, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                eventType: 'page_content',
                page,
                kind: 'page'
            })
        }).then((resp) => {
            if (!resp.ok) throw new Error('HTTP ' + resp.status);
            return resp.json();
        }).then(normalizePageData);
    }

    function fetchLocalPage(page, kind) {
        const url = new URL('../data/pages/' + encodeURIComponent(page) + '-' + encodeURIComponent(kind) + '.json', window.location.href);
        return fetch(url.toString())
            .then((resp) => {
                if (!resp.ok) throw new Error('HTTP ' + resp.status);
                return resp.json();
            })
            .then((data) => data && data.html ? data.html : '');
    }

    function fetchLocalPageBundle(page) {
        const url = new URL('../data/pages/' + encodeURIComponent(page) + '.json', window.location.href);
        return fetch(url.toString())
            .then((resp) => {
                if (!resp.ok) throw new Error('HTTP ' + resp.status);
                return resp.json();
            })
            .then(normalizePageData);
    }

    function fetchSplitPageBundle(page) {
        return Promise.all([
            fetchLocalPage(page, 'toc'),
            fetchLocalPage(page, 'content')
        ]).then(([tocHtml, contentHtml]) => ({ tocHtml, contentHtml }));
    }

    function loadPage(endpoint, page, kind) {
        const remote = endpoint ? fetchPage(endpoint, page, kind) : Promise.reject(new Error('Missing endpoint'));
        return remote.catch((remoteErr) => {
            console.warn('safe-loader: backend load failed for ' + kind + ', trying local fallback', remoteErr);
            return fetchLocalPage(page, kind).catch((localErr) => {
                console.warn('safe-loader: local fallback failed for ' + kind, localErr);
                throw remoteErr;
            });
        });
    }

    function loadPageBundle(endpoint, page) {
        const remote = endpoint ? fetchPageBundle(endpoint, page) : Promise.reject(new Error('Missing endpoint'));
        return remote.catch((remoteErr) => {
            console.warn('safe-loader: backend bundle load failed, trying local fallback', remoteErr);
            return fetchLocalPageBundle(page).catch((localErr) => {
                console.warn('safe-loader: local bundle fallback failed, trying split fallback', localErr);
                return fetchSplitPageBundle(page);
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
    if (!endpoint) console.warn('safe-loader: missing VISIT_ENDPOINT, using local fallback');

    loadPageBundle(endpoint, page).then((pageData) => {
        if (loadAttr.indexOf('toc') !== -1) injectTo('toc', pageData.tocHtml || '');
        if (loadAttr.indexOf('content') !== -1) injectTo('content', pageData.contentHtml || '');
        if (loadAttr.indexOf('content') !== -1 && !pageData.contentHtml) showUnavailableMessage('content');
    }).catch((err) => {
        console.warn('safe-loader: failed to load page bundle', err);
        showUnavailableMessage('content');
    }).then(() => {
        try { window.dispatchEvent(new CustomEvent('pageContentLoaded', { detail: { page } })); } catch (e) {}
    });
})();
