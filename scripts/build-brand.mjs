/**
 * Build every brand asset from one source of truth: the mark geometry in this
 * file, plus the outlined type from scripts/build-logo.py.
 *
 * Outputs into public/:
 *   logo-avid.svg           primary lockup, for light surfaces
 *   logo-avid-reversed.svg  reversed lockup, for Deep Teal
 *   logo-stacked.svg        mark above wordmark, for narrow and square spaces
 *   logo-mark.svg           mark only, primary
 *   logo-mark-reversed.svg  mark only, reversed
 *   favicon.svg             mark on a teal tile
 *   favicon-32.png          raster fallback
 *   apple-touch-icon.png    180x180 home-screen icon
 *   og-default.png          1200x630 social share card
 *
 * The mark is defined exactly once, here, so the favicon and share card can
 * never drift away from the logo.
 *
 * Logos are referenced as files rather than inlined: the lockup is ~18KB of
 * path data, so as a file it is fetched and cached once for the whole site
 * instead of being re-sent inside every page's HTML.
 *
 * Run: npm run brand
 */
import { readFileSync, statSync, writeFileSync } from "node:fs";
import sharp from "sharp";

const W = JSON.parse(readFileSync("scripts/logo-wordmark.json", "utf8"));

/* Brand colours, matching src/styles/global.css. */
const C = {
  teal: "#133B42",
  paper: "#F6F1E7",
  sage: "#A7BEAE",
  ochre: "#C4762D",
  ochreLight: "#D28843",
};

/* ── THE MARK ───────────────────────────────────────────────────────────────
   An open book — two pages splayed from a centre gutter — with a quill feather
   rising from behind the right page.

   Drawn on a 100-unit grid. The pages are the load-bearing part: their outer
   top corners sit slightly lower than the gutter, and the bottom edge lifts
   toward the outside, which is what makes the pair read as one book lying open
   rather than as two rectangles side by side.                               */
const PAGES = {
  /* Left page. Gutter edge on the right, at x≈47. */
  left: `M 47 38.5
         C 38 34.5 26 32 15.5 31.6
         C 13.4 31.5 12 32.9 12 35
         L 12 68.6
         C 12 70.6 13.4 72.1 15.4 72.2
         C 26 72.7 38 75.2 47 79.4
         Z`,
  /* Right page, the mirror. */
  right: `M 53 38.5
          C 62 34.5 74 32 84.5 31.6
          C 86.6 31.5 88 32.9 88 35
          L 88 68.6
          C 88 70.6 86.6 72.1 84.6 72.2
          C 74 72.7 62 75.2 53 79.4
          Z`,
  /* The gutter: a slim spine between the pages. Needed in the primary lockup,
     where both pages are the same colour and the split would otherwise vanish. */
  gutter: `M 46.6 37.4 L 53.4 37.4 L 53.4 80.2 L 46.6 80.2 Z`,
};

/* The feather: a leaf, pointed where it enters the gutter and swelling to a
   rounded shoulder at the top. Drawn in its own upright coordinate space and
   then rotated, so tilt, length and blade width are each a single number to
   adjust. It is painted before the pages, so it reads as rising from behind
   them — a quill tucked into the book.

   The blade is asymmetric on purpose: the left flank is the straighter shaft
   side, the right flank carries the curve. */
const FEATHER_TILT = 23; // degrees clockwise
const FEATHER_LEN = 43;
const FEATHER_WIDTH = 27;
/* Base sits just inside the right page's gutter edge (x=53), so the tapered
   tail is hidden behind that page rather than showing as an ochre sliver in the
   gutter — which is what happens in the reversed lockup, where no gutter strip
   is painted to cover it. */
const FEATHER_BASE = { x: 54, y: 53 };

const FEATHER = (() => {
  const L = FEATHER_LEN;
  const w = FEATHER_WIDTH;
  return `M 0 0
          C ${(-w * 0.16).toFixed(1)} ${(-L * 0.36).toFixed(1)} ${(-w * 0.46).toFixed(1)} ${(-L * 0.74).toFixed(1)} 0 ${-L}
          C ${(w * 0.6).toFixed(1)} ${(-L * 0.72).toFixed(1)} ${(w * 0.42).toFixed(1)} ${(-L * 0.28).toFixed(1)} 0 0
          Z`;
})();

const squash = (d) => d.trim().replace(/\s+/g, " ");

