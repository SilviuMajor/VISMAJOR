import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

/**
 * "Honesty." — the claim-safe is/isn't panel. Set apart from its neighbours by
 * full-width top+bottom rules and extra breathing room (shared look across
 * PECTUS / SCULPT / STONE). Cosmetic and temporary only.
 */
export function IsIsnt() {
  return (
    <section
      id="honesty"
      className="relative overflow-hidden border-y bg-ink-0 py-20 md:py-28"
      style={{ borderColor: "rgba(244,242,236,0.22)" }}
    >
      <Container>
        <SectionHead n="04" title="Honesty." light />

        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:gap-x-16">
          <Reveal>
            <span className="caps text-[11px] font-semibold text-paper-0/70">What it is</span>
            <p
              className="mt-6 max-w-md font-semibold text-paper-0"
              style={{ fontSize: "clamp(21px, 2.3vw, 30px)", lineHeight: 1.3, letterSpacing: "-0.01em" }}
            >
              A cosmetic cooling and tightening cream: a short-term,
              firmer-looking chest, and a confident edge.
            </p>
          </Reveal>
          <Reveal delay={0.08} className="md:pl-6">
            <span className="caps text-[11px] font-semibold text-paper-0/70">What it isn't</span>
            <p
              className="mt-6 max-w-md font-semibold text-paper-0/70"
              style={{ fontSize: "clamp(21px, 2.3vw, 30px)", lineHeight: 1.3, letterSpacing: "-0.01em" }}
            >
              A replacement for discipline. The cream will provide the edge, but
              what is earned in the gym and at the table, no cream can grant.
            </p>
          </Reveal>
        </div>

        <p className="mt-10 caps text-[10px] font-medium text-paper-0/55">
          Cosmetic use only · temporary by design · describes look &amp; feel
        </p>
      </Container>
    </section>
  );
}
