(function () {
    'use strict';

    if (window.hljs) return;

    window.hljs = {
        highlightElement: function (element) {
            if (!element) return;
            element.classList.add('hljs');
        },
        highlightAll: function () {
            document.querySelectorAll('pre code').forEach(function (element) {
                element.classList.add('hljs');
            });
        }
    };
})();
