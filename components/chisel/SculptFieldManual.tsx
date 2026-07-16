import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

/** The free book — The Movements ships with every order. */
export function SculptFieldManual() {
  return (
    <section
      className="border-y bg-paper-1 py-16 md:py-24"
      style={{ borderColor: "var(--hair)" }}
    >
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[5fr_7fr] lg:gap-16">
          {/* the book — an outline of The Movements guide */}
          <Reveal>
            <div className="relative mx-auto aspect-[3/4] w-full max-w-[300px]">
              <svg viewBox="0 0 240 320" className="absolute inset-0 h-full w-full" fill="none" aria-hidden>
                {/* pages peeking behind the cover */}
                <path d="M206 60 L 214 68 L 214 288 L 46 288 L 38 280" stroke="var(--hair-strong)" strokeWidth={1} strokeLinejoin="round" strokeLinecap="round" />
                {/* front cover */}
                <rect x={32} y={48} width={174} height={232} rx={4} stroke="var(--ink-0)" strokeWidth={1.6} />
                {/* spine crease */}
                <line x1={48} y1={52} x2={48} y2={276} stroke="var(--ink-0)" strokeWidth={0.9} />
                {/* a massage-stroke emblem with a direction arrow */}
                <path d="M100 214 C 142 220 150 248 116 260" stroke="var(--ink-2)" strokeWidth={1.4} strokeLinecap="round" />
                <path d="M116 260 L 128 258 M116 260 L 121 249" stroke="var(--ink-2)" strokeWidth={1.4} strokeLinecap="round" />
              </svg>
              {/* title on the cover */}
              <div className="absolute inset-0 flex flex-col items-center pt-[25%] text-center">
                <span className="caps-loose text-[9px] font-medium text-ink-3">The</span>
                <span
                  className="mt-1.5 font-serif font-semibold uppercase text-ink-0"
                  style={{ fontSize: "clamp(20px, 2.6vw, 27px)", letterSpacing: "0.06em", lineHeight: 0.95 }}
                >
                  Movements
                </span>
                <span className="mt-3.5 h-px w-9 bg-[var(--hair-strong)]" />
                <span className="mt-3.5 caps text-[8px] font-medium text-ink-3">
                  Illustrated · Step by Step
                </span>
              </div>
            </div>
          </Reveal>

          {/* copy */}
          <div>
            <Reveal>
              <div className="flex items-center gap-3.5">
                <span className="h-px w-7 bg-[var(--hair-strong)]" />
                <span className="caps-loose text-[11px] font-medium text-ink-2">
                  Free with every order
                </span>
              </div>
              <h2
                className="mt-5 font-bold uppercase text-ink-0"
                style={{ fontSize: "clamp(30px, 4.4vw, 60px)", letterSpacing: "-0.03em", lineHeight: 0.98 }}
              >
                The Movements.
              </h2>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mt-6 max-w-xl text-[18px] leading-[1.7] text-ink-1 md:text-[19px]">
                Every order ships with The Movements — a printed, illustrated
                guide to the technique. Where to start, how to work each area, the
                order of the strokes, drawn from sports and deep-tissue massage.
                Laid out step by step, so it runs the same every time. Free, in the
                box, with every SCULPT.
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2.5">
                {["Printed & illustrated", "Step-by-step", "By hand or with steel", "Included free"].map(
                  (b) => (
                    <span
                      key={b}
                      className="caps inline-flex items-center gap-2 text-[10.5px] font-medium text-ink-0"
                    >
                      <span className="h-1 w-1 rounded-full" style={{ background: "#14130F" }} />
                      {b}
                    </span>
                  )
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
