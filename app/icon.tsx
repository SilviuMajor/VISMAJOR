import { ImageResponse } from "next/og";
import { INK, PAPER } from "@/lib/seo";

// Generated at the edge rather than shipped as a binary: the mark is two
// letters and a rule, so there is nothing a .ico buys us that this doesn't.
export const runtime = "edge";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/**
 * The tab mark. VIS·MAJOR does not reduce to 32px, so the house initials do the
 * work — near-black on white, the only two values the brand owns.
 */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: PAPER,
          color: INK,
          fontSize: 19,
          fontWeight: 700,
          letterSpacing: "-0.02em",
        }}
      >
        VM
      </div>
    ),
    { ...size },
  );
}
