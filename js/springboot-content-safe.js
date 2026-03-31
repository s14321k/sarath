// Safe loader for springboot-content.js
// Loads the JS file as text (no execution), extracts the template literal content,
// and injects it into #content. This avoids parse errors caused by unescaped backticks
// inside the source file when the browser tries to execute it directly.
(function(){
    'use strict';
    function isLoggedIn() {
        try { return sessionStorage.getItem('visitRecorded') === '1'; } catch {}
        return false;
    }
    if (!isLoggedIn()) return;
    const url = '../js/springboot-content.js';

    function extractContent(text) {
        // Match: const springbootContentData = `...`;
        const re = /const\s+springbootContentData\s*=\s*`([\s\S]*)`\s*;/m;
        const m = text.match(re);
        return m ? m[1] : null;
    }

    function inject(html) {
        const el = document.getElementById('content');
        if (!el) return;
        el.innerHTML = html;
    }

    // Try fetch API first
    fetch(url)
        .then(resp => {
            if (!resp.ok) throw new Error('HTTP ' + resp.status);
            return resp.text();
        })
        .then(text => {
            const content = extractContent(text);
            if (content !== null) inject(content);
            else console.error('springboot-content-safe: failed to find content in file');
        })
        .catch(err => {
            console.warn('springboot-content-safe: fetch failed, trying XHR fallback', err);
            // XHR fallback (may still be blocked on file:// in some browsers)
            try {
                const xhr = new XMLHttpRequest();
                xhr.open('GET', url, true);
                xhr.onreadystatechange = function() {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200 || (xhr.status === 0 && xhr.responseText)) {
                            const content = extractContent(xhr.responseText);
                            if (content !== null) inject(content);
                            else console.error('springboot-content-safe: failed to find content via XHR');
                        } else {
                            console.error('springboot-content-safe: XHR failed', xhr.status);
                        }
                    }
                };
                xhr.send();
            } catch (e) {
                console.error('springboot-content-safe: XHR fallback failed', e);
            }
        });
})();

