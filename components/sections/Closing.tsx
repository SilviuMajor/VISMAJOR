"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { TextReveal } from "@/components/ui/TextReveal";
import { Parallax } from "@/components/ui/Parallax";
import { ProductShot } from "@/components/product/ProductShot";

export function Closing({ shipMonth }: { shipMonth: string }) {
  return (
    <section className="border-t bg-paper-1" style={{ borderColor: "var(--hair)" }}>
      <Container className="py-20 md:py-28">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="flex items-center gap-3.5">
              <span className="h-px w-7 bg-[var(--hair-strong)]" />
              <span className="caps-loose text-[11px] font-semibold text-ink-2">
                Pre-order now
              </span>
            </div>

            <TextReveal
              as="h2"
              className="mt-7 font-bold uppercase text-ink-0 text-[clamp(40px,6vw,80px)] leading-[0.96] tracking-[-0.03em]"
              lines={["Your edge,", "in a tube."]}
            />

            <p className="mt-7 max-w-md text-[17px] leading-[1.6] text-ink-1">
              First batch is limited and ships {shipMonth}. Reserve yours now —
              secure checkout, free UK delivery, 30-day returns.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.2, ease: [0.2, 0, 0, 1] }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <a
                href="#buy"
                className="caps inline-flex items-center gap-2.5 rounded-sm border border-ink-0 bg-ink-0 px-9 py-[18px] text-[13.5px] font-semibold text-paper-0 transition-colors hover:bg-ink-1"
              >
                Pre-order — £24
              </a>
              <a
                href="#notify"
                className="caps text-[11.5px] font-semibold text-ink-2 underline-offset-4 transition-colors hover:text-ink-0 hover:underline"
              >
                or notify me when it ships
              </a>
            </motion.div>
          </div>

          <Parallax amount={22} className="hidden lg:block">
            <div className="mx-auto max-w-[320px]">
              <ProductShot
                src="/product/front-cap.png"
                alt="PECTUS Cooling Chest Primer tube"
                melt={false}
                sizes="360px"
                imgClassName="drop-shadow-[0_26px_44px_rgba(20,19,15,0.18)]"
              />
            </div>
          </Parallax>
        </div>
      </Container>
    </section>
  );
}
