/**
 * Мок-данные: 10 батыров.
 * type: "epic" — герой жыра (указан первоисточник), "historical" — реальная личность с датами.
 * palette — цвета градиента-заглушки для карточек без изображения.
 * quote.source — происхождение цитаты: для Махамбета это подлинные строки,
 * для остальных — стилизация в духе жыра / народного предания.
 *
 * Данные перенесены без изменений из js/data/batyrs.js;
 * пути к изображениям переписаны на public-каталог Next.js (/img/...).
 */

/** Языки интерфейса и контента. */
export type Lang = "kk" | "ru" | "en";

/** Строка, переведённая на все три языка. */
export type Localized = Record<Lang, string>;

/** Список строк, переведённый на все три языка. */
export type LocalizedList = Record<Lang, string[]>;

/** Тип батыра: эпический (герой жыра) или исторический. */
export type BatyrType = "epic" | "historical";

/**
 * Пункт хронологии.
 * У исторических батыров указан year, у эпических — label (этап сюжета жыра).
 */
export interface TimelineEntry {
  year?: string;
  label?: Localized;
  text: Localized;
}

/** Цитата батыра и происхождение цитаты. */
export interface BatyrQuote {
  text: Localized;
  source: Localized;
}

export interface Batyr {
  id: string;
  type: BatyrType;
  /** Попадает ли батыр в блок «Топ батырлар» на главной. */
  top: boolean;
  /** Батыр дня в блоке spotlight. */
  featured?: boolean;
  image?: string;
  /** Два цвета градиента-заглушки. */
  palette: string[];
  name: Localized;
  epithet: Localized;
  era: Localized;
  /** Первоисточник — только у эпических батыров. */
  source?: Localized;
  /** Годы жизни — только у исторических батыров. */
  years?: string;
  bio: Localized;
  deeds: LocalizedList;
  timeline: TimelineEntry[];
  quote: BatyrQuote;
  /** id связанных батыров. */
  related: string[];
}

