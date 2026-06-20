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
      <span className="caps-loose text-[11px] font-semibold text-ink-2">
        {children}
      </span>
      {center && <span className="h-px w-7 bg-[var(--hair-strong)]" />}
    </div>
  );
}

export function SectionHead({
  n,
  title,
}: {
  n: string;
  title: string;
}) {
  return (
    <div className="mb-9 flex items-baseline gap-4">
      <span className="text-[13px] font-medium text-ink-3">{n}</span>
      <h3
        className="m-0 font-bold tracking-tight text-ink-0"
        style={{ fontSize: "clamp(24px, 3vw, 34px)", letterSpacing: "-0.02em" }}
      >
        {title}
      </h3>
      <span className="h-px flex-1 bg-[var(--hair)]" />
    </div>
  );
}
