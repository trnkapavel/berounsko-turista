import Link from "next/link";
import { PlaceActions } from "./PlaceActions";
import { PLACES, Place } from "@/data/places";

export default async function PlacePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const place = PLACES.find((p) => p.slug === slug);

  if (!place) {
    return (
      <main style={{ maxWidth: 920, margin: "0 auto", padding: 24 }}>
        <Link href="/" style={{ opacity: 0.8 }}>← Zpět</Link>
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
      <Link href="/" style={{ opacity: 0.8 }}>← Zpět</Link>

      <h1 style={{ marginTop: 12 }}>{place.title}</h1>

      <p style={{ opacity: 0.75, marginTop: 6 }}>
        {place.category} • {place.durationMin} min • {place.openNote ?? "info"}
        {place.crowd ? ` • ${place.crowd === "magnet" ? "Magnet" : place.crowd === "quiet" ? "Klid" : "Normál"}` : ""}
      </p>

      {place.why ? (
        <p style={{ marginTop: 8, marginBottom: 0, opacity: 0.9 }}>
          {place.why}
        </p>
      ) : null}

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 10 }}>
        {place.tags.map((t) => (
          <span key={t} style={{ fontSize: 12, padding: "4px 10px", borderRadius: 999, background: "rgba(0,0,0,.06)" }}>
            {t}
          </span>
        ))}
      </div>

      {/* AKCE */}
      <PlaceActions slug={place.slug} alternatives={place.alternatives} />

      <section style={{ marginTop: 18, padding: 14, border: "1px solid rgba(0,0,0,.12)", borderRadius: 12 }}>
        <h2 style={{ marginTop: 0, fontSize: 16 }}>Podobné bez davů</h2>
        {alternatives.length === 0 ? (
          <p style={{ opacity: 0.75, margin: 0 }}>Zatím doplníme.</p>
        ) : (
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            {alternatives.map((a) => (
              <li key={a.slug}>
                <Link href={`/place/${a.slug}`}>{a.title}</Link>
                {a.why ? <span style={{ opacity: 0.7 }}> {" "}({a.why})</span> : null}
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
