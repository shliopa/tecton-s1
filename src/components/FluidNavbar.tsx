"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "@phosphor-icons/react";

const NAV_LINKS = [
  { label: "Архитектура", href: "#architecture" },
  { label: "Инженерия", href: "#engineering" },
  { label: "Анатомия", href: "#anatomy" },
  { label: "Пространства", href: "#spaces" },
];

export function FluidNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-5 pointer-events-none">
        <nav
          aria-label="Основная навигация"
          className="nav-glass-approx pointer-events-auto flex h-14 items-center gap-6 rounded-full pl-5 pr-2"
        >
          <a
            href="#top"
            className="flex items-center gap-2.5 text-[14px] font-semibold tracking-[0.16em] text-[#F4F5F7] uppercase whitespace-nowrap"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              aria-hidden="true"
              className="shrink-0"
            >
              <rect x="2" y="2" width="14" height="14" rx="3" stroke="#F4F5F7" strokeWidth="1.35" />
              <line x1="9" y1="2" x2="9" y2="16" stroke="#E84A27" strokeWidth="1.35" />
            </svg>
            <span>TECTON</span>
          </a>

          <ul className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="rounded-full px-3.5 py-2 text-[13px] font-medium text-[#B0B7C3] whitespace-nowrap transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-[#F4F5F7] hover:bg-white/[0.06]"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href="#reserve"
              className="group hidden sm:inline-flex items-center gap-2.5 rounded-full bg-[#F4F5F7] pl-4 pr-1.5 py-1.5 text-[13px] font-semibold text-[#07080A] whitespace-nowrap transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] hover:bg-white"
            >
              <span>Оформить предзаказ</span>
              <span
                aria-hidden="true"
                className="flex h-7 w-7 items-center justify-center rounded-full bg-[#E84A27] text-[#07080A] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105"
              >
                <ArrowUpRight
                  size={14}
                  weight="light"
                  className="transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-expanded={menuOpen}
              aria-controls="fullscreen-nav-menu"
              aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
              className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.07] text-[#F4F5F7] transition-colors duration-300 hover:bg-white/[0.14] md:hidden"
            >
              <span
                className={[
                  "absolute h-[1.5px] w-4 bg-current transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
                  menuOpen ? "translate-y-0 rotate-45" : "-translate-y-[3.5px] rotate-0",
                ].join(" ")}
              />
              <span
                className={[
                  "absolute h-[1.5px] w-4 bg-current transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
                  menuOpen ? "translate-y-0 -rotate-45" : "translate-y-[3.5px] rotate-0",
                ].join(" ")}
              />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="fullscreen-nav-menu"
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-[#07080A]/92 px-6 backdrop-blur-3xl"
          >
            <div className="mx-auto w-full max-w-xl">
              <ul className="flex flex-col gap-5">
                {[...NAV_LINKS, { label: "Оформить предзаказ", href: "#reserve" }].map(
                  (item, index) => (
                    <li key={item.href} className="overflow-hidden">
                      <motion.a
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        initial={prefersReduced ? { opacity: 0 } : { y: 48, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={prefersReduced ? { opacity: 0 } : { y: 24, opacity: 0 }}
                        transition={{
                          duration: 0.55,
                          delay: prefersReduced ? 0 : 0.06 + index * 0.06,
                          ease: [0.32, 0.72, 0, 1],
                        }}
                        className="flex items-center justify-between py-2 text-3xl font-medium tracking-[-0.03em] text-[#F4F5F7] transition-colors duration-300 hover:text-[#E84A27]"
                      >
                        <span>{item.label}</span>
                        <ArrowUpRight size={24} weight="light" className="text-[#98A0AD]" />
                      </motion.a>
                    </li>
                  )
                )}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
