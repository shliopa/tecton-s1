"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";

const QUOTES = [
  {
    text: "«Впервые за двадцать лет работы с референсной акустикой я перестал замечать сами колонки. В комнате остаётся только оркестр и глубина зала.»",
    author: "Алексей Соколов",
    role: "Звукорежиссёр мастеринга, Kadens Lab",
  },
  {
    text: "«TECTON S1 ведёт себя как монолитная скульптура из титана. Она не спорит с архитектурой бетона и стекла, а собирает интерьер в единую точку.»",
    author: "Марина Белова",
    role: "Партнёр, Solen Architektur",
  },
  {
    text: "«Отклик графеновой мембраны поражает на малой громкости. Ночью система сохраняет всю плотность сцены и тончайшие нюансы записи.»",
    author: "Дмитрий Орлов",
    role: "Коллекционер винила и основатель Atelier Veld",
  },
];

export function TestimonialsCarousel() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const prefersReduced = useReducedMotion();

  const handleStep = (step: number) => {
    setDirection(step);
    setIndex((prev) => (prev + step + QUOTES.length) % QUOTES.length);
  };

  const current = QUOTES[index];

  return (
    <section
      aria-label="Отзывы архитекторов и звукорежиссёров"
      className="relative mx-auto w-full max-w-[1400px] px-4 py-28 sm:px-6 md:py-40 lg:px-10"
    >
      <div className="bezel-outer">
        <div className="bezel-inner flex flex-col justify-between gap-10 p-8 sm:p-12 md:p-16">
          <div className="min-h-[180px] sm:min-h-[160px] flex items-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.figure
                key={current.author}
                custom={direction}
                initial={
                  prefersReduced
                    ? { opacity: 0 }
                    : { opacity: 0, x: direction > 0 ? 28 : -28 }
                }
                animate={{ opacity: 1, x: 0 }}
                exit={
                  prefersReduced
                    ? { opacity: 0 }
                    : { opacity: 0, x: direction > 0 ? -28 : 28 }
                }
                transition={{ duration: 0.55, ease: [0.32, 0.72, 0, 1] }}
                className="w-full max-w-4xl"
              >
                <blockquote className="text-[clamp(1.35rem,2.6vw,2.2rem)] font-medium leading-[1.32] tracking-[-0.025em] text-[#F4F5F7]">
                  {current.text}
                </blockquote>
                <figcaption className="mt-7 flex flex-col gap-0.5 sm:flex-row sm:items-center sm:gap-3">
                  <span className="text-[15px] font-semibold text-[#F4F5F7]">
                    {current.author}
                  </span>
                  <span className="text-[14px] text-[#98A0AD]">{current.role}</span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-between border-t border-white/[0.08] pt-6">
            <div className="flex items-center gap-2" aria-label="Индикатор слайда">
              {QUOTES.map((quote, idx) => (
                <button
                  key={quote.author}
                  type="button"
                  onClick={() => {
                    setDirection(idx > index ? 1 : -1);
                    setIndex(idx);
                  }}
                  aria-label={`Показать отзыв ${idx + 1}`}
                  aria-current={idx === index ? "true" : undefined}
                  className={[
                    "h-1.5 rounded-full transition-[width,background-color] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
                    idx === index ? "w-10 bg-[#E84A27]" : "w-3 bg-white/20 hover:bg-white/40",
                  ].join(" ")}
                />
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => handleStep(-1)}
                aria-label="Предыдущий отзыв"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.03] text-[#F4F5F7] transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-white/35 hover:bg-white/[0.08] active:scale-[0.96]"
              >
                <ArrowLeft size={18} weight="light" />
              </button>
              <button
                type="button"
                onClick={() => handleStep(1)}
                aria-label="Следующий отзыв"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.03] text-[#F4F5F7] transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-white/35 hover:bg-white/[0.08] active:scale-[0.96]"
              >
                <ArrowRight size={18} weight="light" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
