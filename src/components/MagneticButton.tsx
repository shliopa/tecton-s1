"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "@phosphor-icons/react";

interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
  showIcon?: boolean;
}

export function MagneticButton({
  children,
  href,
  onClick,
  variant = "primary",
  type = "button",
  disabled = false,
  className = "",
  showIcon = true,
}: MagneticButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.5 });

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (prefersReduced || disabled || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const offsetX = event.clientX - (rect.left + rect.width / 2);
    const offsetY = event.clientY - (rect.top + rect.height / 2);
    x.set(offsetX * 0.18);
    y.set(offsetY * 0.18);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const isPrimary = variant === "primary";

  const baseClasses = [
    "group relative inline-flex items-center justify-center gap-3.5 rounded-full font-medium whitespace-nowrap select-none",
    "transition-[background-color,border-color,transform] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
    "active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed",
    showIcon ? "pl-6 pr-2 py-2" : "px-6 py-3.5",
    isPrimary
      ? "bg-[#F4F5F7] text-[#07080A] hover:bg-white shadow-[0_12px_36px_rgba(244,245,247,0.12)]"
      : "bg-white/[0.04] text-[#F4F5F7] border border-white/15 hover:bg-white/[0.09] hover:border-white/30",
    className,
  ].join(" ");

  const innerContent = (
    <>
      <span className="text-[14px] tracking-[-0.01em] font-semibold">{children}</span>
      {showIcon && (
        <span
          aria-hidden="true"
          className={[
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
            "transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
            "group-hover:scale-105",
            isPrimary
              ? "bg-[#E84A27] text-[#07080A]"
              : "bg-white/10 text-[#F4F5F7]",
          ].join(" ")}
        >
          <ArrowUpRight
            size={16}
            weight="light"
            className="transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span>
      )}
    </>
  );

  return (
    <motion.div
      ref={containerRef}
      style={prefersReduced ? undefined : { x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      {href ? (
        <a href={href} onClick={onClick} className={baseClasses}>
          {innerContent}
        </a>
      ) : (
        <button
          type={type}
          onClick={onClick}
          disabled={disabled}
          className={baseClasses}
        >
          {innerContent}
        </button>
      )}
    </motion.div>
  );
}
