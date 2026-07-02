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

import { ProofV2 } from "@/components/v2/ProofV2";
import { FaqV2 } from "@/components/v2/FaqV2";

/**
 * MOCK — a clone of the PECTUS landing (EnhancedComposition) with a DIFFERENT
 * classical scene washed behind each white section, to scope whether the
 * "scenes throughout" idea works site-wide. Lives at /pectus-scenes so the real
 * /pectus is untouched. Dark bands (FirstBatch, Ticker, Use-Before, Proof,
 * FinalCta) and the already-busy Architecture band are left plain.
 */
export function ScenesComposition() {
  const shipMonth = process.env.PREORDER_SHIP_MONTH ?? "September 2026";

  return (
    <>
      <ScrollProgress />
      <Announcement shipMonth={shipMonth} />
      <Header crumb="PECTUS" />
      <main>
        {/* hero already carries /scenes/pectus */}
        <EnhancedHero shipMonth={shipMonth} />
        <FirstBatchStrip shipMonth={shipMonth} />
        <SceneSection scene="/scenes/hall.png">
          <ProductQuote latin="Mens sana in corpore sano" translation="a sound mind in a sound body." />
        </SceneSection>
        <Ticker />
        <StickyArchitecture />
        <HorizontalUseBefore />
        <SceneSection scene="/scenes/sculpt.png">
          <OneJob />
        </SceneSection>
        <ProofV2 />
        <SceneSection scene="/scenes/home.png">
          <StickyBuy shipMonth={shipMonth} />
        </SceneSection>
        <SceneSection scene="/scenes/stone.png">
          <IsIsnt />
        </SceneSection>
        <SceneSection scene="/scenes/pectus.png">
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
