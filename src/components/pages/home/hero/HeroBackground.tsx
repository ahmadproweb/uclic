'use client';

import { useTheme } from '@/context/ThemeContext';
import React from 'react';

export default function HeroBackground() {
  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === 'dark';
  // Match contact page: static halo (no scroll-dimming)

  return null;
} 