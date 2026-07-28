import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import {
  CHANGES,
  RENDITIONS,
  SURFACE_LABEL,
  LIVE_HREF,
  type Rendition,
  type Surface,
} from "@/lib/renditions";

export const metadata: Metadata = {
  title: "Design renditions",
  robots: { index: false, follow: false },
};

const SURFACES: Surface[] = ["home", "pectus", "stone"];
const ORDER: Rendition[] = ["atelier", "colosseum"];

export default function Page() {
  return (
    <main className="min-h-screen bg-paper-0 py-16 md:py-24">
      <Container>
        <p
          className="text-[10px] font-semibold uppercase text-ink-3"
          style={{ letterSpacing: "0.06em" }}
        >
          VIS MAJOR · Design study
        </p>
        <h1
          className="serif mt-4 text-ink-0"
          style={{ fontSize: "clamp(34px,4.4vw,60px)", letterSpacing: "0.01em" }}
        >
          Two directions.
        </h1>
        <p className="mt-6 max-w-[62ch] text-[16.5px] leading-[1.7] text-ink-1">
          Both keep what is locked: ink on paper, Cinzel, the product
          photography and the drawn Roman figures. They differ in everything
          else, and they are deliberately arguing with each other. Open a page,
          then click any numbered badge or any row in the side panel to jump to
          the exact element it refers to.
        </p>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
          {ORDER.map((r) => {
            const meta = RENDITIONS[r];
            const count = CHANGES.filter((c) => c.rendition === r).length;
            return (
              <section key={r}>
                <div
                  className="border-t pt-7"
                  style={{ borderColor: "var(--hair-strong)" }}
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <h2 className="serif text-[30px] text-ink-0">
                      {meta.name}
                    </h2>
                    <span
                      className="font-mono text-[11px] uppercase text-ink-3"
                      style={{ letterSpacing: "0.05em" }}
                    >
                      {meta.slug} · {count} changes
                    </span>
                  </div>
                  <p className="mt-2 text-[14px] font-medium text-ink-2">
                    {meta.tagline}
                  </p>
                  <p className="mt-4 max-w-[54ch] text-[15px] leading-[1.65] text-ink-1">
                    {meta.note}
                  </p>

                  <ul className="mt-7 flex flex-col gap-px">
                    {SURFACES.map((s) => {
                      const n = CHANGES.filter(
                        (c) => c.rendition === r && c.surface === s
                      ).length;
                      return (
                        <li key={s}>
                          <a
                            href={`/${meta.slug}${s === "home" ? "" : `/${s}`}`}
                            className="flex items-center justify-between gap-4 border-t py-4 transition-colors hover:bg-ink-0/[0.03]"
                            style={{ borderColor: "var(--hair)" }}
                          >
                            <span className="text-[16px] font-semibold text-ink-0">
                              {SURFACE_LABEL[s]}
                            </span>
                            <span
                              className="font-mono text-[11px] text-ink-3"
                              style={{ letterSpacing: "0.05em" }}
                            >
                              {n} changes &rarr;
                            </span>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </section>
            );
          })}
        </div>

        {/* the full catalogue, so "push 12, 19, 33" is unambiguous */}
        <section className="mt-24">
          <h2
            className="text-[10px] font-semibold uppercase text-ink-3"
            style={{ letterSpacing: "0.06em" }}
          >
            The full catalogue
          </h2>
          <table className="mt-7 w-full border-collapse text-left">
            <thead>
              <tr
                className="border-b text-[10px] uppercase text-ink-3"
                style={{ borderColor: "var(--hair-strong)", letterSpacing: "0.05em" }}
              >
                <th className="py-3 pr-4 font-semibold">No.</th>
                <th className="py-3 pr-4 font-semibold">Rendition</th>
                <th className="py-3 pr-4 font-semibold">Page</th>
                <th className="py-3 pr-4 font-semibold">Category</th>
                <th className="py-3 font-semibold">Change</th>
              </tr>
            </thead>
            <tbody>
              {[...CHANGES]
                .sort((a, b) => a.n - b.n)
                .map((c) => (
                  <tr
                    key={c.n}
                    className="border-b align-top"
                    style={{ borderColor: "var(--hair)" }}
                  >
                    <td className="num py-4 pr-4 text-[13px] font-semibold tabular-nums text-ink-0">
                      {c.n}
                    </td>
                    <td className="py-4 pr-4 text-[12.5px] text-ink-2">
                      {RENDITIONS[c.rendition].name}
                    </td>
                    <td className="py-4 pr-4 text-[12.5px] text-ink-2">
                      <a
                        className="underline decoration-[var(--hair-strong)] underline-offset-2 hover:text-ink-0"
                        href={`/${RENDITIONS[c.rendition].slug}${
                          c.surface === "home" ? "" : `/${c.surface}`
                        }`}
                      >
                        {SURFACE_LABEL[c.surface]}
                      </a>
                    </td>
                    <td className="py-4 pr-4 text-[12.5px] text-ink-3">
                      {c.category}
                    </td>
                    <td className="py-4 text-[13.5px] leading-[1.5] text-ink-0">
                      <span className="font-semibold">{c.title}</span>
                      <span className="mt-1 block max-w-[62ch] text-[12.5px] text-ink-2">
                        {c.why}
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </section>

        <p className="mt-16 text-[13px] text-ink-3">
          Live pages for comparison:{" "}
          {SURFACES.map((s, i) => (
            <span key={s}>
              {i > 0 && " · "}
              <a
                className="underline decoration-[var(--hair-strong)] underline-offset-2 hover:text-ink-0"
                href={LIVE_HREF[s]}
              >
                {SURFACE_LABEL[s]}
              </a>
            </span>
          ))}
        </p>
      </Container>
    </main>
  );
}
