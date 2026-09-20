/**
 * Сюжетные арки для страницы "Тарих".
 * Даты — общепринятые в историографии; для спорных событий указан наиболее распространённый год.
 *
 * Данные перенесены без изменений из js/data/arcs.js;
 * пути к изображениям переписаны на public-каталог Next.js (/img/...).
 */

import type { Localized } from "@/data/batyrs";

/** Событие внутри арки: год и его описание. */
export interface ArcEvent {
  year: string;
  title: Localized;
  text: Localized;
}

export interface Arc {
  id: string;
  image: string;
  /** Хронологические рамки арки. */
  years: string;
  /** Два цвета градиента-заглушки (есть не у всех арок). */
  palette?: string[];
  title: Localized;
  /** Вводный абзац. */
  lead: Localized;
  events: ArcEvent[];
  /** id батыров — ключевых фигур арки. */
  figures: string[];
}

export const ARCS: Arc[] = [
  {
    id: "jongar",
    image: "/img/jongar.jpg",
    years: "1643–1758",
    title: { kk: "Жоңғар соғыстары", ru: "Джунгарские войны", en: "The Dzungar Wars" },
    lead: {
      kk: "XVII–XVIII ғасырлардағы қазақ-жоңғар соғыстары — қазақ халқының тәуелсіздігі мен жерінің тұтастығы үшін жүз жылдан астам уақытқа созылған күрес. «Ақтабан шұбырынды» апатынан кейін үш жүздің батырлары біріккен қолмен жауға тойтарыс берді.",
      ru: "Казахско-джунгарские войны XVII–XVIII веков — более чем вековая борьба казахского народа за независимость и целостность своей земли. После катастрофы «Актабан шубырынды» батыры трёх жузов объединились и дали отпор врагу.",
      en: "The Kazakh-Dzungar wars of the 17th–18th centuries were a struggle of more than a century for the independence and territorial unity of the Kazakh people. After the catastrophe of “Aktaban shubyryndy”, the batyrs of the three zhuzes united to push back the enemy.",
    },
    events: [
      {
        year: "1643",
        title: { kk: "Орбұлақ шайқасы", ru: "Битва при Орбулаке", en: "Battle of Orbulak" },
        text: {
          kk: "Жәңгір хан бастаған шағын қазақ жасағы тау шатқалын пайдаланып, әлдеқайда көп жоңғар әскерін тоқтатты.",
          ru: "Небольшой казахский отряд во главе с Жангир ханом, используя горное ущелье, остановил многократно превосходящее войско джунгар.",
          en: "A small Kazakh force led by Zhangir Khan used a mountain gorge to halt a far larger Dzungar army.",
        },
      },
      {
        year: "1723",
        title: { kk: "Ақтабан шұбырынды", ru: "Актабан шубырынды", en: "Aktaban shubyryndy" },
        text: {
          kk: "Жоңғарлардың кенет шабуылы халықты жаппай босқыншылыққа ұшыратты — «Ұлы апат жылдары» басталды.",
          ru: "Внезапное вторжение джунгар обрекло народ на массовое бегство — начались «Годы великого бедствия».",
          en: "A sudden Dzungar invasion forced a mass exodus of the people — the “Years of Great Disaster” began.",
        },
      },
      {
        year: "1726",
        title: { kk: "Ордабасы жиыны", ru: "Съезд в Ордабасы", en: "Ordabasy assembly" },
        text: {
          kk: "Үш жүздің өкілдері бірігіп, жауға қарсы ортақ қол жасақтау туралы шешім қабылдады.",
          ru: "Представители трёх жузов договорились объединиться и создать общее ополчение против врага.",
          en: "Representatives of the three zhuzes agreed to unite and raise a common army against the enemy.",
        },
      },
      {
        year: "1729",
        title: { kk: "Аңырақай шайқасы", ru: "Анракайская битва", en: "Battle of Anyrakay" },
        text: {
          kk: "Біріккен қазақ қолы Балқаш көлінің оңтүстігінде жоңғарларды ойсырата жеңді. Жау «аңыраған» жер — Аңырақай атанды.",
          ru: "Объединённое казахское войско нанесло джунгарам тяжёлое поражение южнее Балхаша. Место прозвали Анракай — «место стенаний».",
          en: "The united Kazakh army inflicted a heavy defeat on the Dzungars south of Lake Balkhash. The site was named Anyrakay — “the place of wailing”.",
        },
      },
      {
        year: "1741–1743",
        title: { kk: "Абылай тұтқында", ru: "Абылай в плену", en: "Abylai in captivity" },
        text: {
          kk: "Жас сұлтан Абылай жоңғарлардың қолына түсіп, дипломатия арқылы босатылды. Кейін ол Қабанбаймен бірге шешуші жорықтарды басқарды.",
          ru: "Молодой султан Абылай попал в плен к джунгарам и был освобождён дипломатическим путём. Позже вместе с Кабанбаем он возглавил решающие походы.",
          en: "The young sultan Abylai was captured by the Dzungars and freed through diplomacy. Later, with Kabanbay, he led the decisive campaigns.",
        },
      },
      {
        year: "1756–1758",
        title: { kk: "Жоңғар хандығының құлауы", ru: "Падение Джунгарского ханства", en: "Fall of the Dzungar Khanate" },
        text: {
          kk: "Цин империясының жорықтары мен ішкі дағдарыс нәтижесінде Жоңғар хандығы жойылды. Қазақтар ата-мекенінің көп бөлігін қайтарды.",
          ru: "В результате походов империи Цин и внутреннего кризиса Джунгарское ханство пало. Казахи вернули значительную часть исконных земель.",
          en: "Qing campaigns and internal crisis brought down the Dzungar Khanate. The Kazakhs regained much of their ancestral lands.",
        },
      },
    ],
    figures: ["kabanbay", "qarasay"],
  },
  {
    id: "isatay-makhambet",
    years: "1836–1838",
    image: "/img/isatay-arc.jpg",
    palette: ["#7a3a14", "#140904"],
    title: { kk: "Исатай–Махамбет көтерілісі", ru: "Восстание Исатая и Махамбета", en: "The Isatay–Makhambet Uprising" },
    lead: {
      kk: "Бөкей ордасындағы шаруалардың Жәңгір хан мен патша әкімшілігіне қарсы көтерілісі. Жердің тартып алынуы, ауыр алым-салық пен сұлтандардың озбырлығы халықтың наразылығын тудырды. Көтерілісті батыр Исатай Тайманұлы мен ақын Махамбет Өтемісұлы басқарды.",
      ru: "Восстание шаруа Букеевской орды против хана Жангира и царской администрации. Изъятие земель, тяжёлые поборы и произвол султанов вызвали народный гнев. Во главе восстания встали батыр Исатай Тайманулы и поэт Махамбет Утемисулы.",
      en: "A revolt of the herders of the Bukey Horde against Khan Zhangir and the tsarist administration. Land seizures, heavy levies and the tyranny of the sultans provoked popular anger. It was led by the batyr Isatay Taimanuly and the poet Makhambet Utemisuly.",
    },
    events: [
      {
        year: "1801",
        title: { kk: "Бөкей ордасының құрылуы", ru: "Образование Букеевской орды", en: "Founding of the Bukey Horde" },
        text: {
          kk: "Бөкей сұлтан бастаған қазақтар Жайық пен Еділ аралығына қоныстанып, Ішкі Орда құрылды.",
          ru: "Казахи во главе с султаном Букеем переселились в междуречье Урала и Волги — возникла Внутренняя орда.",
          en: "Kazakhs led by Sultan Bukey settled between the Ural and Volga rivers, forming the Inner Horde.",
        },
      },
      {
        year: "1823",
        title: { kk: "Жәңгір хан билігі", ru: "Правление хана Жангира", en: "Rule of Khan Zhangir" },
        text: {
          kk: "Жәңгірдің тұсында жерлер сұлтандар мен ауқаттылардың меншігіне берілу күшейіп, қарапайым халықтың жағдайы нашарлады.",
          ru: "При Жангире усилилась раздача земель султанам и знати, положение простого народа ухудшилось.",
          en: "Under Zhangir, land was increasingly handed to sultans and nobles, and ordinary people's lives grew harder.",
        },
      },
      {
        year: "1836",
        title: { kk: "Көтерілістің басталуы", ru: "Начало восстания", en: "The uprising begins" },
        text: {
          kk: "Исатай мен Махамбет хан әкімдеріне бағынбай, шаруаларды өз төңірегіне топтастырды.",
          ru: "Исатай и Махамбет отказались подчиняться ханским властям и собрали вокруг себя шаруа.",
          en: "Isatay and Makhambet refused to obey the khan's officials and rallied the herders around them.",
        },
      },
      {
        year: "1837",
        title: { kk: "Хан ордасына жорық", ru: "Поход на ханскую ставку", en: "March on the khan's seat" },
        text: {
          kk: "Күзде көтерілісшілер Хан ордасын қоршады, бірақ 15 қарашада Тастөбе түбінде жазалаушы әскерден жеңіліп, Жайықтың арғы бетіне өтті.",
          ru: "Осенью повстанцы осадили ханскую ставку, но 15 ноября потерпели поражение от карателей у Тастобе и ушли за Урал.",
          en: "In autumn the rebels besieged the khan's headquarters, but on 15 November they were defeated by punitive troops at Tastobe and crossed the Ural.",
        },
      },
      {
        year: "1838",
        title: { kk: "Ақбұлақ шайқасы", ru: "Бой у Акбулака", en: "Battle of Akbulak" },
        text: {
          kk: "12 шілдеде Ақбұлақ өзені маңындағы шайқаста Исатай қаза тапты. Көтеріліс басылды.",
          ru: "12 июля в бою у реки Акбулак погиб Исатай. Восстание было подавлено.",
          en: "On 12 July Isatay was killed in battle near the Akbulak river. The uprising was crushed.",
        },
      },
      {
        year: "1846",
        title: { kk: "Махамбеттің қазасы", ru: "Гибель Махамбета", en: "Death of Makhambet" },
        text: {
          kk: "Күресін жалғастырған ақын 20 қазанда жалдамалы адамдардың қолынан қаза тапты. Оның жырлары ел жадында қалды.",
          ru: "Продолжавший борьбу поэт был убит наёмниками 20 октября. Его стихи остались в памяти народа.",
          en: "The poet, who had fought on, was killed by hired assassins on 20 October. His verse lives on in the people's memory.",
        },
      },
    ],
    figures: ["isatay", "makhambet"],
  },
];

export function getArc(id: string): Arc | undefined {
  return ARCS.find((a) => a.id === id);
}
