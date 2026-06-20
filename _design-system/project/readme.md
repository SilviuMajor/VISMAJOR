# VIS MAJOR — Design System

> **VIS MAJOR** *(Latin: "a superior force; an act beyond control")* is a men's **performance topicals** house. Its flagship product line is **GY-NO!** — a deadpan novelty hero, a *Nipple Tightening Cream* delivering "temporary firmness." The design language is **apothecary-clean**: strictly monochrome, geometric tracked type (Hanken Grotesk), matte-white packaging, and bone-dry, clinically confident copy. The humour lives entirely in the contrast — something this absurd, presented with total precision-engineering seriousness.

---

## Brand architecture

```
VIS MAJOR  ······························  the HOUSE (company / signature)
   │   light-tracked wordmark · hexagon-VM monogram · "ENGINEERED FOR MEN" seal
   │
   └── GY-NO!  ···························  a PRODUCT LINE (loud, punny, reusable)
          heavy/tight wordmark · same copy voice across future products
```

- **VIS MAJOR** is the refined, institutional signature — back-of-pack, footers, the "about". Restrained.
- **GY-NO!** is the loud product mark. Its style + voice are a **reusable template**: future products under VIS MAJOR keep the same wordmark treatment and tone.

### Product line
| Product | Format | Size | Tagline |
|---|---|---|---|
| **GY-NO!** Nipple Tightening Cream | Matte-white squeeze tube, matte-black base | 15 ml / 0.5 fl oz | *Works in minutes. Up to 1 hour of temporary firmness.* |
| **GY-NO!** Nipple Balm | Matte-white screw tin | 8 g / 0.28 oz | *Soothe + Protect* |

---

## Sources & provenance

Developed conversationally from scratch — **no codebase, no Figma**. The committed visual direction comes from a monochrome "apothecary" brand sheet the user supplied (wordmark, "ENGINEERED FOR MEN" seal, cream tube, balm tin). Everything here is built to that sheet.

Earlier rounds explored an industrial / distressed-steel look in yellow, red and blue feature colours; the brand committed to the **mono apothecary** route and the house/product split (VIS MAJOR + GY-NO!) instead. Those explorations were cleared.

---

## CONTENT FUNDAMENTALS — how the brand talks

**Voice:** Deadpan, clinical, supremely confident. It plays an absurd product completely straight — like a precision tool. Humour comes from *contrast*, never from winking, emoji, or exclamation-spam (the one `!` lives in the GY-NO! logo and stays there).

- **Casing:** Predominantly **UPPERCASE with wide tracking** (`0.22em` standard). Lowercase only in long legal/body runs where caps hurt legibility.
- **Person:** Impersonal, declarative. Prefer **claims & imperatives** over "you/I": "WORKS IN MINUTES.", "ENGINEERED FOR MEN.", "MAXIMUM STIFFNESS.", "ONE JOB. DONE WELL."
- **Sentence shape:** Short. Full stops as punctuation-rhythm. Fragments are fine and encouraged: "Temporary effect. By design."
- **Claims discipline:** Always hedge the novelty honestly — "temporary", "up to one hour", "cosmetic use only". The seriousness is funnier when it's also responsible.
- **Latinisms / numerals:** Roman numerals for dates ("EST. MMXXVI"); occasional dry Latin ("VIS MAJOR", "A SUPERIOR FORCE"). Metric-first measures.
- **No:** emoji, slang, hype words ("revolutionary"), gendered insults, medical claims.

**Copy examples**
- Hero: `INSTANT CONFIDENCE. / MAXIMUM STIFFNESS.`
- Descriptor: `NIPPLE HARDENING CREAM`
- Reassurance: `Works in minutes. Up to 1 hour of temporary firmness.`
- House line: `VIS MAJOR — PERFORMANCE TOPICALS FOR MEN.`
- Legal: `Cosmetic use only. Temporary effect. Not a treatment for any medical condition.`

---

## VISUAL FOUNDATIONS

**Colour** — Strictly **monochrome**. Warm near-black ink (`#14130F`) on warm off-white paper (`#F4F2EC`), plus a matte-white grey scale for product/material. **There is no accent colour** — restraint is the brand. `--accent` is deliberately wired to ink so any component asking for colour stays mono; flip it in one place if a campaign ever needs it.

**Type** — One family: **Hanken Grotesk** (geometric grotesque). Hierarchy from **size + weight + tracking**, never a second family.
- Product wordmark (GY-NO!): 800, tight (`0.01em`).
- House wordmark (VIS MAJOR): 300, wide (`0.28em`), uppercase.
- Labels/eyebrows: 500–600, `0.22–0.34em`, uppercase.
- Body: 400, `1.6` line-height, sentence case.

