/**
 * 3D-наклон карточек при наведении — vanilla-tilt.js (MIT, github.com/micku7zu/vanilla-tilt.js).
 * Библиотека грузится с CDN и только там, где наклон уместен: мышь есть, движение не отключено.
 * Если CDN недоступен, сайт просто остаётся без наклона — остальное не ломается.
 *
 * Наклон вешается на внешний элемент (.card, .gallery__item), а подъём и тень при hover
 * остаются на внутреннем: так inline-transform от библиотеки не перебивает CSS.
 */
const SELECTOR = ".card, .gallery__item, .category, .hero__arch";

const OPTIONS = {
  max: 7,
  speed: 500,
  scale: 1.015,
  glare: true,
  "max-glare": 0.18,
  gyroscope: false,
};

let libPromise = null;

const enabled = () =>
  matchMedia("(hover: hover) and (pointer: fine)").matches &&
  !matchMedia("(prefers-reduced-motion: reduce)").matches;

async function lib() {
  // /+esm — ESM-сборка от jsDelivr: сам пакет собран в UMD и как модуль не грузится
  libPromise ??= import("https://cdn.jsdelivr.net/npm/vanilla-tilt@1.8.1/+esm")
    .then((m) => m.default)
    .catch(() => null);
  return libPromise;
}

/** Включает наклон для элементов внутри root (после каждой перерисовки списков). */
export async function initTilt(root = document) {
  if (!enabled()) return;
  const nodes = [...root.querySelectorAll(SELECTOR)].filter((el) => !el.vanillaTilt);
  if (!nodes.length) return;
  const VanillaTilt = await lib();
  VanillaTilt?.init(nodes, OPTIONS);
}
