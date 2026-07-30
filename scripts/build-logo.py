#!/usr/bin/env python3
"""
Outline text from the project's variable fonts into SVG path data.

Two consumers:

  * The logo wordmark ("The", "AVID", "FOUNDATION"). A logo must render
    identically everywhere — before webfonts load, in an email signature, in a
    PDF someone exports — so it is outlined rather than set as live text. It
    also means the site does not ship the 149KB Fraunces *italic* variable font
    just to set the word "The", the only italic in the whole design.

  * The social share card. It is rasterised at build time by librsvg, which has
    no access to the project's webfonts and would silently substitute a system
    serif. Outlining guarantees the card that appears in every shared link is
    actually in the brand's typefaces.

Run:  ./venv/bin/python scripts/build-logo.py
Writes: scripts/logo-wordmark.json  (consumed by build-brand.mjs)

Needs fonttools, which is a build-time-only dependency — see docs/HANDOVER.md.
Only re-run this if the wordmark or the share-card copy changes.
"""

import json
import os

from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

FRAUNCES = "public/fonts/fraunces-var-latin.woff2"
# Build-time only: this face is never served. It lives outside public/ so the
# 149KB variable italic is not shipped to browsers that have no @font-face rule
# referencing it — the logo's "The" is outlined from it here instead.
FRAUNCES_ITALIC = "scripts/fonts/fraunces-var-italic-latin.woff2"
PUBLIC_SANS = "public/fonts/publicsans-var-latin.woff2"

# Axis settings chosen to match the supplied logo artwork:
#   AVID        heavy, high-contrast display serif  -> large opsz, heavy wght
#   FOUNDATION  light caps, widely letterspaced
#   The         italic with Fraunces' WONK quirk on
#
# Glyphs are emitted individually with their advance widths, so letterspacing
# and alignment are tuned in build-brand.mjs without re-running this.
RUNS = [
    # ── Logo wordmark ──────────────────────────────────────────────────────
    {"id": "avid", "text": "AVID", "font": FRAUNCES, "axes": {"opsz": 144, "wght": 800}},
    {"id": "foundation", "text": "FOUNDATION", "font": FRAUNCES, "axes": {"opsz": 60, "wght": 500}},
    {
        "id": "the",
        "text": "The",
        "font": FRAUNCES_ITALIC,
        "axes": {"opsz": 96, "wght": 600, "SOFT": 0, "WONK": 1},
    },
    # ── Social share card ──────────────────────────────────────────────────
    {
        "id": "og_line1",
        "text": "Where every classroom",
        "font": FRAUNCES,
        "axes": {"opsz": 144, "wght": 600},
    },
    {
        "id": "og_line2",
        "text": "has a library behind it.",
        "font": FRAUNCES,
        "axes": {"opsz": 144, "wght": 600},
    },
    {
        "id": "og_sub1",
        "text": "Refurbishing and restocking school libraries in Nigeria.",
        "font": PUBLIC_SANS,
        "axes": {"wght": 400},
    },
    {
        "id": "og_sub2",
        "text": "A Canadian non-profit. Beginning in Lagos.",
        "font": PUBLIC_SANS,
        "axes": {"wght": 400},
    },
]


def outline(spec):
    font = TTFont(spec["font"])
    upem = font["head"].unitsPerEm
    font = instantiateVariableFont(font, spec["axes"], inplace=True, updateFontNames=False)

    glyphset = font.getGlyphSet()
    cmap = font.getBestCmap()

    glyphs = []
    for ch in spec["text"]:
        name = cmap.get(ord(ch))
        if name is None:
            raise SystemExit(f"{spec['id']}: no glyph for {ch!r} in {spec['font']}")
        glyph = glyphset[name]
        pen = SVGPathPen(glyphset, ntos=lambda v: f"{v:.1f}")
        glyph.draw(pen)
        glyphs.append({"char": ch, "advance": glyph.width, "d": pen.getCommands()})

    return {
        "id": spec["id"],
        "text": spec["text"],
        "upem": upem,
        # Cap height, so runs can be aligned on a shared metric.
        "capHeight": font["OS/2"].sCapHeight,
        "glyphs": glyphs,
    }


def main():
    for path in (FRAUNCES, FRAUNCES_ITALIC, PUBLIC_SANS):
        if not os.path.exists(path):
            raise SystemExit(f"missing font: {path}")

    out = {r["id"]: outline(r) for r in RUNS}
    dest = "scripts/logo-wordmark.json"
    with open(dest, "w") as fh:
        json.dump(out, fh, separators=(",", ":"))

    for k, v in out.items():
        adv = sum(g["advance"] for g in v["glyphs"])
        print(f"{k:11s} glyphs={len(v['glyphs']):>3} advance={adv:>7} cap={v['capHeight']}")
    print(f"\nwrote {dest} ({os.path.getsize(dest):,} bytes)")


if __name__ == "__main__":
    main()
