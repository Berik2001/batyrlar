/**
 * Общая инициализация страницы: орнаменты, header/footer, переводы, reveal.
 *
 *   initPage({ render })  — render() вызывается при старте и при каждой смене языка.
 */
import { applyTranslations } from "./i18n.js";
import { mountLayout } from "./layout.js";
import { mountOrnaments } from "./ornaments.js";
import { initReveal } from "./reveal.js";
import { initSmoothScroll } from "./smooth-scroll.js";
import { initMotion } from "./motion.js";
import { initTilt } from "./tilt.js";

export function bootstrap() {
  document.documentElement.classList.remove("no-js");
  mountOrnaments();
  mountLayout();
  applyTranslations();
  // Lenis подключён классическим defer-скриптом и к этому моменту уже загружен
  initSmoothScroll();
}

/** Эффекты поверх готовой разметки: 3D-наклон и движение на скролле. Вызывать после каждой перерисовки. */
export function enhance(root = document) {
  initTilt(root);
  initMotion(root);
}

export function initPage({ render } = {}) {
  bootstrap();
  render?.();
  initReveal();
  enhance();

  document.addEventListener("langchange", () => {
    render?.();
    enhance();
    // Контент уже был показан — после смены языка не анимируем его повторно
    document.querySelectorAll("[data-reveal]").forEach((el) => el.classList.add("is-visible"));
  });
}
