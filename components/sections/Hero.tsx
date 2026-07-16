"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { TextReveal } from "@/components/ui/TextReveal";
import { Parallax } from "@/components/ui/Parallax";
import { ProductShot } from "@/components/product/ProductShot";

const fade = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
};

export function Hero({ shipMonth }: { shipMonth: string }) {
  return (
    <section id="top" className="relative overflow-hidden">
      <Container className="py-10 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          {/* Copy */}
          <div className="order-2 lg:order-1">
            <motion.div
              {...fade}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.2, 0, 0, 1] }}
              className="flex items-center gap-3.5"
            >
              <span className="h-px w-7 bg-[var(--hair-strong)]" />
              <span className="caps-loose text-[11px] font-semibold text-ink-2">
                Topicals for Men · Est. MMXXVI
              </span>
            </motion.div>

            <TextReveal
              as="h1"
              className="mt-7 font-bold uppercase text-ink-0 text-[clamp(46px,7vw,86px)] leading-[0.94] tracking-[-0.035em]"
              delay={0.15}
              lines={["Instant", "Confidence.", "Maximum", "Stiffness."]}
            />

            <motion.p
              {...fade}
              transition={{ duration: 0.5, delay: 0.5, ease: [0.2, 0, 0, 1] }}
              className="mt-8 max-w-lg text-[18px] leading-[1.6] text-ink-1"
            >
              A fast-acting cream with caffeine and menthol agents. Cools on
              contact and visibly firms the look of skin. Matte, lightly
              fragranced, undetectable under a shirt.
            </motion.p>

            <motion.div
              {...fade}
              transition={{ duration: 0.5, delay: 0.6, ease: [0.2, 0, 0, 1] }}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <a
                href="#buy"
                className="caps inline-flex items-center justify-center gap-2.5 rounded-sm border border-ink-0 bg-ink-0 px-9 py-[18px] text-[13.5px] font-semibold text-paper-0 transition-colors duration-200 hover:bg-ink-1"
              >
                Pre-order · £24
              </a>
              <a
                href="#how"
                className="caps inline-flex items-center justify-center rounded-sm border border-ink-0 px-9 py-[18px] text-[13.5px] font-semibold text-ink-0 transition-colors duration-200 hover:bg-ink-0 hover:text-paper-0"
              >
                The Science
              </a>
            </motion.div>

            <motion.div
              {...fade}
              transition={{ duration: 0.5, delay: 0.7, ease: [0.2, 0, 0, 1] }}
              className="mt-8 flex flex-wrap gap-x-5 gap-y-2 caps text-[10.5px] font-medium text-ink-3"
            >
              <span>Works in Minutes</span>
              <span aria-hidden>·</span>
              <span>Caffeine + Menthol</span>
              <span aria-hidden>·</span>
              <span>Ships {shipMonth}</span>
            </motion.div>
          </div>

          {/* Product — white specimen card on warm paper */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.2, 0, 0, 1] }}
            className="relative order-1 border bg-paper-2 lg:order-2"
            style={{ borderColor: "var(--hair)" }}
          >
            {/* inner keyline */}
            <div
              className="pointer-events-none absolute inset-4 z-10 border"
              style={{ borderColor: "var(--hair-strong)" }}
              aria-hidden
            />
            <span className="absolute left-5 top-4 z-20 caps text-[9px] font-medium text-ink-3">
              PECTUS / 001
            </span>
            <span className="absolute bottom-4 right-5 z-20 caps text-[9px] font-medium text-ink-3">
              20ml ℮
            </span>

            <Parallax amount={22} className="px-8 py-10 md:py-12">
              <div className="mx-auto max-w-[340px]">
                <ProductShot
                  src="/product/front.png"
                  alt="PECTUS Cooling Chest Primer, 20ml tube"
                  priority
                  melt={false}
                  sizes="(max-width: 1024px) 80vw, 420px"
                />
              </div>
            </Parallax>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
