/**
 * Вопросы викторины. Все ответы опираются на данные самого сайта
 * (batyrs.ts и arcs.ts), поэтому проверить их можно, пройдя по разделам:
 * у каждого вопроса есть ссылка на страницу, где ответ разобран.
 */
import type { Localized } from "@/data/batyrs";

export interface QuizQuestion {
  id: string;
  question: Localized;
  /** Варианты ответа; порядок перемешивается при запуске */
  options: Localized[];
  /** Индекс правильного варианта в options */
  answer: number;
  /** Короткое пояснение, которое показывается после ответа */
  explain: Localized;
  /** Куда пойти, чтобы прочитать подробнее */
  href: string;
}

export const QUIZ: QuizQuestion[] = [
  {
    id: "taiburyl",
    question: {
      kk: "Қобыланды батырдың тұлпарының аты кім?",
      ru: "Как зовут коня Кобыланды батыра?",
      en: "What is the name of Qobylandy Batyr's horse?",
    },
    options: [
      { kk: "Тайбурыл", ru: "Тайбурыл", en: "Taiburyl" },
      { kk: "Тарлан", ru: "Тарлан", en: "Tarlan" },
      { kk: "Байшұбар", ru: "Байшубар", en: "Baishubar" },
      { kk: "Құла ат", ru: "Кула", en: "Qula" },
    ],
    answer: 0,
    explain: {
      kk: "Тайбурыл — жырдағы ең әйгілі тұлпар, оның шабысы бөлек жырланады.",
      ru: "Тайбурыл — самый известный конь в жыре, его скачке посвящены отдельные строки.",
      en: "Taiburyl is the most famous horse in the epic; his gallop gets its own verses.",
    },
    href: "/batyrs/qobylandy",
  },
  {
    id: "tarlan",
    question: {
      kk: "Тарлан деген ат қай батырдың серігі?",
      ru: "Чьим верным конём был Тарлан?",
      en: "Whose faithful horse was Tarlan?",
    },
    options: [
      { kk: "Ер Тарғын", ru: "Ер Таргын", en: "Er Targyn" },
      { kk: "Алпамыс", ru: "Алпамыс", en: "Alpamys" },
      { kk: "Қамбар", ru: "Камбар", en: "Qambar" },
      { kk: "Ер Сайын", ru: "Ер Сайын", en: "Er Sayin" },
    ],
    answer: 0,
    explain: {
      kk: "Ер Тарғын жырда «Тарланның иесі» деп аталады.",
      ru: "Ер Таргына в жыре называют «всадником Тарлана».",
      en: "Er Targyn is called “the rider of Tarlan” in the epic.",
    },
    href: "/batyrs/er-targyn",
  },
  {
    id: "baishubar",
    question: {
      kk: "Байшұбар — қай батырдың аты?",
      ru: "Байшубар — конь какого батыра?",
      en: "Baishubar is whose horse?",
    },
    options: [
      { kk: "Алпамыс", ru: "Алпамыс", en: "Alpamys" },
      { kk: "Қобыланды", ru: "Кобыланды", en: "Qobylandy" },
      { kk: "Қарасай", ru: "Карасай", en: "Qarasai" },
      { kk: "Ер Көкше", ru: "Ер Кокше", en: "Er Kokshe" },
    ],
    answer: 0,
    explain: {
      kk: "Алпамыс Байшұбармен Тайшық ханға аттанады.",
      ru: "На Байшубаре Алпамыс отправляется в поход на хана Тайшыка.",
      en: "Alpamys rides Baishubar on his campaign against Khan Taishyq.",
    },
    href: "/batyrs/alpamys",
  },
  {
    id: "daraboz",
    question: {
      kk: "Қабанбай батырдың лақап аты қандай?",
      ru: "Какое прозвище носил Кабанбай батыр?",
      en: "What was Kabanbay Batyr's byname?",
    },
    options: [
      { kk: "Дарабоз", ru: "Дарабоз", en: "Daraboz" },
      { kk: "Ақын-батыр", ru: "Поэт-батыр", en: "Poet-warrior" },
      { kk: "Жас қаһарман", ru: "Юный герой", en: "The young champion" },
      { kk: "Көтеріліс көсемі", ru: "Вождь восстания", en: "Leader of the uprising" },
    ],
    answer: 0,
    explain: {
      kk: "«Дарабоз» — теңдесі жоқ деген мағынада берілген атақ.",
      ru: "«Дарабоз» означает «несравненный» — так его называли за воинское искусство.",
      en: "“Daraboz” means “the peerless” — a title earned by his skill in war.",
    },
    href: "/batyrs/kabanbay",
  },
  {
    id: "uprising-years",
    question: {
      kk: "Исатай мен Махамбет бастаған көтеріліс қай жылдары болды?",
      ru: "В какие годы шло восстание Исатая и Махамбета?",
      en: "In which years did the Isatai–Makhambet uprising take place?",
    },
    options: [
      { kk: "1836–1838", ru: "1836–1838", en: "1836–1838" },
      { kk: "1723–1730", ru: "1723–1730", en: "1723–1730" },
      { kk: "1643–1758", ru: "1643–1758", en: "1643–1758" },
      { kk: "1916–1917", ru: "1916–1917", en: "1916–1917" },
    ],
    answer: 0,
    explain: {
      kk: "Көтеріліс Бөкей ордасында 1836 жылы басталып, 1838 жылы Исатайдың қазасымен аяқталды.",
      ru: "Восстание началось в Букеевской орде в 1836 году и закончилось в 1838-м гибелью Исатая.",
      en: "The uprising began in the Bokey Horde in 1836 and ended in 1838 with Isatai's death.",
    },
    href: "/history#isatay-makhambet",
  },
  {
    id: "makhambet-who",
    question: {
      kk: "Махамбет Өтемісұлы тарихта кім ретінде қалды?",
      ru: "Кем остался в истории Махамбет Утемисов?",
      en: "How is Makhambet Otemisuly remembered?",
    },
    options: [
      { kk: "Ақын әрі батыр", ru: "Поэт и батыр", en: "A poet and a warrior" },
      { kk: "Хан", ru: "Хан", en: "A khan" },
      { kk: "Саудагер", ru: "Купец", en: "A merchant" },
      { kk: "Жырау ғана", ru: "Только жырау", en: "Only a zhyrau" },
    ],
    answer: 0,
    explain: {
      kk: "Оның жыр жолдары — көтерілістің үні, сондықтан ол ақын-батыр деп аталады.",
      ru: "Его строки стали голосом восстания — отсюда и прозвище «поэт-батыр».",
      en: "His verses became the voice of the uprising, hence “poet-warrior”.",
    },
    href: "/batyrs/makhambet",
  },
  {
    id: "alpamys-people",
    question: {
      kk: "Алпамыс қай елдің қорғаны саналады?",
      ru: "Защитником какого народа считается Алпамыс?",
      en: "Which people does Alpamys defend?",
    },
    options: [
      { kk: "Қоңырат", ru: "Конырат", en: "The Konyrat" },
      { kk: "Ноғайлы ордасы", ru: "Ногайская орда", en: "The Nogai Horde" },
      { kk: "Бөкей ордасы", ru: "Букеевская орда", en: "The Bokey Horde" },
      { kk: "Арғын", ru: "Аргын", en: "The Argyn" },
    ],
    answer: 0,
    explain: {
      kk: "Жырда Алпамыс «Қоңыраттың қорғаны» деп аталады.",
      ru: "В жыре Алпамыса называют «защитником Конырата».",
      en: "The epic calls Alpamys “the shield of the Konyrat”.",
    },
    href: "/batyrs/alpamys",
  },
  {
    id: "qambar",
    question: {
      kk: "Қамбар батыр аңшылықпен неше үйлі елді асыраған?",
      ru: "Сколько юрт кормил охотой Камбар батыр?",
      en: "How many households did Qambar Batyr feed by hunting?",
    },
    options: [
      { kk: "Тоқсан", ru: "Девяносто", en: "Ninety" },
      { kk: "Қырық", ru: "Сорок", en: "Forty" },
      { kk: "Жүз", ru: "Сто", en: "A hundred" },
      { kk: "Отыз", ru: "Тридцать", en: "Thirty" },
    ],
    answer: 0,
    explain: {
      kk: "Сондықтан ол «тоқсан үйдің асыраушысы» атанған.",
      ru: "За это его и прозвали «кормильцем девяноста юрт».",
      en: "That is why he is called “the provider of ninety yurts”.",
    },
    href: "/batyrs/qambar",
  },
  {
    id: "epic-vs-history",
    question: {
      kk: "Қай батыр — тарихи тұлға емес, жыр кейіпкері?",
      ru: "Кто из них — не историческая личность, а герой жыра?",
      en: "Which of these is an epic hero rather than a historical figure?",
    },
    options: [
      { kk: "Ер Сайын", ru: "Ер Сайын", en: "Er Sayin" },
      { kk: "Қабанбай", ru: "Кабанбай", en: "Kabanbay" },
      { kk: "Исатай", ru: "Исатай", en: "Isatai" },
      { kk: "Махамбет", ru: "Махамбет", en: "Makhambet" },
    ],
    answer: 0,
    explain: {
      kk: "Сайтта жеті батыр жыр кейіпкері, үшеуі — нақты тарихи тұлға.",
      ru: "На сайте семь батыров — герои жыра, трое — реальные исторические личности.",
      en: "Seven batyrs on this site come from the epics; three are real historical figures.",
    },
    href: "/batyrs?type=epic",
  },
  {
    id: "jongar",
    question: {
      kk: "Қазақ-жоңғар соғыстары қай кезеңді қамтиды?",
      ru: "Какой период охватывают казахско-джунгарские войны?",
      en: "What period do the Kazakh–Dzungar wars cover?",
    },
    options: [
      { kk: "1643–1758", ru: "1643–1758", en: "1643–1758" },
      { kk: "1836–1838", ru: "1836–1838", en: "1836–1838" },
      { kk: "XIV–XV ғғ.", ru: "XIV–XV вв.", en: "14th–15th c." },
      { kk: "1801–1845", ru: "1801–1845", en: "1801–1845" },
    ],
    answer: 0,
    explain: {
      kk: "Орбұлақтан Аңырақайға дейінгі ғасырдан астам күрес.",
      ru: "Больше века борьбы — от Орбулака до Анракая.",
      en: "More than a century of fighting, from Orbulaq to Anyraqai.",
    },
    href: "/history#jongar",
  },
  {
    id: "kosai",
    question: {
      kk: "Ер Көкше жырда кімнің әкесі ретінде аталады?",
      ru: "Чьим отцом назван Ер Кокше в жыре?",
      en: "Whose father is Er Kokshe in the epic?",
    },
    options: [
      { kk: "Ер Қосай", ru: "Ер Косай", en: "Er Kosai" },
      { kk: "Ер Тарғын", ru: "Ер Таргын", en: "Er Targyn" },
      { kk: "Қарасай", ru: "Карасай", en: "Qarasai" },
      { kk: "Қамбар", ru: "Камбар", en: "Qambar" },
    ],
    answer: 0,
    explain: {
      kk: "Жырда әке мен ұлдың ерлігі қатар баяндалады.",
      ru: "Жыр рассказывает о подвигах отца и сына рядом друг с другом.",
      en: "The epic tells the deeds of father and son side by side.",
    },
    href: "/batyrs/er-kokshe",
  },
  {
    id: "qarasai",
    question: {
      kk: "Қарасай батырдың серігі кім?",
      ru: "Кто был побратимом Карасая?",
      en: "Who was Qarasai's sworn brother?",
    },
    options: [
      { kk: "Қази", ru: "Кази", en: "Qazi" },
      { kk: "Қобыланды", ru: "Кобыланды", en: "Qobylandy" },
      { kk: "Алпамыс", ru: "Алпамыс", en: "Alpamys" },
      { kk: "Исатай", ru: "Исатай", en: "Isatai" },
    ],
    answer: 0,
    explain: {
      kk: "«Қарасай-Қази» жыры екеуінің достығы туралы.",
      ru: "Жыр «Карасай-Кази» — о дружбе этих двоих.",
      en: "The epic “Qarasai–Qazi” is about their brotherhood.",
    },
    href: "/batyrs/qarasay",
  },
  {
    id: "makhambet-death",
    question: {
      kk: "Махамбет Өтемісұлы қай жылы қаза тапты?",
      ru: "В каком году погиб Махамбет Утемисов?",
      en: "In what year was Makhambet Otemisuly killed?",
    },
    options: [
      { kk: "1846", ru: "1846", en: "1846" },
      { kk: "1838", ru: "1838", en: "1838" },
      { kk: "1803", ru: "1803", en: "1803" },
      { kk: "1769", ru: "1769", en: "1769" },
    ],
    answer: 0,
    explain: {
      kk: "Исатай қаза тапқаннан кейін ол күресті жалғастырып, 1846 жылы қастандықпен өлтірілді.",
      ru: "После гибели Исатая он продолжил борьбу и был убит в 1846 году.",
      en: "After Isatai fell he fought on, and was killed in 1846.",
    },
    href: "/batyrs/makhambet",
  },
  {
    id: "kabanbay-born",
    question: {
      kk: "Қабанбай батыр қай жылы дүниеге келген?",
      ru: "В каком году родился Кабанбай батыр?",
      en: "In what year was Kabanbay Batyr born?",
    },
    options: [
      { kk: "1691", ru: "1691", en: "1691" },
      { kk: "1791", ru: "1791", en: "1791" },
      { kk: "1643", ru: "1643", en: "1643" },
      { kk: "1803", ru: "1803", en: "1803" },
    ],
    answer: 0,
    explain: {
      kk: "Ол 1691 жылы туып, 1769 жылы дүниеден өткен.",
      ru: "Он родился в 1691 году и умер в 1769-м.",
      en: "He was born in 1691 and died in 1769.",
    },
    href: "/batyrs/kabanbay",
  },
  {
    id: "orda",
    question: {
      kk: "Исатай мен Махамбет көтерілісі қай ордада басталды?",
      ru: "В какой орде началось восстание Исатая и Махамбета?",
      en: "In which horde did the Isatai–Makhambet uprising begin?",
    },
    options: [
      { kk: "Бөкей ордасы", ru: "Букеевская орда", en: "The Bokey Horde" },
      { kk: "Ноғайлы ордасы", ru: "Ногайская орда", en: "The Nogai Horde" },
      { kk: "Алтын Орда", ru: "Золотая Орда", en: "The Golden Horde" },
      { kk: "Жоңғар хандығы", ru: "Джунгарское ханство", en: "The Dzungar Khanate" },
    ],
    answer: 0,
    explain: {
      kk: "Көтеріліс Жәңгір ханның билігіндегі Бөкей ордасында өрбіді.",
      ru: "Восстание развернулось в Букеевской орде под властью хана Жангира.",
      en: "The uprising unfolded in the Bokey Horde under Khan Jangir.",
    },
    href: "/history#isatay-makhambet",
  },
];
