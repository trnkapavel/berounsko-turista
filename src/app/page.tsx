"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type Profile = "rodina" | "par" | "cyklo" | "hiking" | "en";

type Tip = {
  slug: string;
  title: string;
  tags: string[];
  desc: string;
  eta: string;
  kind: "klid" | "popular" | "indoor" | "family";
};

const LABEL: Record<Profile, string> = {
  rodina: "Rodina",
  par: "Pár",
  cyklo: "Cyklo",
  hiking: "Hiking",
  en: "EN",
};

const TIPS: Record<Profile, Tip[]> = {
  rodina: [
    {
      slug: "quest-60-90",
      title: "Quest na 60–90 min",
      tags: ["děti", "hravé", "krátké"],
      desc: "Hledačka, která udrží tempo a pozornost.",
      eta: "do 20 min",
      kind: "family",
    },
    {
      slug: "zviratka-a-hriste",
      title: "Za zvířátky + hřiště",
      tags: ["rodina", "outdoor", "pohoda"],
      desc: "Bez stresu, jasný cíl a pauzy.",
      eta: "do 30 min",
      kind: "family",
    },
    {
      slug: "alternativa-k-magnetu",
      title: "Alternativa k magnetu",
      tags: ["méně lidí", "podobný zážitek"],
      desc: "Stejný typ výletu, ale klidnější varianta.",
      eta: "do 25 min",
      kind: "klid",
    },
  ],
  par: [
    {
      slug: "ticha-vyhlidka",
      title: "Klidná vyhlídka",
      tags: ["klid", "výhled", "půlden"],
      desc: "Míň lidí, víc atmosféry.",
      eta: "do 35 min",
      kind: "klid",
    },
    {
      slug: "kava-a-kultura",
      title: "Káva + kultura",
      tags: ["indoor", "kavárna", "galerie"],
      desc: "Když chcete plán bez náhody.",
      eta: "v okolí",
      kind: "indoor",
    },
    {
      slug: "romanticka-prochazka",
      title: "Romantická procházka",
      tags: ["pohoda", "fotogenické"],
      desc: "Krátká trasa s dobrým dojezdem na večeři.",
      eta: "do 20 min",
      kind: "popular",
    },
  ],
  cyklo: [
    {
      slug: "okruh-na-kole",
      title: "Okruh na kole",
      tags: ["kolo", "střední", "výhled"],
      desc: "Plynulá trasa s jedním silným highlightem.",
      eta: "start poblíž",
      kind: "popular",
    },
    {
      slug: "naucna-stezka",
      title: "Naučná stezka po cestě",
      tags: ["kolo", "lehké", "zastávky"],
      desc: "Ideální jako doplněk k delší trase.",
      eta: "do 15 min",
      kind: "klid",
    },
    {
      slug: "klidna-sotolina",
      title: "Klidnější šotolina",
      tags: ["klid", "mimo silnice"],
      desc: "Méně provozu, víc přírody.",
      eta: "do 25 min",
      kind: "klid",
    },
  ],
  hiking: [
    {
      slug: "puldenni-hrebenovka",
      title: "Půldenní hřebenovka",
      tags: ["hiking", "klid", "příroda"],
      desc: "Trasa, kde si člověk srovná myšlenky.",
      eta: "do 40 min",
      kind: "klid",
    },
    {
      slug: "tiche-misto",
      title: "Tiché místo mimo magnety",
      tags: ["méně známé", "les"],
      desc: "Alternativa k přetíženým ikonám.",
      eta: "do 25 min",
      kind: "klid",
    },
    {
      slug: "vyhledovy-bod",
      title: "Výhledový bod",
      tags: ["výhled", "outdoor"],
      desc: "Jeden silný moment a pak domů.",
      eta: "do 30 min",
      kind: "popular",
    },
  ],
  en: [
    {
      slug: "easy-viewpoint",
      title: "Easy walk with a viewpoint",
      tags: ["easy", "view", "half-day"],
      desc: "Simple plan, low friction.",
      eta: "up to 35 min",
      kind: "popular",
    },
    {
      slug: "rainy-day-indoor",
      title: "Rainy day indoor pick",
      tags: ["indoor", "museum", "cafe"],
      desc: "Good even when weather turns.",
      eta: "nearby",
      kind: "indoor",
    },
    {
      slug: "quieter-alternative",
      title: "Quieter alternative",
      tags: ["less crowded", "similar vibe"],
      desc: "Same experience, fewer people.",
      eta: "up to 25 min",
      kind: "klid",
    },
  ],
};

