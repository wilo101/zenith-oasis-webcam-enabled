import { motion } from "framer-motion";
import { useState } from "react";
import { INDUSTRIAL_TRANSITION } from "@/lib/industrial-motion";

export default function PumpPressureControl() {
  const [pressure, setPressure] = useState(1.07);
  const [mode, setMode] = useState<"Auto" | "Boost" | "Cool">("Auto");

  const circumference = 2 * Math.PI * 60;
  const maxPressure = 2.0;
  const minPressure = 0.5;
  const nominalMin = 0.8;
  const nominalMax = 1.35;
  const isNominal = pressure >= nominalMin && pressure <= nominalMax;
  const isWarning = pressure > nominalMax;
  const offset = circumference - ((pressure - minPressure) / (maxPressure - minPressure)) * circumference;

  const adjustPressure = (delta: number) => {
    setPressure((prev) => Math.min(maxPressure, Math.max(minPressure, prev + delta)));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 2 }}
      animate={{ opacity: 1, y: 0 }}
      transition={INDUSTRIAL_TRANSITION.panel}
      className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
    >
      <div className="flex items-center gap-8">
        {/* Circular Pressure Dial */}
        <div className="relative w-32 h-32 flex items-center justify-center">
          <svg className="transform -rotate-90 w-32 h-32">
            {/* Outer glow ring */}
            {isNominal && (
              <motion.circle
                cx="64"
                cy="64"
                r="68"
                stroke="rgba(16,185,129,0.3)"
                strokeWidth="2"
                fill="none"
                animate={{ opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            )}
            
            {/* Background circle */}
            <circle
              cx="64"
              cy="64"
              r="60"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="8"
              fill="none"
            />
            
            {/* Tick marks */}
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i * 30 - 90) * (Math.PI / 180);
              const x1 = 64 + 55 * Math.cos(angle);
              const y1 = 64 + 55 * Math.sin(angle);
              const x2 = 64 + 60 * Math.cos(angle);
              const y2 = 64 + 60 * Math.sin(angle);
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="1"
                />
              );
            })}
            
            {/* Progress circle */}
            <motion.circle
              cx="64"
              cy="64"
              r="60"
              stroke={isWarning ? "#ef4444" : isNominal ? "#10b981" : "#fbbf24"}
              strokeWidth="8"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={INDUSTRIAL_TRANSITION.data}
              strokeLinecap="round"
              className={isNominal ? "drop-shadow-[0_0_12px_rgba(16,185,129,0.6)]" : isWarning ? "drop-shadow-[0_0_12px_rgba(239,68,68,0.6)]" : ""}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-3xl font-bold text-white">{pressure.toFixed(2)} bar</div>
            <div className="text-xs text-gray-400 mt-1">Nominal Range: 0.8–1.35 bar</div>
          </div>
          <button
            onClick={() => adjustPressure(0.1)}
            className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center text-white text-sm"
          >
            +
          </button>
          <button
            onClick={() => adjustPressure(-0.1)}
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center text-white text-sm"
          >
            −
          </button>
        </div>

        {/* Controls */}
        <div className="flex-1 space-y-4">
          {/* Mode Buttons */}
          <div className="flex gap-3">
            {(["Auto", "Boost", "Cool"] as const).map((m) => (
              <motion.button
                key={m}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={INDUSTRIAL_TRANSITION.fastMicro}
                onClick={() => {
                  setMode(m);
                }}
                className={`
                  relative px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-120
                  ${
                    mode === m
                      ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
                      : "bg-white/5 text-gray-300 hover:bg-white/10"
                  }
                `}
              >
                {m}
                {mode === m && (
                  <motion.div
                    layoutId="activeMode"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 0.1, repeat: 1, ease: "linear" }}
                    className="absolute inset-0 rounded-lg bg-white/15"
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

