"use client";

import Image from "next/image";
import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/Accordion";

const INCI_LIST = [
  "Aqua",
  "Glycerin",
  "Menthol",
  "Caffeine",
  "Polyacrylate Crosspolymer-6",
  "Niacinamide",
  "Aloe Barbadensis Leaf Juice Powder",
  "Butylene Glycol",
  "Carbomer",
  "Phenoxyethanol",
  "Caprylyl Glycol",
  "Ethylhexylglycerin",
  "Parfum",
];
const INCI = INCI_LIST.join(", ") + ".";

const BADGES = ["Made in the UK", "Cosmetic-Grade", "Cruelty-Free", "Vegan"];

/* The three hero actives — claim-safe (feel & finish only). `inci` keys
   into the list above so hovering a card highlights the matching token. */
const ACTIVES = [
  {
    n: "01",
    name: "Caffeine",
    inci: "Caffeine",
    role: "For an awake, toned-feeling finish.",
  },
  {
    n: "02",
    name: "Menthol",
    inci: "Menthol",
    role: "A clean cooling hit on contact.",
  },
  {
    n: "03",
    name: "Niacinamide",
    inci: "Niacinamide",
    role: "A smooth, conditioned look.",
  },
];
const ACTIVE_KEYS = ACTIVES.map((a) => a.inci);

