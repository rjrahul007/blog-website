"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        className="fixed top-6 right-6 p-3 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-lg z-50 pointer-events-none"
        aria-label="Toggle theme"
        disabled
      >
        <div className="w-5 h-5" />
      </button>
    );
  }

  const currentTheme = theme === "system" ? resolvedTheme : theme;

  const handleToggle = () => {
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    console.log("Current theme:", currentTheme);
    console.log("Switching to:", newTheme);
    setTheme(newTheme);
  };

  return (
    <button
      onClick={handleToggle}
      className="fixed top-6 right-6 p-3 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all z-50 group"
      aria-label={`Switch to ${
        currentTheme === "light" ? "dark" : "light"
      } mode`}
    >
      {currentTheme === "light" ? (
        <Moon className="w-5 h-5 text-slate-700 group-hover:text-purple-600 transition-colors" />
      ) : (
        <Sun className="w-5 h-5 text-yellow-400 group-hover:text-yellow-300 transition-colors" />
      )}
    </button>
  );
}
