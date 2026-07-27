import { Container } from "@/components/ui/Container";
import { Eyebrow, SectionHead } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Header } from "@/components/nav/Header";
import { Footer } from "@/components/sections/Footer";

/**
 * The shell for the house content pages: /help and /legal.
 *
 * Deliberately plain. These are the pages a hesitant buyer opens before paying,
 * so they should be quick to read, not art-directed. Four thin documents
 * (shipping, returns, privacy, terms) were consolidated into two, because a
 * buyer looking for the returns window should not have to guess which of four
 * links carries it.
 *
 * Each topic keeps its own anchor, so a link can still point straight at it:
 * /help#contact, /help#shipping, /help#returns, /legal#privacy, /legal#terms.
 *
 * `signOff` on a part marks wording that still needs professional review before
 * the page goes live. The banner is part of the review build, not the final
 * page, and it should be removed only when the underlying work is actually done.
 */
export function DocPage({
  eyebrow,
  title,
  intro,
  jump,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  /** In-page contents row. Each entry links to a DocPart id on this page. */
  jump?: { id: string; label: string }[];
  children: React.ReactNode;
}) {
  return (
    <>
      <Header cta={null} />
      <main className="bg-paper-0 py-16 md:py-24">
        <Container>
          <Reveal>
            <Eyebrow>{eyebrow}</Eyebrow>

            <h1
              className="mt-5 max-w-3xl font-bold uppercase text-ink-0"
              style={{
                fontSize: "clamp(30px, 4.6vw, 62px)",
                letterSpacing: "-0.03em",
                lineHeight: 0.98,
              }}
            >
              {title}
            </h1>

            {intro && (
              <p className="mt-6 max-w-2xl text-[17px] leading-[1.65] text-ink-1">
                {intro}
              </p>
            )}

            {jump && jump.length > 0 && (
              <nav
                aria-label="On this page"
                className="mt-9 flex max-w-2xl flex-wrap items-center gap-x-7 gap-y-2.5 border-y py-4"
                style={{ borderColor: "var(--hair)" }}
              >
                {jump.map((j) => (
                  <a
                    key={j.id}
                    href={`#${j.id}`}
                    className="caps text-[10.5px] font-semibold text-ink-2 transition-colors hover:text-ink-0"
                  >
                    {j.label}
                  </a>
                ))}
              </nav>
            )}
          </Reveal>

          <div className="mt-14 flex max-w-2xl flex-col gap-14">{children}</div>
        </Container>
      </main>
      <Footer />
    </>
  );
}

/**
 * One anchored topic on a doc page: contact, shipping, returns, privacy, terms.
 * `scroll-mt` clears the sticky header when you arrive on the anchor.
 */
export function DocPart({
  id,
  n,
  title,
  intro,
  signOff,
  children,
}: {
  id: string;
  /** Ledger number, e.g. "01". */
  n: string;
  title: string;
  intro?: string;
  /** What still needs professional sign-off before this part is published. */
  signOff?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-[96px] border-t pt-12 first:border-t-0 first:pt-0"
      style={{ borderColor: "var(--hair)" }}
    >
      <Reveal>
        <SectionHead n={n} title={title} as="h2" />

        {intro && (
          <p className="mb-8 text-[16px] leading-[1.6] text-ink-1">{intro}</p>
        )}

        {signOff && (
          <div
            className="mb-9 border-l-2 px-5 py-4"
            style={{ borderColor: "var(--ink-0)", background: "rgba(20,19,15,0.03)" }}
          >
            <div className="caps text-[9.5px] font-semibold text-ink-0">
              Needs sign-off before this goes live
            </div>
            <p className="mt-2 text-[13.5px] leading-[1.55] text-ink-2">
              {signOff}
            </p>
          </div>
        )}

        <div>{children}</div>
      </Reveal>
    </section>
  );
}

/** A sub-heading and its prose, inside a DocPart. */
export function DocSection({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="border-t py-8 first:border-t-0 first:pt-0"
      style={{ borderColor: "var(--hair)" }}
    >
      <h3 className="caps text-[11px] font-semibold text-ink-0">{heading}</h3>
      <div className="mt-4 flex flex-col gap-3.5 text-[15px] leading-[1.7] text-ink-2">
        {children}
      </div>
    </div>
  );
}

/** An inline link in doc prose. */
export function DocLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="font-semibold text-ink-0 underline underline-offset-4 transition-colors hover:text-ink-1"
    >
      {children}
    </a>
  );
}
