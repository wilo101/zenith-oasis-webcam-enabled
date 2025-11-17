import { motion } from "framer-motion";
import { INDUSTRIAL_TRANSITION } from "@/lib/industrial-motion";

interface GraphData {
  day: string;
  pumpLoad: number;
  waterOutput: number;
  movementSpeed: number;
  thermalData: number;
  highlight?: boolean;
}

const data: GraphData[] = [
  { day: "M", pumpLoad: 20, waterOutput: 15, movementSpeed: 18, thermalData: 22 },
  { day: "T", pumpLoad: 25, waterOutput: 20, movementSpeed: 22, thermalData: 25 },
  { day: "W", pumpLoad: 22, waterOutput: 18, movementSpeed: 20, thermalData: 23 },
  { day: "T", pumpLoad: 28, waterOutput: 24, movementSpeed: 25, thermalData: 28 },
  { day: "F", pumpLoad: 34, waterOutput: 30, movementSpeed: 32, thermalData: 35, highlight: true },
  { day: "S", pumpLoad: 30, waterOutput: 26, movementSpeed: 28, thermalData: 32 },
  { day: "S", pumpLoad: 26, waterOutput: 22, movementSpeed: 24, thermalData: 28 },
];

const maxValue = Math.max(...data.flatMap((d) => [d.pumpLoad, d.waterOutput, d.movementSpeed, d.thermalData]));

export default function PowerUsageGraph() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 2 }}
      animate={{ opacity: 1, y: 0 }}
      transition={INDUSTRIAL_TRANSITION.panel}
      className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 h-full"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-white">Overview</h3>
          <p className="text-sm text-gray-400">Robot Activity & Sensor Data</p>
        </div>
      </div>

      <div className="relative h-48 mt-6">
        {/* Grid lines */}
        <div className="absolute inset-0 flex flex-col justify-between pb-8">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="h-px bg-white/5" />
          ))}
        </div>

        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-xs text-gray-500">
          <span>40</span>
          <span>30</span>
          <span>20</span>
          <span>10</span>
          <span>0</span>
        </div>

        {/* Graph - Multi-line chart */}
        <div className="relative h-full flex items-end justify-between gap-2 ml-8">
          {data.map((item, index) => (
            <div key={item.day} className="flex-1 flex flex-col items-center justify-end gap-1">
              {/* Multiple bars for different metrics */}
              <div className="w-full flex gap-0.5 items-end">
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ ...INDUSTRIAL_TRANSITION.data, delay: 0.1 + index * 0.03, ease: "linear" }}
                  whileHover={{ scale: 1.02 }}
                  className="flex-1 bg-gradient-to-t from-blue-500/80 to-blue-400/60 rounded-t relative group cursor-pointer"
                  style={{ height: `${(item.pumpLoad / maxValue) * 100}%`, transformOrigin: "bottom" }}
                >
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-20">
                    Pump: {item.pumpLoad} kw
                  </div>
                  <div className="absolute inset-0 bg-blue-400/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ ...INDUSTRIAL_TRANSITION.data, delay: 0.13 + index * 0.03, ease: "linear" }}
                  whileHover={{ scale: 1.02 }}
                  className="flex-1 bg-gradient-to-t from-cyan-500/80 to-cyan-400/60 rounded-t relative group cursor-pointer"
                  style={{ height: `${(item.waterOutput / maxValue) * 100}%`, transformOrigin: "bottom" }}
                >
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-20">
                    Water: {item.waterOutput} L
                  </div>
                  <div className="absolute inset-0 bg-cyan-400/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ ...INDUSTRIAL_TRANSITION.data, delay: 0.16 + index * 0.03, ease: "linear" }}
                  whileHover={{ scale: 1.02 }}
                  className="flex-1 bg-gradient-to-t from-emerald-500/80 to-emerald-400/60 rounded-t relative group cursor-pointer"
                  style={{ height: `${(item.movementSpeed / maxValue) * 100}%`, transformOrigin: "bottom" }}
                >
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-20">
                    Speed: {item.movementSpeed} m/s
                  </div>
                  <div className="absolute inset-0 bg-emerald-400/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ ...INDUSTRIAL_TRANSITION.data, delay: 0.19 + index * 0.03, ease: "linear" }}
                  whileHover={{ scale: 1.02 }}
                  className="flex-1 bg-gradient-to-t from-orange-500/80 to-orange-400/60 rounded-t relative group cursor-pointer"
                  style={{ height: `${(item.thermalData / maxValue) * 100}%`, transformOrigin: "bottom" }}
                >
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-20">
                    Thermal: {item.thermalData}°C
                  </div>
                  <div className="absolute inset-0 bg-orange-400/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              </div>
              {item.highlight && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ ...INDUSTRIAL_TRANSITION.fastMicro, delay: 0.3 }}
                  className="relative w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-bold mb-2 border-2 border-black shadow-lg z-10"
                >
                  <motion.div
                    animate={{ opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full bg-emerald-400"
                  />
                  6
                </motion.div>
              )}
              <div className="mt-2 text-xs text-gray-400">{item.day}</div>
            </div>
          ))}
        </div>
        
        {/* Legend */}
        <div className="flex items-center gap-4 mt-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-blue-500" />
            <span className="text-gray-400">Pump Load</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-cyan-500" />
            <span className="text-gray-400">Water Output</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-emerald-500" />
            <span className="text-gray-400">Movement Speed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-orange-500" />
            <span className="text-gray-400">Thermal Data</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

