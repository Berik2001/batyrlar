/**
 * Общий layout: header (навигация, переключатель языка, мобильное меню) и footer.
 * Страница размечает <header data-site-header data-page="home"> и <footer data-site-footer>.
 */
import { LANGS, setLang, t } from "./i18n.js";
import { ornament } from "./ornaments.js";
import { getTheme, toggleTheme } from "./theme.js";
import { lockScroll, unlockScroll } from "./smooth-scroll.js";

const NAV = [
  { href: "index.html", key: "nav.home", page: "home" },
  { href: "batyrs.html", key: "nav.batyrs", page: "batyrs" },
  { href: "history.html", key: "nav.history", page: "history" },
  { href: "media.html", key: "nav.media", page: "media" },
];

const SOCIALS = [
  { name: "Instagram", href: "https://instagram.com/", path: "M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1.1.4 2.2.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1.1.4-2.2.4-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1.1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8c.1-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1.1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2zm0 4.7a5.1 5.1 0 1 0 0 10.2 5.1 5.1 0 0 0 0-10.2zm0 8.4a3.3 3.3 0 1 1 0-6.6 3.3 3.3 0 0 1 0 6.6zm5.3-9.8a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4z" },
  { name: "YouTube", href: "https://youtube.com/", path: "M23 7.2s-.2-1.6-.9-2.3c-.9-.9-1.9-.9-2.3-1C16.6 3.6 12 3.6 12 3.6s-4.6 0-7.8.3c-.4 0-1.4.1-2.3 1-.7.7-.9 2.3-.9 2.3S.8 9.1.8 11v1.8c0 1.9.2 3.8.2 3.8s.2 1.6.9 2.3c.9.9 2 .9 2.5 1 1.8.2 7.6.3 7.6.3s4.6 0 7.8-.3c.4 0 1.4-.1 2.3-1 .7-.7.9-2.3.9-2.3s.2-1.9.2-3.8V11c0-1.9-.2-3.8-.2-3.8zM9.7 15.1V8.4l6.1 3.4-6.1 3.3z" },
  { name: "Telegram", href: "https://t.me/", path: "M21.9 4.3 18.7 19.4c-.2 1.1-.9 1.3-1.8.8l-4.9-3.6-2.4 2.3c-.3.3-.5.5-1 .5l.3-5 9.2-8.3c.4-.4-.1-.6-.6-.2L6.2 13.1l-4.9-1.5c-1.1-.3-1.1-1.1.2-1.6L20.5 2.7c.9-.3 1.7.2 1.4 1.6z" },
  { name: "TikTok", href: "https://tiktok.com/", path: "M16.6 2h-3.4v13.6a2.9 2.9 0 1 1-2.1-2.8V9.3a6.4 6.4 0 1 0 5.5 6.3V8.7a8 8 0 0 0 4.7 1.5V6.8A4.7 4.7 0 0 1 16.6 2z" },
  { name: "Facebook", href: "https://facebook.com/", path: "M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.3v7A10 10 0 0 0 22 12z" },
];

const logo = (tag = "a") => `
  <${tag} class="logo" ${tag === "a" ? 'href="index.html"' : ""} aria-label="Batyrlar.com">
    <span class="logo__mark">${ornament("koshkar", "logo__icon")}</span>
    <span class="logo__word">BATYRLAR</span>
  </${tag}>`;

const langSwitcher = () => `
  <div class="lang" role="group" data-i18n-attr="aria-label:lang.label">
    ${LANGS.map((l) => `<button class="lang__btn" type="button" data-lang-btn="${l}" aria-pressed="false">${l.toUpperCase()}</button>`).join("")}
  </div>`;

function renderHeader(el) {
  const active = el.dataset.page;
  el.classList.add("site-header");
  el.innerHTML = `
    <div class="site-header__inner container">
      ${logo()}
      <nav class="nav" id="site-nav" aria-label="Main">
        <ul class="nav__list">
          ${NAV.map((n) => `
            <li><a class="nav__link" href="${n.href}" data-i18n="${n.key}"
                   ${n.page === active ? 'aria-current="page"' : ""}>${t(n.key)}</a></li>`).join("")}
        </ul>
        ${langSwitcher()}
      </nav>
      <div class="site-header__actions">
        <button class="icon-btn theme-btn" type="button" data-theme-toggle aria-pressed="false" data-i18n-attr="aria-label:theme.toggle">
          <svg class="theme-btn__sun" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>
          <svg class="theme-btn__moon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>
        </button>
        <a class="icon-btn" href="batyrs.html#search" data-i18n-attr="aria-label:nav.search">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
        </a>
        <button class="burger" type="button" aria-expanded="false" aria-controls="site-nav" data-i18n-attr="aria-label:nav.menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>`;

  const burger = el.querySelector(".burger");
  const syncScheme = () => el.classList.toggle("is-scrolled", window.scrollY > 24);
  const syncThemeBtn = () =>
    el.querySelector("[data-theme-toggle]").setAttribute("aria-pressed", String(getTheme() === "dark"));

  const toggleMenu = (open) => {
    el.classList.toggle("is-open", open);
    burger.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("menu-open", open);
    open ? lockScroll() : unlockScroll();
  };
  burger.addEventListener("click", () => toggleMenu(!el.classList.contains("is-open")));
  el.querySelectorAll(".nav__link").forEach((a) => a.addEventListener("click", () => toggleMenu(false)));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") toggleMenu(false); });

  el.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-lang-btn]");
    if (btn) setLang(btn.dataset.langBtn);
    if (e.target.closest("[data-theme-toggle]")) toggleTheme();
  });
  document.addEventListener("themechange", syncThemeBtn);

  syncScheme();
  syncThemeBtn();
  window.addEventListener("scroll", syncScheme, { passive: true });
}

function renderFooter(el) {
  el.classList.add("site-footer");
  el.innerHTML = `
    <div class="ornament-band" aria-hidden="true"></div>
    <div class="container site-footer__grid">
      <div class="site-footer__brand">
        ${logo()}
        <p data-i18n="footer.tagline">${t("footer.tagline")}</p>
      </div>
      <nav aria-labelledby="footer-explore">
        <h2 class="site-footer__title" id="footer-explore" data-i18n="footer.explore">${t("footer.explore")}</h2>
        <ul class="site-footer__links">
          ${NAV.map((n) => `<li><a href="${n.href}" data-i18n="${n.key}">${t(n.key)}</a></li>`).join("")}
        </ul>
      </nav>
      <div>
        <h2 class="site-footer__title" data-i18n="footer.follow">${t("footer.follow")}</h2>
        <ul class="socials">
          ${SOCIALS.map((s) => `
            <li><a class="socials__link" href="${s.href}" target="_blank" rel="noopener noreferrer" aria-label="${s.name}">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="${s.path}"/></svg>
            </a></li>`).join("")}
        </ul>
      </div>
    </div>
    <div class="container site-footer__bottom">
      <p>© ${new Date().getFullYear()} Batyrlar.com. <span data-i18n="footer.rights">${t("footer.rights")}</span></p>
      <p class="site-footer__note" data-i18n="footer.note">${t("footer.note")}</p>
    </div>`;
}

export function mountLayout() {
  const header = document.querySelector("[data-site-header]");
  const footer = document.querySelector("[data-site-footer]");
  if (header) renderHeader(header);
  if (footer) renderFooter(footer);
}
