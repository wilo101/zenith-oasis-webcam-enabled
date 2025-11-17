import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const CHART_COLORS = {
  pumpLoad: "#00ffab",   // use sparingly (primary)
  waterOutput: "#2db3ff",
  speed: "#ffb84d",
  thermal: "#ff6b6b"
};

const mockData = [
  { day: "M", pumpLoad: 45, waterOutput: 32, speed: 28, thermal: 42 },
  { day: "T", pumpLoad: 52, waterOutput: 38, speed: 35, thermal: 48 },
  { day: "W", pumpLoad: 48, waterOutput: 35, speed: 30, thermal: 45 },
  { day: "T", pumpLoad: 58, waterOutput: 42, speed: 40, thermal: 52 },
  { day: "F", pumpLoad: 65, waterOutput: 48, speed: 45, thermal: 60 },
  { day: "S", pumpLoad: 55, waterOutput: 40, speed: 38, thermal: 50 },
  { day: "S", pumpLoad: 50, waterOutput: 36, speed: 32, thermal: 46 },
];

export default function OverviewGraphPanel() {
  return (
    <div className="bg-panel p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-title text-lg">Overview</h3>
        <span className="text-label">Last 7 days</span>
      </div>
      <div className="h-[280px] px-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={mockData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis
              dataKey="day"
              stroke="rgba(255,255,255,0.5)"
              style={{ fontSize: "12px" }}
            />
            <YAxis stroke="rgba(255,255,255,0.5)" style={{ fontSize: "12px" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(10, 15, 20, 0.95)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
                color: "#fff",
                backdropFilter: "blur(10px)",
              }}
            />
            <Line
              type="monotone"
              dataKey="pumpLoad"
              stroke={CHART_COLORS.pumpLoad}
              strokeWidth={2.5}
              dot={{ r: 4, fill: CHART_COLORS.pumpLoad, strokeWidth: 0 }}
              activeDot={{ r: 6, fill: CHART_COLORS.pumpLoad, className: "graph-dot-glow" }}
              name="Pump Load"
            />
            <Line
              type="monotone"
              dataKey="waterOutput"
              stroke={CHART_COLORS.waterOutput}
              strokeWidth={2.5}
              dot={{ r: 4, fill: CHART_COLORS.waterOutput, strokeWidth: 0 }}
              activeDot={{ r: 6, fill: CHART_COLORS.waterOutput }}
              name="Water Output"
            />
            <Line
              type="monotone"
              dataKey="speed"
              stroke={CHART_COLORS.speed}
              strokeWidth={2.5}
              dot={{ r: 4, fill: CHART_COLORS.speed, strokeWidth: 0 }}
              activeDot={{ r: 6, fill: CHART_COLORS.speed }}
              name="Movement Speed"
            />
            <Line
              type="monotone"
              dataKey="thermal"
              stroke={CHART_COLORS.thermal}
              strokeWidth={2.5}
              dot={{ r: 4, fill: CHART_COLORS.thermal, strokeWidth: 0 }}
              activeDot={{ r: 6, fill: CHART_COLORS.thermal }}
              name="Thermal Data"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center justify-center gap-6 mt-6 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: CHART_COLORS.pumpLoad }} />
          <span className="text-label">Pump Load</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: CHART_COLORS.waterOutput }} />
          <span className="text-label">Water Output</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: CHART_COLORS.speed }} />
          <span className="text-label">Speed</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: CHART_COLORS.thermal }} />
          <span className="text-label">Thermal</span>
        </div>
      </div>
    </div>
  );
}

