/**
 * Комиксы по мотивам жыра. Кадры нарисованы нейросетью (Higgsfield) —
 * это иллюстрации, а не исторические изображения. Текст под кадрами
 * пересказывает сюжет жыра, а не цитирует его дословно.
 */
import type { Localized } from "@/data/batyrs";
import { asset } from "@/lib/asset";

export interface ComicPanel {
  src: string;
  /** Подпись под кадром — одно-два предложения */
  caption: Localized;
}

export interface Comic {
  id: string;
  /** id батыра, на страницу которого ведёт ссылка */
  batyr: string;
  title: Localized;
  lead: Localized;
  panels: ComicPanel[];
}

export const COMICS: Comic[] = [
  {
    id: "qobylandy",
    batyr: "qobylandy",
    title: {
      kk: "Қобыланды батыр",
      ru: "Кобыланды батыр",
      en: "Qobylandy Batyr",
    },
    lead: {
      kk: "Тайбурылдың иесі елін жаудан қорғауға аттанады — жырдың алты кадрдағы қысқаша баяны.",
      ru: "Всадник Тайбурыла уходит защищать свой народ — краткий пересказ жыра в шести кадрах.",
      en: "The rider of Taiburyl sets out to defend his people — the epic retold in six panels.",
    },
    panels: [
      {
        src: asset("/comics/qobylandy-1.jpg"),
        caption: {
          kk: "Таң сәріде Қобыланды Тайбурылмен бірге жоталы төбеде тұр. Алдында — шексіз дала, артында — қорғауға тиіс ел.",
          ru: "На рассвете Кобыланды стоит с Тайбурылом на холме. Впереди — бескрайняя степь, за спиной — народ, который нужно защитить.",
          en: "At dawn Qobylandy stands with Taiburyl on a hill. Ahead lies the endless steppe; behind him, the people he must defend.",
        },
      },
      {
        src: asset("/comics/qobylandy-2.jpg"),
        caption: {
          kk: "Ауыл қоштасады: анасы тізгінді ұстап тұр, әкесі ұзын найзасын береді. Жорыққа аттанар сәт.",
          ru: "Аул провожает: мать держит повод, отец подаёт длинное копьё. Минута перед походом.",
          en: "The aul sees him off: his mother holds the reins, his father hands him the long spear. The moment before the campaign.",
        },
      },
      {
        src: asset("/comics/qobylandy-3.jpg"),
        caption: {
          kk: "Тайбурылдың шабысы — жырдың ең әйгілі тұсы. Тұлпардың тұяғы жерге тимей ұшқандай.",
          ru: "Скачка Тайбурыла — самое известное место жыра. Копыта тулпара будто не касаются земли.",
          en: "Taiburyl's gallop is the epic's most famous passage: the horse's hooves barely touch the ground.",
        },
      },
      {
        src: asset("/comics/qobylandy-4.jpg"),
        caption: {
          kk: "Жау ханымен жекпе-жек. Найзалар қиылысқанда от шашырайды — батырлықтың сыны осы сәтте.",
          ru: "Поединок с вражеским ханом. Копья скрещиваются, летят искры — здесь и проверяется батыр.",
          en: "The duel with the enemy khan. Spears cross and sparks fly — this is where a batyr is proven.",
        },
      },
      {
        src: asset("/comics/qobylandy-5.jpg"),
        caption: {
          kk: "Тұтқында жатқан ел босатылады. Жырда батырдың ең басты ерлігі — жеңіс емес, елін аман алып қалу.",
          ru: "Пленные освобождены. Главный подвиг в жыре — не победа сама по себе, а спасённые люди.",
          en: "The captives are freed. In the epic the true deed is not the victory but the people brought home.",
        },
      },
      {
        src: asset("/comics/qobylandy-6.jpg"),
        caption: {
          kk: "Ауылға оралу: Құртқа қарсы шығады, ақсақалдар бата береді. Жыр осы сәтпен түйінделеді.",
          ru: "Возвращение в аул: навстречу выходит Куртка, старейшины дают бата. Этим жыр и завершается.",
          en: "The homecoming: Qurtqa steps forward, the elders give their blessing. So the epic closes.",
        },
      },
    ],
  },
  {
    id: "alpamys",
    batyr: "alpamys",
    title: { kk: "Алпамыс батыр", ru: "Алпамыс батыр", en: "Alpamys Batyr" },
    lead: {
      kk: "Байшұбарды бағындырған жігіт жеті жыл зынданда жатып, еліне оралады.",
      ru: "Юноша, укротивший Байшубара, проводит семь лет в зиндане и возвращается домой.",
      en: "The youth who tamed Baishubar spends seven years in a pit prison and comes home.",
    },
    panels: [
      {
        src: asset("/comics/alpamys-1.jpg"),
        caption: {
          kk: "Жас Алпамыс асау Байшұбарды бағындырады — тұлпарын тапқан батыр жолға дайын.",
          ru: "Юный Алпамыс укрощает дикого Байшубара: батыр, нашедший своего тулпара, готов в путь.",
          en: "Young Alpamys tames the wild Baishubar — a batyr who has found his horse is ready for the road.",
        },
      },
      {
        src: asset("/comics/alpamys-2.jpg"),
        caption: {
          kk: "Гүлбаршынмен қоштасу. Алпамыс Тайшық ханның жеріне аттанады.",
          ru: "Прощание с Гулбаршын: Алпамыс уходит в земли хана Тайшыка.",
          en: "Farewell to Gulbarshyn: Alpamys rides for the lands of Khan Taishyq.",
        },
      },
      {
        src: asset("/comics/alpamys-3.jpg"),
        caption: {
          kk: "Тайшық ханның қолымен шайқас — найзаның бір соққысы жау қатарын бұзады.",
          ru: "Бой с войском хана Тайшыка: один удар копья ломает вражеский строй.",
          en: "The fight with Taishyq's horsemen: one spear thrust breaks the enemy line.",
        },
      },
      {
        src: asset("/comics/alpamys-4.jpg"),
        caption: {
          kk: "Терең зындан, жеті жыл тұтқын. Жоғарыдан қойшы қыз нан түсіреді.",
          ru: "Глубокий зиндан, семь лет плена. Сверху пастушка спускает хлеб на верёвке.",
          en: "A deep pit, seven years of captivity. From above a shepherd girl lowers bread on a rope.",
        },
      },
      {
        src: asset("/comics/alpamys-5.jpg"),
        caption: {
          kk: "Тойдың үстінде жыртық шапанын серпіп тастайды — елі батырын таниды.",
          ru: "На пиру он сбрасывает рваный плащ — народ узнаёт своего батыра.",
          en: "At the feast he throws off the ragged cloak and the people know their batyr.",
        },
      },
    ],
  },
  {
    id: "er-targyn",
    batyr: "er-targyn",
    title: { kk: "Ер Тарғын", ru: "Ер Таргын", en: "Er Targyn" },
    lead: {
      kk: "Жаладан кейін елден кеткен батырды Тарлан аты мен ақ жүрегі ақтап алады.",
      ru: "Оговорённый батыр уходит из орды, а возвращают ему имя конь Тарлан и собственная честь.",
      en: "Slandered at court, the batyr rides away; his horse Tarlan and his own honour bring his name back.",
    },
    panels: [
      {
        src: asset("/comics/er-targyn-1.jpg"),
        caption: {
          kk: "Хан алдындағы жала: сарай адамдары Тарғынды күстаналайды.",
          ru: "Навет перед ханом: придворные шепчутся за спиной Таргына.",
          en: "Slander before the khan: the courtiers whisper behind Targyn's back.",
        },
      },
      {
        src: asset("/comics/er-targyn-2.jpg"),
        caption: {
          kk: "Тарғын мен Ақжүніс елден шығады — алдарында жапан дала.",
          ru: "Таргын и Акжунис покидают орду: впереди пустая степь.",
          en: "Targyn and Aqzhunis leave the horde; ahead lies the empty steppe.",
        },
      },
      {
        src: asset("/comics/er-targyn-3.jpg"),
        caption: {
          kk: "Тасқын өзен. Тарлан иесін арқалап жағаға шығарады.",
          ru: "Разлившаяся река: Тарлан выносит хозяина на берег.",
          en: "A river in flood: Tarlan carries his master to the far bank.",
        },
      },
      {
        src: asset("/comics/er-targyn-4.jpg"),
        caption: {
          kk: "Қартқожақпен жекпе-жек — екі әскер тыныстамай қарап тұр.",
          ru: "Поединок с Карткожаком — две рати смотрят, затаив дыхание.",
          en: "The duel with Qartqozhaq, watched in silence by both hosts.",
        },
      },
      {
        src: asset("/comics/er-targyn-5.jpg"),
        caption: {
          kk: "Ел батырын қайта қабылдайды: ақсақалдар бата береді.",
          ru: "Народ принимает батыра обратно: старейшины дают бата.",
          en: "The people take their batyr back; the elders give their blessing.",
        },
      },
    ],
  },
  {
    id: "kabanbay",
    batyr: "kabanbay",
    title: { kk: "Қабанбай батыр", ru: "Кабанбай батыр", en: "Kabanbay Batyr" },
    lead: {
      kk: "Шапқыншылықтан қалған күлден бастап Аңырақай жеңісіне дейінгі жол.",
      ru: "Путь от пепелища разорённого аула до победы при Анракае.",
      en: "From the ashes of a raided aul to the victory at Anyraqai.",
    },
    panels: [
      {
        src: asset("/comics/kabanbay-1.jpg"),
        caption: {
          kk: "Шабуылдан кейінгі таң: жас Қабанбай күйреген ауылдың күлі үстінде ант береді.",
          ru: "Утро после набега: юный Кабанбай даёт клятву над пепелищем аула.",
          en: "Dawn after the raid: young Kabanbay swears his oath over the ashes of the aul.",
        },
      },
      {
        src: asset("/comics/kabanbay-2.jpg"),
        caption: {
          kk: "Жасақ жиналады. Ақсақалдар бата беріп, қол аттанады.",
          ru: "Собирается ополчение: старейшины дают бата, и отряд выступает.",
          en: "The militia gathers; the elders bless it and the host sets out.",
        },
      },
      {
        src: asset("/comics/kabanbay-3.jpg"),
        caption: {
          kk: "Екі әскердің ортасындағы жекпе-жек — жоңғар батырымен беттесу.",
          ru: "Поединок между двумя войсками — схватка с джунгарским богатырём.",
          en: "Single combat between the armies: the duel with the Dzungar champion.",
        },
      },
      {
        src: asset("/comics/kabanbay-4.jpg"),
        caption: {
          kk: "Аңырақай шайқасы, 1730 жыл. Қазақ қолы жау қатарын қақ жарады.",
          ru: "Анракайская битва, 1730 год: казахская конница рассекает строй противника.",
          en: "The battle of Anyraqai, 1730: the Kazakh cavalry splits the enemy line.",
        },
      },
      {
        src: asset("/comics/kabanbay-5.jpg"),
        caption: {
          kk: "Ел жеріне оралады. Қартайған батыр төбе басынан көшті қарап тұр.",
          ru: "Народ возвращается на свои земли. Постаревший батыр смотрит с холма на идущий караван.",
          en: "The people return to their land; the old batyr watches the caravan from a hill.",
        },
      },
    ],
  },
  {
    id: "isatay-makhambet",
    batyr: "isatay",
    title: { kk: "Исатай мен Махамбет", ru: "Исатай и Махамбет", en: "Isatai and Makhambet" },
    lead: {
      kk: "1836–1838 жылдардағы көтерілістің басталуы, шайқасы және соңы.",
      ru: "Начало, бой и конец восстания 1836–1838 годов.",
      en: "The beginning, the battle and the end of the 1836–1838 uprising.",
    },
    panels: [
      {
        src: asset("/comics/isatay-1.jpg"),
        caption: {
          kk: "Исатай елдің мұңын тыңдайды. Алыста — хан ордасының ақ шатырлары.",
          ru: "Исатай слушает жалобы кочевников. Вдали — белые шатры ханской ставки.",
          en: "Isatai listens to the herders' grievances; far off stand the khan's white tents.",
        },
      },
      {
        src: asset("/comics/isatay-2.jpg"),
        caption: {
          kk: "Махамбет от басында жыр толғайды — сөзі сарбаздарды аяққа тұрғызады.",
          ru: "Махамбет у костра слагает стихи — его слово поднимает сарбазов.",
          en: "By the fire Makhambet recites; his words bring the fighters to their feet.",
        },
      },
      {
        src: asset("/comics/isatay-3.jpg"),
        caption: {
          kk: "Көтерілісшілер қолы хан ордасына қарай бет алады.",
          ru: "Повстанческое войско движется к ханской ставке.",
          en: "The rebel host moves on the khan's headquarters.",
        },
      },
      {
        src: asset("/comics/isatay-4.jpg"),
        caption: {
          kk: "1838 жыл, соңғы шайқас: зеңбірек түтіні, Исатай аттан құлайды.",
          ru: "1838 год, последний бой: пушечный дым, Исатай падает с коня.",
          en: "1838, the last battle: cannon smoke, and Isatai falls from his horse.",
        },
      },
      {
        src: asset("/comics/isatay-5.jpg"),
        caption: {
          kk: "Махамбет жалғыз қалады. Қолында домбыра — күрес сөзбен жалғасады.",
          ru: "Махамбет остаётся один. В руках домбра — борьба продолжается словом.",
          en: "Makhambet is left alone, dombyra in hand: the struggle goes on in words.",
        },
      },
    ],
  },
  {
    id: "qambar",
    batyr: "qambar",
    title: { kk: "Қамбар батыр", ru: "Камбар батыр", en: "Qambar Batyr" },
    lead: {
      kk: "Тоқсан үйді аңшылықпен асыраған кедей жігіт елін жаудан қорғап қалады.",
      ru: "Бедный юноша, кормивший охотой девяносто юрт, защищает свой народ от набега.",
      en: "A poor young hunter who fed ninety yurts stands between his people and a raid.",
    },
    panels: [
      {
        src: asset("/comics/qambar-1.jpg"),
        caption: {
          kk: "Қамбар аңнан оралады: тоқсан үйдің несібесі оның садағында.",
          ru: "Камбар возвращается с охоты: пропитание девяноста юрт — на его луке.",
          en: "Qambar comes back from the hunt: ninety households live by his bow.",
        },
      },
      {
        src: asset("/comics/qambar-2.jpg"),
        caption: {
          kk: "Бай ауылдың қызы Назым өтіп бара жатқан аңшыны көзімен ұзатады.",
          ru: "Назым из богатого аула провожает взглядом идущего мимо охотника.",
          en: "Nazym, from the rich aul, watches the passing hunter.",
        },
      },
      {
        src: asset("/comics/qambar-3.jpg"),
        caption: {
          kk: "Түнгі шабуыл: қалмақ қолы ауылды өртке орайды.",
          ru: "Ночной набег: калмыцкий отряд поджигает аул.",
          en: "A night raid: Kalmyk horsemen set the aul alight.",
        },
      },
      {
        src: asset("/comics/qambar-4.jpg"),
        caption: {
          kk: "Қамбар жалғыз қарсы шығады — қолға түскен найзамен жауды тойтарады.",
          ru: "Камбар выходит один и отбивает нападавших подобранным копьём.",
          en: "Qambar goes out alone and throws the raiders back with a captured spear.",
        },
      },
      {
        src: asset("/comics/qambar-5.jpg"),
        caption: {
          kk: "Жеңістен кейінгі той. Батырдың иығында жаңа шапан, қасында Назым.",
          ru: "Пир после победы: на плечах батыра новый чапан, рядом Назым.",
          en: "The feast after the victory: a new robe on the batyr's shoulders, Nazym beside him.",
        },
      },
    ],
  },];

export const getComic = (id: string) => COMICS.find((c) => c.id === id);
