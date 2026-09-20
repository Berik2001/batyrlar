"use client";

import Link from "next/link";
import { useT } from "@/lib/use-t";
import { KoshkarOrnament } from "@/components/ui";

const SOCIALS = [
  { label: "Instagram", d: "M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.3 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .3-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.2-2.2-.4a3.9 3.9 0 0 1-1.4-.9 3.9 3.9 0 0 1-.9-1.4c-.2-.4-.3-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.3 2.2-.4C8.4 2.2 8.8 2.2 12 2.2Zm0 3.3a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13Zm0 10.7a4.2 4.2 0 1 1 0-8.4 4.2 4.2 0 0 1 0 8.4Zm6.7-10.9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" },
  { label: "YouTube", d: "M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15V9l5.2 3L10 15Z" },
  { label: "Telegram", d: "M21.9 4.3 18.9 19c-.2 1-.8 1.3-1.7.8l-4.6-3.4-2.2 2.1c-.2.2-.5.5-1 .5l.3-4.7 8.5-7.7c.4-.3-.1-.5-.6-.2L6.9 12.9l-4.5-1.4c-1-.3-1-1 .2-1.4l17.6-6.8c.8-.3 1.5.2 1.7 1Z" },
  { label: "TikTok", d: "M16.5 3c.3 2.2 1.6 3.6 3.8 3.8v2.6c-1.3.1-2.5-.2-3.8-1v5.9c0 5.2-5.7 6.9-8.3 3.2-1.7-2.4-.8-6.6 3.9-6.8v2.7c-.4.1-.8.2-1.1.3-1 .3-1.5 1-1.4 2 .3 1.9 3.8 2.5 3.5-1.2V3h3.4Z" },
  { label: "Facebook", d: "M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.7-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12Z" },
] as const;

const NAV = [
  { href: "/", key: "nav.home" },
  { href: "/batyrs", key: "nav.batyrs" },
  { href: "/history", key: "nav.history" },
  { href: "/media", key: "nav.media" },
] as const;

export function SiteFooter() {
  const { t } = useT();

  return (
    <footer className="mt-24 border-t border-line bg-bg-2">
      <div className="container-page grid gap-12 py-14 md:grid-cols-[2fr_1fr_1fr]">
        <div>
          <div className="flex w-fit items-center">
            <span className="grid h-10 w-10 place-items-center rounded-l-xl bg-ink text-gold">
              <KoshkarOrnament className="h-5 w-6" />
            </span>
            <span className="rounded-r-xl bg-[linear-gradient(135deg,#f2cf85_0%,#d6aa5c_45%,#a8782f_100%)] px-4 py-2 font-display text-xl font-semibold tracking-[0.18em] text-[#1a1208]">
              BATYRLAR
            </span>
          </div>
          <p className="mt-5 max-w-[34ch] text-muted">{t("footer.tagline")}</p>
        </div>

        <div>
          <h2 className="eyebrow mb-4">{t("footer.explore")}</h2>
          <ul className="grid gap-2.5">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-muted transition-colors hover:text-gold">
                  {t(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="eyebrow mb-4">{t("footer.follow")}</h2>
          <ul className="flex flex-wrap gap-2.5">
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <a
                  href="#"
                  aria-label={s.label}
                  className="grid h-11 w-11 place-items-center rounded-full border border-line bg-surface text-muted shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold hover:text-[#1a1208]"
                >
                  <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor">
                    <path d={s.d} />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container-page flex flex-wrap justify-between gap-3 border-t border-line py-6 text-sm text-dim">
        <p>© {new Date().getFullYear()} Batyrlar.com. {t("footer.rights")}</p>
        <p>{t("footer.note")}</p>
      </div>
    </footer>
  );
}
