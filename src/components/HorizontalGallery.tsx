"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "motion/react";

gsap.registerPlugin(ScrollTrigger);

const CHAPTERS = [
  {
    title: "Скульптурный монолит",
    description:
      "Вертикальный силуэт растворяется в современном интерьере, превращая акустическую систему в предмет архитектуры.",
    image: "./images/hero-monolith.jpg",
    alt: "Акустический монолит TECTON S1 в тёмной студии",
  },
  {
    title: "Микроперфорация титана",
    description:
      "Геометрия акустических прорезей рассчитана на минимизацию дифракции и равномерное излучение по всей высоте панели.",
    image: "./images/detail-titanium.jpg",
    alt: "Крупный план титановой акустической решётки",
  },
  {
    title: "Тактильный контроллер",
    description:
      "Беспроводной регулятор из цельного титана и сапфирового стекла работает на магнитных подшипниках с шагом в половину децибела.",
    image: "./images/detail-dial.jpg",
    alt: "Титановый тактильный контроллер громкости на базальтовой поверхности",
  },
  {
    title: "Электростатическое поле",
    description:
      "Натяжение графеновой плёнки контролируется лазером на производстве, гарантируя идентичную отдачу обеих колонн пары.",
    image: "./images/acoustic-membrane.jpg",
    alt: "Тончайшая графеновая электростатическая мембрана",
  },
];

export function HorizontalGallery() {
  const wrapRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced || !wrapRef.current || !trackRef.current) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const track = trackRef.current;
      const wrap = wrapRef.current;
      if (!track || !wrap) return;

      const getDistance = () => Math.max(0, track.scrollWidth - window.innerWidth + 80);

      const horizontalTween = gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: wrap,
          start: "top top",
          end: () => `+=${getDistance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      if (progressRef.current) {
        gsap.fromTo(
          progressRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: wrap,
              start: "top top",
              end: () => `+=${getDistance()}`,
              scrub: 0.4,
              invalidateOnRefresh: true,
            },
          }
        );
      }

      const frames = gsap.utils.toArray<HTMLElement>(".h-slide-img");
      frames.forEach((img) => {
        gsap.fromTo(
          img,
          { scale: 0.9 },
          {
            scale: 1.04,
            ease: "none",
            scrollTrigger: {
              trigger: img,
              containerAnimation: horizontalTween,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          }
        );
      });
    });

    return () => mm.revert();
  }, [prefersReduced]);

  return (
    <section
      id="engineering"
      ref={wrapRef}
      className="relative w-full overflow-hidden py-24 md:flex md:min-h-[100dvh] md:flex-col md:justify-center md:py-16"
    >
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 md:pt-8 md:pb-8 lg:px-10">
        <h2 className="text-[clamp(2rem,4vw,3.4rem)] font-medium leading-[1.08] tracking-[-0.035em] text-[#F4F5F7]">
          Четыре главы инженерии.
        </h2>
        <p className="mt-3 max-w-[52ch] text-[16px] leading-[1.6] text-[#98A0AD]">
          От цельной титановой рамы до магнитного регулятора на базальтовом столе.
        </p>
      </div>

      {/* Desktop horizontal track pinned via GSAP; clean vertical stack on < 768px */}
      <div
        ref={trackRef}
        className="mt-10 flex flex-col gap-8 px-4 sm:px-6 md:mt-0 md:flex-row md:items-center md:gap-8 md:px-10 md:w-max will-change-transform"
      >
        {CHAPTERS.map((chapter) => (
          <article
            key={chapter.title}
            className="bezel-outer group w-full md:w-[min(74vw,860px)] shrink-0"
          >
            <div className="bezel-inner grid grid-cols-1 overflow-hidden md:grid-cols-12">
              <div className="relative aspect-[16/10] overflow-hidden md:col-span-7 md:aspect-auto md:h-[clamp(320px,48dvh,440px)]">
                <img
                  src={chapter.image}
                  alt={chapter.alt}
                  loading="lazy"
                  className="h-slide-img h-full w-full object-cover will-change-transform"
                />
              </div>
              <div className="flex flex-col justify-end p-7 md:col-span-5 md:p-9">
                <h3 className="text-[clamp(1.4rem,2.2vw,1.95rem)] font-medium leading-[1.16] tracking-[-0.03em] text-[#F4F5F7]">
                  {chapter.title}
                </h3>
                <p className="mt-4 text-[15px] leading-[1.65] text-[#98A0AD]">
                  {chapter.description}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Minimal scrubbed travel indicator on desktop */}
      <div
        aria-hidden="true"
        className="mx-auto mt-8 hidden w-full max-w-[1400px] px-10 md:block"
      >
        <div className="h-[1px] w-full bg-white/10 overflow-hidden">
          <div
            ref={progressRef}
            className="h-full w-full origin-left bg-[#E84A27] scale-x-0 will-change-transform"
          />
        </div>
      </div>
    </section>
  );
}