function markSvg({ pageA, pageB, feather, gutter }) {
  return `<g transform="translate(${FEATHER_BASE.x} ${FEATHER_BASE.y}) rotate(${FEATHER_TILT})"><path fill="${feather}" d="${squash(FEATHER)}"/></g>
    ${gutter ? `<path fill="${gutter}" d="${squash(PAGES.gutter)}"/>` : ""}
    <path fill="${pageA}" d="${squash(PAGES.left)}"/>
    <path fill="${pageB}" d="${squash(PAGES.right)}"/>`;
}

/* ── THE WORDMARK ──────────────────────────────────────────────────────────
   Three outlined words, optically aligned:

     The          italic, small, sitting above the A
     AVID         the anchor — every other size is a ratio of its cap height
     FOUNDATION   letterspaced to span AVID's width exactly                  */
const CAP = W.avid.capHeight; // 1400 font units

/** AVID's cap height in lockup units. Everything scales off this. */
const AVID_CAP = 100;
const S = AVID_CAP / CAP; // font units -> lockup units at AVID's size

/** Lay out one word, returning its path body and total advance in font units. */
function layout(word, tracking = 0) {
  let x = 0;
  const parts = [];
  for (const g of word.glyphs) {
    if (g.d) parts.push(`<path transform="translate(${x.toFixed(1)} 0)" d="${g.d}"/>`);
    x += g.advance + tracking;
  }
  return { body: parts.join(""), advance: x - tracking };
}

const avid = layout(W.avid, 0);
const avidW = avid.advance * S;

/* "The" at 38% of AVID's cap height. */
const theRatio = 0.38;
const the = layout(W.the, 0);
const theScale = S * theRatio;

/* FOUNDATION: solve for the tracking that makes it span AVID's width at the
   target cap height. Setting it flush with AVID is the detail that makes a
   stacked lockup look drawn rather than assembled. */
const foundationRatio = 0.2;
const foundationScale = S * foundationRatio;
const foundationAdvance = W.foundation.glyphs.reduce((s, g) => s + g.advance, 0);
const gaps = W.foundation.glyphs.length - 1;
const foundationTracking = (avidW / foundationScale - foundationAdvance) / gaps;
const foundation = layout(W.foundation, foundationTracking);

function place(word, scale, x, baseline, fill) {
  /* Font units are y-up, SVG is y-down: flip vertically, then set the baseline. */
  return `<g fill="${fill}" transform="translate(${x.toFixed(2)} ${baseline.toFixed(2)}) scale(${scale.toFixed(6)} ${(-scale).toFixed(6)})">${word.body}</g>`;
}

/* Vertical rhythm, measured in cap heights from the top of "The". */
const theCap = AVID_CAP * theRatio;
const foundationCap = AVID_CAP * foundationRatio;

const theBaseline = theCap;
const avidBaseline = theBaseline + AVID_CAP * 0.2 + AVID_CAP;
const foundationBaseline = avidBaseline + AVID_CAP * 0.34 + foundationCap;
const wordmarkH = foundationBaseline;

/* "The" is inset slightly so its italic stem sits over the A's left serif
   rather than hanging outside the block. */
const theInset = avidW * 0.035;

function wordmark({ theFill, avidFill, foundationFill }) {
  return [
    place(the, theScale, theInset, theBaseline, theFill),
    place(avid, S, 0, avidBaseline, avidFill),
    place(foundation, foundationScale, 0, foundationBaseline, foundationFill),
  ].join("\n    ");
}

const VARIANTS = {
  primary: {
    mark: { pageA: C.teal, pageB: C.teal, feather: C.ochre, gutter: C.paper },
    words: { theFill: C.ochre, avidFill: C.teal, foundationFill: C.ochre },
  },
  reversed: {
    mark: { pageA: C.paper, pageB: C.sage, feather: C.ochreLight, gutter: null },
    words: { theFill: C.sage, avidFill: C.paper, foundationFill: C.sage },
  },
};

const LABEL = "The AVID Foundation";

