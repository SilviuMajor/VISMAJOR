import type { Metadata } from "next";
import { EnhancedComposition } from "@/components/enhanced/EnhancedComposition";
import { PRODUCT_SEO, ldJson, productLd, sharedOpenGraph } from "@/lib/seo";

const P = PRODUCT_SEO.pectus;

export const metadata: Metadata = {
  // The root template appends " | VIS MAJOR".
  title: "PECTUS: Cooling Chest Primer",
  description:
    "PECTUS is a precision cooling chest primer. Works in minutes. Up to one hour of temporary firmness. With caffeine and menthol agents. Made in the UK by VIS MAJOR.",
  alternates: { canonical: P.path },
  openGraph: {
    ...sharedOpenGraph,
    url: P.path,
    title: "PECTUS: Cooling Chest Primer",
    description:
      "Works in minutes. Up to one hour of temporary firmness. Performance topicals for men.",
  },
  twitter: {
    card: "summary_large_image",
    title: "PECTUS: Cooling Chest Primer",
    description:
      "Works in minutes. Up to one hour of temporary firmness. Performance topicals for men.",
  },
};

export default function PectusPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: ldJson(productLd(P)) }}
      />
      <EnhancedComposition />
    </>
  );
}
