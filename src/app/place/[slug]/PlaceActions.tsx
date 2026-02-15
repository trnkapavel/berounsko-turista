"use client";

import Link from "next/link";
import { SavedButton } from "@/components/SavedButton";
import { PlanButton } from "@/components/PlanButton";

export function PlaceActions({ slug }: { slug: string }) {
  return (
    <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
      <SavedButton slug={slug} variant="primary" />
      <PlanButton slug={slug} />
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
