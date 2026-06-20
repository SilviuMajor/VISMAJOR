"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/Eyebrow";

type Step = { n: string; title: string; body: string; meta: string };

const STEPS: Step[] = [
  {
    n: "01",
    title: "Apply",
    body: "A thin layer to clean, dry skin.",
    meta: "A pea-size amount",
  },
  {
    n: "02",
    title: "Wait",
    body: "Cooling and tightening within minutes.",
    meta: "Two to three minutes",
  },
  {
    n: "03",
    title: "Step Out",
    body: "Up to one hour of temporary firmness. Reapply as needed.",
    meta: "Lasts about an hour",
  },
];

export function HowItWorksV2() {
  const reduce = useReducedMotion();

  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHead n="02" title="How it works." />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_5fr] lg:gap-20">
          {/* ---- Timeline ---- */}
          <motion.ol
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: reduce ? 0 : 0.16 } },
            }}
            className="relative"
          >
            {/* Spine — full faint rail + an animated ink line that draws down */}
            <span
              aria-hidden
              className="absolute bottom-3 left-[11px] top-3 w-px bg-[var(--hair)] md:left-[15px]"
            />
            <motion.span
              aria-hidden
              className="absolute left-[11px] top-3 w-px origin-top bg-ink-0 md:left-[15px]"
              style={{ bottom: 12 }}
              initial={reduce ? { scaleY: 1 } : { scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            />

            {STEPS.map((s) => (
              <StepRow key={s.n} step={s} reduce={reduce} />
            ))}
          </motion.ol>

          {/* ---- Cinematic product panel ---- */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="lg:sticky lg:top-24 lg:self-start"
          >
            <figure
              className="group relative overflow-hidden rounded-sm border bg-paper-2"
              style={{ borderColor: "var(--hair)" }}
            >
              {/* register marks */}
              <Corner className="left-3 top-3" />
              <Corner className="right-3 top-3 rotate-90" />
              <Corner className="bottom-3 right-3 rotate-180" />
              <Corner className="bottom-3 left-3 -rotate-90" />

              <figcaption className="absolute left-4 top-4 z-10 caps text-[9px] font-medium text-ink-3">
                On Contact
              </figcaption>
              <span className="absolute bottom-4 right-4 z-10 caps text-[9px] font-medium text-ink-3">
                Fig. 02
              </span>

              <div className="relative aspect-[4/5] w-full">
                <Image
                  src="/product/squeeze.png"
                  alt="GY-NO! cream being dispensed from the tube"
                  fill
                  sizes="(max-width: 1024px) 90vw, 620px"
                  className="object-contain p-8 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] md:p-12"
                />
              </div>
            </figure>

            {/* caption strip under the plate */}
            <div
              className="mt-4 flex items-center justify-between border-t pt-3"
              style={{ borderColor: "var(--hair)" }}
            >
              <span className="caps text-[10px] font-medium text-ink-2">
                Topical, external use
              </span>
              <span className="house text-[10px] font-semibold text-ink-3">
                GY&middot;NO
              </span>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

/* ---- One timeline node ---- */
function StepRow({ step, reduce }: { step: Step; reduce: boolean | null }) {
  const variant: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <motion.li
      variants={variant}
      className="relative pb-12 pl-12 last:pb-0 md:pl-16"
    >
      {/* node marker sitting on the spine */}
      <span
        aria-hidden
        className="absolute left-0 top-1.5 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-paper-0 md:h-8 md:w-8"
        style={{ border: "1px solid var(--hair-strong)" }}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-ink-0" />
      </span>

      {/* ghost numeral behind the content */}
      <span
        aria-hidden
        className="pointer-events-none absolute -top-3 right-0 select-none font-light leading-none text-ink-0/[0.05] md:right-6"
        style={{ fontSize: "clamp(64px, 8vw, 120px)", letterSpacing: "-0.05em" }}
      >
        {step.n}
      </span>

      <div className="relative pt-0.5">
        <span className="caps text-[10px] font-semibold text-ink-3">
          Step {step.n}
        </span>
        <h4
          className="mt-2 text-ink-0"
          style={{
            fontSize: "clamp(24px, 3vw, 34px)",
            letterSpacing: "-0.02em",
            lineHeight: 1.05,
            fontWeight: 700,
          }}
        >
          {step.title}
        </h4>
        <p className="mt-3 max-w-[40ch] text-[16.5px] leading-relaxed text-ink-2">
          {step.body}
        </p>
        <span className="mt-4 inline-flex items-center gap-2.5">
          <span aria-hidden className="h-px w-6 bg-[var(--hair-strong)]" />
          <span className="caps text-[10px] font-medium text-ink-3">
            {step.meta}
          </span>
        </span>
      </div>
    </motion.li>
  );
}

function Corner({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`absolute z-10 h-2 w-2 ${className}`}
      style={{
        borderTop: "1px solid var(--hair-strong)",
        borderLeft: "1px solid var(--hair-strong)",
      }}
    />
  );
}
