"use client";

import { useRef, useState } from "react";
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
import { SteelTool, EMBER } from "@/components/chisel/Art";

/**
 * THE RITUAL — CHISEL's signature mechanic and the page showpiece.
 *
 * A pinned 320vh scroll sequence. A torso/jaw contour line-drawing sits in the
 * specimen panel. As you scroll the steel tool tracks DOWN a contour stroke-path
 * in three passes; warmth BUILDS (an ember heat-haze intensifies, the tool's
 * working edge glows hotter); and the "sculpted look" RESOLVES as definition
 * contour lines draw on via pathLength. The deliberate warm foil to GY-NO!'s
 * cooling sequence. Claim-safe: it describes a massage ritual and a *look*.
 *
 * Reduced motion: the phases still advance by scroll (text + active state),
 * but the tool sits still, the heat-haze holds at a low constant, and the
 * contour lines render fully drawn.
 */

const STEPS = [
  {
    n: "01",
    title: "Warm",
    body: "Press a thin layer in. The warming base blooms on contact and opens the skin for the work.",
    cue: "Warming",
  },
  {
    n: "02",
    title: "Work",
    body: "Draw the weighted steel tool along the contour — slow, firm strokes, edge to the skin.",
    cue: "Sculpting",
  },
  {
    n: "03",
    title: "Read Sharp",
    body: "Lines surface. A firmer, more defined look that lasts for as long as you need it to.",
    cue: "Defined",
  },
];

/* The contour path the tool tracks (down the jaw → neck → pec → oblique).
   Coordinates live in the 0 0 200 250 specimen viewBox. */
const CONTOUR = "M126 44 Q150 70 138 104 Q126 138 150 168 Q170 192 150 224";

/* Points sampled along CONTOUR, used to position the tool by scroll progress.
   (t, x, y) — t is the normalised travel 0..1 down the working pass. */
const TRACK: Array<[number, number, number]> = [
  [0, 126, 44],
  [0.2, 146, 80],
  [0.4, 134, 116],
  [0.55, 140, 150],
  [0.75, 158, 186],
  [1, 150, 224],
];

function sampleTrack(t: number): { x: number; y: number } {
  const c = Math.min(1, Math.max(0, t));
  for (let i = 0; i < TRACK.length - 1; i++) {
    const [t0, x0, y0] = TRACK[i];
    const [t1, x1, y1] = TRACK[i + 1];
    if (c >= t0 && c <= t1) {
      const k = (c - t0) / (t1 - t0 || 1);
      return { x: x0 + (x1 - x0) * k, y: y0 + (y1 - y0) * k };
    }
  }
  return { x: TRACK[TRACK.length - 1][1], y: TRACK[TRACK.length - 1][2] };
}

