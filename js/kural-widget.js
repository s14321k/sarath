(() => {
    'use strict';

    const ROTATE_MS = 5 * 60 * 1000;
    const HIDE_SECONDS = 15;
    const basePath = window.location.pathname.includes('/pages/') ? '../' : './';
    const dataUrl = `${basePath}data/kural.json`;
    const isFloating = window.location.pathname.includes('/pages/');

    const banner = ensureBanner();
    if (!banner) return;

    const labelEl = banner.querySelector('[data-kural-label]');
    const numberEl = banner.querySelector('[data-kural-number]');
    const tamilEl = banner.querySelector('[data-kural-tamil]');
    const transliterationEl = banner.querySelector('[data-kural-transliteration]');
    const englishEl = banner.querySelector('[data-kural-english]');
    const nextBtn = banner.querySelector('[data-kural-next]');
    const loadingEl = banner.querySelector('[data-kural-loading]');

    let items = [];
    let currentIndex = 0;

    function render(item) {
        if (!item) return;
        setLoading(false);
        if (labelEl) labelEl.textContent = item.category || 'Aram';
        if (numberEl) numberEl.textContent = item.kural_number ? String(item.kural_number) : '';
        if (tamilEl) {
            const [line1, line2] = splitTamil(item.tamil || '');
            tamilEl.innerHTML = '';
            const first = document.createElement('span');
            first.textContent = line1;
            tamilEl.appendChild(first);
            if (line2) {
                const second = document.createElement('span');
                second.textContent = line2;
                tamilEl.appendChild(second);
            }
        }
        if (transliterationEl) transliterationEl.textContent = item.transliteration || '';
        if (englishEl) englishEl.textContent = item.english_meaning || '';
    }

    function renderNow() {
        if (!items.length) return;
        const safeIndex = Number.isFinite(currentIndex) ? currentIndex : 0;
        render(items[safeIndex]);
    }

    async function loadData() {
        let json = null;
        try {
            setLoading(true, 'Loading...');
            const res = await fetch(dataUrl, { cache: 'no-store' });
            if (!res.ok) throw new Error('Failed to load kural data');
            json = await res.json();
        } catch (e) {
            try {
                json = await loadDataViaXhr();
            } catch {
                if (!items.length) {
                    const hint = window.location.protocol === 'file:' ? 'Run a local server' : 'Unable to load';
                    setLoading(true, hint);
                }
                return;
            }
        }

        const next = flattenKuralData(json);
        if (next.length) {
            const initialIndex = getIndexFor(next.length);
            const preservedIndex = items.length ? (currentIndex % next.length) : initialIndex;
            items = next;
            currentIndex = Number.isFinite(preservedIndex) ? preservedIndex : 0;
            renderNow();
            startAutoHide();
        } else if (!items.length) {
            setLoading(true, 'No data');
        }
    }

    loadData();
    setInterval(() => {
        advanceKural();
        loadData();
    }, ROTATE_MS);

    function getIndexFor(length) {
        if (!length) return 0;
        return Math.floor(Date.now() / ROTATE_MS) % length;
    }

    function splitTamil(text) {
        const words = String(text || '').trim().split(/\s+/).filter(Boolean);
        if (!words.length) return ['', ''];
        const firstLine = words.slice(0, 4).join(' ');
        const secondLine = words.slice(4).join(' ');
        return [firstLine, secondLine];
    }

    function flattenKuralData(data) {
        const list = [];
        if (!data || typeof data !== 'object') return list;
        Object.keys(data).forEach((category) => {
            const entries = Array.isArray(data[category]) ? data[category] : [];
            entries.forEach((entry) => {
                list.push({ ...entry, category });
            });
        });
        return list;
    }

    function ensureBanner() {
        let target = document.getElementById('kuralBanner');
        if (!target) {
            target = document.createElement('section');
            target.id = 'kuralBanner';
            target.className = 'kural-banner kural-floating';
            document.body.appendChild(target);
        } else {
            target.classList.add('kural-inline');
            if (!target.classList.contains('kural-banner')) {
                target.classList.add('kural-banner');
            }
        }

        if (!target.dataset.built) {
            target.innerHTML = `
                <div class="kural-label" data-kural-label>Aram</div>
                <button class="kural-next" type="button" data-kural-next aria-label="Next Thirukural">
                    <span class="kural-next-icon">→</span>
                </button>
                <div class="kural-content">
                    <div class="kural-number" data-kural-number></div>
                    <div class="kural-tamil" data-kural-tamil></div>
                    <div class="kural-transliteration" data-kural-transliteration></div>
                    <div class="kural-english" data-kural-english></div>
                    <div class="kural-timer" data-kural-timer>
                        <span class="kural-timer-label">Auto-hide in</span>
                        <span class="kural-timer-value" data-kural-timer-value>${HIDE_SECONDS}</span>
                        <span class="kural-timer-unit">s</span>
                        <span class="kural-timer-bar"><span data-kural-timer-bar></span></span>
                    </div>
                    <div class="kural-loading" data-kural-loading>Loading...</div>
                </div>
            `;
            target.dataset.built = 'true';
        }

        return target;
    }

    function advanceKural() {
        if (!items.length) return;
        currentIndex = (currentIndex + 1) % items.length;
        renderNow();
        startAutoHide();
    }

    let hideTimeout = null;
    let countdownInterval = null;

    function startAutoHide() {
        if (!isFloating) return;
        clearTimeout(hideTimeout);
        if (countdownInterval) clearInterval(countdownInterval);

        banner.classList.remove('kural-hidden');

        const timerValue = banner.querySelector('[data-kural-timer-value]');
        const timerBar = banner.querySelector('[data-kural-timer-bar]');
        let remaining = HIDE_SECONDS;

        updateTimerValue(timerValue, remaining);
        restartTimerBar(timerBar, HIDE_SECONDS);

        countdownInterval = setInterval(() => {
            remaining -= 1;
            updateTimerValue(timerValue, Math.max(remaining, 0));
            if (remaining <= 0) {
                clearInterval(countdownInterval);
                countdownInterval = null;
            }
        }, 1000);

        hideTimeout = setTimeout(() => {
            banner.classList.add('kural-hidden');
        }, HIDE_SECONDS * 1000);
    }

    function updateTimerValue(el, value) {
        if (!el) return;
        el.textContent = String(value);
        el.classList.remove('kural-timer-pulse');
        void el.offsetHeight;
        el.classList.add('kural-timer-pulse');
    }

    function restartTimerBar(el, seconds) {
        if (!el) return;
        el.style.animation = 'none';
        void el.offsetHeight;
        el.style.animation = `timerShrink ${seconds}s linear forwards`;
    }

    function setLoading(isLoading, message) {
        if (!loadingEl) return;
        if (isLoading) {
            loadingEl.textContent = message || 'Loading...';
            loadingEl.classList.add('visible');
        } else {
            loadingEl.classList.remove('visible');
        }
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            advanceKural();
            nextBtn.classList.remove('kural-rotate');
            void nextBtn.offsetHeight;
            nextBtn.classList.add('kural-rotate');
        });
    }
})();
