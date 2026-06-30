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
            Worked by hand. Sharpened by steel.
          </h2>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mt-6 max-w-3xl text-[18px] leading-[1.7] text-ink-1 md:text-[19px]">
            SCULPT brings the massage techniques of sports therapy to your own
            bathroom. The cream works into the skin in slow, deliberate strokes —
            drawn from myofascial and lymphatic-style massage — to leave skin
            looking firmer, smoother and more defined, and muscles feeling worked
            and recovered. Work it by hand, or add the weighted steel tools for
            more. It&rsquo;s not magic, and it&rsquo;s not permanent. It&rsquo;s
            technique — refined into a ritual you can run in five minutes.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
