// VIS MAJOR marketing kit — app root
const { useState } = React;

function App() {
  const [screen, setScreen] = useState('home');
  const [cart, setCart] = useState(0);
  const [toast, setToast] = useState(null);
  const { SiteHeader, SiteFooter, HomeScreen, ProductScreen } = window;

  const go = (s) => { setScreen(s); window.scrollTo({ top: 0 }); };
  const add = (q = 1) => {
    setCart((c) => c + q);
    setToast(`Added ${q} × GY-NO! to cart`);
    clearTimeout(window.__t); window.__t = setTimeout(() => setToast(null), 2200);
  };
  const openCart = () => { if (cart === 0) { setToast('Your cart is empty'); clearTimeout(window.__t); window.__t = setTimeout(() => setToast(null), 1800); } else { setToast(`${cart} item(s) · Checkout is a demo`); clearTimeout(window.__t); window.__t = setTimeout(() => setToast(null), 2200); } };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--paper-0)' }}>
      <SiteHeader cart={cart} active={screen} onNav={go} onCart={openCart} />
      <main style={{ flex: 1 }}>
        {screen === 'home'
          ? <HomeScreen onShop={() => go('product')} />
          : <ProductScreen onAdd={add} />}
      </main>
      <SiteFooter />

      {toast && (
        <div style={{ position: 'fixed', left: '50%', bottom: 28, transform: 'translateX(-50%)', zIndex: 50,
          background: 'var(--ink-0)', color: 'var(--paper-0)', padding: '14px 22px', borderRadius: 'var(--radius-sm)',
          fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 11.5, letterSpacing: 'var(--track-caps)',
          textTransform: 'uppercase', boxShadow: '0 18px 40px -18px rgba(0,0,0,0.6)' }}>
          {toast}
        </div>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
