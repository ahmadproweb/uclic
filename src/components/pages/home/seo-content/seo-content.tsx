"use client";

import { cn } from "@/lib/utils";
import { memo } from "react";

const SEOContentSection = memo(function SEOContentSection() {
  return (
    <section 
      className="w-full py-16 md:py-24 relative overflow-hidden bg-gray-50 dark:bg-black"
      aria-labelledby="seo-content-title"
    >
      <div className="max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 
            id="seo-content-title"
            className={cn(
              "text-3xl sm:text-4xl md:text-5xl lg:text-[50px]",
              "font-medium tracking-[-1px] mb-6",
              "text-black/90 dark:text-white/90",
              "leading-[1.1]"
            )}
          >
            Intelligence Artificielle et Automatisation :<br />
            L'avenir du Growth Marketing
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="space-y-8">
            <div className="bg-white dark:bg-black/50 p-8 rounded-2xl border border-black/5 dark:border-white/10">
              <h3 className="text-2xl font-semibold text-black dark:text-white mb-6">
                Pourquoi l'Intelligence Artificielle révolutionne le marketing ?
              </h3>
              
              <div className="space-y-4 text-black dark:text-white">
                <p>
                  L'<strong>Intelligence Artificielle</strong> transforme radicalement le paysage du Growth Marketing. 
                  Contrairement aux méthodes traditionnelles qui reposent sur l'intuition, l'<strong>automatisation IA </strong> 
                  analyse des millions de points de données pour identifier les leviers de croissance les plus rentables.
                </p>
                
                <p>
                  Notre <strong>collectif de freelances</strong> experts en <strong>Intelligence Artificielle</strong> 
                  utilise des outils d'<strong>automatisation</strong> avancés : <strong>n8n</strong> pour l'orchestration 
                  des workflows, <strong>Cursor</strong> pour le développement de processus internes personnalisés, 
                  et des scripts sur mesure pour automatiser vos campagnes Outbound et Ads. Nous maîtrisons 
                  <strong> OpenAI</strong>, <strong>Gemini</strong>, <strong>Claude</strong> et autres modèles IA.
                </p>
                
                <p>
                  L'<strong>automatisation IA</strong> révolutionne la création de contenu : <strong>VEO3 </strong> 
                  pour les vidéos, <strong>KingIA</strong> et <strong>Elevenlabs</strong> pour les visuels Ads, 
                  images et audio. Nous utilisons aussi le <strong>RAG</strong> (Retrieval-Augmented Generation) 
                  et la vectorisation de bases de données pour optimiser vos données. Cette <strong>automatisation </strong> 
                  complète de votre funnel marketing génère des résultats mesurables et un ROI supérieur aux méthodes manuelles.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-gradient-to-br from-[#9FB832]/10 to-[#E0FF5C]/10 dark:from-[#E0FF5C]/10 dark:to-[#9FB832]/10 p-8 rounded-2xl border border-black/5 dark:border-white/10">
              <h3 className="text-2xl font-semibold text-black dark:text-white mb-6">
                Collectif de freelances vs Agence traditionnelle
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#9FB832] dark:bg-[#E0FF5C] rounded-full flex items-center justify-center">
                    <i className="ri-check-line text-white dark:text-black text-sm"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-black dark:text-white mb-2">
                      Expertise spécialisée en Intelligence Artificielle
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Chaque freelance de notre collectif est expert dans son domaine : 
                      <strong> automatisation IA</strong> avec n8n, développement avec Cursor, 
                      analyse de données, Growth Marketing. Pas de généralistes comme dans les agences traditionnelles.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#9FB832] dark:bg-[#E0FF5C] rounded-full flex items-center justify-center">
                    <i className="ri-check-line text-white dark:text-black text-sm"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-black dark:text-white mb-2">
                      Flexibilité et réactivité de l'automatisation
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Notre <strong>collectif de freelances</strong> s'adapte à vos besoins, 
                      monte des équipes sur mesure et déploie l'<strong>automatisation IA </strong> 
                      rapidement avec n8n, Cursor et scripts personnalisés. Pas de lourdeur d'agence.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#9FB832] dark:bg-[#E0FF5C] rounded-full flex items-center justify-center">
                    <i className="ri-check-line text-white dark:text-black text-sm"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-black dark:text-white mb-2">
                      Automatisation IA au cœur de notre approche
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      L'<strong>Intelligence Artificielle</strong> n'est pas un gadget pour nous, 
                      c'est notre ADN. Nous <strong>automatisons</strong> tout : analyse avec OpenAI/Gemini/Claude, 
                      création de visuels avec VEO3/KingIA/Elevenlabs, RAG et vectorisation de DB, 
                      campagnes Outbound/Ads avec scripts personnalisés.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-white text-black dark:text-black p-8 md:p-12 rounded-2xl border border-black/5 dark:border-white/10">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-black dark:text-black">
              L'automatisation IA : votre avantage concurrentiel
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#9FB832] dark:text-[#E0FF5C] mb-2">
                  50 000+
                </div>
                <div className="text-sm opacity-90 text-black dark:text-black">
                  Points de données analysés par l'<strong>Intelligence Artificielle</strong>
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#9FB832] dark:text-[#E0FF5C] mb-2">
                  24/7
                </div>
                <div className="text-sm opacity-90 text-black dark:text-black">
                  <strong>Automatisation</strong> continue de vos campagnes
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#9FB832] dark:text-[#E0FF5C] mb-2">
                  3x
                </div>
                <div className="text-sm opacity-90 text-black dark:text-black">
                  Amélioration des performances grâce à l'<strong>IA</strong>
                </div>
              </div>
            </div>
            
            <p className="text-lg opacity-90 leading-relaxed text-black dark:text-black">
              Pendant que les agences traditionnelles utilisent des méthodes dépassées, 
              notre <strong>collectif de freelances</strong> experts en <strong>Intelligence Artificielle</strong> 
              <strong> automatise</strong> votre croissance avec n8n, Cursor, VEO3, KingIA, Elevenlabs, 
              RAG, vectorisation de DB, OpenAI, Gemini, Claude et des scripts personnalisés. Plus rapide, plus efficace, plus rentable.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
});

SEOContentSection.displayName = 'SEOContentSection';

export default SEOContentSection;