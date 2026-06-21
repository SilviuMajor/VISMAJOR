"use client";

/**
 * WhyScorecard — an animated scorecard / data-instrument.
 *
 * Each attribute is a row of three thin horizontal "fill" bars. GY-NO! fills
 * full (ink-0), The Cold Trick fills partial/empty (faint), Nothing stays
 * empty. Bars animate their width in on scroll (whileInView). A single
 * steel-blue tick marks each row GY-NO! decisively wins. A running tally counts
 * up to "GY-NO! · 6/6" once the card is in view.
 *
 * Aligned with a shared minmax grid; readable at 390px. Honors reduced-motion.
 */

import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/Eyebrow";

type Score = 0 | 0.5 | 1;

const ROWS: { label: string; gyno: Score; cold: Score; none: Score }[] = [
  { label: "Cooling on contact", gyno: 1, cold: 1, none: 0 },
  { label: "Firmer-looking finish", gyno: 1, cold: 0.5, none: 0 },
  { label: "Holds up to an hour", gyno: 1, cold: 0, none: 0 },
  { label: "Pocket-size, no mess", gyno: 1, cold: 0, none: 0 },
  { label: "Matte, undetectable", gyno: 1, cold: 0, none: 0 },
  { label: "Made in the UK", gyno: 1, cold: 0, none: 0 },
];

const TOTAL = ROWS.length;

// One shared template, minmax(0,…) so the label never pushes columns out of
// alignment between rows. Columns: label · GY-NO! · Cold · Nothing.
const COLS =
  "grid grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] gap-x-3 sm:gap-x-5";

const EASE = [0.2, 0, 0, 1] as const;

/* A single fill bar. `tone` selects the data-instrument weight. */
function Bar({
  value,
  tone,
  delay,
  inView,
}: {
  value: Score;
  tone: "primary" | "faint";
  delay: number;
  inView: boolean;
}) {
  const reduce = useReducedMotion();
  const pct = value * 100;
  const fill =
    tone === "primary" ? "var(--ink-0)" : "var(--ink-3)";
  const target = reduce ? pct : inView ? pct : 0;

  return (
    <div className="flex items-center">
      <div
        className="relative h-[7px] w-full overflow-hidden rounded-xs"
        style={{ backgroundColor: "var(--paper-1)", boxShadow: "inset 0 0 0 1px var(--hair)" }}
        role="meter"
        aria-valuemin={0}
        aria-valuemax={1}
        aria-valuenow={value}
      >
        <motion.span
          className="absolute inset-y-0 left-0 rounded-xs"
          style={{ backgroundColor: fill }}
          initial={reduce ? false : { width: 0 }}
          animate={{ width: `${target}%` }}
          transition={{ duration: 0.7, ease: EASE, delay }}
        />
        {/* tick notches at thirds — instrument detail, sits above the fill */}
        <span className="pointer-events-none absolute inset-0 flex justify-between">
          <i className="block w-px" />
          <i className="block w-px" style={{ backgroundColor: "var(--hair)" }} />
          <i className="block w-px" style={{ backgroundColor: "var(--hair)" }} />
          <i className="block w-px" />
        </span>
      </div>
    </div>
  );
}

/* Counts a number up to `to` once in view; respects reduced-motion. */
function Tally({ to, inView }: { to: number; inView: boolean }) {
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? to : 0);

  useEffect(() => {
    if (!inView || reduce) {
      if (reduce) setN(to);
      return;
    }
    const controls = animate(0, to, {
      duration: 1.1,
      ease: EASE,
      delay: 0.35,
      onUpdate: (v) => setN(v),
    });
    return () => controls.stop();
  }, [inView, reduce, to]);

  return <span>{Math.round(n)}</span>;
}

