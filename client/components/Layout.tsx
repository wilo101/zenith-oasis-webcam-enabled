import { ReactNode, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SplashScreen from "./SplashScreen";
import afrLogo from "@/assets/afr-logo.png"; // ← استيراد اللوجو

export default function Layout({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
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

  return (
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
    </div>
  );
}
