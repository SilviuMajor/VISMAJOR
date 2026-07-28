/**
 * The rendition catalogue.
 *
 * Two parallel design directions for the three pages that matter: the home
 * page and the two paid-traffic landing pages, PECTUS and STONE.
 *
 *   ATELIER (v2)    quiet, editorial, apothecary. Restraint as the luxury
 *                   signal. Small type, enormous margins, almost no motion.
 *
 *   COLOSSEUM (v3)  monumental. Full-bleed statuary, inverted black slabs,
 *                   type cropped by the viewport edge, hard contrast.
 *
 * Both keep the locked brand: monochrome ink on paper, Cinzel for the
 * wordmark, the existing product photography and the pencil Roman figures.
 * They differ in everything else.
 *
 * Every numbered entry here corresponds to a `data-mark="N"` attribute on the
 * page, which the review layer turns into a badge you can click.
 */

export type Rendition = "atelier" | "colosseum" | "synthesis";
export type Surface = "home" | "pectus" | "stone";

/** Display order, and the order the panel's rendition switcher cycles through. */
export const RENDITION_ORDER: Rendition[] = ["atelier", "colosseum", "synthesis"];

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
  atelier: {
    name: "Atelier",
    slug: "v2",
    tagline: "Quiet. Editorial. Restraint as the luxury signal.",
    note: "Built on the premise that the current site shouts. Display type comes down from 120px to 56px, tracking halves, and the page stops moving so the reader can. Nothing is pinned. The buy module sits in the first viewport on both product pages. Closest relatives: Aesop, Officine Universelle Buly, Perfumer H.",
  },
  colosseum: {
    name: "Colosseum",
    slug: "v3",
    tagline: "Monumental. Full-bleed. Hard contrast.",
    note: "Built on the premise that the current site is too polite with its best asset. The Roman figures go full-bleed and architectural, sections invert to black slabs, and headlines are cropped by the viewport edge. Motion is fewer moves, bigger. Closest relatives: Byredo's editorial work, fashion-house lookbooks.",
  },
  synthesis: {
    name: "The House",
    slug: "v4",
    tagline: "V1, with the parts of Atelier and Colosseum that earned their place.",
    note: "Not a fourth direction. This is the live site kept intact, with four specific imports: Atelier's home hero and its padded plate, Atelier's buy split moved in under the mask reveal, Colosseum's full-bleed product strips (now carrying the tube as well as the drawing) and its material strip, and Colosseum's formula treatment on both product pages. The reveal, the Architecture with its lightning and snow, Five moments and the product copy all stay exactly as they are. This is the candidate to go live.",
  },
};

