import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";

const COLORS = ["#3b82f6", "#22c55e", "#ef4444", "#f59e0b", "#8b5cf6"];

export default function CategoryChart({ data }: any) {
  const map: any = {};

  data.forEach((t: any) => {
    if (t.type === "expense") {
      map[t.category] = (map[t.category] || 0) + t.amount;
    }
  });

  const chartData = Object.keys(map).map((key) => ({
    name: key,
    value: map[key],
  }));

  return (
    <div className="card">
      <h2 className="section-title">Spending Breakdown</h2>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={chartData} dataKey="value" label>
            {chartData.map((_: any, i: number) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}