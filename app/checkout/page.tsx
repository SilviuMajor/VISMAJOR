"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { useCart } from "@/lib/cart";

export default function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostcode] = useState("");

  const placeOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    // Mock reference — client runtime, so Date.now() is fine here.
    const ref = "VM-" + Date.now().toString(36).toUpperCase().slice(-6);
    clear();
    router.push(`/checkout/confirmed?ref=${ref}`);
  };

  return (
    <main className="min-h-screen bg-paper-0 py-10 md:py-14">
      <Container>
        {/* top bar */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="caps text-[11px] font-semibold text-ink-2 transition-colors hover:text-ink-0"
          >
            ← Continue shopping
          </Link>
          <Link href="/" className="house text-[15px] text-ink-0">
            VIS·MAJOR
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="flex min-h-[55vh] flex-col items-center justify-center text-center">
            <p className="text-[18px] font-medium text-ink-0">Your basket is empty.</p>
            <Link
              href="/"
              className="caps mt-5 inline-flex rounded-[5px] bg-ink-0 px-6 py-[14px] text-[12px] font-semibold text-paper-0 transition-colors hover:bg-ink-1"
            >
              Back to shop
            </Link>
          </div>
        ) : (
          <>
            <h1
              className="mt-10 font-bold uppercase text-ink-0"
              style={{ fontSize: "clamp(34px, 4.4vw, 52px)", lineHeight: 0.95, letterSpacing: "-0.01em" }}
            >
              Checkout
            </h1>

            <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
              {/* LEFT — details */}
              <form onSubmit={placeOrder} className="order-2 lg:order-1">
                <div className="caps text-[11px] font-semibold text-ink-3">Your details</div>

                <div className="mt-7 flex flex-col gap-7">
                  <Field
                    label="Email"
                    type="email"
                    value={email}
                    onChange={setEmail}
                    autoComplete="email"
                    required
                  />
                  <Field
                    label="Full name"
                    value={name}
                    onChange={setName}
                    autoComplete="name"
                    required
                  />
                  <Field
                    label="Address line 1"
                    value={address}
                    onChange={setAddress}
                    autoComplete="address-line1"
                    required
                  />
                  <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
                    <Field
                      label="City"
                      value={city}
                      onChange={setCity}
                      autoComplete="address-level2"
                      required
                    />
                    <Field
                      label="Postcode"
                      value={postcode}
                      onChange={setPostcode}
                      autoComplete="postal-code"
                      required
                    />
                  </div>
                </div>

                <p
                  className="mt-9 max-w-md pt-6 text-[13px] leading-[1.65] text-ink-2"
                  style={{ borderTop: "1px solid var(--hair)" }}
                >
                  This is a pre-order. No payment is taken now — we&apos;ll email you when
                  the first batch is ready to ship.
                </p>

                <button
                  type="submit"
                  className="mt-7 w-full rounded-[5px] bg-ink-0 px-6 py-[18px] text-[13px] font-semibold text-paper-0 transition-colors hover:bg-ink-1 sm:w-auto sm:px-12"
                >
                  Place pre-order
                </button>
              </form>

              {/* RIGHT — order summary */}
              <aside className="order-1 lg:order-2">
                <div className="caps text-[11px] font-semibold text-ink-3">Order summary</div>

                <div className="mt-6">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start justify-between gap-4 py-4"
                      style={{ borderBottom: "1px solid var(--hair)" }}
                    >
                      <div>
                        <div className="caps text-[12px] font-semibold text-ink-0">
                          {item.productName}
                        </div>
                        <div className="caps mt-1 text-[10px] font-medium text-ink-3">
                          {item.tierLabel} · Qty {item.qty}
                        </div>
                      </div>
                      <div className="num text-[15px] font-semibold text-ink-0">
                        £{item.price * item.qty}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex items-center justify-between">
                  <span className="caps text-[11px] font-semibold text-ink-2">Subtotal</span>
                  <span className="num text-[21px] font-semibold text-ink-0">£{subtotal}</span>
                </div>
                <p className="caps mt-3 text-[9.5px] font-medium text-ink-3">
                  Free UK delivery · Nothing charged today
                </p>
              </aside>
            </div>
          </>
        )}
      </Container>
    </main>
  );
}

/** Plain underline-style input — no box, single hairline that darkens on focus. */
function Field({
  label,
  value,
  onChange,
  type = "text",
  autoComplete,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="caps text-[10px] font-semibold text-ink-3">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        required={required}
        className="mt-2 w-full border-b border-[var(--hair-strong)] bg-transparent pb-2 text-[15px] text-ink-0 outline-none transition-colors placeholder:text-ink-3 focus:border-ink-0"
      />
    </label>
  );
}
