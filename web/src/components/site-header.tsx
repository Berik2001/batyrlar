"use client";

/**
 * Шапка: логотип, навигация, переключатель языка и темы, мобильное меню.
 * Фон матовый, при скролле становится плотнее.
 */
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { LANGS } from "@/lib/i18n";
import { useApp } from "@/lib/store";
import { useT } from "@/lib/use-t";
import { KoshkarOrnament } from "@/components/ui";

const NAV = [
  { href: "/", key: "nav.home" },
  { href: "/batyrs", key: "nav.batyrs" },
  { href: "/history", key: "nav.history" },
  { href: "/media", key: "nav.media" },
] as const;

export function SiteHeader() {
  const { t } = useT();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  // Меню помним вместе с маршрутом: при переходе оно закрывается само, без эффекта
  const [menuPath, setMenuPath] = useState<string | null>(null);
  const lang = useApp((s) => s.lang);
  const setLang = useApp((s) => s.setLang);
  const theme = useApp((s) => s.theme);
  const toggleTheme = useApp((s) => s.toggleTheme);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    // первый замер — следующим кадром, чтобы не дёргать setState прямо в эффекте
    const frame = requestAnimationFrame(onScroll);
    addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener("scroll", onScroll);
    };
  }, []);

  const menuOpen = menuPath === pathname;

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 backdrop-blur-xl transition-colors duration-300 ${
        scrolled ? "bg-bg/85 border-b border-line" : "bg-bg/60"
      }`}
    >
      <div className="container-page flex h-[var(--header-h)] items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-0 rounded-xl" aria-label="Batyrlar">
          <span className="grid h-10 w-10 place-items-center rounded-l-xl bg-ink text-gold">
            <KoshkarOrnament className="h-5 w-6" />
          </span>
          <span className="rounded-r-xl bg-[linear-gradient(135deg,#f2cf85_0%,#d6aa5c_45%,#a8782f_100%)] px-3 py-2 font-display text-base font-semibold tracking-[0.14em] text-[#1a1208] sm:px-4 sm:text-xl sm:tracking-[0.18em]">
            BATYRLAR
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="primary">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative text-xs font-bold uppercase tracking-[0.16em] transition-colors ${
                isActive(item.href) ? "text-ink" : "text-muted hover:text-gold"
              }`}
            >
              {t(item.key)}
              {isActive(item.href) && (
                <motion.span layoutId="nav-underline" className="absolute -bottom-2 left-0 h-px w-full bg-gold" />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div
            className="hidden items-center rounded-full border border-line p-1 sm:flex"
            role="group"
            aria-label={t("lang.label")}
          >
            {LANGS.map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setLang(code)}
                aria-pressed={lang === code}
                className={`rounded-full px-2.5 py-1 text-[0.68rem] font-bold uppercase tracking-[0.12em] transition-colors ${
                  lang === code
                    ? "bg-[linear-gradient(135deg,#f2cf85_0%,#d6aa5c_45%,#a8782f_100%)] text-[#1a1208]"
                    : "text-muted hover:text-gold"
                }`}
              >
                {code}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={t("theme.toggle")}
            className="grid h-9 w-9 place-items-center rounded-full border border-line text-gold transition-colors hover:border-gold"
          >
            {theme === "dark" ? (
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="4.5" />
                <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" />
              </svg>
            )}
          </button>

          <button
            type="button"
            onClick={() => setMenuPath((v) => (v === pathname ? null : pathname))}
            aria-label={t("nav.menu")}
            aria-expanded={menuOpen}
            className="grid h-9 w-9 place-items-center rounded-full border border-line text-ink md:hidden"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              {menuOpen ? <path d="M5 5l14 14M19 5L5 19" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-line bg-bg/95 md:hidden"
            aria-label="mobile"
          >
            <div className="container-page flex flex-col gap-1 py-4">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-xl px-2 py-3 font-display text-2xl text-ink"
                >
                  {t(item.key)}
                </Link>
              ))}
              {/* На узких экранах язык переключается здесь: в баре для него нет места */}
              <div className="mt-3 flex gap-2 border-t border-line pt-4 sm:hidden" role="group" aria-label={t("lang.label")}>
                {LANGS.map((code) => (
                  <button
                    key={code}
                    type="button"
                    onClick={() => setLang(code)}
                    aria-pressed={lang === code}
                    className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] transition-colors ${
                      lang === code
                        ? "bg-[linear-gradient(135deg,#f2cf85_0%,#d6aa5c_45%,#a8782f_100%)] text-[#1a1208]"
                        : "border border-line text-muted"
                    }`}
                  >
                    {code}
                  </button>
                ))}
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
