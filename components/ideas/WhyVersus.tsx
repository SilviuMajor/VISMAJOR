"use client";

/**
 * WhyVersus — interactive head-to-head.
 *
 * A segmented toggle picks the opponent: "The Cold Trick" or "Doing Nothing".
 * GY-NO! is always on the left; the chosen opponent on the right. When the user
 * switches opponent, each opponent mark flips via AnimatePresence (✓ / ◐ / —)
 * and the per-row verdict updates. GY-NO! is always shown winning, with a
 * "GY-NO! wins" tally that recomputes per opponent.
 *
 * Two-column head-to-head — works cleanly at 390px. Honors reduced-motion.
 */

import { useState } from "react";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
} from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/Eyebrow";

type Mark = "yes" | "part" | "no";
type Opp = "cold" | "none";

const ROWS: { label: string; gyno: Mark; cold: Mark; none: Mark }[] = [
  { label: "Cooling on contact", gyno: "yes", cold: "yes", none: "no" },
  { label: "Firmer-looking finish", gyno: "yes", cold: "part", none: "no" },
  { label: "Holds up to an hour", gyno: "yes", cold: "no", none: "no" },
  { label: "Pocket-size, no mess", gyno: "yes", cold: "no", none: "no" },
  { label: "Matte, undetectable", gyno: "yes", cold: "no", none: "no" },
  { label: "Made in the UK", gyno: "yes", cold: "no", none: "no" },
];

const OPP_LABEL: Record<Opp, string> = {
  cold: "The Cold Trick",
  none: "Doing Nothing",
};

// Shared minmax template so the two contender columns stay equal and aligned
// across every row, even when the label wraps. Columns: label · GY-NO! · opp.
const COLS =
  "grid grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)_minmax(0,1fr)] gap-x-2 sm:gap-x-4";

const EASE = [0.2, 0, 0, 1] as const;

const rank: Record<Mark, number> = { yes: 2, part: 1, no: 0 };

