"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { TextReveal } from "@/components/ui/TextReveal";
import { Countdown } from "@/components/enhanced/Countdown";

export function FinalCta({ shipMonth }: { shipMonth: string }) {
  return (
    <section className="relative overflow-hidden bg-ink-0 py-24 text-paper-0 md:py-32">
      <Container>
        <div className="flex items-center gap-3.5">
          <span className="h-px w-8 bg-paper-0/40" />
          <span className="caps-loose text-[11px] font-semibold text-paper-0/70">
            First batch · ships {shipMonth}
          </span>
        </div>

        <TextReveal
          as="h2"
          className="mt-8 font-extrabold uppercase text-paper-0 text-[clamp(46px,9vw,140px)] leading-[0.9] tracking-[-0.035em]"
          lines={["Your edge,", "in a tube."]}
        />

        <div className="mt-12 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="caps text-[10px] font-semibold text-paper-0/50">
              Launch price locks at pre-order
            </span>
            <div className="mt-4">
              <Countdown tone="paper" />
            </div>
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
              className="inline-flex items-center justify-center gap-2.5 rounded-[5px] border border-paper-0 bg-paper-0 px-10 py-[20px] text-[14px] font-semibold text-ink-0 transition-colors hover:bg-transparent hover:text-paper-0"
            >
              Pre-order — £24
            </a>
            <a
              href="#notify"
              className="caps text-[11px] font-semibold text-paper-0/60 underline-offset-4 transition-colors hover:text-paper-0 hover:underline"
            >
              or join the list
            </a>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
