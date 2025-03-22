'use client';

import { colors as theme } from '@/config/theme';

export function ClientPulseEffect() {
  return (
    <div 
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
    >
      <div 
        className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[1200px] h-[600px] animate-pulse-slow" 
        style={{ 
          background: `radial-gradient(ellipse at 50% 100%, 
            ${theme.colors.primary.main}80 0%,
            ${theme.colors.primary.main}40 30%,
            ${theme.colors.primary.main}20 50%,
            transparent 70%
          )`,
          filter: 'blur(60px)',
          transformOrigin: 'bottom center',
          willChange: 'transform, opacity'
        }}
      />
      
      {/* Couches de fond supplémentaires */}
      <div 
        className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[1000px] h-[500px] animate-pulse-slower"
        style={{ 
          background: `radial-gradient(ellipse at 50% 100%, 
            ${theme.colors.primary.main}60 0%,
            ${theme.colors.primary.main}30 40%,
            transparent 70%
          )`,
          filter: 'blur(50px)',
          willChange: 'transform'
        }}
      />
      
      <div 
        className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[800px] h-[400px] animate-pulse-slowest"
        style={{ 
          background: `radial-gradient(ellipse at 50% 100%, 
            ${theme.colors.primary.main}90 0%,
            transparent 60%
          )`,
          filter: 'blur(40px)',
          willChange: 'transform'
        }}
      />
    </div>
  );
} 