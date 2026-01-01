import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, Database, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const stats = [
  { value: 241.5, suffix: "M", label: "Population" },
  { value: 62.8, suffix: "%", label: "Literacy Rate" },
  { value: 154, suffix: "", label: "Districts" },
  { value: 76, suffix: "+", label: "Years of Data" },
];

export const Hero = () => {
  const [animatedStats, setAnimatedStats] = useState(stats.map(() => 0));

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

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0 pattern-geometric opacity-30" />
      
      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-accent/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary-foreground/5 rounded-full blur-3xl" />

      <div className="container relative z-10 mx-auto px-4 py-20">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 mb-8 animate-fade-in">
            <Database className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-primary-foreground">
              Open Data Initiative
            </span>
          </div>

          {/* Title */}
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-primary-foreground mb-4 animate-slide-up">
            Pakistan
            <br />
            <span className="text-accent">Data Atlas</span>
          </h1>

          {/* Urdu Title */}
          <p className="text-2xl md:text-3xl text-primary-foreground/70 font-medium mb-6 animate-slide-up" style={{ animationDelay: "100ms" }}>
            پاکستان ڈیٹا اٹلس
          </p>

          {/* Description */}
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mb-10 animate-slide-up" style={{ animationDelay: "200ms" }}>
            Transforming complex socio-economic data into clear, interactive narratives. 
            Explore Pakistan's development trajectory through education, elections, demographics, and economy.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mb-16 animate-slide-up" style={{ animationDelay: "300ms" }}>
            <Link to="/education">
              <Button variant="hero" size="xl" className="gap-2">
                Explore Data
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Button variant="ghostDark" size="xl" className="gap-2">
              <BarChart3 className="w-5 h-5" />
              View Methodology
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-slide-up" style={{ animationDelay: "400ms" }}>
            {stats.map((stat, index) => (
              <div key={index} className="text-center md:text-left">
                <p className="text-3xl md:text-4xl font-display font-bold text-primary-foreground">
                  {animatedStats[index].toFixed(stat.value % 1 !== 0 ? 1 : 0)}
                  <span className="text-accent">{stat.suffix}</span>
                </p>
                <p className="text-sm text-primary-foreground/60">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-primary-foreground/30 flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-primary-foreground/50 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
};
