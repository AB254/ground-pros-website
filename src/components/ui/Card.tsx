import React from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  className?: string;
  noPadding?: boolean;
}

export function Card({ children, header, className, noPadding }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-stone/20 bg-white shadow-sm",
        className
      )}
    >
      {header && (
        <div className="border-b border-stone/20 px-6 py-4">{header}</div>
      )}
      <div className={cn(!noPadding && "p-6")}>{children}</div>
    </div>
  );
}
