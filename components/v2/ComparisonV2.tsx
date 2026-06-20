"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/Eyebrow";

type Cell = "yes" | "part" | "no";

const ROWS: { label: string; gyno: Cell; cold: Cell; none: Cell }[] = [
  { label: "Cooling on contact", gyno: "yes", cold: "yes", none: "no" },
  { label: "Firmer-looking finish", gyno: "yes", cold: "part", none: "no" },
  { label: "Holds up to an hour", gyno: "yes", cold: "no", none: "no" },
  { label: "Pocket-size, no mess", gyno: "yes", cold: "no", none: "no" },
  { label: "Matte, undetectable", gyno: "yes", cold: "no", none: "no" },
  { label: "Made in the UK", gyno: "yes", cold: "no", none: "no" },
];

// minmax(0,…) keeps every column to its share regardless of label length,
// so rows stay perfectly aligned down to a 390px viewport.
const COLS =
  "grid grid-cols-[minmax(0,1.5fr)_minmax(0,0.95fr)_minmax(0,0.95fr)_minmax(0,0.95fr)]";

const EASE = [0.2, 0, 0, 1] as const;

function Mark({ v, on = false, show }: { v: Cell; on?: boolean; show: boolean }) {
  const label = v === "yes" ? "yes" : v === "part" ? "partial" : "no";
  const glyph = v === "yes" ? "●" : v === "part" ? "◐" : "—";
  const color =
    v === "yes"
      ? on
        ? "text-paper-0"
        : "text-ink-0"
      : v === "part"
        ? on
          ? "text-paper-0/55"
          : "text-ink-3"
        : on
          ? "text-paper-0/35"
          : "text-ink-3";

  return (
    <motion.span
      aria-label={label}
      className={color}
      initial={show ? { opacity: 0, scale: 0.6 } : false}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.34, ease: EASE }}
    >
      {glyph}
    </motion.span>
  );
}

export function ComparisonV2() {
  const reduce = useReducedMotion();
  const animateMarks = !reduce;

  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHead n="—" title="Why GY-NO!" />

        <div
          className="relative overflow-hidden rounded-sm border"
          style={{ borderColor: "var(--hair-strong)" }}
        >
          {/* Dominant ink column — a single filled band behind the GY-NO! cells,
              spanning header through last row. Pointer-events off so it's purely
              visual; the grid cells sit above it. */}
          <div className={`pointer-events-none absolute inset-0 ${COLS}`} aria-hidden>
            <div />
            <div className="bg-ink-0" />
            <div />
            <div />
          </div>

          {/* header */}
          <div className={`relative ${COLS}`}>
            <div className="px-3 py-4 sm:px-5 sm:py-5" />
            <div className="flex flex-col items-center justify-center gap-1 px-1 py-4 text-center sm:py-5">
              <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-paper-0 sm:text-[13px] sm:tracking-caps">
                GY-NO!
              </span>
              <span className="h-px w-5 bg-paper-0/40" />
            </div>
            <div className="flex items-center justify-center px-1 py-4 text-center sm:py-5">
              <span className="text-[9.5px] font-semibold uppercase leading-tight tracking-[0.06em] text-ink-2 sm:text-[11px]">
                The Cold Trick
              </span>
            </div>
            <div className="flex items-center justify-center px-1 py-4 text-center sm:py-5">
              <span className="text-[9.5px] font-semibold uppercase leading-tight tracking-[0.06em] text-ink-2 sm:text-[11px]">
                Nothing
              </span>
            </div>
          </div>

          {/* rows */}
          {ROWS.map((r, i) => (
            <motion.div
              key={r.label}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.05, ease: EASE }}
              className={`relative ${COLS}`}
              style={{ borderTop: "1px solid var(--hair)" }}
            >
              <div className="flex items-center px-3 py-4 sm:px-5 sm:py-5">
                <span className="text-[11px] font-semibold uppercase leading-tight tracking-[0.05em] text-ink-1 sm:text-[13px] sm:tracking-[0.1em]">
                  {r.label}
                </span>
              </div>
              {/* GY-NO! cell — hairline divider inside the ink band */}
              <div
                className="flex items-center justify-center py-4 text-[16px] sm:py-5"
                style={{ borderTop: "1px solid rgba(255,255,255,0.10)" }}
              >
                <Mark v={r.gyno} on show={animateMarks} />
              </div>
              <div className="flex items-center justify-center py-4 text-[16px] sm:py-5">
                <Mark v={r.cold} show={animateMarks} />
              </div>
              <div className="flex items-center justify-center py-4 text-[16px] sm:py-5">
                <Mark v={r.none} show={animateMarks} />
              </div>
            </motion.div>
          ))}
        </div>

        <p className="mt-4 caps text-[10px] font-medium text-ink-3">
          Describes feel &amp; finish. A cosmetic — temporary by design.
        </p>
      </Container>
    </section>
  );
}
