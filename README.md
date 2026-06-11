# Frontend App

This folder is the static frontend deployment root.

## Entry Points

- `login.html` is the public entry point for authentication.
- `index.html` is protected by `js/auth-gate.js`; it redirects to `login.html` unless `sessionStorage` contains a valid login session.
- `pages/` and `pages1/` are generated guide shells. New generated pages should include `../js/auth-gate.js`.

## Runtime Data

- `data/index.json` contains the index card model loaded by `js/index-app.js`.
- `private-repo/visit-data-repo/data/index.json` is the private-repo copy served by the backend `index_content` API.
- Individual page content is loaded from private JSON through the backend `page_content` API, with local JSON fallback support.

## Local Flow

1. Open `login.html`.
2. Login through the Cloud Run backend configured in `js/visit-config.js`.
3. After login, the browser redirects to `index.html`.
4. `index.html` loads the cards from the backend `index_content` endpoint or local `data/index.json`.
