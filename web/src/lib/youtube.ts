/**
 * Поиск роликов через YouTube Data API v3 (search.list).
 *
 * Ключ берётся из переменной окружения YOUTUBE_API_KEY и остаётся на сервере —
 * функция вызывается только из серверных компонентов. Ответ кэшируется на сутки.
 * Без ключа или при любой ошибке API отдаётся проверенный список из data/videos.ts,
 * поэтому страница «Медиа» работает всегда.
 */
import { CURATED_VIDEOS, type Video } from "@/data/videos";

const ENDPOINT = "https://www.googleapis.com/youtube/v3/search";
const QUERY = "қазақ батырлары деректі фильм батырлар жыры";
const DAY = 86_400;

interface SearchItem {
  id?: { videoId?: string };
  snippet?: { title?: string; channelTitle?: string };
}

interface SearchResponse {
  items?: SearchItem[];
}

/** Источник списка — нужен, чтобы показать в интерфейсе, откуда взяты ролики */
export type VideoSource = "api" | "curated";

export async function getVideos(): Promise<{ videos: Video[]; source: VideoSource }> {
  const key = process.env.YOUTUBE_API_KEY;
  if (!key) return { videos: CURATED_VIDEOS, source: "curated" };

  const params = new URLSearchParams({
    key,
    part: "snippet",
    q: QUERY,
    type: "video",
    maxResults: "12",
    relevanceLanguage: "kk",
    videoEmbeddable: "true",
    safeSearch: "strict",
  });

  try {
    const res = await fetch(`${ENDPOINT}?${params}`, { next: { revalidate: DAY } });
    if (!res.ok) return { videos: CURATED_VIDEOS, source: "curated" };

    const data = (await res.json()) as SearchResponse;
    const videos: Video[] = (data.items ?? []).flatMap((item) => {
      const id = item.id?.videoId;
      const title = item.snippet?.title;
      if (!id || !title) return [];
      return [{ id, title: decodeEntities(title), channel: decodeEntities(item.snippet?.channelTitle ?? "YouTube") }];
    });

    return videos.length ? { videos, source: "api" } : { videos: CURATED_VIDEOS, source: "curated" };
  } catch {
    return { videos: CURATED_VIDEOS, source: "curated" };
  }
}

/** API отдаёт названия с HTML-сущностями: &quot;, &#39; и т. п. */
function decodeEntities(s: string): string {
  return s
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}
