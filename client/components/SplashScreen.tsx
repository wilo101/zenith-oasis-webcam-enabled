import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import afrLogo from "@/assets/afr-logo.png";

type Props = {
  onDone?: () => void;     // تستدعي بعدها ال Welcome Screen
  stepMs?: number;         // مدة ملء كل بار (افتراضي 900ms)
  gapMs?: number;          // فاصلة صغيرة بين كل بار والتاني (افتراضي 200ms)
  holdMs?: number;         // مهلة بعد اكتمال الثلاث بارات قبل الفيد (افتراضي 250ms)
  fadeMs?: number;         // مدة الفيد آوت (افتراضي 700ms)
};

const STEPS = [
  "Booting AFR subsystems…",
  "Synchronizing telemetry feed…",
  "Calibrating optic sensors…",
] as const;

export default function SplashScreen({
  onDone,
  stepMs = 900,
  gapMs = 200,
  holdMs = 250,
  fadeMs = 700,
}: Props) {
  const [visible, setVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [widths, setWidths] = useState<number[]>([0, 0, 0]); // 3 بارات
  const [stepIndex, setStepIndex] = useState(0);
  const started = useRef(false); // علشان StrictMode في الديف ما يشتغلش مرتين

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    // دالة بتملّي بار واحد ثم تكمل اللي بعده
    const fillStep = (i: number) => {
      setStepIndex(i);
      // ابدأ ملء البار i
      setWidths((w) => {
        const clone = [...w];
        clone[i] = 100;
        return clone;
      });

      // بعد مدة ملء البار، إمّا نبدأ اللي بعده أو نبدأ الفيد
      const t = window.setTimeout(() => {
        if (i < 2) {
          // فاصلة صغيرة بين البارات لعُرض لطيف
          const g = window.setTimeout(() => fillStep(i + 1), gapMs);
          return () => window.clearTimeout(g);
        } else {
          // خلصنا التلات بارات
          const hold = window.setTimeout(() => {
            setIsExiting(true); // ابدأ الفيد آوت
            const fade = window.setTimeout(() => {
              setVisible(false);
              onDone?.();
            }, fadeMs + 50);
            return () => window.clearTimeout(fade);
          }, holdMs);
          return () => window.clearTimeout(hold);
        }
      }, stepMs);

      return () => window.clearTimeout(t);
    };

    // ابدأ من البار الأول
    const kick = window.setTimeout(() => fillStep(0), 50);
    return () => window.clearTimeout(kick);
  }, [fadeMs, gapMs, holdMs, onDone, stepMs]);

  if (!visible) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[1200] grid place-items-center overflow-hidden bg-[#030303] transition-opacity",
        isExiting ? "opacity-0" : "opacity-100"
      )}
      style={{ transitionDuration: `${Math.max(200, fadeMs)}ms` }}
      role="dialog"
      aria-label="Initializing AFR Command Console"
    >
      <div className="pointer-events-none absolute inset-0 bg-radial-[ellipse_at_center] from-red-900/12 via-transparent to-transparent" />
      <div className="pointer-events-none absolute inset-[10%] rounded-[48px] border border-red-900/20 shadow-[0_0_140px_rgba(239,68,68,0.18)]" />

      <div className="relative flex w-[min(460px,92vw)] flex-col items-center gap-6 rounded-[32px] border border-red-500/30 bg-black/55 px-12 py-12 text-center shadow-[0_48px_140px_rgba(239,68,68,0.22)] backdrop-blur-lg">
        <div className="relative h-28 w-28">
          <div className="absolute inset-0 rounded-[32px] border border-red-500/40 bg-gradient-to-br from-red-900/60 via-black to-black" />
          <div className="absolute inset-2 rounded-[28px] border border-red-500/25" />
          <div className="absolute inset-0 animate-pulse rounded-[32px] bg-red-600/18 blur-lg" />
          <img
            src={afrLogo}
            alt="AFR Robot Emblem"
            className="absolute left-1/2 top-1/2 h-[76px] w-[76px] -translate-x-1/2 -translate-y-1/2 select-none object-contain drop-shadow-[0_12px_26px_rgba(239,68,68,0.4)]"
            onError={(e) => {
              const t = e.currentTarget;
              t.onerror = null;
              t.src = "/favicon.svg";
            }}
          />
        </div>

        <div className="space-y-2">
          <div className="text-[13px] font-semibold uppercase tracking-[0.42em] text-red-200/80">
            AFR
          </div>
          <h1 className="text-2xl font-black uppercase tracking-[0.42em] text-red-100">
            Command Console
          </h1>
          <p className="text-xs uppercase tracking-[0.3em] text-red-200/70">
            Fire Response Intelligence Division
          </p>
        </div>

        <div className="mt-2 flex w-full flex-col items-center gap-3 text-xs uppercase tracking-[0.24em] text-red-200/90">
          <span className="text-[11px]">
            {STEPS[Math.min(stepIndex, STEPS.length - 1)]}
          </span>

          <div className="flex w-full items-center gap-3">
            {widths.map((w, idx) => (
              <div
                // eslint-disable-next-line react/no-array-index-key
                key={idx}
                className={cn(
                  "relative h-[4px] flex-1 overflow-hidden rounded-full bg-red-900/30",
                  w > 0 && "bg-red-900/40 shadow-[0_0_14px_rgba(248,113,113,0.45)]"
                )}
              >
                <div
                  className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-red-500 via-red-400 to-red-200"
                  style={{
                    width: `${w}%`,
                    transitionProperty: "width",
                    transitionDuration: `${stepMs}ms`,
                    transitionTimingFunction: "ease-out",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
