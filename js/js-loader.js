(() => {
    'use strict';

    const endpoint = window.VISIT_ENDPOINT || '';
    const currentScript = document.currentScript;
    const mode = currentScript?.dataset.mode || 'index';
    const loaded = new Map();
    const objectUrls = new Set();
    const PROD_HOST = 's14321k.github.io';
    const LOCAL_JS_OLD = new Set([
        'Aisettings.js',
        'admin.js',
        'adminchat.js',
        'auth-gate.js',
        'chat.js',
        'generic-page-loader.js',
        'highlight-local.js',
        'index-app.js',
        'instagram-panel.js',
        'kural-widget.js',
        'main.js',
        'md-editor.js',
        'search.js',
        'spa-app.js'
    ]);

    function shouldUseBackend() {
        return window.location.hostname === PROD_HOST;
    }

    function isLocalEnvironment() {
        const host = window.location.hostname;
        return window.location.protocol === 'file:'
            || host === 'localhost'
            || host === '127.0.0.1'
            || host === '::1'
            || window.location.port === '63344';
    }

    function shouldUseLocalScripts() {
        return isLocalEnvironment() || !shouldUseBackend();
    }

    function hasSession() {
        try {
            return Boolean(
                sessionStorage.getItem('visitRecorded') === '1' &&
                sessionStorage.getItem('visitorName') &&
                sessionStorage.getItem('visitSessionToken')
            );
        } catch {
            return false;
        }
    }

    function redirectToLogin() {
        const loginPath = mode === 'page' ? '../login.html' : 'login.html';
        const loginUrl = new URL(loginPath, window.location.href);
        loginUrl.searchParams.set('next', window.location.href);
        window.location.replace(loginUrl.toString());
    }

    function safeFilename(file) {
        const name = String(file || '').split('/').pop() || '';
        return /^[A-Za-z0-9._-]+\.js$/.test(name) ? name : '';
    }

    function encodeVisitPayload(payload) {
        const params = new URLSearchParams();
        Object.entries(payload || {}).forEach(([key, value]) => {
            if (typeof value === 'undefined' || value === null) return;
            params.set(key, String(value));
        });
        return params;
    }

    function scriptUrl(folder, filename) {
        const base = currentScript?.src || new URL('js/js-loader.js', window.location.href).href;
        return new URL(`../${folder}/${filename}`, base).href;
    }

    function loadLocalScript(filename, options = {}) {
        const primaryFolder = LOCAL_JS_OLD.has(filename) ? 'jsOld' : 'js';
        const fallbackFolder = primaryFolder === 'jsOld' ? 'js' : '';
        return new Promise((resolve, reject) => {
            function append(folder, allowFallback) {
                const script = document.createElement('script');
                if (options.module) script.type = 'module';
                script.src = scriptUrl(folder, filename);
                script.onload = () => resolve();
                script.onerror = () => {
                    script.remove();
                    if (allowFallback && fallbackFolder) {
                        append(fallbackFolder, false);
                        return;
                    }
                    reject(new Error(`Failed to load ${filename} from ${folder}`));
                };
                document.body.appendChild(script);
            }
            append(primaryFolder, true);
        });
    }

    async function fetchScript(file) {
        const filename = safeFilename(file);
        if (!filename) throw new Error(`Invalid script name: ${file}`);
        if (!endpoint) throw new Error('VISIT_ENDPOINT is not configured');
        const response = await fetch(endpoint, {
            method: 'POST',
            body: encodeVisitPayload({
                eventType: 'js_file',
                file: filename
            })
        });
        const data = await response.json().catch(() => ({}));
        if (!response.ok || !data?.content) {
            throw new Error(data?.error || data?.detail || `Failed to load ${filename}`);
        }
        return {
            filename,
            content: String(data.content || '')
        };
    }

    async function loadScript(file, options = {}) {
        const filename = safeFilename(file);
        const type = options.module ? 'module' : 'classic';
        const key = `${type}:${filename}`;
        if (loaded.has(key)) return loaded.get(key);

        const promise = (!shouldUseLocalScripts()
            ? fetchScript(filename).then(({ content }) => new Promise((resolve, reject) => {
            const blob = new Blob([
                `${content}\n//# sourceURL=${window.location.origin}/server-js/${filename}`
            ], { type: 'text/javascript' });
            const url = URL.createObjectURL(blob);
            objectUrls.add(url);
            const script = document.createElement('script');
            if (options.module) script.type = 'module';
            script.src = url;
            script.onload = () => resolve();
            script.onerror = () => reject(new Error(`Failed to execute ${filename}`));
            document.body.appendChild(script);
        }))
            : loadLocalScript(filename, options)
        ).catch((error) => {
            console.error(`JsLoader: failed to load ${filename}.`, error);
            throw error;
        });
        loaded.set(key, promise);
        return promise;
    }

    async function loadMany(files, options = {}) {
        for (const file of files) {
            await loadScript(file, options);
        }
    }

    async function bootIndex() {
        await loadMany([
            'pdf-list.js',
            'html-list.js',
            'index-app.js',
            'Aisettings.js',
            'chat.js',
            'search.js',
            'kural-widget.js',
            'md-editor.js',
            'instagram-panel.js'
        ]);
        await loadScript('spa-app.js');
        await loadScript('main.js');
    }

    async function bootPage() {
        await loadMany([
            'highlight-local.js',
            'generic-page-loader.js',
            'Aisettings.js',
            'main.js',
            'chat.js',
            'kural-widget.js',
            'md-editor.js',
            'instagram-panel.js'
        ]);
    }

    async function bootPdf() {
        await loadMany([
            'Aisettings.js',
            'main.js'
        ]);
    }

    async function bootLogin() {
        await loadScript('login-page.js');
    }

    async function bootAdmin() {
        await loadMany([
            'admin.js',
            'adminchat.js'
        ]);
    }

    window.JsLoader = {
        load: loadScript,
        loadMany
    };

    window.addEventListener('unload', () => {
        objectUrls.forEach((url) => URL.revokeObjectURL(url));
    });

    if (!['login', 'admin'].includes(mode) && !hasSession()) {
        redirectToLogin();
        return;
    }

    const boot = mode === 'login'
        ? bootLogin
        : (mode === 'admin' ? bootAdmin : (mode === 'page' ? bootPage : (mode === 'pdf' ? bootPdf : bootIndex)));
    boot().catch((error) => {
        console.error('Failed to load application scripts:', error);
        const status = document.getElementById('indexLoadStatus') || document.getElementById('content');
        if (status) status.textContent = 'Unable to load application scripts.';
    });
})();
