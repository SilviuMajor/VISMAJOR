"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { TextReveal } from "@/components/ui/TextReveal";

export function HeritageBanner() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["7%", "-7%"]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-ink-0">
      {/* faint cold halo behind the figure (single sanctioned cold accent) — desktop */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[8%] top-1/2 z-0 hidden h-[72vh] w-[44vh] -translate-y-1/2 rounded-full blur-3xl sm:block"
        style={{ background: "radial-gradient(circle, rgba(20,19,15,0.06), transparent 66%)" }}
      />

      {/* Classical figure — desktop: absolute on the right */}
      <motion.div
        style={{ y }}
        className="pointer-events-none absolute inset-y-0 right-[-2%] z-0 hidden w-[48vw] sm:block lg:w-[42vw]"
      >
        <Image
          src="/figures/elder.png"
          alt="A classical figure — the standard"
          fill
          sizes="48vw"
          className="object-contain object-bottom opacity-90 invert mix-blend-screen"
        />
      </motion.div>

      {/* scrim — desktop only: dark on the left, fading to clear over the figure */}
      <div
        aria-hidden
        className="absolute inset-0 z-10 hidden sm:block"
        style={{
          background:
            "linear-gradient(90deg, rgba(20,19,15,0.9) 0%, rgba(20,19,15,0.55) 42%, rgba(20,19,15,0.05) 72%, transparent 100%)",
        }}
      />

      <Container className="relative z-20">
        <div className="flex flex-col justify-center py-20 sm:min-h-screen sm:py-28">
          <div className="flex items-center gap-3.5">
            <span className="h-px w-8 bg-paper-0/45" />
            <span className="caps-loose text-[11px] font-semibold text-paper-0/75">
              The Standard
            </span>
          </div>
          <TextReveal
            as="h2"
            className="mt-7 font-extrabold uppercase text-paper-0 text-[clamp(36px,6vw,96px)] leading-[0.92] tracking-[-0.03em]"
            lines={["Cool. Firm.", "Composed."]}
          />
          <p className="mt-7 max-w-md text-[16.5px] leading-[1.6] text-paper-0/70">
            Engineered for men. One job, done well — a cosmetic, temporary by design.
          </p>

          {/* figure — mobile: in flow, below the copy */}
          <div className="relative mt-10 h-[46vh] w-full sm:hidden">
            <Image
              src="/figures/elder.png"
              alt=""
              fill
              sizes="100vw"
              className="object-contain object-center opacity-90 invert mix-blend-screen"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
