import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricsCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  iconColor?: string;
  gradient?: string;
  children?: React.ReactNode;
  className?: string;
}

export default function MetricsCard({
  label,
  value,
  icon: Icon,
  iconColor = "text-[#00ffab]",
  gradient = "from-[#00ffab]/10 to-transparent",
  children,
  className,
}: MetricsCardProps) {
  return (
    <div
      className={cn(
        "bg-panel relative overflow-hidden p-6",
        "hover:border-white/20 transition-all duration-300",
        className
      )}
    >
      {/* Gradient overlay */}
      <div className={cn("absolute inset-0 bg-gradient-to-br", gradient, "opacity-50 pointer-events-none")} />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <span className="text-label">
            {label}
          </span>
          <div className={cn("p-2 rounded-lg bg-white/5 backdrop-blur-sm", iconColor)}>
            <Icon className="w-5 h-5" />
          </div>
        </div>
        <div className="text-3xl font-bold mb-2" style={{ color: "var(--text-1)" }}>{value}</div>
        {children}
      </div>
    </div>
  );
}
