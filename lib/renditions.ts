/**
 * The rendition catalogue.
 *
 * One rendition now: THE HOUSE (v4), the candidate to go live. It is the
 * current site kept intact, with the parts of the two exploratory directions
 * that were picked out and kept. Those two, Atelier and Colosseum, have served
 * their purpose and are deleted.
 *
 * Every numbered entry here corresponds to a `data-mark="N"` attribute on the
 * page, which the review layer turns into a badge you can click.
 */

export type Rendition = "synthesis";
export type Surface = "home" | "pectus" | "stone";

/** Display order, and the order the panel's rendition switcher cycles through. */
export const RENDITION_ORDER: Rendition[] = ["synthesis"];

export type Category =
  | "Structure" //  a section added, removed, split or reordered
  | "Imagery" //    a different image, a different crop, a different size
  | "Type" //       scale, tracking, weight, setting
  | "Layout" //     grid, alignment, whitespace
  | "Conversion" // something that exists to sell
  | "Motion"; //    what moves, and how much

export type Change = {
  /** Unique across the whole catalogue, so "push 12, 19, 33" is unambiguous. */
  n: number;
  rendition: Rendition;
  surface: Surface;
  category: Category;
  /** Imperative and short: what was done. */
  title: string;
  /** What it replaces on the live site. */
  from: string;
  /** Why it is better. The argument, not a restatement. */
  why: string;
};

export const RENDITIONS: Record<
  Rendition,
  { name: string; tagline: string; note: string; slug: string }
> = {
  synthesis: {
    name: "The House",
    slug: "v4",
    tagline:
      "The current site, with the parts of the two explorations that earned their place.",
    note: "The live site kept intact, with the imports that were picked out of the two exploratory directions, which are now deleted. On the product pages the mask reveal opens straight onto the offer instead of a lockup. The Architecture with its lightning and snow, Five moments, the pinned actives on STONE and all the product copy stay exactly as they are. This is the candidate to go live.",
  },
};

