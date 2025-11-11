import { ReactNode, Suspense, lazy, useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import SplashScreen from "./SplashScreen";
import LayoutContext from "./firebot/LayoutContext";
import afrLogo from "@/assets/afr-logo.png"; // ← استيراد اللوجو

const GuidedTour = lazy(() => import("./GuidedTour"));

export default function Layout({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [tourOpen, setTourOpen] = useState(false);
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("theme");
    const root = document.documentElement;
    if (!stored) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else if (stored === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    setShowSplash(true);
    const t = window.setTimeout(() => {
      setShowSplash(false);
    }, 1200);
    return () => window.clearTimeout(t);
  }, [mounted]);

  const closeTour = useCallback(() => {
    localStorage.setItem("afr-tour-complete", "1");
    setTourOpen(false);
    try {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      window.scrollTo(0, 0);
    }
  }, []);

  const toggleTour = useCallback(() => {
    setTourOpen((prev) => {
      if (prev) {
        localStorage.setItem("afr-tour-complete", "1");
        return false;
      }
      localStorage.removeItem("afr-tour-complete");
      return true;
    });
  }, []);

  const layoutValue = useMemo(
    () => ({
      requestTour: () => setTourOpen(true),
    }),
    [],
  );

  return (
    <LayoutContext.Provider value={layoutValue}>
      <div className="min-h-screen bg-background text-foreground">
        {/* 🔻 Navbar */}
        <nav className="sticky top-0 z-40 border-b border-red-900/20 bg-gradient-to-r from-[#090303] via-[#100404] to-[#090303] shadow-[0_8px_24px_rgba(0,0,0,0.55)]">
          <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 md:h-16 md:flex-nowrap md:gap-6 md:px-6 lg:px-8">
            {/* 🔻 Logo + Title */}
            <Link to="/" className="inline-flex items-center gap-4">
              <img
                src={afrLogo}
                alt="Augustus Logo"
                className="h-14 w-14 object-contain drop-shadow-[0_0_10px_rgba(239,68,68,0.7)]"
              />
              <span className="text-2xl md:text-3xl font-black tracking-[0.25em] uppercase text-red-500">
                Augustus
              </span>
            </Link>

            {/* 🔻 Tour Button */}
            <div className="flex items-center gap-3">
              <button
                onClick={toggleTour}
                aria-pressed={tourOpen}
                className={`inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm md:text-base transition-colors ${
                  tourOpen
                    ? "border-red-500/70 bg-red-600/20 text-red-100 hover:bg-red-600/30"
                    : "border-red-900/40 bg-black/40 text-red-100 hover:bg-black/60"
                }`}
              >
                {tourOpen ? "Close Tour" : "Launch Tour"}
              </button>
            </div>
          </div>
        </nav>

        {/* 🔻 Main Content */}
        <main className="pb-10">{mounted && children}</main>

        {/* 🔻 Footer */}
        <footer className="border-t border-red-900/20 py-4 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Augustus — FireBot Command Console
        </footer>

        {/* 🔻 Splash Screen */}
        {showSplash && <SplashScreen onDone={() => {}} />}

        {/* 🔻 Guided Tour */}
        <Suspense fallback={null}>
          <GuidedTour
            steps={[
              { selector: "[data-tour=cam]", title: "Robot IP Camera", description: "Live feed with snapshot, recording and fullscreen controls." },
              { selector: "[data-tour=battery]", title: "Power Levels", description: "Battery gauge and autonomy estimate for the robot." },
              { selector: "[data-tour=temp]", title: "Thermal Status", description: "Current operating temperature with high-temp alerts." },
              { selector: "[data-tour=water]", title: "Water Tank", description: "Monitor remaining water capacity and refill thresholds." },
              { selector: "[data-tour=pressure]", title: "Pump Pressure", description: "Real-time delivery pressure. Keep this within the nominal band." },
              { selector: "[data-tour=map]", title: "Map Tracking", description: "Clean live map view with GPS toggles and centering controls." },
              { selector: "[data-tour=diag]", title: "Self Diagnostics", description: "Run system checks and review component health at a glance." },
            ]}
            open={tourOpen}
            onClose={closeTour}
          />
        </Suspense>
      </div>
    </LayoutContext.Provider>
  );
}
