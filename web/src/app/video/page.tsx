import type { Metadata } from "next";
import { VideoView } from "@/components/video-view";

export const metadata: Metadata = { title: "Бейне" };

export default function Page() {
  return <VideoView />;
}
