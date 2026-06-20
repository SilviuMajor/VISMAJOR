/* @ds-bundle: {"format":3,"namespace":"GYNODesignSystem_bea4a7","components":[{"name":"Monogram","sourcePath":"components/brand/Monogram.jsx"},{"name":"Seal","sourcePath":"components/brand/Seal.jsx"},{"name":"Wordmark","sourcePath":"components/brand/Wordmark.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"MetalPlate","sourcePath":"components/core/MetalPlate.jsx"}],"sourceHashes":{"components/brand/Monogram.jsx":"cb79ca4a7d92","components/brand/Seal.jsx":"b9fe218c6d88","components/brand/Wordmark.jsx":"7797f01d6557","components/core/Badge.jsx":"fab822041bce","components/core/Button.jsx":"e6f52a0d19ef","components/core/MetalPlate.jsx":"6c6f8b15d34c","ui_kits/marketing/app.jsx":"1fd0d60287e2","ui_kits/marketing/chrome.jsx":"f3cdf8d72f60","ui_kits/marketing/parts.jsx":"1ea50e78dc5e","ui_kits/marketing/screens.jsx":"34b6782e0dfa"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.GYNODesignSystem_bea4a7 = window.GYNODesignSystem_bea4a7 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/brand/Monogram.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * VIS MAJOR — Monogram
 * The hexagon-VM house monogram. Line-drawn, mono.
 */
function Monogram({
  size = 96,
  color = 'var(--ink-0)',
  letters = 'VM',
  strokeWidth = 2.5,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: size,
      height: size * 1.09,
      color,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 108 118",
    fill: "none",
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%'
    }
  }, /*#__PURE__*/React.createElement("polygon", {
    points: "54,5 101,31 101,87 54,113 7,87 7,31",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: strokeWidth
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      zIndex: 1,
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--fw-extrabold)',
      fontSize: size * 0.35,
      letterSpacing: '-0.02em',
      lineHeight: 1
    }
  }, letters));
}
Object.assign(__ds_scope, { Monogram });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Monogram.jsx", error: String((e && e.message) || e) }); }

// components/brand/Seal.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * VIS MAJOR — Seal
 * Circular "ENGINEERED FOR MEN" stamp with the hexagon-VM at centre.
 * Used as an authenticity/quality mark on pack and in footers.
 */
