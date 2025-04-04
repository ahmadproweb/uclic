"use client";

import { colors as theme } from '@/config/theme';
import { ServiceCard } from './ServiceCard';
import { serviceData } from './serviceData';
import { ClientPulseEffect } from './ClientPulseEffect';
import { UnderlinedText } from '@/components/ui/underlined-text';
import { cn } from "@/lib/utils";
import { memo } from 'react';

const PlusIcon = memo(function PlusIcon() {
  return (
    <i 
      className="ri-add-line absolute top-20 left-20 hidden md:block text-primary transform-gpu text-4xl"
      aria-hidden="true"
      style={{ willChange: 'transform' }}
    />
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
          et incroyablement efficace
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

      <div 
        className="fixed inset-0 w-full h-full opacity-20 mix-blend-overlay pointer-events-none"
        aria-hidden="true"
        style={{ 
          willChange: 'transform',
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.80' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")"
        }}
      />
    </section>
  );
} 