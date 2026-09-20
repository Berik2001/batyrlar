"use client";

/**
 * «Медиа»: галерея с фильтром по категориям и лайтбоксом.
 * Раскладка — masonry по колонкам, поэтому пустых клеток не бывает
 * при любом числе плиток.
 */
import { useMemo, useState, useEffect, useCallback } from "react";
import NextImage from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ARCS } from "@/data/arcs";
import { galleryVideos, videoEmbed, videoThumb, videoWatch, type Video } from "@/data/videos";
import { BATYRS, type Localized } from "@/data/batyrs";
import { useT } from "@/lib/use-t";
import { PageHero } from "@/components/ui";
import { lockScroll, unlockScroll } from "@/components/providers";
import { asset } from "@/lib/asset";

type Cat = "all" | "art" | "portrait" | "ornament" | "video";

interface Item {
  id: string;
  cat: Exclude<Cat, "all">;
  src: string;
  /** id ролика на YouTube: в лайтбоксе вместо картинки открывается плеер */
  youtubeId?: string;
  channel?: string;
  title: Localized;
  caption: Localized;
  href?: string;
}

const ORNAMENTS: Item[] = [
  {
    id: "koshkar",
    cat: "ornament",
    src: asset("/img/orn-koshkar.jpg"),
    title: { kk: "Қошқар мүйіз", ru: "Кошкар муйиз", en: "Qoshqar müiz" },
    caption: {
      kk: "Сырмаққа түскен қошқардың мүйізі — молшылық пен күштің белгісі",
      ru: "Бараньи рога на сырмаке — символ достатка и силы",
      en: "Ram's horns on a felt syrmaq — a symbol of abundance and strength",
    },
  },
  {
    id: "rosette",
    cat: "ornament",
    src: asset("/img/orn-rosette.jpg"),
    title: { kk: "Тұмар-розетка", ru: "Тумар и розетка", en: "Tumar and rosette" },
    caption: {
      kk: "Күміс тұмар мен дөңгелек түйме — бірлік пен қорғаныс белгісі",
      ru: "Серебряный тумар и круглая розетка — знак единства и защиты",
      en: "A silver tumar amulet and round rosette — a sign of unity and protection",
    },
  },
  {
    id: "kerege",
    cat: "ornament",
    src: asset("/img/orn-kerege.jpg"),
    title: { kk: "Кереге", ru: "Кереге", en: "Kerege" },
    caption: {
      kk: "Киіз үйдің торлы қабырғасы — шаңырақтың тірегі",
      ru: "Решётчатая стена юрты — опора дома",
      en: "The lattice wall of the yurt — the home's support",
    },
  },
  {
    id: "baskur",
    cat: "ornament",
    src: asset("/img/orn-band.jpg"),
    title: { kk: "Бау-басқұр", ru: "Тканый бау", en: "Woven baskur" },
    caption: {
      kk: "Киіз үйді буатын өрнекті бау — қошқар мүйіз тізбегі",
      ru: "Узорная лента, стягивающая юрту, — цепочка кошкар-муйиз",
      en: "The patterned band that binds the yurt — a chain of ram's horns",
    },
  },
];

/** Кадры степной жизни: дают галерее воздух между портретами и баннерами */
const DALA: Item[] = [
  {
    id: "dala-tan",
    cat: "art",
    src: asset("/img/dala-tan.jpg"),
    title: { kk: "Дала таңы", ru: "Рассвет в степи", en: "Dawn on the steppe" },
    caption: {
      kk: "Тұманды даладан таң сәріде шыққан жасақ",
      ru: "Отряд выходит в путь на рассвете",
      en: "A band sets out at first light",
    },
  },
  {
    id: "shanyraq",
    cat: "art",
    src: asset("/img/shanyraq.jpg"),
    title: { kk: "Шаңырақ", ru: "Шанырак", en: "Shanyraq" },
    caption: {
      kk: "Киіз үйдің төбесі — әр отбасының аспаны",
      ru: "Купол юрты — небо каждой семьи",
      en: "The yurt's crown — each family's own sky",
    },
  },
  {
    id: "zhyrau",
    cat: "art",
    src: asset("/img/zhyrau.jpg"),
    title: { kk: "Жырау", ru: "Жырау", en: "The zhyrau" },
    caption: {
      kk: "Батырлар жыры от басында домбырамен айтылады",
      ru: "Жыр о батырах звучит у огня под домбру",
      en: "The epic is sung by the fire to a dombyra",
    },
  },
  {
    id: "burkitshi",
    cat: "art",
    src: asset("/img/burkitshi.jpg"),
    title: { kk: "Бүркітші", ru: "Беркутчи", en: "The eagle hunter" },
    caption: {
      kk: "Қыстың даласында қолында бүркіті бар салбурын",
      ru: "Охотник с беркутом в зимней степи",
      en: "A hunter with his golden eagle in the winter steppe",
    },
  },
  {
    id: "tulpar",
    cat: "art",
    src: asset("/img/tulpar.jpg"),
    title: { kk: "Тұлпар", ru: "Тулпар", en: "Tulpar" },
    caption: {
      kk: "Батырдың сенімді серігі — жүйрік жылқы",
      ru: "Верный спутник батыра — быстрый конь",
      en: "The batyr's truest companion — a swift horse",
    },
  },
];

