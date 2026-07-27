import type { Metadata } from "next";
import { ChangesTable } from "@/components/v2site/ChangesTable";

export const metadata: Metadata = {
  title: "VIS MAJOR V2: the change catalogue",
  robots: { index: false, follow: false },
};

export default function ChangesPage() {
  return <ChangesTable />;
}
