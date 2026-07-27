"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import {
  V2_CHANGES,
  SURFACES,
  CATEGORIES,
  type V2Change,
} from "@/lib/v2-changes";

/**
 * The full V2 change catalogue: every proposed change in one filterable list.
 * This is the reference Silviu works from when deciding what to migrate, so it
 * leads with the number and keeps the reasoning visible rather than hidden
 * behind a disclosure.
 */
export function ChangesTable() {
  const [surface, setSurface] = useState<string>("All");
  const [category, setCategory] = useState<string>("All");
  const [bugsOnly, setBugsOnly] = useState(false);
  const [picked, setPicked] = useState<number[]>([]);

  const rows = useMemo(() => {
    return V2_CHANGES.filter(
      (c) =>
        (surface === "All" || c.surface === surface) &&
        (category === "All" || c.category === category) &&
        (!bugsOnly || c.fixesBug),
    ).sort((a, b) => a.n - b.n);
  }, [surface, category, bugsOnly]);

  const toggle = (n: number) =>
    setPicked((p) => (p.includes(n) ? p.filter((x) => x !== n) : [...p, n]));

  return (
    <main className="min-h-screen bg-paper-0 py-16 md:py-24">
      <Container>
        <Link
          href="/v2"
          className="caps text-[11px] font-semibold text-ink-2 hover:text-ink-0"
        >
          ← V2 index
        </Link>

        <h1
          className="mt-7 font-bold uppercase text-ink-0"
          style={{ fontSize: "clamp(30px, 4.6vw, 62px)", letterSpacing: "-0.03em", lineHeight: 0.98 }}
        >
          The change catalogue
        </h1>
        <p className="mt-5 max-w-2xl text-[16px] leading-[1.65] text-ink-1">
          {V2_CHANGES.length} proposed changes. Tick the ones you want and the
          list to quote back to me builds at the bottom.
        </p>

        {/* filters */}
        <div className="mt-10 flex flex-wrap items-center gap-2.5">
          <Filter
            label="Surface"
            value={surface}
            onChange={setSurface}
            options={["All", ...SURFACES]}
          />
          <Filter
            label="Category"
            value={category}
            onChange={setCategory}
            options={["All", ...CATEGORIES]}
          />
          <label
            className="caps flex items-center gap-2 rounded-[5px] border px-3.5 py-2 text-[10px] font-semibold text-ink-2"
            style={{ borderColor: "var(--hair-strong)" }}
          >
            <input
              type="checkbox"
              checked={bugsOnly}
              onChange={(e) => setBugsOnly(e.target.checked)}
            />
            Bugs only
          </label>
          <span className="caps ml-auto text-[10px] font-semibold text-ink-3">
            {rows.length} shown
          </span>
        </div>

        {/* rows */}
        <div
          className="mt-8 border-t"
          style={{ borderColor: "var(--hair-strong)" }}
        >
          {rows.length === 0 && (
            <p className="py-10 text-[14px] text-ink-2">
              Nothing matches that filter.
            </p>
          )}
          {rows.map((c) => (
            <Row
              key={c.n}
              c={c}
              picked={picked.includes(c.n)}
              onToggle={() => toggle(c.n)}
            />
          ))}
        </div>

        {/* the shortlist */}
        {picked.length > 0 && (
          <div
            className="sticky bottom-0 mt-10 border-t bg-paper-0/95 py-5 backdrop-blur"
            style={{ borderColor: "var(--hair-strong)" }}
          >
            <div className="caps text-[10px] font-semibold text-ink-3">
              Your shortlist · {picked.length} selected
            </div>
            <p className="num mt-2 text-[16px] font-semibold text-ink-0">
              push {[...picked].sort((a, b) => a - b).join(", ")}
            </p>
            <button
              onClick={() => setPicked([])}
              className="caps mt-3 text-[10px] font-semibold text-ink-2 underline underline-offset-4 hover:text-ink-0"
            >
              Clear
            </button>
          </div>
        )}
      </Container>
    </main>
  );
}

function Row({
  c,
  picked,
  onToggle,
}: {
  c: V2Change;
  picked: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`grid grid-cols-1 gap-4 border-b py-6 md:grid-cols-[auto_1fr_auto] md:gap-7 ${
        picked ? "bg-ink-0/[0.04]" : ""
      }`}
      style={{ borderColor: "var(--hair)" }}
    >
      <div className="flex items-start gap-4">
        <input
          type="checkbox"
          checked={picked}
          onChange={onToggle}
          aria-label={`Select change ${c.n}`}
          className="mt-1.5"
        />
        <span className="num flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink-0 text-[12px] font-bold text-paper-0">
          {c.n}
        </span>
      </div>

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
        <p className="mt-2.5 max-w-2xl text-[14px] leading-[1.6] text-ink-1">
          <span className="caps text-[9px] font-semibold text-ink-3">Why </span>
          {c.why}
        </p>
        {c.evidence && (
          <p className="mt-2 max-w-2xl text-[12.5px] leading-[1.55] text-ink-3">
            {c.evidence}
          </p>
        )}
        {c.route && (
          <Link
            href={c.route}
            className="caps mt-3 inline-block text-[10px] font-semibold text-ink-0 underline underline-offset-4"
          >
            See it on {c.route}
          </Link>
        )}
      </div>

      <div className="flex shrink-0 flex-row gap-2 md:flex-col md:items-end">
        <Meta>{c.surface}</Meta>
        <Meta>{c.category}</Meta>
        <Meta>{`Effort ${c.effort}`}</Meta>
        <Meta>{`Risk ${c.risk}`}</Meta>
      </div>
    </div>
  );
}

function Meta({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="caps h-fit rounded-xs border px-2 py-0.5 text-[9px] font-semibold text-ink-2"
      style={{ borderColor: "var(--hair-strong)" }}
    >
      {children}
    </span>
  );
}

function Filter({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <label
      className="caps flex items-center gap-2 rounded-[5px] border px-3.5 py-2 text-[10px] font-semibold text-ink-2"
      style={{ borderColor: "var(--hair-strong)" }}
    >
      {label}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent text-[10px] font-semibold uppercase text-ink-0 outline-none"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}
