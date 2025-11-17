import { motion } from "framer-motion";
import { AlertTriangle, Activity, Flame, MessageSquare, Play } from "lucide-react";
import { useState } from "react";
import { INDUSTRIAL_TRANSITION } from "@/lib/industrial-motion";

interface Alert {
  id: number;
  type: "alert" | "sensor" | "fire" | "message";
  title: string;
  message: string;
  time: string;
  acknowledged: boolean;
}

const initialAlerts: Alert[] = [
  { id: 1, type: "alert", title: "High Temperature Detected", message: "Thermal sensor reading: 65°C", time: "2m ago", acknowledged: false },
  { id: 2, type: "sensor", title: "New Sensor Reading", message: "Water level: 64% - Stable", time: "5m ago", acknowledged: true },
  { id: 3, type: "fire", title: "Fire Detection Log", message: "No active fires detected", time: "8m ago", acknowledged: true },
  { id: 4, type: "message", title: "Operator Message", message: "Mission proceeding as planned", time: "12m ago", acknowledged: false },
];

export default function MissionLogs() {
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts);

  const acknowledgeAlert = (id: number) => {
    setAlerts((prev) => prev.map((alert) => (alert.id === id ? { ...alert, acknowledged: true } : alert)));
  };

  const iconMap = {
    alert: <AlertTriangle className="w-4 h-4 text-yellow-400" />,
    sensor: <Activity className="w-4 h-4 text-blue-400" />,
    fire: <Flame className="w-4 h-4 text-red-400" />,
    message: <MessageSquare className="w-4 h-4 text-emerald-400" />,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 2 }}
      animate={{ opacity: 1, y: 0 }}
      transition={INDUSTRIAL_TRANSITION.panel}
      className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Mission Alerts & System Notifications</h3>
      </div>

      <div className="space-y-2 max-h-64 overflow-y-auto">
        {alerts.map((alert, index) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ...INDUSTRIAL_TRANSITION.micro, delay: index * 0.05 }}
            whileHover={{ x: 2 }}
            className={`p-3 rounded-lg border transition-all duration-120 ${
              alert.acknowledged
                ? "bg-white/5 border-white/10"
                : "bg-yellow-500/10 border-yellow-500/30 shadow-lg shadow-yellow-500/10"
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-start gap-2 flex-1">
                <div className="mt-0.5">{iconMap[alert.type]}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-white">{alert.title}</div>
                  <div className="text-xs text-gray-400 mt-1">{alert.message}</div>
                  <div className="text-xs text-gray-500 mt-1">{alert.time}</div>
                </div>
              </div>
              {!alert.acknowledged && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={INDUSTRIAL_TRANSITION.fastMicro}
                  onClick={() => acknowledgeAlert(alert.id)}
                  className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold flex items-center gap-1 transition-colors duration-120"
                >
                  <Play className="w-3 h-3" />
                  Acknowledge
                </motion.button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

