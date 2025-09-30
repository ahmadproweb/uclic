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
      className="w-full pt-20 pb-12 md:pt-20 md:pb-16 relative z-[10] overflow-hidden bg-white dark:bg-black/95 border-b border-black/5 dark:border-white/10"
      aria-labelledby="services-title"
    >
      <PlusIcon />
      <ClientPulseEffect />
      
      <h2 
        id="services-title"
        className={cn(
          "max-w-5xl mx-auto text-center mb-16 md:mb-20 pt-8 md:pt-0",
          "text-3xl sm:text-4xl md:text-5xl lg:text-[50px]",
          "font-medium tracking-[-1px]",
          "text-black/90 dark:text-white/90",
          "leading-[1.1]"
        )}
      >
        Agence Growth & IA orientée revenus
      </h2>

      <p className="text-center text-black/70 dark:text-white/70 max-w-3xl mx-auto -mt-10 mb-12 md:mb-16">
        Nous concevons, testons et industrialisons ce qui fait croître vos revenus&nbsp;: visites qualifiées, prospects, ventes, revenus. Des résultats mesurables, pas de bla‑bla.
      </p>
      
      <div 
        className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-3 gap-8"
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

      {/* Removed background noise overlay */}
    </section>
  );
} 