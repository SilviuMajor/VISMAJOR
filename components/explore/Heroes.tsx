"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";

const ease = [0.2, 0, 0, 1] as const;
const up = {
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
};

function CtaRow({ dark = false }: { dark?: boolean }) {
  const primary = dark
    ? "border-paper-0 bg-paper-0 text-ink-0 hover:bg-transparent hover:text-paper-0"
    : "border-ink-0 bg-ink-0 text-paper-0 hover:bg-ink-1";
  const secondary = dark
    ? "border-paper-0/60 text-paper-0 hover:bg-paper-0 hover:text-ink-0"
    : "border-ink-0 text-ink-0 hover:bg-ink-0 hover:text-paper-0";
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <a className={`caps inline-flex items-center justify-center rounded-sm border px-9 py-[18px] text-[13px] font-semibold transition-colors ${primary}`}>
        Pre-order — £24
      </a>
      <a className={`caps inline-flex items-center justify-center rounded-sm border px-9 py-[18px] text-[13px] font-semibold transition-colors ${secondary}`}>
        The Science
      </a>
    </div>
  );
}

/* 01 — Kinetic wordmark (current live hero) */
export function HeroKinetic() {
  return (
    <section className="relative flex min-h-[88vh] flex-col items-center justify-center overflow-hidden py-16">
      <Container className="flex flex-col items-center">
        <motion.div {...up} transition={{ duration: 0.5, ease }} className="flex items-center gap-3.5">
          <span className="h-px w-7 bg-[var(--hair-strong)]" />
          <span className="caps-loose text-[11px] font-semibold text-ink-2">Topicals for Men · Est. MMXXVI</span>
          <span className="h-px w-7 bg-[var(--hair-strong)]" />
        </motion.div>
        <div className="relative mt-6 flex w-full flex-col items-center overflow-hidden">
          <motion.h1
            {...up}
            transition={{ duration: 0.7, ease }}
            className="w-full select-none overflow-hidden text-center font-bold uppercase leading-[0.8] tracking-[-0.04em] text-ink-0"
            style={{ fontSize: "clamp(66px, 19vw, 280px)" }}
          >
            <span className="block whitespace-nowrap">GY-NO!</span>
          </motion.h1>
          <motion.div {...up} transition={{ duration: 0.8, ease }} className="relative z-10 -mt-[11vw] h-[42vh] w-[200px] md:h-[48vh] md:w-[250px]">
            <Image src="/product/front.png" alt="GY-NO!" fill sizes="260px" className="object-contain drop-shadow-[0_26px_44px_rgba(20,19,15,0.20)]" />
          </motion.div>
        </div>
        <motion.p {...up} transition={{ duration: 0.6, ease }} className="mt-3 caps text-[13px] font-semibold text-ink-1">
          Instant Confidence. Maximum Stiffness.
        </motion.p>
        <motion.div {...up} transition={{ duration: 0.6, ease }} className="mt-8">
          <CtaRow />
        </motion.div>
      </Container>
    </section>
  );
}

/* 02 — Cinematic classical (full-bleed temple) */
export function HeroCinematic() {
  return (
    <section className="relative flex min-h-[88vh] items-end overflow-hidden bg-ink-0">
      <Image src="/product/heritage-hero.png" alt="GY-NO! among classical statuary" fill priority sizes="100vw" className="object-cover" />
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(20,19,15,0.4) 0%, rgba(20,19,15,0.04) 28%, rgba(20,19,15,0.32) 66%, rgba(20,19,15,0.8) 100%)" }} aria-hidden />
      <Container className="relative z-10 pb-16 pt-28">
        <motion.div {...up} transition={{ duration: 0.6, ease }} className="flex items-center gap-3.5">
          <span className="h-px w-8 bg-paper-0/50" />
          <span className="caps-loose text-[11px] font-semibold text-paper-0/80">A Superior Force · Est. MMXXVI</span>
        </motion.div>
        <motion.h1 {...up} transition={{ duration: 0.8, ease }} className="mt-5 font-bold uppercase text-paper-0" style={{ fontSize: "clamp(64px, 12vw, 180px)", lineHeight: 0.86, letterSpacing: "-0.04em" }}>
          GY-NO!
        </motion.h1>
        <motion.p {...up} transition={{ duration: 0.7, ease }} className="mt-5 max-w-lg text-[16px] leading-[1.6] text-paper-0/85 md:text-[18px]">
          A fast-acting cooling &amp; tightening cream for men. Works in minutes. Up to one hour of temporary firmness.
        </motion.p>
        <motion.div {...up} transition={{ duration: 0.7, ease }} className="mt-9">
          <CtaRow dark />
        </motion.div>
      </Container>
    </section>
  );
}