export function WhyScorecard() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  // once:true so the count + bars settle and stay; generous margin to trigger
  // a touch before fully on-screen.
  const inView = useInView(ref, { once: true, margin: "-12% 0px -12% 0px" });

  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHead n="—" title="Why GY-NO!" />

        <p className="mb-8 max-w-[46ch] text-[14px] leading-relaxed text-ink-2">
          Six measures of feel &amp; finish, read off the same instrument.
        </p>

        <div
          ref={ref}
          className="border p-4 sm:p-6"
          style={{ borderColor: "var(--hair-strong)" }}
        >
          {/* column legend */}
          <div className={`${COLS} pb-3`}>
            <span className="caps text-[9.5px] font-semibold text-ink-3">
              Measure
            </span>
            <span className="caps text-[9.5px] font-bold text-ink-0">GY-NO!</span>
            <span className="caps text-[9.5px] font-semibold text-ink-3">
              Cold Trick
            </span>
            <span className="caps text-[9.5px] font-semibold text-ink-3">
              Nothing
            </span>
          </div>

          {/* rows */}
          <div className="border-t" style={{ borderColor: "var(--hair)" }}>
            {ROWS.map((r, i) => {
              const delay = 0.1 + i * 0.07;
              return (
                <div
                  key={r.label}
                  className={`${COLS} items-center border-b py-3.5`}
                  style={{ borderColor: "var(--hair)" }}
                >
                  <div className="flex items-center gap-1.5 pr-2">
                    <span className="text-[11px] font-semibold uppercase leading-tight tracking-[0.04em] text-ink-1 sm:text-[12px] sm:tracking-[0.08em]">
                      {r.label}
                    </span>
                    {/* steel-blue tick where GY-NO! decisively wins (others < full) */}
                    {r.gyno === 1 && r.cold < 1 && (
                      <motion.svg
                        viewBox="0 0 16 16"
                        className="h-3 w-3 shrink-0"
                        aria-hidden
                        initial={reduce ? false : { opacity: 0, scale: 0.6 }}
                        animate={inView || reduce ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.35, ease: EASE, delay: delay + 0.5 }}
                      >
                        <path
                          d="M3 8.5 L6.5 12 L13 4"
                          fill="none"
                          stroke="var(--steel-blue, rgba(55,138,221,1))"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </motion.svg>
                    )}
                  </div>

                  <Bar value={r.gyno} tone="primary" delay={delay} inView={inView} />
                  <Bar value={r.cold} tone="faint" delay={delay + 0.05} inView={inView} />
                  <Bar value={r.none} tone="faint" delay={delay + 0.1} inView={inView} />
                </div>
              );
            })}
          </div>

          {/* tally footer */}
          <div className={`${COLS} items-center pt-4`}>
            <span className="caps text-[10px] font-semibold text-ink-3">
              Final
            </span>
            <div className="col-span-3 flex items-baseline gap-2">
              <span className="text-[11px] font-bold uppercase tracking-caps text-ink-0">
                GY-NO!
              </span>
              <span className="text-ink-3">·</span>
              <span
                className="font-bold tabular-nums text-ink-0"
                style={{ fontSize: "clamp(20px, 3vw, 28px)", letterSpacing: "-0.02em" }}
              >
                <Tally to={TOTAL} inView={inView} />
                <span className="text-ink-3">/{TOTAL}</span>
              </span>
              <span className="ml-auto hidden text-[10px] font-medium text-ink-3 sm:block">
                Cold Trick · 1.5/{TOTAL} &nbsp;·&nbsp; Nothing · 0/{TOTAL}
              </span>
            </div>
          </div>
          {/* mobile tally for the also-rans (legend row is too tight at 390px) */}
          <p className="mt-1 text-[10px] font-medium text-ink-3 sm:hidden">
            Cold Trick · 1.5/{TOTAL} &nbsp;·&nbsp; Nothing · 0/{TOTAL}
          </p>
        </div>

        <p className="mt-4 caps text-[10px] font-medium text-ink-3">
          Describes feel &amp; finish. A cosmetic — temporary by design.
        </p>
      </Container>
    </section>
  );
}
