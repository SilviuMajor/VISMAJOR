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
  /** Parked for later: correct, but not part of the design pass. */
  deferred?: boolean;
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

  // ───────────────── Visual & motion (the design pass) ─────────────────
  {
    n: 43,
    title: "Remove the colour that breaks the mono brand",
    surface: "PECTUS",
    category: "Change",
    what:
      "The Architecture section hardcodes strobing yellow lightning (#F59E0B, #FFC61A) with a full-panel flash at 95% opacity looping forever, plus blue snowflakes (#5FB0E0). Delete both. Keep the contracting grid, which is mono and actually means 'tightening'.",
    why:
      "globals.css states in writing: 'Strictly monochrome, NO brand accent colour. Restraint is the brand', and aliases the accent tokens to ink to enforce it. This section bypasses the token system entirely. It is the single most expensive-looking thing on the site to delete.",
    evidence:
      "components/enhanced/StickyArchitecture.tsx lines 38, 269-410. Hardcoded hexes, not tokens.",
    effort: "S",
    risk: "low",
    route: "/v2/pectus",
    fixesBug: true,
  },
  {
    n: 44,
    title: "Halve the hero's scroll cost",
    surface: "PECTUS",
    category: "Improvement",
    what:
      "The mask-reveal hero runs 320vh but finishes its work at 74% of that, leaving roughly 83vh of dead scroll where nothing changes, plus a 38vh window showing an empty veiled photograph. Cut to 160vh and overlap the phases.",
    why:
      "The idea is the best on the site and survives intact at half the length. The code comment claims 'no dead gap'; the gap was moved, not removed.",
    evidence: "components/herolab/HeroTypeWindow.tsx:225 and the transform ranges at :214-220.",
    effort: "M",
    risk: "medium",
    route: "/v2/pectus",
  },
  {
    n: 45,
    title: "Cut the pinned rails to a consistent length",
    surface: "PECTUS",
    category: "Improvement",
    what:
      "Three pages run the same three-phase rail at three different costs: 450vh, 320vh and 450vh. Standardise at 240vh with one shared spring.",
    why:
      "150vh of scroll per twelve-word line. And the same component costing different amounts on different pages is the clearest sign nobody chose the number.",
    evidence:
      "StickyArchitecture.tsx:90 (450vh), ChiselArchitecture.tsx:66 (320vh), SharpActives.tsx:72 (450vh, and it never springs its progress at all).",
    effort: "M",
    risk: "medium",
    route: "/v2/pectus",
  },
  {
    n: 46,
    title: "Drop the horizontal pan for the list that already works better",
    surface: "PECTUS",
    category: "Change",
    what:
      "Five Moments runs a 600vh horizontal pan on desktop. The mobile fallback, which builds the five moments into one pinned screen, is the better design. Ship it at every width.",
    why:
      "Six screen-heights to read five short phrases. Horizontal scroll-jacking also reads as agency showreel, which is the opposite of the register here. The mobile version ends with all five visible, which is the actual point.",
    evidence: "components/enhanced/HorizontalUseBefore.tsx:67, desktop branch at :127-195.",
    effort: "M",
    risk: "medium",
    route: "/v2/pectus",
  },
  {
    n: 47,
    title: "Give motion an actual scale",
    surface: "Global",
    category: "Improvement",
    what:
      "One gesture, a block fading up on scroll, currently runs at seven different durations (0.32 to 1.2) and eleven different distances (5px to 26px). Collapse to three durations and three distances.",
    why:
      "A 3.75x spread on a single gesture. Nobody can tell 5px from 6px, so those are three decisions where one was needed. The 1.2s fade on the VIS·MAJOR mark reads as lag, not luxury: slow is not the same as expensive.",
    evidence:
      "Reveal.tsx:23 is the 0.32 standard; HouseMeaning.tsx uses 0.7, 1.2, 0.9, 0.9 on four consecutive elements.",
    effort: "M",
    risk: "low",
    route: "/v2/pectus",
  },
  {
    n: 48,
    title: "Stop animating everything on scroll",
    surface: "Global",
    category: "Change",
    what:
      "SCULPT fires roughly 30 reveal animations on one page. Reserve the gesture for section openers only, target six or fewer per page, and let body copy, list items and spec tables simply be there.",
    why:
      "By the fifth identical fade-up the user stops seeing motion and starts seeing a template. This is the mechanism by which motion makes a site feel cheaper. Aesop's product pages have almost no scroll reveals; the content is just present, and that confidence is the luxury signal.",
    effort: "M",
    risk: "medium",
    route: "/v2/pectus",
  },
  {
    n: 49,
    title: "Stop things moving when the user isn't",
    surface: "Global",
    category: "Change",
    what:
      "Delete the infinite product float, the magnetic cursor-following buttons, the scroll-cue bob, the pulsing live-status dots and the odometer counters.",
    why:
      "Nothing should move when the user is still. A bobbing tube is a 2014 app-store screenshot; Le Labo's bottles sit still. A CTA that dodges the cursor is a novelty, not a courtesy. And a pulsing live dot signals nothing on a product that ships next year.",
    evidence:
      "HeroTypeWindow.tsx:280 (float), :93-126 (magnetic), ProofV2/ChiselProof/SharpProof :50 (ping), Counter.tsx.",
    effort: "S",
    risk: "low",
    route: "/v2/pectus",
  },
  {
    n: 50,
    title: "Make reduced motion actually reduce motion",
    surface: "Global",
    category: "Technical",
    what:
      "Under prefers-reduced-motion the tall sections still pin and still scroll-jack; only the transforms are neutralised. Collapse them to height auto with all phases visible, and add a global CSS kill-switch.",
    why:
      "Today reduced motion means 'the same scroll-jack, minus the transform'. A reduced-motion user still scrolls 320vh and still cannot see the hero until 54% of the way through. Seventeen animated files never check the preference at all.",
    evidence:
      "HeroTypeWindow.tsx:215-219 leave the opacity ramps unguarded. globals.css has only two reduced-motion blocks, one of which targets dead CSS.",
    effort: "M",
    risk: "low",
    route: "/v2/pectus",
    fixesBug: true,
  },
  {
    n: 51,
    title: "Fix the tickers running at three different speeds",
    surface: "Global",
    category: "Technical",
    what:
      "Three byte-identical ticker files share a fixed 42s marquee duration. Because the tracks have different content widths, they visibly move at different speeds. Collapse to one component and derive duration from width.",
    why:
      "Identical-looking components moving at different speeds is exactly the 'several hands built this' tell. It also fixes a real accessibility bug: Marquee marks both copies aria-hidden, so screen readers get nothing.",
    evidence:
      "Ticker/ChiselTicker/SharpTicker, globals.css:151, Marquee.tsx:15.",
    effort: "S",
    risk: "low",
    route: "/v2/pectus",
    fixesBug: true,
  },
  {
    n: 52,
    title: "Delete the dead animated components",
    surface: "Global",
    category: "Technical",
    what:
      "Roughly 2,971 lines across 17 unimported files, including two complete pinned set-pieces (ChiselRitual at 320vh, SharpDaily at 300vh) and four superseded heroes.",
    why:
      "Beyond tidiness: two abandoned pinned set-pieces are the strongest internal evidence that the pinned pattern was tried, rejected, and then shipped anyway elsewhere.",
    effort: "S",
    risk: "low",
    route: "/v2/pectus",
  },

  // ───────────────────────── Typography ─────────────────────────
  {
    n: 53,
    title: "Stop setting English sentences in Cinzel",
    surface: "Home",
    category: "Change",
    what:
      "The homepage meaning line is set in Cinzel, which has no lowercase: every glyph renders as a capital. Move it to the body face at 19-21px, and keep the quoted phrase in real caps.",
    why:
      "The copy sets 'AN UNSTOPPABLE FORCE' in caps for emphasis, but because Cinzel renders everything as caps, the emphasis is invisible. It also reads as small-caps at body size with zero tracking, which is the one thing tracked caps must never be. Cinzel is an inscriptional face: three to five words, carved, not a sentence.",
    evidence:
      "HouseHero.tsx:136-146 and HouseMeaning.tsx:56-61 set the identical sentence at two different sizes, leadings and trackings on the same page.",
    effort: "S",
    risk: "medium",
    route: "/v2/home",
    fixesBug: true,
  },
  {
    n: 54,
    title: "Delete the duplicated meaning line",
    surface: "Home",
    category: "Change",
    what:
      "The same sentence about the Roman name appears twice on the home page, in the hero and again in the meaning band. Keep one.",
    why:
      "Repeating a line verbatim within one scroll reads as an oversight rather than a refrain, especially when the two copies are set differently.",
    effort: "S",
    risk: "low",
    route: "/v2/home",
  },
  {
    n: 55,
    title: "Replace 66 ad-hoc font sizes with a real scale",
    surface: "Global",
    category: "Improvement",
    what:
      "There are 66 distinct font sizes in the live tree, including 22 fixed values covering nearly every half-pixel from 8 to 17, and 44 clamps of which 32 are used exactly once. Collapse to about eight steps and wire them to the config.",
    why:
      "A type scale already exists in tailwind.config.ts and is completely unused: zero of its eight keys appear anywhere. Everything is authored by hand, so 14.5px and 15px are used for the same product blurb in two different components.",
    evidence:
      "HouseProducts.tsx:123 sets p.short at 14.5px; OtherProducts.tsx:91 sets the same field at 15px. Four different clamps land on a 56px ceiling.",
    effort: "L",
    risk: "medium",
    route: "/v2/pectus",
  },
  {
    n: 56,
    title: "Stop negative-tracking the Cinzel wordmarks",
    surface: "Global",
    category: "Change",
    what:
      "Two of the four buy panels set the product wordmark in Cinzel with negative letter-spacing. Give all four the same positive tracking.",
    why:
      "Negative tracking on an inscriptional Roman capital collapses the serifs into each other. Positive tracking is what makes Cinzel look carved rather than squeezed. Right now the same wordmark is tracked five different ways across the site.",
    evidence:
      "SharpBuy.tsx:186 is -0.02em, SteelBuy.tsx:66 is -0.01em, StickyBuy.tsx:183 and ChiselBuy.tsx:174 are +0.01em.",
    effort: "S",
    risk: "low",
    route: "/v2/pectus",
  },
  {
    n: 57,
    title: "Make the eyebrow one component again",
    surface: "Global",
    category: "Improvement",
    what:
      "The section eyebrow is hand-rolled in about 20 places instead of using the Eyebrow component, and splits 16 medium against 11 semibold.",
    why:
      "One component has the same eyebrow at two different weights depending on viewport: the mobile branch is medium and the desktop branch is semibold, same string, same component.",
    evidence: "HorizontalUseBefore.tsx:72 vs :137.",
    effort: "M",
    risk: "low",
    route: "/v2/pectus",
  },
  {
    n: 58,
    title: "Take the FAQ questions out of uppercase",
    surface: "PECTUS",
    category: "Improvement",
    what:
      "Every FAQ question is set in tracked uppercase at 17px. Set them in sentence case at a slightly larger size.",
    why:
      "A question mark after tracked caps reads as a sign, not a question. These are the longest uppercase strings on the site, and sentence case would also give the accordion a real second level below the section head.",
    evidence: "FaqV2.tsx:70, ChiselFaq.tsx:79, SharpFaq.tsx:75.",
    effort: "S",
    risk: "low",
    route: "/v2/pectus",
  },
  {
    n: 59,
    title: "Bring every line of running text under 70 characters",
    surface: "Global",
    category: "Improvement",
    what:
      "Several paragraphs run far past a comfortable measure, the worst at roughly 118 characters. Constrain them, and collapse the seven body line-heights to two.",
    why:
      "Long measures are the most reliable way to make careful typography feel careless. The FAQ answers compensate with 1.7 leading, which treats the symptom.",
    evidence:
      "ChiselIsIsnt.tsx:46 is max-w-3xl at 13px, about 118 characters. The PECTUS INCI at StickyBuy.tsx:372 has no max-width at all.",
    effort: "M",
    risk: "low",
    route: "/v2/pectus",
  },
  {
    n: 60,
    title: "Drop the two font families that never render",
    surface: "Global",
    category: "Technical",
    what:
      "Remove Cormorant Garamond entirely, and either move EB Garamond to the one page that uses it or replace it. Note: trimming unused WEIGHTS saves nothing, because all six families are variable fonts and every declared weight resolves to the same file.",
    why:
      "209KB of fonts are preloaded in the head of every route, competing with the hero image for bandwidth, and 82KB of that is dead. Cormorant renders zero glyphs anywhere on the site. EB Garamond is preloaded on all 28 routes to set a single number on STONE.",
    evidence:
      "layout.tsx:41 loads Cormorant, wired to --font-numeral, which is referenced by nothing. EB Garamond reaches the page only through .stat, used once at SharpProof.tsx:71.",
    effort: "S",
    risk: "low",
    route: "/v2/home",
  },
  {
    n: 61,
    title: "Fix the synthetic italics",
    surface: "Global",
    category: "Technical",
    what:
      "Two places request italic from a font loaded without an italic style, so the browser shears the roman into a fake oblique. Load the real italic or set those lines upright.",
    why:
      "A synthesised slant on a grotesque is one of the most visible cheap tells in web typography, and one of the two instances is the closing line of the home page.",
    evidence: "Footer.tsx:104 and HouseStandard.tsx:96; layout.tsx:7-12 loads Hanken with no style array.",
    effort: "S",
    risk: "low",
    route: "/v2/home",
    fixesBug: true,
  },
  {
    n: 62,
    title: "Give the mirrored proof stats one typeface",
    surface: "STONE",
    category: "Change",
    what:
      "The same stat block renders in EB Garamond at 128px on STONE and Courier Prime at 142px on SCULPT. Pick one.",
    why:
      "Mirrored components in two different faces at two different sizes is the clearest sign that several hands built this. Courier at 142px also magnifies every flaw of a typewriter face.",
    evidence: "SharpProof.tsx:71 uses stat-tab; ChiselProof.tsx:70 uses font-mono.",
    effort: "S",
    risk: "low",
    route: "/v2/stone",
  },

  // ─────────────────── Craft (measured against references) ───────────────────
  {
    n: 63,
    title: "Halve the letter-spacing on caps",
    surface: "Global",
    category: "Change",
    what:
      "The tracking tokens are 0.22em, 0.28em and 0.34em. Move to roughly 0.01em for display, 0.10em for section caps, 0.12em for small labels. Keep one wide value for the VIS·MAJOR mark alone, where it is a logotype decision.",
    why:
      "Every value is two to three and a half times wider than any reference site measured. Buly, which runs a near-identical classical-caps setup, tracks its 60px hero at 0.01em and its 9px buttons at 0.11em: tracking is inversely proportional to size. Very wide tracking on large caps is one of the most reliable template-luxury tells, because it is what stock themes do to make a serif look expensive.",
    evidence:
      "Measured: Buly hero 60px/0.01em, nav 14px/0.10em, button 9px/0.11em. Cire Trudon uses a flat 0.05em sitewide. Aesop uses none at all.",
    effort: "S",
    risk: "medium",
    route: "/v2/home",
  },
  {
    n: 64,
    title: "Use Cinzel's real small capitals",
    surface: "Global",
    category: "Improvement",
    what:
      "Stop applying text-transform uppercase to Cinzel. Setting 'Vis Major' rather than 'VIS MAJOR' gives Capital plus Small Cap, the classical inscriptional setting.",
    why:
      "Cinzel's lowercase slots are true small capitals, drawn separately at 0.857 to 0.86 of cap height with their own advance widths. Uppercasing throws that away and flattens the only serif hierarchy available. It is a second register hiding in a font already loaded.",
    evidence:
      "Measured from the Cinzel binary at 200px: lowercase ink heights 120 to 123.2 against uppercase 140 to 143.2, with advance ratios varying independently, which proves they are drawn rather than scaled.",
    effort: "M",
    risk: "medium",
    route: "/v2/home",
  },
  {
    n: 65,
    title: "Nudge Cinzel down in every centred box",
    surface: "Global",
    category: "Improvement",
    what:
      "Add a small vertical correction, roughly 0.08 to 0.15em, wherever Cinzel is vertically centred: buttons, nav, badges, the sticky bar.",
    why:
      "Cinzel's em box is lopsided, so flex and grid centring floats it visibly high: 0.15em against a grotesque's 0.034em, four to seven times worse. Nobody will be able to name what changed, but everything will stop looking slightly off.",
    evidence:
      "Measured at 100px: Cinzel leaves 26.6 above the caps and 57.0 below. Helvetica leaves 18.3 and 25.1.",
    effort: "S",
    risk: "low",
    route: "/v2/home",
  },
  {
    n: 66,
    title: "Bring the running type scale down",
    surface: "Global",
    category: "Change",
    what:
      "Section headings currently reach 132px in the config and 104px in use. Reserve anything above about 40px for the house mark and product wordmarks, and set section headings around 24 to 34px.",
    why:
      "Aesop's entire site spans 12px to 25px, with an h1 of 24px. Le Labo's h1 is 30px. Premium sites do not build hierarchy with size: they build it with case, tracking, position and the amount of air around a thing. A 13px label alone above a large void reads as more important than a 64px headline crammed against its neighbour.",
    evidence:
      "Measured: Aesop h1 24px, Le Labo h1 30px, Trudon h1 40px, Buly section headings 24px. tailwind.config.ts declares display at clamp(56px, 9vw, 132px).",
    effort: "L",
    risk: "high",
    route: "/v2/home",
  },
  {
    n: 67,
    title: "Invert the whitespace budget",
    surface: "Global",
    category: "Change",
    what:
      "Tighten component gaps and widen section intervals: grid gaps around 8 to 10px, section rhythm around 100px, with asymmetric padding so content sits toward the top of its band.",
    why:
      "Aesop's grid gutters are 10px while its section rhythm is 100px. The whitespace is banked at the section level and spent almost nowhere at the component level. Most sites do the reverse, with 24px gaps everywhere and 64px between sections, and that inversion is most of why they read as loose.",
    evidence:
      "Measured: Aesop product tiles 376px wide with a 10px gutter; section margin-top 100px with 40px top and 60px bottom padding.",
    effort: "M",
    risk: "medium",
    route: "/v2/home",
  },
  {
    n: 68,
    title: "Give the buttons an engraved keyline",
    surface: "Global",
    category: "Improvement",
    what:
      "Replace the 5px-radius button with a square double-keyline: a ring of page colour inside a hairline of ink, label at 9 to 11px.",
    why:
      "Every reference site zeroes its corners deliberately, and 4 to 8px radius is the tell-tale range for a templated build. The double keyline reads as engraved apothecary labelling, works in pure monochrome, and needs no colour, gradient or shadow.",
    evidence:
      "Measured from Buly. Trudon sets border-radius 0 eighty-six times; Byredo forces it with !important. Le Labo is the only reference using any radius, at 1 to 2px.",
    effort: "M",
    risk: "medium",
    route: "/v2/home",
  },
  {
    n: 69,
    title: "Take the glare off the paper",
    surface: "Global",
    category: "Improvement",
    what:
      "Warm the page white by a hair, to something like #FFFEFB. Distinct from the cream bands that were rejected earlier: this is a change too small to read as cream.",
    why:
      "Three of the four measured references avoid pure black on pure white. Aesop sets #333333 on #FFFEF2. Pure ink on pure white in a high-contrast serif reads harsh and thin, and the warm paper is doing quiet work.",
    effort: "S",
    risk: "medium",
    route: "/v2/home",
  },
  {
    n: 70,
    title: "Kill the fitting loop on the hero line",
    surface: "Home",
    category: "Technical",
    what:
      "The homepage meaning line is sized by a self-rescheduling animation loop running up to 60 frames, re-armed on resize and on font load. Replace with a single pass, or a plain clamp.",
    why:
      "It reads computed styles and measures twice per frame, then writes styles, which is textbook layout thrash, on the homepage, during load, and it risks visible layout shift. This is my own code from earlier and it should not have shipped.",
    evidence: "HouseHero.tsx:54-62.",
    effort: "S",
    risk: "low",
    route: "/v2/home",
    fixesBug: true,
  },
  {
    n: 71,
    title: "Stop re-rendering whole pinned sections on every scroll frame",
    surface: "STONE",
    category: "Technical",
    what:
      "STONE's Formula rail writes a continuously-changing float into React state on every scroll frame, re-rendering a 450vh subtree at 60fps. Bind it to a motion value instead and keep state only for the discrete phase.",
    why:
      "This is the single worst performance offender on the site, and it bypasses framer's fast path entirely. The same pattern appears in three other sections.",
    evidence: "SharpActives.tsx:56-68, then consumed as a plain number at :179.",
    effort: "M",
    risk: "low",
    route: "/v2/stone",
    fixesBug: true,
  },
  {
    n: 72,
    title: "Stop animating layout properties",
    surface: "PECTUS",
    category: "Technical",
    what:
      "The Architecture scan tick animates a percentage top value on every frame, forcing a full layout recalculation. Use a transform instead.",
    why:
      "Transforms are free on the compositor; animating top is not. It is a one-line change, and the spring keeps ticking after the scroll stops.",
    evidence: "StickyArchitecture.tsx:69 driving :258.",
    effort: "S",
    risk: "low",
    route: "/v2/pectus",
    fixesBug: true,
  },
  {
    n: 73,
    title: "Turn on AVIF",
    surface: "Global",
    category: "Technical",
    what:
      "next.config.mjs has no images block, so Next serves WebP only. Add AVIF and trim the largest device size.",
    why:
      "Measured 24% saving across a sample, about 250KB per page load on PECTUS, for a three-line config change with no visual difference.",
    effort: "S",
    risk: "low",
    route: "/v2/home",
  },
  {
    n: 74,
    title: "Shrink the decorative texture",
    surface: "PECTUS",
    category: "Technical",
    what:
      "Replace the low-opacity background scenes and figures with much smaller assets. At those opacities a heavily compressed image is visually identical.",
    why:
      "806KB of PECTUS's 1.03MB image payload, 77%, is decorative texture rendered at low opacity. One figure costs 101KB to appear at 13% opacity; two scene backdrops cost 292KB combined to appear at 16%.",
    effort: "M",
    risk: "low",
    route: "/v2/pectus",
  },
  {
    n: 75,
    title: "Take priority off the below-fold images",
    surface: "Global",
    category: "Technical",
    what:
      "Several images far below the fold are marked priority, which emits a preload that competes with the real hero image. STEEL preloads four, three of them the same sword file at different sizes.",
    why:
      "Every stolen preload slot directly delays the largest contentful paint, and on PECTUS the hero is already racing 209KB of font preloads.",
    evidence:
      "StickyBuy.tsx:140, SharpActives.tsx:181, SteelComposition.tsx:88, SteelBuy.tsx:56.",
    effort: "S",
    risk: "low",
    route: "/v2/pectus",
    fixesBug: true,
  },

  // ───────────────────── Layout & composition ─────────────────────
  {
    n: 76,
    title: "Restore the tonal band, or stop pretending it exists",
    surface: "Global",
    category: "Change",
    what:
      "--paper-1 is #FFFFFF, identical to --paper-0. Ten live sections set bg-paper-1 believing they are a raised tonal band, and all render plain white. Either give it a real value or strip it from all ten.",
    why:
      "The design system thinks it has three ways to separate sections: hairline, tonal band, dark band. It actually has two. That is why long stretches of these pages read as undifferentiated, and it is the root cause of several problems below.",
    evidence:
      "globals.css:9-11, with the comment '(was cream) raised bands now read white'. Ten consumers including StickyArchitecture.tsx:90 and SharpActives.tsx:72.",
    effort: "S",
    risk: "medium",
    route: "/v2/pectus",
    fixesBug: true,
  },
  {
    n: 77,
    title: "PECTUS is 22 screens long and 62% of it is pinned",
    surface: "PECTUS",
    category: "Change",
    what:
      "Measured at 19,995px, of which 12,330px is three pinned sections. Cutting the hero, the Architecture and Five Moments saves roughly six screens with no content lost.",
    why:
      "Each pin spends between 1.35 and 2 screens of scroll per state change. This is the heaviness you have been feeling, and it is arithmetic rather than opinion.",
    evidence:
      "Measured in-browser at 1440x900. #science holds three states across 4.5 screens; #moments holds five across 6.",
    effort: "M",
    risk: "medium",
    route: "/v2/pectus",
  },
  {
    n: 78,
    title: "Stop two dark strips merging into one slab",
    surface: "STONE",
    category: "Change",
    what:
      "On STONE and SCULPT the TrustStrip sits directly above the Ticker, both dark, producing one undivided 85px black band with two rows of caps. Move the Ticker below the pinned section, as PECTUS already does.",
    why: "Two separate devices reading as one is a straightforward composition error.",
    evidence: "SharpComposition.tsx:45-46 and ChiselComposition.tsx:43-44.",
    effort: "S",
    risk: "low",
    route: "/v2/stone",
    fixesBug: true,
  },
  {
    n: 79,
    title: "The PECTUS ticker is invisible",
    surface: "PECTUS",
    category: "Change",
    what:
      "The Ticker is a 46px dark strip sitting immediately above Five Moments, which is a 5,400px dark section. It is swallowed whole.",
    why: "A section nobody can see is either misplaced or unnecessary.",
    evidence: "EnhancedComposition.tsx:43-44.",
    effort: "S",
    risk: "low",
    route: "/v2/pectus",
    fixesBug: true,
  },
  {
    n: 80,
    title: "Fix the section numbering",
    surface: "PECTUS",
    category: "Technical",
    what:
      "PECTUS numbers its sections 01, 04, 04, 06: a duplicate and three gaps. STONE runs 02, 03, 05. SCULPT starts at 04. Either renumber per page or drop the numerals.",
    why:
      "A visible counting error reads as carelessness on a page selling precision. STEEL is the only page that numbers correctly.",
    evidence: "OneJob.tsx:69 is 01, StickyBuy.tsx:118 is 04, IsIsnt.tsx:18 is also 04.",
    effort: "S",
    risk: "low",
    route: "/v2/pectus",
    fixesBug: true,
  },
  {
    n: 81,
    title: "STONE's final CTA has an invisible rule and a broken layout",
    surface: "STONE",
    category: "Change",
    what:
      "Its eyebrow rule is set to ink on an ink background, so it cannot be seen, and it omits the delivery block its two siblings carry, leaving a justify-between row with one child so the CTA sits on the wrong side.",
    why: "Three versions of one component, and this one is visibly wrong against the other two.",
    evidence: "SharpFinalCta.tsx:12 against FinalCta.tsx:12 and ChiselFinalCta.tsx:12.",
    effort: "S",
    risk: "low",
    route: "/v2/stone",
    fixesBug: true,
  },
  {
    n: 82,
    title: "Anchors land 75px under the header",
    surface: "Global",
    category: "Technical",
    what:
      "The header is 75px tall. The FAQ rails stick at 64px, so they sit under it, and nine anchor targets have no scroll margin at all.",
    why:
      "Every hero Buy button and the sticky bar currently scroll the reader to a position where the heading is hidden behind the header.",
    evidence: "FaqV2.tsx:132 uses lg:top-16; #buy, #honesty, #faq, #proof and five others have no scroll-mt.",
    effort: "S",
    risk: "low",
    route: "/v2/pectus",
    fixesBug: true,
  },
  {
    n: 83,
    title: "Two hero buttons lead nowhere",
    surface: "STONE",
    category: "Technical",
    what:
      "The SCULPT and STONE heroes both link their secondary CTA to #how, and neither page has an element with that id.",
    why:
      "The components that carried the anchor were dropped from the compositions and the links were left behind. Clicking does nothing.",
    evidence: "HeroTypeWindow.tsx:62 and :74; ChiselRitual and SharpDaily are not imported anywhere.",
    effort: "S",
    risk: "low",
    route: "/v2/stone",
    fixesBug: true,
  },
  {
    n: 84,
    title: "Give STEEL some rhythm",
    surface: "Global",
    category: "Change",
    what:
      "STEEL runs four consecutive identical white sections separated only by hairlines, and its only dark band is a 39px strip. Invert one section and give the page a real beat.",
    why:
      "7% dark coverage across 8.5 screens makes it read as a white document with a black footer, noticeably quieter than its siblings. It also uses the small section head where the other pages use the large one, so it reads two typographic levels down.",
    effort: "M",
    risk: "low",
    route: "/v2/home",
  },
  {
    n: 85,
    title: "Put the proof before the ask",
    surface: "STONE",
    category: "Change",
    what:
      "STONE renders its proof section after the final call to action, and both are dark, producing 1,273px of unbroken black.",
    why: "Social proof arriving after the ask is backwards, and it creates the worst dark run on the site.",
    evidence: "SharpComposition.tsx:52-53.",
    effort: "S",
    risk: "low",
    route: "/v2/stone",
  },

  // ───────────────────── Detail & hierarchy ─────────────────────
  {
    n: 86,
    title: "The lightest ink fails every contrast threshold",
    surface: "Global",
    category: "Technical",
    what:
      "ink-3 measures 2.83:1 on white, below the 4.5:1 body minimum, the 3:1 large-text minimum and the 3:1 interface minimum. It is used for text 96 times. Darken it to about 4.6:1 and keep the current value for decoration only.",
    why:
      "It carries every checkout field label, every input placeholder, the inactive nav links, the Remove button in the basket, and the full ingredient list. These are the places a customer most needs to read.",
    evidence:
      "#9C9A8F on #FFFFFF = 2.83:1. #797770 would give 4.62:1. Also note ink-3/70 in chisel/Specimen.tsx:65 measures 1.98:1.",
    effort: "M",
    risk: "low",
    route: "/v2/pectus",
    fixesBug: true,
  },
  {
    n: 87,
    title: "The focus ring is invisible on every dark surface",
    surface: "Global",
    category: "Technical",
    what:
      "The global focus outline is ink on ink, so it disappears against the nav in its dark state, the footer and all three final CTAs. Five form fields remove it entirely with outline-none.",
    why:
      "Keyboard users cannot see where they are. Removing it from the checkout fields specifically means the payment form cannot be navigated without a mouse.",
    evidence: "globals.css:77-81; checkout/page.tsx:192 uses a bare outline-none on all five fields.",
    effort: "S",
    risk: "low",
    route: "/v2/pectus",
    fixesBug: true,
  },
  {
    n: 88,
    title: "The footer uses the wrong colour scale on itself",
    surface: "Global",
    category: "Change",
    what:
      "The footer sits on ink and uses both the light-on-dark scale and the dark-on-light scale in the same file. Seven elements use a dark-scale token on a dark ground.",
    why:
      "The tagline, the legal disclaimer, both column headings, the copyright and the motto are all drawn with the wrong token, and one of them fails contrast outright.",
    evidence: "Footer.tsx lines 28, 31, 39, 73, 95, 98, 103; line 105 measures 3.82:1.",
    effort: "S",
    risk: "low",
    route: "/v2/home",
    fixesBug: true,
  },
  {
    n: 89,
    title: "Nineteen button styles for three roles",
    surface: "Global",
    category: "Improvement",
    what:
      "The solid primary button alone uses ten different vertical paddings and four font sizes. Collapse to one Button component with three variants.",
    why:
      "Ten paddings for one role is the clearest possible sign of accumulation rather than design. Some CTAs also carry a border and some do not, so the checkout button is geometrically 1px different from every other.",
    effort: "M",
    risk: "medium",
    route: "/v2/pectus",
  },
  {
    n: 90,
    title: "Five corner radii inside a three-pixel range",
    surface: "Global",
    category: "Improvement",
    what:
      "Radii of 2, 3, 4, 4 and 5px are in use, two of them written two different ways, and the de-facto button radius of 5px is not a token at all. Meanwhile three declared radius tokens are never used.",
    why:
      "Indistinguishable values that are structurally different is exactly the drift that makes a system stop being a system. Reference sites use zero or one.",
    effort: "S",
    risk: "low",
    route: "/v2/pectus",
  },
  {
    n: 91,
    title: "The cream theme is still in the code",
    surface: "Global",
    category: "Technical",
    what:
      "The inverse hairline on dark sections is a hardcoded rgba of #F4F2EC, which is the old cream theme's paper colour, repeated 17 times at five different alphas with no token.",
    why:
      "It is a leftover from the move to white. It also means eight distinct inverse line weights exist where two would do.",
    effort: "S",
    risk: "low",
    route: "/v2/pectus",
  },
  {
    n: 92,
    title: "A full-screen image is downloaded and never seen",
    surface: "PECTUS",
    category: "Technical",
    what:
      "The Honesty section is wrapped in a scene backdrop, but its own root is opaque ink, so the scene is completely covered. The image is fetched and composited on every visit and renders nothing.",
    why:
      "Pure waste, and the wrapper component documents the precondition that the call site breaks.",
    evidence: "EnhancedComposition.tsx:55-57 wrapping IsIsnt.tsx:14.",
    effort: "S",
    risk: "low",
    route: "/v2/pectus",
    fixesBug: true,
  },
  {
    n: 93,
    title: "A hover effect that only works if you hover the arrow itself",
    surface: "PECTUS",
    category: "Technical",
    what:
      "The Formula link's arrow uses a plain hover rather than a group hover, and its parent has no group class, so the animation only fires when the cursor is over the 8px glyph.",
    why:
      "Two sibling components do this correctly, so it reads as a slip rather than a decision.",
    evidence: "ProductFormula.tsx:89-94, against SculptTools.tsx:51 and OtherProducts.tsx:98.",
    effort: "S",
    risk: "low",
    route: "/v2/pectus",
    fixesBug: true,
  },
  {
    n: 94,
    title: "Add-to-basket can be double-submitted",
    surface: "Global",
    category: "Technical",
    what:
      "None of the four add-to-basket buttons, the drawer checkout button, or the place-order button has a disabled or pending state. There is no active press state anywhere on the site.",
    why:
      "A button that gives no feedback on press invites a second click, and on the order button that is a real problem once payment is wired up.",
    effort: "S",
    risk: "low",
    route: "/v2/pectus",
  },
];

// ---- lookups -------------------------------------------------------------

/** Checkout work is real but parked: it is plumbing, not part of the design pass. */
export const isDeferred = (c: V2Change): boolean =>
  c.deferred === true || c.surface === "Cart & Checkout";

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
