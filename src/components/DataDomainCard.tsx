import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface DataDomainCardProps {
  title: string;
  urduTitle: string;
  description: string;
  icon: React.ReactNode;
  stats: { label: string; value: string }[];
  path: string;
  accentColor: "green" | "blue" | "amber" | "coral";
  delay?: number;
}

const colorVariants = {
  green: {
    bg: "bg-primary/5",
    border: "border-primary/20 hover:border-primary/40",
    icon: "bg-primary text-primary-foreground",
    accent: "text-primary",
  },
  blue: {
    bg: "bg-data-blue/5",
    border: "border-data-blue/20 hover:border-data-blue/40",
    icon: "bg-data-blue text-primary-foreground",
    accent: "text-data-blue",
  },
  amber: {
    bg: "bg-accent/5",
    border: "border-accent/20 hover:border-accent/40",
    icon: "bg-accent text-accent-foreground",
    accent: "text-accent",
  },
  coral: {
    bg: "bg-data-coral/5",
    border: "border-data-coral/20 hover:border-data-coral/40",
    icon: "bg-data-coral text-primary-foreground",
    accent: "text-data-coral",
  },
};

export const DataDomainCard = ({
  title,
  urduTitle,
  description,
  icon,
  stats,
  path,
  accentColor,
  delay = 0,
}: DataDomainCardProps) => {
  const colors = colorVariants[accentColor];

  return (
    <Link
      to={path}
      className={cn(
        "group relative block p-6 rounded-2xl border-2 transition-all duration-500",
        "hover:shadow-elevated hover:-translate-y-2",
        colors.bg,
        colors.border,
        "animate-fade-in-up"
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className={cn("w-14 h-14 rounded-xl flex items-center justify-center", colors.icon)}>
          {icon}
        </div>
        <ArrowRight
          className={cn(
            "w-5 h-5 transition-transform duration-300",
            "group-hover:translate-x-1",
            colors.accent
          )}
        />
      </div>

      {/* Title */}
      <div className="mb-3">
        <h3 className="font-display text-2xl font-bold text-foreground mb-0.5">
          {title}
        </h3>
        <p className={cn("text-sm font-medium", colors.accent)}>{urduTitle}</p>
      </div>

      {/* Description */}
      <p className="text-muted-foreground text-sm mb-6 line-clamp-2">
        {description}
      </p>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
        {stats.map((stat, index) => (
          <div key={index}>
            <p className={cn("text-lg font-bold font-display", colors.accent)}>
              {stat.value}
            </p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>
    </Link>
  );
};
