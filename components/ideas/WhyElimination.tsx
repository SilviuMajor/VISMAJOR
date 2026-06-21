"use client";

/**
 * WhyElimination — a theatrical, scroll-driven process of elimination.
 *
 * As the section scrolls through, rows reveal one at a time. For each row,
 * GY-NO!'s mark draws in (an SVG check that strokes on), while any alternative
 * that FAILS gets a hairline strike-through that wipes across (scaleX 0→1) and
 * the cell greys out. Partial counts as "not a win" — also struck. By the end,
 * the two pretenders' column headers recede (fade + desaturate) and the GY-NO!
 * column is left standing alone, lifted on a hairline-soft shadow.
 *
 * Honors prefers-reduced-motion: everything renders in its resolved state with
 * no scroll dependence.
 */

import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
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

// Shared minmax template — keeps the three result columns to an equal share so
// every row stays aligned at any width. Reused by header + each row.
const COLS =
  "grid grid-cols-[minmax(0,1.45fr)_minmax(0,0.9fr)_minmax(0,0.9fr)_minmax(0,0.9fr)]";

const EASE = [0.2, 0, 0, 1] as const;

/* Subscribe to a MotionValue<number> and expose a React boolean "past threshold". */
function useThreshold(mv: MotionValue<number>, t = 0.5) {
  const [on, setOn] = useState(() => mv.get() >= t);
  useMotionValueEvent(mv, "change", (v) => {
    const next = v >= t;
    setOn((prev) => (prev === next ? prev : next));
  });
  return on;
}

/* GY-NO!'s affirmative — an SVG check that draws itself on the dark cell. */
function DrawCheck({ play }: { play: boolean }) {
  const reduce = useReducedMotion();
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" role="img" aria-label="yes">
      <motion.path
        d="M4.5 12.5 L10 18 L19.5 6.5"
        fill="none"
        stroke="var(--paper-0)"
        strokeWidth={2.4}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduce ? false : { pathLength: 0 }}
        animate={play || reduce ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 0.5, ease: EASE, delay: 0.12 }}
      />
    </svg>
  );
}

/* A failing / partial alternative — glyph greys out, hairline wipes across it. */
function StruckCell({ v, play }: { v: Cell; play: boolean }) {
  const reduce = useReducedMotion();
  const fails = v !== "yes"; // partial is "not a win" → struck + greyed
  const glyph = v === "yes" ? "●" : v === "part" ? "◐" : "—";
  const settled = play || reduce;

  return (
    <div className="relative flex items-center justify-center">
      <motion.span
        className="text-[16px] leading-none"
        initial={reduce ? false : { opacity: 0 }}
        animate={{
          opacity: settled ? (fails ? 0.32 : 1) : 0,
          color: fails ? "var(--ink-3)" : "var(--ink-0)",
        }}
        transition={{ duration: 0.4, ease: EASE }}
      >
        {glyph}
      </motion.span>

      {fails && (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-px w-[44%]"
          style={{ backgroundColor: "var(--hair-strong)", originX: 0 }}
          initial={reduce ? { x: "-50%", y: "-50%", scaleX: 1 } : { x: "-50%", y: "-50%", scaleX: 0 }}
          animate={{ scaleX: settled ? 1 : 0 }}
          transition={{ duration: 0.42, ease: EASE, delay: 0.18 }}
        />
      )}
    </div>
  );
}

