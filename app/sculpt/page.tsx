import { ChiselComposition } from "@/components/chisel/ChiselComposition";

export const metadata = {
  title: "SCULPT: Contour & Recovery Cream · VIS MAJOR",
  description:
    "SCULPT is a massage & recovery cream for men, worked into the body by hand or with optional steel tool, for skin that looks firmer, feels worked and reads sharper. Temporary, cosmetic, made in the UK by VIS MAJOR.",
  openGraph: {
    title: "SCULPT: Contour & Recovery Cream",
    description:
      "A massage cream for men, worked into the body by hand or with optional steel tool. Looks firmer, feels worked: temporary, cosmetic.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SCULPT: Contour & Recovery Cream",
    description:
      "A massage cream for men, worked into the body by hand or with optional steel tool. Looks firmer, feels worked: temporary, cosmetic.",
  },
};

export default function SculptPage() {
  return <ChiselComposition />;
}
