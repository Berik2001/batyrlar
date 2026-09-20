"use client";

/**
 * Клиентский доступ к словарю: t("nav.home") и pick(localizedValue)
 * берут текущий язык из стора и обновляются при переключении.
 */
import { useCallback } from "react";
import { useApp } from "@/lib/store";
import { pick as pickRaw, t as tRaw } from "@/lib/i18n";
import type { Lang } from "@/data/batyrs";

export function useT() {
  const lang = useApp((s) => s.lang);

  const t = useCallback(
    (key: string, vars?: Record<string, string | number>) => tRaw(lang, key, vars),
    [lang],
  );

  const pick = useCallback(<T,>(value: Record<Lang, T>) => pickRaw(lang, value), [lang]);

  return { lang, t, pick };
}
