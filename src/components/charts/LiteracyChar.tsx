import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { literacyData } from "@/data/pakistanData";

export const LiteracyChart = () => {
  return (
    <div className="w-full h-[400px] p-6 bg-card rounded-xl border border-border shadow-card">
      <div className="mb-6">
        <h3 className="font-display text-xl font-bold text-foreground">
          Literacy Rate Evolution
        </h3>
        <p className="text-sm text-muted-foreground">
          Pakistan's literacy journey from 1981 to 2023
        </p>
      </div>
      <ResponsiveContainer width="100%" height="80%">
        <AreaChart data={literacyData}>
          <defs>
            <linearGradient id="colorMale" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(220, 70%, 50%)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(220, 70%, 50%)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorFemale" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(38, 92%, 50%)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(38, 92%, 50%)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorOverall" x1="0" y1="0" x2="0" y2="1">
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
          <Area
            type="monotone"
            dataKey="male"
            name="Male"
            stroke="hsl(220, 70%, 50%)"
            strokeWidth={2}
            fill="url(#colorMale)"
          />
          <Area
            type="monotone"
            dataKey="female"
            name="Female"
            stroke="hsl(38, 92%, 50%)"
            strokeWidth={2}
            fill="url(#colorFemale)"
          />
          <Area
            type="monotone"
            dataKey="overall"
            name="Overall"
            stroke="hsl(150, 98%, 13%)"
            strokeWidth={3}
            fill="url(#colorOverall)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
