"use client";

import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { getAssetUrl } from "@/lib/assets";
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
    logo: getAssetUrl('/partners/posthog.png'),
    description: "Analytics produit open‑source et event tracking" 
  },
  { name: "Lemlist", logo: getAssetUrl('/partners/lemlist.png'), description: "Cold email, délivrabilité et séquences multicanales" },
  { name: "Hightouch", logo: getAssetUrl('/partners/hightouch.png'), description: "Reverse ETL: synchro data warehouse → outils go‑to‑market" },
  { name: "HubSpot", logo: getAssetUrl('/partners/hubspot.png'), description: "CRM, marketing automation et sales pipeline" },
  { name: "OpenAI", logo: getAssetUrl('/partners/openai.png'), description: "Modèles IA (GPT) pour génération et automation" },
  { name: "Google Analytics", logo: getAssetUrl('/partners/googleanalytics.png'), description: "Web analytics et mesure d’audience" },
  { name: "Pipedrive", logo: getAssetUrl('/partners/pipedrive.png'), description: "CRM de vente simple et efficace" },
  { name: "n8n", logo: getAssetUrl('/partners/n8n.png'), description: "Workflows d’automatisation low‑code" },
  { name: "Salesforce", logo: getAssetUrl('/partners/salesforce.png'), description: "CRM enterprise et écosystème AppExchange" },
  { name: "Zoho", logo: getAssetUrl('/partners/zoho.png'), description: "Suite CRM et apps business intégrées" },
  { name: "Ahrefs", logo: getAssetUrl('/partners/ahref.png'), description: "SEO: backlinks, mots‑clés et audit technique" },
  { name: "Semrush", logo: getAssetUrl('/partners/semrush.png'), description: "Suite SEO/SEA: recherche, content et ads" },
  { name: "Oncrawl", logo: getAssetUrl('/partners/oncrawl.png'), description: "SEO technique et analyse de logs" },
];

// Memoized Partner Card Component
const PartnerCard = memo(({ partner, isDark }: { partner: Partner; isDark: boolean }) => (
  <div 
    className={cn(
      "aspect-square rounded-[24px] md:rounded-[32px] flex items-center justify-center",
      "transition-colors duration-300 ease-in-out",
      isDark 
        ? "bg-black border border-white/10 hover:border-white/20" 
        : "bg-black border border-white/5 hover:border-white/10"
    )}
  >
    <img 
      src={partner.logo}
      alt={`${partner.name} logo`}
      className={cn(
        "object-contain [filter:brightness(0)_invert(1)]",
        partner.name === "PostHog" || partner.name === "Semrush"
          ? "w-[80px] h-[32px] sm:w-[100px] sm:h-[40px] md:w-[155px] md:h-[60px]"
          : "w-[50px] h-[20px] sm:w-[65px] sm:h-[25px] md:w-[80px] md:h-[30px]"
      )}
      loading="lazy"
    />
    <span className="sr-only">{partner.name} - {partner.description}</span>
  </div>
));

PartnerCard.displayName = 'PartnerCard';

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

function PartnerBtoB() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section 
      id="partner-btob" 
      className={cn(
        "w-full relative z-10 pt-20 pb-12 md:pt-20 md:pb-16 border-t",
        isDark ? "bg-black border-white/10" : "bg-white border-black/5"
      )}
      style={{ backgroundColor: isDark ? '#000000' : '#ffffff' }}
      aria-label="Nos partenaires B2B"
    >
      {/* Background grain texture */}
      <div 
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: `url(${require('@/lib/assets').backgroundEffectUrl})`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px',
          opacity: isDark ? 0.25 : 0.04
        }}
        aria-hidden="true"
      />

      <div className="max-w-[1250px] mx-auto px-4 sm:px-6">
        <div className="text-center">
          <div className={cn(
            "inline-flex px-4 py-2 border rounded-full mb-6",
            isDark 
              ? "border-white/10 bg-white/5" 
              : "border-black/10 bg-black/5"
          )}>
            <span className={cn("font-medium text-sm", isDark ? "text-white" : "text-black")}>🤝 Stack Partenaires</span>
          </div>
          <h2 className={cn(
            "max-w-5xl mx-auto text-center mb-6",
            "text-3xl sm:text-4xl md:text-5xl lg:text-[50px]",
            "font-bold tracking-[-1px]",
            isDark ? "text-white" : "text-black",
            "leading-[1.1]"
          )}>
            Notre stack technologique :<br/>
            les meilleurs outils pour votre croissance
          </h2>

          <p className={cn(
            "text-center max-w-3xl mx-auto mb-12 md:mb-16 text-base md:text-lg leading-relaxed",
            isDark ? "text-white/70" : "text-black/70"
          )}>
            Notre agence Growth déploie la meilleure stack IA du marché : automatisation, analytics, outbound, CRM, SEO. Chaque outil est choisi pour maximiser votre ROI et scaler votre acquisition.
          </p>
          
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