(() => {
    'use strict';

    const form = document.getElementById('searchForm');
    const input = document.getElementById('searchInput');
    const statusEl = document.getElementById('searchStatus');
    const resultsEl = document.getElementById('searchResults');
    if (!form || !input || !resultsEl) return;

    const links = Array.from(document.querySelectorAll('.cards-grid a.card'))
        .map((a) => ({
            href: a.getAttribute('href'),
            title: (a.querySelector('h2')?.textContent || a.textContent || '').trim()
        }))
        .filter((x) => x.href && x.href.startsWith('pages/'));

    const cache = new Map();
    let indexData = null;
    let indexSource = '';
    let activeIndex = -1;

    function setStatus(msg) {
        if (statusEl) statusEl.textContent = msg || '';
    }

    function clearResults() {
        resultsEl.innerHTML = '';
        activeIndex = -1;
    }

    function addResult(item, snippet) {
        const li = document.createElement('li');
        li.classList.add('search-result-item');
        li.dataset.index = String(resultsEl.children.length);
        const a = document.createElement('a');
        a.href = item.href;
        a.textContent = item.title || item.href;
        const p = document.createElement('p');
        p.textContent = snippet || '';
        li.appendChild(a);
        li.appendChild(p);
        resultsEl.appendChild(li);
    }

    function updateActiveResult(nextIndex) {
        const items = Array.from(resultsEl.querySelectorAll('.search-result-item'));
        items.forEach((el) => el.classList.remove('active'));
        if (nextIndex >= 0 && items[nextIndex]) {
            items[nextIndex].classList.add('active');
            items[nextIndex].scrollIntoView({ block: 'nearest' });
            activeIndex = nextIndex;
        } else {
            activeIndex = -1;
        }
    }

    function extractText(html) {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const text = doc.body ? doc.body.textContent || '' : '';
        return text.replace(/\s+/g, ' ').trim();
    }

    function normalize(str) {
        return String(str || '')
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '');
    }

    function makeSnippet(text, query) {
        const lower = text.toLowerCase();
        const idx = lower.indexOf(query);
        if (idx < 0) return '';
        const start = Math.max(0, idx - 60);
        const end = Math.min(text.length, idx + 80);
        return text.slice(start, end).trim();
    }

    function matches(text, query) {
        const lower = text.toLowerCase();
        if (lower.includes(query)) return true;
        const normText = normalize(text);
        const normQuery = normalize(query);
        if (normQuery && normText.includes(normQuery)) return true;
        const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
        if (terms.length > 1) {
            return terms.every((t) => lower.includes(t) || normText.includes(normalize(t)));
        }
        return false;
    }

    async function loadPageText(href) {
        if (cache.has(href)) return cache.get(href);
        try {
            const res = await fetch(href, { cache: 'force-cache' });
            const html = await res.text();
            const text = extractText(html);
            cache.set(href, text);
            return text;
        } catch {
            cache.set(href, '');
            return '';
        }
    }

    async function loadIndex() {
        if (indexData) return indexData;
        const pathParts = window.location.pathname.split('/').filter(Boolean);
        const base = pathParts.length ? `/${pathParts[0]}` : '';
        const candidates = [
            'search-index.json',
            './search-index.json',
            `${base}/search-index.json`
        ];
        for (const url of candidates) {
            try {
                const res = await fetch(url, { cache: 'no-cache' });
                if (!res.ok) continue;
                const data = await res.json();
                if (Array.isArray(data)) {
                    indexData = data.filter((x) => x && x.href && x.text);
                    indexSource = url;
                    return indexData;
                }
            } catch {}
        }
        indexData = [];
        return indexData;
    }

    async function performSearch(qRaw, options = {}) {
        const q = qRaw.toLowerCase();
        const limit = options.limit || 0;
        clearResults();
        if (!q) {
            setStatus('Enter a keyword to search.');
            return;
        }
        const index = await loadIndex();
        let found = 0;
        if (index.length > 0) {
            if (!options.silent) {
                setStatus(`Searching ${index.length} pages (index: ${indexSource})...`);
            }
            let done = 0;
            for (const item of index) {
                done += 1;
                if (matches(item.text || '', qRaw) || matches(item.title || '', qRaw) || matches(item.href || '', qRaw)) {
                    found += 1;
                    addResult({ href: item.href, title: item.title }, makeSnippet(item.text || '', q));
                    if (limit && found >= limit) break;
                }
                if (!options.silent && !limit) {
                    setStatus(`Searching ${index.length} pages... ${done}/${index.length}`);
                }
            }
        } else if (!options.live) {
            setStatus(`Searching ${links.length} pages...`);
            let done = 0;
            for (const item of links) {
                const text = await loadPageText(item.href);
                done += 1;
                if (matches(text, qRaw) || matches(item.title || '', qRaw) || matches(item.href || '', qRaw)) {
                    found += 1;
                    addResult(item, makeSnippet(text, q));
                }
                setStatus(`Searching ${links.length} pages... ${done}/${links.length}`);
            }
        }
        if (found === 0) {
            setStatus(options.live ? 'No suggestions.' : 'No matches found.');
        } else {
            setStatus(options.live ? `Suggestions: ${found}` : `Found ${found} page(s).`);
        }
    }

    form.addEventListener('submit', async (ev) => {
        ev.preventDefault();
        const qRaw = String(input.value || '').trim();
        await performSearch(qRaw);
    });

    const debouncedSuggest = debounce(async () => {
        const qRaw = String(input.value || '').trim();
        if (!qRaw) {
            clearResults();
            setStatus('');
            return;
        }
        await performSearch(qRaw, { live: true, limit: 8, silent: true });
    }, 180);

    input.addEventListener('input', debouncedSuggest);

    input.addEventListener('keydown', (ev) => {
        const items = resultsEl.querySelectorAll('.search-result-item');
        if (!items.length) return;
        if (ev.key === 'ArrowDown') {
            ev.preventDefault();
            const next = (activeIndex + 1) % items.length;
            updateActiveResult(next);
        } else if (ev.key === 'ArrowUp') {
            ev.preventDefault();
            const next = activeIndex <= 0 ? items.length - 1 : activeIndex - 1;
            updateActiveResult(next);
        } else if (ev.key === 'Enter' && activeIndex >= 0) {
            ev.preventDefault();
            const link = items[activeIndex].querySelector('a');
            if (link && link.href) window.location.href = link.href;
        } else if (ev.key === 'Escape') {
            updateActiveResult(-1);
        }
    });

    function debounce(fn, delay) {
        let timer = null;
        return (...args) => {
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => fn(...args), delay);
        };
    }
})();
