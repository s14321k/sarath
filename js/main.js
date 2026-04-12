// Shared UI behavior for content pages
(function () {
    'use strict';

    // Helpers
    const $ = (sel, ctx = document) => ctx.querySelector(sel);
    const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

    function safe(fn) {
        try { fn(); } catch (e) { console.error('main.js error:', e); }
    }

    // Gate access if name was not provided on index page
    safe(() => {
        if (sessionStorage.getItem('visitRecorded')) return;
        const current = window.location.href;
        const indexUrl = new URL('../index.html', window.location.href);
        indexUrl.searchParams.set('next', current);
        window.location.replace(indexUrl.toString());
    });

    // Show welcome banner on content pages (after redirect)
    safe(() => {
        const msg = sessionStorage.getItem('welcomeMessage');
        if (!msg) return;
        const banner = document.createElement('div');
        banner.className = 'welcome-banner';
        banner.textContent = msg;
        document.body.appendChild(banner);
        sessionStorage.removeItem('welcomeMessage');
        setTimeout(() => banner.classList.add('fade'), 3000);
        setTimeout(() => banner.remove(), 4500);
    });

    // Track page views and time on page
    safe(() => {
        const endpoint = window.VISIT_ENDPOINT || '';
        const name = sessionStorage.getItem('visitorName') || '';
        if (!endpoint || !name) return;
        const key = `pv:${window.location.pathname}`;
        const last = Number(sessionStorage.getItem(key) || '0');
        const now = Date.now();
        if (now - last < 30000) return; // 30s throttle per page
        sessionStorage.setItem(key, String(now));
        let geo = null;
        try {
            const raw = sessionStorage.getItem('geo');
            geo = raw ? JSON.parse(raw) : null;
        } catch {}
        const basePayload = {
            eventType: 'page_view',
            name,
            clientTime: new Date().toISOString(),
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || '',
            locale: navigator.language || '',
            page: window.location.href,
            referrer: document.referrer || '',
            userAgent: navigator.userAgent || '',
            geo: geo || undefined,
        };
        fetch(endpoint, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(basePayload),
            keepalive: true,
        }).catch(() => {});

        const start = Date.now();
        let sentExit = false;

        function sendExit() {
            if (sentExit) return;
            sentExit = true;
            const durationMs = Date.now() - start;
            const payload = {
                ...basePayload,
                eventType: 'page_exit',
                durationMs
            };
            const body = JSON.stringify(payload);
            if (navigator.sendBeacon) {
                try {
                    const blob = new Blob([body], { type: 'application/json' });
                    navigator.sendBeacon(endpoint, blob);
                    return;
                } catch {}
            }
            fetch(endpoint, {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body,
                keepalive: true,
            }).catch(() => {});
        }

        window.addEventListener('beforeunload', sendExit);
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'hidden') sendExit();
        });
    });

    // Menu toggle for mobile
    safe(() => {
        const menuToggle = $('#menuToggle');
        const sidebar = $('#sidebar');
        if (menuToggle && sidebar) {
            menuToggle.addEventListener('click', () => {
                sidebar.classList.toggle('open');
                menuToggle.classList.toggle('active');
            });

            // Close sidebar when clicking outside (mobile)
            document.addEventListener('click', (ev) => {
                if (window.innerWidth > 900) return; // only on small screens
                if (!sidebar.classList.contains('open')) return;
                const target = ev.target;
                if (!sidebar.contains(target) && target !== menuToggle) {
                    sidebar.classList.remove('open');
                    menuToggle.classList.remove('active');
                }
            });
        }
    });

    // Smooth scrolling for TOC links
    safe(() => {
        const toc = $('#toc');
        if (!toc) return;
        toc.addEventListener('click', (ev) => {
            const a = ev.target.closest('a');
            if (!a) return;
            const href = a.getAttribute('href');
            if (!href || !href.startsWith('#')) return; // external links can be normal
            ev.preventDefault();
            const id = href.slice(1);
            const target = document.getElementById(id);
            if (target) {
                const top = window.scrollY + target.getBoundingClientRect().top - 20; // small offset
                window.scrollTo({ top, behavior: 'smooth' });
                // close sidebar on small screens
                const sidebar = $('#sidebar');
                const menuToggle = $('#menuToggle');
                if (sidebar && menuToggle && window.innerWidth < 900) {
                    sidebar.classList.remove('open');
                    menuToggle.classList.remove('active');
                }
            } else {
                // If there's no matching id, still try a normal navigation (some toc items link to external URLs)
                const hrefFull = a.getAttribute('href');
                if (hrefFull) window.location.href = hrefFull;
            }
        });
    });

    // Scroll-to-top button
    safe(() => {
        const scrollTop = $('#scrollTop');
        if (!scrollTop) return;
        const showAt = 300;
        function update() {
            if (window.scrollY > showAt) scrollTop.classList.add('visible');
            else scrollTop.classList.remove('visible');
        }
        window.addEventListener('scroll', throttle(update, 100));
        update();
        scrollTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    });

    // Expand/Collapse all <details>
    safe(() => {
        let toggleBtn = null;
        let initializedOpen = false;

        function getDetails() {
            return $$('details');
        }

        function allOpen(details) {
            return details.length > 0 && details.every((d) => d.hasAttribute('open'));
        }

        function updateLabel(details) {
            if (!toggleBtn) return;
            const label = allOpen(details) ? 'Minimize All' : 'Maximize All';
            toggleBtn.textContent = label;
            toggleBtn.setAttribute('aria-label', label);
        }

        function ensureButton() {
            if (toggleBtn) return toggleBtn;
            toggleBtn = document.createElement('button');
            toggleBtn.id = 'detailsToggle';
            toggleBtn.className = 'details-toggle';
            toggleBtn.type = 'button';
            toggleBtn.textContent = 'Maximize All';
            toggleBtn.setAttribute('aria-label', 'Maximize All');
            document.body.appendChild(toggleBtn);
            return toggleBtn;
        }

        function setup() {
            const details = getDetails();
            if (!details.length) return;
            const btn = ensureButton();

            if (!initializedOpen) {
                details.forEach((d) => d.setAttribute('open', ''));
                initializedOpen = true;
            }

            updateLabel(details);

            if (!btn.dataset.bound) {
                btn.addEventListener('click', () => {
                    const current = getDetails();
                    const openAll = !allOpen(current);
                    current.forEach((d) => {
                        if (openAll) d.setAttribute('open', '');
                        else d.removeAttribute('open');
                    });
                    updateLabel(current);
                });
                btn.dataset.bound = 'true';
            }

            details.forEach((d) => {
                if (d.dataset.boundToggle) return;
                d.addEventListener('toggle', () => updateLabel(getDetails()));
                d.dataset.boundToggle = 'true';
            });
        }

        setup();

        const content = $('#content');
        if (content) {
            const observer = new MutationObserver(() => setup());
            observer.observe(content, { childList: true, subtree: true });
        }
    });

    // Mermaid diagrams (supports both .mermaid blocks and code.language-mermaid)
    safe(() => {
        const content = $('#content');
        if (!content) return;
        let mermaidLoaded = false;
        let mermaidLoading = false;

        function ensureMermaid(cb) {
            if (mermaidLoaded && window.mermaid) {
                cb();
                return;
            }
            if (mermaidLoading) return;
            mermaidLoading = true;
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js';
            script.async = true;
            script.onload = () => {
                mermaidLoaded = true;
                mermaidLoading = false;
                if (window.mermaid && window.mermaid.initialize) {
                    window.mermaid.initialize({ startOnLoad: false, theme: 'dark' });
                }
                cb();
            };
            script.onerror = () => { mermaidLoading = false; };
            document.head.appendChild(script);
        }

        function normalizeMermaidBlocks() {
            const codeBlocks = $$('pre > code.language-mermaid', content);
            codeBlocks.forEach((code) => {
                const pre = code.parentElement;
                const div = document.createElement('div');
                div.className = 'mermaid';
                div.textContent = code.textContent;
                pre.replaceWith(div);
            });
        }

        let modal = null;
        let modalViewport = null;
        let modalStage = null;
        let modalTitle = null;
        const modalState = { scale: 1, index: 0, baseWidth: 1, baseHeight: 1 };

        function clampScale(value) {
            return Math.max(0.4, Math.min(3, value));
        }

        function getSvgMetrics(svg) {
            if (!svg) return { width: 1, height: 1 };
            const width = svg.viewBox?.baseVal?.width || svg.width?.baseVal?.value || svg.getBoundingClientRect().width || 1;
            const height = svg.viewBox?.baseVal?.height || svg.height?.baseVal?.value || svg.getBoundingClientRect().height || 1;
            return { width, height };
        }

        function ensureModal() {
            if (modal) return;
            modal = document.createElement('div');
            modal.className = 'mermaid-modal hidden';
            modal.innerHTML = `
                <div class="mermaid-modal-backdrop" data-mermaid-close="1"></div>
                <section class="mermaid-modal-panel" role="dialog" aria-modal="true" aria-label="Mermaid diagram viewer">
                    <div class="mermaid-modal-toolbar">
                        <span class="mermaid-modal-title" data-mermaid-title>Diagram</span>
                        <div class="mermaid-modal-actions">
                            <button type="button" class="mermaid-tool-btn" data-action="zoom-out" aria-label="Zoom out">-</button>
                            <button type="button" class="mermaid-tool-btn" data-action="zoom-in" aria-label="Zoom in">+</button>
                            <button type="button" class="mermaid-tool-btn" data-action="fit" aria-label="Fit diagram">Fit</button>
                            <button type="button" class="mermaid-tool-btn" data-action="reset" aria-label="Reset zoom">Reset</button>
                            <button type="button" class="mermaid-tool-btn" data-action="download" aria-label="Download SVG">SVG</button>
                            <button type="button" class="mermaid-tool-btn mermaid-close-btn" data-mermaid-close="1" aria-label="Close diagram">Close</button>
                        </div>
                    </div>
                    <div class="mermaid-modal-viewport">
                        <div class="mermaid-modal-stage"></div>
                    </div>
                </section>
            `;
            document.body.appendChild(modal);
            modalViewport = modal.querySelector('.mermaid-modal-viewport');
            modalStage = modal.querySelector('.mermaid-modal-stage');
            modalTitle = modal.querySelector('[data-mermaid-title]');

            modal.addEventListener('click', (ev) => {
                const action = ev.target.closest('[data-action]')?.dataset.action;
                if (action === 'zoom-in') return zoomModal(0.15);
                if (action === 'zoom-out') return zoomModal(-0.15);
                if (action === 'fit') return fitModal();
                if (action === 'reset') return resetModal();
                if (action === 'download') return downloadModal();
                if (ev.target.closest('[data-mermaid-close="1"]')) closeModal();
            });

            modalViewport.addEventListener('wheel', (ev) => {
                if (!ev.ctrlKey) return;
                ev.preventDefault();
                zoomModal(ev.deltaY < 0 ? 0.1 : -0.1);
            }, { passive: false });

            let dragActive = false;
            let startX = 0;
            let startY = 0;
            let startLeft = 0;
            let startTop = 0;

            modalViewport.addEventListener('pointerdown', (ev) => {
                if (ev.button !== 0) return;
                if (!ev.target.closest('svg')) return;
                dragActive = true;
                startX = ev.clientX;
                startY = ev.clientY;
                startLeft = modalViewport.scrollLeft;
                startTop = modalViewport.scrollTop;
                modalViewport.classList.add('is-dragging');
                modalViewport.setPointerCapture(ev.pointerId);
                ev.preventDefault();
            });

            modalViewport.addEventListener('pointermove', (ev) => {
                if (!dragActive) return;
                modalViewport.scrollLeft = startLeft - (ev.clientX - startX);
                modalViewport.scrollTop = startTop - (ev.clientY - startY);
            });

            function stopDrag(ev) {
                if (!dragActive) return;
                dragActive = false;
                modalViewport.classList.remove('is-dragging');
                try { modalViewport.releasePointerCapture(ev.pointerId); } catch {}
            }

            modalViewport.addEventListener('pointerup', stopDrag);
            modalViewport.addEventListener('pointercancel', stopDrag);

            document.addEventListener('keydown', (ev) => {
                if (ev.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
                    closeModal();
                }
            });
        }

        function getModalDiagram() {
            return modalStage?.querySelector('.mermaid-modal-diagram') || null;
        }

        function updateModalScale() {
            const diagram = getModalDiagram();
            const svg = diagram?.querySelector('svg');
            if (!diagram || !svg) return;
            svg.style.width = `${modalState.baseWidth * modalState.scale}px`;
            svg.style.height = `${modalState.baseHeight * modalState.scale}px`;
        }

        function fitModal() {
            const diagram = getModalDiagram();
            const svg = diagram?.querySelector('svg');
            if (!diagram || !svg || !modalViewport) return;
            const metrics = getSvgMetrics(svg);
            const viewportWidth = Math.max(modalViewport.clientWidth - 36, 320);
            modalState.baseWidth = metrics.width;
            modalState.baseHeight = metrics.height;
            modalState.scale = clampScale(viewportWidth / metrics.width);
            updateModalScale();
            modalViewport.scrollLeft = 0;
            modalViewport.scrollTop = 0;
        }

        function resetModal() {
            modalState.scale = 1;
            updateModalScale();
            if (modalViewport) {
                modalViewport.scrollLeft = 0;
                modalViewport.scrollTop = 0;
            }
        }

        function zoomModal(delta) {
            modalState.scale = clampScale(modalState.scale + delta);
            updateModalScale();
        }

        function downloadModal() {
            const svg = modalStage?.querySelector('svg');
            if (!svg) return;
            const serializer = new XMLSerializer();
            let source = serializer.serializeToString(svg);
            if (!source.includes('xmlns=')) {
                source = source.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
            }
            const blob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `mermaid-diagram-${modalState.index + 1}.svg`;
            document.body.appendChild(link);
            link.click();
            link.remove();
            setTimeout(() => URL.revokeObjectURL(url), 1000);
        }

        function closeModal() {
            if (!modal) return;
            modal.classList.add('hidden');
            document.body.classList.remove('mermaid-modal-open');
            if (modalStage) modalStage.innerHTML = '';
        }

        function openModal(node, index) {
            ensureModal();
            const svg = node.querySelector('svg');
            if (!svg) return;
            modalState.index = index;
            const metrics = getSvgMetrics(svg);
            modalState.baseWidth = metrics.width;
            modalState.baseHeight = metrics.height;
            if (modalTitle) modalTitle.textContent = `Diagram ${index + 1}`;
            modalStage.innerHTML = '';
            const diagram = document.createElement('div');
            diagram.className = 'mermaid-modal-diagram';
            const clone = svg.cloneNode(true);
            clone.removeAttribute('style');
            clone.style.width = `${modalState.baseWidth}px`;
            clone.style.height = `${modalState.baseHeight}px`;
            diagram.appendChild(clone);
            modalStage.appendChild(diagram);
            modal.classList.remove('hidden');
            document.body.classList.add('mermaid-modal-open');
            requestAnimationFrame(() => fitModal());
        }

        function wrapInlineNode(node, index) {
            if (node.closest('.mermaid-shell')) return;
            const shell = document.createElement('section');
            shell.className = 'mermaid-shell';
            shell.innerHTML = `
                <button type="button" class="mermaid-open-btn" aria-label="Open Mermaid diagram">Open</button>
                <div class="mermaid-inline-stage"></div>
                <div class="mermaid-inline-hint">Click diagram to expand</div>
            `;
            const parent = node.parentNode;
            parent.replaceChild(shell, node);
            shell.querySelector('.mermaid-inline-stage').appendChild(node);
            shell.addEventListener('click', (ev) => {
                if (!ev.target.closest('.mermaid-open-btn') && !ev.target.closest('.mermaid') && !ev.target.closest('svg')) return;
                openModal(node, index);
            });
        }

        function fitInline(node) {
            const svg = node.querySelector('svg');
            if (!svg) return;
            const shell = node.closest('.mermaid-shell');
            const stage = shell?.querySelector('.mermaid-inline-stage');
            const metrics = getSvgMetrics(svg);
            const availableWidth = Math.max((stage?.clientWidth || node.clientWidth || metrics.width) - 4, 240);
            const maxPreviewHeight = Math.max(Math.min(window.innerHeight * 0.5, 520), 220);
            const scale = Math.min(1, availableWidth / metrics.width, maxPreviewHeight / metrics.height);
            svg.style.display = 'block';
            svg.style.width = `${Math.max(1, metrics.width * scale)}px`;
            svg.style.height = `${Math.max(1, metrics.height * scale)}px`;
            svg.style.maxWidth = '100%';
        }

        function enhanceRenderedNodes() {
            const nodes = $$('.mermaid', content);
            nodes.forEach((node, index) => {
                if (!node.querySelector('svg')) return;
                wrapInlineNode(node, index);
                fitInline(node);
            });
        }

        function renderMermaid() {
            normalizeMermaidBlocks();
            const nodes = $$('.mermaid', content);
            if (!nodes.length) return;
            ensureMermaid(() => {
                if (!window.mermaid) return;
                let renderResult = null;
                if (typeof window.mermaid.run === 'function') {
                    renderResult = window.mermaid.run({ nodes });
                } else if (typeof window.mermaid.init === 'function') {
                    renderResult = window.mermaid.init(undefined, nodes);
                }
                Promise.resolve(renderResult).finally(() => enhanceRenderedNodes());
            });
        }

        const observer = new MutationObserver(() => renderMermaid());
        observer.observe(content, { childList: true, subtree: true });
        document.addEventListener('DOMContentLoaded', () => setTimeout(renderMermaid, 200));
        renderMermaid();
    });

    // Active TOC highlighting based on scroll position
    safe(() => {
        let tocScrollHandler = null;
        let tocResizeHandler = null;
        let searchScrolled = false;
        const searchQuery = (() => {
            try { return new URLSearchParams(window.location.search).get('q') || ''; } catch {}
            return '';
        })();

        function setupActiveToc() {
            const toc = $('#toc');
            const content = $('#content');
            if (!toc || !content) return;
            const headings = $$('h1, h2, h3, h4', content).filter(h => h.id);
            if (!headings.length) return;

            const tocItems = $$('a.toc-item', toc).reduce((map, a) => {
                const key = a.dataset.target || a.getAttribute('href')?.slice(1);
                if (key) map[key] = a;
                return map;
            }, {});

            function onScroll() {
                const offset = 120; // how far from top to consider active
                const scrollPos = window.scrollY + offset;
                let currentId = headings[0].id;
                for (let i = 0; i < headings.length; i++) {
                    const h = headings[i];
                    if (h.offsetTop <= scrollPos) currentId = h.id;
                    else break;
                }
                // Clear previous
                $$('.toc-item', toc).forEach(a => a.classList.remove('active'));
                const active = tocItems[currentId];
                if (active) {
                    active.classList.add('active');
                    const scrollHost = active.closest('.sidebar') || toc;
                    const hostRect = scrollHost.getBoundingClientRect();
                    const itemRect = active.getBoundingClientRect();
                    const topPadding = 20;
                    const bottomPadding = 20;
                    if (itemRect.top < hostRect.top + topPadding) {
                        scrollHost.scrollTop -= (hostRect.top + topPadding - itemRect.top);
                    } else if (itemRect.bottom > hostRect.bottom - bottomPadding) {
                        scrollHost.scrollTop += (itemRect.bottom - (hostRect.bottom - bottomPadding));
                    }
                }
            }

            if (tocScrollHandler) window.removeEventListener('scroll', tocScrollHandler);
            if (tocResizeHandler) window.removeEventListener('resize', tocResizeHandler);
            tocScrollHandler = throttle(onScroll, 100);
            tocResizeHandler = throttle(onScroll, 200);
            window.addEventListener('scroll', tocScrollHandler);
            window.addEventListener('resize', tocResizeHandler);
            setTimeout(onScroll, 50);
        }

        function elementMatches(el, query) {
            const text = (el.textContent || '').toLowerCase();
            const q = String(query || '').trim().toLowerCase();
            if (!q) return false;
            if (text.includes(q)) return true;
            const terms = q.split(/\s+/).filter(Boolean);
            if (terms.length > 1) return terms.every((t) => text.includes(t));
            return false;
        }

        function scrollToSearchMatch() {
            if (!searchQuery || searchScrolled) return;
            const content = $('#content');
            if (!content) return;
            const candidates = $$('.content h1, .content h2, .content h3, .content h4, .content p, .content li, .content blockquote, .content pre');
            const match = candidates.find((el) => elementMatches(el, searchQuery));
            if (!match) return;
            searchScrolled = true;
            const top = window.scrollY + match.getBoundingClientRect().top - 20;
            window.scrollTo({ top, behavior: 'smooth' });
        }

        setupActiveToc();
        setTimeout(scrollToSearchMatch, 80);
        window.addEventListener('pageContentLoaded', () => {
            setTimeout(setupActiveToc, 50);
            setTimeout(scrollToSearchMatch, 80);
        });
        const content = $('#content');
        if (content) {
            const observer = new MutationObserver(() => scrollToSearchMatch());
            observer.observe(content, { childList: true, subtree: true });
        }
    });

    // Utility: throttle
    function throttle(fn, wait) {
        let last = 0;
        let timer = null;
        return function (...args) {
            const now = Date.now();
            const remaining = wait - (now - last);
            if (remaining <= 0) {
                if (timer) { clearTimeout(timer); timer = null; }
                last = now;
                fn.apply(this, args);
            } else if (!timer) {
                timer = setTimeout(() => {
                    last = Date.now();
                    timer = null;
                    fn.apply(this, args);
                }, remaining);
            }
        };
    }

})();

// Chat widget (for content pages)
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('/pages/')) {
        const script = document.createElement('script');
        script.src = '../js/chat.js';
        document.body.appendChild(script);

        const kuralScript = document.createElement('script');
        kuralScript.src = '../js/kural-widget.js';
        document.body.appendChild(kuralScript);
    }
});
