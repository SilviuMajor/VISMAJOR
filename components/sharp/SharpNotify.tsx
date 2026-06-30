"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function SharpNotify() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

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
        body: JSON.stringify({ email, product: "stone" }),
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
    <section id="notify" className="py-16 md:py-20">
      <Container>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[5fr_7fr] lg:gap-12">
          <div>
            <Eyebrow>Not Ready?</Eyebrow>
            <h3
              className="mt-4 font-bold uppercase text-ink-0"
              style={{ fontSize: "clamp(28px,3.4vw,44px)", letterSpacing: "-0.02em", lineHeight: 1 }}
            >
              Join the
              <br />
              first-batch list.
            </h3>
            <p className="mt-4 max-w-md text-[16.5px] leading-[1.6] text-ink-2">
              One email when STONE ships. No marketing fluff.
            </p>
          </div>
          <form onSubmit={submit} className="flex w-full flex-col gap-3 self-end sm:flex-row">
            <input
              type="email"
              required
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 rounded-sm border bg-paper-2 px-5 py-[16px] text-[15px] text-ink-0 placeholder:text-ink-3 focus:border-ink-0 focus:outline-none"
              style={{ borderColor: "var(--hair-strong)" }}
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="inline-flex items-center justify-center rounded-[5px] border border-ink-0 bg-ink-0 px-8 py-[16px] text-[12px] font-semibold text-paper-0 transition-colors hover:bg-ink-1 disabled:opacity-50"
            >
              {status === "loading" ? "Adding…" : "Notify Me"}
            </button>
          </form>
        </div>
        {(status === "done" || status === "error") && (
          <p className="mt-3 caps text-[11px] font-medium text-ink-2">{message}</p>
        )}
      </Container>
    </section>
  );
}
