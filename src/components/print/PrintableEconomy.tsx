import { forwardRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { 
  TrendingUp, 
  DollarSign,
  AlertTriangle,
  BarChart3
} from "lucide-react";
import { economicIndicators, gdpByProvince } from "@/data/pakistanData";

interface PrintableStatProps {
  value: string | number;
  label: string;
  icon: React.ReactNode;
  trend?: { value: number; isPositive: boolean };
}

const PrintableStat = ({ value, label, icon, trend }: PrintableStatProps) => (
  <div className="print-stat-card p-4 border border-border rounded-lg bg-card">
    <div className="flex items-center gap-3 mb-2">
      <div className="w-8 h-8 rounded-md bg-data-coral/10 flex items-center justify-center text-data-coral">
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
        {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}% change
      </span>
    )}
  </div>
);

interface PrintableEconomyProps {
  className?: string;
}

export const PrintableEconomy = forwardRef<HTMLDivElement, PrintableEconomyProps>(
  ({ className }, ref) => {
    const { t, isUrdu } = useLanguage();
    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const latestData = economicIndicators[economicIndicators.length - 1];
    const previousData = economicIndicators[economicIndicators.length - 2];
    
    const avgGdpGrowth = (economicIndicators.reduce((sum, d) => sum + d.gdpGrowth, 0) / economicIndicators.length).toFixed(1);
    const avgInflation = (economicIndicators.reduce((sum, d) => sum + d.inflation, 0) / economicIndicators.length).toFixed(1);

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
        <header className="print-header mb-8 pb-6 border-b-2 border-data-coral">
          <div className={cn("flex items-center justify-between", isUrdu && "flex-row-reverse")}>
            <div className={cn(isUrdu && "text-right")}>
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-6 h-6 text-data-coral" />
                <span className="text-sm font-medium text-data-coral uppercase tracking-wide">Economy Dashboard</span>
              </div>
              <h1 className={cn(
                "text-3xl font-display font-bold text-foreground mb-1",
                isUrdu && "font-urdu"
              )}>
                {t("economy.title")}
              </h1>
              <p className={cn("text-muted-foreground", isUrdu && "font-urdu")}>
                Economic indicators and provincial GDP analysis (2015-2023)
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
            Economic Overview (2023)
          </h2>
          
          <div className="grid grid-cols-4 gap-4">
            <PrintableStat
              value="$376.5B"
              label="GDP (Nominal)"
              icon={<DollarSign className="w-4 h-4" />}
            />
            <PrintableStat
              value={`${latestData.gdpGrowth}%`}
              label="GDP Growth Rate"
              icon={<TrendingUp className="w-4 h-4" />}
              trend={{ value: Math.abs(latestData.gdpGrowth - previousData.gdpGrowth), isPositive: latestData.gdpGrowth > previousData.gdpGrowth }}
            />
            <PrintableStat
              value={`${latestData.inflation}%`}
              label="Inflation Rate"
              icon={<AlertTriangle className="w-4 h-4" />}
              trend={{ value: latestData.inflation - previousData.inflation, isPositive: false }}
            />
            <PrintableStat
              value={`${latestData.unemployment}%`}
              label="Unemployment Rate"
              icon={<BarChart3 className="w-4 h-4" />}
              trend={{ value: latestData.unemployment - previousData.unemployment, isPositive: false }}
            />
          </div>
        </section>

        {/* Economic Indicators History */}
        <section className="print-section mb-8">
          <h2 className={cn(
            "text-xl font-display font-bold text-foreground mb-4 pb-2 border-b border-border",
            isUrdu && "font-urdu text-right"
          )}>
            Economic Indicators (2015-2023)
          </h2>
          
          <table className="print-table w-full border-collapse">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left p-3 border border-border font-semibold">Year</th>
                <th className="text-center p-3 border border-border font-semibold">GDP Growth %</th>
                <th className="text-center p-3 border border-border font-semibold">Inflation %</th>
                <th className="text-center p-3 border border-border font-semibold">Unemployment %</th>
                <th className="text-center p-3 border border-border font-semibold">Real Growth (GDP - Inflation)</th>
              </tr>
            </thead>
            <tbody>
              {economicIndicators.map((row, index) => {
                const realGrowth = (row.gdpGrowth - row.inflation).toFixed(1);
                return (
                  <tr key={row.year} className={index % 2 === 1 ? "bg-muted/20" : ""}>
                    <td className="p-3 border border-border font-medium">{row.year}</td>
                    <td className={cn(
                      "p-3 border border-border text-center font-medium",
                      row.gdpGrowth >= 0 ? "text-primary" : "text-destructive"
                    )}>
                      {row.gdpGrowth >= 0 ? '+' : ''}{row.gdpGrowth}%
                    </td>
                    <td className={cn(
                      "p-3 border border-border text-center",
                      row.inflation > 10 ? "text-destructive font-medium" : ""
                    )}>
                      {row.inflation}%
                    </td>
                    <td className="p-3 border border-border text-center">{row.unemployment}%</td>
                    <td className={cn(
                      "p-3 border border-border text-center font-semibold",
                      parseFloat(realGrowth) >= 0 ? "text-primary" : "text-destructive"
                    )}>
                      {parseFloat(realGrowth) >= 0 ? '+' : ''}{realGrowth}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>

        {/* Summary Statistics */}
        <section className="print-section mb-8">
          <h2 className={cn(
            "text-xl font-display font-bold text-foreground mb-4 pb-2 border-b border-border",
            isUrdu && "font-urdu text-right"
          )}>
            Period Summary (2015-2023)
          </h2>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 border border-border rounded-lg bg-muted/20">
              <p className="text-sm text-muted-foreground mb-1">Average GDP Growth</p>
              <p className={cn(
                "text-2xl font-bold",
                parseFloat(avgGdpGrowth) >= 0 ? "text-primary" : "text-destructive"
              )}>
                {avgGdpGrowth}%
              </p>
            </div>
            <div className="p-4 border border-border rounded-lg bg-muted/20">
              <p className="text-sm text-muted-foreground mb-1">Average Inflation</p>
              <p className="text-2xl font-bold text-data-coral">{avgInflation}%</p>
            </div>
            <div className="p-4 border border-border rounded-lg bg-muted/20">
              <p className="text-sm text-muted-foreground mb-1">Peak GDP Growth</p>
              <p className="text-2xl font-bold text-primary">
                {Math.max(...economicIndicators.map(d => d.gdpGrowth))}% (2022)
              </p>
            </div>
          </div>
        </section>

        {/* Provincial GDP Distribution */}
        <section className="print-section mb-8 page-break-before">
          <h2 className={cn(
            "text-xl font-display font-bold text-foreground mb-4 pb-2 border-b border-border",
            isUrdu && "font-urdu text-right"
          )}>
            Provincial GDP Distribution
          </h2>
          
          <table className="print-table w-full border-collapse">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left p-3 border border-border font-semibold">Province</th>
                <th className="text-center p-3 border border-border font-semibold">GDP Share %</th>
                <th className="text-center p-3 border border-border font-semibold">Estimated GDP (Billion USD)</th>
                <th className="text-left p-3 border border-border font-semibold">Key Sectors</th>
              </tr>
            </thead>
            <tbody>
              {gdpByProvince.map((row, index) => {
                const keySectors: Record<string, string> = {
                  'Punjab': 'Agriculture, Textiles, Manufacturing',
                  'Sindh': 'Financial Services, Shipping, Industry',
                  'KPK': 'Mining, Agriculture, Hydropower',
                  'Balochistan': 'Mining, Fishing, Natural Gas'
                };
                return (
                  <tr key={row.province} className={index % 2 === 1 ? "bg-muted/20" : ""}>
                    <td className="p-3 border border-border font-medium">{row.province}</td>
                    <td className="p-3 border border-border text-center font-semibold">{row.gdp}%</td>
                    <td className="p-3 border border-border text-center">
                      ${(376.5 * row.gdp / 100).toFixed(1)}B
                    </td>
                    <td className="p-3 border border-border text-sm text-muted-foreground">
                      {keySectors[row.province] || '-'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>

        {/* Economic Insights */}
        <section className="print-section mb-8">
          <h2 className={cn(
            "text-xl font-display font-bold text-foreground mb-4 pb-2 border-b border-border",
            isUrdu && "font-urdu text-right"
          )}>
            Key Economic Insights
          </h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 border border-border rounded-lg bg-muted/20">
              <h3 className="font-semibold text-foreground mb-2">Inflationary Pressure</h3>
              <p className="text-sm text-muted-foreground">
                Inflation reached a historic high of 29.2% in 2023, significantly eroding 
                purchasing power and impacting low-income households disproportionately.
              </p>
            </div>
            <div className="p-4 border border-border rounded-lg bg-muted/20">
              <h3 className="font-semibold text-foreground mb-2">Regional Disparity</h3>
              <p className="text-sm text-muted-foreground">
                Punjab and Sindh together account for nearly 87% of GDP, highlighting the 
                need for balanced regional development and investment in other provinces.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="print-footer mt-8 pt-4 border-t border-border text-center text-sm text-muted-foreground">
          <p>Pakistan Data Atlas • Economy Dashboard</p>
          <p className="mt-1">Data Sources: State Bank of Pakistan, World Bank, IMF • Generated on {currentDate}</p>
        </footer>
      </div>
    );
  }
);

PrintableEconomy.displayName = "PrintableEconomy";
