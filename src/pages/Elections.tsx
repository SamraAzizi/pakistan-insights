import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { StatCard } from "@/components/StatCard";
import { Button } from "@/components/ui/button";
import { TimeSlider } from "@/components/TimeSlider";
import { ProvinceFilterProvider, useProvinceFilter } from "@/contexts/ProvinceFilterContext";
import { TimeFilterProvider, useTimeFilter } from "@/contexts/TimeFilterContext";
import { PartyFilterProvider, usePartyFilter } from "@/contexts/PartyFilterContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { DashboardSkeleton } from "@/components/skeletons/DashboardSkeleton";
import { usePageLoading } from "@/hooks/usePageLoading";
import { useMemo, useRef, useState, useCallback } from "react";
import { 
  Vote, 
  Users,
  TrendingUp,
  Download,
  Filter,
  Calendar,
  X
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from "recharts";
import { electionData, voterTurnout, provincialSeats, provincialTurnout, partyProvincialSeats, partyPerformanceHistory, partyVoteShareHistory } from "@/data/pakistanData";
import { BilingualExportMenu } from "@/components/BilingualExportMenu";
import { exportBilingualCSV } from "@/lib/bilingualExportUtils";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip as UITooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info, FileSpreadsheet } from "lucide-react";


const PARTY_COLORS: Record<string, string> = {
  'PPP': 'hsl(220, 70%, 50%)',
  'PML-N': 'hsl(150, 60%, 35%)',
  'PTI': 'hsl(10, 80%, 55%)',
  'Others': 'hsl(40, 20%, 60%)',
};

const PROVINCE_COLORS: Record<string, string> = {
  'Punjab': 'hsl(150, 60%, 35%)',
  'Sindh': 'hsl(220, 70%, 50%)',
  'KPK': 'hsl(38, 92%, 50%)',
  'Balochistan': 'hsl(10, 80%, 55%)',
};

