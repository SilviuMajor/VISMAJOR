// The V2 change catalogue — one entry per proposed change, numbered.
//
// This is the single source of truth for the annotated V2 site. Each change has
// a stable number `n`; the number is what Silviu quotes back ("push 12, 19, 33").
// The number is also the value of the `data-v2` attribute on the element that
// demonstrates the change, which is how the overlay finds and labels it.
//
// Numbers are permanent once assigned. If a change is dropped, retire the number
// rather than reusing it, so a reference never means two different things.
//
// Evidence sources: a read-only audit of this repo, plus competitor teardowns of
// Lumin, Huron, Geologie, Tiege Hanley, Beardbrand, Jack Black, Cremo and
// Bulldog, plus Baymard, NN/g, Stripe and Google published research.

export type V2Surface =
  | "Global"
  | "Home"
  | "PECTUS"
  | "STONE"
  | "Cart & Checkout"
  | "New pages";

export type V2Category =
  | "Conversion"
  | "Missing"
  | "Change"
  | "Improvement"
  | "Trust"
  | "Technical";

export type V2Effort = "S" | "M" | "L";
export type V2Risk = "low" | "medium" | "high";

export interface V2Change {
  n: number;
  title: string;
  surface: V2Surface;
  category: V2Category;
  what: string;
  why: string;
  evidence?: string;
  effort: V2Effort;
  risk: V2Risk;
  route?: string;
  fixesBug?: boolean;
}