export default function Home() {
  const [profile, setProfile] = useState<Profile>("rodina");
  const [preferQuiet, setPreferQuiet] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("bt_profile") as Profile | null;
    const quiet = localStorage.getItem("bt_quiet");
    if (saved) setProfile(saved);
    if (quiet !== null) setPreferQuiet(quiet === "1");
  }, []);

  useEffect(() => {
    localStorage.setItem("bt_profile", profile);
  }, [profile]);

  useEffect(() => {
    localStorage.setItem("bt_quiet", preferQuiet ? "1" : "0");
  }, [preferQuiet]);

  const tips = useMemo(() => {
    const list = [...TIPS[profile]];
    if (!preferQuiet) return list;
    // preferuj klidné tipy (MVP rozptylování davů)
    return list.sort((a, b) => (a.kind === "klid" ? -1 : 1) - (b.kind === "klid" ? -1 : 1));
  }, [profile, preferQuiet]);

  return (
    <main style={{ maxWidth: 920, margin: "0 auto", padding: 24 }}>
      <header style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "baseline" }}>
        <div>
          <h1 style={{ fontSize: 28, margin: 0 }}>Dnes se hodí</h1>
          <p style={{ opacity: 0.75, marginTop: 6 }}>
            Profil: <b>{LABEL[profile]}</b>
          </p>
        </div>
        <nav style={{ display: "flex", gap: 10 }}>
  <Link href="/plan" style={{ opacity: 0.85 }}>Plán dne</Link>
  <Link href="/nearby" style={{ opacity: 0.85 }}>Kolem mě</Link>
  <Link href="/saved" style={{ opacity: 0.85 }}>Uložené</Link>
</nav>
      </header>

      <section style={{ marginTop: 14, display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
        {(["rodina", "par", "cyklo", "hiking", "en"] as Profile[]).map((p) => (
          <button
            key={p}
            onClick={() => setProfile(p)}
            style={{
              padding: "8px 10px",
              borderRadius: 999,
              border: "1px solid rgba(0,0,0,.18)",
              background: p === profile ? "rgba(0,0,0,.06)" : "transparent",
              cursor: "pointer",
            }}
          >
            {LABEL[p]}
          </button>
        ))}

        <label style={{ marginLeft: "auto", display: "flex", gap: 8, alignItems: "center", opacity: 0.85 }}>
          <input type="checkbox" checked={preferQuiet} onChange={(e) => setPreferQuiet(e.target.checked)} />
          Preferovat klid
        </label>
      </section>

      <div style={{ display: "grid", gap: 12, marginTop: 18 }}>
        {tips.map((t) => (
          <article key={t.slug} style={{ border: "1px solid rgba(0,0,0,.12)", borderRadius: 12, padding: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
              <h2 style={{ fontSize: 18, margin: 0 }}>{t.title}</h2>
              <span style={{ opacity: 0.7 }}>{t.eta}</span>
            </div>

            <p style={{ marginTop: 8, marginBottom: 10, opacity: 0.9 }}>{t.desc}</p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {t.tags.map((tag) => (
                <span
                  key={tag}
                  style={{ fontSize: 12, padding: "4px 10px", borderRadius: 999, background: "rgba(0,0,0,.06)" }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
              <Link
                href={`/place/${t.slug}`}
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

              <button
                style={{
                  padding: "8px 10px",
                  borderRadius: 10,
                  border: "1px solid rgba(0,0,0,.18)",
                  cursor: "pointer",
                }}
              >
                Start
              </button>

              <button
                style={{
                  padding: "8px 10px",
                  borderRadius: 10,
                  border: "1px solid rgba(0,0,0,.18)",
                  cursor: "pointer",
                }}
              >
                Uložit
              </button>
            </div>
          </article>
        ))}
      </div>

      <footer style={{ marginTop: 24, opacity: 0.6, fontSize: 12 }}>
        Další krok: detail místa + “Podobné bez davů” + “Gastro poblíž”.
      </footer>
    </main>
  );
}
