import React from "react";

interface DisabledCardProps {
  children: React.ReactNode;
}

export function DisabledCard({ children }: DisabledCardProps) {
  return (
    <div className="relative">
      {/* Grayscale filter on content */}
      <div className="grayscale opacity-50 pointer-events-none select-none">
        {children}
      </div>

      {/* Comingsoon overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-neutral-900/5 dark:bg-black/50 rounded-2xl">
        <span className="text-xl md:text-2xl font-semibold text-neutral-500 dark:text-neutral-500 italic tracking-wide">
          Comingsoon
        </span>
      </div>
    </div>
  );
}
