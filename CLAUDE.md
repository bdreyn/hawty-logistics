# Hawty Logistics, LLC — Project Status

This is the **`main`** branch: a minimal "coming soon" static placeholder
page, deployed live via GitHub Pages. Stack: Eleventy (plain HTML/CSS,
no CMS on this branch).

The full site — nav, sections, contact form, Sveltia CMS (`/admin/`) — lives
on the **`develop`** branch and is deliberately not present here.

Repo remote: `https://github.com/bdreyn/hawty-logistics.git`

## Status as of 2026-08-18

- Branch split complete: `develop` created from the full scaffold
  (commit `d7f149f`), pushed to `origin/develop`. Sveltia CMS's
  `backend.branch` on `develop` points at `develop`, not `main`.
- `main` stripped down to a minimal coming-soon page (logo, tagline,
  "coming soon" notice, contact line) with no CMS, no contact form, no
  Sveltia admin.
- `.github/workflows/deploy.yml` on `main` still builds via
  `npm run build` (Eleventy) and deploys to GitHub Pages on every push to
  `main`.
- **Not yet pushed** — this branch-split work is local only, pending
  explicit go-ahead before it overwrites what's currently live on
  `origin/main`.

## Next steps (agreed plan)

1. ~~Split into two branches~~ — done locally, pending push.
2. Add a Cloudflare Pages preview deploy on `develop`, mirroring the pattern
   proven working in the `redline-repairs` project: GitHub Actions +
   `cloudflare/wrangler-action@v3`, repo secrets `CLOUDFLARE_API_TOKEN` +
   `CLOUDFLARE_ACCOUNT_ID`. (That project hit a bug where the secret was
   misspelled `CLOUDFARE_API_TOKEN` — silently resolved empty rather than
   erroring. Double-check secret names match exactly between `gh secret
   list` and the workflow YAML when wiring this up here.) **Not started.**
3. When ready to launch, merge `develop → main` to replace "coming soon"
   with the full live site.

## Still open / blocking full functionality (on `develop`)

- Contact form's endpoint in `src/assets/js/contact-form.js` is a
  placeholder — needs a real Google Sheet + deployed Apps Script
  (`apps-script/Code.gs`) Web App URL. That `Code.gs` is a plain reference
  version — it does **not** carry over the honeypot field or `sanitizeCell`
  Sheets-formula guard from the prior (superseded) scaffold; re-add those
  before launch.
- Real logo file present at `src/assets/img/logo.svg` (same file used on
  `main`) but should be checked against the actual brand asset before
  launch.
- No custom domain chosen/wired yet — no `CNAME` file, and no `pathPrefix`
  set in `.eleventy.js` on either branch. If either branch deploys to the
  GitHub Pages project subpath (`bdreyn.github.io/hawty-logistics/`) before
  a custom domain is wired, root-relative asset/nav paths will 404 — hit
  and fixed this exact issue once before with an Eleventy `pathPrefix` +
  `url` filter; re-apply if needed before launch.
