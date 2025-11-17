import { CloudSun } from "lucide-react";

export default function WeatherWidget() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
      <div className="flex items-center gap-3">
        <CloudSun className="w-8 h-8 text-yellow-400" />
        <div>
          <div className="text-2xl font-bold text-white">27.4 °C</div>
          <div className="text-xs text-gray-400">{today}</div>
        </div>
      </div>
    </div>
  );
}

