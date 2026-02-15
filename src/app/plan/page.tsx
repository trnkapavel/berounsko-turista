"use client";

import Link from "next/link";
import { useMemo } from "react";
import { usePlan } from "@/lib/usePlan";
import { PLACES } from "@/data/places";

function buildGoogleMapsRoute(slugs: string[]) {
  // MVP bez adres: použijeme názvy jako query. Později přejdeme na lat/lng.
  const bySlug = new Map(PLACES.map((p) => [p.slug, p.title]));
  const titles = slugs.map((s) => bySlug.get(s)).filter(Boolean) as string[];
  if (titles.length === 0) return "";

  const origin = titles[0];
  const destination = titles[titles.length - 1];
  const waypoints = titles.slice(1, -1);

  const params = new URLSearchParams();
  params.set("api", "1");
  params.set("origin", origin);
  params.set("destination", destination);
  if (waypoints.length) params.set("waypoints", waypoints.join("|"));
  params.set("travelmode", "walking");

  return `https://www.google.com/maps/dir/?${params.toString()}`;
}

export default function PlanPage() {
  const { plan, clear, remove, moveUp } = usePlan(4);

  const items = useMemo(() => {
    const bySlug = new Map(PLACES.map((p) => [p.slug, p]));
    return plan.map((x) => bySlug.get(x.slug)).filter(Boolean);
  }, [plan]);

  const slugs = items.map((p: any) => p.slug);
  const mapsUrl = buildGoogleMapsRoute(slugs);

  return (
    <main style={{ maxWidth: 920, margin: "0 auto", padding: 24 }}>
      <header style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "baseline" }}>
        <div>
          <h1 style={{ fontSize: 28, margin: 0 }}>Plán dne</h1>
          <p style={{ opacity: 0.75, marginTop: 6 }}>Až 4 položky, jednoduché a rychlé</p>
        </div>

        <nav style={{ display: "flex", gap: 10 }}>
          <Link href="/" style={{ opacity: 0.85 }}>Dnes se hodí</Link>
          <Link href="/nearby" style={{ opacity: 0.85 }}>Kolem mě</Link>
          <Link href="/saved" style={{ opacity: 0.85 }}>Uložené</Link>
        </nav>
      </header>

      <section style={{ marginTop: 14, display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
        <button
          onClick={clear}
          disabled={items.length === 0}
          style={{ padding: "8px 10px", borderRadius: 10, border: "1px solid rgba(0,0,0,.18)", cursor: "pointer" }}
        >
          Vymazat plán
        </button>

        <a
          href={mapsUrl || "#"}
          target="_blank"
          rel="noreferrer"
          style={{
            display: "inline-block",
            padding: "8px 10px",
            borderRadius: 10,
            border: "1px solid rgba(0,0,0,.18)",
            textDecoration: "none",
            color: "inherit",
            pointerEvents: mapsUrl ? "auto" : "none",
            opacity: mapsUrl ? 1 : 0.5,
          }}
        >
          Otevřít v Mapách
        </a>

        <span style={{ marginLeft: "auto", opacity: 0.75 }}>
          Počet: <b>{items.length}</b> / 4
        </span>
      </section>

      {items.length === 0 ? (
        <section style={{ marginTop: 18, padding: 14, border: "1px solid rgba(0,0,0,.12)", borderRadius: 12 }}>
          <p style={{ margin: 0, opacity: 0.8 }}>
            Zatím prázdné. Přidej místa z detailu nebo z listu.
          </p>
        </section>
      ) : (
        <div style={{ display: "grid", gap: 12, marginTop: 18 }}>
          {items.map((p: any, idx: number) => (
            <article key={p.slug} style={{ border: "1px solid rgba(0,0,0,.12)", borderRadius: 12, padding: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                <h2 style={{ fontSize: 18, margin: 0 }}>
                  <Link href={`/place/${p.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
                    {idx + 1}. {p.title}
                  </Link>
                </h2>
                <span style={{ opacity: 0.7 }}>{p.durationMin ? `${p.durationMin} min` : ""}</span>
              </div>

              <p style={{ marginTop: 6, marginBottom: 10, opacity: 0.8 }}>
                {p.category} {p.openNote ? `• ${p.openNote}` : ""}
              </p>

              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 10 }}>
                <button
                  onClick={() => moveUp(p.slug)}
                  disabled={idx === 0}
                  style={{ padding: "8px 10px", borderRadius: 10, border: "1px solid rgba(0,0,0,.18)", cursor: "pointer", opacity: idx === 0 ? 0.5 : 1 }}
                >
                  Posunout výš
                </button>

                <button
                  onClick={() => remove(p.slug)}
                  style={{ padding: "8px 10px", borderRadius: 10, border: "1px solid rgba(0,0,0,.18)", cursor: "pointer" }}
                >
                  Odebrat
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
