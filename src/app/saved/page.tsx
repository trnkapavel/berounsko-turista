"use client";

import Link from "next/link";
import { useMemo } from "react";
import { PLACES } from "@/data/places";
import { useSaved } from "@/lib/useSaved";
import { SavedButton } from "@/components/SavedButton";

export default function SavedPage() {
  const { saved, clear } = useSaved();

  const items = useMemo(() => {
    const bySlug = new Map(PLACES.map((p) => [p.slug, p]));
    return saved.map((s) => bySlug.get(s)).filter(Boolean);
  }, [saved]);

  return (
    <main style={{ maxWidth: 920, margin: "0 auto", padding: 24 }}>
      <header style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "baseline" }}>
        <div>
          <h1 style={{ fontSize: 28, margin: 0 }}>Uložené</h1>
          <p style={{ opacity: 0.75, marginTop: 6 }}>
            Tvoje místa pro později
          </p>
        </div>
        <nav style={{ display: "flex", gap: 10 }}>
          <Link href="/" style={{ opacity: 0.85 }}>Dnes se hodí</Link>
          <Link href="/nearby" style={{ opacity: 0.85 }}>Kolem mě</Link>
        </nav>
      </header>

      <section style={{ marginTop: 14, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
        <div style={{ opacity: 0.75 }}>
          Počet: <b>{items.length}</b>
        </div>

        <button
          onClick={clear}
          style={{ padding: "8px 10px", borderRadius: 10, border: "1px solid rgba(0,0,0,.18)", cursor: "pointer" }}
          disabled={items.length === 0}
        >
          Vymazat vše
        </button>
      </section>

      {items.length === 0 ? (
        <section style={{ marginTop: 18, padding: 14, border: "1px solid rgba(0,0,0,.12)", borderRadius: 12 }}>
          <p style={{ margin: 0, opacity: 0.8 }}>
            Zatím tu nic není. Ulož si něco z “Dnes se hodí” nebo z “Kolem mě”.
          </p>
        </section>
      ) : (
        <div style={{ display: "grid", gap: 12, marginTop: 18 }}>
          {items.map((p: any) => (
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
                {(p.tags ?? []).map((tag: string) => (
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
      )}
    </main>
  );
}
