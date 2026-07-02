"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { PRODUCTS } from "@/lib/products";

export function HouseStandard() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["8%", "-8%"]);

  return (
    <section
      id="standard"
      ref={ref}
      className="relative overflow-hidden border-y"
      style={{ borderColor: "var(--hair)" }}
    >
      {/* Classical figure — desktop: absolute on the right, soft grey figure on white */}
      <motion.div
        style={{ y }}
        className="pointer-events-none absolute inset-y-0 right-[-2%] z-0 hidden w-[48vw] sm:block lg:w-[42vw]"
      >
        <Image
          src="/figures/general.png"
          alt="A classical figure — the standard"
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
            <span className="caps-loose text-[11px] font-medium text-ink-2">
              The Standard
            </span>
          </div>
          <h2
            className="mt-7 font-bold uppercase text-ink-0"
            style={{ fontSize: "clamp(40px, 6.5vw, 104px)", lineHeight: 0.9, letterSpacing: "-0.03em" }}
          >
            One job.
            <br />
            Done well.
          </h2>
          <p className="mt-7 max-w-md text-[16.5px] leading-[1.6] text-ink-2">
            VIS MAJOR makes precision topicals for men. No theatre, no promises we
            cannot keep — cosmetic, temporary by design, each engineered to do
            exactly one thing. Made in the UK, to one standard.
          </p>

          <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3">
            {PRODUCTS.map((p) => (
              <a key={p.slug} href={p.href} className="group inline-flex items-center gap-2.5">
                <span
                  className="inline-block h-2 w-2 rounded-full"
                  style={{ background: "var(--ink-3)" }}
                />
                <span className="caps text-[11.5px] font-medium text-ink-1 transition-colors group-hover:text-ink-0">
                  {p.wordmark}
                </span>
              </a>
            ))}
          </div>

          {/* figure — mobile: in flow, below the copy */}
          <div className="relative mt-12 h-[46vh] w-full sm:hidden">
            <Image
              src="/figures/general.png"
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

          <p className="mt-12 max-w-md text-[13px] italic leading-relaxed text-ink-3 sm:mt-14">
            The figure was always in the marble. The work is only in revealing it.
          </p>
        </div>
      </Container>
    </section>
  );
}
