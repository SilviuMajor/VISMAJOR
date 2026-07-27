import type { Metadata } from "next";
import { SteelComposition } from "@/components/steel/SteelComposition";
import { PRODUCT_SEO, ldJson, productLd, sharedOpenGraph } from "@/lib/seo";

const P = PRODUCT_SEO.steel;

export const metadata: Metadata = {
  title: "STEEL: Weighted Massage & Therapy Tool",
  description:
    "STEEL is a single weighted, machined-steel massage and therapy tool for men: one blade with several edges, a fine point, a long flat and a hooked belly. For working tension, recovery and contour, by hand or with the SCULPT cream. Made in the UK by VIS MAJOR.",
  alternates: { canonical: P.path },
  openGraph: {
    ...sharedOpenGraph,
    url: P.path,
    title: "STEEL: Weighted Massage & Therapy Tool",
    description:
      "One weighted, machined-steel blade. Several contoured edges for massage, recovery and working tension.",
  },
  twitter: {
    card: "summary_large_image",
    title: "STEEL: Weighted Massage & Therapy Tool",
    description:
      "One weighted, machined-steel blade. Several contoured edges for massage, recovery and working tension.",
  },
};

export default function SteelPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: ldJson(productLd(P)) }}
      />
      <SteelComposition />
    </>
  );
}
