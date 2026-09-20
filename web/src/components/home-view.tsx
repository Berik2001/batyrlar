"use client";

/**
 * Главная: 3D-баннер (круг портретов вокруг зрителя) и секции ниже —
 * топ батыров, батыр дня, категории, сюжетные арки и цитата.
 */
import dynamic from "next/dynamic";
import Link from "next/link";
import NextImage from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { BATYRS, byType, type Batyr } from "@/data/batyrs";
import { ARCS } from "@/data/arcs";
import { useApp } from "@/lib/store";
import { useT } from "@/lib/use-t";
import {
  BatyrCard,
  GoldLink,
  KoshkarOrnament,
  Reveal,
  SectionHead,
} from "@/components/ui";
import { asset } from "@/lib/asset";

// Сцена тяжёлая и работает только в браузере
const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-bg-2" />,
});

/* ---------------- Баннер ---------------- */

function Hero() {
  const { t, pick } = useT();
  const activeId = useApp((s) => s.activeBatyr);
  const active = BATYRS.find((b) => b.id === activeId) ?? null;

  const stats = [
    { value: BATYRS.length, label: t("hero.stat.batyrs") },
    { value: ARCS.length, label: t("hero.stat.arcs") },
    { value: 3, label: t("hero.stat.langs") },
  ];

  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden">
      <HeroScene batyrs={BATYRS} />

      {/* Тёмная вуаль, чтобы текст читался поверх сцены */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(100deg,rgb(var(--bg-rgb)/.96)_0%,rgb(var(--bg-rgb)/.86)_26%,rgb(var(--bg-rgb)/.3)_52%,transparent_74%)]" />

      <div className="pointer-events-none relative z-10 flex min-h-[100svh] items-center">
        <div className="container-page pt-[var(--header-h)]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xl"
          >
            <p className="flex items-center gap-3 text-[0.72rem] font-bold uppercase tracking-[0.22em] text-gold">
              <span className="h-px w-8 bg-gold" />
              {t("hero.eyebrow")}
            </p>

            <h1 className="text-gradient-gold mt-5 font-display text-hero leading-[0.92]">
              BATYRLAR
            </h1>

            <p className="mt-4 font-display text-3xl italic text-ink">{t("hero.slogan")}</p>
            <p className="mt-4 max-w-md text-muted">{t("hero.sub")}</p>

            <div className="pointer-events-auto mt-8 flex flex-wrap gap-3">
              <GoldLink href="/batyrs">{t("hero.ctaPrimary")}</GoldLink>
              <Link
                href="/history"
                className="inline-flex items-center gap-2 rounded-full border border-line-strong px-6 py-3 text-xs font-bold uppercase tracking-[0.16em] text-ink transition-colors hover:border-gold hover:text-gold"
              >
                {t("hero.ctaSecondary")}
              </Link>
            </div>

            <dl className="mt-10 flex gap-10 border-t border-line-strong pt-6">
              {stats.map((s) => (
                <div key={s.label}>
                  <dd className="font-display text-4xl text-gold">{s.value}</dd>
                  <dt className="mt-1 text-[0.66rem] font-bold uppercase tracking-[0.18em] text-dim">
                    {s.label}
                  </dt>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>
      </div>

      {/* Имя батыра, на который навели курсор в сцене */}
      <AnimatePresence>
        {active && (
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.28 }}
            className="pointer-events-none absolute bottom-24 left-1/2 z-10 -translate-x-1/2 rounded-full border border-line-strong bg-[rgb(var(--bg-rgb)/.78)] px-6 py-3 text-center shadow-[var(--shadow-card)] backdrop-blur-md"
          >
            <p className="font-display text-2xl text-ink">{pick(active.name)}</p>
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-gold">
              {pick(active.epithet)}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="pointer-events-none absolute bottom-7 left-1/2 z-10 -translate-x-1/2 text-[0.66rem] font-bold uppercase tracking-[0.2em] text-dim">
        {t("hero.scroll")}
      </div>
    </section>
  );
}

/* ---------------- Батыр дня ---------------- */

function Spotlight({ batyr }: { batyr: Batyr }) {
  const { t, pick } = useT();
  return (
    <section className="bg-bg-2 py-24">
      <div className="container-page grid items-center gap-12 lg:grid-cols-[5fr_6fr]">
        <Reveal className="relative">
          <div className="relative aspect-3/4 max-h-[620px] overflow-hidden rounded-[var(--radius-card)] shadow-[var(--shadow-lift)]">
            {batyr.image && (
              <NextImage
                src={batyr.image}
                alt={pick(batyr.name)}
                fill
                sizes="(max-width: 1024px) 90vw, 40vw"
                className="object-cover"
              />
            )}
          </div>
          <span className="pointer-events-none absolute inset-y-4 -right-4 left-4 rounded-[var(--radius-card)] border border-[rgba(214,170,92,.5)]" />
        </Reveal>

        <Reveal delay={0.1}>
          <p className="eyebrow flex items-center gap-3">
            <span className="h-px w-8 bg-gold" />
            {t("spot.eyebrow")}
          </p>
          <h2 className="mt-3 text-h2">{pick(batyr.name)}</h2>
          <p className="mt-2 font-display text-lg italic text-gold">
            {pick(batyr.epithet)} · {pick(batyr.era)}
          </p>
          <p className="mt-5 max-w-2xl text-muted">{pick(batyr.bio)}</p>
          <blockquote className="mt-6 border-l-2 border-gold pl-5">
            <p className="font-display text-2xl italic text-ink">{pick(batyr.quote.text)}</p>
            <footer className="mt-2 text-sm text-dim">{pick(batyr.quote.source)}</footer>
          </blockquote>
          <div className="mt-7">
            <GoldLink href={`/batyrs/${batyr.id}`}>{t("spot.cta")}</GoldLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Страница ---------------- */

export function HomeView() {
  const { t, pick } = useT();
  const top = BATYRS.filter((b) => b.top).slice(0, 4);
  const featured = BATYRS.find((b) => b.featured) ?? BATYRS[0];
  const makhambet = BATYRS.find((b) => b.id === "makhambet") ?? BATYRS[0];

  const categories = [
    {
      type: "epic" as const,
      title: t("type.epicPlural"),
      text: t("cat.epicText"),
      count: byType("epic").length,
      image: asset("/img/cat-epic.jpg"),
    },
    {
      type: "historical" as const,
      title: t("type.historicalPlural"),
      text: t("cat.historicalText"),
      count: byType("historical").length,
      image: asset("/img/cat-hist.jpg"),
    },
  ];

  return (
    <>
      <Hero />

      <section className="py-24">
        <div className="container-page">
          <SectionHead
            eyebrow={t("top.eyebrow")}
            title={t("top.title")}
            action={
              <Link href="/batyrs" className="eyebrow transition-colors hover:text-gold-bright">
                {t("top.all")} →
              </Link>
            }
          />
          <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
            {top.map((b, i) => (
              <Reveal key={b.id} delay={i * 0.08}>
                <BatyrCard batyr={b} priority={i < 2} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Spotlight batyr={featured} />

      <section className="py-24">
        <div className="container-page">
          <SectionHead eyebrow={t("cat.eyebrow")} title={t("cat.title")} />
          <div className="grid gap-5 md:grid-cols-2">
            {categories.map((c, i) => (
              <Reveal key={c.type} delay={i * 0.1}>
                <Link
                  href={`/batyrs?type=${c.type}`}
                  className="group relative flex min-h-[320px] flex-col justify-end overflow-hidden rounded-[var(--radius-card)] border border-line p-8 shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-lift)]"
                >
                  <NextImage
                    src={c.image}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Вуаль слева направо: текст читается поверх фотографии */}
                  <span className="absolute inset-0 bg-[linear-gradient(100deg,rgba(11,10,9,.94)_0%,rgba(11,10,9,.72)_45%,rgba(11,10,9,.18)_100%)]" />
                  <span className="relative">
                    <span className="block text-xs font-bold uppercase tracking-[0.18em] text-[#d6aa5c]">
                      {c.count} {t("cat.count")}
                    </span>
                    <span className="mt-2 block font-display text-h3 text-[#f4ede1]">{c.title}</span>
                    <span className="mt-2 block max-w-sm text-[#cdc3b2]">{c.text}</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-page">
          <SectionHead eyebrow={t("arcs.eyebrow")} title={t("arcs.title")} />
          <div className="grid gap-5 lg:grid-cols-2">
            {ARCS.map((arc, i) => (
              <Reveal key={arc.id} delay={i * 0.1}>
                <Link
                  href={`/history#${arc.id}`}
                  className="group block overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-lift)]"
                >
                  <div className="relative aspect-16/9 overflow-hidden">
                    <NextImage
                      src={arc.image}
                      alt=""
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-7">
                    <span className="inline-block rounded-full border border-line-strong px-3 py-1 text-xs font-bold tracking-[0.12em] text-gold">
                      {arc.years}
                    </span>
                    <h3 className="mt-3 text-h3">{pick(arc.title)}</h3>
                    <p className="mt-2 text-muted">{pick(arc.lead)}</p>
                    <span className="eyebrow mt-4 inline-block">{t("arcs.more")} →</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-bg-2 py-28">
        <Reveal className="container-page flex flex-col items-center text-center">
          <KoshkarOrnament className="h-14 w-16 text-gold" />
          <p className="eyebrow mt-5">{t("quote.eyebrow")}</p>
          <blockquote className="mt-6">
            <p className="font-display text-4xl italic leading-tight text-ink md:text-5xl">
              {pick(makhambet.quote.text)
                .split("\n")
                .map((line, i) => (
                  <span key={i} className="block">
                    {line}
                  </span>
                ))}
            </p>
            <footer className="mt-7 text-muted">
              <Link href={`/batyrs/${makhambet.id}`} className="font-semibold text-gold hover:text-gold-bright">
                {pick(makhambet.name)}
              </Link>
              , <cite className="not-italic">{pick(makhambet.quote.source).replace(/^[^,]+,\s*/, "")}</cite>
            </footer>
          </blockquote>
        </Reveal>
      </section>
    </>
  );
}
