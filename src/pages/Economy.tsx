import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { StatCard } from "@/components/StatCard";
import { GDPPieChart } from "@/components/charts/GDPPieChart";
import { Button } from "@/components/ui/button";
import { ProvinceFilterProvider } from "@/contexts/ProvinceFilterContext";
import { TimeFilterProvider } from "@/contexts/TimeFilterContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { DashboardSkeleton } from "@/components/skeletons/DashboardSkeleton";
import { usePageLoading } from "@/hooks/usePageLoading";
import { DomainPrintButton } from "@/components/print/DomainPrintButton";
import { 
  TrendingUp, 
  DollarSign,
  Download,
  Filter,
  AlertTriangle,
  BarChart3
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ComposedChart,
  Bar,
} from "recharts";
import { economicIndicators } from "@/data/pakistanData";

const EconomyContent = () => {
  const { t, isUrdu } = useLanguage();
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
      <section className="pt-24 pb-12 bg-data-coral/5">
        <div className="container mx-auto px-4">
          <div className={`flex flex-col md:flex-row md:items-end justify-between gap-6 ${isUrdu ? 'md:flex-row-reverse text-right' : ''}`}>
            <div>
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-data-coral/10 text-data-coral text-sm font-medium mb-4 ${isUrdu ? 'flex-row-reverse' : ''}`}>
                <TrendingUp className="w-4 h-4" />
                {t("economy.badge")}
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-2">
                {t("economy.title")}
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                {t("economy.description")}
              </p>
            </div>
            <div className={`flex gap-3 ${isUrdu ? 'flex-row-reverse' : ''}`}>
              <Button variant="data" size="lg" className={`gap-2 ${isUrdu ? 'flex-row-reverse' : ''}`}>
                <Filter className="w-4 h-4" />
                {t("economy.filterData")}
              </Button>
              <DomainPrintButton domain="economy" />
              <Button variant="default" size="lg" className={`gap-2 ${isUrdu ? 'flex-row-reverse' : ''}`}>
                <Download className="w-4 h-4" />
                {t("economy.export")}
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
              value={376.5}
              prefix="$"
              suffix="B"
              label={`${t("economy.gdp")} (2023)`}
              icon={<DollarSign className="w-5 h-5" />}
              delay={0}
            />
            <StatCard
              value={0.3}
              suffix="%"
              label={t("economy.gdpGrowth")}
              icon={<TrendingUp className="w-5 h-5" />}
              trend={{ value: 5.7, isPositive: false }}
              delay={100}
            />
            <StatCard
              value={29.2}
              suffix="%"
              label={t("economy.inflationRate")}
              icon={<AlertTriangle className="w-5 h-5" />}
              trend={{ value: 17.0, isPositive: false }}
              delay={200}
            />
            <StatCard
              value={8.5}
              suffix="%"
              label={t("economy.unemployment")}
              icon={<BarChart3 className="w-5 h-5" />}
              trend={{ value: 2.3, isPositive: false }}
              delay={300}
            />
          </div>
        </div>
      </section>

      {/* Charts */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* GDP & Inflation */}
            <div className="p-6 bg-card rounded-xl border border-border shadow-card">
              <div className={`mb-6 ${isUrdu ? 'text-right' : ''}`}>
                <h3 className="font-display text-xl font-bold text-foreground">
                  {t("economy.gdpVsInflation")}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t("economy.gdpVsInflationDesc")}
                </p>
              </div>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={economicIndicators}>
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
                      tickFormatter={(value) => `${value}%`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(0, 0%, 100%)",
                        border: "1px solid hsl(40, 20%, 88%)",
                        borderRadius: "8px",
                      }}
                      formatter={(value: number) => [`${value}%`, ""]}
                    />
                    <Legend />
                    <Bar
                      dataKey="gdpGrowth"
                      name={t("economy.gdpGrowth")}
                      fill="hsl(150, 60%, 35%)"
                      radius={[4, 4, 0, 0]}
                    />
                    <Line
                      type="monotone"
                      dataKey="inflation"
                      name={t("economy.inflation")}
                      stroke="hsl(10, 80%, 60%)"
                      strokeWidth={3}
                      dot={{ fill: "hsl(10, 80%, 60%)", strokeWidth: 2 }}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* GDP by Province */}
            <GDPPieChart />
          </div>

          {/* Unemployment Trend */}
          <div className="p-6 bg-card rounded-xl border border-border shadow-card">
            <div className={`mb-6 ${isUrdu ? 'text-right' : ''}`}>
              <h3 className="font-display text-xl font-bold text-foreground">
                {t("economy.keyIndicators")}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t("economy.keyIndicatorsDesc")}
              </p>
            </div>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={economicIndicators}>
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
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(0, 0%, 100%)",
                      border: "1px solid hsl(40, 20%, 88%)",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => [`${value}%`, ""]}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="gdpGrowth"
                    name={t("economy.gdpGrowth")}
                    stroke="hsl(150, 98%, 13%)"
                    strokeWidth={3}
                    dot={{ fill: "hsl(150, 98%, 13%)", strokeWidth: 2 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="inflation"
                    name={t("economy.inflation")}
                    stroke="hsl(10, 80%, 60%)"
                    strokeWidth={3}
                    dot={{ fill: "hsl(10, 80%, 60%)", strokeWidth: 2 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="unemployment"
                    name={t("economy.unemployment")}
                    stroke="hsl(220, 70%, 50%)"
                    strokeWidth={3}
                    dot={{ fill: "hsl(220, 70%, 50%)", strokeWidth: 2 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      {/* Alert Box */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="bg-destructive/5 border border-destructive/20 rounded-2xl p-8">
            <div className={`flex items-start gap-4 ${isUrdu ? 'flex-row-reverse text-right' : ''}`}>
              <div className="w-12 h-12 rounded-xl bg-destructive flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-6 h-6 text-destructive-foreground" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-foreground mb-2">
                  {t("economy.alertTitle")}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {t("economy.alertDesc")}
                </p>
                <p className="text-sm text-destructive font-medium">
                  {t("economy.alertContext")}
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

const Economy = () => {
  return (
    <TimeFilterProvider>
      <ProvinceFilterProvider>
        <EconomyContent />
      </ProvinceFilterProvider>
    </TimeFilterProvider>
  );
};

export default Economy;