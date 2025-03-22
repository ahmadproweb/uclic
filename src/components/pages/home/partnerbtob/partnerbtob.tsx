"use client";

import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";

// Définition des partenaires
const partners = [
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

// Composant client pour la gestion du thème
const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  return children({ isDark });
};

// Composant principal - rendu côté serveur par défaut
export default function PartnerBtoB() {
  return (
    <ThemeWrapper>
      {({ isDark }) => (
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
              <h1 className={cn(
                "text-2xl md:text-5xl font-normal mb-3 md:mb-4 tracking-[-1px]",
                isDark ? "text-white" : "text-black"
              )}>
                Des partenariats d&apos;excellence et une expertise
              </h1>
              <p className={cn(
                "text-2xl md:text-5xl font-normal mb-8 md:mb-16 tracking-[-1px]",
                isDark ? "text-white" : "text-black"
              )}>
                au service de votre croissance.
              </p>
              
              <div className="max-w-[1000px] mx-auto">
                <div className="relative">
                  {/* Carrés décoratifs */}
                  {isDark && (
                    <div className="hidden md:absolute md:inset-0 md:z-0 md:pointer-events-none">
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
                  )}

                  <div 
                    className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 md:gap-0 relative"
                    role="list"
                    aria-label="Liste de nos partenaires"
                  >
                    {/* Liste des partenaires */}
                    {partners.map((partner, index) => (
                      <div 
                        key={`partner-${index}`}
                        className={cn(
                          "rounded-2xl md:rounded-[32px] aspect-square p-3 sm:p-4 md:p-6 flex items-center justify-center relative z-10",
                          isDark 
                            ? "bg-black border border-white/10" 
                            : "bg-black"
                        )}
                        role="listitem"
                      >
                        <img 
                          src={partner.logo}
                          alt={`${partner.name} logo`}
                          width="120"
                          height="40"
                          className={cn(
                            "object-contain transition-all duration-300",
                            partner.name === "PostHog" || partner.name === "Semrush"
                              ? "w-[80px] h-[40px] sm:w-[100px] sm:h-[50px] md:w-[140px] md:h-[60px]"
                              : "w-[60px] h-[25px] sm:w-[80px] sm:h-[30px] md:w-[120px] md:h-[40px]",
                            "opacity-100 [filter:brightness(0)_invert(1)]"
                          )}
                          loading="lazy"
                        />
                        <span className="sr-only">{partner.name} - {partner.description}</span>
                      </div>
                    ))}

                    {/* Bouton Plus */}
                    <div 
                      className={cn(
                        "rounded-2xl md:rounded-[32px] aspect-square p-4 md:p-8 flex items-center justify-center relative z-10 cursor-pointer hover:opacity-80 focus:ring-2 focus:ring-offset-2",
                        isDark 
                          ? "bg-black border-2 border-white/20 focus:ring-white" 
                          : "bg-white border-2 border-black focus:ring-black"
                      )}
                      role="button"
                      aria-label="Voir plus de partenaires"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          // Action du bouton
                        }
                      }}
                    >
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
                          stroke={isDark ? "white" : "black"} 
                          strokeWidth="2" 
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </ThemeWrapper>
  );
} 