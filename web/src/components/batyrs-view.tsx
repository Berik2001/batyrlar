"use client";

/**
 * Каталог: фильтр по типу и поиск по имени. Состояние живёт в URL (?type=&q=),
 * поэтому ссылку можно переслать. Поиск складывает казахские буквы к русским,
 * чтобы «кабанбай» находил «Қабанбай».
 */
import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { BATYRS, type Batyr, type BatyrType } from "@/data/batyrs";
import { useT } from "@/lib/use-t";
import { BatyrCard, PageHero, Reveal } from "@/components/ui";

const FOLD: Record<string, string> = {
  ә: "а", ғ: "г", қ: "к", ң: "н", ө: "о", ұ: "у", ү: "у", һ: "х", і: "и",
};

const normalize = (s: string) =>
  s.toLowerCase().replace(/[әғқңөұүһі]/g, (c) => FOLD[c] ?? c);

const searchIndex = (b: Batyr) =>
  normalize([b.name.kk, b.name.ru, b.name.en, b.epithet.kk, b.epithet.ru, b.epithet.en].join(" "));

type Filter = "all" | BatyrType;

export function BatyrsView() {
  const { t } = useT();
  const router = useRouter();
  const params = useSearchParams();
  const [, startTransition] = useTransition();

  const typeParam = params.get("type");
  const type: Filter = typeParam === "epic" || typeParam === "historical" ? typeParam : "all";
  const [query, setQuery] = useState(params.get("q") ?? "");

  const sync = (next: { type?: Filter; q?: string }) => {
    const p = new URLSearchParams(params.toString());
    const nextType = next.type ?? type;
    const nextQuery = next.q ?? query;
    if (nextType === "all") p.delete("type");
    else p.set("type", nextType);
    if (nextQuery) p.set("q", nextQuery);
    else p.delete("q");
    startTransition(() => router.replace(`/batyrs${p.size ? `?${p}` : ""}`, { scroll: false }));
  };

  // Мемоизацию берёт на себя React Compiler — список короткий, считаем прямо в рендере
  const q = normalize(query.trim());
  const results = BATYRS.filter((b) => type === "all" || b.type === type).filter(
    (b) => !q || searchIndex(b).includes(q),
  );

  const counts = {
    all: BATYRS.length,
    epic: BATYRS.filter((b) => b.type === "epic").length,
    historical: BATYRS.filter((b) => b.type === "historical").length,
  };

  const filters: Filter[] = ["all", "epic", "historical"];

  return (
    <>
      <PageHero
        eyebrow={t("page.batyrs.eyebrow")}
        title={t("page.batyrs.title")}
        lead={t("page.batyrs.lead")}
      />

      <section className="container-page pb-24">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2" role="group" aria-label={t("filter.label")}>
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => sync({ type: f })}
                aria-pressed={type === f}
                className={`flex items-center gap-2 rounded-full border px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] transition-all ${
                  type === f
                    ? "border-transparent bg-[linear-gradient(135deg,#f2cf85_0%,#d6aa5c_45%,#a8782f_100%)] text-[#1a1208] shadow-[0_8px_24px_-12px_rgba(168,120,47,.9)]"
                    : "border-line bg-surface text-muted hover:border-gold hover:text-gold"
                }`}
              >
                {f === "all" ? t("filter.all") : t(`type.${f}Plural`)}
                <span className="opacity-70">{counts[f]}</span>
              </button>
            ))}
          </div>

          <label className="relative w-full max-w-sm">
            <span className="sr-only">{t("search.label")}</span>
            <svg
              viewBox="0 0 24 24"
              className="pointer-events-none absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-dim"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3.5-3.5" />
            </svg>
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                sync({ q: e.target.value });
              }}
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  setQuery("");
                  sync({ q: "" });
                }
              }}
              placeholder={t("search.placeholder")}
              className="w-full rounded-full border border-line bg-surface py-3 pl-12 pr-11 text-ink placeholder:text-dim focus:border-gold focus:outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  sync({ q: "" });
                }}
                aria-label={t("search.clear")}
                className="absolute right-4 top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center rounded-full text-dim hover:text-gold"
              >
                ×
              </button>
            )}
          </label>
        </div>

        <p className="eyebrow mb-5">{t("results.count", { n: results.length })}</p>

        {results.length > 0 ? (
          <motion.div layout className="grid grid-cols-2 gap-5 lg:grid-cols-4">
            {results.map((b, i) => (
              <Reveal key={b.id} delay={Math.min(i, 7) * 0.05}>
                <BatyrCard batyr={b} priority={i < 4} />
              </Reveal>
            ))}
          </motion.div>
        ) : (
          <div className="rounded-[var(--radius-card)] border border-line bg-surface p-14 text-center">
            <p className="font-display text-3xl text-ink">{t("results.empty")}</p>
            <p className="mt-2 text-muted">{t("results.emptyHint")}</p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                sync({ type: "all", q: "" });
              }}
              className="mt-6 rounded-full border border-line-strong px-6 py-3 text-xs font-bold uppercase tracking-[0.16em] text-ink hover:border-gold hover:text-gold"
            >
              {t("results.reset")}
            </button>
          </div>
        )}
      </section>
    </>
  );
}
