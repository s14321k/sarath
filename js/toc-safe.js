// Generic safe loader for TOC JS files that define a template literal named '<pageName>TocData'
// Usage: <script src="../js/toc-safe.js" data-toc="springboot"></script>
// It will fetch ../js/<data-toc>-toc.js and extract the template literal named `${pageId}TocData`.
(function(){
    'use strict';

    function isLoggedIn() {
        try { return sessionStorage.getItem('visitRecorded') === '1'; } catch {}
        return false;
    }

    if (!isLoggedIn()) return;

    function getAttr(script, name) {
        return script ? script.getAttribute(name) : null;
    }

    function extractNamedContent(text, varName) {
        // Match: const <varName> = `...`;
        const re = new RegExp('const\\s+' + varName + '\\s*=\\s*`([\\s\\S]*)`\\s*;', 'm');
        const m = text.match(re);
        return m ? m[1] : null;
    }

    function inject(html) {
        const el = document.getElementById('toc');
        if (!el) return;
        el.innerHTML = html;
    }

    function fetchAndInject(tocId) {
        const url = '../js/' + tocId + '-toc.js';
        fetch(url)
            .then(resp => {
                if (!resp.ok) throw new Error('HTTP ' + resp.status);
                return resp.text();
            })
            .then(text => {
                const candidates = [
                    tocId + 'TocData',
                    tocId.replace(/[-_]+/g, '') + 'TocData',
                    tocId.replace(/[-_]+(.)/g, (m, c) => c.toUpperCase()) + 'TocData'
                ];
                let content = null;
                for (let v of candidates) {
                    content = extractNamedContent(text, v);
                    if (content !== null) break;
                }
                if (content !== null) inject(content);
                else console.error('toc-safe: failed to find TOC variable in', url);
            })
            .catch(err => {
                console.warn('toc-safe: fetch failed, trying XHR fallback', err);
                try {
                    const xhr = new XMLHttpRequest();
                    xhr.open('GET', url, true);
                    xhr.onreadystatechange = function() {
                        if (xhr.readyState === 4) {
                            if (xhr.status === 200 || (xhr.status === 0 && xhr.responseText)) {
                                const text = xhr.responseText;
                                const candidates = [
                                    tocId + 'TocData',
                                    tocId.replace(/[-_]+/g, '') + 'TocData',
                                    tocId.replace(/[-_]+(.)/g, (m, c) => c.toUpperCase()) + 'TocData'
                                ];
                                let content = null;
                                for (let v of candidates) {
                                    content = extractNamedContent(text, v);
                                    if (content !== null) break;
                                }
                                if (content !== null) inject(content);
                                else console.error('toc-safe: failed to find TOC variable via XHR', url);
                            } else {
                                console.error('toc-safe: XHR failed', xhr.status);
                            }
                        }
                    };
                    xhr.send();
                } catch (e) {
                    console.error('toc-safe: XHR fallback failed', e);
                }
            });
    }

    // Find script tag that loaded this loader
    const scripts = document.getElementsByTagName('script');
    let me = null;
    for (let i = scripts.length - 1; i >= 0; i--) {
        const s = scripts[i];
        if (s.src && s.src.indexOf('toc-safe.js') !== -1) { me = s; break; }
    }
    if (!me) return;

    const tocId = getAttr(me, 'data-toc');
    if (!tocId) {
        console.error('toc-safe: missing data-toc attribute');
        return;
    }

    fetchAndInject(tocId);
})();

