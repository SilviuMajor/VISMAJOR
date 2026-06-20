// VIS MAJOR marketing kit — Home + Product screens
const DSs = window.GYNODesignSystem_bea4a7;

function HomeScreen({ onShop }) {
  const { Wordmark, Button, Badge, Seal } = DSs;
  const { ProductTube, Eyebrow, SectionHead } = window;

  const claim = (n, t, d) => (
    <div style={{ borderTop: '1px solid var(--hairline)', paddingTop: 18 }}>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 11, color: 'var(--ink-3)', fontWeight: 500 }}>{n}</div>
      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, letterSpacing: '0.01em',
        textTransform: 'uppercase', marginTop: 10 }}>{t}</div>
      <div style={{ fontFamily: 'var(--font-text)', fontSize: 13.5, color: 'var(--ink-2)', lineHeight: 1.65, marginTop: 8 }}>{d}</div>
    </div>
  );

  return (
    <div>
      {/* HERO */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '70px 40px 40px',
        display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 48, alignItems: 'center' }}>
        <div>
          <Eyebrow>Topicals for Men</Eyebrow>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(44px,6vw,76px)',
            letterSpacing: '-0.025em', lineHeight: 0.98, textTransform: 'uppercase', margin: '26px 0 0' }}>
            Instant<br/>Confidence.<br/>Maximum<br/>Stiffness.
          </h1>
          <p style={{ fontFamily: 'var(--font-text)', fontSize: 16, lineHeight: 1.65, color: 'var(--ink-1)',
            maxWidth: 440, margin: '28px 0 0' }}>
            GY-NO! is a precision nipple-tightening cream. Works in minutes. Up to one hour of temporary firmness — pocket-size, go-out ready.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 32 }}>
            <Button variant="primary" size="lg" onClick={onShop}>Shop GY-NO! — £24</Button>
            <Button variant="secondary" size="lg" onClick={onShop}>The Science</Button>
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 28 }}>
            <Badge variant="outline">Works in Minutes</Badge>
            <Badge variant="outline">Caffeine + Menthol</Badge>
            <Badge variant="outline">For Men</Badge>
          </div>
        </div>
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
          <div style={{ position: 'absolute', inset: 0, border: '1px solid var(--hairline-strong)', margin: 8 }} />
          <div style={{ position: 'absolute', top: 22, right: 22 }}><Seal size={92} /></div>
          <div style={{ padding: '48px 0' }}><ProductTube width={188} /></div>
        </div>
      </section>

      {/* CLAIMS */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '46px 40px 30px' }}>
        <SectionHead n="01" title="One job. Done well." />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 34 }}>
          {claim('/01', 'Fast-Acting', 'A cooling micro-firming complex takes hold within minutes of application.')}
          {claim('/02', 'Up To One Hour', 'Temporary effect by design. Reapply as needed. No residue, no shine.')}
          {claim('/03', 'Built For Men', 'Matte-finish, lightly fragranced, engineered to disappear under any shirt.')}
        </div>
      </section>

      {/* HOUSE STRIP */}
      <section style={{ background: 'var(--surface)', borderTop: '1px solid var(--hairline)',
        borderBottom: '1px solid var(--hairline)', marginTop: 40 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '46px 40px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 40 }}>
          <Wordmark brand="vismajor" size={26} descriptor="A Superior Force" />
          <p style={{ fontFamily: 'var(--font-text)', fontSize: 14, color: 'var(--ink-2)', maxWidth: 540,
            lineHeight: 1.7, margin: 0 }}>
            Vis Major makes performance topicals for men — no theatre, no miracle claims. Just precise,
            fast-acting formulas built around a single result. GY-NO! is the first.
          </p>
        </div>
      </section>
    </div>
  );
}

