# Visitor Logging Workflow (GitHub Pages + GCP + Private Repo)

This document summarizes the full setup to capture a visitor name on a public GitHub Pages site, validate it, and store it privately in a JSON file via GCP and a private GitHub repo.

## Architecture

- Public repo `s14321k/sarath`: GitHub Pages site. Shows modal, collects name, sends to GCP endpoint.
- GCP Cloud Functions (2nd gen): receives name payload, calls GitHub `repository_dispatch`.
- Private repo `s14321k/sarathpvt`: stores `data/visits.json` and has an Action that appends entries.

Flow:
1. User opens GitHub Pages site.
2. Modal asks for name, validates.
3. Browser POSTs to GCP function.
4. GCP function triggers `repository_dispatch` on private repo.
5. GitHub Action runs `scripts/append-visit.py` to append to `data/visits.json` and commits.

## Public Repo (s14321k/sarath)

Required files:
- `index.html` includes:
  - Modal markup with `id="visitModal"`.
  - Scripts: `js/visit-config.js`, `js/util.js`.
- `js/visit-config.js` contains the GCP endpoint URL:
  ```js
  window.VISIT_ENDPOINT = "https://YOUR_FUNCTION_URL";
  ```
- `js/util.js` collects name, validates, POSTs to endpoint.
- `css/index.css` contains modal styles.

Notes:
- `visit-tracker.js` was blocked by ad blockers; renamed to `util.js`.

## Private Repo (s14321k/sarathpvt)

At repo root:
- `.github/workflows/append-visit.yml`
- `scripts/append-visit.py`
- `data/visits.json`

Workflow:
- Trigger: `repository_dispatch` event type `append_visit`.
- Action runs `scripts/append-visit.py`, appends payload to JSON, commits.

## GCP Cloud Function (2nd gen)

Runtime: Node.js 20
Entry point: `ingest`
Allow unauthenticated: Yes

Environment variables:
- `GH_OWNER = s14321k`
- `GH_REPO = sarathpvt`
- `GH_TOKEN = <GitHub token>`

`index.js` exports `ingest` and posts to:
```
POST https://api.github.com/repos/s14321k/sarathpvt/dispatches
```

## GitHub Token

Use a fine-grained token with:
- Repository: `s14321k/sarathpvt`
- Permissions:
  - Contents: Read and write
  - Metadata: Read

If dispatch fails, use a classic token with `repo` scope.

## Deployment Steps

1. Deploy GCP function (console or CLI). Set env vars.
2. Copy function URL into `js/visit-config.js` in public repo.
3. Push public repo.
4. Ensure private repo has Action + data JSON at root and push.
5. Test by visiting site and entering a name.

## Troubleshooting

- Modal not showing:
  - Confirm `index.html` includes modal markup and `js/util.js`.
  - Clear session storage: `sessionStorage.removeItem('visitRecorded')`.
- Action not triggered:
  - Check GCP function logs.
  - Verify `GH_TOKEN` has access to private repo.
  - Manually test dispatch API.

## Folder Placement

Public repo `s14321k/sarath`:
- `index.html`
- `css/index.css`
- `js/visit-config.js`
- `js/util.js`

Private repo `s14321k/sarathpvt`:
- `.github/workflows/append-visit.yml`
- `scripts/append-visit.py`
- `data/visits.json`