/* 03 — Editorial split (new angle product, right) */
export function HeroEditorial() {
  return (
    <section className="flex min-h-[86vh] items-center py-16">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="order-2 lg:order-1">
            <motion.div {...up} transition={{ duration: 0.5, ease }} className="flex items-center gap-3.5">
              <span className="h-px w-7 bg-[var(--hair-strong)]" />
              <span className="caps-loose text-[11px] font-semibold text-ink-2">Nipple Tightening Cream</span>
            </motion.div>
            <motion.h1 {...up} transition={{ duration: 0.7, ease }} className="mt-6 font-bold uppercase text-ink-0" style={{ fontSize: "clamp(48px, 6.5vw, 92px)", lineHeight: 0.92, letterSpacing: "-0.035em" }}>
              Cool.<br />Firm.<br />Composed.
            </motion.h1>
            <motion.p {...up} transition={{ duration: 0.7, ease }} className="mt-7 max-w-md text-[17px] leading-[1.6] text-ink-1">
              A precision cream with caffeine and menthol agents. Cools on contact, visibly firms — undetectable under a shirt.
            </motion.p>
            <motion.div {...up} transition={{ duration: 0.7, ease }} className="mt-9"><CtaRow /></motion.div>
            <motion.div {...up} transition={{ duration: 0.7, ease }} className="mt-9 flex flex-wrap gap-x-5 gap-y-2 caps text-[10.5px] font-semibold text-ink-3">
              <span>Works in Minutes</span><span aria-hidden>·</span><span>For Men</span><span aria-hidden>·</span><span>Made in the UK</span>
            </motion.div>
          </div>
          <motion.div {...up} transition={{ duration: 0.8, ease }} className="relative order-1 border bg-paper-2 lg:order-2" style={{ borderColor: "var(--hair)" }}>
            <div className="pointer-events-none absolute inset-4 z-10 border" style={{ borderColor: "var(--hair-strong)" }} aria-hidden />
            <span className="absolute left-5 top-4 z-20 caps text-[9px] font-medium text-ink-3">GY-NO! / 001</span>
            <div className="relative mx-auto aspect-square w-full max-w-[460px]">
              <Image src="/product/angle.png" alt="GY-NO! tube" fill sizes="480px" className="object-contain p-8" />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

/* 04 — Statement type (type-forward, minimal product) */
export function HeroStatement() {
  return (
    <section className="relative flex min-h-[86vh] items-center overflow-hidden bg-ink-0 py-16 text-paper-0">
      <Container className="relative">
        <motion.p {...up} transition={{ duration: 0.5, ease }} className="caps-loose text-[11px] font-semibold text-paper-0/60">
          GY-NO! · Nipple Tightening Cream
        </motion.p>
        <motion.h1 {...up} transition={{ duration: 0.8, ease }} className="mt-7 font-bold uppercase" style={{ fontSize: "clamp(46px, 8.5vw, 132px)", lineHeight: 0.9, letterSpacing: "-0.04em" }}>
          Instant<br />confidence.<br /><span className="text-paper-0/45">Maximum stiffness.</span>
        </motion.h1>
        <motion.div {...up} transition={{ duration: 0.7, ease }} className="mt-10 flex items-center gap-8">
          <CtaRow dark />
          <div className="relative hidden h-[120px] w-[90px] sm:block">
            <Image src="/product/front.png" alt="GY-NO!" fill sizes="90px" className="object-contain" />
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

/* 05 — Centred plinth (quiet luxury, new angle) */
export function HeroPlinth() {
  return (
    <section className="relative flex min-h-[88vh] flex-col items-center justify-center overflow-hidden bg-paper-1 py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(60% 50% at 50% 42%, rgba(20,19,15,0.05), transparent 70%)" }}
      />
      <Container className="relative flex flex-col items-center text-center">
        <motion.p {...up} transition={{ duration: 0.5, ease }} className="caps-loose text-[11px] font-semibold text-ink-2">
          Est. MMXXVI · Made in the UK
        </motion.p>
        <motion.div {...up} transition={{ duration: 0.9, ease }} className="relative mt-8 h-[46vh] w-[230px] md:w-[280px]">
          <Image src="/product/angle.png" alt="GY-NO! tube" fill priority sizes="300px" className="object-contain drop-shadow-[0_30px_50px_rgba(20,19,15,0.20)]" />
        </motion.div>
        <motion.h1 {...up} transition={{ duration: 0.7, ease }} className="mt-8 font-bold uppercase text-ink-0" style={{ fontSize: "clamp(34px, 4.4vw, 64px)", letterSpacing: "-0.025em", lineHeight: 1 }}>
          Cool. Firm. Composed.
        </motion.h1>
        <motion.p {...up} transition={{ duration: 0.7, ease }} className="mt-5 max-w-md text-[15px] leading-[1.6] text-ink-2">
          A pocket-size cooling &amp; tightening cream for men. Temporary by design.
        </motion.p>
        <motion.div {...up} transition={{ duration: 0.7, ease }} className="mt-8"><CtaRow /></motion.div>
      </Container>
    </section>
  );
}