function ProductScreen({ onAdd }) {
  const { Wordmark, Button, Badge } = DSs;
  const { ProductTube, Eyebrow, SectionHead } = window;
  const [size, setSize] = React.useState('20ml');
  const [qty, setQty] = React.useState(1);

  const spec = (k, v) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0',
      borderBottom: '1px solid var(--hairline)' }}>
      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 11,
        letterSpacing: 'var(--track-caps)', textTransform: 'uppercase', color: 'var(--ink-2)' }}>{k}</span>
      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 11,
        letterSpacing: 'var(--track-caps)', textTransform: 'uppercase', color: 'var(--ink-0)' }}>{v}</span>
    </div>
  );

  const opt = (val) => (
    <button onClick={() => setSize(val)} style={{
      flex: 1, padding: '14px 0', cursor: 'pointer', background: size === val ? 'var(--ink-0)' : 'transparent',
      color: size === val ? 'var(--paper-0)' : 'var(--ink-0)', border: '1px solid var(--ink-0)',
      borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 12,
      letterSpacing: 'var(--track-caps)', textTransform: 'uppercase' }}>{val}</button>
  );

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '56px 40px 60px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56 }}>
        {/* product visual */}
        <div style={{ position: 'relative', background: 'var(--surface)', border: '1px solid var(--hairline)',
          borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          minHeight: 540 }}>
          <div style={{ position: 'absolute', inset: 16, border: '1px solid var(--hairline-strong)' }} />
          <ProductTube width={210} />
        </div>
        {/* buy box */}
        <div>
          <Eyebrow>GY-NO! · 001</Eyebrow>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 54, letterSpacing: '0.01em',
            lineHeight: 0.92, margin: '20px 0 0' }}>GY-NO!</h1>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 14,
            letterSpacing: 'var(--track-caps)', textTransform: 'uppercase', color: 'var(--ink-1)', marginTop: 14 }}>
            Nipple Tightening Cream
          </div>
          <p style={{ fontFamily: 'var(--font-text)', fontSize: 15.5, lineHeight: 1.65, color: 'var(--ink-1)',
            margin: '22px 0 0', maxWidth: 460 }}>
            Works in minutes. Up to one hour of temporary firmness. With caffeine and menthol agents — matte, lightly fragranced, undetectable.
          </p>
          <div style={{ display: 'flex', gap: 9, marginTop: 22 }}>
            <Badge variant="outline">Fast-Acting</Badge>
            <Badge variant="outline">Matte Finish</Badge>
            <Badge variant="outline">For Men</Badge>
          </div>

          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 10,
            letterSpacing: 'var(--track-caps)', textTransform: 'uppercase', color: 'var(--ink-3)', margin: '34px 0 12px' }}>Size</div>
          <div style={{ display: 'flex', gap: 10 }}>{opt('20ml')}{opt('40ml')}{opt('2-pack')}</div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 26 }}>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--ink-0)', borderRadius: 'var(--radius-sm)' }}>
              <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ padding: '12px 16px', background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, fontFamily: 'var(--font-display)' }}>−</button>
              <span style={{ minWidth: 28, textAlign: 'center', fontFamily: 'var(--font-display)', fontWeight: 600 }}>{qty}</span>
              <button onClick={() => setQty(qty + 1)} style={{ padding: '12px 16px', background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, fontFamily: 'var(--font-display)' }}>+</button>
            </div>
            <div style={{ flex: 1 }}>
              <Button variant="primary" size="lg" full onClick={() => onAdd(qty)}>Add to Cart — £{24 * qty}</Button>
            </div>
          </div>

          <div style={{ marginTop: 38 }}>
            <SectionHead n="—" title="Specification" />
            {spec('Net Quantity', size === '2-pack' ? '2 × 20ml' : size)}
            {spec('Finish', 'Matte · Lightly Fragranced')}
            {spec('Onset', 'Within minutes')}
            {spec('Duration', 'Up to 1 hour (temporary)')}
            {spec('Made By', 'Vis Major')}
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { HomeScreen, ProductScreen });
