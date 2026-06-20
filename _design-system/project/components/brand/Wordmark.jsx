import React from 'react';

/**
 * VIS MAJOR — Wordmark
 * Renders the two house marks:
 *   brand="gyno"  → GY-NO! product wordmark (heavy, tight)
 *   brand="vismajor" → VIS MAJOR house mark (light, tracked)
 */
export function Wordmark({
  brand = 'gyno',       // 'gyno' | 'vismajor'
  size = 56,
  descriptor,           // optional sub-line
  color = 'var(--ink-0)',
  align = 'start',      // 'start' | 'center'
  style = {},
  ...rest
}) {
  const isGyno = brand === 'gyno';

  const wrap = {
    display: 'inline-flex',
    flexDirection: 'column',
    alignItems: align === 'center' ? 'center' : 'flex-start',
    textAlign: align === 'center' ? 'center' : 'left',
    color,
    fontFamily: 'var(--font-display)',
    ...style,
  };

  const mark = isGyno
    ? {
        fontWeight: 'var(--fw-extrabold)',
        fontSize: size,
        letterSpacing: '0.01em',
        lineHeight: 0.9,
        whiteSpace: 'nowrap',
      }
    : {
        fontWeight: 'var(--fw-light)',
        fontSize: size,
        letterSpacing: '0.28em',
        textTransform: 'uppercase',
        lineHeight: 1,
        whiteSpace: 'nowrap',
        // optical: pull right edge in so tracking looks centered
        paddingLeft: align === 'center' ? '0.28em' : 0,
      };

  const desc = {
    fontFamily: 'var(--font-display)',
    fontWeight: 'var(--fw-semibold)',
    fontSize: Math.max(9, size * 0.2),
    letterSpacing: 'var(--track-caps)',
    textTransform: 'uppercase',
    marginTop: size * 0.22,
    color: 'var(--ink-1)',
  };

  return (
    <span style={wrap} {...rest}>
      <span style={mark}>{isGyno ? 'GY-NO!' : 'VIS MAJOR'}</span>
      {descriptor && <span style={desc}>{descriptor}</span>}
    </span>
  );
}
