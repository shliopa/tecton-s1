"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Plus, Minus } from "@phosphor-icons/react";

const ANATOMY_ITEMS = [
  {
    id: "chassis",
    title: "Монолитный корпус",
    summary: "Сплав титана и авиационного алюминия, полностью лишённый собственных призвуков.",
    metric: "48 кг чистой массы",
    image: "./images/detail-titanium.jpg",
    alt: "Фрезерованная структура титанового корпуса",
  },
  {
    id: "membrane",
    title: "Графеновый статор",
    summary: "Толщина мембраны меньше диаметра волоса обеспечивает мгновенное затухание импульса.",
    metric: "2,4 микрона",
    image: "./images/acoustic-membrane.jpg",
    alt: "Тончайшая графеновая мембрана электростатического излучателя",
  },
  {
    id: "dial",
    title: "Магнитный контроллер",
    summary: "Регулятор громкости без механического трения с тактильной отдачей каждого шага.",
    metric: "Шаг 0,5 дБ",
    image: "./images/detail-dial.jpg",
    alt: "Титановый контроллер громкости на базальтовом камне",
  },
  {
    id: "calibration",
    title: "Цифровая адаптация",
    summary: "Встроенный процессор выравнивает фазу под геометрию стен и высоту потолков комнаты.",
    metric: "64-бит DSP",
    image: "./images/space-gallery.jpg",
    alt: "Архитектурная гостиная с парой систем TECTON S1",
  },
];

export function AnatomyAccordion() {
  const [activeId, setActiveId] = useState<string>(ANATOMY_ITEMS[0].id);
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="anatomy"
      className="relative mx-auto w-full max-w-[1400px] px-4 py-28 sm:px-6 md:py-40 lg:px-10"
    >
      <motion.div
        initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mb-14 max-w-2xl"
      >
        <h2 className="text-[clamp(2rem,4vw,3.4rem)] font-medium leading-[1.08] tracking-[-0.035em] text-[#F4F5F7]">
          Анатомия чистого звучания.
        </h2>
        <p className="mt-4 max-w-[50ch] text-[16px] leading-[1.6] text-[#98A0AD]">
          Наведите или выберите узел, чтобы рассмотреть конструкцию в деталях.
        </p>
      </motion.div>

      {/* Desktop horizontal expanding slices; explicit vertical accordion fallback below 768px */}
      <div className="bezel-outer">
        <div className="bezel-inner overflow-hidden p-2 sm:p-2.5">
          <div className="flex flex-col gap-2.5 md:h-[520px] md:flex-row">
            {ANATOMY_ITEMS.map((item) => {
              const isActive = item.id === activeId;

              return (
                <button
                  key={item.id}
                  type="button"
                  onMouseEnter={() => setActiveId(item.id)}
                  onFocus={() => setActiveId(item.id)}
                  onClick={() => setActiveId(item.id)}
                  aria-expanded={isActive}
                  className={[
                    "group relative flex flex-col justify-between overflow-hidden rounded-[calc(2rem-12px)] text-left",
                    "bg-[#0A0C10] ring-1 ring-white/[0.07]",
                    "transition-[flex-grow,background-color] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]",
                    isActive
                      ? "md:flex-[3.4] min-h-[300px] md:min-h-0"
                      : "md:flex-[1] min-h-[84px] md:min-h-0 hover:bg-[#101319]",
                  ].join(" ")}
                >
                  <img
                    src={item.image}
                    alt={item.alt}
                    loading="lazy"
                    className={[
                      "pointer-events-none absolute inset-0 h-full w-full object-cover",
                      "transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]",
                      isActive
                        ? "opacity-75 scale-100"
                        : "opacity-20 scale-105 group-hover:opacity-35",
                    ].join(" ")}
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#07080A] via-[#07080A]/55 to-[#07080A]/30"
                  />

                  <div className="relative z-10 flex w-full items-center justify-between p-5 sm:p-6">
                    <span className="font-mono text-[12px] tracking-[0.14em] text-[#E84A27]">
                      {item.metric}
                    </span>
                    <span
                      aria-hidden="true"
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.08] text-[#F4F5F7] md:hidden"
                    >
                      {isActive ? <Minus size={14} weight="light" /> : <Plus size={14} weight="light" />}
                    </span>
                  </div>

                  <div className="relative z-10 p-5 sm:p-7">
                    <h3 className="text-[clamp(1.25rem,2vw,1.75rem)] font-medium leading-[1.15] tracking-[-0.025em] text-[#F4F5F7]">
                      {item.title}
                    </h3>
                    <div
                      className={[
                        "overflow-hidden transition-[max-height,opacity,transform] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]",
                        isActive
                          ? "mt-3 max-h-40 opacity-100 translate-y-0"
                          : "max-h-0 opacity-0 translate-y-3",
                      ].join(" ")}
                    >
                      <p className="max-w-[38ch] text-[15px] leading-[1.6] text-[#C4CBD6]">
                        {item.summary}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
