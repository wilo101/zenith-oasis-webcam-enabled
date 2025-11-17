import { Navigation, MapPin, Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function GPSMissionInfo() {
  const lat = 30.0444;
  const lng = 31.2357;
  const heading = 149;
  const speed = 2.3;
  const gpsStatus = "Stable";
  const location = "Cairo, EG";
  const missionTime = "02:34:15";
  const missionStatus = "Active";

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 relative z-20"
    >
      <div className="space-y-2">
        <div className="flex items-center gap-2 mb-3">
          <Navigation className="w-5 h-5 text-emerald-400" />
          <span className="text-sm font-semibold text-white">GPS & Mission Info</span>
        </div>
        
        {/* Map Thumbnail */}
        <div className="mb-3 rounded-lg overflow-hidden border border-white/10">
          <div className="relative w-full h-16 bg-gradient-to-br from-gray-800 to-gray-900">
            {/* Simple map representation */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ opacity: [0.6, 0.8, 0.6] }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-2 h-2 bg-emerald-400 rounded-full shadow-lg shadow-emerald-400/50"
              />
            </div>
            {/* Grid lines */}
            <svg className="absolute inset-0 w-full h-full opacity-20">
              {Array.from({ length: 5 }).map((_, i) => (
                <line key={`h-${i}`} x1="0" y1={i * 20} x2="100%" y2={i * 20} stroke="white" strokeWidth="0.5" />
              ))}
              {Array.from({ length: 5 }).map((_, i) => (
                <line key={`v-${i}`} x1={i * 25} y1="0" x2={i * 25} y2="100%" stroke="white" strokeWidth="0.5" />
              ))}
            </svg>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <div className="text-gray-400">Coordinates</div>
            <div className="text-white font-mono">{lat.toFixed(4)}°N</div>
            <div className="text-white font-mono">{lng.toFixed(4)}°E</div>
          </div>
          <div>
            <div className="text-gray-400">Heading</div>
            <div className="text-white font-semibold">{heading}°</div>
            <div className="text-gray-400 mt-1">Speed</div>
            <div className="text-white font-semibold">{speed} m/s</div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-white/10">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${
              gpsStatus === "Stable" ? "bg-emerald-400" : 
              gpsStatus === "Weak" ? "bg-yellow-400" : "bg-red-400"
            }`} />
            <span className="text-xs text-gray-300">GPS: {gpsStatus}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <MapPin className="w-3 h-3 text-gray-400" />
          <span className="text-gray-300">{location}</span>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-white/10">
          <div className="flex items-center gap-2">
            <Clock className="w-3 h-3 text-gray-400" />
            <span className="text-xs text-gray-300">{missionTime}</span>
          </div>
          <span className={`text-xs px-2 py-1 rounded ${
            missionStatus === "Active" ? "bg-emerald-500/20 text-emerald-400" : "bg-gray-500/20 text-gray-400"
          }`}>
            {missionStatus}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

