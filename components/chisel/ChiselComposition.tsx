// SCULPT — the house's second product (route /sculpt; formerly CHISEL).
// Mirrors EnhancedComposition's shell, but every in-page section is SCULPT's own.
// Server component: the interactive parts are client components imported below.

import { Announcement } from "@/components/nav/Announcement";
import { Header } from "@/components/nav/Header";
import { Footer } from "@/components/sections/Footer";
import { StickyBuyBar } from "@/components/ui/StickyBuyBar";
import { ScrollProgress } from "@/components/enhanced/ScrollProgress";
import { OtherProducts } from "@/components/house/OtherProducts";
import { ProductQuote } from "@/components/house/ProductQuote";
import { FirstBatchStrip } from "@/components/enhanced/FirstBatchStrip";

import { HeroTypeWindow } from "@/components/herolab/HeroTypeWindow";
import { ChiselTicker } from "@/components/chisel/ChiselTicker";
import { SculptWhatItDoes } from "@/components/chisel/SculptWhatItDoes";
import { SculptEffects } from "@/components/chisel/SculptEffects";
import { SculptRecovery } from "@/components/chisel/SculptRecovery";
import { ChiselArchitecture } from "@/components/chisel/ChiselArchitecture";
import { ChiselProof } from "@/components/chisel/ChiselProof";
import { ChiselBuy } from "@/components/chisel/ChiselBuy";
import { SculptFieldManual } from "@/components/chisel/SculptFieldManual";
import { SculptTools } from "@/components/chisel/SculptTools";
import { ChiselIsIsnt } from "@/components/chisel/ChiselIsIsnt";
import { ChiselFaq } from "@/components/chisel/ChiselFaq";
import { ChiselFinalCta } from "@/components/chisel/ChiselFinalCta";
import { ChiselNotify } from "@/components/chisel/ChiselNotify";

export function ChiselComposition() {
  const shipMonth = process.env.PREORDER_SHIP_MONTH ?? "September 2026";

  return (
    <>
      <ScrollProgress />
      <Announcement
        message={`SCULPT · the Contour & Recovery Cream · pre-order · first batch ships ${shipMonth}`}
        messageShort={`SCULPT · pre-order · ships ${shipMonth}`}
      />
      <Header crumb="SCULPT" cta={{ href: "#buy", label: "Pre-order" }} heroDark />
      <main>
        <HeroTypeWindow product="sculpt" overlayAlwaysOn />
        <FirstBatchStrip count="1,400+" shipMonth={shipMonth} />
        <ChiselTicker />
        <SculptWhatItDoes />
        <SculptEffects />
        <SculptRecovery />
        <ChiselArchitecture />
        <ChiselProof />
        <ChiselBuy shipMonth={shipMonth} />
        <SculptFieldManual />
        <SculptTools />
        <ChiselIsIsnt />
        <ChiselFaq shipMonth={shipMonth} />
        <ProductQuote latin="Labor omnia vincit" translation="work conquers all." />
        <ChiselFinalCta shipMonth={shipMonth} />
        <ChiselNotify />
        <OtherProducts current="sculpt" />
      </main>
      <Footer />
      <StickyBuyBar priceFrom="£28" label="SCULPT · The Cream" href="#buy" />
    </>
  );
}
