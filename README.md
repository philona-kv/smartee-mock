# Smartee Mock Server

Local stand-in for the Smartee platform APIs used by `zenyum_filehandling`. Use this when Smartee has no test environment.

## Quick start

```bash
cd smartee-mock
npm install
npm run dev
```

Server listens on **http://localhost:4090** (override with `PORT`).

## Wire into filehandling

Set in your env / `setenv.sh`:

```bash
export SMARTEE_BASE_URL=http://localhost:4090
```

`SMARTEE_MERCHANT_ID`, `SMARTEE_USER_ID`, and `SMARTEE_SECRET_KEY` can stay as dummy values — this mock accepts auth headers (`sign`, `user`, `timestamp`, `token`) but does not validate them.

## Contract

All endpoints are **POST** `{base}/{module}/{method}` with JSON body:

```json
{ "body": { ...payload } }
```

Success response shape:

```json
{ "status": 1, "message": "Success!", "body": { ... } }
```

## Endpoints

| Method | Path | Behavior |
|--------|------|----------|
| POST | `/case/createCase` | Creates case in memory; returns `CaseMainID`, `CaseSN` |
| POST | `/case/createCaseOnlyDesign` | Same as `createCase` (EON path) |
| POST | `/case/getCaseList` | Always returns fixture (ignores `KeyWords` / filters) |
| POST | `/case/getCaseFlow` | Always returns prod-shaped fixture |
| POST | `/case/modifyCasePhoto` | Success (`body: null`) |
| POST | `/case/reUploadLocalData` | Success (`body: null`) |
| POST | `/case/updateProductSeries` | Success (`body: null`) |
| POST | `/case/getCaseDesignFeedBack` | Prod-shaped fixture |
| POST | `/design/addAdjustTreatPlan` | Returns generated `AdjustTreatPlanID` |
| POST | `/design/addCaseDesignFeedBack` | Success (`body: null`) |
| POST | `/design/getTeethData` | Prod-shaped tooth/IPR fixture |
| POST | `/design/confirmDesign` | Success (`body: null`) |
| POST | `/public/getAreaHospital` | Hospital / receive-address list |
| POST | `/public/getProductSeriesList` | Full product series list |

Also: `GET /health` → `{ ok: true }`.

**Not implemented:** `getDesignExplain` (unused by filehandling).

## Fixtures

Edit JSON under [`src/fixtures/`](src/fixtures/) to change mock responses. Request fields (`KeyWords`, `CaseMainID`, etc.) are logged but **not used for filtering** — every read API returns its fixed fixture. In-memory IDs from `createCase` are only used in that API’s response and are lost on restart.

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Run with hot reload (`tsx watch`) |
| `npm run build` | Compile to `dist/` |
| `npm start` | Run compiled `dist/index.js` |
