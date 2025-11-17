import { useState } from "react";
import { motion } from "framer-motion";
import RobotNavigation from "@/components/smarthome/RoomNavigation";
import WelcomeHeader from "@/components/smarthome/WelcomeHeader";
import RobotTelemetryCard from "@/components/smarthome/InfoCard";
import RobotActivityGraph from "@/components/smarthome/PowerUsageGraph";
import FireBotCamera from "@/components/smarthome/CameraFeed";
import MissionLogs from "@/components/smarthome/MusicPlayer";
import PumpPressureControl from "@/components/smarthome/AirConditionerControl";
import RobotModules from "@/components/smarthome/DeviceControlWidgets";
import SideToolbar from "@/components/smarthome/SideToolbar";
import MissionTimeline from "@/components/smarthome/MissionTimeline";
import RobotAvatar from "@/components/smarthome/RobotAvatar";
import { INDUSTRIAL_TRANSITION } from "@/lib/industrial-motion";

export default function SmartHome() {
  const [selectedModule, setSelectedModule] = useState("Overview");

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Layers */}
      {/* Background Layer 3 - Base Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A0F18] via-[#11151D] to-[#0A0F18]" />
      
      {/* Background Layer 2 - Noise Texture */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px'
        }}
      />
      
      {/* Background Layer 1 - Subtle Radial Gradients */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      {/* Side Toolbar */}
      <SideToolbar />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen pl-20 md:pl-24 p-6 md:p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Robot Navigation */}
          <RobotNavigation selectedModule={selectedModule} onModuleChange={setSelectedModule} />

          {/* Mission Timeline */}
          <MissionTimeline />

          {/* Main Dashboard Panel - Midground Layer */}
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={INDUSTRIAL_TRANSITION.panel}
            className="bg-black/40 backdrop-blur-xl rounded-3xl border border-white/10 p-6 md:p-8 shadow-2xl relative z-10"
          >
            {/* Header Section with Robot Avatar */}
            <div className="flex items-center gap-4 mb-4">
              <RobotAvatar size="md" />
              <WelcomeHeader />
            </div>

            {/* Robot Telemetry Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <motion.div
                initial={{ opacity: 0, y: 2 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...INDUSTRIAL_TRANSITION.micro, delay: 0.05 }}
              >
                <RobotTelemetryCard label="Robot Temperature" value="48 °C" type="temperature" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 2 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...INDUSTRIAL_TRANSITION.micro, delay: 0.1 }}
              >
                <RobotTelemetryCard label="Pump Pressure" value="1.07 bar" type="pressure" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 2 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...INDUSTRIAL_TRANSITION.micro, delay: 0.15 }}
              >
                <RobotTelemetryCard label="Battery Level" value="82%" type="battery" />
              </motion.div>
            </div>

            {/* Middle Section: Graph, Camera, Music */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
              {/* Robot Activity Graph */}
              <motion.div
                initial={{ opacity: 0, y: 2 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...INDUSTRIAL_TRANSITION.panel, delay: 0.2 }}
                className="lg:col-span-2"
              >
                <RobotActivityGraph />
              </motion.div>

              {/* FireBot Camera - Foreground Layer */}
              <motion.div
                initial={{ opacity: 0, y: 2 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...INDUSTRIAL_TRANSITION.panel, delay: 0.25 }}
                className="relative z-20"
              >
                <FireBotCamera />
              </motion.div>
            </div>

            {/* Bottom Section: Music Player and Air Conditioner */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
              {/* Mission Logs - Foreground Layer */}
              <motion.div
                initial={{ opacity: 0, y: 2 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...INDUSTRIAL_TRANSITION.panel, delay: 0.3 }}
                className="relative z-20"
              >
                <MissionLogs />
              </motion.div>

              {/* Pump Pressure Control - Foreground Layer */}
              <motion.div
                initial={{ opacity: 0, y: 2 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...INDUSTRIAL_TRANSITION.panel, delay: 0.35 }}
                className="lg:col-span-2 relative z-20"
              >
                <PumpPressureControl />
              </motion.div>
            </div>

            {/* Robot Modules Row */}
            <motion.div
              initial={{ opacity: 0, y: 2 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...INDUSTRIAL_TRANSITION.panel, delay: 0.4 }}
              className="mt-6"
            >
              <RobotModules />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

