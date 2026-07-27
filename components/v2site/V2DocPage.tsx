import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Header } from "@/components/nav/Header";
import { Footer } from "@/components/sections/Footer";

/**
 * The shell for V2's new content pages (shipping, returns, privacy, terms,
 * about, contact). Deliberately plain: these are the pages a hesitant buyer
 * opens before paying, so they should be quick to read, not art-directed.
 *
 * `draft` marks a page whose wording needs professional sign-off before it
 * goes live. The banner is part of the review build, not the final page.
 */
export function V2DocPage({
  eyebrow,
  title,
  intro,
  draft,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  draft?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="bg-paper-0 py-16 md:py-24">
        <Container>
          <Link
            href="/v2"
            className="caps text-[10px] font-semibold text-ink-3 hover:text-ink-0"
          >
            ← V2 index
          </Link>

          <div className="mt-8 flex items-center gap-3.5">
            <span className="h-px w-7 bg-[var(--hair-strong)]" />
            <span className="caps-loose text-[11px] font-medium text-ink-2">
              {eyebrow}
            </span>
          </div>

          <h1
            className="mt-5 max-w-3xl font-bold uppercase text-ink-0"
            style={{ fontSize: "clamp(30px, 4.6vw, 62px)", letterSpacing: "-0.03em", lineHeight: 0.98 }}
          >
            {title}
          </h1>

          {intro && (
            <p className="mt-6 max-w-2xl text-[17px] leading-[1.65] text-ink-1">
              {intro}
            </p>
          )}

          {draft && (
            <div
              className="mt-8 max-w-2xl border-l-2 px-5 py-4"
              style={{ borderColor: "var(--ink-0)", background: "rgba(20,19,15,0.03)" }}
            >
              <div className="caps text-[9.5px] font-semibold text-ink-0">
                Needs sign-off before this goes live
              </div>
              <p className="mt-2 text-[13.5px] leading-[1.55] text-ink-2">{draft}</p>
            </div>
          )}

          <div className="mt-12 max-w-2xl">{children}</div>
        </Container>
      </main>
      <Footer />
    </>
  );
}

export function DocSection({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className="border-t py-8 first:border-t-0 first:pt-0"
      style={{ borderColor: "var(--hair)" }}
    >
      <h2 className="caps text-[11px] font-semibold text-ink-0">{heading}</h2>
      <div className="mt-4 flex flex-col gap-3.5 text-[15px] leading-[1.7] text-ink-2">
        {children}
      </div>
    </section>
  );
}
