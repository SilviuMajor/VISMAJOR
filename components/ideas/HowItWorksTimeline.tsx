"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/Eyebrow";

const STEEL = "rgba(55,138,221,1)";

/* Plot geometry in a 600 x 300 viewBox.
   X axis = time (0 -> ~60 min). Y = illustrative "finish / firmness look". */
const VB = { w: 600, h: 300 };
const PAD = { l: 56, r: 28, t: 34, b: 52 };
const X0 = PAD.l;
const X1 = VB.w - PAD.r;
const Y0 = VB.h - PAD.b; // baseline (low)
const Y1 = PAD.t; // top (high)

const x = (t: number) => X0 + (t / 60) * (X1 - X0); // t in minutes
const y = (v: number) => Y0 + (Y1 - Y0) * v; // v in 0..1

// Finish curve: rises fast (apply -> within minutes), holds across the hour, eases at the end.
const CURVE_D = [
  `M ${x(0)} ${y(0.04)}`,
  `C ${x(4)} ${y(0.06)}, ${x(7)} ${y(0.82)}, ${x(12)} ${y(0.86)}`, // quick rise by ~minutes
  `C ${x(22)} ${y(0.9)}, ${x(40)} ${y(0.9)}, ${x(50)} ${y(0.82)}`, // hold across the hour
  `C ${x(55)} ${y(0.74)}, ${x(58)} ${y(0.5)}, ${x(60)} ${y(0.28)}`, // ease off at the end
].join(" ");

const TICKS = [0, 15, 30, 45, 60];

const NODES = [
  {
    n: "01",
    title: "Apply",
    sub: "A thin layer to clean, dry skin.",
    t: 0,
    v: 0.04,
    tag: "0 MIN",
    anchor: "start" as const,
  },
  {
    n: "02",
    title: "Wait",
    sub: "Cooling and tightening within minutes.",
    t: 11,
    v: 0.855,
    tag: "WITHIN MIN",
    anchor: "middle" as const,
  },
  {
    n: "03",
    title: "Step Out",
    sub: "Up to one hour of temporary firmness.",
    t: 46,
    v: 0.885,
    tag: "UP TO 1 HR",
    anchor: "end" as const,
  },
];

const EASE = [0.2, 0, 0, 1] as const;