function Seal({
  size = 184,
  color = 'var(--ink-0)',
  top = 'ENGINEERED',
  bottom = 'FOR MEN',
  letters = 'VM',
  style = {},
  ...rest
}) {
  const id = React.useId().replace(/:/g, '');
  return /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 240 240",
    fill: "none",
    width: size,
    height: size,
    style: {
      color,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("path", {
    id: `top-${id}`,
    d: "M 36 120 A 84 84 0 0 1 204 120"
  }), /*#__PURE__*/React.createElement("path", {
    id: `bot-${id}`,
    d: "M 44 120 A 76 76 0 0 0 196 120"
  })), /*#__PURE__*/React.createElement("circle", {
    cx: "120",
    cy: "120",
    r: "112",
    stroke: "currentColor",
    strokeWidth: "2"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "120",
    cy: "120",
    r: "96",
    stroke: "currentColor",
    strokeWidth: "1"
  }), /*#__PURE__*/React.createElement("text", {
    fill: "currentColor",
    fontFamily: "var(--font-display)",
    fontWeight: "500",
    fontSize: "15",
    letterSpacing: "3.5"
  }, /*#__PURE__*/React.createElement("textPath", {
    href: `#top-${id}`,
    startOffset: "50%",
    textAnchor: "middle"
  }, top)), /*#__PURE__*/React.createElement("text", {
    fill: "currentColor",
    fontFamily: "var(--font-display)",
    fontWeight: "500",
    fontSize: "15",
    letterSpacing: "3.5"
  }, /*#__PURE__*/React.createElement("textPath", {
    href: `#bot-${id}`,
    startOffset: "50%",
    textAnchor: "middle"
  }, bottom)), /*#__PURE__*/React.createElement("line", {
    x1: "30",
    y1: "120",
    x2: "44",
    y2: "120",
    stroke: "currentColor",
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "196",
    y1: "120",
    x2: "210",
    y2: "120",
    stroke: "currentColor",
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("polygon", {
    points: "120,90 146,105 146,135 120,150 94,135 94,105",
    stroke: "currentColor",
    strokeWidth: "2.5",
    fill: "none"
  }), /*#__PURE__*/React.createElement("text", {
    x: "120",
    y: "121",
    fill: "currentColor",
    fontFamily: "var(--font-display)",
    fontSize: "28",
    fontWeight: "800",
    textAnchor: "middle",
    dominantBaseline: "middle",
    letterSpacing: "-0.02em"
  }, letters));
}
Object.assign(__ds_scope, { Seal });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Seal.jsx", error: String((e && e.message) || e) }); }

// components/brand/Wordmark.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * VIS MAJOR — Wordmark
 * Renders the two house marks:
 *   brand="gyno"  → GY-NO! product wordmark (heavy, tight)
 *   brand="vismajor" → VIS MAJOR house mark (light, tracked)
 */
function Wordmark({
  brand = 'gyno',
  // 'gyno' | 'vismajor'
  size = 56,
  descriptor,
  // optional sub-line
  color = 'var(--ink-0)',
  align = 'start',
  // 'start' | 'center'
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
    ...style
  };
  const mark = isGyno ? {
    fontWeight: 'var(--fw-extrabold)',
    fontSize: size,
    letterSpacing: '0.01em',
    lineHeight: 0.9,
    whiteSpace: 'nowrap'
  } : {
    fontWeight: 'var(--fw-light)',
    fontSize: size,
    letterSpacing: '0.28em',
    textTransform: 'uppercase',
    lineHeight: 1,
    whiteSpace: 'nowrap',
    // optical: pull right edge in so tracking looks centered
    paddingLeft: align === 'center' ? '0.28em' : 0
  };
  const desc = {
    fontFamily: 'var(--font-display)',
    fontWeight: 'var(--fw-semibold)',
    fontSize: Math.max(9, size * 0.2),
    letterSpacing: 'var(--track-caps)',
    textTransform: 'uppercase',
    marginTop: size * 0.22,
    color: 'var(--ink-1)'
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: wrap
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: mark
  }, isGyno ? 'GY-NO!' : 'VIS MAJOR'), descriptor && /*#__PURE__*/React.createElement("span", {
    style: desc
  }, descriptor));
}
Object.assign(__ds_scope, { Wordmark });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Wordmark.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * VIS MAJOR — Badge
 * Tracked-caps marker. Use for descriptors, claims, status.
 */
