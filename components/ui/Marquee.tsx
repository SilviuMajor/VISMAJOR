import { CSSProperties, Fragment } from "react";

/**
 * Tracked-caps ticker. Renders two identical groups and slides -50% so the
 * loop is seamless. Pure CSS (see globals.css .marquee).
 *
 * One cycle travels exactly one group's width, so a fixed duration would make
 * a wordier ticker move faster. The duration is therefore derived from the
 * copy, which keeps PECTUS, SCULPT and STONE at the same px/second.
 */

// A single item is 12px tracked caps inside px-7 padding, then a bullet —
// enough to estimate a group's rendered width without measuring in the browser.
const PX_PER_CHAR = 8.6;
const PX_PER_ITEM = 66; // 56px of px-7 padding + the bullet separator
const PX_PER_SECOND = 39; // the pace the PECTUS ticker has always run at

export function Marquee({
  items,
  className = "",
}: {
  items: string[];
  className?: string;
}) {
  const groupWidth = items.reduce(
    (w, it) => w + it.length * PX_PER_CHAR + PX_PER_ITEM,
    0,
  );
  const duration = Math.round(groupWidth / PX_PER_SECOND);

  // Only the duplicate is hidden — the first group carries the copy for screen
  // readers, which would otherwise be given nothing at all.
  const Group = ({ duplicate = false }: { duplicate?: boolean }) => (
    <div className="marquee-group" aria-hidden={duplicate}>
      {items.map((it, i) => (
        <Fragment key={i}>
          <span className="caps px-7 text-[12px] font-medium">{it}</span>
          <span className="self-center text-[8px] text-ink-4" aria-hidden>
            ●
          </span>
        </Fragment>
      ))}
    </div>
  );

  return (
    <div className={`overflow-hidden ${className}`}>
      <div
        className="marquee"
        style={{ "--marquee-duration": `${duration}s` } as CSSProperties}
      >
        <Group />
        <Group duplicate />
      </div>
    </div>
  );
}
