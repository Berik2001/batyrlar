/**
 * "Медиа": галерея с фильтром по категориям и лайтбоксом на нативном <dialog>
 * (Esc, фокус и inert-фон браузер обеспечивает сам; стрелки ←/→ листают).
 */
import { BATYRS } from "../data/batyrs.js";
import { enhance, initPage } from "../app.js";
import { pick, t } from "../i18n.js";
import { batyrMedia, escapeHtml } from "../card.js";
import { keregePattern } from "../ornaments.js";
import { lockScroll, unlockScroll } from "../smooth-scroll.js";

const CATS = ["all", "art", "portrait", "ornament"];

const ORNAMENT_ITEMS = [
  {
    id: "koshkar",
    src: "assets/img/orn-koshkar.jpg",
    title: { kk: "Қошқар мүйіз", ru: "Кошкар муйиз", en: "Qoshqar müiz" },
    caption: { kk: "Сырмаққа түскен қошқардың мүйізі — молшылық пен күштің белгісі", ru: "Бараньи рога на сырмаке — символ достатка и силы", en: "Ram's horns on a felt syrmaq — a symbol of abundance and strength" },
  },
  {
    id: "rosette",
    src: "assets/img/orn-rosette.jpg",
    title: { kk: "Тұмар-розетка", ru: "Тумар и розетка", en: "Tumar and rosette" },
    caption: { kk: "Күміс тұмар мен дөңгелек түйме — бірлік пен қорғаныс белгісі", ru: "Серебряный тумар и круглая розетка — знак единства и защиты", en: "A silver tumar amulet and round rosette — a sign of unity and protection" },
  },
  {
    id: "kerege",
    src: "assets/img/orn-kerege.jpg",
    title: { kk: "Кереге", ru: "Кереге", en: "Kerege" },
    caption: { kk: "Киіз үйдің торлы қабырғасы — шаңырақтың тірегі", ru: "Решётчатая стена юрты — опора дома", en: "The lattice wall of the yurt — the home's support" },
  },
  {
    id: "baskur",
    src: "assets/img/orn-band.jpg",
    title: { kk: "Бау-басқұр", ru: "Тканый бау", en: "Woven baskur" },
    caption: { kk: "Киіз үйді буатын өрнекті бау — қошқар мүйіз тізбегі", ru: "Узорная лента, стягивающая юрту, — цепочка кошкар-муйиз", en: "The patterned band that binds the yurt — a chain of ram's horns" },
  },
];

/**
 * Кадры степной жизни: закрывают сетку без дыр и дают галерее воздух между
 * портретами. Сумма клеток (3 арт-баннера + 10 портретов + 4 орнамента + эти 5,
 * один из которых на две клетки в высоту) делится и на 4, и на 3, и на 2 колонки.
 */
const DALA_ITEMS = [
  {
    id: "dala-tan",
    src: "assets/img/dala-tan.jpg",
    title: { kk: "Дала таңы", ru: "Рассвет в степи", en: "Dawn on the steppe" },
    caption: { kk: "Тұманды даладан таң сәріде шыққан жасақ", ru: "Отряд выходит в путь на рассвете", en: "A band sets out at first light" },
  },
  {
    id: "shanyraq",
    src: "assets/img/shanyraq.jpg",
    title: { kk: "Шаңырақ", ru: "Шанырак", en: "Shanyraq" },
    caption: { kk: "Киіз үйдің төбесі — әр отбасының аспаны", ru: "Купол юрты — небо каждой семьи", en: "The yurt's crown — each family's own sky" },
  },
  {
    id: "zhyrau",
    src: "assets/img/zhyrau.jpg",
    title: { kk: "Жырау", ru: "Жырау", en: "The zhyrau" },
    caption: { kk: "Батырлар жыры от басында домбырамен айтылады", ru: "Жыр о батырах звучит у огня под домбру", en: "The epic is sung by the fire to a dombyra" },
  },
  {
    id: "burkitshi",
    src: "assets/img/burkitshi.jpg",
    tall: true,
    title: { kk: "Бүркітші", ru: "Беркутчи", en: "The eagle hunter" },
    caption: { kk: "Қыстың даласында қолында бүркіті бар салбурын", ru: "Охотник с беркутом в зимней степи", en: "A hunter with his golden eagle in the winter steppe" },
  },
  {
    id: "tulpar",
    src: "assets/img/tulpar.jpg",
    title: { kk: "Тұлпар", ru: "Тулпар", en: "Tulpar" },
    caption: { kk: "Батырдың сенімді серігі — жүйрік жылқы", ru: "Верный спутник батыра — быстрый конь", en: "The batyr's truest companion — a swift horse" },
  },
];

