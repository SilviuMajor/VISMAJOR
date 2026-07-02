import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

/**
 * "Honesty." — STONE rendition, matching the shared is/isn't look (top+bottom
 * rules, breathing room). Cosmetic only — describes look and feel.
 */
export function SharpIsIsnt() {
  return (
    <section
      id="honesty"
      className="relative overflow-hidden border-y py-20 md:py-28"
      style={{ borderColor: "var(--hair-strong)" }}
    >
      <Container>
        <SectionHead n="03" title="Honesty." />

        <div className="grid grid-cols-1 gap-x-16 gap-y-12 md:grid-cols-2">
          <Reveal>
            <span className="caps text-[11px] font-semibold text-ink-2">What it is</span>
            <p
              className="mt-6 max-w-md font-semibold text-ink-0"
              style={{ fontSize: "clamp(21px, 2.3vw, 30px)", lineHeight: 1.3, letterSpacing: "-0.01em" }}
            >
              A natural cosmetic cleanser — clay and charcoal that lift the day's
              oil and grime, for skin left clean, fresh, and matte.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <span className="caps text-[11px] font-semibold text-ink-2">What it isn't</span>
            <p
              className="mt-6 max-w-md font-semibold text-ink-2"
              style={{ fontSize: "clamp(21px, 2.3vw, 30px)", lineHeight: 1.3, letterSpacing: "-0.01em" }}
            >
              A treatment. Stone strips away what the day leaves behind; it does
              not treat the skin, but returns it to a clean slate.
            </p>
          </Reveal>
        </div>

        <p className="mt-10 caps text-[10px] font-medium text-ink-3">
          Cosmetic use only · describes look &amp; feel
        </p>
      </Container>
    </section>
  );
}
