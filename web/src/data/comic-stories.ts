/**
 * Развёрнутый текст к кадрам комиксов — то, что читается на странице
 * книги под подписью. Пересказ сюжета жыра своими словами, не цитата.
 * Ключ — имя файла кадра из data/comics.ts.
 */
import type { Localized } from "@/data/batyrs";

export const COMIC_STORIES: Record<string, Localized> = {
  /* ---------------- Қобыланды ---------------- */
  "qobylandy-1.jpg": {
    kk: "Тайбурылды кішкентай құлын кезінен Құртқа баққан: жасырын қорада өсіріп, жылы сүт беріп, жүйрік болатынын алдын ала білген. Енді сол құлын — жырдағы ең атақты тұлпар. Қобыланды желге қарап тұрып, жаудың елге жақындап қалғанын сезеді. Ол үшін жорық — даңқ іздеу емес, ата-анасы мен ауылдың тыныштығы үшін берілген уәде.",
    ru: "Тайбурыла Куртка растила с жеребёнка: прятала в отдельном загоне, поила молоком и заранее знала, что из него вырастет скакун. Теперь этот жеребёнок — самый знаменитый конь эпоса. Кобыланды смотрит против ветра и чувствует, что враг подходит к земле рода. Для него поход — не погоня за славой, а обещание, данное родителям и аулу.",
    en: "Qurtqa raised Taiburyl from a foal: she hid him in a separate pen, fed him milk and knew early on that he would become a great racer. Now that foal is the most famous horse of the epic. Qobylandy faces the wind and senses the enemy nearing his people's land. For him the campaign is not a hunt for glory but a promise made to his parents and his aul.",
  },
  "qobylandy-2.jpg": {
    kk: "Батырды бүкіл ауыл шығарып салады. Анасы ұлының тізгінін ұзақ босатпай, ақ батасын береді; әкесі ата-бабадан қалған найзаны ұсынады. Құртқа үн-түнсіз тұр, бірақ оның көзі «аман орал» дейді. Жырда қоштасу әрқашан ұзақ айтылады — тыңдаушы батырдың нені қорғауға аттанғанын осы сәтте ұғады.",
    ru: "Провожать батыра выходит весь аул. Мать долго не выпускает повод сына и даёт ему благословение; отец вручает копьё, оставшееся от предков. Куртка стоит молча, но взгляд её говорит: «возвращайся живым». В жыре прощание всегда поётся долго — именно здесь слушатель понимает, что батыр уходит защищать.",
    en: "The whole aul comes out to see the batyr off. His mother holds his reins for a long time and gives her blessing; his father hands him the spear inherited from their ancestors. Qurtqa stands silent, but her eyes say: “come back alive.” In the epic the farewell is always sung at length — this is where listeners learn what the hero rides out to protect.",
  },
  "qobylandy-3.jpg": {
    kk: "Жыршылар Тайбурылдың шабысын айтқанда дауысын көтеріп, домбыраны жиі қағады: ат таудан асып, өзеннен ұшып өтеді, шаңы бұлтқа жетеді. Айлық жолды бірнеше күнде алады. Бұл — асыра сілтеу ғана емес, көшпелі халықтың атқа деген құрметі. Тұлпарсыз батыр жоқ, жырда ат пен ердің тағдыры бір.",
    ru: "Когда сказители доходят до скачки Тайбурыла, они повышают голос и чаще бьют по струнам домбры: конь перемахивает горы, перелетает реки, пыль поднимается до облаков. Месячный путь он проходит за несколько дней. Это не просто гипербола, а почтение кочевника к коню. Без тулпара нет батыра — в жыре их судьбы едины.",
    en: "When storytellers reach Taiburyl's gallop they raise their voices and strike the dombra faster: the horse leaps mountains, flies over rivers, and his dust reaches the clouds. A month's journey takes him a few days. It is more than exaggeration — it is the nomad's reverence for the horse. There is no batyr without a tulpar; in the epic their fates are one.",
  },
  "qobylandy-4.jpg": {
    kk: "Қызылбас елінің ханы Қазанмен кездесу — жырдың шарықтау шегі. Екі қол бір-біріне қарсы тұрып, тек батырлардың жекпе-жегін күтеді. Найза сынады, қылыш шағылысады, бірақ Қобыланды шегінбейді. Жырау бұл ұрысты ұзақ толғайды: батырдың күші білегінде ғана емес, елі үшін соңына дейін тұра білуінде.",
    ru: "Встреча с Казан-ханом — вершина жыра. Два войска стоят друг против друга и ждут только поединка героев. Ломаются копья, звенят сабли, но Кобыланды не отступает. Жырау поёт эту схватку долго: сила батыра не только в руке, а в умении стоять до конца за свой народ.",
    en: "The clash with Kazan Khan is the peak of the epic. Two armies face each other and wait only for the duel of champions. Spears break and sabres ring, yet Qobylandy does not give ground. The zhyrau sings this fight at length: a batyr's strength lies not only in his arm but in standing to the end for his people.",
  },
  "qobylandy-5.jpg": {
    kk: "Жау жеңілген соң Қобыланды ең алдымен тұтқындағы ағайынын іздейді. Кісендер шешіліп, бала-шаға аналарымен қауышады, қарттар көзіне жас алады. Жыр осы жерде олжаны емес, адамдарды санайды. Халық жадында батыр жеңгені үшін емес, елін үйіне қайтарғаны үшін қалады.",
    ru: "Победив врага, Кобыланды первым делом ищет своих пленных сородичей. С них снимают оковы, дети находят матерей, старики не могут сдержать слёз. Жыр здесь считает не добычу, а людей. В памяти народа батыр остаётся не потому, что победил, а потому, что вернул свой народ домой.",
    en: "Once the enemy is defeated, Qobylandy first looks for his captive kin. Their shackles come off, children find their mothers, and the elders weep. Here the epic counts people, not spoils. The batyr is remembered not because he won, but because he brought his people home.",
  },
  "qobylandy-6.jpg": {
    kk: "Ұзақ жорықтан кейін Тайбурыл таныс белге шығады. Құртқа алдынан жүгіріп шығып, ақсақалдар бата береді, ауылда той басталады. Бірақ жыр мақтанмен емес, тыныштықпен аяқталады: ел аман, жұрт түгел. Қобыланды туралы жыр ғасырлар бойы осылай айтылып, әр ұрпаққа ерліктің мәнін үйреткен.",
    ru: "После долгого похода Тайбурыл поднимается на знакомый перевал. Куртка выбегает навстречу, старейшины благословляют батыра, в ауле начинается той. Но жыр кончается не похвальбой, а покоем: народ цел, все дома. Так сказание о Кобыланды пели веками, и каждое поколение училось по нему, что такое мужество.",
    en: "After a long campaign Taiburyl climbs the familiar pass. Qurtqa runs to meet them, the elders bless the batyr and a feast begins in the aul. Yet the epic ends not in boasting but in peace: the people are safe and whole. The tale of Qobylandy was sung like this for centuries, teaching every generation what courage means.",
  },

  /* ---------------- Алпамыс ---------------- */
  "alpamys-1.jpg": {
    kk: "Байбөрі байдың көп күтіп көрген жалғыз ұлы Алпамыс жасынан ерекше күшті болып өседі. Ешкім мінгізбеген асау Байшұбарды ол тізгінмен емес, сабырмен бағындырады. Ат пен батыр бір-бірін таниды — енді олар бірге алыс жолға шығады. Жырда тұлпарын тапқан жігіт есейді деп саналады.",
    ru: "Алпамыс — долгожданный единственный сын бая Байбори — с детства растёт необычайно сильным. Неукротимого Байшубара, к которому никто не мог подойти, он покоряет не уздой, а терпением. Конь и всадник узнают друг друга — теперь им вместе в дальний путь. В жыре юноша, нашедший своего тулпара, считается взрослым.",
    en: "Alpamys, the long-awaited only son of the wealthy Baybori, grows up unusually strong. He tames the wild Baishubar, whom no one could approach, not with a bridle but with patience. Horse and rider recognise each other — now they will travel far together. In the epic, a youth who finds his tulpar is counted a man.",
  },
  "alpamys-2.jpg": {
    kk: "Алпамыстың бесіктен атастырылған қалыңдығы — Сарыбайдың қызы Гүлбаршын. Сарыбай елі қалмақтың Тайшық ханы билеген жерге көшіп кеткен, сондықтан батыр қалыңдығын іздеп алыс жолға шығады. Ауыл оны шығарып салып, Гүлбаршын оның оралуын күтуге уәде береді. Алда — жау жері және ұзақ сынақ.",
    ru: "С колыбели Алпамыс просватан за Гульбаршын, дочь Сарыбая. Род Сарыбая откочевал на земли, где правит калмыцкий Тайшик-хан, и батыр отправляется в дальний путь за невестой. Аул провожает его, а Гульбаршын обещает дождаться. Впереди — вражеская земля и долгие испытания.",
    en: "Since the cradle Alpamys has been betrothed to Gulbarshyn, daughter of Sarybay. Sarybay's clan has migrated to lands ruled by the Kalmyk Taishyk Khan, so the batyr sets out on a long road for his bride. The aul sees him off, and Gulbarshyn promises to wait. Ahead lie enemy land and long trials.",
  },
  "alpamys-3.jpg": {
    kk: "Тайшық ханның қолы сансыз көп, бірақ Алпамыс жалғыз өзі майданға шығады. Найзасының бір сілтеуімен жау қатарын бұзып, Байшұбар оны ұрыстың ортасынан аман алып шығады. Жау ашық шайқаста жеңе алмайтынын түсініп, айлаға көшеді. Жырда батырды күш емес, опасыздық тоқтатады.",
    ru: "Войско Тайшик-хана бесчисленно, но Алпамыс выходит на поле один. Одним ударом копья он ломает вражеский строй, а Байшубар выносит его из самой гущи боя. Враг понимает, что в открытой битве не победить, и прибегает к хитрости. В жыре батыра останавливает не сила, а вероломство.",
    en: "Taishyk Khan's army is countless, yet Alpamys takes the field alone. One thrust of his spear breaks the enemy line, and Baishubar carries him out of the thick of battle. Realising they cannot win in open combat, the enemy turns to cunning. In the epic it is not strength that stops the batyr, but treachery.",
  },
  "alpamys-4.jpg": {
    kk: "Тайшық хан Алпамысты ұйықтап жатқанда байлатып, терең зынданға тастатады. Жеті жыл бойы батыр жер астында жатады. Оған жанашыр қыздың тастаған нанымен ғана жан сақтайды, ал Байшұбар ұзақ жылдар бойы иесін күтеді. Бұл бөлім — жырдағы ең мұңды тұс, бірақ үміт сөнбейді.",
    ru: "Тайшик-хан велит связать спящего Алпамыса и бросить его в глубокий зиндан. Семь лет батыр томится под землёй. Жив он лишь благодаря хлебу, который бросает ему сострадательная девушка, а Байшубар все эти годы ждёт хозяина. Это самая печальная часть жыра, но надежда в ней не гаснет.",
    en: "Taishyk Khan has Alpamys bound in his sleep and thrown into a deep pit-prison. For seven years the batyr languishes underground. He survives only on the bread a compassionate girl drops to him, while Baishubar waits for his master all those years. It is the saddest part of the epic, yet hope never goes out.",
  },
  "alpamys-5.jpg": {
    kk: "Зынданнан құтылған Алпамыс еліне жыртық киіммен, ешкім танымайтын кейіпте оралады. Ол жоқта Ұлтан тақты басып алып, Гүлбаршынды күштеп алмақ болған. Тойда батыр ешкім тарта алмаған садақты оңай керіп, жыртық шапанын серпіп тастайды. Ел өз батырын таниды, әділдік қалпына келеді.",
    ru: "Вырвавшись из зиндана, Алпамыс возвращается домой в лохмотьях, неузнанным. В его отсутствие власть захватил Ультан и хотел силой взять Гульбаршын. На свадебном пиру батыр легко натягивает лук, который никто не мог согнуть, и сбрасывает рваный чапан. Народ узнаёт своего батыра, и справедливость восстановлена.",
    en: "Escaping the pit, Alpamys returns home in rags, unrecognised. In his absence Ultan seized power and meant to take Gulbarshyn by force. At the wedding feast the batyr easily draws the bow no one else could bend and throws off his torn robe. The people recognise their batyr, and justice is restored.",
  },

  /* ---------------- Ер Тарғын ---------------- */
  "er-targyn-1.jpg": {
    kk: "Тарғын ханға адал қызмет етіп, талай жауды тойтарған батыр. Бірақ сарайдағы іші тар адамдар оның даңқын көре алмай, ханның құлағына жала сыбырлайды. Хан шындықты анықтамай, батырға ренжиді. Намысы жоғары Тарғын ақталып жатпай, елден кетуді жөн көреді.",
    ru: "Таргын верно служил хану и не раз отражал врагов. Но завистливые придворные не выносят его славы и нашёптывают хану клевету. Хан, не разобравшись, гневается на батыра. Гордый Таргын не опускается до оправданий и решает уйти.",
    en: "Targyn served the khan faithfully and repelled many enemies. But envious courtiers cannot bear his fame and whisper slander in the khan's ear. Without looking into it, the khan turns against the batyr. Proud Targyn will not stoop to justify himself and chooses to leave.",
  },
  "er-targyn-2.jpg": {
    kk: "Жолда Тарғын хан қызы Ақжүніспен кездеседі. Ақжүніс сүймеген адамға берілгісі келмей, батырмен бірге кетуді таңдайды. Екеуі жапан далаға шығып, қуғыннан жасырынып, бір-біріне сенім артады. Жырда Ақжүніс — жай ғана сұлу емес, батыл әрі ақылды серік.",
    ru: "В пути Таргын встречает ханскую дочь Акжунис. Не желая выходить за нелюбимого, она решает уйти вместе с батыром. Вдвоём они уходят в безлюдную степь, скрываются от погони и доверяются друг другу. В жыре Акжунис — не просто красавица, а смелая и мудрая спутница.",
    en: "On the road Targyn meets the khan's daughter Aqzhunis. Unwilling to marry a man she does not love, she chooses to leave with the batyr. Together they ride into the empty steppe, hide from pursuit and learn to trust one another. In the epic Aqzhunis is not just a beauty but a brave and wise companion.",
  },
  "er-targyn-3.jpg": {
    kk: "Қашқындардың алдынан арнасынан асқан тасқын өзен шығады. Артта — қуғыншылар, алда — суық ағыс. Тарғынның адал аты Тарлан тайсалмай суға түсіп, иелерін арғы жағаға аман шығарады. Жыр тағы да айтады: батырдың ең сенімді досы — оның аты.",
    ru: "Путь беглецам преграждает вышедшая из берегов река. Сзади погоня, впереди ледяной поток. Верный конь Таргына Тарлан без колебаний входит в воду и выносит хозяев на другой берег. Жыр снова напоминает: самый надёжный друг батыра — его конь.",
    en: "A river in full flood blocks the fugitives' way. Behind them, the pursuers; ahead, the icy current. Targyn's faithful horse Tarlan plunges in without hesitation and carries them safely to the far bank. Once again the epic reminds us: a batyr's truest friend is his horse.",
  },
  "er-targyn-4.jpg": {
    kk: "Олардың соңынан тәжірибелі қарт батыр Қартқожақ қуып жетеді. Екі әскер тыныстамай қарап тұрған жекпе-жек ұзаққа созылады: жастың қызуы мен қарттың тәжірибесі беттеседі. Ақыры екі батыр бір-бірінің ерлігін мойындайды. Жырда нағыз батыр жауының да күшін құрметтей біледі.",
    ru: "Их настигает опытный старый батыр Карткожак. Поединок, за которым, затаив дыхание, следят два войска, длится долго: пыл юности против опыта старости. В конце концов оба батыра признают отвагу друг друга. В жыре настоящий герой умеет уважать силу даже противника.",
    en: "They are overtaken by the seasoned old batyr Qartqozhaq. The duel, watched by two hosts holding their breath, lasts a long time: the fire of youth against the experience of age. In the end both warriors acknowledge each other's valour. In the epic a true hero can honour even an opponent's strength.",
  },
  "er-targyn-5.jpg": {
    kk: "Елге қауіп төнгенде Тарғын өкпесін ұмытып, қайтадан қорғауға келеді. Жау тойтарылған соң бұрынғы жала әшкере болып, ақсақалдар батырға бата береді. Тарғын мен Ақжүніс ел ортасында құрметпен қарсы алынады. Жыр кешірімділік пен адалдық туралы ой қалдырады.",
    ru: "Когда над народом нависает угроза, Таргын забывает обиду и снова встаёт на защиту. Враг отбит, клевета раскрыта, и старейшины благословляют батыра. Таргына и Акжунис встречают с почётом. Жыр оставляет мысль о прощении и верности.",
    en: "When danger threatens his people, Targyn forgets his grievance and rises to defend them again. The enemy is driven off, the slander exposed, and the elders bless the batyr. Targyn and Aqzhunis are welcomed with honour. The epic leaves a thought about forgiveness and loyalty.",
  },

  /* ---------------- Қабанбай ---------------- */
  "kabanbay-1.jpg": {
    kk: "XVIII ғасырдың басы — «Ақтабан шұбырынды» жылдары. Жоңғар шапқыншылығынан кейін ауылдар күлге айналып, ел босып кетеді. Жас Қабанбай өз көзімен көрген қасіретті ешқашан ұмытпауға, туған жерді қайтаруға ант береді. Тарихи тұлғаның жолы осы сәттен басталады.",
    ru: "Начало XVIII века — годы «Актабан шубырынды», великого бедствия. После джунгарских набегов аулы превращаются в пепел, народ уходит в скитания. Юный Кабанбай клянётся никогда не забыть увиденного горя и вернуть родную землю. Отсюда начинается путь исторического героя.",
    en: "The early 18th century — the years of “Aqtaban Shubyryndy,” the Great Calamity. After the Dzungar raids, auls turn to ash and people flee. Young Qabanbay vows never to forget the grief he has seen and to win back his homeland. This is where the historical hero's path begins.",
  },
  "kabanbay-2.jpg": {
    kk: "Үш жүздің батырлары бір ту астына жиналады. Ақсақалдар ақ бата береді, жасақ жорыққа сай болады. Қабанбай — сол қолбасшылардың бірі; кейін Абылай хан оны «Дарабоз» деп атайды. Бұл бірлік — жеңістің басты шарты екенін ел жақсы түсінді.",
    ru: "Батыры всех трёх жузов собираются под одним знаменем. Старейшины дают благословение, ополчение готовится к походу. Кабанбай — один из предводителей; позже Абылай-хан назовёт его «Дарабоз» — несокрушимым. Народ хорошо понимал: единство — главное условие победы.",
    en: "Batyrs of all three zhuzes gather under one banner. The elders give their blessing and the militia prepares to march. Qabanbay is one of the commanders; later Ablai Khan will call him “Daraboz,” the invincible. The people understood well that unity was the first condition of victory.",
  },
  "kabanbay-3.jpg": {
    kk: "Дала дәстүрі бойынша ұрыс жекпе-жектен басталады. Қабанбай атақты Қубас атымен алға шығып, жоңғардың таңдаулы батырымен беттеседі. Екі қол үнсіз күтеді — бұл жекпе-жектің нәтижесі бүкіл әскердің рухын шешеді. Аңыз бойынша Қабанбай жеңіп, қазақ қолына қуат береді.",
    ru: "По степному обычаю битва начинается с поединка. Кабанбай на знаменитом коне Кубасе выезжает навстречу лучшему джунгарскому батыру. Оба войска молча ждут — исход поединка решит дух всей армии. По преданию, Кабанбай побеждает и вдохновляет казахское войско.",
    en: "By steppe custom, battle begins with single combat. Qabanbay rides out on his famous horse Kubas to face the best Dzungar champion. Both armies wait in silence — the outcome will decide the spirit of the whole host. According to legend, Qabanbay wins and inspires the Kazakh army.",
  },
  "kabanbay-4.jpg": {
    kk: "Аңырақай шайқасы — қазақ-жоңғар соғысындағы ең ірі жеңістердің бірі. Үш жүздің біріккен қолы жауды талқандап, туған жерді қайтаруға жол ашады. Жау жеңілгенде олар аңырап қашқан деген сөзден жердің аты қалған деседі. Қабанбай бұл шайқаста қолды бастаған батырлардың алдыңғы қатарында болды.",
    ru: "Анракайская битва — одна из крупнейших побед казахско-джунгарской войны. Объединённое войско трёх жузов разбивает врага и открывает путь к возвращению родных земель. Говорят, название места пошло от слова «аңырау» — рыдать: так бежали побеждённые. Кабанбай был среди тех, кто вёл войско в первых рядах.",
    en: "The Battle of Anyraqay is one of the greatest victories of the Kazakh–Dzungar war. The united army of the three zhuzes routs the enemy and opens the way to reclaiming their lands. The place name is said to come from “aŋyrau,” to wail — as the defeated fled. Qabanbay was among those who led the army from the front.",
  },
  "kabanbay-5.jpg": {
    kk: "Соғыс жылдары артта қалды. Ел ата-баба жеріне қайта көшіп, жайлауларда қайтадан ақ үйлер тігіледі. Қартайған батыр төбе басынан көшті қарап, өмірін неге арнағанын көреді. Қабанбайдың есімі бүгін де ауыл, көше, ескерткіштерде сақталған.",
    ru: "Годы войны позади. Народ кочует обратно на земли предков, на джайляу снова ставят белые юрты. Постаревший батыр смотрит с холма на кочевье и видит, ради чего прожил жизнь. Имя Кабанбая и сегодня хранят названия сёл, улиц и памятники.",
    en: "The war years are over. The people migrate back to their ancestral lands, and white yurts rise again on the summer pastures. The aging batyr watches the caravan from a hill and sees what he gave his life for. Qabanbay's name lives on today in villages, streets and monuments.",
  },

  /* ---------------- Исатай мен Махамбет ---------------- */
  "isatay-1.jpg": {
    kk: "XIX ғасырдың 30-жылдары Бөкей ордасында қарапайым шаруалардың жағдайы ауырлай түседі: жайылымдар тартып алынып, салық көбейеді. Старшын Исатай Тайманұлы халықтың мұңын тыңдап, оны ханға жеткізбек болады. Бірақ Жәңгір хан мен сұлтандар арызға құлақ аспайды. Наразылық біртіндеп көтеріліске ұласады.",
    ru: "В 1830-е годы в Букеевской Орде положение простых кочевников становится всё тяжелее: пастбища отбирают, поборы растут. Старшина Исатай Тайманулы выслушивает жалобы людей и пытается донести их до хана. Но хан Жангир и султаны глухи к ним. Недовольство постепенно перерастает в восстание.",
    en: "In the 1830s life for ordinary herders in the Bukey Horde grows ever harder: pastures are seized and levies rise. The elder Isatay Taimanuly listens to people's grievances and tries to bring them to the khan. But Khan Zhangir and the sultans ignore them. Discontent gradually turns into an uprising.",
  },
  "isatay-2.jpg": {
    kk: "Исатайдың серігі — ақын әрі батыр Махамбет Өтемісұлы. Оның өлеңдері найзадай өткір: «Ереуіл атқа ер салмай…» деген жолдар сарбаздардың жүрегін оятады. Махамбет сөзді қаруға айналдырады — ол көтерілістің дауысы болды. Оның жырлары бүгін де мектепте жатталады.",
    ru: "Соратник Исатая — поэт и воин Махамбет Утемисулы. Его стихи остры, как копьё: строки «Ереуіл атқа ер салмай…» будят сердца воинов. Махамбет превращает слово в оружие — он стал голосом восстания. Его стихи и сегодня учат наизусть в школах.",
    en: "Isatay's comrade is the poet and warrior Makhambet Utemisuly. His verses are sharp as a spear: the lines “Ereuil atqa er salmai…” awaken the warriors' hearts. Makhambet turns words into weapons — he became the voice of the uprising. His poems are still learned by heart in schools today.",
  },
  "isatay-3.jpg": {
    kk: "1836 жылы көтерілісшілер қолы хан ордасына қарай бет алады. Олардың қатарында шаруалар, малшылар, кедейлер бар — бәрі әділдік іздеген қарапайым адамдар. Көтеріліс бірнеше жылға созылып, бүкіл Бөкей ордасын қамтиды. Бұл — қазақ даласындағы ірі халық қозғалыстарының бірі.",
    ru: "В 1836 году отряды восставших двинулись к ханской ставке. В их рядах — пастухи, бедняки, простые кочевники, ищущие справедливости. Восстание длится несколько лет и охватывает всю Букеевскую Орду. Это одно из крупнейших народных движений казахской степи.",
    en: "In 1836 the rebel bands march on the khan's headquarters. Their ranks are herders, the poor, ordinary nomads seeking justice. The uprising lasts several years and spreads across the whole Bukey Horde. It is one of the largest popular movements in the Kazakh steppe.",
  },
  "isatay-4.jpg": {
    kk: "1838 жылғы шілдеде Ақбұлақ маңында соңғы шайқас өтеді. Жазалаушы әскердің зеңбіректері мен мылтықтары алдында көтерілісшілердің күші тең емес еді. Исатай батыр осы ұрыста қаза табады. Ол ерлікпен құлады, бірақ оның ісі мен есімі халық жадында қалды.",
    ru: "В июле 1838 года у Акбулака происходит последняя битва. Против пушек и ружей карательного отряда силы восставших были неравны. Исатай погибает в этом бою. Он пал как герой, но его дело и имя остались в памяти народа.",
    en: "In July 1838 the final battle takes place near Aqbulaq. Against the cannon and rifles of the punitive force, the rebels were outmatched. Isatay falls in this battle. He died a hero, but his cause and his name stayed in the people's memory.",
  },
  "isatay-5.jpg": {
    kk: "Досынан айырылған Махамбет жалғыз қалады, бірақ күресін тоқтатпайды. Енді оның қаруы — сөз: Исатайды жоқтаған жырлары бүкіл далаға тарайды. 1846 жылы ақын да қаза табады. Бірақ оның өлеңдері ғасырлар бойы еркіндіктің үні болып қала берді.",
    ru: "Потеряв друга, Махамбет остаётся один, но не прекращает борьбы. Теперь его оружие — слово: плач по Исатаю разносится по всей степи. В 1846 году погибает и поэт. Но его стихи на века остались голосом свободы.",
    en: "Having lost his friend, Makhambet is left alone but does not give up the struggle. Now his weapon is the word: his lament for Isatay spreads across the steppe. In 1846 the poet too is killed. Yet his verses have remained the voice of freedom for centuries.",
  },

  /* ---------------- Қамбар ---------------- */
  "qambar-1.jpg": {
    kk: "Қамбар — бай емес, жай аңшы. Бірақ оның садағы мен қыраны тоқсан үйлі ауылды асырайды: ол олжасын әр шаңыраққа тең бөледі. Ел оны күші үшін ғана емес, жомарттығы үшін құрметтейді. Жыр батырлықтың бірінші белгісі — басқаны ойлау екенін көрсетеді.",
    ru: "Камбар — не богач, а простой охотник. Но его лук и беркут кормят аул в девяносто юрт: добычу он делит поровну на каждый очаг. Люди уважают его не только за силу, но и за щедрость. Жыр показывает: первый признак батыра — думать о других.",
    en: "Qambar is no rich man, just a hunter. Yet his bow and his eagle feed an aul of ninety yurts: he shares his catch equally with every hearth. People honour him not only for his strength but for his generosity. The epic shows that the first mark of a batyr is caring for others.",
  },
  "qambar-2.jpg": {
    kk: "Бай ауылдың еркесі, ақылды да тәкаппар Назым талай байдың ұлын менсінбей қайтарған. Бірақ қасынан өтіп бара жатқан қарапайым аңшыны көргенде, оның адалдығы мен батылдығын бірден таниды. Назым үшін байлық емес, адамның өзі маңызды. Олардың тағдыры осы кездесуден басталады.",
    ru: "Назым — любимица богатого аула, умная и гордая, отказавшая многим сыновьям баев. Но, увидев проезжающего мимо простого охотника, она сразу распознаёт в нём честность и отвагу. Для Назым важно не богатство, а сам человек. С этой встречи начинается их общая судьба.",
    en: "Nazym, the darling of a wealthy aul, clever and proud, has turned down many rich men's sons. But when she sees a simple hunter riding by, she at once recognises his honesty and courage. For Nazym what matters is not wealth but the person. Their shared fate begins with this meeting.",
  },
  "qambar-3.jpg": {
    kk: "Түнде ауылға қалмақ қолы шабуыл жасайды. Үйлер өртеніп, мал айдалып, ел дүрбелеңге түседі. Байлар қорқып, ешкім қарсы тұруға батылы бармайды. Сонда Назым көмек сұрап, Қамбарға хабар жібертеді.",
    ru: "Ночью на аул нападает калмыцкий отряд. Юрты горят, скот угоняют, люди в смятении. Богачи напуганы, и никто не решается дать отпор. Тогда Назым посылает весть Камбару с просьбой о помощи.",
    en: "At night a Kalmyk band attacks the aul. Yurts burn, the herds are driven off and the people are in turmoil. The rich men are afraid and no one dares to resist. Then Nazym sends word to Qambar, asking for help.",
  },
  "qambar-4.jpg": {
    kk: "Қамбар бір сәт те ойланбай атқа қонады. Ол жалғыз өзі жау қолына қарсы шығып, қолына түскен найзамен жауды тойтарады. Оның ерлігін көрген ауыл жігіттері де батылдана бастайды. Жыр бойынша батырлық — тектіліктен емес, жүректен туады.",
    ru: "Камбар, не раздумывая ни минуты, садится в седло. Он один выходит против вражеского отряда и отбивается копьём, попавшимся под руку. Видя его отвагу, джигиты аула тоже набираются смелости. По жыру, героизм рождается не из знатности, а из сердца.",
    en: "Without a moment's hesitation Qambar mounts his horse. He rides out alone against the raiders and drives them back with a spear snatched up in the fight. Seeing his courage, the young men of the aul find their own. In the epic, heroism is born not of noble birth but of the heart.",
  },
  "qambar-5.jpg": {
    kk: "Жау қуылып, ауылға тыныштық оралады. Ел жеңісті тойлап, Қамбарға жаңа шапан жабады. Назым батырдың жанында — оның таңдауы дұрыс болып шықты. Жыр қарапайым аңшының халық қорғаушысына айналғанын жырлап, ерлік пен адалдықты дәріптейді.",
    ru: "Враг изгнан, в аул возвращается покой. Люди празднуют победу и накидывают на плечи Камбара новый чапан. Назым рядом с батыром — её выбор оказался верным. Жыр воспевает, как простой охотник стал защитником народа, и прославляет отвагу и верность.",
    en: "The enemy is driven away and peace returns to the aul. The people celebrate and drape a new robe over Qambar's shoulders. Nazym stands beside the batyr — her choice proved right. The epic sings of how a simple hunter became the people's defender, praising courage and loyalty.",
  },
};
