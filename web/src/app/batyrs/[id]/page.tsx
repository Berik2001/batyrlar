import type { Metadata } from "next";
import { BATYRS, getBatyr } from "@/data/batyrs";
import { BatyrView } from "@/components/batyr-view";

/** Все страницы батыров статические — данных немного, они известны на сборке */
export function generateStaticParams() {
  return BATYRS.map((b) => ({ id: b.id }));
}

export async function generateMetadata({ params }: PageProps<"/batyrs/[id]">): Promise<Metadata> {
  const { id } = await params;
  const batyr = getBatyr(id);
  if (!batyr) return { title: "Batyrlar" };
  return { title: batyr.name.kk, description: batyr.bio.kk };
}

export default async function Page({ params }: PageProps<"/batyrs/[id]">) {
  const { id } = await params;
  return <BatyrView id={id} />;
}
