(() => {
    'use strict';

    const hasSession = (() => {
        try {
            return Boolean(
                sessionStorage.getItem('visitRecorded') === '1' &&
                sessionStorage.getItem('visitorName') &&
                sessionStorage.getItem('visitSessionToken')
            );
        } catch {
            return false;
        }
    })();

    if (!hasSession) {
        const loginUrl = new URL('login.html', window.location.href);
        loginUrl.searchParams.set('next', window.location.href);
        window.location.replace(loginUrl.toString());
    }
})();
