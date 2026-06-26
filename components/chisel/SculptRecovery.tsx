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
    <section ref={ref} className="relative overflow-hidden bg-ink-0">
      {/* faint ember halo behind the figure (SCULPT's accent) */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[8%] top-1/2 z-0 h-[72vh] w-[44vh] -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(193,106,60,0.16), transparent 66%)" }}
      />

      {/* the classical figure — the sculpted ideal, luminous etching on ink */}
      <motion.div
        style={{ y }}
        className="pointer-events-none absolute inset-y-0 right-[-6%] z-0 w-[64vw] sm:right-[-2%] sm:w-[48vw] lg:w-[42vw]"
      >
        <Image
          src="/figures/athlete.png"
          alt="A classical athlete scraping with a strigil — the sculpted ideal"
          fill
          sizes="50vw"
          className="object-contain object-bottom opacity-90 invert mix-blend-screen"
        />
      </motion.div>

      {/* scrim: dark on the left, fading to clear over the figure */}
      <div
        aria-hidden
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(90deg, rgba(20,19,15,0.92) 0%, rgba(20,19,15,0.6) 42%, rgba(20,19,15,0.05) 72%, transparent 100%)",
        }}
      />

      <Container className="relative z-20">
        <div className="flex min-h-[88vh] flex-col justify-center py-28 md:min-h-screen">
          <div className="flex items-center gap-3.5">
            <span className="h-px w-8 bg-paper-0/45" />
            <span className="caps-loose text-[11px] font-semibold text-paper-0/75">
              The Ritual · After Training
            </span>
          </div>
          <h2
            className="mt-7 font-extrabold uppercase text-paper-0"
            style={{ fontSize: "clamp(40px, 6.5vw, 100px)", lineHeight: 0.9, letterSpacing: "-0.03em" }}
          >
            Carved,
            <br />
            not given.
          </h2>
          <p className="mt-7 max-w-lg text-[16.5px] leading-[1.65] text-paper-0/70">
            Deep-tissue and sports massage have been part of how athletes recover
            for as long as there have been athletes — worked into tired muscle
            after training to ease it and bring it back. SCULPT is the cream that
            makes it a ritual you can run yourself: a slip medium that lets the
            strokes glide, by hand or with the steel tools. Work it in after the
            session, when the muscle is worked hardest. The massage does what
            massage does. The cream makes it part of the routine — and leaves skin
            looking firmer and more defined.
          </p>
          <p className="mt-5 max-w-lg text-[16.5px] leading-[1.65] text-paper-0/70">
            The Romans carved their ideal in marble. You build yours — then work it
            in.
          </p>

          <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3">
            {["Deep-tissue", "Myofascial-inspired", "Lymphatic-style"].map((t) => (
              <span
                key={t}
                className="caps inline-flex items-center gap-2.5 text-[11px] font-semibold text-paper-0/80"
              >
                <span
                  className="inline-block h-1.5 w-1.5 rounded-full"
                  style={{ background: "#C16A3C" }}
                />
                {t}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
