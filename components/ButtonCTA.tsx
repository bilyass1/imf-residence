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

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      {/* Gold fill sweep on hover */}
      <div className="absolute inset-0 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out z-0" />
    </>
  );

  const combinedClasses = cn(
    "relative overflow-hidden inline-flex items-center justify-center px-8 py-4 uppercase tracking-widest text-sm font-medium group transition-colors duration-300",
    variant === "primary"
      ? "border border-accent text-accent hover:text-background"
      : "border border-accent/40 text-foreground/70 hover:text-background hover:border-accent",
    className
  );

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
        {content}
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
      {content}
    </motion.button>
  );
}
