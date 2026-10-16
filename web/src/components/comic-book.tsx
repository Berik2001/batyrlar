"use client";

/**
 * Комикс в виде книги: твёрдая обложка, листы переворачиваются с изгибом
 * и тенью (StPageFlip, MIT). На широком экране — разворот из двух страниц,
 * на телефоне — по одной.
 *
 * StPageFlip сам переносит страницы в свою разметку и удаляет её при
 * destroy(). Чтобы не спорить с React за DOM, React рисует страницы в
 * скрытый «макет», а книга собирается из их копий в отдельном узле,
 * которым React не владеет. Смена языка пересоздаёт книгу (key снаружи).
 */
/* eslint-disable @next/next/no-img-element -- страницы копируются в DOM книги, next/image тут не нужен */
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { getBatyr } from "@/data/batyrs";
import type { Comic } from "@/data/comics";
import { useT } from "@/lib/use-t";
import { asset } from "@/lib/asset";
import { KoshkarOrnament } from "@/components/ui";

type Flip = {
  flipNext: () => void;
  flipPrev: () => void;
  flip: (page: number) => void;
  getPageCount: () => number;
  getOrientation: () => "portrait" | "landscape";
  on: {
    (event: "flip", cb: (e: { data: number }) => void): void;
    (event: "changeOrientation", cb: (e: { data: string }) => void): void;
  };
  destroy: () => void;
};

/** Пропорции страницы — как у школьного учебника */
const PAGE_W = 540;
const PAGE_H = 720;

const paper =
  "bg-[#f7f0e2] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,.55),transparent_70%)] text-[#2a2117]";

