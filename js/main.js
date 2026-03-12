// Shared UI behavior for content pages
(function () {
    'use strict';

    // Helpers
    const $ = (sel, ctx = document) => ctx.querySelector(sel);
    const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

    function safe(fn) {
        try { fn(); } catch (e) { console.error('main.js error:', e); }
    }

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

    // Active TOC highlighting based on scroll position
    safe(() => {
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
            if (active) active.classList.add('active');
        }

        window.addEventListener('scroll', throttle(onScroll, 100));
        window.addEventListener('resize', throttle(onScroll, 200));
        // run at init
        setTimeout(onScroll, 200);
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

