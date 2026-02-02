import { forwardRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { 
  GraduationCap, 
  BookOpen, 
  School, 
  Users,
  TrendingUp
} from "lucide-react";
import { literacyData, provincialLiteracy, educationInfrastructure, enrollmentTrends } from "@/data/pakistanData";

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

interface PrintableEducationProps {
  className?: string;
}

export const PrintableEducation = forwardRef<HTMLDivElement, PrintableEducationProps>(
  ({ className }, ref) => {
    const { t, isUrdu } = useLanguage();
    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const latestLiteracy = literacyData[literacyData.length - 1];
    const totalSchools = educationInfrastructure.reduce((sum, p) => sum + p.schools, 0);
    const totalColleges = educationInfrastructure.reduce((sum, p) => sum + p.colleges, 0);
    const totalUniversities = educationInfrastructure.reduce((sum, p) => sum + p.universities, 0);

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
              <div className="flex items-center gap-2 mb-2">
                <GraduationCap className="w-6 h-6 text-primary" />
                <span className="text-sm font-medium text-primary uppercase tracking-wide">Education Dashboard</span>
              </div>
              <h1 className={cn(
                "text-3xl font-display font-bold text-foreground mb-1",
                isUrdu && "font-urdu"
              )}>
                {t("education.title")}
              </h1>
              <p className={cn("text-muted-foreground", isUrdu && "font-urdu")}>
                Comprehensive analysis of literacy rates and educational infrastructure
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
            Key Education Indicators
          </h2>
          
          <div className="grid grid-cols-4 gap-4">
            <PrintableStat
              value={`${latestLiteracy.overall}%`}
              label="Overall Literacy Rate"
              icon={<BookOpen className="w-4 h-4" />}
              trend={{ value: 3.8, isPositive: true }}
            />
            <PrintableStat
              value={`${latestLiteracy.male}%`}
              label="Male Literacy Rate"
              icon={<Users className="w-4 h-4" />}
            />
            <PrintableStat
              value={`${latestLiteracy.female}%`}
              label="Female Literacy Rate"
              icon={<Users className="w-4 h-4" />}
              trend={{ value: 4.7, isPositive: true }}
            />
            <PrintableStat
              value={`${(latestLiteracy.male - latestLiteracy.female).toFixed(1)}%`}
              label="Gender Gap"
              icon={<TrendingUp className="w-4 h-4" />}
              trend={{ value: 1.2, isPositive: false }}
            />
          </div>
        </section>

        {/* Literacy Trend Table */}
        <section className="print-section mb-8">
          <h2 className={cn(
            "text-xl font-display font-bold text-foreground mb-4 pb-2 border-b border-border",
            isUrdu && "font-urdu text-right"
          )}>
            Historical Literacy Rates (1981-2023)
          </h2>
          
          <table className="print-table w-full border-collapse">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left p-3 border border-border font-semibold">Year</th>
                <th className="text-center p-3 border border-border font-semibold">Overall %</th>
                <th className="text-center p-3 border border-border font-semibold">Male %</th>
                <th className="text-center p-3 border border-border font-semibold">Female %</th>
                <th className="text-center p-3 border border-border font-semibold">Gender Gap</th>
              </tr>
            </thead>
            <tbody>
              {literacyData.map((row, index) => (
                <tr key={row.year} className={index % 2 === 1 ? "bg-muted/20" : ""}>
                  <td className="p-3 border border-border font-medium">{row.year}</td>
                  <td className="p-3 border border-border text-center font-semibold text-primary">{row.overall}</td>
                  <td className="p-3 border border-border text-center">{row.male}</td>
                  <td className="p-3 border border-border text-center">{row.female}</td>
                  <td className="p-3 border border-border text-center text-destructive">
                    {(row.male - row.female).toFixed(1)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Provincial Literacy Rates */}
        <section className="print-section mb-8">
          <h2 className={cn(
            "text-xl font-display font-bold text-foreground mb-4 pb-2 border-b border-border",
            isUrdu && "font-urdu text-right"
          )}>
            Provincial Literacy Comparison
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
              {provincialLiteracy.map((row, index) => (
                <tr key={row.province} className={index % 2 === 1 ? "bg-muted/20" : ""}>
                  <td className="p-3 border border-border font-medium">{row.province}</td>
                  <td className="p-3 border border-border text-center">{row.male}</td>
                  <td className="p-3 border border-border text-center">{row.female}</td>
                  <td className="p-3 border border-border text-center font-semibold">{row.overall}</td>
                  <td className={cn(
                    "p-3 border border-border text-center",
                    row.male - row.female > 25 ? "text-destructive" : "text-primary"
                  )}>
                    {(row.male - row.female).toFixed(1)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Educational Infrastructure */}
        <section className="print-section mb-8 page-break-before">
          <h2 className={cn(
            "text-xl font-display font-bold text-foreground mb-4 pb-2 border-b border-border",
            isUrdu && "font-urdu text-right"
          )}>
            Educational Infrastructure by Province
          </h2>
          
          <div className="grid grid-cols-4 gap-4 mb-6">
            <PrintableStat
              value={totalSchools.toLocaleString()}
              label="Total Schools"
              icon={<School className="w-4 h-4" />}
            />
            <PrintableStat
              value={totalColleges.toLocaleString()}
              label="Total Colleges"
              icon={<GraduationCap className="w-4 h-4" />}
            />
            <PrintableStat
              value={totalUniversities}
              label="Universities"
              icon={<GraduationCap className="w-4 h-4" />}
            />
            <PrintableStat
              value="35:1"
              label="Avg Student:Teacher"
              icon={<Users className="w-4 h-4" />}
            />
          </div>

          <table className="print-table w-full border-collapse">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left p-3 border border-border font-semibold">Province</th>
                <th className="text-center p-3 border border-border font-semibold">Schools</th>
                <th className="text-center p-3 border border-border font-semibold">Colleges</th>
                <th className="text-center p-3 border border-border font-semibold">Universities</th>
                <th className="text-center p-3 border border-border font-semibold">Student:Teacher</th>
              </tr>
            </thead>
            <tbody>
              {educationInfrastructure.map((row, index) => (
                <tr key={row.province} className={index % 2 === 1 ? "bg-muted/20" : ""}>
                  <td className="p-3 border border-border font-medium">{row.province}</td>
                  <td className="p-3 border border-border text-center">{row.schools.toLocaleString()}</td>
                  <td className="p-3 border border-border text-center">{row.colleges.toLocaleString()}</td>
                  <td className="p-3 border border-border text-center">{row.universities}</td>
                  <td className={cn(
                    "p-3 border border-border text-center font-medium",
                    row.studentTeacherRatio > 40 ? "text-destructive" : 
                    row.studentTeacherRatio > 35 ? "text-accent" : "text-primary"
                  )}>
                    {row.studentTeacherRatio}:1
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Enrollment Trends */}
        <section className="print-section mb-8">
          <h2 className={cn(
            "text-xl font-display font-bold text-foreground mb-4 pb-2 border-b border-border",
            isUrdu && "font-urdu text-right"
          )}>
            Enrollment Trends (Millions)
          </h2>
          
          <table className="print-table w-full border-collapse">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left p-3 border border-border font-semibold">Year</th>
                <th className="text-center p-3 border border-border font-semibold">Primary</th>
                <th className="text-center p-3 border border-border font-semibold">Secondary</th>
                <th className="text-center p-3 border border-border font-semibold">Higher Education</th>
              </tr>
            </thead>
            <tbody>
              {enrollmentTrends.map((row, index) => (
                <tr key={row.year} className={index % 2 === 1 ? "bg-muted/20" : ""}>
                  <td className="p-3 border border-border font-medium">{row.year}</td>
                  <td className="p-3 border border-border text-center">{row.primary}M</td>
                  <td className="p-3 border border-border text-center">{row.secondary}M</td>
                  <td className="p-3 border border-border text-center">{row.higher}M</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Footer */}
        <footer className="print-footer mt-8 pt-4 border-t border-border text-center text-sm text-muted-foreground">
          <p>Pakistan Data Atlas • Education Dashboard</p>
          <p className="mt-1">Data Sources: Pakistan Bureau of Statistics, UNESCO • Generated on {currentDate}</p>
        </footer>
      </div>
    );
  }
);

PrintableEducation.displayName = "PrintableEducation";
