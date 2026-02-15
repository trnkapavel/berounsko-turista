"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { PLACES, Place } from "@/data/places";
import { SavedButton } from "@/components/SavedButton";

function includesText(hay: string, needle: string) {
  return hay.toLowerCase().includes(needle.toLowerCase().trim());
}

export default function NearbyPage() {
  const [q, setQ] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [preferQuiet, setPreferQuiet] = useState(true);
  const [onlyIndoor, setOnlyIndoor] = useState(false);
  const [maxDuration, setMaxDuration] = useState<number>(0); // 0 = libovolně

  const categories = useMemo(() => {
    const uniq = Array.from(new Set(PLACES.map((p) => p.category))).filter(Boolean);
    return uniq.sort((a, b) => a.localeCompare(b, "cs"));
  }, []);

  const filtered = useMemo(() => {
    let list: Place[] = [...PLACES];

    if (q.trim()) {
      list = list.filter((p) => includesText(p.title, q) || (p.tags ?? []).some((t) => includesText(t, q)));
    }

    if (category !== "all") {
      list = list.filter((p) => p.category === category);
    }

    if (onlyIndoor) {
      list = list.filter((p) => (p.tags ?? []).includes("indoor"));
    }

    if (maxDuration > 0) {
      list = list.filter((p) => (p.durationMin ?? 9999) <= maxDuration);
    }

    if (preferQuiet) {
      // posuň dopředu věci, které mají tag "klid"
      list = list.sort((a, b) => {
        const ak = (a.tags ?? []).includes("klid") ? 0 : 1;
        const bk = (b.tags ?? []).includes("klid") ? 0 : 1;
        return ak - bk;
      });
    }

    return list;
  }, [q, category, preferQuiet, onlyIndoor, maxDuration]);

  return (
    <main style={{ maxWidth: 920, margin: "0 auto", padding: 24 }}>
      <header style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "baseline" }}>
        <div>
          <h1 style={{ fontSize: 28, margin: 0 }}>Kolem mě</h1>
          <p style={{ opacity: 0.75, marginTop: 6 }}>
            MVP list a filtry (GPS přidáme později)
          </p>
        </div>
        <nav style={{ display: "flex", gap: 10 }}>
          <Link href="/plan" style={{ opacity: 0.85 }}>Plán dne</Link>
          <Link href="/" style={{ opacity: 0.85 }}>Dnes se hodí</Link>
          <Link href="/saved" style={{ opacity: 0.85 }}>Uložené</Link>
        </nav>
      </header>

      <section
        style={{
          marginTop: 14,
          padding: 12,
          border: "1px solid rgba(0,0,0,.12)",
          borderRadius: 12,
          display: "grid",
          gap: 10,
        }}
      >
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Hledej místo nebo tag (např. klid, indoor, rodina)"
          style={{
            width: "100%",
            padding: "10px 12px",
            borderRadius: 10,
            border: "1px solid rgba(0,0,0,.18)",
          }}
        />

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
          <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
            Kategorie:
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{ padding: "8px 10px", borderRadius: 10, border: "1px solid rgba(0,0,0,.18)" }}
            >
              <option value="all">Vše</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>

          <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
            Max. čas:
            <select
              value={maxDuration}
              onChange={(e) => setMaxDuration(Number(e.target.value))}
              style={{ padding: "8px 10px", borderRadius: 10, border: "1px solid rgba(0,0,0,.18)" }}
            >
              <option value={0}>Libovolně</option>
              <option value={60}>do 60 min</option>
              <option value={120}>do 120 min</option>
              <option value={240}>do 240 min</option>
            </select>
          </label>

          <label style={{ display: "flex", gap: 8, alignItems: "center", marginLeft: "auto" }}>
            <input type="checkbox" checked={preferQuiet} onChange={(e) => setPreferQuiet(e.target.checked)} />
            Preferovat klid
          </label>

          <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <input type="checkbox" checked={onlyIndoor} onChange={(e) => setOnlyIndoor(e.target.checked)} />
            Jen indoor
          </label>
        </div>

        <div style={{ opacity: 0.75, fontSize: 12 }}>
          Výsledků: <b>{filtered.length}</b>
        </div>
      </section>

      <div style={{ display: "grid", gap: 12, marginTop: 18 }}>
        {filtered.map((p) => (
          <article key={p.slug} style={{ border: "1px solid rgba(0,0,0,.12)", borderRadius: 12, padding: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
              <h2 style={{ fontSize: 18, margin: 0 }}>
                <Link href={`/place/${p.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
                  {p.title}
                </Link>
              </h2>
              <span style={{ opacity: 0.7 }}>{p.durationMin ? `${p.durationMin} min` : ""}</span>
            </div>

            <p style={{ marginTop: 6, marginBottom: 10, opacity: 0.8 }}>
              {p.category} {p.openNote ? `• ${p.openNote}` : ""}
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {(p.tags ?? []).map((tag) => (
                <span key={tag} style={{ fontSize: 12, padding: "4px 10px", borderRadius: 999, background: "rgba(0,0,0,.06)" }}>
                  {tag}
                </span>
              ))}
            </div>

            <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
              <Link
                href={`/place/${p.slug}`}
                style={{
                  display: "inline-block",
                  padding: "8px 10px",
                  borderRadius: 10,
                  border: "1px solid rgba(0,0,0,.18)",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                Detail
              </Link>

              <SavedButton slug={p.slug} />
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
