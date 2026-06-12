/**
 * Generic Page Loader
 * Dynamically loads page data from JSON files based on URL parameter
 * Usage: page.html?page=java-basics or page.html?page=spring-fundamentals
 */

(function() {
    'use strict';

    // Get page parameter from URL
    function getPageFromURL() {
        const params = new URLSearchParams(window.location.search);
        return params.get('page') || null;
    }

    // Sanitize page name to prevent path traversal
    function sanitizePageName(pageName) {
        if (!pageName) return null;
        // Only allow alphanumeric, hyphens, and underscores
        const sanitized = pageName.replace(/[^a-zA-Z0-9_-]/g, '');
        return sanitized.length > 0 ? sanitized : null;
    }

    // Load page data from JSON or direct data
    // Load page data from backend API
    async function loadPageData(pageName) {
        try {
            // Check if page data exists in window.pageRegistry (populated by index-app.js)
            if (window.pageRegistry && window.pageRegistry[pageName]) {
                return window.pageRegistry[pageName];
            }

            // Fetch from backend API
            const response = await fetch('https://visit-ingest-342647168408.asia-south1.run.app/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    eventType: 'page_content',
                    page: pageName,
                    kind: 'page'
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: Page not found`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error loading page data:', error);
            throw error;
        }
    }

    // Render page with loaded data
    function renderPage(pageData, pageName, config) {
        try {
            const title = config?.title || pageData.title || pageName;
            const description = config?.description || '';
            const icon = config?.icon || '📘';

            // Update page title
            document.title = `${title} - Interactive Guide`;
            document.getElementById('pageTitle').innerHTML = `${icon} ${title}`;
            document.getElementById('contentTitle').innerHTML = title;
            document.getElementById('contentDescription').innerHTML = description;

            // Load TOC
            const tocHtml = pageData.tocHtml || '';
            document.getElementById('toc').innerHTML = tocHtml || '<p>No table of contents available</p>';

            // Load content
            const contentHtml = pageData.contentHtml || '';
            document.getElementById('content').innerHTML = contentHtml || '<p>Content not available</p>';

            // Highlight code blocks if available
            if (window.highlightCodeBlocks) {
                window.highlightCodeBlocks();
            }

            // Attach TOC click handlers
            attachTocHandlers();
        } catch (error) {
            console.error('Error rendering page:', error);
            document.getElementById('content').innerHTML = `<p style="color: red;">Error loading page content: ${error.message}</p>`;
        }
    }

    // Attach event listeners to TOC items
    function attachTocHandlers() {
        const tocItems = document.querySelectorAll('.toc-item');
        tocItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('data-target');
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }

    // Initialize page
    async function initPage() {
        try {
            const pageName = getPageFromURL();
            const sanitized = sanitizePageName(pageName);

            if (!sanitized) {
                document.getElementById('content').innerHTML = '<p style="color: red;">No page specified. Use ?page=page-name</p>';
                return;
            }

            // Show loading state
            document.getElementById('toc').innerHTML = 'Loading table of contents...';
            document.getElementById('content').innerHTML = 'Loading content...';

            // Get page config from window.pageRegistry if available (set by index-app.js)
            const config = window.pageRegistry && window.pageRegistry[sanitized]
                ? {
                    title: window.pageRegistry[sanitized].title,
                    description: window.pageRegistry[sanitized].description,
                    icon: window.pageRegistry[sanitized].icon
                  }
                : null;

            // Load and render page data
            const pageData = await loadPageData(sanitized);
            renderPage(pageData, sanitized, config);

        } catch (error) {
            console.error('Failed to initialize page:', error);
            document.getElementById('content').innerHTML =
                `<p style="color: red;">Failed to load page: ${error.message}</p>
                 <p><a href="../index.html">← Back to Home</a></p>`;
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPage);
    } else {
        initPage();
    }
})();

