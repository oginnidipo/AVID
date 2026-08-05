/**
 * Illustrated scenes for the photo galleries.
 *
 * WHY THESE ARE DRAWN RATHER THAN PHOTOGRAPHED
 * AVID has not photographed a library yet, and openly-licensed photography of
 * Nigerian school libraries essentially does not exist — a search of the CC
 * pools returns Western public libraries and antiquarian collections. Putting
 * those on this site would say "well-funded library in Ontario" on a page about
 * under-resourced schools in Lagos, and putting a stock photograph of an
 * unrelated child above the transparency wall would undercut the one thing that
 * wall is for.
 *
 * Illustration solves both. It carries no documentary claim, so it cannot
 * misrepresent whose classroom this is, and it can be drawn in the brand's own
 * palette so the pages look designed rather than sourced.
 *
 * These are placeholders in the honest sense: the moment AVID has its own
 * photographs, they replace these in /admin and nothing else changes.
 *
 * Run: npm run scenes
 */
import { writeFileSync, mkdirSync } from "node:fs";
import sharp from "sharp";

const C = {
  teal: "#133B42",
  tealMid: "#1B4D5C",
  tealDeep: "#0D2A30",
  paper: "#F6F1E7",
  cream: "#FBF8F1",
  sage: "#A7BEAE",
  sagePale: "#C8D8CB",
  ochre: "#C4762D",
  ochreLight: "#D9924B",
  ochrePale: "#E8B87C",
  ink: "#16272E",
  wood: "#A87C4B",
  woodDark: "#6E4E2C",
};

/* Warm skin tones, several of them, so a group of children is not one colour.
   Kept as flat fills in the same register as everything else in the drawing. */
const SKIN = ["#6B4128", "#7C4E2F", "#8A5A38", "#5C3722", "#9A6B45"];
/* Uniform colours — the checked and solid cottons common in Lagos schools. */
const UNIFORM = ["#1B4D5C", "#41564A", "#7E4212", "#54364C", "#2E4A52"];
const HAIR = "#1A1310";

const W = 1200;
const H = 900;

/* Deterministic pseudo-random, so the scenes are identical on every build. */
function rng(seed) {
  return () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  };
}

const defs = () => `
  <defs>
    <linearGradient id="sun" x1="0" y1="0" x2="0.6" y2="1">
      <stop offset="0" stop-color="${C.ochrePale}" stop-opacity="0.5"/>
      <stop offset="1" stop-color="${C.ochrePale}" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="floorGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${C.wood}"/>
      <stop offset="1" stop-color="${C.woodDark}"/>
    </linearGradient>
    <linearGradient id="wallGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${C.cream}"/>
      <stop offset="1" stop-color="#EFE7D8"/>
    </linearGradient>
    <!-- Paper grain, the same texture the site uses behind its sections. -->
    <filter id="grain">
      <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" seed="7"/>
      <feColorMatrix type="saturate" values="0"/>
      <feComponentTransfer><feFuncA type="linear" slope="0.5"/></feComponentTransfer>
      <feBlend in2="SourceGraphic" mode="multiply"/>
    </filter>
  </defs>`;

const grainOverlay = () =>
  `<rect width="${W}" height="${H}" filter="url(#grain)" fill="none" opacity="0.1"/>`;

/* ── Reusable parts ─────────────────────────────────────────────────────── */

/** A child, seen from behind or three-quarter. No facial features: the drawing
 *  stays about the act of reading rather than inventing a particular person. */
