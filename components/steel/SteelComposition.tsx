// STEEL — the house's standalone tools line (route /steel). Two weighted steel
// massage & therapy tools — The Axe and The Sword — presented on their own
// (they also ship as optional add-ons inside the SCULPT bundles). Server
// component; interactive parts are the client components imported below.

import Link from "next/link";
import { Announcement } from "@/components/nav/Announcement";
import { Header } from "@/components/nav/Header";
import { Footer } from "@/components/sections/Footer";
import { StickyBuyBar } from "@/components/ui/StickyBuyBar";
import { ScrollProgress } from "@/components/enhanced/ScrollProgress";
import { FirstBatchStrip } from "@/components/enhanced/FirstBatchStrip";
import { ProductQuote } from "@/components/house/ProductQuote";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/Eyebrow";
import { SteelTool } from "@/components/chisel/Art";

import { SteelHero } from "@/components/steel/SteelHero";
import { SteelBuy } from "@/components/steel/SteelBuy";

const NAV = [
  { href: "#range", label: "The Range" },
  { href: "#craft", label: "The Steel" },
  { href: "#use", label: "How to Use" },
  { href: "#buy", label: "Pre-order" },
];

const RANGE = [
  {
    n: "01",
    name: "The Sword",
    use: "Carve · jaw, neck, close work",
    body: "A blade with a fine point and a long flat edge. Carve close along the jaw and neck, drain with the flat, or work a knot with the tip — multiple edges, the precise one.",
    w: "58%",
  },
  {
    n: "02",
    name: "The Axe",
    use: "Reach · traps, back, deep pressure",
    body: "A heavier head with a hooked edge and a broad face. Reach the traps and back, press deep into the big muscles, hook into a tight band — multiple edges, the powerful one.",
    w: "84%",
  },
];

const CRAFT = [
  ["Weighted", "Heavy enough to do the work — you guide, the steel presses."],
  ["Machined", "Turned from stainless steel, then hand-finished to several contoured edges."],
  ["Cold", "Steel stays cool on the skin — calming on worked, tender muscle."],
  ["Made in the UK", "Small machined runs. Built to outlast everything else in the cabinet."],
];

const USE = [
  ["Work tension", "Slow, firm strokes along the muscle — ease knots and worked-out tightness after training."],
  ["Drain & de-puff", "Light sweeps toward the lymph nodes to move fluid and settle puffiness."],
  ["Contour & define", "Draw an edge along the jaw, neck and chest to leave the planes looking defined."],
  ["With the cream", "A few pumps of SCULPT gives the glide; the steel adds the weight. Together they make the ritual."],
];

