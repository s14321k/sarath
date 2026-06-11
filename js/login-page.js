(() => {
    'use strict';

    const $ = (id) => document.getElementById(id);

    function showPanel(kind) {
        const login = kind === 'login';
        $('loginTab')?.classList.toggle('active', login);
        $('signupTab')?.classList.toggle('active', !login);
        $('loginForm')?.classList.toggle('hidden', !login);
        $('signupForm')?.classList.toggle('hidden', login);
    }

    function nextUrl() {
        const params = new URLSearchParams(window.location.search);
        return window.AuthClient.safeNextUrl(params.get('next') || 'index.html');
    }

    function boot() {
        if (window.AuthClient.isAuthenticated()) {
            window.location.replace(nextUrl());
            return;
        }

        $('loginTab')?.addEventListener('click', () => showPanel('login'));
        $('signupTab')?.addEventListener('click', () => showPanel('signup'));

        $('loginForm')?.addEventListener('submit', async (event) => {
            event.preventDefault();
            const error = $('loginError');
            if (error) error.textContent = '';
            try {
                await window.AuthClient.login($('loginUser')?.value, $('loginPass')?.value);
                window.location.replace(nextUrl());
            } catch (err) {
                if (error) error.textContent = err instanceof Error ? err.message : 'Login failed.';
            }
        });

        $('signupForm')?.addEventListener('submit', async (event) => {
            event.preventDefault();
            const error = $('signupError');
            if (error) error.textContent = '';
            const password = $('signupPass')?.value || '';
            if (password !== ($('signupConfirm')?.value || '')) {
                if (error) error.textContent = 'Passwords do not match.';
                return;
            }
            try {
                await window.AuthClient.signup($('signupUser')?.value, password);
                showPanel('login');
                const loginError = $('loginError');
                if (loginError) loginError.textContent = 'Signup successful. Please login.';
            } catch (err) {
                if (error) error.textContent = err instanceof Error ? err.message : 'Signup failed.';
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }
})();
