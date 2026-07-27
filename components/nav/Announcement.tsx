export function Announcement({
  shipMonth,
  message,
  messageShort,
}: {
  shipMonth?: string;
  /** Override the default line (e.g. a house-level message). */
  message?: string;
  messageShort?: string;
}) {
  return (
    <div className="relative z-40 bg-ink-0 text-paper-0">
      <div className="mx-auto flex h-9 max-w-[1200px] items-center justify-center px-6 caps text-[10px] font-semibold text-paper-0/90 sm:text-[10.5px]">
        {message ? (
          <>
            <span className="hidden sm:inline">{message}</span>
            <span className="sm:hidden">{messageShort ?? message}</span>
          </>
        ) : (
          <>
            {/* Full line on larger screens */}
            <span className="hidden sm:inline">
              Ships {shipMonth}
              <span className="mx-2 text-paper-0/40">·</span>
              free UK delivery
              <span className="mx-2 text-paper-0/40">·</span>
              30-day returns
            </span>
            {/* Condensed on mobile */}
            <span className="sm:hidden">Ships {shipMonth} · Free UK delivery</span>
          </>
        )}
      </div>
    </div>
  );
}
