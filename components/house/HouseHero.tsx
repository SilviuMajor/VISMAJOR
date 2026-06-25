"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { Container } from "@/components/ui/Container";
import { PRODUCTS } from "@/lib/products";

const EASE = [0.16, 1, 0.3, 1] as const;

// One faint halo per product — the house triad, stated once, very softly.
const ORBS: React.CSSProperties[] = [
  { top: "10%", left: "2%", height: "42vh", width: "42vh" },
  { bottom: "4%", left: "36%", height: "48vh", width: "48vh" },
  { top: "14%", right: "2%", height: "40vh", width: "40vh" },
];

export function HouseHero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const fade = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const driftY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -70]);

  const lines: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.08, delayChildren: 0.12 } },
  };
  const line: Variants = {
    hidden: { y: reduce ? 0 : "115%" },
    show: { y: 0, transition: { duration: 0.85, ease: EASE } },
  };
  const fadeUp = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 } };

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-[calc(100svh-104px)] items-center overflow-hidden py-16"
    >
      {/* triad backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        {PRODUCTS.map((p, i) => (
          <motion.div
            key={p.slug}
            style={{ ...ORBS[i], y: driftY, background: p.accentHex }}
            className="absolute rounded-full opacity-[0.07] blur-3xl"
          />
        ))}
      </div>

      <Container className="relative z-10">
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          style={{ opacity: fade }}
          className="flex items-center gap-3.5"
        >
          <span className="h-px w-7 bg-[var(--hair-strong)]" />
          <span className="caps-loose text-[11px] font-semibold text-ink-2">
            Est. MMXXVI · Made in the UK
          </span>
        </motion.div>

        <motion.h1
          variants={lines}
          initial="hidden"
          animate="show"
          className="mt-7"
        >
          <span className="block overflow-hidden">
            <motion.span
              variants={line}
              className="block font-light uppercase text-ink-0"
              style={{ fontSize: "clamp(42px, 10vw, 124px)", letterSpacing: "0.14em", lineHeight: 1 }}
            >
              VIS&nbsp;MAJOR
            </motion.span>
          </span>
        </motion.h1>

        <motion.p
          {...fadeUp}
          transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
          className="mt-5 font-medium tracking-tight text-ink-0"
          style={{ fontSize: "clamp(21px, 3vw, 36px)", lineHeight: 1.1 }}
        >
          A greater force.
        </motion.p>

        <motion.p
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.62, ease: EASE }}
          className="mt-7 max-w-xl text-[17px] leading-[1.65] text-ink-1 md:text-[19px]"
        >
          Precision topicals for men. Three of them. Each cosmetic, temporary by
          design, engineered to do exactly one thing — well.
        </motion.p>

        {/* triad chips → each product */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.66, ease: EASE }}
          className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3"
        >
          {PRODUCTS.map((p) => (
            <a key={p.slug} href={p.href} className="group inline-flex items-center gap-2.5">
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ background: p.accentHex }}
              />
              <span className="caps text-[12px] font-semibold text-ink-1 transition-colors group-hover:text-ink-0">
                {p.wordmark}
              </span>
              <span className="caps text-[10px] font-medium text-ink-3">{p.signature}</span>
            </a>
          ))}
        </motion.div>

        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.78, ease: EASE }}
          className="mt-10 flex flex-col gap-3 sm:flex-row"
        >
          <a
            href="#products"
            className="caps inline-flex items-center justify-center gap-2.5 rounded-sm border border-ink-0 bg-ink-0 px-9 py-[18px] text-[13px] font-semibold text-paper-0 transition-colors hover:bg-ink-1"
          >
            Meet the three →
          </a>
          <a
            href="#standard"
            className="caps inline-flex items-center justify-center rounded-sm border border-ink-0 px-9 py-[18px] text-[13px] font-semibold text-ink-0 transition-colors hover:bg-ink-0 hover:text-paper-0"
          >
            The standard
          </a>
        </motion.div>
      </Container>
    </section>
  );
}
