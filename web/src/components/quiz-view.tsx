"use client";

/**
 * «Сұрақтар»: викторина по данным сайта.
 *
 * Порядок вопросов и ответов перемешивается в обработчике «Бастау», а не при
 * рендере, — иначе статическая страница и браузер разошлись бы в разметке.
 */
import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { QUIZ, type QuizQuestion } from "@/data/quiz";
import { useT } from "@/lib/use-t";
import { KoshkarOrnament, PageHero, Reveal } from "@/components/ui";

/** Вопрос с уже перемешанными вариантами */
interface Prepared {
  q: QuizQuestion;
  order: number[];
}

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function prepare(): Prepared[] {
  return shuffle(QUIZ).map((q) => ({ q, order: shuffle(q.options.map((_, i) => i)) }));
}

export function QuizView() {
  const { t, pick } = useT();
  const [deck, setDeck] = useState<Prepared[] | null>(null);
  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  const total = QUIZ.length;

  function start() {
    setDeck(prepare());
    setStep(0);
    setPicked(null);
    setScore(0);
  }

  function choose(optionIndex: number) {
    if (picked !== null || !deck) return;
    setPicked(optionIndex);
    if (optionIndex === deck[step].q.answer) setScore((s) => s + 1);
  }

  function next() {
    setPicked(null);
    setStep((s) => s + 1);
  }

  const current = deck && step < total ? deck[step] : null;
  const finished = deck !== null && step >= total;

  return (
    <>
      <PageHero section="quiz" eyebrow={t("page.quiz.eyebrow")} title={t("page.quiz.title")} lead={t("page.quiz.lead")} />

      <section className="container-page py-16">
        {/* Заставка */}
        {deck === null && (
          <Reveal className="mx-auto max-w-2xl rounded-[var(--radius-card)] border border-line bg-surface p-10 text-center shadow-[var(--shadow-card)]">
            <KoshkarOrnament className="mx-auto h-12 w-14 text-gold" />
            <p className="mt-6 text-lead text-muted">{t("page.quiz.lead")}</p>
            <button
              type="button"
              onClick={start}
              className="mt-8 cursor-pointer rounded-full [background-image:var(--grad-gold)] px-9 py-3.5 text-[0.72rem] font-bold uppercase tracking-[0.16em] text-[#1a1208] shadow-[var(--shadow-card)] transition-transform hover:scale-[1.03]"
            >
              {t("quiz.start")}
            </button>
          </Reveal>
        )}

        {/* Вопрос */}
        {current && (
          <div className="mx-auto max-w-3xl">
            <div className="flex items-center justify-between">
              <span className="eyebrow">{t("quiz.question", { n: step + 1, total })}</span>
              <span className="font-display text-2xl text-gold">
                {score} / {total}
              </span>
            </div>
            <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-line">
              <motion.div
                className="h-full [background-image:var(--grad-gold)]"
                initial={false}
                animate={{ width: `${((step + (picked === null ? 0 : 1)) / total) * 100}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={current.q.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3 }}
                className="mt-8 rounded-[var(--radius-card)] border border-line bg-surface p-8 shadow-[var(--shadow-card)] md:p-10"
              >
                <h2 className="font-display text-3xl leading-tight text-ink">{pick(current.q.question)}</h2>

                <ul className="mt-7 grid gap-3">
                  {current.order.map((optionIndex) => {
                    const isAnswer = optionIndex === current.q.answer;
                    const isPicked = picked === optionIndex;
                    let tone = "border-line bg-bg-2 hover:border-gold";
                    if (picked !== null && isAnswer) tone = "border-[#4f8a56] bg-[rgba(79,138,86,.12)]";
                    else if (isPicked) tone = "border-[#b4503f] bg-[rgba(180,80,63,.12)]";
                    else if (picked !== null) tone = "border-line bg-bg-2 opacity-60";

                    return (
                      <li key={optionIndex}>
                        <button
                          type="button"
                          onClick={() => choose(optionIndex)}
                          disabled={picked !== null}
                          className={`flex w-full items-center justify-between gap-4 rounded-2xl border px-5 py-4 text-left text-ink transition-colors ${tone} ${
                            picked === null ? "cursor-pointer" : "cursor-default"
                          }`}
                        >
                          <span>{pick(current.q.options[optionIndex])}</span>
                          {picked !== null && isAnswer && <span className="text-sm text-[#4f8a56]">{t("quiz.correct")}</span>}
                          {isPicked && !isAnswer && <span className="text-sm text-[#b4503f]">{t("quiz.wrong")}</span>}
                        </button>
                      </li>
                    );
                  })}
                </ul>

                {picked !== null && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="overflow-hidden"
                  >
                    <p className="mt-6 border-t border-line pt-6 text-muted">{pick(current.q.explain)}</p>
                    <div className="mt-5 flex flex-wrap items-center gap-5">
                      <button
                        type="button"
                        onClick={next}
                        className="cursor-pointer rounded-full [background-image:var(--grad-gold)] px-8 py-3 text-[0.72rem] font-bold uppercase tracking-[0.16em] text-[#1a1208] transition-transform hover:scale-[1.03]"
                      >
                        {step + 1 === total ? t("quiz.finish") : t("quiz.next")}
                      </button>
                      <Link href={current.q.href} className="eyebrow text-gold">
                        {t("quiz.readMore")} →
                      </Link>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {/* Результат */}
        {finished && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mx-auto max-w-2xl rounded-[var(--radius-card)] border border-line bg-surface p-10 text-center shadow-[var(--shadow-lift)]"
          >
            <KoshkarOrnament className="mx-auto h-12 w-14 text-gold" />
            <p className="eyebrow mt-5">
              {score >= total - 3 ? t("quiz.rank.high") : score >= total / 2 ? t("quiz.rank.mid") : t("quiz.rank.low")}
            </p>
            <p className="mt-4 font-display text-5xl text-gradient-gold">{t("quiz.result", { score, total })}</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-5">
              <button
                type="button"
                onClick={start}
                className="cursor-pointer rounded-full [background-image:var(--grad-gold)] px-8 py-3 text-[0.72rem] font-bold uppercase tracking-[0.16em] text-[#1a1208] transition-transform hover:scale-[1.03]"
              >
                {t("quiz.again")}
              </button>
              <Link href="/batyrs" className="eyebrow text-gold">
                {t("nav.batyrs")} →
              </Link>
            </div>
          </motion.div>
        )}
      </section>
    </>
  );
}
