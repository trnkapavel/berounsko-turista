"use client";

import { useSaved } from "@/lib/useSaved";
import { SavedButton } from "@/components/SavedButton";

export function SavedButton({
  slug,
  variant = "secondary",
}: {
  slug: string;
  variant?: "primary" | "secondary";
}) {
  const { isSaved, toggle } = useSaved();
  const active = isSaved(slug);

  const base: React.CSSProperties = {
    padding: "8px 10px",
    borderRadius: 10,
    border: "1px solid rgba(0,0,0,.18)",
    cursor: "pointer",
  };

  const style: React.CSSProperties =
    variant === "primary"
      ? {
          ...base,
          background: active ? "rgba(0,0,0,.08)" : "rgba(0,0,0,.04)",
        }
      : {
          ...base,
          background: active ? "rgba(0,0,0,.06)" : "transparent",
        };

  return (
    <SavedButton slug={t.slug} />
  );
}
