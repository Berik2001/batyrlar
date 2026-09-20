/**
 * Поиск роликов через YouTube Data API v3 (search.list).
 *
 * Ключ берётся из переменной окружения YOUTUBE_API_KEY и остаётся на сервере —
 * функция вызывается только из серверных компонентов. Ответ кэшируется на сутки.
 * Без ключа или при любой ошибке API отдаётся проверенный список из data/videos.ts,
 * поэтому страница «Медиа» работает всегда.
 */
import { CURATED_VIDEOS, type Video } from "@/data/videos";

const SEARCH = "https://www.googleapis.com/youtube/v3/search";
const DETAILS = "https://www.googleapis.com/youtube/v3/videos";
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
    const res = await fetch(`${SEARCH}?${params}`, { next: { revalidate: DAY } });
    if (!res.ok) return { videos: CURATED_VIDEOS, source: "curated" };

    const data = (await res.json()) as SearchResponse;
    const videos: Video[] = (data.items ?? []).flatMap((item) => {
      const id = item.id?.videoId;
      const title = item.snippet?.title;
      if (!id || !title) return [];
      return [{ id, title: decodeEntities(title), channel: decodeEntities(item.snippet?.channelTitle ?? "YouTube") }];
    });

    if (!videos.length) return { videos: CURATED_VIDEOS, source: "curated" };
    return { videos: await withDurations(videos, key), source: "api" };
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

/**
 * search.list не отдаёт длительность — добираем её одним запросом videos.list.
 * Если запрос не удался, ролики просто останутся без подписи с хронометражом.
 */
async function withDurations(videos: Video[], key: string): Promise<Video[]> {
  const params = new URLSearchParams({ key, part: "contentDetails", id: videos.map((v) => v.id).join(",") });
  try {
    const res = await fetch(`${DETAILS}?${params}`, { next: { revalidate: DAY } });
    if (!res.ok) return videos;

    const data = (await res.json()) as { items?: { id?: string; contentDetails?: { duration?: string } }[] };
    const byId = new Map<string, string>();
    for (const item of data.items ?? []) {
      const iso = item.contentDetails?.duration;
      if (item.id && iso) byId.set(item.id, formatDuration(iso));
    }
    return videos.map((v) => ({ ...v, duration: byId.get(v.id) }));
  } catch {
    return videos;
  }
}

/** ISO 8601 (PT1H24M37S) → 1:24:37 */
function formatDuration(iso: string): string {
  const m = /^P(?:\d+D)?T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/.exec(iso);
  if (!m) return "";
  const [h, min, sec] = [Number(m[1] ?? 0), Number(m[2] ?? 0), Number(m[3] ?? 0)];
  const mm = String(min).padStart(h ? 2 : 1, "0");
  return `${h ? `${h}:` : ""}${mm}:${String(sec).padStart(2, "0")}`;
}