function child({ x, y, s = 1, skin, uniform, hair = "hairShort", holding = true, lean = 0 }) {
  const headR = 26 * s;
  const hairShapes = {
    hairShort: `<path d="M ${-headR} ${-8 * s} a ${headR} ${headR} 0 0 1 ${headR * 2} 0 q ${-headR} ${-14 * s} ${-headR * 2} 0 z" fill="${HAIR}"/>`,
    hairPuffs: `<circle cx="${-headR * 0.95}" cy="${-headR * 0.5}" r="${13 * s}" fill="${HAIR}"/>
                <circle cx="${headR * 0.95}" cy="${-headR * 0.5}" r="${13 * s}" fill="${HAIR}"/>
                <path d="M ${-headR} ${-6 * s} a ${headR} ${headR} 0 0 1 ${headR * 2} 0 q ${-headR} ${-16 * s} ${-headR * 2} 0 z" fill="${HAIR}"/>`,
    hairBraids: `<path d="M ${-headR} ${-6 * s} a ${headR} ${headR} 0 0 1 ${headR * 2} 0 q ${-headR} ${-16 * s} ${-headR * 2} 0 z" fill="${HAIR}"/>
                 <rect x="${-headR - 7 * s}" y="${-4 * s}" width="${9 * s}" height="${30 * s}" rx="${4 * s}" fill="${HAIR}"/>
                 <rect x="${headR - 2 * s}" y="${-4 * s}" width="${9 * s}" height="${30 * s}" rx="${4 * s}" fill="${HAIR}"/>`,
  };

  return `<g transform="translate(${x} ${y}) rotate(${lean})">
    <!-- body -->
    <path d="M ${-34 * s} ${86 * s} q ${2 * s} ${-52 * s} ${34 * s} ${-52 * s} q ${32 * s} 0 ${34 * s} ${52 * s} z" fill="${uniform}"/>
    <!-- collar -->
    <path d="M ${-13 * s} ${34 * s} l ${13 * s} ${12 * s} l ${13 * s} ${-12 * s} z" fill="${C.paper}" opacity="0.85"/>
    <!-- head -->
    <circle cx="0" cy="0" r="${headR}" fill="${skin}"/>
    ${hairShapes[hair]}
    <!-- ear -->
    <circle cx="${headR - 2 * s}" cy="${4 * s}" r="${5 * s}" fill="${skin}"/>
    ${
      holding
        ? `<!-- open book held up -->
           <g transform="translate(0 ${62 * s})">
             <path d="M ${-40 * s} ${6 * s} L 0 ${-6 * s} L ${40 * s} ${6 * s} L 0 ${14 * s} Z" fill="${C.paper}"/>
             <path d="M 0 ${-6 * s} L 0 ${14 * s}" stroke="${C.wood}" stroke-width="${2 * s}" opacity="0.6"/>
             <path d="M ${-40 * s} ${6 * s} L 0 ${14 * s} L ${40 * s} ${6 * s}" fill="none" stroke="${C.woodDark}" stroke-width="${2 * s}" opacity="0.35"/>
           </g>
           <!-- arms holding it -->
           <path d="M ${-30 * s} ${52 * s} q ${-8 * s} ${16 * s} ${6 * s} ${20 * s}" stroke="${skin}" stroke-width="${11 * s}" fill="none" stroke-linecap="round"/>
           <path d="M ${30 * s} ${52 * s} q ${8 * s} ${16 * s} ${-6 * s} ${20 * s}" stroke="${skin}" stroke-width="${11 * s}" fill="none" stroke-linecap="round"/>`
        : ""
    }
  </g>`;
}

/** A run of shelved books. */
function books({ x, y, width, height = 46, seed = 1, palette }) {
  const r = rng(seed);
  const pal = palette ?? [C.tealMid, C.ochre, "#41564A", "#7E4212", "#54364C", C.sage];
  let out = "";
  let cx = x;
  while (cx < x + width - 8) {
    const w = 10 + r() * 16;
    const h = height * (0.72 + r() * 0.28);
    const fill = pal[Math.floor(r() * pal.length)];
    const lean = r() > 0.9 ? (r() > 0.5 ? 6 : -6) : 0;
    out += `<g transform="rotate(${lean} ${cx + w / 2} ${y})">
      <rect x="${cx.toFixed(1)}" y="${(y - h).toFixed(1)}" width="${w.toFixed(1)}" height="${h.toFixed(1)}" rx="1.5" fill="${fill}"/>
      <rect x="${cx.toFixed(1)}" y="${(y - h).toFixed(1)}" width="1.5" height="${h.toFixed(1)}" fill="#fff" opacity="0.16"/>
      ${r() > 0.55 ? `<rect x="${(cx + 2.5).toFixed(1)}" y="${(y - h + h * 0.2).toFixed(1)}" width="${(w - 5).toFixed(1)}" height="2" fill="${C.ochrePale}" opacity="0.55"/>` : ""}
    </g>`;
    cx += w + 2.5;
  }
  return out;
}

/** A bookcase: uprights, boards, and books on each board. */
function bookcase({ x, y, w, h, shelves = 4, seed = 3 }) {
  const gap = h / shelves;
  let out = `<rect x="${x - 10}" y="${y - h}" width="${w + 20}" height="${h + 14}" rx="4" fill="${C.woodDark}"/>
             <rect x="${x - 4}" y="${y - h + 6}" width="${w + 8}" height="${h}" fill="${C.tealDeep}" opacity="0.55"/>`;
  for (let i = 0; i < shelves; i++) {
    const by = y - h + gap * (i + 1);
    out += books({ x, y: by - 6, width: w, height: gap - 16, seed: seed + i * 7 });
    out += `<rect x="${x - 6}" y="${by - 6}" width="${w + 12}" height="7" rx="2" fill="url(#floorGrad)"/>`;
  }
  return out;
}

