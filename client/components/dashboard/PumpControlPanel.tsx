import { useState } from "react";
import { Gauge } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function PumpControlPanel() {
  const [pressure, setPressure] = useState(1.07);
  const [mode, setMode] = useState<"auto" | "boost" | "cool">("auto");
  const [timer, setTimer] = useState("3h 23m");

  // Calculate angle for pressure ring (0-360 degrees, where 1.5 bar = 360°)
  const angle = (pressure / 1.5) * 360;
  const circumference = 2 * Math.PI * 60; // radius = 60
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (angle / 360) * circumference;

  return (
    <div className="bg-panel p-6 rounded-3xl">
      <div className="flex items-center justify-center mb-6">
        <h3 className="text-title text-lg">Pump Control</h3>
      </div>

      {/* Circular Pressure Dial */}
      <div className="flex items-center justify-center mb-6">
        <div className="relative w-48 h-48">
          {/* Outer ring background */}
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 140 140">
            <circle
              cx="70"
              cy="70"
              r="60"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="8"
            />
            {/* Pressure ring with neon glow */}
            <circle
              cx="70"
              cy="70"
              r="60"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-500"
              style={{
                filter: "drop-shadow(0 0 6px rgba(0,255,171,0.3))",
              }}
            />
          </svg>

          {/* Center content with glow */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pump-dial-glow">
            <div className="text-3xl font-bold" style={{ color: "var(--text-1)" }}>
              {pressure.toFixed(2)}
            </div>
            <div className="text-sm mt-1" style={{ color: "var(--muted)" }}>bar</div>
            <div className="text-xs mt-2" style={{ color: "var(--accent)" }}>recom. 1.10 bar</div>
          </div>
        </div>
      </div>

      {/* Mode Buttons */}
      <div className="flex items-center justify-center gap-3 mb-6">
        {(["auto", "boost", "cool"] as const).map((m) => (
          <motion.button
            key={m}
            onClick={() => setMode(m)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            className={cn(
              "px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 capitalize",
              "backdrop-blur-md border",
              mode === m
                ? "bg-[var(--accent-weak)] border-[rgba(0,255,171,0.2)] text-[var(--accent)] glow-accent"
                : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10"
            )}
          >
            {m}
          </motion.button>
        ))}
      </div>

      {/* Timer and Off Button */}
      <div className="flex items-center justify-center gap-3">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          className="px-5 py-2.5 rounded-full text-sm font-semibold bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 transition-all"
        >
          Timer {timer}
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          className="px-5 py-2.5 rounded-full text-sm font-semibold bg-black/30 border border-[var(--danger)]/30 text-[var(--danger)] hover:bg-black/40 transition-all"
        >
          Off
        </motion.button>
      </div>
    </div>
  );
}

