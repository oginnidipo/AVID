# The AVID Foundation — website

> Where every classroom has a library behind it.

The website for The AVID Foundation, a Canadian non-profit refurbishing,
restocking and sustaining libraries in under-resourced Nigerian schools,
beginning in Lagos.

**If you are from AVID and want to run the site, start with
[docs/HANDOVER.md](docs/HANDOVER.md).** It covers editing content, connecting the
forms and donations, and the pre-launch checklist. This file is the developer
orientation.

---

## Quick start

```bash
npm install
npm run dev
```

Then open <http://localhost:4321>.

| Command | Does |
|---|---|
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the built output |
| `npm run check` | Type-check the project |
| `npm run brand` | Regenerate logos, icons and the social share card |

`npm run brand` regenerates every brand asset — both logo lockups, the stacked
lockup, the mark, the favicon, the Apple touch icon and the social share card —
from a single mark definition in `scripts/build-brand.mjs`. The favicon and share
card therefore cannot drift away from the logo.

---

## The one file that matters

[`src/data/site.ts`](src/data/site.ts) holds the domain, email addresses,
donation link, charitable registration number, impact goals and analytics
settings. Everything marked `TODO(AVID)` is awaiting real information.

**Every unset value has an honest fallback.** Donate buttons route to a page
explaining how to give directly; forms tell the applicant to email instead of
silently losing their answers; the footer states that registration is in progress
rather than implying tax receipts exist. The site is launchable today and
improves as values are filled in.

---

## Stack

