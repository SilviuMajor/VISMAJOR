import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Claim-safety panel — the SCULPT rendition of PECTUS's IsIsnt. Cosmetic and
 * temporary only: it describes feel and look, never fat loss, weight loss,
 * body re-composition, or any permanent/anatomical change. The optional steel
 * tools are massage bars, not medical devices.
 */
export function ChiselIsIsnt() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHead n="05" title="Honesty." />

        <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-2 md:gap-16">
          <Reveal className="md:pr-6">
            <span className="caps text-[11px] font-semibold text-ink-2">
              What it is
            </span>
            <p
              className="mt-6 max-w-md font-bold uppercase text-ink-0"
              style={{ fontSize: "clamp(23px, 2.6vw, 33px)", letterSpacing: "0.005em", lineHeight: 1.12 }}
            >
              A massage and recovery cream that gives skin a firmer, more defined
              look and a worked, eased feel — temporary by design.
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
              Not fat loss. Not weight loss. Not a medical device or treatment.
              The look and the worked feeling are temporary — that's the point.
            </p>
          </Reveal>
        </div>

        <p className="mt-5 max-w-3xl text-[13px] leading-[1.6] text-ink-3">
          SCULPT changes how skin looks and feels for a while; it doesn't change
          your body. The optional steel tools are for massage and for working the
          cream in — they are not a treatment for any condition.
        </p>
      </Container>
    </section>
  );
}