/* ── HORIZONTAL LOCKUP ─────────────────────────────────────────────────────*/
function lockup(name) {
  const v = VARIANTS[name];

  /* The mark's drawn artwork occupies y 8..80 of its 100-unit grid, so scale by
     the artwork rather than the grid to get an optical height match. */
  const ART_TOP = 8;
  const ART_BOTTOM = 80;
  const artHeight = ART_BOTTOM - ART_TOP;

  const markArtH = wordmarkH * 0.98;
  const markScale = markArtH / artHeight;
  const markArtW = 76 * markScale; // artwork spans x 12..88
  const gap = markArtW * 0.3;

  const totalW = markArtW + gap + avidW;
  const totalH = wordmarkH;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${totalW.toFixed(1)} ${totalH.toFixed(1)}" role="img" aria-label="${LABEL}">
  <title>${LABEL}</title>
  <g transform="translate(${(-12 * markScale).toFixed(2)} ${((totalH - markArtH) / 2 - ART_TOP * markScale).toFixed(2)}) scale(${markScale.toFixed(6)})">
    ${markSvg(v.mark)}
  </g>
  <g transform="translate(${(markArtW + gap).toFixed(2)} 0)">
    ${wordmark(v.words)}
  </g>
</svg>
`;
}

/* ── STACKED LOCKUP ────────────────────────────────────────────────────────
   For square and narrow spaces: mark above, wordmark centred beneath.       */
function stacked(name) {
  const v = VARIANTS[name];
  const ART_TOP = 8;
  const artHeight = 72;

  const markArtH = wordmarkH * 1.15;
  const markScale = markArtH / artHeight;
  const markArtW = 76 * markScale;
  const gap = wordmarkH * 0.22;

  const totalW = Math.max(markArtW, avidW);
  const totalH = markArtH + gap + wordmarkH;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${totalW.toFixed(1)} ${totalH.toFixed(1)}" role="img" aria-label="${LABEL}">
  <title>${LABEL}</title>
  <g transform="translate(${((totalW - markArtW) / 2 - 12 * markScale).toFixed(2)} ${(-ART_TOP * markScale).toFixed(2)}) scale(${markScale.toFixed(6)})">
    ${markSvg(v.mark)}
  </g>
  <g transform="translate(${((totalW - avidW) / 2).toFixed(2)} ${(markArtH + gap).toFixed(2)})">
    ${wordmark(v.words)}
  </g>
</svg>
`;
}

/* ── MARK ONLY ─────────────────────────────────────────────────────────────*/
function markOnly(name) {
  const v = VARIANTS[name];
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="6 4 88 80" role="img" aria-label="${LABEL}">
  <title>${LABEL}</title>
  ${markSvg(v.mark)}
</svg>
`;
}

/* ── FAVICON ───────────────────────────────────────────────────────────────
   The mark on a Deep Teal tile. A tile rather than a bare mark because at 16px
   an outline-on-transparent disappears into whatever the browser tab is doing;
   a solid block of brand colour is recognisable at a glance, which is the
   entire job of a favicon. The book is drawn in Paper/Sage so it reads against
   the tile. */
function faviconSvg({ rounded }) {
  const r = rounded ? 14 : 0;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" role="img" aria-label="${LABEL}">
  <rect width="100" height="100" rx="${r}" fill="${C.teal}"/>
  <g transform="translate(50 51) scale(1.06) translate(-50 -51)">
    ${markSvg(VARIANTS.reversed.mark)}
  </g>
</svg>
`;
}

/* ── SOCIAL SHARE CARD ─────────────────────────────────────────────────────
   1200x630. All type is outlined, because this is rasterised by librsvg which
   has no access to the site's webfonts and would quietly substitute a system
   serif — on the one image that represents the organisation in every shared
   link. */
