"use client";

import React from "react";
import { cn } from "@/app/lib/utils";
import { useTheme } from "@/app/components/ui/ThemeProvider";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "success";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const baseStyles =
    "inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return `bg-green-500 text-white hover:bg-green-600 focus:ring-green-500 ${
          isDark ? "hover:shadow-[0_0_25px_rgba(34,197,94,0.5)]" : ""
        }`;
      case "secondary":
        return isDark
          ? "bg-neutral-800 text-neutral-100 hover:bg-neutral-700 focus:ring-neutral-400"
          : "bg-neutral-100 text-neutral-900 hover:bg-neutral-200 focus:ring-neutral-400";
      case "outline":
        return isDark
          ? "border-2 border-neutral-600 text-neutral-300 hover:bg-neutral-800 focus:ring-neutral-400"
          : "border-2 border-neutral-300 text-neutral-700 hover:bg-neutral-50 focus:ring-neutral-400";
      case "ghost":
        return isDark
          ? "text-neutral-300 hover:bg-neutral-800 focus:ring-neutral-400"
          : "text-neutral-700 hover:bg-neutral-100 focus:ring-neutral-400";
      case "success":
        return `bg-green-500 text-white hover:bg-green-600 focus:ring-green-500 ${
          isDark ? "shadow-[0_0_20px_rgba(34,197,94,0.4)]" : ""
        }`;
      default:
        return "";
    }
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      className={cn(
        baseStyles,
        getVariantStyles(),
        sizes[size],
        isDark ? "focus:ring-offset-[#0a0a0a]" : "",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
