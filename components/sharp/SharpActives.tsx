"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Container } from "@/components/ui/Container";

const MINT = "#14130F";

const ACTIVES = [
  {
    n: "01",
    name: "Shine Control",
    tag: "The mattifier",
    line: "An oil-absorbing mineral complex drinks up surface shine and holds an even, flat finish through the day.",
    diagram: "absorb",
  },
  {
    n: "02",
    name: "Light Hydration",
    tag: "The water layer",
    line: "A weightless water-and-glycerin base hydrates without any film or slip. It sinks in and disappears.",
    diagram: "hydrate",
  },
  {
    n: "03",
    name: "Smooth Finish",
    tag: "The blur",
    line: "A soft-focus smoothing agent evens the surface, so light sits flat and features read sharper.",
    diagram: "smooth",
  },
];

/* Each active gets its own small line-art diagram, drawn in hairlines. */
function Diagram({ kind, draw }: { kind: string; draw: number }) {
  if (kind === "absorb") {
    // droplets being pulled down into a porous bed (oil absorption)
    return (
      <g fill="none">
        <line x1={30} y1={150} x2={170} y2={150} stroke="var(--ink-0)" strokeWidth={1.2} />
        {[50, 80, 110, 140].map((x, i) => (
          <g key={x}>
            <motion.line
              x1={x}
              y1={70}
              x2={x}
              y2={148}
              stroke="var(--hair-strong)"
              strokeWidth={1}
              style={{ pathLength: draw }}
            />
            <motion.circle
              cx={x}
              cy={70 + i * 4}
              r={5}
              fill={MINT}
              opacity={0.85}
              style={{ scale: draw }}
            />
          </g>
        ))}
        {/* porous bed marks */}
        {[40, 60, 80, 100, 120, 140, 160].map((x) => (
          <line key={"b" + x} x1={x} y1={150} x2={x} y2={162} stroke="var(--ink-1)" strokeWidth={0.8} />
        ))}
      </g>
    );
  }
  if (kind === "hydrate") {
    // a thin water layer settling flat over a surface
    return (
      <g fill="none">
        <motion.path
          d="M28 120 Q60 112 100 120 Q140 128 172 120"
          stroke={MINT}
          strokeWidth={1.6}
          strokeLinecap="round"
          style={{ pathLength: draw }}
        />
        <motion.path
          d="M28 134 Q60 128 100 134 Q140 140 172 134"
          stroke="var(--ink-1)"
          strokeWidth={0.9}
          strokeLinecap="round"
          style={{ pathLength: draw }}
        />
        <line x1={28} y1={150} x2={172} y2={150} stroke="var(--ink-0)" strokeWidth={1.2} />
        {/* weightless ticks rising */}
        {[60, 100, 140].map((x, i) => (
          <motion.line
            key={x}
            x1={x}
            y1={88 - i * 2}
            x2={x}
            y2={104}
            stroke="var(--hair-strong)"
            strokeWidth={0.8}
            style={{ pathLength: draw }}
          />
        ))}
      </g>
    );
  }
  // smooth — a jagged profile being flattened into a clean line
  return (
    <g fill="none">
      <motion.path
        d="M28 110 L52 96 L70 122 L92 92 L112 124 L134 98 L156 116 L172 104"
        stroke="var(--hair-strong)"
        strokeWidth={1}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.7}
      />
      <motion.path
        d="M28 138 L172 138"
        stroke={MINT}
        strokeWidth={1.6}
        strokeLinecap="round"
        style={{ pathLength: draw }}
      />
      {/* connecting drop lines from jagged to flat */}
      {[52, 92, 134].map((x) => (
        <line key={x} x1={x} y1={100} x2={x} y2={136} stroke="var(--ink-1)" strokeWidth={0.6} opacity={0.5} />
      ))}
    </g>
  );
}

