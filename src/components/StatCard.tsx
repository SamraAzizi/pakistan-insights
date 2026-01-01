import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  icon?: React.ReactNode;
  trend?: { value: number; isPositive: boolean };
  delay?: number;
  className?: string;
}

export const StatCard = ({
  value,
  label,
  suffix = "",
  prefix = "",
  decimals = 0,
  icon,
  trend,
  delay = 0,
  className,
}: StatCardProps) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      // Animate the number
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;
      const interval = setInterval(() => {
        current += increment;
        if (current >= value) {
          setDisplayValue(value);
          clearInterval(interval);
        } else {
          setDisplayValue(current);
        }
      }, duration / steps);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return (
    <div
      className={cn(
        "relative p-6 rounded-xl bg-card border border-border shadow-card transition-all duration-500",
        "hover:shadow-elevated hover:border-primary/20 hover:-translate-y-1",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
        className
      )}
    >
      {/* Icon */}
      {icon && (
        <div className="absolute top-4 right-4 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
          {icon}
        </div>
      )}

      {/* Value */}
      <div className="mb-2">
        <span className="text-4xl md:text-5xl font-display font-bold text-foreground">
          {prefix}
          {displayValue.toFixed(decimals)}
          {suffix}
        </span>
      </div>

      {/* Label */}
      <p className="text-muted-foreground font-medium">{label}</p>

      {/* Trend */}
      {trend && (
        <div
          className={cn(
            "mt-3 inline-flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-full",
            trend.isPositive
              ? "bg-primary/10 text-primary"
              : "bg-destructive/10 text-destructive"
          )}
        >
          <span>{trend.isPositive ? "↑" : "↓"}</span>
          <span>{Math.abs(trend.value)}%</span>
          <span className="text-muted-foreground ml-1">vs last year</span>
        </div>
      )}
    </div>
  );
};
