(function () {
    'use strict';

    if (window.hljs) return;

    const KEYWORDS = new Set([
        'abstract', 'as', 'async', 'await', 'break', 'case', 'catch', 'class', 'const', 'continue',
        'default', 'def', 'delete', 'do', 'else', 'enum', 'export', 'extends', 'false', 'final',
        'finally', 'fn', 'for', 'from', 'fun', 'function', 'if', 'implements', 'import', 'in',
        'instanceof', 'interface', 'let', 'match', 'new', 'null', 'object', 'package', 'private',
        'protected', 'public', 'record', 'return', 'sealed', 'static', 'struct', 'super', 'switch',
        'this', 'throw', 'throws', 'trait', 'true', 'try', 'type', 'typeof', 'undefined', 'val',
        'var', 'void', 'when', 'while', 'with', 'yield'
    ]);

    const BUILT_INS = new Set([
        'Array', 'Boolean', 'Date', 'Error', 'JSON', 'List', 'Map', 'Math', 'Object', 'Optional',
        'Promise', 'Set', 'Stream', 'String', 'System', 'console', 'document', 'fetch', 'window'
    ]);

    const TOKEN_PATTERN = /\/\*[\s\S]*?\*\/|\/\/.*$|--.*$|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`|<\/?[A-Za-z][^>\n]*>|@[A-Za-z_][\w.]*|\b\d+(?:\.\d+)?\b|\b[A-Za-z_][\w$]*\b|[+\-*/%=!<>|&^~?:]+|[()[\]{}.,;]+/gm;

    function escapeHtml(value) {
        return String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }

    function classify(token, nextChar) {
        if (!token) return 'hljs-subst';
        if (token.startsWith('/*') || token.startsWith('//') || token.startsWith('--')) return 'hljs-comment';
        if (token.startsWith('"') || token.startsWith('\'') || token.startsWith('`')) return 'hljs-string';
        if (token.startsWith('@')) return 'hljs-meta';
        if (/^<\/?[A-Za-z]/.test(token)) return 'hljs-tag';
        if (/^\d/.test(token)) return 'hljs-number';
        if (/^[()[\]{}.,;]+$/.test(token)) return 'hljs-punctuation';
        if (/^[+\-*/%=!<>|&^~?:]+$/.test(token)) return 'hljs-operator';
        if (KEYWORDS.has(token)) return 'hljs-keyword';
        if (BUILT_INS.has(token)) return 'hljs-built_in';
        if (nextChar === '(') return 'hljs-title';
        return 'hljs-subst';
    }

    function highlightCode(text) {
        let result = '';
        let lastIndex = 0;
        TOKEN_PATTERN.lastIndex = 0;

        for (let match = TOKEN_PATTERN.exec(text); match; match = TOKEN_PATTERN.exec(text)) {
            const token = match[0];
            result += escapeHtml(text.slice(lastIndex, match.index));
            const nextChar = text.slice(TOKEN_PATTERN.lastIndex).match(/\S/)?.[0] || '';
            const className = classify(token, nextChar);
            result += `<span class="${className}">${escapeHtml(token)}</span>`;
            lastIndex = TOKEN_PATTERN.lastIndex;
        }

        result += escapeHtml(text.slice(lastIndex));
        return result;
    }

    function highlightElement(element) {
        if (!element || element.dataset.hljsDone === 'true') return;
        const text = element.textContent || '';
        element.innerHTML = highlightCode(text);
        element.classList.add('hljs');
        element.dataset.hljsDone = 'true';
    }

    function highlightAll(root) {
        const scope = root && root.querySelectorAll ? root : document;
        scope.querySelectorAll('pre code').forEach(highlightElement);
    }

    window.hljs = {
        highlightAll,
        highlightElement
    };
})();
