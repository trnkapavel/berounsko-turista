"use client";

import { usePlan } from "@/lib/usePlan";

export function PlanButton({ slug }: { slug: string }) {
  const { has, add, remove } = usePlan(4);
  const active = has(slug);

  return (
    <button
      onClick={() => (active ? remove(slug) : add(slug))}
      style={{
        padding: "8px 10px",
        borderRadius: 10,
        border: "1px solid rgba(0,0,0,.18)",
        cursor: "pointer",
        background: active ? "rgba(0,0,0,.06)" : "transparent",
      }}
    >
      {active ? "V plánu" : "Přidat do plánu"}
    </button>
  );
}
