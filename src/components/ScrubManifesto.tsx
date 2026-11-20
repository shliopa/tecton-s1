"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "motion/react";

gsap.registerPlugin(ScrollTrigger);

const PART_ONE = ["Мы", "убрали", "всё,", "что", "мешает", "воздуху", "звучать.", "Цельный", "титановый", "корпус"];
const PART_TWO = ["гасит", "резонансы", "на", "уровне", "материала,", "оставляя", "в", "комнате", "только", "чистую", "физику", "волны."];

export function ScrubManifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tokens = gsap.utils.toArray<HTMLElement>(".scrub-token");
      gsap.fromTo(
        tokens,
        { opacity: 0.14 },
        {
          opacity: 1,
          stagger: 0.08,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 72%",
            end: "bottom 58%",
            scrub: 0.6,
          },
        }
      );

      gsap.fromTo(
        ".manifesto-pill",
        { scale: 0.84, opacity: 0.25 },
        {
          scale: 1,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 68%",
            end: "center 52%",
            scrub: 0.6,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReduced]);

  return (
    <section
      ref={sectionRef}
      className="relative mx-auto w-full max-w-[1400px] px-4 py-28 sm:px-6 md:py-44 lg:px-10"
    >
      <div className="max-w-5xl">
        <p className="text-[clamp(1.85rem,4.1vw,3.85rem)] font-medium leading-[1.18] tracking-[-0.035em] text-[#F4F5F7]">
          {PART_ONE.map((word, index) => (
            <span
              key={`p1-${index}`}
              className="scrub-token inline-block mr-[0.28em] will-change-[opacity]"
            >
              {word}
            </span>
          ))}
          <span className="manifesto-pill inline-flex align-middle mx-1.5 my-1 h-[0.82em] w-[2.1em] overflow-hidden rounded-full ring-1 ring-white/15 will-change-transform">
            <img
              src="./images/detail-titanium.jpg"
              alt="Фрагмент фрезерованной титановой решётки TECTON S1"
              className="h-full w-full object-cover scale-110"
              loading="lazy"
            />
          </span>{" "}
          {PART_TWO.map((word, index) => (
            <span
              key={`p2-${index}`}
              className="scrub-token inline-block mr-[0.28em] will-change-[opacity]"
            >
              {word}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
