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