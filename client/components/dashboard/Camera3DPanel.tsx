import { useState } from "react";
import { Camera, Box } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import Robot3DViewer from "@/components/Robot3DViewer";
import LiveCamera from "@/components/firebot/LiveCamera";

export default function Camera3DPanel() {
  const [activeView, setActiveView] = useState<"camera" | "model">("camera");

  return (
    <div className="bg-panel--camera p-6">
      {/* Mode Switch Tabs */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => setActiveView("camera")}
          className={cn(
            "flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-300",
            "backdrop-blur-md border",
            "hover:scale-105 active:scale-95",
            activeView === "camera"
              ? "bg-[rgba(0,255,171,0.12)] border-[rgba(0,255,171,0.2)] text-[var(--accent)] glow-accent"
              : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10"
          )}
        >
          <Camera className="w-5 h-5" />
          Camera View
        </button>
        <button
          onClick={() => setActiveView("model")}
          className={cn(
            "flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-300",
            "backdrop-blur-md border",
            "hover:scale-105 active:scale-95",
            activeView === "model"
              ? "bg-[rgba(0,255,171,0.12)] border-[rgba(0,255,171,0.2)] text-[var(--accent)] glow-accent"
              : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10"
          )}
        >
          <Box className="w-5 h-5" />
          3D Model
        </button>
      </div>

      {/* Content Area */}
      <div className="relative rounded-xl overflow-hidden bg-black/10 border border-white/5 h-[400px]">
        <AnimatePresence mode="wait">
          {activeView === "camera" ? (
            <motion.div
              key="camera"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.38, ease: "easeOut" }}
              className="w-full h-full"
            >
              <LiveCamera className="h-full" />
            </motion.div>
          ) : (
            <motion.div
              key="model"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.38, ease: "easeOut" }}
              className="w-full h-full bg-panel overflow-hidden"
            >
              <Robot3DViewer className="w-full h-full" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

