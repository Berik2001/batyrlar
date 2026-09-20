/**
 * Плавная прокрутка на Lenis (MIT, https://github.com/darkroomengineering/lenis).
 * Библиотека грузится с CDN; если её нет или пользователь просит меньше движения —
 * остаётся нативный скролл, всё продолжает работать.
 */
let lenis = null;

export function initSmoothScroll() {
  if (lenis || !window.Lenis || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  lenis = new window.Lenis({ lerp: 0.1, smoothWheel: true });
  const raf = (time) => {
    lenis.raf(time);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);

  // Якорные ссылки на той же странице — через Lenis, с учётом фиксированного header
  document.addEventListener("click", (e) => {
    const link = e.target.closest('a[href^="#"]');
    const id = link?.getAttribute("href").slice(1);
    const target = id && document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    const headerH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-h")) || 0;
    lenis.scrollTo(target, { offset: -headerH });
    history.replaceState(null, "", `#${id}`);
  });
}

/** Блокировка прокрутки страницы (меню, модальные окна). */
export const lockScroll = () => lenis?.stop();
export const unlockScroll = () => lenis?.start();
