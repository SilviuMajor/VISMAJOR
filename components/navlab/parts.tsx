/* Shared bits for the nav-bar explorations. */

export const PRODUCTS = ["PECTUS", "SCULPT", "STONE", "STEEL"];

export function CartGlyph({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden className={`inline-flex h-9 w-9 items-center justify-center ${className}`}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6.5 8h11l-1 11.5H7.5L6.5 8Z" />
        <path d="M9.2 8V6.2a2.8 2.8 0 0 1 5.6 0V8" />
      </svg>
    </span>
  );
}
