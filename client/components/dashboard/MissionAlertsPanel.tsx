import { AlertTriangle, CheckCircle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { motion } from "framer-motion";

interface Alert {
  id: string;
  type: "error" | "warning" | "info";
  title: string;
  message: string;
  timestamp: string;
  acknowledged: boolean;
}

const mockAlerts: Alert[] = [
  {
    id: "1",
    type: "error",
    title: "High Temperature Detected",
    message: "Robot temperature reached 60°C",
    timestamp: "2 min ago",
    acknowledged: false,
  },
  {
    id: "2",
    type: "info",
    title: "New Sensor Reading",
    message: "Water flow stable at 45 L/min",
    timestamp: "5 min ago",
    acknowledged: false,
  },
  {
    id: "3",
    type: "warning",
    title: "Fire Detection Log",
    message: "Last active event: Sector 7",
    timestamp: "12 min ago",
    acknowledged: true,
  },
];

export default function MissionAlertsPanel() {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);

  const handleAcknowledge = (id: string) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === id ? { ...alert, acknowledged: true } : alert
      )
    );
  };

  const getIcon = (type: Alert["type"]) => {
    switch (type) {
      case "error":
        return <AlertTriangle className="w-5 h-5" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5" />;
      case "info":
        return <Info className="w-5 h-5" />;
    }
  };

  const getColorClasses = (type: Alert["type"]) => {
    switch (type) {
      case "error":
        return {
          bg: "bg-black/30",
          border: "border-[var(--danger)]/30",
          icon: "text-[var(--danger)]",
          title: "text-[var(--danger)]",
        };
      case "warning":
        return {
          bg: "bg-black/30",
          border: "border-[var(--warning)]/30",
          icon: "text-[var(--warning)]",
          title: "text-[var(--warning)]",
        };
      case "info":
        return {
          bg: "bg-black/30",
          border: "border-[var(--info)]/30",
          icon: "text-[var(--info)]",
          title: "text-[var(--info)]",
        };
    }
  };

  return (
    <div className="bg-panel p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-title text-lg">Mission Alerts</h3>
        <span className="text-label">
          {alerts.filter((a) => !a.acknowledged).length} active
        </span>
      </div>
      <div className="space-y-3 max-h-[400px] overflow-y-auto">
        {alerts.map((alert, index) => {
          const colors = getColorClasses(alert.type);
          return (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.38, ease: "easeOut", delay: index * 0.1 }}
              className={cn(
                "rounded-xl p-4 border backdrop-blur-sm transition-all",
                colors.bg,
                colors.border,
                alert.acknowledged && "opacity-60"
              )}
            >
              <div className="flex items-start gap-3">
                <div className={cn("mt-0.5", colors.icon)}>
                  {getIcon(alert.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className={cn("font-semibold text-sm", colors.title)}>
                      {alert.title}
                    </h4>
                    {!alert.acknowledged && (
                      <motion.button
                        onClick={() => handleAcknowledge(alert.id)}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.96 }}
                        className="ml-auto p-1 rounded hover:bg-white/10 transition-colors"
                        title="Acknowledge"
                      >
                        <X className="w-4 h-4 text-gray-400" />
                      </motion.button>
                    )}
                  </div>
                  <p className="text-xs text-white/60 mt-1">{alert.message}</p>
                  <span className="text-xs text-white/40 mt-2 block">
                    {alert.timestamp}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

