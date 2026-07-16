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
    name: "Kaolin Clay",
    tag: "The draw",
    line: "A fine natural clay draws the day's oil and grime up and out of the pores, leaving an even, matte surface.",
    diagram: "clay",
  },
  {
    n: "02",
    name: "Activated Charcoal",
    tag: "The lift",
    line: "Activated charcoal binds to grime and lifts it away on the rinse — nothing left behind but clean skin.",
    diagram: "charcoal",
  },
  {
    n: "03",
    name: "Peppermint",
    tag: "The finish",
    line: "A touch of natural peppermint leaves a cool, fresh finish as it rinses — gentle and sulphate-free, never stripping.",
    diagram: "mint",
  },
];

/* Each active gets a line-art diagram tied to what the ingredient actually does,
   drawn in hairlines. `draw` (0→1) animates the key motion as it scrolls in. */
function Diagram({ kind, draw }: { kind: string; draw: number }) {
  if (kind === "clay") {
    // a clay poultice draws the oil up + out of the pores
    const pores = [58, 88, 118, 148];
    return (
      <g fill="none">
        {/* clay band, hatched */}
        <rect x={36} y={40} width={128} height={28} rx={2} stroke="var(--ink-0)" strokeWidth={1.2} />
        {[48, 62, 76, 90, 104, 118, 132, 146, 158].map((x) => (
          <line key={"h" + x} x1={x} y1={42} x2={x - 7} y2={66} stroke="var(--hair-strong)" strokeWidth={0.7} />
        ))}
        {/* skin surface + pore openings */}
        <line x1={28} y1={152} x2={172} y2={152} stroke="var(--ink-0)" strokeWidth={1.2} />
        {pores.map((x) => (
          <path key={"p" + x} d={`M${x - 9} 152 Q ${x} 139 ${x + 9} 152`} stroke="var(--ink-1)" strokeWidth={1.1} />
        ))}
        {/* oil drawn up out of the pores into the clay */}
        {pores.map((x) => (
          <g key={"o" + x}>
            <motion.line x1={x} y1={146} x2={x} y2={72} stroke="var(--hair-strong)" strokeWidth={0.9} style={{ pathLength: draw }} />
            <circle cx={x} cy={146 - draw * 72} r={3.6} fill={MINT} opacity={0.35 + draw * 0.5} />
          </g>
        ))}
      </g>
    );
  }
  if (kind === "charcoal") {
    // porous carbon binds the grime; the rinse lifts it away
    const grime: [number, number][] = [[62, 118], [86, 132], [110, 118], [134, 130], [98, 106]];
    return (
      <g fill="none">
        {/* activated-carbon block — a porous lattice */}
        <rect x={44} y={96} width={112} height={52} rx={2} stroke="var(--ink-0)" strokeWidth={1.2} />
        {[60, 76, 92, 108, 124, 140].map((x) => (
          <line key={"cv" + x} x1={x} y1={96} x2={x} y2={148} stroke="var(--hair-strong)" strokeWidth={0.6} />
        ))}
        {[110, 124, 138].map((y) => (
          <line key={"ch" + y} x1={44} y1={y} x2={156} y2={y} stroke="var(--hair-strong)" strokeWidth={0.6} />
        ))}
        {/* grime bound in the carbon */}
        {grime.map(([x, y], i) => (
          <circle key={"g" + i} cx={x} cy={y} r={2.6} fill={MINT} opacity={0.5} />
        ))}
        {/* the rinse sweeps across the top and lifts grime away */}
        <motion.path d="M30 78 Q100 66 170 78" stroke={MINT} strokeWidth={1.5} strokeLinecap="round" style={{ pathLength: draw }} />
        {[70, 100, 130].map((x) => (
          <g key={"lift" + x}>
            <motion.line x1={x} y1={94} x2={x} y2={72} stroke="var(--ink-1)" strokeWidth={0.8} style={{ pathLength: draw }} />
            <circle cx={x} cy={92 - draw * 20} r={2.4} fill={MINT} opacity={0.55 - draw * 0.4} />
          </g>
        ))}
      </g>
    );
  }
  // mint — a cool, fresh finish
  return (
    <g fill="none">
      {/* mint leaf */}
      <motion.path
        d="M100 50 C 134 66 140 112 100 154 C 60 112 66 66 100 50 Z"
        stroke="var(--ink-0)"
        strokeWidth={1.4}
        strokeLinejoin="round"
        style={{ pathLength: draw }}
      />
      <motion.line x1={100} y1={58} x2={100} y2={148} stroke="var(--ink-1)" strokeWidth={0.9} style={{ pathLength: draw }} />
      {[86, 106, 126].map((y) => (
        <g key={"vein" + y}>
          <motion.line x1={100} y1={y} x2={84} y2={y + 12} stroke="var(--ink-1)" strokeWidth={0.7} style={{ pathLength: draw }} />
          <motion.line x1={100} y1={y} x2={116} y2={y + 12} stroke="var(--ink-1)" strokeWidth={0.7} style={{ pathLength: draw }} />
        </g>
      ))}
      {/* cool freshness radiating out */}
      {[-1, 1].map((s) => (
        <motion.path
          key={s}
          d={`M${100 + s * 48} 84 q ${s * 14} 18 0 36`}
          stroke="var(--hair-strong)"
          strokeWidth={0.9}
          style={{ pathLength: draw }}
        />
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
            src="/men/stone-wash.png"
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
                <span className="caps-loose text-[11px] font-medium text-ink-2">
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
                      <span className="block font-bold text-ink-3" style={{ fontSize: 22 }}>
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
                      className="mt-2 font-bold uppercase text-ink-0"
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
                  STONE / 003
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
