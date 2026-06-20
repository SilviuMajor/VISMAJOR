// VIS MAJOR marketing kit — shared presentational parts
// Exports to window for the other babel scripts.
const { useState } = React;
const DS = window.GYNODesignSystem_bea4a7;

/* ---- Matte-white GY-NO! cream tube render (kit-local) ---- */
function ProductTube({ width = 196, label = 'cream' }) {
  const alu =
    'linear-gradient(90deg,#d8d5cc 0%,#f3f1ea 16%,#ffffff 44%,#ffffff 56%,#eeebe4 82%,#d4d1c8 100%)';
  return (
    <div style={{ position: 'relative', width, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: width * 0.72, height: 15, borderRadius: '3px 3px 0 0',
        background: 'linear-gradient(90deg,#cecbc2,#efece6 45%,#efece6 55%,#c8c5bc)',
        boxShadow: 'inset 0 2px 3px rgba(255,255,255,0.4), inset 0 -3px 4px rgba(0,0,0,0.25)' }} />
      <div style={{ position: 'relative', width, height: width * 1.46, borderRadius: '30px 30px 5px 5px',
        overflow: 'hidden', background: alu }}>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 46,
          background: 'linear-gradient(180deg, rgba(255,255,255,0.55), transparent)' }} />
        <div style={{ position: 'absolute', left: 22, right: 22, top: 70, bottom: 30, background: 'transparent',
          borderRadius: 3, padding: '16px 14px',
          display: 'flex', flexDirection: 'column' }}>
          <span style={{ textAlign: 'center', fontFamily: 'var(--font-display)', fontWeight: 600,
            letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: 9, color: 'var(--ink-1)' }}>VISMAJOR</span>
          <div style={{ marginTop: 'auto' }}>
            <span style={{ display: 'block', fontFamily: 'var(--font-display)', fontWeight: 800, letterSpacing: '0.02em',
              fontSize: 25, lineHeight: 0.9, color: 'var(--ink-0)' }}>GY&#8209;NO!</span>
            <span style={{ display: 'block', marginTop: 8, fontFamily: 'var(--font-display)', fontWeight: 500, letterSpacing: '0.1em',
              textTransform: 'uppercase', fontSize: 8.5, lineHeight: 1.4, color: 'var(--ink-0)' }}>
              {label === 'cream' ? <>Nipple<br/>Tightening Cream</> : <>Nipple Balm</>}
            </span>
            <span style={{ display: 'block', marginTop: 6, fontFamily: 'var(--font-display)', fontWeight: 500, letterSpacing: '0.08em',
              textTransform: 'uppercase', fontSize: 6, lineHeight: 1.4, color: 'var(--ink-2)' }}>
              {label === 'cream' ? 'With Caffeine & Menthol Agents' : 'Soothe + Protect'}
            </span>
            <span style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, paddingTop: 7,
              borderTop: '1px solid rgba(20,19,15,0.18)', fontFamily: 'var(--font-display)', fontWeight: 600,
              letterSpacing: '0.12em', textTransform: 'uppercase', fontSize: 6.5, color: 'var(--ink-1)' }}>
              <span>For Men</span><span>{label === 'cream' ? '20ml ℮' : '8g ℮'}</span>
            </span>
          </div>
        </div>
      </div>
      <div style={{ width: width * 0.85, height: width * 0.3, marginTop: -4, borderRadius: '0 0 12px 12px',
        background: 'linear-gradient(180deg,#2b2a27,#161512 55%,#0c0b09)',
        boxShadow: 'inset 0 3px 4px rgba(255,255,255,0.12), 0 26px 36px -22px rgba(0,0,0,0.7)' }} />
      <div style={{ width: width * 1.1, height: 20, marginTop: 6, borderRadius: '50%',
        background: 'radial-gradient(50% 50%, rgba(20,19,15,0.4), transparent 72%)', filter: 'blur(5px)' }} />
    </div>
  );
}

/* ---- Tracked-caps eyebrow with rules ---- */
function Eyebrow({ children, center }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14,
      justifyContent: center ? 'center' : 'flex-start' }}>
      <span style={{ width: 30, height: 1, background: 'var(--hairline-strong)' }} />
      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 11,
        letterSpacing: 'var(--track-caps-loose)', textTransform: 'uppercase', color: 'var(--ink-2)' }}>{children}</span>
      {center && <span style={{ width: 30, height: 1, background: 'var(--hairline-strong)' }} />}
    </div>
  );
}

/* ---- Index number + section title ---- */
function SectionHead({ n, title }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 26 }}>
      <span style={{ fontFamily: 'var(--font-display)', fontSize: 12, color: 'var(--ink-3)', fontWeight: 500 }}>{n}</span>
      <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 20, letterSpacing: '-0.01em', margin: 0 }}>{title}</h3>
      <span style={{ flex: 1, height: 1, background: 'var(--hairline)' }} />
    </div>
  );
}

Object.assign(window, { ProductTube, Eyebrow, SectionHead });
