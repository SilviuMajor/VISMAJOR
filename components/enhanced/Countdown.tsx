"use client";

import { useEffect, useState } from "react";

function parts(target: number) {
  const now = Date.now();
  let diff = Math.max(0, target - now);
  const d = Math.floor(diff / 86400000);
  diff -= d * 86400000;
  const h = Math.floor(diff / 3600000);
  diff -= h * 3600000;
  const m = Math.floor(diff / 60000);
  diff -= m * 60000;
  const s = Math.floor(diff / 1000);
  return { d, h, m, s };
}

export function Countdown({
  iso = "2026-09-01T09:00:00Z",
  tone = "ink",
}: {
  iso?: string;
  tone?: "ink" | "paper";
}) {
  const target = new Date(iso).getTime();
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setT(parts(target));
    const id = setInterval(() => setT(parts(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const items = [
    { v: t.d, l: "Days" },
    { v: t.h, l: "Hrs" },
    { v: t.m, l: "Min" },
    { v: t.s, l: "Sec" },
  ];

  const isPaper = tone === "paper";

  return (
    <div className="flex items-stretch gap-3">
      {items.map((it, i) => (
        <div key={it.l} className="flex items-center gap-3">
          <div className="flex flex-col items-center">
            <span
              className={`num-tab font-semibold ${isPaper ? "text-paper-0" : "text-ink-0"}`}
              style={{ fontSize: "clamp(32px, 4.2vw, 56px)", lineHeight: 1 }}
            >
              {mounted ? String(it.v).padStart(2, "0") : "––"}
            </span>
            <span
              className={`caps mt-2 text-[9.5px] font-medium ${isPaper ? "text-paper-0/50" : "text-ink-3"}`}
            >
              {it.l}
            </span>
          </div>
          {i < items.length - 1 && (
            <span
              className={`pb-4 text-[24px] ${isPaper ? "text-paper-0/30" : "text-ink-3"}`}
              aria-hidden
            >
              :
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