**Backgrounds** — Flat warm paper. No gradients, no photographic washes. Compositions are often enclosed by a thin **double keyline frame** (inset ~16px) — the apothecary "specimen" device. Brushed-metal texture appears **only** on product renders and nameplates, never as a page background.

**Imagery** — Product-led. Matte white + matte black + white label. If photography is used it should be **cool, high-key, desaturated-to-mono** (B&W or near-grey), studio-lit, clinical. No lifestyle warmth, no skin-tone-heavy hero shots.

**Layout** — Editorial grid, generous negative space, hairline rules and small mono index numbers (`01 / 02`). Tracked-caps eyebrows label sections. Tight, near-rectangular geometry.

**Corners & borders** — Small radii only: `0 / 2 / 4 / 8px`. Labels are near-rectangular (`3–4px`). Borders are **hairlines** (`rgba(20,19,15,0.13)`) or a solid `1px` ink keyline. No heavy outlines.

**Shadow / elevation** — Almost none in UI. The only meaningful shadows are the **soft contact + drop shadows on photographed/rendered product**. Cards sit on hairlines, not shadows.

**Cards** — Warm off-white (`--surface`) on paper, `1px` hairline, `8px` radius, no shadow (or a very faint `--shadow-card`). Quiet.

**Motion** — Restrained and mechanical. Short (`120–180ms`), ease-out, opacity + small translate. No bounce, no spring. Hover = subtle fill/contrast flip (ink↔paper); press = `1px` nudge, no scale-bounce.

**Transparency / blur** — Rare. Hairlines use alpha; otherwise solid. No glassmorphism.

---

## ICONOGRAPHY

The brand is **near-iconless by design** — meaning is carried by tracked type, hairline rules, the hexagon-VM monogram and the circular seal, not a busy icon set. When functional icons are unavoidable (UI: cart, menu, close, chevrons), use a **thin line set at matching stroke weight (1.5px), mono ink, no fill** — e.g. [Lucide](https://lucide.dev) via CDN, which matches the geometric line language.

- **Brand marks (not icons):** hexagon-VM **Monogram**, the "ENGINEERED FOR MEN" **Seal** — both line-drawn SVG, mono, provided as components.
- **Emoji:** never.
- **Unicode used intentionally:** `℮` (estimated-sign) on net-quantity (`15ml ℮`), `·` and `→ ←` as tracked separators/arrows, `™` on the wordmark.
- No multicolour icons, no filled glyphs, no decorative pictograms.

> Substitution flagged: Lucide is suggested for incidental UI icons (none shipped in this system yet). Swap for a licensed thin-line set if preferred — keep stroke 1.5px, mono.

---

## VISUAL FOUNDATIONS — file index / manifest

**Root**
- `styles.css` — entry point; `@import`s the four token files. Consumers link this only.
- `readme.md` — this guide.
- `SKILL.md` — Agent-Skills wrapper for download/Claude Code.

**Tokens** (`tokens/`)
- `colors.css` — ink, paper, aluminium scale, hairlines, semantic aliases.
- `typography.css` — Hanken family, weights, the tracking scale (the signature), sizes, line-heights.
- `spacing.css` — 4px spacing scale, small radii, keyline frame, elevation.
- `fonts.css` — Hanken Grotesk `@import` (swap for licensed binaries in production).

**Components** (`components/`) — namespace `window.GYNODesignSystem_bea4a7`
- `core/` — `Button`, `Badge`, `MetalPlate`
- `brand/` — `Wordmark` (GY-NO! / VIS MAJOR), `Monogram` (hexagon-VM), `Seal` (ENGINEERED FOR MEN)

**Guidelines / specimen cards** (`guidelines/`) — populate the Design System tab
- Type: `type-display`, `type-caps`
- Colors: `colors-ink-paper`, `colors-metal`
- Spacing: `spacing`
- Brand: `brand-marks`, `materials`, `product-tube`, `product-tin`

**UI kit** (`ui_kits/`)
- `marketing/` — the VIS MAJOR / GY-NO! marketing site (home + product detail).

---

## Using this system

Link the tokens, then mount components from the namespace:

```html
<link rel="stylesheet" href="styles.css">
<script src="_ds_bundle.js"></script>
<script type="text/babel">
  const { Wordmark, Button, Seal } = window.GYNODesignSystem_bea4a7;
</script>
```

Everything reads CSS custom properties — never hard-code hexes or fonts. Keep it mono, keep it tracked, keep a straight face.