function Badge({
  children,
  variant = 'outline',
  // 'solid' | 'outline' | 'plain'
  size = 'md',
  // 'sm' | 'md'
  ...rest
}) {
  const fs = {
    sm: 9.5,
    md: 11
  }[size];
  const pad = {
    sm: '5px 9px',
    md: '7px 12px'
  }[size];
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
    whiteSpace: 'nowrap'
  };
  const variants = {
    solid: {
      background: 'var(--ink-0)',
      color: 'var(--paper-0)'
    },
    outline: {
      background: 'transparent',
      color: 'var(--ink-0)',
      border: '1px solid var(--hairline-strong)'
    },
    plain: {
      background: 'transparent',
      color: 'var(--ink-2)'
    }
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      ...base,
      ...variants[variant]
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * VIS MAJOR — Button
 * Tracked-caps action in the house style. Mono only.
 */
function Button({
  children,
  variant = 'primary',
  // 'primary' | 'secondary' | 'ghost'
  size = 'md',
  // 'sm' | 'md' | 'lg'
  full = false,
  disabled = false,
  as = 'button',
  ...rest
}) {
  const pad = {
    sm: '10px 18px',
    md: '14px 26px',
    lg: '18px 36px'
  }[size];
  const fs = {
    sm: 11,
    md: 12.5,
    lg: 14
  }[size];
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
    textDecoration: 'none'
  };
  const variants = {
    primary: {
      background: 'var(--ink-0)',
      color: 'var(--paper-0)'
    },
    secondary: {
      background: 'transparent',
      color: 'var(--ink-0)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--ink-0)',
      border: '1px solid transparent'
    }
  };
  const Comp = as;
  return /*#__PURE__*/React.createElement(Comp, _extends({
    style: {
      ...base,
      ...variants[variant]
    },
    disabled: as === 'button' ? disabled : undefined
  }, rest), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/MetalPlate.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * VIS MAJOR — MetalPlate
 * Brushed-aluminium surface used for product bodies, nameplates and
 * material panels. Vertical brushed texture, soft top sheen.
 */
function MetalPlate({
  children,
  tone = 'aluminium',
  // 'aluminium' | 'dark'
  radius = 6,
  sheen = true,
  style = {},
  ...rest
}) {
  const aluminium = 'repeating-linear-gradient(90deg, rgba(255,255,255,0.42) 0 1px, rgba(255,255,255,0) 1px 2px, rgba(0,0,0,0.05) 2px 3px, rgba(0,0,0,0) 3px 4px),' + 'linear-gradient(90deg,#83878a 0%,#b4b8ba 12%,#e7e9ea 32%,#fbfcfc 50%,#d2d5d6 66%,#a4a8aa 86%,#7c8083 100%)';
  const dark = 'linear-gradient(160deg,#2b2a27,#161512 60%,#0d0c0a)';
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      position: 'relative',
      background: tone === 'dark' ? dark : aluminium,
      borderRadius: radius,
      overflow: 'hidden',
      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.4)',
      ...style
    }
  }, rest), sheen && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      height: '34%',
      background: tone === 'dark' ? 'linear-gradient(180deg, rgba(255,255,255,0.14), transparent)' : 'linear-gradient(180deg, rgba(255,255,255,0.55), transparent)',
      pointerEvents: 'none'
    }
  }), children);
}
Object.assign(__ds_scope, { MetalPlate });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/MetalPlate.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing/app.jsx
try { (() => {
// VIS MAJOR marketing kit — app root
const {
  useState
} = React;
function App() {
  const [screen, setScreen] = useState('home');
  const [cart, setCart] = useState(0);
  const [toast, setToast] = useState(null);
  const {
    SiteHeader,
    SiteFooter,
    HomeScreen,
    ProductScreen
  } = window;
  const go = s => {
    setScreen(s);
    window.scrollTo({
      top: 0
    });
  };
  const add = (q = 1) => {
    setCart(c => c + q);
    setToast(`Added ${q} × GY-NO! to cart`);
    clearTimeout(window.__t);
    window.__t = setTimeout(() => setToast(null), 2200);
  };
  const openCart = () => {
    if (cart === 0) {
      setToast('Your cart is empty');
      clearTimeout(window.__t);
      window.__t = setTimeout(() => setToast(null), 1800);
    } else {
      setToast(`${cart} item(s) · Checkout is a demo`);
      clearTimeout(window.__t);
      window.__t = setTimeout(() => setToast(null), 2200);
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--paper-0)'
    }
  }, /*#__PURE__*/React.createElement(SiteHeader, {
    cart: cart,
    active: screen,
    onNav: go,
    onCart: openCart
  }), /*#__PURE__*/React.createElement("main", {
    style: {
      flex: 1
    }
  }, screen === 'home' ? /*#__PURE__*/React.createElement(HomeScreen, {
    onShop: () => go('product')
  }) : /*#__PURE__*/React.createElement(ProductScreen, {
    onAdd: add
  })), /*#__PURE__*/React.createElement(SiteFooter, null), toast && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      left: '50%',
      bottom: 28,
      transform: 'translateX(-50%)',
      zIndex: 50,
      background: 'var(--ink-0)',
      color: 'var(--paper-0)',
      padding: '14px 22px',
      borderRadius: 'var(--radius-sm)',
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 11.5,
      letterSpacing: 'var(--track-caps)',
      textTransform: 'uppercase',
      boxShadow: '0 18px 40px -18px rgba(0,0,0,0.6)'
    }
  }, toast));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing/app.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing/chrome.jsx
