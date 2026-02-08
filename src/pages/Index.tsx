import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { DataDomainCard } from "@/components/DataDomainCard";
import { StatCard } from "@/components/StatCard";
import { LiteracyChart } from "@/components/charts/LiteracyChart";
import { GDPPieChart } from "@/components/charts/GDPPieChart";
import { ProvincialLiteracyChart } from "@/components/charts/ProvincialLiteracyChart";
import { Footer } from "@/components/Footer";
import { CompareRegionsDialog } from "@/components/CompareRegionsDialog";
import PakistanMap from "@/components/maps/PakistanMap";
import { TimeSlider } from "@/components/TimeSlider";
import { ProvinceFilterProvider, useProvinceFilter } from "@/contexts/ProvinceFilterContext";
import { TimeFilterProvider } from "@/contexts/TimeFilterContext";
import { ProvinceFilterBadge } from "@/components/ProvinceFilterBadge";
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
  Map
} from "lucide-react";

const dataDomains = [
  {
    title: "Education",
    titleKey: "domain.education.cardTitle",
    urduTitle: "تعلیم",
    description: "Explore literacy rates, school enrollment, and educational infrastructure across all districts and provinces.",
    descriptionKey: "domain.education.cardDesc",
    icon: <GraduationCap className="w-7 h-7" />,
    stats: [
      { label: "Literacy Rate", labelKey: "domain.education.literacyRate", value: "62.8%" },
      { label: "Schools", labelKey: "domain.education.schools", value: "134K+" },
    ],
    path: "/education",
    accentColor: "green" as const,
  },
  {
    title: "Elections",
    titleKey: "domain.elections.cardTitle",
    urduTitle: "انتخابات",
    description: "Analyze historical election results, voter turnout patterns, and political geography evolution since 1970.",
    descriptionKey: "domain.elections.cardDesc",
    icon: <Vote className="w-7 h-7" />,
    stats: [
      { label: "Elections", labelKey: "domain.elections.elections", value: "11" },
      { label: "Constituencies", labelKey: "domain.elections.constituencies", value: "266" },
    ],
    path: "/elections",
    accentColor: "blue" as const,
  },
  {
    title: "Population",
    titleKey: "domain.population.cardTitle",
    urduTitle: "آبادی",
    description: "Interactive census data showing demographic transitions, urbanization trends, and migration patterns.",
    descriptionKey: "domain.population.cardDesc",
    icon: <Users className="w-7 h-7" />,
    stats: [
      { label: "Population", labelKey: "domain.population.population", value: "241.5M" },
      { label: "Urban", labelKey: "domain.population.urban", value: "38.8%" },
    ],
    path: "/population",
    accentColor: "amber" as const,
  },
  {
    title: "Economy",
    titleKey: "domain.economy.cardTitle",
    urduTitle: "معیشت",
    description: "Track GDP growth, inflation trends, employment data, and provincial economic contributions.",
    descriptionKey: "domain.economy.cardDesc",
    icon: <TrendingUp className="w-7 h-7" />,
    stats: [
      { label: "GDP", labelKey: "domain.economy.gdp", value: "$376B" },
      { label: "Growth", labelKey: "domain.economy.growth", value: "0.3%" },
    ],
    path: "/economy",
    accentColor: "coral" as const,
  },
];

