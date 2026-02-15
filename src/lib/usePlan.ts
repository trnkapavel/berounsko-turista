"use client";

import { useCallback, useEffect, useState } from "react";

const KEY = "bt_plan";

type PlanItem = { slug: string; addedAt: number };

function readPlan(): PlanItem[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((x) => x && typeof x.slug === "string")
      .map((x) => ({ slug: x.slug, addedAt: typeof x.addedAt === "number" ? x.addedAt : Date.now() }));
  } catch {
    return [];
  }
}

function writePlan(items: PlanItem[]) {
  localStorage.setItem(KEY, JSON.stringify(items));
}

export function usePlan(maxItems = 4) {
  const [plan, setPlan] = useState<PlanItem[]>([]);

  useEffect(() => {
    setPlan(readPlan());
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY) setPlan(readPlan());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const has = useCallback((slug: string) => plan.some((p) => p.slug === slug), [plan]);

  const add = useCallback(
    (slug: string) => {
      setPlan((prev) => {
        if (prev.some((p) => p.slug === slug)) return prev;
        const next = [{ slug, addedAt: Date.now() }, ...prev].slice(0, maxItems);
        writePlan(next);
        return next;
      });
    },
    [maxItems]
  );

  const remove = useCallback((slug: string) => {
    setPlan((prev) => {
      const next = prev.filter((p) => p.slug !== slug);
      writePlan(next);
      return next;
    });
  }, []);

  const clear = useCallback(() => {
    setPlan([]);
    writePlan([]);
  }, []);

  const moveUp = useCallback((slug: string) => {
    setPlan((prev) => {
      const i = prev.findIndex((p) => p.slug === slug);
      if (i <= 0) return prev;
      const next = [...prev];
      [next[i - 1], next[i]] = [next[i], next[i - 1]];
      writePlan(next);
      return next;
    });
  }, []);

  return { plan, has, add, remove, clear, moveUp };
}
