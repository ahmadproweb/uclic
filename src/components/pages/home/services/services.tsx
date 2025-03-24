import { colors as theme } from '@/config/theme';
import { ServiceCard } from './ServiceCard';
import { serviceData } from './serviceData';
import { ClientPulseEffect } from './ClientPulseEffect';
import { UnderlinedText } from '@/components/ui/underlined-text';
import { cn } from "@/lib/utils";

export default function Services() {
  return (
    <section 
      id="services" 
      className="w-full py-0 pb-16 md:py-20 md:pb-16 relative overflow-hidden bg-[#f4f4f0] dark:bg-black/95"
      aria-labelledby="services-title"
    >
      {/* Plus Icon - Optimisé avec role décoratif */}
      <div 
        className="absolute top-20 left-20 hidden md:block" 
        role="presentation"
        aria-hidden="true"
      >
        <svg 
          width="40" 
          height="40" 
          viewBox="0 0 40 40" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="will-change-transform"
        >
          <path 
            d="M20 2V38M2 20H38" 
            stroke="currentColor"
            className="text-primary"
            strokeWidth="3" 
            strokeLinecap="round"
          />
        </svg>
      </div>
      
      {/* Effet de pulsation côté client */}
      <ClientPulseEffect />
      
      {/* Grain Effect */}
      <div className="absolute inset-0 opacity-30 z-0 pointer-events-none mix-blend-overlay" aria-hidden="true">
        <svg className="w-full h-full">
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.80" numOctaves="3" stitchTiles="stitch"/>
            <feColorMatrix type="saturate" values="0"/>
          </filter>
          <rect width="100%" height="100%" filter="url(#grain)"/>
        </svg>
      </div>
      
      <div className="max-w-[1250px] mx-auto px-4 relative z-10">
        {/* En-tête de section avec structure sémantique */}
        <header className="max-w-5xl mx-auto text-center mb-16 pt-8 md:pt-0">
          <h2 
            id="services-title"
            className={cn(
              "text-3xl sm:text-4xl md:text-5xl lg:text-[50px]",
              "font-medium tracking-[-1px]",
              "text-black/90 dark:text-white/90",
              "leading-[1.1]"
            )}
          >
            <span className="block">Rapide, flexible</span>
            <span className="block">
              et incroyablement efficace{' '}
              <UnderlinedText text="efficace" />
            </span>
          </h2>
        </header>
        
        {/* Grille de services avec lazy loading */}
        <div 
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6"
          role="list"
        >
          {serviceData.map((service, index) => (
            <div key={index} role="listitem">
              <ServiceCard 
                {...service}
                theme={theme}
                priority={index < 3} // Charge prioritairement les premiers éléments
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 