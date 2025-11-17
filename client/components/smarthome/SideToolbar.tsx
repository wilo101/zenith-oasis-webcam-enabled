import { motion } from "framer-motion";
import { Home, Map, Camera, Activity, FileText, Settings } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { INDUSTRIAL_TRANSITION, INDUSTRIAL_EASING } from "@/lib/industrial-motion";

const menuItems = [
  { icon: Home, label: "Home", path: "/smart-home" },
  { icon: Map, label: "Map", path: "/smart-home?view=map" },
  { icon: Camera, label: "Camera", path: "/smart-home?view=camera" },
  { icon: Activity, label: "Telemetry", path: "/smart-home?view=telemetry" },
  { icon: FileText, label: "Logs", path: "/smart-home?view=logs" },
  { icon: Settings, label: "Settings", path: "/smart-home?view=settings" },
];

export default function SideToolbar() {
  const [activeItem, setActiveItem] = useState(0);
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={INDUSTRIAL_TRANSITION.panel}
      className="fixed left-0 top-0 h-full w-16 md:w-20 bg-black/30 backdrop-blur-xl border-r border-white/10 z-50 flex flex-col items-center py-6 gap-4"
    >
      {menuItems.map((item, index) => {
        const Icon = item.icon;
        const isActive = activeItem === index;
        
        return (
          <motion.button
            key={index}
            onClick={() => {
              setActiveItem(index);
              if (item.path) navigate(item.path);
            }}
            whileHover={{ scale: 1.05, x: 2 }}
            whileTap={{ scale: 0.97 }}
            transition={INDUSTRIAL_TRANSITION.fastMicro}
            className={`
              relative p-3 rounded-xl transition-all duration-120
              ${isActive 
                ? "bg-emerald-500/20 text-emerald-400 shadow-lg shadow-emerald-500/20" 
                : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
              }
            `}
            title={item.label}
          >
            <Icon className="w-5 h-5 md:w-6 md:h-6" />
            {isActive && (
              <motion.div
                layoutId="activeIndicator"
                className="absolute -right-1 top-1/2 -translate-y-1/2 w-1 h-8 bg-emerald-500 rounded-l-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={INDUSTRIAL_TRANSITION.fastMicro}
              />
            )}
          </motion.button>
        );
      })}
    </motion.div>
  );
}