export const BATYRS: Batyr[] = [
  {
    id: "qobylandy",
    image: "/img/qobylandy.jpg",
    type: "epic",
    top: true,
    palette: ["#6b3a1e", "#1a0f08"],
    name: { kk: "Қобыланды батыр", ru: "Кобыланды батыр", en: "Qobylandy Batyr" },
    epithet: { kk: "Тайбурылдың иесі", ru: "Всадник Тайбурыла", en: "Rider of Taiburyl" },
    era: { kk: "Ноғайлы дәуірі, XIV–XV ғғ.", ru: "Эпоха Ногайлы, XIV–XV вв.", en: "Nogai era, 14th–15th c." },
    source: { kk: "«Қобыланды батыр» жыры", ru: "Жыр «Кобыланды батыр»", en: "The epic “Qobylandy Batyr”" },
    bio: {
      kk: "Қобыланды — қыпшақ Тоқтарбайдың ұзақ күткен перзенті, қазақ батырлар жырының ең танымал кейіпкерлерінің бірі. Жастайынан ел шетін жаудан қорғауға аттанып, қызылбас Қазан ханды жеңеді. Оның ерлігінде ақылды жары Құртқа мен сенімді тұлпары Тайбурыл ерекше рөл атқарады. Жыр XIX ғасырда Марабай жыраудың нұсқасы бойынша жазылып алынған.",
      ru: "Кобыланды — долгожданный сын кипчака Токтарбая и один из самых известных героев казахского богатырского эпоса. С юных лет он выступает на защиту родных земель и одолевает кызылбасского Казан-хана. В его подвигах важную роль играют мудрая жена Куртка и верный конь Тайбурыл. Жыр записан в XIX веке, наиболее известен вариант Марабай-жырау.",
      en: "Qobylandy is the long-awaited son of the Kipchak elder Toktarbai and one of the best-known heroes of the Kazakh heroic epic. From a young age he rides out to defend his people and defeats Kazan Khan of the Kyzylbash. His wise wife Kurtka and his loyal steed Taiburyl play a key role in his deeds. The epic was recorded in the 19th century; the version of Marabai zhyrau is the most famous.",
    },
    deeds: {
      kk: ["Қызылбас Қазан ханды жекпе-жекте жеңді", "Тұтқындағы елін азат етті", "Тайбурылды баулып, тұлпар етті"],
      ru: [
        "Победил Казан-хана в поединке",
        "Освободил свой народ из плена",
        "Вырастил из жеребёнка Тайбурыла легендарного тулпара",
      ],
      en: [
        "Defeated Kazan Khan in single combat",
        "Freed his people from captivity",
        "Raised Taiburyl into a legendary steed",
      ],
    },
    timeline: [
      {
        label: { kk: "Туылуы", ru: "Рождение", en: "Birth" },
        text: {
          kk: "Тоқтарбай мен Аналықтың тілегі қабыл болады",
          ru: "Молитвы Токтарбая и Аналык услышаны",
          en: "Toktarbai and Analyk's prayers are answered",
        },
      },
      {
        label: { kk: "Құртқа", ru: "Куртка", en: "Kurtka" },
        text: {
          kk: "Құртқаға үйленіп, Тайбурылды алады",
          ru: "Женится на Куртке и получает Тайбурыла",
          en: "Marries Kurtka and receives Taiburyl",
        },
      },
      {
        label: { kk: "Жорық", ru: "Поход", en: "Campaign" },
        text: {
          kk: "Қазан ханның қамалына аттанады",
          ru: "Выступает против крепости Казан-хана",
          en: "Marches on Kazan Khan's fortress",
        },
      },
      {
        label: { kk: "Жеңіс", ru: "Победа", en: "Victory" },
        text: {
          kk: "Елін азат етіп, еліне оралады",
          ru: "Освобождает народ и возвращается домой",
          en: "Frees his people and returns home",
        },
      },
    ],
    quote: {
      text: {
        kk: "Ел шетіне жау келсе, батырға тыныштық жоқ.",
        ru: "Когда враг у границ — батыру нет покоя.",
        en: "When the enemy nears the border, a batyr knows no rest.",
      },
      source: { kk: "Жыр мотиві", ru: "Мотив жыра", en: "Epic motif" },
    },
    related: ["alpamys", "er-targyn", "qambar"],
  },
  {
    id: "alpamys",
    image: "/img/alpamys.jpg",
    type: "epic",
    top: true,
    palette: ["#2f4a3a", "#0b120d"],
    name: { kk: "Алпамыс батыр", ru: "Алпамыс батыр", en: "Alpamys Batyr" },
    epithet: { kk: "Қоңыраттың қорғаны", ru: "Защитник Конырата", en: "Shield of the Konyrat" },
    era: { kk: "Көне оғыз-қыпшақ дәуірі", ru: "Древняя огузо-кипчакская эпоха", en: "Ancient Oghuz-Kipchak era" },
    source: { kk: "«Алпамыс батыр» жыры", ru: "Жыр «Алпамыс батыр»", en: "The epic “Alpamys Batyr”" },
    bio: {
      kk: "Алпамыс — қоңырат Байбөрі байдың ұлы, түркі халықтарына ортақ көне эпостың кейіпкері. Қалыңдығы Гүлбаршынды іздеп, қалмақ Тайшық ханның жеріне аттанады. Алданып, жеті жыл зынданда отырады, бірақ рухы сынбайды. Еліне жасырын оралып, тағын тартып алған Ұлтанды жазалап, әділдікті қалпына келтіреді.",
      ru: "Алпамыс — сын конырата Байбори, герой древнего эпоса, общего для многих тюркских народов. В поисках невесты Гулбаршын он отправляется во владения калмыцкого Тайшык-хана. Попав в ловушку, он семь лет томится в зиндане, но не теряет духа. Вернувшись на родину неузнанным, он наказывает узурпатора Ултана и восстанавливает справедливость.",
      en: "Alpamys, son of the Konyrat elder Baibori, is the hero of an ancient epic shared by many Turkic peoples. Seeking his bride Gulbarshyn, he rides into the lands of the Kalmyk Taishyk Khan. Trapped by treachery, he spends seven years in a dungeon pit without losing heart. Returning home in disguise, he punishes the usurper Ultan and restores justice.",
    },
    deeds: {
      kk: ["Гүлбаршынды жаудан құтқарды", "Жеті жыл зынданнан аман шықты", "Ұлтанды жазалап, елге әділдік әкелді"],
      ru: ["Спас Гулбаршын от врагов", "Выжил семь лет в зиндане", "Наказал Ултана и вернул справедливость"],
      en: [
        "Rescued Gulbarshyn from her captors",
        "Survived seven years in a dungeon",
        "Punished Ultan and restored justice",
      ],
    },
    timeline: [
      {
        label: { kk: "Уәде", ru: "Обет", en: "The vow" },
        text: { kk: "Гүлбаршынға атастырылады", ru: "Помолвлен с Гулбаршын", en: "Betrothed to Gulbarshyn" },
      },
      {
        label: { kk: "Жорық", ru: "Поход", en: "Campaign" },
        text: {
          kk: "Байшұбармен Тайшық ханға аттанады",
          ru: "На коне Байшубаре идёт к Тайшык-хану",
          en: "Rides Baishubar against Taishyk Khan",
        },
      },
      {
        label: { kk: "Зындан", ru: "Зиндан", en: "The pit" },
        text: { kk: "Жеті жыл тұтқында", ru: "Семь лет в плену", en: "Seven years in captivity" },
      },
      {
        label: { kk: "Қайту", ru: "Возвращение", en: "Return" },
        text: {
          kk: "Ұлтанды жеңіп, елін біріктіреді",
          ru: "Побеждает Ултана и объединяет род",
          en: "Defeats Ultan and reunites his people",
        },
      },
    ],
    quote: {
      text: {
        kk: "Зынданда жатса да, ердің рухы бос.",
        ru: "Даже в зиндане дух героя свободен.",
        en: "Even in the pit, a hero's spirit is free.",
      },
      source: { kk: "Жыр мотиві", ru: "Мотив жыра", en: "Epic motif" },
    },
    related: ["qobylandy", "er-sayin", "er-kokshe"],
  },
  {
    id: "er-targyn",
    image: "/img/er-targyn.jpg",
    type: "epic",
    top: true,
    palette: ["#5a2a2a", "#140909"],
    name: { kk: "Ер Тарғын", ru: "Ер Таргын", en: "Er Targyn" },
    epithet: { kk: "Тарланның иесі", ru: "Всадник Тарлана", en: "Rider of Tarlan" },
    era: { kk: "Ноғайлы дәуірі, XV–XVI ғғ.", ru: "Эпоха Ногайлы, XV–XVI вв.", en: "Nogai era, 15th–16th c." },
    source: { kk: "«Ер Тарғын» жыры", ru: "Жыр «Ер Таргын»", en: "The epic “Er Targyn”" },
    bio: {
      kk: "Ер Тарғын — Ноғайлы дәуірінің батыры, еркіндікті бәрінен жоғары қойған қаһарман. Ақша ханның қолында қызмет етіп, жауға қарсы шайқаста ерекше көзге түседі. Ханның қызы Ақжүніспен бірге ордадан кетіп, қиын сынақтардан өтеді. Жыр Марабай жыраудың орындауында жазылып алынып, қазақ эпосының інжу-маржанына айналған.",
      ru: "Ер Таргын — батыр эпохи Ногайлы, для которого свобода превыше всего. Служа в войске Акша-хана, он прославляется в битве с врагами. Вместе с дочерью хана Акжунис он покидает орду и проходит через тяжёлые испытания. Жыр записан в исполнении Марабай-жырау и считается жемчужиной казахского эпоса.",
      en: "Er Targyn is a batyr of the Nogai era who valued freedom above all. Serving in the army of Aksha Khan, he wins renown in battle against the enemy. Together with the khan's daughter Akzhunis he leaves the horde and endures hard trials. Recorded from the performance of Marabai zhyrau, the epic is one of the gems of Kazakh oral literature.",
    },
    deeds: {
      kk: ["Ақша ханның жауын жеңді", "Ақжүніспен бірге еркіндікті таңдады", "Қарт Қожақпен жекпе-жектен кейін достасты"],
      ru: ["Разбил врагов Акша-хана", "Выбрал свободу вместе с Акжунис", "После поединка стал другом старого Кожака"],
      en: [
        "Crushed the enemies of Aksha Khan",
        "Chose freedom with Akzhunis",
        "Became friends with old Kozhak after their duel",
      ],
    },
    timeline: [
      {
        label: { kk: "Қызмет", ru: "Служба", en: "Service" },
        text: { kk: "Ақша ханның қолына қосылады", ru: "Вступает в войско Акша-хана", en: "Joins Aksha Khan's army" },
      },
      {
        label: { kk: "Шайқас", ru: "Битва", en: "Battle" },
        text: { kk: "Жаудың қолын талқандайды", ru: "Громит вражеское войско", en: "Routs the enemy host" },
      },
      {
        label: { kk: "Ақжүніс", ru: "Акжунис", en: "Akzhunis" },
        text: {
          kk: "Ханның қызымен бірге кетеді",
          ru: "Уходит вместе с дочерью хана",
          en: "Departs with the khan's daughter",
        },
      },
    ],
    quote: {
      text: {
        kk: "Құл болып тірі жүргенше, ер болып өлген артық.",
        ru: "Лучше пасть героем, чем жить рабом.",
        en: "Better to fall a hero than live a slave.",
      },
      source: {
        kk: "Халық мақалы, жыр рухында",
        ru: "Народная пословица в духе жыра",
        en: "Folk proverb in the spirit of the epic",
      },
    },
    related: ["qobylandy", "qambar", "er-sayin"],
  },
  {
    id: "qambar",
    image: "/img/qambar.jpg",
    type: "epic",
    top: false,
    palette: ["#4a3a1c", "#120e06"],
    name: { kk: "Қамбар батыр", ru: "Камбар батыр", en: "Qambar Batyr" },
    epithet: { kk: "Тоқсан үйдің асыраушысы", ru: "Кормилец девяноста юрт", en: "Provider of Ninety Yurts" },
    era: { kk: "Ноғайлы дәуірі", ru: "Эпоха Ногайлы", en: "Nogai era" },
    source: { kk: "«Қамбар батыр» жыры", ru: "Жыр «Камбар батыр»", en: "The epic “Qambar Batyr”" },
    bio: {
      kk: "Қамбар — кедей ортадан шыққан, аңшылықпен тоқсан үйлі елді асыраған батыр. Оның қарапайымдылығы мен жомарттығы халық арасында үлкен құрметке ие. Қалмақ қолы Әзімбайдың еліне шапқанда, Қамбар жауды тойтарып, елді қорғап қалады. Ерлігі үшін сұлу Назымның сүйіспеншілігіне бөленеді.",
      ru: "Камбар — батыр из простого народа, который охотой кормил девяносто бедных юрт. Его скромность и щедрость снискали ему любовь людей. Когда калмыцкое войско нападает на аул богача Азимбая, именно Камбар отражает врага и спасает народ. За свою доблесть он завоёвывает сердце красавицы Назым.",
      en: "Qambar is a batyr of humble origins who fed ninety poor households by hunting. His modesty and generosity earned him the love of the people. When a Kalmyk host raids the village of the wealthy Azimbai, it is Qambar who repels the enemy and saves the people. His courage wins him the heart of the beautiful Nazym.",
    },
    deeds: {
      kk: ["Аңшылықпен тоқсан үйді асырады", "Қалмақ шапқыншылығын тойтарды", "Әзімбайдың елін құтқарды"],
      ru: ["Кормил охотой девяносто юрт", "Отразил набег калмыков", "Спас аул Азимбая"],
      en: ["Fed ninety households by hunting", "Repelled a Kalmyk raid", "Saved Azimbai's village"],
    },
    timeline: [
      {
        label: { kk: "Аңшы", ru: "Охотник", en: "Hunter" },
        text: { kk: "Тоқсан үйлі елдің асыраушысы", ru: "Кормит девяносто юрт", en: "Feeds ninety households" },
      },
      {
        label: { kk: "Шапқыншылық", ru: "Набег", en: "The raid" },
        text: {
          kk: "Жау Әзімбайдың еліне шабады",
          ru: "Враг нападает на аул Азимбая",
          en: "The enemy raids Azimbai's village",
        },
      },
      {
        label: { kk: "Жеңіс", ru: "Победа", en: "Victory" },
        text: {
          kk: "Қамбар елді қорғап, Назымға қосылады",
          ru: "Камбар спасает народ и соединяется с Назым",
          en: "Qambar saves the people and weds Nazym",
        },
      },
    ],
    quote: {
      text: {
        kk: "Батырдың байлығы — елінің амандығы.",
        ru: "Богатство батыра — благополучие его народа.",
        en: "A batyr's wealth is the wellbeing of his people.",
      },
      source: { kk: "Жыр мотиві", ru: "Мотив жыра", en: "Epic motif" },
    },
    related: ["er-targyn", "qobylandy", "qarasay"],
  },
  {
    id: "er-sayin",
    image: "/img/er-sayin.jpg",
    type: "epic",
    top: false,
    palette: ["#233a4f", "#070d14"],
    name: { kk: "Ер Сайын", ru: "Ер Сайын", en: "Er Sayin" },
    epithet: { kk: "Жас қаһарман", ru: "Юный герой", en: "The Young Champion" },
    era: { kk: "Ноғайлы дәуірі", ru: "Эпоха Ногайлы", en: "Nogai era" },
    source: { kk: "«Ер Сайын» жыры", ru: "Жыр «Ер Сайын»", en: "The epic “Er Sayin”" },
    bio: {
      kk: "Ер Сайын — Ноғайлы циклі жырларының кейіпкері, жас кезінен ерлік көрсеткен батыр. Ол ел шетіне төнген қауіпке жалғыз аттанудан тайынбайды. Жырда оның батылдығы, әділдігі және ата-анасына деген адалдығы дәріптеледі. Шығарма ауызша дәстүр арқылы ұрпақтан ұрпаққа жеткен.",
      ru: "Ер Сайын — герой жыров ногайлинского цикла, прославившийся подвигами с юных лет. Он не колеблется, выступая в одиночку навстречу опасности у границ. Жыр воспевает его отвагу, справедливость и верность родителям. Произведение передавалось из поколения в поколение в устной традиции.",
      en: "Er Sayin is a hero of the Nogai cycle of epics, famed for his deeds from a young age. He does not hesitate to ride out alone against dangers at the border. The epic celebrates his courage, sense of justice and devotion to his parents. The work was passed down through generations by oral tradition.",
    },
    deeds: {
      kk: ["Жас кезінде жауға жалғыз аттанды", "Ел шекарасын қорғады", "Ата-анасының үмітін ақтады"],
      ru: ["В юности один выступил против врага", "Защитил рубежи народа", "Оправдал надежды родителей"],
      en: [
        "Rode out alone against the enemy in his youth",
        "Guarded the people's borders",
        "Fulfilled his parents' hopes",
      ],
    },
    timeline: [
      {
        label: { kk: "Жастық", ru: "Юность", en: "Youth" },
        text: { kk: "Ерте есейген батыр", ru: "Рано возмужавший батыр", en: "A batyr grown early" },
      },
      {
        label: { kk: "Аттану", ru: "Выступление", en: "Setting out" },
        text: { kk: "Жалғыз жорыққа шығады", ru: "Выходит в одиночный поход", en: "Sets out on a lone campaign" },
      },
      {
        label: { kk: "Даңқ", ru: "Слава", en: "Glory" },
        text: { kk: "Елге даңқымен оралады", ru: "Возвращается со славой", en: "Returns in glory" },
      },
    ],
    quote: {
      text: {
        kk: "Жастық — ерлікке кедергі емес.",
        ru: "Молодость — не помеха доблести.",
        en: "Youth is no barrier to valour.",
      },
      source: { kk: "Жыр мотиві", ru: "Мотив жыра", en: "Epic motif" },
    },
    related: ["er-kokshe", "alpamys", "qarasay"],
  },
  {
    id: "er-kokshe",
    image: "/img/er-kokshe.jpg",
    type: "epic",
    top: false,
    palette: ["#3b3552", "#0d0b14"],
    name: { kk: "Ер Көкше", ru: "Ер Кокше", en: "Er Kokshe" },
    epithet: { kk: "Ер Қосайдың әкесі", ru: "Отец Ер Косая", en: "Father of Er Kosai" },
    era: { kk: "Ноғайлы дәуірі", ru: "Эпоха Ногайлы", en: "Nogai era" },
    source: {
      kk: "«Ер Көкше» жыры, «Қырымның қырық батыры» циклі",
      ru: "Жыр «Ер Кокше», цикл «Сорок богатырей Крыма»",
      en: "The epic “Er Kokshe”, “Forty Batyrs of Crimea” cycle",
    },
    bio: {
      kk: "Ер Көкше — «Қырымның қырық батыры» цикліне енген жырдың қаһарманы, батыр Ер Қосайдың әкесі. Ол Ноғайлы ордасын жаудан қорғаған тәжірибелі қолбасшы ретінде суреттеледі. Жырда әке мен ұлдың ерлігі сабақтаса баяндалып, батырлық дәстүрдің жалғастығы көрсетіледі. Цикл XX ғасырда Мұрын жыраудан жазылып алынған.",
      ru: "Ер Кокше — герой жыра из цикла «Сорок богатырей Крыма», отец батыра Ер Косая. Он изображён опытным полководцем, защищавшим Ногайлинскую орду от врагов. В жыре подвиги отца и сына переплетаются, показывая преемственность богатырской традиции. Цикл был записан в XX веке от Мурын-жырау.",
      en: "Er Kokshe is the hero of an epic from the “Forty Batyrs of Crimea” cycle and the father of the batyr Er Kosai. He is portrayed as a seasoned commander who defended the Nogai Horde from its enemies. The epic weaves together the deeds of father and son, showing the continuity of the heroic tradition. The cycle was recorded in the 20th century from Muryn zhyrau.",
    },
    deeds: {
      kk: ["Ноғайлы ордасын қорғады", "Ер Қосайды батыр етіп тәрбиеледі", "Қырық батырдың қатарында аталды"],
      ru: ["Защищал Ногайлинскую орду", "Воспитал сына Ер Косая батыром", "Вошёл в число сорока богатырей"],
      en: ["Defended the Nogai Horde", "Raised his son Er Kosai as a batyr", "Named among the forty batyrs"],
    },
    timeline: [
      {
        label: { kk: "Қолбасшы", ru: "Полководец", en: "Commander" },
        text: { kk: "Ноғайлы қолын бастайды", ru: "Возглавляет ногайлинское войско", en: "Leads the Nogai host" },
      },
      {
        label: { kk: "Әке", ru: "Отец", en: "Father" },
        text: { kk: "Ер Қосай дүниеге келеді", ru: "Рождается Ер Косай", en: "Er Kosai is born" },
      },
      {
        label: { kk: "Мұра", ru: "Наследие", en: "Legacy" },
        text: { kk: "Ерлігі ұлында жалғасады", ru: "Подвиг продолжается в сыне", en: "His valour lives on in his son" },
      },
    ],
    quote: {
      text: {
        kk: "Әкенің ерлігі — ұлға мұра.",
        ru: "Доблесть отца — наследство сына.",
        en: "A father's valour is his son's inheritance.",
      },
      source: { kk: "Жыр мотиві", ru: "Мотив жыра", en: "Epic motif" },
    },
    related: ["er-sayin", "qarasay", "alpamys"],
  },
  {
    id: "qarasay",
    image: "/img/qarasay.jpg",
    type: "epic",
    top: false,
    palette: ["#4f2e3f", "#12090e"],
    name: { kk: "Қарасай батыр", ru: "Карасай батыр", en: "Qarasay Batyr" },
    epithet: { kk: "Қазидің серігі", ru: "Побратим Кази", en: "Sworn Brother of Qazi" },
    era: { kk: "Ноғайлы дәуірі", ru: "Эпоха Ногайлы", en: "Nogai era" },
    source: {
      kk: "«Қарасай–Қази» жыры, «Қырымның қырық батыры» циклі",
      ru: "Жыр «Карасай–Кази», цикл «Сорок богатырей Крыма»",
      en: "The epic “Qarasay–Qazi”, “Forty Batyrs of Crimea” cycle",
    },
    bio: {
      kk: "Қарасай — «Қарасай–Қази» жырының бас кейіпкері, серігі Қазимен бірге ерлік жасаған батыр. Жыр достық пен адалдықты, ел намысын қорғауды дәріптейді. Екі батыр бірлесе отырып, үлкен жауға қарсы тұрады. Бұл есімді XVII ғасырда жоңғарларға қарсы соғысқан тарихи Қарасай батыр (1598–1671) да иеленген, халық жадында олардың бейнелері жиі тоғысады.",
      ru: "Карасай — главный герой жыра «Карасай–Кази», совершивший подвиги вместе со своим побратимом Кази. Жыр воспевает дружбу, верность и защиту чести народа. Вместе два батыра противостоят могущественному врагу. Это же имя носил исторический Карасай батыр (1598–1671), воевавший с джунгарами, и в народной памяти их образы нередко сливаются.",
      en: "Qarasay is the main hero of the epic “Qarasay–Qazi”, who performed great deeds together with his sworn brother Qazi. The epic celebrates friendship, loyalty and defending the honour of the people. Together the two batyrs stand against a mighty foe. The same name belonged to the historical Qarasay Batyr (1598–1671), who fought the Dzungars, and folk memory often merges the two figures.",
    },
    deeds: {
      kk: ["Қазимен бірге жауға қарсы тұрды", "Серттеріне адал болды", "Ел намысын қорғады"],
      ru: ["Вместе с Кази выстоял против врага", "Остался верен клятве побратимства", "Защитил честь народа"],
      en: ["Stood against the enemy alongside Qazi", "Kept his oath of brotherhood", "Defended the honour of his people"],
    },
    timeline: [
      {
        label: { kk: "Серт", ru: "Клятва", en: "The oath" },
        text: {
          kk: "Қазимен дос болып серттеседі",
          ru: "Даёт клятву побратимства Кази",
          en: "Swears brotherhood with Qazi",
        },
      },
      {
        label: { kk: "Жорық", ru: "Поход", en: "Campaign" },
        text: { kk: "Екі батыр бірге аттанады", ru: "Два батыра выступают вместе", en: "The two batyrs ride out together" },
      },
      {
        label: { kk: "Жеңіс", ru: "Победа", en: "Victory" },
        text: {
          kk: "Жауды жеңіп, елге оралады",
          ru: "Побеждают врага и возвращаются",
          en: "Defeat the foe and return home",
        },
      },
    ],
    quote: {
      text: {
        kk: "Досың адал болса, жауың әлсіз.",
        ru: "Когда друг верен — враг бессилен.",
        en: "When your friend is true, your enemy is weak.",
      },
      source: { kk: "Жыр мотиві", ru: "Мотив жыра", en: "Epic motif" },
    },
    related: ["er-kokshe", "qambar", "kabanbay"],
  },
  {
    id: "kabanbay",
    type: "historical",
    top: true,
    featured: true,
    image: "/img/kabanbay.jpg",
    palette: ["#6b1f1f", "#140606"],
    name: { kk: "Қабанбай батыр", ru: "Кабанбай батыр", en: "Kabanbay Batyr" },
    epithet: { kk: "Дарабоз", ru: "Дарабоз — «Несравненный»", en: "Daraboz — “the Peerless”" },
    years: "1691–1769",
    era: { kk: "Қазақ-жоңғар соғыстары", ru: "Казахско-джунгарские войны", en: "Kazakh-Dzungar wars" },
    bio: {
      kk: "Қабанбай батыр (шын аты — Ерасыл Қожағұлұлы) — XVIII ғасырдағы қазақ-жоңғар соғысының аса көрнекті қолбасшысы, найман тайпасынан шыққан. Абылай ханның ең жақын серіктерінің бірі болып, халық оны «Дарабоз» деп атаған. Аңырақай шайқасына қатысып, Тарбағатай мен Жетісу өңірін жаудан азат етуге зор үлес қосты. Оның есімі қазақ жерінің тұтастығы үшін күрестің символына айналды.",
      ru: "Кабанбай батыр (настоящее имя — Ерасыл Кожагулулы) — выдающийся полководец казахско-джунгарских войн XVIII века, выходец из рода найман. Он был одним из ближайших сподвижников Абылай хана, а народ дал ему прозвище «Дарабоз» — «Несравненный». Участвовал в Анракайской битве и сыграл ключевую роль в освобождении Тарбагатая и Семиречья. Его имя стало символом борьбы за целостность казахской земли.",
      en: "Kabanbay Batyr (born Yerasyl Kozhagululy) was an outstanding commander of the 18th-century Kazakh-Dzungar wars, from the Naiman tribe. One of Abylai Khan's closest companions, he was called “Daraboz” — “the Peerless” — by the people. He fought in the Battle of Anyrakay and played a key role in liberating Tarbagatai and Zhetysu. His name became a symbol of the struggle for the unity of the Kazakh lands.",
    },
    deeds: {
      kk: [
        "Аңырақай шайқасына қатысты",
        "Абылай ханның бас қолбасшыларының бірі болды",
        "Тарбағатай мен Жетісуды жоңғарлардан азат етті",
        "1750-жылдардағы шешуші жорықтарды басқарды",
      ],
      ru: [
        "Участвовал в Анракайской битве",
        "Был одним из главных полководцев Абылай хана",
        "Освобождал Тарбагатай и Семиречье от джунгар",
        "Руководил решающими походами 1750-х годов",
      ],
      en: [
        "Fought in the Battle of Anyrakay",
        "Served as one of Abylai Khan's chief commanders",
        "Liberated Tarbagatai and Zhetysu from the Dzungars",
        "Led decisive campaigns of the 1750s",
      ],
    },
    timeline: [
      { year: "1691", text: { kk: "Дүниеге келді", ru: "Родился", en: "Born" } },
      {
        year: "1723",
        text: {
          kk: "«Ақтабан шұбырынды» — ұлы апат жылдары",
          ru: "«Годы великого бедствия» — Актабан шубырынды",
          en: "“Years of Great Disaster” — Aktaban shubyryndy",
        },
      },
      { year: "1729", text: { kk: "Аңырақай шайқасы", ru: "Анракайская битва", en: "Battle of Anyrakay" } },
      {
        year: "1750–1758",
        text: {
          kk: "Абылай ханмен бірге шешуші жорықтар",
          ru: "Решающие походы вместе с Абылай ханом",
          en: "Decisive campaigns with Abylai Khan",
        },
      },
      { year: "1769", text: { kk: "Дүниеден өтті", ru: "Скончался", en: "Died" } },
    ],
    quote: {
      text: {
        kk: "Жерің — анаң, оны жауға бермейді.",
        ru: "Земля — твоя мать, её не отдают врагу.",
        en: "Your land is your mother — you do not yield it to the enemy.",
      },
      source: { kk: "Халық аңызы бойынша", ru: "По народному преданию", en: "According to folk tradition" },
    },
    related: ["isatay", "makhambet", "qarasay"],
  },
  {
    id: "isatay",
    image: "/img/isatay.jpg",
    type: "historical",
    top: true,
    palette: ["#5c3b14", "#140c04"],
    name: { kk: "Исатай Тайманұлы", ru: "Исатай Тайманулы", en: "Isatay Taimanuly" },
    epithet: { kk: "Көтеріліс көсемі", ru: "Вождь восстания", en: "Leader of the Uprising" },
    years: "1791–1838",
    era: {
      kk: "Бөкей ордасы, 1836–1838 көтерілісі",
      ru: "Букеевская орда, восстание 1836–1838",
      en: "Bukey Horde, uprising of 1836–1838",
    },
    bio: {
      kk: "Исатай Тайманұлы — Бөкей ордасындағы беріш руының старшыны, 1836–1838 жылдардағы ұлт-азаттық көтерілістің көсемі. Ол Жәңгір ханның және патша әкімшілігінің жер тартып алу мен алым-салық саясатына қарсы шықты. Көтерілісшілер 1837 жылдың күзінде Хан ордасына жақындап, үлкен күшке айналды. Исатай 1838 жылы 12 шілдеде Ақбұлақ өзені маңындағы шайқаста қаза тапты.",
      ru: "Исатай Тайманулы — старшина рода бериш в Букеевской (Внутренней) орде и вождь национально-освободительного восстания 1836–1838 годов. Он выступил против политики хана Жангира и царской администрации — изъятия земель и тяжёлых поборов. Осенью 1837 года повстанцы подошли к ханской ставке и превратились в грозную силу. Исатай погиб 12 июля 1838 года в бою у реки Акбулак.",
      en: "Isatay Taimanuly was an elder of the Berish clan in the Bukey (Inner) Horde and the leader of the national liberation uprising of 1836–1838. He opposed the policies of Khan Zhangir and the tsarist administration — the seizure of land and heavy levies. In autumn 1837 the rebels approached the khan's headquarters and became a formidable force. Isatay fell on 12 July 1838 in battle near the Akbulak river.",
    },
    deeds: {
      kk: [
        "Бөкей ордасындағы көтерілісті басқарды",
        "Шаруаларды жер тартып алуға қарсы біріктірді",
        "Махамбетпен бірге Хан ордасына жорық жасады",
      ],
      ru: [
        "Возглавил восстание в Букеевской орде",
        "Объединил шаруа против изъятия земель",
        "Вместе с Махамбетом совершил поход на ханскую ставку",
      ],
      en: [
        "Led the uprising in the Bukey Horde",
        "United herders against land seizures",
        "Marched on the khan's headquarters with Makhambet",
      ],
    },
    timeline: [
      { year: "1791", text: { kk: "Дүниеге келді", ru: "Родился", en: "Born" } },
      { year: "1836", text: { kk: "Көтеріліс басталды", ru: "Начало восстания", en: "The uprising begins" } },
      {
        year: "1837",
        text: {
          kk: "Хан ордасына жорық, Тастөбе шайқасы",
          ru: "Поход на ханскую ставку, бой у Тастобе",
          en: "March on the khan's seat, battle of Tastobe",
        },
      },
      {
        year: "1838",
        text: {
          kk: "12 шілде — Ақбұлақ шайқасында қаза тапты",
          ru: "12 июля — погиб в бою у Акбулака",
          en: "12 July — killed in battle at Akbulak",
        },
      },
    ],
    quote: {
      text: {
        kk: "Жер — халықтікі, оны сатуға ешкімнің қақысы жоқ.",
        ru: "Земля принадлежит народу, и никто не вправе её продавать.",
        en: "The land belongs to the people, and no one has the right to sell it.",
      },
      source: { kk: "Халық аңызы бойынша", ru: "По народному преданию", en: "According to folk tradition" },
    },
    related: ["makhambet", "kabanbay", "qobylandy"],
  },
  {
    id: "makhambet",
    image: "/img/makhambet.jpg",
    type: "historical",
    top: true,
    palette: ["#1f3b44", "#061013"],
    name: { kk: "Махамбет Өтемісұлы", ru: "Махамбет Утемисулы", en: "Makhambet Utemisuly" },
    epithet: { kk: "Ақын-батыр", ru: "Поэт-батыр", en: "Poet-Warrior" },
    years: "1803–1846",
    era: {
      kk: "Бөкей ордасы, 1836–1838 көтерілісі",
      ru: "Букеевская орда, восстание 1836–1838",
      en: "Bukey Horde, uprising of 1836–1838",
    },
    bio: {
      kk: "Махамбет Өтемісұлы — ақын, күйші, 1836–1838 жылдардағы көтерілістің Исатаймен бірге көсемі. Оның жалынды жырлары көтерілісшілердің рухын көтеріп, күрес туы болды. Көтеріліс жеңілгеннен кейін де ол күресті жалғастырып, қуғында жүрді. 1846 жылы 20 қазанда жалдамалы адамдардың қолынан қаза тапты, ал поэзиясы қазақ әдебиетінің алтын қорына енді.",
      ru: "Махамбет Утемисулы — поэт, кюйши и вместе с Исатаем предводитель восстания 1836–1838 годов. Его пламенные стихи поднимали дух повстанцев и стали знаменем борьбы. После поражения восстания он продолжал борьбу, скитаясь в изгнании. 20 октября 1846 года он был убит наёмниками, а его поэзия вошла в золотой фонд казахской литературы.",
      en: "Makhambet Utemisuly was a poet, kuy composer and, together with Isatay, a leader of the uprising of 1836–1838. His fiery verse lifted the rebels' spirits and became the banner of the struggle. After the uprising was crushed he fought on as a fugitive. He was killed by hired assassins on 20 October 1846, and his poetry entered the golden treasury of Kazakh literature.",
    },
    deeds: {
      kk: [
        "Исатаймен бірге көтерілісті басқарды",
        "Күрес рухындағы жырлар шығарды",
        "Көтеріліс жеңілгеннен кейін де күресін тоқтатпады",
      ],
      ru: [
        "Возглавил восстание вместе с Исатаем",
        "Создал стихи, ставшие гимном борьбы",
        "Не прекратил борьбу после поражения",
      ],
      en: [
        "Led the uprising together with Isatay",
        "Wrote verse that became the anthem of the struggle",
        "Kept fighting after the uprising's defeat",
      ],
    },
    timeline: [
      {
        year: "1803",
        text: { kk: "Бөкей ордасында дүниеге келді", ru: "Родился в Букеевской орде", en: "Born in the Bukey Horde" },
      },
      {
        year: "1836",
        text: {
          kk: "Исатаймен бірге көтеріліске шықты",
          ru: "Вместе с Исатаем поднял восстание",
          en: "Rose up with Isatay",
        },
      },
      {
        year: "1838",
        text: {
          kk: "Исатай қаза тапқаннан кейін күресті жалғастырды",
          ru: "После гибели Исатая продолжил борьбу",
          en: "Continued the struggle after Isatay's death",
        },
      },
      {
        year: "1846",
        text: {
          kk: "20 қазан — қастандықпен өлтірілді",
          ru: "20 октября — убит наёмниками",
          en: "20 October — assassinated",
        },
      },
    ],
    quote: {
      text: {
        kk: "Ереуіл атқа ер салмай,\nЕгеулі найза қолға алмай,\n…\nЕрлердің ісі бітер ме?",
        ru: "Не оседлав боевого коня,\nНе взяв в руки острое копьё,\n…\nРазве свершится дело героев?",
        en: "Without saddling the war horse,\nWithout taking up the whetted spear,\n…\nCan the deeds of heroes be done?",
      },
      source: {
        kk: "Махамбет, «Ереуіл атқа ер салмай»",
        ru: "Махамбет, «Ереуіл атқа ер салмай»",
        en: "Makhambet, “Ereuil atqa er salmai”",
      },
    },
    related: ["isatay", "kabanbay", "er-targyn"],
  },
];

export function getBatyr(id: string): Batyr | undefined {
  return BATYRS.find((b) => b.id === id);
}

export function byType(type: BatyrType): Batyr[] {
  return BATYRS.filter((b) => b.type === type);
}
