import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface TopNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  "Overview",
  "Telemetry",
  "Map",
  "Systems",
  "Diagnostics",
  "Camera",
  "Missions",
];

export default function TopNavigation({ activeTab, onTabChange }: TopNavigationProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2">
      {tabs.map((tab) => (
        <motion.button
          key={tab}
          onClick={() => onTabChange(tab)}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          className={cn(
            "relative px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300",
            "backdrop-blur-md border",
            "focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/50 focus:ring-offset-2 focus:ring-offset-transparent",
            activeTab === tab
              ? "bg-[var(--accent-weak)] border-[rgba(0,255,171,0.2)] text-[var(--accent)] nav-tab--active"
              : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20"
          )}
        >
          {tab}
          {activeTab === tab && (
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "var(--accent)", boxShadow: "0 0 6px rgba(0,255,171,0.4)" }} />
          )}
        </motion.button>
      ))}
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.96 }}
        className={cn(
          "ml-auto px-4 py-2.5 rounded-xl text-sm font-semibold",
          "bg-[var(--accent-weak)] border border-[rgba(0,255,171,0.2)] text-[var(--accent)]",
          "backdrop-blur-md glow-accent",
          "hover:bg-[rgba(0,255,171,0.15)] hover:glow-accent-strong",
          "transition-all duration-300 flex items-center gap-2"
        )}
      >
        <Plus className="w-4 h-4" />
        Add Module
      </motion.button>
    </div>
  );
}

