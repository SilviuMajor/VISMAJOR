"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { TextReveal } from "@/components/ui/TextReveal";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function SharpFinalCta({ shipMonth }: { shipMonth?: string }) {
  return (
    <section className="relative overflow-hidden bg-ink-0 py-24 text-paper-0 md:py-32">
      <Container>
        {shipMonth && (
          <Eyebrow light>Ships {shipMonth} · free UK delivery</Eyebrow>
        )}

        <TextReveal
          as="h2"
          className="mt-8 font-bold uppercase text-paper-0 text-[clamp(46px,9vw,140px)] leading-[0.9] tracking-[-0.035em]"
          lines={["Clean slate.", "Every day."]}
        />

        <div className="mt-12 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="caps text-[10px] font-semibold text-paper-0/50">
              Free UK delivery · 30-day returns
            </span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: [0.2, 0, 0, 1] }}
            className="flex flex-col items-start gap-3 sm:flex-row sm:items-center"
          >
            <a
              href="#buy"
              className="inline-flex items-center justify-center gap-2.5 rounded-sm border border-paper-0 bg-paper-0 px-10 py-[20px] text-[14px] font-semibold text-ink-0 transition-colors hover:bg-transparent hover:text-paper-0"
            >
              Buy · £22
            </a>
            <a
              href="#notify"
              className="caps text-[11px] font-semibold text-paper-0/60 underline-offset-4 transition-colors hover:text-paper-0 hover:underline"
            >
              or join the newsletter
            </a>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
