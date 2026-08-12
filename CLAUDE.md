# Hawty Logistics, LLC — Project Status

One-page placeholder marketing site. Stack: Eleventy (plain HTML/CSS/JS, no
Tailwind) + Sveltia CMS (`/admin/`) + GitHub Pages via GitHub Actions.
Contact form posts to a Google Apps Script Web App that appends rows to a
Google Sheet. Brand colors: primary `#1b7895`, secondary `#004369`.

Repo remote: `https://github.com/bdreyn/hawty-logistics.git`

## Status as of 2026-08-06

- Full scaffold built and committed **locally** (nav w/ logo, hero, about,
  services, contact sections; `admin/config.yml` Sveltia CMS collection;
  `.github/workflows/deploy.yml`; `apps-script/Code.gs` reference).
- This replaced a pre-existing, more advanced version of the repo that was
  already on GitHub (Tailwind, quote/general-inquiry contact form with
  honeypot + Sheets-formula-injection protections, `pathPrefix` fix for the
  GitHub Pages project subpath). That history is still reachable in earlier
  commits on `origin/main` (through `0238c8e`); the local repo was
  fast-forwarded from origin before the replace commit (`47bf220`).
- **Not yet pushed to GitHub** — local commit only, pending explicit go-ahead.
- Local dev server (`npm start`) verified working at `http://localhost:8080/`.

## Next steps (agreed plan, not yet executed)

1. Split into two branches: `main` = minimal "coming soon" static page
   (deployed live to the real domain via GitHub Pages), `develop` = the full
   scaffold, with Sveltia CMS `backend.branch: develop` so CMS edits commit
   there.
2. Add a Cloudflare Pages preview deploy on `develop`, mirroring the pattern
   proven working in the `redline-repairs` project: GitHub Actions +
   `cloudflare/wrangler-action@v3`, repo secrets `CLOUDFLARE_API_TOKEN` +
   `CLOUDFLARE_ACCOUNT_ID`. (That project hit a bug where the secret was
   misspelled `CLOUDFARE_API_TOKEN` — silently resolved empty rather than
   erroring. Double-check secret names match exactly between `gh secret
   list` and the workflow YAML when wiring this up here.)
3. When ready to launch, merge `develop → main` to replace "coming soon"
   with the full live site.

## Still open / blocking full functionality

- Contact form's `CONTACT_FORM_ENDPOINT` in `src/assets/js/contact-form.js`
  is a placeholder (`"REPLACE_WITH_APPS_SCRIPT_WEB_APP_URL"`) — needs a real
  Google Sheet + deployed Apps Script (`apps-script/Code.gs`) Web App URL.
  Note this scaffold's `Code.gs` is a plain reference version — it does
  **not** carry over the honeypot field or `sanitizeCell` Sheets-formula
  guard that were added on the prior (now-superseded) scaffold; re-add those
  if/when this version goes live.
- Real logo file present at `src/assets/img/logo.svg` but should be checked
  against the actual brand asset before launch.
- No custom domain chosen/wired yet — no `CNAME` file, and no `pathPrefix`
  is currently set in `.eleventy.js`. If this deploys to the GitHub Pages
  project subpath (`bdreyn.github.io/hawty-logistics/`) before a custom
  domain is wired, root-relative asset/nav paths will 404 — the prior
  scaffold hit exactly this and fixed it with an Eleventy `pathPrefix` +
  `url` filter; apply the same fix here if needed before launch.
