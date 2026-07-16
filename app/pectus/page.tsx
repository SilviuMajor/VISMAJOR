import { EnhancedComposition } from "@/components/enhanced/EnhancedComposition";

export const metadata = {
  title: "PECTUS: Cooling Chest Primer · VIS MAJOR",
  description:
    "PECTUS is a precision cooling chest primer. Works in minutes. Up to one hour of temporary firmness. With caffeine and menthol agents. Made in the UK by VIS MAJOR.",
  openGraph: {
    title: "PECTUS: Cooling Chest Primer",
    description:
      "Works in minutes. Up to one hour of temporary firmness. Performance topicals for men.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PECTUS: Cooling Chest Primer",
    description:
      "Works in minutes. Up to one hour of temporary firmness. Performance topicals for men.",
  },
};

export default function PectusPage() {
  return <EnhancedComposition />;
}
