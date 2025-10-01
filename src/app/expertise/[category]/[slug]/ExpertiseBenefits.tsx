'use client';

import { memo } from 'react';
import { cn } from "@/lib/utils";
import { UnderlinedText } from '@/components/ui/underlined-text';
import { ClientPulseEffect } from '@/components/pages/home/services/ClientPulseEffect';
import { useTheme } from "@/context/ThemeContext";

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

interface ExpertiseBenefitsProps {
  h21?: string;
  subtitle?: string;
  titrebox1?: string;
  description1?: string;
  titrebox2?: string;
  description2?: string;
  titrebox3?: string;
  description3?: string;
}

export default function ExpertiseBenefits({
  h21,
  subtitle,
  titrebox1,
  description1,
  titrebox2,
  description2,
  titrebox3,
  description3
}: ExpertiseBenefitsProps) {
  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === "dark";
  
  if (!h21 || !titrebox1 || !titrebox2 || !titrebox3) return null;

  const benefits = [
    {
      icon: "ri-checkbox-circle-line",
      title: titrebox1,
      text: description1,
      badges: ["Expertise", "Qualité"]
    },
    {
      icon: "ri-checkbox-circle-line",
      title: titrebox2,
      text: description2,
      badges: ["Performance", "Innovation"]
    },
    {
      icon: "ri-checkbox-circle-line",
      title: titrebox3,
      text: description3,
      badges: ["ROI", "Résultats"]
    }
  ];

  return (
    <section 
      className="w-full pt-20 pb-12 md:pt-20 md:pb-16 relative z-10 overflow-hidden bg-white dark:bg-black border-b border-black/5 dark:border-white/10"
      aria-labelledby="benefits-title"
    >
      <PlusIcon />
      <ClientPulseEffect />
      
      <div className="max-w-[1250px] mx-auto px-4 sm:px-6">
        <div className="text-center">
          <div className="inline-flex px-4 py-2 border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 rounded-full mb-6">
            <span className="font-medium text-sm text-black dark:text-white">✨ Nos Avantages</span>
          </div>
          
          <h2 
            id="benefits-title"
            className={cn(
              "max-w-5xl mx-auto text-center mb-6",
              "text-3xl sm:text-4xl md:text-5xl lg:text-[50px]",
              "font-bold tracking-[-1px]",
              "text-black dark:text-white",
              "leading-[1.1]"
            )}
          >
            {h21}
          </h2>

          <p className="text-center text-black/70 dark:text-white/70 max-w-3xl mx-auto mb-12 md:mb-16 text-base md:text-lg leading-relaxed">
            {subtitle || "Découvrez les avantages concrets de notre expertise. Nous combinons stratégie, technologie et innovation pour vous offrir des solutions sur-mesure qui transforment votre vision en résultats mesurables."}
          </p>
        </div>
      </div>
      
      <div 
        className="max-w-[1250px] mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        role="list"
      >
        {benefits.map((benefit, index) => (
          <article 
            key={index}
            className={cn(
              "rounded-[32px] p-10 relative overflow-hidden h-full bg-[#E0FF5C] backdrop-blur-md shadow-service transform-gpu transition-all duration-500 ease-out hover:-translate-y-4 group"
            )}
            style={{ willChange: 'transform' }}
            role="listitem"
          >
            <i 
              className={cn(
                benefit.icon,
                "absolute top-8 left-8 w-10 h-10 rounded-full flex items-center justify-center bg-black/10 text-2xl text-black",
                "transform-gpu transition-all duration-500 group-hover:scale-110 group-hover:rotate-12"
              )}
              aria-hidden="true"
            />
            <h3 className="text-2xl font-bold mb-6 mt-16 text-black">
              {benefit.title}
            </h3>
            <p className="text-base leading-relaxed text-black/80">
              {benefit.text}
            </p>
            {benefit.badges && benefit.badges.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-6">
                {benefit.badges.map((badge, i) => (
                  <span
                    key={`${badge}-${i}`}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-black/10 text-black/80 border border-black/15"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>

    </section>
  );
}