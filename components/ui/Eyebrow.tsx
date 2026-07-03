import { ReactNode } from "react";

export function Eyebrow({
  children,
  center = false,
}: {
  children: ReactNode;
  center?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-3.5 ${center ? "justify-center" : ""}`}
    >
      <span className="h-px w-7 bg-[var(--hair-strong)]" />
      <span className="caps-loose text-[11px] font-medium text-ink-2">
        {children}
      </span>
      {center && <span className="h-px w-7 bg-[var(--hair-strong)]" />}
    </div>
  );
}

export function SectionHead({
  n,
  title,
  light = false,
}: {
  n: string;
  title: string;
  /** Light-on-dark variant for inverted (negative-colour) sections. */
  light?: boolean;
}) {
  return (
    <div className="mb-9 flex items-baseline gap-4">
      <span className={`text-[13px] font-medium ${light ? "text-paper-0/50" : "text-ink-3"}`}>{n}</span>
      <h3
        className={`m-0 font-semibold tracking-tight ${light ? "text-paper-0" : "text-ink-0"}`}
        style={{ fontSize: "clamp(24px, 3vw, 34px)", letterSpacing: "-0.02em" }}
      >
        {title}
      </h3>
      <span className={`h-px flex-1 ${light ? "bg-paper-0/25" : "bg-[var(--hair)]"}`} />
    </div>
  );
}
