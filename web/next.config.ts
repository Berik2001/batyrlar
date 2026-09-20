import type { NextConfig } from "next";

// На GitHub Pages сайт лежит в подпапке /batyrlar. При локальной сборке
// переменная пустая, и адреса остаются такими же, как в разработке.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // Значок dev-режима мешает снимать скриншоты интерфейса
  devIndicators: false,
  // Сервера у нас нет: все страницы собираются заранее в статические файлы
  output: "export",
  // Хостинг отдаёт каталоги, поэтому /batyrs/ → batyrs/index.html
  trailingSlash: true,
  basePath,
  images: {
    // Оптимизатор картинок работает только на сервере, в экспорте его нет
    unoptimized: true,
  },
};

export default nextConfig;