/** A window with light coming through, and a simple frame. */
function window_({ x, y, w, h }) {
  return `<g>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="${C.sagePale}"/>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="${C.ochrePale}" opacity="0.55"/>
    <rect x="${x + w / 2 - 3}" y="${y}" width="6" height="${h}" fill="${C.woodDark}" opacity="0.8"/>
    <rect x="${x}" y="${y + h / 2 - 3}" width="${w}" height="6" fill="${C.woodDark}" opacity="0.8"/>
    <rect x="${x - 8}" y="${y - 8}" width="${w + 16}" height="${h + 16}" rx="4" fill="none" stroke="${C.woodDark}" stroke-width="11"/>
  </g>`;
}

/* ── The scenes ─────────────────────────────────────────────────────────── */

/** 1. A reading circle: children seated on a mat, a teacher reading aloud. */
function sceneReadingCircle() {
  const r = rng(11);
  let kids = "";
  const seats = [
    { x: 455, y: 600, s: 1.35, hair: "hairPuffs" },
    { x: 690, y: 628, s: 1.5, hair: "hairBraids" },
    { x: 925, y: 606, s: 1.4, hair: "hairShort" },
    { x: 1112, y: 572, s: 1.15, hair: "hairPuffs" },
  ];
  seats.forEach((k, i) => {
    kids += child({
      ...k,
      skin: SKIN[i % SKIN.length],
      uniform: UNIFORM[i % UNIFORM.length],
      lean: i % 2 ? -2 : 2,
    });
  });

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
    ${defs()}
    <rect width="${W}" height="${H}" fill="url(#wallGrad)"/>
    ${window_({ x: 55, y: 95, w: 195, h: 245 })}
    <ellipse cx="300" cy="420" rx="520" ry="420" fill="url(#sun)"/>

    <!-- back wall shelving -->
    ${bookcase({ x: 470, y: 470, w: 300, h: 330, shelves: 4, seed: 5 })}
    ${bookcase({ x: 830, y: 470, w: 250, h: 330, shelves: 4, seed: 19 })}

    <!-- floor -->
    <rect x="0" y="470" width="${W}" height="${H - 470}" fill="#E3D7C2"/>
    <rect x="0" y="470" width="${W}" height="10" fill="${C.woodDark}" opacity="0.25"/>

    <!-- the mat -->
    <ellipse cx="620" cy="720" rx="470" ry="120" fill="${C.ochre}" opacity="0.28"/>
    <ellipse cx="620" cy="720" rx="470" ry="120" fill="none" stroke="${C.ochre}" stroke-width="5" opacity="0.5"/>
    <ellipse cx="620" cy="720" rx="380" ry="94" fill="none" stroke="${C.ochre}" stroke-width="3" opacity="0.35"/>

    <!-- The teacher, standing. Deliberately large enough to overlap the window
         frame: contained inside it she read as a picture on the wall. -->
    <g transform="translate(232 292)">
      ${child({ x: 0, y: 0, s: 2.1, skin: SKIN[1], uniform: C.ochre, hair: "hairBraids" })}
    </g>

    ${kids}
    ${grainOverlay()}
  </svg>`;
}

/** 2. A shelf being filled: hands placing books onto a new bookcase. */
function sceneShelf() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
    ${defs()}
    <rect width="${W}" height="${H}" fill="${C.teal}"/>
    <ellipse cx="880" cy="180" rx="620" ry="460" fill="url(#sun)"/>

    ${bookcase({ x: 120, y: 700, w: 420, h: 560, shelves: 5, seed: 31 })}
    ${bookcase({ x: 640, y: 700, w: 420, h: 560, shelves: 5, seed: 47 })}
    <rect x="0" y="700" width="${W}" height="${H - 700}" fill="${C.tealDeep}"/>

    <!-- a crate of new books, foreground -->
    <g transform="translate(596 828)">
      ${books({ x: -120, y: -14, width: 240, height: 96, seed: 77 })}
      <rect x="-136" y="-14" width="272" height="104" rx="8" fill="none" stroke="${C.wood}" stroke-width="14"/>
      <rect x="-136" y="66" width="272" height="24" rx="6" fill="${C.wood}"/>
    </g>

    ${grainOverlay()}
  </svg>`;
}

