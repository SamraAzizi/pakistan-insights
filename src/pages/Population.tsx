import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { StatCard } from "@/components/StatCard";
import { Button } from "@/components/ui/button";
import { ProvinceFilterProvider } from "@/contexts/ProvinceFilterContext";
import { TimeFilterProvider } from "@/contexts/TimeFilterContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { DashboardSkeleton } from "@/components/skeletons/DashboardSkeleton";
import { usePageLoading } from "@/hooks/usePageLoading";
import { DomainPrintButton } from "@/components/print/DomainPrintButton";
import { 
  Users, 
  TrendingUp,
  Download,
  Filter,
  Building,
  Baby
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import { populationData, ageDistribution } from "@/data/pakistanData";

// Translate age group labels
const getTranslatedAgeData = (t: (key: string) => string) => {
  return ageDistribution.map(item => ({
    ...item,
    ageGroup: t(`population.age${item.ageGroup}`)
  }));
};

const PopulationContent = () => {
  const { t, isUrdu } = useLanguage();
  const translatedAgeData = getTranslatedAgeData(t);
  const isLoading = usePageLoading(1000);
  
  if (isLoading) {
    return (
      <>
        <Navigation />
        <DashboardSkeleton showInsightBox chartCount={3} />
        <Footer />
      </>
    );
  }
  
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header */}
      <section className="pt-24 pb-12 bg-accent/5">
        <div className="container mx-auto px-4">
          <div className={`flex flex-col md:flex-row md:items-end justify-between gap-6 ${isUrdu ? 'md:flex-row-reverse text-right' : ''}`}>
            <div>
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4 ${isUrdu ? 'flex-row-reverse' : ''}`}>
                <Users className="w-4 h-4" />
                {t("population.badge")}
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-2">
                {t("population.title")}
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                {t("population.description")}
              </p>
            </div>
            <div className={`flex gap-3 ${isUrdu ? 'flex-row-reverse' : ''}`}>
              <Button variant="data" size="lg" className={`gap-2 ${isUrdu ? 'flex-row-reverse' : ''}`}>
                <Filter className="w-4 h-4" />
                {t("population.filterData")}
              </Button>
              <DomainPrintButton domain="population" />
              <Button variant="default" size="lg" className={`gap-2 ${isUrdu ? 'flex-row-reverse' : ''}`}>
                <Download className="w-4 h-4" />
                {t("population.export")}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="py-8 border-b border-border">
        <div className="container mx-auto px-4">
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 ${isUrdu ? 'text-right' : ''}`}>
            <StatCard
              value={241.5}
              suffix="M"
              label={t("population.totalPopulation")}
              icon={<Users className="w-5 h-5" />}
              trend={{ value: 2.1, isPositive: true }}
              index={0}
            />
            <StatCard
              value={38.8}
              suffix="%"
              label={t("population.urbanPopulation")}
              icon={<Building className="w-5 h-5" />}
              trend={{ value: 2.4, isPositive: true }}
              index={1}
            />
            <StatCard
              value={55.3}
              suffix="%"
              label={t("population.youth")}
              icon={<Baby className="w-5 h-5" />}
              index={2}
            />
            <StatCard
              value={7.2}
              suffix="x"
              label={t("population.growthSince")}
              icon={<TrendingUp className="w-5 h-5" />}
              index={3}
            />
          </div>
        </div>
      </section>

      {/* Charts */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Population Growth */}
            <div className="p-6 bg-card rounded-xl border border-border shadow-card">
              <div className={`mb-6 ${isUrdu ? 'text-right' : ''}`}>
                <h3 className="font-display text-xl font-bold text-foreground">
                  {t("population.populationGrowth")}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t("population.populationGrowthDesc")}
                </p>
              </div>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={populationData}>
                    <defs>
                      <linearGradient id="colorPop" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(38, 92%, 50%)" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(38, 92%, 50%)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(40, 20%, 88%)" />
                    <XAxis
                      dataKey="year"
                      stroke="hsl(40, 10%, 40%)"
                      fontSize={12}
                      tickLine={false}
                    />
                    <YAxis
                      stroke="hsl(40, 10%, 40%)"
                      fontSize={12}
                      tickLine={false}
                      tickFormatter={(value) => `${value}M`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(0, 0%, 100%)",
                        border: "1px solid hsl(40, 20%, 88%)",
                        borderRadius: "8px",
                        textAlign: isUrdu ? "right" : "left",
                        direction: isUrdu ? "rtl" : "ltr",
                      }}
                      formatter={(value: number) => [`${value}${t("population.million")}`, t("population.population")]}
                      labelFormatter={(label) => `${label}`}
                    />
                    <Area
                      type="monotone"
                      dataKey="population"
                      stroke="hsl(38, 92%, 50%)"
                      strokeWidth={3}
                      fill="url(#colorPop)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Age Distribution */}
            <div className="p-6 bg-card rounded-xl border border-border shadow-card">
              <div className={`mb-6 ${isUrdu ? 'text-right' : ''}`}>
                <h3 className="font-display text-xl font-bold text-foreground">
                  {t("population.ageDistribution")}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t("population.ageDistributionDesc")}
                </p>
              </div>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={translatedAgeData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(40, 20%, 88%)" />
                    <XAxis
                      type="number"
                      stroke="hsl(40, 10%, 40%)"
                      fontSize={12}
                      tickLine={false}
                      tickFormatter={(value) => `${value}%`}
                      reversed={isUrdu}
                    />
                    <YAxis
                      type="category"
                      dataKey="ageGroup"
                      stroke="hsl(40, 10%, 40%)"
                      fontSize={12}
                      tickLine={false}
                      width={60}
                      orientation={isUrdu ? "right" : "left"}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(0, 0%, 100%)",
                        border: "1px solid hsl(40, 20%, 88%)",
                        borderRadius: "8px",
                        textAlign: isUrdu ? "right" : "left",
                        direction: isUrdu ? "rtl" : "ltr",
                      }}
                      formatter={(value: number, name: string) => [
                        `${value}%`, 
                        name === "male" ? t("population.male") : t("population.female")
                      ]}
                      labelFormatter={(label) => `${label} ${t("population.years")}`}
                    />
                    <Legend 
                      layout="horizontal"
                      align={isUrdu ? "right" : "left"}
                      wrapperStyle={{ direction: isUrdu ? "rtl" : "ltr" }}
                    />
                    <Bar dataKey="male" name={t("population.male")} fill="hsl(220, 70%, 50%)" radius={[0, 4, 4, 0]} />
                    <Bar dataKey="female" name={t("population.female")} fill="hsl(38, 92%, 50%)" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Urbanization Trend */}
          <div className="p-6 bg-card rounded-xl border border-border shadow-card">
            <div className={`mb-6 ${isUrdu ? 'text-right' : ''}`}>
              <h3 className="font-display text-xl font-bold text-foreground">
                {t("population.urbanizationTrend")}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t("population.urbanizationTrendDesc")}
              </p>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={populationData}>
                  <defs>
                    <linearGradient id="colorUrban" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(150, 98%, 13%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(150, 98%, 13%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(40, 20%, 88%)" />
                  <XAxis
                    dataKey="year"
                    stroke="hsl(40, 10%, 40%)"
                    fontSize={12}
                    tickLine={false}
                  />
                  <YAxis
                    stroke="hsl(40, 10%, 40%)"
                    fontSize={12}
                    tickLine={false}
                    domain={[0, 50]}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(0, 0%, 100%)",
                      border: "1px solid hsl(40, 20%, 88%)",
                      borderRadius: "8px",
                      textAlign: isUrdu ? "right" : "left",
                      direction: isUrdu ? "rtl" : "ltr",
                    }}
                    formatter={(value: number) => [`${value}%`, t("population.urban")]}
                    labelFormatter={(label) => `${label}`}
                  />
                  <Area
                    type="monotone"
                    dataKey="urbanPercent"
                    stroke="hsl(150, 98%, 13%)"
                    strokeWidth={3}
                    fill="url(#colorUrban)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      {/* Insight Box */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="bg-accent/5 border border-accent/20 rounded-2xl p-8">
            <div className={`flex items-start gap-4 ${isUrdu ? 'flex-row-reverse text-right' : ''}`}>
              <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center flex-shrink-0">
                <Baby className="w-6 h-6 text-accent-foreground" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-foreground mb-2">
                  {t("population.insightTitle")}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {t("population.insightDesc")}
                </p>
                <p className="text-sm text-accent font-medium">
                  {t("population.insightCta")}
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

const Population = () => {
  return (
    <TimeFilterProvider>
      <ProvinceFilterProvider>
        <PopulationContent />
      </ProvinceFilterProvider>
    </TimeFilterProvider>
  );
};

export default Population;