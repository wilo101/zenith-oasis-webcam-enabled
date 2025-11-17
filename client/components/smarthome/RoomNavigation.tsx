import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { INDUSTRIAL_TRANSITION, INDUSTRIAL_EASING } from "@/lib/industrial-motion";

interface RobotNavigationProps {
  selectedModule: string;
  onModuleChange: (module: string) => void;
}

const modules = [
  { name: "Overview", hasAlert: false },
  { name: "Telemetry", hasAlert: false },
  { name: "Map", hasAlert: false },
  { name: "Systems", hasAlert: false },
  { name: "Diagnostics", hasAlert: true },
  { name: "Camera", hasAlert: false },
  { name: "Missions", hasAlert: false },
];

export default function RobotNavigation({ selectedModule, onModuleChange }: RobotNavigationProps) {
  return (
    <div className="flex items-center gap-3 overflow-x-auto pb-2">
      {modules.map((module) => (
        <motion.button
          key={module.name}
          onClick={() => onModuleChange(module.name)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={INDUSTRIAL_TRANSITION.fastMicro}
          className={`
            relative px-6 py-3 rounded-xl font-semibold text-sm whitespace-nowrap
            transition-all duration-120
            ${
              selectedModule === module.name
                ? "bg-emerald-500/20 text-emerald-400 border-2 border-emerald-500/50"
                : "bg-white/5 text-gray-300 border-2 border-transparent hover:bg-white/10"
            }
          `}
        >
          {module.name}
          {module.hasAlert && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={INDUSTRIAL_TRANSITION.fastMicro}
              className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-black"
            />
          )}
          {selectedModule === module.name && (
            <motion.span
              layoutId="selectedModule"
              transition={INDUSTRIAL_TRANSITION.micro}
              className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-emerald-500 rounded-full"
            />
          )}
        </motion.button>
      ))}
      <div className="h-8 w-px bg-white/20 mx-2" />
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={INDUSTRIAL_TRANSITION.fastMicro}
        className="px-6 py-3 rounded-xl font-semibold text-sm bg-emerald-500 text-white flex items-center gap-2"
      >
        <Plus className="w-4 h-4" />
        Add Module
      </motion.button>
    </div>
  );
}

