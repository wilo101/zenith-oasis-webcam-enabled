import { motion } from "framer-motion";
import { Cog, Radar, Camera, Radio, Droplet, Navigation } from "lucide-react";
import { useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { INDUSTRIAL_TRANSITION } from "@/lib/industrial-motion";

interface RobotModule {
  icon: React.ReactNode;
  label: string;
  subtitle: string;
  defaultOn: boolean;
  state?: string;
}

const modules: RobotModule[] = [
  { icon: <Cog className="w-6 h-6" />, label: "Motors Control", subtitle: "4 motors active", defaultOn: true },
  { icon: <Radar className="w-6 h-6" />, label: "LIDAR Sensor", subtitle: "State: Active", defaultOn: true, state: "Active" },
  { icon: <Camera className="w-6 h-6" />, label: "Thermal Camera", subtitle: "Mode: Normal", defaultOn: true, state: "Normal" },
  { icon: <Radio className="w-6 h-6" />, label: "Communication Module", subtitle: "Status: Connected", defaultOn: true, state: "Connected" },
  { icon: <Droplet className="w-6 h-6" />, label: "Water Pump", subtitle: "State: Running", defaultOn: true, state: "Running" },
  { icon: <Navigation className="w-6 h-6" />, label: "Navigation Mode", subtitle: "Auto", defaultOn: true, state: "Auto" },
];

export default function RobotModules() {
  const [moduleStates, setModuleStates] = useState<Record<number, boolean>>(
    modules.reduce((acc, _, index) => ({ ...acc, [index]: modules[index].defaultOn }), {})
  );

  const toggleModule = (index: number) => {
    setModuleStates((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="overflow-x-auto pb-2">
      <div className="flex gap-4 min-w-max">
        {modules.map((module, index) => (
          <Tooltip key={index}>
            <TooltipTrigger asChild>
              <motion.div
                initial={{ opacity: 0, y: 2 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...INDUSTRIAL_TRANSITION.micro, delay: index * 0.05 }}
                whileHover={{ y: -2 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 min-w-[180px] cursor-pointer transition-all duration-120 hover:border-white/20 relative"
              >
                {moduleStates[index] && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.2, 0.3, 0.2] }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-xl bg-emerald-500/10 blur-xl"
                  />
                )}
                <div className="flex items-start justify-between mb-3 relative z-10">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={INDUSTRIAL_TRANSITION.fastMicro}
                    className="text-3xl text-emerald-400"
                  >
                    {module.icon}
                  </motion.div>
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    transition={INDUSTRIAL_TRANSITION.fastMicro}
                    onClick={() => toggleModule(index)}
                    className={`
                      relative w-12 h-6 rounded-full transition-all duration-120
                      ${moduleStates[index] 
                        ? "bg-emerald-500 shadow-lg shadow-emerald-500/50" 
                        : "bg-gray-600"
                      }
                    `}
                  >
                    <motion.div
                      layout
                      className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-md"
                      animate={{ x: moduleStates[index] ? 24 : 0 }}
                      transition={INDUSTRIAL_TRANSITION.micro}
                    />
                    {moduleStates[index] && (
                      <motion.div
                        animate={{ opacity: [0.3, 0.5, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 rounded-full bg-emerald-400"
                      />
                    )}
                  </motion.button>
                </div>
                <div className="text-sm font-semibold text-white mb-1 relative z-10">{module.label}</div>
                <div className="text-xs text-gray-400 relative z-10">{module.subtitle}</div>
              </motion.div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{module.label} - {module.subtitle}</p>
              <p className="text-xs text-gray-400 mt-1">
                {moduleStates[index] ? "Active" : "Inactive"}
              </p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </div>
  );
}

