import { motion } from "framer-motion";
import { CheckCircle2, Circle, Flame, Droplet, Thermometer, Target } from "lucide-react";
import { INDUSTRIAL_TRANSITION } from "@/lib/industrial-motion";

interface TimelineEvent {
  id: number;
  label: string;
  status: "completed" | "active" | "pending";
  icon: React.ReactNode;
}

const events: TimelineEvent[] = [
  { id: 1, label: "Start Mission", status: "completed", icon: <Target className="w-4 h-4" /> },
  { id: 2, label: "Fire detected", status: "completed", icon: <Flame className="w-4 h-4" /> },
  { id: 3, label: "Pump activated", status: "active", icon: <Droplet className="w-4 h-4" /> },
  { id: 4, label: "Temperature spike", status: "pending", icon: <Thermometer className="w-4 h-4" /> },
  { id: 5, label: "Mission complete", status: "pending", icon: <CheckCircle2 className="w-4 h-4" /> },
];

export default function MissionTimeline() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 2 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...INDUSTRIAL_TRANSITION.panel, delay: 0.15 }}
      className="bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-white/10 relative z-10"
    >
      <div className="flex items-center gap-4 overflow-x-auto pb-2">
        {events.map((event, index) => {
          const isCompleted = event.status === "completed";
          const isActive = event.status === "active";
          const isPending = event.status === "pending";

          return (
            <div key={event.id} className="flex items-center gap-2 min-w-fit">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ ...INDUSTRIAL_TRANSITION.fastMicro, delay: 0.2 + index * 0.05 }}
                className={`
                  relative flex items-center justify-center w-10 h-10 rounded-full
                  ${isCompleted 
                    ? "bg-emerald-500/20 text-emerald-400 border-2 border-emerald-500" 
                    : isActive
                    ? "bg-orange-500/20 text-orange-400 border-2 border-orange-500"
                    : "bg-gray-500/20 text-gray-500 border-2 border-gray-500"
                  }
                `}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  event.icon
                )}
                {isActive && (
                  <motion.div
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full bg-orange-500/20"
                  />
                )}
              </motion.div>
              <div className="flex flex-col">
                <span className={`text-xs font-semibold ${
                  isCompleted ? "text-emerald-400" : 
                  isActive ? "text-orange-400" : 
                  "text-gray-500"
                }`}>
                  {event.label}
                </span>
              </div>
              {index < events.length - 1 && (
                <div className={`
                  w-12 h-0.5 mx-2
                  ${isCompleted ? "bg-emerald-500" : "bg-gray-500/30"}
                `} />
              )}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