export function ComicBook({ comic, onClose }: { comic: Comic; onClose: () => void }) {
  const { t, pick } = useT();
  const source = useRef<HTMLDivElement>(null);
  const host = useRef<HTMLDivElement>(null);
  const book = useRef<Flip | null>(null);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [spread, setSpread] = useState(false);
  const batyr = getBatyr(comic.batyr);

  // Обложка + титул + кадры (+ «Соңы» для чётности) + задняя обложка
  const withEnd = (comic.panels.length + 3) % 2 === 1;

  useEffect(() => {
    if (!source.current || !host.current) return;
    let cancelled = false;
    const block = document.createElement("div");
    host.current.appendChild(block);
    const pages = [...source.current.children].map((el) => el.cloneNode(true) as HTMLElement);

    import("page-flip").then(({ PageFlip }) => {
      if (cancelled) return;
      const flip = new PageFlip(block, {
        width: PAGE_W,
        height: PAGE_H,
        size: "stretch",
        minWidth: 240,
        maxWidth: PAGE_W,
        minHeight: 320,
        maxHeight: PAGE_H,
        showCover: true,
        maxShadowOpacity: 0.5,
        flippingTime: 900,
        mobileScrollSupport: false,
      }) as unknown as Flip & { loadFromHTML: (items: HTMLElement[]) => void };
      flip.loadFromHTML(pages);
      flip.on("flip", (e) => setPage(e.data));
      flip.on("changeOrientation", (e) => setSpread(e.data === "landscape"));
      setSpread(flip.getOrientation() === "landscape");
      book.current = flip;
      setTotal(flip.getPageCount());
      // Книга появляется закрытой и сама открывает обложку
      setTimeout(() => !cancelled && flip.flipNext(), 650);
    });

    return () => {
      cancelled = true;
      book.current?.destroy();
      book.current = null;
      block.remove();
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") book.current?.flipNext();
      if (e.key === "ArrowLeft") book.current?.flipPrev();
    };
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [onClose]);

  // На развороте видны две страницы — показываем обе, кроме обложек
  const shownPage =
    spread && page > 0 && page < total - 1 ? `${page + 1}–${page + 2}` : String(Math.min(page + 1, total));

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[radial-gradient(ellipse_at_center,#13263c_0%,#060d18_75%)] px-3 py-4"
      onClick={onClose}
    >
      {/* Верхняя полоса: название и закрыть */}
      <div className="mb-3 flex w-full max-w-[1100px] items-center justify-between gap-4" onClick={(e) => e.stopPropagation()}>
        <p className="truncate font-display text-2xl text-[#f2cf85]">{pick(comic.title)}</p>
        <button
          type="button"
          onClick={onClose}
          className="shrink-0 cursor-pointer rounded-full border border-white/25 px-5 py-2 text-sm text-white/85 transition-colors hover:border-[#f2cf85] hover:text-[#f2cf85]"
        >
          {t("comics.close")} ✕
        </button>
      </div>

      {/* Книга: ширина ограничена и экраном, и высотой (разворот 3:2, страница 3:4) */}
      <div
        ref={host}
        onClick={(e) => e.stopPropagation()}
        className="w-[min(1100px,94vw,calc((100svh-170px)*1.5))] max-sm:w-[min(94vw,calc((100svh-190px)*.75))] [filter:drop-shadow(0_30px_40px_rgba(0,0,0,.6))]"
      />

      {/* Управление */}
      <div className="mt-4 flex items-center gap-4" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          onClick={() => book.current?.flipPrev()}
          aria-label="←"
          className="grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-white/25 text-white transition-colors hover:bg-[#f2cf85] hover:text-[#1a1208]"
        >
          ←
        </button>
        <span className="min-w-24 text-center text-sm tabular-nums text-white/70">
          {total ? `${shownPage} / ${total}` : "…"}
        </span>
        <button
          type="button"
          onClick={() => book.current?.flipNext()}
          aria-label="→"
          className="grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-white/25 text-white transition-colors hover:bg-[#f2cf85] hover:text-[#1a1208]"
        >
          →
        </button>
      </div>
      <p className="mt-2 hidden text-xs text-white/45 sm:block">{t("comics.hint")}</p>

      {/* Макет страниц: отсюда книга берёт копии */}
      <div ref={source} hidden>
        {/* Обложка */}
        <div data-density="hard" className="overflow-hidden rounded-r-md bg-[linear-gradient(135deg,#1d3a5f_0%,#0b1626_100%)]">
          <div className="flex h-full flex-col items-center p-[7%] text-center">
            <div className="flex h-full w-full flex-col items-center rounded-md border-2 border-[#d6aa5c]/70 p-[6%] outline outline-1 outline-offset-4 outline-[#d6aa5c]/40">
              <p className="text-[clamp(.55rem,1.4vw,.75rem)] font-bold uppercase tracking-[0.3em] text-[#f2cf85]">
                Batyrlar · {t("nav.comics")}
              </p>
              <h2 className="mt-[6%] font-display text-[clamp(1.4rem,4vw,2.6rem)] font-bold leading-none text-[#f2cf85]">
                {pick(comic.title)}
              </h2>
              <div className="relative mt-[7%] w-full flex-1 overflow-hidden rounded border-2 border-[#d6aa5c]/80">
                <img src={comic.panels[0].src} alt="" className="absolute inset-0 h-full w-full object-cover" />
              </div>
              <svg viewBox="0 0 120 100" className="mt-[6%] h-[8%] text-[#d6aa5c]" fill="none" aria-hidden="true">
                <g stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                  <path d="M60 92V54c0-18 12-30 26-30 12 0 20 10 20 20s-8 18-16 18c-6 0-12-4-12-11 0-5 4-9 9-9" />
                  <path d="M60 54c0-18-12-30-26-30-12 0-20 10-20 20s8 18 16 18c6 0 12-4 12-11 0-5-4-9-9-9" />
                </g>
              </svg>
            </div>
          </div>
        </div>

        {/* Титул */}
        <div className={paper}>
          <div className="flex h-full flex-col items-center justify-center p-[12%] text-center">
            <p className="text-[clamp(.55rem,1.3vw,.72rem)] font-bold uppercase tracking-[0.3em] text-[#a2701d]">
              {comic.panels.length} {t("comics.panels")}
            </p>
            <h3 className="mt-4 font-display text-[clamp(1.5rem,3.6vw,2.4rem)] font-bold leading-tight">{pick(comic.title)}</h3>
            <span className="my-5 block h-1 w-16 rounded-full bg-[#c8342c]" />
            <p className="font-display text-[clamp(.95rem,1.9vw,1.25rem)] italic leading-snug text-[#5c5043]">{pick(comic.lead)}</p>
            <p className="mt-auto text-[clamp(.5rem,1.1vw,.68rem)] text-[#8c7f6d]">{t("comics.note")}</p>
          </div>
        </div>

        {/* Кадры */}
        {comic.panels.map((panel, i) => (
          <div key={panel.src} className={paper}>
            <div className="flex h-full flex-col p-[7%]">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm border-[3px] border-[#2a2117] shadow-[4px_4px_0_#2a2117]">
                <img src={panel.src} alt="" className="absolute inset-0 h-full w-full object-cover" />
              </div>
              <p className="mt-[8%] font-display text-[clamp(1rem,2.2vw,1.55rem)] leading-snug first-letter:float-left first-letter:mr-2 first-letter:mt-1 first-letter:font-bold first-letter:text-[2.6em] first-letter:leading-[.8] first-letter:text-[#a3202a]">
                {pick(panel.caption)}
              </p>
              <p className="mt-auto flex items-center justify-between border-t border-[#2a2117]/15 pt-2 text-[clamp(.5rem,1.1vw,.7rem)] uppercase tracking-[0.2em] text-[#8c7f6d]">
                <span>{pick(comic.title)}</span>
                <span className="tabular-nums">{i + 1}</span>
              </p>
            </div>
          </div>
        ))}

        {/* «Соңы» — только чтобы задняя обложка легла отдельно */}
        {withEnd && (
          <div className={paper}>
            <div className="flex h-full flex-col items-center justify-center p-[12%] text-center">
              <KoshkarOrnament className="h-14 w-16 text-[#a2701d]" />
              <p className="mt-5 font-display text-[clamp(1.6rem,3.6vw,2.6rem)] font-bold">{t("comics.end")}</p>
              {batyr && (
                <Link href={`/batyrs/${batyr.id}`} className="mt-5 text-[clamp(.7rem,1.4vw,.9rem)] font-semibold text-[#a2701d] underline">
                  {t("comics.about")}: {pick(batyr.name)} →
                </Link>
              )}
            </div>
          </div>
        )}

        {/* Задняя обложка */}
        <div data-density="hard" className="overflow-hidden rounded-l-md bg-[linear-gradient(225deg,#1d3a5f_0%,#0b1626_100%)]">
          <div className="flex h-full flex-col items-center justify-center gap-4 p-[10%] text-center">
            <img src={asset("/icon.svg")} alt="" className="h-14 w-14 opacity-90" />
            <p className="font-display text-xl tracking-[0.2em] text-[#f2cf85]">BATYRLAR</p>
          </div>
        </div>
      </div>
    </div>
  );
}
