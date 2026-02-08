import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { StatCard } from "@/components/StatCard";
import { LiteracyChart } from "@/components/charts/LiteracyChart";
import { ProvincialLiteracyChart } from "@/components/charts/ProvincialLiteracyChart";
import { EnrollmentTrendChart } from "@/components/charts/EnrollmentTrendChart";
import { Button } from "@/components/ui/button";
import { ProvinceFilterProvider } from "@/contexts/ProvinceFilterContext";
import { TimeFilterProvider } from "@/contexts/TimeFilterContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { DashboardSkeleton } from "@/components/skeletons/DashboardSkeleton";
import { usePageLoading } from "@/hooks/usePageLoading";
import { DomainPrintButton } from "@/components/print/DomainPrintButton";
import { 
  GraduationCap, 
  BookOpen, 
  School, 
  Users,
  TrendingUp,
  Download,
  Filter
} from "lucide-react";
import { educationInfrastructure } from "@/data/pakistanData";

const EducationContent = () => {
  const { t, isUrdu } = useLanguage();
  const isLoading = usePageLoading(1000);
  
  if (isLoading) {
    return (
      <>
        <Navigation />
        <DashboardSkeleton showTable chartCount={3} tableRows={6} />
        <Footer />
      </>
    );
  }
  
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header */}
      <section className="pt-24 pb-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className={`flex flex-col md:flex-row md:items-end justify-between gap-6 ${isUrdu ? 'md:flex-row-reverse' : ''}`}>
            <div className={isUrdu ? 'text-right' : ''}>
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 ${isUrdu ? 'flex-row-reverse font-urdu' : ''}`}>
                <GraduationCap className="w-4 h-4" />
                {t("education.badge")}
              </div>
              <h1 className={`font-display text-4xl md:text-5xl font-bold text-foreground mb-2 ${isUrdu ? 'font-urdu' : ''}`}>
                {t("education.title")}
              </h1>
              <p className={`text-lg text-muted-foreground max-w-2xl ${isUrdu ? 'font-urdu' : ''}`}>
                {t("education.description")}
              </p>
            </div>
            <div className={`flex gap-3 ${isUrdu ? 'flex-row-reverse' : ''}`}>
              <Button variant="data" size="lg" className={`gap-2 ${isUrdu ? 'flex-row-reverse font-urdu' : ''}`}>
                <Filter className="w-4 h-4" />
                {t("education.filterData")}
              </Button>
              <DomainPrintButton domain="education" />
              <Button variant="default" size="lg" className={`gap-2 ${isUrdu ? 'flex-row-reverse font-urdu' : ''}`}>
                <Download className="w-4 h-4" />
                {t("education.export")}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="py-8 border-b border-border">
        <div className="container mx-auto px-4">
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 ${isUrdu ? 'direction-rtl' : ''}`}>
            <StatCard
              value={62.8}
              suffix="%"
              label={t("education.overallLiteracy")}
              icon={<BookOpen className="w-5 h-5" />}
              trend={{ value: 3.8, isPositive: true }}
              delay={0}
            />
            <StatCard
              value={72.5}
              suffix="%"
              label={t("education.maleLiteracy")}
              icon={<Users className="w-5 h-5" />}
              delay={100}
            />
            <StatCard
              value={52.7}
              suffix="%"
              label={t("education.femaleLiteracy")}
              icon={<Users className="w-5 h-5" />}
              trend={{ value: 4.7, isPositive: true }}
              delay={200}
            />
            <StatCard
              value={19.8}
              suffix="%"
              label={t("education.genderGap")}
              icon={<TrendingUp className="w-5 h-5" />}
              trend={{ value: 1.2, isPositive: false }}
              delay={300}
            />
          </div>
        </div>
      </section>

      {/* Main Charts */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <LiteracyChart />
            <ProvincialLiteracyChart />
          </div>
          <EnrollmentTrendChart />
        </div>
      </section>

      {/* Infrastructure Table */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className={`mb-8 ${isUrdu ? 'text-right' : ''}`}>
            <h2 className={`font-display text-2xl font-bold text-foreground mb-2 ${isUrdu ? 'font-urdu' : ''}`}>
              {t("education.infrastructureTitle")}
            </h2>
            <p className={`text-muted-foreground ${isUrdu ? 'font-urdu' : ''}`}>
              {t("education.infrastructureDesc")}
            </p>
          </div>

          <div className="bg-card rounded-xl border border-border overflow-hidden shadow-card">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/50 border-b border-border">
                    <th className={`p-4 font-display font-semibold text-foreground ${isUrdu ? 'text-right font-urdu' : 'text-left'}`}>
                      {t("education.province")}
                    </th>
                    <th className={`p-4 font-display font-semibold text-foreground ${isUrdu ? 'text-left font-urdu' : 'text-right'}`}>
                      {t("education.schools")}
                    </th>
                    <th className={`p-4 font-display font-semibold text-foreground ${isUrdu ? 'text-left font-urdu' : 'text-right'}`}>
                      {t("education.colleges")}
                    </th>
                    <th className={`p-4 font-display font-semibold text-foreground ${isUrdu ? 'text-left font-urdu' : 'text-right'}`}>
                      {t("education.universities")}
                    </th>
                    <th className={`p-4 font-display font-semibold text-foreground ${isUrdu ? 'text-left font-urdu' : 'text-right'}`}>
                      {t("education.studentTeacher")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {educationInfrastructure.map((row, index) => (
                    <tr 
                      key={row.province} 
                      className="border-b border-border/50 hover:bg-muted/30 transition-colors"
                    >
                      <td className={`p-4 font-medium text-foreground ${isUrdu ? 'text-right' : ''}`}>{row.province}</td>
                      <td className={`p-4 text-muted-foreground ${isUrdu ? 'text-left' : 'text-right'}`}>
                        {row.schools.toLocaleString()}
                      </td>
                      <td className={`p-4 text-muted-foreground ${isUrdu ? 'text-left' : 'text-right'}`}>
                        {row.colleges.toLocaleString()}
                      </td>
                      <td className={`p-4 text-muted-foreground ${isUrdu ? 'text-left' : 'text-right'}`}>{row.universities}</td>
                      <td className={`p-4 ${isUrdu ? 'text-left' : 'text-right'}`}>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-sm font-medium ${
                          row.studentTeacherRatio > 40 
                            ? "bg-destructive/10 text-destructive" 
                            : row.studentTeacherRatio > 35 
                            ? "bg-accent/10 text-accent" 
                            : "bg-primary/10 text-primary"
                        }`}>
                          {row.studentTeacherRatio}:1
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Insight Box */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8">
            <div className={`flex items-start gap-4 ${isUrdu ? 'flex-row-reverse' : ''}`}>
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
                <School className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className={isUrdu ? 'text-right' : ''}>
                <h3 className={`font-display text-xl font-bold text-foreground mb-2 ${isUrdu ? 'font-urdu' : ''}`}>
                  {t("education.insightTitle")}
                </h3>
                <p className={`text-muted-foreground mb-4 ${isUrdu ? 'font-urdu' : ''}`}>
                  {t("education.insightDesc")}
                </p>
                <p className={`text-sm text-primary font-medium ${isUrdu ? 'font-urdu' : ''}`}>
                  {t("education.insightCta")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

const Education = () => {
  return (
    <TimeFilterProvider>
      <ProvinceFilterProvider>
        <EducationContent />
      </ProvinceFilterProvider>
    </TimeFilterProvider>
  );
};

export default Education;
