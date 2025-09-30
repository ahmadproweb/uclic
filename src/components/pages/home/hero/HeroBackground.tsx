'use client';

import { useTheme } from '@/context/ThemeContext';
import React from 'react';

export default function HeroBackground() {
  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === 'dark';
  // Match contact page: static halo (no scroll-dimming)
  return (
    <>
      {/* Dotted background pattern (same as PartnerHome), scrolls with content */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: "url('https://framerusercontent.com/images/g0QcWrxr87K0ufOxIUFBakwYA8.png')",
          backgroundRepeat: 'repeat',
          backgroundSize: '200px',
          opacity: isDark ? 0.12 : 0.04
        }}
      />
      {/* Halo gradient overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 right-0 h-[45vh] z-[1]"
        style={{
          background: isDark
            ? `radial-gradient(ellipse at center 20%, rgba(212,237,49,0.20) 0%, rgba(212,237,49,0.12) 15%, rgba(212,237,49,0.06) 35%, rgba(0,0,0,0.1) 55%, rgba(0,0,0,0) 75%)`
            : `radial-gradient(ellipse at center 20%, rgba(212,237,49,0.25) 0%, rgba(212,237,49,0.15) 18%, rgba(212,237,49,0.08) 38%, rgba(255,255,255,0.1) 58%, rgba(255,255,255,0) 78%)`,
          filter: 'blur(20px)'
        }}
      />
    </>
  );
} 