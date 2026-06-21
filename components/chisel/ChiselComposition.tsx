// CHISEL — the house's second product. Mirrors EnhancedComposition's shell, but
// every in-page section is CHISEL's own. Server component: the interactive parts
// are client components imported below, so this shell needs no "use client".

import { Announcement } from "@/components/nav/Announcement";
import { Header } from "@/components/nav/Header";
import { Footer } from "@/components/sections/Footer";
import { StickyBuyBar } from "@/components/ui/StickyBuyBar";
import { ScrollProgress } from "@/components/enhanced/ScrollProgress";
import { OtherProducts } from "@/components/house/OtherProducts";

import { ChiselHero } from "@/components/chisel/ChiselHero";
import { ChiselTicker } from "@/components/chisel/ChiselTicker";
import { ChiselRitual } from "@/components/chisel/ChiselRitual";
import { ChiselSystem } from "@/components/chisel/ChiselSystem";
import { ChiselArchitecture } from "@/components/chisel/ChiselArchitecture";
import { ChiselProof } from "@/components/chisel/ChiselProof";
import { ChiselBuy } from "@/components/chisel/ChiselBuy";
import { ChiselIsIsnt } from "@/components/chisel/ChiselIsIsnt";
import { ChiselFaq } from "@/components/chisel/ChiselFaq";
import { ChiselFinalCta } from "@/components/chisel/ChiselFinalCta";
import { ChiselNotify } from "@/components/chisel/ChiselNotify";

const NAV = [
  { href: "#how", label: "Ritual" },
  { href: "#science", label: "Actives" },
  { href: "#buy", label: "Pre-order" },
  { href: "#faq", label: "FAQ" },
];

export function ChiselComposition() {
  const shipMonth = process.env.PREORDER_SHIP_MONTH ?? "September 2026";

  return (
    <>
      <ScrollProgress />
      <Announcement
        message={`CHISEL · the Contour Sculpt System · pre-order · first batch ships ${shipMonth}`}
        messageShort={`CHISEL · pre-order · ships ${shipMonth}`}
      />
      <Header crumb="CHISEL" nav={NAV} cta={{ href: "#buy", label: "Pre-order" }} />
      <main>
        <ChiselHero shipMonth={shipMonth} />
        <ChiselTicker />
        <ChiselRitual />
        <ChiselSystem />
        <ChiselArchitecture />
        <ChiselProof />
        <ChiselBuy shipMonth={shipMonth} />
        <ChiselIsIsnt />
        <ChiselFaq shipMonth={shipMonth} />
        <ChiselFinalCta shipMonth={shipMonth} />
        <ChiselNotify />
        <OtherProducts current="chisel" />
      </main>
      <Footer />
      <StickyBuyBar priceFrom="£28" label="CHISEL · System" href="#buy" />
    </>
  );
}
