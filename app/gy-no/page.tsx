import { EnhancedComposition } from "@/components/enhanced/EnhancedComposition";

export const metadata = {
  title: "GY-NO! — Cooling Tightening Cream · VIS MAJOR",
  description:
    "GY-NO! is a precision cooling tightening cream. Works in minutes. Up to one hour of temporary firmness. With caffeine and menthol agents. Made in the UK by VIS MAJOR.",
  openGraph: {
    title: "GY-NO! — Cooling Tightening Cream",
    description:
      "Works in minutes. Up to one hour of temporary firmness. A cooling, tightening cream — performance topicals for men.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GY-NO! — Cooling Tightening Cream",
    description:
      "Works in minutes. Up to one hour of temporary firmness. A cooling, tightening cream — performance topicals for men.",
  },
};

export default function GyNoPage() {
  return <EnhancedComposition />;
}
