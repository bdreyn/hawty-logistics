# Hawty Logistics Website

This is the **`main`** branch — a minimal "coming soon" placeholder page for
**Hawty Logistics, LLC**, built with [Eleventy](https://www.11ty.dev/) and
deployed to GitHub Pages via GitHub Actions.

The full site (nav, sections, Sveltia CMS) lives on the `develop` branch and
is not part of this branch by design — `main` is kept intentionally minimal
since it deploys live. It does include the real logo and a working contact
form (same Formspree endpoint as `develop`'s), so visitors have a way to
reach out before the full site launches.

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

This branch has no CMS. To change the company name, tagline, logo, or
contact info shown on the coming-soon page, edit `src/_data/site.json`
directly and push.

## Contact form → Formspree

Same setup as `develop`'s — see that branch's README for details. This
branch's `CONTACT_FORM_ENDPOINT` in
[`src/assets/js/contact-form.js`](src/assets/js/contact-form.js) currently
points at the same Formspree form as `develop`, so keep both in sync if the
endpoint ever changes.

## Deployment & custom domain

- Pushing to `main` runs [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml),
  which builds the site and publishes it via GitHub Pages.
- In the repo's **Settings → Pages**, set the source to **GitHub Actions**.
- No custom domain is configured yet. When one is chosen, add a `CNAME` file
  at the repo root with the domain, and point DNS at GitHub Pages per
  [GitHub's docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).

## Launching the full site

When the full site (on `develop`) is ready, merge `develop` into `main` to
replace this coming-soon page with the live site. See `CLAUDE.md` for the
current status of that plan.

## Brand

- Primary: `#1b7895`
- Secondary: `#004369`
- Logo: `src/assets/img/hawty-logistics-logo-white.png` (real brand logo,
  transparent background, for the dark coming-soon background).
