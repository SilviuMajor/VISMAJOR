import type { Metadata } from "next";
import { HomeComposition } from "@/components/house/HomeComposition";
import { ldJson, organisationLd, sharedOpenGraph } from "@/lib/seo";

const DESCRIPTION =
  "A small house of precision topicals for men. Cosmetic, temporary by design. PECTUS, SCULPT and STONE. Made in the UK.";

export const metadata: Metadata = {
  // `absolute` opts out of the root "%s | VIS MAJOR" template — the house name
  // is already the whole title here.
  title: { absolute: "VIS MAJOR: Performance Topicals for Men" },
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    ...sharedOpenGraph,
    url: "/",
    title: "VIS MAJOR: Performance Topicals for Men",
    description: DESCRIPTION,
  },
};

export default function Page() {
  return (
    <>
      {/* Server Component: rendered straight into the markup, so there is no
          hydration mismatch to worry about. No aggregateRating, ever. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: ldJson(organisationLd()) }}
      />
      <HomeComposition />
    </>
  );
}
