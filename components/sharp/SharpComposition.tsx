import { Announcement } from "@/components/nav/Announcement";
import { Header } from "@/components/nav/Header";
import { Footer } from "@/components/sections/Footer";
import { StickyBuyBar } from "@/components/ui/StickyBuyBar";
import { ScrollProgress } from "@/components/enhanced/ScrollProgress";
import { OtherProducts } from "@/components/house/OtherProducts";
import { ProductQuote } from "@/components/house/ProductQuote";
import { FirstBatchStrip } from "@/components/enhanced/FirstBatchStrip";

import { SharpHero } from "@/components/sharp/SharpHero";
import { SharpTicker } from "@/components/sharp/SharpTicker";
import { SharpDaily } from "@/components/sharp/SharpDaily";
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
 * mechanic, an oil-control actives rail, and a daily-driver pre-order panel.
 *
 * Claim-safe by design: every line describes feel and look only.
 */
export function SharpComposition() {
  const shipMonth = process.env.PREORDER_SHIP_MONTH ?? "September 2026";

  const NAV = [
    { href: "#how", label: "The Daily" },
    { href: "#science", label: "Actives" },
    { href: "#faq", label: "FAQ" },
  ];

  return (
    <>
      <ScrollProgress />
      <Announcement
        message={`Pre-order · the matte daily · first batch ships ${shipMonth} · free UK delivery`}
        messageShort={`Pre-order · ships ${shipMonth}`}
      />
      <Header
        crumb="STONE"
        nav={NAV}
        cta={{ href: "#buy", label: "Pre-order" }}
      />
      <main>
        <SharpHero shipMonth={shipMonth} />
        <FirstBatchStrip count="1,400+" shipMonth={shipMonth} />
        <ProductQuote latin="Cotidie" translation="every day." />
        <SharpTicker />
        <SharpDaily />
        <SharpActives />
        <SharpProof />
        <SharpBuy shipMonth={shipMonth} />
        <SharpIsIsnt />
        <SharpFaq shipMonth={shipMonth} />
        <SharpFinalCta shipMonth={shipMonth} />
        <SharpNotify />
      </main>
      <OtherProducts current="stone" />
      <Footer />
      <StickyBuyBar priceFrom="£22" label="STONE · 50ml" href="#buy" />
    </>
  );
}
