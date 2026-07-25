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
    img: "/ingredients/clay.png",
  },
  {
    n: "02",
    name: "Activated Charcoal",
    tag: "The lift",
    line: "Activated charcoal binds to grime and lifts it away on the rinse, leaving nothing behind but clean skin.",
    img: "/ingredients/charcoal.png",
  },
  {
    n: "03",
    name: "Peppermint",
    tag: "The finish",
    line: "A touch of natural peppermint leaves a cool, fresh finish as it rinses: gentle and sulphate-free, never stripping.",
    img: "/ingredients/mint.png",
  },
];


export function SharpActives() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const railScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Match PECTUS's Architecture: three equal thirds over a tall (450vh) pin, and
  // each diagram DRAWS IN across its own third — previously `draw` was global and
  // finished in the first third, so charcoal and mint arrived already-drawn (the
  // charcoal step felt too short). Now every step gets the full scroll to animate.
  const [draw, setDraw] = useState(reduce ? 1 : 0.2);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const phase = v < 0.34 ? 0 : v < 0.67 ? 1 : 2;
    setActive(phase);
    if (reduce) {
      setDraw(1);
      return;
    }
    const lo = phase === 0 ? 0 : phase === 1 ? 0.34 : 0.67;
    const hi = phase === 0 ? 0.34 : phase === 1 ? 0.67 : 1;
    const local = Math.min(1, Math.max(0, (v - lo) / (hi - lo)));
    setDraw(0.2 + local * 0.8);
  });

  return (
    <section id="science" ref={ref} className="relative h-[450vh] bg-paper-1">
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
                  STONE / 002
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

                {/* swapping specimen plate — the raw material, drawn. It settles
                    across its own third of the pin (`draw`), so each step's
                    scroll does visible work rather than snapping into place. */}
                <div className="absolute inset-3 z-10 flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={active}
                      className="relative h-[86%] w-[86%]"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.02 }}
                      transition={{ duration: 0.35, ease: [0.2, 0, 0, 1] }}
                    >
                      <motion.div
                        className="relative h-full w-full"
                        style={{ scale: reduce ? 1 : 0.965 + draw * 0.035 }}
                      >
                        <Image
                          src={ACTIVES[active].img}
                          alt={`${ACTIVES[active].name} — specimen illustration`}
                          fill
                          sizes="(max-width: 640px) 60vw, 440px"
                          className="melt object-contain"
                          priority={active === 0}
                        />
                      </motion.div>
                    </motion.div>
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
