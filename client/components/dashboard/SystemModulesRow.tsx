import { Settings, Radar, Thermometer, Radio, Droplet, Navigation } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface Module {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  status: "active" | "normal" | "running" | "off";
  enabled: boolean;
}

const modules: Module[] = [
  {
    id: "motors",
    name: "Motors Control",
    description: "4 motors active",
    icon: <Settings className="w-5 h-5" />,
    status: "running",
    enabled: true,
  },
  {
    id: "lidar",
    name: "LIDAR Sensor",
    description: "Scanning",
    icon: <Radar className="w-5 h-5" />,
    status: "active",
    enabled: true,
  },
  {
    id: "thermal",
    name: "Thermal Camera",
    description: "Monitoring",
    icon: <Thermometer className="w-5 h-5" />,
    status: "active",
    enabled: true,
  },
  {
    id: "comm",
    name: "Communication Module",
    description: "Connected",
    icon: <Radio className="w-5 h-5" />,
    status: "normal",
    enabled: true,
  },
  {
    id: "pump",
    name: "Water Pump",
    description: "Standby",
    icon: <Droplet className="w-5 h-5" />,
    status: "normal",
    enabled: false,
  },
  {
    id: "nav",
    name: "Navigation Mode",
    description: "GPS active",
    icon: <Navigation className="w-5 h-5" />,
    status: "active",
    enabled: true,
  },
];

const getStatusColor = (status: Module["status"]) => {
  switch (status) {
    case "active":
      return "text-[#00ffab]";
    case "running":
      return "text-blue-400";
    case "normal":
      return "text-gray-400";
    case "off":
      return "text-red-400";
  }
};

export default function SystemModulesRow() {
  return (
    <div className="space-y-6">
      <h3 className="text-title text-lg">System Modules</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module, index) => (
          <motion.div
            key={module.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            whileTap={{ scale: 0.96 }}
            className="bg-panel p-5 hover:border-white/20 transition-all"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <div
                  className={cn(
                    "p-2.5 rounded-lg bg-white/5 flex-shrink-0",
                    getStatusColor(module.status)
                  )}
                >
                  <div className="w-[18px] h-[18px]">
                    {module.icon}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-semibold text-white truncate">
                      {module.name}
                    </h4>
                    {module.enabled && (
                      <div className="w-2 h-2 rounded-full bg-[#00ffab] shadow-[0_0_8px_#00ffab] flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-white/60 mt-1">{module.description}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span
                      className={cn(
                        "text-xs font-medium capitalize",
                        getStatusColor(module.status)
                      )}
                    >
                      {module.status}
                    </span>
                  </div>
                </div>
              </div>
              <Switch checked={module.enabled} className="flex-shrink-0" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

