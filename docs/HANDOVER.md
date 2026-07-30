# Handover guide

Everything AVID needs to run this website without a developer.

Written for someone who is comfortable with a computer but is not a programmer.
Where a step genuinely needs technical help, it says so.

---

## Contents

1. [The five-minute version](#1-the-five-minute-version)
2. [Before launch: the checklist](#2-before-launch-the-checklist)
3. [Hosting and deployment](#3-hosting-and-deployment)
4. [Editing content](#4-editing-content)
5. [Connecting the forms](#5-connecting-the-forms)
6. [Connecting donations](#6-connecting-donations)
7. [Domain and email](#7-domain-and-email)
8. [Analytics](#8-analytics)
9. [Reading form submissions](#9-reading-form-submissions)
9b. [The logo and brand assets](#9b-the-logo-and-brand-assets)
10. [Adding photographs](#10-adding-photographs)
11. [When registration is granted](#11-when-charitable-registration-is-granted)
12. [Ownership and accounts](#12-ownership-and-accounts)
13. [How the site is built](#13-how-the-site-is-built-for-a-future-developer)

---

## 1. The five-minute version

The site is a **static website**: every page is pre-built into plain HTML, so
there is no server to maintain, nothing to patch, and nothing that can be
hacked through a login form. It loads in well under a second on a mobile
connection, which matters because many of the schools applying to you are on
metered mobile data.

**One file controls almost everything you will want to change:**
[`src/data/site.ts`](../src/data/site.ts). Your domain, email addresses,
donation link, charitable registration number and impact goals all live there,
each with a comment explaining it. Everything marked `TODO(AVID)` is waiting for
real information.

**Content** — libraries, news, team members — is edited at
`https://yourdomain.org/admin`, which gives you a form for each type. You can
also edit the files directly on GitHub if you prefer.

**When you save a change, the site rebuilds and republishes itself** within a
minute or two. You do not need to ask anyone.

---

## 2. Before launch: the checklist

Work through this in order. Nothing here needs a developer except where noted.

| # | Task | Where | Needs a developer? |
|---|---|---|---|
| 1 | Confirm the domain | `src/data/site.ts` → `SITE.url` | No |
| 2 | Set up branded email addresses | Your email provider | No |
| 3 | Put the real addresses in | `src/data/site.ts` → `SITE.email` | No |
| 4 | Create the three form endpoints | Formspree (see §5) | No |
| 5 | Paste the endpoints in | `src/data/site.ts` → `FORMS` | No |
| 6 | Choose a donation platform | See §6 | No |
| 7 | Paste the donation link in | `src/data/site.ts` → `DONATE.url` | No |
| 8 | Set your first-cohort goals | `src/data/site.ts` → `IMPACT.goals` | No |
| 9 | Add photographs to the galleries | `/admin` → Photos | No |
| 10 | Add board members as appointed | `/admin` → Board & Team | No |
| 11 | Decide on analytics | `src/data/site.ts` → `ANALYTICS` | No |
| 11b | Supply the original logo vector, if you have one | `public/logo-*.svg` | Yes — 10 minutes |
| 12 | Have a lawyer review Privacy and Terms | `src/pages/privacy.astro`, `terms.astro` | No |
| 13 | Point the domain at the host | Your registrar (see §7) | Yes — one-off |
| 14 | Set up the `/admin` login | See §4 | Yes — one-off |

**The site works with none of these done.** Every unset value has an honest
fallback rather than a broken link — donate buttons route to a page explaining
how to give directly, forms tell the applicant to email you instead of silently
losing their answers, and the footer says registration is in progress rather
than implying receipts. You can launch and fill these in as they arrive.

### Two things to be careful about

**Do not claim tax receipts before the CRA grants registration.** The site is
built to prevent this: while `DONATE.taxReceiptsAvailable` is `false`, every
page that mentions giving says you cannot yet issue receipts. Do not change
that flag until the registration is actually granted.

**Do not publish a photograph without written consent on file.** The build will
refuse — see §10.

---

## 3. Hosting and deployment

Any static host works. **Cloudflare Pages** is the recommendation: the free tier
is genuinely sufficient, it is fast in West Africa (which matters for your
applicants), and it includes SSL and a global CDN at no cost.

### Setting it up (one-off, ~15 minutes)

1. Put this project in a GitHub repository under an account **owned by AVID**,
   not by a contractor.
2. In Cloudflare, choose **Workers & Pages → Create → Pages → Connect to Git**
   and pick that repository.
3. Build settings:
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
   - **Node version:** add an environment variable `NODE_VERSION` = `22`
4. Deploy. You get a `something.pages.dev` URL immediately.
5. Add your real domain under **Custom domains**.

From then on, every saved change rebuilds and publishes automatically.

**Netlify** works identically and [`netlify.toml`](../netlify.toml) is already
configured. Security and caching headers are in
[`public/_headers`](../public/_headers) for Cloudflare and in `netlify.toml` for
Netlify.

### Why not Squarespace or Wix?

The brief asked for a recommendation. Those platforms are genuinely easier for
some tasks, but they ship 300KB–1MB of JavaScript before any of your content
appears. For a head teacher in Lagos on mobile data, that is the difference
between an application submitted and an application abandoned — an inclusion
issue, not a technical preference. This site's home page is about 32KB. You keep
the point-and-click editing (§4) without the weight.

---

## 4. Editing content

### The editor at `/admin`

Go to `https://yourdomain.org/admin`. You get a list of the four things you can
edit:

- **Libraries** — the transparency wall. One entry per school.
- **News** — library openings and updates.
- **Photos** — the sliding galleries on the home page and For Schools.
- **Board & Team** — directors, founder, key volunteers.

Each has a form with every field labelled and explained. Changes are saved as a
draft first, so you can review before publishing.

**To turn the login on** (one-off, needs a developer for about 20 minutes):

1. In [`public/admin/config.yml`](../public/admin/config.yml), change `repo` to
   AVID's GitHub repository.
2. Set up GitHub authentication. Two options:
   - **Simplest:** deploy the small `sveltia-cms-auth` Cloudflare Worker and
     point `base_url` at it. Instructions are in the Sveltia CMS documentation.
   - **Alternative:** use Netlify's OAuth if you host on Netlify.

**Until then, you can still edit everything** — go to the repository on
github.com, open any file under `src/content/`, and click the pencil icon. It is
less pleasant than the form but it works today and needs no setup.

### Editing text that is not in `/admin`

Page copy (headings, the mission statement, the case for action) lives in the
page files under `src/pages/`. They are readable — the text is plain English
between the tags — and GitHub's editor will show you exactly what you are
changing. If you are nervous, ask a developer for the first one; it is
straightforward after that.

Reusable copy is deliberately collected in one place:

| What | File |
|---|---|
| The five-part package, values, delivery steps, giving tiers | [`src/data/programme.ts`](../src/data/programme.ts) |
| The reading list of Nigerian and African titles | [`src/data/books.ts`](../src/data/books.ts) |
| Navigation menu | [`src/data/nav.ts`](../src/data/nav.ts) |
| Everything else configurable | [`src/data/site.ts`](../src/data/site.ts) |

### A build message that is not a problem

While the libraries and news sections are still empty, every build prints:

```
The collection "libraries" does not exist or is empty.
Please check your content config file for errors.
```

**Nothing is wrong.** It is Astro noting that a collection has no entries yet,
and its wording is more alarming than the situation. It disappears as soon as
you add your first library or news story. The line to check in deploy output is
the last one — `[build] Complete!`

### If you make a mistake

Every change is recorded in the repository's history and can be undone. Nothing
you do in `/admin` can permanently break the site: if a required field is
missing, the build fails with a plain-English message naming the file and the
field, and **the previous working version stays live**.

---

## 5. Connecting the forms

A web form cannot send email by itself — it has to post to a service that does.
There are three forms: the school application, the general enquiry, and the
partnership enquiry.

**Recommended: [Formspree](https://formspree.io).** The free tier covers 50
submissions a month, which is plenty at first. File uploads (the optional
photographs on the application form) need a paid plan — about US$10/month. If
that is not affordable yet, the form still works; applicants simply cannot
attach photographs, and the form says so.

For each of the three forms:

1. Create a new form in Formspree.
2. Set its destination to the matching AVID address:
   - School application → `applications@`
   - General enquiry → `info@`
   - Partnership → `partners@`
3. Copy the endpoint URL (it looks like `https://formspree.io/f/abcdwxyz`).
4. Paste it into the matching entry in `FORMS` in
   [`src/data/site.ts`](../src/data/site.ts).

**Spam protection** is already built in: each form has a hidden honeypot field
that bots fill and people never see. Formspree adds its own filtering on top. If
spam still gets through, enable reCAPTCHA in Formspree.

**Alternatives** that work the same way: Getform, Basin, or Netlify Forms if you
host on Netlify. All of them just need a URL in the same place.

**Test each form after connecting it.** Submit a real application to yourself and
confirm it arrives, including the attachment if you are on a paid plan.

---

## 6. Connecting donations

Every "give" button on the site reads from one place, so switching platforms
later is a one-line change.

Set `DONATE.url` in [`src/data/site.ts`](../src/data/site.ts) to your donation
page, and `DONATE.platformName` to the platform's name so donors can see where
their card details are going.

| Platform | When | Notes |
|---|---|---|
| **Zeffy** | Now, before registration | Genuinely 0% fees. Accepts CAD/USD. Cannot issue CRA receipts — which matches your current position. |
| **Stripe** | Now, if you want full control | ~2.9% + 30¢. Multi-currency. More setup. |
| **CanadaHelps** | Once registered | Handles CRA receipting for you. Registered charities only. |

**Multi-currency matters** — your supporters are in Canada, Nigeria, the UK and
the US. Check that whichever platform you choose accepts more than CAD.

Until `DONATE.url` is set, donate buttons go to `/get-involved#give`, which
explains how to arrange a gift by email. Nothing is ever a dead link.

---

## 7. Domain and email

**Domain.** Buy it in AVID's name. Point it at your host by adding the DNS
records Cloudflare or Netlify shows you — they give exact instructions. This is
a one-off job worth asking a developer to do.

Put the final domain in `SITE.url`. It is used for canonical URLs, the sitemap
and social share cards, so it must be exact: include `https://` and no trailing
slash.

**Branded email.** Set up at least these four:

| Address | Used for |
|---|---|
| `info@` | General enquiries |
| `applications@` | School applications |
| `partners@` | Partnership and grant enquiries |
| `donate@` | Donation questions |

Google Workspace for Nonprofits is free once you have charitable status. Before
that, Zoho Mail has a free tier for a custom domain. Then put the real addresses
into `SITE.email`.

---

## 8. Analytics

The brief asked for Google Analytics **or a privacy-friendly equivalent**. The
recommendation is firmly the latter.

**Plausible** (about US$9/month) sets no cookies, collects no personal data, and
weighs under 1KB. Because it sets no cookies, **you do not need a cookie
banner** — which is one less thing between a visitor and your content, and one
less thing to get wrong legally. Set `ANALYTICS.plausibleDomain` to your domain.

**Google Analytics** is free but sets cookies, so consent is required. If you set
`ANALYTICS.googleAnalyticsId`, a consent notice appears automatically and **GA
does not load at all until the visitor accepts**. That is implemented properly —
declining genuinely means nothing is set.

**Leave both empty** and there is no tracking and no banner. Perfectly
reasonable at launch.

---

## 9. Reading form submissions

Every submission arrives as an email at the address you configured. The email
lists each answer with its real question, so an application reads:

```
School name: St Mary's Primary School
School address: 12 Bode Thomas Street, Surulere, Lagos
School type: Public
Approximate enrolment: 412
...
```

**Do better than an inbox.** An email folder is the minimum; a spreadsheet is
much better once applications start arriving, because you will want to sort and
compare them. Formspree can push every submission to a Google Sheet via
Zapier/Make, or you can export to CSV from its dashboard.

**Keep this in mind:** applications contain personal information about named
individuals at named schools. The privacy policy commits you to storing them
securely, not sharing them beyond what delivery requires, and deleting
unsuccessful applications within 24 months. That is a real commitment. Decide now
who has access to the inbox, and write down when you will do the deletion pass.

---

## 9b. The logo and brand assets

The supplied logo — the open book with a quill feather, and the stacked
**The / AVID / FOUNDATION** wordmark — is built into SVG files in `public/`:

| File | Use |
|---|---|
| `logo-avid.svg` | Primary lockup. Teal book, ochre feather. For Paper and Cream backgrounds — this is what the site header uses. |
| `logo-avid-reversed.svg` | Reversed lockup. Paper and sage book. For Deep Teal — the footer uses this. |
| `logo-stacked.svg` | Mark above the wordmark. For square and narrow spaces: social avatars, print, a stamp on a document. |
| `logo-mark.svg` / `logo-mark-reversed.svg` | The book alone, no words. For very small or very tight placements. |
| `favicon.svg`, `favicon-32.png`, `apple-touch-icon.png` | Browser tab and phone home screen. |
| `og-default.png` | The picture that appears when the site is shared on WhatsApp, LinkedIn or X. |

You can attach any of these to an email or drop them into a document as they
are. They are vector files, so they stay sharp at any size.

**A note on how they were made, and what to do if you have the originals.**
These were redrawn as SVG to match the artwork you supplied, working from the
image files. The proportions, colours and typography follow it closely, but a
redraw is never bit-identical to the designer's original. **If you have the
original vector files — `.svg`, `.ai`, `.eps` or `.pdf` — send them to a
developer and they should be used instead.** It is a ten-minute job: the whole
site refers to the logo through one component
([`src/components/Logo.astro`](../src/components/Logo.astro)), so swapping the
files is all that is needed.

The wordmark is *outlined* — the letters are shapes, not live text. That is
deliberate: it means the logo looks identical everywhere, including before the
website's fonts have loaded and in places that have no fonts at all.

**Regenerating them** (only needed if the logo itself changes):

```bash
npm run brand
```

That rebuilds every file in the table above from one definition, so the favicon
and the share card can never drift away from the logo. If the *wordmark* changes
(not just colours or spacing), the outlines have to be re-extracted first, which
needs Python and `fonttools`:

```bash
python3 -m venv venv && ./venv/bin/pip install "fonttools[woff]" && ./venv/bin/python scripts/build-logo.py
```

This is a build-time tool only. Nothing on the live site depends on it, and you
will probably never need to run it.

## 10. Adding photographs

### The sliding galleries

There are two photo galleries — one on the home page, one on For Schools. Add
photographs at **`/admin` → Photos**. For each one you set the description, an
optional caption, which gallery it appears in, and the order.

They are worth filling as soon as you have real photographs: they are the
quickest way to make the site feel alive rather than argued. Landscape shots work
best (they are cropped to 4:3), and about five to eight per gallery is plenty —
more than that and nobody reaches the end.

The gallery does not auto-advance, on purpose. A reader scrolls or swipes it
themselves, or uses the arrows. Photographs of children deserve to be looked at
rather than flicked past on a timer, and a moving element nobody asked for is
also an accessibility problem.

A gallery with no photographs in it simply does not appear — the page closes up
around it rather than showing an empty frame.

### Photographs elsewhere

Drop images into the `/admin` form for a library, news story or person, or place
them in `src/assets/uploads/` directly. The site resizes each one, converts it to
modern formats, and serves the right size for each screen — so **upload the
full-resolution original**. Do not pre-compress; you will only make it worse.

Always write the description field (the "alt text"). It is what a blind reader
hears and what someone on a failed connection sees.

### The consent gate — read this before your first shoot

You will photograph schools and, inevitably, children. The site **will refuse to
publish** a library entry *or a gallery photograph* unless `photoConsentOnFile`
is ticked. If you try, the build stops with an error naming the file, and the
previous version stays live.

This is deliberate. Written consent is not a formality, and "we meant to check"
is not a control. See [PHOTO-CONSENT.md](PHOTO-CONSENT.md) for what to collect
and a consent form you can adapt — **set this up before the first visit**, not
after, because retrospective consent is very hard to obtain.

---

## 11. When charitable registration is granted

Four changes, all in [`src/data/site.ts`](../src/data/site.ts):

1. Set `SITE.charitableRegistrationNumber` to the number. It then appears in the
   footer, in the structured data search engines read, and on Get Involved.
2. Set `DONATE.taxReceiptsAvailable` to `true`. The wording across the site
   switches from "we cannot yet issue receipts" to describing your receipting.
3. Consider moving to CanadaHelps and updating `DONATE.url`.
4. Apply for Google Workspace for Nonprofits and the Google Ad Grant.

Read the new wording on `/get-involved` and `/terms` afterwards and make sure it
matches what you actually do. Note that gifts made **before** registration
cannot be receipted retroactively — the Terms page says so, and that is correct.

---

## 12. Ownership and accounts

Every account must be in AVID's name, with an AVID address, and with at least
two directors able to get in. A site nobody can log into is a site you have lost.

| Account | Register in AVID's name | Who has access |
|---|---|---|
| Domain registrar | ✅ | |
| GitHub (the code) | ✅ | |
| Cloudflare or Netlify (hosting) | ✅ | |
| Formspree (forms) | ✅ | |
| Donation platform | ✅ | |
| Email provider | ✅ | |
| Analytics | ✅ | |

Fill in the right-hand column and keep it with your governance records. Use a
shared password manager, not a spreadsheet of passwords. Turn on two-factor
authentication on the domain registrar and GitHub at minimum — losing the domain
is the one mistake that is genuinely hard to recover from.

---

## 13. How the site is built (for a future developer)

- **[Astro](https://astro.build) 7**, static output. No server, no database.
- **Tailwind CSS 4**, with the design system in
  [`src/styles/global.css`](../src/styles/global.css). Brand tokens are at the
  top; every text colour pairing has its measured contrast ratio in a comment.
- **Content Layer collections** in
  [`src/content.config.ts`](../src/content.config.ts) with Zod schemas, so bad
  content fails the build with a useful message instead of publishing.
- **Sveltia CMS** at `/admin`, configured in
  [`public/admin/config.yml`](../public/admin/config.yml).
- **Self-hosted fonts** (Fraunces, Public Sans), subset by unicode-range. The
  "vietnamese" subset is included deliberately — Yorùbá's `ẹ` and `ọ` live in
  that range.
- **No client framework.** The only JavaScript is a scroll-reveal observer, the
  mobile menu, a count-up, and form handling — all progressive enhancement. Turn
  JavaScript off and the whole site still works, forms included.

```bash
npm install      # once
npm run dev      # local development at localhost:4321
npm run build    # production build into dist/
npm run preview  # serve the built output
npm run check    # type-check
```

`npm run brand` regenerates every logo file, the favicon, the touch icon and the
social share card from a single mark definition in
[`scripts/build-brand.mjs`](../scripts/build-brand.mjs).

### Design decisions worth not undoing

- **The signature hero.** The classroom-in-front / library-behind reveal uses CSS
  scroll-driven animation, which runs off the main thread and stays smooth on a
  mid-range Android phone. It degrades to a designed static composition where
  unsupported or where reduced motion is requested. Used once, on the home page,
  on purpose.
- **`.on-dark` and `.on-light`.** Dark sections set their descendants' text
  colours. A light card nested inside one needs `.on-light` to restore them, or
  its heading inherits Paper on Paper. This bit us once already.
- **Ochre has a numbered ramp.** The two brand ochres do not reach WCAG AA for
  body text on Paper (3.12:1 and 4.32:1). Use `ochre-700` for text and buttons on
  light, `ochre-200` on dark. The comments in `global.css` give every ratio.
- **Impact figures are counted from the libraries collection**, not typed in, so
  the headline numbers and the named-school records cannot drift apart.
- **The photo-consent build gate.** It covers library records *and* gallery
  photographs. Please do not remove it to ship faster.
- **The carousel is CSS scroll-snap, not a library.** It works with JavaScript
  off, gets native momentum scrolling on a phone, and costs about 1KB. The
  arrows carry a deliberate fallback: some engines cancel a programmatic smooth
  scroll on a `scroll-snap-type: mandatory` container, so `goTo` checks whether
  the scroll actually started and finishes it instantly if not. Removing that
  check risks arrows that silently do nothing on some browsers.
