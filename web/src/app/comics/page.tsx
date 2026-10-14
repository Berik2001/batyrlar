import type { Metadata } from "next";
import { ComicsView } from "@/components/comics-view";

export const metadata: Metadata = { title: "Комикс" };

export default function Page() {
  return <ComicsView />;
}
