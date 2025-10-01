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
      className="w-full pt-20 pb-12 md:pt-20 md:pb-16 relative z-10 overflow-hidden bg-white dark:bg-black border-b border-black/5 dark:border-white/10"
      aria-labelledby="services-title"
    >
      {/* Removed background grain texture to match Hero background */}

      <PlusIcon />
      <ClientPulseEffect />
      
      <div className="max-w-[1250px] mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex px-4 py-2 border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 rounded-full mb-6">
            <span className="font-medium text-sm text-black dark:text-white">🎯 Nos Services</span>
          </div>
          
          <h2 
            id="services-title"
            className={cn(
              "max-w-5xl mx-auto text-center mb-6",
              "text-3xl sm:text-4xl md:text-5xl lg:text-[50px]",
              "font-bold tracking-[-1px]",
              "text-black dark:text-white",
              "leading-[1.1]"
            )}
          >
            Agence Growth & IA<br/>
            orientée revenus, pas notoriété
          </h2>

          <p className="text-center text-black/70 dark:text-white/70 max-w-3xl mx-auto mb-12 md:mb-16 text-base md:text-lg leading-relaxed">
            Notre agence ne vend pas de la visibilité. Nous déployons une stack IA complète qui transforme votre marketing en machine de revenus : acquisition qualifiée, conversion optimisée, scaling automatisé. Résultats mesurables, pas de blabla.
          </p>
        </div>
      </div>
      
      <div 
        className="max-w-[1250px] mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
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