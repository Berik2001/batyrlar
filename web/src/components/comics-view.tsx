"use client";

/**
 * «Комикс»: каждый сюжет — отдельная книжка. На странице видна обложка
 * с корешком; по клику книга открывается во весь экран и листается
 * (см. comic-book.tsx).
 */
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import NextImage from "next/image";
import { COMICS } from "@/data/comics";
import { getBatyr } from "@/data/batyrs";
import { useT } from "@/lib/use-t";
import { KoshkarOrnament, PageHero, Reveal } from "@/components/ui";
import { ComicBook } from "@/components/comic-book";
import { lockScroll, unlockScroll } from "@/components/providers";

export function ComicsView() {
  const { t, pick, lang } = useT();
  const [open, setOpen] = useState<number | null>(null);
  const close = useCallback(() => setOpen(null), []);

  useEffect(() => {
    if (open === null) return;
    lockScroll();
    return () => unlockScroll();
  }, [open]);

  return (
    <>
      <PageHero section="comics" eyebrow={t("page.comics.eyebrow")} title={t("page.comics.title")} lead={t("page.comics.lead")} />

      <section className="container-page py-16">
        <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {COMICS.map((comic, i) => {
            const batyr = getBatyr(comic.batyr);
            return (
              <Reveal key={comic.id} delay={(i % 3) * 0.08}>
                <article id={comic.id} className="scroll-mt-24">
                  {/* Обложка книги с корешком, при наведении приоткрывается */}
                  <button
                    type="button"
                    onClick={() => setOpen(i)}
                    aria-label={`${t("comics.open")}: ${pick(comic.title)}`}
                    className="group block w-full cursor-pointer [perspective:1400px]"
                  >
                    <div className="relative mx-auto aspect-[3/4] w-[86%] transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] [transform-style:preserve-3d] [transform:rotateY(-14deg)] group-hover:[transform:rotateY(-26deg)_translateX(-4%)]">
                      {/* Страницы, торчащие сбоку */}
                      <span className="absolute inset-y-[2%] right-[-3%] w-[6%] rounded-r-sm bg-[repeating-linear-gradient(90deg,#efe6d4_0_2px,#d9cdb5_2px_3px)]" />
                      <div className="absolute inset-0 overflow-hidden rounded-r-lg rounded-l-sm bg-[linear-gradient(135deg,#1d3a5f_0%,#0b1626_100%)] p-[7%] shadow-[18px_24px_40px_-14px_rgba(0,0,0,.85)]">
                        <span className="absolute inset-y-0 left-0 w-[7%] bg-[linear-gradient(90deg,rgba(0,0,0,.45),rgba(255,255,255,.08)_60%,transparent)]" />
                        <div className="relative flex h-full flex-col items-center rounded border-2 border-[#d6aa5c]/70 p-[6%] text-center">
                          <p className="text-[0.6rem] font-bold uppercase tracking-[0.3em] text-[#f2cf85]">{t("nav.comics")}</p>
                          <h2 className="mt-2 font-display text-[clamp(1.4rem,2.4vw,1.9rem)] font-bold leading-none text-[#f2cf85]">
                            {pick(comic.title)}
                          </h2>
                          <div className="relative mt-4 w-full flex-1 overflow-hidden rounded-sm border-2 border-[#d6aa5c]/80">
                            <NextImage
                              src={comic.panels[0].src}
                              alt=""
                              fill
                              sizes="(max-width: 640px) 80vw, 340px"
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                          </div>
                          <KoshkarOrnament className="mt-3 h-6 w-8 text-[#d6aa5c]" />
                        </div>
                      </div>
                    </div>
                  </button>

                  <div className="mt-8 text-center">
                    <p className="eyebrow">
                      {comic.panels.length} {t("comics.panels")}
                    </p>
                    <p className="mx-auto mt-2 max-w-sm text-muted">{pick(comic.lead)}</p>
                    <div className="mt-5 flex flex-wrap items-center justify-center gap-4">
                      <button
                        type="button"
                        onClick={() => setOpen(i)}
                        className="cursor-pointer rounded-full [background-image:linear-gradient(180deg,#ffd978_0%,#f0b63f_55%,#d2902a_100%)] px-7 py-3 text-sm font-bold text-[#2a1b05] shadow-[0_12px_28px_-12px_rgba(0,0,0,.7)] transition-transform hover:scale-[1.04]"
                      >
                        📖 {t("comics.open")}
                      </button>
                      {batyr && (
                        <Link href={`/batyrs/${batyr.id}`} className="text-sm text-dim hover:text-gold">
                          {pick(batyr.name)} →
                        </Link>
                      )}
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <p className="mt-16 flex items-center justify-center gap-3 text-center text-sm text-dim">
          <KoshkarOrnament className="h-5 w-6 text-gold" />
          {t("comics.note")}
        </p>
      </section>

      {open !== null && <ComicBook key={`${COMICS[open].id}-${lang}`} comic={COMICS[open]} onClose={close} />}
    </>
  );
}
