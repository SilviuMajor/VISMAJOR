import { Announcement } from "@/components/nav/Announcement";
import { Header } from "@/components/nav/Header";
import { Ticker } from "@/components/sections/Ticker";
import { IsIsnt } from "@/components/sections/IsIsnt";
import { Footer } from "@/components/sections/Footer";
import { StickyBuyBar } from "@/components/ui/StickyBuyBar";

import { ScrollProgress } from "@/components/enhanced/ScrollProgress";
import { HeroTypeWindow } from "@/components/herolab/HeroTypeWindow";
import { TrustStrip } from "@/components/enhanced/TrustStrip";
import { ArchitectureV2 } from "@/components/v2site/ArchitectureV2";
import { OneJob } from "@/components/enhanced/OneJob";
import { HorizontalUseBefore } from "@/components/enhanced/HorizontalUseBefore";
import { StickyBuy } from "@/components/enhanced/StickyBuy";
import { NotifyBand } from "@/components/enhanced/NotifyBand";
import { FinalCta } from "@/components/enhanced/FinalCta";
import { OtherProducts } from "@/components/house/OtherProducts";
import { ProductQuote } from "@/components/house/ProductQuote";
import { ProductFormula } from "@/components/house/ProductFormula";
import { SceneSection } from "@/components/ui/SceneSection";
import { ProofV2 } from "@/components/v2/ProofV2";
import { FaqV2 } from "@/components/v2/FaqV2";

import { QuickBuy } from "@/components/v2site/QuickBuy";

/**
 * PECTUS, V2.
 *
 * Same shell and the same components as the live page — this is a review build,
 * not a rewrite, so anything not being proposed as a change is imported
 * unchanged from V1. Changed or added sections are wrapped in an element
 * carrying `data-v2="N"`, which is how V2Layer finds them and pins the numbered
 * marker. N refers to lib/v2-changes.ts.
 */
export function EnhancedCompositionV2() {
  const shipMonth = process.env.PREORDER_SHIP_MONTH ?? "September 2026";

  return (
    <>
      <ScrollProgress />
      <Announcement shipMonth={shipMonth} />
      <Header crumb="PECTUS" heroDark />
      <main>
        <HeroTypeWindow overlayAlwaysOn />
        <TrustStrip shipMonth={shipMonth} />

        {/* 14 — a way to buy without scrolling the whole essay first */}
        <div data-v2="14">
          <QuickBuy />
        </div>

        {/* 43 + 45 + 50 — mono, 240vh not 450vh, no pin under reduced motion */}
        <div data-v2="43">
          <ArchitectureV2 />
        </div>
        <Ticker />
        <HorizontalUseBefore />
        <OneJob />
        <ProductFormula
          product="pectus"
          intro="A short list of named ingredients. Coffee for a firmer-looking finish, mint for the cool hit you feel on contact. The rest is what carries them."
          href="#ingredients"
        />
        <ProofV2 />
        <SceneSection scene="/scenes/home.png">
          <StickyBuy shipMonth={shipMonth} />
        </SceneSection>
        <SceneSection scene="/scenes/stone.png">
          <IsIsnt />
        </SceneSection>
        <FaqV2 shipMonth={shipMonth} />
        <ProductQuote latin="Mens sana in corpore sano" translation="a sound mind in a sound body." />
        <FinalCta shipMonth={shipMonth} />
        <OtherProducts current="pectus" />
        <NotifyBand />
      </main>
      <Footer />
      <StickyBuyBar priceFrom="£18" label="PECTUS · 20ml" />
    </>
  );
}
