// STEEL — the house's standalone tool (route /steel). One weighted, machined-
// steel massage & therapy blade with several contoured edges — a fine point, a
// long flat and a hooked belly (it also pairs with the SCULPT cream). Server
// component; interactive parts imported below.

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
import { ToolPhoto } from "@/components/steel/ToolPhoto";

import { HeroTypeWindow } from "@/components/herolab/HeroTypeWindow";
import { SteelBuy } from "@/components/steel/SteelBuy";

// One blade, several edges — the single tool covers many strokes.
const EDGES: { n: string; name: string; use: string; body: string }[] = [
  {
    n: "01",
    name: "The point",
    use: "Detail · knots, trigger spots",
    body: "A fine, tapered point. Pinpoint a knot, work a trigger spot, or trace a tight seam of muscle: the precise edge.",
  },
  {
    n: "02",
    name: "The long flat",
    use: "Drain · sweep, broad muscle",
    body: "A long, even flat. Sweep the big planes, drain toward the lymph nodes, and glide the cream across the chest and back: the calm edge.",
  },
  {
    n: "03",
    name: "The hooked belly",
    use: "Reach · hook, deep pressure",
    body: "A weighted, hooked belly. Reach the traps and back, hook into a tight band, and press deep into the big muscles: the powerful edge.",
  },
];

const CRAFT = [
  ["Weighted", "Heavy enough to do the work: you guide, the steel presses."],
  ["Machined", "Turned from stainless steel, then hand-finished to several contoured edges."],
  ["Cold", "Steel stays cool on the skin, calming on worked, tender muscle."],
  ["Made in the UK", "Small machined runs. Built to outlast everything else in the cabinet."],
];

const USE = [
  ["Work tension", "Slow, firm strokes along the muscle: ease knots and worked-out tightness after training."],
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
        message={`STEEL · the weighted massage & therapy tool · pre-order · first batch ships ${shipMonth}`}
        messageShort={`STEEL · pre-order · ships ${shipMonth}`}
      />
      <Header crumb="STEEL" cta={{ href: "#buy", label: "Pre-order" }} heroDark />
      <main>
        <HeroTypeWindow product="steel" overlayAlwaysOn />
        <FirstBatchStrip count="600+" shipMonth={shipMonth} />

        {/* ── One blade, many edges ─────────────────────────────── */}
        <section id="edges" className="scroll-mt-24 border-t py-16 md:py-24" style={{ borderColor: "var(--hair)" }}>
          <Container>
            <SectionHead n="01" title="One blade. Many edges." />
            <p className="mt-5 max-w-xl text-[16.5px] leading-[1.65] text-ink-1">
              STEEL is a single weighted blade, machined with several contoured
              edges: a fine point, a long flat and a hooked belly. One tool
              covers many strokes: carve close, drain with the flat, hook into a
              tight band, press deep. Cold steel, heavy enough to do the work for
              you.
            </p>

            {/* the blade */}
            <div className="mt-14 flex justify-center">
              <div className="relative h-[24vh] max-h-[220px] w-[min(680px,92vw)]">
                <ToolPhoto tool="sword" sizes="(max-width: 768px) 92vw, 680px" priority />
              </div>
            </div>

            {/* its edges */}
            <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-11 sm:grid-cols-3">
              {EDGES.map((e, i) => (
                <Reveal key={e.name} delay={i * 0.06}>
                  <div className="flex h-full flex-col border-t pt-7" style={{ borderColor: "var(--hair)" }}>
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold uppercase font-serif text-ink-0" style={{ fontSize: "clamp(22px,2.4vw,30px)", letterSpacing: "-0.01em" }}>
                        {e.name}
                      </h3>
                      <span className="caps font-mono text-[10px] font-medium text-ink-3">{e.n}</span>
                    </div>
                    <span className="caps mt-2 text-[10px] font-medium text-ink-1">{e.use}</span>
                    <p className="mt-4 text-[15px] leading-[1.6] text-ink-2">{e.body}</p>
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
                    and the cold keeps worked muscle calm. A tool made to last a
                    lifetime, not a routine.
                  </p>
                  <div className="relative mt-8 h-[150px] w-[78%] max-w-[360px]">
                    <ToolPhoto tool="sword" sizes="360px" />
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
              Four ways to use the steel: by hand on bare skin, or with a few
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

        <ProductQuote latin="Ferrum ferro acuitur" translation="iron is sharpened by iron." />

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
                    The tool was designed alongside the Contour &amp; Recovery
                    Cream. The cream gives the slip; the steel gives the weight.
                    Use them together, or use the steel on its own.
                  </p>
                  <span className="caps mt-7 inline-flex items-center gap-2 text-[11px] font-medium text-ink-0">
                    View SCULPT
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </span>
                </div>
                <div className="relative h-[150px] w-full md:h-[180px]">
                  <ToolPhoto tool="sword" sizes="320px" />
                </div>
              </div>
            </Link>
          </Container>
        </section>
      </main>
      <Footer />
      <StickyBuyBar priceFrom="£24" label="STEEL · The Blade" href="#buy" />
    </>
  );
}
