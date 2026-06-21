import { Announcement } from "@/components/nav/Announcement";
import { Header } from "@/components/nav/Header";
import { Ticker } from "@/components/sections/Ticker";
import { Features } from "@/components/sections/Features";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { IsIsnt } from "@/components/sections/IsIsnt";
import { Footer } from "@/components/sections/Footer";
import { StickyBuyBar } from "@/components/ui/StickyBuyBar";

import { ScrollProgress } from "@/components/enhanced/ScrollProgress";
import { EnhancedHero } from "@/components/enhanced/EnhancedHero";
import { StickyArchitecture } from "@/components/enhanced/StickyArchitecture";
import { HorizontalUseBefore } from "@/components/enhanced/HorizontalUseBefore";
import { HeritageBanner } from "@/components/enhanced/HeritageBanner";
import { StickyBuy } from "@/components/enhanced/StickyBuy";
import { NotifyBand } from "@/components/enhanced/NotifyBand";
import { FinalCta } from "@/components/enhanced/FinalCta";
import { OtherProducts } from "@/components/house/OtherProducts";

// Selected v2 renditions (chosen from /compare)
import { ProofV2 } from "@/components/v2/ProofV2";
import { IngredientsV2 } from "@/components/v2/IngredientsV2";
import { FaqV2 } from "@/components/v2/FaqV2";

/**
 * The locked enhanced site (white). Kinetic GY-NO! hero, pinned Architecture,
 * horizontal Use-Before, comparison, proof, the classical "Cool. Firm.
 * Composed." banner, then the sticky buy and close.
 */
export function EnhancedComposition() {
  const shipMonth = process.env.PREORDER_SHIP_MONTH ?? "September 2026";

  return (
    <>
      <ScrollProgress />
      <Announcement shipMonth={shipMonth} />
      <Header crumb="GY-NO!" />
      <main>
        <EnhancedHero shipMonth={shipMonth} />
        <Ticker />
        <StickyArchitecture />
        <Features />
        <HorizontalUseBefore />
        <HowItWorks />
        <ProofV2 />
        <StickyBuy shipMonth={shipMonth} />
        <IsIsnt />
        <IngredientsV2 />
        <FaqV2 shipMonth={shipMonth} />
        <FinalCta shipMonth={shipMonth} />
        <NotifyBand />
        <HeritageBanner />
        <OtherProducts current="gy-no" />
      </main>
      <Footer />
      <StickyBuyBar priceFrom="£24" label="GY-NO! · 20ml" />
    </>
  );
}
