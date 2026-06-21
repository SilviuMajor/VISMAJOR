"use client";

import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Specimen, PlaceholderNote } from "@/components/chisel/Specimen";
import { CreamTube, SteelTool, EMBER } from "@/components/chisel/Art";

/**
 * THE SYSTEM — the cream and the steel tool explained as two parts of one
 * thing. Twin specimen frames (cream | tool) joined by a centre "+" so the duo
 * reads as paired, not two products. Photo-free: line-art now, real shots drop
 * into the same frames later.
 */

const PARTS = [
  {
    tag: "Part One",
    name: "The Cream",
    spec: "50ml · Warming Base",
    body: "A warming contour cream. It blooms on contact, glides under the tool, and dries down to a matte, defined finish.",
    points: ["Warming, not greasy", "Caffeine for a firmer look", "Matte, lightly scented"],
  },
  {
    tag: "Part Two",
    name: "The Steel Tool",
    spec: "Weighted · Contoured Edge",
    body: "A weighted steel bar with a contoured working edge. The mass does the pressing so your strokes stay slow and even.",
    points: ["Solid, cool to hold", "Contoured to the body", "For massage, not medicine"],
  },
];

export function ChiselSystem() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHead n="02" title="One system, two parts." />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-8">
          {/* CREAM */}
          <Reveal>
            <Part
              part={PARTS[0]}
              specimen={
                <Specimen
                  ratio="4 / 5"
                  topLeft="CHISEL / 002"
                  topRight="Cream"
                  bottomLeft={<PlaceholderNote>Specimen — cream</PlaceholderNote>}
                  bottomRight="50ml ℮"
                  innerClassName="aspect-[4/5]"
                >
                  <div className="relative h-[64%] w-[40%]">
                    <CreamTube className="h-full w-full" />
                  </div>
                </Specimen>
              }
            />
          </Reveal>

          {/* TOOL */}
          <Reveal delay={0.08}>
            <Part
              part={PARTS[1]}
              specimen={
                <Specimen
                  ratio="4 / 5"
                  topLeft="CHISEL / 002"
                  topRight="Steel Tool"
                  bottomLeft={<PlaceholderNote>Specimen — tool</PlaceholderNote>}
                  bottomRight="Steel"
                  innerClassName="aspect-[4/5]"
                >
                  <div className="relative w-[78%] rotate-[-12deg]">
                    <SteelTool className="h-auto w-full" warmth={0.18} />
                  </div>
                </Specimen>
              }
            />
          </Reveal>
        </div>

        {/* the join — they only work together */}
        <Reveal delay={0.05}>
          <div
            className="mt-10 flex flex-col items-center gap-5 border-t pt-10 text-center md:flex-row md:justify-between md:text-left"
            style={{ borderColor: "var(--hair)" }}
          >
            <p className="max-w-xl text-[18px] leading-[1.65] text-ink-1">
              <span className="font-semibold text-ink-0">Sold as one.</span> The
              cream warms and lubricates; the tool gives you the pressure and the
              edge. Neither does the job alone — together they make the look.
            </p>
            <span
              className="caps inline-flex shrink-0 items-center gap-2 rounded-xs border px-4 py-2 text-[10px] font-semibold"
              style={{ borderColor: "var(--hair-strong)", color: EMBER }}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: EMBER }} />
              Cream + Tool · The System
            </span>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function Part({
  part,
  specimen,
}: {
  part: (typeof PARTS)[number];
  specimen: React.ReactNode;
}) {
  return (
    <div className="flex h-full flex-col">
      {specimen}
      <div className="mt-6">
        <div className="flex items-baseline justify-between">
          <span className="caps text-[10px] font-semibold text-ink-3">{part.tag}</span>
          <span className="caps text-[10px] font-medium text-ink-3">{part.spec}</span>
        </div>
        <h3
          className="mt-3 font-extrabold uppercase text-ink-0"
          style={{ fontSize: "clamp(30px, 4vw, 46px)", letterSpacing: "-0.02em", lineHeight: 0.96 }}
        >
          {part.name}
        </h3>
        <p className="mt-4 max-w-md text-[16.5px] leading-[1.6] text-ink-2">
          {part.body}
        </p>
        <ul className="mt-5 flex flex-col gap-2.5">
          {part.points.map((pt) => (
            <li key={pt} className="flex items-center gap-3 text-[14px] text-ink-1">
              <span className="h-px w-4 shrink-0" style={{ background: "var(--hair-strong)" }} />
              {pt}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
