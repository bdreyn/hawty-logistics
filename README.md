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

Every save creates a commit to `main`, which triggers the GitHub Actions
deploy workflow automatically.

### First-time CMS setup

`admin/config.yml` already points at `bdreyn/hawty-logistics`. Sveltia CMS
authenticates directly against GitHub — no separate OAuth server needed for a
repo you own. Follow the prompts the first time you visit `/admin/`.

## Contact form → Google Sheets

The contact form has no server of its own — it posts to a **Google Apps
Script Web App** that appends each submission to a Google Sheet.

### Setup

1. Create a new Google Sheet with header row: `Timestamp | Name | Email | Phone | Message`.
2. Open **Extensions → Apps Script** and paste in the contents of
   [`apps-script/Code.gs`](apps-script/Code.gs).
3. **Deploy → New deployment**, type **Web app**, "Execute as" **Me**,
   "Who has access" **Anyone**, then deploy.
4. Copy the deployment's Web App URL into `CONTACT_FORM_ENDPOINT` in
   [`src/assets/js/contact-form.js`](src/assets/js/contact-form.js).
5. Push to `main` so the updated URL goes live.

**Known limitation:** the form submits with `mode: "no-cors"`, since Apps
Script Web Apps don't return browser-readable CORS responses to plain fetch
requests. The site shows a success message once the request completes,
without confirming the server-side result. If stronger delivery confirmation
is needed later, consider Formspree or a similar hosted form backend.

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
- Logo: `src/assets/img/logo.svg` (placeholder — replace with the real logo
  file, or upload one via the CMS).
