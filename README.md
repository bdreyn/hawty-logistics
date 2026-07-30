# Hawty Logistics Website

Marketing site built with [Eleventy](https://www.11ty.dev/), [Tailwind CSS](https://tailwindcss.com/), and [Sveltia CMS](https://github.com/sveltia/sveltia-cms), deployed to GitHub Pages at `hawtylogistics.com`.

The homepage is a single page made of stacked **sections** (Hero, About, Services, Testimonials, Contact). Editors control which sections appear and in what order from the CMS — no code changes needed.

## Local development

```bash
npm install
npm start
```

This builds Tailwind CSS and starts the Eleventy dev server with live reload, usually at `http://localhost:8080`.

To do a one-off production build:

```bash
npm run build
```

Output goes to `_site/`.

## Editing content

Visit `/admin/` (e.g. `http://localhost:8080/admin/` locally, or `https://hawtylogistics.com/admin/` in production) to log in with GitHub and edit:

- **Homepage** — the ordered list of sections. Drag to reorder, toggle **Visible** to show/hide a section, edit each section's heading/body.
- **Site Settings** — company name, tagline, phone, email, address, social links, logo.
- **Services** — the cards shown in the Services section.
- **Testimonials** — the quotes shown in the Testimonials section.

Every save creates a commit to the `main` branch, which triggers the GitHub Actions deploy workflow automatically.

### First-time CMS setup

1. In `src/admin/config.yml`, replace `YOUR_GITHUB_USERNAME/hawty-logistics` with the actual repo path.
2. Sveltia CMS authenticates directly against GitHub — no separate OAuth server needed for a repo you own. Follow the prompts the first time you visit `/admin/`.

## Quote request form

The Contact section's form has no server of its own — it posts to a **Google Apps Script Web App** that appends each submission to a Google Sheet and emails a notification.

### Setup

1. Create a new Google Sheet to store submissions.
2. Open **Extensions → Apps Script** and replace the default code with the contents of [`apps-script/Code.gs`](apps-script/Code.gs).
3. Update the `NOTIFY_EMAIL` constant in that script to the address that should receive notifications.
4. Click **Deploy → New deployment**, select type **Web app**, set "Execute as" to **Me** and "Who has access" to **Anyone**, then deploy.
5. Copy the deployment's Web App URL and paste it into `QUOTE_FORM_ENDPOINT` in [`src/assets/js/quote-form.js`](src/assets/js/quote-form.js).
6. Re-deploy the site (push to `main`) so the updated URL goes live.

**Known limitation:** the form submits with `mode: "no-cors"`, since Apps Script Web Apps don't return browser-readable CORS responses to plain fetch requests. This means the site shows a success message once the request completes, without being able to confirm the server-side result — if you need stronger delivery confirmation later, consider swapping in Formspree or a similar hosted form backend.

## Deployment & custom domain

- Pushing to `main` runs [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which builds the site and publishes it via GitHub Pages.
- In the repo's **Settings → Pages**, set the source to **GitHub Actions**.
- The [`CNAME`](CNAME) file points the site at `hawtylogistics.com`. At your domain registrar, add:
  - An `A` record (or `ALIAS`/`ANAME` if supported) for the apex domain pointing to GitHub Pages' IPs (see [GitHub's documentation](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site) for current IPs), **or**
  - A `CNAME` record for a `www` subdomain pointing to `<username>.github.io`.
- DNS changes can take up to 24 hours to propagate.
