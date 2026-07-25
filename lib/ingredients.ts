// Ingredient storytelling — one source of truth for the named "hero"
// ingredients shown front-of-house (the homepage band, the product cards, and
// each product page's Formula section). Warm, recognisable names lead here;
// the precise INCI stays in each product's buy-panel specification.
//
// Claim-safe by design: every role line is cosmetic and demonstrable — absorbs
// oil, cools on contact, nourishes, conditions, a firmer-LOOKING finish. Never
// a treatment, a detox, or a permanent-change claim.
//
// STEEL is a machined tool with no formulation, so it is deliberately absent.

import type { ProductSlug } from "@/lib/products";

export interface HeroIngredient {
  /** The warm, recognisable name shown front-of-house. */
  name: string;
  /** One short, demonstrable line on what it does (look & feel only). */
  role: string;
  /** Its INCI name, for reference / the spec. */
  inci: string;
}

/**
 * Every ingredient's pencil specimen plate, keyed by its front-of-house name.
 * White-ground illustrations: pair with `.melt` (mix-blend-multiply) so they
 * sit on the paper rather than in a box. Looked up by name so the path never
 * drifts from the copy.
 */
export const INGREDIENT_IMG: Record<string, string> = {
  Coffee: "/ingredients/coffee.png",
  Mint: "/ingredients/mint.png",
  Clay: "/ingredients/clay.png",
  Charcoal: "/ingredients/charcoal.png",
  "Olive Oil": "/ingredients/olive-oil.png",
  "Shea Butter": "/ingredients/shea.png",
  Shea: "/ingredients/shea.png",
  Honey: "/ingredients/honey.png",
};

export interface IngredientStory {
  heroes: HeroIngredient[];
  /** Middot-joined names for the product cards + homepage band header. */
  line: string;
}

export const INGREDIENTS: Record<ProductSlug, IngredientStory> = {
  pectus: {
    line: "Coffee · Mint",
    heroes: [
      { name: "Coffee", role: "An awake, toned-looking finish.", inci: "Caffeine" },
      { name: "Mint", role: "The cool hit you feel on contact.", inci: "Menthol" },
    ],
  },
  sculpt: {
    line: "Olive Oil · Shea · Coffee",
    heroes: [
      {
        name: "Olive Oil",
        role: "The ritual oil of the Romans. Nourishes as you work it in.",
        inci: "Olea Europaea (Olive) Fruit Oil",
      },
      {
        name: "Shea Butter",
        role: "Conditions and moisturises, so skin is never left dry.",
        inci: "Butyrospermum Parkii (Shea) Butter",
      },
      {
        name: "Coffee",
        role: "For a firmer, more awake-looking finish.",
        inci: "Caffeine",
      },
    ],
  },
  stone: {
    line: "Clay · Charcoal · Mint",
    heroes: [
      { name: "Clay", role: "Absorbs excess oil for a clean matte finish.", inci: "Kaolin" },
      { name: "Charcoal", role: "Lifts the day's grime.", inci: "Charcoal Powder" },
      { name: "Mint", role: "A cool, fresh finish.", inci: "Mentha Piperita (Peppermint) Oil" },
    ],
  },
};

// The "shelf" — the house's whole palette as one ingredient-first list (for the
// homepage band). Each ingredient once, with the products it serves. `in` is in
// house order (Pectus · Stone · Sculpt). Plates come from INGREDIENT_IMG.
export interface ShelfIngredient {
  name: string;
  role: string;
  in: string[];
}

export const SHELF: ShelfIngredient[] = [
  { name: "Coffee", role: "A firmer, more awake-looking finish.", in: ["Pectus", "Sculpt"] },
  { name: "Mint", role: "A cool hit on contact, a fresh finish.", in: ["Pectus", "Stone"] },
  { name: "Clay", role: "Absorbs excess oil for a clean matte finish.", in: ["Stone"] },
  { name: "Charcoal", role: "Lifts the day's grime.", in: ["Stone"] },
  { name: "Olive Oil", role: "Nourishes as you work it in.", in: ["Sculpt"] },
  { name: "Shea Butter", role: "Conditions, so skin is never left dry.", in: ["Sculpt"] },
];

// SCULPT is the only product without an existing INCI in its buy panel; this is
// the canonical list its Specification block reads. Hero-anchored and lean.
export const SCULPT_INCI: string[] = [
  "Aqua",
  "Olea Europaea (Olive) Fruit Oil",
  "Glycerin",
  "Cetearyl Alcohol",
  "Glyceryl Stearate",
  "Butyrospermum Parkii (Shea) Butter",
  "Caprylic/Capric Triglyceride",
  "Caffeine",
  "Panthenol",
  "Tocopherol",
  "Xanthan Gum",
  "Phenoxyethanol",
  "Ethylhexylglycerin",
  "Parfum",
];
