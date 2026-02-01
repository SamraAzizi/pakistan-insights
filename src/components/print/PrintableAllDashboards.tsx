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

        {/* ========== ELECTIONS SECTION ========== */}
        <section id="section-elections" className="print-section mb-8 page-break-before">
          <div className="flex items-center gap-2 mb-4 pb-2 border-b-2 border-data-blue">
            <Vote className="w-6 h-6 text-data-blue" />
            <h2 className={cn(
              "text-xl font-display font-bold text-data-blue",
              isUrdu && "font-urdu"
            )}>
              {isUrdu ? "انتخابات" : "Elections"}
            </h2>
          </div>

          {/* Election Stats */}
          <div className="grid grid-cols-4 gap-3 mb-4">
            <PrintableStat
              value={electionData.length}
              label="Total Elections"
              icon={<Vote className="w-4 h-4" />}
              color="text-data-blue"
            />
            <PrintableStat
              value={latestElection.year}
              label="Latest Election"
              icon={<TrendingUp className="w-4 h-4" />}
              color="text-data-blue"
            />
            <PrintableStat
              value="272"
              label="NA Seats"
              icon={<Building2 className="w-4 h-4" />}
              color="text-data-blue"
            />
            <PrintableStat
              value={`${latestTurnout.turnout}%`}
              label="2024 Turnout"
              icon={<Users className="w-4 h-4" />}
              color="text-data-blue"
            />
          </div>

          {/* Election History Table */}
          <h3 className="text-sm font-semibold mb-2">National Assembly Elections History</h3>
          <table className="print-table w-full border-collapse text-xs mb-4">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-center p-2 border border-border">Year</th>
                <th className="text-center p-2 border border-border">Winning Party</th>
                <th className="text-center p-2 border border-border">Seats Won</th>
                <th className="text-center p-2 border border-border">Vote Share %</th>
              </tr>
            </thead>
            <tbody>
              {electionData.map((row, index) => (
                <tr key={row.year} className={index % 2 === 1 ? "bg-muted/20" : ""}>
                  <td className="p-2 border border-border text-center font-medium">{row.year}</td>
                  <td className="p-2 border border-border text-center font-semibold">{row.party}</td>
                  <td className="p-2 border border-border text-center">{row.seats}</td>
                  <td className="p-2 border border-border text-center">{row.votes}%</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Party Performance Table */}
          <h3 className="text-sm font-semibold mb-2">Party Seats Won (Last 5 Elections)</h3>
          <table className="print-table w-full border-collapse text-xs">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-center p-2 border border-border">Year</th>
                <th className="text-center p-2 border border-border">PPP</th>
                <th className="text-center p-2 border border-border">PML-N</th>
                <th className="text-center p-2 border border-border">PTI</th>
                <th className="text-center p-2 border border-border">Others</th>
              </tr>
            </thead>
            <tbody>
              {partyPerformanceHistory.slice(-5).map((row, index) => (
                <tr key={row.year} className={index % 2 === 1 ? "bg-muted/20" : ""}>
                  <td className="p-2 border border-border text-center font-medium">{row.year}</td>
                  <td className="p-2 border border-border text-center">{row.PPP}</td>
                  <td className="p-2 border border-border text-center">{row["PML-N"]}</td>
                  <td className="p-2 border border-border text-center">{row.PTI}</td>
                  <td className="p-2 border border-border text-center">{row.Others}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* ========== POPULATION SECTION ========== */}
        <section id="section-population" className="print-section mb-8 page-break-before">
          <div className="flex items-center gap-2 mb-4 pb-2 border-b-2 border-data-amber">
            <Users className="w-6 h-6 text-data-amber" />
            <h2 className={cn(
              "text-xl font-display font-bold text-data-amber",
              isUrdu && "font-urdu"
            )}>
              {isUrdu ? "آبادی" : "Population"}
            </h2>
          </div>

          {/* Population Stats */}
          <div className="grid grid-cols-4 gap-3 mb-4">
            <PrintableStat
              value={`${latestPopulation.population}M`}
              label="Total Population"
              icon={<Users className="w-4 h-4" />}
              color="text-data-amber"
            />
            <PrintableStat
              value={`${latestPopulation.urbanPercent}%`}
              label="Urban Population"
              icon={<Building2 className="w-4 h-4" />}
              color="text-data-amber"
            />
            <PrintableStat
              value={`${(100 - latestPopulation.urbanPercent).toFixed(1)}%`}
              label="Rural Population"
              icon={<MapPin className="w-4 h-4" />}
              color="text-data-amber"
            />
            <PrintableStat
              value="2.1%"
              label="Growth Rate"
              icon={<TrendingUp className="w-4 h-4" />}
              color="text-data-amber"
            />
          </div>

          {/* Population Trends Table */}
          <h3 className="text-sm font-semibold mb-2">Population Trends (Census Data)</h3>
          <table className="print-table w-full border-collapse text-xs mb-4">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-center p-2 border border-border">Year</th>
                <th className="text-center p-2 border border-border">Population (Millions)</th>
                <th className="text-center p-2 border border-border">Urban %</th>
                <th className="text-center p-2 border border-border">Rural %</th>
              </tr>
            </thead>
            <tbody>
              {populationData.map((row, index) => (
                <tr key={row.year} className={index % 2 === 1 ? "bg-muted/20" : ""}>
                  <td className="p-2 border border-border text-center font-medium">{row.year}</td>
                  <td className="p-2 border border-border text-center font-semibold">{row.population}</td>
                  <td className="p-2 border border-border text-center">{row.urbanPercent}%</td>
                  <td className="p-2 border border-border text-center">{(100 - row.urbanPercent).toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Age Distribution Table */}
          <h3 className="text-sm font-semibold mb-2">Age Distribution</h3>
          <table className="print-table w-full border-collapse text-xs">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left p-2 border border-border">Age Group</th>
                <th className="text-center p-2 border border-border">Male %</th>
                <th className="text-center p-2 border border-border">Female %</th>
                <th className="text-center p-2 border border-border">Total %</th>
              </tr>
            </thead>
            <tbody>
              {ageDistribution.map((row, index) => (
                <tr key={row.ageGroup} className={index % 2 === 1 ? "bg-muted/20" : ""}>
                  <td className="p-2 border border-border font-medium">{row.ageGroup}</td>
                  <td className="p-2 border border-border text-center">{row.male}</td>
                  <td className="p-2 border border-border text-center">{row.female}</td>
                  <td className="p-2 border border-border text-center font-semibold">
                    {((row.male + row.female) / 2).toFixed(1)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* ========== ECONOMY SECTION ========== */}
        <section id="section-economy" className="print-section mb-8 page-break-before">
          <div className="flex items-center gap-2 mb-4 pb-2 border-b-2 border-data-coral">
            <Banknote className="w-6 h-6 text-data-coral" />
            <h2 className={cn(
              "text-xl font-display font-bold text-data-coral",
              isUrdu && "font-urdu"
            )}>
              {isUrdu ? "معیشت" : "Economy"}
            </h2>
          </div>

          {/* Economy Stats */}
          <div className="grid grid-cols-4 gap-3 mb-4">
            <PrintableStat
              value={`$${keyStatistics.gdpBillion}B`}
              label="Total GDP"
              icon={<Banknote className="w-4 h-4" />}
              color="text-data-coral"
            />
            <PrintableStat
              value={`${latestEconomic.inflation}%`}
              label="Inflation Rate"
              icon={<TrendingUp className="w-4 h-4" />}
              color="text-data-coral"
            />
            <PrintableStat
              value={`${latestEconomic.gdpGrowth}%`}
              label="GDP Growth"
              icon={<Briefcase className="w-4 h-4" />}
              color="text-data-coral"
            />
            <PrintableStat
              value={`${latestEconomic.unemployment}%`}
              label="Unemployment"
              icon={<Users className="w-4 h-4" />}
              color="text-data-coral"
            />
          </div>

          {/* GDP by Province Table */}
          <h3 className="text-sm font-semibold mb-2">GDP Share by Province</h3>
          <table className="print-table w-full border-collapse text-xs mb-4">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left p-2 border border-border">Province</th>
                <th className="text-center p-2 border border-border">GDP Share %</th>
                <th className="text-center p-2 border border-border">Contribution</th>
              </tr>
            </thead>
            <tbody>
              {gdpByProvince.map((row, index) => (
                <tr key={row.province} className={index % 2 === 1 ? "bg-muted/20" : ""}>
                  <td className="p-2 border border-border font-medium">{row.province}</td>
                  <td className="p-2 border border-border text-center font-semibold">{row.gdp}%</td>
                  <td className="p-2 border border-border text-center">
                    ${((row.gdp / 100) * keyStatistics.gdpBillion).toFixed(1)}B
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Economic Indicators Table */}
          <h3 className="text-sm font-semibold mb-2">Economic Indicators (2015-2023)</h3>
          <table className="print-table w-full border-collapse text-xs">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-center p-2 border border-border">Year</th>
                <th className="text-center p-2 border border-border">GDP Growth %</th>
                <th className="text-center p-2 border border-border">Inflation %</th>
                <th className="text-center p-2 border border-border">Unemployment %</th>
              </tr>
            </thead>
            <tbody>
              {economicIndicators.map((row, index) => (
                <tr key={row.year} className={index % 2 === 1 ? "bg-muted/20" : ""}>
                  <td className="p-2 border border-border text-center font-medium">{row.year}</td>
                  <td className={cn(
                    "p-2 border border-border text-center",
                    row.gdpGrowth < 0 ? "text-destructive" : "text-primary"
                  )}>
                    {row.gdpGrowth}%
                  </td>
                  <td className={cn(
                    "p-2 border border-border text-center font-semibold",
                    row.inflation > 20 ? "text-destructive" : row.inflation > 10 ? "text-data-amber" : "text-primary"
                  )}>
                    {row.inflation}%
                  </td>
                  <td className="p-2 border border-border text-center">{row.unemployment}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* ========== FOOTER ========== */}
        <footer className="print-footer mt-8 pt-4 border-t border-border text-center text-xs text-muted-foreground">
          <p className="font-semibold">Pakistan Data Atlas • Comprehensive Report</p>
          <p className="mt-1">Data Sources: Pakistan Bureau of Statistics, Election Commission of Pakistan, World Bank, PBS Census</p>
          <p className="mt-1">Generated on {currentDate} • All data subject to official revision</p>
        </footer>
      </div>
    );
  }
);

PrintableAllDashboards.displayName = "PrintableAllDashboards";
