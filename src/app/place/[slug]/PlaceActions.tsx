"use client";

import Link from "next/link";
import { SavedButton } from "@/components/SavedButton";

export function PlaceActions({ slug }: { slug: string }) {
  return (
    <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
      <SavedButton slug={slug} variant="primary" />
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
