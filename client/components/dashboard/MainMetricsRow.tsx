import { Thermometer, Gauge, Battery } from "lucide-react";
import MetricsCard from "./MetricsCard";

interface MainMetricsRowProps {
  temperature: number;
  pressure: number;
  battery: number;
}

export default function MainMetricsRow({
  temperature,
  pressure,
  battery,
}: MainMetricsRowProps) {
  // Calculate estimated runtime (mock calculation)
  const estimatedRuntime = Math.round((battery / 100) * 8); // hours

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Robot Temperature */}
      <MetricsCard
        label="Robot Temperature"
        value={`${temperature.toFixed(1)}°C`}
        icon={Thermometer}
        iconColor="text-orange-400"
        gradient="from-orange-500/10 to-transparent"
      >
        <div className="mt-4">
          <div className="h-2 bg-black/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-orange-400 to-red-500 rounded-full transition-all duration-500"
              style={{ width: `${Math.min((temperature / 80) * 100, 100)}%` }}
            />
          </div>
          <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
            <span>Normal</span>
            <span className={temperature > 60 ? "text-red-400" : "text-gray-400"}>
              {temperature > 60 ? "High" : "Optimal"}
            </span>
          </div>
        </div>
      </MetricsCard>

      {/* Pump Pressure */}
      <MetricsCard
        label="Pump Pressure"
        value={`${pressure.toFixed(2)} bar`}
        icon={Gauge}
        iconColor="text-blue-400"
        gradient="from-blue-500/10 to-transparent"
      >
        <div className="mt-4">
          <div className="h-2 bg-black/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full transition-all duration-500"
              style={{ width: `${Math.min((pressure / 1.5) * 100, 100)}%` }}
            />
          </div>
          <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
            <span>Stable</span>
            <span className="text-[#00ffab]">Optimal</span>
          </div>
        </div>
      </MetricsCard>

      {/* Battery Level */}
      <MetricsCard
        label="Battery Level"
        value={`${battery.toFixed(0)}%`}
        icon={Battery}
        iconColor="text-[#00ffab]"
        gradient="from-[#00ffab]/10 to-transparent"
      >
        <div className="mt-4">
          <div className="h-2 bg-black/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#00ffab] to-emerald-400 rounded-full transition-all duration-500"
              style={{ width: `${battery}%` }}
            />
          </div>
          <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
            <span>Estimated runtime</span>
            <span className="text-[#00ffab]">{estimatedRuntime}h</span>
          </div>
        </div>
      </MetricsCard>
    </div>
  );
}

