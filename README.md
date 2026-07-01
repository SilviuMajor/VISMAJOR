# PECTUS · VIS MAJOR

A single-page pre-order site for **PECTUS Nipple Tightening Cream** — by **VIS MAJOR** (performance topicals for men).

Built to the **PECTUS Design System** handoff bundle: strictly monochrome,
warm-ink-on-warm-paper apothecary, Hanken Grotesk only, all-caps
wide-tracked labels, matte-white tube with matte-black base. No accent
colour. No emoji. Roman numerals on dates.

Stack: Next.js 14 (App Router), Tailwind CSS, Framer Motion, Hanken Grotesk
(Google Fonts), Stripe Checkout, Supabase.

## Routes

| Route | What it is |
| ----- | ---------- |
| `/` | **The site.** Enhanced + animated, white-locked — kinetic PECTUS hero, pinned "Architecture" scroll, horizontal Use-Before, comparison table, the redesigned first-batch proof (reservation bar), early-bird sticky buy, then "Your edge, in a tube." → "Join the first-batch list" → the classical **"Cool. Firm. Composed."** temple banner. |
| `/explore` | Concept gallery — five alternative hero/first-section directions (Kinetic, Cinematic Classical, Editorial Split, Statement Type, Centred Plinth) to choose from. Not linked from the live site. |

Single composition: `components/enhanced/EnhancedComposition.tsx`. Concepts:
`components/explore/Heroes.tsx`. Pricing in `components/enhanced/StickyBuy.tsx`
(`price` = early-bird, `reg` = RRP at launch).

## Quick start

```bash
npm install
cp .env.local.example .env.local   # optional: real Stripe/Supabase
npm run dev
# open http://localhost:3030
```

Without any env vars the site still runs — pre-order surfaces a "checkout
not configured" message; notify-me logs to the dev console.

## Themes — White (default) & Cream

The page background is theme-driven via `data-theme` on `<html>`, with a
floating **White / Cream** toggle (bottom-left, persisted to localStorage).
White is the default — product shots read as "product on white". Cream is the
original warm apothecary paper, where the white specimen cards pop.

`paper-*` are CSS variables (`--paper-0/1/2`) swapped per theme; Tailwind's
`paper` colors reference them, so every `bg-paper-*` follows the theme.

| Token     | White        | Cream        | Use                                      |
| --------- | ------------ | ------------ | ---------------------------------------- |
| `paper-0` | `#FFFFFF`    | `#F4F2EC`    | Page background                          |
| `paper-1` | `#F2F2F0`    | `#FAF9F5`    | Raised band (Stats / FAQ / House / Close)|
| `paper-2` | `#FFFFFF`    | `#FFFFFF`    | Product specimen panel                   |

## Design tokens (from the design system)

| Token        | Value     | Use                                                   |
| ------------ | --------- | ----------------------------------------------------- |
| `ink-0`      | `#14130F` | Primary text, dark sections, CTAs                     |
| `ink-1`      | `#36352F` | Strong secondary                                      |
| `ink-2`      | `#6A6960` | Muted / captions                                      |
| `ink-3`      | `#9C9A8F` | Faint / placeholder                                   |
| `metal-*`    | grey scale| Aluminium / product material                          |
| `cap-black`  | `#161512` | Matte black flip-cap / tube base                      |
| hairlines    | 0.14α/0.30α| Borders — almost never shadows                       |

Typography: **Hanken Grotesk** only. Hierarchy from **size + weight + tracking**:
- Product wordmark `PECTUS` — Cinzel serif, 700
- House wordmark `VIS MAJOR` — 300, `0.28em`, uppercase
- Labels / eyebrows — 500–600, `0.22–0.34em`, uppercase
- Body — 400, `1.6` line-height, sentence case

## Voice

Deadpan, clinical, supremely confident. ALL CAPS for labels, sentence case
for long body. Imperatives and claims, hedged honestly.

**Yes:** "WORKS IN MINUTES.", "ENGINEERED FOR MEN.", "ONE JOB. DONE WELL.",
"INSTANT CONFIDENCE. MAXIMUM STIFFNESS."
**No:** emoji, slang, hype words ("revolutionary"), medical claims.

PECTUS carries no `!` — the exclamation GY-NO! had was dropped in the rename.

## Page composition

1. Announcement bar — pre-order ribbon (condenses on mobile)
2. Header — VIS MAJOR wordmark · Product / Science / Ingredients / FAQ · hides on scroll-down, returns on scroll-up
3. Hero — "INSTANT CONFIDENCE. MAXIMUM STIFFNESS." (clip-reveal) + real front shot on a white specimen card, parallax
4. Ticker — infinite tracked-caps marquee on ink (claims band)
5. Features (`01`) — 4-up icon grid: Formulated for Men · Cools on Contact · Fast-Absorbing · Lightly Fragranced
6. Lifestyle — full-bleed stock shot with scrim + "Use Before" occasions (clip-reveal), parallax plate
7. How it works (`02`) — Apply · Wait · Step Out, paired with the cream-squeeze action shot
8. Stats — count-up band: ≈5 onset · 60 duration · 20 ml · 1 job
9. House strip — VIS MAJOR explainer, Est. MMXXVI
10. Pre-order (`03`) — product gallery (front/back/texture/detail thumbnails) + buy box (size, qty, Pre-order CTA, spec) + notify-me
11. Honesty (`04`) — What it is (paper) / What it isn't (ink)
12. Ingredients (`05`) — real reverse-label shot + Made in the UK + INCI / directions / warnings accordions
13. FAQ (`06`) — animated accordion
14. Closing — "Your edge, in a tube." + final pre-order CTA + product
15. Footer — big VIS MAJOR mark, Est. MMXXVI, legal

