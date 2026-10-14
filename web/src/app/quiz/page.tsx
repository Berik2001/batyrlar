import type { Metadata } from "next";
import { QuizView } from "@/components/quiz-view";

export const metadata: Metadata = { title: "Сұрақтар" };

export default function Page() {
  return <QuizView />;
}