const IndexContent = () => {
  const { selectedProvince } = useProvinceFilter();
  const { t, isUrdu } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <Hero />

      {/* Data Domains Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className={cn("text-center mb-12", isUrdu && "text-center")}>
            <h2 className={cn(
              "font-display text-3xl md:text-4xl font-bold text-foreground mb-4",
              isUrdu && "font-urdu"
            )}>
              {t("index.exploreDataDomains")}
            </h2>
            <p className={cn(
              "text-muted-foreground max-w-2xl mx-auto",
              isUrdu && "font-urdu leading-relaxed"
            )}>
              {t("index.exploreDataDomainsDesc")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dataDomains.map((domain, index) => (
              <DataDomainCard key={domain.title} {...domain} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <div className={cn(
              "flex items-center justify-between flex-wrap gap-4 mb-4",
              isUrdu && "flex-row-reverse"
            )}>
              <div className={cn("flex items-center gap-3", isUrdu && "flex-row-reverse")}>
                <div className="p-2 rounded-lg bg-primary/10">
                  <Map className="w-6 h-6 text-primary" />
                </div>
                <h2 className={cn(
                  "font-display text-3xl md:text-4xl font-bold text-foreground",
                  isUrdu && "font-urdu"
                )}>
                  {t("index.districtExplorer")}
                </h2>
                <ProvinceFilterBadge />
              </div>
              <CompareRegionsDialog />
            </div>
            <p className={cn(
              "text-muted-foreground max-w-2xl",
              isUrdu && "font-urdu leading-relaxed text-right"
            )}>
              {t("index.districtExplorerDesc")}
            </p>
          </div>

          <div className="bg-card rounded-2xl border border-border p-6 shadow-lg">
            <PakistanMap />
          </div>
        </div>
      </section>

      {/* Time Slider Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <TimeSlider />
        </div>
      </section>

      {/* Featured Insights Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className={cn(
            "mb-12 flex items-center justify-between flex-wrap gap-4",
            isUrdu && "flex-row-reverse"
          )}>
            <div className={isUrdu ? "text-right" : ""}>
              <h2 className={cn(
                "font-display text-3xl md:text-4xl font-bold text-foreground mb-4",
                isUrdu && "font-urdu"
              )}>
                {t("index.featuredInsights")}
              </h2>
              <p className={cn(
                "text-muted-foreground max-w-2xl",
                isUrdu && "font-urdu leading-relaxed"
              )}>
                {t("index.featuredInsightsDesc")}
                {selectedProvince && (
                  <span className={cn("text-primary font-medium", isUrdu ? "mr-2" : "ml-2")}>
                    {isUrdu ? `${selectedProvince} ${t("index.showingDataFor")}` : `${t("index.showingDataFor")} ${selectedProvince}`}
                  </span>
                )}
              </p>
            </div>
            <ProvinceFilterBadge />
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <StatCard
              value={62.8}
              suffix="%"
              label="National Literacy Rate"
              labelKey="index.nationalLiteracy"
              icon={<BookOpen className="w-5 h-5" />}
              trend={{ value: 3.8, isPositive: true }}
              index={0}
            />
            <StatCard
              value={134}
              suffix="K+"
              label="Educational Institutions"
              labelKey="index.educationalInstitutions"
              icon={<School className="w-5 h-5" />}
              index={1}
            />
            <StatCard
              value={52.7}
              suffix="%"
              label="Female Literacy Rate"
              labelKey="index.femaleLiteracyRate"
              icon={<Award className="w-5 h-5" />}
              trend={{ value: 4.7, isPositive: true }}
              index={2}
            />
            <StatCard
              value={38.8}
              suffix="%"
              label="Urban Population"
              labelKey="index.urbanPopulation"
              icon={<Globe className="w-5 h-5" />}
              trend={{ value: 2.4, isPositive: true }}
              index={3}
            />
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ProvincialLiteracyChart />
            <GDPPieChart />
          </div>
        </div>
      </section>

      {/* Literacy Trend Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className={cn("mb-12", isUrdu && "text-right")}>
            <h2 className={cn(
              "font-display text-3xl md:text-4xl font-bold text-foreground mb-4",
              isUrdu && "font-urdu"
            )}>
              {t("index.historicalTrends")}
            </h2>
            <p className={cn(
              "text-muted-foreground max-w-2xl",
              isUrdu && "font-urdu leading-relaxed"
            )}>
              {t("index.historicalTrendsDesc")}
            </p>
          </div>
          <LiteracyChart />
        </div>
      </section>

      {/* Why This Matters Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className={cn("max-w-3xl mx-auto text-center", isUrdu && "text-center")}>
            <h2 className={cn(
              "font-display text-3xl md:text-4xl font-bold mb-6",
              isUrdu && "font-urdu"
            )}>
              {t("index.dataDrivenDev")}
            </h2>
            <p className={cn(
              "text-lg text-primary-foreground/80 mb-8",
              isUrdu && "font-urdu leading-relaxed"
            )}>
              {t("index.dataDrivenDevDesc")}
            </p>
            <div className={cn(
              "grid grid-cols-1 md:grid-cols-3 gap-8 text-left",
              isUrdu && "text-right"
            )}>
              <div className="p-6 rounded-xl bg-primary-foreground/10 border border-primary-foreground/20">
                <h3 className={cn(
                  "font-display text-xl font-bold mb-2",
                  isUrdu && "font-urdu"
                )}>
                  {t("index.forResearchers")}
                </h3>
                <p className={cn(
                  "text-sm text-primary-foreground/70",
                  isUrdu && "font-urdu leading-relaxed"
                )}>
                  {t("index.forResearchersDesc")}
                </p>
              </div>
              <div className="p-6 rounded-xl bg-primary-foreground/10 border border-primary-foreground/20">
                <h3 className={cn(
                  "font-display text-xl font-bold mb-2",
                  isUrdu && "font-urdu"
                )}>
                  {t("index.forPolicymakers")}
                </h3>
                <p className={cn(
                  "text-sm text-primary-foreground/70",
                  isUrdu && "font-urdu leading-relaxed"
                )}>
                  {t("index.forPolicymakersDesc")}
                </p>
              </div>
              <div className="p-6 rounded-xl bg-primary-foreground/10 border border-primary-foreground/20">
                <h3 className={cn(
                  "font-display text-xl font-bold mb-2",
                  isUrdu && "font-urdu"
                )}>
                  {t("index.forCitizens")}
                </h3>
                <p className={cn(
                  "text-sm text-primary-foreground/70",
                  isUrdu && "font-urdu leading-relaxed"
                )}>
                  {t("index.forCitizensDesc")}
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

const Index = () => {
  return (
    <TimeFilterProvider>
      <ProvinceFilterProvider>
        <IndexContent />
      </ProvinceFilterProvider>
    </TimeFilterProvider>
  );
};

export default Index;
