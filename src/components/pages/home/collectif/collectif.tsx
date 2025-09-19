"use client";

import { cn } from "@/lib/utils";
import { memo } from "react";

const CollectifSection = memo(function CollectifSection() {
  return (
    <section 
      className="w-full py-16 md:py-24 relative overflow-hidden bg-white dark:bg-black/95"
      aria-labelledby="collectif-title"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 
            id="collectif-title"
            className={cn(
              "text-3xl sm:text-4xl md:text-5xl lg:text-[50px]",
              "font-medium tracking-[-1px] mb-6",
              "text-black/90 dark:text-white/90",
              "leading-[1.1]"
            )}
          >
            Pourquoi choisir notre collectif<br />
            plutôt qu'une agence traditionnelle ?
          </h2>
          
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Nous ne sommes pas une agence traditionnelle, mais un collectif de freelances experts 
            en Growth Marketing et Intelligence Artificielle. Notre approche unique combine 
            l'expertise humaine de nos freelances avec la puissance de l'automatisation IA.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-6 p-8 rounded-2xl border border-black/5 dark:border-white/10">
              <h3 className="text-2xl md:text-3xl font-semibold text-black dark:text-white">
                Pourquoi choisir un collectif plutôt qu'une agence ?
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#9FB832] dark:bg-[#E0FF5C] rounded-full flex items-center justify-center">
                    <i className="ri-check-line text-white dark:text-black text-sm"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-black dark:text-white mb-2">
                      Expertise spécialisée en Intelligence Artificielle
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Chaque freelance de notre collectif est expert dans son domaine : 
                      automatisation IA, analyse de données, Growth Marketing. Pas de généralistes.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#9FB832] dark:bg-[#E0FF5C] rounded-full flex items-center justify-center">
                    <i className="ri-check-line text-white dark:text-black text-sm"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-black dark:text-white mb-2">
                      Flexibilité et réactivité d'un collectif
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Pas de lourdeur d'agence. Nous nous adaptons à vos besoins, 
                      montons des équipes sur mesure et déployons l'automatisation IA rapidement.
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
                    <p className="text-gray-600 dark:text-gray-300">
                      L'Intelligence Artificielle n'est pas un gadget pour nous, c'est notre ADN. 
                      Nous automatisons tout : analyse, création, optimisation, scaling.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-gradient-to-br from-[#9FB832]/10 to-[#E0FF5C]/10 dark:from-[#E0FF5C]/10 dark:to-[#9FB832]/10 p-8 rounded-2xl border border-black/5 dark:border-white/10">
              <h3 className="text-xl md:text-2xl font-semibold text-black dark:text-white mb-6">
                Notre méthodologie : Collectif + Intelligence Artificielle
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <span className="w-8 h-8 bg-[#9FB832] dark:bg-[#E0FF5C] text-white dark:text-black rounded-full flex items-center justify-center text-sm font-semibold">1</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong>Analyse IA</strong> : Notre Intelligence Artificielle analyse vos données
                  </span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className="w-8 h-8 bg-[#9FB832] dark:bg-[#E0FF5C] text-white dark:text-black rounded-full flex items-center justify-center text-sm font-semibold">2</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong>Freelances experts</strong> : Sélection du meilleur profil pour votre projet
                  </span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className="w-8 h-8 bg-[#9FB832] dark:bg-[#E0FF5C] text-white dark:text-black rounded-full flex items-center justify-center text-sm font-semibold">3</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong>Automatisation</strong> : Déploiement et optimisation continue avec l'IA
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-black dark:bg-white text-white dark:text-black p-6 rounded-2xl border border-black/5 dark:border-white/10">
              <h4 className="font-semibold text-lg mb-3">
                L'avantage concurrentiel du collectif
              </h4>
              <p className="text-sm opacity-90">
                Pendant que les agences traditionnelles utilisent des méthodes dépassées, 
                notre collectif de freelances experts en Intelligence Artificielle automatise 
                votre croissance. Plus rapide, plus efficace, plus rentable.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

CollectifSection.displayName = 'CollectifSection';

export default CollectifSection;
