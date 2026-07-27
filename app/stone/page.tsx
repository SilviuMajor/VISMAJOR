import type { Metadata } from "next";
import { SharpComposition } from "@/components/sharp/SharpComposition";
import { PRODUCT_SEO, ldJson, productLd, sharedOpenGraph } from "@/lib/seo";

const P = PRODUCT_SEO.stone;

export const metadata: Metadata = {
  title: "STONE: Matte Cleanser",
  description:
    "STONE is a natural matte cleanser for men, a clay, charcoal and mint face wash that lifts the day's oil and grime and rinses off to leave skin clean, fresh, and matte. Sulphate-free. Made in the UK by VIS MAJOR.",
  alternates: { canonical: P.path },
  openGraph: {
    ...sharedOpenGraph,
    url: P.path,
    title: "STONE: Matte Cleanser",
    description:
      "Clay, charcoal and mint lift the day's oil and grime, then rinse away. Clean, fresh, matte.",
  },
  twitter: {
    card: "summary_large_image",
    title: "STONE: Matte Cleanser",
    description:
      "Clay, charcoal and mint lift the day's oil and grime, then rinse away. Clean, fresh, matte.",
  },
};

export default function SharpPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: ldJson(productLd(P)) }}
      />
      <SharpComposition />
    </>
  );
}
