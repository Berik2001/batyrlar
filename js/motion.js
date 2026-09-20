/**
 * Движение на скролле — Motion (MIT, github.com/motiondivision/motion).
 * Берём только то, чего нет в CSS:
 *   [data-parallax]  — картинка едет медленнее страницы,
 *   [data-count]     — числа набегают до своего значения.
 * Грузится с CDN, при недоступности или prefers-reduced-motion всё остаётся статичным.
 */
let motion = null;

const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

export async function initMotion(root = document) {
  if (reduced()) return;
  motion ??= await import("https://cdn.jsdelivr.net/npm/motion@12.23.12/+esm").catch(() => null);
  if (!motion) return;
  parallax(root);
  counters(root);
}

/** Картинка внутри своей рамки смещается на ±8% по мере прохода секции через экран. */
function parallax(root) {
  const { scroll, animate } = motion;
  root.querySelectorAll("[data-parallax]:not([data-motion-on])").forEach((img) => {
    img.dataset.motionOn = "1";
    img.style.willChange = "transform";
    scroll(animate(img, { y: ["-6%", "6%"] }, { ease: "linear" }), {
      target: img.closest(".hero__arch, .arc__visual, .arc-section__visual, .page-hero, .frame") ?? img,
      offset: ["start end", "end start"],
    });
  });
}

/** Счётчики в hero: 0 → значение, когда блок появляется в кадре. */
function counters(root) {
  const { inView, animate } = motion;
  root.querySelectorAll("[data-count]:not([data-motion-on])").forEach((el) => {
    const target = Number(el.textContent.trim());
    if (!Number.isFinite(target) || target <= 0) return;
    el.dataset.motionOn = "1";
    inView(el, () => {
      animate(0, target, {
        duration: 1.1,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (v) => { el.textContent = String(Math.round(v)); },
      });
    }, { amount: 0.8 });
  });
}