export function SharpActives() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(v < 0.34 ? 0 : v < 0.67 ? 1 : 2);
  });

  const railScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // per-phase draw value for the active diagram (0→1 within its third)
  const drawAll = useTransform(scrollYProgress, [0, 0.34, 0.67, 1], [0.2, 1, 1, 1]);
  const [draw, setDraw] = useState(reduce ? 1 : 0.2);
  useMotionValueEvent(drawAll, "change", (v) => setDraw(reduce ? 1 : v));

  return (
    <section id="science" ref={ref} className="relative h-[320vh] bg-paper-1">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden pb-24 sm:pb-0">
        {/* a faint classical figure presiding behind the panel — soft multiply
            on white, visible on mobile too (fainter) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-[-16%] z-0 w-[80vw] sm:right-[-6%] sm:w-[44vw] lg:w-[38vw]"
        >
          <Image
            src="/figures/gyno.png"
            alt=""
            fill
            sizes="(max-width: 640px) 80vw, 44vw"
            className="object-contain object-bottom opacity-[0.24] mix-blend-multiply sm:opacity-[0.45]"
            style={{
              maskImage: "linear-gradient(to right, transparent, black 42%)",
              WebkitMaskImage: "linear-gradient(to right, transparent, black 42%)",
            }}
          />
        </div>

        <Container className="relative z-10 w-full">
          <div className="grid grid-cols-1 items-center gap-6 sm:gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Narrative */}
            <div className="order-2 lg:order-1">
              <div className="flex items-center gap-3.5">
                <span className="h-px w-7 bg-[var(--hair-strong)]" />
                <span className="caps-loose text-[11px] font-semibold text-ink-2">
                  The Formula
                </span>
              </div>

              <div className="relative mt-5 min-h-[150px] sm:mt-8 sm:min-h-[260px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.4, ease: [0.2, 0, 0, 1] }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="block font-extrabold text-ink-3" style={{ fontSize: 22 }}>
                        {ACTIVES[active].n}
                      </span>
                      <span
                        className="caps text-[10px] font-semibold"
                        style={{ color: MINT }}
                      >
                        {ACTIVES[active].tag}
                      </span>
                    </div>
                    <h3
                      className="mt-2 font-extrabold uppercase text-ink-0"
                      style={{ fontSize: "clamp(30px, 5.4vw, 78px)", letterSpacing: "-0.03em", lineHeight: 0.95 }}
                    >
                      {ACTIVES[active].name}
                    </h3>
                    <p className="mt-4 max-w-md text-[15.5px] leading-[1.55] text-ink-1 sm:mt-5 sm:text-[18px] sm:leading-[1.65]">
                      {ACTIVES[active].line}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Rail */}
              <div className="mt-6 flex items-stretch gap-5 sm:mt-10">
                <div className="relative w-px bg-[var(--hair-strong)]">
                  <motion.div
                    style={{ scaleY: railScale }}
                    className="absolute inset-0 origin-top bg-ink-0"
                  />
                </div>
                <ul className="flex flex-col gap-3.5">
                  {ACTIVES.map((a, i) => (
                    <li
                      key={a.n}
                      className={`caps flex items-baseline gap-3 text-[13px] font-semibold transition-colors duration-300 ${
                        i === active ? "text-ink-0" : "text-ink-2"
                      }`}
                    >
                      <span className="text-[11px]">{a.n}</span>
                      {a.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Specimen — a diagrammatic plate that swaps per active */}
            <div className="relative order-1 flex justify-center lg:order-2">
              <div className="relative aspect-[4/5] w-full max-w-[200px] sm:max-w-[300px] lg:max-w-[440px]">
                <span className="absolute left-5 top-4 z-40 caps text-[9px] font-medium text-ink-3">
                  SHARP / 003
                </span>
                <div className="absolute right-5 top-4 z-40 h-4 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={active}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.3 }}
                      className="caps block text-[9px] font-medium text-ink-2"
                    >
                      Fig. {ACTIVES[active].n}
                    </motion.span>
                  </AnimatePresence>
                </div>

                {/* swapping diagram */}
                <div className="absolute inset-3 z-10 flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    <motion.svg
                      key={active}
                      viewBox="0 0 200 200"
                      className="h-[78%] w-[78%]"
                      preserveAspectRatio="xMidYMid meet"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.02 }}
                      transition={{ duration: 0.35, ease: [0.2, 0, 0, 1] }}
                      aria-hidden
                    >
                      <Diagram kind={ACTIVES[active].diagram} draw={draw} />
                    </motion.svg>
                  </AnimatePresence>
                </div>

                {/* caption strip */}
                <div className="absolute inset-x-5 bottom-4 z-40">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={active}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="caps block text-center text-[9px] font-medium text-ink-3"
                    >
                      {ACTIVES[active].name} · look &amp; finish only
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