const ElectionsContent = () => {
  const { yearRange } = useTimeFilter();
  const { selectedParty, setSelectedParty, clearFilter: clearPartyFilter } = usePartyFilter();
  const { selectedProvince, setSelectedProvince, clearFilter: clearProvinceFilter } = useProvinceFilter();
  const { t, isUrdu } = useLanguage();
  const isLoading = usePageLoading(1200);
  
  const filteredElectionData = useMemo(() => 
    electionData.filter(d => d.year >= yearRange[0] && d.year <= yearRange[1]),
    [yearRange]
  );
  
  const filteredTurnoutData = useMemo(() => 
    voterTurnout.filter(d => d.year >= yearRange[0] && d.year <= yearRange[1]),
    [yearRange]
  );

  const filteredProvincialSeats = useMemo(() => 
    provincialSeats.filter(d => d.year >= yearRange[0] && d.year <= yearRange[1]),
    [yearRange]
  );

  const filteredProvincialTurnout = useMemo(() => 
    provincialTurnout.filter(d => d.year >= yearRange[0] && d.year <= yearRange[1]),
    [yearRange]
  );

  const filteredPartyProvincialSeats = useMemo(() => 
    partyProvincialSeats.filter(d => d.year >= yearRange[0] && d.year <= yearRange[1]),
    [yearRange]
  );

  // Get available years for party breakdown selector
  const availableYears = useMemo(() => 
    [...new Set(filteredPartyProvincialSeats.map(d => d.year))].sort((a, b) => b - a),
    [filteredPartyProvincialSeats]
  );

  const [selectedPartyYear, setSelectedPartyYear] = useState<number | null>(null);
  
  // Auto-select latest year when filter changes
  const activePartyYear = selectedPartyYear && availableYears.includes(selectedPartyYear) 
    ? selectedPartyYear 
    : availableYears[0] || null;

  const partyBreakdownData = useMemo(() => 
    filteredPartyProvincialSeats.filter(d => d.year === activePartyYear),
    [filteredPartyProvincialSeats, activePartyYear]
  );

  const filteredPartyPerformance = useMemo(() => 
    partyPerformanceHistory.filter(d => d.year >= yearRange[0] && d.year <= yearRange[1]),
    [yearRange]
  );

  const filteredPartyVoteShare = useMemo(() => 
    partyVoteShareHistory.filter(d => d.year >= yearRange[0] && d.year <= yearRange[1]),
    [yearRange]
  );

  // Calculate electoral efficiency (seat share vs vote share)
  const electoralEfficiency = useMemo(() => {
    const parties = ['PPP', 'PML-N', 'PTI', 'Others'] as const;
    
    return filteredPartyPerformance.map((seatData, index) => {
      const voteData = filteredPartyVoteShare[index];
      if (!voteData) return null;
      
      // Calculate total seats for that year
      const totalSeats = parties.reduce((sum, party) => sum + (seatData[party] || 0), 0);
      
      const result: Record<string, number | string> = { year: seatData.year };
      
      parties.forEach(party => {
        const seatShare = totalSeats > 0 ? ((seatData[party] || 0) / totalSeats) * 100 : 0;
        const voteShare = voteData[party] || 0;
        // Efficiency = seat share - vote share (positive = overperforming)
        result[party] = Number((seatShare - voteShare).toFixed(1));
      });
      
      return result;
    }).filter(Boolean) as Record<string, number | string>[];
  }, [filteredPartyPerformance, filteredPartyVoteShare]);

  // Calculate most and least efficient parties across the time range
  const efficiencySummary = useMemo(() => {
    const parties = ['PPP', 'PML-N', 'PTI', 'Others'] as const;
    
    if (electoralEfficiency.length === 0) {
      return { mostEfficient: null, leastEfficient: null };
    }
    
    // Calculate average efficiency per party
    const partyAverages = parties.map(party => {
      const values = electoralEfficiency
        .map(d => d[party] as number)
        .filter(v => typeof v === 'number' && !isNaN(v));
      
      const avg = values.length > 0 
        ? values.reduce((sum, v) => sum + v, 0) / values.length 
        : 0;
      
      return { party, avg: Number(avg.toFixed(1)) };
    });
    
    const sorted = [...partyAverages].sort((a, b) => b.avg - a.avg);
    
    return {
      mostEfficient: sorted[0],
      leastEfficient: sorted[sorted.length - 1]
    };
  }, [electoralEfficiency]);

  const provincialSeatsRef = useRef<HTMLDivElement>(null);
  const voteShareRef = useRef<HTMLDivElement>(null);
  const efficiencyRef = useRef<HTMLDivElement>(null);
  const provincialTurnoutRef = useRef<HTMLDivElement>(null);
  const partyBreakdownRef = useRef<HTMLDivElement>(null);
  const partyTrendsRef = useRef<HTMLDivElement>(null);

  // Get opacity for party-based elements
  const getPartyOpacity = useCallback((party: string) => {
    if (!selectedParty) return 1;
    return party === selectedParty ? 1 : 0.2;
  }, [selectedParty]);

  // Get opacity for province-based elements
  const getProvinceOpacity = useCallback((province: string) => {
    if (!selectedProvince) return 1;
    return province === selectedProvince ? 1 : 0.2;
  }, [selectedProvince]);

  // Handle legend click for party filtering
  const handlePartyLegendClick = useCallback((data: any) => {
    const party = data.dataKey || data.value;
    if (selectedParty === party) {
      clearPartyFilter();
    } else {
      setSelectedParty(party);
    }
  }, [selectedParty, setSelectedParty, clearPartyFilter]);

  // Handle legend click for province filtering
  const handleProvinceLegendClick = useCallback((data: any) => {
    const province = data.dataKey || data.value;
    if (selectedProvince === province) {
      clearProvinceFilter();
    } else {
      setSelectedProvince(province);
    }
  }, [selectedProvince, setSelectedProvince, clearProvinceFilter]);

  // Handle line click for party filtering
  const handlePartyClick = useCallback((party: string) => {
    if (selectedParty === party) {
      clearPartyFilter();
    } else {
      setSelectedParty(party);
    }
  }, [selectedParty, setSelectedParty, clearPartyFilter]);

  // Handle click for province filtering
  const handleProvinceClick = useCallback((province: string) => {
    if (selectedProvince === province) {
      clearProvinceFilter();
    } else {
      setSelectedProvince(province);
    }
  }, [selectedProvince, setSelectedProvince, clearProvinceFilter]);

  // Calculate dynamic stats based on filtered data
  const totalElections = filteredElectionData.length;
  const latestTurnout = filteredTurnoutData.length > 0 
    ? filteredTurnoutData[filteredTurnoutData.length - 1]
    : null;
  const previousTurnout = filteredTurnoutData.length > 1 
    ? filteredTurnoutData[filteredTurnoutData.length - 2]
    : null;
  const turnoutTrend = latestTurnout && previousTurnout 
    ? Number((latestTurnout.turnout - previousTurnout.turnout).toFixed(1))
    : 0;

  if (isLoading) {
    return (
      <>
        <Navigation />
        <DashboardSkeleton showTable chartCount={4} tableRows={10} />
        <Footer />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header */}
      <section className="pt-24 pb-12 bg-data-blue/5">
        <div className="container mx-auto px-4">
          <div className={`flex flex-col md:flex-row md:items-end justify-between gap-6 ${isUrdu ? 'md:flex-row-reverse text-right' : ''}`}>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-data-blue/10 text-data-blue text-sm font-medium mb-4">
                <Vote className="w-4 h-4" />
                {t("elections.badge")}
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-2">
                {t("elections.title")}
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                {t("elections.description")}
              </p>
            </div>
            <div className={`flex gap-3 ${isUrdu ? 'flex-row-reverse' : ''}`}>
              <Button variant="data" size="lg" className="gap-2">
                <Filter className="w-4 h-4" />
                {t("elections.filterData")}
              </Button>
              <Button variant="default" size="lg" className="gap-2">
                <Download className="w-4 h-4" />
                {t("elections.export")}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Time Filter */}
      <section className="py-6 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-wrap">
            <TimeSlider />
            {selectedParty && (
              <Badge 
                variant="secondary" 
                className="flex items-center gap-2 px-3 py-1.5 cursor-pointer hover:bg-destructive/10 transition-colors"
                onClick={clearPartyFilter}
                style={{ borderColor: PARTY_COLORS[selectedParty], borderWidth: 2 }}
              >
                <span 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: PARTY_COLORS[selectedParty] }} 
                />
                {t("elections.party")}: {selectedParty}
                <X className="w-3 h-3" />
              </Badge>
            )}
            {selectedProvince && (
              <Badge 
                variant="secondary" 
                className="flex items-center gap-2 px-3 py-1.5 cursor-pointer hover:bg-destructive/10 transition-colors"
                onClick={clearProvinceFilter}
                style={{ borderColor: PROVINCE_COLORS[selectedProvince], borderWidth: 2 }}
              >
                <span 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: PROVINCE_COLORS[selectedProvince] }} 
                />
                {t("elections.province")}: {selectedProvince}
                <X className="w-3 h-3" />
              </Badge>
            )}
            {(selectedParty || selectedProvince) && (
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-destructive gap-1.5"
                onClick={() => {
                  clearPartyFilter();
                  clearProvinceFilter();
                }}
              >
                <X className="w-4 h-4" />
                {t("elections.clearAllFilters")}
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="py-8 border-b border-border">
        <div className="container mx-auto px-4">
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 ${isUrdu ? 'text-right' : ''}`}>
            <StatCard
              value={totalElections}
              label={t("elections.electionsInRange")}
              icon={<Calendar className="w-5 h-5" />}
              delay={0}
            />
            <StatCard
              value={latestTurnout?.turnout ?? 0}
              suffix="%"
              label={`${latestTurnout?.year ?? yearRange[1]} ${t("elections.turnout")}`}
              icon={<Users className="w-5 h-5" />}
              trend={turnoutTrend !== 0 ? { value: Math.abs(turnoutTrend), isPositive: turnoutTrend > 0 } : undefined}
              delay={100}
            />
            <StatCard
              value={266}
              label={t("elections.naConstituencies")}
              icon={<Vote className="w-5 h-5" />}
              delay={200}
            />
            <StatCard
              value={yearRange[1] - yearRange[0]}
              suffix="+"
              label={t("elections.yearsSelected")}
              icon={<TrendingUp className="w-5 h-5" />}
              delay={300}
            />
          </div>
        </div>
      </section>

      {/* Charts */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Voter Turnout */}
            <div className="p-6 bg-card rounded-xl border border-border shadow-card">
              <div className={`mb-6 ${isUrdu ? 'text-right' : ''}`}>
                <h3 className="font-display text-xl font-bold text-foreground">
                  {t("elections.voterTurnoutHistory")}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t("elections.voterTurnoutDesc")}
                </p>
              </div>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={filteredTurnoutData}>
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
                      domain={[30, 70]}
                      tickFormatter={(value) => `${value}%`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(0, 0%, 100%)",
                        border: "1px solid hsl(40, 20%, 88%)",
                        borderRadius: "8px",
                      }}
                      formatter={(value: number) => [`${value}%`, t("elections.turnout")]}
                    />
                    <Line
                      type="monotone"
                      dataKey="turnout"
                      stroke="hsl(220, 70%, 50%)"
                      strokeWidth={3}
                      dot={{ fill: "hsl(220, 70%, 50%)", strokeWidth: 2 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Winning Party Seats */}
            <div className="p-6 bg-card rounded-xl border border-border shadow-card">
              <div className={`mb-6 ${isUrdu ? 'text-right' : ''}`}>
                <h3 className="font-display text-xl font-bold text-foreground">
                  {t("elections.winningPartySeats")}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t("elections.winningPartyDesc")}
                </p>
              </div>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={filteredElectionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(40, 20%, 88%)" />
                    <XAxis
                      dataKey="year"
                      stroke="hsl(40, 10%, 40%)"
                      fontSize={11}
                      tickLine={false}
                    />
                    <YAxis
                      stroke="hsl(40, 10%, 40%)"
                      fontSize={12}
                      tickLine={false}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(0, 0%, 100%)",
                        border: "1px solid hsl(40, 20%, 88%)",
                        borderRadius: "8px",
                      }}
                      formatter={(value: number, name: string, props: any) => [
                        `${value} ${t("elections.seats")} (${props.payload.party})`,
                        t("elections.winner"),
                      ]}
                    />
                    <Bar
                      dataKey="seats"
                      fill="hsl(150, 60%, 35%)"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Party Performance: Seats vs Vote Share */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Seat Trends */}
            <div className="p-6 bg-card rounded-xl border border-border shadow-card">
              <div className={`flex items-start justify-between mb-6 ${isUrdu ? 'flex-row-reverse' : ''}`}>
                <div className={isUrdu ? 'text-right' : ''}>
                  <h3 className="font-display text-xl font-bold text-foreground">
                    {t("elections.partySeatTrends")}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t("elections.partySeatDesc")}
                  </p>
                </div>
                <BilingualExportMenu 
                  chartRef={partyTrendsRef}
                  filename="party-seat-trends"
                  data={filteredPartyPerformance}
                  reportTitle={{ en: "Party Seat Trends", ur: "جماعتی نشستوں کے رجحانات" }}
                />
              </div>
            <div ref={partyTrendsRef} className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={filteredPartyPerformance}>
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
                    domain={[0, 'auto']}
                  />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(0, 0%, 100%)",
                        border: "1px solid hsl(40, 20%, 88%)",
                        borderRadius: "8px",
                      }}
                      formatter={(value: number, name: string) => [`${value} ${t("elections.seats")}`, name]}
                    />
                  <Legend 
                    onClick={handlePartyLegendClick}
                    wrapperStyle={{ cursor: 'pointer' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="PPP"
                    stroke={PARTY_COLORS['PPP']}
                    strokeWidth={selectedParty === 'PPP' ? 4 : 2}
                    strokeOpacity={getPartyOpacity('PPP')}
                    dot={{ fill: PARTY_COLORS['PPP'], strokeWidth: 2, r: selectedParty === 'PPP' ? 6 : 4 }}
                    activeDot={{ r: 8, cursor: 'pointer', onClick: () => handlePartyClick('PPP') }}
                    style={{ cursor: 'pointer' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="PML-N"
                    stroke={PARTY_COLORS['PML-N']}
                    strokeWidth={selectedParty === 'PML-N' ? 4 : 2}
                    strokeOpacity={getPartyOpacity('PML-N')}
                    dot={{ fill: PARTY_COLORS['PML-N'], strokeWidth: 2, r: selectedParty === 'PML-N' ? 6 : 4 }}
                    activeDot={{ r: 8, cursor: 'pointer', onClick: () => handlePartyClick('PML-N') }}
                    style={{ cursor: 'pointer' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="PTI"
                    stroke={PARTY_COLORS['PTI']}
                    strokeWidth={selectedParty === 'PTI' ? 4 : 2}
                    strokeOpacity={getPartyOpacity('PTI')}
                    dot={{ fill: PARTY_COLORS['PTI'], strokeWidth: 2, r: selectedParty === 'PTI' ? 6 : 4 }}
                    activeDot={{ r: 8, cursor: 'pointer', onClick: () => handlePartyClick('PTI') }}
                    style={{ cursor: 'pointer' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="Others"
                    stroke={PARTY_COLORS['Others']}
                    strokeWidth={selectedParty === 'Others' ? 4 : 2}
                    strokeOpacity={getPartyOpacity('Others')}
                    strokeDasharray="5 5"
                    dot={{ fill: PARTY_COLORS['Others'], strokeWidth: 2, r: selectedParty === 'Others' ? 5 : 3 }}
                    activeDot={{ r: 7, cursor: 'pointer', onClick: () => handlePartyClick('Others') }}
                    style={{ cursor: 'pointer' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                {t("elections.clickPartyFilter")}
              </p>
            </div>

            {/* Vote Share Trends */}
            <div className="p-6 bg-card rounded-xl border border-border shadow-card">
              <div className={`flex items-start justify-between mb-6 ${isUrdu ? 'flex-row-reverse' : ''}`}>
                <div className={isUrdu ? 'text-right' : ''}>
                  <h3 className="font-display text-xl font-bold text-foreground">
                    {t("elections.partyVoteShare")}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t("elections.partyVoteShareDesc")}
                  </p>
                </div>
                <BilingualExportMenu 
                  chartRef={voteShareRef}
                  filename="party-vote-share-trends"
                  data={filteredPartyVoteShare}
                  reportTitle={{ en: "Party Vote Share Trends", ur: "جماعتی ووٹ شیئر رجحانات" }}
                />
              </div>
              <div ref={voteShareRef} className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={filteredPartyVoteShare}>
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
                      domain={[0, 70]}
                      tickFormatter={(value) => `${value}%`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(0, 0%, 100%)",
                        border: "1px solid hsl(40, 20%, 88%)",
                        borderRadius: "8px",
                      }}
                      formatter={(value: number, name: string) => [`${value}%`, name]}
                    />
                    <Legend 
                      onClick={handlePartyLegendClick}
                      wrapperStyle={{ cursor: 'pointer' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="PPP"
                      stroke={PARTY_COLORS['PPP']}
                      strokeWidth={selectedParty === 'PPP' ? 4 : 2}
                      strokeOpacity={getPartyOpacity('PPP')}
                      dot={{ fill: PARTY_COLORS['PPP'], strokeWidth: 2, r: selectedParty === 'PPP' ? 6 : 4 }}
                      activeDot={{ r: 8, cursor: 'pointer', onClick: () => handlePartyClick('PPP') }}
                      style={{ cursor: 'pointer' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="PML-N"
                      stroke={PARTY_COLORS['PML-N']}
                      strokeWidth={selectedParty === 'PML-N' ? 4 : 2}
                      strokeOpacity={getPartyOpacity('PML-N')}
                      dot={{ fill: PARTY_COLORS['PML-N'], strokeWidth: 2, r: selectedParty === 'PML-N' ? 6 : 4 }}
                      activeDot={{ r: 8, cursor: 'pointer', onClick: () => handlePartyClick('PML-N') }}
                      style={{ cursor: 'pointer' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="PTI"
                      stroke={PARTY_COLORS['PTI']}
                      strokeWidth={selectedParty === 'PTI' ? 4 : 2}
                      strokeOpacity={getPartyOpacity('PTI')}
                      dot={{ fill: PARTY_COLORS['PTI'], strokeWidth: 2, r: selectedParty === 'PTI' ? 6 : 4 }}
                      activeDot={{ r: 8, cursor: 'pointer', onClick: () => handlePartyClick('PTI') }}
                      style={{ cursor: 'pointer' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="Others"
                      stroke={PARTY_COLORS['Others']}
                      strokeWidth={selectedParty === 'Others' ? 4 : 2}
                      strokeOpacity={getPartyOpacity('Others')}
                      strokeDasharray="5 5"
                      dot={{ fill: PARTY_COLORS['Others'], strokeWidth: 2, r: selectedParty === 'Others' ? 5 : 3 }}
                      activeDot={{ r: 7, cursor: 'pointer', onClick: () => handlePartyClick('Others') }}
                      style={{ cursor: 'pointer' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                {t("elections.compareVoteSeats")}
              </p>
            </div>
          </div>

          {/* Electoral Efficiency Chart */}
          <div className="p-6 bg-card rounded-xl border border-border shadow-card mb-8">
            <div className={`flex items-start justify-between mb-6 ${isUrdu ? 'flex-row-reverse' : ''}`}>
              <div className={isUrdu ? 'text-right' : ''}>
                <h3 className="font-display text-xl font-bold text-foreground">
                  {t("elections.electoralEfficiency")}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t("elections.efficiencyDesc")}
                </p>
              </div>
              <BilingualExportMenu 
                chartRef={efficiencyRef}
                filename="electoral-efficiency"
                data={electoralEfficiency}
                reportTitle={{ en: "Electoral Efficiency Analysis", ur: "انتخابی کارکردگی کا تجزیہ" }}
              />
            </div>
            <div ref={efficiencyRef} className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={electoralEfficiency} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(40, 20%, 88%)" />
                  <XAxis 
                    type="number" 
                    stroke="hsl(40, 10%, 40%)"
                    fontSize={12}
                    tickLine={false}
                    domain={[-30, 30]}
                    tickFormatter={(value) => `${value > 0 ? '+' : ''}${value}%`}
                  />
                  <YAxis 
                    type="category" 
                    dataKey="year" 
                    stroke="hsl(40, 10%, 40%)"
                    fontSize={12}
                    tickLine={false}
                    width={50}
                  />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(0, 0%, 100%)",
                        border: "1px solid hsl(40, 20%, 88%)",
                        borderRadius: "8px",
                      }}
                      formatter={(value: number, name: string) => [
                        `${value > 0 ? '+' : ''}${value}%`,
                        `${name} (${value > 0 ? t("elections.overperforming") : t("elections.underperforming")})`
                      ]}
                    />
                  <Legend 
                    onClick={handlePartyLegendClick}
                    wrapperStyle={{ cursor: 'pointer' }}
                  />
                  <Bar 
                    dataKey="PPP" 
                    fill={PARTY_COLORS['PPP']} 
                    fillOpacity={getPartyOpacity('PPP')}
                    cursor="pointer"
                    onClick={() => handlePartyClick('PPP')}
                  />
                  <Bar 
                    dataKey="PML-N" 
                    fill={PARTY_COLORS['PML-N']} 
                    fillOpacity={getPartyOpacity('PML-N')}
                    cursor="pointer"
                    onClick={() => handlePartyClick('PML-N')}
                  />
                  <Bar 
                    dataKey="PTI" 
                    fill={PARTY_COLORS['PTI']} 
                    fillOpacity={getPartyOpacity('PTI')}
                    cursor="pointer"
                    onClick={() => handlePartyClick('PTI')}
                  />
                  <Bar 
                    dataKey="Others" 
                    fill={PARTY_COLORS['Others']} 
                    fillOpacity={getPartyOpacity('Others')}
                    cursor="pointer"
                    onClick={() => handlePartyClick('Others')}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              {t("elections.efficiencyExplanationLong")}
            </p>
          </div>

          {/* Efficiency Summary Card */}
          {efficiencySummary.mostEfficient && efficiencySummary.leastEfficient && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="p-5 bg-card rounded-xl border border-border shadow-card flex items-center gap-4">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${PARTY_COLORS[efficiencySummary.mostEfficient.party]}20` }}
                >
                  <TrendingUp 
                    className="w-6 h-6" 
                    style={{ color: PARTY_COLORS[efficiencySummary.mostEfficient.party] }} 
                  />
                </div>
                <div className={isUrdu ? 'text-right' : ''}>
                  <p className="text-sm text-muted-foreground">{t("elections.mostEfficientParty")}</p>
                  <div className={`flex items-baseline gap-2 ${isUrdu ? 'flex-row-reverse justify-end' : ''}`}>
                    <span 
                      className="font-display text-xl font-bold"
                      style={{ color: PARTY_COLORS[efficiencySummary.mostEfficient.party] }}
                    >
                      {efficiencySummary.mostEfficient.party}
                    </span>
                    <span className="text-sm text-emerald-600 font-medium">
                      +{efficiencySummary.mostEfficient.avg}% avg
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {t("elections.seatShareExceeds")} {yearRange[0]}–{yearRange[1]}
                  </p>
                </div>
              </div>
              <div className={`p-5 bg-card rounded-xl border border-border shadow-card flex items-center gap-4 ${isUrdu ? 'flex-row-reverse' : ''}`}>
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${PARTY_COLORS[efficiencySummary.leastEfficient.party]}20` }}
                >
                  <TrendingUp 
                    className="w-6 h-6 rotate-180" 
                    style={{ color: PARTY_COLORS[efficiencySummary.leastEfficient.party] }} 
                  />
                </div>
                <div className={isUrdu ? 'text-right' : ''}>
                  <p className="text-sm text-muted-foreground">{t("elections.leastEfficientParty")}</p>
                  <div className={`flex items-baseline gap-2 ${isUrdu ? 'flex-row-reverse justify-end' : ''}`}>
                    <span 
                      className="font-display text-xl font-bold"
                      style={{ color: PARTY_COLORS[efficiencySummary.leastEfficient.party] }}
                    >
                      {efficiencySummary.leastEfficient.party}
                    </span>
                    <span className="text-sm text-rose-600 font-medium">
                      {efficiencySummary.leastEfficient.avg}% avg
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {t("elections.seatShareTrails")} {yearRange[0]}–{yearRange[1]}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Efficiency Breakdown Table */}
          {electoralEfficiency.length > 0 && (
            <div className="p-6 bg-card rounded-xl border border-border shadow-card mb-8">
              <div className={`flex items-start justify-between mb-6 ${isUrdu ? 'flex-row-reverse' : ''}`}>
                <div className={isUrdu ? 'text-right' : ''}>
                  <h3 className="font-display text-xl font-bold text-foreground">
                    {t("elections.yearByYearBreakdown")}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t("elections.yearByYearDesc")}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const csvData = electoralEfficiency.map(row => ({
                      Year: row.year,
                      'PPP Efficiency (%)': typeof row.PPP === 'number' ? row.PPP.toFixed(1) : 'N/A',
                      'PML-N Efficiency (%)': typeof row['PML-N'] === 'number' ? row['PML-N'].toFixed(1) : 'N/A',
                      'PTI Efficiency (%)': typeof row.PTI === 'number' ? row.PTI.toFixed(1) : 'N/A',
                      'Others Efficiency (%)': typeof row.Others === 'number' ? row.Others.toFixed(1) : 'N/A',
                    }));
                    exportBilingualCSV(csvData, `electoral-efficiency-${yearRange[0]}-${yearRange[1]}`, 'bilingual');
                  }}
                  className={`flex items-center gap-2 ${isUrdu ? 'flex-row-reverse' : ''}`}
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  {t("elections.exportCSV")}
                </Button>
              </div>
              <div className="overflow-x-auto">
                <TooltipProvider>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className={`py-3 px-4 font-semibold text-foreground ${isUrdu ? 'text-right' : 'text-left'}`}>
                          <UITooltip>
                            <TooltipTrigger asChild>
                              <span className={`inline-flex items-center gap-1.5 cursor-help ${isUrdu ? 'flex-row-reverse' : ''}`}>
                                {t("elections.year")}
                                <Info className="w-3.5 h-3.5 text-muted-foreground" />
                              </span>
                            </TooltipTrigger>
                            <TooltipContent className="max-w-xs">
                              <p className="font-semibold mb-1">{t("elections.efficiencyFormula")}</p>
                              <p className="text-xs">Efficiency = Seat Share % − Vote Share %</p>
                              <p className="text-xs mt-1.5 text-muted-foreground">
                                {t("elections.efficiencyExplanation")}
                              </p>
                            </TooltipContent>
                          </UITooltip>
                        </th>
                        {['PPP', 'PML-N', 'PTI', 'Others'].map(party => (
                          <th 
                            key={party}
                            className="text-center py-3 px-4 font-semibold cursor-pointer hover:bg-muted/50 transition-colors rounded"
                            style={{ 
                              color: PARTY_COLORS[party],
                              opacity: selectedParty && selectedParty !== party ? 0.3 : 1
                            }}
                            onClick={() => selectedParty === party ? clearPartyFilter() : setSelectedParty(party)}
                          >
                            <UITooltip>
                              <TooltipTrigger asChild>
                                <span className="inline-flex items-center gap-1">
                                  {party}
                                  <Info className="w-3 h-3 opacity-50" />
                                </span>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="text-xs">{t("elections.clickToFilter")} {party}</p>
                              </TooltipContent>
                            </UITooltip>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                    {electoralEfficiency.map((row, idx) => (
                      <tr 
                        key={row.year as number} 
                        className={`border-b border-border/50 hover:bg-muted/30 transition-colors ${
                          idx % 2 === 0 ? 'bg-muted/10' : ''
                        }`}
                      >
                        <td className={`py-3 px-4 font-medium text-foreground ${isUrdu ? 'text-right' : ''}`}>{row.year}</td>
                        {['PPP', 'PML-N', 'PTI', 'Others'].map(party => {
                          const value = row[party] as number;
                          const isPositive = value > 0;
                          const isHighlighted = !selectedParty || selectedParty === party;
                          return (
                            <td 
                              key={party}
                              className="text-center py-3 px-4 font-mono"
                              style={{ opacity: isHighlighted ? 1 : 0.3 }}
                            >
                              <span 
                                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                                  isPositive 
                                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' 
                                    : 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400'
                                }`}
                              >
                                {isPositive ? '+' : ''}{value}%
                              </span>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                    {/* Average Row */}
                    <tr className="bg-muted/40 font-semibold">
                      <td className={`py-3 px-4 text-foreground ${isUrdu ? 'text-right' : ''}`}>{t("elections.average")}</td>
                      {['PPP', 'PML-N', 'PTI', 'Others'].map(party => {
                        const values = electoralEfficiency
                          .map(d => d[party] as number)
                          .filter(v => typeof v === 'number' && !isNaN(v));
                        const avg = values.length > 0 
                          ? values.reduce((sum, v) => sum + v, 0) / values.length 
                          : 0;
                        const isPositive = avg > 0;
                        const isHighlighted = !selectedParty || selectedParty === party;
                        return (
                          <td 
                            key={party}
                            className="text-center py-3 px-4 font-mono"
                            style={{ opacity: isHighlighted ? 1 : 0.3 }}
                          >
                            <span 
                              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold ${
                                isPositive 
                                  ? 'bg-emerald-200 text-emerald-800 dark:bg-emerald-800/50 dark:text-emerald-300' 
                                  : 'bg-rose-200 text-rose-800 dark:bg-rose-800/50 dark:text-rose-300'
                              }`}
                            >
                              {isPositive ? '+' : ''}{avg.toFixed(1)}%
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                    </tbody>
                  </table>
                </TooltipProvider>
              </div>
              <p className="text-xs text-muted-foreground mt-4 text-center">
                {t("elections.clickPartyHeader")}
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Provincial Seats - Stacked Bar Chart */}
            <div className="p-6 bg-card rounded-xl border border-border shadow-card">
              <div className={`flex items-start justify-between mb-6 ${isUrdu ? 'flex-row-reverse' : ''}`}>
                <div className={isUrdu ? 'text-right' : ''}>
                  <h3 className="font-display text-xl font-bold text-foreground">
                    {t("elections.seatsByProvince")}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t("elections.seatsByProvinceDesc")}
                  </p>
                </div>
                <BilingualExportMenu 
                  chartRef={provincialSeatsRef}
                  filename="provincial-seats"
                  data={filteredProvincialSeats}
                  reportTitle={{ en: "Seats by Province", ur: "صوبے کے لحاظ سے نشستیں" }}
                />
              </div>
              <div ref={provincialSeatsRef} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={filteredProvincialSeats}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(40, 20%, 88%)" />
                    <XAxis
                      dataKey="year"
                      stroke="hsl(40, 10%, 40%)"
                      fontSize={11}
                      tickLine={false}
                    />
                    <YAxis
                      stroke="hsl(40, 10%, 40%)"
                      fontSize={12}
                      tickLine={false}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(0, 0%, 100%)",
                        border: "1px solid hsl(40, 20%, 88%)",
                        borderRadius: "8px",
                      }}
                      formatter={(value: number, name: string) => [`${value} ${t("elections.seats")}`, name]}
                    />
                    <Legend 
                      onClick={handleProvinceLegendClick}
                      wrapperStyle={{ cursor: 'pointer' }}
                    />
                    <Bar 
                      dataKey="Punjab" 
                      stackId="a" 
                      fill={PROVINCE_COLORS['Punjab']} 
                      fillOpacity={getProvinceOpacity('Punjab')}
                      cursor="pointer"
                      onClick={() => handleProvinceClick('Punjab')}
                    />
                    <Bar 
                      dataKey="Sindh" 
                      stackId="a" 
                      fill={PROVINCE_COLORS['Sindh']} 
                      fillOpacity={getProvinceOpacity('Sindh')}
                      cursor="pointer"
                      onClick={() => handleProvinceClick('Sindh')}
                    />
                    <Bar 
                      dataKey="KPK" 
                      stackId="a" 
                      fill={PROVINCE_COLORS['KPK']} 
                      fillOpacity={getProvinceOpacity('KPK')}
                      cursor="pointer"
                      onClick={() => handleProvinceClick('KPK')}
                    />
                    <Bar 
                      dataKey="Balochistan" 
                      stackId="a" 
                      fill={PROVINCE_COLORS['Balochistan']} 
                      fillOpacity={getProvinceOpacity('Balochistan')}
                      cursor="pointer"
                      onClick={() => handleProvinceClick('Balochistan')}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                {t("elections.clickProvinceFilter")}
              </p>
            </div>

            {/* Provincial Turnout Comparison */}
            <div className="p-6 bg-card rounded-xl border border-border shadow-card">
              <div className={`flex items-start justify-between mb-6 ${isUrdu ? 'flex-row-reverse' : ''}`}>
                <div className={isUrdu ? 'text-right' : ''}>
                  <h3 className="font-display text-xl font-bold text-foreground">
                    {t("elections.regionalVoting")}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t("elections.regionalVotingDesc")}
                  </p>
                </div>
                <BilingualExportMenu 
                  chartRef={provincialTurnoutRef}
                  filename="provincial-turnout"
                  data={filteredProvincialTurnout}
                  reportTitle={{ en: "Provincial Voter Turnout", ur: "صوبائی ووٹر ٹرن آؤٹ" }}
                />
              </div>
              <div ref={provincialTurnoutRef} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={filteredProvincialTurnout} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(40, 20%, 88%)" />
                    <XAxis
                      type="number"
                      stroke="hsl(40, 10%, 40%)"
                      fontSize={12}
                      tickLine={false}
                      domain={[0, 70]}
                      tickFormatter={(value) => `${value}%`}
                    />
                    <YAxis
                      dataKey="year"
                      type="category"
                      stroke="hsl(40, 10%, 40%)"
                      fontSize={12}
                      tickLine={false}
                      width={60}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(0, 0%, 100%)",
                        border: "1px solid hsl(40, 20%, 88%)",
                        borderRadius: "8px",
                      }}
                      formatter={(value: number, name: string) => [`${value}%`, name]}
                    />
                    <Legend 
                      onClick={handleProvinceLegendClick}
                      wrapperStyle={{ cursor: 'pointer' }}
                    />
                    <Bar 
                      dataKey="Punjab" 
                      fill={PROVINCE_COLORS['Punjab']} 
                      fillOpacity={getProvinceOpacity('Punjab')}
                      cursor="pointer"
                      onClick={() => handleProvinceClick('Punjab')}
                    />
                    <Bar 
                      dataKey="Sindh" 
                      fill={PROVINCE_COLORS['Sindh']} 
                      fillOpacity={getProvinceOpacity('Sindh')}
                      cursor="pointer"
                      onClick={() => handleProvinceClick('Sindh')}
                    />
                    <Bar 
                      dataKey="KPK" 
                      fill={PROVINCE_COLORS['KPK']} 
                      fillOpacity={getProvinceOpacity('KPK')}
                      cursor="pointer"
                      onClick={() => handleProvinceClick('KPK')}
                    />
                    <Bar 
                      dataKey="Balochistan" 
                      fill={PROVINCE_COLORS['Balochistan']} 
                      fillOpacity={getProvinceOpacity('Balochistan')}
                      cursor="pointer"
                      onClick={() => handleProvinceClick('Balochistan')}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                {t("elections.clickProvinceFilter")}
              </p>
            </div>
          </div>

          {/* Party-wise Provincial Breakdown */}
          <div className="p-6 bg-card rounded-xl border border-border shadow-card mb-8">
            <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 ${isUrdu ? 'sm:flex-row-reverse' : ''}`}>
              <div className={isUrdu ? 'text-right' : ''}>
                <h3 className="font-display text-xl font-bold text-foreground">
                  {t("elections.partyProvincialBreakdown")}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t("elections.partyProvincialDesc")}
                </p>
              </div>
              <div className={`flex items-center gap-3 ${isUrdu ? 'flex-row-reverse' : ''}`}>
                <Select 
                  value={activePartyYear?.toString() || ""} 
                  onValueChange={(val) => setSelectedPartyYear(Number(val))}
                >
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder={t("elections.selectYear")} />
                  </SelectTrigger>
                  <SelectContent>
                    {availableYears.map(year => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <BilingualExportMenu 
                  chartRef={partyBreakdownRef}
                  filename="party-provincial-breakdown"
                  data={partyBreakdownData}
                  reportTitle={{ en: "Party-wise Provincial Breakdown", ur: "جماعت کے لحاظ سے صوبائی تقسیم" }}
                />
              </div>
            </div>
            {partyBreakdownData.length > 0 ? (
              <div ref={partyBreakdownRef} className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={selectedProvince 
                      ? partyBreakdownData.filter(d => d.province === selectedProvince)
                      : partyBreakdownData
                    } 
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(40, 20%, 88%)" />
                    <XAxis
                      type="number"
                      stroke="hsl(40, 10%, 40%)"
                      fontSize={12}
                      tickLine={false}
                    />
                    <YAxis
                      dataKey="province"
                      type="category"
                      stroke="hsl(40, 10%, 40%)"
                      fontSize={12}
                      tickLine={false}
                      width={90}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(0, 0%, 100%)",
                        border: "1px solid hsl(40, 20%, 88%)",
                        borderRadius: "8px",
                      }}
                      formatter={(value: number, name: string) => [`${value} ${t("elections.seats")}`, name]}
                    />
                    <Legend 
                      onClick={handlePartyLegendClick}
                      wrapperStyle={{ cursor: 'pointer' }}
                    />
                    <Bar 
                      dataKey="PML-N" 
                      fill={PARTY_COLORS['PML-N']} 
                      fillOpacity={getPartyOpacity('PML-N')}
                      radius={[0, 4, 4, 0]} 
                      cursor="pointer"
                      onClick={() => handlePartyClick('PML-N')}
                    />
                    <Bar 
                      dataKey="PTI" 
                      fill={PARTY_COLORS['PTI']} 
                      fillOpacity={getPartyOpacity('PTI')}
                      radius={[0, 4, 4, 0]} 
                      cursor="pointer"
                      onClick={() => handlePartyClick('PTI')}
                    />
                    <Bar 
                      dataKey="PPP" 
                      fill={PARTY_COLORS['PPP']} 
                      fillOpacity={getPartyOpacity('PPP')}
                      radius={[0, 4, 4, 0]} 
                      cursor="pointer"
                      onClick={() => handlePartyClick('PPP')}
                    />
                    <Bar 
                      dataKey="Others" 
                      fill={PARTY_COLORS['Others']} 
                      fillOpacity={getPartyOpacity('Others')}
                      radius={[0, 4, 4, 0]} 
                      cursor="pointer"
                      onClick={() => handlePartyClick('Others')}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-[350px] flex items-center justify-center text-muted-foreground">
                {t("elections.noDataAvailable")}
              </div>
            )}
          </div>

          {/* Election History Table */}
          <div className="bg-card rounded-xl border border-border overflow-hidden shadow-card">
            <div className={`p-6 border-b border-border ${isUrdu ? 'text-right' : ''}`}>
              <h3 className="font-display text-xl font-bold text-foreground">
                {t("elections.completeHistory")}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t("elections.completeHistoryDesc")} {yearRange[0]} {t("elections.to")} {yearRange[1]}
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/50 border-b border-border">
                    <th className={`p-4 font-display font-semibold text-foreground ${isUrdu ? 'text-right' : 'text-left'}`}>{t("elections.year")}</th>
                    <th className={`p-4 font-display font-semibold text-foreground ${isUrdu ? 'text-right' : 'text-left'}`}>{t("elections.winningParty")}</th>
                    <th className={`p-4 font-display font-semibold text-foreground ${isUrdu ? 'text-left' : 'text-right'}`}>{t("elections.seatsWon")}</th>
                    <th className={`p-4 font-display font-semibold text-foreground ${isUrdu ? 'text-left' : 'text-right'}`}>{t("elections.voteShare")}</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredElectionData.map((election) => (
                    <tr 
                      key={election.year} 
                      className="border-b border-border/50 hover:bg-muted/30 transition-colors"
                    >
                      <td className={`p-4 font-medium text-foreground ${isUrdu ? 'text-right' : ''}`}>{election.year}</td>
                      <td className={`p-4 ${isUrdu ? 'text-right' : ''}`}>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-data-blue/10 text-data-blue">
                          {election.party}
                        </span>
                      </td>
                      <td className={`p-4 font-medium text-foreground ${isUrdu ? 'text-left' : 'text-right'}`}>{election.seats}</td>
                      <td className={`p-4 text-muted-foreground ${isUrdu ? 'text-left' : 'text-right'}`}>{election.votes}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

const Elections = () => {
  return (
    <TimeFilterProvider>
      <ProvinceFilterProvider>
        <PartyFilterProvider>
          <ElectionsContent />
        </PartyFilterProvider>
      </ProvinceFilterProvider>
    </TimeFilterProvider>
  );
};

export default Elections;
