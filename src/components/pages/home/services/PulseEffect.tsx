"use client";

import { useRef } from 'react';
import { colors as theme } from '@/config/theme';

export function PulseEffect() {
  const pulseRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div ref={pulseRef} 
        className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[1200px] h-[600px] animate-pulse" 
        style={{ 
          background: `radial-gradient(ellipse at 50% 100%, 
            ${theme.colors.primary.main}80 0%,
            ${theme.colors.primary.main}40 30%,
            ${theme.colors.primary.main}20 50%,
            transparent 70%
          )`,
          filter: 'blur(60px)',
          opacity: 0.6,
          transformOrigin: 'bottom center',
          animation: 'pulse 4s ease-in-out infinite'
        }}
      />
      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            transform: translateX(-50%) scale(1);
            opacity: 0.6;
          }
          50% {
            transform: translateX(-50%) scale(1.2);
            opacity: 0.9;
          }
        }
      `}</style>
    </>
  );
} 