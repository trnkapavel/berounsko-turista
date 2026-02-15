type Profile = "rodina" | "par" | "cyklo" | "hiking" | "en";

const TIPS: Record<Profile, { title: string; tags: string[]; desc: string; eta: string }[]> = {
  rodina: [
    { title: "Quest na 60–90 min", tags: ["děti", "hravé", "krátké"], desc: "Hledačka, která udrží tempo a pozornost.", eta: "do 20 min" },
    { title: "Za zvířátky + hřiště", tags: ["rodina", "outdoor", "pohoda"], desc: "Bez stresu, jasný cíl a pauzy.", eta: "do 30 min" },
  ],
  par: [
    { title: "Klidná vyhlídka", tags: ["klid", "výhled", "půlden"], desc: "Míň lidí, víc atmosféry.", eta: "do 35 min" },
    { title: "Káva + kultura", tags: ["indoor", "kavárna", "galerie"], desc: "Když chcete plán bez náhody.", eta: "v okolí" },
  ],
  cyklo: [
    { title: "Okruh na kole", tags: ["kolo", "střední", "výhled"], desc: "Plynulá trasa s jedním silným highlightem.", eta: "start poblíž" },
    { title: "Naučná stezka po cestě", tags: ["kolo", "lehké", "zastávky"], desc: "Ideální jako doplněk k delší trase.", eta: "do 15 min" },
  ],
  hiking: [
    { title: "Půldenní hřebenovka", tags: ["hiking", "klid", "příroda"], desc: "Trasa, kde si člověk srovná myšlenky.", eta: "do 40 min" },
    { title: "Tiché místo mimo magnety", tags: ["méně známé", "klid", "les"], desc: "Alternativa k přetíženým ikonám.", eta: "do 25 min" },
  ],
  en: [
    { title: "Easy walk with a viewpoint", tags: ["easy", "view", "half-day"], desc: "Simple plan, low friction.", eta: "up to 35 min" },
    { title: "Rainy day indoor pick", tags: ["indoor", "museum", "cafe"], desc: "Good even when weather turns.", eta: "nearby" },
  ],
};

export default function Home() {
  const profile: Profile = "rodina"; // zatím natvrdo, příště uděláme přepínač + localStorage
  const tips = TIPS[profile];

  return (
    <main style={{ maxWidth: 920, margin: "0 auto", padding: 24 }}>
      <header style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "baseline" }}>
        <div>
          <h1 style={{ fontSize: 28, margin: 0 }}>Dnes se hodí</h1>
          <p style={{ opacity: 0.75, marginTop: 6 }}>
            Profil: <b>{profile}</b> • MVP bez databáze (zatím)
          </p>
        </div>
        <a href="#" style={{ opacity: 0.8 }}>Uložené</a>
      </header>

      <section style={{ marginTop: 18, padding: 12, border: "1px solid rgba(0,0,0,.12)", borderRadius: 12 }}>
        <p style={{ margin: 0, opacity: 0.8 }}>
          Cíl: odlehčit přetíženým místům tím, že vždy nabídneme kvalitní alternativu “stejný zážitek, méně lidí”.
        </p>
      </section>

      <div style={{ display: "grid", gap: 12, marginTop: 18 }}>
        {tips.map((t) => (
          <article key={t.title} style={{ border: "1px solid rgba(0,0,0,.12)", borderRadius: 12, padding: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
              <h2 style={{ fontSize: 18, margin: 0 }}>{t.title}</h2>
              <span style={{ opacity: 0.7 }}>{t.eta}</span>
            </div>
            <p style={{ marginTop: 8, marginBottom: 10, opacity: 0.9 }}>{t.desc}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {t.tags.map((tag) => (
                <span key={tag} style={{ fontSize: 12, padding: "4px 10px", borderRadius: 999, background: "rgba(0,0,0,.06)" }}>
                  {tag}
                </span>
              ))}
            </div>

            <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
              <button style={{ padding: "8px 10px", borderRadius: 10, border: "1px solid rgba(0,0,0,.18)" }}>Detail</button>
              <button style={{ padding: "8px 10px", borderRadius: 10, border: "1px solid rgba(0,0,0,.18)" }}>Start</button>
              <button style={{ padding: "8px 10px", borderRadius: 10, border: "1px solid rgba(0,0,0,.18)" }}>Uložit</button>
            </div>
          </article>
        ))}
      </div>

      <footer style={{ marginTop: 24, opacity: 0.6, fontSize: 12 }}>
        Další krok: profil přepínač + “Kolem mě” + detail místa s alternativami.
      </footer>
    </main>
  );
}
