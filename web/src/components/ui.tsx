"use client";

/**
 * Общие элементы интерфейса: орнаменты, кнопки, появление при скролле,
 * карточка батыра. Всё на Tailwind-токенах из globals.css.
 */
import Link from "next/link";
import NextImage from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { Batyr } from "@/data/batyrs";
import { useT } from "@/lib/use-t";

/* ---------------- Орнаменты ---------------- */

export function KoshkarOrnament({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 100" className={className} aria-hidden="true" fill="none">
      <g stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
        <path d="M60 92V54c0-18 12-30 26-30 12 0 20 10 20 20s-8 18-16 18c-6 0-12-4-12-11 0-5 4-9 9-9" />
        <path d="M60 54c0-18-12-30-26-30-12 0-20 10-20 20s8 18 16 18c6 0 12-4 12-11 0-5-4-9-9-9" />
        <path d="M60 30V8M52 16l8-8 8 8" />
      </g>
    </svg>
  );
}

export function RosetteOrnament({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true" fill="none">
      <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <circle cx="60" cy="60" r="52" opacity=".5" />
        {[0, 90, 180, 270].map((deg) => (
          <g key={deg} transform={`rotate(${deg} 60 60)`}>
            <path d="M60 60c0-16 10-28 22-28 9 0 15 7 15 15s-6 14-13 14c-5 0-9-3-9-8 0-4 3-7 7-7" />
            <path d="M60 14l6 8-6 8-6-8z" />
          </g>
        ))}
      </g>
    </svg>
  );
}

/* ---------------- Появление при скролле ---------------- */

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ---------------- Кнопки ---------------- */

const goldButton =
  "inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs font-bold uppercase tracking-[0.16em] text-[#1a1208] " +
  "bg-[linear-gradient(135deg,#f2cf85_0%,#d6aa5c_45%,#a8782f_100%)] shadow-[0_10px_30px_-12px_rgba(168,120,47,.9)] " +
  "transition-transform duration-300 hover:-translate-y-0.5";

const ghostButton =
  "inline-flex items-center gap-2 rounded-full border border-line-strong px-6 py-3 text-xs font-bold uppercase " +
  "tracking-[0.16em] text-ink transition-colors duration-300 hover:border-gold hover:text-gold";

export function GoldLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className={goldButton}>
      {children}
      <span aria-hidden="true">→</span>
    </Link>
  );
}

export function GhostLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className={ghostButton}>
      {children}
    </Link>
  );
}

/* ---------------- Карточка батыра ---------------- */

export function BatyrCard({ batyr, priority = false }: { batyr: Batyr; priority?: boolean }) {
  const { t, pick } = useT();
  const meta = batyr.type === "historical" ? batyr.years : pick(batyr.source ?? batyr.era);

  return (
    <motion.article whileHover={{ y: -6 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}>
      <Link
        href={`/batyrs/${batyr.id}`}
        className="group block rounded-[var(--radius-card)] border border-line bg-surface p-2.5 shadow-[var(--shadow-card)] transition-shadow duration-300 hover:shadow-[var(--shadow-lift)]"
      >
        <div className="relative aspect-3/4 overflow-hidden rounded-[18px]">
          {batyr.image ? (
            <NextImage
              src={batyr.image}
              alt={pick(batyr.name)}
              fill
              priority={priority}
              sizes="(max-width: 700px) 50vw, (max-width: 1100px) 33vw, 25vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div
              className="grid h-full place-items-center"
              style={{ background: `linear-gradient(160deg, ${batyr.palette[0]}, ${batyr.palette[1]})` }}
            >
              <RosetteOrnament className="absolute inset-0 m-auto w-2/3 text-gold opacity-25" />
              <span className="font-display text-6xl text-gold">{pick(batyr.name).charAt(0)}</span>
            </div>
          )}
          {/* Тонкая золотая рамка внутри паспарту */}
          <span className="pointer-events-none absolute inset-2 rounded-[12px] border border-[rgba(214,170,92,.35)] transition-colors duration-300 group-hover:border-[rgba(214,170,92,.75)]" />
        </div>
        <div className="px-2 pb-2 pt-4">
          <span
            className={`text-[0.66rem] font-bold uppercase tracking-[0.18em] ${
              batyr.type === "historical" ? "text-sky" : "text-gold"
            }`}
          >
            ◆ {t(`type.${batyr.type}`)}
          </span>
          <h3 className="mt-1.5 font-display text-2xl text-ink">{pick(batyr.name)}</h3>
          <p className="mt-1 text-sm text-muted">{meta}</p>
        </div>
      </Link>
    </motion.article>
  );
}

/* ---------------- Заголовок секции ---------------- */

export function SectionHead({
  eyebrow,
  title,
  action,
}: {
  eyebrow: string;
  title: string;
  action?: React.ReactNode;
}) {
  return (
    <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="eyebrow flex items-center gap-3">
          <span className="h-px w-8 bg-gold" />
          {eyebrow}
        </p>
        <h2 className="mt-3 text-h2">{title}</h2>
      </div>
      {action}
    </Reveal>
  );
}

/* ---------------- Шапка внутренней страницы ---------------- */

export function PageHero({
  eyebrow,
  title,
  lead,
  image,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  image?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-bg-2 pb-16 pt-[calc(var(--header-h)+64px)]">
      {image && (
        <>
          <NextImage src={image} alt="" fill priority sizes="100vw" className="object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-2 via-bg-2/70 to-bg-2/30" />
        </>
      )}
      <RosetteOrnament className="pointer-events-none absolute -right-16 -top-10 h-80 w-80 text-gold opacity-10" />
      <div className="container-page relative">
        <p className="eyebrow flex items-center gap-3">
          <span className="h-px w-8 bg-gold" />
          {eyebrow}
        </p>
        <h1 className="mt-4 text-h1 text-gradient-gold">{title}</h1>
        {lead && <p className="mt-4 max-w-xl text-lead text-muted">{lead}</p>}
      </div>
    </section>
  );
}
