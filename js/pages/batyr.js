/**
 * Страница батыра: batyr.html?id=kabanbay
 * Портрет, биография, "Ерлік істері", таймлайн, цитата, связанные батыры, навигация prev/next.
 */
import { BATYRS, getBatyr } from "../data/batyrs.js";
import { initPage } from "../app.js";
import { pick, t } from "../i18n.js";
import { batyrCard, batyrMedia, escapeHtml } from "../card.js";

const id = new URLSearchParams(location.search).get("id");
const root = document.getElementById("batyr");

const arrow = (dir) => `
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
    <path d="${dir === "left" ? "M19 12H5M11 6l-6 6 6 6" : "M5 12h14M13 6l6 6-6 6"}"/>
  </svg>`;

function renderNotFound() {
  document.title = `${t("batyr.notFound")} — Batyrlar.com`;
  root.innerHTML = `
    <section class="page-hero">
      <svg class="page-hero__orn" aria-hidden="true"><use href="#orn-rosette"/></svg>
      <div class="container page-hero__inner">
        <p class="eyebrow">404</p>
        <h1 class="page-hero__title">${t("batyr.notFound")}</h1>
        <p class="page-hero__lead">${t("batyr.notFoundText")}</p>
        <a class="btn btn--gold page-hero__cta" href="batyrs.html">${arrow("left")}<span>${t("batyr.back")}</span></a>
      </div>
    </section>`;
}

function fact(label, value) {
  return value ? `<div class="facts__row"><dt>${label}</dt><dd>${escapeHtml(value)}</dd></div>` : "";
}

function renderTimeline(b) {
  const isEpic = b.type === "epic";
  return `
    <section class="detail-section" aria-labelledby="tl-title">
      <h2 class="detail-title" id="tl-title" data-reveal>${t(isEpic ? "batyr.storyline" : "batyr.timeline")}</h2>
      <ol class="timeline ${isEpic ? "timeline--story" : ""}" data-reveal-stagger="0.1">
        ${b.timeline.map((step, i) => `
          <li class="timeline__item" data-reveal>
            <span class="timeline__marker" aria-hidden="true">${isEpic ? String(i + 1).padStart(2, "0") : ""}</span>
            <span class="timeline__label">${escapeHtml(step.year ?? pick(step.label))}</span>
            <p class="timeline__text">${escapeHtml(pick(step.text))}</p>
          </li>`).join("")}
      </ol>
    </section>`;
}

function render() {
  const b = getBatyr(id);
  if (!b) return renderNotFound();

  const name = pick(b.name);
  document.title = `${name} — Batyrlar.com`;
  document.querySelector('meta[name="description"]')?.setAttribute("content", pick(b.bio).slice(0, 160));

  const index = BATYRS.indexOf(b);
  const prev = BATYRS[(index - 1 + BATYRS.length) % BATYRS.length];
  const next = BATYRS[(index + 1) % BATYRS.length];
  const related = b.related.map(getBatyr).filter(Boolean);

  root.innerHTML = `
    <section class="batyr-hero batyr-hero--${b.type}">
      <div class="batyr-hero__bg" aria-hidden="true" style="--c1:${b.palette[0]}"></div>
      <div class="container batyr-hero__grid">
        <div class="batyr-hero__media" data-reveal="left">
          <div class="frame">
            ${batyrMedia(b, { eager: true }).replace("<img", "<img data-parallax")}
            <svg class="frame__corner frame__corner--tl" aria-hidden="true"><use href="#orn-corner"/></svg>
            <svg class="frame__corner frame__corner--br" aria-hidden="true"><use href="#orn-corner"/></svg>
          </div>
        </div>

        <div class="batyr-hero__content" data-reveal="right">
          <a class="back-link" href="batyrs.html">${arrow("left")}<span>${t("batyr.back")}</span></a>
          <span class="tag tag--${b.type}">${t(`type.${b.type}`)}</span>
          <h1 class="batyr-hero__name">${escapeHtml(name)}</h1>
          <p class="batyr-hero__epithet">${escapeHtml(pick(b.epithet))}</p>
          <dl class="facts">
            ${fact(t("batyr.years"), b.years)}
            ${fact(t("batyr.era"), pick(b.era))}
            ${fact(t("batyr.source"), pick(b.source))}
          </dl>
        </div>
      </div>
      <div class="ornament-band" aria-hidden="true"></div>
    </section>

    <div class="container detail">
      <section class="detail-section detail-bio" aria-labelledby="bio-title">
        <h2 class="detail-title" id="bio-title" data-reveal>${t("batyr.bio")}</h2>
        <p class="detail-bio__text" data-reveal>${escapeHtml(pick(b.bio))}</p>
      </section>

      <section class="detail-section" aria-labelledby="deeds-title">
        <h2 class="detail-title" id="deeds-title" data-reveal>${t("batyr.deeds")}</h2>
        <ol class="deeds" data-reveal-stagger="0.1">
          ${pick(b.deeds).map((deed, i) => `
            <li class="deed" data-reveal>
              <svg class="deed__orn" aria-hidden="true"><use href="#orn-koshkar"/></svg>
              <span class="deed__num" aria-hidden="true">${String(i + 1).padStart(2, "0")}</span>
              <p class="deed__text">${escapeHtml(deed)}</p>
            </li>`).join("")}
        </ol>
      </section>

      ${renderTimeline(b)}
    </div>

    <section class="quote-band quote-band--compact" aria-label="${t("quote.eyebrow")}">
      <div class="container quote-band__inner" data-reveal="scale">
        <svg class="quote-band__orn" aria-hidden="true"><use href="#orn-koshkar"/></svg>
        <p class="eyebrow">${t("quote.eyebrow")}</p>
        <blockquote class="quote-band__quote">
          <p>${pick(b.quote.text).split("\n").map(escapeHtml).join("<br>")}</p>
          <footer><cite>${escapeHtml(pick(b.quote.source))}</cite></footer>
        </blockquote>
      </div>
    </section>

    <div class="container">
      ${related.length ? `
        <section class="detail-section" aria-labelledby="rel-title">
          <h2 class="detail-title" id="rel-title" data-reveal>${t("batyr.related")}</h2>
          <ul class="catalog catalog--related" role="list" data-reveal-stagger="0.1">
            ${related.map((r) => `<li class="catalog__item" data-reveal>${batyrCard(r)}</li>`).join("")}
          </ul>
        </section>` : ""}

      <nav class="pager" aria-label="${t("nav.batyrs")}">
        <a class="pager__link pager__link--prev" href="batyr.html?id=${prev.id}" rel="prev">
          <span class="pager__dir">${arrow("left")}${t("batyr.prev")}</span>
          <span class="pager__name">${escapeHtml(pick(prev.name))}</span>
        </a>
        <a class="pager__link pager__link--next" href="batyr.html?id=${next.id}" rel="next">
          <span class="pager__dir">${t("batyr.next")}${arrow("right")}</span>
          <span class="pager__name">${escapeHtml(pick(next.name))}</span>
        </a>
      </nav>
    </div>`;
}

initPage({ render });
