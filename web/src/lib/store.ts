"use client";

/**
 * Глобальное состояние приложения на Zustand: язык, тема, выбранный батыр 3D-сцены
 * и лайтбокс галереи. Значения из localStorage подхватываются в hydrate() уже после
 * маунта — на сервере и в первом рендере всегда дефолт, поэтому нет рассинхрона.
 */
import { create } from "zustand";
import type { Lang } from "@/data/batyrs";

export type Theme = "light" | "dark";

const LANG_KEY = "batyrlar.lang";
const THEME_KEY = "batyrlar.theme";

type LightboxState = { items: string[]; index: number } | null;

interface AppState {
  lang: Lang;
  theme: Theme;
  /** id батыра, на котором сейчас стоит камера в 3D-сцене */
  activeBatyr: string | null;
  lightbox: LightboxState;
  hydrated: boolean;

  setLang: (lang: Lang) => void;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  setActiveBatyr: (id: string | null) => void;
  openLightbox: (items: string[], index: number) => void;
  closeLightbox: () => void;
  moveLightbox: (delta: number) => void;
  hydrate: () => void;
}

const isLang = (v: unknown): v is Lang => v === "kk" || v === "ru" || v === "en";
const isTheme = (v: unknown): v is Theme => v === "light" || v === "dark";

/** Класс на <html> — источник правды для CSS-переменных тёмной темы */
function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme;
}

export const useApp = create<AppState>((set, get) => ({
  lang: "kk",
  theme: "light",
  activeBatyr: null,
  lightbox: null,
  hydrated: false,

  setLang: (lang) => {
    localStorage.setItem(LANG_KEY, lang);
    document.documentElement.lang = lang;
    set({ lang });
  },

  setTheme: (theme) => {
    localStorage.setItem(THEME_KEY, theme);
    applyTheme(theme);
    set({ theme });
  },

  toggleTheme: () => get().setTheme(get().theme === "dark" ? "light" : "dark"),

  setActiveBatyr: (id) => set({ activeBatyr: id }),

  openLightbox: (items, index) => set({ lightbox: { items, index } }),
  closeLightbox: () => set({ lightbox: null }),
  moveLightbox: (delta) =>
    set((s) =>
      s.lightbox
        ? {
            lightbox: {
              ...s.lightbox,
              index: (s.lightbox.index + delta + s.lightbox.items.length) % s.lightbox.items.length,
            },
          }
        : s,
    ),

  hydrate: () => {
    if (get().hydrated) return;
    const storedLang = localStorage.getItem(LANG_KEY);
    const storedTheme = localStorage.getItem(THEME_KEY);
    const theme: Theme = isTheme(storedTheme)
      ? storedTheme
      : matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    const lang: Lang = isLang(storedLang) ? storedLang : "kk";
    applyTheme(theme);
    document.documentElement.lang = lang;
    set({ lang, theme, hydrated: true });
  },
}));

/** Тема ставится до первой отрисовки, иначе светлый фон моргнёт в тёмной теме. */
export const THEME_INIT_SCRIPT = `
(function(){try{
  var t=localStorage.getItem("${THEME_KEY}");
  if(t!=="dark"&&t!=="light"){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";}
  if(t==="dark")document.documentElement.classList.add("dark");
  document.documentElement.style.colorScheme=t;
  var l=localStorage.getItem("${LANG_KEY}");
  if(l==="kk"||l==="ru"||l==="en")document.documentElement.lang=l;
}catch(e){}})();
`;
