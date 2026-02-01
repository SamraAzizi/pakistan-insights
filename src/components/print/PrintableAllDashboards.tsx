import { forwardRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { 
  GraduationCap, 
  BookOpen, 
  School, 
  Users,
  TrendingUp,
  Vote,
  MapPin,
  Building2,
  Banknote,
  Briefcase,
  FileText
} from "lucide-react";
import { 
  literacyData, 
  provincialLiteracy, 
  educationInfrastructure, 
  enrollmentTrends,
  electionData,
  partyPerformanceHistory,
  voterTurnout,
  populationData,
  ageDistribution,
  gdpByProvince,
  economicIndicators,
  keyStatistics
} from "@/data/pakistanData";

interface PrintableStatProps {
  value: string | number;
  label: string;
  icon: React.ReactNode;
  color?: string;
}

const PrintableStat = ({ value, label, icon, color = "text-primary" }: PrintableStatProps) => (
  <div className="print-stat-card p-3 border border-border rounded-lg bg-card">
    <div className="flex items-center gap-2 mb-1">
      <div className={cn("w-6 h-6 rounded-md flex items-center justify-center", color)}>
        {icon}
      </div>
      <span className="text-xl font-bold text-foreground">{value}</span>
    </div>
    <p className="text-xs text-muted-foreground">{label}</p>
  </div>
);

interface PrintableAllDashboardsProps {
  className?: string;
}

export const PrintableAllDashboards = forwardRef<HTMLDivElement, PrintableAllDashboardsProps>(
  ({ className }, ref) => {
    const { isUrdu } = useLanguage();
    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Calculate summary statistics
    const latestLiteracy = literacyData[literacyData.length - 1];
    const totalSchools = educationInfrastructure.reduce((sum, p) => sum + p.schools, 0);
    const latestPopulation = populationData[populationData.length - 1];
    const totalGDP = gdpByProvince.reduce((sum, p) => sum + p.gdp, 0);
    const latestEconomic = economicIndicators[economicIndicators.length - 1];
    const latestElection = electionData[electionData.length - 1];
    const latestPartyPerformance = partyPerformanceHistory[partyPerformanceHistory.length - 1];
    const latestTurnout = voterTurnout[voterTurnout.length - 1];

    return (
      <div 
        ref={ref} 
        className={cn(
          "printable-dashboard bg-background text-foreground p-6",
          isUrdu && "direction-rtl",
          className
        )}
      >
        {/* ========== COVER PAGE ========== */}
        <header className="print-header mb-8 pb-6 border-b-2 border-primary text-center">
          <h1 className={cn(
            "text-4xl font-display font-bold text-primary mb-2",
            isUrdu && "font-urdu"
          )}>
            {isUrdu ? "پاکستان ڈیٹا اٹلس" : "Pakistan Data Atlas"}
          </h1>
          <p className={cn(
            "text-xl text-muted-foreground mb-4",
            isUrdu && "font-urdu"
          )}>
            {isUrdu ? "جامع ڈیٹا رپورٹ" : "Comprehensive Data Report"}
          </p>
          <p className="text-sm text-muted-foreground">
            {isUrdu ? `رپورٹ کی تاریخ: ${currentDate}` : `Report Generated: ${currentDate}`}
          </p>
        </header>

        {/* Table of Contents */}
        <nav className="print-toc mb-8 p-4 bg-muted/20 rounded-lg border border-border">
          <h2 className={cn(
            "text-lg font-display font-bold text-foreground mb-4 pb-2 border-b border-border flex items-center gap-2",
            isUrdu && "font-urdu text-right flex-row-reverse"
          )}>
            <FileText className="w-5 h-5 text-primary" />
            {isUrdu ? "فہرست مضامین" : "Table of Contents"}
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <a 
              href="#section-education" 
              className="toc-item flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted/30 transition-colors group"
            >
              <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <GraduationCap className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1">
                <span className={cn("font-semibold text-foreground block", isUrdu && "font-urdu text-right")}>
                  {isUrdu ? "تعلیم" : "Education"}
                </span>
                <span className="text-xs text-muted-foreground">
                  {isUrdu ? "خواندگی، اسکول، انفراسٹرکچر" : "Literacy, Schools, Infrastructure"}
                </span>
              </div>
              <span className="text-xs text-muted-foreground">→</span>
            </a>
            <a 
              href="#section-elections" 
              className="toc-item flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted/30 transition-colors group"
            >
              <div className="w-8 h-8 rounded-md bg-data-blue/10 flex items-center justify-center group-hover:bg-data-blue/20 transition-colors">
                <Vote className="w-4 h-4 text-data-blue" />
              </div>
              <div className="flex-1">
                <span className={cn("font-semibold text-foreground block", isUrdu && "font-urdu text-right")}>
                  {isUrdu ? "انتخابات" : "Elections"}
                </span>
                <span className="text-xs text-muted-foreground">
                  {isUrdu ? "تاریخ، پارٹیاں، ٹرن آؤٹ" : "History, Parties, Turnout"}
                </span>
              </div>
              <span className="text-xs text-muted-foreground">→</span>
            </a>
            <a 
              href="#section-population" 
              className="toc-item flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted/30 transition-colors group"
            >
              <div className="w-8 h-8 rounded-md bg-data-amber/10 flex items-center justify-center group-hover:bg-data-amber/20 transition-colors">
                <Users className="w-4 h-4 text-data-amber" />
              </div>
              <div className="flex-1">
                <span className={cn("font-semibold text-foreground block", isUrdu && "font-urdu text-right")}>
                  {isUrdu ? "آبادی" : "Population"}
                </span>
                <span className="text-xs text-muted-foreground">
                  {isUrdu ? "مردم شماری، عمر، شہری کاری" : "Census, Demographics, Urbanization"}
                </span>
              </div>
              <span className="text-xs text-muted-foreground">→</span>
            </a>
            <a 
              href="#section-economy" 
              className="toc-item flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted/30 transition-colors group"
            >
              <div className="w-8 h-8 rounded-md bg-data-coral/10 flex items-center justify-center group-hover:bg-data-coral/20 transition-colors">
                <Banknote className="w-4 h-4 text-data-coral" />
              </div>
              <div className="flex-1">
                <span className={cn("font-semibold text-foreground block", isUrdu && "font-urdu text-right")}>
                  {isUrdu ? "معیشت" : "Economy"}
                </span>
                <span className="text-xs text-muted-foreground">
                  {isUrdu ? "جی ڈی پی، افراط زر، روزگار" : "GDP, Inflation, Employment"}
                </span>
              </div>
              <span className="text-xs text-muted-foreground">→</span>
            </a>
          </div>
        </nav>

        {/* Executive Summary */}
        <section className="print-section mb-8 p-4 bg-muted/30 rounded-lg border border-border">
          <h2 className={cn(
            "text-lg font-display font-bold text-foreground mb-4 pb-2 border-b border-border",
            isUrdu && "font-urdu text-right"
          )}>
            {isUrdu ? "اہم خلاصہ" : "Executive Summary"}
          </h2>
          <div className="grid grid-cols-4 gap-3">
            <PrintableStat
              value={`${latestPopulation.population}M`}
              label={isUrdu ? "آبادی (2023)" : "Population (2023)"}
              icon={<Users className="w-4 h-4" />}
              color="text-data-blue"
            />
            <PrintableStat
              value={`${latestLiteracy.overall}%`}
              label={isUrdu ? "شرح خواندگی" : "Literacy Rate"}
              icon={<GraduationCap className="w-4 h-4" />}
              color="text-primary"
            />
            <PrintableStat
              value={`$${keyStatistics.gdpBillion}B`}
              label={isUrdu ? "کل جی ڈی پی" : "Total GDP"}
              icon={<Banknote className="w-4 h-4" />}
              color="text-data-amber"
            />
            <PrintableStat
              value={`${latestPopulation.urbanPercent}%`}
              label={isUrdu ? "شہری آبادی" : "Urban Population"}
              icon={<Building2 className="w-4 h-4" />}
              color="text-data-coral"
            />
          </div>
        </section>

        {/* ========== EDUCATION SECTION ========== */}
        <section id="section-education" className="print-section mb-8 page-break-before">
          <div className="flex items-center gap-2 mb-4 pb-2 border-b-2 border-primary">
            <GraduationCap className="w-6 h-6 text-primary" />
            <h2 className={cn(
              "text-xl font-display font-bold text-primary",
              isUrdu && "font-urdu"
            )}>
              {isUrdu ? "تعلیم" : "Education"}
            </h2>
          </div>

          {/* Education Stats */}
          <div className="grid grid-cols-4 gap-3 mb-4">
            <PrintableStat
              value={`${latestLiteracy.overall}%`}
              label="Overall Literacy"
              icon={<BookOpen className="w-4 h-4" />}
            />
            <PrintableStat
              value={`${latestLiteracy.male}%`}
              label="Male Literacy"
              icon={<Users className="w-4 h-4" />}
            />
            <PrintableStat
              value={`${latestLiteracy.female}%`}
              label="Female Literacy"
              icon={<Users className="w-4 h-4" />}
            />
            <PrintableStat
              value={totalSchools.toLocaleString()}
              label="Total Schools"
              icon={<School className="w-4 h-4" />}
            />
          </div>

          {/* Provincial Literacy Table */}
          <h3 className="text-sm font-semibold mb-2">Provincial Literacy Rates</h3>
          <table className="print-table w-full border-collapse text-xs mb-4">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left p-2 border border-border">Province</th>
                <th className="text-center p-2 border border-border">Male %</th>
                <th className="text-center p-2 border border-border">Female %</th>
                <th className="text-center p-2 border border-border">Overall %</th>
              </tr>
            </thead>
            <tbody>
              {provincialLiteracy.map((row, index) => (
                <tr key={row.province} className={index % 2 === 1 ? "bg-muted/20" : ""}>
                  <td className="p-2 border border-border font-medium">{row.province}</td>
                  <td className="p-2 border border-border text-center">{row.male}</td>
                  <td className="p-2 border border-border text-center">{row.female}</td>
                  <td className="p-2 border border-border text-center font-semibold">{row.overall}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Infrastructure Table */}
          <h3 className="text-sm font-semibold mb-2">Educational Infrastructure</h3>
          <table className="print-table w-full border-collapse text-xs">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left p-2 border border-border">Province</th>
                <th className="text-center p-2 border border-border">Schools</th>
                <th className="text-center p-2 border border-border">Colleges</th>
                <th className="text-center p-2 border border-border">Universities</th>
              </tr>
            </thead>
            <tbody>
              {educationInfrastructure.map((row, index) => (
                <tr key={row.province} className={index % 2 === 1 ? "bg-muted/20" : ""}>
                  <td className="p-2 border border-border font-medium">{row.province}</td>
                  <td className="p-2 border border-border text-center">{row.schools.toLocaleString()}</td>
                  <td className="p-2 border border-border text-center">{row.colleges.toLocaleString()}</td>
                  <td className="p-2 border border-border text-center">{row.universities}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>