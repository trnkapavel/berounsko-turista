export type Place = {
  slug: string;
  title: string;
  category: "priroda" | "pamatky" | "muzeum" | "zvirata" | "vyhlidka" | "wellness";
  tags: ("rodina" | "par" | "cyklo" | "hiking" | "indoor" | "klid" | "popular")[];
  durationMin: 30 | 60 | 120 | 240;
  openNote?: string;
  alternatives: string[];
  nearbyGastro: string[];
};

export const PLACES: Place[] = [
  {
    slug: "ticha-vyhlidka",
    title: "Tichá vyhlídka",
    category: "vyhlidka",
    tags: ["par", "hiking", "klid"],
    durationMin: 120,
    openNote: "Volně přístupné",
    alternatives: ["lesni-rozhled", "klidna-stezka"],
    nearbyGastro: ["kavarna-u-parku"],
  },
  {
    slug: "kavarna-u-parku",
    title: "Kavárna u parku",
    category: "muzeum",
    tags: ["rodina", "par", "indoor"],
    durationMin: 60,
    openNote: "Dle otevírací doby",
    alternatives: [],
    nearbyGastro: [],
  },
  {
    slug: "lesni-rozhled",
    title: "Lesní rozhled",
    category: "vyhlidka",
    tags: ["hiking", "klid"],
    durationMin: 120,
    openNote: "Volně přístupné",
    alternatives: ["ticha-vyhlidka"],
    nearbyGastro: [],
  },
  {
    slug: "klidna-stezka",
    title: "Klidná stezka",
    category: "priroda",
    tags: ["rodina", "hiking", "klid"],
    durationMin: 60,
    openNote: "Volně přístupné",
    alternatives: ["ticha-vyhlidka"],
    nearbyGastro: [],
  },
];
