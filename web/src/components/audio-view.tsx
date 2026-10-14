"use client";

/**
 * «Аудио»: записи жыра, сгруппированные по батырам. Рядом с записями —
 * строки из жыра о том же батыре, чтобы было понятно, что звучит.
 *
 * Плеер (youtube-nocookie) появляется только после нажатия, до этого
 * страница не грузит чужие скрипты.
 */
import { useState } from "react";
import Link from "next/link";
import NextImage from "next/image";
import { BATYRS } from "@/data/batyrs";
import { ZHYR_VIDEOS, videoEmbed, videoWatch, type Video } from "@/data/videos";
import { useT } from "@/lib/use-t";
import { PageHero, Reveal } from "@/components/ui";

/** Записи, сгруппированные по батырам, в порядке каталога */
function groups(): { batyr: (typeof BATYRS)[number]; videos: Video[] }[] {
  return BATYRS.map((batyr) => ({
    batyr,
    videos: ZHYR_VIDEOS.filter((v) => v.related === batyr.id),
  })).filter((g) => g.videos.length > 0);
}

export function AudioView() {
  const { t, pick } = useT();
  const [playing, setPlaying] = useState<string | null>(null);
  const list = groups();

  return (
    <>
      <PageHero eyebrow={t("page.audio.eyebrow")} title={t("page.audio.title")} lead={t("page.audio.lead")} />

      <section className="container-page py-16">
        <p className="eyebrow">{t("audio.count", { n: ZHYR_VIDEOS.length })}</p>

        <div className="mt-8 grid gap-6">
          {list.map((group, i) => (
            <Reveal key={group.batyr.id} delay={i * 0.05}>
              <article className="grid gap-8 rounded-[var(--radius-card)] border border-line bg-surface p-6 shadow-[var(--shadow-card)] md:grid-cols-[minmax(0,260px)_1fr] md:p-8">
                {/* Батыр и строки из жыра */}
                <div>
                  <div className="flex items-center gap-4">
                    {group.batyr.image && (
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border border-line">
                        <NextImage
                          src={group.batyr.image}
                          alt=""
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <Link href={`/batyrs/${group.batyr.id}`} className="font-display text-2xl text-ink hover:text-gold">
                        {pick(group.batyr.name)}
                      </Link>
                      <p className="text-sm text-dim">{pick(group.batyr.epithet)}</p>
                    </div>
                  </div>

                  <p className="eyebrow mt-6">{t("audio.excerpt")}</p>
                  <blockquote className="mt-2 font-display text-lg italic leading-snug text-muted">
                    {pick(group.batyr.quote.text)}
                  </blockquote>
                </div>

                {/* Записи */}
                <ul className="grid gap-3">
                  {group.videos.map((video) => {
                    const isPlaying = playing === video.id;
                    return (
                      <li key={video.id} className="rounded-2xl border border-line bg-bg-2 p-4">
                        <div className="flex items-center gap-4">
                          <button
                            type="button"
                            onClick={() => setPlaying(isPlaying ? null : video.id)}
                            aria-label={`${t("audio.play")}: ${video.title}`}
                            className={`grid h-11 w-11 shrink-0 cursor-pointer place-items-center rounded-full border transition-colors ${
                              isPlaying
                                ? "border-gold bg-[var(--grad-gold)] text-[#1a1208]"
                                : "border-line text-gold hover:border-gold"
                            }`}
                          >
                            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                              {isPlaying ? <path d="M7 5h4v14H7zM13 5h4v14h-4z" /> : <path d="M8 5v14l11-7z" />}
                            </svg>
                          </button>

                          <div className="min-w-0 flex-1">
                            <p className="truncate text-ink">{video.title}</p>
                            <p className="truncate text-sm text-dim">
                              {video.channel}
                              {video.duration ? ` · ${video.duration}` : ""}
                            </p>
                          </div>

                          <a
                            href={videoWatch(video.id)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden shrink-0 text-sm text-dim hover:text-gold sm:block"
                          >
                            YouTube ↗
                          </a>
                        </div>

                        {isPlaying && (
                          <div className="mt-4 aspect-video w-full overflow-hidden rounded-xl">
                            <iframe
                              src={videoEmbed(video.id)}
                              title={video.title}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="h-full w-full"
                            />
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 text-sm text-dim">{t("audio.source")}</p>
      </section>
    </>
  );
}
