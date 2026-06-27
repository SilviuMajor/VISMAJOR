"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Container } from "@/components/ui/Container";

export default function ConfirmedPage() {
  // useSearchParams must sit inside a Suspense boundary for Next 14 builds.
  return (
    <Suspense fallback={null}>
      <Confirmed />
    </Suspense>
  );
}

function Confirmed() {
  const params = useSearchParams();
  const ref = params.get("ref");

  return (
    <main className="min-h-screen bg-paper-0">
      <Container>
        <div className="flex min-h-screen flex-col items-center justify-center py-16 text-center">
          {/* seal mark */}
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            stroke="var(--ink-0)"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <circle cx="24" cy="24" r="20" />
            <path d="M16 24.5l5.5 5.5L33 18.5" />
          </svg>

          <h1
            className="mt-8 font-extrabold uppercase text-ink-0"
            style={{ fontSize: "clamp(30px, 4vw, 46px)", lineHeight: 0.98, letterSpacing: "-0.01em" }}
          >
            Pre-order reserved.
          </h1>

          {ref && (
            <div className="mt-6">
              <div className="caps text-[10px] font-semibold text-ink-3">Order reference</div>
              <div className="house mt-2 text-[18px] text-ink-0">{ref}</div>
            </div>
          )}

          <p className="mt-7 max-w-md text-[15px] leading-[1.7] text-ink-2">
            We&apos;ll email you when the first batch is ready. No payment was taken.
          </p>

          <Link
            href="/"
            className="caps mt-9 inline-flex rounded-[5px] bg-ink-0 px-10 py-[16px] text-[12px] font-semibold text-paper-0 transition-colors hover:bg-ink-1"
          >
            Back to VIS·MAJOR
          </Link>
        </div>
      </Container>
    </main>
  );
}
