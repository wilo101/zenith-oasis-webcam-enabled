import { useMemo, useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const ITEMS = ["Motors", "Pump", "LIDAR", "Camera", "Comms", "Battery"] as const;

type Status = "idle" | "running" | "ok" | "fail";

export default function DiagnosticsPanel() {
  const [status, setStatus] = useState<Record<(typeof ITEMS)[number], Status>>(
    () =>
      ITEMS.reduce(
        (acc, item) => {
          acc[item] = "idle";
          return acc;
        },
        {} as Record<(typeof ITEMS)[number], Status>,
      ),
  );
  const [runningAll, setRunningAll] = useState(false);

  const anyItemRunning = runningAll || ITEMS.some((item) => status[item] === "running");

  const runAll = async () => {
    if (anyItemRunning) return;
    setRunningAll(true);
    const next = { ...status };
    for (const item of ITEMS) {
      next[item] = "running";
      setStatus({ ...next });
      // simulate checks
      // eslint-disable-next-line no-await-in-loop
      await new Promise((r) => setTimeout(r, 400 + Math.random() * 600));
      next[item] = Math.random() > 0.08 ? "ok" : "fail";
      setStatus({ ...next });
    }
    setRunningAll(false);
  };

  const runItem = async (item: (typeof ITEMS)[number]) => {
    if (runningAll || status[item] === "running") return;
    setStatus((prev) => ({ ...prev, [item]: "running" }));
    await new Promise((r) => setTimeout(r, 400 + Math.random() * 600));
    const result: Status = Math.random() > 0.08 ? "ok" : "fail";
    setStatus((prev) => ({ ...prev, [item]: result }));
  };

  const statusLabel = useMemo<Record<Status, { badge: string; tone: string; description: string }>>(
    () => ({
      idle: { badge: "🟡 Standby", tone: "text-amber-200/90", description: "Awaiting diagnostic cycle." },
      running: { badge: "🟡 Scanning", tone: "text-amber-200/90", description: "Running live checks…" },
      ok: { badge: "🟢 Active", tone: "text-emerald-200/90", description: "System operating nominally." },
      fail: { badge: "🔴 Error", tone: "text-red-200/90", description: "Fault detected — review immediately." },
    }),
    [],
  );

  return (
    <div className="rounded-2xl border border-red-900/40 bg-[#0b1010] p-4 shadow-[0_0_22px_rgba(239,68,68,0.08)]">
      <div className="mb-3 flex items-center justify-between">
        <div className="text-xs font-semibold uppercase tracking-widest text-soft">Self-Diagnostics</div>
        <button
          onClick={runAll}
          disabled={anyItemRunning}
          className="relative overflow-hidden rounded border border-red-900/40 bg-black/60 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-red-100 transition hover:bg-red-900/30 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span className={runningAll ? "animate-pulse" : ""}>{runningAll ? "Scanning" : "Run All"}</span>
          {runningAll && <span className="absolute inset-0 animate-[pulse_1.5s_linear_infinite] bg-red-500/10" aria-hidden />}
        </button>
      </div>
      <ul className="space-y-2 text-sm">
        {ITEMS.map((k) => {
          const s = status[k] || "idle";
          return (
            <li
              key={k}
              className="relative overflow-hidden rounded border border-red-900/30 bg-black/40 px-3 py-2 backdrop-blur-sm transition hover:bg-white/3"
            >
              {s === "running" && (
                <span className="absolute inset-x-0 top-0 h-0.5 animate-[pulse_1.2s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-red-400/40 to-transparent" />
              )}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <span className="text-soft">{k}</span>
                  <button
                    onClick={() => runItem(k)}
                    disabled={runningAll || s === "running"}
                    className="rounded border border-red-900/40 bg-black/40 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-red-100 transition hover:bg-red-900/30 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {s === "running" ? "Scanning" : "Run"}
                  </button>
                </div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className={`flex items-center gap-2 text-[12px] font-semibold uppercase tracking-widest ${statusLabel[s].tone}`}>
                      <span className="indicator-dot" />
                      {statusLabel[s].badge}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>{statusLabel[s].description}</TooltipContent>
                </Tooltip>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
