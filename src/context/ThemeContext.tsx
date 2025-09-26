"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<Theme>("light");

  // Initialisation du thème
  useEffect(() => {
    setMounted(true);
    const savedFromStorage = localStorage.getItem("theme") as Theme | null;
    const systemPrefersDark = !!(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
    const resolvedTheme: Theme = savedFromStorage || (systemPrefersDark ? 'dark' : 'light');

    console.log('[Theme] system prefers:', systemPrefersDark ? 'dark' : 'light');
    if (savedFromStorage) {
      console.log('[Theme] stored preference found:', savedFromStorage);
    } else {
      console.log('[Theme] no stored preference, using system default');
    }

    const savedTheme = resolvedTheme;
    setTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  // Application du thème
  const applyTheme = (newTheme: Theme) => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // Mise à jour du thème
  useEffect(() => {
    if (mounted) {
      applyTheme(theme);
      console.log('[Theme] active theme:', theme);
      window.dispatchEvent(new CustomEvent("themeChange", { detail: theme }));
    }
  }, [theme, mounted]);

  // Basculement du thème
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div>{children}</div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
