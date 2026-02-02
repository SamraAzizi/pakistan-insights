import { forwardRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { 
  Users, 
  Building,
  Baby,
  TrendingUp
} from "lucide-react";
import { populationData, ageDistribution, provinces } from "@/data/pakistanData";

interface PrintableStatProps {
  value: string | number;
  label: string;
  icon: React.ReactNode;
  trend?: { value: number; isPositive: boolean };
}

const PrintableStat = ({ value, label, icon, trend }: PrintableStatProps) => (
  <div className="print-stat-card p-4 border border-border rounded-lg bg-card">
    <div className="flex items-center gap-3 mb-2">
      <div className="w-8 h-8 rounded-md bg-data-amber/10 flex items-center justify-center text-data-amber">
        {icon}
      </div>
      <span className="text-2xl font-bold text-foreground">{value}</span>
    </div>
    <p className="text-sm text-muted-foreground">{label}</p>
    {trend && (
      <span className={cn(
        "text-xs font-medium mt-1 inline-block",
        trend.isPositive ? "text-primary" : "text-destructive"
      )}>
        {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
      </span>
    )}
  </div>
);

interface PrintablePopulationProps {
  className?: string;
}

export const PrintablePopulation = forwardRef<HTMLDivElement, PrintablePopulationProps>(
  ({ className }, ref) => {
    const { t, isUrdu } = useLanguage();
    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const latestPop = populationData[populationData.length - 1];
    const earliestPop = populationData[0];
    const growthMultiplier = (latestPop.population / earliestPop.population).toFixed(1);
    const youthPercent = ageDistribution
      .filter(d => d.ageGroup === "0-14" || d.ageGroup === "15-24")
      .reduce((sum, d) => sum + d.male + d.female, 0) / 2;

    return (
      <div 
        ref={ref} 
        className={cn(
          "printable-dashboard bg-background text-foreground p-8",
          isUrdu && "direction-rtl",
          className
        )}
      >
        {/* Header */}
        <header className="print-header mb-8 pb-6 border-b-2 border-data-amber">
          <div className={cn("flex items-center justify-between", isUrdu && "flex-row-reverse")}>
            <div className={cn(isUrdu && "text-right")}>
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-6 h-6 text-data-amber" />
                <span className="text-sm font-medium text-data-amber uppercase tracking-wide">Population Dashboard</span>
              </div>
              <h1 className={cn(
                "text-3xl font-display font-bold text-foreground mb-1",
                isUrdu && "font-urdu"
              )}>
                {t("population.title")}
              </h1>
              <p className={cn("text-muted-foreground", isUrdu && "font-urdu")}>
                Demographic analysis and census data (1951-2023)
              </p>
            </div>
            <div className={cn("text-right", isUrdu && "text-left")}>
              <p className="text-sm text-muted-foreground">Report Generated</p>
              <p className="font-medium text-foreground">{currentDate}</p>
            </div>
          </div>
        </header>

        {/* Key Metrics */}
        <section className="print-section mb-8">
          <h2 className={cn(
            "text-xl font-display font-bold text-foreground mb-4 pb-2 border-b border-border",
            isUrdu && "font-urdu text-right"
          )}>
            Population Overview
          </h2>
          
          <div className="grid grid-cols-4 gap-4">
            <PrintableStat
              value={`${latestPop.population}M`}
              label="Total Population (2023)"
              icon={<Users className="w-4 h-4" />}
              trend={{ value: 2.1, isPositive: true }}
            />
            <PrintableStat
              value={`${latestPop.urbanPercent}%`}
              label="Urban Population"
              icon={<Building className="w-4 h-4" />}
              trend={{ value: 2.4, isPositive: true }}
            />
            <PrintableStat
              value={`${youthPercent.toFixed(1)}%`}
              label="Youth (Under 30)"
              icon={<Baby className="w-4 h-4" />}
            />
            <PrintableStat
              value={`${growthMultiplier}x`}
              label="Growth Since 1951"
              icon={<TrendingUp className="w-4 h-4" />}
            />
          </div>
        </section>

        {/* Historical Population */}
        <section className="print-section mb-8">
          <h2 className={cn(
            "text-xl font-display font-bold text-foreground mb-4 pb-2 border-b border-border",
            isUrdu && "font-urdu text-right"
          )}>
            Census Population Data (1951-2023)
          </h2>
          
          <table className="print-table w-full border-collapse">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left p-3 border border-border font-semibold">Census Year</th>
                <th className="text-center p-3 border border-border font-semibold">Population (Millions)</th>
                <th className="text-center p-3 border border-border font-semibold">Urban %</th>
                <th className="text-center p-3 border border-border font-semibold">Rural %</th>
                <th className="text-center p-3 border border-border font-semibold">Growth Since Previous</th>
              </tr>
            </thead>
            <tbody>
              {populationData.map((row, index) => {
                const prevPop = index > 0 ? populationData[index - 1].population : null;
                const growth = prevPop ? (((row.population - prevPop) / prevPop) * 100).toFixed(1) : '-';
                return (
                  <tr key={row.year} className={index % 2 === 1 ? "bg-muted/20" : ""}>
                    <td className="p-3 border border-border font-medium">{row.year}</td>
                    <td className="p-3 border border-border text-center font-semibold">{row.population}</td>
                    <td className="p-3 border border-border text-center">{row.urbanPercent}%</td>
                    <td className="p-3 border border-border text-center">{(100 - row.urbanPercent).toFixed(1)}%</td>
                    <td className={cn(
                      "p-3 border border-border text-center",
                      growth !== '-' ? "text-primary" : ""
                    )}>
                      {growth !== '-' ? `+${growth}%` : '-'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>

        {/* Age Distribution */}
        <section className="print-section mb-8">
          <h2 className={cn(
            "text-xl font-display font-bold text-foreground mb-4 pb-2 border-b border-border",
            isUrdu && "font-urdu text-right"
          )}>
            Age Distribution by Gender
          </h2>
          
          <table className="print-table w-full border-collapse">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left p-3 border border-border font-semibold">Age Group</th>
                <th className="text-center p-3 border border-border font-semibold">Male %</th>
                <th className="text-center p-3 border border-border font-semibold">Female %</th>
                <th className="text-center p-3 border border-border font-semibold">Average %</th>
              </tr>
            </thead>
            <tbody>
              {ageDistribution.map((row, index) => (
                <tr key={row.ageGroup} className={index % 2 === 1 ? "bg-muted/20" : ""}>
                  <td className="p-3 border border-border font-medium">{row.ageGroup} years</td>
                  <td className="p-3 border border-border text-center">{row.male}%</td>
                  <td className="p-3 border border-border text-center">{row.female}%</td>
                  <td className="p-3 border border-border text-center font-semibold">
                    {((row.male + row.female) / 2).toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Provincial Distribution */}
        <section className="print-section mb-8 page-break-before">
          <h2 className={cn(
            "text-xl font-display font-bold text-foreground mb-4 pb-2 border-b border-border",
            isUrdu && "font-urdu text-right"
          )}>
            Provincial Population Distribution
          </h2>
          
          <table className="print-table w-full border-collapse">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left p-3 border border-border font-semibold">Province/Territory</th>
                <th className="text-center p-3 border border-border font-semibold">Population (Millions)</th>
                <th className="text-center p-3 border border-border font-semibold">Area (sq km)</th>
                <th className="text-center p-3 border border-border font-semibold">Density (per sq km)</th>
                <th className="text-center p-3 border border-border font-semibold">% of Total</th>
              </tr>
            </thead>
            <tbody>
              {provinces.map((row, index) => {
                const totalPop = provinces.reduce((sum, p) => sum + p.population, 0);
                const density = Math.round(row.population / row.area);
                const percentage = ((row.population / totalPop) * 100).toFixed(1);
                return (
                  <tr key={row.id} className={index % 2 === 1 ? "bg-muted/20" : ""}>
                    <td className="p-3 border border-border font-medium">{row.name}</td>
                    <td className="p-3 border border-border text-center">{(row.population / 1000000).toFixed(1)}</td>
                    <td className="p-3 border border-border text-center">{row.area.toLocaleString()}</td>
                    <td className={cn(
                      "p-3 border border-border text-center",
                      density > 500 ? "text-destructive font-medium" : ""
                    )}>
                      {density.toLocaleString()}
                    </td>
                    <td className="p-3 border border-border text-center font-semibold">{percentage}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>

        {/* Key Insights */}
        <section className="print-section mb-8">
          <h2 className={cn(
            "text-xl font-display font-bold text-foreground mb-4 pb-2 border-b border-border",
            isUrdu && "font-urdu text-right"
          )}>
            Key Demographic Insights
          </h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 border border-border rounded-lg bg-muted/20">
              <h3 className="font-semibold text-foreground mb-2">Youth Bulge</h3>
              <p className="text-sm text-muted-foreground">
                Over 55% of Pakistan's population is under 30 years old, presenting both 
                opportunities for economic growth and challenges for education and employment.
              </p>
            </div>
            <div className="p-4 border border-border rounded-lg bg-muted/20">
              <h3 className="font-semibold text-foreground mb-2">Urbanization Trend</h3>
              <p className="text-sm text-muted-foreground">
                Urban population has more than doubled from 17.8% in 1951 to 38.8% in 2023, 
                with major cities experiencing rapid growth and infrastructure challenges.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="print-footer mt-8 pt-4 border-t border-border text-center text-sm text-muted-foreground">
          <p>Pakistan Data Atlas • Population Dashboard</p>
          <p className="mt-1">Data Sources: Pakistan Bureau of Statistics, UN Population Division • Generated on {currentDate}</p>
        </footer>
      </div>
    );
  }
);

PrintablePopulation.displayName = "PrintablePopulation";
