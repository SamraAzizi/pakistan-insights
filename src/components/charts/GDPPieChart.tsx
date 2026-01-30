import { useRef } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { gdpByProvince } from "@/data/pakistanData";
import { useProvinceFilter } from "@/contexts/ProvinceFilterContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { BilingualExportMenu } from "@/components/BilingualExportMenu";
import { AnimatedChartWrapper, useChartAnimationKey } from "./AnimatedChartWrapper";

const COLORS = [
  "hsl(150, 60%, 35%)",
  "hsl(220, 70%, 50%)",
  "hsl(38, 92%, 50%)",
  "hsl(10, 80%, 60%)",
];

const COLORS_DIMMED = [
  "hsl(150, 20%, 70%)",
  "hsl(220, 20%, 70%)",
  "hsl(38, 20%, 70%)",
  "hsl(10, 20%, 70%)",
];

export const GDPPieChart = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const { selectedProvince } = useProvinceFilter();
  const { t, isUrdu } = useLanguage();
  const chartKey = useChartAnimationKey(selectedProvince);

  const getColor = (province: string, index: number) => {
    if (!selectedProvince) return COLORS[index % COLORS.length];
    return province === selectedProvince 
      ? COLORS[index % COLORS.length] 
      : COLORS_DIMMED[index % COLORS_DIMMED.length];
  };

  return (
    <div ref={chartRef} className="w-full h-[350px] p-6 bg-card rounded-xl border border-border shadow-card">
      <div className={`mb-4 flex items-center justify-between ${isUrdu ? 'flex-row-reverse' : ''}`}>
        <div className={isUrdu ? 'text-right' : ''}>
          <h3 className={`font-display text-xl font-bold text-foreground ${isUrdu ? 'font-urdu' : ''}`}>
            {isUrdu ? "صوبے کے لحاظ سے جی ڈی پی" : "GDP by Province"}
          </h3>
          <p className={`text-sm text-muted-foreground ${isUrdu ? 'font-urdu' : ''}`}>
            {isUrdu ? "قومی جی ڈی پی میں حصہ" : "Share of national GDP contribution"}
          </p>
        </div>
        <div className={`flex items-center gap-2 ${isUrdu ? 'flex-row-reverse' : ''}`}>
          {selectedProvince && (
            <span className={`px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium ${isUrdu ? 'font-urdu' : ''}`}>
              {isUrdu ? `نمایاں: ${selectedProvince}` : `Highlighted: ${selectedProvince}`}
            </span>
          )}
          <BilingualExportMenu
            chartRef={chartRef}
            data={gdpByProvince}
            filename="gdp-by-province"
            reportTitle={{ en: "GDP by Province", ur: "صوبے کے لحاظ سے جی ڈی پی" }}
          />
        </div>
      </div>
      <AnimatedChartWrapper dataKey={chartKey} className="w-full h-[80%]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={gdpByProvince}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="gdp"
              nameKey="province"
              label={({ province, gdp }) => `${province}: ${gdp}%`}
              labelLine={false}
            >
              {gdpByProvince.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={getColor(entry.province, index)}
                  stroke={selectedProvince === entry.province ? 'hsl(var(--primary))' : 'transparent'}
                  strokeWidth={selectedProvince === entry.province ? 3 : 0}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(0, 0%, 100%)",
                border: "1px solid hsl(40, 20%, 88%)",
                borderRadius: "8px",
                boxShadow: "0 4px 20px -4px rgba(0,0,0,0.1)",
              }}
              formatter={(value: number) => [`${value}%`, "GDP Share"]}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </AnimatedChartWrapper>
    </div>
  );
};