try { (() => {
// VIS MAJOR marketing kit — header + footer chrome
const DSc = window.GYNODesignSystem_bea4a7;
function SiteHeader({
  cart,
  onNav,
  onCart,
  active
}) {
  const {
    Monogram
  } = DSc;
  const link = (key, label) => /*#__PURE__*/React.createElement("button", {
    onClick: () => onNav(key),
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 11.5,
      letterSpacing: 'var(--track-caps)',
      textTransform: 'uppercase',
      color: active === key ? 'var(--ink-0)' : 'var(--ink-2)',
      borderBottom: active === key ? '1px solid var(--ink-0)' : '1px solid transparent',
      paddingBottom: 3
    }
  }, label);
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 20,
      background: 'var(--paper-0)',
      borderBottom: '1px solid var(--hairline)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: '0 auto',
      padding: '16px 40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => onNav('home'),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      background: 'none',
      border: 'none',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(Monogram, {
    size: 30
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 300,
      fontSize: 16,
      letterSpacing: '0.26em',
      textTransform: 'uppercase',
      color: 'var(--ink-0)'
    }
  }, "VIS\xA0MAJOR")), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 30
    }
  }, link('home', 'Home'), link('product', 'GY-NO!'), link('product', 'Science'), /*#__PURE__*/React.createElement("button", {
    onClick: onCart,
    style: {
      background: 'none',
      border: '1px solid var(--hairline-strong)',
      cursor: 'pointer',
      borderRadius: 'var(--radius-xs)',
      padding: '7px 12px',
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 11,
      letterSpacing: 'var(--track-caps)',
      textTransform: 'uppercase',
      color: 'var(--ink-0)'
    }
  }, "Cart (", cart, ")"))));
}
function SiteFooter() {
  const {
    Seal
  } = DSc;
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: 'var(--ink-0)',
      color: 'var(--paper-0)',
      marginTop: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: '0 auto',
      padding: '64px 40px 48px',
      display: 'grid',
      gridTemplateColumns: '1fr auto',
      gap: 40,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 300,
      fontSize: 34,
      letterSpacing: '0.26em',
      textTransform: 'uppercase'
    }
  }, "VIS\xA0MAJOR"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 500,
      fontSize: 11,
      letterSpacing: 'var(--track-caps)',
      textTransform: 'uppercase',
      color: 'var(--ink-3)',
      marginTop: 16
    }
  }, "Performance Topicals for Men \xB7 Est. MMXXVI"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 10,
      letterSpacing: '0.04em',
      color: 'var(--ink-3)',
      marginTop: 26,
      maxWidth: 440,
      lineHeight: 1.8
    }
  }, "Cosmetic use only. Temporary effect. Not a treatment for any medical condition. GY-NO!\u2122 is a product of Vis Major.")), /*#__PURE__*/React.createElement(Seal, {
    size: 120,
    color: "var(--paper-0)"
  })));
}
Object.assign(window, {
  SiteHeader,
  SiteFooter
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing/chrome.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing/parts.jsx
try { (() => {
// VIS MAJOR marketing kit — shared presentational parts
// Exports to window for the other babel scripts.
const {
  useState
} = React;
const DS = window.GYNODesignSystem_bea4a7;

/* ---- Matte-white GY-NO! cream tube render (kit-local) ---- */
function ProductTube({
  width = 196,
  label = 'cream'
}) {
  const alu = 'linear-gradient(90deg,#d8d5cc 0%,#f3f1ea 16%,#ffffff 44%,#ffffff 56%,#eeebe4 82%,#d4d1c8 100%)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: width * 0.72,
      height: 15,
      borderRadius: '3px 3px 0 0',
      background: 'linear-gradient(90deg,#cecbc2,#efece6 45%,#efece6 55%,#c8c5bc)',
      boxShadow: 'inset 0 2px 3px rgba(255,255,255,0.4), inset 0 -3px 4px rgba(0,0,0,0.25)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width,
      height: width * 1.46,
      borderRadius: '30px 30px 5px 5px',
      overflow: 'hidden',
      background: alu
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      height: 46,
      background: 'linear-gradient(180deg, rgba(255,255,255,0.55), transparent)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 22,
      right: 22,
      top: 70,
      bottom: 30,
      background: 'transparent',
      borderRadius: 3,
      padding: '16px 14px',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      textAlign: 'center',
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      letterSpacing: '0.2em',
      textTransform: 'uppercase',
      fontSize: 9,
      color: 'var(--ink-1)'
    }
  }, "VISMAJOR"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      letterSpacing: '0.02em',
      fontSize: 25,
      lineHeight: 0.9,
      color: 'var(--ink-0)'
    }
  }, "GY\u2011NO!"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      marginTop: 8,
      fontFamily: 'var(--font-display)',
      fontWeight: 500,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      fontSize: 8.5,
      lineHeight: 1.4,
      color: 'var(--ink-0)'
    }
  }, label === 'cream' ? /*#__PURE__*/React.createElement(React.Fragment, null, "Nipple", /*#__PURE__*/React.createElement("br", null), "Tightening Cream") : /*#__PURE__*/React.createElement(React.Fragment, null, "Nipple Balm")), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      marginTop: 6,
      fontFamily: 'var(--font-display)',
      fontWeight: 500,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      fontSize: 6,
      lineHeight: 1.4,
      color: 'var(--ink-2)'
    }
  }, label === 'cream' ? 'With Caffeine & Menthol Agents' : 'Soothe + Protect'), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: 10,
      paddingTop: 7,
      borderTop: '1px solid rgba(20,19,15,0.18)',
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      fontSize: 6.5,
      color: 'var(--ink-1)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "For Men"), /*#__PURE__*/React.createElement("span", null, label === 'cream' ? '20ml ℮' : '8g ℮'))))), /*#__PURE__*/React.createElement("div", {
    style: {
      width: width * 0.85,
      height: width * 0.3,
      marginTop: -4,
      borderRadius: '0 0 12px 12px',
      background: 'linear-gradient(180deg,#2b2a27,#161512 55%,#0c0b09)',
      boxShadow: 'inset 0 3px 4px rgba(255,255,255,0.12), 0 26px 36px -22px rgba(0,0,0,0.7)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: width * 1.1,
      height: 20,
      marginTop: 6,
      borderRadius: '50%',
      background: 'radial-gradient(50% 50%, rgba(20,19,15,0.4), transparent 72%)',
      filter: 'blur(5px)'
    }
  }));
}

