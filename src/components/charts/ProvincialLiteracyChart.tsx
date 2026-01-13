import { useRef } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from "recharts";
import { provincialLiteracy } from "@/data/pakistanData";
import { useProvinceFilter } from "@/contexts/ProvinceFilterContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { ChartExportMenu } from "@/components/ChartExportMenu";

export const ProvincialLiteracyChart = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const { selectedProvince } = useProvinceFilter();
  const { t, isUrdu } = useLanguage();

  // Filter data based on selected province
  const filteredData = selectedProvince
    ? provincialLiteracy.filter(item => item.province === selectedProvince)
    : provincialLiteracy;

  const isFiltered = (province: string) => {
    if (!selectedProvince) return false;
    return province !== selectedProvince;
  };

  return (
    <div ref={chartRef} className="w-full h-[400px] p-6 bg-card rounded-xl border border-border shadow-card">
      <div className={`mb-6 flex items-center justify-between ${isUrdu ? 'flex-row-reverse' : ''}`}>
        <div className={isUrdu ? 'text-right' : ''}>
          <h3 className={`font-display text-xl font-bold text-foreground ${isUrdu ? 'font-urdu' : ''}`}>
            {t("education.provincialComparison")}
          </h3>
          <p className={`text-sm text-muted-foreground ${isUrdu ? 'font-urdu' : ''}`}>
            {t("education.provincialComparisonDesc")}
          </p>
        </div>
        <div className={`flex items-center gap-2 ${isUrdu ? 'flex-row-reverse' : ''}`}>
          {selectedProvince && (
            <span className={`px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium ${isUrdu ? 'font-urdu' : ''}`}>
              {t("education.filtered")}: {selectedProvince}
            </span>
          )}
          <ChartExportMenu
            chartRef={chartRef}
            data={filteredData}
            filename="provincial-literacy"
          />
        </div>
      </div>
      <ResponsiveContainer width="100%" height="80%">
        <BarChart data={filteredData} barGap={2}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(40, 20%, 88%)" />
          <XAxis
            dataKey="province"
            stroke="hsl(40, 10%, 40%)"
            fontSize={11}
            tickLine={false}
            angle={-15}
            textAnchor="end"
            height={60}
          />
          <YAxis
            stroke="hsl(40, 10%, 40%)"
            fontSize={12}
            tickLine={false}
            domain={[0, 100]}
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(0, 0%, 100%)",
              border: "1px solid hsl(40, 20%, 88%)",
              borderRadius: "8px",
              boxShadow: "0 4px 20px -4px rgba(0,0,0,0.1)",
            }}
            formatter={(value: number) => [`${value.toFixed(1)}%`, ""]}
          />
          <Legend />
          <Bar dataKey="male" name={t("education.male")} fill="hsl(220, 70%, 50%)" radius={[4, 4, 0, 0]} />
          <Bar dataKey="female" name={t("education.female")} fill="hsl(38, 92%, 50%)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};