import { Fragment } from "react";

/**
 * Tracked-caps ticker. Renders two identical groups and slides -50% so the
 * loop is seamless. Pure CSS (see globals.css .marquee).
 */
export function Marquee({
  items,
  className = "",
}: {
  items: string[];
  className?: string;
}) {
  const Group = () => (
    <div className="marquee-group" aria-hidden>
      {items.map((it, i) => (
        <Fragment key={i}>
          <span className="caps px-7 text-[12px] font-medium">{it}</span>
          <span className="self-center text-[8px] text-ink-3">●</span>
        </Fragment>
      ))}
    </div>
  );

  return (
    <div className={`overflow-hidden ${className}`}>
      <div className="marquee">
        <Group />
        <Group />
      </div>
    </div>
  );
}
