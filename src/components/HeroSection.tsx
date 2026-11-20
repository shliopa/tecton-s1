"use client";

import { useRef, useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticButton } from "./MagneticButton";

gsap.registerPlugin(ScrollTrigger);

const HERO_LINES = ["Тишина, отлитая", "в титане."];

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced || !sectionRef.current || !mediaRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(mediaRef.current, {
        yPercent: 8,
        scale: 1.04,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReduced]);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative flex min-h-[100dvh] w-full items-center pt-20 pb-12 md:pt-24 md:pb-16 overflow-hidden"
    >
      <div aria-hidden="true" className="ambient-cold-mesh pointer-events-none absolute inset-0" />

      <div className="relative mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-10">
        {/* Left asymmetric editorial typography column */}
        <div className="lg:col-span-6 flex flex-col items-start">
          <h1 className="max-w-5xl text-[clamp(2.85rem,5.4vw,5.1rem)] font-medium leading-[1.06] tracking-[-0.045em] text-[#F4F5F7]">
            {HERO_LINES.map((line, idx) => (
              <span key={line} className="block overflow-hidden pb-1">
                <motion.span
                  className="block"
                  initial={prefersReduced ? { opacity: 0 } : { y: "108%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{
                    duration: 0.95,
                    delay: prefersReduced ? 0 : 0.1 + idx * 0.11,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={prefersReduced ? { opacity: 0 } : { y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.85,
              delay: prefersReduced ? 0 : 0.34,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mt-6 max-w-[44ch] text-[17px] leading-[1.6] text-[#98A0AD] md:text-[18px]"
          >
            Электростатический монолит TECTON S1 воспроизводит живую акустическую сцену без
            корпусных искажений и окрашивания тембра.
          </motion.p>

          <motion.div
            initial={prefersReduced ? { opacity: 0 } : { y: 22, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.85,
              delay: prefersReduced ? 0 : 0.46,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <MagneticButton href="#reserve" variant="primary">
              Оформить предзаказ
            </MagneticButton>
            <MagneticButton href="#architecture" variant="secondary" showIcon={false}>
              Изучить систему
            </MagneticButton>
          </motion.div>
        </div>

        {/* Right sculptural hardware stage inside Double-Bezel housing */}
        <motion.div
          initial={prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 1.15,
            delay: prefersReduced ? 0 : 0.18,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="lg:col-span-6 w-full"
        >
          <div className="bezel-outer">
            <div className="bezel-inner relative aspect-[16/11] w-full overflow-hidden lg:aspect-[5/4]">
              <div ref={mediaRef} className="h-full w-full will-change-transform">
                <img
                  src="./images/hero-monolith.jpg"
                  alt="Акустический монолит TECTON S1 из фрезерованного титана и обсидианового стекла"
                  className="h-full w-full object-cover object-center contrast-[1.04]"
                  fetchPriority="high"
                />
              </div>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#07080A]/65 via-transparent to-[#07080A]/15"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
