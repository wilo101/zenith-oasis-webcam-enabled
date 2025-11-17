import { motion } from "framer-motion";
import { Thermometer, Gauge, Battery } from "lucide-react";
import { INDUSTRIAL_TRANSITION } from "@/lib/industrial-motion";

interface RobotTelemetryCardProps {
  label: string;
  value: string;
  subtitle?: string;
  type: "temperature" | "pressure" | "battery";
}

const iconMap = {
  temperature: <Thermometer className="w-8 h-8 text-orange-400" />,
  pressure: <Gauge className="w-8 h-8 text-blue-400" />,
  battery: <Battery className="w-8 h-8 text-emerald-400" />,
};

export default function RobotTelemetryCard({ label, value, subtitle, type }: RobotTelemetryCardProps) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={INDUSTRIAL_TRANSITION.fastMicro}
      className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10 hover:border-white/20 transition-all duration-120 cursor-pointer"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="text-xs text-gray-400 uppercase tracking-wider mb-2">{label}</div>
          <div className="text-2xl font-bold text-white mb-1">{value}</div>
          {subtitle && <div className="text-xs text-gray-500">{subtitle}</div>}
        </div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={INDUSTRIAL_TRANSITION.fastMicro}
        >
          {iconMap[type]}
        </motion.div>
      </div>
    </motion.div>
  );
}

