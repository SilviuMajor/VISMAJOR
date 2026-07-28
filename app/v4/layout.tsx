import type { Metadata } from "next";

// See app/v2/layout.tsx — same exclusion. V4 is the candidate to go live, but
// until it does it is still a duplicate of the live copy.
export const metadata: Metadata = {
  title: "The House · Rendition V4",
  robots: { index: false, follow: false },
};

export default function V4Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
