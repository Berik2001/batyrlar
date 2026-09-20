/**
 * i18n: словарь интерфейса.
 * Чистый модуль без DOM, localStorage и побочных эффектов —
 * его можно импортировать из серверных компонентов (RSC).
 * Выбор текущего языка и его сохранение выносятся в клиентский слой.
 */

import type { Lang } from "@/data/batyrs";

export type { Lang };

export const LANGS: readonly Lang[] = ["kk", "ru", "en"];

const KK = {
  "meta.title": "Batyrlar.com — Ерлер елі",
  "nav.home": "Басты бет",
  "nav.batyrs": "Батырлар",
  "nav.history": "Тарих",
  "nav.media": "Медиа",
  "nav.menu": "Мәзір",
  "nav.search": "Іздеу",
  "lang.label": "Тіл",
  "theme.toggle": "Қараңғы тақырып",
  "a11y.skip": "Мазмұнға өту",

  "hero.eyebrow": "Қазақ батырларының порталы",
  "hero.slogan": "Ерлер елі — Ел қорғаған батырлар",
  "hero.sub": "Жыр мен тарихтан шыққан қаһармандар: олардың ерлігі, сөзі және мұрасы.",
  "hero.ctaPrimary": "Батырларды көру",
  "hero.ctaSecondary": "Тарихты ашу",
  "hero.scroll": "Төмен",
  "hero.stat.batyrs": "батыр",
  "hero.stat.arcs": "тарихи желі",
  "hero.stat.langs": "тіл",
  "hero.caption": "Дала күзетшісі",

  "top.eyebrow": "Таңдаулы",
  "top.title": "Топ батырлар",
  "top.all": "Барлығы",
  "carousel.prev": "Алдыңғы",
  "carousel.next": "Келесі",

  "type.epic": "Эпикалық батыр",
  "type.historical": "Тарихи батыр",
  "type.epicPlural": "Эпикалық батырлар",
  "type.historicalPlural": "Тарихи батырлар",

  "spot.eyebrow": "Күн батыры",
  "spot.cta": "Толық оқу",

  "cat.eyebrow": "Санаттар",
  "cat.title": "Екі дәстүр — бір рух",
  "cat.epicText": "Жыраулар жырлаған аңызға айналған қаһармандар.",
  "cat.historicalText": "Нақты даталары бар, ел тарихын жасаған тұлғалар.",
  "cat.count": "батыр",

  "arcs.eyebrow": "Тарих",
  "arcs.title": "Сюжеттік желілер",
  "arcs.more": "Желіні ашу",
  "arc.jongar.title": "Жоңғар соғыстары",
  "arc.jongar.years": "1643–1758",
  "arc.jongar.text": "Ақтабан шұбырындыдан Аңырақай жеңісіне дейін: қазақ жерінің тұтастығы үшін ғасырлық күрес.",
  "arc.isatay.title": "Исатай–Махамбет көтерілісі",
  "arc.isatay.years": "1836–1838",
  "arc.isatay.text": "Бөкей ордасындағы жер мен әділдік үшін көтеріліс және оның ақын-жыршысы.",

  "quote.eyebrow": "Батыр сөзі",

  "footer.tagline": "Ел қорғаған батырлардың цифрлық шежіресі.",
  "footer.explore": "Бөлімдер",
  "footer.follow": "Бізді бақылаңыз",
  "footer.rights": "Барлық құқықтар қорғалған.",
  "footer.note": "Эпикалық кейіпкерлер туралы мәліметтер жыр мәтіндеріне негізделген.",

  "page.batyrs.eyebrow": "Каталог",
  "page.batyrs.title": "Батырлар",
  "page.batyrs.lead": "Жыр кейіпкерлері мен тарихи тұлғалар. Түрі бойынша сүзіп, есімі бойынша іздеңіз.",
  "filter.label": "Түрі бойынша сүзу",
  "filter.all": "Барлығы",
  "search.label": "Есім бойынша іздеу",
  "search.placeholder": "Мысалы, Қабанбай",
  "search.clear": "Тазалау",
  "results.count": "Табылды: {n}",
  "results.empty": "Ештеңе табылмады",
  "results.emptyHint": "Басқа есімді жазып көріңіз немесе сүзгіні өзгертіңіз.",
  "results.reset": "Сүзгіні тастау",

  "batyr.back": "Барлық батырлар",
  "batyr.bio": "Өмірбаян",
  "batyr.deeds": "Ерлік істері",
  "batyr.timeline": "Өмір жолы",
  "batyr.storyline": "Жыр желісі",
  "batyr.related": "Байланысты батырлар",
  "batyr.era": "Дәуір",
  "batyr.years": "Өмір жылдары",
  "batyr.source": "Дереккөз",
  "batyr.type": "Түрі",
  "batyr.prev": "Алдыңғы батыр",
  "batyr.next": "Келесі батыр",
  "batyr.notFound": "Батыр табылмады",
  "batyr.notFoundText": "Мұндай батыр каталогта жоқ. Барлық батырлар тізімін қараңыз.",

  "page.history.eyebrow": "Тарих",
  "page.history.title": "Сюжеттік желілер",
  "page.history.lead": "Қазақ тарихының шешуші кезеңдері — оқиғалар, шайқастар және оларды жасаған батырлар.",
  "history.arc": "Желі",
  "history.events": "Негізгі оқиғалар",
  "history.figures": "Басты тұлғалар",
  "history.toTop": "Желілерге оралу",

  "page.media.eyebrow": "Медиа",
  "page.media.title": "Галерея",
  "page.media.lead": "Батырлар әлемінің арт-туындылары, портреттері және ұлттық ою-өрнектер.",
  "media.cat.art": "Арт",
  "media.cat.portrait": "Портреттер",
  "media.cat.ornament": "Ою-өрнек",
  "media.cat.video": "Бейне",
  "media.watchOnYoutube": "YouTube-те көру",
  "media.open": "Үлкейту",
  "lightbox.close": "Жабу",
  "lightbox.label": "Сурет қарау",
};

