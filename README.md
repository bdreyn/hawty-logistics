# Hawty Logistics Website

This is the **`main`** branch — a minimal "coming soon" placeholder page for
**Hawty Logistics, LLC**, built with [Eleventy](https://www.11ty.dev/) and
deployed to GitHub Pages via GitHub Actions.

The full site (nav, sections, contact form, Sveltia CMS) lives on the
`develop` branch and is not part of this branch by design — `main` is kept
intentionally minimal since it deploys live.

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
- Logo: `src/assets/img/logo.svg` (placeholder — replace with the real logo
  file before launch).