function Row({
  row,
  index,
  total,
  progress,
}: {
  row: (typeof ROWS)[number];
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const reduce = useReducedMotion();

  // Each row owns a slice of the scrolled range, so reveals cascade top→bottom.
  const start = 0.06 + (index / total) * 0.66;
  const end = start + 0.13;
  const local = useTransform(progress, [start, end], [0, 1], { clamp: true });
  const rowOpacity = useTransform(local, [0, 1], [0.16, 1]);
  const rowY = useTransform(local, [0, 1], [12, 0]);

  // One subscription per row drives every cell's draw/strike on/off.
  const play = useThreshold(local, 0.5);

  return (
    <motion.div
      className={`${COLS} border-t`}
      style={
        reduce
          ? { borderColor: "var(--hair)" }
          : { borderColor: "var(--hair)", opacity: rowOpacity, y: rowY }
      }
    >
      <div className="flex items-center px-3 py-4 sm:px-5 sm:py-[18px]">
        <span className="text-[11px] font-semibold uppercase leading-tight tracking-[0.05em] text-ink-1 sm:text-[12.5px] sm:tracking-[0.1em]">
          {row.label}
        </span>
      </div>

      <div className="flex items-center justify-center bg-ink-0 py-4 sm:py-[18px]">
        <DrawCheck play={play} />
      </div>

      <div className="flex items-center justify-center py-4 sm:py-[18px]">
        <StruckCell v={row.cold} play={play} />
      </div>

      <div className="flex items-center justify-center py-4 sm:py-[18px]">
        <StruckCell v={row.none} play={play} />
      </div>
    </motion.div>
  );
}

export function WhyElimination() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.55"],
  });

  // Once the rows are decided (~0.8 of the range), the pretenders recede and the
  // GY-NO! column is emphasised.
  const verdict = useTransform(scrollYProgress, [0.8, 0.96], [0, 1], { clamp: true });
  const pretenderOpacity = useTransform(verdict, [0, 1], [1, 0.34]);
  const pretenderFilter = useTransform(verdict, [0, 1], [
    "saturate(1) contrast(1)",
    "saturate(0) contrast(0.9)",
  ]);
  const gynoGlow = useTransform(verdict, [0, 1], [
    "0 0 0 0 rgba(20,19,15,0)",
    "0 24px 48px -28px rgba(20,19,15,0.5)",
  ]);

  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHead n="—" title="Why GY-NO!" />

        <p className="mb-8 max-w-[46ch] text-[14px] leading-relaxed text-ink-2">
          One by one, the pretenders fall away. Scroll, and watch what is left
          standing.
        </p>

        <div ref={ref}>
          <div
            className="overflow-hidden border"
            style={{ borderColor: "var(--hair-strong)" }}
          >
            {/* header */}
            <div className={COLS}>
              <div className="px-3 py-4 sm:px-5 sm:py-5" />

              <motion.div
                className="relative flex items-center justify-center bg-ink-0 px-1 py-4 text-center text-paper-0 sm:py-5"
                style={reduce ? undefined : { boxShadow: gynoGlow, zIndex: 2 }}
              >
                <span className="text-[11px] font-bold uppercase tracking-[0.08em] sm:text-[13px] sm:tracking-caps">
                  GY-NO!
                </span>
              </motion.div>

              <motion.div
                className="flex items-center justify-center px-1 py-4 text-center sm:py-5"
                style={reduce ? undefined : { opacity: pretenderOpacity, filter: pretenderFilter }}
              >
                <span className="text-[9.5px] font-semibold uppercase leading-tight tracking-[0.06em] text-ink-2 sm:text-[11px]">
                  The Cold Trick
                </span>
              </motion.div>

              <motion.div
                className="flex items-center justify-center px-1 py-4 text-center sm:py-5"
                style={reduce ? undefined : { opacity: pretenderOpacity, filter: pretenderFilter }}
              >
                <span className="text-[9.5px] font-semibold uppercase leading-tight tracking-[0.06em] text-ink-2 sm:text-[11px]">
                  Nothing
                </span>
              </motion.div>
            </div>

            {/* rows */}
            {ROWS.map((r, i) => (
              <Row
                key={r.label}
                row={r}
                index={i}
                total={ROWS.length}
                progress={scrollYProgress}
              />
            ))}
          </div>

          {/* verdict line — fades up once the column stands alone */}
          <motion.div
            className="mt-5 flex items-center gap-3"
            style={reduce ? undefined : { opacity: verdict }}
          >
            <span className="h-px w-7 bg-[var(--hair-strong)]" />
            <span className="caps text-[10.5px] font-semibold text-ink-1">
              Last one standing — GY-NO!
            </span>
          </motion.div>
        </div>

        <p className="mt-4 caps text-[10px] font-medium text-ink-3">
          Describes feel &amp; finish. A cosmetic — temporary by design.
        </p>
      </Container>
    </section>
  );
}
