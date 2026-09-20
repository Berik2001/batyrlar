/**
 * Каталог батыров: фильтр по типу + поиск по имени.
 * Состояние синхронизируется с URL (?type=epic&q=...), чтобы фильтр можно было отправить ссылкой.
 * Поиск идёт по именам на всех трёх языках и игнорирует разницу қ/к, ә/а, і/и и т.д.
 */
import { BATYRS } from "../data/batyrs.js";
import { initPage } from "../app.js";
import { t } from "../i18n.js";
import { batyrCard } from "../card.js";

const TYPES = ["all", "epic", "historical"];

// Казахские буквы → ближайшие русские, плюс латиница-двойники
const FOLD = { ә: "а", ғ: "г", қ: "к", ң: "н", ө: "о", ұ: "у", ү: "у", һ: "х", і: "и", ё: "е", й: "и" };
const normalize = (s) =>
  s.toLowerCase().normalize("NFC").replace(/[әғқңөұүһіёй]/g, (c) => FOLD[c]).replace(/\s+/g, " ").trim();

const searchIndex = new Map(BATYRS.map((b) => [b.id, normalize(Object.values(b.name).join(" "))]));

const params = new URLSearchParams(location.search);
const state = {
  type: TYPES.includes(params.get("type")) ? params.get("type") : "all",
  q: params.get("q") ?? "",
};

const els = {
  grid: document.getElementById("batyr-grid"),
  count: document.getElementById("results-count"),
  empty: document.getElementById("results-empty"),
  search: document.getElementById("search"),
  clear: document.getElementById("search-clear"),
  filters: document.querySelectorAll("[data-filter]"),
  reset: document.getElementById("results-reset"),
};

function filtered() {
  const q = normalize(state.q);
  return BATYRS.filter(
    (b) => (state.type === "all" || b.type === state.type) && (!q || searchIndex.get(b.id).includes(q))
  );
}

function syncUrl() {
  const p = new URLSearchParams();
  if (state.type !== "all") p.set("type", state.type);
  if (state.q.trim()) p.set("q", state.q.trim());
  const qs = p.toString();
  history.replaceState(null, "", `${location.pathname}${qs ? `?${qs}` : ""}${location.hash}`);
}

function render() {
  const list = filtered();

  els.grid.innerHTML = list.map((b) => `<li class="catalog__item">${batyrCard(b)}</li>`).join("");
  els.count.textContent = t("results.count", { n: list.length });
  els.empty.hidden = list.length > 0;

  els.filters.forEach((btn) => {
    const type = btn.dataset.filter;
    btn.setAttribute("aria-pressed", String(type === state.type));
    const n = type === "all" ? BATYRS.length : BATYRS.filter((b) => b.type === type).length;
    btn.querySelector(".filter__count").textContent = n;
  });
  els.clear.hidden = !state.q;
}

function update(patch) {
  Object.assign(state, patch);
  syncUrl();
  render();
}

els.search.value = state.q;
els.search.addEventListener("input", () => update({ q: els.search.value }));
els.search.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && els.search.value) {
    e.preventDefault();
    els.search.value = "";
    update({ q: "" });
  }
});
els.clear.addEventListener("click", () => {
  els.search.value = "";
  update({ q: "" });
  els.search.focus();
});
els.filters.forEach((btn) => btn.addEventListener("click", () => update({ type: btn.dataset.filter })));
els.reset.addEventListener("click", () => {
  els.search.value = "";
  update({ type: "all", q: "" });
});

initPage({ render });

// Иконка поиска в header ведёт на batyrs.html#search
if (location.hash === "#search") els.search.focus({ preventScroll: false });
