"use client";

/**
 * «Бейне»: документальные фильмы и передачи о батырах, сгруппированные
 * по героям и сюжетным аркам. Записи жыра живут в разделе «Аудио».
 */
import Link from "next/link";
import { BATYRS } from "@/data/batyrs";
import { ARCS } from "@/data/arcs";
import { FILM_VIDEOS, type Video } from "@/data/videos";
import { useT } from "@/lib/use-t";
import { PageHero, Reveal } from "@/components/ui";
import { VideoList } from "@/components/video-list";

interface Group {
  id: string;
  title: string;
  href: string;
  videos: Video[];
}

export function VideoView() {
  const { t, pick } = useT();

  const groups: Group[] = [
    ...BATYRS.map((b) => ({
      id: b.id,
      title: pick(b.name),
      href: `/batyrs/${b.id}`,
      videos: FILM_VIDEOS.filter((v) => v.related === b.id),
    })),
    ...ARCS.map((a) => ({
      id: a.id,
      title: pick(a.title),
      href: `/history#${a.id}`,
      videos: FILM_VIDEOS.filter((v) => v.related === a.id),
    })),
  ].filter((g) => g.videos.length > 0);

  return (
    <>
      <PageHero eyebrow={t("page.video.eyebrow")} title={t("page.video.title")} lead={t("page.video.lead")} />

      <section className="container-page py-16">
        <p className="eyebrow">{t("video.count", { n: FILM_VIDEOS.length })}</p>

        {groups.map((group, i) => (
          <div key={group.id} className={i === 0 ? "mt-8" : "mt-14 border-t border-line pt-14"}>
            <Reveal>
              <div className="flex flex-wrap items-baseline justify-between gap-4">
                <h2 className="text-h2">{group.title}</h2>
                <Link href={group.href} className="eyebrow text-gold">
                  {t("comics.about")} →
                </Link>
              </div>
            </Reveal>
            <VideoList videos={group.videos} />
          </div>
        ))}
      </section>
    </>
  );
}