export const CHANGES: Change[] = [
  /* ── ATELIER · PECTUS ─────────────────────────────────────────── */
  {
    n: 15,
    rendition: "atelier",
    surface: "pectus",
    category: "Conversion",
    title: "The buy module is the hero",
    from: "A 320vh scroll-jacked mask reveal. You scroll roughly three screens before a price appears.",
    why: "This is a paid-traffic landing page for an £18 impulse product from a brand nobody has heard of. Price, size, what it does and a way to buy all now sit in the first viewport, with no scroll at all. The reveal was the single most expensive thing on the page in conversion terms.",
  },
  {
    n: 16,
    rendition: "atelier",
    surface: "pectus",
    category: "Imagery",
    title: "The figure at full strength, half the screen",
    from: "product/david.png is unused. The figures that do appear are washed to 24% opacity behind text.",
    why: "This drawing is the best asset in the library and it depicts exactly what the product is for. At full contrast, filling half the viewport, it does the differentiating that a stock product-on-white shot cannot. Nobody else in this category looks like this.",
  },
  {
    n: 17,
    rendition: "atelier",
    surface: "pectus",
    category: "Type",
    title: "Display type down to 62px, tracking halved",
    from: "Wordmarks up to 120px+ with 0.22em tracking on caps, 0.34em on the loose variant.",
    why: "Aesop sets its largest heading around 30px. Ours does not need to match that, but 120px with wide tracking reads as a landing-page template, not a house. Smaller and tighter is what makes the same words look expensive.",
  },
  {
    n: 18,
    rendition: "atelier",
    surface: "pectus",
    category: "Conversion",
    title: "Delivery, returns and origin next to the button",
    from: "Scattered across a trust strip, an announcement bar and the footer.",
    why: "The three objections that stop a first order are cost of delivery, what happens if it is wrong, and who made it. They belong within eyeshot of the button, not three screens away.",
  },
  {
    n: 19,
    rendition: "atelier",
    surface: "pectus",
    category: "Structure",
    title: "One proposition, given a whole screen",
    from: "Several competing statements spread over the ticker, the trust strip and the One Job band.",
    why: "After the offer, the page should say one thing before it starts explaining. A single sentence with air around it is the cheapest way to look confident.",
  },
  {
    n: 20,
    rendition: "atelier",
    surface: "pectus",
    category: "Motion",
    title: "The three stages, unpinned",
    from: "A 450vh pinned section that holds the page still while the content changes underneath.",
    why: "Scroll-jacking breaks the reader's sense of how long the page is, fights trackpad and keyboard scrolling, and is the main source of the lag reported earlier. The same three steps sit flat, readable at a glance, in a third of the height.",
  },
  {
    n: 21,
    rendition: "atelier",
    surface: "pectus",
    category: "Layout",
    title: "Marginalia in the left column",
    from: "Eyebrow labels stacked directly above their headings, in the reading line.",
    why: "The device that carries this direction. Notes hang in the margin the way a scholarly edition annotates a text, so detail like INCI names and quantities stays available without bloating the sentence you are actually reading. It stacks back to a normal eyebrow on mobile.",
  },
  {
    n: 22,
    rendition: "atelier",
    surface: "pectus",
    category: "Conversion",
    title: "A proof section that admits it is empty",
    from: "Fabricated testimonials presented as real.",
    why: "Invented reviews are a UK DMCC Act 2024 exposure and they read as invented anyway. Building the slot at full size and saying plainly that it is waiting costs nothing today and is worth a great deal the day there are real ones.",
  },
  {
    n: 23,
    rendition: "atelier",
    surface: "pectus",
    category: "Structure",
    title: "The limits, stated in two columns",
    from: "Buried in small print in the footer.",
    why: "For a category men are slightly embarrassed by, saying what the product is not is more persuasive than another claim about what it is. It also keeps every claim cosmetic and demonstrable.",
  },
  {
    n: 24,
    rendition: "atelier",
    surface: "pectus",
    category: "Structure",
    title: "Four questions, open, no accordion",
    from: "A collapsed accordion, and no #faq anchor on this page for the footer to link to.",
    why: "Four short answers are cheaper to read than to click. Accordions suppress the exact reassurance a hesitant buyer came for, and they hide text from search.",
  },
  {
    n: 25,
    rendition: "atelier",
    surface: "pectus",
    category: "Structure",
    title: "A close that repeats the offer",
    from: "Final CTA, cross-sell band and a notify band, three competing asks in a row.",
    why: "The end of a landing page should ask for the one thing the page was for. Cross-sell belongs after the decision, not instead of it.",
  },

  /* ── ATELIER · HOME ───────────────────────────────────────────── */
  {
    n: 1,
    rendition: "atelier",
    surface: "home",
    category: "Motion",
    title: "The hero stops moving",
    from: "A mouse-tracking wordmark over a scroll-driven scene.",
    why: "None of the eight reference brands measured for this work scroll-jacks, pins or parallaxes. Malin+Goetz ships parallax attributes set to zero: they built it and turned it off. A still hero is the current position at every price tier above ours.",
  },
  {
    n: 2,
    rendition: "atelier",
    surface: "home",
    category: "Type",
    title: "Wordmark at 66px, tracking at 0.01em",
    from: "A much larger wordmark at 0.28em tracking.",
    why: "Measured from shipped CSS: Le Labo's largest type anywhere is 30px, Diptyque's 32px, Malin+Goetz's 40px. More striking still, none of them tracks out its capitals. Le Labo sets caps at 0 to 0.02em and tightens some headings to minus 0.72px; Diptyque tracks its caps headline at minus 0.5px. Wide-tracked uppercase is the generic-luxury tell those brands avoid.",
  },
  {
    n: 3,
    rendition: "atelier",
    surface: "home",
    category: "Imagery",
    title: "The villa padded onto the page, not cropped to fill",
    from: "Used as a background wash behind other content.",
    why: "The Folio Society, the one brand found that genuinely leads with illustration, pads every drawing onto white to preserve the whole image rather than cropping it to a layout box. A cropped drawing reads as a badly handled photograph; a padded one reads as a plate in a book.",
  },
  {
    n: 4,
    rendition: "atelier",
    surface: "home",
    category: "Type",
    title: "Courier plate captions",
    from: "No captions. The drawings float unlabelled.",
    why: "A monospace catalogue line under a classical drawing puts it in the archive register rather than the mood-board register. It is the cheapest available signal that the imagery is knowledge rather than decoration, and it uses a typeface already loaded.",
  },
  {
    n: 5,
    rendition: "atelier",
    surface: "home",
    category: "Structure",
    title: "One sentence, given a whole screen",
    from: "A virtues band of several competing statements.",
    why: "Space around a single claim is the most reliable way to make it read as confidence rather than copy.",
  },
  {
    n: 6,
    rendition: "atelier",
    surface: "home",
    category: "Layout",
    title: "The catalogue as a ruled index, not cards",
    from: "Product cards in a grid.",
    why: "Le Labo renders its whole catalogue as hairline-ruled cells sharing borders, so it reads as one continuous ledger rather than a set of tiles. It suits four products far better than a card grid, it puts price and category on one scannable axis, and it is a house device rather than a theme default.",
  },
  {
    n: 7,
    rendition: "atelier",
    surface: "home",
    category: "Imagery",
    title: "Materials as a herbarium, six plates with catalogue lines",
    from: "A band of ingredient plates with heading and caption labels.",
    why: "Same assets, presented as specimens with plate numbers and attributions. It gives the ingredient story somewhere permanent to live and makes the drawings look collected rather than sourced.",
  },
  {
    n: 8,
    rendition: "atelier",
    surface: "home",
    category: "Structure",
    title: "The house story folded into the standard",
    from: "Nowhere. There is no About page and the story is untold.",
    why: "You asked for no About page. This is where it goes: two paragraphs beside the figure, including the line about why there is no model photography, which turns a constraint into a stated position.",
  },
  {
    n: 9,
    rendition: "atelier",
    surface: "home",
    category: "Imagery",
    title: "The figure at full strength",
    from: "Figures rendered at 24% opacity as background wash.",
    why: "A drawing at a quarter opacity behind text is neither an image nor a texture. At full contrast in its own column it is the thing that makes this site look unlike its competitors.",
  },
  {
    n: 10,
    rendition: "atelier",
    surface: "home",
    category: "Conversion",
    title: "A close that names one product",
    from: "A general close.",
    why: "A four-product house asks a first-time visitor to make a choice they have no basis for. Naming the cheapest one removes the decision.",
  },

  /* ── ATELIER · STONE ──────────────────────────────────────────── */
  {
    n: 31,
    rendition: "atelier",
    surface: "stone",
    category: "Conversion",
    title: "Buy module in the first viewport, image mirrored",
    from: "The same 320vh mask reveal as PECTUS before any price appears.",
    why: "Shared skeleton with PECTUS, as agreed, but the columns are mirrored so the two paid-traffic pages do not feel like the same page twice. Price, size and add-to-bag all sit above the fold.",
  },
  {
    n: 32,
    rendition: "atelier",
    surface: "stone",
    category: "Conversion",
    title: "The 200ml jar is preselected",
    from: "Also preselected, but inside a panel three screens down.",
    why: "The middle tier carries the best margin and is the one most people choose. Preselecting it in the first viewport is worth more than preselecting it where few people reach.",
  },
  {
    n: 33,
    rendition: "atelier",
    surface: "stone",
    category: "Imagery",
    title: "The washing figure promoted to hero",
    from: "Used at 24 to 45% opacity as a background wash behind the actives panel.",
    why: "It is a beautiful drawing of a man washing his face, which is exactly what the product is for, and it was being used as wallpaper. Contained rather than cropped, so the whole figure survives.",
  },
  {
    n: 34,
    rendition: "atelier",
    surface: "stone",
    category: "Structure",
    title: "One proposition, given a whole screen",
    from: "A ticker and several competing lines.",
    why: "Matches PECTUS, so the house has one rhythm.",
  },
  {
    n: 35,
    rendition: "atelier",
    surface: "stone",
    category: "Motion",
    title: "The three actives, unpinned",
    from: "A 450vh pinned section where each step draws in across its own third of the scroll.",
    why: "This is the section whose timing was reported as wrong twice, and the fix each time was to retune the pin. Unpinned, there is no timing to get wrong: all three steps are legible at once and the section costs a fifth of the height.",
  },
  {
    n: 36,
    rendition: "atelier",
    surface: "stone",
    category: "Layout",
    title: "Three actives flat, with INCI in the margin",
    from: "One active at a time, swapped by scroll position.",
    why: "Clay, charcoal and mint are a set. Showing them together lets someone compare, which is what an ingredient list is for.",
  },
  {
    n: 37,
    rendition: "atelier",
    surface: "stone",
    category: "Imagery",
    title: "A closing figure that was never used",
    from: "men/stone-finish.png is unused.",
    why: "There was a finished drawing of the after state sitting in the repository unused while the page reused the same jar render four times.",
  },
  {
    n: 38,
    rendition: "atelier",
    surface: "stone",
    category: "Conversion",
    title: "A proof section that admits it is empty",
    from: "Fabricated testimonials.",
    why: "Same reasoning as PECTUS. Invented reviews are a UK DMCC Act 2024 exposure and they read as invented anyway.",
  },
  {
    n: 39,
    rendition: "atelier",
    surface: "stone",
    category: "Structure",
    title: "Four questions, open, with a working anchor",
    from: "A collapsed accordion with no #faq id, so the footer link went nowhere.",
    why: "A deliberate divergence, and worth flagging as one: four of the six reference brands measured do use accordions. The argument for open text here is that four short answers are cheaper to read than to click, and that a hesitant buyer should not have to hunt for the reassurance they came for.",
  },
  {
    n: 40,
    rendition: "atelier",
    surface: "stone",
    category: "Structure",
    title: "A close that repeats the offer",
    from: "Final CTA, cross-sell and notify band in a row.",
    why: "One ask at the end of the page the ask was for.",
  },

  /* ── COLOSSEUM · HOME ─────────────────────────────────────────── */
  {
    n: 45,
    rendition: "colosseum",
    surface: "home",
    category: "Structure",
    title: "The page opens on ink",
    from: "White throughout. --paper-1 is identical to --paper-0, so every band that thinks it is raised is invisible.",
    why: "The palette is locked to ink and paper, so the only contrast available is how much of each a section uses. Inverting whole sections is the strongest move the locked palette allows, and it makes the white sections afterwards read as light rather than as default.",
  },
  {
    n: 46,
    rendition: "colosseum",
    surface: "home",
    category: "Type",
    title: "Caps tracked at 0.05em, display at minus 0.02em",
    from: "0.22em on caps, 0.34em on the loose variant.",
    why: "D.S. and Durga runs a strict plus or minus 0.05em system: negative on display, positive on uppercase labels, no exceptions. A single rule applied without exception is what makes a site read as authored rather than themed. This direction adopts it wholesale.",
  },
  {
    n: 47,
    rendition: "colosseum",
    surface: "home",
    category: "Type",
    title: "A wordmark the viewport cannot hold",
    from: "A wordmark sized to fit its container.",
    why: "The opposite bet to Atelier, and the one place a Cinzel-led brand can be genuinely spectacular. D.S. and Durga sets section headings at 120px against 18px body, a 6.7 to 1 ratio. A word cropped by the screen edge feels larger than the screen.",
  },
  {
    n: 48,
    rendition: "colosseum",
    surface: "home",
    category: "Imagery",
    title: "A full-bleed scene as a chapter break",
    from: "scenes/extra.png is unused.",
    why: "There are two near-identical wide interiors in the library and neither is used anywhere. This is the men-only crop, run edge to edge with no margin, no container and no caption. It gives the page a breath that costs no copy.",
  },
  {
    n: 49,
    rendition: "colosseum",
    surface: "home",
    category: "Layout",
    title: "The catalogue as full-bleed alternating panels",
    from: "Product cards in a grid.",
    why: "Frama builds its entire homepage from full-bleed squares that touch, with no page margin at all. Four products at half a viewport each, alternating side, gives every product a proper image instead of a thumbnail.",
  },
  {
    n: 50,
    rendition: "colosseum",
    surface: "home",
    category: "Structure",
    title: "The house story on an ink slab",
    from: "Nowhere.",
    why: "Same content as Atelier's version, in this direction's register. Two columns, no image, the type doing the work.",
  },
  {
    n: 51,
    rendition: "colosseum",
    surface: "home",
    category: "Layout",
    title: "Materials at six across, dense",
    from: "A comfortable three-across band.",
    why: "Buly runs 15 sections and 11,000px of page and reads as ornate rather than long. Density is this direction's whitespace: six plates in a row with hairlines under each reads as a specimen drawer.",
  },
  {
    n: 52,
    rendition: "colosseum",
    surface: "home",
    category: "Structure",
    title: "Close on ink, with one product named",
    from: "A general close.",
    why: "Bookends the ink hero and removes the four-way choice for a first-time visitor.",
  },

  /* ── COLOSSEUM · PECTUS ───────────────────────────────────────── */
  {
    n: 59,
    rendition: "colosseum",
    surface: "pectus",
    category: "Conversion",
    title: "A hard vertical split: offer on ink, figure on paper",
    from: "A 320vh scroll-jacked mask reveal before any price.",
    why: "Solves two problems at once. The buy module reaches the first viewport, and the pencil drawing keeps its own white ground instead of being inverted or knocked back on a dark field. The seam between the two halves is the whole composition.",
  },
  {
    n: 60,
    rendition: "colosseum",
    surface: "pectus",
    category: "Type",
    title: "PECTUS at 116px, reversed out",
    from: "Large, but on white and competing with a moving background.",
    why: "White Cinzel on ink at this size is the most dramatic thing the locked palette can do, and it costs nothing but restraint elsewhere.",
  },
  {
    n: 61,
    rendition: "colosseum",
    surface: "pectus",
    category: "Imagery",
    title: "The figure full-bleed, product hard-edged against it",
    from: "product/david.png unused; product/front.png reused in twelve places.",
    why: "The drawing fills half the viewport and the actual tube sits over it at the bottom right, so the first screen carries both the thing that makes the brand distinctive and the thing being sold.",
  },
  {
    n: 62,
    rendition: "colosseum",
    surface: "pectus",
    category: "Type",
    title: "A headline cropped by the viewport edge",
    from: "Headlines sized to fit.",
    why: "The signature device of this direction, used once per page so it stays an event.",
  },
  {
    n: 63,
    rendition: "colosseum",
    surface: "pectus",
    category: "Imagery",
    title: "The banquet scene, full bleed",
    from: "scenes/pectus.png appears only in prototype routes and behind hero masks.",
    why: "A wide, densely drawn interior used at the size it was drawn for, as a pause between the offer and the explanation.",
  },
  {
    n: 64,
    rendition: "colosseum",
    surface: "pectus",
    category: "Motion",
    title: "The three stages, unpinned, on ink",
    from: "A 450vh pinned section with lightning and snowflake effects.",
    why: "The effects were reverted into the live site at your request and this direction does not touch them there. Here the same three steps are stated flat on an ink slab, which is this direction's answer: contrast instead of choreography.",
  },
  {
    n: 65,
    rendition: "colosseum",
    surface: "pectus",
    category: "Imagery",
    title: "Two actives at half a page each",
    from: "Small plates in a three-column band.",
    why: "PECTUS has two actives, not three, so each gets half the width. The pencil work only reads as pencil work above a certain size.",
  },
  {
    n: 66,
    rendition: "colosseum",
    surface: "pectus",
    category: "Conversion",
    title: "Proof on ink, stating plainly that there is none",
    from: "Fabricated testimonials.",
    why: "Same position as Atelier, in this direction's voice. NOTHING YET set at 44px is more disarming than a fake five-star average, and it is not a DMCC exposure.",
  },
  {
    n: 67,
    rendition: "colosseum",
    surface: "pectus",
    category: "Structure",
    title: "A close at full scale",
    from: "Final CTA, cross-sell band and notify band.",
    why: "The open tube at 320px against a two-line Cinzel close, and one button.",
  },

  /* ── COLOSSEUM · STONE ────────────────────────────────────────── */
  {
    n: 75,
    rendition: "colosseum",
    surface: "stone",
    category: "Conversion",
    title: "The split, mirrored",
    from: "The same mask reveal as PECTUS.",
    why: "Shared skeleton, mirrored, so the two paid-traffic pages are recognisably a pair without being the same page twice. The washing figure is contained rather than cropped, because unlike the torso it is a whole figure and cropping it would lose the basin.",
  },
  {
    n: 76,
    rendition: "colosseum",
    surface: "stone",
    category: "Type",
    title: "STONE at 116px, reversed out",
    from: "Smaller, on white.",
    why: "Matches PECTUS so the two landing pages share a scale.",
  },
  {
    n: 77,
    rendition: "colosseum",
    surface: "stone",
    category: "Type",
    title: "A cropped headline",
    from: "Headlines sized to fit.",
    why: "One per page, as on PECTUS.",
  },
  {
    n: 78,
    rendition: "colosseum",
    surface: "stone",
    category: "Imagery",
    title: "The marble bath scene at full bleed",
    from: "Used behind the hero mask, largely unseen.",
    why: "The strongest single drawing in the STONE set is a close crop of a man touching his face in a marble bath, and almost nobody currently sees it. Edge to edge, it is the best argument the page has.",
  },
  {
    n: 79,
    rendition: "colosseum",
    surface: "stone",
    category: "Motion",
    title: "The three actives, unpinned, on ink",
    from: "A 450vh pin with per-step draw-in.",
    why: "The section with the timing that needed retuning twice. Removing the pin removes the class of problem.",
  },
  {
    n: 80,
    rendition: "colosseum",
    surface: "stone",
    category: "Imagery",
    title: "Three actives at a third of a page each",
    from: "One at a time, swapped by scroll.",
    why: "Clay, charcoal and mint are a set and should be comparable at a glance.",
  },
  {
    n: 81,
    rendition: "colosseum",
    surface: "stone",
    category: "Conversion",
    title: "Proof on ink, stating plainly that there is none",
    from: "Fabricated testimonials.",
    why: "Consistent with every other page in both directions.",
  },
  {
    n: 82,
    rendition: "colosseum",
    surface: "stone",
    category: "Structure",
    title: "A close at full scale",
    from: "Final CTA, cross-sell and notify band.",
    why: "The unused finish drawing against a two-line Cinzel close, and one button.",
  },

  /* ── THE HOUSE (V4) · HOME ────────────────────────────────────── */
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
    title: "Wordmark at 66px, tracking at 0.01em",
    from: "Much larger, at 0.28em tracking.",
    why: "Carried over from Atelier because it is the finding with the most evidence behind it: none of the eight reference brands tracks out its capitals, and several set them negative.",
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
    title: "Colosseum's strips, now carrying the tube",
    from: "Product cards in a grid, drawing and product never seen together.",
    why: "The change you asked for on top of the Colosseum strips: the product sits over the drawing, hard-edged and shadowed, so each strip shows both the thing that makes the brand distinctive and the thing being sold.",
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

  /* ── THE HOUSE (V4) · PECTUS ──────────────────────────────────── */
  {
    n: 107,
    rendition: "synthesis",
    surface: "pectus",
    category: "Conversion",
    title: "The buy split, second, under the reveal",
    from: "Roughly three screens of scroll before any price appears.",
    why: "Atelier's split moved in behind the mask reveal, which keeps the opening you wanted while bringing a price, a size and a way to buy to one screen in. The tube sits in the same block as the price rather than three screens away.",
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

  /* ── THE HOUSE (V4) · STONE ───────────────────────────────────── */
  {
    n: 114,
    rendition: "synthesis",
    surface: "stone",
    category: "Conversion",
    title: "The buy split, mirrored",
    from: "The same reveal-then-nothing opening as PECTUS.",
    why: "Same block as PECTUS, flipped, so the two paid-traffic pages read as a pair. The washing figure is padded rather than cropped, because unlike the torso it is a whole figure and cropping loses the basin.",
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
