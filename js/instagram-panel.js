(() => {
    'use strict';

    const ENDPOINT = window.VISIT_ENDPOINT || '';
    const LIMIT = 4;
    const PANEL_WIDTH = 390;
    const state = {
        page: '',
        offset: 0,
        hasMore: true,
        loading: false,
        open: false,
        ready: false
    };

    let root = null;
    let toggle = null;
    let list = null;
    let statusEl = null;
    let titleEl = null;
    let embedScriptLoading = null;

    function injectStyles() {
        if (document.getElementById('instagramPanelStyles')) return;
        const style = document.createElement('style');
        style.id = 'instagramPanelStyles';
        style.textContent = `
            :root { --instagram-panel-width: ${PANEL_WIDTH}px; }
            body.instagram-panel-open .content {
                width: calc(100% - 320px - var(--instagram-panel-width));
            }
            .instagram-panel {
                position: fixed;
                top: 0;
                right: 0;
                width: var(--instagram-panel-width);
                max-width: calc(100vw - 64px);
                height: 100vh;
                z-index: 900;
                background:
                    radial-gradient(circle at 12% 8%, rgba(255, 220, 128, .18), transparent 24%),
                    radial-gradient(circle at 88% 16%, rgba(225, 48, 108, .22), transparent 28%),
                    linear-gradient(180deg, rgba(18, 18, 34, .98), rgba(9, 10, 20, .98));
                border-left: 1px solid rgba(255, 255, 255, .12);
                box-shadow: -18px 0 48px rgba(0, 0, 0, .38);
                transform: translateX(100%);
                transition: transform .34s ease;
                display: none;
            }
            .instagram-panel.is-ready { display: block; }
            .instagram-panel.is-open { transform: translateX(0); }
            .instagram-panel-toggle {
                position: absolute;
                left: -48px;
                top: 46%;
                width: 48px;
                height: 74px;
                border: 1px solid rgba(255, 255, 255, .16);
                border-right: 0;
                border-radius: 22px 0 0 22px;
                color: #fff;
                cursor: pointer;
                background: linear-gradient(135deg, #405de6, #c13584 52%, #f56040);
                box-shadow: -8px 10px 26px rgba(0, 0, 0, .32);
                font: 900 26px/1 'Work Sans', sans-serif;
                display: grid;
                place-items: center;
            }
            .instagram-panel-toggle span {
                transform: translateX(2px);
                transition: transform .24s ease;
            }
            .instagram-panel.is-open .instagram-panel-toggle span {
                transform: rotate(180deg) translateX(-2px);
            }
            .instagram-panel-shell {
                height: 100%;
                display: grid;
                grid-template-rows: auto 1fr;
                min-height: 0;
            }
            .instagram-panel-head {
                padding: 18px 18px 14px;
                border-bottom: 1px solid rgba(255, 255, 255, .1);
            }
            .instagram-panel-kicker {
                color: rgba(255, 255, 255, .7);
                font: 700 11px/1.2 'Work Sans', sans-serif;
                letter-spacing: .12em;
                text-transform: uppercase;
            }
            .instagram-panel-title {
                margin-top: 5px;
                color: #fff;
                font: 900 20px/1.25 'Playfair Display', serif;
            }
            .instagram-panel-list {
                min-height: 0;
                overflow-y: auto;
                padding: 16px;
            }
            .instagram-card {
                min-height: 360px;
                margin-bottom: 16px;
                border-radius: 8px;
                overflow: hidden;
                background: rgba(255, 255, 255, .06);
                border: 1px solid rgba(255, 255, 255, .1);
            }
            .instagram-panel-status {
                color: rgba(255, 255, 255, .72);
                padding: 14px 4px 22px;
                text-align: center;
                font: 700 13px/1.45 'Work Sans', sans-serif;
            }
            .instagram-panel-status.is-error { color: #ffb4a8; }
            @media (max-width: 968px) {
                body.instagram-panel-open .content { width: calc(100% - 280px - var(--instagram-panel-width)); }
            }
            @media (max-width: 768px) {
                .instagram-panel {
                    width: min(360px, calc(100vw - 54px));
                    z-index: 1200;
                }
                body.instagram-panel-open .content { width: 100%; }
                .instagram-panel-toggle {
                    left: -44px;
                    width: 44px;
                    height: 66px;
                }
            }
        `;
        document.head.appendChild(style);
    }

    function currentPage() {
        const params = new URLSearchParams(window.location.search);
        const raw = params.get('page') || '';
        if (raw) {
            try {
                const parsed = new URL(raw, window.location.href);
                const nested = parsed.searchParams.get('page');
                if (nested) return cleanPage(nested);
                const last = parsed.pathname.split('/').filter(Boolean).pop() || '';
                return cleanPage(last.replace(/\.html$/i, ''));
            } catch {
                return cleanPage(raw.replace(/\.html$/i, ''));
            }
        }
        if (/\/pages1?\//i.test(window.location.pathname)) {
            const last = window.location.pathname.split('/').filter(Boolean).pop() || '';
            return cleanPage(last.replace(/\.html$/i, ''));
        }
        return '';
    }

    function cleanPage(value) {
        const clean = String(value || '').replace(/[^a-zA-Z0-9_-]/g, '');
        return clean === 'page' || clean === 'pdf-viewer' ? '' : clean;
    }

    function displayName(page) {
        return String(page || '').replace(/[-_]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
    }

    function ensurePanel() {
        if (root) return;
        injectStyles();
        root = document.createElement('aside');
        root.id = 'instagramPanel';
        root.className = 'instagram-panel';
        root.setAttribute('aria-label', 'Related Instagram posts');
        root.innerHTML = `
            <button type="button" class="instagram-panel-toggle" aria-expanded="false" aria-label="Open related Instagram posts">
                <span>&lsaquo;</span>
            </button>
            <div class="instagram-panel-shell">
                <div class="instagram-panel-head">
                    <div class="instagram-panel-kicker">Instagram</div>
                    <div class="instagram-panel-title" data-instagram-title>Related posts</div>
                </div>
                <div class="instagram-panel-list" data-instagram-list>
                    <div class="instagram-panel-status" data-instagram-status></div>
                </div>
            </div>
        `;
        document.body.appendChild(root);
        toggle = root.querySelector('.instagram-panel-toggle');
        list = root.querySelector('[data-instagram-list]');
        statusEl = root.querySelector('[data-instagram-status]');
        titleEl = root.querySelector('[data-instagram-title]');
        toggle.addEventListener('click', () => setOpen(!state.open));
        list.addEventListener('scroll', onListScroll, { passive: true });
    }

    function setOpen(next) {
        state.open = Boolean(next);
        root?.classList.toggle('is-open', state.open);
        document.body.classList.toggle('instagram-panel-open', state.open);
        toggle?.setAttribute('aria-expanded', state.open ? 'true' : 'false');
        toggle?.setAttribute('aria-label', state.open ? 'Close related Instagram posts' : 'Open related Instagram posts');
        if (state.open && state.page && state.offset === 0 && !state.loading) loadNext();
    }

    function setReady(next) {
        state.ready = Boolean(next);
        root?.classList.toggle('is-ready', state.ready);
        if (!state.ready) setOpen(false);
    }

    function setStatus(message, isError) {
        if (!statusEl) return;
        statusEl.textContent = message || '';
        statusEl.classList.toggle('is-error', Boolean(isError));
    }

    function resetForPage(page) {
        ensurePanel();
        state.page = page;
        state.offset = 0;
        state.hasMore = true;
        state.loading = false;
        if (list) list.querySelectorAll('.instagram-card').forEach((node) => node.remove());
        if (titleEl) titleEl.textContent = page ? `Related to ${displayName(page)}` : 'Related posts';
        setStatus('');
        setReady(Boolean(page));
        if (page && state.open) loadNext();
    }

    function requestPayload(payload) {
        const params = new URLSearchParams();
        Object.entries(payload).forEach(([key, value]) => params.set(key, String(value)));
        return params;
    }

    async function fetchItems() {
        if (!ENDPOINT) throw new Error('Feed endpoint is not configured.');
        const res = await fetch(ENDPOINT, {
            method: 'POST',
            body: requestPayload({
                eventType: 'instagram_feed',
                page: state.page,
                offset: state.offset,
                limit: LIMIT
            })
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data?.error || data?.detail || `HTTP ${res.status}`);
        return data;
    }

    function ensureEmbedScript() {
        if (window.instgrm?.Embeds?.process) {
            window.instgrm.Embeds.process();
            return Promise.resolve();
        }
        if (embedScriptLoading) return embedScriptLoading;
        embedScriptLoading = new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.async = true;
            script.src = 'https://www.instagram.com/embed.js';
            script.onload = () => {
                window.instgrm?.Embeds?.process?.();
                resolve();
            };
            script.onerror = () => reject(new Error('Instagram embed script failed to load.'));
            document.body.appendChild(script);
        });
        return embedScriptLoading;
    }

    function renderItem(item) {
        const card = document.createElement('article');
        card.className = 'instagram-card';
        const permalink = String(item?.url || '');
        card.innerHTML = `
            <blockquote class="instagram-media"
                data-instgrm-permalink="${escapeAttr(permalink)}"
                data-instgrm-version="14"
                style="background:#fff; border:0; margin:0 auto; width:100%; min-width:0;">
            </blockquote>
        `;
        list.insertBefore(card, statusEl);
    }

    async function loadNext() {
        if (!state.page || state.loading || !state.hasMore) return;
        state.loading = true;
        setStatus(state.offset ? 'Loading more posts...' : 'Loading related posts...');
        try {
            const data = await fetchItems();
            const items = Array.isArray(data.items) ? data.items : [];
            items.forEach(renderItem);
            state.offset += items.length;
            state.hasMore = Boolean(data.hasMore);
            if (!items.length && state.offset === 0) {
                setStatus('No Instagram posts configured for this page yet.');
            } else {
                setStatus(state.hasMore ? '' : 'You reached the end.');
                ensureEmbedScript().catch(() => setStatus('Instagram embeds could not load.', true));
            }
        } catch (error) {
            setStatus(error.message || 'Unable to load Instagram posts.', true);
        } finally {
            state.loading = false;
        }
    }

    function onListScroll() {
        if (!list || state.loading || !state.hasMore) return;
        const remaining = list.scrollHeight - list.scrollTop - list.clientHeight;
        if (remaining < 280) loadNext();
    }

    function escapeAttr(value) {
        return String(value || '').replace(/[&<>"']/g, (ch) => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        }[ch]));
    }

    function syncRoute(event) {
        const detailPage = cleanPage(event?.detail?.page || '');
        const page = detailPage || currentPage();
        if (page === state.page && root) return;
        resetForPage(page);
    }

    ensurePanel();
    syncRoute();
    window.addEventListener('pageContentLoaded', syncRoute);
    window.addEventListener('spaRouteChanged', syncRoute);
    window.addEventListener('popstate', syncRoute);
})();
