// Generic safe loader for content JS files that define a template literal named '<pageName>ContentData'
// Usage: <script src="../js/content-safe-loader.js" data-content="spring-boot-annotations-complete-guide"></script>
// It will fetch ../js/<data-content>-content.js and extract the template literal named `${pageId}ContentData`.
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
        const el = document.getElementById('content');
        if (!el) return;
        el.innerHTML = html;
    }

    function fetchAndInject(contentId) {
        const url = '../js/' + contentId + '-content.js';
        fetch(url)
            .then(resp => {
                if (!resp.ok) throw new Error('HTTP ' + resp.status);
                return resp.text();
            })
            .then(text => {
                const varName = contentId.replace(/[-\s]+/g, '') + 'ContentData';
                // some files use camelCase or different naming; try common variants
                const candidates = [
                    contentId + 'ContentData',
                    contentId.replace(/[-_]+/g, '') + 'ContentData',
                    contentId.replace(/[-_]+(.)/g, (m, c) => c.toUpperCase()) + 'ContentData'
                ];
                let content = null;
                for (let v of candidates) {
                    content = extractNamedContent(text, v);
                    if (content !== null) break;
                }
                if (content !== null) inject(content);
                else console.error('content-safe-loader: failed to find content variable in', url);
            })
            .catch(err => {
                console.warn('content-safe-loader: fetch failed, trying XHR fallback', err);
                try {
                    const xhr = new XMLHttpRequest();
                    xhr.open('GET', url, true);
                    xhr.onreadystatechange = function() {
                        if (xhr.readyState === 4) {
                            if (xhr.status === 200 || (xhr.status === 0 && xhr.responseText)) {
                                const text = xhr.responseText;
                                const varName = contentId.replace(/[-\s]+/g, '') + 'ContentData';
                                const candidates = [
                                    contentId + 'ContentData',
                                    contentId.replace(/[-_]+/g, '') + 'ContentData',
                                    contentId.replace(/[-_]+(.)/g, (m, c) => c.toUpperCase()) + 'ContentData'
                                ];
                                let content = null;
                                for (let v of candidates) {
                                    content = extractNamedContent(text, v);
                                    if (content !== null) break;
                                }
                                if (content !== null) inject(content);
                                else console.error('content-safe-loader: failed to find content variable via XHR', url);
                            } else {
                                console.error('content-safe-loader: XHR failed', xhr.status);
                            }
                        }
                    };
                    xhr.send();
                } catch (e) {
                    console.error('content-safe-loader: XHR fallback failed', e);
                }
            });
    }

    // Find script tag that loaded this loader
    const scripts = document.getElementsByTagName('script');
    let me = null;
    for (let i = scripts.length - 1; i >= 0; i--) {
        const s = scripts[i];
        if (s.src && s.src.indexOf('content-safe-loader.js') !== -1) { me = s; break; }
    }
    if (!me) return;

    const contentId = getAttr(me, 'data-content');
    if (!contentId) {
        console.error('content-safe-loader: missing data-content attribute');
        return;
    }

    fetchAndInject(contentId);
})();

