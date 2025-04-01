"use client";

import { colors as theme } from '@/config/theme';
import { ServiceCard } from './ServiceCard';
import { serviceData } from './serviceData';
import { ClientPulseEffect } from './ClientPulseEffect';
import { UnderlinedText } from '@/components/ui/underlined-text';
import { cn } from "@/lib/utils";
import { memo } from 'react';

const GrainEffect = memo(function GrainEffect() {
  return (
    <svg 
      className="fixed inset-0 w-full h-full opacity-20 mix-blend-overlay pointer-events-none" 
      aria-hidden="true"
      style={{ willChange: 'transform' }}
    >
      <defs>
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.80" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </defs>
      <rect width="100%" height="100%" filter="url(#grain)" />
    </svg>
  );
});

GrainEffect.displayName = 'GrainEffect';

const PlusIcon = memo(function PlusIcon() {
  return (
    <svg 
      width="40" 
      height="40" 
      viewBox="0 0 40 40" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="absolute top-20 left-20 hidden md:block text-primary transform-gpu"
      role="presentation"
      aria-hidden="true"
      style={{ willChange: 'transform' }}
    >
      <path 
        d="M20 2V38M2 20H38" 
        stroke="currentColor"
        strokeWidth="3" 
        strokeLinecap="round"
      />
    </svg>
  );
});

PlusIcon.displayName = 'PlusIcon';

export default function Services() {
  return (
    <section 
      id="services" 
      className="w-full py-0 pb-16 md:py-20 md:pb-16 relative overflow-hidden bg-[#f4f4f0] dark:bg-black/95"
      aria-labelledby="services-title"
    >
      <PlusIcon />
      <ClientPulseEffect />
      <GrainEffect />
      
      <div className="max-w-[1250px] mx-auto px-4 relative z-10">
        <h2 
          id="services-title"
          className={cn(
            "max-w-5xl mx-auto text-center mb-16 pt-8 md:pt-0",
            "text-3xl sm:text-4xl md:text-5xl lg:text-[50px]",
            "font-medium tracking-[-1px]",
            "text-black/90 dark:text-white/90",
            "leading-[1.1]"
          )}
        >
          Rapide, flexible
          <span className="block">
            et incroyablement{' '}
            <UnderlinedText text="efficace" />
          </span>
        </h2>
        
        <div 
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6"
          role="list"
        >
          {serviceData.map((service, index) => (
            <ServiceCard 
              key={service.title}
              {...service}
              theme={theme}
              priority={index < 3}
              className="transform-gpu"
              style={{ willChange: 'transform' }}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 