import { ImageResponse } from "next/og";
import { INK, PAPER, SITE_NAME } from "@/lib/seo";

export const runtime = "edge";

export const alt = "VIS MAJOR: precision topicals for men, made in the UK";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * The share card. Every link to the site rendered as a blank rectangle before
 * this existed.
 *
 * Satori (what next/og renders with) supports flexbox only — no grid, no float,
 * and every element with children needs an explicit display. It also has no
 * access to the Cinzel webfont, so the inscriptional feel is carried by wide
 * letterspacing and caps rather than by the typeface.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: PAPER,
          color: INK,
        }}
      >
        {/* eyebrow */}
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: "0.34em",
            textTransform: "uppercase",
            color: "#6A6960",
          }}
        >
          Est. MMXXVI · Made in the UK
        </div>

        {/* the mark */}
        <div
          style={{
            display: "flex",
            marginTop: 42,
            fontSize: 132,
            fontWeight: 700,
            letterSpacing: "0.18em",
            // the trailing letter-space would push the mark off-centre
            paddingLeft: "0.18em",
          }}
        >
          VIS·MAJOR
        </div>

        {/* rule */}
        <div
          style={{
            display: "flex",
            marginTop: 46,
            width: 220,
            height: 2,
            background: INK,
          }}
        />

        {/* the promise */}
        <div
          style={{
            display: "flex",
            marginTop: 46,
            fontSize: 30,
            color: "#36352F",
          }}
        >
          Precision topicals for men. One job each, done well.
        </div>

        {/* the house */}
        <div
          style={{
            display: "flex",
            position: "absolute",
            bottom: 44,
            fontSize: 18,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "#797770",
          }}
        >
          {SITE_NAME} · vismajor.co.uk
        </div>
      </div>
    ),
    { ...size },
  );
}
