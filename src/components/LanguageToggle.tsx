import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";

export const LanguageToggle = () => {
  const { language, setLanguage, isTransitioning } = useLanguage();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setLanguage(language === "en" ? "ur" : "en")}
      className={`h-9 gap-2 font-medium transition-all duration-300 ${
        isTransitioning ? 'scale-95 opacity-70' : 'scale-100 opacity-100'
      }`}
      disabled={isTransitioning}
    >
      <Languages className={`h-4 w-4 transition-transform duration-300 ${
        isTransitioning ? 'rotate-180' : 'rotate-0'
      }`} />
      <span className={`text-xs transition-all duration-200 ${
        language === "ur" ? 'font-urdu' : ''
      }`}>
        {language === "en" ? "اردو" : "EN"}
      </span>
    </Button>
  );
};