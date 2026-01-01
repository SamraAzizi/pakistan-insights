import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { gdpByProvince } from "@/data/pakistanData";

const COLORS = [
  "hsl(150, 60%, 35%)",
  "hsl(220, 70%, 50%)",
  "hsl(38, 92%, 50%)",
  "hsl(10, 80%, 60%)",
];

export const GDPPieChart = () => {
  return (
    <div className="w-full h-[350px] p-6 bg-card rounded-xl border border-border shadow-card">
      <div className="mb-4">
        <h3 className="font-display text-xl font-bold text-foreground">
          GDP by Province
        </h3>
        <p className="text-sm text-muted-foreground">
          Share of national GDP contribution
        </p>
      </div>
      <ResponsiveContainer width="100%" height="80%">
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
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
    </div>
  );
};
