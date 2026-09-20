/**
 * Карточка батыра — используется в карусели, каталоге и "связанных батырах".
 * Если у батыра нет изображения, рисуется градиент из palette + орнамент + монограмма.
 */
import { pick, t } from "./i18n.js";
import { ornament } from "./ornaments.js";

const escapeHtml = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/** Медиа-блок: портрет или орнаментальная заглушка. Переиспользуется в spotlight. */
export function batyrMedia(b, { eager = false } = {}) {
  const name = pick(b.name);
  if (b.image) {
    return `<img class="media__img" src="${b.image}" alt="${escapeHtml(name)}"
                 loading="${eager ? "eager" : "lazy"}" decoding="async">`;
  }
  const [c1, c2] = b.palette;
  return `
    <div class="placeholder" style="--c1:${c1};--c2:${c2}" role="img" aria-label="${escapeHtml(name)}">
      ${ornament("rosette", "placeholder__rosette")}
      <span class="placeholder__monogram" aria-hidden="true">${escapeHtml(name.charAt(0))}</span>
    </div>`;
}

export function batyrCard(b) {
  const name = pick(b.name);
  const meta = b.type === "historical" ? b.years : pick(b.source);
  return `
    <article class="card card--${b.type}">
      <a class="card__link" href="batyr.html?id=${encodeURIComponent(b.id)}">
        <div class="card__media">${batyrMedia(b)}</div>
        <div class="card__body">
          <span class="card__tag">${t(`type.${b.type}`)}</span>
          <h3 class="card__name">${escapeHtml(name)}</h3>
          <p class="card__meta">${escapeHtml(meta)}</p>
        </div>
      </a>
    </article>`;
}

export { escapeHtml };
