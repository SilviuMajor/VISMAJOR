"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useReducedMotion,
} from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/Eyebrow";

const STEEL = "rgba(55,138,221,1)";
const AUTO_MS = 4000;

const STEPS = [
  {
    n: "01",
    title: "Apply",
    body: "A thin layer to clean, dry skin.",
    meta: "Thin, even film",
  },
  {
    n: "02",
    title: "Wait",
    body: "Cooling and tightening within minutes.",
    meta: "Cooling onset",
  },
  {
    n: "03",
    title: "Step Out",
    body: "Up to one hour of temporary firmness. Reapply as needed.",
    meta: "Set finish",
  },
];

const EASE = [0.2, 0, 0, 1] as const;

export function HowItWorksStepper() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [engaged, setEngaged] = useState(false); // user took control
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto-advance until the user interacts.
  useEffect(() => {
    if (engaged || reduce) return;
    timer.current = setInterval(() => {
      setActive((a) => (a + 1) % STEPS.length);
    }, AUTO_MS);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [engaged, reduce]);

  const pick = (i: number) => {
    setEngaged(true);
    setActive(i);
  };

  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHead n="02" title="How it works." />

        <div
          className="overflow-hidden border bg-paper-2"
          style={{ borderColor: "var(--hair)" }}
        >
          {/* Tab rail */}
          <div
            className="grid grid-cols-3 border-b"
            style={{ borderColor: "var(--hair)" }}
            role="tablist"
            aria-label="How it works steps"
          >
            {STEPS.map((s, i) => {
              const on = i === active;
              return (
                <button
                  key={s.n}
                  role="tab"
                  aria-selected={on}
                  onClick={() => pick(i)}
                  className={`group relative flex items-center justify-center gap-2.5 px-3 py-4 outline-none transition-colors md:gap-3 md:py-5 ${
                    i !== 0 ? "border-l" : ""
                  }`}
                  style={{ borderColor: "var(--hair)" }}
                >
                  <span
                    className={`text-[12px] font-semibold tabular-nums transition-colors ${
                      on ? "text-ink-0" : "text-ink-3 group-hover:text-ink-2"
                    }`}
                  >
                    {s.n}
                  </span>
                  <span
                    className={`caps text-[10px] font-semibold transition-colors md:text-[11px] ${
                      on ? "text-ink-0" : "text-ink-3 group-hover:text-ink-2"
                    }`}
                  >
                    {s.title}
                  </span>
                  {/* active ink underline */}
                  {on && (
                    <motion.span
                      layoutId="stepper-underline"
                      className="absolute inset-x-0 bottom-0 h-[2px] bg-ink-0"
                      transition={{ duration: 0.4, ease: EASE }}
                    />
                  )}
                  {/* auto-advance progress hairline */}
                  {on && !engaged && !reduce && (
                    <motion.span
                      key={`prog-${active}`}
                      className="absolute inset-x-0 bottom-0 h-[2px] origin-left"
                      style={{ background: "var(--hair-strong)" }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: AUTO_MS / 1000, ease: "linear" }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Panel */}
          <div className="grid grid-cols-1 md:grid-cols-[5fr_4fr]">
            {/* Diagram stage */}
            <div
              className="relative flex aspect-[5/4] items-center justify-center border-b p-6 md:aspect-auto md:min-h-[380px] md:border-b-0 md:border-r"
              style={{ borderColor: "var(--hair)" }}
            >
              {/* corner register marks */}
              <Corners />
              <span className="absolute left-5 top-4 caps text-[9px] font-medium text-ink-3">
                Fig. {STEPS[active].n}
              </span>
              <div className="absolute right-5 top-4 h-3 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={STEPS[active].meta}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.3 }}
                    className="caps block text-[9px] font-medium text-ink-2"
                  >
                    {STEPS[active].meta}
                  </motion.span>
                </AnimatePresence>
              </div>

              <div className="relative h-[200px] w-[200px] md:h-[240px] md:w-[240px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                  >
                    {active === 0 && <DiagramApply reduce={!!reduce} />}
                    {active === 1 && <DiagramWait reduce={!!reduce} />}
                    {active === 2 && <DiagramStepOut reduce={!!reduce} />}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Copy */}
            <div className="flex flex-col justify-center p-7 md:p-9">
              <div className="relative min-h-[150px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? { opacity: 0 } : { opacity: 0, y: -14 }}
                    transition={{ duration: 0.38, ease: EASE }}
                  >
                    <span
                      className="block font-light leading-none text-ink-3"
                      style={{
                        fontSize: "clamp(36px, 4.5vw, 56px)",
                        letterSpacing: "-0.04em",
                      }}
                      aria-hidden
                    >
                      {STEPS[active].n}
                    </span>
                    <h4
                      className="mt-3 font-bold uppercase text-ink-0"
                      style={{
                        fontSize: "clamp(24px, 3vw, 34px)",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {STEPS[active].title}
                    </h4>
                    <p className="mt-3.5 max-w-[32ch] text-[16.5px] leading-[1.6] text-ink-2">
                      {STEPS[active].body}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* step ledger */}
              <div
                className="mt-8 flex items-center gap-4 border-t pt-5"
                style={{ borderColor: "var(--hair)" }}
              >
                {STEPS.map((s, i) => (
                  <button
                    key={s.n}
                    onClick={() => pick(i)}
                    aria-label={`Step ${s.n} ${s.title}`}
                    className="flex items-center gap-2"
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                        i === active
                          ? "scale-100 bg-ink-0"
                          : "scale-75 bg-ink-3"
                      }`}
                    />
                  </button>
                ))}
                <span className="ml-auto caps text-[9px] font-medium text-ink-3">
                  {engaged ? "Manual" : "Auto"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ----------------------------- Diagrams ----------------------------- */

const drawPath = (reduce: boolean, duration: number, delay = 0) =>
  reduce
    ? { initial: { pathLength: 1 }, animate: { pathLength: 1 } }
    : {
        initial: { pathLength: 0 },
        animate: { pathLength: 1 },
        transition: { duration, delay, ease: EASE },
      };

/* 01 — APPLY: a brush/stroke path that draws on across the field. */
function DiagramApply({ reduce }: { reduce: boolean }) {
  return (
    <svg viewBox="0 0 120 120" className="h-full w-full" aria-hidden>
      {/* surface baseline */}
      <line
        x1={16}
        y1={88}
        x2={104}
        y2={88}
        stroke="var(--hair-strong)"
        strokeWidth={0.6}
      />
      {/* faint guide of the full stroke */}
      <path
        d="M20 70 C 36 58, 50 58, 60 62 S 86 70, 100 56"
        fill="none"
        stroke="var(--hair)"
        strokeWidth={6}
        strokeLinecap="round"
      />
      {/* drawn-on layer (the applied film) */}
      <motion.path
        d="M20 70 C 36 58, 50 58, 60 62 S 86 70, 100 56"
        fill="none"
        stroke="var(--ink-0)"
        strokeWidth={6}
        strokeLinecap="round"
        {...drawPath(reduce, 1.5)}
      />
      {/* applicator nib travelling the stroke */}
      {!reduce && (
        <motion.g
          initial={{ offsetDistance: "0%", opacity: 0 }}
          animate={{ offsetDistance: "100%", opacity: [0, 1, 1, 0] }}
          transition={{ duration: 1.5, ease: EASE }}
          style={{
            offsetPath:
              "path('M20 70 C 36 58, 50 58, 60 62 S 86 70, 100 56')",
          }}
        >
          <circle r={2.4} fill="var(--ink-0)" />
        </motion.g>
      )}
      {/* thin/even callout */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reduce ? 0 : 1.4, duration: 0.4 }}
      >
        <line
          x1={20}
          y1={102}
          x2={100}
          y2={102}
          stroke="var(--ink-3)"
          strokeWidth={0.5}
        />
        <line x1={20} y1={99} x2={20} y2={105} stroke="var(--ink-3)" strokeWidth={0.5} />
        <line x1={100} y1={99} x2={100} y2={105} stroke="var(--ink-3)" strokeWidth={0.5} />
      </motion.g>
    </svg>
  );
}

/* 02 — WAIT: frost line-rays radiate, a gauge needle eases down, minutes count up. */
function DiagramWait({ reduce }: { reduce: boolean }) {
  const [mins, setMins] = useState(reduce ? 3 : 0);

  useEffect(() => {
    if (reduce) return;
    const controls = animate(0, 3, {
      duration: 1.6,
      delay: 0.3,
      ease: EASE,
      onUpdate: (v) => setMins(Math.round(v)),
    });
    return () => controls.stop();
  }, [reduce]);

  // 8 frost rays.
  const rays = Array.from({ length: 8 }).map((_, i) => {
    const a = (i / 8) * Math.PI * 2;
    return { x: Math.cos(a), y: Math.sin(a), i };
  });

  return (
    <svg viewBox="0 0 120 120" className="h-full w-full" aria-hidden>
      {/* radiating frost rays from centre */}
      <g>
        {rays.map(({ x, y, i }) => {
          const cx = 60;
          const cy = 50;
          const inner = 8;
          const outer = 30;
          return (
            <motion.g key={i}>
              <motion.line
                x1={cx + x * inner}
                y1={cy + y * inner}
                x2={cx + x * outer}
                y2={cy + y * outer}
                stroke={STEEL}
                strokeWidth={1}
                strokeLinecap="round"
                {...drawPath(reduce, 0.5, 0.2 + i * 0.05)}
              />
              {/* tiny frost barbs */}
              <motion.line
                x1={cx + x * (outer - 8)}
                y1={cy + y * (outer - 8)}
                x2={cx + x * (outer - 8) - y * 4}
                y2={cy + y * (outer - 8) + x * 4}
                stroke={STEEL}
                strokeWidth={0.8}
                strokeLinecap="round"
                {...drawPath(reduce, 0.3, 0.45 + i * 0.05)}
              />
              <motion.line
                x1={cx + x * (outer - 8)}
                y1={cy + y * (outer - 8)}
                x2={cx + x * (outer - 8) + y * 4}
                y2={cy + y * (outer - 8) - x * 4}
                stroke={STEEL}
                strokeWidth={0.8}
                strokeLinecap="round"
                {...drawPath(reduce, 0.3, 0.45 + i * 0.05)}
              />
            </motion.g>
          );
        })}
        <circle cx={60} cy={50} r={2.4} fill={STEEL} />
      </g>

      {/* semicircular gauge */}
      <g transform="translate(60 96)">
        <path
          d="M-30 0 A 30 30 0 0 1 30 0"
          fill="none"
          stroke="var(--hair-strong)"
          strokeWidth={1}
        />
        {/* ticks */}
        {Array.from({ length: 7 }).map((_, i) => {
          const a = Math.PI - (i / 6) * Math.PI;
          const r1 = 26;
          const r2 = 30;
          return (
            <line
              key={i}
              x1={Math.cos(a) * r1}
              y1={-Math.sin(a) * r1}
              x2={Math.cos(a) * r2}
              y2={-Math.sin(a) * r2}
              stroke="var(--ink-3)"
              strokeWidth={0.6}
            />
          );
        })}
        {/* needle eases from "warm" (left) down toward "cool" (right) */}
        <motion.line
          x1={0}
          y1={0}
          x2={0}
          y2={-26}
          stroke="var(--ink-0)"
          strokeWidth={1.4}
          strokeLinecap="round"
          style={{ originX: 0, originY: 0 }}
          initial={{ rotate: -78 }}
          animate={{ rotate: reduce ? 64 : 64 }}
          transition={{ duration: 1.6, delay: 0.3, ease: EASE }}
        />
        <circle cx={0} cy={0} r={2} fill="var(--ink-0)" />
        {/* minutes count-up */}
        <text
          x={0}
          y={-9}
          textAnchor="middle"
          className="tabular-nums"
          fontSize={9}
          fontWeight={700}
          fill="var(--ink-0)"
        >
          {mins}
          <tspan fontSize={5} fontWeight={500} fill="var(--ink-2)" dx={1}>
            MIN
          </tspan>
        </text>
      </g>
    </svg>
  );
}

/* 03 — STEP OUT: a square mesh contracts (the "tighten/set"), a firmness tick draws. */
function DiagramStepOut({ reduce }: { reduce: boolean }) {
  return (
    <svg viewBox="0 0 120 120" className="h-full w-full" aria-hidden>
      {/* static outer registration frame */}
      <rect
        x={18}
        y={18}
        width={84}
        height={84}
        fill="none"
        stroke="var(--hair)"
        strokeWidth={0.6}
      />
      {/* contracting mesh */}
      <motion.g
        initial={reduce ? { scale: 0.86 } : { scale: 1.08, opacity: 0.5 }}
        animate={{ scale: 0.86, opacity: 1 }}
        transition={{ duration: 1.1, ease: EASE }}
        style={{ originX: "60px", originY: "60px" }}
      >
        <g stroke="var(--ink-0)" strokeWidth={0.7} opacity={0.85} fill="none">
          {Array.from({ length: 6 }).map((_, i) => {
            const x = 22 + i * 15.2;
            return <line key={`v${i}`} x1={x} y1={22} x2={x} y2={98} />;
          })}
          {Array.from({ length: 6 }).map((_, i) => {
            const y = 22 + i * 15.2;
            return <line key={`h${i}`} x1={22} y1={y} x2={98} y2={y} />;
          })}
        </g>
        {/* contraction arrows on the corners */}
        {!reduce && (
          <g stroke="var(--ink-2)" strokeWidth={0.8} fill="none">
            <path d="M30 30 L36 36 M36 30 L36 36 L30 36" />
            <path d="M90 30 L84 36 M84 30 L84 36 L90 36" />
            <path d="M30 90 L36 84 M36 90 L36 84 L30 84" />
            <path d="M90 90 L84 84 M84 90 L84 84 L90 84" />
          </g>
        )}
      </motion.g>

      {/* firmness checkline drawing on top */}
      <motion.path
        d="M44 60 L55 71 L78 47"
        fill="none"
        stroke="var(--ink-0)"
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...drawPath(reduce, 0.6, reduce ? 0 : 0.9)}
      />
    </svg>
  );
}

/* Shared corner register marks for the diagram stage. */
function Corners() {
  return (
    <svg
      className="pointer-events-none absolute inset-4 h-[calc(100%-32px)] w-[calc(100%-32px)]"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden
    >
      <g stroke="var(--hair-strong)" strokeWidth={0.4} fill="none">
        <path d="M0 6 L0 0 L6 0" />
        <path d="M94 0 L100 0 L100 6" />
        <path d="M0 94 L0 100 L6 100" />
        <path d="M94 100 L100 100 L100 94" />
      </g>
    </svg>
  );
}
