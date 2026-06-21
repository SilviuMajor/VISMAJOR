import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Claim-safety panel — the CHISEL rendition of GY-NO!'s IsIsnt. Cosmetic and
 * temporary only: it describes feel and look, never fat loss, muscle gain,
 * body re-composition, or any permanent/anatomical change. The tool is a
 * massage bar, not a medical device.
 */
export function ChiselIsIsnt() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHead n="05" title="Honesty." />

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
              A warming cosmetic cream and a steel massage tool that give skin a
              firmer, more defined look — temporary by design.
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
              Not weight loss. Not muscle gain. Not a medical device. The look
              fades when you wash it off — and that's the point.
            </p>
          </Reveal>
        </div>

        <p className="mt-5 max-w-3xl text-[13px] leading-[1.6] text-ink-3">
          CHISEL changes how the surface of the skin looks and feels for a short
          while. It does not change your body. The steel tool is for massage and
          for working the cream in — it is not a treatment for any condition.
        </p>
      </Container>
    </section>
  );
}
