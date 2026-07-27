import type { Metadata } from "next";

/**
 * The confirmation page is a client component and carries an order reference in
 * its query string — it must never be indexed. Stated explicitly here rather
 * than relying only on inheritance from the parent checkout layout.
 */
export const metadata: Metadata = {
  title: "Order confirmed",
  robots: { index: false, follow: false },
};

export default function ConfirmedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
