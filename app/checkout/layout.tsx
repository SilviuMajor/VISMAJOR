import type { Metadata } from "next";

/**
 * /checkout and /checkout/confirmed are client components, so they cannot
 * export `metadata` themselves — this layout carries it for both. Metadata is
 * inherited downward, so the noindex here covers /checkout/confirmed too, and
 * that route restates it for good measure.
 *
 * robots.txt disallows these paths as well. Both are needed: Disallow stops
 * the crawl, `noindex` stops the URL appearing in results regardless.
 */
export const metadata: Metadata = {
  title: "Checkout",
  robots: { index: false, follow: false },
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
