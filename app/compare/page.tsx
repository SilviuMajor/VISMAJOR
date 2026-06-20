import { ReactNode } from "react";
import { Container } from "@/components/ui/Container";

// Current sections
import { Features } from "@/components/sections/Features";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Comparison } from "@/components/enhanced/Comparison";
import { Proof } from "@/components/enhanced/Proof";
import { IsIsnt } from "@/components/sections/IsIsnt";
import { Ingredients } from "@/components/sections/Ingredients";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/enhanced/FinalCta";
import { NotifyBand } from "@/components/enhanced/NotifyBand";
import { Footer } from "@/components/sections/Footer";

// New (v2) sections
import { FeaturesV2 } from "@/components/v2/FeaturesV2";
import { HowItWorksV2 } from "@/components/v2/HowItWorksV2";
import { ComparisonV2 } from "@/components/v2/ComparisonV2";
import { ProofV2 } from "@/components/v2/ProofV2";
import { IsIsntV2 } from "@/components/v2/IsIsntV2";
import { IngredientsV2 } from "@/components/v2/IngredientsV2";
import { FaqV2 } from "@/components/v2/FaqV2";
import { FinalCtaV2 } from "@/components/v2/FinalCtaV2";
import { NotifyBandV2 } from "@/components/v2/NotifyBandV2";
import { FooterV2 } from "@/components/v2/FooterV2";

export const metadata = { title: "GY-NO! — Section Review · VIS MAJOR" };

function VersionTag({ n, label }: { n: "1" | "2"; label: string }) {
  return (
    <div className="bg-paper-0 py-3" style={{ borderTop: "1px solid var(--hair)" }}>
      <Container className="flex items-center gap-3">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ink-0 text-[11px] font-bold text-paper-0">
          {n}
        </span>
        <span className="caps text-[11px] font-semibold text-ink-2">{label}</span>
      </Container>
    </div>
  );
}

function Pair({
  idx,
  name,
  current,
  next,
}: {
  idx: string;
  name: string;
  current: ReactNode;
  next: ReactNode;
}) {
  return (
    <section>
      {/* section divider (sticky) */}
      <div
        className="sticky top-0 z-40 bg-ink-0 py-4 text-paper-0"
        style={{ borderBottom: "1px solid rgba(244,242,236,0.16)" }}
      >
        <Container className="flex items-baseline justify-between gap-4">
          <div className="flex items-baseline gap-4">
            <span className="caps text-[11px] font-semibold text-paper-0/50">{idx}</span>
            <span className="text-[17px] font-bold tracking-tight md:text-[19px]">{name}</span>
          </div>
          <span className="caps hidden text-[10px] font-medium text-paper-0/45 sm:block">
            Pick 1 (current) or 2 (new)
          </span>
        </Container>
      </div>

      <VersionTag n="1" label="Current" />
      {current}
      <VersionTag n="2" label="New" />
      {next}
    </section>
  );
}

export default function ComparePage() {
  const shipMonth = process.env.PREORDER_SHIP_MONTH ?? "September 2026";

  return (
    <div className="bg-paper-0">
      {/* top bar */}
      <header className="border-b bg-paper-0 py-6" style={{ borderColor: "var(--hair-strong)" }}>
        <Container className="flex items-center justify-between gap-4">
          <div className="flex items-baseline gap-4">
            <span className="house text-[15px] font-light text-ink-0">VIS&nbsp;MAJOR</span>
            <span className="caps text-[10.5px] font-semibold text-ink-3">Section Review</span>
          </div>
          <a
            href="/"
            className="caps inline-flex items-center gap-2 rounded-xs border border-[var(--hair-strong)] px-3 py-1.5 text-[11px] font-semibold text-ink-0 transition-colors hover:bg-ink-0 hover:text-paper-0"
          >
            ← Back to site
          </a>
        </Container>
      </header>

      {/* intro */}
      <div className="py-12 md:py-16">
        <Container>
          <div className="flex items-center gap-3.5">
            <span className="h-px w-7 bg-[var(--hair-strong)]" />
            <span className="caps-loose text-[11px] font-semibold text-ink-2">Compare · Old vs New</span>
          </div>
          <h1
            className="mt-6 max-w-3xl font-extrabold uppercase text-ink-0"
            style={{ fontSize: "clamp(30px, 4.4vw, 60px)", letterSpacing: "-0.03em", lineHeight: 0.98 }}
          >
            Each section, two ways.
          </h1>
          <p className="mt-6 max-w-xl text-[17px] leading-[1.6] text-ink-1">
            For every section below you'll see <b>① the current version</b> and{" "}
            <b>② a new rendition</b>, stacked. Scroll through and tell me{" "}
            <b>“1”</b> or <b>“2”</b> for each — I'll wire the winners onto the live site.
          </p>
        </Container>
      </div>

      <Pair idx="01" name="Features" current={<Features />} next={<FeaturesV2 />} />
      <Pair idx="02" name="How it works" current={<HowItWorks />} next={<HowItWorksV2 />} />
      <Pair idx="03" name="Why GY-NO! (comparison)" current={<Comparison />} next={<ComparisonV2 />} />
      <Pair idx="04" name="First-batch proof" current={<Proof />} next={<ProofV2 />} />
      <Pair idx="05" name="Honesty (is / isn't)" current={<IsIsnt />} next={<IsIsntV2 />} />
      <Pair idx="06" name="Ingredients & origin" current={<Ingredients />} next={<IngredientsV2 />} />
      <Pair idx="07" name="FAQ" current={<Faq shipMonth={shipMonth} />} next={<FaqV2 shipMonth={shipMonth} />} />
      <Pair idx="08" name="Final CTA" current={<FinalCta shipMonth={shipMonth} />} next={<FinalCtaV2 shipMonth={shipMonth} />} />
      <Pair idx="09" name="Notify band" current={<NotifyBand />} next={<NotifyBandV2 />} />
      <Pair idx="10" name="Footer" current={<Footer />} next={<FooterV2 />} />

      <div className="bg-ink-0 py-16 text-paper-0">
        <Container>
          <p className="caps-loose text-[11px] font-semibold text-paper-0/60">That's the set</p>
          <p className="mt-5 max-w-xl text-[17px] leading-[1.6] text-paper-0/85">
            Reply with your picks, e.g. “1: 2, 2: 1, 3: 2 …”. The hero, ticker,
            architecture, shop, and heritage banner aren't here — tell me if you
            want alternate takes on those too.
          </p>
          <a
            href="/"
            className="caps mt-8 inline-flex items-center gap-2.5 rounded-sm border border-paper-0 bg-paper-0 px-8 py-4 text-[12px] font-semibold text-ink-0 transition-colors hover:bg-transparent hover:text-paper-0"
          >
            ← Back to the live site
          </a>
        </Container>
      </div>
    </div>
  );
}
