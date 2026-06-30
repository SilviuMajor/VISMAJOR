"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Container } from "@/components/ui/Container";

/**
 * The recovery + sculpted-ideal band. Recovery is attributed to the
 * well-established practice of deep-tissue / sports massage; SCULPT is the cream
 * that makes that massage a ritual. Aspiration via the classical ideal — not a
 * medical claim about the cream itself.
 *
 * Desktop: figure on the right, copy on the left. Mobile: copy stacked above
 * the figure so nothing overlaps the text.
 */
export function SculptRecovery() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["8%", "-8%"]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-y"
      style={{ borderColor: "var(--hair)" }}
    >
      {/* figure — desktop: absolute on the right, soft grey figure on white */}
      <motion.div
        style={{ y }}
        className="pointer-events-none absolute inset-y-0 right-[-2%] z-0 hidden w-[48vw] sm:block lg:w-[42vw]"
      >
        <Image
          src="/figures/athlete.png"
          alt="A classical athlete scraping with a strigil — the sculpted ideal"
          fill
          sizes="48vw"
          className="object-contain object-bottom opacity-[0.5] mix-blend-multiply"
          style={{
            maskImage: "linear-gradient(to right, transparent, black 42%)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 42%)",
          }}
        />
      </motion.div>

      <Container className="relative z-20">
        <div className="flex flex-col justify-center py-20 sm:min-h-screen sm:py-28">
          <div className="flex items-center gap-3.5">
            <span className="h-px w-8 bg-[var(--hair-strong)]" />
            <span className="caps-loose text-[11px] font-semibold text-ink-2">
              The Ritual · After Training
            </span>
          </div>
          <h2
            className="mt-7 font-bold uppercase text-ink-0"
            style={{ fontSize: "clamp(40px, 6.5vw, 100px)", lineHeight: 0.9, letterSpacing: "-0.03em" }}
          >
            Carved,
            <br />
            not given.
          </h2>
          <p className="mt-7 max-w-lg text-[16.5px] leading-[1.65] text-ink-2">
            Deep-tissue and sports massage have been part of how athletes recover
            for as long as there have been athletes — worked into tired muscle
            after training to ease it and bring it back. SCULPT is the cream that
            makes it a ritual you can run yourself: a slip medium that lets the
            strokes glide, by hand or with the steel tools. Work it in after the
            session, when the muscle is worked hardest. The massage does what
            massage does. The cream makes it part of the routine — and leaves skin
            looking firmer and more defined.
          </p>
          <p className="mt-5 max-w-lg text-[16.5px] leading-[1.65] text-ink-2">
            The Romans carved their ideal in marble. You build yours — then work it
            in.
          </p>

          <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3">
            {["Deep-tissue", "Myofascial-inspired", "Lymphatic-style"].map((t) => (
              <span
                key={t}
                className="caps inline-flex items-center gap-2.5 text-[11px] font-semibold text-ink-2"
              >
                <span
                  className="inline-block h-1.5 w-1.5 rounded-full"
                  style={{ background: "var(--ink-3)" }}
                />
                {t}
              </span>
            ))}
          </div>

          {/* figure — mobile: in flow, below the copy */}
          <div className="relative mt-12 h-[46vh] w-full sm:hidden">
            <Image
              src="/figures/athlete.png"
              alt=""
              fill
              sizes="100vw"
              className="object-contain object-center opacity-[0.5] mix-blend-multiply"
              style={{
                maskImage:
                  "linear-gradient(to bottom, transparent, black 20%, black 82%, transparent)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, transparent, black 20%, black 82%, transparent)",
              }}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
