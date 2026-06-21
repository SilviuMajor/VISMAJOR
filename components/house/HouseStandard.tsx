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
    <section id="standard" ref={ref} className="relative overflow-hidden bg-ink-0">
      {/* David — line-art inverted to a luminous etching on ink */}
      <motion.div
        style={{ y }}
        className="pointer-events-none absolute inset-y-0 right-[-6%] z-0 w-[64vw] sm:right-[-2%] sm:w-[48vw] lg:w-[42vw]"
      >
        <Image
          src="/product/david.png"
          alt="A classical figure — the standard"
          fill
          sizes="50vw"
          className="object-contain object-bottom opacity-90 invert mix-blend-screen"
        />
      </motion.div>

      {/* seat the copy: dark on the left, fading to clear over the figure */}
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
              The Standard
            </span>
          </div>
          <h2
            className="mt-7 font-extrabold uppercase text-paper-0"
            style={{ fontSize: "clamp(40px, 6.5vw, 104px)", lineHeight: 0.9, letterSpacing: "-0.03em" }}
          >
            One job.
            <br />
            Done well.
          </h2>
          <p className="mt-7 max-w-md text-[16.5px] leading-[1.6] text-paper-0/70">
            VIS MAJOR makes precision topicals for men. No theatre, no promises we
            cannot keep — cosmetic, temporary by design, engineered to do exactly
            one thing each. Made in the UK.
          </p>

          <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3">
            {PRODUCTS.map((p) => (
              <a key={p.slug} href={p.href} className="group inline-flex items-center gap-2.5">
                <span
                  className="inline-block h-2 w-2 rounded-full"
                  style={{ background: p.accentHex }}
                />
                <span className="caps text-[11.5px] font-semibold text-paper-0/85 transition-colors group-hover:text-paper-0">
                  {p.wordmark}
                </span>
              </a>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
