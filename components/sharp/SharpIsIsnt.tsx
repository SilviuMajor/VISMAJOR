import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

export function SharpIsIsnt() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHead n="03" title="Honesty." />

        <div className="grid grid-cols-1 gap-x-16 gap-y-12 md:grid-cols-2">
          <Reveal>
            <span className="caps text-[11px] font-semibold text-ink-2">What it is</span>
            <p
              className="mt-6 max-w-md font-bold uppercase text-ink-0"
              style={{ fontSize: "clamp(23px, 2.6vw, 33px)", letterSpacing: "0.005em", lineHeight: 1.12 }}
            >
              A lightweight daily moisturiser that hydrates, holds a clean matte
              finish, and defines the look of your features.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <span className="caps text-[11px] font-semibold text-ink-3">What it isn't</span>
            <p
              className="mt-6 max-w-md font-bold uppercase text-ink-3"
              style={{ fontSize: "clamp(23px, 2.6vw, 33px)", letterSpacing: "0.005em", lineHeight: 1.12 }}
            >
              Not an SPF or sunscreen. Not a medicine or acne treatment. A
              cosmetic moisturiser — finish and feel, nothing more.
            </p>
          </Reveal>
        </div>

        <p className="mt-5 caps text-[10px] font-medium text-ink-3">
          Cosmetic use only · contains no SPF / sun protection · describes look &amp; feel
        </p>
      </Container>
    </section>
  );
}
