/**
 * Ролики с YouTube для каждого батыра: жыр в исполнении жыршы,
 * документальные фильмы и телепередачи — все на казахском языке.
 *
 * Каждый id проверен запросом к публичному oEmbed и к странице ролика:
 * видео существует, открыто и разрешено к встраиванию (playableInEmbed).
 * Длительность взята оттуда же. Поле related связывает ролик с батыром
 * (или с аркой на странице «Тарих»).
 */
export interface Video {
  /** id ролика на YouTube */
  id: string;
  title: string;
  channel: string;
  /** длительность в формате ч:мм:сс или мм:сс; из search.list не приходит */
  duration?: string;
  /** id батыра или арки, к которым относится ролик */
  related?: string;
  /**
   * "zhyr" — исполнение жыра или чтение текста, такие записи слушают, а не смотрят;
   * "cartoon" — мультфильм для детей, в списках идёт первым и с пометкой
   */
  kind?: "zhyr" | "cartoon";
}

export const CURATED_VIDEOS: Video[] = [
  { id: "ZUUF5w5E9u4", title: "Қобыланды. Барлық бөлім", channel: "Balapan TV", duration: "1:11:34", kind: "cartoon", related: "qobylandy" },
  { id: "oiobZ7iEa8A", title: "Алпамыс батыр. 1-бөлім", channel: "KazStory", duration: "22:50", kind: "cartoon", related: "alpamys" },
  { id: "AcFxGAXvpe4", title: "Ербол Қуанбек — «Қобыланды батыр» жыры. «Жеті қазына»", channel: "Khabar TV", duration: "6:40", kind: "zhyr", related: "qobylandy" },
  { id: "WgVccR6lHBg", title: "Қобыланды батыр жыры. Орындаған Абдуррахман Естайұлы", channel: "Дәрібаевтар ансамблі", duration: "2:50:45", kind: "zhyr", related: "qobylandy" },
  { id: "VkOUlQ6hCOo", title: "Қобыланды батыр жыры. 1-бөлім", channel: "Aba Kaz", duration: "2:30:00", kind: "zhyr", related: "qobylandy" },
  { id: "FHipeVonU8o", title: "Шаттық Уатқан — «Алпамыс батыр» жыры. «Жеті қазына»", channel: "Khabar TV", duration: "7:23", kind: "zhyr", related: "alpamys" },
  { id: "LrwaSHy-qPg", title: "«Алпамыс батыр» жыры", channel: "A. Mambetov theatre", duration: "12:55", kind: "zhyr", related: "alpamys" },
  { id: "BtzUKfpmJuM", title: "Алпамыс батыр жыры. Толық нұсқа", channel: "Aba Kaz", duration: "3:34:36", kind: "zhyr", related: "alpamys" },
  { id: "IDY6cC6O1GI", title: "«Ер Тарғын» жыры. «Қазақ әдебиеті»", channel: "Телерадиокомплекс Президента РК", duration: "9:54", kind: "zhyr", related: "er-targyn" },
  { id: "ZnVlPy6EkKI", title: "Ер Тарғын жыры", channel: "Aba Kaz", duration: "1:24:37", kind: "zhyr", related: "er-targyn" },
  { id: "ne1CH0yDu1o", title: "Раушан Оразбаева — «Қамбар батыр». «Халық қазынасы»", channel: "Khabar TV", duration: "3:07", kind: "zhyr", related: "qambar" },
  { id: "KntmRjDklQg", title: "Қамбар батыр. Аудиокітап, 1-бөлім", channel: "KazStory", duration: "48:49", kind: "zhyr", related: "qambar" },
  { id: "DBcoj9Dz4uc", title: "Қамбар батыр жыры", channel: "Aba Kaz", duration: "1:18:37", kind: "zhyr", related: "qambar" },
  { id: "su84TBkoNiY", title: "Ахмет Байтұрсынұлы. «Ер Сайын». 1-бөлім", channel: "Халық даналығы", duration: "24:56", kind: "zhyr", related: "er-sayin" },
  { id: "ZAJanEJv0ZY", title: "Ахмет Байтұрсынұлы. «Ер Сайын». 2-бөлім", channel: "Халық даналығы", duration: "24:53", kind: "zhyr", related: "er-sayin" },
  { id: "C17lj2wL7es", title: "Ер Сайын жыры", channel: "Baktybay Zhailau", duration: "46:20", kind: "zhyr", related: "er-sayin" },
  { id: "haQqJS1GF3A", title: "Абылай Бөріханов — «Ер Көкше». «Жеті қазына»", channel: "Khabar TV", duration: "7:05", kind: "zhyr", related: "er-kokshe" },
  { id: "BR27w3_dnSs", title: "Ер Көкше", channel: "Әзімхан Адай", duration: "21:05", kind: "zhyr", related: "er-kokshe" },
  { id: "_krJWxXOI88", title: "Уақ Көкше батыр жыры", channel: "Almas Qylysh", duration: "21:10", kind: "zhyr", related: "er-kokshe" },
  { id: "qspNiXIGNbw", title: "Қарасай батыр", channel: "Білім және Мәдениет арнасы", duration: "20:02", related: "qarasay" },
  { id: "wLRf7F0a4Yw", title: "«Ұлы дала елі». Қарасай батыр", channel: "Bilim Madeniet", duration: "40:32", related: "qarasay" },
  { id: "5FkPeUvHcNY", title: "Қабанбай батыр. Деректі фильм", channel: "Abai TV", duration: "31:32", related: "kabanbay" },
  { id: "jWNHf91Wumo", title: "Тарихтағы тұлғалар. Қабанбай батыр", channel: "Жетісу телеарнасы", duration: "17:01", related: "kabanbay" },
  { id: "ixbDy3auig0", title: "Қабанбай батыр", channel: "Uly Tulgalar", duration: "2:23", related: "kabanbay" },
  { id: "pPntNhNslVA", title: "Тарихи тұлғалар. Исатай батыр", channel: "Abai TV", duration: "1:49", related: "isatay" },
  { id: "p8TWhd3EGjw", title: "Архивтегі аманат. Исатай мен Махамбет батырлар", channel: "Abai TV", duration: "20:43", related: "isatay" },
  { id: "p9CexAqM80o", title: "Махамбет Өтемісұлы", channel: "Арман Жетіру", duration: "27:09", related: "makhambet" },
  { id: "-fUkb5TVR2s", title: "Махамбет Өтемісұлы деген кім? «Әулет»", channel: "Қазақстан Тарихы", duration: "21:03", related: "makhambet" },
  { id: "_o57btEO2Do", title: "Тарихи тұлғалар. Махамбет Өтемісұлы", channel: "Abai TV", duration: "1:49", related: "makhambet" },
  { id: "z6vLw3psEv4", title: "Исатай–Махамбет көтерілісі", channel: "Қазақстан Тарихы", duration: "6:33", related: "isatay-makhambet" },
  { id: "VikfGQkpmEU", title: "1836–1838 жж. Исатай мен Махамбет бастаған көтеріліс", channel: "Тлеужан Ташимов", duration: "4:19", related: "isatay-makhambet" },
];

