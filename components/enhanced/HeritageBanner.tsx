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
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-10%", "10%"]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-ink-0">
      <motion.div style={{ y }} className="absolute inset-0 -z-0">
        <div className="relative h-[120%] w-full">
          <Image
            src="/product/heritage-hero.png"
            alt="GY-NO! among classical statuary, a Tuscan vista beyond the arch"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
      </motion.div>

      {/* legibility scrim — darker on the left where the copy sits, keeps the
          product (right) and the bright arch readable */}
      <div
        aria-hidden
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(90deg, rgba(20,19,15,0.80) 0%, rgba(20,19,15,0.5) 38%, rgba(20,19,15,0.12) 70%, rgba(20,19,15,0.05) 100%)",
        }}
      />

      <Container className="relative z-20">
        <div className="flex min-h-[90vh] flex-col justify-center py-28 md:min-h-screen">
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
            One job. Done well. A cosmetic — temporary by design.
          </p>
        </div>
      </Container>
    </section>
  );
}
