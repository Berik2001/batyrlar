import type { Metadata } from "next";
import { AudioView } from "@/components/audio-view";

export const metadata: Metadata = { title: "Аудио" };

export default function Page() {
  return <AudioView />;
}
