import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { V2_CHANGES, SURFACES, CATEGORIES } from "@/lib/v2-changes";

export const metadata: Metadata = {
  title: "VIS MAJOR V2: proposed changes",
  robots: { index: false, follow: false },
};

const PAGES = [
  { href: "/v2/home", label: "Home", note: "The house landing, restructured." },
  { href: "/v2/pectus", label: "PECTUS", note: "The flagship product page." },
  { href: "/v2/stone", label: "STONE", note: "The matte cleanser page." },
  { href: "/v2/checkout", label: "Cart & checkout", note: "Where the money is won or lost." },
];

const NEW_PAGES = [
  { href: "/v2/reviews", label: "Reviews" },
  { href: "/v2/about", label: "About" },
  { href: "/v2/contact", label: "Contact" },
  { href: "/v2/shipping", label: "Shipping" },
  { href: "/v2/returns", label: "Returns" },
  { href: "/v2/privacy", label: "Privacy" },
  { href: "/v2/terms", label: "Terms" },
];

export default function V2Index() {
  const byCategory = CATEGORIES.map((c) => ({
    c,
    n: V2_CHANGES.filter((x) => x.category === c).length,
  })).filter((x) => x.n > 0);

  const bugs = V2_CHANGES.filter((c) => c.fixesBug).length;

  return (
    <main className="min-h-screen bg-paper-0 py-20 md:py-28">
      <Container>
        <div className="flex items-center gap-3.5">
          <span className="h-px w-7 bg-[var(--hair-strong)]" />
          <span className="caps-loose text-[11px] font-medium text-ink-2">
            Internal review · not indexed
          </span>
        </div>

        <h1
          className="mt-6 max-w-3xl font-bold uppercase text-ink-0"
          style={{ fontSize: "clamp(34px, 5.4vw, 76px)", letterSpacing: "-0.03em", lineHeight: 0.96 }}
        >
          VIS MAJOR V2
        </h1>

        <p className="mt-6 max-w-2xl text-[17px] leading-[1.65] text-ink-1">
          A parallel version of the site with proposed changes applied and
          numbered. Every change carries a marker on the page and an entry in the
          side panel explaining what it is and why. Nothing here touches the live
          site.
        </p>

        <p className="mt-4 max-w-2xl text-[15px] leading-[1.65] text-ink-2">
          Read it, then tell me the numbers you want migrated, e.g.{" "}
          <span className="font-semibold text-ink-0">
            &ldquo;push 4, 11 and 26&rdquo;
          </span>
          . Numbers are permanent, so they always mean the same change.
        </p>

        {/* tally */}
        <div
          className="mt-12 grid grid-cols-2 gap-px overflow-hidden border sm:grid-cols-4"
          style={{ borderColor: "var(--hair)", background: "var(--hair)" }}
        >
          <Stat label="Changes" value={String(V2_CHANGES.length)} />
          <Stat label="Fix a real bug" value={String(bugs)} />
          <Stat label="Surfaces" value={String(SURFACES.length)} />
          <Stat label="New pages" value={String(NEW_PAGES.length)} />
        </div>

        {byCategory.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {byCategory.map((x) => (
              <span
                key={x.c}
                className="caps rounded-xs border px-2.5 py-1 text-[10px] font-semibold text-ink-2"
                style={{ borderColor: "var(--hair-strong)" }}
              >
                {x.c} · {x.n}
              </span>
            ))}
          </div>
        )}

        {/* the annotated pages */}
        <h2 className="caps-loose mt-16 text-[11px] font-semibold text-ink-2">
          The annotated pages
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-px overflow-hidden border md:grid-cols-2" style={{ borderColor: "var(--hair)", background: "var(--hair)" }}>
          {PAGES.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="group flex items-center justify-between gap-5 bg-paper-0 px-7 py-7 transition-colors hover:bg-ink-0/[0.03]"
            >
              <div>
                <div
                  className="font-serif font-semibold uppercase text-ink-0"
                  style={{ fontSize: "clamp(20px, 2.4vw, 26px)", letterSpacing: "-0.01em" }}
                >
                  {p.label}
                </div>
                <p className="mt-1.5 text-[13.5px] text-ink-2">{p.note}</p>
              </div>
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          ))}
        </div>

        {/* the catalogue */}
        <Link
          href="/v2/changes"
          className="group mt-10 flex items-center justify-between gap-5 border px-7 py-7 transition-colors hover:bg-ink-0/[0.03]"
          style={{ borderColor: "var(--hair-strong)" }}
        >
          <div>
            <div
              className="font-serif font-semibold uppercase text-ink-0"
              style={{ fontSize: "clamp(20px, 2.4vw, 26px)", letterSpacing: "-0.01em" }}
            >
              The full catalogue
            </div>
            <p className="mt-1.5 max-w-md text-[13.5px] text-ink-2">
              Every change in one filterable table, with reasoning, effort and
              risk. The reference list for deciding what to migrate.
            </p>
          </div>
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </Link>

        {/* new pages */}
        <h2 className="caps-loose mt-16 text-[11px] font-semibold text-ink-2">
          New pages the site does not currently have
        </h2>
        <div className="mt-5 flex flex-wrap gap-2.5">
          {NEW_PAGES.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="caps rounded-[5px] border px-4 py-2.5 text-[11px] font-semibold text-ink-0 transition-colors hover:bg-ink-0 hover:text-paper-0"
              style={{ borderColor: "var(--hair-strong)" }}
            >
              {p.label}
            </Link>
          ))}
        </div>

        <div
          className="mt-16 border-t pt-8"
          style={{ borderColor: "var(--hair)" }}
        >
          <Link
            href="/"
            className="caps text-[11px] font-semibold text-ink-2 hover:text-ink-0"
          >
            ← Back to the live site
          </Link>
        </div>
      </Container>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-paper-0 px-6 py-7">
      <div
        className="num font-bold text-ink-0"
        style={{ fontSize: "clamp(30px, 4vw, 44px)", lineHeight: 1 }}
      >
        {value}
      </div>
      <div className="caps mt-2.5 text-[10px] font-semibold text-ink-3">
        {label}
      </div>
    </div>
  );
}
