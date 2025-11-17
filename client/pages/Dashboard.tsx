import { useState, useEffect, Suspense, lazy } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Standardized motion settings
const MOTION = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.38, ease: "easeOut" },
};

const BUTTON_MOTION = {
  whileHover: { scale: 1.03 },
  whileTap: { scale: 0.96 },
};
import { TooltipProvider } from "@/components/ui/tooltip";
import TopNavigation from "@/components/dashboard/TopNavigation";
import WelcomeHeaderCard from "@/components/dashboard/WelcomeHeaderCard";
import MainMetricsRow from "@/components/dashboard/MainMetricsRow";
import OverviewGraphPanel from "@/components/dashboard/OverviewGraphPanel";
import Camera3DPanel from "@/components/dashboard/Camera3DPanel";
import MissionAlertsPanel from "@/components/dashboard/MissionAlertsPanel";
import PumpControlPanel from "@/components/dashboard/PumpControlPanel";
import SystemModulesRow from "@/components/dashboard/SystemModulesRow";

const MapPanel = lazy(() => import("@/components/firebot/MapPanel"));
const DiagnosticsPanel = lazy(() => import("@/components/firebot/DiagnosticsPanel"));

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [temperature, setTemperature] = useState(48);
  const [pressure, setPressure] = useState(1.07);
  const [battery, setBattery] = useState(82);
  const [water, setWater] = useState(64);
  const [follow, setFollow] = useState(true);

  // Mock telemetry updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTemperature((prev) => {
        const change = (Math.random() - 0.5) * 2;
        return Math.max(35, Math.min(65, prev + change));
      });
      setPressure((prev) => {
        const change = (Math.random() - 0.5) * 0.05;
        return Math.max(0.8, Math.min(1.35, prev + change));
      });
      setBattery((prev) => {
        const change = (Math.random() - 0.5) * 1;
        return Math.max(60, Math.min(100, prev + change));
      });
      setWater((prev) => {
        const change = (Math.random() - 0.5) * 1;
        return Math.max(50, Math.min(95, prev + change));
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <TooltipProvider delayDuration={150}>
      <div className="min-h-screen relative overflow-hidden">
      {/* Background Layers */}
      {/* Base Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A0F18] via-[#11151D] to-[#0A0F18]" />
      
      {/* Noise Texture */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px'
        }}
      />
      
      {/* Subtle Radial Gradients */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00ffab]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen p-6 md:p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Top Navigation */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <TopNavigation activeTab={activeTab} onTabChange={setActiveTab} />
          </motion.div>

          {/* Welcome Header - Always visible */}
          <motion.div
            {...MOTION}
            transition={{ ...MOTION.transition, delay: 0.1 }}
          >
            <WelcomeHeaderCard />
          </motion.div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {activeTab === "Overview" && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Main Metrics Row */}
                <motion.div
                  {...MOTION}
                  transition={{ ...MOTION.transition, delay: 0.2 }}
                >
                  <MainMetricsRow
                    temperature={temperature}
                    pressure={pressure}
                    battery={battery}
                    water={water}
                  />
                </motion.div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-6 gap-x-6 mt-6">
                  {/* Left Column - Graph */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.38, ease: "easeOut", delay: 0.3 }}
                    className="lg:col-span-2"
                  >
                    <OverviewGraphPanel />
                  </motion.div>

                  {/* Right Column - Camera/3D Model */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.38, ease: "easeOut", delay: 0.35 }}
                  >
                    <Camera3DPanel />
                  </motion.div>
                </div>

                {/* Bottom Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-6 gap-x-6 mt-6">
                  {/* Mission Alerts */}
                  <motion.div
                    {...MOTION}
                    transition={{ ...MOTION.transition, delay: 0.4 }}
                  >
                    <MissionAlertsPanel />
                  </motion.div>

                  {/* Pump Control */}
                  <motion.div
                    {...MOTION}
                    transition={{ ...MOTION.transition, delay: 0.45 }}
                    className="lg:col-span-2"
                  >
                    <PumpControlPanel />
                  </motion.div>
                </div>

                {/* System Modules */}
                <motion.div
                  {...MOTION}
                  transition={{ ...MOTION.transition, delay: 0.5 }}
                  className="mt-6"
                >
                  <SystemModulesRow />
                </motion.div>
              </motion.div>
            )}

            {activeTab === "Telemetry" && (
              <motion.div
                key="telemetry"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Main Metrics Row */}
                <motion.div
                  {...MOTION}
                  transition={{ ...MOTION.transition, delay: 0.1 }}
                >
                  <MainMetricsRow
                    temperature={temperature}
                    pressure={pressure}
                    battery={battery}
                    water={water}
                  />
                </motion.div>

                {/* Graph Panel */}
                <motion.div
                  {...MOTION}
                  transition={{ ...MOTION.transition, delay: 0.2 }}
                  className="mt-6"
                >
                  <OverviewGraphPanel />
                </motion.div>
              </motion.div>
            )}

            {activeTab === "Map" && (
              <motion.div
                key="map"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-panel p-5">
                  <Suspense fallback={
                    <div className="h-[600px] flex items-center justify-center">
                      <span className="text-label">Loading Map...</span>
                    </div>
                  }>
                    <MapPanel follow={follow} onFollowChange={setFollow} />
                  </Suspense>
                </div>
              </motion.div>
            )}

            {activeTab === "Systems" && (
              <motion.div
                key="systems"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* System Modules */}
                <motion.div
                  {...MOTION}
                  transition={{ ...MOTION.transition, delay: 0.1 }}
                >
                  <SystemModulesRow />
                </motion.div>

                {/* Pump Control */}
                <motion.div
                  {...MOTION}
                  transition={{ ...MOTION.transition, delay: 0.2 }}
                  className="mt-6"
                >
                  <PumpControlPanel />
                </motion.div>
              </motion.div>
            )}

            {activeTab === "Diagnostics" && (
              <motion.div
                key="diagnostics"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-panel p-6">
                  <Suspense fallback={
                    <div className="h-[600px] flex items-center justify-center">
                      <span className="text-label">Loading Diagnostics...</span>
                    </div>
                  }>
                    <DiagnosticsPanel />
                  </Suspense>
                </div>
              </motion.div>
            )}

            {activeTab === "Camera" && (
              <motion.div
                key="camera"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Camera3DPanel />
              </motion.div>
            )}

            {activeTab === "Missions" && (
              <motion.div
                key="missions"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <MissionAlertsPanel />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
    </TooltipProvider>
  );
}

