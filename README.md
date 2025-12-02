
# Checkmarx Demo App

This repo demonstrates Checkmarx SAST scanning in GitHub Actions.

## Run locally
1. `npm install`
2. `npm start`
3. Browse `http://localhost:3000/search?q=test` etc.

## GitHub Actions / Checkmarx setup
You must add these repository secrets in **Settings → Secrets and variables → Actions**:

- `CXONE_TENANT` (optional; Checkmarx One tenant name if needed)
- `CXONE_CLIENT_ID`  — Checkmarx OAuth client ID (or CX_CLIENT_ID)
- `CXONE_CLIENT_SECRET` — OAuth client secret (or CX_CLIENT_SECRET)
- `CX_PROJECT_NAME` — optional (defaults to repository name)
- `FAIL_ON_SEVERITY` — optional (e.g. `high` to fail pipeline on high severity)

(See Checkmarx docs: create an OAuth client in Checkmarx One / or use an API key.)  
Docs: https://docs.checkmarx.com (Checkmarx One GitHub Actions / CLI). 