function buildItems() {
  const art = [
    { id: "hero", cat: "art", src: "assets/img/hero.jpg", wide: true,
      title: { kk: "Дала күзетшісі", ru: "Страж степи", en: "Guardian of the Steppe" },
      caption: { kk: "Batyrlar.com басты бетінің арты", ru: "Главный арт Batyrlar.com", en: "Batyrlar.com key art" } },
    { id: "isatay-arc", cat: "art", src: "assets/img/isatay-arc.jpg", wide: true,
      title: { kk: "Исатай–Махамбет көтерілісі", ru: "Восстание Исатая и Махамбета", en: "The Isatai-Makhambet uprising" },
      caption: { kk: "Бөкей ордасындағы көтеріліс, 1836–1838", ru: "Восстание в Букеевской орде, 1836–1838", en: "The uprising in the Bokey Horde, 1836-1838" } },
    { id: "jongar", cat: "art", src: "assets/img/jongar.jpg", wide: true,
      title: { kk: "Жоңғар соғыстары", ru: "Джунгарские войны", en: "The Dzungar Wars" },
      caption: { kk: "Қазақ қолының шабуылы", ru: "Атака казахской конницы", en: "The charge of the Kazakh cavalry" } },
  ];
  const portraits = BATYRS.map((b) => ({
    id: `batyr-${b.id}`, cat: "portrait", batyr: b, tall: Boolean(b.image),
    title: b.name, caption: b.epithet, href: `batyr.html?id=${b.id}`,
  }));
  const ornaments = ORNAMENT_ITEMS.map((o) => ({ ...o, cat: "ornament" }));
  const dala = DALA_ITEMS.map((d) => ({ ...d, cat: "art" }));
  // Перемешиваем категории, чтобы сетка выглядела живой.
  // Сумма клеток (wide = 2, tall = 2, орнамент = 1) должна делиться на число колонок, иначе в сетке останутся дыры
  const [kabanbay, ...restPortraits] = [...portraits].sort((a, b) => Number(b.tall) - Number(a.tall));
  return [
    art[0], kabanbay, ornaments[0], dala[0],
    ...restPortraits.slice(0, 3), art[2], ornaments[1], dala[1],
    ...restPortraits.slice(3, 7), art[1], dala[3], ornaments[3], dala[2],
    ...restPortraits.slice(7), ornaments[2], dala[4],
  ];
}

const ITEMS = buildItems();
const state = { cat: CATS.includes(new URLSearchParams(location.search).get("cat")) ? new URLSearchParams(location.search).get("cat") : "all", open: -1 };

const grid = document.getElementById("gallery");
const filters = document.querySelectorAll("[data-filter]");
const dialog = document.getElementById("lightbox");
const stage = dialog.querySelector(".lightbox__stage");
const caption = dialog.querySelector(".lightbox__caption");

const visibleItems = () => ITEMS.filter((it) => state.cat === "all" || it.cat === state.cat);

function mediaMarkup(item, { large = false } = {}) {
  if (item.batyr) return batyrMedia(item.batyr, { eager: large });
  return `<img class="media__img" src="${item.src}" alt="${escapeHtml(pick(item.title))}" loading="${large ? "eager" : "lazy"}" decoding="async">`;
}

function render() {
  const list = visibleItems();
  grid.dataset.cat = state.cat; // CSS подбирает число колонок под состав фильтра
  grid.innerHTML = list.map((it, i) => `
    <li class="gallery__item ${it.wide ? "gallery__item--wide" : ""} ${it.tall ? "gallery__item--tall" : ""}">
      <button class="gallery__btn scheme-dark" type="button" data-index="${i}">
        <span class="gallery__media">${mediaMarkup(it)}</span>
        <span class="gallery__info">
          <span class="gallery__cat">${t(`media.cat.${it.cat}`)}</span>
          <span class="gallery__title">${escapeHtml(pick(it.title))}</span>
        </span>
        <span class="visually-hidden">${t("media.open")}</span>
      </button>
    </li>`).join("");

  filters.forEach((btn) => {
    const cat = btn.dataset.filter;
    btn.setAttribute("aria-pressed", String(cat === state.cat));
    btn.querySelector(".filter__count").textContent = cat === "all" ? ITEMS.length : ITEMS.filter((it) => it.cat === cat).length;
  });

  if (dialog.open) showItem(state.open);
  fillGrid();
  enhance(grid);
}

