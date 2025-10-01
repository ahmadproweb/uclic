"use client";

import { cn } from "@/lib/utils";
import { memo } from "react";
import { useTheme } from "@/context/ThemeContext";
import { CTAButton } from "@/components/ui/cta-button";

const SEOContentSection = memo(function SEOContentSection() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section 
      className={cn(
        "w-full pt-20 pb-12 md:pt-20 md:pb-16 relative overflow-hidden z-10",
        isDark ? "bg-black" : "bg-white"
      )}
      aria-labelledby="seo-content-title"
      style={{
        backgroundColor: isDark ? '#000000' : '#ffffff'
      }}
    >
      <div className="max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <div className={cn(
            "inline-flex px-4 py-2 border rounded-full mb-6",
            isDark 
              ? "border-white/10 bg-white/5" 
              : "border-black/10 bg-black/5"
          )}>
            <span className={cn("font-medium text-sm", isDark ? "text-white" : "text-black")}>✨ Intelligence Artificielle</span>
          </div>
          <h2 
            id="seo-content-title"
            className={cn(
              "max-w-5xl mx-auto text-center mb-6",
              "text-3xl sm:text-4xl md:text-5xl lg:text-[50px]",
              "font-medium tracking-[-1px]",
              "text-black/90 dark:text-white/90",
              "leading-[1.1]"
            )}
          >
            L'IA au service de votre croissance :<br />
            Automatisez, Optimisez, Dominez
          </h2>
          <p className="text-center text-black/70 dark:text-white/70 max-w-3xl mx-auto mb-12 md:mb-16 text-base md:text-lg leading-relaxed">
            Pendant que vos concurrents perdent du temps sur des tâches manuelles, notre agence automatise votre machine de croissance avec l'IA. Résultat : +300% de trafic qualifié, -60% de CAC, et un MRR qui explose.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-12 md:mb-16">
          <div className="space-y-8">
            <div className="bg-white dark:bg-black p-8 md:p-10 rounded-3xl border border-black/5 dark:border-white/10 hover:border-black/10 dark:hover:border-white/20 transition-all duration-300">
              <div className={cn(
                "inline-flex px-3 py-1.5 rounded-full mb-4 border",
                isDark 
                  ? "bg-[#E0FF5C]/10 border-[#E0FF5C]/20" 
                  : "bg-[#9FB832]/10 border-[#9FB832]/20"
              )}>
                <span className={cn("text-xs font-semibold", isDark ? "text-[#E0FF5C]" : "text-[#9FB832]")}>💡 Transformation IA</span>
              </div>
              <h3 className="text-2xl font-semibold text-black dark:text-white mb-6 leading-tight">
                Pourquoi l'IA transforme votre marketing en machine à revenus
              </h3>
              
              <div className="space-y-5 text-black/80 dark:text-white/80 text-[15px] leading-relaxed">
                <p>
                  <strong>Fini l'intuition, place à la data.</strong> L'<strong>Intelligence Artificielle</strong> analyse 
                  des millions de signaux en temps réel pour identifier exactement ce qui convertit. Résultat ? Vos budgets 
                  marketing deviennent enfin rentables, votre CAC dégringole et vos équipes se concentrent sur ce qui compte vraiment : 
                  la stratégie et la croissance.
                </p>
                
                <p>
                  Notre <strong>agence</strong> sélectionne et pilote les <strong>meilleurs freelances experts IA</strong> pour déployer 
                  une stack complète : <strong>n8n</strong> pour orchestrer vos workflows de A à Z, <strong>Cursor</strong> pour développer 
                  des outils sur mesure, et des scripts d'automatisation qui pilotent vos campagnes Outbound et Ads 24/7. Nous maîtrisons 
                  <strong>OpenAI</strong>, <strong>Gemini</strong>, <strong>Claude</strong> et tous les modèles IA pour créer votre avantage concurrentiel.
                </p>
                
                <p>
                  <strong>Créez 10x plus vite, pour 10x moins cher.</strong> <strong>VEO3</strong> génère vos vidéos Ads en 
                  quelques minutes, <strong>KingIA</strong> et <strong>Elevenlabs</strong> produisent visuels et audio de niveau 
                  professionnel, le <strong>RAG</strong> vectorise vos bases de données pour des campagnes hyper-personnalisées. 
                  Pendant que vos concurrents recrutent des armées de créatifs, vous dominez avec l'IA.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-gradient-to-br from-[#E0FF5C]/20 to-[#9FB832]/15 dark:from-[#E0FF5C]/15 dark:to-[#9FB832]/10 p-8 md:p-10 rounded-3xl border border-black/5 dark:border-white/10 hover:border-[#9FB832]/20 dark:hover:border-[#E0FF5C]/20 transition-all duration-300 relative overflow-hidden">
              <div className={cn("absolute inset-0 -z-10", isDark ? "bg-black" : "bg-white")} />
              <div className={cn(
                "inline-flex px-3 py-1.5 rounded-full mb-4 border",
                isDark 
                  ? "bg-[#E0FF5C]/10 border-[#E0FF5C]/20" 
                  : "bg-[#9FB832]/10 border-[#9FB832]/20"
              )}>
                <span className={cn("text-xs font-semibold", isDark ? "text-[#E0FF5C]" : "text-[#9FB832]")}>🚀 Avantage Uclic</span>
              </div>
              <h3 className="text-2xl font-semibold text-black dark:text-white mb-6 leading-tight">
                Pourquoi les scale-ups choisissent notre agence
              </h3>
              
              <div className="space-y-5">
                <div className="flex items-start space-x-4 group">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#9FB832] dark:bg-[#E0FF5C] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <i className="ri-check-line text-white dark:text-black text-lg"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-black dark:text-white mb-2 text-base">
                      Des experts pointus, pas des juniors polyvalents
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-[15px] leading-relaxed">
                      Notre <strong>agence</strong> sélectionne uniquement des <strong>freelances experts IA</strong> dans leur domaine : 
                      automatisation avec n8n, développement avec Cursor, data science, growth hacking. 
                      <strong>Vous payez pour de l'expertise pointue, pas pour former des juniors d'agence.</strong>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 group">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#9FB832] dark:bg-[#E0FF5C] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <i className="ri-check-line text-white dark:text-black text-lg"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-black dark:text-white mb-2 text-base">
                      On déploie en jours, pas en mois
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-[15px] leading-relaxed">
                      <strong>Zéro bureaucratie.</strong> Notre agence mobilise une dream team de freelances experts 
                      en 48h et déploie l'automatisation IA en une semaine avec n8n, Cursor et scripts custom. 
                      Les agences traditionnelles mettent 3 mois pour faire la même chose.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 group">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#9FB832] dark:bg-[#E0FF5C] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <i className="ri-check-line text-white dark:text-black text-lg"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-black dark:text-white mb-2 text-base">
                      L'IA n'est pas un bonus, c'est notre ADN
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-[15px] leading-relaxed">
                      Pendant que les agences "testent" l'IA, nous <strong>automatisons tout depuis 2 ans</strong> : 
                      analyse prédictive (OpenAI/Gemini/Claude), création de contenu (VEO3/KingIA/Elevenlabs), 
                      personnalisation massive (RAG + vectorisation), et orchestration complète de vos campagnes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full width stats section */}
      <div className="w-full mt-12 md:mt-16">
        <div className={cn(
          "backdrop-blur-xl py-12 md:py-16 lg:py-20 px-4 relative overflow-hidden border-t border-b",
          isDark 
            ? "bg-black/60 border-white/10" 
            : "bg-white/60 border-black/5"
        )}>
          {/* Halo effect */}
          <div 
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-[45vh] z-0"
            style={{
              background: isDark
                ? `radial-gradient(ellipse at center 10%, rgba(212,237,49,0.20) 0%, rgba(212,237,49,0.12) 15%, rgba(212,237,49,0.06) 35%, rgba(0,0,0,0.1) 55%, rgba(0,0,0,0) 75%)`
                : `radial-gradient(ellipse at center 10%, rgba(212,237,49,0.25) 0%, rgba(212,237,49,0.15) 18%, rgba(212,237,49,0.08) 38%, rgba(255,255,255,0.1) 58%, rgba(255,255,255,0) 78%)`,
              filter: 'blur(20px)'
            }}
          />
          
          {/* Texture grain subtile */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-[0.03] z-0"
            style={{
              backgroundImage: "url('https://framerusercontent.com/images/g0QcWrxr87K0ufOxIUFBakwYA8.png')",
              backgroundRepeat: "repeat",
              backgroundSize: "200px"
            }}
          />
          
          <div className="max-w-6xl mx-auto text-center relative z-10">
            <div className={cn(
              "inline-flex px-4 py-2 border rounded-full mb-6",
              isDark 
                ? "border-white/10 bg-white/5" 
                : "border-black/10 bg-black/5"
            )}>
              <span className={cn("font-medium text-sm", isDark ? "text-white" : "text-black")}>📊 Résultats clients réels</span>
            </div>
            <h3 className={cn(
              "text-2xl md:text-3xl lg:text-4xl font-bold mb-12 md:mb-16",
              isDark ? "text-white" : "text-black"
            )}>
              Scalez pendant que vos concurrents recrutent
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-10 md:mb-12">
              <div className={cn(
                "text-center p-6 md:p-8 rounded-3xl backdrop-blur-md border transition-all duration-300 hover:scale-[1.02]",
                isDark 
                  ? "bg-black/40 border-white/10 hover:border-[#E0FF5C]/40" 
                  : "bg-white/40 border-black/5 hover:border-[#9FB832]/40"
              )}>
                <div className="text-5xl mb-4">📈</div>
                <div className={cn("text-5xl md:text-6xl lg:text-7xl font-bold mb-4", isDark ? "text-[#E0FF5C]" : "text-[#9FB832]")}>
                  +300%
                </div>
                <div className={cn("text-sm md:text-base font-medium leading-snug", isDark ? "text-white/90" : "text-black/90")}>
                  de trafic qualifié<br/>en 6 mois
                </div>
              </div>
              
              <div className={cn(
                "text-center p-6 md:p-8 rounded-3xl backdrop-blur-md border transition-all duration-300 hover:scale-[1.02]",
                isDark 
                  ? "bg-black/40 border-white/10 hover:border-[#E0FF5C]/40" 
                  : "bg-white/40 border-black/5 hover:border-[#9FB832]/40"
              )}>
                <div className="text-5xl mb-4">💰</div>
                <div className={cn("text-5xl md:text-6xl lg:text-7xl font-bold mb-4", isDark ? "text-[#E0FF5C]" : "text-[#9FB832]")}>
                  -60%
                </div>
                <div className={cn("text-sm md:text-base font-medium leading-snug", isDark ? "text-white/90" : "text-black/90")}>
                  de CAC grâce<br/>à l'IA
                </div>
              </div>
              
              <div className={cn(
                "text-center p-6 md:p-8 rounded-3xl backdrop-blur-md border transition-all duration-300 hover:scale-[1.02]",
                isDark 
                  ? "bg-black/40 border-white/10 hover:border-[#E0FF5C]/40" 
                  : "bg-white/40 border-black/5 hover:border-[#9FB832]/40"
              )}>
                <div className="text-5xl mb-4">⚡</div>
                <div className={cn("text-5xl md:text-6xl lg:text-7xl font-bold mb-4", isDark ? "text-[#E0FF5C]" : "text-[#9FB832]")}>
                  24/7
                </div>
                <div className={cn("text-sm md:text-base font-medium leading-snug", isDark ? "text-white/90" : "text-black/90")}>
                  Automatisation<br/>non-stop
                </div>
              </div>
            </div>
            
            <p className={cn(
              "text-base md:text-lg leading-relaxed max-w-4xl mx-auto mb-8",
              isDark ? "text-white/90" : "text-black/90"
            )}>
              <strong>Arrêtez de payer 15k€/mois pour des résultats moyens.</strong> Notre agence déploie une stack IA complète 
              qui automatise votre croissance de bout en bout. <strong>Résultat : vous scalez à 2x le taux de croissance, pour 3x moins cher.</strong>
            </p>
            
            <CTAButton 
              href="/audit"
              className={cn(
                "group",
                isDark 
                  ? "!bg-[#E0FF5C] !text-black hover:!bg-[#E0FF5C]/90 [&_span]:!border-black [&_svg]:!stroke-black"
                  : "!bg-black !text-white hover:!bg-[#E0FF5C] hover:!text-black [&_span]:!border-white hover:[&_span]:!border-black [&_svg]:!stroke-white hover:[&_svg]:!stroke-black"
              )}
            >
              Démarrer mon audit IA gratuit
            </CTAButton>
          </div>
        </div>
      </div>
    </section>
  );
});

SEOContentSection.displayName = 'SEOContentSection';

export default SEOContentSection;