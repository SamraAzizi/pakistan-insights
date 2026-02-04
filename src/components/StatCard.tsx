import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

interface StatCardProps {
  value: number;
  label: string;
  labelKey?: string;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  icon?: React.ReactNode;
  trend?: { value: number; isPositive: boolean };
  delay?: number;
  index?: number;
  className?: string;
}

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.95,
  },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
      delay: index * 0.1,
    },
  }),
};

export const StatCard = ({
  value,
  label,
  labelKey,
  suffix = "",
  prefix = "",
  decimals = 0,
  icon,
  trend,
  delay = 0,
  index = 0,
  className,
}: StatCardProps) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const { t, isUrdu } = useLanguage();

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasAnimated(true);
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
    }, delay + (index * 100));
    return () => clearTimeout(timer);
  }, [value, delay, index]);

  const displayLabel = labelKey ? t(labelKey) : label;

  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={cardVariants}
      whileHover={{ 
        y: -4, 
        boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.15)",
        transition: { duration: 0.2 }
      }}
      className={cn(
        "relative p-6 rounded-xl bg-card border border-border shadow-card",
        "hover:border-primary/20",
        isUrdu ? "text-right" : "",
        className
      )}
    >
      {/* Icon */}
      {icon && (
        <motion.div 
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 200, 
            damping: 15,
            delay: (index * 0.1) + 0.2 
          }}
          className={cn(
            "absolute top-4 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary",
            isUrdu ? "left-4" : "right-4"
          )}
        >
          {icon}
        </motion.div>
      )}

      {/* Value */}
      <div className="mb-2">
        <motion.span 
          className="text-4xl md:text-5xl font-display font-bold text-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: hasAnimated ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {prefix}
          {displayValue.toFixed(decimals)}
          {suffix}
        </motion.span>
      </div>

      {/* Label */}
      <p className={cn(
        "text-muted-foreground font-medium",
        isUrdu && "font-urdu"
      )}>{displayLabel}</p>

      {/* Trend */}
      {trend && (
        <motion.div
          initial={{ opacity: 0, x: isUrdu ? 20 : -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: (index * 0.1) + 0.4, duration: 0.3 }}
          className={cn(
            "mt-3 inline-flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-full",
            trend.isPositive
              ? "bg-primary/10 text-primary"
              : "bg-destructive/10 text-destructive",
            isUrdu && "flex-row-reverse"
          )}
        >
          <span>{trend.isPositive ? "↑" : "↓"}</span>
          <span>{Math.abs(trend.value)}%</span>
          <span className={cn("text-muted-foreground ml-1", isUrdu && "font-urdu mr-1 ml-0")}>
            {t("common.vsLastYear")}
          </span>
        </motion.div>
      )}
    </motion.div>
  );
};
