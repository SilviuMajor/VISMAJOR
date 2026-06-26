import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

/** The free book — The Field Manual ships with every order. */
export function SculptFieldManual() {
  return (
    <section
      className="border-y bg-paper-1 py-16 md:py-24"
      style={{ borderColor: "var(--hair)" }}
    >
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[5fr_7fr] lg:gap-16">
          {/* book specimen placeholder (cover art drops in later) */}
          <Reveal>
            <div
              className="relative mx-auto aspect-[3/4] w-full max-w-[320px] border bg-paper-2"
              style={{ borderColor: "var(--hair)" }}
            >
              <div
                className="pointer-events-none absolute inset-3 border"
                style={{ borderColor: "var(--hair-strong)" }}
                aria-hidden
              />
              <span className="absolute left-5 top-4 caps text-[9px] font-medium text-ink-3">
                VIS MAJOR
              </span>
              <span
                className="absolute right-5 top-4 caps text-[9px] font-medium"
                style={{ color: "var(--ember)" }}
              >
                Included
              </span>
              <div className="flex h-full flex-col items-center justify-center px-8 text-center">
                <span className="caps-loose text-[10px] font-semibold text-ink-3">The</span>
                <span
                  className="mt-2 font-extrabold uppercase text-ink-0"
                  style={{ fontSize: "clamp(30px, 4vw, 46px)", letterSpacing: "-0.02em", lineHeight: 0.95 }}
                >
                  Field
                  <br />
                  Manual
                </span>
                <span className="mt-5 h-px w-12 bg-[var(--hair-strong)]" />
                <span className="mt-5 caps text-[9.5px] font-medium text-ink-3">
                  Illustrated Movement Guide
                </span>
              </div>
            </div>
          </Reveal>

          {/* copy */}
          <div>
            <Reveal>
              <div className="flex items-center gap-3.5">
                <span className="h-px w-7 bg-[var(--hair-strong)]" />
                <span className="caps-loose text-[11px] font-semibold text-ink-2">
                  Free with every order
                </span>
              </div>
              <h2
                className="mt-5 font-extrabold uppercase text-ink-0"
                style={{ fontSize: "clamp(30px, 4.4vw, 60px)", letterSpacing: "-0.03em", lineHeight: 0.98 }}
              >
                The Field Manual.
              </h2>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mt-6 max-w-xl text-[18px] leading-[1.7] text-ink-1 md:text-[19px]">
                Every order ships with The Field Manual — a printed, illustrated
                guide to the movements. Where to start, how to work each area, the
                order of the strokes, drawn from sports and deep-tissue massage.
                The technique, laid out step by step, so the ritual runs the same
                every time. Free, in the box, with every SCULPT.
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="mt-7 flex flex-wrap gap-2">
                {["Printed & illustrated", "Step-by-step", "By hand or with tools", "Included free"].map(
                  (b) => (
                    <span
                      key={b}
                      className="caps inline-flex items-center gap-2 rounded-xs border px-3 py-2 text-[10.5px] font-semibold text-ink-0"
                      style={{ borderColor: "var(--hair-strong)" }}
                    >
                      <span className="h-1 w-1 rounded-full" style={{ background: "var(--ember)" }} />
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
