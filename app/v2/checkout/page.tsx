import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Header } from "@/components/nav/Header";
import { Footer } from "@/components/sections/Footer";
import { changesForRoute } from "@/lib/v2-changes";

export const metadata: Metadata = {
  title: "V2 · Cart & checkout",
  robots: { index: false, follow: false },
};

/**
 * The checkout surface is the one place a screenshot cannot make the argument,
 * because the problem is not how it looks: it is that the form does nothing.
 * So this page documents the rebuild rather than mocking up a prettier form.
 */
export default function CheckoutV2() {
  const changes = changesForRoute("/v2/checkout");

  return (
    <>
      <Header />
      <main className="bg-paper-0 py-16 md:py-24">
        <Container>
          <Link href="/v2" className="caps text-[10px] font-semibold text-ink-3 hover:text-ink-0">
            ← V2 index
          </Link>

          <div className="mt-8 flex items-center gap-3.5">
            <span className="h-px w-7 bg-[var(--hair-strong)]" />
            <span className="caps-loose text-[11px] font-medium text-ink-2">
              Cart &amp; checkout · {changes.length} changes
            </span>
          </div>

          <h1
            className="mt-5 max-w-3xl font-bold uppercase text-ink-0"
            style={{ fontSize: "clamp(30px, 4.6vw, 62px)", letterSpacing: "-0.03em", lineHeight: 0.98 }}
          >
            The checkout does not work
          </h1>

          <p className="mt-6 max-w-2xl text-[17px] leading-[1.65] text-ink-1">
            Not &ldquo;works badly&rdquo;. Does not work. The form on{" "}
            <code className="font-mono text-[15px]">/checkout</code> collects
            five fields, throws them away, invents an order reference, empties
            the basket and shows a confirmation page that promises an email
            nobody sends.
          </p>

          <div
            className="mt-8 max-w-2xl border-l-2 px-5 py-4"
            style={{ borderColor: "var(--ink-0)", background: "rgba(20,19,15,0.03)" }}
          >
            <div className="caps text-[9.5px] font-semibold text-ink-0">
              The actual code, today
            </div>
            <pre className="mt-3 overflow-x-auto font-mono text-[12px] leading-[1.6] text-ink-2">
{`const ref = "VM-" + Date.now().toString(36)...
clear();
router.push("/checkout/confirmed?ref=" + ref);
// no fetch. no order. no email.`}
            </pre>
          </div>

          <p className="mt-8 max-w-2xl text-[15px] leading-[1.65] text-ink-2">
            A working Stripe route already exists at{" "}
            <code className="font-mono text-[13.5px]">app/api/checkout/route.ts</code>
            . Nothing calls it: its only caller is a dead component. So the
            plumbing is half-built and disconnected, which is why this reads as
            a bug rather than a missing feature.
          </p>

          <h2 className="caps-loose mt-16 text-[11px] font-semibold text-ink-2">
            What the rebuild involves
          </h2>

          <div className="mt-6 border-t" style={{ borderColor: "var(--hair-strong)" }}>
            {changes.map((c) => (
              <div
                key={c.n}
                className="flex gap-5 border-b py-6"
                style={{ borderColor: "var(--hair)" }}
              >
                <span className="num flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink-0 text-[12px] font-bold text-paper-0">
                  {c.n}
                </span>
                <div>
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1.5">
                    <h3 className="text-[16px] font-semibold text-ink-0">{c.title}</h3>
                    {c.fixesBug && (
                      <span className="caps rounded-xs bg-ink-0 px-1.5 py-0.5 text-[8.5px] font-semibold text-paper-0">
                        Fixes a bug
                      </span>
                    )}
                  </div>
                  <p className="mt-2 max-w-2xl text-[14px] leading-[1.6] text-ink-2">
                    {c.what}
                  </p>
                  <p className="mt-2 max-w-2xl text-[14px] leading-[1.6] text-ink-1">
                    {c.why}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-10 max-w-2xl text-[14px] leading-[1.65] text-ink-3">
            Order of work: one server-owned price list, then the multi-line
            session, then the webhook and an orders table, then the confirmation
            email. Wallets and the embedded card form come after that, once real
            orders are landing.
          </p>
        </Container>
      </main>
      <Footer />
    </>
  );
}