function ogCard() {
  const SPINES = [
    "#1B4D5C", "#9A5518", "#41564A", "#6E3B2E",
    "#2E4A52", "#7A5A18", "#54364C", "#7E4212",
  ];
  /* Deterministic pseudo-random, so the card is identical on every build. */
  let seed = 42;
  const rnd = () => (seed = (seed * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff;

  let spines = "";
  let x = 0;
  while (x < 1200) {
    const w = 24 + Math.round(rnd() * 32);
    const h = 120 + Math.round(rnd() * 78);
    const fill = SPINES[Math.floor(rnd() * SPINES.length)];
    spines +=
      `<rect x="${x}" y="${630 - h}" width="${w}" height="${h}" fill="${fill}" rx="2"/>` +
      `<rect x="${x}" y="${630 - h}" width="1.5" height="${h}" fill="#fff" opacity="0.12"/>`;
    x += w + 2;
  }

  /* Outlined type. `run` places a text run at a given cap height. */
  const CAPU = 1400;
  const text = (id, cap, tx, baseline, fill, tracking = 0) => {
    const w = W[id];
    const laid = layout(w, tracking);
    const sc = cap / w.capHeight;
    return `<g fill="${fill}" transform="translate(${tx} ${baseline}) scale(${sc.toFixed(6)} ${(-sc).toFixed(6)})">${laid.body}</g>`;
  };

  /* Header lockup. FOUNDATION is tracked to sit flush with AVID, the same rule
     the logo files use, so the card's lockup matches the real one. */
  const avidCap = 46;
  const foundationCap = 13;
  const avidW = W.avid.glyphs.reduce((a, g) => a + g.advance, 0) * (avidCap / W.avid.capHeight);
  const fAdv = W.foundation.glyphs.reduce((a, g) => a + g.advance, 0);
  const fTrack = (avidW / (foundationCap / W.foundation.capHeight) - fAdv) / (W.foundation.glyphs.length - 1);
  const markScale = 0.9;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0.4" y2="1">
      <stop offset="0" stop-color="${C.teal}"/><stop offset="1" stop-color="#0D2A30"/>
    </linearGradient>
    <linearGradient id="veil" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${C.teal}" stop-opacity="1"/>
      <stop offset="0.62" stop-color="${C.teal}" stop-opacity="0.82"/>
      <stop offset="1" stop-color="${C.teal}" stop-opacity="0.12"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <g>${spines}</g>
  <rect width="1200" height="630" fill="url(#veil)"/>
  <rect x="0" y="622" width="1200" height="8" fill="#A87C4B"/>
  <rect x="0" y="622" width="1200" height="1.5" fill="#E4C79B" opacity="0.6"/>

  <g transform="translate(50 32) scale(${markScale})">
    ${markSvg(VARIANTS.reversed.mark)}
  </g>
  ${text("the", 24, 158, 76, C.sage)}
  ${text("avid", avidCap, 156, 130, C.paper)}
  ${text("foundation", foundationCap, 156, 158, C.sage, fTrack)}

  ${text("og_line1", 74, 72, 300, C.paper)}
  ${text("og_line2", 74, 72, 390, C.paper)}

  <rect x="72" y="428" width="90" height="4" fill="${C.ochre}"/>

  ${text("og_sub1", 20, 72, 486, C.sage)}
  ${text("og_sub2", 20, 72, 524, C.sage)}
</svg>
`;
}

/* ── WRITE ─────────────────────────────────────────────────────────────────*/
const files = {
  "public/logo-avid.svg": lockup("primary"),
  "public/logo-avid-reversed.svg": lockup("reversed"),
  "public/logo-stacked.svg": stacked("primary"),
  "public/logo-mark.svg": markOnly("primary"),
  "public/logo-mark-reversed.svg": markOnly("reversed"),
  "public/favicon.svg": faviconSvg({ rounded: true }),
};

for (const [path, svg] of Object.entries(files)) {
  writeFileSync(path, svg);
  console.log(`${path.padEnd(34)} ${String(svg.length).padStart(7)} bytes`);
}

/* Rasters. The touch icon uses a square tile: iOS applies its own mask. */
const squareTile = Buffer.from(faviconSvg({ rounded: false }));
await sharp(squareTile).resize(180, 180).png().toFile("public/apple-touch-icon.png");
await sharp(Buffer.from(files["public/favicon.svg"])).resize(32, 32).png().toFile("public/favicon-32.png");
await sharp(Buffer.from(ogCard())).png().toFile("public/og-default.png");
for (const f of ["public/apple-touch-icon.png", "public/favicon-32.png", "public/og-default.png"]) {
  console.log(`${f.padEnd(34)} ${String(statSync(f).size).padStart(7)} bytes`);
}

/* Preview renders, each on the surface it is actually used on. */
const SP = process.env.SCRATCH;
if (SP) {
  const previews = [
    ["primary", files["public/logo-avid.svg"], C.paper, 900],
    ["reversed", files["public/logo-avid-reversed.svg"], C.teal, 900],
    ["mark", files["public/logo-mark.svg"], C.paper, 300],
    ["mark-reversed", files["public/logo-mark-reversed.svg"], C.teal, 300],
    ["stacked", files["public/logo-stacked.svg"], C.paper, 360],
    ["favicon", files["public/favicon.svg"], C.paper, 128],
  ];
  for (const [name, svg, bg, width] of previews) {
    await sharp(Buffer.from(svg))
      .resize({ width })
      .flatten({ background: bg })
      .extend({ top: 40, bottom: 40, left: 40, right: 40, background: bg })
      .png()
      .toFile(`${SP}/preview-${name}.png`);
  }
  console.log("\npreviews written to", SP);
}