export const CHANGES: Change[] = [
  {
    n: 101,
    rendition: "synthesis",
    surface: "home",
    category: "Structure",
    title: "Atelier's hero, imported whole",
    from: "A mouse-tracking wordmark over a scroll-driven scene.",
    why: "The piece of Atelier you wanted kept. Still on arrival, wordmark restrained, one line under it.",
  },
  {
    n: 102,
    rendition: "synthesis",
    surface: "home",
    category: "Type",
    title: "Wordmark up to 112px, tracking at 0.01em",
    from: "Smaller, at 0.28em tracking.",
    why: "Taken up in scale on request. The tracking stays near zero, which is the finding with the most evidence behind it: none of the eight reference brands measured tracks out its capitals, and several set them negative.",
  },
  {
    n: 103,
    rendition: "synthesis",
    surface: "home",
    category: "Imagery",
    title: "The villa on its own plate, padded not cropped",
    from: "A background wash behind other content.",
    why: "The image treatment you singled out. The whole drawing survives, with a Courier plate line under it.",
  },
  {
    n: 104,
    rendition: "synthesis",
    surface: "home",
    category: "Layout",
    title: "Strips carry the tube, on the inner edge",
    from: "Product cards in a grid, drawing and product never seen together.",
    why: "The product sits over the drawing on the edge nearest the text and vertically centred, so it always lands directly beside the name and explainer whichever way the strip is turned. The strips keep alternating.",
  },
  {
    n: 105,
    rendition: "synthesis",
    surface: "home",
    category: "Structure",
    title: "STEEL joins the run",
    from: "Absent from the home page entirely.",
    why: "It is a product with a price and a page, and the home page did not mention it.",
  },
  {
    n: 106,
    rendition: "synthesis",
    surface: "home",
    category: "Layout",
    title: "Colosseum's material strip, kept dense",
    from: "A comfortable three-across band with heading and caption labels.",
    why: "Six across, hairline under each, products in Courier. Kept at six on wide screens rather than relaxing to three, because the density is what makes it read as a specimen drawer.",
  },
  {
    n: 107,
    rendition: "synthesis",
    surface: "pectus",
    category: "Conversion",
    title: "The mask opens onto the offer",
    from: "The reveal resolved into a centred lockup: floating tube, wordmark, tagline, two buttons. A price appeared roughly three screens later.",
    why: "What sits behind the mask is now the offer itself: buy module on the left, the chest figure on the right, the scene still faint behind both. Two sections collapse into one, and the first price arrives the moment the reveal completes rather than three screens down. The tube is larger, and it sits in the same block as the price.",
  },
  {
    n: 108,
    rendition: "synthesis",
    surface: "pectus",
    category: "Motion",
    title: "Kept: the Architecture, lightning and snow intact",
    from: "Unchanged.",
    why: "Marked so you can confirm it survived. The 450vh pin, the three stages and both weather effects are exactly as they are on the live site.",
  },
  {
    n: 109,
    rendition: "synthesis",
    surface: "pectus",
    category: "Motion",
    title: "Kept: Five moments, unchanged",
    from: "Unchanged.",
    why: "Same as above. Horizontal pan on desktop, the building list on mobile.",
  },
  {
    n: 110,
    rendition: "synthesis",
    surface: "pectus",
    category: "Imagery",
    title: "Colosseum's formula treatment",
    from: "Small plates in a three-column band.",
    why: "Two actives, half a page each, name set large, INCI in Courier underneath. The pencil work only reads as pencil work above a certain size.",
  },
  {
    n: 111,
    rendition: "synthesis",
    surface: "pectus",
    category: "Conversion",
    title: "The buy section, stripped back",
    from: "A gallery with spec tabs that switched photo and copy together, a tier selector and a quantity stepper.",
    why: "The quantity stepper and the tab strip are gone, the size selector stays in full so this second buy point can still complete a purchase, and the gallery gets most of the width. This is the one place on the page where the product itself is the subject.",
  },
  {
    n: 114,
    rendition: "synthesis",
    surface: "stone",
    category: "Conversion",
    title: "The mask opens onto the offer",
    from: "The same reveal-then-lockup opening as PECTUS.",
    why: "Same treatment as PECTUS, with STONE's own scene behind it and the washing figure padded rather than cropped, because unlike a torso it is a whole figure and cropping loses the basin.",
  },
  {
    n: 115,
    rendition: "synthesis",
    surface: "stone",
    category: "Motion",
    title: "Kept: the pinned actives, unchanged",
    from: "Unchanged.",
    why: "STONE's equivalent of the Architecture, left alone. It now reads as the narrative pass: the draw, the lift, the finish.",
  },
  {
    n: 116,
    rendition: "synthesis",
    surface: "stone",
    category: "Imagery",
    title: "Colosseum's formula, as specification",
    from: "Nothing. The ingredients existed only inside the pinned section, one at a time.",
    why: "The same three actives, but stated rather than narrated: name, role, INCI, all three visible at once so they can be compared. Prose above and an ingredients panel below is how Buly and Diptyque both arrange this material.",
  },
  {
    n: 117,
    rendition: "synthesis",
    surface: "stone",
    category: "Conversion",
    title: "The buy section, stripped back, with the photography marked missing",
    from: "SVG outlines captioned \"photography to follow\".",
    why: "Same simplified panel as PECTUS. Every render in the library is the PECTUS tube, so rather than put the wrong product in front of a buyer, each slot holds its space and states the shot that needs taking.",
  },
];

export const changesFor = (rendition: Rendition, surface: Surface) =>
  CHANGES.filter((c) => c.rendition === rendition && c.surface === surface).sort(
    (a, b) => a.n - b.n
  );

export const SURFACE_LABEL: Record<Surface, string> = {
  home: "Home",
  pectus: "PECTUS",
  stone: "STONE",
};

/** The live route each rendition surface is a proposal for. */
export const LIVE_HREF: Record<Surface, string> = {
  home: "/",
  pectus: "/pectus",
  stone: "/stone",
};
