"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";

const EASE = [0.16, 1, 0.3, 1] as const;

export function NotifyBandV2() {
  const reduce = useReducedMotion();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");
  const [focused, setFocused] = useState(false);

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

  const done = status === "done";

  return (
    <section className="py-16 md:py-24">
      <Container>
        <div
          className="relative overflow-hidden rounded-sm bg-paper-1 px-7 py-12 md:px-14 md:py-16"
          style={{ border: "1px solid var(--hair-strong)" }}
        >
          {/* faint registration index, top-right */}
          <span className="caps absolute right-6 top-6 hidden text-[10px] font-medium text-ink-3 md:inline">
            № 002 · The list
          </span>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-16">
            {/* Heading block */}
            <div>
              <div className="flex items-center gap-3.5">
                <span className="h-px w-7 bg-[var(--hair-strong)]" />
                <span className="caps text-[11px] font-semibold text-ink-2">
                  Not ready?
                </span>
              </div>
              <h3
                className="mt-6 font-extrabold uppercase text-ink-0"
                style={{
                  fontSize: "clamp(30px, 4.4vw, 56px)",
                  letterSpacing: "-0.025em",
                  lineHeight: 0.95,
                }}
              >
                Join the
                <br />
                first-batch list.
              </h3>
              <p className="mt-5 max-w-sm text-[16.5px] leading-[1.6] text-ink-2">
                One email when shipping starts. No marketing fluff.
              </p>
            </div>

            {/* Form — single-line underline field with an integrated submit */}
            <div>
              <AnimatePresence mode="wait" initial={false}>
                {done ? (
                  <motion.div
                    key="done"
                    initial={reduce ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0, y: -8 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="flex items-baseline gap-4 border-b pb-4"
                    style={{ borderColor: "var(--hair-strong)" }}
                  >
                    <span
                      className="caps text-[11px] font-semibold"
                      style={{ color: "rgba(55,138,221,0.95)" }}
                    >
                      Confirmed
                    </span>
                    <span
                      className="font-bold uppercase text-ink-0"
                      style={{
                        fontSize: "clamp(20px, 2.4vw, 30px)",
                        letterSpacing: "-0.015em",
                        lineHeight: 1,
                      }}
                    >
                      You&rsquo;re on the list.
                    </span>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={submit}
                    initial={false}
                    className="relative"
                  >
                    <label className="caps block text-[10px] font-semibold text-ink-3">
                      Email address
                    </label>
                    <div className="mt-3 flex items-end gap-4">
                      <input
                        type="email"
                        required
                        placeholder="you@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                        aria-invalid={status === "error"}
                        className="w-full flex-1 bg-transparent pb-3 text-ink-0 placeholder:text-ink-3 focus:outline-none"
                        style={{
                          fontSize: "clamp(20px, 2.6vw, 30px)",
                          letterSpacing: "-0.01em",
                          fontWeight: 500,
                        }}
                      />
                      <button
                        type="submit"
                        disabled={status === "loading"}
                        className="caps group relative inline-flex shrink-0 items-center gap-2.5 overflow-hidden rounded-sm border border-ink-0 bg-ink-0 px-7 py-[15px] text-[12px] font-semibold text-paper-0 transition-colors duration-300 hover:text-ink-0 disabled:opacity-50 disabled:hover:text-paper-0"
                      >
                        <span
                          aria-hidden
                          className="absolute inset-0 origin-left scale-x-0 bg-paper-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 group-disabled:scale-x-0"
                        />
                        <span className="relative">
                          {status === "loading" ? "Adding…" : "Notify Me"}
                        </span>
                        <span
                          aria-hidden
                          className="relative transition-transform duration-300 group-hover:translate-x-0.5"
                        >
                          &rarr;
                        </span>
                      </button>
                    </div>
                    {/* underline — thickens / steels on focus */}
                    <span className="relative block h-px w-full bg-[var(--hair-strong)]">
                      <motion.span
                        aria-hidden
                        className="absolute inset-0 origin-left"
                        style={{
                          background:
                            status === "error"
                              ? "var(--ink-0)"
                              : "rgba(55,138,221,0.95)",
                        }}
                        initial={false}
                        animate={{ scaleX: focused || status === "error" ? 1 : 0 }}
                        transition={{ duration: 0.4, ease: EASE }}
                      />
                    </span>

                    <div className="mt-3 h-4">
                      <AnimatePresence>
                        {status === "error" && (
                          <motion.p
                            initial={reduce ? false : { opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="caps text-[11px] font-medium text-ink-2"
                          >
                            {message}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