function buildItems(videos: Video[]): Item[] {
  const art: Item[] = [
    {
      id: "hero",
      cat: "art",
      src: asset("/img/hero.jpg"),
      title: { kk: "Дала күзетшісі", ru: "Страж степи", en: "Guardian of the Steppe" },
      caption: { kk: "Batyrlar.com басты бетінің арты", ru: "Главный арт Batyrlar.com", en: "Batyrlar.com key art" },
    },
    ...ARCS.map((arc) => ({
      id: `arc-${arc.id}`,
      cat: "art" as const,
      src: arc.image,
      title: arc.title,
      caption: arc.lead,
      href: `/history#${arc.id}`,
    })),
  ];

  // flatMap, а не filter+map: так TypeScript видит, что image точно есть
  const portraits: Item[] = BATYRS.flatMap((b) =>
    b.image
      ? [
          {
            id: `batyr-${b.id}`,
            cat: "portrait" as const,
            src: b.image,
            title: b.name,
            caption: b.epithet,
            href: `/batyrs/${b.id}`,
          },
        ]
      : [],
  );

  const videoItems: Item[] = galleryVideos(videos).map((v) => ({
    id: `video-${v.id}`,
    cat: "video" as const,
    src: videoThumb(v.id),
    youtubeId: v.id,
    channel: v.channel,
    title: { kk: v.title, ru: v.title, en: v.title },
    caption: { kk: v.channel, ru: v.channel, en: v.channel },
    href: videoWatch(v.id),
  }));

  // Чередуем категории, чтобы колонки выглядели живыми.
  // Очереди опустошаются через shift(), поэтому ORNAMENTS и DALA копируем —
  // иначе модульные массивы вычерпаются и при следующем маунте плиток не будет
  const mixed: Item[] = [];
  const queues = [art, portraits, [...ORNAMENTS], videoItems, [...DALA]];
  const pattern = [1, 3, 0, 4, 1, 2, 3, 1, 4, 1, 0, 3, 1, 2, 4, 1, 3];
  let p = 0;
  while (queues.some((q) => q.length)) {
    const qi = pattern[p++ % pattern.length];
    const queue = queues[qi].length ? queues[qi] : queues.find((q) => q.length);
    if (queue?.length) mixed.push(queue.shift()!);
  }
  return mixed;
}