export function IngredientsV2() {
  const [hover, setHover] = useState<string | null>(null);

  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHead n="05" title="Ingredients & origin." />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[5fr_7fr] lg:gap-16">
          {/* ── Reverse-label specimen ───────────────────────── */}
          <Reveal>
            <div className="lg:sticky lg:top-10">
              <div
                className="relative overflow-hidden border bg-paper-2"
                style={{ borderColor: "var(--hair)" }}
              >
                <div
                  className="pointer-events-none absolute inset-4 z-10 border"
                  style={{ borderColor: "var(--hair-strong)" }}
                  aria-hidden
                />
                <span className="absolute left-5 top-4 z-20 caps text-[9px] font-medium text-ink-3">
                  Reverse Panel
                </span>
                <span className="absolute right-5 top-4 z-20 caps text-[9px] font-medium text-ink-3">
                  20ml ℮
                </span>
                <div className="relative aspect-[1122/1402]">
                  <Image
                    src="/product/back.png"
                    alt="GY-NO! reverse label — directions, ingredients and barcode"
                    fill
                    sizes="(max-width: 1024px) 80vw, 420px"
                    className="object-contain p-7"
                  />
                </div>
              </div>

              {/* Origin marker beneath the specimen */}
              <div
                className="mt-3 flex items-center justify-between border-t pt-3"
                style={{ borderColor: "var(--hair)" }}
              >
                <span className="caps text-[9.5px] font-semibold text-ink-3">
                  Batch reference
                </span>
                <span className="caps text-[9.5px] font-semibold text-ink-2">
                  GY-NO · 001 · UK
                </span>
              </div>
            </div>
          </Reveal>

          {/* ── Copy + actives ───────────────────────────────── */}
          <div>
            <Reveal delay={0.05}>
              <h3
                className="font-bold uppercase text-ink-0"
                style={{
                  fontSize: "clamp(40px, 5vw, 72px)",
                  letterSpacing: "-0.025em",
                  lineHeight: 0.96,
                }}
              >
                Made in the
                <br />
                United Kingdom.
              </h3>
              <p className="mt-7 max-w-xl text-[18px] leading-[1.65] text-ink-1">
                A water-based formula with caffeine, a menthol cooling complex,
                and a film-forming tightening system. Manufactured to UK
                cosmetic standards. No parabens. No sulphates. Never tested on
                animals.
              </p>
            </Reveal>

            {/* Hero actives */}
            <Reveal delay={0.08}>
              <div className="mt-9">
                <div className="flex items-center justify-between">
                  <span className="caps text-[10px] font-semibold text-ink-2">
                    Three actives, doing the work
                  </span>
                  <span className="caps text-[9.5px] font-medium text-ink-3">
                    Hover to trace
                  </span>
                </div>
                <div
                  className="mt-4 grid grid-cols-1 gap-px overflow-hidden border sm:grid-cols-3"
                  style={{
                    borderColor: "var(--hair)",
                    backgroundColor: "var(--hair)",
                  }}
                >
                  {ACTIVES.map((a) => {
                    const isOn = hover === a.inci;
                    return (
                      <div
                        key={a.name}
                        onMouseEnter={() => setHover(a.inci)}
                        onMouseLeave={() => setHover(null)}
                        className="group relative flex flex-col gap-3 bg-paper-2 p-5 transition-colors duration-200 md:p-6"
                        style={{
                          backgroundColor: isOn ? "var(--paper-1)" : undefined,
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="caps text-[10px] font-semibold text-ink-3">
                            {a.n}
                          </span>
                          <span
                            className="h-1.5 w-1.5 rounded-full transition-colors duration-200"
                            style={{
                              backgroundColor: isOn
                                ? "#14130F"
                                : "var(--hair-strong)",
                            }}
                            aria-hidden
                          />
                        </div>
                        <span
                          className="font-bold tracking-tight text-ink-0"
                          style={{ fontSize: "19px", letterSpacing: "-0.02em" }}
                        >
                          {a.name}
                        </span>
                        <span className="text-[13.5px] leading-[1.45] text-ink-2">
                          {a.role}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Reveal>

            {/* Inline INCI key — actives traceable, full deck below */}
            <Reveal delay={0.1}>
              <div className="mt-7">
                <span className="caps text-[10px] font-semibold text-ink-2">
                  Full formula · INCI
                </span>
                <p className="mt-3 text-[14px] leading-[2] text-ink-2">
                  {INCI_LIST.map((token, i) => {
                    const isActive = ACTIVE_KEYS.includes(token);
                    const isOn = hover === token;
                    return (
                      <span key={token}>
                        <span
                          className="transition-colors duration-200"
                          style={{
                            color: isOn
                              ? "var(--ink-0)"
                              : isActive
                              ? "var(--ink-1)"
                              : undefined,
                            fontWeight: isActive ? 600 : 400,
                            borderBottom: isActive
                              ? `1px solid ${
                                  isOn
                                    ? "var(--ink-0)"
                                    : "var(--hair-strong)"
                                }`
                              : "none",
                          }}
                        >
                          {token}
                        </span>
                        {i < INCI_LIST.length - 1 ? ", " : "."}
                      </span>
                    );
                  })}
                </p>
              </div>
            </Reveal>

            {/* Badges */}
            <Reveal delay={0.1}>
              <div className="mt-7 flex flex-wrap gap-2">
                {BADGES.map((b) => (
                  <span
                    key={b}
                    className="caps inline-flex items-center gap-2 rounded-xs border px-3 py-2 text-[10.5px] font-semibold text-ink-0"
                    style={{ borderColor: "var(--hair-strong)" }}
                  >
                    <span className="h-1 w-1 rounded-full bg-ink-0" />
                    {b}
                  </span>
                ))}
              </div>
            </Reveal>

            {/* Accordion — full INCI, directions, warnings */}
            <Reveal delay={0.1}>
              <div className="mt-9">
                <Accordion
                  items={[
                    {
                      q: "View Full Ingredients (INCI)",
                      a: (
                        <>
                          {INCI}
                          <span className="mt-3 block caps text-[10px] text-ink-3">
                            Final ingredient deck printed on outer carton.
                          </span>
                        </>
                      ),
                    },
                    {
                      q: "Directions",
                      a: "Apply a thin layer to clean, dry skin. Massage in until absorbed. Apply as needed. Avoid contact with eyes. For external use only.",
                    },
                    {
                      q: "Warnings",
                      a: "Patch test before first use. Discontinue if irritation occurs. Avoid broken skin. Keep out of reach of children. Store below 25°C.",
                    },
                  ]}
                />
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
