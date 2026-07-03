"use client";

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
import { Specimen, PlaceholderNote } from "@/components/chisel/Specimen";
import { CreamTube, EMBER } from "@/components/chisel/Art";

/**
 * THE ARCHITECTURE (id="science") — a pinned scroll sequence at the calibre of
 * PECTUS's StickyArchitecture, with SCULPT's own execution: three actives, an
 * active rail, and an ember accent that builds on the pinned cream as you pass
 * through the phases. Claim-safe: every line is feel & finish only.
 */

const ACTIVES = [
  {
    n: "01",
    name: "Slip Complex",
    line: "A slip and glide complex that lets the cream work smoothly — a long, even slip so you can massage an area by hand or with the tool.",
  },
  {
    n: "02",
    name: "Caffeine",
    line: "A high-load caffeine complex for a firmer, more awake, de-puffed look across the worked area.",
  },
  {
    n: "03",
    name: "Conditioning",
    line: "A conditioning, smoothing agent sets the finish — a matte, smoother-looking surface that reads sharp until you wash it off.",
  },
];

export function ChiselArchitecture() {
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
  // the ember accent climbs the whole way through (the brand signature)
  const warmGlow = useTransform(scrollYProgress, [0, 0.5, 1], reduce ? [0.12, 0.12, 0.12] : [0.05, 0.35, 0.6]);
  const warmScale = useTransform(scrollYProgress, [0, 1], [0.85, 1.15]);
  const bandY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-6, 6]);

  return (
    <section id="science" ref={ref} className="relative h-[320vh] bg-paper-1">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <Container className="relative z-10 w-full">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Narrative */}
            <div className="order-2 lg:order-1">
              <div className="flex items-center gap-3.5">
                <span className="h-px w-7 bg-[var(--hair-strong)]" />
                <span className="caps-loose text-[11px] font-medium text-ink-2">
                  The Architecture
                </span>
              </div>

              <div className="relative mt-8 min-h-[230px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.4, ease: [0.2, 0, 0, 1] }}
                  >
                    <span className="block font-bold text-ink-3" style={{ fontSize: 22 }}>
                      {ACTIVES[active].n}
                    </span>
                    <h3
                      className="mt-2 font-bold uppercase text-ink-0"
                      style={{ fontSize: "clamp(44px, 6vw, 86px)", letterSpacing: "-0.03em", lineHeight: 0.95 }}
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
                    className="absolute inset-0 origin-top"
                  >
                    {/* the rail fills with the ember brand accent */}
                    <div className="h-full w-full" style={{ background: EMBER }} />
                  </motion.div>
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

            {/* Pinned cream — specimen card, ember accent building as you scroll */}
            <div className="relative order-1 flex justify-center lg:order-2">
              <Specimen
                className="px-8 py-10"
                topLeft="SCULPT / 002"
                topRight="Cream"
                bottomRight="50ml ℮"
                bottomLeft={<PlaceholderNote>Specimen — cream</PlaceholderNote>}
              >
                <div className="relative h-[40vh] w-[150px] md:h-[52vh] md:w-[190px]">
                  {/* ember accent glow — builds with scroll */}
                  <motion.div
                    aria-hidden
                    style={{ opacity: warmGlow }}
                    className="absolute inset-0 z-0"
                  >
                    <motion.div
                      style={{ scale: warmScale }}
                      className="absolute left-1/2 top-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
                    >
                      <div
                        className="h-full w-full rounded-full"
                        style={{ background: `radial-gradient(circle, ${EMBER}47, transparent 65%)` }}
                      />
                    </motion.div>
                  </motion.div>
                  {/* a contour band that drifts as you scroll */}
                  <motion.div
                    aria-hidden
                    style={{ y: bandY }}
                    className="relative z-[1] h-full w-full"
                  >
                    <CreamTube className="h-full w-full" />
                  </motion.div>
                </div>
              </Specimen>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
