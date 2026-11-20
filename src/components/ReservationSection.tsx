"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Check, WarningCircle } from "@phosphor-icons/react";
import { MagneticButton } from "./MagneticButton";

interface FormValues {
  name: string;
  email: string;
  finish: string;
}

interface FormErrors {
  name?: string;
  email?: string;
}

const FINISH_OPTIONS = [
  "Обсидиановый титан",
  "Сатинированный графит",
  "Индивидуальная отделка",
];

export function ReservationSection() {
  const [values, setValues] = useState<FormValues>({
    name: "",
    email: "",
    finish: FINISH_OPTIONS[0],
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [reservationCode, setReservationCode] = useState("");
  const prefersReduced = useReducedMotion();

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};
    if (values.name.trim().length < 2) {
      nextErrors.name = "Укажите ваше имя для именного приглашения.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      nextErrors.email = "Введите корректный адрес электронной почты.";
    }
    return nextErrors;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");
    window.setTimeout(() => {
      const code = `TC-${Math.floor(1000 + Math.random() * 9000)}`;
      setReservationCode(code);
      setStatus("success");
    }, 850);
  };

  const handleReset = () => {
    setValues({ name: "", email: "", finish: FINISH_OPTIONS[0] });
    setErrors({});
    setStatus("idle");
  };

  return (
    <section
      id="reserve"
      className="relative mx-auto w-full max-w-[1400px] px-4 pt-24 pb-16 sm:px-6 md:pt-36 md:pb-20 lg:px-10"
    >
      <div className="bezel-outer">
        <div className="bezel-inner relative overflow-hidden p-7 sm:p-12 lg:p-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#E84A27]/10 blur-3xl"
          />

          <div className="relative z-10 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-6">
              <h2 className="text-[clamp(2.1rem,4.4vw,3.75rem)] font-medium leading-[1.06] tracking-[-0.04em] text-[#F4F5F7]">
                Услышьте TECTON S1 вживую.
              </h2>
              <p className="mt-5 max-w-[44ch] text-[16px] leading-[1.65] text-[#98A0AD]">
                Каждая пара собирается вручную ограниченной серией. Оставьте контакты для
                персонального прослушивания и закрепления слота в производстве.
              </p>

              <dl className="mt-10 grid grid-cols-1 gap-6 border-t border-white/[0.08] pt-8 sm:grid-cols-2">
                <div>
                  <dt className="text-[13px] text-[#98A0AD]">Срок сборки пары</dt>
                  <dd className="mt-1 text-[17px] font-medium text-[#F4F5F7]">12 недель</dd>
                </div>
                <div>
                  <dt className="text-[13px] text-[#98A0AD]">Гарантия на статор</dt>
                  <dd className="mt-1 text-[17px] font-medium text-[#F4F5F7]">10 лет</dd>
                </div>
              </dl>
            </div>

            <div className="lg:col-span-6">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                    className="rounded-2xl bg-[#08090C] p-8 ring-1 ring-white/12"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E84A27] text-[#07080A]">
                      <Check size={22} weight="bold" />
                    </div>
                    <h3 className="mt-6 text-2xl font-medium tracking-[-0.025em] text-[#F4F5F7]">
                      Заявка подтверждена
                    </h3>
                    <p className="mt-3 text-[15px] leading-[1.6] text-[#98A0AD]">
                      Инженер-акустик свяжется с вами по адресу {values.email}, чтобы согласовать
                      время закрытого прослушивания.
                    </p>
                    <div className="mt-6 rounded-2xl bg-white/[0.03] px-4 py-3 font-mono text-[13px] text-[#F4F5F7] ring-1 ring-white/[0.08]">
                      Номер бронирования: {reservationCode}
                    </div>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="mt-6 text-[14px] font-medium text-[#E84A27] transition-opacity hover:opacity-80"
                    >
                      Отправить ещё одну заявку
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    noValidate
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col gap-5 rounded-2xl bg-[#08090C] p-6 ring-1 ring-white/[0.08] sm:p-8"
                  >
                    <div className="flex flex-col gap-2">
                      <label htmlFor="res-name" className="text-[13px] font-medium text-[#D6DCE6]">
                        Ваше имя
                      </label>
                      <input
                        id="res-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        value={values.name}
                        onChange={(e) => {
                          setValues((prev) => ({ ...prev, name: e.target.value }));
                          if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                        }}
                        placeholder="Александр Волков"
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? "res-name-error" : "res-name-help"}
                        className={[
                          "h-12 w-full rounded-2xl bg-[#11141B] px-4 text-[15px] text-[#F4F5F7] placeholder:text-[#7A8291]",
                          "border transition-colors duration-300 focus:outline-none",
                          errors.name
                            ? "border-[#E84A27]"
                            : "border-white/15 focus:border-[#E84A27]",
                        ].join(" ")}
                      />
                      {errors.name ? (
                        <p
                          id="res-name-error"
                          role="alert"
                          className="flex items-center gap-1.5 text-[13px] text-[#FF7A5C]"
                        >
                          <WarningCircle size={15} weight="light" />
                          <span>{errors.name}</span>
                        </p>
                      ) : (
                        <p id="res-name-help" className="text-[12px] text-[#8E95A2]">
                          Используется для именного пропуска в комнату прослушивания.
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="res-email" className="text-[13px] font-medium text-[#D6DCE6]">
                        Электронная почта
                      </label>
                      <input
                        id="res-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={values.email}
                        onChange={(e) => {
                          setValues((prev) => ({ ...prev, email: e.target.value }));
                          if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                        }}
                        placeholder="volkov@studio.ru"
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? "res-email-error" : "res-email-help"}
                        className={[
                          "h-12 w-full rounded-2xl bg-[#11141B] px-4 text-[15px] text-[#F4F5F7] placeholder:text-[#7A8291]",
                          "border transition-colors duration-300 focus:outline-none",
                          errors.email
                            ? "border-[#E84A27]"
                            : "border-white/15 focus:border-[#E84A27]",
                        ].join(" ")}
                      />
                      {errors.email ? (
                        <p
                          id="res-email-error"
                          role="alert"
                          className="flex items-center gap-1.5 text-[13px] text-[#FF7A5C]"
                        >
                          <WarningCircle size={15} weight="light" />
                          <span>{errors.email}</span>
                        </p>
                      ) : (
                        <p id="res-email-help" className="text-[12px] text-[#8E95A2]">
                          Направим спецификацию и свободные даты визита.
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="res-finish" className="text-[13px] font-medium text-[#D6DCE6]">
                        Отделка корпуса
                      </label>
                      <select
                        id="res-finish"
                        name="finish"
                        value={values.finish}
                        onChange={(e) =>
                          setValues((prev) => ({ ...prev, finish: e.target.value }))
                        }
                        className="h-12 w-full rounded-2xl border border-white/15 bg-[#11141B] px-4 text-[15px] text-[#F4F5F7] transition-colors duration-300 focus:border-[#E84A27] focus:outline-none"
                      >
                        {FINISH_OPTIONS.map((option) => (
                          <option key={option} value={option} className="bg-[#11141B] text-[#F4F5F7]">
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="pt-2">
                      <MagneticButton
                        type="submit"
                        variant="primary"
                        disabled={status === "submitting"}
                        className="w-full justify-between sm:w-auto"
                      >
                        {status === "submitting" ? "Подготовка приглашения..." : "Оформить предзаказ"}
                      </MagneticButton>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Minimalist architectural footer */}
      <footer className="mt-20 flex flex-col gap-8 border-t border-white/[0.08] pt-10 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3 text-[13px] tracking-[0.16em] text-[#F4F5F7] uppercase">
          <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <rect x="2" y="2" width="14" height="14" rx="3" stroke="#F4F5F7" strokeWidth="1.35" />
            <line x1="9" y1="2" x2="9" y2="16" stroke="#E84A27" strokeWidth="1.35" />
          </svg>
          <span>TECTON AUDIO</span>
        </div>

        <nav aria-label="Навигация в подвале" className="flex flex-wrap items-center gap-6">
          <a href="#architecture" className="text-[13px] text-[#98A0AD] transition-colors hover:text-[#F4F5F7]">
            Архитектура
          </a>
          <a href="#engineering" className="text-[13px] text-[#98A0AD] transition-colors hover:text-[#F4F5F7]">
            Инженерия
          </a>
          <a href="#anatomy" className="text-[13px] text-[#98A0AD] transition-colors hover:text-[#F4F5F7]">
            Анатомия
          </a>
          <a href="#spaces" className="text-[13px] text-[#98A0AD] transition-colors hover:text-[#F4F5F7]">
            Пространства
          </a>
        </nav>

        <p className="text-[13px] text-[#7A8291]">
          © {new Date().getFullYear()} TECTON. Все права защищены.
        </p>
      </footer>
    </section>
  );
}
