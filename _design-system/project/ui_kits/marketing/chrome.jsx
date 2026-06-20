// VIS MAJOR marketing kit — header + footer chrome
const DSc = window.GYNODesignSystem_bea4a7;

function SiteHeader({ cart, onNav, onCart, active }) {
  const { Monogram } = DSc;
  const link = (key, label) => (
    <button onClick={() => onNav(key)} style={{
      background: 'none', border: 'none', cursor: 'pointer',
      fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 11.5,
      letterSpacing: 'var(--track-caps)', textTransform: 'uppercase',
      color: active === key ? 'var(--ink-0)' : 'var(--ink-2)',
      borderBottom: active === key ? '1px solid var(--ink-0)' : '1px solid transparent',
      paddingBottom: 3,
    }}>{label}</button>
  );
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 20, background: 'var(--paper-0)',
      borderBottom: '1px solid var(--hairline)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '16px 40px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={() => onNav('home')} style={{ display: 'flex', alignItems: 'center', gap: 12,
          background: 'none', border: 'none', cursor: 'pointer' }}>
          <Monogram size={30} />
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 16,
            letterSpacing: '0.26em', textTransform: 'uppercase', color: 'var(--ink-0)' }}>VIS&nbsp;MAJOR</span>
        </button>
        <nav style={{ display: 'flex', alignItems: 'center', gap: 30 }}>
          {link('home', 'Home')}
          {link('product', 'GY-NO!')}
          {link('product', 'Science')}
          <button onClick={onCart} style={{ background: 'none', border: '1px solid var(--hairline-strong)',
            cursor: 'pointer', borderRadius: 'var(--radius-xs)', padding: '7px 12px',
            fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 11,
            letterSpacing: 'var(--track-caps)', textTransform: 'uppercase', color: 'var(--ink-0)' }}>
            Cart ({cart})
          </button>
        </nav>
      </div>
    </header>
  );
}

function SiteFooter() {
  const { Seal } = DSc;
  return (
    <footer style={{ background: 'var(--ink-0)', color: 'var(--paper-0)', marginTop: 0 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 40px 48px',
        display: 'grid', gridTemplateColumns: '1fr auto', gap: 40, alignItems: 'center' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 34,
            letterSpacing: '0.26em', textTransform: 'uppercase' }}>VIS&nbsp;MAJOR</div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 11,
            letterSpacing: 'var(--track-caps)', textTransform: 'uppercase', color: 'var(--ink-3)', marginTop: 16 }}>
            Performance Topicals for Men · Est. MMXXVI
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 10, letterSpacing: '0.04em',
            color: 'var(--ink-3)', marginTop: 26, maxWidth: 440, lineHeight: 1.8 }}>
            Cosmetic use only. Temporary effect. Not a treatment for any medical condition.
            GY-NO!™ is a product of Vis Major.
          </div>
        </div>
        <Seal size={120} color="var(--paper-0)" />
      </div>
    </footer>
  );
}

Object.assign(window, { SiteHeader, SiteFooter });
