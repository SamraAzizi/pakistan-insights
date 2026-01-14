import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, Database } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const stats = [
  { value: 241.5, suffix: "M", labelKey: "stats.dataPoints" },
  { value: 62.8, suffix: "%", labelKey: "stats.provinces" },
  { value: 154, suffix: "", labelKey: "stats.districts" },
  { value: 76, suffix: "+", labelKey: "stats.yearsData" },
];

export const Hero = () => {
  const [animatedStats, setAnimatedStats] = useState(stats.map(() => 0));
  const { t, isUrdu } = useLanguage();

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    
    stats.forEach((stat, index) => {
      const increment = stat.value / steps;
      let current = 0;
      const interval = setInterval(() => {
        current += increment;
        if (current >= stat.value) {
          setAnimatedStats((prev) => {
            const newStats = [...prev];
            newStats[index] = stat.value;
            return newStats;
          });
          clearInterval(interval);
        } else {
          setAnimatedStats((prev) => {
            const newStats = [...prev];
            newStats[index] = current;
            return newStats;
          });
        }
      }, duration / steps);
    });
  }, []);