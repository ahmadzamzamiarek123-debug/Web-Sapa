"use client";

import React from "react";
import { cn } from "@/app/lib/utils";
import { useTheme } from "@/app/components/ui/ThemeProvider";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className, id, ...props }: InputProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="space-y-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className={`block text-sm font-medium ${
            isDark ? "text-neutral-300" : "text-neutral-700"
          }`}
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          "w-full px-4 py-2.5 rounded-xl border transition-all duration-300",
          isDark
            ? "bg-[#111111] border-neutral-700 text-white placeholder:text-neutral-500"
            : "bg-white border-neutral-300 text-neutral-900 placeholder:text-neutral-400",
          "focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500",
          error && "border-red-500 focus:ring-red-500",
          className
        )}
        {...props}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
  error?: string;
}

export function Select({
  label,
  options,
  error,
  className,
  id,
  ...props
}: SelectProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const selectId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="space-y-1.5">
      {label && (
        <label
          htmlFor={selectId}
          className={`block text-sm font-medium ${
            isDark ? "text-neutral-300" : "text-neutral-700"
          }`}
        >
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={cn(
          "w-full px-4 py-2.5 rounded-xl border transition-all duration-300",
          isDark
            ? "bg-[#111111] border-neutral-700 text-white"
            : "bg-white border-neutral-300 text-neutral-900",
          "focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500",
          error && "border-red-500 focus:ring-red-500",
          className
        )}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function Textarea({
  label,
  error,
  className,
  id,
  ...props
}: TextareaProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const textareaId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="space-y-1.5">
      {label && (
        <label
          htmlFor={textareaId}
          className={`block text-sm font-medium ${
            isDark ? "text-neutral-300" : "text-neutral-700"
          }`}
        >
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        className={cn(
          "w-full px-4 py-2.5 rounded-xl border transition-all duration-300 resize-none",
          isDark
            ? "bg-[#111111] border-neutral-700 text-white placeholder:text-neutral-500"
            : "bg-white border-neutral-300 text-neutral-900 placeholder:text-neutral-400",
          "focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500",
          error && "border-red-500 focus:ring-red-500",
          className
        )}
        {...props}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
