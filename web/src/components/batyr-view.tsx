"use client";

/**
 * Страница батыра: портрет, факты, биография, ерлік істері, өмір жолы,
 * цитата, связанные батыры и переход к соседям по каталогу.
 */
import Link from "next/link";
import NextImage from "next/image";
import { BATYRS, getBatyr } from "@/data/batyrs";
import { videosFor } from "@/data/videos";
import { useT } from "@/lib/use-t";
import { BatyrCard, KoshkarOrnament, Reveal, RosetteOrnament } from "@/components/ui";
import { VideoList } from "@/components/video-list";

export function BatyrView({ id }: { id: string }) {
  const { t, pick } = useT();
  const batyr = getBatyr(id);

  if (!batyr) {
    return (
      <section className="container-page py-40 text-center">
        <h1 className="text-h1">{t("batyr.notFound")}</h1>
        <p className="mt-3 text-muted">{t("batyr.notFoundText")}</p>
        <Link href="/batyrs" className="eyebrow mt-6 inline-block">
          ← {t("batyr.back")}
        </Link>
      </section>
    );
  }

  const index = BATYRS.findIndex((b) => b.id === batyr.id);
  const prev = BATYRS[(index - 1 + BATYRS.length) % BATYRS.length];
  const next = BATYRS[(index + 1) % BATYRS.length];
  const related = batyr.related.map(getBatyr).filter((b) => b !== undefined);
  const deeds = pick(batyr.deeds);
  const videos = videosFor(batyr.id);

  return (
    <>
      {/* Шапка с портретом */}
      <section className="relative overflow-hidden border-b border-line bg-bg-2 pb-16 pt-[calc(var(--header-h)+48px)]">
        <RosetteOrnament className="pointer-events-none absolute -left-24 top-10 h-96 w-96 text-gold opacity-[0.07]" />
        <div className="container-page grid gap-12 lg:grid-cols-[minmax(0,420px)_1fr]">
          <Reveal className="relative">
            <div className="relative aspect-3/4 overflow-hidden rounded-[var(--radius-card)] shadow-[var(--shadow-lift)]">
              {batyr.image ? (
                <NextImage
                  src={batyr.image}
                  alt={pick(batyr.name)}
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 420px"
                  className="object-cover"
                />
              ) : (
                <div
                  className="grid h-full place-items-center"
                  style={{ background: `linear-gradient(160deg, ${batyr.palette[0]}, ${batyr.palette[1]})` }}
                >
                  <span className="font-display text-8xl text-gold">{pick(batyr.name).charAt(0)}</span>
                </div>
              )}
            </div>
            <span className="pointer-events-none absolute inset-y-4 -right-4 left-4 rounded-[var(--radius-card)] border border-[rgba(214,170,92,.5)]" />
          </Reveal>

          <Reveal delay={0.1}>
            <Link href="/batyrs" className="eyebrow flex w-fit items-center gap-2">
              ← {t("batyr.back")}
            </Link>
            <span
              className={`mt-5 block w-fit rounded-full px-4 py-1.5 text-[0.66rem] font-bold uppercase tracking-[0.16em] text-white ${
                batyr.type === "historical"
                  ? "bg-[linear-gradient(135deg,#2f93a5,#1a5f6c)]"
                  : "bg-[linear-gradient(135deg,#d6aa5c,#a8782f)] text-[#1a1208]"
              }`}
            >
              {t(`type.${batyr.type}`)}
            </span>

            <h1 className="mt-4 text-h1">{pick(batyr.name)}</h1>
            <p className="mt-2 font-display text-2xl italic text-gold">{pick(batyr.epithet)}</p>

            <dl className="mt-8 max-w-2xl">
              {(
                [
                  batyr.years
                    ? { key: t("batyr.years"), value: batyr.years }
                    : { key: t("batyr.source"), value: pick(batyr.source ?? batyr.era) },
                  { key: t("batyr.era"), value: pick(batyr.era) },
                ] as const
              ).map((row) => (
                <div key={row.key} className="grid grid-cols-[minmax(0,160px)_1fr] gap-4 border-b border-line py-4">
                  <dt className="text-[0.66rem] font-bold uppercase tracking-[0.16em] text-dim">{row.key}</dt>
                  <dd className="text-ink">{row.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* Биография */}
      <section className="container-page py-20">
        <Reveal>
          <h2 className="flex items-center gap-6 text-h2">
            {t("batyr.bio")}
            <span className="h-px flex-1 bg-line" />
          </h2>
          <p className="mt-8 max-w-4xl text-lead leading-relaxed text-muted [&::first-letter]:float-left [&::first-letter]:mr-3 [&::first-letter]:font-display [&::first-letter]:text-6xl [&::first-letter]:leading-[0.8] [&::first-letter]:text-gold">
            {pick(batyr.bio)}
          </p>
        </Reveal>
      </section>

      {/* Ерлік істері */}
      <section className="container-page border-t border-line py-20">
        <Reveal>
          <h2 className="flex items-center gap-6 text-h2">
            {t("batyr.deeds")}
            <span className="h-px flex-1 bg-line" />
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {deeds.map((deed, i) => (
            <Reveal key={deed} delay={i * 0.08}>
              <article className="relative h-full overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface p-7 shadow-[var(--shadow-card)]">
                <KoshkarOrnament className="pointer-events-none absolute -right-2 top-2 h-20 w-24 text-gold opacity-15" />
                <span className="font-display text-3xl italic text-gold">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-3 text-muted">{deed}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Өмір жолы */}
      <section className="container-page border-t border-line py-20">
        <Reveal>
          <h2 className="flex items-center gap-6 text-h2">
            {batyr.years ? t("batyr.timeline") : t("batyr.storyline")}
            <span className="h-px flex-1 bg-line" />
          </h2>
        </Reveal>
        <ol className="mt-10 grid gap-1">
          {batyr.timeline.map((entry, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <li className="grid grid-cols-[auto_minmax(0,200px)_1fr] items-start gap-5 py-3">
                <span className="mt-1.5 h-3 w-3 rotate-45 rounded-[2px] border border-gold" aria-hidden="true" />
                <span className="font-display text-2xl text-gold">
                  {entry.year ?? (entry.label ? pick(entry.label) : "")}
                </span>
                <span className="mt-1 text-muted">{pick(entry.text)}</span>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* Бейне */}
      {videos.length > 0 && (
        <section className="container-page border-t border-line py-20">
          <Reveal>
            <h2 className="flex items-center gap-6 text-h2">
              {t("batyr.videos")}
              <span className="h-px flex-1 bg-line" />
            </h2>
          </Reveal>
          <VideoList videos={videos} />
        </section>
      )}

      {/* Цитата */}
      <section className="border-y border-line bg-bg-2 py-24">
        <Reveal className="container-page flex flex-col items-center text-center">
          <KoshkarOrnament className="h-12 w-14 text-gold" />
          <p className="eyebrow mt-4">{t("quote.eyebrow")}</p>
          <blockquote className="mt-6 max-w-3xl">
            <p className="font-display text-3xl italic leading-tight text-ink md:text-4xl">
              {pick(batyr.quote.text)}
            </p>
            <footer className="mt-5 text-muted">{pick(batyr.quote.source)}</footer>
          </blockquote>
        </Reveal>
      </section>

      {/* Связанные */}
      {related.length > 0 && (
        <section className="container-page py-20">
          <Reveal>
            <h2 className="flex items-center gap-6 text-h2">
              {t("batyr.related")}
              <span className="h-px flex-1 bg-line" />
            </h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-2 gap-5 lg:grid-cols-4">
            {related.map((b, i) => (
              <Reveal key={b.id} delay={i * 0.08}>
                <BatyrCard batyr={b} />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* Соседи */}
      <nav className="container-page grid gap-5 pb-24 md:grid-cols-2">
        {[
          { b: prev, label: t("batyr.prev"), align: "text-left", arrow: "←" },
          { b: next, label: t("batyr.next"), align: "text-right", arrow: "→" },
        ].map((item) => (
          <Link
            key={item.b.id}
            href={`/batyrs/${item.b.id}`}
            className={`rounded-[var(--radius-card)] border border-line bg-surface p-7 shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-lift)] ${item.align}`}
          >
            <span className="eyebrow">
              {item.arrow === "←" ? `${item.arrow} ${item.label}` : `${item.label} ${item.arrow}`}
            </span>
            <p className="mt-2 font-display text-2xl text-ink">{pick(item.b.name)}</p>
          </Link>
        ))}
      </nav>
    </>
  );
}
