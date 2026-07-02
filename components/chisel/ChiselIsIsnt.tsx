import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

/**
 * "Honesty." — SCULPT rendition, matching the shared is/isn't look (top+bottom
 * rules, breathing room). Cosmetic and temporary only: it describes feel and
 * look, never fat loss, weight loss, body re-composition, or any permanent /
 * anatomical change. The steel tools are massage bars, not medical devices.
 */
export function ChiselIsIsnt() {
  return (
    <section
      id="honesty"
      className="relative overflow-hidden border-y py-20 md:py-28"
      style={{ borderColor: "var(--hair-strong)" }}
    >
      <Container>
        <SectionHead n="05" title="Honesty." />

        <div className="grid grid-cols-1 items-start gap-y-12 md:grid-cols-2 md:gap-x-16">
          <Reveal className="md:pr-6">
            <span className="caps text-[11px] font-semibold text-ink-2">What it is</span>
            <p
              className="mt-6 max-w-md font-semibold text-ink-0"
              style={{ fontSize: "clamp(21px, 2.3vw, 30px)", lineHeight: 1.3, letterSpacing: "-0.01em" }}
            >
              A therapeutic massage cream, worked into the body by hand or steel,
              for skin, fat and muscle that looks firmer, feels worked and reads
              sharper.
            </p>
          </Reveal>
          <Reveal delay={0.08} className="md:pl-6">
            <span className="caps text-[11px] font-semibold text-ink-2">What it isn't</span>
            <p
              className="mt-6 max-w-md font-semibold text-ink-2"
              style={{ fontSize: "clamp(21px, 2.3vw, 30px)", lineHeight: 1.3, letterSpacing: "-0.01em" }}
            >
              A shortcut. The ritual rewards the hands that perform it; what the
              cream and the steel offer is the work itself, not a result without
              it.
            </p>
          </Reveal>
        </div>

        <p className="mt-10 max-w-3xl text-[13px] leading-[1.6] text-ink-3">
          SCULPT changes how skin looks and feels for a while; it doesn't change
          your body. The optional steel tools are for massage and for working the
          cream in — they are not a treatment for any condition.
        </p>
      </Container>
    </section>
  );
}
