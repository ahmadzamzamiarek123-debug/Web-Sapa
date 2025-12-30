"use client";

import React from "react";
import { cn } from "@/app/lib/utils";
import { useTheme } from "@/app/components/ui/ThemeProvider";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  large?: boolean;
  hover?: boolean;
}

export function Card({
  children,
  className,
  large = false,
  hover = true,
}: CardProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      className={cn(
        "rounded-2xl border p-6 shadow-sm transition-all duration-300",
        isDark
          ? "bg-[#0a0a0a] border-green-900/20"
          : "bg-white border-neutral-200",
        hover &&
          (isDark
            ? "hover:border-green-500/30 hover:shadow-[0_0_30px_rgba(34,197,94,0.15)]"
            : "hover:shadow-md hover:-translate-y-0.5"),
        large && "lg:col-span-2",
        className
      )}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function CardHeader({ children, className }: CardHeaderProps) {
  return <div className={cn("mb-4", className)}>{children}</div>;
}

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

export function CardTitle({ children, className, icon }: CardTitleProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <h3
      className={cn(
        "text-lg font-semibold flex items-center gap-2",
        isDark ? "text-white" : "text-neutral-900",
        className
      )}
    >
      {icon}
      {children}
    </h3>
  );
}

interface CardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export function CardDescription({ children, className }: CardDescriptionProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <p
      className={cn(
        "text-sm mt-1",
        isDark ? "text-neutral-400" : "text-neutral-500",
        className
      )}
    >
      {children}
    </p>
  );
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export function CardContent({ children, className }: CardContentProps) {
  return <div className={cn("", className)}>{children}</div>;
}
