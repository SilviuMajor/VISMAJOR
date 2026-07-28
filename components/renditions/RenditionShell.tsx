import { ReactNode } from "react";
import { Header } from "@/components/nav/Header";
import { Footer } from "@/components/sections/Footer";
import { ReviewLayer } from "@/components/review/ReviewLayer";
import { changesFor, type Rendition, type Surface } from "@/lib/renditions";

/**
 * Wraps a rendition page in the house chrome and mounts the review apparatus.
 *
 * The chrome is deliberately the LIVE header and footer, unchanged. A design
 * proposal is easier to judge when the parts that are not being proposed look
 * exactly as they do today: any difference you notice is a difference on
 * purpose.
 */
export function RenditionShell({
  children,
  rendition,
  surface,
  crumb,
  cta,
  heroDark = false,
}: {
  children: ReactNode;
  rendition: Rendition;
  surface: Surface;
  crumb?: string;
  cta?: { href: string; label: string } | null;
  heroDark?: boolean;
}) {
  return (
    <>
      <div className="review-inset">
        <Header crumb={crumb} cta={cta} heroDark={heroDark} />
        <main>{children}</main>
        <Footer />
      </div>
      <ReviewLayer
        changes={changesFor(rendition, surface)}
        rendition={rendition}
        surface={surface}
      />
    </>
  );
}
