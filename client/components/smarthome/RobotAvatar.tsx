import { motion } from "framer-motion";
import { Bot } from "lucide-react";
import { INDUSTRIAL_TRANSITION } from "@/lib/industrial-motion";

interface RobotAvatarProps {
  size?: "sm" | "md" | "lg";
  showGlow?: boolean;
}

export default function RobotAvatar({ size = "md", showGlow = true }: RobotAvatarProps) {
  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-16 h-16",
    lg: "w-24 h-24",
  };

  const iconSizes = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={INDUSTRIAL_TRANSITION.micro}
      className={`relative ${sizeClasses[size]}`}
    >
      {showGlow && (
        <motion.div
          animate={{ 
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full bg-red-500/20 blur-xl"
        />
      )}
      <div className={`
        relative ${sizeClasses[size]} rounded-full 
        bg-gradient-to-br from-red-600 to-red-800 
        border-2 border-red-400/50
        flex items-center justify-center
        shadow-lg
      `}>
        <Bot className={`${iconSizes[size]} text-white`} />
      </div>
    </motion.div>
  );
}

