import { useRef } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { enrollmentTrends } from "@/data/pakistanData";
import { useTimeFilter } from "@/contexts/TimeFilterContext";
import { ChartExportMenu } from "@/components/ChartExportMenu";

export const EnrollmentTrendChart = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const { yearRange } = useTimeFilter();

  // Filter data based on year range
  const filteredData = enrollmentTrends.filter(
    (item) => item.year >= yearRange[0] && item.year <= yearRange[1]
  );

  const isFiltered = yearRange[0] !== 1970 || yearRange[1] !== 2024;

  return (
    <div ref={chartRef} className="w-full h-[350px] p-6 bg-card rounded-xl border border-border shadow-card">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="font-display text-xl font-bold text-foreground">
            School Enrollment Trends
          </h3>
          <p className="text-sm text-muted-foreground">
            Students enrolled by education level (millions)
          </p>
        </div>
        <div className="flex items-center gap-2">
          {isFiltered && (
            <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium">
              {yearRange[0]} - {yearRange[1]}
            </span>
          )}
          <ChartExportMenu
            chartRef={chartRef}
            data={filteredData}
            filename="enrollment-trends"
          />
        </div>
      </div>
      <ResponsiveContainer width="100%" height="80%">
        <LineChart data={filteredData}>
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
              boxShadow: "0 4px 20px -4px rgba(0,0,0,0.1)",
            }}
            formatter={(value: number) => [`${value.toFixed(1)}M`, ""]}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="primary"
            name="Primary"
            stroke="hsl(150, 98%, 13%)"
            strokeWidth={3}
            dot={{ fill: "hsl(150, 98%, 13%)", strokeWidth: 2 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="secondary"
            name="Secondary"
            stroke="hsl(220, 70%, 50%)"
            strokeWidth={3}
            dot={{ fill: "hsl(220, 70%, 50%)", strokeWidth: 2 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="higher"
            name="Higher Education"
            stroke="hsl(38, 92%, 50%)"
            strokeWidth={3}
            dot={{ fill: "hsl(38, 92%, 50%)", strokeWidth: 2 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
