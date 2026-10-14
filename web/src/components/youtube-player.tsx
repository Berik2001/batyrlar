"use client";

/**
 * Плеер YouTube с понятным состоянием загрузки.
 *
 * Голый iframe показывает чёрный прямоугольник: пока грузится сам плеер и
 * реклама перед роликом, по виду не отличить «ещё едет» от «не открылось».
 * Поэтому поверх лежит заставка со счётчиком ожидания, а если за несколько
 * секунд ничего не пришло, на её месте появляется ссылка на ролик.
 *
 * Полностью распознать блокировку изнутри нельзя: когда расширение браузера
 * обрывает запрос, браузер подставляет свою страницу ошибки и сообщает об
 * успешной загрузке. Поэтому ссылка «не открывается?» показывается и рядом
 * с плеером — в подписи к ролику.
 */
import { useEffect, useState } from "react";
import { videoEmbed, videoWatch } from "@/data/videos";
import { useT } from "@/lib/use-t";

/** Сколько ждём ответа плеера, прежде чем предложить открыть ролик на YouTube */
const GIVE_UP_MS = 6000;

export function YouTubePlayer({ id, title }: { id: string; title: string }) {
  const { t } = useT();
  const [state, setState] = useState<"loading" | "ready" | "stuck">("loading");

  useEffect(() => {
    if (state !== "loading") return;
    const timer = setTimeout(() => setState((s) => (s === "loading" ? "stuck" : s)), GIVE_UP_MS);
    return () => clearTimeout(timer);
  }, [state]);

  return (
    <div className="relative h-full w-full bg-black">
      <iframe
        src={videoEmbed(id)}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        onLoad={() => setState("ready")}
        className="h-full w-full"
      />

      {state !== "ready" && (
        <div className="pointer-events-none absolute inset-0 grid place-items-center bg-black px-6 text-center">
          {state === "loading" ? (
            <p className="flex items-center gap-3 text-[#cdbfa6]">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#5a4a30] border-t-[#d6aa5c]" />
              {t("video.loading")}
            </p>
          ) : (
            <div className="pointer-events-auto">
              <p className="text-[#cdbfa6]">{t("video.blocked")}</p>
              <a
                href={videoWatch(id)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block rounded-full bg-[var(--grad-gold)] px-7 py-3 text-[0.72rem] font-bold uppercase tracking-[0.16em] text-[#1a1208]"
              >
                {t("video.watch")} ↗
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
