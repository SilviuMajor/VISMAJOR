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
} from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

const PHASES = [
  {
    n: "01",
    title: "Apply",
    body: "A thin layer to clean, dry skin.",
    cue: "On contact",
  },
  {
    n: "02",
    title: "Wait",
    body: "Cooling and tightening within minutes.",
    cue: "Cooling",
  },
  {
    n: "03",
    title: "Step Out",
    body: "Up to one hour of temporary firmness. Reapply as needed.",
    cue: "Set",
  },
];

const STEEL = "rgba(55,138,221,1)";

export function HowItWorksScrollSeq() {
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

  // Vertical progress spine.
  const spineScale = useTransform(p, [0, 1], [0, 1]);

  // Product: a slow settle + a faint phase-3 "set" cool-down.
  const productY = useTransform(p, [0, 1], reduce ? [0, 0] : [18, -18]);
  const productScale = useTransform(p, [0, 0.7, 1], [1, 1.015, 0.99]);

  // Phase-2 cooling: faint steel wash that swells then recedes.
  const coolWash = useTransform(
    scrollYProgress,
    [0.36, 0.52, 0.69],
    [0, 0.5, 0],
  );
  // Concentric cooling rings expand through phase 2.
  const ringProg = useTransform(scrollYProgress, [0.36, 0.69], [0, 1]);

  // Phase-3 contracting mesh: opacity in, scale down (the "tightening" finish).
  const meshOpacity = useTransform(
    scrollYProgress,
    [0.66, 0.74, 0.96, 1],
    [0, 1, 1, 1],
  );
  const meshScale = useTransform(scrollYProgress, [0.69, 1], [1.12, 0.9]);

  // Floating index for the side ledger (continuous read-out).
  const [pct, setPct] = useState(0);
  useMotionValueEvent(p, "change", (v) =>
    setPct(Math.round(Math.min(1, Math.max(0, v)) * 100)),
  );

  return (
    <section ref={ref} className="relative h-[300vh] bg-paper-0">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <Container className="w-full">
          {/* Top instrument bar */}
          <div
            className="mb-8 flex items-center justify-between border-b pb-4 md:mb-12"
            style={{ borderColor: "var(--hair)" }}
          >
            <Eyebrow>02 / How it works</Eyebrow>
            <div className="flex items-center gap-3 tabular-nums">
              <span className="caps text-[9px] font-medium text-ink-3">
                Sequence
              </span>
              <span className="text-[12px] font-semibold text-ink-1">
                {String(pct).padStart(3, "0")}
                <span className="text-ink-3">%</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[5fr_7fr] lg:gap-16">
            {/* LEFT — spine + cross-fading step copy */}
            <div className="order-2 flex items-stretch gap-6 lg:order-1">
              {/* Vertical progress spine */}
              <div className="relative flex flex-col items-center pt-1">
                <div className="relative w-px flex-1 bg-[var(--hair)]">
                  <motion.div
                    style={{ scaleY: spineScale }}
                    className="absolute inset-0 origin-top bg-ink-0"
                  />
                </div>
              </div>

              {/* Phase markers + active copy */}
              <div className="flex-1">
                <ul className="mb-8 flex flex-col gap-3">
                  {PHASES.map((ph, i) => (
                    <li
                      key={ph.n}
                      className="flex items-center gap-3"
                      aria-current={i === active ? "step" : undefined}
                    >
                      <span
                        className="relative flex h-1.5 w-1.5 items-center justify-center"
                        aria-hidden
                      >
                        <motion.span
                          className="absolute h-1.5 w-1.5 rounded-full"
                          animate={{
                            backgroundColor:
                              i === active
                                ? "var(--ink-0)"
                                : "var(--ink-3)",
                            scale: i === active ? 1 : 0.7,
                          }}
                          transition={{ duration: 0.3 }}
                        />
                      </span>
                      <span
                        className={`caps text-[10px] font-semibold transition-colors duration-300 ${
                          i === active ? "text-ink-1" : "text-ink-3"
                        }`}
                      >
                        {ph.n} · {ph.title}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="relative min-h-[210px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={active}
                      initial={
                        reduce ? { opacity: 0 } : { opacity: 0, y: 18 }
                      }
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduce ? { opacity: 0 } : { opacity: 0, y: -18 }}
                      transition={{ duration: 0.42, ease: [0.2, 0, 0, 1] }}
                    >
                      <span
                        className="block font-light leading-none text-ink-3"
                        style={{
                          fontSize: "clamp(40px, 5vw, 64px)",
                          letterSpacing: "-0.04em",
                        }}
                        aria-hidden
                      >
                        {PHASES[active].n}
                      </span>
                      <h3
                        className="mt-3 font-bold uppercase text-ink-0"
                        style={{
                          fontSize: "clamp(30px, 4.4vw, 56px)",
                          letterSpacing: "-0.02em",
                          lineHeight: 0.96,
                        }}
                      >
                        {PHASES[active].title}
                      </h3>
                      <p className="mt-4 max-w-[34ch] text-[17px] leading-[1.6] text-ink-2">
                        {PHASES[active].body}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* RIGHT — central transforming composition */}
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

                {/* corner read-out, cross-fades with phase */}
                <div className="absolute left-5 top-4 z-40 flex items-center gap-2">
                  <span className="caps text-[9px] font-medium text-ink-3">
                    GY-NO! / 001
                  </span>
                </div>
                <div className="absolute right-5 top-4 z-40 h-4 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={PHASES[active].cue}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.3 }}
                      className="caps block text-[9px] font-medium text-ink-2"
                    >
                      {PHASES[active].cue}
                    </motion.span>
                  </AnimatePresence>
                </div>

                {/* steel cooling wash (phase 2) */}
                <motion.div
                  aria-hidden
                  style={{ opacity: reduce ? 0 : coolWash }}
                  className="absolute inset-0 z-0"
                >
                  <div
                    className="absolute left-1/2 top-1/2 h-[130%] w-[130%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
                    style={{
                      background:
                        "radial-gradient(circle, rgba(55,138,221,0.26), transparent 64%)",
                    }}
                  />
                </motion.div>

                {/* concentric cooling rings (phase 2) */}
                <motion.svg
                  aria-hidden
                  viewBox="0 0 200 250"
                  className="absolute inset-0 z-10 h-full w-full"
                  style={{ opacity: reduce ? 0 : coolWash }}
                  preserveAspectRatio="xMidYMid slice"
                >
                  {[0, 1, 2, 3].map((i) => (
                    <CoolRing key={i} index={i} prog={ringProg} />
                  ))}
                </motion.svg>

                {/* product anchor */}
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

                {/* contracting mesh (phase 3 — the "set/tighten" finish) */}
                <motion.svg
                  aria-hidden
                  viewBox="0 0 200 250"
                  className="absolute inset-0 z-20 h-full w-full"
                  style={{
                    opacity: reduce ? 0 : meshOpacity,
                    scale: reduce ? 1 : meshScale,
                  }}
                  preserveAspectRatio="xMidYMid meet"
                >
                  <g
                    stroke="var(--ink-0)"
                    strokeWidth={0.5}
                    opacity={0.5}
                    fill="none"
                  >
                    {Array.from({ length: 9 }).map((_, i) => {
                      const x = 20 + i * 20;
                      return <line key={`v${i}`} x1={x} y1={25} x2={x} y2={225} />;
                    })}
                    {Array.from({ length: 11 }).map((_, i) => {
                      const y = 25 + i * 20;
                      return <line key={`h${i}`} x1={20} y1={y} x2={180} y2={y} />;
                    })}
                  </g>
                  {/* corner brackets — drafting register marks */}
                  <g stroke="var(--ink-1)" strokeWidth={0.9} fill="none">
                    <path d="M20 40 L20 25 L35 25" />
                    <path d="M180 40 L180 25 L165 25" />
                    <path d="M20 210 L20 225 L35 225" />
                    <path d="M180 210 L180 225 L165 225" />
                  </g>
                </motion.svg>

                {/* baseline scan tick — continuous travel down the frame */}
                <motion.div
                  aria-hidden
                  className="absolute inset-x-3 z-30 h-px"
                  style={{
                    top: useTransform(p, [0, 1], ["10%", "90%"]),
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

/* A single concentric cooling ring: radius + fade keyed to scroll progress,
   each ring offset so they read as outward pulses. */
function CoolRing({
  index,
  prog,
}: {
  index: number;
  prog: import("framer-motion").MotionValue<number>;
}) {
  const phase = index * 0.22;
  const local = useTransform(prog, (v) => {
    const t = (v + phase) % 1;
    return t;
  });
  const r = useTransform(local, [0, 1], [10, 96]);
  const opacity = useTransform(local, [0, 0.15, 0.85, 1], [0, 0.55, 0.12, 0]);
  return (
    <motion.circle
      cx={100}
      cy={128}
      r={r}
      fill="none"
      stroke={STEEL}
      strokeWidth={0.8}
      style={{ opacity }}
    />
  );
}
