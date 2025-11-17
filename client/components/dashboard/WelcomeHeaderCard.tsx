import { Wifi, Navigation, Droplet, Thermometer, Battery } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatusIndicatorProps {
  icon: React.ReactNode;
  label: string;
  status: "active" | "warning" | "error";
}

function StatusIndicator({ icon, label, status }: StatusIndicatorProps) {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
      <div
        className={cn(
          "w-4 h-4",
          status === "active" && "text-[#00ffab]",
          status === "warning" && "text-yellow-400",
          status === "error" && "text-red-400"
        )}
      >
        {icon}
      </div>
      <span className="text-xs text-white/70">{label}</span>
      <div
        className={cn(
          "w-1.5 h-1.5 rounded-full",
          status === "active" && "bg-[#00ffab] shadow-[0_0_6px_rgba(0,255,171,0.8)]",
          status === "warning" && "bg-yellow-400 shadow-[0_0_6px_rgba(255,196,0,0.8)]",
          status === "error" && "bg-red-400 shadow-[0_0_6px_rgba(255,64,64,0.8)]"
        )}
      />
    </div>
  );
}

export default function WelcomeHeaderCard() {
  return (
    <div className="bg-panel p-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#00ffab]/20 to-[#00ffab]/5 border-2 border-[#00ffab]/30 flex items-center justify-center text-[#00ffab] font-bold text-xl shadow-[0_0_20px_rgba(0,255,171,0.3)]">
            OP
          </div>
          <div>
            <h2 className="text-title text-xl">
              Welcome back, Operator 👋
            </h2>
            <p className="text-label mt-1 text-sm">
              All systems in the house are working properly
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <StatusIndicator
            icon={<Wifi className="w-4 h-4" />}
            label="Network"
            status="active"
          />
          <StatusIndicator
            icon={<Navigation className="w-4 h-4" />}
            label="GPS"
            status="active"
          />
          <StatusIndicator
            icon={<Droplet className="w-4 h-4" />}
            label="Pump"
            status="active"
          />
          <StatusIndicator
            icon={<Thermometer className="w-4 h-4" />}
            label="Thermal"
            status="active"
          />
          <StatusIndicator
            icon={<Battery className="w-4 h-4" />}
            label="Battery"
            status="active"
          />
        </div>
      </div>
    </div>
  );
}