/* Glyph for a mark. GY-NO!'s win-mark is a drawn check; opponents use ✓/◐/—. */
function Glyph({ v, strong }: { v: Mark; strong: boolean }) {
  const color = strong
    ? "var(--ink-0)"
    : v === "no"
      ? "var(--ink-3)"
      : "var(--ink-2)";

  if (v === "yes") {
    return (
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" role="img" aria-label="yes">
        <path
          d="M4.5 12.5 L10 18 L19.5 6.5"
          fill="none"
          stroke={color}
          strokeWidth={2.4}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return (
    <span
      className="text-[17px] leading-none"
      style={{ color }}
      aria-label={v === "part" ? "partial" : "no"}
    >
      {v === "part" ? "◐" : "—"}
    </span>
  );
}

/* Opponent cell — flips its mark when the opponent changes. */
function OppCell({ v, opp }: { v: Mark; opp: Opp }) {
  const reduce = useReducedMotion();
  if (reduce) {
    return (
      <div className="flex h-[18px] items-center justify-center">
        <Glyph v={v} strong={false} />
      </div>
    );
  }
  return (
    <div className="flex h-[18px] items-center justify-center">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={`${opp}-${v}`}
          initial={{ opacity: 0, rotateX: -75, y: 4 }}
          animate={{ opacity: 1, rotateX: 0, y: 0 }}
          exit={{ opacity: 0, rotateX: 75, y: -4 }}
          transition={{ duration: 0.28, ease: EASE }}
          style={{ transformPerspective: 400 }}
        >
          <Glyph v={v} strong={false} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* Per-row verdict pill. GY-NO! always wins; copy adapts to the gap. */
function Verdict({ gyno, opp }: { gyno: Mark; opp: Mark }) {
  const gap = rank[gyno] - rank[opp];
  const text = gap >= 2 ? "Clear win" : "GY-NO!";
  return (
    <span
      className="caps inline-flex items-center rounded-xs px-1.5 py-0.5 text-[8.5px] font-bold"
      style={{
        color: "var(--paper-0)",
        backgroundColor: "var(--ink-0)",
      }}
    >
      {text}
    </span>
  );
}

function Segmented({
  value,
  onChange,
}: {
  value: Opp;
  onChange: (o: Opp) => void;
}) {
  const reduce = useReducedMotion();
  const opts: Opp[] = ["cold", "none"];
  return (
    <div
      className="relative inline-grid grid-cols-2 rounded-sm p-0.5"
      style={{ boxShadow: "inset 0 0 0 1px var(--hair-strong)" }}
      role="tablist"
      aria-label="Choose opponent"
    >
      {opts.map((o) => {
        const active = value === o;
        return (
          <button
            key={o}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(o)}
            className="relative z-10 px-3 py-1.5 text-center sm:px-4"
          >
            {active && (
              <motion.span
                layoutId={reduce ? undefined : "vs-seg"}
                className="absolute inset-0 -z-10 rounded-xs"
                style={{ backgroundColor: "var(--ink-0)" }}
                transition={{ duration: 0.3, ease: EASE }}
              />
            )}
            <span
              className={`caps text-[9.5px] font-semibold transition-colors duration-200 sm:text-[10.5px] ${
                active ? "text-paper-0" : "text-ink-2"
              }`}
            >
              {OPP_LABEL[o]}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function WhyVersus() {
  const reduce = useReducedMotion();
  const [opp, setOpp] = useState<Opp>("cold");

  const wins = ROWS.filter((r) => rank[r.gyno] > rank[r[opp]]).length;
  const ties = ROWS.filter((r) => rank[r.gyno] === rank[r[opp]]).length;

  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHead n="—" title="Why GY-NO!" />

        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-[42ch] text-[14px] leading-relaxed text-ink-2">
            Pick a challenger. We will take it on, point for point.
          </p>
          <Segmented value={opp} onChange={setOpp} />
        </div>

        <LayoutGroup>
          <div
            className="overflow-hidden border"
            style={{ borderColor: "var(--hair-strong)" }}
          >
            {/* contender header */}
            <div className={`${COLS} px-3 sm:px-5`}>
              <div className="py-4" />
              <div className="flex items-center justify-center py-3">
                <span className="rounded-xs bg-ink-0 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.08em] text-paper-0 sm:text-[13px] sm:tracking-caps">
                  GY-NO!
                </span>
              </div>
              <div className="flex items-center justify-center py-3 text-center">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={opp}
                    initial={reduce ? false : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0, y: -6 }}
                    transition={{ duration: 0.26, ease: EASE }}
                    className="text-[9.5px] font-semibold uppercase leading-tight tracking-[0.06em] text-ink-2 sm:text-[11px]"
                  >
                    {OPP_LABEL[opp]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>

            {/* rows */}
            {ROWS.map((r) => (
              <div
                key={r.label}
                className={`${COLS} items-center border-t px-3 sm:px-5`}
                style={{ borderColor: "var(--hair)" }}
              >
                <div className="py-4 pr-1">
                  <span className="text-[11px] font-semibold uppercase leading-tight tracking-[0.04em] text-ink-1 sm:text-[12.5px] sm:tracking-[0.09em]">
                    {r.label}
                  </span>
                  {/* per-row verdict, on its own line so it never collides with the label */}
                  <span className="mt-1.5 block">
                    <Verdict gyno={r.gyno} opp={r[opp]} />
                  </span>
                </div>

                <div className="flex items-center justify-center bg-paper-1 py-4">
                  <Glyph v={r.gyno} strong />
                </div>

                <div className="flex items-center justify-center py-4">
                  <OppCell v={r[opp]} opp={opp} />
                </div>
              </div>
            ))}

            {/* tally footer */}
            <div
              className={`${COLS} items-center border-t bg-paper-1 px-3 sm:px-5`}
              style={{ borderColor: "var(--hair-strong)" }}
            >
              <div className="py-4">
                <span className="caps text-[9.5px] font-semibold text-ink-3">
                  Result
                </span>
              </div>
              <div className="col-span-2 flex items-baseline gap-2 py-4">
                <span className="text-[11px] font-bold uppercase tracking-caps text-ink-0">
                  GY-NO! wins
                </span>
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={`${opp}-${wins}`}
                    initial={reduce ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0, y: -8 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="font-bold tabular-nums text-ink-0"
                    style={{ fontSize: "clamp(20px, 3vw, 28px)", letterSpacing: "-0.02em" }}
                  >
                    {wins}
                    <span className="text-ink-3">/{ROWS.length}</span>
                  </motion.span>
                </AnimatePresence>
                {ties > 0 && (
                  <span className="ml-1 text-[10px] font-medium text-ink-3">
                    {ties} drawn
                  </span>
                )}
              </div>
            </div>
          </div>
        </LayoutGroup>

        <p className="mt-4 caps text-[10px] font-medium text-ink-3">
          Describes feel &amp; finish. A cosmetic — temporary by design.
        </p>
      </Container>
    </section>
  );
}
