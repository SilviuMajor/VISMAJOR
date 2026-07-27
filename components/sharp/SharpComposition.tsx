import { Announcement } from "@/components/nav/Announcement";
import { Header } from "@/components/nav/Header";
import { Footer } from "@/components/sections/Footer";
import { StickyBuyBar } from "@/components/ui/StickyBuyBar";
import { ScrollProgress } from "@/components/enhanced/ScrollProgress";
import { OtherProducts } from "@/components/house/OtherProducts";
import { ProductQuote } from "@/components/house/ProductQuote";
import { TrustStrip } from "@/components/enhanced/TrustStrip";

import { HeroTypeWindow } from "@/components/herolab/HeroTypeWindow";
import { SharpTicker } from "@/components/sharp/SharpTicker";
import { SharpActives } from "@/components/sharp/SharpActives";
import { SharpProof } from "@/components/sharp/SharpProof";
import { SharpBuy } from "@/components/sharp/SharpBuy";
import { SharpIsIsnt } from "@/components/sharp/SharpIsIsnt";
import { SharpFaq } from "@/components/sharp/SharpFaq";
import { SharpFinalCta } from "@/components/sharp/SharpFinalCta";
import { SharpNotify } from "@/components/sharp/SharpNotify";

/**
 * STONE — the house's third product. The everyday, matte member of VIS MAJOR.
 * Same shell as the flagship (ScrollProgress, Announcement, Header, OtherProducts,
 * Footer, StickyBuyBar) but a wholly STONE-specific body: a shine-to-matte
 * mechanic, an oil-control actives rail, and a daily-driver buy panel.
 *
 * Claim-safe by design: every line describes feel and look only.
 */
export function SharpComposition() {
  const shipMonth = process.env.PREORDER_SHIP_MONTH ?? "September 2026";

  return (
    <>
      <ScrollProgress />
      <Announcement
        message={`STONE · the matte cleanser · ships ${shipMonth} · free UK delivery`}
        messageShort={`STONE · ships ${shipMonth}`}
      />
      <Header
        crumb="STONE"
        cta={{ href: "#buy", label: "Buy" }}
        heroDark
      />
      <main>
        <HeroTypeWindow product="stone" overlayAlwaysOn />
        <TrustStrip shipMonth={shipMonth} />
        <SharpTicker />
        <SharpActives />
        <SharpBuy shipMonth={shipMonth} />
        <SharpIsIsnt />
        <SharpFaq shipMonth={shipMonth} />
        <ProductQuote latin="Tabula rasa" translation="a clean slate." />
        <SharpFinalCta shipMonth={shipMonth} />
        <SharpProof />
      </main>
      <OtherProducts current="stone" />
      <SharpNotify />
      <Footer />
      <StickyBuyBar priceFrom="£22" label="STONE · 100ml" href="#buy" />
    </>
  );
}
