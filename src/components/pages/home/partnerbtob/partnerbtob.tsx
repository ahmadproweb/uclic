"use client";

import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { UnderlinedText } from '@/components/ui/underlined-text';
import { memo } from 'react';

// Type definitions
interface Partner {
  name: string;
  logo: string;
  description: string;
}

// Définition des partenaires
const partners: Partner[] = [
  { 
    name: "PostHog", 
    logo: "/partners/posthog.png",
    description: "Plateforme d'analyse produit open source" 
  },
  { name: "Partner 2", logo: "/partners/lemlist.png", description: "Description du partenaire 3" },
  { name: "Partner 3", logo: "/partners/hightouch.png", description: "Description du partenaire 3" },
  { name: "Partner 4", logo: "/partners/hubspot.png", description: "Description du partenaire 4" },
  { name: "Partner 5", logo: "/partners/openai.png", description: "Description du partenaire 5" },
  { name: "Partner 6", logo: "/partners/googleanalytics.png", description: "Description du partenaire 6" },
  { name: "Partner 7", logo: "/partners/pipedrive.png", description: "Description du partenaire 7" },
  { name: "Partner 8", logo: "/partners/n8n.png", description: "Description du partenaire 8" },
  { name: "Partner 9", logo: "/partners/salesforce.png", description: "Description du partenaire 9" },
  { name: "Partner 10", logo: "/partners/zoho.png", description: "Description du partenaire 10" },
  { name: "Partner 11", logo: "/partners/ahref.png", description: "Description du partenaire 11" },
  { name: "Semrush", logo: "/partners/semrush.png", description: "Description du partenaire 12" },
  { name: "Partner 13", logo: "/partners/oncrawl.png", description: "Description du partenaire 13" },
];

// Memoized Partner Card Component
const PartnerCard = memo(({ partner, isDark }: { partner: Partner; isDark: boolean }) => (
  <div className="aspect-square flex items-center justify-center relative">
    <div className={cn(
      "w-full h-full rounded-[24px] md:rounded-[32px] flex items-center justify-center",
      "transition-colors duration-300 ease-in-out",
      isDark 
        ? "bg-black border border-white/10 hover:border-white/20" 
        : "bg-black border border-white/5 hover:border-white/10"
    )}>
      <div className="relative w-[50px] h-[20px] sm:w-[65px] sm:h-[25px] md:w-[80px] md:h-[30px]">
        <img 
          src={partner.logo}
          alt={`${partner.name} logo`}
          className="absolute inset-0 w-full h-full object-contain opacity-100 [filter:brightness(0)_invert(1)]"
          loading="lazy"
        />
      </div>
    </div>
    <span className="sr-only">{partner.name} - {partner.description}</span>
  </div>
));

PartnerCard.displayName = 'PartnerCard';

// Memoized Decorative Squares Component
const DecorativeSquares = memo(({ isDark }: { isDark: boolean }) => {
  if (!isDark) return null;
  
  return (
    <div className="absolute inset-0 z-[1] pointer-events-none md:block hidden">
      {[...Array(6)].map((_, colIndex) => (
        <div
          key={`square-${colIndex}`}
          className="absolute w-[40px] h-[40px] md:w-[50px] md:h-[50px] bg-white transform -translate-x-1/2 -translate-y-1/2 rotate-45"
          style={{
            left: `${(colIndex + 1) * (100 / 7)}%`,
            top: '50%',
          }}
          aria-hidden="true"
        />
      ))}
    </div>
  );
});

DecorativeSquares.displayName = 'DecorativeSquares';

// Memoized Plus Button Component
const PlusButton = memo(({ isDark }: { isDark: boolean }) => (
  <div className="aspect-square flex items-center justify-center relative">
    <div className={cn(
      "w-full h-full rounded-[24px] md:rounded-[32px] flex items-center justify-center",
      "transition-colors duration-300 ease-in-out",
      isDark 
        ? "bg-black border border-white/10 hover:border-white/20" 
        : "bg-black border border-white/5 hover:border-white/10"
    )}>
      <svg 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6 md:w-8 md:h-8"
        aria-hidden="true"
      >
        <path 
          d="M12 4V20M4 12H20" 
          stroke="white" 
          strokeWidth="2" 
          strokeLinecap="round"
        />
      </svg>
    </div>
  </div>
));

PlusButton.displayName = 'PlusButton';

// Composant principal - rendu côté serveur par défaut
function PartnerBtoB() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section 
      id="partner-btob" 
      className={cn(
        "w-full relative py-8 md:py-16",
        isDark ? "bg-black" : "bg-white"
      )}
      aria-label="Nos partenaires B2B"
    >
      <div className="max-w-[1250px] mx-auto px-4">
        <div className="text-center">
          <h2 className={cn(
            "text-3xl sm:text-4xl md:text-5xl lg:text-[50px]",
            "font-medium tracking-[-1px]",
            "text-black/90 dark:text-white/90",
            "leading-[1.1]",
            "mb-8 md:mb-16"
          )}>
            <span className="block">Des partenariats d&apos;excellence et</span>
            <span className="block">
              une expertise au service de{' '}
              <UnderlinedText text="votre" />{' '}
              <UnderlinedText text="croissance" />
            </span>
          </h2>
          
          <div className="max-w-[1000px] mx-auto">
            <div className="relative">
              <DecorativeSquares isDark={isDark} />

              
              <div 
                className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7 relative z-[2]"
                role="list"
                aria-label="Liste de nos partenaires"
              >
                {partners.map((partner, index) => (
                  <div 
                    key={`partner-${index}`}
                    role="listitem"
                  >
                    <PartnerCard 
                      partner={partner}
                      isDark={isDark}
                    />
                  </div>
                ))}
                <div role="listitem">
                  <PlusButton isDark={isDark} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(PartnerBtoB); 