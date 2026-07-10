import { LitElement, html } from 'https://cdn.jsdelivr.net/npm/lit@3/+esm';

const PAGE_RE = /^(pages|pages1)\/([^/?#]+)\.html(?:\?([^#]*))?(?:#(.+))?$/;
const loadedScripts = new Set();

function pageFromUrl(url = window.location.href) {
    const parsed = new URL(url, window.location.href);
    return parsed.searchParams.get('page') || '';
}

function queryFromHref(href) {
    try {
        const parsed = new URL(href, window.location.href);
        return parsed.searchParams.get('q') || '';
    } catch {
        return '';
    }
}

function parsePageRef(ref) {
    const clean = String(ref || '').replace(/^(\.\/|\.\.\/)+/, '');
    const match = clean.match(PAGE_RE);
    if (!match) return null;
    if (match[2] === 'pdf-viewer') return null;
    const params = new URLSearchParams(match[3] || '');
    return {
        dir: match[1],
        pageName: match[2],
        href: `${match[1]}/${match[2]}.html`,
        query: params.get('q') || '',
        anchor: match[4] || ''
    };
}

function appUrlForPage(href, query = '') {
    const url = new URL(window.location.href);
    url.searchParams.set('page', href);
    if (query) url.searchParams.set('q', query);
    else url.searchParams.delete('q');
    url.hash = '';
    return url;
}

function isLoggedIn() {
    try { return sessionStorage.getItem('visitRecorded') === '1'; } catch {}
    return false;
}

function loadScript(src) {
    if (loadedScripts.has(src)) return Promise.resolve();
    loadedScripts.add(src);
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Failed to load ${src}`));
        document.body.appendChild(script);
    });
}

function ensureStylesheet(id, href, enabled) {
    let link = document.getElementById(id);
    if (enabled) {
        if (!link) {
            link = document.createElement('link');
            link.id = id;
            link.rel = 'stylesheet';
            link.href = href;
            document.head.appendChild(link);
        }
        return;
    }
    if (link) link.remove();
}

function normalizePageData(data) {
    return {
        tocHtml: data && (data.tocHtml || data.toc || ''),
        contentHtml: data && (data.contentHtml || data.content || data.html || '')
    };
}

async function fetchRemotePageBundle(endpoint, page) {
    const resp = await fetch(endpoint, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
            eventType: 'page_content',
            page,
            kind: 'page'
        })
    });
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const data = await resp.json();
    return normalizePageData(data);
}

async function fetchLocalPageBundle(page) {
    const url = `private-repo/visit-data-repo/data/pages/${encodeURIComponent(page)}.json`;
    const resp = await fetch(url);
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const data = await resp.json();
    return normalizePageData(data);
}

async function fetchLocalPage(page, kind) {
    const url = `private-repo/visit-data-repo/data/pages/${encodeURIComponent(page)}-${encodeURIComponent(kind)}.json`;
    const resp = await fetch(url);
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const data = await resp.json();
    return data && data.html ? data.html : '';
}

async function fetchSplitPageBundle(page) {
    const [tocHtml, contentHtml] = await Promise.all([
        fetchLocalPage(page, 'toc'),
        fetchLocalPage(page, 'content')
    ]);
    return { tocHtml, contentHtml };
}

async function fetchPageBundle(page) {
    const endpoint = window.VISIT_ENDPOINT || '';
    if (endpoint) {
        try {
            return await fetchRemotePageBundle(endpoint, page);
        } catch (error) {
            console.warn('spa-app: backend bundle load failed, trying local fallback', error);
        }
    }
    try {
        return await fetchLocalPageBundle(page);
    } catch (error) {
        console.warn('spa-app: local bundle fallback failed, trying split fallback', error);
        return fetchSplitPageBundle(page);
    }
}

function metadataForPage(href, pageName) {
    const card = document.querySelector(`a.card[href="${href}"]`);
    const title = card?.querySelector('h2')?.textContent?.trim();
    const description = card?.querySelector('p')?.textContent?.trim();
    return {
        title: title || pageName.replace(/[-_]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
        description: description || 'Interactive Guide'
    };
}

class LitSpaApp extends LitElement {
    static properties = {
        route: { state: true },
        title: { state: true },
        description: { state: true },
        loading: { state: true },
        error: { state: true }
    };

    constructor() {
        super();
        this.route = null;
        this.title = '';
        this.description = '';
        this.loading = false;
        this.error = '';
        this._boundRoute = () => this.applyRoute();
        this._boundClick = (event) => this.handleDocumentClick(event);
    }

    createRenderRoot() {
        return this;
    }

    connectedCallback() {
        super.connectedCallback();
        window.addEventListener('popstate', this._boundRoute);
        document.addEventListener('click', this._boundClick, true);
        document.addEventListener('visit-login', this._boundRoute);
        this.applyRoute();
    }

    disconnectedCallback() {
        document.removeEventListener('visit-login', this._boundRoute);
        document.removeEventListener('click', this._boundClick, true);
        window.removeEventListener('popstate', this._boundRoute);
        super.disconnectedCallback();
    }

    handleDocumentClick(event) {
        const link = event.target?.closest?.('a[href]');
        if (!link) return;
        if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

        const hrefAttr = link.getAttribute('href') || '';
        const href = hrefAttr.replace(/^\.\//, '');
        const route = parsePageRef(href);
        if (!route) return;

        event.preventDefault();
        const query = queryFromHref(hrefAttr) || route.query || new URLSearchParams(window.location.search).get('q') || '';
        history.pushState({}, '', appUrlForPage(route.href, query));
        this.applyRoute();
    }

    showHome() {
        this.route = null;
        this.hidden = true;
        document.body.classList.remove('spa-route');
        document.getElementById('homeApp')?.removeAttribute('hidden');
        ensureStylesheet('spa-page-styles', 'css/styles.css', false);
        ensureStylesheet('spa-highlight-styles', 'css/highlight-local.css', false);
        window.dispatchEvent(new CustomEvent('spaRouteChanged', { detail: { page: '' } }));
    }

    async applyRoute() {
        const pageParam = pageFromUrl();
        const route = parsePageRef(pageParam);
        if (!route) {
            this.showHome();
            return;
        }

        if (!isLoggedIn()) {
            this.showHome();
            const banner = document.getElementById('welcomeBanner');
            if (banner) {
                banner.textContent = 'Login first to open this page.';
                banner.classList.add('warning');
                banner.classList.remove('hidden');
            }
            return;
        }

        this.route = route;
        const meta = metadataForPage(route.href, route.pageName);
        this.title = meta.title;
        this.description = meta.description;
        this.loading = true;
        this.error = '';
        this.hidden = false;
        document.body.classList.add('spa-route');
        document.getElementById('homeApp')?.setAttribute('hidden', '');
        ensureStylesheet('spa-page-styles', 'css/styles.css', true);
        ensureStylesheet('spa-highlight-styles', 'css/highlight-local.css', true);

        await this.updateComplete;
        await this.ensureContentBehavior();
        await this.loadPage(route);
    }

    async ensureContentBehavior() {
        await loadScript('js/highlight-local.js').catch((error) => console.warn(error));
        await loadScript('js/Aisettings.js').catch((error) => console.warn(error));
        await loadScript('js/main.js').catch((error) => console.warn(error));
    }

    async loadPage(route) {
        const token = `${route.pageName}:${Date.now()}`;
        this._loadToken = token;
        try {
            const { tocHtml, contentHtml } = await fetchPageBundle(route.pageName);
            if (this._loadToken !== token) return;

            const toc = document.getElementById('toc');
            const content = document.getElementById('content');
            if (toc) toc.innerHTML = tocHtml;
            if (content) content.innerHTML = contentHtml || '<section class="content-section"><p>Content is temporarily unavailable.</p></section>';
            this.loading = false;

            document.title = `${this.title} - Interactive Guide`;
            window.dispatchEvent(new CustomEvent('pageContentLoaded', { detail: { page: route.pageName } }));
            window.dispatchEvent(new CustomEvent('spaRouteChanged', { detail: { page: route.pageName } }));

            const q = new URLSearchParams(window.location.search).get('q') || route.query;
            if (q) {
                const pageUrl = new URL(window.location.href);
                pageUrl.searchParams.set('q', q);
                history.replaceState({}, '', pageUrl);
            }
            window.scrollTo({ top: 0, behavior: 'auto' });
        } catch (error) {
            if (this._loadToken !== token) return;
            console.warn('spa-app: failed to load page', error);
            this.loading = false;
            this.error = 'Content is temporarily unavailable. Please try again later.';
        }
    }

    render() {
        return html`
            <button class="menu-toggle" id="menuToggle">Menu</button>
            <div class="container">
                <nav class="sidebar" id="sidebar">
                    <div class="sidebar-header">
                        <h1>${this.title}</h1>
                        <p>Interactive Guide</p>
                        <a href="index.html" class="home-button" @click=${this.goHome}>
                            <span>Home</span>
                        </a>
                    </div>
                    <div class="toc" id="toc"></div>
                </nav>

                <main class="content">
                    <div class="content-header">
                        <h1>${this.title}</h1>
                        <p>${this.description}</p>
                    </div>

                    ${this.loading ? html`<div class="content-section"><p>Loading content...</p></div>` : ''}
                    ${this.error ? html`<div class="content-section"><p>${this.error}</p></div>` : ''}
                    <div id="content"></div>
                </main>
            </div>

            <button class="scroll-top" id="scrollTop">Up</button>
        `;
    }

    goHome(event) {
        event.preventDefault();
        const url = new URL(window.location.href);
        url.searchParams.delete('page');
        url.searchParams.delete('q');
        url.hash = '';
        history.pushState({}, '', url);
        this.showHome();
        document.title = 'S14321k - Sarath Programming Guides';
    }
}

customElements.define('lit-spa-app', LitSpaApp);
