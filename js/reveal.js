/**
 * Анимации при скролле: элементы с [data-reveal] получают .is-visible при входе во viewport.
 * Для групп: [data-reveal-stagger] на родителе раздаёт дочерним [data-reveal] задержку.
 */
export function initReveal(root = document) {
  root.querySelectorAll("[data-reveal-stagger]").forEach((group) => {
    const step = parseFloat(group.dataset.revealStagger) || 0.08;
    group.querySelectorAll("[data-reveal]").forEach((el, i) => {
      el.style.setProperty("--reveal-delay", `${(i * step).toFixed(2)}s`);
    });
  });

  const items = root.querySelectorAll("[data-reveal]:not(.is-visible)");
  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.12 }
  );
  items.forEach((el) => io.observe(el));
}
