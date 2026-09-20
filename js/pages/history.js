/**
 * "Тарих": сюжетные арки с хронологией событий и ключевыми фигурами.
 */
import { ARCS } from "../data/arcs.js";
import { getBatyr } from "../data/batyrs.js";
import { initPage } from "../app.js";
import { pick, t } from "../i18n.js";
import { batyrCard, escapeHtml } from "../card.js";
import { ornament } from "../ornaments.js";

const jumpRoot = document.getElementById("arc-jump");
const arcsRoot = document.getElementById("arcs");

function arcVisual(arc) {
  if (arc.image) {
    return `<img class="arc-section__img" data-parallax src="${arc.image}" alt="" loading="lazy" decoding="async">`;
  }
  const [c1, c2] = arc.palette;
  return `
    <div class="placeholder arc-section__placeholder" style="--c1:${c1};--c2:${c2}" aria-hidden="true">
      ${ornament("rosette", "placeholder__rosette")}
      <span class="arc-section__placeholder-years">${arc.years}</span>
    </div>`;
}

function render() {
  jumpRoot.innerHTML = ARCS.map((arc, i) => `
    <li data-reveal>
      <a class="arc-jump__link" href="#${arc.id}">
        <span class="arc-jump__num">${t("history.arc")} ${String(i + 1).padStart(2, "0")}</span>
        <span class="arc-jump__title">${escapeHtml(pick(arc.title))}</span>
        <span class="arc-jump__years">${arc.years}</span>
      </a>
    </li>`).join("");

  arcsRoot.innerHTML = ARCS.map((arc, i) => {
    const figures = arc.figures.map(getBatyr).filter(Boolean);
    return `
      <article class="arc-section" id="${arc.id}" aria-labelledby="${arc.id}-title">
        <div class="container">
          <header class="arc-section__head">
            <div class="arc-section__intro" data-reveal="left">
              <p class="eyebrow">${t("history.arc")} ${String(i + 1).padStart(2, "0")} · ${arc.years}</p>
              <h2 class="arc-section__title" id="${arc.id}-title">${escapeHtml(pick(arc.title))}</h2>
              <p class="arc-section__lead">${escapeHtml(pick(arc.lead))}</p>
            </div>
            <div class="arc-section__visual" data-reveal="right">${arcVisual(arc)}</div>
          </header>

          <section class="detail-section" aria-labelledby="${arc.id}-events">
            <h3 class="detail-title" id="${arc.id}-events" data-reveal>${t("history.events")}</h3>
            <ol class="timeline timeline--events" data-reveal-stagger="0.08">
              ${arc.events.map((ev) => `
                <li class="timeline__item" data-reveal>
                  <span class="timeline__marker" aria-hidden="true"></span>
                  <span class="timeline__label">${ev.year}</span>
                  <h4 class="timeline__heading">${escapeHtml(pick(ev.title))}</h4>
                  <p class="timeline__text">${escapeHtml(pick(ev.text))}</p>
                </li>`).join("")}
            </ol>
          </section>

          <section class="detail-section" aria-labelledby="${arc.id}-figures">
            <h3 class="detail-title" id="${arc.id}-figures" data-reveal>${t("history.figures")}</h3>
            <ul class="catalog catalog--figures" role="list" data-reveal-stagger="0.1">
              ${figures.map((b) => `<li class="catalog__item" data-reveal>${batyrCard(b)}</li>`).join("")}
            </ul>
          </section>

          <a class="link-arrow arc-section__top" href="#arc-jump-title">↑ ${t("history.toTop")}</a>
        </div>
      </article>`;
  }).join("");
}

initPage({ render });

// Переход по якорю из главной (history.html#jongar) после того, как контент отрисован
if (location.hash) document.getElementById(location.hash.slice(1))?.scrollIntoView();
