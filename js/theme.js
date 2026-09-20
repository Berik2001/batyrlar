/**
 * Тема оформления: светлая по умолчанию, тёмная по выбору пользователя.
 * Начальное значение ставит inline-скрипт в <head> (без мигания), здесь — переключение.
 */
const STORAGE_KEY = "batyrlar.theme";

export const getTheme = () => (document.documentElement.dataset.theme === "dark" ? "dark" : "light");

export function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  try { localStorage.setItem(STORAGE_KEY, theme); } catch { /* storage недоступен */ }
  document.dispatchEvent(new CustomEvent("themechange", { detail: { theme } }));
}

export const toggleTheme = () => setTheme(getTheme() === "dark" ? "light" : "dark");
