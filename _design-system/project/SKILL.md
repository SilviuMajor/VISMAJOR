---
name: vis-major-design
description: Use this skill to generate well-branded interfaces and assets for VIS MAJOR (the men's performance-topicals house) and its GY-NO! product line — for production or throwaway prototypes/mocks. Contains essential design guidelines, colours, type, fonts, assets, and UI-kit components for prototyping.
user-invocable: true
---

# VIS MAJOR — Design Skill

Read `readme.md` in this skill first — it is the full design guide (brand architecture, content fundamentals, visual foundations, iconography, file index).

## What this brand is
- **VIS MAJOR** = the house. Refined, monochrome, institutional. Light-tracked wordmark + hexagon-VM monogram + "ENGINEERED FOR MEN" seal.
- **GY-NO!** = the loud product line under it (Nipple Tightening Cream). Heavy/tight wordmark, deadpan-clinical copy. The voice + style are a reusable template for future products.

## Non-negotiables
- **Monochrome only** — warm ink `#14130F` on warm paper `#F4F2EC` + a matte-white grey scale. No accent colour.
- **One typeface** — Hanken Grotesk. Hierarchy from size + weight + **tracking**. Caps, widely tracked, for labels/marks; sentence case for body.
- **Tone** — deadpan, clinical, confident, dry. Claims & imperatives ("WORKS IN MINUTES."). Honest hedging ("temporary", "up to 1 hour"). No emoji, no hype.
- **Material** — matte white, matte black caps, white labels. Keyline frames. Hairlines over shadows. Tiny radii.

## How to work
- Link `styles.css` and use the CSS custom properties — never hard-code hexes/fonts.
- Mount components from `_ds_bundle.js` via `window.GYNODesignSystem_bea4a7`: `Wordmark`, `Button`, `Badge`, `Monogram`, `Seal`, `MetalPlate`.
- For visual artifacts (slides, mocks, throwaway prototypes), copy assets out and produce static HTML for the user to view. For production code, read the rules here and design as a brand expert.
- See `ui_kits/marketing/` for a full interactive example (home + product detail).

If invoked with no guidance, ask what the user wants to build, ask a few questions, then act as an expert designer who outputs HTML artifacts **or** production code as the need dictates — always on-brand.
