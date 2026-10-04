# NOVA TECH API

A responsive React + Vite API explorer with 20 configurable API modules, a shared request engine, per-browser-session metrics, response inspection, and cURL / JavaScript / Python request examples.

## Requirements
- Node.js 20+ and npm

## Run locally
```bash
npm install
npm run dev
```
Open the local URL printed by Vite. Build with `npm run build`, preview with `npm run preview`, and run tests with `npm test`.

## Important behavior
- Status is based on a real browser request. A 2xx response is **Online**, a returned non-2xx HTTP response is **Error**, and browser CORS/network failures or timeouts are **Unknown** when the server's availability cannot be established.
- Browser CORS policy can prevent JavaScript from reading a public endpoint even when the service is healthy. The dashboard reports this instead of claiming the server is down.
- Metrics are local to this browser session; they are not global traffic statistics. No login, database, hidden tracking, or background polling is used.
- Temp Email API is configured to the supplied `https://tempemailapi-woad.vercel.app/api` base. The module offers `/api`, `/api/metadata`, `/api/health`, and a manually triggered POST `/api/refresh`. These are tested at runtime; the app does not assume inbox creation or message retrieval is supported.
- Several public providers require query parameters for meaningful responses. Some services may add API keys, usage restrictions, or change their public endpoints. Edit the endpoint field and consult each provider's official docs before production use.
- A browser-only app cannot safely keep private API keys. If a provider requires a secret, use a server-side backend with environment variables. Do not put private credentials in `VITE_*` variables or commit them.

## Deploy
Build using `npm run build` and publish the `dist/` directory to any static host (GitHub Pages, Netlify, or Cloudflare Pages). Configure SPA fallback to `index.html` for direct navigation to nested routes. For GitHub Pages, set the Vite `base` option to the repository path if deploying beneath `/<repo>/`.

## Security notes
The dashboard restricts request URLs to HTTP(S), uses `AbortController` timeouts, renders response text as text/JSON rather than HTML, and does not provide an open proxy. Do not add a server proxy without strict hostname/IP allowlists, DNS-rebinding protection, redirect validation, request-size limits, and rate limiting; otherwise it can create an SSRF vulnerability.

## Add an API module
1. Add a record to `src/apis/registry.js` with a unique `id`, category, description, docs URL, and safe default endpoint.
2. Add a module-specific Markdown file under `src/apis/docs/`.
3. The shared route `/apis/:apiId` automatically uses the record and shared API client, stats, response viewers, and code generator.
4. Add tests for custom endpoint/query behavior and document any key/rate-limit/CORS requirements.

## Endpoint notes
All listed URLs are defaults, not claims of current availability. Use the in-app test for a live result. URL metadata and temporary email endpoints can be sensitive; only submit URLs and data you are authorized to use. QR Code endpoint returns an image rather than JSON, which the response inspector identifies by content type.
