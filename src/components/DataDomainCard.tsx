import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

interface DataDomainCardProps {
  title: string;
  titleKey?: string;
  urduTitle: string;
  description: string;
  descriptionKey?: string;
  icon: React.ReactNode;
  stats: { label: string; labelKey?: string; value: string }[];
  path: string;
  accentColor: "green" | "blue" | "amber" | "coral";
  delay?: number;
  index?: number;
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

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.9,
    rotateX: 10,
  },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      type: "spring" as const,
      stiffness: 80,
      damping: 15,
      delay: index * 0.15,
    },
  }),
};

const iconVariants = {
  hidden: { scale: 0, rotate: -45 },
  visible: (index: number) => ({
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring" as const,
      stiffness: 200,
      damping: 12,
      delay: (index * 0.15) + 0.2,
    },
  }),
};

const statsVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: (index * 0.15) + 0.3,
      duration: 0.4,
    },
  }),
};

export const DataDomainCard = ({
  title,
  titleKey,
  urduTitle,
  description,
  descriptionKey,
  icon,
  stats,
  path,
  accentColor,
  delay = 0,
  index = 0,
}: DataDomainCardProps) => {
  const colors = colorVariants[accentColor];
  const { t, isUrdu } = useLanguage();

  const displayTitle = titleKey ? t(titleKey) : title;
  const displayDescription = descriptionKey ? t(descriptionKey) : description;

  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={cardVariants}
      whileHover={{ 
        y: -8, 
        scale: 1.02,
        transition: { duration: 0.25, ease: "easeOut" }
      }}
      style={{ perspective: 1000 }}
    >
      <Link
        to={path}
        className={cn(
          "group relative block p-6 rounded-2xl border-2 transition-shadow duration-300",
          "hover:shadow-elevated",
          colors.bg,
          colors.border,
          isUrdu && "text-right"
        )}
      >
        {/* Header */}
        <div className={cn(
          "flex items-start justify-between mb-4",
          isUrdu && "flex-row-reverse"
        )}>
          <motion.div 
            custom={index}
            variants={iconVariants}
            className={cn("w-14 h-14 rounded-xl flex items-center justify-center", colors.icon)}
          >
            {icon}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: isUrdu ? -10 : 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (index * 0.15) + 0.25 }}
          >
            <ArrowRight
              className={cn(
                "w-5 h-5 transition-transform duration-300",
                "group-hover:translate-x-1",
                colors.accent,
                isUrdu && "rotate-180 group-hover:-translate-x-1 group-hover:translate-x-0"
              )}
            />
          </motion.div>
        </div>

        {/* Title */}
        <div className="mb-3">
          <h3 className={cn(
            "font-display text-2xl font-bold text-foreground mb-0.5",
            isUrdu && "font-urdu"
          )}>
            {displayTitle}
          </h3>
          <p className={cn("text-sm font-medium", colors.accent, !isUrdu && "font-urdu")}>
            {urduTitle}
          </p>
        </div>

        {/* Description */}
        <p className={cn(
          "text-muted-foreground text-sm mb-6 line-clamp-2",
          isUrdu && "font-urdu leading-relaxed"
        )}>
          {displayDescription}
        </p>

        {/* Stats */}
        <motion.div 
          custom={index}
          variants={statsVariants}
          className={cn(
            "grid grid-cols-2 gap-4 pt-4 border-t border-border/50",
            isUrdu && "text-right"
          )}
        >
          {stats.map((stat, statIndex) => (
            <motion.div 
              key={statIndex}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (index * 0.15) + 0.35 + (statIndex * 0.1) }}
            >
              <p className={cn("text-lg font-bold font-display", colors.accent)}>
                {stat.value}
              </p>
              <p className={cn(
                "text-xs text-muted-foreground",
                isUrdu && "font-urdu"
              )}>
                {stat.labelKey ? t(stat.labelKey) : stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Link>
    </motion.div>
  );
};
