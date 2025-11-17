import { Wifi, Navigation, Droplet, Battery } from "lucide-react";
import GPSMissionInfo from "./GPSMissionInfo";

export default function WelcomeHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white font-bold text-lg">
          FB
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-white">
            Welcome back Operator.
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            All FireBot systems are functioning normally.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-white/5 flex items-center gap-2">
            <Wifi className="w-4 h-4 text-emerald-400" />
            <span className="text-xs text-gray-300">Network</span>
          </div>
          <div className="p-2 rounded-lg bg-white/5 flex items-center gap-2">
            <Navigation className="w-4 h-4 text-emerald-400" />
            <span className="text-xs text-gray-300">GPS</span>
          </div>
          <div className="p-2 rounded-lg bg-white/5 flex items-center gap-2">
            <Droplet className="w-4 h-4 text-blue-400" />
            <span className="text-xs text-gray-300">Pump</span>
          </div>
          <div className="p-2 rounded-lg bg-white/5 flex items-center gap-2">
            <Battery className="w-4 h-4 text-emerald-400" />
            <span className="text-xs text-gray-300">82%</span>
          </div>
        </div>
        <GPSMissionInfo />
      </div>
    </div>
  );
}

