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
            const cards = Array.isArray(data?.cards) ? data.cards : [];
            $('cardsGrid').innerHTML = cards.map(cardHtml).join('');
            renderLibraryLists();
            if (status) status.textContent = '';
        } catch (err) {
            if (status) status.textContent = 'Unable to load index content.';
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }
})();
