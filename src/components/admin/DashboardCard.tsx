import React from "react";
import { cn } from "@/lib/utils";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface DashboardCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  trend?: { value: string; positive: boolean };
  className?: string;
}

export function DashboardCard({
  icon: Icon,
  label,
  value,
  trend,
  className,
}: DashboardCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-stone/20 bg-white p-6 shadow-sm",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-stone">{label}</p>
          <p className="mt-1 text-3xl font-bold text-charcoal">{value}</p>
        </div>
        <div className="rounded-lg bg-sage/10 p-2.5">
          <Icon className="h-5 w-5 text-pine" />
        </div>
      </div>
      {trend && (
        <div className="mt-3 flex items-center gap-1 text-sm">
          {trend.positive ? (
            <TrendingUp className="h-4 w-4 text-green-600" />
          ) : (
            <TrendingDown className="h-4 w-4 text-red-500" />
          )}
          <span
            className={cn(
              trend.positive ? "text-green-600" : "text-red-500"
            )}
          >
            {trend.value}
          </span>
        </div>
      )}
    </div>
  );
}
