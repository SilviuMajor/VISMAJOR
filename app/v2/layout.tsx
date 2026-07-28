import type { Metadata } from "next";

// Design proposals, not the shop. Keep them out of the index entirely: they
// duplicate the live pages' copy almost verbatim, and a crawler that finds
// three near-identical PECTUS pages will pick a winner that is not /pectus.
export const metadata: Metadata = {
  title: "Atelier · Rendition V2",
  robots: { index: false, follow: false },
};

export default function V2Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
