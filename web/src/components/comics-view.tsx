"use client";

/**
 * «Комикс»: сюжет жыра кадрами. Кадры читаются сверху вниз,
 * клик открывает кадр во весь экран — как разворот.
 */
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import NextImage from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { COMICS } from "@/data/comics";
import { getBatyr } from "@/data/batyrs";
import { useT } from "@/lib/use-t";
import { KoshkarOrnament, PageHero, Reveal } from "@/components/ui";
import { lockScroll, unlockScroll } from "@/components/providers";

export function ComicsView() {
  const { t, pick } = useT();
  const [open, setOpen] = useState<{ comic: number; panel: number } | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const move = useCallback(
    (delta: number) =>
      setOpen((v) => {
        if (!v) return v;
        const panels = COMICS[v.comic].panels.length;
        return { ...v, panel: (v.panel + delta + panels) % panels };
      }),
    [],
  );

  useEffect(() => {
    if (open === null) {
      unlockScroll();
      return;
    }
    lockScroll();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") move(-1);
      if (e.key === "ArrowRight") move(1);
    };
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [open, close, move]);

  const shown = open ? COMICS[open.comic].panels[open.panel] : null;

  return (
    <>
      <PageHero section="comics" eyebrow={t("page.comics.eyebrow")} title={t("page.comics.title")} lead={t("page.comics.lead")} />

      {/* Комиксов стало несколько — даём переход сразу к нужному */}
      <nav className="container-page flex flex-wrap gap-3 pt-10" aria-label="comics">
        {COMICS.map((comic) => (
          <a
            key={comic.id}
            href={`#${comic.id}`}
            className="rounded-full border border-line bg-surface px-5 py-2 text-sm text-muted transition-colors hover:border-gold hover:text-gold"
          >
            {pick(comic.title)}
          </a>
        ))}
      </nav>

      {COMICS.map((comic, comicIndex) => {
        const batyr = getBatyr(comic.batyr);
        return (
          <section key={comic.id} id={comic.id} className="container-page scroll-mt-24 py-16">
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-5">
                <div>
                  <p className="eyebrow flex items-center gap-3">
                    <span className="h-px w-8 bg-gold" />
                    {comic.panels.length} {t("comics.panels")}
                  </p>
                  <h2 className="mt-3 text-h2">{pick(comic.title)}</h2>
                  <p className="mt-3 max-w-2xl text-lead text-muted">{pick(comic.lead)}</p>
                </div>
                {batyr && (
                  <Link href={`/batyrs/${batyr.id}`} className="eyebrow text-gold">
                    {t("comics.about")}: {pick(batyr.name)} →
                  </Link>
                )}
              </div>
            </Reveal>

            <div className="mt-10 grid gap-7 md:grid-cols-2">
              {comic.panels.map((panel, panelIndex) => (
                <Reveal key={panel.src} delay={panelIndex * 0.06}>
                  <figure className="group h-full overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-lift)]">
                    <button
                      type="button"
                      onClick={() => setOpen({ comic: comicIndex, panel: panelIndex })}
                      className="relative block aspect-3/2 w-full cursor-pointer overflow-hidden"
                      aria-label={`${pick(comic.title)} — ${panelIndex + 1}`}
                    >
                      <NextImage
                        src={panel.src}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                      <span className="absolute left-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-[rgba(214,170,92,.7)] bg-[rgba(7,14,24,.7)] font-display text-lg text-[#f2cf85]">
                        {panelIndex + 1}
                      </span>
                    </button>
                    <figcaption className="p-6 text-muted">{pick(panel.caption)}</figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>

            <p className="mt-8 flex items-center gap-3 text-sm text-dim">
              <KoshkarOrnament className="h-5 w-6 text-gold" />
              {t("comics.note")}
            </p>
          </section>
        );
      })}

      <p className="container-page pb-20 text-dim">{t("comics.more")}</p>

      {/* Кадр во весь экран */}
      <AnimatePresence>
        {shown && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-50 grid place-items-center bg-[rgb(var(--bg-rgb)/.96)] p-4 md:p-10"
          >
            <motion.figure
              initial={{ scale: 0.97, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.97, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-full w-full max-w-5xl overflow-y-auto"
            >
              <div className="relative aspect-3/2 w-full overflow-hidden rounded-[var(--radius-card)]">
                <NextImage src={shown.src} alt="" fill sizes="100vw" className="object-contain" />
              </div>
              <figcaption className="mx-auto mt-5 max-w-3xl text-center text-muted">{pick(shown.caption)}</figcaption>
              <div className="mt-6 flex items-center justify-center gap-6">
                <button type="button" onClick={() => move(-1)} className="eyebrow cursor-pointer text-gold">
                  ←
                </button>
                <button type="button" onClick={close} className="eyebrow cursor-pointer text-muted">
                  Esc
                </button>
                <button type="button" onClick={() => move(1)} className="eyebrow cursor-pointer text-gold">
                  →
                </button>
              </div>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
