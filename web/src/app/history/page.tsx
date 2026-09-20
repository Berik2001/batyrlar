import type { Metadata } from "next";
import { HistoryView } from "@/components/history-view";

export const metadata: Metadata = { title: "Тарих" };

export default function Page() {
  return <HistoryView />;
}
