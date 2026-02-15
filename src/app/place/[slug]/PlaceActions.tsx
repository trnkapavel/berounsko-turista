"use client";

import Link from "next/link";
import { SavedButton } from "@/components/SavedButton";
import { PlanButton } from "@/components/PlanButton";
import { usePlan } from "@/lib/usePlan";

export function PlaceActions({ slug, alternatives }: { slug: string; alternatives: string[] }) {
  const { add } = usePlan(4);

  const addAlternatives = () => {
    // přidáme 1–3 alternativy, plán má max 4 položky
    alternatives.slice(0, 3).forEach((s) => add(s));
  };

  return (
    <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
      <SavedButton slug={slug} variant="primary" />
      <PlanButton slug={slug} />

      <button
        onClick={addAlternatives}
        disabled={alternatives.length === 0}
        style={{
          padding: "8px 10px",
          borderRadius: 10,
          border: "1px solid rgba(0,0,0,.18)",
          cursor: "pointer",
          opacity: alternatives.length === 0 ? 0.5 : 1,
        }}
      >
        Přidat alternativy
      </button>

      <Link
        href="/plan"
        style={{
          display: "inline-block",
          padding: "8px 10px",
          borderRadius: 10,
          border: "1px solid rgba(0,0,0,.18)",
          textDecoration: "none",
          color: "inherit",
        }}
      >
        Plán dne
      </Link>

      <Link
        href="/nearby"
        style={{
          display: "inline-block",
          padding: "8px 10px",
          borderRadius: 10,
          border: "1px solid rgba(0,0,0,.18)",
          textDecoration: "none",
          color: "inherit",
        }}
      >
        Kolem mě
      </Link>
    </div>
  );
}
