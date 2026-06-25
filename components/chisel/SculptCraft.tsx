import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

/** "The Craft" — teaching the technique, claim-safe (appearance / feel /
    "inspired by"). Never claims an outcome. */
const BLOCKS = [
  {
    n: "01",
    t: "Lymphatic-style strokes",
    b: "Light, sweeping passes that follow the body — drawn from lymphatic-style massage. The kind of movement used to leave skin looking de-puffed and awake.",
  },
  {
    n: "02",
    t: "Myofascial-inspired work",
    b: "Slow, firm passes along the line of the muscle — inspired by myofascial-style massage. Worked in to leave the area feeling eased and the surface looking smoother.",
  },
  {
    n: "03",
    t: "Contour strokes",
    b: "Directional strokes drawn along the muscle, edge to edge — to leave the body looking more defined, and reading sharper.",
  },
];

export function SculptCraft() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <Reveal>
          <div className="flex items-center gap-3.5">
            <span className="h-px w-7 bg-[var(--hair-strong)]" />
            <span className="caps-loose text-[11px] font-semibold text-ink-2">
              The Craft
            </span>
          </div>
          <h2
            className="mt-5 max-w-2xl font-extrabold uppercase text-ink-0"
            style={{ fontSize: "clamp(30px, 4.4vw, 58px)", letterSpacing: "-0.03em", lineHeight: 0.98 }}
          >
            Three ways to work it in.
          </h2>
          <p className="mt-5 max-w-xl text-[16.5px] leading-[1.6] text-ink-1">
            The movements are drawn from techniques therapists have used for
            generations. The Field Manual walks you through each one.
          </p>
        </Reveal>

        <div
          className="mt-12 grid grid-cols-1 gap-px overflow-hidden border md:grid-cols-3"
          style={{ borderColor: "var(--hair)", backgroundColor: "var(--hair)" }}
        >
          {BLOCKS.map((bl, i) => (
            <Reveal key={bl.t} delay={i * 0.06}>
              <div className="flex h-full flex-col bg-paper-0 p-7 md:p-8">
                <span className="font-extrabold text-ink-3" style={{ fontSize: 20 }}>
                  {bl.n}
                </span>
                <h3 className="mt-4 text-[18px] font-bold tracking-tight text-ink-0">
                  {bl.t}
                </h3>
                <p className="mt-3 text-[14.5px] leading-[1.6] text-ink-2">{bl.b}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-7 max-w-2xl text-[13px] leading-[1.6] text-ink-3">
            Inspired by and drawn from massage technique. SCULPT is a cosmetic
            cream, not a medical or therapeutic treatment.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
