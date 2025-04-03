'use client';

import { cn } from "@/lib/utils";
import { UnderlinedText } from '@/components/ui/underlined-text';
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

interface ExpertiseBenefitsProps {
  h21?: string;
  titrebox1?: string;
  description1?: string;
  titrebox2?: string;
  description2?: string;
  titrebox3?: string;
  description3?: string;
}

export default function ExpertiseBenefits({
  h21,
  titrebox1,
  description1,
  titrebox2,
  description2,
  titrebox3,
  description3
}: ExpertiseBenefitsProps) {
  if (!h21 || !titrebox1 || !titrebox2 || !titrebox3) return null;

  return (
    <section className="w-full py-0 pb-16 md:py-20 md:pb-16 relative overflow-hidden bg-[#f4f4f0] dark:bg-black/95">
      <PlusIcon />
      
      {/* Noise background */}
      <div 
        className="fixed inset-0 w-full h-full opacity-20 mix-blend-overlay pointer-events-none"
        aria-hidden="true"
        style={{ 
          willChange: 'transform',
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.80\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")'
        }}
      />
      
      <div className="max-w-[1250px] mx-auto px-4 relative z-10">
        <h2 
          className={cn(
            "max-w-5xl mx-auto text-center mb-16 pt-8 md:pt-0",
            "text-3xl sm:text-4xl md:text-5xl lg:text-[50px]",
            "font-medium tracking-[-1px]",
            "text-black/90 dark:text-white/90",
            "leading-[1.1]"
          )}
        >
          {h21}
        </h2>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: titrebox1, description: description1 },
            { title: titrebox2, description: description2 },
            { title: titrebox3, description: description3 }
          ].map((benefit, index) => (
            <article 
              key={index}
              className={cn(
                "rounded-[32px] p-10 relative overflow-hidden h-full bg-[#E0FF5C] backdrop-blur-md shadow-service transform-gpu transition-all duration-500 ease-out hover:-translate-y-4 group"
              )}
              style={{ willChange: 'transform' }}
            >
              <div 
                className="absolute top-8 left-8 w-12 h-12 rounded-full flex items-center justify-center bg-black/10 transform-gpu transition-transform duration-500 group-hover:scale-110"
                aria-hidden="true"
              >
                <i 
                  className={cn(
                    "ri-checkbox-circle-line",
                    "text-3xl text-black transform-gpu transition-transform duration-500 group-hover:rotate-12"
                  )}
                />
              </div>
              <h3 className="text-2xl font-bold mb-6 mt-16 text-black">
                {benefit.title}
              </h3>
              <p className="text-base leading-relaxed text-black/80">
                {benefit.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
} 