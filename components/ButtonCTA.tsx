"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonCTAProps {
  children: React.ReactNode;
  href?: string;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  variant?: "primary" | "outline";
}

export default function ButtonCTA({ children, href, className, variant = "primary", ...props }: ButtonCTAProps) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  // Primary: ink.surface bg, 1px bronze border, ivory text — on hover bronze text, border -> bronze.light
  // Outline: transparent bg, ivory text, bronze underline slides in on hover
  const primaryClasses = "relative overflow-hidden inline-flex items-center justify-center px-8 py-4 uppercase tracking-widest text-sm font-medium transition-all duration-300 bg-ink-surface border border-bronze text-ivory hover:text-bronze-light hover:border-bronze-light";
  const outlineClasses = "relative inline-flex items-center justify-center px-8 py-4 uppercase tracking-widest text-sm font-medium transition-all duration-300 text-ivory group";

  if (variant === "outline") {
    const outlineCombined = cn(outlineClasses, className);
    if (href) {
      return (
        <motion.a
          href={href}
          ref={ref as React.RefObject<HTMLAnchorElement>}
          onMouseMove={handleMouse}
          onMouseLeave={reset}
          animate={{ x: position.x, y: position.y }}
          transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
          className={outlineCombined}
        >
          <span className="relative">
            {children}
            <span className="absolute -bottom-0.5 left-0 h-px bg-bronze w-0 group-hover:w-full transition-all duration-300 origin-left" />
          </span>
        </motion.a>
      );
    }
    return (
      <motion.button
        ref={ref as React.RefObject<HTMLButtonElement>}
        onMouseMove={handleMouse}
        onMouseLeave={reset}
        animate={{ x: position.x, y: position.y }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        className={outlineCombined}
        {...props}
      >
        <span className="relative">
          {children}
          <span className="absolute -bottom-0.5 left-0 h-px bg-bronze w-0 group-hover:w-full transition-all duration-300 origin-left" />
        </span>
      </motion.button>
    );
  }

  const combinedClasses = cn(primaryClasses, className);

  if (href) {
    return (
      <motion.a
        href={href}
        ref={ref as React.RefObject<HTMLAnchorElement>}
        onMouseMove={handleMouse}
        onMouseLeave={reset}
        animate={{ x: position.x, y: position.y }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        className={combinedClasses}
      >
        <span className="relative z-10">{children}</span>
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={combinedClasses}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