- **[Astro](https://astro.build) 7** — static output, no server, no database
- **Tailwind CSS 4** — design system in [`src/styles/global.css`](src/styles/global.css)
- **Content Layer collections** with Zod schemas — [`src/content.config.ts`](src/content.config.ts)
- **[Sveltia CMS](https://github.com/sveltia/sveltia-cms)** at `/admin` for non-technical editing
- **Self-hosted fonts** — Fraunces (display) and Public Sans (body)
- **No client framework.** Turn JavaScript off and everything still works, forms included.

The home page is roughly **32KB gzipped** for HTML, CSS and JS combined. That is
a deliberate constraint, not a happy accident: many of the head teachers applying
for a library are on metered mobile data, which makes page weight an inclusion
issue rather than a technical preference.

---

## Layout

```
src/
  data/
    site.ts          ← domain, emails, donations, impact goals, analytics
    programme.ts     ← the five-part package, values, delivery model, giving tiers
    books.ts         ← the reading list of Nigerian and African titles
    nav.ts           ← navigation
  content/
    libraries/       ← the transparency wall (one file per school)
    stories/         ← news
    gallery/         ← photographs for the carousels
    team/            ← board, founder, volunteers
  components/        ← Hero, BookWall, ClassroomScene, LibraryCard, PhotoCarousel, forms…
  layouts/Base.astro
  lib/               ← sorting, counting, and the gallery consent gate
  pages/             ← one file per route
  scripts/forms.ts   ← shared form handling
  styles/global.css  ← the whole design system
scripts/
  build-brand.mjs    ← generates every logo, icon and share-card file
  build-logo.py      ← outlines the wordmark from Fraunces (build-time only)
docs/
  HANDOVER.md        ← start here if you are from AVID
  PHOTO-CONSENT.md   ← read before the first school visit
  examples/          ← library record templates (invented, not real records)
```

---

## Design system

Brand palette and typography are as supplied in the brief. Two things worth
knowing before you change colours:

**Ochre has a numbered ramp for a reason.** The two supplied ochres do not reach
WCAG AA for body-size text on Paper — `#C4762D` is 3.12:1 and `#A85F1E` is
4.32:1. So:

| Token | Use | Ratio |
|---|---|---|
| `ochre-500` `#C4762D` | Decorative, borders, icons, large display only | 3.12 on Paper |
| `ochre-600` `#A85F1E` | Large text on light (≥24px) | 4.32 on Paper |
| `ochre-700` `#9A5518` | **Body text, links and button surfaces on light** | 5.06 on Paper |
| `ochre-200` `#E8B87C` | **Body text on Deep Teal and Teal-mid** | 6.69 / 5.12 |

Every pairing in `global.css` carries its measured ratio in a comment. All 14
pages pass automated contrast checks at both 390px and 1440px with zero failures.

**`.on-dark` and `.on-light`.** Dark sections set their descendants' text
colours, which is what makes them effortless to build. A light card nested inside
a dark section needs `.on-light` to restore the light-surface colours — without
it, the card's heading inherits Paper on Paper and disappears entirely. This
happened once during the build; the boundary class is the fix.

### The library motifs

The brief asked for the visual language of libraries, so the site could belong to
no other kind of organisation:

- **Book spines** — the five-part package as five spines on a shelf, list bullets
  as spines standing on end, the active nav marker as a spine lying flat
- **Checkout cards** — each school on the transparency wall is a ruled manila
  card with a clipped corner, a red margin rule and a rubber stamp
- **Catalogue tags** — small typed labels, set in a system monospace so they cost
  no download
- **Shelf rules** — section dividers drawn as a board edge

### The logo

The supplied identity — an open book with a quill feather, and the stacked
**The / AVID / FOUNDATION** wordmark — is generated into `public/` as a primary
lockup, a reversed lockup for Deep Teal, a stacked lockup, and a mark on its own.
The wordmark is **outlined** from Fraunces rather than set as live text, so it
renders identically before webfonts load and in contexts with no fonts at all.
That also avoids shipping the 149KB Fraunces italic variable font for the single
word "The" — the only italic in the design.

The files are referenced with `<img>`, not inlined: the lockup is ~18KB of path
data, so as a file it is fetched and cached once for the whole site rather than
re-sent inside every page.

These were **redrawn as SVG from the supplied raster artwork**. If the original
vector files exist they should replace them —
[`src/components/Logo.astro`](src/components/Logo.astro) is the only place the
site refers to the logo.

### The signature moment

The hero carries the vision line into the design rather than restating it: a
classroom sits in front, a wall of shelves behind, and as you scroll the
classroom travels down and out of frame while the shelves hold and brighten. The
library is revealed behind the classroom.

It uses CSS scroll-driven animation (`animation-timeline: scroll()`), which runs
off the main thread and so stays smooth on a mid-range Android phone where a
JavaScript scroll handler would not. Where unsupported, or where the reader
prefers reduced motion, both layers render in a composed resting state — a
design, not a degradation.

Every spine on that wall carries a real title from
[`src/data/books.ts`](src/data/books.ts), which is also the reading list on Our
Work. It includes work in Yorùbá, Igbo and Hausa. The fonts ship with Google's
"vietnamese" subset specifically because Yorùbá's `ẹ` and `ọ` (U+1EB9, U+1ECD)
live in that unicode range and would otherwise render in a fallback face.

---

## Two guard rails, deliberately hard to bypass

**Tax receipts.** Canadian law permits official donation receipts only from a
registered charity. While `DONATE.taxReceiptsAvailable` is `false`, every page
touching giving states plainly that receipts cannot yet be issued. Do not flip
the flag before the CRA actually grants registration.

**Photograph consent.** The build **fails** if a library entry has photographs
while `photoConsentOnFile` is `false`, with an error naming the file. It is not
overridable from the CMS, because the failure being prevented — a rushed publish,
a forgotten check — is exactly what an honour-system checkbox does not prevent.
See [docs/PHOTO-CONSENT.md](docs/PHOTO-CONSENT.md).

---

## Honesty by construction

The transparency wall is empty at launch, and that is correct — AVID has not
refurbished a library yet. The empty state is designed and says so.

The impact figures are **counted from the libraries collection**, not typed in by
hand, so the headline numbers and the named-school records cannot drift apart.
Goals and verified actuals are displayed as separate things, and the component
will not present a goal as an achievement. On day one it reads "0 of 5
libraries", which for a new organisation is more persuasive than a round number
nobody can check.

The example records in `docs/examples/` are invented and are kept out of
`src/content/libraries/` on purpose. Fabricated entries would destroy the exact
thing the wall exists to do.

---

## The photo carousel

CSS scroll-snap, not a carousel library. It works with JavaScript off (the strip
is a real scroll container, so swipe and trackpad scrolling are native), gets
native momentum scrolling on a phone, and costs about 1KB. It never autoplays —
photographs of children should be looked at, not flicked past on a timer, and an
unrequested moving element is a WCAG 2.2.2 failure past five seconds.

Two details worth keeping:

- **The gutter is `scroll-padding-inline-start` on the scroll container**, not
  padding on the track. Snap positions are measured against the scrollport's
  padding box, so with the gutter only on the track, mandatory snapping scrolls it
  away instantly and the strip can never return to a true zero.
- **`goTo` verifies that its scroll actually started.** Some engines cancel a
  programmatic smooth scroll on a `scroll-snap-type: mandatory` container; if
  nothing has moved after 200ms it completes the jump instantly. Without this the
  arrows silently do nothing on those browsers.

## Accessibility

Built to WCAG 2.1 AA and verified, not assumed:

- Zero contrast failures across every page at 390px and 1440px
- One `h1` per page, no skipped heading levels
- Visible focus rings everywhere, switching colour on dark surfaces
- Skip link; sticky-header offset applied to in-page anchors
- 44px minimum touch targets (checkbox rows are full-width labels)
- Form errors announced in an `aria-live` region with focus moved to the first
  problem field — a red border communicates nothing to a screen-reader user
- `prefers-reduced-motion` disables all animation wholesale
- No horizontal overflow at any width
- Forms, navigation and content work entirely without JavaScript
