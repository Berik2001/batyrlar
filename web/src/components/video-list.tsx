"use client";

/**
 * Список роликов батыра или арки. Пока на ролик не нажали, на странице
 * только картинка превью — плеер YouTube подгружается по клику
 * (домен youtube-nocookie, так что до клика трекинг не запускается).
 */
import { useState } from "react";
import NextImage from "next/image";
import { videoEmbed, videoThumb, videoWatch, type Video } from "@/data/videos";
import { useT } from "@/lib/use-t";
import { Reveal } from "@/components/ui";

export function VideoList({ videos }: { videos: Video[] }) {
  const { t } = useT();
  const [playing, setPlaying] = useState<string | null>(null);

  return (
    <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {videos.map((video, i) => (
        <Reveal key={video.id} delay={i * 0.08}>
          <article className="group h-full overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-lift)]">
            <div className="relative aspect-video bg-bg-2">
              {playing === video.id ? (
                <iframe
                  src={videoEmbed(video.id)}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setPlaying(video.id)}
                  className="absolute inset-0 cursor-pointer"
                  aria-label={`${t("video.play")}: ${video.title}`}
                >
                  <NextImage
                    src={videoThumb(video.id)}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 bg-[linear-gradient(0deg,rgba(11,10,9,.55),transparent_60%)]" />
                  <span className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-[rgba(214,170,92,.7)] bg-[rgba(11,10,9,.55)] backdrop-blur-sm transition-colors group-hover:bg-[rgba(214,170,92,.9)]">
                    <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6 fill-[#f6efe2] transition-colors group-hover:fill-[#1a1208]">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                  {video.duration && (
                    <span className="absolute bottom-3 right-3 rounded-md bg-[rgba(11,10,9,.8)] px-2 py-0.5 text-[0.72rem] font-semibold tabular-nums text-[#f6efe2]">
                      {video.duration}
                    </span>
                  )}
                </button>
              )}
            </div>

            <div className="p-5">
              <h3 className="font-display text-xl leading-snug text-ink">{video.title}</h3>
              <p className="mt-1 text-sm text-dim">{video.channel}</p>
              <a
                href={videoWatch(video.id)}
                target="_blank"
                rel="noopener noreferrer"
                className="eyebrow mt-3 inline-block text-gold"
              >
                {t("video.watch")} ↗
              </a>
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
