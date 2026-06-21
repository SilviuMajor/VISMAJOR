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
import { SectionHead } from "@/components/ui/Eyebrow";

const STEPS = [
  { n: "01", title: "Apply", body: "A thin layer to clean, dry skin.", cue: "On contact" },
  { n: "02", title: "Wait", body: "Cooling and tightening within minutes.", cue: "Cooling" },
  {
    n: "03",
    title: "Step Out",
    body: "Up to one hour of temporary firmness. Reapply as needed.",
    cue: "Set",
  },
];

const STEEL = "rgba(55,138,221,1)";

export function HowItWorks() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  // Smooth the raw scroll for the continuous (non-phase) motion.
  const p = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(v < 0.36 ? 0 : v < 0.69 ? 1 : 2);
  });

  // Product: a slow settle.
  const productY = useTransform(p, [0, 1], reduce ? [0, 0] : [16, -16]);
  const productScale = useTransform(p, [0, 0.7, 1], [1, 1.015, 0.99]);

  // Phase 2 — cold. A soft steel wash + a snowflake that draws on over the tube.
  const coolWash = useTransform(scrollYProgress, [0.36, 0.52, 0.69], [0, 0.5, 0]);
  const frostOpacity = useTransform(
    scrollYProgress,
    [0.36, 0.45, 0.63, 0.69],
    [0, 1, 1, 0],
  );
  const frostDraw = useTransform(scrollYProgress, [0.36, 0.56], [0, 1]);
  const frostRot = useTransform(scrollYProgress, [0.36, 0.69], reduce ? [0, 0] : [-24, 24]);
  const frostScale = useTransform(scrollYProgress, [0.36, 0.46, 0.69], [0.62, 1, 1.05]);

  // Phase 3 — tighten. A circular grid that contracts onto the tube.
  const gridOpacity = useTransform(scrollYProgress, [0.66, 0.74], [0, 1]);
  const gridScale = useTransform(scrollYProgress, [0.69, 1], [1.12, 0.9]);

  // Baseline scan tick — continuous travel down the frame.
  const scanTop = useTransform(p, [0, 1], ["10%", "90%"]);

  const radial = Array.from({ length: 12 }).map((_, i) => {
    const a = (i * 30 * Math.PI) / 180;
    return { x: 100 + Math.cos(a) * 92, y: 125 + Math.sin(a) * 92 };
  });

  return (
    <section id="how" ref={ref} className="relative h-[300vh] bg-paper-0">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <Container className="w-full">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[7fr_5fr] lg:gap-16">
            {/* LEFT — the writing (active step lifts as you scroll) */}
            <div className="order-2 lg:order-1">
              <SectionHead n="02" title="How it works." />
              <ol className="mt-2 flex flex-col">
                {STEPS.map((s, i) => (
                  <li
                    key={s.n}
                    className={`flex items-baseline gap-7 py-7 md:gap-10 ${
                      i !== 0 ? "border-t" : ""
                    }`}
                    style={{ borderColor: "var(--hair)" }}
                    aria-current={i === active ? "step" : undefined}
                  >
                    <motion.span
                      className="font-light leading-none"
                      style={{ fontSize: "clamp(48px, 6vw, 84px)", letterSpacing: "-0.04em" }}
                      animate={{
                        color: i === active ? "var(--ink-0)" : "var(--ink-3)",
                        opacity: i === active ? 1 : 0.7,
                      }}
                      transition={{ duration: 0.4 }}
                      aria-hidden
                    >
                      {s.n}
                    </motion.span>
                    <div className="pt-2">
                      <h4
                        className="caps text-[19px] font-bold text-ink-0"
                        style={{ letterSpacing: "0.05em" }}
                      >
                        {s.title}
                      </h4>
                      <p className="mt-2.5 max-w-[34ch] text-[16.5px] leading-relaxed text-ink-2">
                        {s.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* RIGHT — the transforming specimen panel */}
            <div className="relative order-1 flex justify-center lg:order-2">
              <div
                className="relative aspect-[4/5] w-full max-w-[440px] border bg-paper-2"
                style={{ borderColor: "var(--hair)" }}
              >
                {/* inner keyline frame */}
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
                      key={STEPS[active].cue}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.3 }}
                      className="caps block text-[9px] font-medium text-ink-2"
                    >
                      {STEPS[active].cue}
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
                    style={{
                      background:
                        "radial-gradient(circle, rgba(55,138,221,0.24), transparent 64%)",
                    }}
                  />
                </motion.div>

                {/* product */}
                <motion.div
                  style={{ y: productY, scale: productScale }}
                  className="absolute inset-0 z-20 flex items-center justify-center"
                >
                  <div className="relative h-[78%] w-[62%]">
                    <Image
                      src="/product/front.png"
                      alt="GY-NO! tube"
                      fill
                      sizes="320px"
                      className="object-contain"
                      priority
                    />
                  </div>
                </motion.div>

                {/* phase 2 — the cold symbol: a snowflake frosting over the tube */}
                <motion.svg
                  aria-hidden
                  viewBox="0 0 200 250"
                  className="absolute inset-0 z-[25] h-full w-full"
                  style={{
                    opacity: reduce ? 0 : frostOpacity,
                    rotate: frostRot,
                    scale: frostScale,
                  }}
                  preserveAspectRatio="xMidYMid meet"
                >
                  <Snowflake draw={reduce ? undefined : frostDraw} />
                </motion.svg>

                {/* phase 3 — the contracting circular grid (the "tighten" finish) */}
                <motion.svg
                  aria-hidden
                  viewBox="0 0 200 250"
                  className="absolute inset-0 z-20 h-full w-full"
                  style={{
                    opacity: reduce ? 0 : gridOpacity,
                    scale: reduce ? 1 : gridScale,
                  }}
                  preserveAspectRatio="xMidYMid meet"
                >
                  <g stroke="var(--ink-0)" strokeWidth={0.5} opacity={0.5} fill="none">
                    {[18, 36, 54, 72, 90].map((r) => (
                      <circle key={r} cx={100} cy={125} r={r} />
                    ))}
                    {radial.map((pt, i) => (
                      <line key={i} x1={100} y1={125} x2={pt.x} y2={pt.y} />
                    ))}
                  </g>
                  {/* crosshair centre */}
                  <g stroke="var(--ink-1)" strokeWidth={0.8} fill="none">
                    <line x1={100} y1={116} x2={100} y2={134} />
                    <line x1={91} y1={125} x2={109} y2={125} />
                  </g>
                  {/* corner drafting brackets */}
                  <g stroke="var(--ink-1)" strokeWidth={0.9} fill="none">
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
                  style={{
                    top: scanTop,
                    background: "var(--hair-strong)",
                    opacity: reduce ? 0 : 0.6,
                  }}
                />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}

/* A clean six-arm snowflake, centred on the panel. Each arm draws on with
   scroll via pathLength; the whole mark rotates and settles through phase 2. */
function Snowflake({ draw }: { draw?: MotionValue<number> }) {
  const arms = [0, 60, 120, 180, 240, 300];
  const style = draw ? { pathLength: draw } : undefined;
  return (
    <g stroke={STEEL} strokeWidth={1.2} fill="none" strokeLinecap="round">
      {arms.map((a) => (
        <g key={a} transform={`rotate(${a} 100 125)`}>
          <motion.path d="M100 125 L100 64" style={style} />
          <motion.path d="M100 84 L109 70" style={style} />
          <motion.path d="M100 84 L91 70" style={style} />
          <motion.path d="M100 100 L107 89" style={style} />
          <motion.path d="M100 100 L93 89" style={style} />
        </g>
      ))}
      <motion.circle
        cx={100}
        cy={125}
        r={3.2}
        fill={STEEL}
        stroke="none"
        style={draw ? { opacity: draw } : undefined}
      />
    </g>
  );
}
