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

export const ProvincialLiteracyChart = () => {
  return (
    <div className="w-full h-[400px] p-6 bg-card rounded-xl border border-border shadow-card">
      <div className="mb-6">
        <h3 className="font-display text-xl font-bold text-foreground">
          Provincial Literacy Comparison
        </h3>
        <p className="text-sm text-muted-foreground">
          Gender gap in education across provinces (2023)
        </p>
      </div>
      <ResponsiveContainer width="100%" height="80%">
        <BarChart data={provincialLiteracy} barGap={2}>
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
          <Bar dataKey="male" name="Male" fill="hsl(220, 70%, 50%)" radius={[4, 4, 0, 0]} />
          <Bar dataKey="female" name="Female" fill="hsl(38, 92%, 50%)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
