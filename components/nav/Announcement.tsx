export function Announcement({ shipMonth }: { shipMonth: string }) {
  return (
    <div className="bg-ink-0 text-paper-0">
      <div className="mx-auto flex h-9 max-w-[1200px] items-center justify-center px-6 caps text-[10px] font-semibold text-paper-0/90 sm:text-[10.5px]">
        {/* Full line on larger screens */}
        <span className="hidden sm:inline">
          Pre-order
          <span className="mx-2 text-paper-0/40">·</span>
          first batch ships {shipMonth}
          <span className="mx-2 text-paper-0/40">·</span>
          free UK delivery
        </span>
        {/* Condensed on mobile */}
        <span className="sm:hidden">
          Pre-order · ships {shipMonth}
        </span>
      </div>
    </div>
  );
}
