import { BATYRS, byType } from "./data/batyrs.js";
import { ARCS } from "./data/arcs.js";
import { ornament } from "./ornaments.js";
import { pick, t } from "./i18n.js";
import { bootstrap, enhance } from "./app.js";
import { batyrCard, batyrMedia, escapeHtml } from "./card.js";
import { initReveal } from "./reveal.js";


/* ---------------- Hero: побуквенная анимация заголовка ---------------- */
function splitHeroTitle() {
  const title = document.querySelector(".hero__title");
  if (!title || title.dataset.split) return;
  const text = title.textContent.trim();
  title.setAttribute("aria-label", text);
  title.innerHTML = [...text]
    .map((ch, i) => `<span class="hero__char" aria-hidden="true" style="--i:${i}">${ch}</span>`)
    .join("");
  title.dataset.split = "1";
}

/* ---------------- Карусель топ-батыров ---------------- */
function renderTop() {
  const track = document.getElementById("top-track");
  const scroll = track.scrollLeft;
  track.innerHTML = BATYRS.filter((b) => b.top)
    .map((b) => `<li class="carousel__item">${batyrCard(b)}</li>`)
    .join("");
  track.scrollLeft = scroll;
}

function initCarousel(root) {
  const track = root.querySelector(".carousel__track");
  const prev = root.querySelector("[data-carousel-prev]");
  const next = root.querySelector("[data-carousel-next]");
  const bar = root.querySelector(".carousel__progress-bar");

  const page = () => Math.max(track.clientWidth * 0.85, 240);
  const update = () => {
    const max = track.scrollWidth - track.clientWidth;
    prev.disabled = track.scrollLeft <= 2;
    next.disabled = track.scrollLeft >= max - 2;
    const ratio = track.clientWidth / track.scrollWidth;
    const progress = max > 0 ? track.scrollLeft / max : 0;
    bar.style.width = `${ratio * 100}%`;
    bar.style.transform = `translateX(${progress * (1 / ratio - 1) * 100}%)`;
  };

  prev.addEventListener("click", () => track.scrollBy({ left: -page(), behavior: "smooth" }));
  next.addEventListener("click", () => track.scrollBy({ left: page(), behavior: "smooth" }));
  track.addEventListener("scroll", () => requestAnimationFrame(update), { passive: true });
  window.addEventListener("resize", update);

  // Drag мышью (touch и трекпад и так работают через нативный скролл)
  let startX = 0, startScroll = 0, dragged = false, down = false;
  track.addEventListener("pointerdown", (e) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    down = true; dragged = false;
    startX = e.clientX; startScroll = track.scrollLeft;
  });
  window.addEventListener("pointermove", (e) => {
    if (!down) return;
    const dx = e.clientX - startX;
    if (!dragged && Math.abs(dx) > 5) {
      dragged = true;
      track.classList.add("is-dragging");
    }
    if (dragged) track.scrollLeft = startScroll - dx;
  });
  window.addEventListener("pointerup", () => {
    if (!down) return;
    down = false;
    track.classList.remove("is-dragging");
    setTimeout(() => { dragged = false; }, 0); // после click, который мог последовать за drag
  });
  // Не открываем карточку, если это был drag
  track.addEventListener("click", (e) => {
    if (dragged) e.preventDefault();
  }, true);

  update();
  return update;
}

/* ---------------- Spotlight: батыр дня ---------------- */
function renderSpotlight() {
  const b = BATYRS.find((x) => x.featured) ?? BATYRS[0];
  const el = document.getElementById("spotlight");
  el.innerHTML = `
    <div class="spotlight__media" data-reveal="left">
      <div class="frame">
        ${batyrMedia(b)}
        <svg class="frame__corner frame__corner--tl" aria-hidden="true"><use href="#orn-corner"/></svg>
        <svg class="frame__corner frame__corner--br" aria-hidden="true"><use href="#orn-corner"/></svg>
      </div>
      ${b.years ? `<span class="spotlight__years" aria-hidden="true">${b.years}</span>` : ""}
    </div>
    <div class="spotlight__content" data-reveal="right">
      <span class="eyebrow">${t("spot.eyebrow")}</span>
      <h2 class="spotlight__name">${escapeHtml(pick(b.name))}</h2>
      <p class="spotlight__epithet">${escapeHtml(pick(b.epithet))} · ${escapeHtml(pick(b.era))}</p>
      <p class="spotlight__bio">${escapeHtml(pick(b.bio))}</p>
      <blockquote class="spotlight__quote">
        <p>${escapeHtml(pick(b.quote.text))}</p>
        <cite>${escapeHtml(pick(b.quote.source))}</cite>
      </blockquote>
      <a class="btn btn--gold" href="batyr.html?id=${b.id}">
        <span>${t("spot.cta")}</span>
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
      </a>
    </div>`;
}

/* ---------------- Цитата Махамбета ---------------- */
function renderQuote() {
  const b = BATYRS.find((x) => x.id === "makhambet");
  const el = document.getElementById("quote-band-content");
  el.innerHTML = `
    <blockquote class="quote-band__quote">
      <p>${pick(b.quote.text).split("\n").map(escapeHtml).join("<br>")}</p>
      <footer><a href="batyr.html?id=${b.id}">${escapeHtml(pick(b.name))}</a>, <cite>${escapeHtml(pick(b.quote.source).replace(/^[^,]+,\s*/, ""))}</cite></footer>
    </blockquote>`;
}

function renderCounts() {
  const counts = { all: BATYRS.length, arcs: ARCS.length };
  document.querySelectorAll("[data-count]").forEach((el) => {
    const key = el.dataset.count;
    el.textContent = counts[key] ?? byType(key).length;
  });
}

/* ---------------- Бегущая строка имён ---------------- */
function renderMarquee() {
  const items = BATYRS.map((b) => `<span class="marquee__item">${escapeHtml(pick(b.name))}${ornament("koshkar")}</span>`).join("");
  // Две копии подряд — анимация до -50% даёт бесшовный цикл
  document.getElementById("marquee").innerHTML = items + items;
}

/* ---------------- Init ---------------- */
function renderDynamic() {
  renderTop();
  renderSpotlight();
  renderQuote();
  renderCounts();
  renderMarquee();
}

splitHeroTitle();
bootstrap();
renderDynamic();
const updateCarousel = initCarousel(document.querySelector("[data-carousel]"));
initReveal();
enhance();

document.addEventListener("langchange", () => {
  const spotlight = document.getElementById("spotlight");
  const seen = Boolean(spotlight.querySelector(".is-visible"));
  renderDynamic();
  updateCarousel();
  enhance();
  // Уже показанный блок не анимируем повторно, ещё не показанный — снова наблюдаем
  if (seen) spotlight.querySelectorAll("[data-reveal]").forEach((el) => el.classList.add("is-visible"));
  else initReveal(spotlight);
});
