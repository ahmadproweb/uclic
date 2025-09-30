'use client';

import { cn } from "@/lib/utils";
import { useTheme } from '@/context/ThemeContext';
import { colors as theme } from '@/config/theme';
import React from 'react';

export default function HeroBackground() {
  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === 'dark';
  const [haloOpacity, setHaloOpacity] = React.useState<number>(isDark ? 0.35 : 0.4);

  React.useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY || 0;
      const start = isDark ? 0.35 : 0.4; // strong at load
      const end = isDark ? 0.12 : 0.15;  // dim target
      const distance = 60; // very short range for a very fast progressive fade
      const t = Math.min(Math.max(y / distance, 0), 1);
      setHaloOpacity(start + (end - start) * t);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDark]);

  return (
    <>
      {/* Match contact page: no section-level pattern */}

      {/* Dynamic halo: stronger on load, dims as you scroll */}
      <div
        className="fixed top-0 left-0 right-0 h-[45vh] z-0 pointer-events-none"
        style={{
          background: isDark
            ? `radial-gradient(ellipse at center 20%, rgba(212,237,49,0.20) 0%, rgba(212,237,49,0.12) 15%, rgba(212,237,49,0.06) 35%, rgba(0,0,0,0.10) 55%, rgba(0,0,0,0) 75%)`
            : `radial-gradient(ellipse at center 20%, rgba(212,237,49,0.25) 0%, rgba(212,237,49,0.15) 18%, rgba(212,237,49,0.08) 38%, rgba(255,255,255,0.10) 58%, rgba(255,255,255,0) 78%)`,
          filter: 'blur(20px)',
          opacity: haloOpacity,
          transition: 'opacity 0.18s linear',
        }}
        aria-hidden="true"
      />
    </>
  );
} 