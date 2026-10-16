"use client";

/**
 * Главная: обложка-иллюстрация, четыре карточки разделов и полоса
 * «Жобаның мақсаты». Дальше страница не идёт — всё остальное в разделах.
 */
import Link from "next/link";
import NextImage from "next/image";
import { useT } from "@/lib/use-t";
import { Reveal } from "@/components/ui";
import { asset } from "@/lib/asset";

/* ---------------- Обложка: иллюстрация во всю ширину ---------------- */

function QuestHero() {
  const { t } = useT();
  return (
    <section className="relative isolate overflow-hidden">
      <div className="relative min-h-[76svh] w-full">
        <NextImage
          src={asset("/img/hero-quest.jpg")}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-right"
        />
        {/* Вуаль слева направо: заголовок читается поверх неба */}
        <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(9,20,36,.92)_0%,rgba(9,20,36,.75)_38%,rgba(9,20,36,.15)_62%,transparent_80%)]" />

        <div className="container-page relative flex min-h-[76svh] flex-col justify-center py-24">
          <Reveal className="max-w-2xl">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-[#f2cf85]">
              {t("hero.eyebrow")}
            </p>
            <h1 className="mt-4 font-display text-[clamp(3rem,9vw,6.5rem)] font-bold leading-[0.92] text-transparent [-webkit-background-clip:text] [-webkit-text-stroke:1px_rgba(255,255,255,.18)] [background-clip:text] [background-image:linear-gradient(180deg,#ffe9b0_0%,#f2cf85_38%,#c8922f_100%)] [text-shadow:0_8px_30px_rgba(0,0,0,.45)]">
              BATYRLAR
            </h1>
            <p className="mt-4 font-display text-[clamp(1.4rem,3vw,2.1rem)] italic text-[#f6efe2]">
              {t("hero.slogan")}
            </p>
            <p className="mt-4 max-w-xl text-lg text-[#cfdbe9]">{t("hero.sub")}</p>

            <Link
              href="/batyrs"
              className="mt-9 inline-flex items-center gap-3 rounded-full bg-[linear-gradient(180deg,#ffd978_0%,#f0b63f_55%,#d2902a_100%)] px-9 py-4 text-base font-bold text-[#2a1b05] shadow-[0_14px_34px_-12px_rgba(0,0,0,.7)] transition-transform hover:scale-[1.04]"
            >
              {t("hero.enter")}
              <span className="grid h-7 w-7 place-items-center rounded-full bg-[#2a1b05] text-[#ffd978]">→</span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Четыре раздела крупными карточками ---------------- */

function QuestCards() {
  const { t } = useT();
  const cards = [
    { title: t("nav.batyrs"), desc: t("card.batyrs"), href: "/batyrs", img: "/img/tile-batyrs.jpg", from: "#a3202a", to: "#5f0f16" },
    { title: t("nav.audio"), desc: t("card.audio"), href: "/audio", img: "/img/tile-tales.jpg", from: "#1d55a6", to: "#0e2a58" },
    { title: t("nav.comics"), desc: t("card.comics"), href: "/comics", img: "/img/tile-comics.jpg", from: "#13694a", to: "#0a3f2c" },
    { title: t("nav.quiz"), desc: t("card.quiz"), href: "/quiz", img: "/img/tile-games.jpg", from: "#5d2f90", to: "#331854" },
  ];
  const extra = [
    { title: t("nav.video"), href: "/video" },
    { title: t("nav.media"), href: "/media" },
    { title: t("nav.history"), href: "/history" },
  ];

  return (
    <section className="bg-[#0b1626] py-16">
      <div className="container-page">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, i) => (
            <Reveal key={card.href} delay={i * 0.06}>
              <Link
                href={card.href}
                className="group relative flex h-44 overflow-hidden rounded-3xl shadow-[0_18px_40px_-20px_rgba(0,0,0,.9)] transition-transform hover:-translate-y-1.5"
                style={{ background: `linear-gradient(135deg, ${card.from}, ${card.to})` }}
              >
                <div className="relative z-10 flex w-[58%] flex-col justify-between p-5">
                  <div>
                    <h3 className="font-display text-2xl font-semibold text-white">{card.title}</h3>
                    <p className="mt-2 text-sm leading-snug text-white/80">{card.desc}</p>
                  </div>
                  <span className="grid h-9 w-9 place-items-center rounded-full border border-white/40 text-white transition-colors group-hover:bg-white group-hover:text-[#12223a]">
                    →
                  </span>
                </div>
                <div className="absolute inset-y-0 right-0 w-[52%]">
                  <NextImage src={asset(card.img)} alt="" fill sizes="(max-width:1024px) 50vw, 240px" className="object-cover" />
                  <span className="absolute inset-0" style={{ background: `linear-gradient(90deg, ${card.from} 0%, transparent 55%)` }} />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          {extra.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full border border-white/15 px-6 py-2.5 text-sm text-white/75 transition-colors hover:border-[#f2cf85] hover:text-[#f2cf85]"
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Полоса «о проекте» ---------------- */

function FeatureStrip() {
  const { t } = useT();
  const items = [
    { d: "M4 5h7v14H4zM13 5h7v14h-7z", text: t("feat.one") },
    { d: "M12 4 2 9l10 5 10-5zM5 12v4c0 1.7 3.1 3 7 3s7-1.3 7-3v-4", text: t("feat.two") },
    { d: "M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM2 20c0-3 3-5 7-5s7 2 7 5M17 11a3 3 0 1 0 0-6", text: t("feat.three") },
    { d: "M8 3h8a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM11 18h2", text: t("feat.four") },
  ];
  return (
    <section className="bg-[#0b1626] pb-20">
      <div className="container-page">
        <div className="grid items-center gap-8 rounded-3xl border border-white/10 bg-[#0f1f33] p-8 lg:grid-cols-[minmax(0,280px)_1fr] lg:p-10">
          <div>
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#f2cf85]">{t("feat.eyebrow")}</p>
            <h2 className="mt-2 font-display text-4xl text-white">{t("feat.title")}</h2>
            <span className="mt-3 block h-1 w-24 rounded-full bg-[#c8342c]" />
          </div>
          <div className="grid gap-7 sm:grid-cols-2 xl:grid-cols-4">
            {items.map((item) => (
              <div key={item.text} className="text-center">
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-[#f2cf85]/40">
                  <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="#f2cf85" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d={item.d} />
                  </svg>
                </span>
                <p className="mt-3 text-sm leading-snug text-white/80">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Страница ---------------- */

export function HomeView() {
  return (
    <>
      <QuestHero />
      <QuestCards />
      <FeatureStrip />

    </>
  );
}