## Imagery

Real product photography lives in `public/product/`:

| File | Use |
| ---- | --- |
| `front.png` | Hero specimen card (pure-white bg) |
| `front-cap.png` | Closing CTA product |
| `back.png` | Ingredients reverse-label (barcode) |
| `squeeze.png` | How-it-works cream-texture shot |
| `front-angle.png`, `detail.png` | Buy-block gallery |
| `lifestyle.png` | Full-bleed "Use Before" band |
| `blank.png` | Unused spare mockup |

Originals are kept in `images/`. `images/ChatGPT…(4).png` is the art-direction
mockup that informed the layout. White-bg shots (front/back/front-cap) use
`mix-blend-multiply` (`.melt`) where they sit directly on paper, or a white
`paper-2` specimen panel where a defined frame is wanted. Served and optimised
through `next/image` (≈1MB PNG → ≈330KB on the wire).

## Motion

Restrained and mechanical per the brand (120–180ms, ease-out, no spring):

- `TextReveal` — clip-mask line rise for display headlines
- `Reveal` — opacity + small-y scroll reveal (stagger via delay)
- `Marquee` — seamless CSS ticker
- `Parallax` — scroll-linked Y drift on product + lifestyle plates
- `Counter` — count-up stats on view
- `Accordion` — height-animated FAQ / ingredients
- Header hide-on-scroll, button fill-flip hovers, gallery cross-fade

All honour `prefers-reduced-motion`.

## Commerce wiring

- **Stripe Checkout** — `app/api/checkout/route.ts`. Works in two modes:
  with `STRIPE_PRICE_*` env vars (real prices), or falls back to inline
  `price_data` using these defaults (override in
  `components/sections/BuyBlock.tsx` if you change the SKUs):
    - 20ml — £24
    - 40ml — £42
    - 2-pack (2 × 20ml) — £44
- **Supabase** — `app/api/notify/route.ts` writes to a `notify_list` table.
  Without env vars, logs to dev console so the form still demos.

## Going live

### Stripe
Create three GBP products in Stripe (20ml, 40ml, 2-pack) and add their
price IDs to `.env.local`:

```
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_PRICE_1_TUBE=price_...     # 20ml
STRIPE_PRICE_2_TUBES=price_...    # 40ml
STRIPE_PRICE_3_TUBES=price_...    # 2-pack
```

### Supabase
```sql
create table notify_list (
  email text primary key,
  created_at timestamptz default now()
);
```
```
NEXT_PUBLIC_SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...   # server-only
```

### Vercel
```bash
vercel link
vercel env add   # for each var
vercel --prod
```
Set `NEXT_PUBLIC_SITE_URL` to the production domain.

## File map

```
app/
  layout.tsx       Hanken Grotesk, metadata
  page.tsx         single-page composition
  globals.css      tokens, utilities (caps / house / hair-top)
  api/checkout     Stripe Checkout session creator
  api/notify       Notify-me list endpoint
components/
  nav/             Announcement, Header
  sections/        Hero, Architecture (claims triple), HouseStrip,
                   HowItWorks, WhenToUse, BuyBlock, IsIsnt, Ingredients,
                   Faq, Footer
  product/Tube     Matte-white squeeze tube w/ matte-black base
  ui/              Container, Eyebrow, SectionHead, Reveal, StickyBuyBar
lib/
  stripe.ts        lazy Stripe client
  supabase.ts      lazy Supabase client
```

## Claim discipline

Everything reads as **feel** and **look** — never a medical claim. The
"Honesty" block is the explicit firewall ("Not a medicine. Not a
treatment. Not a permanent fix."), and the footer carries:

> Cosmetic use only. Temporary effect. Not a treatment for any medical condition.

## Swap placeholders

- `components/product/Tube.tsx` — div-based render. Replace with real
  product photography (PNG/WebP) when ready; Tube is used in Hero + BuyBlock.
- `PREORDER_SHIP_MONTH` env var controls the ship-month copy everywhere.
- Prices live in `components/sections/BuyBlock.tsx` and
  `app/api/checkout/route.ts` — keep them in sync.

## What's in the design bundle

The handoff is at `/tmp/design-extract/gy-no-design-system/`. Source of
truth for tokens, components, voice. Re-read its `readme.md` whenever a
visual decision comes up.
