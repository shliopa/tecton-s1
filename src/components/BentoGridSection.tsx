"use client";

import { useState, useRef, useEffect, type MouseEvent } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Waveform, SlidersHorizontal } from "@phosphor-icons/react";

type AcousticMode = "dipole" | "focus" | "hall";

const MODES: { id: AcousticMode; label: string; freq: number; amp: number; layers: number }[] = [
  { id: "dipole", label: "Диполь", freq: 0.017, amp: 24, layers: 4 },
  { id: "focus", label: "Фокус", freq: 0.028, amp: 16, layers: 3 },
  { id: "hall", label: "Зал", freq: 0.011, amp: 32, layers: 5 },
];

function AcousticFieldCanvas({ mode }: { mode: AcousticMode }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerRef = useRef({ x: 0.5, y: 0.5, active: false });
  const prefersReduced = useReducedMotion();

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    pointerRef.current = {
      x: (event.clientX - rect.left) / rect.width,
      y: (event.clientY - rect.top) / rect.height,
      active: true,
    };
  };

  const handleMouseLeave = () => {
    pointerRef.current.active = false;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const config = MODES.find((item) => item.id === mode) ?? MODES[0];
    let frameId = 0;
    let phase = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { clientWidth, clientHeight } = canvas;
      canvas.width = clientWidth * dpr;
      canvas.height = clientHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const render = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      ctx.clearRect(0, 0, width, height);

      const centerY = height * 0.52;
      const pointerBoost = pointerRef.current.active
        ? 1 + (0.5 - Math.abs(pointerRef.current.y - 0.5)) * 0.75
        : 1;
      const pointerShift = pointerRef.current.active ? (pointerRef.current.x - 0.5) * 2.2 : 0;

      for (let layer = 0; layer < config.layers; layer++) {
        const ratio = layer / Math.max(config.layers - 1, 1);
        ctx.beginPath();

        for (let x = 0; x <= width; x += 3) {
          const normX = x / width;
          const envelope = Math.sin(normX * Math.PI);
          const waveA = Math.sin(x * config.freq + phase * (1 + ratio * 0.45) + pointerShift);
          const waveB = Math.cos(x * config.freq * 0.48 - phase * 0.7 + layer * 1.1);
          const y =
            centerY +
            (waveA * 0.65 + waveB * 0.35) * config.amp * pointerBoost * envelope * (1 - ratio * 0.25);

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        ctx.strokeStyle =
          layer === 0
            ? "rgba(232, 74, 39, 0.92)"
            : `rgba(244, 245, 247, ${0.32 - ratio * 0.22})`;
        ctx.lineWidth = layer === 0 ? 1.8 : 1.1;
        ctx.stroke();
      }

      if (!prefersReduced) {
        phase += 0.032;
        frameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [mode, prefersReduced]);

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative h-40 w-full cursor-crosshair overflow-hidden rounded-2xl bg-[#08090C] ring-1 ring-white/[0.06]"
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}

export function BentoGridSection() {
  const [mode, setMode] = useState<AcousticMode>("dipole");
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="architecture"
      className="relative mx-auto w-full max-w-[1400px] px-4 py-28 sm:px-6 md:py-40 lg:px-10"
    >
      <motion.div
        initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mb-14 max-w-2xl"
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#E84A27] mb-4">
          Акустическая архитектура
        </p>
        <h2 className="text-[clamp(2rem,4vw,3.4rem)] font-medium leading-[1.08] tracking-[-0.035em] text-[#F4F5F7]">
          Инженерная точность в каждом миллиметре.
        </h2>
        <p className="mt-4 max-w-[54ch] text-[16px] leading-[1.6] text-[#98A0AD]">
          Четыре ключевых узла формируют единую монолитную структуру без видимого крепежа и
          акустических потерь.
        </p>
      </motion.div>

      {/* Gapless 12-column dense Bento Grid: 4 interlocking cells, 0 empty voids */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-12 md:grid-flow-dense">
        {/* Cell 1: Cols 1-7, Rows 1-2 */}
        <motion.article
          initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="bezel-outer group col-span-1 md:col-span-7 md:row-span-2"
        >
          <div className="bezel-inner relative flex h-full min-h-[420px] flex-col justify-end overflow-hidden md:min-h-[560px]">
            <img
              src="./images/detail-titanium.jpg"
              alt="Макросъёмка титановой решётки корпуса TECTON S1"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#07080A] via-[#07080A]/55 to-transparent"
            />
            <div className="relative z-10 p-7 sm:p-9">
              <h3 className="text-[clamp(1.5rem,2.4vw,2.15rem)] font-medium leading-[1.15] tracking-[-0.03em] text-[#F4F5F7]">
                Корпус из цельной плиты титана
              </h3>
              <p className="mt-3 max-w-[44ch] text-[15px] leading-[1.6] text-[#B7BECB]">
                Пятиосевая фрезеровка устраняет клеевые швы и пустоты, создавая абсолютно инертную
                опору для электростатического статора.
              </p>
            </div>
          </div>
        </motion.article>

        {/* Cell 2: Cols 8-12, Row 1 (Interactive Wavefield Visualizer) */}
        <motion.article
          initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.85, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="bezel-outer col-span-1 md:col-span-5 md:row-span-1"
        >
          <div className="bezel-inner flex h-full flex-col justify-between gap-5 p-6 sm:p-7">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 text-[#F4F5F7]">
                <Waveform size={20} weight="light" className="text-[#E84A27]" />
                <h3 className="text-[17px] font-medium tracking-[-0.02em]">
                  Контроль диаграммы
                </h3>
              </div>

              <div
                role="tablist"
                aria-label="Режим дисперсии звука"
                className="flex items-center rounded-full bg-[#07080A] p-1 ring-1 ring-white/[0.08]"
              >
                {MODES.map((item) => {
                  const active = mode === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setMode(item.id)}
                      className={[
                        "relative rounded-full px-3 py-1 text-[12px] font-medium whitespace-nowrap transition-colors duration-300",
                        active ? "text-[#07080A]" : "text-[#98A0AD] hover:text-[#F4F5F7]",
                      ].join(" ")}
                    >
                      {active && (
                        <motion.span
                          layoutId="dispersion-pill"
                          transition={{ type: "spring", stiffness: 360, damping: 30 }}
                          className="absolute inset-0 rounded-full bg-[#F4F5F7]"
                        />
                      )}
                      <span className="relative z-10">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <AcousticFieldCanvas mode={mode} />

            <p className="text-[14px] leading-[1.55] text-[#98A0AD]">
              Наведите курсор на поле волны или переключите пресет, чтобы оценить перестройку
              фазовой направленности.
            </p>
          </div>
        </motion.article>

        {/* Cell 3: Cols 8-12, Row 2 (Architectural Acoustic Metrics) */}
        <motion.article
          initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.85, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
          className="bezel-outer col-span-1 md:col-span-5 md:row-span-1"
        >
          <div className="bezel-inner relative flex h-full flex-col justify-between overflow-hidden p-6 sm:p-7">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-[#E84A27]/12 blur-3xl"
            />
            <div className="flex items-center gap-2.5 text-[#F4F5F7]">
              <SlidersHorizontal size={20} weight="light" className="text-[#E84A27]" />
              <h3 className="text-[17px] font-medium tracking-[-0.02em]">
                Фазовая линейность
              </h3>
            </div>

            <div className="my-6 grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-[#08090C] p-4 ring-1 ring-white/[0.06]">
                <div className="font-mono text-[clamp(1.4rem,2.4vw,2rem)] font-medium tracking-[-0.03em] text-[#F4F5F7]">
                  18 Гц
                </div>
                <div className="mt-1 text-[13px] text-[#98A0AD]">Нижняя граница баса</div>
              </div>
              <div className="rounded-2xl bg-[#08090C] p-4 ring-1 ring-white/[0.06]">
                <div className="font-mono text-[clamp(1.4rem,2.4vw,2rem)] font-medium tracking-[-0.03em] text-[#F4F5F7]">
                  42 кГц
                </div>
                <div className="mt-1 text-[13px] text-[#98A0AD]">Верхний предел сцены</div>
              </div>
            </div>

            <p className="text-[14px] leading-[1.55] text-[#98A0AD]">
              Активная калибровка компенсирует отражения стен и сохраняет точную локализацию
              инструментов.
            </p>
          </div>
        </motion.article>

        {/* Cell 4: Cols 1-12, Row 3 (Wide Graphene Membrane Architectural Banner) */}
        <motion.article
          initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="bezel-outer group col-span-1 md:col-span-12 md:row-span-1"
        >
          <div className="bezel-inner grid grid-cols-1 items-center overflow-hidden md:grid-cols-12">
            <div className="p-7 sm:p-10 md:col-span-5">
              <h3 className="text-[clamp(1.5rem,2.5vw,2.2rem)] font-medium leading-[1.15] tracking-[-0.03em] text-[#F4F5F7]">
                Графеновая мембрана легче воздуха
              </h3>
              <p className="mt-3 max-w-[42ch] text-[15px] leading-[1.6] text-[#98A0AD]">
                Мгновенный отклик без инерции диффузора передаёт тончайшую атаку струны, дыхание
                зала и паузы между нотами.
              </p>
            </div>
            <div className="relative h-64 overflow-hidden md:col-span-7 md:h-80">
              <img
                src="./images/acoustic-membrane.jpg"
                alt="Электростатическая графеновая мембрана в титановой раме"
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0E1014] via-transparent to-transparent hidden md:block"
              />
            </div>
          </div>
        </motion.article>
      </div>
    </section>
  );
}
