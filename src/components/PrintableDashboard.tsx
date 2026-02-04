import { forwardRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { 
  GraduationCap, 
  Vote, 
  Users, 
  TrendingUp,
  BookOpen,
  School,
  Award,
  Globe,
  DollarSign,
  Calendar
} from "lucide-react";

interface PrintableStatProps {
  value: string | number;
  label: string;
  icon: React.ReactNode;
  trend?: { value: number; isPositive: boolean };
}

const PrintableStat = ({ value, label, icon, trend }: PrintableStatProps) => (
  <div className="print-stat-card p-4 border border-border rounded-lg bg-card">
    <div className="flex items-center gap-3 mb-2">
      <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center text-primary">
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
        {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}% vs last year
      </span>
    )}
  </div>
);

interface PrintableDashboardProps {
  className?: string;
}

export const PrintableDashboard = forwardRef<HTMLDivElement, PrintableDashboardProps>(
  ({ className }, ref) => {
    const { t, isUrdu } = useLanguage();
    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

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
        <header className="print-header mb-8 pb-6 border-b-2 border-primary">
          <div className={cn("flex items-center justify-between", isUrdu && "flex-row-reverse")}>
            <div className={cn(isUrdu && "text-right")}>
              <h1 className={cn(
                "text-3xl font-display font-bold text-foreground mb-1",
                isUrdu && "font-urdu"
              )}>
                {t("index.title")}
              </h1>
              <p className={cn("text-muted-foreground", isUrdu && "font-urdu")}>
                {t("index.subtitle")}
              </p>
            </div>
            <div className={cn("text-right", isUrdu && "text-left")}>
              <p className="text-sm text-muted-foreground">Report Generated</p>
              <p className="font-medium text-foreground">{currentDate}</p>
            </div>
          </div>
        </header>

        {/* Executive Summary */}
        <section className="print-section mb-8">
          <h2 className={cn(
            "text-xl font-display font-bold text-foreground mb-4 pb-2 border-b border-border",
            isUrdu && "font-urdu text-right"
          )}>
            {isUrdu ? "اہم اعداد و شمار" : "Key Statistics Overview"}
          </h2>
          
          <div className="grid grid-cols-4 gap-4 mb-6">
            <PrintableStat
              value="62.8%"
              label={t("index.nationalLiteracy")}
              icon={<BookOpen className="w-4 h-4" />}
              trend={{ value: 3.8, isPositive: true }}
            />
            <PrintableStat
              value="134K+"
              label={t("index.educationalInstitutions")}
              icon={<School className="w-4 h-4" />}
            />
            <PrintableStat
              value="52.7%"
              label={t("index.femaleLiteracyRate")}
              icon={<Award className="w-4 h-4" />}
              trend={{ value: 4.7, isPositive: true }}
            />
            <PrintableStat
              value="38.8%"
              label={t("index.urbanPopulation")}
              icon={<Globe className="w-4 h-4" />}
              trend={{ value: 2.4, isPositive: true }}
            />
          </div>
        </section>

        {/* Data Domains Summary */}
        <section className="print-section mb-8">
          <h2 className={cn(
            "text-xl font-display font-bold text-foreground mb-4 pb-2 border-b border-border",
            isUrdu && "font-urdu text-right"
          )}>
            {isUrdu ? "اعداد و شمار کے شعبے" : "Data Domains Summary"}
          </h2>
          
          <div className="grid grid-cols-2 gap-6">
            {/* Education */}
            <div className="print-domain-card p-4 border border-border rounded-lg">
              <div className={cn("flex items-center gap-3 mb-3", isUrdu && "flex-row-reverse")}>
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-primary" />
                </div>
                <h3 className={cn("font-display font-bold text-lg", isUrdu && "font-urdu")}>
                  {t("domain.education.cardTitle")}
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-muted-foreground">{t("domain.education.literacyRate")}:</span>
                  <span className="ml-2 font-semibold">62.8%</span>
                </div>
                <div>
                  <span className="text-muted-foreground">{t("domain.education.schools")}:</span>
                  <span className="ml-2 font-semibold">134K+</span>
                </div>
              </div>
            </div>

            {/* Elections */}
            <div className="print-domain-card p-4 border border-border rounded-lg">
              <div className={cn("flex items-center gap-3 mb-3", isUrdu && "flex-row-reverse")}>
                <div className="w-10 h-10 rounded-lg bg-data-blue/10 flex items-center justify-center">
                  <Vote className="w-5 h-5 text-data-blue" />
                </div>
                <h3 className={cn("font-display font-bold text-lg", isUrdu && "font-urdu")}>
                  {t("domain.elections.cardTitle")}
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-muted-foreground">{t("domain.elections.elections")}:</span>
                  <span className="ml-2 font-semibold">11</span>
                </div>
                <div>
                  <span className="text-muted-foreground">{t("domain.elections.constituencies")}:</span>
                  <span className="ml-2 font-semibold">266</span>
                </div>
              </div>
            </div>

            {/* Population */}
            <div className="print-domain-card p-4 border border-border rounded-lg">
              <div className={cn("flex items-center gap-3 mb-3", isUrdu && "flex-row-reverse")}>
                <div className="w-10 h-10 rounded-lg bg-data-amber/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-data-amber" />
                </div>
                <h3 className={cn("font-display font-bold text-lg", isUrdu && "font-urdu")}>
                  {t("domain.population.cardTitle")}
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-muted-foreground">{t("domain.population.population")}:</span>
                  <span className="ml-2 font-semibold">241.5M</span>
                </div>
                <div>
                  <span className="text-muted-foreground">{t("domain.population.urban")}:</span>
                  <span className="ml-2 font-semibold">38.8%</span>
                </div>
              </div>
            </div>

            {/* Economy */}
            <div className="print-domain-card p-4 border border-border rounded-lg">
              <div className={cn("flex items-center gap-3 mb-3", isUrdu && "flex-row-reverse")}>
                <div className="w-10 h-10 rounded-lg bg-data-coral/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-data-coral" />
                </div>
                <h3 className={cn("font-display font-bold text-lg", isUrdu && "font-urdu")}>
                  {t("domain.economy.cardTitle")}
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-muted-foreground">{t("domain.economy.gdp")}:</span>
                  <span className="ml-2 font-semibold">$376B</span>
                </div>
                <div>
                  <span className="text-muted-foreground">{t("domain.economy.growth")}:</span>
                  <span className="ml-2 font-semibold">0.3%</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Economic Indicators */}
        <section className="print-section mb-8">
          <h2 className={cn(
            "text-xl font-display font-bold text-foreground mb-4 pb-2 border-b border-border",
            isUrdu && "font-urdu text-right"
          )}>
            {isUrdu ? "اقتصادی اشارے" : "Economic Indicators"}
          </h2>
          
          <div className="grid grid-cols-4 gap-4">
            <PrintableStat
              value="$376.5B"
              label="GDP (2023)"
              icon={<DollarSign className="w-4 h-4" />}
            />
            <PrintableStat
              value="0.3%"
              label="GDP Growth"
              icon={<TrendingUp className="w-4 h-4" />}
              trend={{ value: 5.7, isPositive: false }}
            />
            <PrintableStat
              value="29.2%"
              label="Inflation Rate"
              icon={<TrendingUp className="w-4 h-4" />}
              trend={{ value: 17.0, isPositive: false }}
            />
            <PrintableStat
              value="8.5%"
              label="Unemployment"
              icon={<Users className="w-4 h-4" />}
              trend={{ value: 2.3, isPositive: false }}
            />
          </div>
        </section>

        {/* Provincial Literacy Rates Table */}
        <section className="print-section mb-8">
          <h2 className={cn(
            "text-xl font-display font-bold text-foreground mb-4 pb-2 border-b border-border",
            isUrdu && "font-urdu text-right"
          )}>
            {isUrdu ? "صوبائی خواندگی کی شرح" : "Provincial Literacy Rates"}
          </h2>
          
          <table className="print-table w-full border-collapse">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left p-3 border border-border font-semibold">Province</th>
                <th className="text-center p-3 border border-border font-semibold">Male %</th>
                <th className="text-center p-3 border border-border font-semibold">Female %</th>
                <th className="text-center p-3 border border-border font-semibold">Overall %</th>
                <th className="text-center p-3 border border-border font-semibold">Gender Gap</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-border">Punjab</td>
                <td className="p-3 border border-border text-center">71.5</td>
                <td className="p-3 border border-border text-center">56.2</td>
                <td className="p-3 border border-border text-center font-semibold">63.8</td>
                <td className="p-3 border border-border text-center text-destructive">15.3</td>
              </tr>
              <tr className="bg-muted/20">
                <td className="p-3 border border-border">Sindh</td>
                <td className="p-3 border border-border text-center">68.8</td>
                <td className="p-3 border border-border text-center">47.3</td>
                <td className="p-3 border border-border text-center font-semibold">58.2</td>
                <td className="p-3 border border-border text-center text-destructive">21.5</td>
              </tr>
              <tr>
                <td className="p-3 border border-border">Khyber Pakhtunkhwa</td>
                <td className="p-3 border border-border text-center">70.2</td>
                <td className="p-3 border border-border text-center">38.4</td>
                <td className="p-3 border border-border text-center font-semibold">53.1</td>
                <td className="p-3 border border-border text-center text-destructive">31.8</td>
              </tr>
              <tr className="bg-muted/20">
                <td className="p-3 border border-border">Balochistan</td>
                <td className="p-3 border border-border text-center">52.4</td>
                <td className="p-3 border border-border text-center">24.1</td>
                <td className="p-3 border border-border text-center font-semibold">40.0</td>
                <td className="p-3 border border-border text-center text-destructive">28.3</td>
              </tr>
              <tr>
                <td className="p-3 border border-border">Islamabad</td>
                <td className="p-3 border border-border text-center">92.1</td>
                <td className="p-3 border border-border text-center">86.5</td>
                <td className="p-3 border border-border text-center font-semibold">88.9</td>
                <td className="p-3 border border-border text-center text-primary">5.6</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Electoral History Summary */}
        <section className="print-section mb-8 page-break-before">
          <h2 className={cn(
            "text-xl font-display font-bold text-foreground mb-4 pb-2 border-b border-border",
            isUrdu && "font-urdu text-right"
          )}>
            {isUrdu ? "انتخابی تاریخ" : "Electoral History (1970-2024)"}
          </h2>
          
          <div className="grid grid-cols-3 gap-4 mb-4">
            <PrintableStat
              value="11"
              label="National Elections"
              icon={<Calendar className="w-4 h-4" />}
            />
            <PrintableStat
              value="266"
              label="NA Constituencies"
              icon={<Vote className="w-4 h-4" />}
            />
            <PrintableStat
              value="54.3%"
              label="Avg. Voter Turnout"
              icon={<Users className="w-4 h-4" />}
            />
          </div>
        </section>

        {/* Population Demographics */}
        <section className="print-section mb-8">
          <h2 className={cn(
            "text-xl font-display font-bold text-foreground mb-4 pb-2 border-b border-border",
            isUrdu && "font-urdu text-right"
          )}>
            {isUrdu ? "آبادیاتی خلاصہ" : "Population Demographics"}
          </h2>
          
          <div className="grid grid-cols-4 gap-4">
            <PrintableStat
              value="241.5M"
              label="Total Population"
              icon={<Users className="w-4 h-4" />}
              trend={{ value: 2.1, isPositive: true }}
            />
            <PrintableStat
              value="38.8%"
              label="Urban Population"
              icon={<Globe className="w-4 h-4" />}
              trend={{ value: 2.4, isPositive: true }}
            />
            <PrintableStat
              value="55.3%"
              label="Youth (Under 30)"
              icon={<Users className="w-4 h-4" />}
            />
            <PrintableStat
              value="7.2x"
              label="Growth Since 1951"
              icon={<TrendingUp className="w-4 h-4" />}
            />
          </div>
        </section>

        {/* Footer */}
        <footer className="print-footer mt-8 pt-4 border-t border-border text-center text-sm text-muted-foreground">
          <p>Pakistan Data Atlas • Data Sources: PBS, ECP, World Bank, UNDP</p>
          <p className="mt-1">Generated on {currentDate} • Page 1 of 1</p>
        </footer>
      </div>
    );
  }
);

PrintableDashboard.displayName = "PrintableDashboard";
