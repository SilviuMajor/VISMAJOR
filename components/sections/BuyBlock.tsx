"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Eyebrow, SectionHead } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

type Tier = {
  key: "1" | "2" | "3";
  label: string;
  unitLabel: string;
  price: number;
  note?: string;
};

const TIERS: Tier[] = [
  { key: "1", label: "20ml", unitLabel: "20ml", price: 24 },
  { key: "2", label: "40ml", unitLabel: "40ml", price: 42, note: "Most chosen" },
  { key: "3", label: "2-pack", unitLabel: "2 × 20ml", price: 44, note: "Best value" },
];

const GALLERY = [
  { src: "/product/front.png", label: "Front" },
  { src: "/product/back.png", label: "Back" },
  { src: "/product/squeeze.png", label: "Texture" },
  { src: "/product/detail.png", label: "Detail" },
];

export function BuyBlock({ shipMonth }: { shipMonth: string }) {
  const [tierKey, setTierKey] = useState<Tier["key"]>("1");
  const [qty, setQty] = useState(1);
  const [shot, setShot] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const tier = useMemo(
    () => TIERS.find((t) => t.key === tierKey) ?? TIERS[0],
    [tierKey]
  );
  const total = tier.price * qty;

  const onPreorder = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tier: tier.key }),
      });
      const data = await res.json();
      if (data?.url) {
        window.location.href = data.url;
      } else {
        setError(data?.error ?? "Could not start checkout. Try again.");
      }
    } catch {
      setError("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="buy" className="py-16 md:py-24">
      <Container>
        <SectionHead n="03" title="Pre-order GY-NO!" />

        <div id="product" className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-14">
          {/* Gallery */}
          <Reveal>
            <div
              className="relative flex aspect-square items-center justify-center overflow-hidden border bg-paper-2"
              style={{ borderColor: "var(--hair)" }}
            >
              <div
                className="absolute inset-4 z-10 border"
                style={{ borderColor: "var(--hair-strong)" }}
                aria-hidden
              />
              <span className="absolute left-5 top-4 z-20 caps text-[9px] font-medium text-ink-3">
                GY-NO! / 001
              </span>
              <span className="absolute bottom-4 right-5 z-20 caps text-[9px] font-medium text-ink-3">
                {GALLERY[shot].label}
              </span>
              <AnimatePresence mode="wait">
                <motion.div
                  key={shot}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.3, ease: [0.2, 0, 0, 1] }}
                  className="relative h-[78%] w-[78%]"
                >
                  <Image
                    src={GALLERY[shot].src}
                    alt={`GY-NO! — ${GALLERY[shot].label}`}
                    fill
                    sizes="(max-width: 1024px) 80vw, 520px"
                    className="object-contain"
                    priority={shot === 0}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Thumbnails */}
            <div className="mt-3 grid grid-cols-4 gap-3">
              {GALLERY.map((g, i) => {
                const active = i === shot;
                return (
                  <button
                    key={g.src}
                    onClick={() => setShot(i)}
                    className={`relative flex aspect-square items-center justify-center border bg-paper-2 transition-colors ${
                      active ? "border-ink-0" : "border-[color:var(--hair)] hover:border-[color:var(--hair-strong)]"
                    }`}
                    aria-label={`View ${g.label}`}
                  >
                    <div className="relative h-[72%] w-[72%]">
                      <Image
                        src={g.src}
                        alt=""
                        fill
                        sizes="120px"
                        className="object-contain"
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </Reveal>

          {/* Buy box */}
          <Reveal delay={0.05}>
            <Eyebrow>GY-NO! · 001</Eyebrow>
            <h2
              className="mt-4 font-extrabold uppercase text-ink-0"
              style={{ fontSize: "clamp(56px, 6vw, 76px)", lineHeight: 0.9, letterSpacing: "0.01em" }}
            >
              GY-NO!
            </h2>
            <div className="caps mt-4 text-[15px] font-medium text-ink-1">
              Nipple Tightening Cream
            </div>
            <p className="mt-5 max-w-md text-[17px] leading-[1.6] text-ink-1">
              Works in minutes. Up to one hour of temporary firmness. With
              caffeine and menthol agents — matte, lightly fragranced,
              undetectable.
            </p>

            <div className="mt-5 flex flex-wrap gap-2.5">
              <Chip>Fast-Acting</Chip>
              <Chip>Matte Finish</Chip>
              <Chip>For Men</Chip>
            </div>

            {/* Size selector */}
            <div className="mt-9">
              <div className="caps text-[10px] font-semibold text-ink-3">Size</div>
              <div className="mt-3 flex gap-2.5">
                {TIERS.map((t) => {
                  const selected = t.key === tier.key;
                  return (
                    <button
                      key={t.key}
                      type="button"
                      onClick={() => setTierKey(t.key)}
                      className={`relative flex flex-1 flex-col items-center gap-1 rounded-sm border border-ink-0 px-1 py-3.5 transition-colors ${
                        selected
                          ? "bg-ink-0 text-paper-0"
                          : "bg-transparent text-ink-0 hover:bg-ink-0/5"
                      }`}
                    >
                      {t.note && (
                        <span
                          className={`absolute -top-2 left-1/2 -translate-x-1/2 whitespace-nowrap px-1.5 py-0.5 caps text-[8px] font-semibold ${
                            selected ? "bg-paper-0 text-ink-0" : "bg-ink-0 text-paper-0"
                          }`}
                        >
                          {t.note}
                        </span>
                      )}
                      <span className="caps text-[12px] font-semibold">{t.label}</span>
                      <span
                        className={`text-[11px] font-medium ${
                          selected ? "text-paper-0/70" : "text-ink-3"
                        }`}
                      >
                        £{t.price}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Qty + Add */}
            <div className="mt-6 flex items-center gap-4">
              <div className="flex items-center rounded-sm border border-ink-0">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="px-4 py-3 text-base font-semibold text-ink-0 transition-colors hover:bg-ink-0/5"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="min-w-[2rem] text-center font-semibold">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="px-4 py-3 text-base font-semibold text-ink-0 transition-colors hover:bg-ink-0/5"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
              <button
                onClick={onPreorder}
                disabled={loading}
                className="caps flex-1 rounded-sm border border-ink-0 bg-ink-0 px-6 py-[18px] text-[13px] font-semibold text-paper-0 transition-colors hover:bg-ink-1 disabled:opacity-50"
              >
                {loading ? "Opening Checkout…" : `Pre-order — £${total}`}
              </button>
            </div>
            <p className="caps mt-3 text-[10.5px] font-medium text-ink-3">
              Ships {shipMonth} · Secure checkout · Free UK delivery · 30-day returns
            </p>
            {error && <p className="mt-2 text-[12px] text-ink-0">{error}</p>}

            {/* Spec table */}
            <div className="mt-12">
              <SectionHead n="—" title="Specification" />
              <Spec k="Net Quantity" v={tier.unitLabel} />
              <Spec k="Finish" v="Matte · Lightly Fragranced" />
              <Spec k="Onset" v="Within Minutes" />
              <Spec k="Duration" v="Up to 1 Hour (Temporary)" />
              <Spec k="Made By" v="Vis Major" />
              <Spec k="Origin" v="Made in the UK" />
            </div>
          </Reveal>
        </div>

        <NotifyMe />
      </Container>
    </section>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="caps inline-flex items-center rounded-xs border px-3 py-1.5 text-[11px] font-semibold text-ink-0"
      style={{ borderColor: "var(--hair-strong)" }}
    >
      {children}
    </span>
  );
}

function Spec({ k, v }: { k: string; v: string }) {
  return (
    <div
      className="flex items-center justify-between border-b py-3"
      style={{ borderColor: "var(--hair)" }}
    >
      <span className="caps text-[11px] font-semibold text-ink-2">{k}</span>
      <span className="caps text-[11px] font-semibold text-ink-0">{v}</span>
    </div>
  );
}

function NotifyMe() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [message, setMessage] = useState<string>("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      setStatus("error");
      setMessage("Enter a valid email.");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data?.ok) {
        setStatus("done");
        setMessage("You're on the list.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data?.error ?? "Try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error.");
    }
  };

  return (
    <div id="notify" className="mt-20 border-t pt-10" style={{ borderColor: "var(--hair)" }}>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[5fr_7fr] lg:gap-12">
        <div>
          <Eyebrow>Not Ready?</Eyebrow>
          <h3 className="mt-4 text-h3 font-bold text-ink-0">
            Notify me when shipping starts.
          </h3>
          <p className="mt-3 max-w-md text-[14px] leading-[1.65] text-ink-2">
            One email at launch. No marketing fluff.
          </p>
        </div>
        <form onSubmit={submit} className="flex w-full flex-col gap-3 self-end sm:flex-row">
          <input
            type="email"
            required
            placeholder="you@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 rounded-sm border bg-paper-2 px-5 py-[14px] text-[15px] text-ink-0 placeholder:text-ink-3 focus:border-ink-0 focus:outline-none"
            style={{ borderColor: "var(--hair-strong)" }}
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="caps inline-flex items-center justify-center rounded-sm border border-ink-0 bg-ink-0 px-7 py-[14px] text-[12px] font-semibold text-paper-0 transition-colors hover:bg-ink-1 disabled:opacity-50"
          >
            {status === "loading" ? "Adding…" : "Notify Me"}
          </button>
        </form>
      </div>
      {(status === "done" || status === "error") && (
        <p className="caps mt-3 text-[11px] font-medium text-ink-2">{message}</p>
      )}
    </div>
  );
}
