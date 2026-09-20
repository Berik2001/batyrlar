/**
 * На GitHub Pages сайт живёт не в корне домена, а в подпапке /batyrlar,
 * и Next в этом случае сам префикс к файлам из public не добавляет —
 * ни в next/image, ни в текстурах для Three.js. Поэтому все пути
 * из public пропускаем через asset().
 *
 * Переменная задаётся при сборке (см. .github/workflows/pages.yml);
 * в разработке она пустая, и пути остаются прежними.
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const asset = (path: string) => `${BASE_PATH}${path}`;