export function MediaView({ videos }: { videos: Video[] }) {
  const { t, pick } = useT();
  const items = useMemo(() => buildItems(videos), [videos]);
  const [cat, setCat] = useState<Cat>("all");
  const [open, setOpen] = useState<number | null>(null);

  const visible = useMemo(() => items.filter((i) => cat === "all" || i.cat === cat), [items, cat]);
  const counts = {
    all: items.length,
    art: items.filter((i) => i.cat === "art").length,
    portrait: items.filter((i) => i.cat === "portrait").length,
    ornament: items.filter((i) => i.cat === "ornament").length,
    video: items.filter((i) => i.cat === "video").length,
  };

  const close = useCallback(() => setOpen(null), []);
  const move = useCallback(
    (delta: number) => setOpen((v) => (v === null ? v : (v + delta + visible.length) % visible.length)),
    [visible.length],
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

  const current = open === null ? null : visible[open];

  return (
    <>
      <PageHero eyebrow={t("page.media.eyebrow")} title={t("page.media.title")} lead={t("page.media.lead")} />

      <section className="container-page py-14">
        <div className="mb-8 flex flex-wrap gap-2">
          {(["all", "art", "portrait", "ornament", "video"] as const).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => {
                setCat(c);
                setOpen(null);
              }}
              aria-pressed={cat === c}
              className={`flex items-center gap-2 rounded-full border px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] transition-all ${
                cat === c
                  ? "border-transparent bg-[linear-gradient(135deg,#f2cf85_0%,#d6aa5c_45%,#a8782f_100%)] text-[#1a1208] shadow-[0_8px_24px_-12px_rgba(168,120,47,.9)]"
                  : "border-line bg-surface text-muted hover:border-gold hover:text-gold"
              }`}
            >
              {c === "all" ? t("filter.all") : t(`media.cat.${c}`)}
              <span className="opacity-70">{counts[c]}</span>
            </button>
          ))}
        </div>

        {/* Колоночная раскладка: плитки заполняют колонки без дыр */}
        <div className="columns-2 gap-4 lg:columns-3 xl:columns-4 [&>*]:mb-4">
          {visible.map((item, i) => (
            <motion.button
              key={item.id}
              type="button"
              layout
              onClick={() => setOpen(i)}
              whileHover={{ y: -4 }}
              className="group relative block w-full break-inside-avoid overflow-hidden rounded-[var(--radius-card)] border border-line shadow-[var(--shadow-card)]"
            >
              <NextImage
                src={item.src}
                alt={pick(item.title)}
                width={900}
                height={item.cat === "art" || item.cat === "video" ? 506 : item.cat === "ornament" ? 900 : 1200}
                sizes="(max-width: 700px) 50vw, (max-width: 1280px) 33vw, 25vw"
                className="w-full transition-transform duration-700 group-hover:scale-105"
              />
              {item.youtubeId && (
                <span className="absolute inset-0 grid place-items-center">
                  <span className="grid h-14 w-14 place-items-center rounded-full border border-[rgba(214,170,92,.6)] bg-[rgba(11,10,9,.55)] text-[#f2cf85] backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                    <svg viewBox="0 0 24 24" className="ml-0.5 h-6 w-6" fill="currentColor" aria-hidden="true">
                      <path d="M8 5.5v13l11-6.5z" />
                    </svg>
                  </span>
                </span>
              )}
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent px-4 pb-3.5 pt-10 text-left">
                <span className="block text-[0.64rem] font-bold uppercase tracking-[0.18em] text-[#d6aa5c]">
                  {t(`media.cat.${item.cat}`)}
                </span>
                <span className="mt-0.5 block font-display text-xl text-[#f4ede1]">{pick(item.title)}</span>
              </span>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Лайтбокс */}
      <AnimatePresence>
        {current && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={t("lightbox.label")}
            className="fixed inset-0 z-[60] flex flex-col bg-[rgba(8,7,6,.96)] backdrop-blur-sm"
            onClick={(e) => {
              if (e.target === e.currentTarget) close();
            }}
          >
            <div className="flex justify-end p-5">
              <button
                type="button"
                onClick={close}
                aria-label={t("lightbox.close")}
                className="grid h-11 w-11 place-items-center rounded-full border border-[rgba(214,170,92,.4)] text-[#f4ede1] hover:border-gold hover:text-gold"
              >
                ×
              </button>
            </div>

            <div className="flex flex-1 items-center justify-center gap-4 px-4 pb-4">
              <button
                type="button"
                onClick={() => move(-1)}
                aria-label={t("carousel.prev")}
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[rgba(214,170,92,.4)] text-[#f4ede1] hover:border-gold hover:text-gold"
              >
                ←
              </button>

              <motion.div
                key={current.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25 }}
                className="relative max-h-[70vh] w-full max-w-4xl"
              >
                {current.youtubeId ? (
                  <div className="mx-auto aspect-video w-full overflow-hidden rounded-[var(--radius-card)] bg-black">
                    <iframe
                      src={videoEmbed(current.youtubeId)}
                      title={pick(current.title)}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="h-full w-full"
                    />
                  </div>
                ) : (
                  <NextImage
                    src={current.src}
                    alt={pick(current.title)}
                    width={1600}
                    height={1200}
                    className="mx-auto max-h-[70vh] w-auto rounded-[var(--radius-card)] object-contain"
                  />
                )}
              </motion.div>

              <button
                type="button"
                onClick={() => move(1)}
                aria-label={t("carousel.next")}
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[rgba(214,170,92,.4)] text-[#f4ede1] hover:border-gold hover:text-gold"
              >
                →
              </button>
            </div>

            <div className="px-6 pb-10 text-center">
              <p className="text-[0.66rem] font-bold uppercase tracking-[0.18em] text-[#d6aa5c]">
                {t(`media.cat.${current.cat}`)} · {(open ?? 0) + 1} / {visible.length}
              </p>
              <p className="mt-1 font-display text-2xl text-[#f4ede1]">{pick(current.title)}</p>
              <p className="mt-1 text-[#b3a893]">{pick(current.caption)}</p>
              {current.href &&
                (current.youtubeId ? (
                  <a
                    href={current.href}
                    target="_blank"
                    rel="noreferrer"
                    className="eyebrow mt-3 inline-block"
                  >
                    {t("media.watchOnYoutube")} →
                  </a>
                ) : (
                  <Link href={current.href} className="eyebrow mt-3 inline-block" onClick={close}>
                    {t("spot.cta")} →
                  </Link>
                ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
