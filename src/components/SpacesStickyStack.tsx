"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "motion/react";

gsap.registerPlugin(ScrollTrigger);

const SPACES = [
  {
    title: "Частные апартаменты",
    description:
      "Двуполярная направленность равномерно наполняет гостиную с панорамным остеклением, не требуя громоздких акустических ловушек.",
    spec: "Площадь от 35 до 140 кв. м",
    image: "./images/space-gallery.jpg",
    alt: "Минималистичная гостиная с парой систем TECTON S1 у панорамного окна",
  },
  {
    title: "Студия мастеринга",
    description:
      "Независимая фазовая калибровка каналов позволяет слышать микродинамику, реверберационные хвосты и тембр инструментов без прикрас.",
    spec: "Режим ближнего и среднего поля",
    image: "./images/hero-monolith.jpg",
    alt: "Флагманская система TECTON S1 в акустической студии",
  },
  {
    title: "Архитектурная галерея",
    description:
      "Монолитный силуэт с матовым титановым покрытием поддерживает строгую геометрию камня, бетона и тёмного дерева.",
    spec: "Индивидуальная настройка под зал",
    image: "./images/detail-dial.jpg",
    alt: "Тактильный контроллер TECTON S1 на тёмном базальте",
  },
];

export function SpacesStickyStack() {
  const stackRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced || !stackRef.current) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const ctx = gsap.context(() => {
        const cardEls = gsap.utils.toArray<HTMLElement>(".stack-card");
        cardEls.forEach((card, i) => {
          if (i === cardEls.length - 1) return;

          ScrollTrigger.create({
            trigger: card,
            start: "top top",
            endTrigger: cardEls[cardEls.length - 1],
            end: "top top",
            pin: true,
            pinSpacing: false,
          });

          gsap.to(card, {
            scale: 0.92,
            opacity: 0.55,
            ease: "none",
            scrollTrigger: {
              trigger: cardEls[i + 1],
              start: "top bottom",
              end: "top top",
              scrub: true,
            },
          });
        });
      }, stackRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, [prefersReduced]);

  return (
    <section id="spaces" className="relative w-full py-28 md:py-36">
      <div className="mx-auto mb-14 w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#E84A27] mb-4">
          Сценарии интеграции
        </p>
        <h2 className="max-w-3xl text-[clamp(2rem,4vw,3.4rem)] font-medium leading-[1.08] tracking-[-0.035em] text-[#F4F5F7]">
          Создана для тихих пространств.
        </h2>
        <p className="mt-4 max-w-[52ch] text-[16px] leading-[1.6] text-[#98A0AD]">
          Инженеры TECTON проектируют акустическую сцену вместе с вашим архитектором ещё до
          установки системы.
        </p>
      </div>

      {/* Canonical GSAP Sticky-Stack on desktop; standard vertical stack below 768px */}
      <div ref={stackRef} className="relative isolate mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col gap-6 md:gap-0">
          {SPACES.map((space, index) => (
            <div
              key={space.title}
              style={{ zIndex: index + 1 }}
              className="stack-card relative flex w-full items-center justify-center md:min-h-[100dvh] md:py-10 will-change-transform"
            >
              <article className="bezel-outer w-full">
                <div className="bezel-inner grid grid-cols-1 overflow-hidden md:grid-cols-12">
                  <div className="relative aspect-[16/10] overflow-hidden md:col-span-7 md:aspect-auto md:min-h-[clamp(340px,54dvh,500px)]">
                    <img
                      src={space.image}
                      alt={space.alt}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-between p-7 sm:p-10 md:col-span-5">
                    <span className="font-mono text-[12px] tracking-[0.12em] text-[#98A0AD]">
                      {space.spec}
                    </span>
                    <div className="mt-10 md:mt-0">
                      <h3 className="text-[clamp(1.55rem,2.6vw,2.35rem)] font-medium leading-[1.12] tracking-[-0.03em] text-[#F4F5F7]">
                        {space.title}
                      </h3>
                      <p className="mt-4 text-[15px] leading-[1.65] text-[#98A0AD]">
                        {space.description}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
