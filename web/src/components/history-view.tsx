"use client";

/**
 * «Тарих»: сюжетные желілер — оглавление и по секции на арку
 * с лентой событий и карточками участников.
 */
import Link from "next/link";
import NextImage from "next/image";
import { ARCS } from "@/data/arcs";
import { getBatyr } from "@/data/batyrs";
import { useT } from "@/lib/use-t";
import { BatyrCard, PageHero, Reveal } from "@/components/ui";

export function HistoryView() {
  const { t, pick } = useT();

  return (
    <>
      <PageHero
        eyebrow={t("page.history.eyebrow")}
        title={t("page.history.title")}
        lead={t("page.history.lead")}
        image={ARCS[0].image}
      />

      <section className="container-page py-16">
        <ol className="grid gap-3 md:grid-cols-2">
          {ARCS.map((arc, i) => (
            <Reveal key={arc.id} delay={i * 0.08}>
              <Link
                href={`#${arc.id}`}
                className="flex items-baseline gap-4 rounded-[var(--radius-card)] border border-line bg-surface px-7 py-5 shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-lift)]"
              >
                <span className="font-display text-2xl text-gold">{String(i + 1).padStart(2, "0")}</span>
                <span>
                  <span className="block font-display text-xl text-ink">{pick(arc.title)}</span>
                  <span className="text-sm text-dim">{arc.years}</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </ol>
      </section>

      {ARCS.map((arc, arcIndex) => {
        const figures = arc.figures.map(getBatyr).filter((b) => b !== undefined);
        return (
          <section key={arc.id} id={arc.id} className="scroll-mt-24 border-t border-line py-20">
            <div className="container-page">
              <Reveal>
                <p className="eyebrow flex items-center gap-3">
                  <span className="h-px w-8 bg-gold" />
                  {t("history.arc")} {String(arcIndex + 1).padStart(2, "0")} · {arc.years}
                </p>
                <h2 className="mt-4 text-h2">{pick(arc.title)}</h2>
                <p className="mt-4 max-w-2xl text-lead text-muted">{pick(arc.lead)}</p>
              </Reveal>

              <Reveal delay={0.1} className="mt-10">
                <div className="relative aspect-16/9 overflow-hidden rounded-[var(--radius-card)] shadow-[var(--shadow-lift)]">
                  <NextImage
                    src={arc.image}
                    alt=""
                    fill
                    sizes="(max-width: 1320px) 100vw, 1320px"
                    className="object-cover"
                  />
                </div>
              </Reveal>

              <h3 className="eyebrow mt-14">{t("history.events")}</h3>
              <ol className="mt-6 border-l border-line pl-8">
                {arc.events.map((event, i) => (
                  <Reveal key={event.year + i} delay={i * 0.05}>
                    <li className="relative pb-9">
                      <span
                        className="absolute -left-[38px] top-1.5 h-3 w-3 rotate-45 rounded-[2px] border border-gold bg-bg"
                        aria-hidden="true"
                      />
                      <span className="font-display text-2xl text-gold">{event.year}</span>
                      <p className="mt-1 font-display text-xl text-ink">{pick(event.title)}</p>
                      <p className="mt-1 max-w-2xl text-muted">{pick(event.text)}</p>
                    </li>
                  </Reveal>
                ))}
              </ol>

              {figures.length > 0 && (
                <>
                  <h3 className="eyebrow mt-10">{t("history.figures")}</h3>
                  <div className="mt-6 grid grid-cols-2 gap-5 lg:grid-cols-4">
                    {figures.map((b, i) => (
                      <Reveal key={b.id} delay={i * 0.08}>
                        <BatyrCard batyr={b} />
                      </Reveal>
                    ))}
                  </div>
                </>
              )}
            </div>
          </section>
        );
      })}
    </>
  );
}