/** 3. A girl reading alone by a window. Quiet, unhurried, dignified. */
function sceneWindow() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
    ${defs()}
    <rect width="${W}" height="${H}" fill="url(#wallGrad)"/>
    ${window_({ x: 640, y: 90, w: 400, h: 350 })}
    <ellipse cx="830" cy="330" rx="620" ry="520" fill="url(#sun)"/>

    ${bookcase({ x: 90, y: 620, w: 380, h: 460, shelves: 4, seed: 13 })}

    <rect x="0" y="620" width="${W}" height="${H - 620}" fill="#E3D7C2"/>
    <rect x="0" y="620" width="${W}" height="9" fill="${C.woodDark}" opacity="0.22"/>

    <!-- a low bench under the window -->
    <rect x="600" y="690" width="470" height="26" rx="6" fill="url(#floorGrad)"/>
    <rect x="640" y="716" width="20" height="90" fill="${C.woodDark}"/>
    <rect x="1010" y="716" width="20" height="90" fill="${C.woodDark}"/>

    <!-- the reader, seated on the bench -->
    <g transform="translate(830 545)">
      ${child({ x: 0, y: 0, s: 1.6, skin: SKIN[0], uniform: UNIFORM[1], hair: "hairPuffs" })}
    </g>

    <!-- a small stack beside her -->
    <g transform="translate(660 676)">
      <rect x="0" y="-16" width="70" height="16" rx="2" fill="${C.ochre}"/>
      <rect x="4" y="-30" width="62" height="14" rx="2" fill="${C.tealMid}"/>
      <rect x="2" y="-42" width="66" height="12" rx="2" fill="${C.sage}"/>
    </g>
    ${grainOverlay()}
  </svg>`;
}

/** 4. The room itself, empty and ready: the "before we hand it over" shot. */
function sceneRoom() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
    ${defs()}
    <rect width="${W}" height="${H}" fill="url(#wallGrad)"/>
    ${window_({ x: 470, y: 110, w: 270, h: 250 })}
    <ellipse cx="600" cy="300" rx="640" ry="480" fill="url(#sun)"/>

    ${bookcase({ x: 60, y: 560, w: 330, h: 400, shelves: 4, seed: 23 })}
    ${bookcase({ x: 820, y: 560, w: 330, h: 400, shelves: 4, seed: 41 })}

    <rect x="0" y="560" width="${W}" height="${H - 560}" fill="#E3D7C2"/>
    <rect x="0" y="560" width="${W}" height="9" fill="${C.woodDark}" opacity="0.22"/>

    <!-- reading tables and stools -->
    <g transform="translate(600 700)">
      <rect x="-230" y="0" width="460" height="22" rx="6" fill="url(#floorGrad)"/>
      <rect x="-200" y="22" width="18" height="110" fill="${C.woodDark}"/>
      <rect x="182" y="22" width="18" height="110" fill="${C.woodDark}"/>
      <!-- an open book left on the table -->
      <g transform="translate(0 -12)">
        <path d="M -52 8 L 0 -8 L 52 8 L 0 20 Z" fill="${C.paper}"/>
        <path d="M 0 -8 L 0 20" stroke="${C.wood}" stroke-width="2.5" opacity="0.6"/>
      </g>
      <!-- stools -->
      <g fill="${C.ochre}">
        <rect x="-330" y="60" width="80" height="16" rx="6"/>
        <rect x="-318" y="76" width="12" height="66"/>
        <rect x="-268" y="76" width="12" height="66"/>
        <rect x="250" y="60" width="80" height="16" rx="6"/>
        <rect x="262" y="76" width="12" height="66"/>
        <rect x="312" y="76" width="12" height="66"/>
      </g>
    </g>
    ${grainOverlay()}
  </svg>`;
}

/* ── Write ──────────────────────────────────────────────────────────────── */
const SCENES = [
  ["reading-circle", sceneReadingCircle()],
  ["shelving", sceneShelf()],
  ["reading-by-the-window", sceneWindow()],
  ["the-room", sceneRoom()],
];

mkdirSync("src/assets/scenes", { recursive: true });
const SP = process.env.SCRATCH;

for (const [name, svg] of SCENES) {
  writeFileSync(`src/assets/scenes/${name}.svg`, svg);
  /* Also a PNG: Astro's image pipeline optimises rasters far better than it can
     an SVG, and these are photographic in role even though they are drawn. */
  await sharp(Buffer.from(svg), { density: 144 })
    .resize(1600)
    .png({ quality: 90 })
    .toFile(`src/assets/scenes/${name}.png`);
  console.log(`  ${name}`);
  if (SP) {
    await sharp(Buffer.from(svg)).resize(560).png().toFile(`${SP}/scene-${name}.png`);
  }
}
console.log(`\n${SCENES.length} scenes written to src/assets/scenes/`);
