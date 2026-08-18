# Hawty Logistics Website

Placeholder one-page site for **Hawty Logistics, LLC**, built with
[Eleventy](https://www.11ty.dev/) and [Sveltia CMS](https://github.com/sveltia/sveltia-cms),
deployed to GitHub Pages via GitHub Actions.

## Local development

```bash
npm install
npm start
```

Starts the Eleventy dev server with live reload at `http://localhost:8080`.

For a one-off production build:

```bash
npm run build
```

Output goes to `_site/`.

## Editing content

Visit `/admin/` (e.g. `http://localhost:8080/admin/` locally, or
`https://<your-domain>/admin/` in production) to log in with GitHub and edit
the homepage content: hero text, about blurb, services list, contact section,
and the logo — all stored in `src/_data/site.json`.

Every save creates a commit to `develop`, which triggers the Cloudflare
Pages preview deploy automatically.

### First-time CMS setup

`admin/config.yml` already points at `bdreyn/hawty-logistics`. Sveltia CMS
authenticates directly against GitHub — no separate OAuth server needed for a
repo you own. Follow the prompts the first time you visit `/admin/`.

## Contact form → Formspree

The contact form has no server of its own — it posts to
[Formspree](https://formspree.io), a hosted form backend, which emails each
submission to us.

### Setup

1. Create a free account at [formspree.io](https://formspree.io) and add a
   new form.
2. Copy the form's endpoint URL (Settings → Integration → "Your form's
   endpoint").
3. Paste it into `CONTACT_FORM_ENDPOINT` in
   [`src/assets/js/contact-form.js`](src/assets/js/contact-form.js).
4. Push to `develop` so the updated endpoint goes live on the preview.
5. Submit the form once yourself — Formspree requires confirming the first
   submission's email address before it'll deliver future ones.

The form includes a hidden `_gotcha` field (off-canvas via CSS, not
`display:none`) — Formspree's own honeypot convention, silently dropping any
submission where it's filled in without emailing or counting against quota.

**Free tier:** 50 submissions/month. If that's not enough, or Formspree
otherwise doesn't work out, [`apps-script/Code.gs`](apps-script/Code.gs) is
kept as a ready-to-deploy fallback to Google Sheets — see the comment at
the top of that file for how to switch back.

## Deployment & custom domain

- Pushing to `main` runs [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml),
  which builds the site and publishes it via GitHub Pages.
- In the repo's **Settings → Pages**, set the source to **GitHub Actions**.
- No custom domain is configured yet. When one is chosen, add a `CNAME` file
  at the repo root with the domain, and point DNS at GitHub Pages per
  [GitHub's docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).

## Brand

- Primary: `#1b7895`
- Secondary: `#004369`
- Logo: `src/assets/img/hawty-logistics-logo-white.png` (real brand logo,
  transparent background, for use on dark backgrounds like the navbar).
  Manage/replace via the CMS.
