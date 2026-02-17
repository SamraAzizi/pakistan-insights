import { ReactNode } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface LanguageTransitionProps {
  children: ReactNode;
  className?: string;
}

export const LanguageTransition = ({ children, className = "" }: LanguageTransitionProps) => {
  const { isUrdu, isTransitioning } = useLanguage();

  return (
    <div
      className={`
        transition-all duration-300 ease-out
        ${isTransitioning ? 'opacity-0 scale-[0.99]' : 'opacity-100 scale-100'}
        ${isUrdu ? 'animate-lang-switch-rtl' : 'animate-lang-switch'}
        ${className}
      `}
      style={{
        animationPlayState: isTransitioning ? 'paused' : 'running',
      }}
    >
      {children}
    </div>
  );
};

// Inline text transition for individual elements
export const TextTransition = ({ children, className = "" }: LanguageTransitionProps) => {
  const { isUrdu, isTransitioning } = useLanguage();

  return (
    <span
      className={`
        inline-block
        transition-all duration-200 ease-out
        ${isTransitioning ? 'opacity-0 translate-y-1' : 'opacity-100 translate-y-0'}
        ${className}
      `}
    >
      {children}
    </span>
  );
};