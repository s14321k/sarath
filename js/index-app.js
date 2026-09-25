(() => {
    'use strict';

    const $ = (id) => document.getElementById(id);

    function escapeHtml(value) {
        return String(value || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    async function fetchJson(url) {
        const response = await fetch(url, { cache: 'no-store' });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
    }

    async function loadIndexData() {
        const endpoint = window.VISIT_ENDPOINT || '';
        if (endpoint) {
            try {
                const response = await fetch(endpoint, {
                    method: 'POST',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify({ eventType: 'index_content' })
                });
                if (response.ok) return response.json();
            } catch {}
        }
        return fetchJson('data/index.json');
    }

    function cardHtml(card) {
        if (card.type === 'pdf-list') {
            return `
                <div class="card pdf-card">
                    <div class="card-icon">${escapeHtml(card.icon || '')}</div>
                    <h2>${escapeHtml(card.title || 'PDF Library')}</h2>
                    <p>${escapeHtml(card.description || '')}</p>
                    <ul class="pdf-list" id="pdfList"></ul>
                </div>
            `;
        }
        if (card.type === 'html-list') {
            return `
                <div class="card pdf-card">
                    <div class="card-icon">${escapeHtml(card.icon || '')}</div>
                    <h2>${escapeHtml(card.title || 'HTML Library')}</h2>
                    <p>${escapeHtml(card.description || '')}</p>
                    <ul class="pdf-list" id="htmlList"></ul>
                </div>
            `;
        }
        return `
            <a href="${escapeHtml(card.href || '#')}" class="card">
                <div class="card-icon">${escapeHtml(card.icon || '')}</div>
                <h2>${escapeHtml(card.title || '')}</h2>
                <p>${escapeHtml(card.description || '')}</p>
                <span class="card-status available">Available</span>
            </a>
        `;
    }

    function renderLibraryLists() {
        const pdfList = $('pdfList');
        if (pdfList && Array.isArray(window.pdfFiles)) {
            pdfList.innerHTML = window.pdfFiles.map((fileName) => (
                `<li><a href="pages/pdf-viewer.html?file=${encodeURIComponent(fileName)}">${escapeHtml(fileName)}</a></li>`
            )).join('');
        }
        const htmlList = $('htmlList');
        if (htmlList && Array.isArray(window.htmlFiles)) {
            htmlList.innerHTML = window.htmlFiles.map((fileName) => (
                `<li><a href="htmls/${encodeURIComponent(fileName)}">${escapeHtml(fileName)}</a></li>`
            )).join('');
        }
    }

    function buildPageRegistry(cards) {
        /**
         * Build a registry of pages for the generic page loader
         * This allows the loader to access page metadata without making extra requests
         */
        const registry = {};
        const visit = (items) => {
            for (const card of items) {
                if (card.type === 'folder') {
                    visit(Array.isArray(card.children) ? card.children : []);
                    continue;
                }
                if (card.type === 'page' && card.href) {
                // Extract page name from href like: pages/page.html?page=java-basics
                    const match = card.href.match(/\?page=([^&]+)/);
                    if (match) {
                        const pageName = match[1];
                        registry[pageName] = {
                            title: card.name || card.title,
                            description: card.description || '',
                            icon: card.icon || ''
                        };
                    }
                }
            }
        };
        visit(cards);
        return registry;
    }

    async function boot() {
        const app = $('homeApp');
        const status = $('indexLoadStatus');
        const session = window.AuthClient.getSession();
        if (!window.AuthClient.isAuthenticated()) return;
        if (app) app.hidden = false;
        const banner = $('welcomeBanner');
        if (banner && session.user) {
            banner.textContent = `Welcome back, ${session.user}`;
            banner.classList.remove('hidden');
        }
        $('logoutButton')?.addEventListener('click', () => {
            window.AuthClient.clearSession();
            window.location.replace('login.html');
        });

        try {
            const data = await loadIndexData();
            // Accept both the current { cards, markdownTree } format and the
            // legacy index.json format where the file itself is a cards array.
            const cards = Array.isArray(data) ? data : (Array.isArray(data?.cards) ? data.cards : []);

            // Build page registry for generic page loader
            window.pageRegistry = buildPageRegistry(cards);

            const grid = $('cardsGrid');
            const tree = Array.isArray(data?.markdownTree)
                ? data.markdownTree
                : cards
                    .filter((card) => card.type === 'page' && /^pages\//.test(card.href || ''))
                    .map((card) => ({ type: 'page', name: card.title, href: card.href }));
            renderMarkdownTree(grid, tree);
            if (status) status.textContent = tree.length ? '' : 'No Markdown pages found in md2.';
        } catch (err) {
            if (status) status.textContent = 'Unable to load index content.';
        }
    }

    function renderMarkdownTree(grid, tree) {
        if (!grid) return;
        let current = tree;
        const trail = [];
        const draw = () => {
            const crumbs = trail.map((entry, index) => `<button type="button" class="folder-crumb" data-crumb="${index}">${escapeHtml(entry.name)}</button>`).join(' / ');
            grid.innerHTML = `${trail.length ? `<div class="folder-navigation"><button type="button" class="folder-back" data-back>← Back</button><span>${crumbs}</span></div>` : ''}` +
                current.map((item) => item.type === 'folder'
                    ? `<button type="button" class="card folder-card" data-folder="${escapeHtml(item.name)}"><div class="card-icon" aria-hidden="true">📁</div><h2>${escapeHtml(item.name)}</h2><p>Open folder</p></button>`
                    : `<a class="card markdown-card" href="${escapeHtml(item.href)}"><div class="card-icon" aria-hidden="true">📄</div><h2>${escapeHtml(item.name)}</h2><p>Markdown guide</p><span class="card-status available">Available</span></a>`).join('');
            grid.querySelectorAll('[data-folder]').forEach((button) => button.addEventListener('click', () => {
                const folder = current.find((item) => item.type === 'folder' && item.name === button.dataset.folder);
                if (!folder) return;
                trail.push({ name: folder.name, items: current });
                current = folder.children || [];
                draw();
            }));
            grid.querySelector('[data-back]')?.addEventListener('click', () => {
                const parent = trail.pop();
                if (!parent) return;
                current = parent.items;
                draw();
            });
            grid.querySelectorAll('[data-crumb]').forEach((button) => button.addEventListener('click', () => {
                const index = Number(button.dataset.crumb);
                const parent = trail[index];
                current = parent.items;
                trail.length = index;
                draw();
            }));
        };
        draw();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }
})();
