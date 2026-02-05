import { createContext, useContext, useState, ReactNode, useCallback } from "react";

type Language = "en" | "ur";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isUrdu: boolean;
  isTransitioning: boolean;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    "nav.overview": "Overview",
    "nav.education": "Education",
    "nav.elections": "Elections",
    "nav.census": "Census",
    "nav.economy": "Economy",
    "nav.theme": "Theme",
    "nav.language": "Language",
    
    // Hero
    "hero.badge": "Data-Driven Insights for Pakistan",
    "hero.title": "Pakistan Data Atlas",
    "hero.subtitle": "پاکستان ڈیٹا اٹلس",
    "hero.description": "Explore comprehensive socio-economic data visualizations covering education, electoral patterns, population dynamics, and economic indicators across all provinces and territories of Pakistan.",
    "hero.explore": "Explore Data",
    "hero.methodology": "View Methodology",
    "hero.scroll": "Scroll to explore",
    
    // Stats
    "stats.dataPoints": "Data Points",
    "stats.provinces": "Provinces",
    "stats.yearsData": "Years of Data",
    "stats.districts": "Districts",
    
    // Data Domains
    "domain.education.title": "Education Landscape",
    "domain.education.urdu": "تعلیم",
    "domain.education.description": "Literacy rates, enrollment trends, and educational infrastructure across provinces",
    "domain.education.stat1": "National Literacy",
    "domain.education.stat2": "Gender Gap",
    
    "domain.elections.title": "Electoral Democracy",
    "domain.elections.urdu": "انتخابات",
    "domain.elections.description": "Historical election results, voter turnout, and political party performance",
    "domain.elections.stat1": "Voter Turnout",
    "domain.elections.stat2": "Elections Analyzed",
    
    "domain.population.title": "Population Census",
    "domain.population.urdu": "مردم شماری",
    "domain.population.description": "Demographic distribution, growth rates, and urbanization patterns",
    "domain.population.stat1": "Population",
    "domain.population.stat2": "Growth Rate",
    
    "domain.economy.title": "Economic Pulse",
    "domain.economy.urdu": "معیشت",
    "domain.economy.description": "GDP composition, sector-wise analysis, and regional economic indicators",
    "domain.economy.stat1": "GDP Growth",
    "domain.economy.stat2": "Sectors",
    
    // District Explorer
    "explorer.title": "District Explorer",
    "explorer.description": "Dive deep into district-level data across Pakistan",
    "explorer.compare": "Compare Regions",
    "explorer.search": "Search districts...",
    "explorer.population": "Population",
    "explorer.literacy": "Literacy",
    "explorer.area": "Area",
    
    // Footer
    "footer.tagline": "Transforming Pakistan's data into actionable insights",
    "footer.dataDomains": "Data Domains",
    "footer.resources": "Resources",
    "footer.dataSources": "Data Sources",
    "footer.methodology": "Methodology",
    "footer.api": "API Documentation",
    "footer.download": "Download Data",
    "footer.copyright": "© 2024 Pakistan Data Atlas. Open source under MIT License.",
    "footer.sourcesNote": "Data sourced from Pakistan Bureau of Statistics, Election Commission of Pakistan, and Provincial Education Departments.",
    
    // Common
    "common.loading": "Loading...",
    "common.error": "Error",
    "common.export": "Export",
    "common.filter": "Filter Data",
    "common.viewAll": "View All",
    "common.learnMore": "Learn More",
    "common.vsLastYear": "vs last year",
    
    // Index Page
    "index.exploreDataDomains": "Explore Data Domains",
    "index.exploreDataDomainsDesc": "Dive deep into Pakistan's comprehensive datasets across four key developmental areas. Each domain offers interactive visualizations and downloadable data.",
    "index.districtExplorer": "District Explorer",
    "index.districtExplorerDesc": "Click on a province to filter all charts below. Hover over districts to explore literacy rates and population density.",
    "index.showingDataFor": "Showing data for",
    "index.featuredInsights": "Featured Insights",
    "index.featuredInsightsDesc": "Key metrics and trends that reveal Pakistan's developmental trajectory.",
    "index.nationalLiteracy": "National Literacy Rate",
    "index.educationalInstitutions": "Educational Institutions",
    "index.femaleLiteracyRate": "Female Literacy Rate",
    "index.urbanPopulation": "Urban Population",
    "index.historicalTrends": "Historical Trends",
    "index.historicalTrendsDesc": "Track Pakistan's literacy progress over four decades. Use the time slider above to filter the date range.",
    "index.dataDrivenDev": "Data-Driven Development",
    "index.dataDrivenDevDesc": "Understanding Pakistan's socio-economic landscape through data is essential for informed policymaking, academic research, and civic engagement. This platform transforms complex government statistics into accessible, interactive visualizations that tell the story of a nation's progress.",
    "index.forResearchers": "For Researchers",
    "index.forResearchersDesc": "Access cleaned, standardized datasets with transparent methodology for academic research.",
    "index.forPolicymakers": "For Policymakers",
    "index.forPolicymakersDesc": "Identify development gaps and track progress with district-level granularity.",
    "index.forCitizens": "For Citizens",
    "index.forCitizensDesc": "Understand national trends and compare your district with others across Pakistan.",
    
    // Data Domain Cards
    "domain.education.cardTitle": "Education",
    "domain.education.cardDesc": "Explore literacy rates, school enrollment, and educational infrastructure across all districts and provinces.",
    "domain.education.literacyRate": "Literacy Rate",
    "domain.education.schools": "Schools",
    
    "domain.elections.cardTitle": "Elections",
    "domain.elections.cardDesc": "Analyze historical election results, voter turnout patterns, and political geography evolution since 1970.",
    "domain.elections.elections": "Elections",
    "domain.elections.constituencies": "Constituencies",
    
    "domain.population.cardTitle": "Population",
    "domain.population.cardDesc": "Interactive census data showing demographic transitions, urbanization trends, and migration patterns.",
    "domain.population.population": "Population",
    "domain.population.urban": "Urban",
    
    "domain.economy.cardTitle": "Economy",
    "domain.economy.cardDesc": "Track GDP growth, inflation trends, employment data, and provincial economic contributions.",
    "domain.economy.gdp": "GDP",
    "domain.economy.growth": "Growth",
    
    // Economy Page
    "economy.badge": "Economic Monitor",
    "economy.title": "Economic Pulse",
    "economy.description": "Track Pakistan's economic indicators including GDP growth, inflation, and employment trends from 2015 to present.",
    "economy.filterData": "Filter Data",
    "economy.export": "Export",
    "economy.gdp": "GDP",
    "economy.gdpGrowth": "GDP Growth",
    "economy.inflationRate": "Inflation Rate",
    "economy.unemployment": "Unemployment",
    "economy.gdpVsInflation": "GDP Growth vs Inflation",
    "economy.gdpVsInflationDesc": "Economic growth and price stability (2015-2023)",
    "economy.keyIndicators": "Key Economic Indicators Over Time",
    "economy.keyIndicatorsDesc": "GDP growth, inflation, and unemployment trends",
    "economy.inflation": "Inflation",
    "economy.alertTitle": "Economic Alert: 2023 Challenges",
    "economy.alertDesc": "Pakistan experienced unprecedented economic pressures in 2023 with inflation reaching 29.2% - the highest in decades. GDP growth slowed to 0.3%, while unemployment rose to 8.5%. These challenges correlate with global supply chain disruptions, energy costs, and domestic policy adjustments.",
    "economy.alertContext": "Historical context: 2019-2020 also saw significant slowdown due to structural adjustments →",
    
    // Population Page
    "population.badge": "Census Explorer",
    "population.title": "Population Dynamics",
    "population.description": "Track Pakistan's demographic evolution from 1951 to present. Explore population growth, urbanization trends, and age distribution patterns.",
    "population.filterData": "Filter Data",
    "population.export": "Export",
    "population.totalPopulation": "Total Population",
    "population.urbanPopulation": "Urban Population",
    "population.youth": "Youth (Under 30)",
    "population.growthSince": "Growth Since 1951",
    "population.populationGrowth": "Population Growth (1951-2023)",
    "population.populationGrowthDesc": "Total population in millions over census years",
    "population.ageDistribution": "Age Distribution by Gender",
    "population.ageDistributionDesc": "Population pyramid showing youth bulge",
    "population.urbanizationTrend": "Urbanization Trend",
    "population.urbanizationTrendDesc": "Percentage of population living in urban areas",
    "population.insightTitle": "Key Insight: The Youth Bulge Challenge",
    "population.insightDesc": "With 55% of Pakistan's population under 30, the country faces both an opportunity and a challenge. Properly harnessed through education and employment, this demographic dividend could drive unprecedented economic growth. However, without adequate investment, it risks becoming a demographic burden.",
    "population.insightCta": "Cross-reference with Education and Economy data for deeper insights →",
    "population.male": "Male",
    "population.female": "Female",
    "population.population": "Population",
    "population.urban": "Urban",
    "population.age0-14": "0-14",
    "population.age15-24": "15-24",
    "population.age25-54": "25-54",
    "population.age55-64": "55-64",
    "population.age65+": "65+",
    "population.years": "years",
    "population.million": "Million",
    
    // Elections Page
    "elections.badge": "Electoral Analytics",
    "elections.title": "Democracy Tracker",
    "elections.description": "Analyze Pakistan's electoral history from 1970 to 2024. Explore voting patterns, party performances, and turnout trends across general elections.",
    "elections.filterData": "Filter Data",
    "elections.export": "Export",
    "elections.electionsInRange": "Elections in Range",
    "elections.turnout": "Turnout",
    "elections.naConstituencies": "NA Constituencies",
    "elections.yearsSelected": "Years Selected",
    "elections.voterTurnoutHistory": "Voter Turnout History",
    "elections.voterTurnoutDesc": "Percentage of registered voters who cast ballots",
    "elections.winningPartySeats": "Winning Party Seats",
    "elections.winningPartyDesc": "National Assembly seats won by leading party",
    "elections.partySeatTrends": "Party Seat Trends",
    "elections.partySeatDesc": "NA seats won by party (1970-2024)",
    "elections.partyVoteShare": "Party Vote Share Trends",
    "elections.partyVoteShareDesc": "Popular vote percentage (1970-2024)",
    "elections.electoralEfficiency": "Electoral Efficiency",
    "elections.efficiencyDesc": "Seat share minus vote share — positive = overperforming, negative = underperforming",
    "elections.mostEfficientParty": "Most Efficient Party",
    "elections.leastEfficientParty": "Least Efficient Party",
    "elections.seatShareExceeds": "Seat share exceeds vote share in",
    "elections.seatShareTrails": "Seat share trails vote share in",
    "elections.yearByYearBreakdown": "Year-by-Year Efficiency Breakdown",
    "elections.yearByYearDesc": "Seat share minus vote share for each election cycle (positive = overperforming)",
    "elections.exportCSV": "Export CSV",
    "elections.efficiencyFormula": "Electoral Efficiency Formula",
    "elections.efficiencyExplanation": "Positive values mean a party won more seats than their vote share would suggest (overperforming). Negative values indicate underperformance relative to popular vote.",
    "elections.clickToFilter": "Click to filter by",
    "elections.clickPartyHeader": "Click on a party header to filter. Green = seat share exceeds vote share, Red = underperforming",
    "elections.seatsByProvince": "Seats by Province",
    "elections.seatsByProvinceDesc": "National Assembly seat distribution across provinces",
    "elections.regionalVoting": "Regional Voting Patterns",
    "elections.regionalVotingDesc": "Voter turnout comparison across provinces",
    "elections.partyProvincialBreakdown": "Party-wise Provincial Breakdown",
    "elections.partyProvincialDesc": "Seats won by each party across provinces",
    "elections.clickProvinceFilter": "Click on a province bar or legend to filter all charts",
    "elections.clickPartyFilter": "Click on a party line or legend to filter",
    "elections.compareVoteSeats": "Compare with seat trends to see vote-to-seat efficiency",
    "elections.efficiencyExplanationLong": "Shows which parties convert votes to seats more efficiently (first-past-the-post effect)",
    "elections.party": "Party",
    "elections.province": "Province",
    "elections.clearAllFilters": "Clear All Filters",
    "elections.average": "Average",
    "elections.year": "Year",
    "elections.seats": "seats",
    "elections.overperforming": "overperforming",
    "elections.underperforming": "underperforming",
    "elections.completeHistory": "Complete Election History",
    "elections.completeHistoryDesc": "Elections from",
    "elections.to": "to",
    "elections.winningParty": "Winning Party",
    "elections.seatsWon": "Seats Won",
    "elections.voteShare": "Vote Share",
    "elections.noDataAvailable": "No party breakdown data available for selected time range",
    "elections.selectYear": "Year",
    "elections.winner": "Winner",
    "elections.ppp": "PPP",
    "elections.pmln": "PML-N",
    "elections.pti": "PTI",
    "elections.others": "Others",
    "elections.punjab": "Punjab",
    "elections.sindh": "Sindh",
    "elections.kpk": "KPK",
    "elections.balochistan": "Balochistan",
    
    // Education Page
    "education.badge": "Education Dashboard",
    "education.title": "Education Landscape",
    "education.description": "Explore Pakistan's educational journey from 1981 to 2023. Analyze literacy rates, school enrollment, and infrastructure across provinces and districts.",
    "education.filterData": "Filter Data",
    "education.export": "Export",
    "education.overallLiteracy": "Overall Literacy",
    "education.maleLiteracy": "Male Literacy",
    "education.femaleLiteracy": "Female Literacy",
    "education.genderGap": "Gender Gap",
    "education.infrastructureTitle": "Educational Infrastructure by Province",
    "education.infrastructureDesc": "Schools, colleges, universities, and student-teacher ratios across provinces.",
    "education.province": "Province",
    "education.schools": "Schools",
    "education.colleges": "Colleges",
    "education.universities": "Universities",
    "education.studentTeacher": "Student:Teacher",
    "education.insightTitle": "Key Insight: The Education-Economy Nexus",
    "education.insightDesc": "Analysis reveals that districts with literacy rates above 70% show poverty rates 40% lower than the national average. Punjab's investment in education infrastructure correlates with its 59.4% contribution to national GDP.",
    "education.insightCta": "Explore the Economy dashboard to see the correlation →",
    
    // Education Charts
    "education.literacyEvolution": "Literacy Rate Evolution",
    "education.literacyEvolutionDesc": "Pakistan's literacy journey from 1981 to 2023",
    "education.provincialComparison": "Provincial Literacy Comparison",
    "education.provincialComparisonDesc": "Gender gap in education across provinces (2023)",
    "education.enrollmentTrends": "School Enrollment Trends",
    "education.enrollmentTrendsDesc": "Students enrolled by education level (millions)",
    "education.male": "Male",
    "education.female": "Female",
    "education.overall": "Overall",
    "education.primary": "Primary",
    "education.secondary": "Secondary",
    "education.higherEducation": "Higher Education",
    "education.filtered": "Filtered",
  },
  ur: {
    // Navigation
    "nav.overview": "جائزہ",
    "nav.education": "تعلیم",
    "nav.elections": "انتخابات",
    "nav.census": "مردم شماری",
    "nav.economy": "معیشت",
    "nav.theme": "تھیم",
    "nav.language": "زبان",
    
    // Hero
    "hero.badge": "پاکستان کے لیے ڈیٹا پر مبنی بصیرت",
    "hero.title": "پاکستان ڈیٹا اٹلس",
    "hero.subtitle": "Pakistan Data Atlas",
    "hero.description": "پاکستان کے تمام صوبوں اور علاقوں میں تعلیم، انتخابی نمونوں، آبادی کی حرکیات، اور اقتصادی اشارے پر مشتمل جامع سماجی و اقتصادی ڈیٹا کا جائزہ لیں۔",
    "hero.explore": "ڈیٹا دیکھیں",
    "hero.methodology": "طریقہ کار",
    "hero.scroll": "مزید دیکھنے کے لیے سکرول کریں",
    
    // Stats
    "stats.dataPoints": "ڈیٹا پوائنٹس",
    "stats.provinces": "صوبے",
    "stats.yearsData": "سالوں کا ڈیٹا",
    "stats.districts": "اضلاع",
    
    // Data Domains
    "domain.education.title": "تعلیمی منظرنامہ",
    "domain.education.urdu": "Education",
    "domain.education.description": "صوبوں میں خواندگی کی شرح، اندراج کے رجحانات، اور تعلیمی انفراسٹرکچر",
    "domain.education.stat1": "قومی خواندگی",
    "domain.education.stat2": "صنفی فرق",
    
    "domain.elections.title": "انتخابی جمہوریت",
    "domain.elections.urdu": "Elections",
    "domain.elections.description": "تاریخی انتخابی نتائج، ووٹرز کی شرکت، اور سیاسی جماعتوں کی کارکردگی",
    "domain.elections.stat1": "ووٹرز کی شرکت",
    "domain.elections.stat2": "تجزیہ شدہ انتخابات",
    
    "domain.population.title": "آبادی کی مردم شماری",
    "domain.population.urdu": "Census",
    "domain.population.description": "آبادیاتی تقسیم، شرح نمو، اور شہری کاری کے نمونے",
    "domain.population.stat1": "آبادی",
    "domain.population.stat2": "شرح نمو",
    
    "domain.economy.title": "اقتصادی نبض",
    "domain.economy.urdu": "Economy",
    "domain.economy.description": "جی ڈی پی کی تشکیل، شعبہ وار تجزیہ، اور علاقائی اقتصادی اشارے",
    "domain.economy.stat1": "جی ڈی پی نمو",
    "domain.economy.stat2": "شعبے",
    
    // District Explorer
    "explorer.title": "ضلعی ایکسپلورر",
    "explorer.description": "پاکستان بھر میں ضلعی سطح کے ڈیٹا کا گہرائی سے جائزہ لیں",
    "explorer.compare": "علاقوں کا موازنہ",
    "explorer.search": "اضلاع تلاش کریں...",
    "explorer.population": "آبادی",
    "explorer.literacy": "خواندگی",
    "explorer.area": "رقبہ",
    
    // Footer
    "footer.tagline": "پاکستان کے ڈیٹا کو قابل عمل بصیرت میں تبدیل کرنا",
    "footer.dataDomains": "ڈیٹا ڈومینز",
    "footer.resources": "وسائل",
    "footer.dataSources": "ڈیٹا ذرائع",
    "footer.methodology": "طریقہ کار",
    "footer.api": "API دستاویزات",
    "footer.download": "ڈیٹا ڈاؤن لوڈ",
    "footer.copyright": "© 2024 پاکستان ڈیٹا اٹلس۔ MIT لائسنس کے تحت اوپن سورس۔",
    "footer.sourcesNote": "ڈیٹا پاکستان بیورو آف سٹیٹسٹکس، الیکشن کمیشن آف پاکستان، اور صوبائی محکمہ تعلیم سے حاصل کیا گیا۔",
    
    // Common
    "common.loading": "لوڈ ہو رہا ہے...",
    "common.error": "خرابی",
    "common.export": "ایکسپورٹ",
    "common.filter": "ڈیٹا فلٹر",
    "common.viewAll": "سب دیکھیں",
    "common.learnMore": "مزید جانیں",
    "common.vsLastYear": "گزشتہ سال کے مقابلے",
    
    // Index Page
    "index.exploreDataDomains": "ڈیٹا ڈومینز دریافت کریں",
    "index.exploreDataDomainsDesc": "پاکستان کے جامع ڈیٹا سیٹس کو چار کلیدی ترقیاتی شعبوں میں گہرائی سے دیکھیں۔ ہر ڈومین انٹرایکٹو ویژولائزیشنز اور ڈاؤن لوڈ کے قابل ڈیٹا پیش کرتا ہے۔",
    "index.districtExplorer": "ضلعی ایکسپلورر",
    "index.districtExplorerDesc": "نیچے کے تمام چارٹس فلٹر کرنے کے لیے صوبے پر کلک کریں۔ خواندگی کی شرح اور آبادی کی کثافت دیکھنے کے لیے اضلاع پر ہوور کریں۔",
    "index.showingDataFor": "کا ڈیٹا دکھا رہا ہے",
    "index.featuredInsights": "نمایاں بصیرت",
    "index.featuredInsightsDesc": "اہم میٹرکس اور رجحانات جو پاکستان کی ترقیاتی سمت ظاہر کرتے ہیں۔",
    "index.nationalLiteracy": "قومی خواندگی کی شرح",
    "index.educationalInstitutions": "تعلیمی ادارے",
    "index.femaleLiteracyRate": "خواتین کی خواندگی کی شرح",
    "index.urbanPopulation": "شہری آبادی",
    "index.historicalTrends": "تاریخی رجحانات",
    "index.historicalTrendsDesc": "چار دہائیوں میں پاکستان کی خواندگی کی پیشرفت دیکھیں۔ تاریخ کی حد فلٹر کرنے کے لیے اوپر ٹائم سلائیڈر استعمال کریں۔",
    "index.dataDrivenDev": "ڈیٹا پر مبنی ترقی",
    "index.dataDrivenDevDesc": "ڈیٹا کے ذریعے پاکستان کے سماجی و اقتصادی منظرنامے کو سمجھنا باخبر پالیسی سازی، تعلیمی تحقیق، اور شہری شمولیت کے لیے ضروری ہے۔ یہ پلیٹ فارم پیچیدہ سرکاری اعداد و شمار کو قابل رسائی، انٹرایکٹو ویژولائزیشنز میں تبدیل کرتا ہے جو قوم کی ترقی کی کہانی بیان کرتے ہیں۔",
    "index.forResearchers": "محققین کے لیے",
    "index.forResearchersDesc": "تعلیمی تحقیق کے لیے شفاف طریقہ کار کے ساتھ صاف، معیاری ڈیٹا سیٹس تک رسائی۔",
    "index.forPolicymakers": "پالیسی سازوں کے لیے",
    "index.forPolicymakersDesc": "ضلعی سطح کی تفصیل کے ساتھ ترقیاتی خلا کی شناخت کریں اور پیشرفت ٹریک کریں۔",
    "index.forCitizens": "شہریوں کے لیے",
    "index.forCitizensDesc": "قومی رجحانات سمجھیں اور اپنے ضلع کا پاکستان بھر کے دوسروں سے موازنہ کریں۔",
    
    // Data Domain Cards
    "domain.education.cardTitle": "تعلیم",
    "domain.education.cardDesc": "تمام اضلاع اور صوبوں میں خواندگی کی شرح، اسکول میں اندراج، اور تعلیمی انفراسٹرکچر دیکھیں۔",
    "domain.education.literacyRate": "خواندگی کی شرح",
    "domain.education.schools": "اسکول",
    
    "domain.elections.cardTitle": "انتخابات",
    "domain.elections.cardDesc": "1970 سے تاریخی انتخابی نتائج، ووٹرز کی شرکت کے نمونے، اور سیاسی جغرافیہ کے ارتقاء کا تجزیہ کریں۔",
    "domain.elections.elections": "انتخابات",
    "domain.elections.constituencies": "حلقے",
    
    "domain.population.cardTitle": "آبادی",
    "domain.population.cardDesc": "آبادیاتی تبدیلیوں، شہری کاری کے رجحانات، اور ہجرت کے نمونے دکھانے والا انٹرایکٹو مردم شماری ڈیٹا۔",
    "domain.population.population": "آبادی",
    "domain.population.urban": "شہری",
    
    "domain.economy.cardTitle": "معیشت",
    "domain.economy.cardDesc": "جی ڈی پی نمو، افراط زر کے رجحانات، روزگار کا ڈیٹا، اور صوبائی اقتصادی شراکت ٹریک کریں۔",
    "domain.economy.gdp": "جی ڈی پی",
    "domain.economy.growth": "نمو",
    
    
    // Economy Page
    "economy.badge": "اقتصادی مانیٹر",
    "economy.title": "اقتصادی نبض",
    "economy.description": "پاکستان کے اقتصادی اشارے جن میں جی ڈی پی نمو، افراط زر، اور روزگار کے رجحانات شامل ہیں 2015 سے اب تک۔",
    "economy.filterData": "ڈیٹا فلٹر",
    "economy.export": "ایکسپورٹ",
    "economy.gdp": "جی ڈی پی",
    "economy.gdpGrowth": "جی ڈی پی نمو",
    "economy.inflationRate": "افراط زر کی شرح",
    "economy.unemployment": "بے روزگاری",
    "economy.gdpVsInflation": "جی ڈی پی نمو بمقابلہ افراط زر",
    "economy.gdpVsInflationDesc": "اقتصادی نمو اور قیمتوں کا استحکام (2015-2023)",
    "economy.keyIndicators": "وقت کے ساتھ اہم اقتصادی اشارے",
    "economy.keyIndicatorsDesc": "جی ڈی پی نمو، افراط زر، اور بے روزگاری کے رجحانات",
    "economy.inflation": "افراط زر",
    "economy.alertTitle": "اقتصادی انتباہ: 2023 کے چیلنجز",
    "economy.alertDesc": "پاکستان نے 2023 میں بے مثال اقتصادی دباؤ کا تجربہ کیا جہاں افراط زر 29.2% تک پہنچ گیا - دہائیوں میں سب سے زیادہ۔ جی ڈی پی نمو 0.3% تک گر گئی، جبکہ بے روزگاری 8.5% تک بڑھ گئی۔",
    "economy.alertContext": "تاریخی سیاق و سباق: 2019-2020 میں بھی ساختی ایڈجسٹمنٹ کی وجہ سے نمایاں سست روی دیکھی گئی →",
    
    // Population Page
    "population.badge": "مردم شماری ایکسپلورر",
    "population.title": "آبادیاتی حرکیات",
    "population.description": "پاکستان کے آبادیاتی ارتقاء کو 1951 سے اب تک دیکھیں۔ آبادی میں اضافہ، شہری کاری کے رجحانات، اور عمر کی تقسیم کے نمونے۔",
    "population.filterData": "ڈیٹا فلٹر",
    "population.export": "ایکسپورٹ",
    "population.totalPopulation": "کل آبادی",
    "population.urbanPopulation": "شہری آبادی",
    "population.youth": "نوجوان (30 سال سے کم)",
    "population.growthSince": "1951 سے اضافہ",
    "population.populationGrowth": "آبادی میں اضافہ (1951-2023)",
    "population.populationGrowthDesc": "مردم شماری کے سالوں میں لاکھوں میں کل آبادی",
    "population.ageDistribution": "صنف کے لحاظ سے عمر کی تقسیم",
    "population.ageDistributionDesc": "نوجوانوں کی کثرت دکھانے والا آبادیاتی اہرام",
    "population.urbanizationTrend": "شہری کاری کا رجحان",
    "population.urbanizationTrendDesc": "شہری علاقوں میں رہنے والی آبادی کا فیصد",
    "population.insightTitle": "اہم بصیرت: نوجوانوں کی کثرت کا چیلنج",
    "population.insightDesc": "پاکستان کی 55% آبادی 30 سال سے کم عمر کے ساتھ، ملک کو ایک موقع اور چیلنج دونوں کا سامنا ہے۔ تعلیم اور روزگار کے ذریعے صحیح طریقے سے استعمال کرنے پر، یہ آبادیاتی فائدہ بے مثال اقتصادی نمو کا سبب بن سکتا ہے۔",
    "population.insightCta": "گہری بصیرت کے لیے تعلیم اور معیشت کے ڈیٹا سے موازنہ کریں →",
    "population.male": "مرد",
    "population.female": "خواتین",
    "population.population": "آبادی",
    "population.urban": "شہری",
    "population.age0-14": "۰-۱۴",
    "population.age15-24": "۱۵-۲۴",
    "population.age25-54": "۲۵-۵۴",
    "population.age55-64": "۵۵-۶۴",
    "population.age65+": "۶۵+",
    "population.years": "سال",
    "population.million": "ملین",
    
    // Elections Page
    "elections.badge": "انتخابی تجزیات",
    "elections.title": "جمہوریت ٹریکر",
    "elections.description": "پاکستان کی انتخابی تاریخ 1970 سے 2024 تک کا تجزیہ کریں۔ عام انتخابات میں ووٹنگ کے نمونوں، پارٹی کی کارکردگی، اور ٹرن آؤٹ کے رجحانات دیکھیں۔",
    "elections.filterData": "ڈیٹا فلٹر",
    "elections.export": "ایکسپورٹ",
    "elections.electionsInRange": "منتخب مدت میں انتخابات",
    "elections.turnout": "ٹرن آؤٹ",
    "elections.naConstituencies": "قومی اسمبلی حلقے",
    "elections.yearsSelected": "منتخب سال",
    "elections.voterTurnoutHistory": "ووٹر ٹرن آؤٹ کی تاریخ",
    "elections.voterTurnoutDesc": "رجسٹرڈ ووٹروں کی شرکت کا فیصد",
    "elections.winningPartySeats": "فاتح پارٹی کی نشستیں",
    "elections.winningPartyDesc": "قومی اسمبلی میں سرفہرست پارٹی کی نشستیں",
    "elections.partySeatTrends": "پارٹی کی نشستوں کے رجحانات",
    "elections.partySeatDesc": "پارٹی کے لحاظ سے قومی اسمبلی نشستیں (1970-2024)",
    "elections.partyVoteShare": "پارٹی ووٹ شیئر کے رجحانات",
    "elections.partyVoteShareDesc": "مقبول ووٹ فیصد (1970-2024)",
    "elections.electoralEfficiency": "انتخابی کارکردگی",
    "elections.efficiencyDesc": "نشستوں کا حصہ منفی ووٹ شیئر — مثبت = بہتر کارکردگی، منفی = کم کارکردگی",
    "elections.mostEfficientParty": "سب سے موثر پارٹی",
    "elections.leastEfficientParty": "کم موثر پارٹی",
    "elections.seatShareExceeds": "نشستوں کا حصہ ووٹ شیئر سے زیادہ ہے",
    "elections.seatShareTrails": "نشستوں کا حصہ ووٹ شیئر سے کم ہے",
    "elections.yearByYearBreakdown": "سال بہ سال کارکردگی کی تفصیل",
    "elections.yearByYearDesc": "ہر انتخابی سائیکل کے لیے نشستوں کا حصہ منفی ووٹ شیئر (مثبت = بہتر کارکردگی)",
    "elections.exportCSV": "CSV ایکسپورٹ",
    "elections.efficiencyFormula": "انتخابی کارکردگی فارمولا",
    "elections.efficiencyExplanation": "مثبت اقدار کا مطلب ہے کہ پارٹی نے اپنے ووٹ شیئر کے مقابلے میں زیادہ نشستیں جیتیں۔ منفی اقدار مقبول ووٹ کے مقابلے میں کم کارکردگی ظاہر کرتی ہیں۔",
    "elections.clickToFilter": "فلٹر کے لیے کلک کریں",
    "elections.clickPartyHeader": "فلٹر کے لیے پارٹی ہیڈر پر کلک کریں۔ سبز = نشستوں کا حصہ ووٹ شیئر سے زیادہ، سرخ = کم کارکردگی",
    "elections.seatsByProvince": "صوبے کے لحاظ سے نشستیں",
    "elections.seatsByProvinceDesc": "صوبوں میں قومی اسمبلی نشستوں کی تقسیم",
    "elections.regionalVoting": "علاقائی ووٹنگ کے نمونے",
    "elections.regionalVotingDesc": "صوبوں میں ووٹر ٹرن آؤٹ کا موازنہ",
    "elections.partyProvincialBreakdown": "پارٹی وار صوبائی تفصیل",
    "elections.partyProvincialDesc": "صوبوں میں ہر پارٹی کی جیتی گئی نشستیں",
    "elections.clickProvinceFilter": "تمام چارٹس فلٹر کرنے کے لیے صوبے کے بار یا لیجنڈ پر کلک کریں",
    "elections.clickPartyFilter": "فلٹر کے لیے پارٹی لائن یا لیجنڈ پر کلک کریں",
    "elections.compareVoteSeats": "ووٹ سے نشستوں کی کارکردگی دیکھنے کے لیے نشستوں کے رجحانات سے موازنہ کریں",
    "elections.efficiencyExplanationLong": "دکھاتا ہے کہ کون سی پارٹیاں ووٹوں کو زیادہ مؤثر طریقے سے نشستوں میں تبدیل کرتی ہیں",
    "elections.party": "پارٹی",
    "elections.province": "صوبہ",
    "elections.clearAllFilters": "تمام فلٹرز صاف کریں",
    "elections.average": "اوسط",
    "elections.year": "سال",
    "elections.seats": "نشستیں",
    "elections.overperforming": "بہتر کارکردگی",
    "elections.underperforming": "کم کارکردگی",
    "elections.completeHistory": "مکمل انتخابی تاریخ",
    "elections.completeHistoryDesc": "انتخابات",
    "elections.to": "سے",
    "elections.winningParty": "فاتح پارٹی",
    "elections.seatsWon": "جیتی گئی نشستیں",
    "elections.voteShare": "ووٹ شیئر",
    "elections.noDataAvailable": "منتخب مدت کے لیے پارٹی کی تفصیل دستیاب نہیں",
    "elections.selectYear": "سال",
    "elections.winner": "فاتح",
    "elections.ppp": "پیپلز پارٹی",
    "elections.pmln": "مسلم لیگ ن",
    "elections.pti": "تحریک انصاف",
    "elections.others": "دیگر",
    "elections.punjab": "پنجاب",
    "elections.sindh": "سندھ",
    "elections.kpk": "خیبر پختونخوا",
    "elections.balochistan": "بلوچستان",
    
    // Education Page
    "education.badge": "تعلیمی ڈیش بورڈ",
    "education.title": "تعلیمی منظرنامہ",
    "education.description": "پاکستان کے تعلیمی سفر کو 1981 سے 2023 تک دیکھیں۔ صوبوں اور اضلاع میں خواندگی کی شرح، اسکول میں اندراج، اور انفراسٹرکچر کا تجزیہ کریں۔",
    "education.filterData": "ڈیٹا فلٹر",
    "education.export": "ایکسپورٹ",
    "education.overallLiteracy": "مجموعی خواندگی",
    "education.maleLiteracy": "مردوں کی خواندگی",
    "education.femaleLiteracy": "خواتین کی خواندگی",
    "education.genderGap": "صنفی فرق",
    "education.infrastructureTitle": "صوبے کے لحاظ سے تعلیمی انفراسٹرکچر",
    "education.infrastructureDesc": "صوبوں میں اسکول، کالج، یونیورسٹیاں، اور طالب علم و اساتذہ کا تناسب۔",
    "education.province": "صوبہ",
    "education.schools": "اسکول",
    "education.colleges": "کالج",
    "education.universities": "یونیورسٹیاں",
    "education.studentTeacher": "طالب علم:استاد",
    "education.insightTitle": "اہم بصیرت: تعلیم اور معیشت کا تعلق",
    "education.insightDesc": "تجزیے سے پتہ چلتا ہے کہ جن اضلاع میں خواندگی کی شرح 70% سے زیادہ ہے وہاں غربت کی شرح قومی اوسط سے 40% کم ہے۔ پنجاب کی تعلیمی انفراسٹرکچر میں سرمایہ کاری قومی جی ڈی پی میں اس کی 59.4% شراکت سے جڑی ہے۔",
    "education.insightCta": "تعلق دیکھنے کے لیے معیشت ڈیش بورڈ دیکھیں →",
    
    // Education Charts
    "education.literacyEvolution": "خواندگی کی شرح کا ارتقاء",
    "education.literacyEvolutionDesc": "پاکستان کا تعلیمی سفر 1981 سے 2023 تک",
    "education.provincialComparison": "صوبائی خواندگی کا موازنہ",
    "education.provincialComparisonDesc": "صوبوں میں تعلیم میں صنفی فرق (2023)",
    "education.enrollmentTrends": "اسکول میں اندراج کے رجحانات",
    "education.enrollmentTrendsDesc": "تعلیمی سطح کے لحاظ سے طلباء کا اندراج (لاکھوں)",
    "education.male": "مرد",
    "education.female": "خواتین",
    "education.overall": "مجموعی",
    "education.primary": "پرائمری",
    "education.secondary": "سیکنڈری",
    "education.higherEducation": "اعلیٰ تعلیم",
    "education.filtered": "فلٹر شدہ",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>("en");
  const [isTransitioning, setIsTransitioning] = useState(false);

  const setLanguage = useCallback((lang: Language) => {
    if (lang === language) return;
    
    setIsTransitioning(true);
    
    // Small delay for exit animation
    setTimeout(() => {
      setLanguageState(lang);
      // Reset transition state after enter animation completes
      setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
    }, 150);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isUrdu: language === "ur", isTransitioning }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
