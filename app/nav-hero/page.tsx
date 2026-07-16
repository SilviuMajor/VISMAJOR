import type { Metadata } from "next";
import Image from "next/image";
import { ReactNode } from "react";
import { PRODUCTS, CartGlyph } from "@/components/navlab/parts";

export const metadata: Metadata = {
  title: "VIS·MAJOR: nav over hero",
  robots: { index: false, follow: false },
};

/* A dark hero band that stands in for the product-page mask hero, so each nav
   treatment can be judged against the dark field it actually sits over. */
function HeroBand({
  label,
  note,
  nav,
}: {
  label: string;
  note: string;
  nav: ReactNode;
}) {
  return (
    <section className="relative h-[440px] overflow-hidden bg-ink-0">
      {/* faint scene, like the real reveal */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <Image src="/scenes/pectus.png" alt="" fill sizes="100vw" className="object-cover object-center opacity-[0.16]" />
      </div>
      {/* faint masked word */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[58%] z-0 -translate-x-1/2 -translate-y-1/2 select-none font-serif font-semibold uppercase text-paper-0/[0.06]"
        style={{ fontSize: "clamp(90px, 20vw, 260px)", letterSpacing: "0.04em" }}
      >
        PECTUS
      </span>

      {/* the nav treatment */}
      <div className="relative z-20">{nav}</div>

      {/* label */}
      <div className="absolute bottom-5 left-1/2 z-30 w-full max-w-4xl -translate-x-1/2 px-6">
        <div className="inline-flex flex-col gap-1">
          <span className="caps-loose text-[11px] font-semibold text-paper-0">{label}</span>
          <span className="text-[12px] leading-snug text-paper-0/55">{note}</span>
        </div>
      </div>
    </section>
  );
}

/* Shared centred layout — links left, VIS·MAJOR dead-centre, actions right. */
function Bar({
  tone,
  showLinks = true,
  showCta = true,
  rule = false,
  ctaOutline,
  dated = false,
}: {
  tone: "light" | "dark";
  showLinks?: boolean;
  showCta?: boolean;
  rule?: boolean;
  ctaOutline?: string;
  dated?: boolean;
}) {
  const mark = tone === "light" ? "text-ink-0" : "text-paper-0";
  const link =
    tone === "light" ? "text-ink-3 hover:text-ink-0" : "text-paper-0/70 hover:text-paper-0";
  const cta =
    tone === "light"
      ? "border-[var(--hair-strong)] text-ink-0 hover:bg-ink-0 hover:text-paper-0"
      : `${ctaOutline ?? "border-paper-0/40"} text-paper-0 hover:bg-paper-0 hover:text-ink-0`;
  const cart = tone === "light" ? "text-ink-0" : "text-paper-0";

  return (
    <div className={`relative flex h-[74px] items-center justify-between px-6 ${rule ? `border-b ${tone === "dark" ? "border-paper-0/15" : "border-[var(--hair)]"}` : ""}`}>
      <nav className="hidden items-center gap-6 md:flex">
        {showLinks &&
          PRODUCTS.map((p) => (
            <span key={p} className={`caps text-[11px] font-medium transition-colors ${link}`} style={{ letterSpacing: "0.14em" }}>
              {p}
            </span>
          ))}
      </nav>

      <span className={`house absolute left-1/2 -translate-x-1/2 text-[17px] ${mark}`} style={{ letterSpacing: "0.14em" }}>
        VIS·MAJOR
      </span>

      <div className="flex items-center gap-4">
        {dated && (
          <span className="hidden caps-loose text-[10px] font-medium text-paper-0/50 lg:inline" style={{ letterSpacing: "0.22em" }}>
            Est · MMXXVI
          </span>
        )}
        {showCta && (
          <span className={`hidden items-center rounded-[5px] border px-3.5 py-1.5 text-[12px] font-semibold transition-colors md:inline-flex ${cta}`}>
            Pre-order
          </span>
        )}
        <CartGlyph className={cart} />
      </div>
    </div>
  );
}

/**
 * Private lab: the centred-mark nav in four treatments over the dark hero, to
 * fix the "very white bar over the dark mask" problem on product pages.
 */
export default function NavHeroLab() {
  return (
    <main className="bg-paper-0">
      {/* reference: the current problem — solid white over the dark hero */}
      <HeroBand
        label="Now · Solid white (the problem)"
        note="The white bar sits hard against the dark mask. This is what we're replacing."
        nav={
          <div className="bg-paper-0">
            <Bar tone="light" />
          </div>
        }
      />

      {/* A — dissolve */}
      <HeroBand
        label="A · Dissolve, transparent over the hero"
        note="No background, white type, sits inside the mask. Fades to a solid white bar once you scroll past the hero. (Shown here in its over-hero state.)"
        nav={<Bar tone="dark" />}
      />

      {/* B — mark only */}
      <HeroBand
        label="B · Mark only: VIS·MAJOR + basket"
        note="Just the centred mark and the basket over the hero; the product links live in a menu / appear on the solid bar after scroll."
        nav={<Bar tone="dark" showLinks={false} showCta={false} />}
      />

      {/* C — hairline inscription */}
      <HeroBand
        label="C · Hairline, faint, with a rule"
        note="Wide-tracked white type at low opacity, a hairline rule beneath, a dated right side. Barely-there and classical; floats over the hero."
        nav={<Bar tone="dark" rule dated ctaOutline="border-paper-0/25" />}
      />

      {/* D — none over hero */}
      <HeroBand
        label="D · None: clean hero"
        note="No nav over the hero at all. The centred bar slides down the moment you scroll past the reveal."
        nav={<div className="h-[74px]" />}
      />
    </main>
  );
}
