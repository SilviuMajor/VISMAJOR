import { Announcement } from "@/components/nav/Announcement";
import { Header } from "@/components/nav/Header";
import { Ticker } from "@/components/sections/Ticker";
import { Features } from "@/components/sections/Features";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { IsIsnt } from "@/components/sections/IsIsnt";
import { Ingredients } from "@/components/sections/Ingredients";
import { Faq } from "@/components/sections/Faq";
import { Footer } from "@/components/sections/Footer";
import { StickyBuyBar } from "@/components/ui/StickyBuyBar";

import { ScrollProgress } from "@/components/enhanced/ScrollProgress";
import { EnhancedHero } from "@/components/enhanced/EnhancedHero";
import { StickyArchitecture } from "@/components/enhanced/StickyArchitecture";
import { HorizontalUseBefore } from "@/components/enhanced/HorizontalUseBefore";
import { Comparison } from "@/components/enhanced/Comparison";
import { Proof } from "@/components/enhanced/Proof";
import { HeritageBanner } from "@/components/enhanced/HeritageBanner";
import { StickyBuy } from "@/components/enhanced/StickyBuy";
import { NotifyBand } from "@/components/enhanced/NotifyBand";
import { FinalCta } from "@/components/enhanced/FinalCta";

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
      <Header />
      <main>
        <EnhancedHero shipMonth={shipMonth} />
        <Ticker />
        <StickyArchitecture />
        <Features />
        <HorizontalUseBefore />
        <HowItWorks />
        <Comparison />
        <Proof />
        <StickyBuy shipMonth={shipMonth} />
        <IsIsnt />
        <Ingredients />
        <Faq shipMonth={shipMonth} />
        <FinalCta shipMonth={shipMonth} />
        <NotifyBand />
        <HeritageBanner />
      </main>
      <Footer />
      <StickyBuyBar priceFrom="£24" />
    </>
  );
}
