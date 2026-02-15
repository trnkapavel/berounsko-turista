"use client";

import { useCallback, useEffect, useState } from "react";

const KEY = "bt_saved";

function readSaved(): string[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((x) => typeof x === "string");
  } catch {
    return [];
  }
}

function writeSaved(items: string[]) {
  localStorage.setItem(KEY, JSON.stringify(items));
}

export function useSaved() {
  const [saved, setSaved] = useState<string[]>([]);

  useEffect(() => {
    setSaved(readSaved());
  }, []);

  const isSaved = useCallback((slug: string) => saved.includes(slug), [saved]);

  const toggle = useCallback((slug: string) => {
    setSaved((prev) => {
      const exists = prev.includes(slug);
      const next = exists ? prev.filter((s) => s !== slug) : [slug, ...prev];
      writeSaved(next);
      return next;
    });
  }, []);

  return { saved, isSaved, toggle };
}
