"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Container } from "@/components/ui/Container";

const ACTIVES = [
  {
    n: "01",
    name: "Caffeine",
    line: "A key active known for a firmer, de-puffed look.",
    cue: "Active",
  },
  {
    n: "02",
    name: "Cooling",
    line: "A menthol cooling hit that stimulates the area the instant it lands.",
    cue: "Cooling",
  },
  {
    n: "03",
    name: "Tightening",
    line: "Then a film-forming complex seals in the shape — an instantly tighter look.",
    cue: "Set",
  },
];

const STEEL = "rgba(55,138,221,1)";

// Scattered snowflakes across the specimen panel (viewBox 200 × 250).
const FLAKES = [
  { x: 100, y: 122, s: 1.32 },
  { x: 54, y: 80, s: 0.72 },
  { x: 150, y: 92, s: 0.86 },
  { x: 46, y: 168, s: 0.8 },
  { x: 154, y: 176, s: 0.68 },
  { x: 100, y: 212, s: 0.58 },
  { x: 80, y: 44, s: 0.5 },
  { x: 126, y: 47, s: 0.56 },
];

export function StickyArchitecture() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(v < 0.34 ? 0 : v < 0.67 ? 1 : 2);
  });

  const railScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const productY = useTransform(p, [0, 1], reduce ? [0, 0] : [16, -16]);
  const productScale = useTransform(p, [0, 0.7, 1], [1, 1.015, 0.99]);
  const scanTop = useTransform(p, [0, 1], ["10%", "90%"]);

  // Phase 1 — Caffeine: an electric lightning charge.
  const caffeineOpacity = useTransform(scrollYProgress, [0, 0.04, 0.3, 0.34], [0, 1, 1, 0]);

  // Phase 2 — Cooling: soft steel wash + multiple snowflakes drawing on.
  const coolWash = useTransform(scrollYProgress, [0.34, 0.5, 0.67], [0, 0.5, 0]);
  const snowOpacity = useTransform(scrollYProgress, [0.34, 0.42, 0.6, 0.67], [0, 1, 1, 0]);
  const snowDraw = useTransform(scrollYProgress, [0.34, 0.58], [0, 1]);
  const snowRot = useTransform(scrollYProgress, [0.34, 0.67], reduce ? [0, 0] : [-6, 6]);

  // Phase 3 — Tightening: a thin, fine circular grid that contracts.
  const gridOpacity = useTransform(scrollYProgress, [0.63, 0.72], [0, 1]);
  const gridScale = useTransform(scrollYProgress, [0.67, 1], [1.12, 0.9]);

  const radial = Array.from({ length: 16 }).map((_, i) => {
    const a = (i * 22.5 * Math.PI) / 180;
    return { x: 100 + Math.cos(a) * 90, y: 125 + Math.sin(a) * 90 };
  });

  return (
    <section id="science" ref={ref} className="relative h-[320vh] bg-paper-1">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        {/* classical figure presiding over the actives */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-[-10%] z-0 hidden w-[52vw] sm:right-[-4%] sm:block sm:w-[46vw] lg:w-[40vw]"
        >
          <Image
            src="/product/david.png"
            alt=""
            fill
            sizes="46vw"
            className="object-contain object-bottom opacity-[0.5] mix-blend-multiply"
          />
        </div>

        <Container className="relative z-10 w-full">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Narrative */}
            <div className="order-2 lg:order-1">
              <div className="flex items-center gap-3.5">
                <span className="h-px w-7 bg-[var(--hair-strong)]" />
                <span className="caps-loose text-[11px] font-semibold text-ink-2">
                  The Architecture
                </span>
              </div>

              <div className="relative mt-7 min-h-[150px] md:mt-8 md:min-h-[230px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.4, ease: [0.2, 0, 0, 1] }}
                  >
                    <span className="block font-extrabold text-ink-3" style={{ fontSize: 22 }}>
                      {ACTIVES[active].n}
                    </span>
                    <h3
                      className="mt-2 font-extrabold uppercase text-ink-0"
                      style={{ fontSize: "clamp(36px, 6vw, 86px)", letterSpacing: "-0.03em", lineHeight: 0.95 }}
                    >
                      {ACTIVES[active].name}
                    </h3>
                    <p className="mt-5 max-w-md text-[18px] leading-[1.65] text-ink-1">
                      {ACTIVES[active].line}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Rail */}
              <div className="mt-10 flex items-stretch gap-5">
                <div className="relative w-px bg-[var(--hair)]">
                  <motion.div
                    style={{ scaleY: railScale }}
                    className="absolute inset-0 origin-top bg-ink-0"
                  />
                </div>
                <ul className="flex flex-col gap-4">
                  {ACTIVES.map((a, i) => (
                    <li
                      key={a.n}
                      className={`caps flex items-baseline gap-3 text-[12px] font-semibold transition-colors duration-300 ${
                        i === active ? "text-ink-0" : "text-ink-3"
                      }`}
                    >
                      <span className="text-[10px]">{a.n}</span>
                      {a.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Pinned product — the transforming specimen panel */}
            <div className="relative order-1 flex justify-center lg:order-2">
              <div
                className="relative mx-auto aspect-[4/5] w-full max-w-[256px] border bg-paper-2 sm:max-w-[320px] lg:max-w-[420px]"
                style={{ borderColor: "var(--hair)" }}
              >
                {/* inner keyline */}
                <div
                  className="pointer-events-none absolute inset-3 z-30 border"
                  style={{ borderColor: "var(--hair-strong)" }}
                  aria-hidden
                />
                {/* corner read-outs */}
                <span className="absolute left-5 top-4 z-40 caps text-[9px] font-medium text-ink-3">
                  GY-NO! / 001
                </span>
                <div className="absolute right-5 top-4 z-40 h-4 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={ACTIVES[active].cue}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.3 }}
                      className="caps block text-[9px] font-medium text-ink-2"
                    >
                      {ACTIVES[active].cue}
                    </motion.span>
                  </AnimatePresence>
                </div>

                {/* phase 2 — soft cold wash */}
                <motion.div
                  aria-hidden
                  style={{ opacity: reduce ? 0 : coolWash }}
                  className="absolute inset-0 z-0"
                >
                  <div
                    className="absolute left-1/2 top-1/2 h-[130%] w-[130%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
                    style={{ background: "radial-gradient(circle, rgba(55,138,221,0.24), transparent 64%)" }}
                  />
                </motion.div>

                {/* product */}
                <motion.div
                  style={{ y: productY, scale: productScale }}
                  className="absolute inset-0 z-20 flex items-center justify-center"
                >
                  <div className="relative h-[78%] w-[60%]">
                    <Image
                      src="/product/front.png"
                      alt="GY-NO! Nipple Tightening Cream"
                      fill
                      sizes="320px"
                      className="object-contain"
                    />
                  </div>
                </motion.div>

                {/* phase 1 — caffeine: an electric lightning charge */}
                <motion.svg
                  aria-hidden
                  viewBox="0 0 200 250"
                  className="absolute inset-0 z-[24] h-full w-full"
                  style={{ opacity: caffeineOpacity }}
                  preserveAspectRatio="xMidYMid meet"
                >
                  <Lightning reduce={reduce} />
                </motion.svg>

                {/* phase 2 — multiple snowflakes frosting over the tube */}
                <motion.svg
                  aria-hidden
                  viewBox="0 0 200 250"
                  className="absolute inset-0 z-[25] h-full w-full"
                  style={{ opacity: reduce ? 0 : snowOpacity, rotate: snowRot }}
                  preserveAspectRatio="xMidYMid meet"
                >
                  <g stroke={STEEL} strokeWidth={1.1} fill="none" strokeLinecap="round">
                    {FLAKES.map((f, i) => (
                      <Flake key={i} i={i} prog={snowDraw} x={f.x} y={f.y} s={f.s} />
                    ))}
                  </g>
                </motion.svg>

                {/* phase 3 — thin, fine contracting circular grid */}
                <motion.svg
                  aria-hidden
                  viewBox="0 0 200 250"
                  className="absolute inset-0 z-20 h-full w-full"
                  style={{ opacity: reduce ? 0 : gridOpacity, scale: reduce ? 1 : gridScale }}
                  preserveAspectRatio="xMidYMid meet"
                >
                  <g stroke="var(--ink-0)" strokeWidth={0.3} opacity={0.55} fill="none">
                    {[14, 28, 42, 56, 70, 84].map((r) => (
                      <circle key={r} cx={100} cy={125} r={r} />
                    ))}
                    {radial.map((pt, i) => (
                      <line key={i} x1={100} y1={125} x2={pt.x} y2={pt.y} />
                    ))}
                  </g>
                  <g stroke="var(--ink-1)" strokeWidth={0.5} fill="none">
                    <line x1={100} y1={117} x2={100} y2={133} />
                    <line x1={92} y1={125} x2={108} y2={125} />
                  </g>
                  <g stroke="var(--ink-1)" strokeWidth={0.7} fill="none">
                    <path d="M20 40 L20 25 L35 25" />
                    <path d="M180 40 L180 25 L165 25" />
                    <path d="M20 210 L20 225 L35 225" />
                    <path d="M180 210 L180 225 L165 225" />
                  </g>
                </motion.svg>

                {/* baseline scan tick */}
                <motion.div
                  aria-hidden
                  className="absolute inset-x-3 z-30 h-px"
                  style={{ top: scanTop, background: "var(--hair-strong)", opacity: reduce ? 0 : 0.6 }}
                />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}

/* Jagged lightning bolts that strike over the tube during the Caffeine phase
   — monochrome ink, flickering on irregular cycles. Steady when reduced. */
const BOLTS = [
  "M100 16 L86 70 L106 90 L90 138 L112 166 L96 234",
  "M106 90 L130 110 L119 138",
  "M58 54 L74 96 L60 126 L80 166",
  "M150 46 L135 90 L154 116 L139 158",
  "M150 116 L170 138 L158 166",
];

const SPARKS = [
  { x: 106, y: 90 },
  { x: 90, y: 138 },
  { x: 60, y: 126 },
  { x: 154, y: 116 },
];

function Lightning({ reduce }: { reduce: boolean | null }) {
  return (
    <g stroke="var(--ink-0)" fill="none" strokeLinejoin="round" strokeLinecap="round">
      {BOLTS.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          strokeWidth={i === 0 ? 1.7 : 1.15}
          initial={{ opacity: 0 }}
          animate={reduce ? { opacity: 0.8 } : { opacity: [0, 1, 0.25, 0.95, 0] }}
          transition={
            reduce
              ? { duration: 0 }
              : {
                  duration: 0.55,
                  times: [0, 0.12, 0.26, 0.4, 1],
                  repeat: Infinity,
                  repeatDelay: 0.7 + ((i * 0.41) % 1.7),
                  delay: (i * 0.27) % 1.1,
                  ease: "easeOut",
                }
          }
        />
      ))}
      {SPARKS.map((s, i) => (
        <motion.circle
          key={`s${i}`}
          cx={s.x}
          cy={s.y}
          r={2.1}
          fill="var(--ink-0)"
          stroke="none"
          initial={{ opacity: 0 }}
          animate={reduce ? { opacity: 0.65 } : { opacity: [0, 1, 0] }}
          transition={
            reduce
              ? { duration: 0 }
              : {
                  duration: 0.4,
                  times: [0, 0.3, 1],
                  repeat: Infinity,
                  repeatDelay: 0.9 + ((i * 0.53) % 1.5),
                  delay: (i * 0.31) % 1.0,
                  ease: "easeOut",
                }
          }
        />
      ))}
    </g>
  );
}

/* One snowflake, drawn on with scroll; each gets a staggered draw window. */
function Flake({
  i,
  prog,
  x,
  y,
  s,
}: {
  i: number;
  prog: MotionValue<number>;
  x: number;
  y: number;
  s: number;
}) {
  const off = Math.min(0.45, i * 0.06);
  const draw = useTransform(prog, [off, Math.min(1, off + 0.5)], [0, 1]);
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {[0, 60, 120, 180, 240, 300].map((a) => (
        <g key={a} transform={`rotate(${a})`}>
          <motion.path d="M0 0 L0 -20" style={{ pathLength: draw }} />
          <motion.path d="M0 -13 L4.5 -17.5" style={{ pathLength: draw }} />
          <motion.path d="M0 -13 L-4.5 -17.5" style={{ pathLength: draw }} />
        </g>
      ))}
      <motion.circle cx={0} cy={0} r={2} fill={STEEL} stroke="none" style={{ opacity: draw }} />
    </g>
  );
}
