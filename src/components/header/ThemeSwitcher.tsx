'use client';

import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';

export default function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "py-2  rounded-full",
        isDark 
          ? "text-white hover:bg-white/10" 
          : "text-white hover:bg-white/10"
      )}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <i 
        className={cn(
          isDark ? "ri-sun-line" : "ri-moon-line",
          "text-xl"
        )}
        aria-hidden="true"
      />
    </button>
  );
}