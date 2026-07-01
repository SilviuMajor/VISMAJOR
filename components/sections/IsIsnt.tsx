import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { RomanBehind } from "@/components/ui/RomanBehind";

export function IsIsnt() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <RomanBehind figure="/figures/general.png" side="right" />
      <Container className="relative z-10">
        <SectionHead n="04" title="Honesty." />

        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:gap-x-16">
          <Reveal>
            <span className="caps text-[11px] font-semibold text-ink-2">
              What it is
            </span>
            <p
              className="mt-6 max-w-md font-bold uppercase text-ink-0"
              style={{ fontSize: "clamp(23px, 2.6vw, 33px)", letterSpacing: "0.005em", lineHeight: 1.12 }}
            >
              A cosmetic cooling and tightening cream that delivers a temporary,
              firmer-looking finish — and a confident edge.
            </p>
          </Reveal>
          <Reveal delay={0.08} className="md:pl-6">
            <span className="caps text-[11px] font-semibold text-ink-2">
              What it isn't
            </span>
            <p
              className="mt-6 max-w-md font-bold uppercase text-ink-3"
              style={{ fontSize: "clamp(23px, 2.6vw, 33px)", letterSpacing: "0.005em", lineHeight: 1.12 }}
            >
              Not a medicine. Not a treatment. Not a permanent fix. A precision
              cosmetic — temporary by design.
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
