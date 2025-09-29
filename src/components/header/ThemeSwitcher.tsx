"use client";

import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";

interface ThemeSwitcherProps {
  isMobile?: boolean;
}

export default function ThemeSwitcher({
  isMobile = false,
}: ThemeSwitcherProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "px-2 py-1 rounded-full cursor-pointer",
        isDark
          ? "text-white hover:bg-white/10"
          : "text-black hover:bg-black/5"
      )}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <i
        className={cn(isDark ? "ri-sun-line" : "ri-moon-line", "text-xl")}
        aria-hidden="true"
      />
    </button>
  );
}