/**
 * Плитки разной величины (арт 2 клетки в ширину, портрет — 2 в высоту) редко закрывают
 * сетку без остатка, поэтому пустые клетки добиваем декоративными плитками с орнаментом.
 * Считаем по факту разметки, чтобы работало на любой ширине и в любом фильтре.
 */
function fillGrid() {
  grid.querySelectorAll(".gallery__item--filler").forEach((el) => el.remove());
  if (!grid.children.length) return;

  for (let pass = 0; pass < 4; pass++) {
    const holes = countHoles();
    if (holes <= 0) return;
    for (let i = 0; i < holes; i++) {
      const li = document.createElement("li");
      li.className = "gallery__item gallery__item--filler";
      li.setAttribute("aria-hidden", "true");
      li.innerHTML = '<span class="gallery__filler-tile"></span>';
      grid.append(li);
    }
  }
}

/** Сколько клеток сетки осталось незанятыми до конца последнего ряда. */
function countHoles() {
  const cs = getComputedStyle(grid);
  const cols = cs.gridTemplateColumns.split(" ").length;
  const rowH = parseFloat(cs.gridAutoRows);
  const gap = parseFloat(cs.rowGap);
  const box = grid.getBoundingClientRect();
  const colW = (box.width - gap * (cols - 1)) / cols;
  if (!(rowH > 0) || !(colW > 0)) return 0;

  let used = 0, rows = 0;
  for (const li of grid.children) {
    const r = li.getBoundingClientRect();
    const span = Math.round((r.width + gap) / (colW + gap)) * Math.round((r.height + gap) / (rowH + gap));
    used += span;
    rows = Math.max(rows, Math.round((r.top - box.top) / (rowH + gap)) + Math.round((r.height + gap) / (rowH + gap)));
  }
  return rows * cols - used;
}

// Смена числа колонок меняет и число пустых клеток
addEventListener("resize", () => fillGrid());

function showItem(index) {
  const list = visibleItems();
  state.open = (index + list.length) % list.length;
  const item = list[state.open];
  stage.innerHTML = `<div class="lightbox__media ${item.src ? "" : "lightbox__media--square"}">${mediaMarkup(item, { large: true })}</div>`;
  caption.innerHTML = `
    <span class="gallery__cat">${t(`media.cat.${item.cat}`)} · ${state.open + 1} / ${list.length}</span>
    <strong class="lightbox__title">${escapeHtml(pick(item.title))}</strong>
    <span class="lightbox__text">${escapeHtml(pick(item.caption))}</span>
    ${item.href ? `<a class="link-arrow" href="${item.href}">${t("spot.cta")} →</a>` : ""}`;
}

grid.addEventListener("click", (e) => {
  const btn = e.target.closest(".gallery__btn");
  if (!btn) return;
  showItem(Number(btn.dataset.index));
  dialog.showModal();
  lockScroll();
});

dialog.addEventListener("click", (e) => {
  if (e.target.closest("[data-lb-prev]")) return showItem(state.open - 1);
  if (e.target.closest("[data-lb-next]")) return showItem(state.open + 1);
  // Клик по затемнению или кнопке закрытия
  if (e.target === dialog || e.target.closest("[data-lb-close]")) dialog.close();
});
dialog.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") showItem(state.open - 1);
  if (e.key === "ArrowRight") showItem(state.open + 1);
});
dialog.addEventListener("close", () => {
  unlockScroll();
  // Возвращаем фокус на плитку, с которой открыли
  grid.querySelector(`[data-index="${state.open}"]`)?.focus();
  state.open = -1;
});

filters.forEach((btn) => btn.addEventListener("click", () => {
  state.cat = btn.dataset.filter;
  const p = new URLSearchParams(location.search);
  state.cat === "all" ? p.delete("cat") : p.set("cat", state.cat);
  history.replaceState(null, "", `${location.pathname}${p.size ? `?${p}` : ""}`);
  render();
}));

initPage({ render });
