import { motion } from "framer-motion";
import { Radio, Maximize2, Thermometer } from "lucide-react";
import { useState } from "react";
import RobotAvatar from "./RobotAvatar";
import { INDUSTRIAL_TRANSITION } from "@/lib/industrial-motion";

export default function FireBotCamera() {
  const [thermalMode, setThermalMode] = useState(false);
  const currentTime = new Date().toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 2 }}
      animate={{ opacity: 1, y: 0 }}
      transition={INDUSTRIAL_TRANSITION.panel}
      className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 h-full"
    >
      <div className="relative aspect-video bg-gradient-to-br from-gray-800 to-gray-900">
        {/* Placeholder for camera feed */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <Radio className="w-16 h-16 text-gray-600 mx-auto mb-2" />
            <p className="text-gray-500 text-sm">FireBot Front Camera</p>
          </div>
        </div>

        {/* Live indicator */}
        <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
          <motion.div
            animate={{ 
              opacity: [0.6, 1, 0.6]
            }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="relative w-2 h-2"
          >
            <div className="absolute inset-0 bg-red-500 rounded-full" />
          </motion.div>
          <span className="text-xs font-semibold text-white bg-black/50 px-2 py-1 rounded backdrop-blur-sm">
            Live
          </span>
        </div>
        
        {/* Robot Avatar Badge */}
        <div className="absolute top-3 right-16 z-10">
          <RobotAvatar size="sm" showGlow={false} />
        </div>

        {/* Controls */}
        <div className="absolute top-3 right-3 flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            transition={INDUSTRIAL_TRANSITION.fastMicro}
            onClick={() => setThermalMode(!thermalMode)}
            className={`p-2 rounded-lg ${
              thermalMode ? "bg-orange-500/30 text-orange-400" : "bg-white/10 text-gray-300"
            } transition-colors duration-120`}
          >
            <Thermometer className="w-4 h-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            transition={INDUSTRIAL_TRANSITION.fastMicro}
            className="p-2 rounded-lg bg-white/10 text-gray-300 hover:bg-white/20 transition-colors duration-120"
          >
            <Maximize2 className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Timestamp */}
        <div className="absolute bottom-3 right-3 bg-black/50 px-2 py-1 rounded">
          <span className="text-xs text-white font-mono">{currentTime}</span>
        </div>

        {/* Label */}
        <div className="absolute bottom-3 left-3">
          <span className="text-xs text-white bg-black/50 px-2 py-1 rounded">
            {thermalMode ? "Thermal Mode" : "FireBot Front Camera"}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

