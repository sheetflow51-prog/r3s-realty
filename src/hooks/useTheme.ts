import { useEffect, useState } from "react";

const STORAGE_KEY = "r3s-theme";

export function useTheme() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved ? saved === "dark" : false;
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", isDark);
    root.classList.toggle("light", !isDark);
    try {
      window.localStorage.setItem(STORAGE_KEY, isDark ? "dark" : "light");
    } catch {
      // storage unavailable — ignore
    }
  }, [isDark]);

  return {
    isDark,
    toggle: () => setIsDark((d) => !d),
  };
}
