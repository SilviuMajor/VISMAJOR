# UI Kit — VIS MAJOR / GY-NO! Marketing Site

Interactive recreation of the brand's marketing surface. Mono apothecary styling, Hanken Grotesk, matte-white product render.

## Screens / flow
- **Home** — hero (claims + product + seal), three-up claim grid, VIS MAJOR house strip.
- **Product (PDP)** — product visual in a keyline frame, buy box with size selector + quantity, spec table.
- **Interactions** — top-nav routing (Home ↔ GY-NO!), size + quantity selection, **Add to Cart** updates the cart count with a toast, cart button is demo-only.

## Files
- `index.html` — entry; loads React + Babel + the compiled DS bundle, then the kit scripts in order.
- `parts.jsx` — kit-local presentational bits: `ProductTube` (aluminium cream tube), `Eyebrow`, `SectionHead`.
- `chrome.jsx` — `SiteHeader`, `SiteFooter` (uses DS `Monogram`, `Seal`).
- `screens.jsx` — `HomeScreen`, `ProductScreen` (compose DS `Wordmark`, `Button`, `Badge`).
- `app.jsx` — root: screen routing, cart state, toast.

## Composition
Built on the design-system primitives via `window.GYNODesignSystem_bea4a7` — `Wordmark`, `Button`, `Badge`, `Monogram`, `Seal`. The tube render is kit-local (presentational), not a DS primitive. Nothing here re-implements a primitive.

> Scope note: this is a cosmetic recreation, not production commerce — checkout/cart are demo stubs.