export function HowItWorksTimeline() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const svgWrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(svgWrapRef, { once: true, margin: "-120px" });

  // Scroll progress through the section drives the curve draw + marker.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.4"],
  });
  const draw = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    restDelta: 0.001,
  });

  // strokeDashoffset draw-on (1 -> 0).
  const dashOffset = useTransform(draw, [0, 1], [1, 0]);
  // Marker travels the path via offsetDistance.
  const markerDist = useTransform(draw, [0, 1], ["0%", "100%"]);

  // Which nodes have been "passed" by the marker (sequential pop-in).
  const [reached, setReached] = useState<number>(reduce ? NODES.length : 0);
  useMotionValueEvent(draw, "change", (v) => {
    if (reduce) return;
    // Node i is revealed once the draw passes its fractional position along time.
    const passedCount = NODES.filter((nd) => v >= nd.t / 60 - 0.02).length;
    setReached(passedCount);
  });

  // If reduced motion: reveal everything immediately when in view.
  const showAll = reduce && inView;

  // Live read-out of elapsed minutes for the instrument header.
  const [mins, setMins] = useState(0);
  useMotionValueEvent(draw, "change", (v) =>
    setMins(Math.round(Math.min(1, Math.max(0, v)) * 60)),
  );

  return (
    <section ref={ref} className="py-16 md:py-24">
      <Container>
        <SectionHead n="02" title="How it works." />

        <div
          ref={svgWrapRef}
          className="relative overflow-hidden border bg-paper-2"
          style={{ borderColor: "var(--hair)" }}
        >
          {/* Instrument header */}
          <div
            className="flex items-center justify-between border-b px-5 py-3.5 md:px-7"
            style={{ borderColor: "var(--hair)" }}
          >
            <span className="caps text-[10px] font-semibold text-ink-2">
              Finish / firmness look — illustrative
            </span>
            <span className="caps text-[9px] font-medium tabular-nums text-ink-3">
              T+ {String(mins).padStart(2, "0")} MIN
            </span>
          </div>

          <div className="px-3 py-5 md:px-7 md:py-7">
            <svg
              viewBox={`0 0 ${VB.w} ${VB.h}`}
              className="h-auto w-full"
              role="img"
              aria-label="Illustrative timeline: finish builds within minutes and holds across the hour."
            >
              {/* Y axis label */}
              <text
                x={PAD.l - 40}
                y={(Y0 + Y1) / 2}
                fontSize={9}
                fontWeight={600}
                letterSpacing={2}
                fill="var(--ink-3)"
                transform={`rotate(-90 ${PAD.l - 40} ${(Y0 + Y1) / 2})`}
                textAnchor="middle"
              >
                FIRMNESS LOOK
              </text>

              {/* horizontal gridlines */}
              {[0.25, 0.5, 0.75, 1].map((g) => (
                <line
                  key={g}
                  x1={X0}
                  y1={y(g)}
                  x2={X1}
                  y2={y(g)}
                  stroke="var(--hair)"
                  strokeWidth={0.6}
                  strokeDasharray="2 4"
                />
              ))}

              {/* baseline axis */}
              <line
                x1={X0}
                y1={Y0}
                x2={X1}
                y2={Y0}
                stroke="var(--hair-strong)"
                strokeWidth={1}
              />
              {/* y axis */}
              <line
                x1={X0}
                y1={Y0}
                x2={X0}
                y2={Y1}
                stroke="var(--hair-strong)"
                strokeWidth={1}
              />

              {/* x ticks + labels */}
              {TICKS.map((t) => (
                <g key={t}>
                  <line
                    x1={x(t)}
                    y1={Y0}
                    x2={x(t)}
                    y2={Y0 + 5}
                    stroke="var(--hair-strong)"
                    strokeWidth={0.8}
                  />
                  <text
                    x={x(t)}
                    y={Y0 + 18}
                    fontSize={9}
                    fontWeight={600}
                    letterSpacing={1.5}
                    fill="var(--ink-3)"
                    textAnchor="middle"
                  >
                    {t === 60 ? "60 MIN" : t}
                  </text>
                </g>
              ))}

              {/* faint full-curve guide so the hold reads even before draw */}
              <path
                d={CURVE_D}
                fill="none"
                stroke="var(--hair)"
                strokeWidth={1}
              />

              {/* the drawn-on finish curve (steel accent) */}
              <motion.path
                d={CURVE_D}
                fill="none"
                stroke={STEEL}
                strokeWidth={2.4}
                strokeLinecap="round"
                pathLength={1}
                style={
                  reduce
                    ? undefined
                    : { strokeDasharray: 1, strokeDashoffset: dashOffset }
                }
                initial={reduce ? { pathLength: 1 } : undefined}
              />

              {/* travelling marker dot riding the curve */}
              {!reduce && (
                <motion.g
                  style={{
                    offsetPath: `path("${CURVE_D}")`,
                    offsetDistance: markerDist,
                    offsetRotate: "0deg",
                  }}
                >
                  <circle r={6} fill="var(--paper-2)" />
                  <circle
                    r={4.2}
                    fill={STEEL}
                    stroke="var(--paper-2)"
                    strokeWidth={1.4}
                  />
                </motion.g>
              )}

              {/* plotted nodes */}
              {NODES.map((nd, i) => {
                const visible = showAll || i < reached;
                return (
                  <Node
                    key={nd.n}
                    nd={nd}
                    visible={visible}
                    reduce={!!reduce}
                  />
                );
              })}
            </svg>
          </div>

          {/* Legend / step ledger under the graph */}
          <div
            className="grid grid-cols-1 border-t sm:grid-cols-3"
            style={{ borderColor: "var(--hair)" }}
          >
            {NODES.map((nd, i) => (
              <LedgerItem
                key={nd.n}
                nd={nd}
                visible={showAll || i < reached}
                first={i === 0}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* A plotted node: connector stem, ring dot, index + tag — pops in sequentially. */
function Node({
  nd,
  visible,
  reduce,
}: {
  nd: (typeof NODES)[number];
  visible: boolean;
  reduce: boolean;
}) {
  const px = x(nd.t);
  const py = y(nd.v);
  // Label sits above the point, nudged in from edges.
  const lx =
    nd.anchor === "start" ? px + 6 : nd.anchor === "end" ? px - 6 : px;
  const ly = py - 22;

  return (
    <motion.g
      initial={false}
      animate={
        visible
          ? { opacity: 1, scale: 1 }
          : { opacity: 0, scale: reduce ? 1 : 0.6 }
      }
      transition={{ duration: 0.45, ease: EASE }}
      style={{ transformOrigin: `${px}px ${py}px` }}
    >
      {/* drop stem to baseline */}
      <line
        x1={px}
        y1={py}
        x2={px}
        y2={Y0}
        stroke="var(--hair-strong)"
        strokeWidth={0.7}
        strokeDasharray="2 3"
      />
      {/* node ring */}
      <circle cx={px} cy={py} r={5.5} fill="var(--paper-2)" />
      <circle
        cx={px}
        cy={py}
        r={5.5}
        fill="none"
        stroke="var(--ink-0)"
        strokeWidth={1.4}
      />
      <circle cx={px} cy={py} r={1.8} fill="var(--ink-0)" />

      {/* index number */}
      <text
        x={lx}
        y={ly}
        fontSize={13}
        fontWeight={700}
        fill="var(--ink-0)"
        textAnchor={nd.anchor}
        letterSpacing={-0.5}
      >
        {nd.n}
      </text>
      {/* tag */}
      <text
        x={lx}
        y={ly + 12}
        fontSize={8}
        fontWeight={600}
        letterSpacing={1.5}
        fill="var(--ink-2)"
        textAnchor={nd.anchor}
      >
        {nd.tag}
      </text>
    </motion.g>
  );
}

/* Ledger row beneath the graph — mirrors node reveal. */
function LedgerItem({
  nd,
  visible,
  first,
}: {
  nd: (typeof NODES)[number];
  visible: boolean;
  first: boolean;
}) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: visible ? 1 : 0.35 }}
      transition={{ duration: 0.4, ease: EASE }}
      className={`flex items-start gap-3 px-5 py-4 md:px-7 md:py-5 ${
        first ? "" : "border-t sm:border-l sm:border-t-0"
      }`}
      style={{ borderColor: "var(--hair)" }}
    >
      <span
        className="mt-0.5 font-light leading-none text-ink-3"
        style={{ fontSize: 22, letterSpacing: "-0.03em" }}
      >
        {nd.n}
      </span>
      <div>
        <span className="caps block text-[11px] font-bold text-ink-0">
          {nd.title}
        </span>
        <p className="mt-1.5 max-w-[28ch] text-[14px] leading-[1.5] text-ink-2">
          {nd.sub}
        </p>
      </div>
    </motion.div>
  );
}
