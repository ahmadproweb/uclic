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
      {/* Section-level repeating background pattern (same technique as CaseStudy/Testimonials) */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: "url('https://framerusercontent.com/images/g0QcWrxr87K0ufOxIUFBakwYA8.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "200px",
          opacity: isDark ? 0.25 : 0.04
        }}
      />

      {/* Dynamic halo: stronger on load, dims as you scroll */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] sm:w-[1400px] h-[420px] sm:h-[500px] -z-0 pointer-events-none"
        style={{
          background: isDark
            ? `radial-gradient(ellipse at 50% 0%, rgba(224,255,92,0.8) 0%, rgba(224,255,92,0.35) 25%, rgba(224,255,92,0.12) 55%, transparent 75%)`
            : `radial-gradient(ellipse at 50% 0%, rgba(224,255,92,0.7) 0%, rgba(224,255,92,0.3) 25%, rgba(224,255,92,0.12) 55%, transparent 75%)`,
          filter: 'blur(50px)',
          opacity: haloOpacity,
          transition: 'opacity 0.18s linear',
        }}
        aria-hidden="true"
      />
    </>
  );
} 