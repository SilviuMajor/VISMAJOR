import type { MetadataRoute } from "next";
import { INK, PAPER, SITE_DESCRIPTION, SITE_NAME } from "@/lib/seo";

/**
 * The web app manifest. Not a PWA ambition — it is what gives an installed or
 * pinned shortcut a name and a mark instead of a screenshot and a URL.
 *
 * `theme_color` stays white to match the themeColor in the root viewport; the
 * ink is used for the maskable safe area only.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME}: Performance Topicals for Men`,
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: PAPER,
    theme_color: PAPER,
    lang: "en-GB",
    categories: ["shopping", "lifestyle"],
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
    ],
  };
}