export const V2_CHANGES: V2Change[] = [
  // ───────────────────────── Cart & checkout ─────────────────────────
  {
    n: 1,
    title: "Make the checkout actually take payment",
    surface: "Cart & Checkout",
    category: "Conversion",
    what:
      "Replace the mock order form with a real Stripe Checkout session. Today placeOrder() makes no network call: it invents a reference, clears the basket and redirects.",
    why:
      "The store cannot take money. Every completed order is discarded, and the confirmation page tells the customer an email is coming when nothing is sent. Nothing else on this list matters until this is fixed.",
    evidence:
      "app/checkout/page.tsx placeOrder(). The working Stripe route at app/api/checkout/route.ts is orphaned; its only caller, components/sections/BuyBlock.tsx, is dead code.",
    effort: "L",
    risk: "low",
    route: "/v2/checkout",
    fixesBug: true,
  },
  {
    n: 2,
    title: "Record orders server-side via a Stripe webhook",
    surface: "Cart & Checkout",
    category: "Technical",
    what:
      "Add app/api/stripe/webhook/route.ts handling checkout.session.completed, with an orders table keyed on a unique stripe_session_id so fulfilment is idempotent.",
    why:
      "Without a webhook, any customer who closes the tab after paying has taken money out of their account with no order recorded anywhere. Stripe's own docs call webhooks mandatory for exactly this reason.",
    evidence:
      "No webhook route exists. Stripe: the success redirect is not reliable; customers close tabs and lose signal.",
    effort: "L",
    risk: "low",
    route: "/v2/checkout",
    fixesBug: true,
  },
  {
    n: 3,
    title: "Send a real order confirmation email",
    surface: "Cart & Checkout",
    category: "Trust",
    what:
      "Send a transactional confirmation from the webhook, carrying the order reference, line items, delivery address, total and cancellation rights.",
    why:
      "UK law requires confirmation of a distance contract on a durable medium no later than delivery. A Stripe receipt is a payment receipt, not an order confirmation, and a link to a web page does not qualify because the page can change.",
    evidence:
      "Consumer Contracts Regulations 2013, Schedule 2. Order confirmation emails also average ~54% open rate, the highest of any ecommerce automation.",
    effort: "M",
    risk: "low",
    route: "/v2/checkout",
    fixesBug: true,
  },
  {
    n: 4,
    title: "Support multi-item baskets and quantity above one",
    surface: "Cart & Checkout",
    category: "Technical",
    what:
      "Rewrite the checkout route to accept { items: [{ sku, qty }] } and build multi-line Stripe sessions. It currently hardcodes a single line item at quantity 1.",
    why:
      "The basket can hold several products at any quantity, but the checkout can only ever represent one of them. Anyone buying two things silently loses one.",
    evidence: "app/api/checkout/route.ts builds one line_item with quantity: 1.",
    effort: "M",
    risk: "low",
    route: "/v2/checkout",
    fixesBug: true,
  },
  {
    n: 5,
    title: "Add STEEL to the purchasable catalogue",
    surface: "Cart & Checkout",
    category: "Technical",
    what:
      "STEEL exists as a cart slug but has no entry in the checkout CATALOG and is absent from lib/products.ts. Add it to both.",
    why:
      "A basket containing STEEL fails at checkout. A product you sell cannot be unbuyable.",
    evidence:
      "CartProductSlug in lib/cart.tsx includes 'steel'; CATALOG in app/api/checkout/route.ts does not.",
    effort: "S",
    risk: "low",
    route: "/v2/checkout",
    fixesBug: true,
  },
  {
    n: 6,
    title: "Collapse prices to one server-owned source",
    surface: "Cart & Checkout",
    category: "Technical",
    what:
      "Prices currently live in the checkout CATALOG (pence), lib/products.ts (pounds), the cart, and each buy panel, kept in sync by comment only. Move to a single server module and have the client post only { sku, qty }.",
    why:
      "Four copies of a price will drift, and a client that posts prices can be edited. This is the classic ecommerce tampering hole and it is entirely preventable.",
    evidence:
      "Explicit in-code warnings in SharpBuy.tsx and ChiselBuy.tsx that display prices must match server amounts by hand.",
    effort: "M",
    risk: "low",
    route: "/v2/checkout",
  },
  {
    n: 7,
    title: "Show delivery cost and a delivery date in the basket",
    surface: "Cart & Checkout",
    category: "Conversion",
    what:
      "Add the delivery line, a free-delivery threshold indicator, and an estimated arrival date to the cart drawer, rather than leaving cost to be discovered at checkout.",
    why:
      "Unexpected extra costs cause 40% of all cart abandonment and 'delivery too slow' another 20%. A date beats a speed: 'Arrives Tue 4 Aug' outperforms '2 to 3 working days'.",
    evidence: "Baymard, 50-study rolling average on cart abandonment.",
    effort: "M",
    risk: "low",
    route: "/v2/checkout",
  },
  {
    n: 8,
    title: "Put product images in the cart drawer",
    surface: "Cart & Checkout",
    category: "Improvement",
    what: "Line items are text only. Add the product thumbnail to each row.",
    why:
      "A basket you can recognise at a glance is easier to trust and easier to correct. Every reference store does this.",
    effort: "S",
    risk: "low",
    route: "/v2/checkout",
  },
  {
    n: 9,
    title: "Add Apple Pay and Google Pay",
    surface: "Cart & Checkout",
    category: "Conversion",
    what:
      "Enable wallet payments. On hosted Stripe Checkout this is close to free; later, express buttons can move into the cart drawer itself.",
    why:
      "In Stripe's own holdback experiment across $1.4tn of volume, Apple Pay lifted conversion 22.3% among eligible checkouts. Showing wallets earlier in the flow roughly doubled their effect.",
    evidence: "Stripe, testing the conversion impact of 50+ payment methods.",
    effort: "M",
    risk: "low",
    route: "/v2/checkout",
  },
  {
    n: 10,
    title: "Fix the address form for mobile autofill",
    surface: "Cart & Checkout",
    category: "Improvement",
    what:
      "Add correct autocomplete and inputmode attributes to every field, keep one full-name field, collapse address line 2, and never set inputmode numeric on a UK postcode.",
    why:
      "Correct autocomplete tokens let users complete forms up to 30% faster and satisfy WCAG 1.3.5. Mobile abandons at 80% against desktop's 70%, and form friction is a large part of that gap.",
    effort: "S",
    risk: "low",
    route: "/v2/checkout",
  },

  // ───────────────────────── Reviews & proof ─────────────────────────
  {
    n: 11,
    title: "Add a real review system",
    surface: "Global",
    category: "Missing",
    what:
      "Build star ratings, review counts and a reviews page, wired to a real platform rather than hardcoded copy. Shown here with clearly-marked placeholder content.",
    why:
      "This is the single biggest gap on the site. Products with five or more reviews convert materially better than products with none, and reviews are the first thing a buyer looks for on an unfamiliar brand.",
    evidence:
      "Every one of the eight competitor sites reviewed shows star ratings above the price. VIS MAJOR shows none anywhere.",
    effort: "L",
    risk: "low",
    route: "/v2/reviews",
  },
  {
    n: 12,
    title: "Replace the invented testimonials",
    surface: "Global",
    category: "Trust",
    what:
      "The three proof bands quote fabricated testers from London, Manchester and Leeds. Replace with real reviews, or state plainly that the product is pre-release and show nothing.",
    why:
      "Fabricated reviews are now illegal in the UK under the Digital Markets, Competition and Consumers Act 2024, and the repo's own DEPLOY.md admits these are placeholders.",
    evidence:
      "components/v2/ProofV2.tsx, SharpProof.tsx, ChiselProof.tsx all carry invented quotes with invented attributions.",
    effort: "S",
    risk: "low",
    route: "/v2/pectus",
    fixesBug: true,
  },
  {
    n: 13,
    title: "Show the rating beside the price, not further down",
    surface: "PECTUS",
    category: "Conversion",
    what: "Put the star rating and review count immediately next to the price.",
    why:
      "All eight competitors put rating above or beside price, and none puts price directly under the title alone. It is the most consistent pattern in the category.",
    effort: "S",
    risk: "low",
    route: "/v2/pectus",
  },

  // ───────────────────────── PDP structure ─────────────────────────
  {
    n: 14,
    title: "Let people buy without reading the whole essay",
    surface: "PECTUS",
    category: "Conversion",
    what:
      "Add a quiet buy band directly under the hero carrying name, price, rating and one button. The full editorial buy panel stays where it is.",
    why:
      "The buy panel currently sits nine sections deep behind a 320vh hero and two pinned scroll sequences. A buyer who already wants it has no short path.",
    evidence:
      "NN/g eyetracking: 74% of viewing time is spent in the first two screenfuls; 81% in the first three.",
    effort: "M",
    risk: "medium",
    route: "/v2/pectus",
  },
  {
    n: 15,
    title: "Unpin the scroll sequences on mobile",
    surface: "PECTUS",
    category: "Conversion",
    what:
      "Below 768px, render the 320vh hero and the 450vh Architecture rail as normal scrolling sections, and do not mount the scroll observers at all.",
    why:
      "NN/g's scrolljacking research found the majority of participants were disoriented, that long scrolljacks were read as bugs, and that smaller screens make it worse. Their guidance says mobile deployment should be reconsidered entirely.",
    evidence:
      "NN/g, Scrolljacking 101. Note: no controlled A/B data exists on the conversion delta, so this is worth testing rather than assuming.",
    effort: "M",
    risk: "high",
    route: "/v2/pectus",
  },
  {
    n: 16,
    title: "Put the price inside the add-to-basket button",
    surface: "PECTUS",
    category: "Conversion",
    what: "Label the button 'Add to basket · £18' rather than 'Add to basket'.",
    why:
      "Removes the scroll-back-to-check-the-price moment. Costs nothing, and both Lumin and Bulldog do it.",
    effort: "S",
    risk: "low",
    route: "/v2/pectus",
  },
  {
    n: 17,
    title: "Add an ingredient subtitle under every product name",
    surface: "Global",
    category: "Improvement",
    what:
      "Lock a short ingredient line to each product name sitewide, e.g. PECTUS · Coffee & Mint, the way Jack Black does across its whole range.",
    why:
      "Answers 'what is in it and why should I care' before the description loads, and reinforces the ingredient work already done.",
    effort: "S",
    risk: "low",
    route: "/v2/pectus",
  },
  {
    n: 18,
    title: "State who each product is for",
    surface: "PECTUS",
    category: "Improvement",
    what:
      "Add a short 'best for' line to each product, the way Cremo routes buyers with 'best for stubble, scruff and full beards'.",
    why:
      "With four products and no quiz, nothing currently helps a visitor work out which one they need.",
    effort: "S",
    risk: "low",
    route: "/v2/pectus",
  },
  {
    n: 19,
    title: "Show price per unit",
    surface: "PECTUS",
    category: "Improvement",
    what: "Add £/ml alongside the price on every size and multipack.",
    why:
      "81% of sites omit it, and it is the only way a buyer can judge whether the two-pack is actually better value.",
    evidence: "Baymard product page research.",
    effort: "S",
    risk: "low",
    route: "/v2/pectus",
  },
  {
    n: 20,
    title: "Put returns and delivery terms on the product page",
    surface: "PECTUS",
    category: "Trust",
    what:
      "Surface the returns window and delivery promise next to the buy button, not only in the footer.",
    why:
      "60% of users look for the returns policy on the product page, and an unsatisfactory returns policy causes 13% of abandonment.",
    evidence: "Baymard.",
    effort: "S",
    risk: "low",
    route: "/v2/pectus",
  },
  {
    n: 21,
    title: "Add a cross-product bundle",
    surface: "PECTUS",
    category: "Conversion",
    what:
      "Offer a house set across products, not just multipacks of the same item. The obvious pairs already exist: SCULPT with STEEL, and a full three-product ritual.",
    why:
      "Every competitor reviewed leads with sets. Bulldog puts 'Bundles & Gifting' first in its nav and frames it as decision relief rather than discount: 'Checkmate, your skincare is sorted.'",
    effort: "M",
    risk: "low",
    route: "/v2/pectus",
  },
  {
    n: 22,
    title: "Reconsider free delivery on everything",
    surface: "Cart & Checkout",
    category: "Conversion",
    what:
      "Introduce a free-delivery threshold slightly above current basket value, with a progress indicator in the cart.",
    why:
      "Free delivery on an £18 order leaves margin on the table and removes a lever that reliably lifts basket size. A threshold set 15-30% above average order value is the usual rule.",
    effort: "M",
    risk: "medium",
    route: "/v2/checkout",
  },

  // ───────────────────────── Home ─────────────────────────
  {
    n: 23,
    title: "Give the homepage a trust line",
    surface: "Home",
    category: "Trust",
    what:
      "The home landing has no delivery terms, no returns promise and no proof of any kind. Add the trust strip the product pages already use.",
    why:
      "The homepage is the most-visited page and currently says nothing about whether the brand can be trusted to deliver.",
    effort: "S",
    risk: "low",
    route: "/v2/home",
  },
  {
    n: 24,
    title: "Add proof to the homepage",
    surface: "Home",
    category: "Conversion",
    what: "Surface ratings, press or credentials on the landing page.",
    why:
      "Every competitor homepage carries either a rating figure, press logos or certification badges above the fold. This one carries none.",
    effort: "M",
    risk: "low",
    route: "/v2/home",
  },
  {
    n: 25,
    title: "Add email capture to the homepage",
    surface: "Home",
    category: "Missing",
    what:
      "The newsletter band exists on three product pages but not on the homepage or STEEL.",
    why:
      "Most first visits do not convert. With no capture on the busiest page, those visitors are simply lost.",
    effort: "S",
    risk: "low",
    route: "/v2/home",
  },
  {
    n: 26,
    title: "Add a shop page",
    surface: "Home",
    category: "Missing",
    what:
      "Products are reachable only from the homepage grid, the header and the footer. Add a /shop collection page.",
    why:
      "It ranks for category-level queries no single product page can, gives breadcrumbs somewhere to point, and stops the four products being orphans.",
    effort: "M",
    risk: "low",
    route: "/v2/home",
  },

  // ───────────────────────── New pages ─────────────────────────
  {
    n: 27,
    title: "Publish shipping and delivery terms",
    surface: "New pages",
    category: "Missing",
    what: "A real page behind the dead footer link.",
    why:
      "Legally expected for a UK distance seller, and the page a hesitant buyer opens before paying.",
    effort: "S",
    risk: "low",
    route: "/v2/shipping",
    fixesBug: true,
  },
  {
    n: 28,
    title: "Publish a returns and cancellation policy",
    surface: "New pages",
    category: "Missing",
    what:
      "State the 14-day statutory cancellation right, the 30-day returns promise, who pays return postage, and the refund window.",
    why:
      "The site asserts '30-day returns' more than fifteen times with no policy behind it. Under the Consumer Contracts Regulations, if you do not tell the customer they pay return postage, you pay it.",
    effort: "S",
    risk: "low",
    route: "/v2/returns",
    fixesBug: true,
  },
  {
    n: 29,
    title: "Publish a privacy policy",
    surface: "New pages",
    category: "Missing",
    what: "A real page behind the dead footer link.",
    why:
      "The site collects email addresses and will collect checkout details. A privacy policy is a UK GDPR requirement, not a nicety.",
    effort: "S",
    risk: "low",
    route: "/v2/privacy",
    fixesBug: true,
  },
  {
    n: 30,
    title: "Publish terms of sale",
    surface: "New pages",
    category: "Missing",
    what: "A real page behind the dead footer link.",
    why: "Required, and referenced at checkout consent.",
    effort: "S",
    risk: "low",
    route: "/v2/terms",
    fixesBug: true,
  },
  {
    n: 31,
    title: "Add an about page",
    surface: "New pages",
    category: "Missing",
    what:
      "A story page: who makes this, where, and why. The lore currently lives only as fragments on the home landing.",
    why:
      "For an unknown premium brand, the founder and provenance story is a primary trust asset, and 19% of abandonment is 'didn't trust the site'.",
    effort: "M",
    risk: "low",
    route: "/v2/about",
  },
  {
    n: 32,
    title: "Add a contact page",
    surface: "New pages",
    category: "Missing",
    what:
      "A real contact route with a response-time promise, not just a mailto in the footer.",
    why:
      "A UK company must display its identity and contact details, and reachability reduces purchase anxiety.",
    effort: "S",
    risk: "low",
    route: "/v2/contact",
  },
  {
    n: 33,
    title: "Display company registration details",
    surface: "Global",
    category: "Trust",
    what:
      "Add registered company number and registered office to the footer alongside 'VIS MAJOR LTD'.",
    why:
      "A UK limited company is required to display these on its website under the Companies Act and the E-Commerce Regulations.",
    effort: "S",
    risk: "low",
    route: "/v2/home",
    fixesBug: true,
  },

  // ───────────────────────── Technical / SEO ─────────────────────────
  {
    n: 34,
    title: "Give every page an h1",
    surface: "Global",
    category: "Technical",
    what:
      "The homepage and all four product pages have no h1 at all. Content starts at h2 or h3. Add one true h1 per page carrying the product name.",
    why:
      "It is the strongest on-page topical signal for search and the primary landmark for screen readers. The only three h1s on the whole site are on checkout, the confirmation page and a design lab.",
    evidence: "Site-wide count: 3 h1, 20 h2, 22 h3.",
    effort: "S",
    risk: "low",
    route: "/v2/pectus",
    fixesBug: true,
  },
  {
    n: 35,
    title: "Add Product and Offer structured data",
    surface: "Global",
    category: "Technical",
    what:
      "Emit Product + Offer JSON-LD on each product page, plus Organization on the homepage. No AggregateRating until real reviews exist.",
    why:
      "Makes price and availability eligible to appear directly in search results. The site currently emits no structured data of any kind.",
    evidence:
      "Google merchant listing requirements. Note AggregateRating must never go on Organization, and must not be emitted without visible real reviews.",
    effort: "M",
    risk: "low",
    route: "/v2/pectus",
  },
  {
    n: 36,
    title: "Add sitemap, robots and canonicals",
    surface: "Global",
    category: "Technical",
    what:
      "Add app/sitemap.ts, app/robots.ts, metadataBase and per-page canonical URLs.",
    why:
      "Without metadataBase, Next resolves URLs against the per-deployment Vercel hostname, so any OG image or canonical would silently point at a preview URL rather than the real domain.",
    effort: "S",
    risk: "low",
    route: "/v2/home",
  },
  {
    n: 37,
    title: "Stop the design labs being indexable",
    surface: "Global",
    category: "Technical",
    what:
      "/hero-lab, /nav-lab and /nav-hero are publicly crawlable prototype pages. Disallow and noindex them, or keep them out of the production build.",
    why:
      "They are near-duplicate content competing with real pages, and they show unfinished work to anyone who finds them.",
    effort: "S",
    risk: "low",
    route: "/v2/home",
    fixesBug: true,
  },
  {
    n: 38,
    title: "Add analytics and conversion events",
    surface: "Global",
    category: "Technical",
    what:
      "Instrument view_item, add_to_cart, begin_checkout and purchase, with a consent-appropriate analytics tool.",
    why:
      "There is currently no measurement of any kind, so no change on this list can be evaluated. Everything else here is a hypothesis until this exists.",
    effort: "M",
    risk: "low",
    route: "/v2/home",
  },
  {
    n: 39,
    title: "Add a favicon and share images",
    surface: "Global",
    category: "Technical",
    what:
      "No favicon, no manifest, no Open Graph image. Add the minimum modern set plus a 1200x630 share card.",
    why:
      "Every link shared to WhatsApp, Slack or social currently renders as a blank card, and the browser tab shows a default globe.",
    effort: "S",
    risk: "low",
    route: "/v2/home",
  },
  {
    n: 40,
    title: "Cut the image and font payload",
    surface: "Global",
    category: "Technical",
    what:
      "public/ is roughly 71MB across 46 files, with scene images averaging 2.5MB. Six font families across 26 weights are loaded.",
    why:
      "Load time is a direct conversion cost: a 0.1s mobile improvement lifted retail conversion 8.4% in Deloitte's study with Google. Most of those font weights are never rendered.",
    effort: "M",
    risk: "low",
    route: "/v2/home",
  },
  {
    n: 41,
    title: "Fix the duplicated main landmark",
    surface: "Global",
    category: "Technical",
    what:
      "There are 12 <main> elements across the codebase. There must be exactly one per rendered page.",
    why:
      "More than one main is a WCAG failure and breaks skip-to-content for screen reader users.",
    effort: "S",
    risk: "low",
    route: "/v2/pectus",
    fixesBug: true,
  },
  {
    n: 42,
    title: "Write real alt text for product photography",
    surface: "Global",
    category: "Technical",
    what:
      "Several product images carry empty alt attributes. Decorative art should stay empty; product photography needs descriptive alt.",
    why:
      "Product images are informative content, they are a genuine discovery channel through image search, and empty alt on them is a WCAG failure.",
    effort: "S",
    risk: "low",
    route: "/v2/pectus",
  },
];

// ---- lookups -------------------------------------------------------------

export const changeByNumber = (n: number): V2Change | undefined =>
  V2_CHANGES.find((c) => c.n === n);

export const changesForRoute = (route: string): V2Change[] =>
  V2_CHANGES.filter((c) => c.route === route).sort((a, b) => a.n - b.n);

export const SURFACES: V2Surface[] = [
  "Global",
  "Home",
  "PECTUS",
  "STONE",
  "Cart & Checkout",
  "New pages",
];

export const CATEGORIES: V2Category[] = [
  "Conversion",
  "Missing",
  "Change",
  "Improvement",
  "Trust",
  "Technical",
];
