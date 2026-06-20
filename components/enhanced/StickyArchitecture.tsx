"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { Container } from "@/components/ui/Container";

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
    line: "Then a film-forming complex seals in the shape — an instantly tighter look.",
  },
];

export function StickyArchitecture() {
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
  const coolGlow = useTransform(scrollYProgress, [0.34, 0.5, 0.67], [0, 0.5, 0]);

  return (
    <section id="science" ref={ref} className="relative h-[320vh] bg-paper-1">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <Container className="w-full">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Narrative */}
            <div className="order-2 lg:order-1">
              <div className="flex items-center gap-3.5">
                <span className="h-px w-7 bg-[var(--hair-strong)]" />
                <span className="caps-loose text-[11px] font-semibold text-ink-2">
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
                    <span className="block font-extrabold text-ink-3" style={{ fontSize: 22 }}>
                      {ACTIVES[active].n}
                    </span>
                    <h3
                      className="mt-2 font-extrabold uppercase text-ink-0"
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

            {/* Pinned product — white specimen card */}
            <div className="relative order-1 flex justify-center lg:order-2">
              <div
                className="relative border bg-paper-2 px-8 py-10"
                style={{ borderColor: "var(--hair)" }}
              >
                <div
                  className="pointer-events-none absolute inset-3 z-10 border"
                  style={{ borderColor: "var(--hair-strong)" }}
                  aria-hidden
                />
                <span className="absolute left-5 top-4 z-20 caps text-[9px] font-medium text-ink-3">
                  GY-NO! / 001
                </span>
                <div className="relative h-[40vh] w-[200px] md:h-[52vh] md:w-[260px]">
                  {/* cool glow (single sanctioned cold accent, sparing) */}
                  <motion.div
                    aria-hidden
                    style={{ opacity: coolGlow }}
                    className="absolute inset-0 z-0"
                  >
                    <div
                      className="absolute left-1/2 top-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
                      style={{ background: "radial-gradient(circle, rgba(55,138,221,0.28), transparent 65%)" }}
                    />
                  </motion.div>
                  <Image
                    src="/product/front.png"
                    alt="GY-NO! Nipple Tightening Cream"
                    fill
                    sizes="320px"
                    className="relative z-[1] object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
