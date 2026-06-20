import React from 'react';

/**
 * VIS MAJOR — Button
 * Tracked-caps action in the house style. Mono only.
 */
export function Button({
  children,
  variant = 'primary',   // 'primary' | 'secondary' | 'ghost'
  size = 'md',           // 'sm' | 'md' | 'lg'
  full = false,
  disabled = false,
  as = 'button',
  ...rest
}) {
  const pad = {
    sm: '10px 18px',
    md: '14px 26px',
    lg: '18px 36px',
  }[size];
  const fs = { sm: 11, md: 12.5, lg: 14 }[size];

  const base = {
    fontFamily: 'var(--font-display)',
    fontWeight: 'var(--fw-semibold)',
    textTransform: 'uppercase',
    letterSpacing: 'var(--track-caps)',
    fontSize: fs,
    lineHeight: 1,
    padding: pad,
    width: full ? '100%' : 'auto',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    borderRadius: 'var(--radius-sm)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.4 : 1,
    transition: 'background .18s ease, color .18s ease, border-color .18s ease, transform .05s ease',
    border: '1px solid var(--ink-0)',
    WebkitFontSmoothing: 'antialiased',
    textDecoration: 'none',
  };

  const variants = {
    primary:   { background: 'var(--ink-0)', color: 'var(--paper-0)' },
    secondary: { background: 'transparent', color: 'var(--ink-0)' },
    ghost:     { background: 'transparent', color: 'var(--ink-0)', border: '1px solid transparent' },
  };

  const Comp = as;
  return (
    <Comp style={{ ...base, ...variants[variant] }} disabled={as === 'button' ? disabled : undefined} {...rest}>
      {children}
    </Comp>
  );
}