export function SteelComposition() {
  const shipMonth = process.env.PREORDER_SHIP_MONTH ?? "September 2026";

  return (
    <>
      <ScrollProgress />
      <Announcement
        message={`STEEL · the massage & therapy tools · pre-order · first batch ships ${shipMonth}`}
        messageShort={`STEEL · pre-order · ships ${shipMonth}`}
      />
      <Header crumb="STEEL" nav={NAV} cta={{ href: "#buy", label: "Pre-order" }} />
      <main>
        <SteelHero priceFrom="£24" />
        <FirstBatchStrip count="600+" shipMonth={shipMonth} />
        <ProductQuote latin="Ferrum ferro acuitur" translation="iron is sharpened by iron." />

        {/* ── The range ─────────────────────────────────────────── */}
        <section id="range" className="scroll-mt-24 border-t py-16 md:py-24" style={{ borderColor: "var(--hair)" }}>
          <Container>
            <SectionHead n="01" title="Two profiles. Many edges." />
            <p className="mt-5 max-w-xl text-[16.5px] leading-[1.65] text-ink-1">
              The same machined steel in two profiles — the Sword for carving and
              close, controlled work, the Axe for reach and deep pressure across
              the back and traps. Each carries several edges, so one tool covers
              many strokes. Buy one, or take the pair.
            </p>

            <div className="mt-12 grid grid-cols-1 gap-x-14 gap-y-12 md:grid-cols-2">
              {RANGE.map((t, i) => (
                <Reveal key={t.name} delay={i * 0.06}>
                  <div className="flex h-full flex-col border-t pt-7" style={{ borderColor: "var(--hair)" }}>
                    {/* tool plate */}
                    <div className="flex h-[150px] items-center">
                      <div style={{ width: t.w }} className="-rotate-[8deg]">
                        <SteelTool className="h-auto w-full" warmth={0} />
                      </div>
                    </div>
                    <div className="mt-6 flex items-center justify-between">
                      <h3 className="font-bold uppercase font-serif text-ink-0" style={{ fontSize: "clamp(26px,3vw,38px)", letterSpacing: "-0.01em" }}>
                        {t.name}
                      </h3>
                      <span className="caps font-mono text-[10px] font-medium text-ink-3">{t.n}</span>
                    </div>
                    <span className="caps mt-2 text-[10px] font-medium text-ink-1">{t.use}</span>
                    <p className="mt-4 text-[15px] leading-[1.6] text-ink-2">{t.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        {/* ── The steel / craft ─────────────────────────────────── */}
        <section id="craft" className="scroll-mt-24 border-t bg-paper-1 py-16 md:py-24" style={{ borderColor: "var(--hair)" }}>
          <Container>
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-[5fr_7fr] lg:gap-16">
              <Reveal>
                <div>
                  <SectionHead n="02" title="Why steel." />
                  <p className="mt-5 max-w-md text-[18px] leading-[1.65] text-ink-1">
                    Plastic flexes and warms. Steel doesn&apos;t. The weight gives
                    you pressure without effort, the edges give you a clean line,
                    and the cold keeps worked muscle calm. Tools made to last a
                    lifetime — not a routine.
                  </p>
                  <div className="mt-8 w-[78%] max-w-[360px] -rotate-[8deg]">
                    <SteelTool className="h-auto w-full" warmth={0} />
                  </div>
                </div>
              </Reveal>
              <div className="grid grid-cols-1 gap-px self-start overflow-hidden sm:grid-cols-2" style={{ background: "var(--hair)" }}>
                {CRAFT.map(([k, v]) => (
                  <div key={k} className="bg-paper-1 p-6">
                    <div className="caps text-[11px] font-medium text-ink-0">{k}</div>
                    <p className="mt-2.5 text-[14px] leading-[1.55] text-ink-2">{v}</p>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* ── How to use ────────────────────────────────────────── */}
        <section id="use" className="scroll-mt-24 border-t py-16 md:py-24" style={{ borderColor: "var(--hair)" }}>
          <Container>
            <SectionHead n="03" title="Massage & therapy." />
            <p className="mt-5 max-w-xl text-[16.5px] leading-[1.65] text-ink-1">
              Four ways to use the steel — by hand on bare skin, or with a few
              pumps of the cream for glide. Cosmetic and physical only: massage,
              not medicine.
            </p>
            <div className="mt-12 grid grid-cols-1 gap-x-12 gap-y-9 sm:grid-cols-2">
              {USE.map(([k, v], i) => (
                <Reveal key={k} delay={i * 0.05}>
                  <div className="flex gap-5 border-t pt-6" style={{ borderColor: "var(--hair)" }}>
                    <span className="caps font-mono text-[11px] font-medium text-ink-3">{`0${i + 1}`}</span>
                    <div>
                      <h3 className="text-[17px] font-bold tracking-tight text-ink-0">{k}</h3>
                      <p className="mt-2 text-[15px] leading-[1.6] text-ink-2">{v}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        <SteelBuy shipMonth={shipMonth} />

        {/* ── Pairs with SCULPT ─────────────────────────────────── */}
        <section className="border-t bg-paper-1 py-20 md:py-28" style={{ borderColor: "var(--hair)" }}>
          <Container>
            <div className="flex items-center gap-3.5">
              <span className="h-px w-7 bg-[var(--hair-strong)]" />
              <span className="caps-loose text-[11px] font-medium text-ink-2">
                The House · Built for the cream
              </span>
            </div>
            <Link href="/sculpt" className="group mt-8 block border-t pt-8" style={{ borderColor: "var(--hair)" }}>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-[7fr_5fr] md:items-center">
                <div>
                  <h2 className="font-bold uppercase text-ink-0" style={{ fontSize: "clamp(30px, 4.4vw, 56px)", letterSpacing: "-0.03em", lineHeight: 0.98 }}>
                    Made to pair with SCULPT.
                  </h2>
                  <p className="mt-5 max-w-lg text-[16px] leading-[1.6] text-ink-2">
                    The tools were designed alongside the Contour &amp; Recovery
                    Cream. The cream gives the slip; the steel gives the weight.
                    Use them together, or use the steel on its own.
                  </p>
                  <span className="caps mt-7 inline-flex items-center gap-2 text-[11px] font-medium text-ink-0">
                    View SCULPT
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </span>
                </div>
                <div className="flex justify-center md:justify-end">
                  <div className="w-[68%] max-w-[300px] -rotate-[8deg]">
                    <SteelTool className="h-auto w-full" warmth={0} />
                  </div>
                </div>
              </div>
            </Link>
          </Container>
        </section>
      </main>
      <Footer />
      <StickyBuyBar priceFrom="£24" label="STEEL · The Axe" href="#buy" />
    </>
  );
}
