import { motion, Transition } from "framer-motion";
import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

const shimmerTransition: Transition = {
  duration: 1.5,
  repeat: Infinity,
  ease: "linear" as const
};

export const SkeletonPulse = ({ className }: SkeletonProps) => (
  <motion.div
    className={cn(
      "bg-gradient-to-r from-muted via-muted/50 to-muted bg-[length:200%_100%] rounded-md",
      className
    )}
    initial={{ backgroundPosition: "-200% 0" }}
    animate={{ backgroundPosition: "200% 0" }}
    transition={shimmerTransition}
  />
);

export const StatCardSkeleton = ({ index = 0 }: { index?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: index * 0.1 }}
    className="bg-card rounded-xl border border-border p-6 shadow-card"
  >
    <div className="flex items-start justify-between mb-4">
      <SkeletonPulse className="w-10 h-10 rounded-lg" />
      <SkeletonPulse className="w-16 h-5 rounded-full" />
    </div>
    <SkeletonPulse className="h-9 w-24 mb-2" />
    <SkeletonPulse className="h-4 w-32" />
  </motion.div>
);

export const ChartSkeleton = ({ index = 0, height = "h-[350px]" }: { index?: number; height?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: 0.4 + index * 0.15 }}
    className={cn("bg-card rounded-xl border border-border p-6 shadow-card", height)}
  >
    <div className="flex items-center justify-between mb-6">
      <div className="space-y-2">
        <SkeletonPulse className="h-6 w-40" />
        <SkeletonPulse className="h-4 w-56" />
      </div>
      <SkeletonPulse className="h-9 w-24 rounded-lg" />
    </div>
    <div className="relative h-[calc(100%-80px)] flex items-end gap-2 px-4">
      {[0.6, 0.8, 0.5, 0.9, 0.7, 0.4, 0.75, 0.85, 0.55, 0.65].map((h, i) => (
        <motion.div
          key={i}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.5, delay: 0.6 + i * 0.05 }}
          className="flex-1 origin-bottom"
          style={{ height: `${h * 100}%` }}
        >
          <SkeletonPulse className="w-full h-full rounded-t-md" />
        </motion.div>
      ))}
    </div>
  </motion.div>
);

export const TableSkeleton = ({ rows = 5 }: { rows?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: 0.6 }}
    className="bg-card rounded-xl border border-border overflow-hidden shadow-card"
  >
    {/* Header */}
    <div className="bg-muted/50 border-b border-border p-4 flex gap-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <SkeletonPulse key={i} className="h-5 flex-1" />
      ))}
    </div>
    {/* Rows */}
    {Array.from({ length: rows }).map((_, rowIndex) => (
      <motion.div
        key={rowIndex}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.7 + rowIndex * 0.05 }}
        className="p-4 flex gap-4 border-b border-border last:border-b-0"
      >
        {[1, 2, 3, 4, 5].map((i) => (
          <SkeletonPulse key={i} className="h-4 flex-1" />
        ))}
      </motion.div>
    ))}
  </motion.div>
);

export const HeaderSkeleton = () => (
  <section className="pt-24 pb-12 bg-muted/30">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <SkeletonPulse className="h-7 w-32 rounded-full" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <SkeletonPulse className="h-12 w-64 md:w-80" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <SkeletonPulse className="h-6 w-96 max-w-full" />
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex gap-3"
        >
          <SkeletonPulse className="h-11 w-32 rounded-lg" />
          <SkeletonPulse className="h-11 w-28 rounded-lg" />
        </motion.div>
      </div>
    </div>
  </section>
);

export const InsightBoxSkeleton = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: 0.8 }}
    className="bg-accent/5 border border-accent/20 rounded-2xl p-8"
  >
    <div className="flex items-start gap-4">
      <SkeletonPulse className="w-12 h-12 rounded-xl flex-shrink-0" />
      <div className="flex-1 space-y-3">
        <SkeletonPulse className="h-6 w-48" />
        <SkeletonPulse className="h-4 w-full" />
        <SkeletonPulse className="h-4 w-3/4" />
      </div>
    </div>
  </motion.div>
);

interface DashboardSkeletonProps {
  showTable?: boolean;
  showInsightBox?: boolean;
  chartCount?: number;
  tableRows?: number;
}

export const DashboardSkeleton = ({
  showTable = false,
  showInsightBox = false,
  chartCount = 2,
  tableRows = 5
}: DashboardSkeletonProps) => (
  <div className="min-h-screen bg-background">
    <HeaderSkeleton />
    
    {/* Key Metrics */}
    <section className="py-8 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[0, 1, 2, 3].map((i) => (
            <StatCardSkeleton key={i} index={i} />
          ))}
        </div>
      </div>
    </section>

    {/* Charts */}
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {Array.from({ length: chartCount }).map((_, i) => (
            <ChartSkeleton key={i} index={i} />
          ))}
        </div>
      </div>
    </section>

    {/* Table */}
    {showTable && (
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="mb-8 space-y-2">
            <SkeletonPulse className="h-7 w-48" />
            <SkeletonPulse className="h-5 w-72" />
          </div>
          <TableSkeleton rows={tableRows} />
        </div>
      </section>
    )}

    {/* Insight Box */}
    {showInsightBox && (
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <InsightBoxSkeleton />
        </div>
      </section>
    )}
  </div>
);

export default DashboardSkeleton;
