import { Announcement } from "@/components/nav/Announcement";
import { Header } from "@/components/nav/Header";
import { Ticker } from "@/components/sections/Ticker";
import { IsIsnt } from "@/components/sections/IsIsnt";
import { Footer } from "@/components/sections/Footer";
import { StickyBuyBar } from "@/components/ui/StickyBuyBar";

import { ScrollProgress } from "@/components/enhanced/ScrollProgress";
import { HeroTypeWindow } from "@/components/herolab/HeroTypeWindow";
import { TrustStrip } from "@/components/enhanced/TrustStrip";
import { StickyArchitecture } from "@/components/enhanced/StickyArchitecture";
import { OneJob } from "@/components/enhanced/OneJob";
import { HorizontalUseBefore } from "@/components/enhanced/HorizontalUseBefore";
import { StickyBuy } from "@/components/enhanced/StickyBuy";
import { NotifyBand } from "@/components/enhanced/NotifyBand";
import { FinalCta } from "@/components/enhanced/FinalCta";
import { OtherProducts } from "@/components/house/OtherProducts";
import { ProductQuote } from "@/components/house/ProductQuote";
import { ProductFormula } from "@/components/house/ProductFormula";
import { SceneSection } from "@/components/ui/SceneSection";

// Selected v2 renditions (chosen from /compare)
import { ProofV2 } from "@/components/v2/ProofV2";
import { FaqV2 } from "@/components/v2/FaqV2";

/**
 * The locked enhanced site (white). Kinetic PECTUS hero, pinned Architecture,
 * horizontal Use-Before, comparison, proof, the classical "Cool. Firm.
 * Composed." banner, then the sticky buy and close.
 */
export function EnhancedComposition() {
  const shipMonth = process.env.PREORDER_SHIP_MONTH ?? "September 2026";

  return (
    <>
      <ScrollProgress />
      <Announcement shipMonth={shipMonth} />
      <Header crumb="PECTUS" heroDark />
      <main>
        <HeroTypeWindow overlayAlwaysOn />
        <TrustStrip shipMonth={shipMonth} />
        <StickyArchitecture />
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
        <IsIsnt />
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