/** Ключ строки интерфейса: выводится из казахского словаря — он эталонный. */
export type TranslationKey = keyof typeof KK;

/** Словарь одного языка: обязаны присутствовать все ключи. */
export type Dictionary = Record<TranslationKey, string>;

const RU: Dictionary = {
  "meta.title": "Batyrlar.com — Страна героев",
  "nav.home": "Главная",
  "nav.batyrs": "Батыры",
  "nav.history": "История",
  "nav.media": "Медиа",
  "nav.menu": "Меню",
  "nav.search": "Поиск",
  "lang.label": "Язык",
  "theme.toggle": "Тёмная тема",
  "a11y.skip": "Перейти к содержанию",

  "hero.eyebrow": "Портал о казахских батырах",
  "hero.slogan": "Ерлер елі — Ел қорғаған батырлар",
  "hero.sub": "Страна героев — батыры, защитившие свой народ. Их подвиги, слово и наследие.",
  "hero.ctaPrimary": "Смотреть батыров",
  "hero.ctaSecondary": "Открыть историю",
  "hero.scroll": "Вниз",
  "hero.stat.batyrs": "батыров",
  "hero.stat.arcs": "исторические арки",
  "hero.stat.langs": "языка",
  "hero.caption": "Страж степи",

  "top.eyebrow": "Избранное",
  "top.title": "Топ батыров",
  "top.all": "Все батыры",
  "carousel.prev": "Назад",
  "carousel.next": "Вперёд",

  "type.epic": "Эпический батыр",
  "type.historical": "Исторический батыр",
  "type.epicPlural": "Эпические батыры",
  "type.historicalPlural": "Исторические батыры",

  "spot.eyebrow": "Батыр дня",
  "spot.cta": "Читать полностью",

  "cat.eyebrow": "Категории",
  "cat.title": "Две традиции — один дух",
  "cat.epicText": "Легендарные герои, воспетые жырау в эпических сказаниях.",
  "cat.historicalText": "Реальные личности с точными датами, творившие историю народа.",
  "cat.count": "батыров",

  "arcs.eyebrow": "История",
  "arcs.title": "Сюжетные арки",
  "arcs.more": "Открыть арку",
  "arc.jongar.title": "Джунгарские войны",
  "arc.jongar.years": "1643–1758",
  "arc.jongar.text": "От «Годов великого бедствия» до победы при Анракае: вековая борьба за целостность казахской земли.",
  "arc.isatay.title": "Восстание Исатая и Махамбета",
  "arc.isatay.years": "1836–1838",
  "arc.isatay.text": "Восстание за землю и справедливость в Букеевской орде и его поэт-трибун.",

  "quote.eyebrow": "Слово батыра",

  "footer.tagline": "Цифровая летопись батыров, защитивших свой народ.",
  "footer.explore": "Разделы",
  "footer.follow": "Мы в соцсетях",
  "footer.rights": "Все права защищены.",
  "footer.note": "Сведения об эпических героях основаны на текстах жыров.",

  "page.batyrs.eyebrow": "Каталог",
  "page.batyrs.title": "Батыры",
  "page.batyrs.lead": "Герои жыров и исторические личности. Фильтруйте по типу и ищите по имени.",
  "filter.label": "Фильтр по типу",
  "filter.all": "Все",
  "search.label": "Поиск по имени",
  "search.placeholder": "Например, Кабанбай",
  "search.clear": "Очистить",
  "results.count": "Найдено: {n}",
  "results.empty": "Ничего не найдено",
  "results.emptyHint": "Попробуйте другое имя или измените фильтр.",
  "results.reset": "Сбросить фильтры",

  "batyr.back": "Все батыры",
  "batyr.bio": "Биография",
  "batyr.deeds": "Ерлік істері · Подвиги",
  "batyr.timeline": "Таймлайн",
  "batyr.storyline": "Сюжет жыра",
  "batyr.related": "Связанные батыры",
  "batyr.era": "Эпоха",
  "batyr.years": "Годы жизни",
  "batyr.source": "Первоисточник",
  "batyr.type": "Тип",
  "batyr.prev": "Предыдущий батыр",
  "batyr.next": "Следующий батыр",
  "batyr.notFound": "Батыр не найден",
  "batyr.notFoundText": "Такого батыра нет в каталоге. Посмотрите полный список.",

  "page.history.eyebrow": "История",
  "page.history.title": "Сюжетные арки",
  "page.history.lead": "Переломные эпохи казахской истории — события, битвы и батыры, которые их вершили.",
  "history.arc": "Арка",
  "history.events": "Ключевые события",
  "history.figures": "Ключевые фигуры",
  "history.toTop": "К списку арок",

  "page.media.eyebrow": "Медиа",
  "page.media.title": "Галерея",
  "page.media.lead": "Арт, портреты и национальные орнаменты мира батыров.",
  "media.cat.art": "Арт",
  "media.cat.portrait": "Портреты",
  "media.cat.ornament": "Орнаменты",
  "media.cat.video": "Видео",
  "media.watchOnYoutube": "Смотреть на YouTube",
  "media.open": "Открыть",
  "lightbox.close": "Закрыть",
  "lightbox.label": "Просмотр изображения",
};

