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
10b. [Being found in search](#10b-being-found-in-search)
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
| 1 | ~~Confirm the domain~~ | Done — live on theavidfoundation.org | ✅ |
| 2 | Set up the remaining addresses | Dynadot forwarding (see §7) | No |
| 3 | Put the real addresses in | `src/data/site.ts` → `SITE.email` | No |
| 4 | ~~Create the three form endpoints~~ | Done — Formspree | ✅ |
| 5 | ~~Paste the endpoints in~~ | Done — all three tested live | ✅ |
| 6 | Choose a donation platform | See §6 | No |
| 7 | Paste the donation link in | `src/data/site.ts` → `DONATE.url` | No |
| 8 | Set your first-cohort goals | `src/data/site.ts` → `IMPACT.goals` | No |
| 9 | Add photographs to the galleries | `/admin` → Photos | No |
| 10 | Add board members as appointed | `/admin` → Board & Team | No |
| 11 | Decide on analytics | `src/data/site.ts` → `ANALYTICS` | No |
| 11c | Verify in Google Search Console, submit the sitemap | See §10b | No |
| 11b | Supply the original logo vector, if you have one | `public/logo-*.svg` | Yes — 10 minutes |
| 12 | Have a lawyer review Privacy and Terms | `src/pages/privacy.astro`, `terms.astro` | No |
| 13 | ~~Point the domain at GitHub Pages~~ | Done — HTTPS enforced | ✅ |
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

The site is hosted on **GitHub Pages**, and the domain, DNS and email all stay
at **Dynadot**. That is deliberately only two accounts, both of which AVID
already has — no extra vendor, no extra bill, nothing new to keep logged into.

**It is already set up.** Every push to `main` rebuilds and republishes the site
automatically, which means saving a change in `/admin` publishes it. The workflow
is [`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml); you can
watch a deploy, or re-run one by hand, from the repository's **Actions** tab.

### Pointing the domain at it

In Dynadot, go to **My Domains → theavidfoundation.org → DNS Settings** and set:

| Type | Host | Value |
|---|---|---|
| A | *(blank / @)* | `185.199.108.153` |
| A | *(blank / @)* | `185.199.109.153` |
| A | *(blank / @)* | `185.199.110.153` |
| A | *(blank / @)* | `185.199.111.153` |
| CNAME | `www` | `oginnidipo.github.io` |

Four A records, not one — GitHub serves from four addresses for redundancy.

Leave the nameservers as Dynadot's own (`ns1.dyna-ns.net`, `ns2.dyna-ns.net`).
They must stay there for Dynadot email to work.

Once DNS has propagated (usually under an hour), go to the repository's
**Settings → Pages** and tick **Enforce HTTPS**. The certificate is free and
issues automatically, but the tickbox only becomes available after the domain
resolves.

### What GitHub Pages does not do

It does not support custom HTTP headers, so the rules in
[`public/_headers`](../public/_headers) and `netlify.toml` are inert. In
practice this costs a little cache tuning and a clickjacking header. It matters
little for a site with no login and no user data held in the browser, and the
important part — HTTPS with an automatic certificate — is included. Those files
are kept so the rules apply immediately if hosting ever moves.

### If you ever want to move

Nothing here locks you in: it is a folder of static files. Cloudflare Pages and
Netlify are both configured in the repository already
([`netlify.toml`](../netlify.toml), [`public/_headers`](../public/_headers)) and
would take about fifteen minutes to switch to, mainly waiting for DNS.

### Why not the Dynadot website builder?

Dynadot's only website product is a drag-and-drop builder using their own
templates. There is no way to upload a build folder or connect a repository, so
this site cannot run there. Their domain, DNS and email are used, which is the
part they do well.

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

**The simplest way to edit, needing no setup at all:** go to
[github.com/oginnidipo/AVID](https://github.com/oginnidipo/AVID), open any file
under `src/content/`, and click the pencil icon. Save, and the site rebuilds and
republishes itself. This works today, for every kind of content, and adds
nothing to maintain.

**The `/admin` form editor is nicer but needs a sign-in step.** Signing in to
GitHub from a browser-based editor requires a small OAuth helper somewhere,
which means one more thing to run. Given AVID's preference for keeping the
number of services down, it is reasonable to skip it and edit on github.com —
the repository is already configured, so it can be switched on later at any
time without touching the site.

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

**Already connected.** The three endpoints are live in
[`src/data/site.ts`](../src/data/site.ts) and each has been tested with a real
submission. All three deliver to `applications@`.

There are three test entries in that inbox and in the Formspree dashboard,
subject lines beginning `TEST — please ignore`. Delete them once seen.

**Attachments are off.** Formspree's free tier has no file storage, so the
application form asks for photographs by email instead. If you move to a paid
plan, set `FORMS.fileUploadsEnabled` to `true` and the upload field returns.

**Watch the 50-a-month limit.** It covers all three forms together. Formspree
warns you at 50%, 75% and 90%. Past the cap the forms show the "email us
instead" message rather than failing silently — but that is a worse experience,
so if applications pick up, upgrade before you hit it.

**Formspree keeps only 30 days of history on the free plan.** It is a delivery
pipe, not your records. The emails sitting in `applications@` are the record —
do not delete them.

---

**Original setup notes, for reference: [Formspree](https://formspree.io).** The free tier covers 50
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

**Domain.** `theavidfoundation.org` is registered with Dynadot in AVID's name.
Point it at the site with the DNS records in §3.

`SITE.url` in [`src/data/site.ts`](../src/data/site.ts) must match it exactly —
`https://`, no trailing slash. It is used for canonical URLs, the sitemap and
social share cards.

**Email — also Dynadot, so there is no third account.**

Their **Pro Email** plan is about **C$41/year for up to 25 mailboxes**, which
covers everything below with room to grow. The free plan included with the
domain gives only one mailbox and caps at 25 emails a day, which is too tight
for an inbox that receives school applications.

Set up these four:

| Address | Used for |
|---|---|
| `info@` | General enquiries |
| `applications@` | School applications |
| `partners@` | Partnership and grant enquiries |
| `donate@` | Donation questions |

Then put them into `SITE.email`. They are already written into the site with
these names, so if you use exactly these, nothing needs changing.

**Where forwarding lives, and the trap in it.** Email forwarding is *not* under
the Email menu — that is Email Hosting, a different product. It is at
**My Domains → Manage Domains → tick the domain → Action → Email Settings**,
then choose **Forwarding Email** from the dropdown at the top.

⚠ **Switching that dropdown to Forwarding Email disconnects Dynadot Email
Hosting for the domain.** If you already have a mailbox there, you lose it as a
mailbox: the address keeps receiving, but it becomes a forward and can no longer
send. For an organisation writing to schools and funders, replying from a
personal address is a real cost.

So the two routes are:

| | Cost | Gets you | Costs you |
|---|---|---|---|
| **Pro Email** | ~C$41/yr | All four as real mailboxes that send *and* receive | The fee |
| **Forwarding Email** | Free | Up to 10 addresses receiving | Your existing mailbox stops being a mailbox; nothing can send |

Pro Email is the recommendation: it is about a pound a week, and it keeps
`applications@` working while adding the rest.

**Later:** once charitable registration is granted, Google Workspace for
Nonprofits is free and you may prefer to move. That is a DNS change and a
mailbox migration, not a website change.

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

## 10b. Being found in search

The site is built for it: every page has a descriptive title and description,
structured data describing AVID as an organisation, breadcrumbs, a weighted
sitemap, clean URLs, and pages that load in a quarter of a second — which is
itself a ranking factor and the one most sites fail.

**But the technical part is the smaller half.** A brand-new domain has no
history and nobody linking to it. Google has nothing to go on beyond the pages
themselves. The three things below matter more than anything further we could do
in the code, and they are all yours rather than a developer's.

### 1. Verify the site in Google Search Console — do this first

Go to [search.google.com/search-console](https://search.google.com/search-console),
add `theavidfoundation.org`, choose the **HTML tag** method, and copy the long
`content` value from the tag it shows you. Paste that into `SEARCH.googleSiteVerification`
in [`src/data/site.ts`](../src/data/site.ts) and save. Once verified:

- **Submit the sitemap**: `https://theavidfoundation.org/sitemap-index.xml`
- Use **URL Inspection → Request indexing** on the home page and For Schools, so
  you are not waiting on Google to find you
- Come back monthly. It shows the actual queries people used, which tells you
  what to write next far better than guesswork

[Bing Webmaster Tools](https://www.bing.com/webmasters) is the same job in five
minutes and feeds ChatGPT and Copilot search as well.

### 2. Get listed and linked

Links from established sites are still the strongest signal there is, and a
charity has legitimate places to get them:

- **CanadaHelps and Charity Village** once registration is granted
- **Nigerian and diaspora education directories**
- **Partner schools and delivery partners** — ask them to link to you
- **LinkedIn, Instagram** — create the profiles, put the URL in the bio, then
  add those URLs to `SITE.social` so the structured data can connect them to the
  organisation. Search engines use that to confirm you are who you say you are
- **Local press** in Lagos and in the Canadian Nigerian community when the first
  library opens

One genuine mention in a news article is worth more than any amount of further
technical tuning.

### 3. Publish the work

The single biggest thing you can do is **write up each library on the
transparency wall, and post to News when something happens**. Every entry is a
new page, on a specific school, with specific details — exactly the kind of page
that gets found by long-tail searches, and the kind nobody else can write.

Search engines reward sites that keep changing. A site that has not been touched
in a year slides.

### What not to do

Do not buy links, do not pay an agency promising rankings, and do not stuff
keywords into the copy. Google penalises all three, and recovery is slow. The
honest version works better and is what the site is already set up for.

### Timeline, honestly

Expect a few weeks before pages are indexed at all, and several months before
you rank for anything competitive. Searches for "The AVID Foundation" should
work within weeks. Searches like "school library charity Nigeria" depend on
links and content, so they follow the work rather than lead it.

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
| GitHub (hosting, via Pages) | ✅ | |
| Formspree (forms) | ✅ | |
| Donation platform | ✅ | |
| Dynadot email | ✅ | |
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
