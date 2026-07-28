import type { Metadata } from "next";

// See app/v2/layout.tsx — same reasoning, same exclusion.
export const metadata: Metadata = {
  title: "Colosseum · Rendition V3",
  robots: { index: false, follow: false },
};

export default function V3Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
