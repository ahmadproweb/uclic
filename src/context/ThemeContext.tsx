"use client";

import { createContext, useContext, useEffect, useState } from "react";

// Déclaration globale pour le thème initial
declare global {
  interface Window {
    __INITIAL_THEME__?: string;
  }
}

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<Theme>(() => {
    // Utiliser le thème initial appliqué par le script
    if (typeof window !== 'undefined') {
      try {
        // Priorité au thème déjà appliqué par le script
        if (window.__INITIAL_THEME__) {
          return window.__INITIAL_THEME__ as Theme;
        }
        const savedTheme = localStorage.getItem("theme") as Theme | null;
        const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        return savedTheme || (systemPrefersDark ? 'dark' : 'light');
      } catch (e) {
        return 'dark'; // Fallback vers dark par défaut
      }
    }
    return 'dark'; // Fallback vers dark par défaut
  });

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

    // Ne mettre à jour que si le thème a changé
    if (resolvedTheme !== theme) {
      setTheme(resolvedTheme);
    }
    // Appliquer le thème même si c'est le même (au cas où le script n'aurait pas fonctionné)
    applyTheme(resolvedTheme);
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

  // Éviter l'hydratation mismatch en ne rendant qu'après le montage
  if (!mounted) {
    return (
      <ThemeContext.Provider value={{ theme: "light", toggleTheme: () => {} }}>
        <div suppressHydrationWarning>{children}</div>
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div suppressHydrationWarning>{children}</div>
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
