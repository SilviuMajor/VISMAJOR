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

/**
 * CHANGES 43 + 45 + 50 — The Architecture, mono and half the length.
 *
 * What was removed, and why:
 *
 *   43. The strobing yellow lightning (#F59E0B / #FFC61A) and its full-panel
 *       flash at 95% opacity, plus the blue snowflakes (#5FB0E0). globals.css
 *       states "Strictly monochrome, NO brand accent colour. Restraint is the
 *       brand", and aliases --ember/--steel-blue/--mint to ink to enforce it.
 *       That section hardcoded hexes straight past the token system. On a mono
 *       brand selling composure, for a coffee extract.
 *
 *   45. 450vh became 240vh. The three phases carry about 36 words between them.
 *
 *   50. Under reduced motion this no longer pins at all: it renders as three
 *       stacked panels at natural height, with no scroll observers mounted.
 *       Previously reduced motion only removed the transforms, so the user
 *       still had to scroll 450vh through a sequence they could not see move.
 *
 * What was kept: the progress rail, the phase copy swap, the product drift, and
 * the contracting circular grid. The grid stays because it is mono, precise,
 * and it actually means the thing the copy says: tightening.
 */

const ACTIVES = [
  {
    n: "01",
    name: "Caffeine",
    line: "A key active known for a firmer, de-puffed look.",
  },
  {
    n: "02",
    name: "Cooling",
    line: "A menthol cooling hit that stimulates the area the instant it lands.",
  },
  {
    n: "03",
    name: "Tightening",
    line: "Then a film-forming complex seals in the shape: an instantly tighter look.",
  },
];

export function ArchitectureV2() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
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
  const productY = useTransform(p, [0, 1], [16, -16]);
  const gridScale = useTransform(scrollYProgress, [0.15, 1], [1.12, 0.9]);
  const gridOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);

  // 50 — reduced motion gets the content, not the choreography.
  if (reduce) {
    return (
      <section id="science" className="border-t bg-paper-1 py-16 md:py-24" style={{ borderColor: "var(--hair)" }}>
        <Container>
          <Eyebrow />
          <div className="mt-10 flex flex-col gap-12">
            {ACTIVES.map((a) => (
              <div key={a.n}>
                <span className="block font-bold text-ink-3" style={{ fontSize: 22 }}>{a.n}</span>
                <h3 className="mt-2 font-bold uppercase text-ink-0" style={{ fontSize: "clamp(30px, 5vw, 64px)", letterSpacing: "-0.03em", lineHeight: 0.95 }}>
                  {a.name}
                </h3>
                <p className="mt-4 max-w-md text-[17px] leading-[1.6] text-ink-1">{a.line}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    );
  }

  return (
    // 45 — 240vh, was 450vh
    <section id="science" ref={ref} className="relative h-[240vh] bg-paper-1">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden pb-24 sm:pb-0">
        <Container className="relative z-10 w-full">
          <div className="grid grid-cols-1 items-center gap-6 sm:gap-10 lg:grid-cols-2 lg:gap-16">
            {/* narrative */}
            <div className="order-2 lg:order-1">
              <Eyebrow />
              <div className="relative mt-5 min-h-[104px] md:mt-8 md:min-h-[230px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.32, ease: [0.2, 0, 0, 1] }}
                  >
                    <span className="block font-bold text-ink-3" style={{ fontSize: 22 }}>
                      {ACTIVES[active].n}
                    </span>
                    <h3
                      className="mt-2 font-bold uppercase text-ink-0"
                      style={{ fontSize: "clamp(30px, 6vw, 86px)", letterSpacing: "-0.03em", lineHeight: 0.95 }}
                    >
                      {ACTIVES[active].name}
                    </h3>
                    <p className="mt-4 max-w-md text-[15.5px] leading-[1.55] text-ink-1 sm:mt-5 sm:text-[18px] sm:leading-[1.65]">
                      {ACTIVES[active].line}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="mt-6 flex items-stretch gap-5 sm:mt-10">
                <div className="relative w-px bg-[var(--hair-strong)]">
                  <motion.div style={{ scaleY: railScale }} className="absolute inset-0 origin-top bg-ink-0" />
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

            {/* specimen — mono only */}
            <div className="relative order-1 flex justify-center lg:order-2">
              <div className="relative mx-auto aspect-[4/5] w-full max-w-[290px] sm:max-w-[320px] lg:max-w-[420px]">
                <motion.div style={{ y: productY }} className="absolute inset-0 z-20 flex items-center justify-center">
                  <div className="relative h-[90%] w-[76%] sm:h-[78%] sm:w-[60%]">
                    <Image
                      src="/product/front.png"
                      alt="PECTUS Cooling Chest Primer"
                      fill
                      sizes="320px"
                      className="object-contain"
                    />
                  </div>
                </motion.div>

                {/* the one effect worth keeping: a contracting measure, in ink */}
                <motion.svg
                  aria-hidden
                  viewBox="0 0 200 250"
                  className="absolute inset-0 z-20 h-full w-full"
                  style={{ opacity: gridOpacity, scale: gridScale }}
                  preserveAspectRatio="xMidYMid meet"
                >
                  <g stroke="var(--ink-0)" strokeWidth={0.3} opacity={0.55} fill="none">
                    {[14, 28, 42, 56, 70, 84].map((r) => (
                      <circle key={r} cx={100} cy={125} r={r} />
                    ))}
                    {Array.from({ length: 16 }).map((_, i) => {
                      const a = (i * 22.5 * Math.PI) / 180;
                      return (
                        <line
                          key={i}
                          x1={100}
                          y1={125}
                          x2={100 + Math.cos(a) * 90}
                          y2={125 + Math.sin(a) * 90}
                        />
                      );
                    })}
                  </g>
                  <g stroke="var(--ink-1)" strokeWidth={0.7} fill="none">
                    <path d="M20 40 L20 25 L35 25" />
                    <path d="M180 40 L180 25 L165 25" />
                    <path d="M20 210 L20 225 L35 225" />
                    <path d="M180 210 L180 225 L165 225" />
                  </g>
                </motion.svg>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}

function Eyebrow() {
  return (
    <div className="flex items-center gap-3.5">
      <span className="h-px w-7 bg-[var(--hair-strong)]" />
      <span className="caps-loose text-[11px] font-semibold text-ink-2">The Architecture</span>
    </div>
  );
}
