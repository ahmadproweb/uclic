"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { colors as theme } from '@/config/theme';

export function PulseEffect() {
  const pulseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pulseRef.current) return;

    const tl = gsap.timeline({
      repeat: -1,
      defaults: { ease: "power1.inOut" }
    });

    tl.to(pulseRef.current, {
      scale: 1.2,
      opacity: 0.9,
      duration: 2
    })
    .to(pulseRef.current, {
      scale: 1,
      opacity: 0.5,
      duration: 2
    });

    return () => tl.kill();
  }, []);

  return (
    <>
      <div ref={pulseRef} 
        className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[1200px] h-[600px]" 
        style={{ 
          background: `radial-gradient(ellipse at 50% 100%, 
            ${theme.colors.primary.main}80 0%,
            ${theme.colors.primary.main}40 30%,
            ${theme.colors.primary.main}20 50%,
            transparent 70%
          )`,
          filter: 'blur(60px)',
          transform: 'scale(1)',
          opacity: 0.6,
          transformOrigin: 'bottom center'
        }}
      />
      {/* Additional background layers */}
    </>
  );
} 