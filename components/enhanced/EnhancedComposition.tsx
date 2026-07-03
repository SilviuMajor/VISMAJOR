import { Announcement } from "@/components/nav/Announcement";
import { Header } from "@/components/nav/Header";
import { Ticker } from "@/components/sections/Ticker";
import { IsIsnt } from "@/components/sections/IsIsnt";
import { Footer } from "@/components/sections/Footer";
import { StickyBuyBar } from "@/components/ui/StickyBuyBar";

import { ScrollProgress } from "@/components/enhanced/ScrollProgress";
import { EnhancedHero } from "@/components/enhanced/EnhancedHero";
import { FirstBatchStrip } from "@/components/enhanced/FirstBatchStrip";
import { StickyArchitecture } from "@/components/enhanced/StickyArchitecture";
import { OneJob } from "@/components/enhanced/OneJob";
import { HorizontalUseBefore } from "@/components/enhanced/HorizontalUseBefore";
import { StickyBuy } from "@/components/enhanced/StickyBuy";
import { NotifyBand } from "@/components/enhanced/NotifyBand";
import { FinalCta } from "@/components/enhanced/FinalCta";
import { OtherProducts } from "@/components/house/OtherProducts";
import { ProductQuote } from "@/components/house/ProductQuote";
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
      <Header crumb="PECTUS" />
      <main>
        <EnhancedHero shipMonth={shipMonth} />
        <FirstBatchStrip shipMonth={shipMonth} />
        <SceneSection scene="/scenes/hall.png">
          <ProductQuote latin="Mens sana in corpore sano" translation="a sound mind in a sound body." />
        </SceneSection>
        <Ticker />
        <StickyArchitecture />
        <HorizontalUseBefore />
        <OneJob />
        <ProofV2 />
        <SceneSection scene="/scenes/home.png">
          <StickyBuy shipMonth={shipMonth} />
        </SceneSection>
        <SceneSection scene="/scenes/stone.png">
          <IsIsnt />
        </SceneSection>
        <SceneSection scene="/scenes/sculpt.png">
          <FaqV2 shipMonth={shipMonth} />
        </SceneSection>
        <FinalCta shipMonth={shipMonth} />
        <SceneSection scene="/scenes/extra.png">
          <NotifyBand />
        </SceneSection>
        <SceneSection scene="/scenes/hall.png">
          <OtherProducts current="pectus" />
        </SceneSection>
      </main>
      <Footer />
      <StickyBuyBar priceFrom="£24" label="PECTUS · 20ml" />
    </>
  );
}
