# Benz Golfs website

Static site for Benz Golfs, the swing coaching business run by Jakob Benz.
Live at https://benzgolfs.netlify.app/ on the Netlify project `benzgolfs`.

No framework, no build step. Plain HTML, CSS and JavaScript.

## Pages

| Path       | What it is |
|------------|------------|
| `/`        | Home: offers, proof, about, FAQ |
| `/drive/`  | The Drive program page, with the waitlist |
| `/thanks/` | Thank-you page Stripe redirects to after payment (`?product=<slug>`) |
| `/intake/` | Swing video upload (Tally embed) |
| `/book/`   | Lesson booking (Calendly embed) |

Shared files:

- `config.js` is the single place to paste links and IDs. Every buy button, embed and contact link reads from it.
- `assets/site.js` wires the buttons and links from `config.js`.
- `assets/site.css` styles the three secondary pages. The home and Drive pages keep their own inline CSS, untouched from the original design.
- `netlify.toml` sets the publish directory and stops browsers caching `config.js`.

## Run locally

Any static server works. With Node installed:

```bash
npx -y serve@14.2.4 -l 8765 .
```

Then open http://localhost:8765/. Use a server rather than opening the files directly, because the pages load `/config.js` and `/assets/` by absolute path.

## Deploy

The repo deploys to the existing Netlify project `benzgolfs` (site ID `2fea6ce3-b9b7-4a12-b271-c229cccb24de`). Do not create a second site.

Option A, Netlify CLI from this folder:

```bash
npx -y netlify-cli login
```

```bash
npx -y netlify-cli link --id 2fea6ce3-b9b7-4a12-b271-c229cccb24de
```

```bash
npx -y netlify-cli deploy --prod --dir .
```

Option B, connect the repo in the Netlify dashboard (https://app.netlify.com/projects/benzgolfs) under Site configuration, Build and deploy, Link repository. Publish directory is `.`, build command is empty. After that every push to the main branch deploys.

The waitlist on `/drive/` uses Netlify Forms. Submissions appear in the dashboard under Forms, form name `drive-waitlist`. Turn on email notifications there if you want each signup in your inbox.

## Configuration

All values live in `config.js` and are empty by default. A buy button with an empty link renders disabled with the label "Coming soon".

| Key | Used by | Value to paste |
|-----|---------|----------------|
| `STRIPE_LINK_BREAKDOWN` | Swing Breakdown, $39 (home and Drive page) | Stripe Payment Link |
| `STRIPE_LINK_DEMO` | Breakdown + On-Course Demo, $89 | Stripe Payment Link |
| `STRIPE_LINK_ZOOM_30` | Live 1-on-1 Lesson, 30 min, $65 | Stripe Payment Link |
| `STRIPE_LINK_ZOOM_60` | Live 1-on-1 Lesson, 60 min, $110 | Stripe Payment Link |
| `STRIPE_LINK_DRIVE_STANDARD` | Drive Standard, $59/mo | Stripe Payment Link (subscription) |
| `STRIPE_LINK_DRIVE_PREMIUM` | Drive Premium, $99/mo | Stripe Payment Link (subscription) |
| `DRIVE_OPEN` | Both Drive membership buttons | `true` when the program opens. Until then the buttons stay disabled even if the links are filled in. |
| `TALLY_INTAKE_FORM_ID` | `/intake/` | Tally form ID, the part after `tally.so/r/` |
| `TALLY_WAITLIST_FORM_ID` | Waitlist on `/drive/` | Optional. Leave empty to keep the built-in Netlify Forms waitlist. |
| `CALENDLY_URL` | `/book/` | Full Calendly scheduling URL |
| `INSTAGRAM_URL` | Instagram links in every footer and the intake and booking fallbacks | Full profile URL |
| `CONTACT_EMAIL` | Contact links in every footer | Email address |

### Stripe setup

When you create each Payment Link in Stripe, set its confirmation behaviour to redirect to the thank-you page with the matching slug:

| Product | Success URL |
|---------|-------------|
| Swing Breakdown | `https://benzgolfs.netlify.app/thanks/?product=breakdown` |
| Breakdown + On-Course Demo | `https://benzgolfs.netlify.app/thanks/?product=demo` |
| Lesson, 30 min | `https://benzgolfs.netlify.app/thanks/?product=zoom30` |
| Lesson, 60 min | `https://benzgolfs.netlify.app/thanks/?product=zoom60` |
| Drive Standard | `https://benzgolfs.netlify.app/thanks/?product=standard` |
| Drive Premium | `https://benzgolfs.netlify.app/thanks/?product=premium` |

The thank-you page sends video products to `/intake/?product=<slug>` and lessons to `/book/?product=<slug>`.

### Tally setup

The intake form should collect: name, email, handicap, what they are struggling with, product bought, two video uploads, and a content-permission checkbox. Add a hidden field named `product`; the intake page passes the product slug into it from the URL.

## Placeholders

Each placeholder is a single edit point marked with an `<!-- EDIT: ... -->` comment in `index.html`.

| Placeholder | Where |
|-------------|-------|
| Hero photo or looping clip | `index.html`, comment `EDIT: HERO MEDIA` |
| Sample breakdown video (unlisted YouTube) | `index.html`, comment `EDIT: SAMPLE BREAKDOWN VIDEO` |
| Testimonial 1, 2, 3 | `index.html`, comments `EDIT: TESTIMONIAL 1` to `3` |
| Photo of Jakob on the course | `index.html`, comment `EDIT: COURSE PHOTO` |
| Follower count `[XX]K` | `index.html`, comment `EDIT: FOLLOWER COUNT` |
| Playing handicap `[+X]` | `index.html`, comment `EDIT: HANDICAP` |

## Checklist: what is still yours to fill

Config values in `config.js`:

- [ ] `STRIPE_LINK_BREAKDOWN`
- [ ] `STRIPE_LINK_DEMO`
- [ ] `STRIPE_LINK_ZOOM_30`
- [ ] `STRIPE_LINK_ZOOM_60`
- [ ] `STRIPE_LINK_DRIVE_STANDARD`
- [ ] `STRIPE_LINK_DRIVE_PREMIUM`
- [ ] `DRIVE_OPEN` set to `true` when the program opens
- [ ] `TALLY_INTAKE_FORM_ID`
- [ ] `TALLY_WAITLIST_FORM_ID` (optional)
- [ ] `CALENDLY_URL`
- [ ] `INSTAGRAM_URL`
- [ ] `CONTACT_EMAIL`

Stripe dashboard:

- [ ] Success URL set on all six Payment Links (table above)

Placeholders in `index.html`:

- [ ] Hero photo or looping clip
- [ ] Sample breakdown video
- [ ] Testimonial 1
- [ ] Testimonial 2
- [ ] Testimonial 3 (text or DM screenshot)
- [ ] Photo of Jakob on the course
- [ ] Follower count
- [ ] Playing handicap

Netlify dashboard:

- [ ] Link this repo to the `benzgolfs` project (or deploy with the CLI)
- [ ] Turn on form notifications for `drive-waitlist` if you want signups emailed to you