/** Записи жыра — их собирает раздел «Аудио» */
export const ZHYR_VIDEOS: Video[] = CURATED_VIDEOS.filter((v) => v.kind === "zhyr");

/** Документальные фильмы и передачи — раздел «Бейне» */
export const FILM_VIDEOS: Video[] = CURATED_VIDEOS.filter((v) => v.kind !== "zhyr");

/** Ролики конкретного батыра или арки */
export const videosFor = (id: string): Video[] => CURATED_VIDEOS.filter((v) => v.related === id);

/**
 * Для галереи берём по одному ролику на батыра, иначе видео вытеснит
 * портреты и орнаменты. Список из API приходит без related — тогда просто
 * ограничиваем длину.
 */
export function galleryVideos(videos: Video[]): Video[] {
  const seen = new Set<string>();
  const picked = videos.filter((v) => {
    if (!v.related) return true;
    if (seen.has(v.related)) return false;
    seen.add(v.related);
    return true;
  });
  return picked.slice(0, 12);
}

/** Превью ролика отдаёт сам YouTube — картинки у себя не держим */
export const videoThumb = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

/** Плеер без куки-трекинга: youtube-nocookie */
export const videoEmbed = (id: string) =>
  `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1&autoplay=1`;

export const videoWatch = (id: string) => `https://www.youtube.com/watch?v=${id}`;
