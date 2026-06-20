import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

export function IsIsnt() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHead n="04" title="Honesty." />

        <div
          className="grid grid-cols-1 gap-px overflow-hidden border md:grid-cols-2"
          style={{ borderColor: "var(--hair)", backgroundColor: "var(--hair)" }}
        >
          <Reveal className="bg-paper-0 p-10 md:p-14">
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
          <Reveal delay={0.08} className="bg-ink-0 p-10 text-paper-0 md:p-14">
            <span className="caps text-[11px] font-semibold text-paper-0/55">
              What it isn't
            </span>
            <p
              className="mt-6 max-w-md font-bold uppercase text-paper-0"
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