const EN: Dictionary = {
  "meta.title": "Batyrlar.com — Land of Heroes",
  "nav.home": "Home",
  "nav.batyrs": "Batyrs",
  "nav.history": "History",
  "nav.media": "Media",
  "nav.menu": "Menu",
  "nav.search": "Search",
  "lang.label": "Language",
  "theme.toggle": "Dark theme",
  "a11y.skip": "Skip to content",

  "hero.eyebrow": "The portal of Kazakh heroes",
  "hero.slogan": "Ерлер елі — Ел қорғаған батырлар",
  "hero.sub": "Land of heroes — the batyrs who defended their people. Their deeds, words and legacy.",
  "hero.ctaPrimary": "Meet the batyrs",
  "hero.ctaSecondary": "Explore history",
  "hero.scroll": "Scroll",
  "hero.stat.batyrs": "batyrs",
  "hero.stat.arcs": "story arcs",
  "hero.stat.langs": "languages",
  "hero.caption": "Guardian of the steppe",

  "top.eyebrow": "Featured",
  "top.title": "Top batyrs",
  "top.all": "View all",
  "carousel.prev": "Previous",
  "carousel.next": "Next",

  "type.epic": "Epic batyr",
  "type.historical": "Historical batyr",
  "type.epicPlural": "Epic batyrs",
  "type.historicalPlural": "Historical batyrs",

  "spot.eyebrow": "Batyr of the day",
  "spot.cta": "Read the story",

  "cat.eyebrow": "Categories",
  "cat.title": "Two traditions, one spirit",
  "cat.epicText": "Legendary heroes sung by the zhyrau in epic tales.",
  "cat.historicalText": "Real figures with documented dates who shaped the nation's history.",
  "cat.count": "batyrs",

  "arcs.eyebrow": "History",
  "arcs.title": "Story arcs",
  "arcs.more": "Open the arc",
  "arc.jongar.title": "The Dzungar Wars",
  "arc.jongar.years": "1643–1758",
  "arc.jongar.text": "From the Years of Great Disaster to victory at Anyrakay: a century-long fight for the Kazakh lands.",
  "arc.isatay.title": "The Isatay–Makhambet Uprising",
  "arc.isatay.years": "1836–1838",
  "arc.isatay.text": "A revolt for land and justice in the Bukey Horde — and the poet who gave it a voice.",

  "quote.eyebrow": "A batyr's word",

  "footer.tagline": "A digital chronicle of the batyrs who defended their people.",
  "footer.explore": "Explore",
  "footer.follow": "Follow us",
  "footer.rights": "All rights reserved.",
  "footer.note": "Information about epic heroes is based on the texts of the zhyr epics.",

  "page.batyrs.eyebrow": "Catalogue",
  "page.batyrs.title": "Batyrs",
  "page.batyrs.lead": "Heroes of the epics and figures of history. Filter by type and search by name.",
  "filter.label": "Filter by type",
  "filter.all": "All",
  "search.label": "Search by name",
  "search.placeholder": "e.g. Kabanbay",
  "search.clear": "Clear",
  "results.count": "Found: {n}",
  "results.empty": "Nothing found",
  "results.emptyHint": "Try another name or change the filter.",
  "results.reset": "Reset filters",

  "batyr.back": "All batyrs",
  "batyr.bio": "Biography",
  "batyr.deeds": "Ерлік істері · Deeds",
  "batyr.timeline": "Timeline",
  "batyr.storyline": "Epic storyline",
  "batyr.related": "Related batyrs",
  "batyr.era": "Era",
  "batyr.years": "Years",
  "batyr.source": "Source",
  "batyr.type": "Type",
  "batyr.prev": "Previous batyr",
  "batyr.next": "Next batyr",
  "batyr.notFound": "Batyr not found",
  "batyr.notFoundText": "There is no such batyr in the catalogue. See the full list.",

  "page.history.eyebrow": "History",
  "page.history.title": "Story arcs",
  "page.history.lead": "Turning points of Kazakh history — the events, battles and batyrs who shaped them.",
  "history.arc": "Arc",
  "history.events": "Key events",
  "history.figures": "Key figures",
  "history.toTop": "Back to arcs",

  "page.media.eyebrow": "Media",
  "page.media.title": "Gallery",
  "page.media.lead": "Art, portraits and national ornaments from the world of the batyrs.",
  "media.cat.art": "Art",
  "media.cat.portrait": "Portraits",
  "media.cat.ornament": "Ornaments",
  "media.cat.video": "Video",
  "media.watchOnYoutube": "Watch on YouTube",
  "media.open": "Open",
  "lightbox.close": "Close",
  "lightbox.label": "Image viewer",
};

export const DICT: Record<Lang, Dictionary> = { kk: KK, ru: RU, en: EN };

/**
 * Строка интерфейса. Неизвестный ключ и отсутствующий перевод
 * откатываются на казахский словарь, затем на сам ключ.
 * Подстановка вида "{n}" заменяется значением из vars.
 */
export function t(lang: Lang, key: string, vars?: Record<string, string | number>): string {
  const table: Record<string, string> = DICT[lang];
  const fallback: Record<string, string> = DICT.kk;
  const str = table[key] ?? fallback[key] ?? key;
  return vars ? str.replace(/\{(\w+)\}/g, (_, k: string) => String(vars[k] ?? "")) : str;
}

/** Выбор перевода из объекта данных {kk, ru, en}. */
export function pick<T>(lang: Lang, value: Record<Lang, T>): T {
  return value[lang] ?? value.kk;
}
