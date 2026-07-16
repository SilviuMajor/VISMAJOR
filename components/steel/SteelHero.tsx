"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { ToolPhoto } from "@/components/steel/ToolPhoto";

const EASE = [0.16, 1, 0.3, 1] as const;
const WORD = ["S", "T", "E", "E", "L"];

const wordContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};
const letter: Variants = {
  hidden: { y: "110%" },
  show: { y: 0, transition: { duration: 0.8, ease: EASE } },
};

/**
 * STEEL hero — the standalone tools line. The wordmark rises letter by letter;
 * the three tools fan out beneath it as the hero specimen.
 */
export function SteelHero({ priceFrom }: { priceFrom: string }) {
  const reduce = useReducedMotion();

  return (
    <section className="relative flex min-h-[92vh] flex-col overflow-hidden pt-10">
      <Container className="flex flex-1 flex-col">
        {/* eyebrow */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="flex items-center justify-center gap-3.5"
        >
          <span className="h-px w-8 bg-[var(--hair-strong)]" />
          <span className="caps-loose text-[11px] font-medium text-ink-2">
            Massage &amp; Therapy · Machined Steel
          </span>
          <span className="h-px w-8 bg-[var(--hair-strong)]" />
        </motion.div>

        {/* giant kinetic wordmark + the three tools */}
        <div className="relative mt-6 flex w-full flex-1 flex-col items-center justify-center overflow-hidden">
          <motion.h1 className="pointer-events-none relative z-0 w-full select-none text-center font-semibold uppercase font-serif leading-[0.9] tracking-[-0.04em] text-ink-0">
            <motion.span
              variants={wordContainer}
              initial="hidden"
              animate="show"
              className="inline-flex whitespace-nowrap"
              style={{ fontSize: "clamp(72px, 23vw, 340px)" }}
            >
              {WORD.map((c, i) => (
                <span
                  key={i}
                  className="inline-block overflow-hidden"
                  style={{ paddingTop: "0.1em", marginTop: "-0.1em" }}
                >
                  <motion.span variants={letter} className="inline-block">
                    {c}
                  </motion.span>
                </span>
              ))}
            </motion.span>
          </motion.h1>

          {/* the three tools — fanned, axe leading */}
          <motion.div
            initial={reduce ? false : { y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.95, delay: 0.55, ease: EASE }}
            className="relative z-10 -mt-[5vw] flex w-full items-center justify-center"
          >
            <motion.div
              animate={reduce ? {} : { y: [0, -7, 0] }}
              transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
              className="relative flex w-[min(640px,92vw)] items-center justify-center"
            >
              {/* floor glow */}
              <div
                aria-hidden
                className="pointer-events-none absolute bottom-[4%] left-1/2 h-[24%] w-[66%] -translate-x-1/2 rounded-full blur-2xl"
                style={{ background: "radial-gradient(circle, rgba(20,19,15,0.10), transparent 64%)" }}
              />
              <div className="relative h-[22vh] max-h-[230px] w-[30%] -rotate-[14deg] translate-y-[8%]">
                <ToolPhoto tool="sword" sizes="220px" />
              </div>
              <div className="relative z-10 -mx-[3%] h-[30vh] max-h-[320px] w-[42%] -rotate-[3deg]">
                <ToolPhoto tool="axe" sizes="320px" priority />
              </div>
              <div className="relative h-[20vh] max-h-[210px] w-[34%] rotate-[13deg] translate-y-[12%]">
                <ToolPhoto tool="dagger" sizes="220px" />
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* tagline + CTAs */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1, ease: EASE }}
          className="relative z-20 flex flex-col items-center pb-12 text-center"
        >
          <p className="max-w-lg text-[16px] leading-[1.6] text-ink-1 md:text-[18px]">
            Weighted, machined steel, for massage, recovery and working tension
            out of the muscle. The Sword, the Axe and the Dagger: many edges, one job.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#buy"
              className="rounded-[5px] bg-ink-0 px-7 py-[15px] text-[13px] font-semibold text-paper-0 transition-colors hover:bg-ink-1"
            >
              Pre-order · from {priceFrom}
            </a>
            <a
              href="#range"
              className="rounded-[5px] border border-ink-0 px-7 py-[15px] text-[13px] font-semibold text-ink-0 transition-colors hover:bg-ink-0 hover:text-paper-0"
            >
              The range
            </a>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
