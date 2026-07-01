import { EnhancedComposition } from "@/components/enhanced/EnhancedComposition";

export const metadata = {
  title: "PECTUS — Nipple Tightening Cream · VIS MAJOR",
  description:
    "PECTUS is a precision nipple tightening cream. Works in minutes. Up to one hour of temporary firmness. With caffeine and menthol agents. Made in the UK by VIS MAJOR.",
  openGraph: {
    title: "PECTUS — Nipple Tightening Cream",
    description:
      "Works in minutes. Up to one hour of temporary firmness. Performance topicals for men.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PECTUS — Nipple Tightening Cream",
    description:
      "Works in minutes. Up to one hour of temporary firmness. Performance topicals for men.",
  },
};

export default function PectusPage() {
  return <EnhancedComposition />;
}
