"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { TextReveal } from "@/components/ui/TextReveal";
import { Countdown } from "@/components/enhanced/Countdown";

const EASE = [0.16, 1, 0.3, 1] as const;
const STEEL = "rgba(55,138,221,0.9)";

/* Corner register tick — apothecary framing mark, paper-on-ink variant. */
function Corner({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`absolute h-2 w-2 ${className}`}
      style={{
        borderTop: "1px solid rgba(244,242,236,0.30)",
        borderLeft: "1px solid rgba(244,242,236,0.30)",
      }}
    />
  );
}

export function FinalCtaV2({ shipMonth }: { shipMonth: string }) {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-ink-0 py-24 text-paper-0 md:py-36">
      {/* Faint ledger rule + oversmall ghost glyph behind the type — depth without shadow */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: "rgba(244,242,236,0.12)" }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -right-[6%] top-1/2 hidden -translate-y-1/2 select-none font-black leading-none text-paper-0/[0.03] md:block"
        style={{ fontSize: "clamp(360px, 42vw, 760px)", letterSpacing: "-0.04em" }}
      >
        ™
      </span>

      <Container className="relative">
        {/* Index row — registration header, split across the band */}
        <div
          className="flex items-center justify-between border-b pb-5"
          style={{ borderColor: "rgba(244,242,236,0.16)" }}
        >
          <div className="flex items-center gap-3.5">
            <span className="h-px w-8" style={{ background: STEEL }} />
            <span className="caps-loose text-[11px] font-semibold text-paper-0/70">
              First batch · ships {shipMonth}
            </span>
          </div>
          <span className="caps hidden text-[10px] font-medium text-paper-0/40 sm:inline">
            Edition № 001
          </span>
        </div>

        {/* The type moment — full-bleed, dramatic, with a steel hairline under the second line */}
        <div className="relative mt-10 md:mt-14">
          <TextReveal
            as="h2"
            className="font-extrabold uppercase text-paper-0 text-[clamp(54px,11vw,168px)] leading-[0.86] tracking-[-0.04em]"
            lines={["Your edge,", "in a tube."]}
          />
          <motion.span
            aria-hidden
            className="mt-7 block h-px origin-left md:mt-9"
            style={{ background: "rgba(244,242,236,0.22)" }}
            initial={reduce ? { scaleX: 1 } : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.35, ease: EASE }}
          />
        </div>

        {/* Lower deck — countdown framed boldly on the left, CTA stacked on the right */}
        <div className="mt-12 grid grid-cols-1 gap-12 md:mt-16 md:grid-cols-[1.15fr_0.85fr] md:items-end md:gap-16">
          {/* Countdown, framed as a mechanical instrument panel */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <div className="flex items-center gap-3">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: STEEL }}
                aria-hidden
              />
              <span className="caps text-[10px] font-semibold text-paper-0/55">
                Launch price locks at pre-order
              </span>
            </div>

            <div
              className="relative mt-5 inline-flex rounded-sm px-7 py-6 md:px-9 md:py-7"
              style={{ border: "1px solid rgba(244,242,236,0.18)" }}
            >
              <Corner className="left-0 top-0" />
              <Corner className="right-0 top-0 rotate-90" />
              <Corner className="bottom-0 right-0 rotate-180" />
              <Corner className="bottom-0 left-0 -rotate-90" />
              <Countdown tone="paper" />
            </div>
          </motion.div>

          {/* CTA — the price as the loud moment */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.55, delay: 0.1, ease: EASE }}
            className="md:justify-self-end md:text-right"
          >
            <a
              href="#buy"
              className="group relative inline-flex w-full items-center justify-between gap-6 overflow-hidden rounded-sm border border-paper-0 bg-paper-0 px-8 py-[22px] text-ink-0 transition-colors duration-300 hover:text-paper-0 sm:w-auto md:px-10"
            >
              {/* ink sweep on hover — fills from the right */}
              <span
                aria-hidden
                className="absolute inset-0 origin-right scale-x-0 bg-ink-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
              />
              <span className="caps relative text-[14px] font-semibold">
                Pre-order
              </span>
              <span
                className="relative font-extrabold tabular-nums"
                style={{ fontSize: "clamp(22px, 2.4vw, 30px)", letterSpacing: "-0.02em" }}
              >
                £24
              </span>
            </a>

            <div className="mt-5 md:mt-6">
              <a
                href="#notify"
                className="caps text-[11px] font-semibold text-paper-0/55 underline-offset-4 transition-colors hover:text-paper-0 hover:underline"
              >
                or join the list
              </a>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
