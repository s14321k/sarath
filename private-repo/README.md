# Private Repo Contents

Move the `private-repo/` folder into a private repository. It contains backend code only.

## GCP Cloud Function

Location: `private-repo/gcp-function`

Deploy command:

```bash
gcloud functions deploy visit-ingest \
  --gen2 \
  --runtime=nodejs20 \
  --region=us-central1 \
  --source=. \
  --entry-point=ingest \
  --trigger-http \
  --allow-unauthenticated \
  --set-env-vars GH_OWNER=s14321k,GH_REPO=sarathpvt,GH_TOKEN=YOUR_TOKEN
```

Set your site endpoint in `js/visit-config.js`:

```js
window.VISIT_ENDPOINT = "https://YOUR_FUNCTION_URL";
```

## Private Data Repo (sarathpvt)

Copy `private-repo/visit-data-repo` into your private repo:

- `.github/workflows/append-visit.yml`
- `scripts/append-visit.py`
- `data/visits.json`

This repo will receive the visit entries.
