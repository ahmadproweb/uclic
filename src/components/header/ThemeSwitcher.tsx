'use client';

import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';
import 'remixicon/fonts/remixicon.css';

export default function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "p-2 rounded-full transition-colors",
        isDark 
          ? "text-white hover:bg-white/10" 
          : "text-black hover:bg-black/10"
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