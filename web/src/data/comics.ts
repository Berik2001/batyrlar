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
];

export const getComic = (id: string) => COMICS.find((c) => c.id === id);
