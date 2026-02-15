import Link from "next/link";
import { PlaceActions } from "./PlaceActions";

type Place = {
  slug: string;
  title: string;
  category: string;
  tags: string[];
  durationMin: number;
  openNote?: string;
  alternatives: string[];
  nearbyGastro: string[];
};

const PLACES: Place[] = [
  {
    slug: "ticha-vyhlidka",
    title: "Tichá vyhlídka",
    category: "vyhlídka",
    tags: ["par", "hiking", "klid"],
    durationMin: 120,
    openNote: "Volně přístupné",
    alternatives: ["lesni-rozhled", "klidna-stezka"],
    nearbyGastro: ["kava-a-kultura"],
  },
  {
    slug: "lesni-rozhled",
    title: "Lesní rozhled",
    category: "vyhlídka",
    tags: ["hiking", "klid"],
    durationMin: 120,
    openNote: "Volně přístupné",
    alternatives: ["ticha-vyhlidka"],
    nearbyGastro: [],
  },
  {
    slug: "klidna-stezka",
    title: "Klidná stezka",
    category: "příroda",
    tags: ["rodina", "hiking", "klid"],
    durationMin: 60,
    openNote: "Volně přístupné",
    alternatives: ["ticha-vyhlidka"],
    nearbyGastro: [],
  },
  {
    slug: "kava-a-kultura",
    title: "Káva + kultura",
    category: "indoor",
    tags: ["par", "indoor"],
    durationMin: 90,
    openNote: "Dle otevírací doby",
    alternatives: [],
    nearbyGastro: [],
  },

  // placeholdery, aby homepage linky nepadaly na 404
  { slug: "quest-60-90", title: "Quest na 60–90 min", category: "quest", tags: ["rodina"], durationMin: 90, alternatives: [], nearbyGastro: [] },
  { slug: "zviratka-a-hriste", title: "Za zvířátky + hřiště", category: "zvířata", tags: ["rodina"], durationMin: 120, alternatives: [], nearbyGastro: [] },
  { slug: "alternativa-k-magnetu", title: "Alternativa k magnetu", category: "tip", tags: ["klid"], durationMin: 120, alternatives: ["ticha-vyhlidka"], nearbyGastro: [] },

  { slug: "okruh-na-kole", title: "Okruh na kole", category: "cyklo", tags: ["cyklo"], durationMin: 240, alternatives: [], nearbyGastro: [] },
  { slug: "naucna-stezka", title: "Naučná stezka po cestě", category: "stezka", tags: ["cyklo"], durationMin: 90, alternatives: [], nearbyGastro: [] },
  { slug: "klidna-sotolina", title: "Klidnější šotolina", category: "cyklo", tags: ["cyklo", "klid"], durationMin: 180, alternatives: [], nearbyGastro: [] },

  { slug: "puldenni-hrebenovka", title: "Půldenní hřebenovka", category: "hiking", tags: ["hiking", "klid"], durationMin: 240, alternatives: ["ticha-vyhlidka"], nearbyGastro: [] },
  { slug: "tiche-misto", title: "Tiché místo mimo magnety", category: "hiking", tags: ["hiking", "klid"], durationMin: 180, alternatives: ["ticha-vyhlidka"], nearbyGastro: [] },
  { slug: "vyhledovy-bod", title: "Výhledový bod", category: "vyhlídka", tags: ["hiking"], durationMin: 120, alternatives: ["ticha-vyhlidka"], nearbyGastro: [] },

  { slug: "easy-viewpoint", title: "Easy walk with a viewpoint", category: "walk", tags: ["en"], durationMin: 120, alternatives: [], nearbyGastro: [] },
  { slug: "rainy-day-indoor", title: "Rainy day indoor pick", category: "indoor", tags: ["en"], durationMin: 90, alternatives: ["kava-a-kultura"], nearbyGastro: [] },
  { slug: "quieter-alternative", title: "Quieter alternative", category: "tip", tags: ["en", "klid"], durationMin: 120, alternatives: ["ticha-vyhlidka"], nearbyGastro: [] },
];

export default async function PlacePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const place = PLACES.find((p) => p.slug === slug);

  if (!place) {
    return (
      <main style={{ maxWidth: 920, margin: "0 auto", padding: 24 }}>
        <Link href="/" style={{ opacity: 0.8 }}>
          ← Zpět
        </Link>
        <h1 style={{ marginTop: 12 }}>Nenalezeno</h1>
        <p style={{ opacity: 0.75 }}>Neznámý slug: {slug}</p>
      </main>
    );
  }

  const alternatives = place.alternatives
    .map((s) => PLACES.find((p) => p.slug === s))
    .filter(Boolean) as Place[];

  const gastro = place.nearbyGastro
    .map((s) => PLACES.find((p) => p.slug === s))
    .filter(Boolean) as Place[];

  return (
    <main style={{ maxWidth: 920, margin: "0 auto", padding: 24 }}>
      <Link href="/" style={{ opacity: 0.8 }}>
        ← Zpět
      </Link>

      <h1 style={{ marginTop: 12 }}>{place.title}</h1>
      <p style={{ opacity: 0.75, marginTop: 6 }}>
        {place.category} • {place.durationMin} min • {place.openNote ?? "info"}
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 10 }}>
        {place.tags.map((t) => (
          <span
            key={t}
            style={{
              fontSize: 12,
              padding: "4px 10px",
              borderRadius: 999,
              background: "rgba(0,0,0,.06)",
            }}
          >
            {t}
          </span>
        ))}
      </div>

      {/* AKCE (client) */}
      <PlaceActions slug={place.slug} />

      <section style={{ marginTop: 18, padding: 14, border: "1px solid rgba(0,0,0,.12)", borderRadius: 12 }}>
        <h2 style={{ marginTop: 0, fontSize: 16 }}>Podobné bez davů</h2>
        {alternatives.length === 0 ? (
          <p style={{ opacity: 0.75, margin: 0 }}>Zatím doplníme.</p>
        ) : (
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            {alternatives.map((a) => (
              <li key={a.slug}>
                <Link href={`/place/${a.slug}`}>{a.title}</Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section style={{ marginTop: 12, padding: 14, border: "1px solid rgba(0,0,0,.12)", borderRadius: 12 }}>
        <h2 style={{ marginTop: 0, fontSize: 16 }}>Gastro poblíž</h2>
        {gastro.length === 0 ? (
          <p style={{ opacity: 0.75, margin: 0 }}>Zatím doplníme.</p>
        ) : (
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            {gastro.map((g) => (
              <li key={g.slug}>
                <Link href={`/place/${g.slug}`}>{g.title}</Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
