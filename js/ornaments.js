/**
 * SVG-орнаменты.
 *  - Спрайт <symbol> для мотивов (қошқар-мүйіз, розетка-тұмар), подключается через <use>.
 *  - Data-URI для CSS-фонов (кереге-решётка, орнаментальная лента).
 */

const KOSHKAR_PATHS = `
  <path d="M60 94V58"/>
  <path d="M60 58C60 30 34 20 20 34C8 46 18 66 34 60C46 55 42 40 32 42C26 43 26 50 31 51"/>
  <path d="M60 58C60 30 86 20 100 34C112 46 102 66 86 60C74 55 78 40 88 42C94 43 94 50 89 51"/>
  <path d="M60 80C54 71 43 72 43 80C43 87 52 88 53 82"/>
  <path d="M60 80C66 71 77 72 77 80C77 87 68 88 67 82"/>
  <path d="M60 4L68 13L60 22L52 13Z"/>`;

export const SPRITE = `
<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"
     style="position:absolute;width:0;height:0;overflow:hidden">
  <symbol id="orn-koshkar" viewBox="0 0 120 100" fill="none" stroke="currentColor"
          stroke-width="4" stroke-linecap="round" stroke-linejoin="round">${KOSHKAR_PATHS}</symbol>

  <symbol id="orn-rosette" viewBox="0 0 240 240" fill="none" stroke="currentColor"
          stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="120" cy="120" r="112" stroke-width="2"/>
    <circle cx="120" cy="120" r="100" stroke-width="1" stroke-dasharray="2 8"/>
    <circle cx="120" cy="120" r="14"/>
    ${[0, 90, 180, 270].map((deg) => `
    <g transform="rotate(${deg} 120 120) translate(60 8)">${KOSHKAR_PATHS}</g>`).join("")}
    ${[45, 135, 225, 315].map((deg) => `
    <path transform="rotate(${deg} 120 120)" d="M120 30L128 42L120 54L112 42Z"/>`).join("")}
  </symbol>

  <symbol id="orn-corner" viewBox="0 0 80 80" fill="none" stroke="currentColor"
          stroke-width="3" stroke-linecap="round">
    <path d="M4 76V4H76"/>
    <path d="M14 66V14H66" stroke-width="1.5"/>
    <path d="M14 14C30 14 36 24 30 32C25 38 18 32 22 27"/>
  </symbol>
</svg>`;

/** Иконка-мотив через спрайт. */
export const ornament = (id, className = "") =>
  `<svg class="${className}" aria-hidden="true" focusable="false"><use href="#orn-${id}"/></svg>`;

const toDataUri = (svg) => `url("data:image/svg+xml,${encodeURIComponent(svg.replace(/\s+/g, " ").trim())}")`;

/** Кереге — ромбическая решётка стены юрты. */
export const keregePattern = (color = "#d6aa5c", size = 28) => toDataUri(`
  <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 28 28">
    <g stroke="${color}" stroke-width="1" fill="none">
      <path d="M0 0L28 28M28 0L0 28"/>
    </g>
    <g fill="${color}">
      <circle cx="14" cy="14" r="1.8"/>
      <circle cx="0" cy="0" r="1.8"/><circle cx="28" cy="0" r="1.8"/>
      <circle cx="0" cy="28" r="1.8"/><circle cx="28" cy="28" r="1.8"/>
    </g>
  </svg>`);

/** Орнаментальная лента: бегущие қошқар-мүйіз между двумя линиями. */
export const bandPattern = (color = "#d6aa5c") => toDataUri(`
  <svg xmlns="http://www.w3.org/2000/svg" width="60" height="28" viewBox="0 0 60 28">
    <g stroke="${color}" fill="none" stroke-width="1.6" stroke-linecap="round">
      <path d="M0 1.5H60M0 26.5H60" stroke-width="1"/>
      <path d="M30 22V15C30 8 22 6 18 10C14 14 18 19 22 17C25 15.5 23 12 20.5 13"/>
      <path d="M30 15C30 8 38 6 42 10C46 14 42 19 38 17C35 15.5 37 12 39.5 13"/>
      <path d="M0 14L4 10L8 14L4 18ZM52 14L56 10L60 14L56 18Z"/>
    </g>
  </svg>`);

/** Кладёт спрайт в документ и прокидывает паттерны в CSS-переменные. */
export function mountOrnaments() {
  if (!document.getElementById("orn-koshkar")) {
    document.body.insertAdjacentHTML("afterbegin", SPRITE);
  }
  const root = document.documentElement.style;
  root.setProperty("--pattern-kerege-gold", keregePattern("#d6aa5c"));
  root.setProperty("--pattern-kerege-bronze", keregePattern("#8a5a2b"));
  root.setProperty("--pattern-band-gold", bandPattern("#d6aa5c"));
  root.setProperty("--pattern-band-bronze", bandPattern("#9a6a1c"));
}
