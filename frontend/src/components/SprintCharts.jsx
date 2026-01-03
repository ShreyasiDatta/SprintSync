import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const COLORS = ["#22c55e", "#facc15", "#e5e7eb"]; // done, in-progress, todo

function SprintCharts({ tasks }) {
  const done = tasks.filter((t) => t.status === "Done").length;
  const inProgress = tasks.filter((t) => t.status === "In Progress").length;
  const todo = tasks.filter((t) => t.status === "Todo").length;

  const total = tasks.length || 1;
  const completionPercent = Math.round((done / total) * 100);

  // 🟢🟡🔴 Risk logic
  let risk = "On Track";
  let riskColor = "text-green-600";

  if (completionPercent < 40) {
    risk = "At Risk";
    riskColor = "text-red-600";
  } else if (completionPercent < 70) {
    risk = "Needs Attention";
    riskColor = "text-yellow-600";
  }

  const data = [
    { name: "Done", value: done },
    { name: "In Progress", value: inProgress },
    { name: "Todo", value: todo },
  ];

  return (
    <div className="bg-white border rounded-lg p-4 mb-6 shadow-sm">
      <h3 className="font-semibold text-lg mb-4">📊 Sprint Progress</h3>

      <div className="flex flex-col md:flex-row gap-6 items-center">
        {/* Chart */}
        <div className="w-full md:w-1/2 h-56">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
                label
              >
                {data.map((_, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Metrics */}
        <div className="w-full md:w-1/2">
          <p className="text-sm mb-2">
            <strong>Completion:</strong> {completionPercent}%
          </p>
          <p className={`text-sm font-semibold ${riskColor}`}>
            Risk Status: {risk}
          </p>
        </div>
      </div>
    </div>
  );
}

export default SprintCharts;