export function ChiselRitual() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const p = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(v < 0.34 ? 0 : v < 0.67 ? 1 : 2);
  });

  // The working pass: the tool only travels through phase 2 (0.34 → 0.78),
  // then lifts away as the look resolves.
  const passT = useTransform(scrollYProgress, [0.3, 0.78], [0, 1]);
  const toolX = useTransform(passT, (t) => sampleTrack(t).x);
  const toolY = useTransform(passT, (t) => sampleTrack(t).y);
  const toolVisible = useTransform(
    scrollYProgress,
    [0.26, 0.34, 0.82, 0.9],
    reduce ? [0, 0, 0, 0] : [0, 1, 1, 0],
  );
  // a little working wobble as it's drawn along
  const toolWobble = useTransform(p, [0, 1], reduce ? [0, 0] : [-7, 7]);

  // Warmth builds across the whole section: 0 → ~1 by the resolve.
  const warmthMV = useTransform(scrollYProgress, [0.08, 0.62, 1], [0, 0.7, 1]);
  const warmth = useSpring(warmthMV, { stiffness: 120, damping: 30 });
  const hazeOpacity = useTransform(warmth, [0, 1], reduce ? [0.14, 0.14] : [0.06, 0.5]);
  const hazeScale = useTransform(warmth, [0, 1], [0.7, 1.12]);
  const edgeWarm = useTransform(warmth, [0.2, 1], [0, 1]);

  // Phase 3 — definition contour lines draw on as the look resolves.
  const defineDraw = useTransform(scrollYProgress, [0.66, 0.94], reduce ? [1, 1] : [0, 1]);
  const defineOpacity = useTransform(scrollYProgress, [0.64, 0.74], [0, 1]);

  // The contour the tool follows draws in during phase 1→2.
  const contourDraw = useTransform(scrollYProgress, [0.12, 0.5], reduce ? [1, 1] : [0, 1]);

  // A heat read-out that climbs with warmth (cosmetic flavour, not a claim).
  const [heat, setHeat] = useState(0);
  useMotionValueEvent(warmth, "change", (v) => setHeat(Math.round(36 + v * 5)));

  return (
    <section id="how" ref={ref} className="relative h-[320vh] bg-paper-0">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <Container className="w-full">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[7fr_5fr] lg:gap-16">
            {/* LEFT — the writing */}
            <div className="order-2 lg:order-1">
              <SectionHead n="01" title="The ritual." />
              <p className="-mt-3 mb-2 max-w-md text-[16.5px] leading-[1.65] text-ink-2">
                Two parts, one motion. The warming cream and the steel tool work
                together — a sixty-second massage that leaves the look sharper.
              </p>
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
                      <p className="mt-2.5 max-w-[36ch] text-[16.5px] leading-relaxed text-ink-2">
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
                  CHISEL / 002
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
                {/* warmth read-out (cosmetic flavour) */}
                <span className="absolute bottom-4 left-5 z-40 caps text-[9px] font-medium text-ink-3">
                  Warmth {heat}°
                </span>
                <span className="absolute bottom-4 right-5 z-40 caps text-[9px] font-medium text-ink-3">
                  Contour Pass
                </span>

                {/* warm heat-haze — builds with scroll (the ember whisper, here
                    allowed to bloom because warmth IS the product's signature) */}
                <motion.div
                  aria-hidden
                  style={{ opacity: hazeOpacity }}
                  className="absolute inset-0 z-0"
                >
                  <motion.div
                    style={{ scale: hazeScale }}
                    className="absolute left-1/2 top-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
                  >
                    <div
                      className="h-full w-full rounded-full"
                      style={{
                        background: `radial-gradient(circle, ${EMBER}40, transparent 64%)`,
                      }}
                    />
                  </motion.div>
                </motion.div>

                {/* the contour figure + the resolving definition */}
                <svg
                  aria-hidden
                  viewBox="0 0 200 250"
                  className="absolute inset-0 z-10 h-full w-full"
                  preserveAspectRatio="xMidYMid meet"
                >
                  {/* jaw / neck / shoulder / torso silhouette — a calm base line */}
                  <path
                    d="M104 30
                       Q132 34 138 60
                       Q142 82 128 96
                       L150 108
                       Q176 120 178 156
                       L178 232
                       L150 232
                       Q150 200 150 178
                       Q150 150 122 142
                       L92 150
                       Q80 158 80 184
                       L80 232
                       L40 232
                       L40 150
                       Q40 116 78 102
                       Q96 96 96 78
                       Q86 70 88 50
                       Q90 32 104 30 Z"
                    fill="none"
                    stroke="var(--hair-strong)"
                    strokeWidth={1.1}
                  />

                  {/* the contour the tool follows — draws in during phase 1→2 */}
                  <motion.path
                    d={CONTOUR}
                    fill="none"
                    stroke="var(--ink-2)"
                    strokeWidth={1.2}
                    strokeDasharray="2 4"
                    strokeLinecap="round"
                    style={{ pathLength: reduce ? 1 : contourDraw }}
                  />

                  {/* definition contour lines — the resolved "sculpted look" */}
                  <motion.g
                    style={{ opacity: reduce ? 1 : defineOpacity }}
                    stroke={EMBER}
                    strokeWidth={1.4}
                    fill="none"
                    strokeLinecap="round"
                  >
                    {/* jaw line */}
                    <motion.path d="M96 86 Q116 96 132 88" style={{ pathLength: defineDraw }} />
                    {/* pec shelf */}
                    <motion.path d="M92 132 Q120 124 148 134" style={{ pathLength: defineDraw }} />
                    {/* oblique */}
                    <motion.path d="M150 168 Q160 192 152 220" style={{ pathLength: defineDraw }} />
                    {/* centre line */}
                    <motion.path d="M120 142 L120 196" style={{ pathLength: defineDraw }} />
                  </motion.g>
                </svg>

                {/* the steel tool — tracks down the contour through the pass */}
                <motion.svg
                  aria-hidden
                  viewBox="0 0 200 250"
                  className="absolute inset-0 z-20 h-full w-full"
                  preserveAspectRatio="xMidYMid meet"
                  style={{ opacity: toolVisible }}
                >
                  {/* one motion group carries the live translate + working
                      wobble; the static group inside scales/rotates the tool so
                      its edge points into the contour. */}
                  <motion.g style={{ x: toolX, y: toolY, rotate: toolWobble }}>
                    <g transform="translate(-44 -20) scale(0.34) rotate(28)">
                      <MiniTool warmthMV={edgeWarm} reduce={!!reduce} />
                    </g>
                  </motion.g>
                </motion.svg>
              </div>

              {/* a tiny static reference of the tool under the panel */}
              <div className="pointer-events-none absolute -bottom-3 left-1/2 hidden -translate-x-1/2 lg:block">
                <SteelTool className="h-8 w-20 opacity-40" warmth={0} />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}

/* The tool drawn inside the ritual SVG (shares the silhouette of Art's SteelTool
   but inline so it can warm its edge via a motion value). */
function MiniTool({
  warmthMV,
  reduce,
}: {
  warmthMV: MotionValue<number>;
  reduce: boolean;
}) {
  return (
    <g>
      <path
        d="M12 60 Q12 50 22 49 L120 41 Q150 38 178 30 Q224 18 246 40 Q258 52 252 70 Q244 92 206 96 Q172 100 140 84 L26 72 Q12 70 12 60 Z"
        fill="var(--metal-200)"
        stroke="var(--ink-0)"
        strokeWidth={2.4}
      />
      <path
        d="M150 44 Q196 34 232 50 Q244 60 238 74"
        stroke="var(--hair-strong)"
        strokeWidth={1.6}
        fill="none"
      />
      {/* warming working edge */}
      <motion.path
        d="M178 30 Q224 18 246 40 Q258 52 252 70 Q244 92 206 96"
        stroke={EMBER}
        strokeWidth={5}
        strokeLinecap="round"
        fill="none"
        style={{ opacity: reduce ? 0.5 : warmthMV }}
      />
    </g>
  );
}