/* ---- Tracked-caps eyebrow with rules ---- */
function Eyebrow({
  children,
  center
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      justifyContent: center ? 'center' : 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 30,
      height: 1,
      background: 'var(--hairline-strong)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 11,
      letterSpacing: 'var(--track-caps-loose)',
      textTransform: 'uppercase',
      color: 'var(--ink-2)'
    }
  }, children), center && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 30,
      height: 1,
      background: 'var(--hairline-strong)'
    }
  }));
}

/* ---- Index number + section title ---- */
function SectionHead({
  n,
  title
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 14,
      marginBottom: 26
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 12,
      color: 'var(--ink-3)',
      fontWeight: 500
    }
  }, n), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 20,
      letterSpacing: '-0.01em',
      margin: 0
    }
  }, title), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      height: 1,
      background: 'var(--hairline)'
    }
  }));
}
Object.assign(window, {
  ProductTube,
  Eyebrow,
  SectionHead
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing/parts.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing/screens.jsx
try { (() => {
// VIS MAJOR marketing kit — Home + Product screens
const DSs = window.GYNODesignSystem_bea4a7;
function HomeScreen({
  onShop
}) {
  const {
    Wordmark,
    Button,
    Badge,
    Seal
  } = DSs;
  const {
    ProductTube,
    Eyebrow,
    SectionHead
  } = window;
  const claim = (n, t, d) => /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid var(--hairline)',
      paddingTop: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 11,
      color: 'var(--ink-3)',
      fontWeight: 500
    }
  }, n), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 16,
      letterSpacing: '0.01em',
      textTransform: 'uppercase',
      marginTop: 10
    }
  }, t), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-text)',
      fontSize: 13.5,
      color: 'var(--ink-2)',
      lineHeight: 1.65,
      marginTop: 8
    }
  }, d));
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 1200,
      margin: '0 auto',
      padding: '70px 40px 40px',
      display: 'grid',
      gridTemplateColumns: '1.1fr 0.9fr',
      gap: 48,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, null, "Topicals for Men"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 'clamp(44px,6vw,76px)',
      letterSpacing: '-0.025em',
      lineHeight: 0.98,
      textTransform: 'uppercase',
      margin: '26px 0 0'
    }
  }, "Instant", /*#__PURE__*/React.createElement("br", null), "Confidence.", /*#__PURE__*/React.createElement("br", null), "Maximum", /*#__PURE__*/React.createElement("br", null), "Stiffness."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-text)',
      fontSize: 16,
      lineHeight: 1.65,
      color: 'var(--ink-1)',
      maxWidth: 440,
      margin: '28px 0 0'
    }
  }, "GY-NO! is a precision nipple-tightening cream. Works in minutes. Up to one hour of temporary firmness \u2014 pocket-size, go-out ready."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      marginTop: 32
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    onClick: onShop
  }, "Shop GY-NO! \u2014 \xA324"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "lg",
    onClick: onShop
  }, "The Science")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    variant: "outline"
  }, "Works in Minutes"), /*#__PURE__*/React.createElement(Badge, {
    variant: "outline"
  }, "Caffeine + Menthol"), /*#__PURE__*/React.createElement(Badge, {
    variant: "outline"
  }, "For Men"))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      border: '1px solid var(--hairline-strong)',
      margin: 8
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 22,
      right: 22
    }
  }, /*#__PURE__*/React.createElement(Seal, {
    size: 92
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '48px 0'
    }
  }, /*#__PURE__*/React.createElement(ProductTube, {
    width: 188
  })))), /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 1200,
      margin: '0 auto',
      padding: '46px 40px 30px'
    }
  }, /*#__PURE__*/React.createElement(SectionHead, {
    n: "01",
    title: "One job. Done well."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 34
    }
  }, claim('/01', 'Fast-Acting', 'A cooling micro-firming complex takes hold within minutes of application.'), claim('/02', 'Up To One Hour', 'Temporary effect by design. Reapply as needed. No residue, no shine.'), claim('/03', 'Built For Men', 'Matte-finish, lightly fragranced, engineered to disappear under any shirt.'))), /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--surface)',
      borderTop: '1px solid var(--hairline)',
      borderBottom: '1px solid var(--hairline)',
      marginTop: 40
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: '0 auto',
      padding: '46px 40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 40
    }
  }, /*#__PURE__*/React.createElement(Wordmark, {
    brand: "vismajor",
    size: 26,
    descriptor: "A Superior Force"
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-text)',
      fontSize: 14,
      color: 'var(--ink-2)',
      maxWidth: 540,
      lineHeight: 1.7,
      margin: 0
    }
  }, "Vis Major makes performance topicals for men \u2014 no theatre, no miracle claims. Just precise, fast-acting formulas built around a single result. GY-NO! is the first."))));
}
function ProductScreen({
  onAdd
}) {
  const {
    Wordmark,
    Button,
    Badge
  } = DSs;
  const {
    ProductTube,
    Eyebrow,
    SectionHead
  } = window;
  const [size, setSize] = React.useState('20ml');
  const [qty, setQty] = React.useState(1);
  const spec = (k, v) => /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '12px 0',
      borderBottom: '1px solid var(--hairline)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 11,
      letterSpacing: 'var(--track-caps)',
      textTransform: 'uppercase',
      color: 'var(--ink-2)'
    }
  }, k), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 11,
      letterSpacing: 'var(--track-caps)',
      textTransform: 'uppercase',
      color: 'var(--ink-0)'
    }
  }, v));
  const opt = val => /*#__PURE__*/React.createElement("button", {
    onClick: () => setSize(val),
    style: {
      flex: 1,
      padding: '14px 0',
      cursor: 'pointer',
      background: size === val ? 'var(--ink-0)' : 'transparent',
      color: size === val ? 'var(--paper-0)' : 'var(--ink-0)',
      border: '1px solid var(--ink-0)',
      borderRadius: 'var(--radius-sm)',
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 12,
      letterSpacing: 'var(--track-caps)',
      textTransform: 'uppercase'
    }
  }, val);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: '0 auto',
      padding: '56px 40px 60px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 56
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      background: 'var(--surface)',
      border: '1px solid var(--hairline)',
      borderRadius: 'var(--radius-md)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 540
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 16,
      border: '1px solid var(--hairline-strong)'
    }
  }), /*#__PURE__*/React.createElement(ProductTube, {
    width: 210
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, null, "GY-NO! \xB7 001"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 54,
      letterSpacing: '0.01em',
      lineHeight: 0.92,
      margin: '20px 0 0'
    }
  }, "GY-NO!"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 500,
      fontSize: 14,
      letterSpacing: 'var(--track-caps)',
      textTransform: 'uppercase',
      color: 'var(--ink-1)',
      marginTop: 14
    }
  }, "Nipple Tightening Cream"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-text)',
      fontSize: 15.5,
      lineHeight: 1.65,
      color: 'var(--ink-1)',
      margin: '22px 0 0',
      maxWidth: 460
    }
  }, "Works in minutes. Up to one hour of temporary firmness. With caffeine and menthol agents \u2014 matte, lightly fragranced, undetectable."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 9,
      marginTop: 22
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    variant: "outline"
  }, "Fast-Acting"), /*#__PURE__*/React.createElement(Badge, {
    variant: "outline"
  }, "Matte Finish"), /*#__PURE__*/React.createElement(Badge, {
    variant: "outline"
  }, "For Men")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 10,
      letterSpacing: 'var(--track-caps)',
      textTransform: 'uppercase',
      color: 'var(--ink-3)',
      margin: '34px 0 12px'
    }
  }, "Size"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10
    }
  }, opt('20ml'), opt('40ml'), opt('2-pack')), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      marginTop: 26
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      border: '1px solid var(--ink-0)',
      borderRadius: 'var(--radius-sm)'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setQty(Math.max(1, qty - 1)),
    style: {
      padding: '12px 16px',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      fontSize: 16,
      fontFamily: 'var(--font-display)'
    }
  }, "\u2212"), /*#__PURE__*/React.createElement("span", {
    style: {
      minWidth: 28,
      textAlign: 'center',
      fontFamily: 'var(--font-display)',
      fontWeight: 600
    }
  }, qty), /*#__PURE__*/React.createElement("button", {
    onClick: () => setQty(qty + 1),
    style: {
      padding: '12px 16px',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      fontSize: 16,
      fontFamily: 'var(--font-display)'
    }
  }, "+")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    full: true,
    onClick: () => onAdd(qty)
  }, "Add to Cart \u2014 \xA3", 24 * qty))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 38
    }
  }, /*#__PURE__*/React.createElement(SectionHead, {
    n: "\u2014",
    title: "Specification"
  }), spec('Net Quantity', size === '2-pack' ? '2 × 20ml' : size), spec('Finish', 'Matte · Lightly Fragranced'), spec('Onset', 'Within minutes'), spec('Duration', 'Up to 1 hour (temporary)'), spec('Made By', 'Vis Major')))));
}
Object.assign(window, {
  HomeScreen,
  ProductScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing/screens.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Monogram = __ds_scope.Monogram;

__ds_ns.Seal = __ds_scope.Seal;

__ds_ns.Wordmark = __ds_scope.Wordmark;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.MetalPlate = __ds_scope.MetalPlate;

})();
