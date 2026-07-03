import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

/** "What it does" — the plain-spoken explainer, cream-first. */
export function SculptWhatItDoes() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <Reveal>
          <div className="flex items-center gap-3.5">
            <span className="h-px w-7 bg-[var(--hair-strong)]" />
            <span className="caps-loose text-[11px] font-semibold text-ink-2">
              What it does
            </span>
          </div>
          <h2
            className="mt-5 max-w-3xl font-bold uppercase text-ink-0"
            style={{ fontSize: "clamp(30px, 4.4vw, 60px)", letterSpacing: "-0.03em", lineHeight: 0.98 }}
          >
            For the body you train.
          </h2>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mt-6 max-w-3xl text-[18px] leading-[1.7] text-ink-1 md:text-[19px]">
            SCULPT is a recovery massage cream for men who train. Work it deep
            into worked, tired muscle — by hand, or with the weighted steel tool
            — in slow, deliberate strokes drawn from sports massage and myofascial
            release. Used alongside your training, it eases the muscle, supports
            recovery between sessions, and leaves a hard-trained body looking
            firmer and more defined. Not magic, not permanent — technique,
            refined into a five-minute ritual.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
