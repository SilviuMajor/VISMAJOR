"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { Container } from "@/components/ui/Container";
import { PRODUCTS } from "@/lib/products";
import { SceneBackdrop } from "@/components/ui/SceneBackdrop";

const EASE = [0.16, 1, 0.3, 1] as const;

/** `.house` tracking — the wordmark carries a trailing letter-space we discount
 *  so the meaning line matches the mark's INK, not its box. */
const HOUSE_TRACKING = 0.18;

export function HouseHero() {
  const reduce = useReducedMotion();
  const markRef = useRef<HTMLSpanElement>(null);
  const meaningRef = useRef<HTMLParagraphElement>(null);

  // Fit the meaning line to exactly the width of VIS·MAJOR. A vw clamp can't do
  // this: the mark caps at 184px while the line would keep growing, so they
  // drift apart at wide viewports. Measure instead, and re-fit on resize/font
  // load. Below sm the line wraps to a readable block (matching the mark's
  // width there would make it far too small to read).
  useEffect(() => {
    const mark = markRef.current;
    const line = meaningRef.current;
    if (!mark || !line) return;

    const fit = () => {
      if (window.innerWidth < 640) {
        line.style.fontSize = "";
        return;
      }
      const markSize = parseFloat(getComputedStyle(mark).fontSize);
      const target = mark.getBoundingClientRect().width - HOUSE_TRACKING * markSize;
      if (target <= 0) return;
      const REF = 100;
      line.style.fontSize = `${REF}px`;
      const natural = line.getBoundingClientRect().width;
      if (!natural) return;
      line.style.fontSize = `${(target / natural) * REF}px`;
    };

    // Both the mark and the line reflow when Cinzel swaps in, so a single pass
    // can fit against half-loaded metrics. Re-fit each frame until the result
    // stops moving (converges in a frame or two; re-runs after a font swap).
    let frames = 0;
    let lastSize = "";
    const settle = () => {
      fit();
      const size = line.style.fontSize;
      if (size !== lastSize && frames < 60) {
        lastSize = size;
        frames += 1;
        requestAnimationFrame(settle);
      }
    };
    const restart = () => {
      frames = 0;
      lastSize = "";
      settle();
    };

    restart();
    const ro = new ResizeObserver(restart);
    ro.observe(mark);
    window.addEventListener("resize", restart);
    document.fonts?.ready.then(restart).catch(() => {});
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", restart);
    };
  }, []);

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
      id="top"
      className="relative flex min-h-[calc(100svh-104px)] flex-col items-center justify-center overflow-hidden py-16"
    >
      {/* the house — a subtle classical temple behind the mark.
          Centering lives on the wrapper; parallax on the inner element, so
          Framer's transform doesn't clobber the -translate centering. */}
      {/* the house — the classical temple scene behind the mark */}
      <SceneBackdrop src="/scenes/home.png" opacity={0.44} veilStrength={0.4} position="object-center" />

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
              ref={markRef}
              variants={line}
              className="house block whitespace-nowrap text-ink-0"
              style={{ fontSize: "clamp(50px, 12.5vw, 184px)", lineHeight: 0.92, fontWeight: 600 }}
            >
              VIS·MAJOR
            </motion.span>
          </span>
        </motion.h1>

        {/* the meaning — folded in from the old quote band */}
        {/* the meaning — measured to sit exactly as wide as the mark above it
            (see the fit effect); tight tracking so it reads as one dense line */}
        <motion.p
          ref={meaningRef}
          {...fadeUp}
          transition={{ duration: 0.7, delay: 0.6, ease: EASE }}
          className="serif mx-auto mt-5 max-w-[20rem] whitespace-normal text-ink-1 sm:mt-6 sm:w-max sm:max-w-none sm:whitespace-nowrap"
          style={{
            fontSize: "clamp(15px, 4.4vw, 22px)",
            lineHeight: 1.35,
            letterSpacing: "0",
            fontWeight: 500,
          }}
        >
          The Roman name for &lsquo;AN UNSTOPPABLE FORCE&rsquo;, a power beyond
          resistance.
        </motion.p>

        {/* positioning line */}
        <motion.p
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.74, ease: EASE }}
          className="mt-6 max-w-xl text-[17px] leading-[1.65] text-ink-1 md:text-[19px]"
        >
          Precision topicals for men, engineered to do exactly one thing&hellip;
          enhance what you were born with.
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

      </Container>
    </section>
  );
}
