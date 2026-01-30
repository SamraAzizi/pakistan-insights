import { motion, AnimatePresence, Transition } from "framer-motion";
import { ReactNode, useMemo } from "react";

interface AnimatedChartWrapperProps {
  children: ReactNode;
  /** Unique key that changes when data updates (e.g., stringified filter values) */
  dataKey: string;
  className?: string;
}

const chartVariants = {
  initial: {
    opacity: 0,
    scale: 0.95,
    y: 10,
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    y: -5,
  },
};

const chartTransition: Transition = {
  duration: 0.4,
  ease: "easeOut",
};

/**
 * AnimatedChartWrapper provides smooth transitions when chart data changes.
 * Use the dataKey prop to trigger re-animation when filters are applied.
 */
export const AnimatedChartWrapper = ({
  children,
  dataKey,
  className = "",
}: AnimatedChartWrapperProps) => {
  // Memoize the key to prevent unnecessary re-renders
  const animationKey = useMemo(() => dataKey, [dataKey]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={animationKey}
        variants={chartVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={chartTransition}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

/**
 * Hook to generate a stable key from filter values
 */
export const useChartAnimationKey = (
  ...dependencies: (string | number | null | undefined | boolean | number[])[]
): string => {
  return useMemo(() => {
    return dependencies
      .map((dep) => {
        if (Array.isArray(dep)) return dep.join("-");
        if (dep === null || dep === undefined) return "null";
        return String(dep);
      })
      .join("_");
  }, [dependencies]);
};
