/**
 * Подобранные вручную ролики с YouTube: документальные фильмы и записи жыра.
 * Список используется, когда не задан YOUTUBE_API_KEY (см. lib/youtube.ts),
 * и как запасной вариант, если API недоступен.
 *
 * Каждый id проверен через публичный oEmbed YouTube: ролик существует,
 * открыт и разрешён к встраиванию. Названия и каналы — из того же ответа.
 */
export interface Video {
  /** id ролика на YouTube */
  id: string;
  title: string;
  channel: string;
  /** id батыра или арки, к которым относится ролик */
  related?: string;
}

export const CURATED_VIDEOS: Video[] = [
  {
    id: "5FkPeUvHcNY",
    title: "Қабанбай батыр. Деректі фильм",
    channel: "Abai TV",
    related: "kabanbay",
  },
  {
    id: "jWNHf91Wumo",
    title: "Тарихтағы тұлғалар. Қабанбай батыр",
    channel: "Жетісу телеарнасы",
    related: "kabanbay",
  },
  {
    id: "ixbDy3auig0",
    title: "Қабанбай батыр",
    channel: "Uly Tulgalar",
    related: "kabanbay",
  },
  {
    id: "z6vLw3psEv4",
    title: "Исатай–Махамбет көтерілісі",
    channel: "Қазақстан Тарихы",
    related: "isatay-makhambet",
  },
  {
    id: "VikfGQkpmEU",
    title: "1836–1838 жж. Исатай Тайманұлы мен Махамбет Өтемісұлы бастаған көтеріліс",
    channel: "Тлеужан Ташимов",
    related: "isatay-makhambet",
  },
  {
    id: "VkOUlQ6hCOo",
    title: "Қобыланды батыр жыры. 1-бөлім",
    channel: "Aba Kaz",
    related: "qobylandy",
  },
  {
    id: "LrwaSHy-qPg",
    title: "«Алпамыс батыр» жыры",
    channel: "A. Mambetov theatre",
    related: "alpamys",
  },
  {
    id: "FHipeVonU8o",
    title: "Шаттық Уатқан — «Алпамыс батыр» жыры. «Жеті қазына»",
    channel: "Khabar TV",
    related: "alpamys",
  },
];

/** Превью ролика отдаёт сам YouTube — картинки у себя не держим */
export const videoThumb = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

/** Плеер без куки-трекинга: youtube-nocookie */
export const videoEmbed = (id: string) =>
  `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1`;

export const videoWatch = (id: string) => `https://www.youtube.com/watch?v=${id}`;
