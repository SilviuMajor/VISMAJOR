"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/Eyebrow";

const MINT = "rgba(47,158,134,1)";

const STEPS = [
  {
    n: "01",
    title: "Apply",
    body: "A pea of cream, smoothed over a clean face each morning.",
    cue: "Shine",
  },
  {
    n: "02",
    title: "Absorb",
    body: "It sinks in fast and weightless — no film, no slip, no grease.",
    cue: "Absorbing",
  },
  {
    n: "03",
    title: "Matte",
    body: "Sets to a clean, flat finish. Shine controlled; features look sharper.",
    cue: "Matte",
  },
];

export function SharpDaily() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  // Smooth the raw scroll for the continuous motion.
  const p = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(v < 0.36 ? 0 : v < 0.69 ? 1 : 2);
  });

  // ---- THE MECHANIC: shine recedes to matte as you scroll ----
  // A bright specular sweep that blazes early, then dissolves.
  const shineLevel = useTransform(scrollYProgress, [0.04, 0.9], reduce ? [0.5, 0.5] : [1, 0.04]);
  const shineSpring = useSpring(shineLevel, { stiffness: 90, damping: 26, restDelta: 0.001 });

  // The gloss highlight: a hot moving band over the tile.
  const sheenX = useTransform(p, [0, 1], reduce ? ["0%", "0%"] : ["-22%", "26%"]);
  const sheenOpacity = useTransform(shineSpring, [0.2, 1], [0, 0.85]);
  const glossBlur = useTransform(shineSpring, [0, 1], [10, 1]); // crisp gloss → soft nothing
  const glossBlurFilter = useMotionTemplate`blur(${glossBlur}px)`;

  // The matte field rises as shine falls (paper-1 wash fading in).
  const matteOpacity = useTransform(shineSpring, [1, 0.1], [0, 1]);

  // Meter readout 100 → 4 (a "shine index", look-and-feel only).
  const [shinePct, setShinePct] = useState(reduce ? 50 : 100);
  useMotionValueEvent(shineSpring, "change", (v) =>
    setShinePct(Math.round(Math.max(0.04, Math.min(1, v)) * 100)),
  );
  const meterFill = useTransform(shineSpring, [0.04, 1], ["6%", "100%"]);

  // The "sharpen": a crisp edge/facet that resolves as it goes matte.
  const facetDraw = useTransform(scrollYProgress, [0.5, 0.92], [0, 1]);
  const facetOpacity = useTransform(scrollYProgress, [0.46, 0.6, 1], [0, 1, 1]);

  // Continuous scan tick travelling the frame.
  const scanTop = useTransform(p, [0, 1], ["10%", "90%"]);

  return (
    <section id="how" ref={ref} className="relative h-[300vh] bg-paper-0">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <Container className="w-full">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[5fr_7fr] lg:gap-16">
            {/* LEFT — the writing + live shine meter */}
            <div className="order-2 lg:order-1">
              <SectionHead n="01" title="The daily." />

              <ol className="mt-1 flex flex-col">
                {STEPS.map((s, i) => (
                  <li
                    key={s.n}
                    className={`flex items-baseline gap-6 py-6 md:gap-9 ${
                      i !== 0 ? "border-t" : ""
                    }`}
                    style={{ borderColor: "var(--hair)" }}
                    aria-current={i === active ? "step" : undefined}
                  >
                    <motion.span
                      className="font-light leading-none"
                      style={{ fontSize: "clamp(40px, 5vw, 70px)", letterSpacing: "-0.04em" }}
                      animate={{
                        color: i === active ? "var(--ink-0)" : "var(--ink-3)",
                        opacity: i === active ? 1 : 0.7,
                      }}
                      transition={{ duration: 0.4 }}
                      aria-hidden
                    >
                      {s.n}
                    </motion.span>
                    <div className="pt-1.5">
                      <h4
                        className="caps text-[18px] font-bold text-ink-0"
                        style={{ letterSpacing: "0.05em" }}
                      >
                        {s.title}
                      </h4>
                      <p className="mt-2 max-w-[36ch] text-[16px] leading-relaxed text-ink-2">
                        {s.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>

              {/* SHINE METER — the signature read-out, drops as you scroll */}
              <div
                className="mt-7 border-t pt-6"
                style={{ borderColor: "var(--hair)" }}
              >
                <div className="flex items-end justify-between">
                  <span className="caps text-[10px] font-semibold text-ink-2">
                    Shine index
                  </span>
                  <span className="flex items-baseline gap-1.5 tabular-nums">
                    <span
                      className="font-extrabold text-ink-0"
                      style={{ fontSize: "clamp(22px, 2.6vw, 30px)", letterSpacing: "-0.03em" }}
                    >
                      {shinePct}
                    </span>
                    <span className="caps text-[10px] font-semibold text-ink-3">/ 100</span>
                  </span>
                </div>
                <div
                  className="relative mt-3 h-2.5 overflow-hidden rounded-pill"
                  style={{ background: "var(--hair)" }}
                >
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-pill"
                    style={{
                      width: meterFill,
                      background: "var(--ink-0)",
                    }}
                  />
                </div>
                <p className="mt-3 caps text-[9.5px] font-medium text-ink-3">
                  Illustrative · describes finish &amp; feel only
                </p>
              </div>
            </div>

            {/* RIGHT — the transforming specimen tile: gloss → matte */}
            <div className="relative order-1 flex justify-center lg:order-2">
              <div
                className="relative aspect-[4/5] w-full max-w-[460px] border bg-paper-2"
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
                  SHARP / 003
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

                {/* THE SURFACE TILE — a skin-swatch standing in for the face.
                    Starts glossy (hot specular sweep), ends dead-flat matte. */}
                <div className="absolute inset-3 z-10 overflow-hidden">
                  {/* base swatch — neutral, monochrome */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(135deg, var(--paper-2) 0%, var(--metal-50) 100%)",
                    }}
                  />

                  {/* GLOSS LAYER — a moving specular band, crisp early, gone late */}
                  <motion.div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      x: sheenX,
                      opacity: reduce ? 0.25 : sheenOpacity,
                      filter: reduce ? "blur(6px)" : glossBlurFilter,
                      background:
                        "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.95) 48%, rgba(255,255,255,0.4) 56%, transparent 70%)",
                    }}
                  />
                  {/* a second tighter hot-spot for that wet sheen */}
                  <motion.div
                    aria-hidden
                    className="absolute left-[34%] top-[26%] h-[42%] w-[26%] -translate-x-1/2 rounded-full"
                    style={{
                      x: sheenX,
                      opacity: reduce ? 0.18 : sheenOpacity,
                      filter: reduce ? "blur(10px)" : glossBlurFilter,
                      background:
                        "radial-gradient(circle, rgba(255,255,255,0.95), transparent 65%)",
                    }}
                  />

                  {/* MATTE FIELD — a soft flat wash that fades in as gloss dies,
                      knocking the surface down to an even, shine-free finish */}
                  <motion.div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      opacity: reduce ? 0.5 : matteOpacity,
                      background:
                        "linear-gradient(180deg, var(--paper-1) 0%, var(--paper-2) 100%)",
                      mixBlendMode: "multiply",
                    }}
                  />
                  {/* fine matte micro-texture (a whisper of grain via dots) */}
                  <motion.div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      opacity: reduce ? 0.3 : matteOpacity,
                      backgroundImage:
                        "radial-gradient(rgba(20,19,15,0.10) 0.5px, transparent 0.6px)",
                      backgroundSize: "5px 5px",
                    }}
                  />
                </div>

                {/* THE SHARPEN — a crisp facet/edge that resolves once matte,
                    the "look of sharper features" rendered as drafting line-art */}
                <motion.svg
                  aria-hidden
                  viewBox="0 0 200 250"
                  className="absolute inset-3 z-20 h-[calc(100%-1.5rem)] w-[calc(100%-1.5rem)]"
                  style={{ opacity: reduce ? 0.6 : facetOpacity }}
                  preserveAspectRatio="xMidYMid meet"
                >
                  {/* a clean jaw/cheek edge line that draws on */}
                  <motion.path
                    d="M40 56 L96 70 Q150 84 150 140 L150 196"
                    fill="none"
                    stroke={MINT}
                    strokeWidth={1.6}
                    strokeLinecap="round"
                    style={{ pathLength: reduce ? 1 : facetDraw }}
                  />
                  {/* a secondary parallel contour for the facet */}
                  <motion.path
                    d="M52 70 L98 82 Q136 94 136 138"
                    fill="none"
                    stroke="var(--ink-1)"
                    strokeWidth={0.9}
                    strokeLinecap="round"
                    style={{ pathLength: reduce ? 1 : facetDraw }}
                  />
                  {/* drafting brackets at the corners */}
                  <g stroke="var(--ink-1)" strokeWidth={0.9} fill="none">
                    <path d="M22 40 L22 26 L36 26" />
                    <path d="M178 40 L178 26 L164 26" />
                    <path d="M22 210 L22 224 L36 224" />
                    <path d="M178 210 L178 224 L164 224" />
                  </g>
                  {/* a small mint registration tick at the cheekbone */}
                  <motion.circle
                    cx={150}
                    cy={140}
                    r={2.6}
                    fill={MINT}
                    style={{ opacity: reduce ? 1 : facetDraw }}
                  />
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
