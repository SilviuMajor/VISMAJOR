import React from 'react';

/**
 * VIS MAJOR — Badge
 * Tracked-caps marker. Use for descriptors, claims, status.
 */
export function Badge({
  children,
  variant = 'outline',  // 'solid' | 'outline' | 'plain'
  size = 'md',          // 'sm' | 'md'
  ...rest
}) {
  const fs = { sm: 9.5, md: 11 }[size];
  const pad = { sm: '5px 9px', md: '7px 12px' }[size];

  const base = {
    fontFamily: 'var(--font-display)',
    fontWeight: 'var(--fw-semibold)',
    textTransform: 'uppercase',
    letterSpacing: 'var(--track-caps)',
    fontSize: fs,
    lineHeight: 1,
    padding: pad,
    display: 'inline-flex',
    alignItems: 'center',
    gap: 7,
    borderRadius: 'var(--radius-xs)',
    whiteSpace: 'nowrap',
  };

  const variants = {
    solid:   { background: 'var(--ink-0)', color: 'var(--paper-0)' },
    outline: { background: 'transparent', color: 'var(--ink-0)', border: '1px solid var(--hairline-strong)' },
    plain:   { background: 'transparent', color: 'var(--ink-2)' },
  };

  return (
    <span style={{ ...base, ...variants[variant] }} {...rest}>
      {children}
    </span>
  );
}
