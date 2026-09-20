import type { Metadata } from "next";
import { MediaView } from "@/components/media-view";
import { getVideos } from "@/lib/youtube";

export const metadata: Metadata = { title: "Медиа" };

export default async function Page() {
  // Ключ YouTube остаётся на сервере: сюда приходит уже готовый список
  const { videos } = await getVideos();
  return <MediaView videos={videos} />;
}
