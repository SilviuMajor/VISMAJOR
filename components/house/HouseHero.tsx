"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { Container } from "@/components/ui/Container";
import { PRODUCTS } from "@/lib/products";
import { Temple } from "@/components/house/Temple";

const EASE = [0.16, 1, 0.3, 1] as const;

export function HouseHero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const templeY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -60]);
  const templeFade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const lines: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.08, delayChildren: 0.12 } },
  };
  const line: Variants = {
    hidden: { y: reduce ? 0 : "115%" },
    show: { y: 0, transition: { duration: 0.95, ease: EASE } },
  };
  const fadeUp = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 } };

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-[calc(100svh-104px)] flex-col items-center justify-center overflow-hidden py-16"
    >
      {/* the house — a subtle classical temple behind the mark.
          Centering lives on the wrapper; parallax on the inner element, so
          Framer's transform doesn't clobber the -translate centering. */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 w-[min(1040px,118vw)] -translate-x-1/2 -translate-y-1/2">
        <motion.div aria-hidden style={{ y: templeY, opacity: templeFade }}>
          <Temple className="h-auto w-full opacity-[0.05]" />
        </motion.div>
      </div>

      <Container className="relative z-10 flex flex-col items-center text-center">
        {/* eyebrow */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          className="flex items-center gap-3.5"
        >
          <span className="h-px w-7 bg-[var(--hair-strong)]" />
          <span className="caps-loose text-[11px] font-semibold text-ink-2">
            Est. MMXXVI · Made in the UK
          </span>
          <span className="h-px w-7 bg-[var(--hair-strong)]" />
        </motion.div>

        {/* the name — made to land */}
        <motion.h1 variants={lines} initial="hidden" animate="show" className="mt-7">
          <span className="block overflow-hidden pb-[0.08em]">
            <motion.span
              variants={line}
              className="house block whitespace-nowrap text-ink-0"
              style={{ fontSize: "clamp(50px, 12.5vw, 184px)", lineHeight: 0.92 }}
            >
              VIS·MAJOR
            </motion.span>
          </span>
        </motion.h1>

        {/* moniker */}
        <motion.p
          {...fadeUp}
          transition={{ duration: 0.7, delay: 0.6, ease: EASE }}
          className="serif mt-5 uppercase text-ink-1"
          style={{
            fontSize: "clamp(12px, 1.5vw, 17px)",
            letterSpacing: "0.4em",
            fontWeight: 500,
          }}
        >
          An&nbsp;Unstoppable&nbsp;Force
        </motion.p>

        {/* sub-line */}
        <motion.p
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.74, ease: EASE }}
          className="mt-8 max-w-xl text-[17px] leading-[1.65] text-ink-1 md:text-[19px]"
        >
          Precision topicals for men. Three of them. Each cosmetic, temporary by
          design, engineered to do exactly one thing — well.
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.84, ease: EASE }}
          className="mt-9 flex flex-col gap-3 sm:flex-row"
        >
          <a
            href="#products"
            className="inline-flex items-center justify-center gap-2.5 rounded-[5px] border border-ink-0 bg-ink-0 px-9 py-[16px] text-[15px] font-semibold text-paper-0 transition-colors hover:bg-ink-1"
          >
            Meet the three →
          </a>
          <a
            href="#standard"
            className="inline-flex items-center justify-center rounded-[5px] border border-ink-0 px-9 py-[16px] text-[15px] font-semibold text-ink-0 transition-colors hover:bg-ink-0 hover:text-paper-0"
          >
            The standard
          </a>
        </motion.div>

        {/* triad — quick line to each product */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.92, ease: EASE }}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-3"
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

        {/* the flagship — a real product on the house page */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1, ease: EASE }}
          className="relative mt-12"
        >
          <span
            aria-hidden
            className="absolute left-1/2 top-1/2 -z-10 h-[58%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
            style={{ background: "radial-gradient(circle, rgba(20,19,15,0.05), transparent 70%)" }}
          />
          <motion.div
            animate={reduce ? {} : { y: [0, -9, 0] }}
            transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
            className="relative h-[24vh] min-h-[150px] w-[150px] md:w-[180px]"
          >
            <Image
              src="/product/front.png"
              alt="GY-NO! — a VIS MAJOR topical"
              fill
              priority
              sizes="200px"
              className="object-contain drop-shadow-[0_28px_46px_rgba(20,19,15,0.16)]"
            />
          </motion.div>
          <span className="mt-4 block caps text-[10px] font-medium text-ink-3">
            GY-NO! — the flagship
          </span>
        </motion.div>
      </Container>
    </section>
  );
}
