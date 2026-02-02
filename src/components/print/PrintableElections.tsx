import { forwardRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { 
  Vote, 
  Users,
  Calendar,
  TrendingUp
} from "lucide-react";
import { electionData, voterTurnout, partyPerformanceHistory, provincialSeats } from "@/data/pakistanData";

interface PrintableStatProps {
  value: string | number;
  label: string;
  icon: React.ReactNode;
  trend?: { value: number; isPositive: boolean };
}

const PrintableStat = ({ value, label, icon, trend }: PrintableStatProps) => (
  <div className="print-stat-card p-4 border border-border rounded-lg bg-card">
    <div className="flex items-center gap-3 mb-2">
      <div className="w-8 h-8 rounded-md bg-data-blue/10 flex items-center justify-center text-data-blue">
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
        {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}% vs previous
      </span>
    )}
  </div>
);

interface PrintableElectionsProps {
  className?: string;
}

export const PrintableElections = forwardRef<HTMLDivElement, PrintableElectionsProps>(
  ({ className }, ref) => {
    const { t, isUrdu } = useLanguage();
    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const totalElections = electionData.length;
    const avgTurnout = (voterTurnout.reduce((sum, d) => sum + d.turnout, 0) / voterTurnout.length).toFixed(1);
    const latestElection = electionData[electionData.length - 1];
    const latestSeats = provincialSeats[provincialSeats.length - 1];
    const totalSeats = latestSeats.Punjab + latestSeats.Sindh + latestSeats.KPK + latestSeats.Balochistan;

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
        <header className="print-header mb-8 pb-6 border-b-2 border-data-blue">
          <div className={cn("flex items-center justify-between", isUrdu && "flex-row-reverse")}>
            <div className={cn(isUrdu && "text-right")}>
              <div className="flex items-center gap-2 mb-2">
                <Vote className="w-6 h-6 text-data-blue" />
                <span className="text-sm font-medium text-data-blue uppercase tracking-wide">Elections Dashboard</span>
              </div>
              <h1 className={cn(
                "text-3xl font-display font-bold text-foreground mb-1",
                isUrdu && "font-urdu"
              )}>
                {t("elections.title")}
              </h1>
              <p className={cn("text-muted-foreground", isUrdu && "font-urdu")}>
                Historical analysis of National Assembly elections (1970-2024)
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
            Electoral Overview
          </h2>
          
          <div className="grid grid-cols-4 gap-4">
            <PrintableStat
              value={totalElections}
              label="National Elections"
              icon={<Calendar className="w-4 h-4" />}
            />
            <PrintableStat
              value={totalSeats}
              label="NA Constituencies (2024)"
              icon={<Vote className="w-4 h-4" />}
            />
            <PrintableStat
              value={`${avgTurnout}%`}
              label="Average Voter Turnout"
              icon={<Users className="w-4 h-4" />}
            />
            <PrintableStat
              value={latestElection.party}
              label="2024 Winner"
              icon={<TrendingUp className="w-4 h-4" />}
            />
          </div>
        </section>

        {/* Election Results History */}
        <section className="print-section mb-8">
          <h2 className={cn(
            "text-xl font-display font-bold text-foreground mb-4 pb-2 border-b border-border",
            isUrdu && "font-urdu text-right"
          )}>
            Election Results History
          </h2>
          
          <table className="print-table w-full border-collapse">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left p-3 border border-border font-semibold">Year</th>
                <th className="text-center p-3 border border-border font-semibold">Winning Party</th>
                <th className="text-center p-3 border border-border font-semibold">Seats Won</th>
                <th className="text-center p-3 border border-border font-semibold">Vote Share %</th>
                <th className="text-center p-3 border border-border font-semibold">Turnout %</th>
              </tr>
            </thead>
            <tbody>
              {electionData.map((row, index) => {
                const turnoutData = voterTurnout.find(t => t.year === row.year);
                return (
                  <tr key={row.year} className={index % 2 === 1 ? "bg-muted/20" : ""}>
                    <td className="p-3 border border-border font-medium">{row.year}</td>
                    <td className="p-3 border border-border text-center font-semibold">{row.party}</td>
                    <td className="p-3 border border-border text-center">{row.seats}</td>
                    <td className="p-3 border border-border text-center">{row.votes}%</td>
                    <td className="p-3 border border-border text-center">
                      {turnoutData ? `${turnoutData.turnout}%` : '-'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>

        {/* Party Performance */}
        <section className="print-section mb-8 page-break-before">
          <h2 className={cn(
            "text-xl font-display font-bold text-foreground mb-4 pb-2 border-b border-border",
            isUrdu && "font-urdu text-right"
          )}>
            Party-wise Seat Distribution
          </h2>
          
          <table className="print-table w-full border-collapse">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left p-3 border border-border font-semibold">Year</th>
                <th className="text-center p-3 border border-border font-semibold">PPP</th>
                <th className="text-center p-3 border border-border font-semibold">PML-N</th>
                <th className="text-center p-3 border border-border font-semibold">PTI</th>
                <th className="text-center p-3 border border-border font-semibold">Others</th>
              </tr>
            </thead>
            <tbody>
              {partyPerformanceHistory.map((row, index) => (
                <tr key={row.year} className={index % 2 === 1 ? "bg-muted/20" : ""}>
                  <td className="p-3 border border-border font-medium">{row.year}</td>
                  <td className="p-3 border border-border text-center" style={{ color: 'hsl(220, 70%, 50%)' }}>
                    {row.PPP}
                  </td>
                  <td className="p-3 border border-border text-center" style={{ color: 'hsl(150, 60%, 35%)' }}>
                    {row["PML-N"]}
                  </td>
                  <td className="p-3 border border-border text-center" style={{ color: 'hsl(10, 80%, 55%)' }}>
                    {row.PTI}
                  </td>
                  <td className="p-3 border border-border text-center text-muted-foreground">
                    {row.Others}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Provincial Seat Distribution */}
        <section className="print-section mb-8">
          <h2 className={cn(
            "text-xl font-display font-bold text-foreground mb-4 pb-2 border-b border-border",
            isUrdu && "font-urdu text-right"
          )}>
            Provincial NA Seat Distribution
          </h2>
          
          <table className="print-table w-full border-collapse">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left p-3 border border-border font-semibold">Year</th>
                <th className="text-center p-3 border border-border font-semibold">Punjab</th>
                <th className="text-center p-3 border border-border font-semibold">Sindh</th>
                <th className="text-center p-3 border border-border font-semibold">KPK</th>
                <th className="text-center p-3 border border-border font-semibold">Balochistan</th>
                <th className="text-center p-3 border border-border font-semibold">Total</th>
              </tr>
            </thead>
            <tbody>
              {provincialSeats.map((row, index) => (
                <tr key={row.year} className={index % 2 === 1 ? "bg-muted/20" : ""}>
                  <td className="p-3 border border-border font-medium">{row.year}</td>
                  <td className="p-3 border border-border text-center">{row.Punjab}</td>
                  <td className="p-3 border border-border text-center">{row.Sindh}</td>
                  <td className="p-3 border border-border text-center">{row.KPK}</td>
                  <td className="p-3 border border-border text-center">{row.Balochistan}</td>
                  <td className="p-3 border border-border text-center font-semibold">
                    {row.Punjab + row.Sindh + row.KPK + row.Balochistan}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Voter Turnout Trends */}
        <section className="print-section mb-8">
          <h2 className={cn(
            "text-xl font-display font-bold text-foreground mb-4 pb-2 border-b border-border",
            isUrdu && "font-urdu text-right"
          )}>
            Voter Turnout History
          </h2>
          
          <div className="grid grid-cols-6 gap-3">
            {voterTurnout.map((data) => (
              <div 
                key={data.year} 
                className="p-3 border border-border rounded-lg text-center bg-card"
              >
                <p className="text-sm font-medium text-muted-foreground">{data.year}</p>
                <p className={cn(
                  "text-lg font-bold",
                  data.turnout >= 55 ? "text-primary" : 
                  data.turnout >= 45 ? "text-accent" : "text-destructive"
                )}>
                  {data.turnout}%
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="print-footer mt-8 pt-4 border-t border-border text-center text-sm text-muted-foreground">
          <p>Pakistan Data Atlas • Elections Dashboard</p>
          <p className="mt-1">Data Sources: Election Commission of Pakistan • Generated on {currentDate}</p>
        </footer>
      </div>
    );
  }
);

PrintableElections.displayName = "PrintableElections";
