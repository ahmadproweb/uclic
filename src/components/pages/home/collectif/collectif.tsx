"use client";

import { cn } from "@/lib/utils";
import { memo } from "react";

const CollectifSection = memo(function CollectifSection() {
  return (
    <section 
      className="w-full pt-20 pb-12 md:pt-20 md:pb-16 relative overflow-hidden bg-white dark:bg-black/95 border-b border-black/5 dark:border-white/10"
      aria-labelledby="collectif-title"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 
            id="collectif-title"
            className={cn(
              "max-w-5xl mx-auto text-center mb-16 md:mb-20 pt-8 md:pt-0",
              "text-3xl sm:text-4xl md:text-5xl lg:text-[50px]",
              "font-medium tracking-[-1px]",
              "text-black/90 dark:text-white/90",
              "leading-[1.1]"
            )}
          >
            Plus de revenus, moins de CAC<br />
            Agence Growth & IA + freelances experts
          </h2>
          
          <p className="text-center text-black/70 dark:text-white/70 max-w-3xl mx-auto -mt-10 mb-12 md:mb-16 leading-relaxed">
            Pilotage agence, expertise pointue à la demande. Un interlocuteur unique, des résultats
            mesurables. Nous diagnostiquons vite, lançons ce qui convertit, et industrialisons ce qui marche.
          </p>

          {/* Proof tags */}
          <div className="mt-6 flex flex-wrap gap-2 justify-center">
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-black/10 dark:bg-white/10 text-black/80 dark:text-white/80 border border-black/10 dark:border-white/10">+35% MQL</span>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-black/10 dark:bg-white/10 text-black/80 dark:text-white/80 border border-black/10 dark:border-white/10">-22% CAC</span>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-black/10 dark:bg-white/10 text-black/80 dark:text-white/80 border border-black/10 dark:border-white/10">+12% NRR</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-8">
            <div className="space-y-6 p-8 rounded-2xl border backdrop-blur-md bg-white/80 dark:bg-black/60 border-black/5 dark:border-white/10 relative z-10 overflow-hidden">
              <div className="pointer-events-none absolute inset-0 rounded-2xl -z-10" style={{backgroundImage: "url('https://framerusercontent.com/images/g0QcWrxr87K0ufOxIUFBakwYA8.png')", backgroundRepeat: 'repeat', backgroundSize: '200px', opacity: 0.04}} />
              <h3 className="text-2xl md:text-3xl font-semibold text-black dark:text-white">
                Pourquoi une agence hybride (core team + freelances) ?
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#9FB832] dark:bg-[#E0FF5C] rounded-full flex items-center justify-center">
                    <i className="ri-check-line text-white dark:text-black text-sm"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-black dark:text-white mb-2">
                      Diagnostiquer les leviers en 48 h
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Données, intent, funnels — on met en lumière ce qui crée du revenu et on priorise.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#9FB832] dark:bg-[#E0FF5C] rounded-full flex items-center justify-center">
                    <i className="ri-check-line text-white dark:text-black text-sm"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-black dark:text-white mb-2">
                      Lancer des campagnes qui convertissent
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Outbound 24/7 (triggers, intent, scoring) et inbound (SEO/SEA, pages qui vendent).
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#9FB832] dark:bg-[#E0FF5C] rounded-full flex items-center justify-center">
                    <i className="ri-check-line text-white dark:text-black text-sm"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-black dark:text-white mb-2">
                      Industrialiser ce qui marche
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Ops, agents IA, features utiles — des opérations qui tournent seules et scalent.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="p-8 rounded-2xl border backdrop-blur-md bg-white/80 dark:bg-black/60 border-black/5 dark:border-white/10 relative z-10 overflow-hidden">
              <div className="pointer-events-none absolute inset-0 rounded-2xl -z-10" style={{backgroundImage: "url('https://framerusercontent.com/images/g0QcWrxr87K0ufOxIUFBakwYA8.png')", backgroundRepeat: 'repeat', backgroundSize: '200px', opacity: 0.04}} />
              <h3 className="text-xl md:text-2xl font-semibold text-black dark:text-white mb-6">
                Notre méthode: Diagnostiquer → Lancer → Industrialiser
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <span className="w-8 h-8 bg-[#9FB832] dark:bg-[#E0FF5C] text-white dark:text-black rounded-full flex items-center justify-center text-sm font-semibold">1</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong>Diagnostiquer</strong> — data, intent, funnels. Priorités en 48 h.
                  </span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className="w-8 h-8 bg-[#9FB832] dark:bg-[#E0FF5C] text-white dark:text-black rounded-full flex items-center justify-center text-sm font-semibold">2</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong>Lancer</strong> — outbound 24/7 et inbound qui vend. Copy qui persuade.
                  </span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className="w-8 h-8 bg-[#9FB832] dark:bg-[#E0FF5C] text-white dark:text-black rounded-full flex items-center justify-center text-sm font-semibold">3</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong>Industrialiser</strong> — ops & agents IA, features utiles. Résultats continus.
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-black dark:bg-white text-white dark:text-black p-6 rounded-2xl border border-black/5 dark:border-white/10 relative z-10">
              <h4 className="font-semibold text-lg mb-3">
                Agence + freelances: le meilleur des deux mondes
              </h4>
              <p className="text-sm opacity-90">
                Structure d’agence pour la qualité et la responsabilité, réseau d’experts pour l’agilité.
                Démarrage en jours, pas en mois. Résultats mesurables.
              </p>
              <a href="/contact" className="inline-block mt-4 underline underline-offset-4 decoration-[#9FB832] dark:decoration-[#E0FF5C]">Obtenir un plan en 48 h →</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

CollectifSection.displayName = 'CollectifSection';

export default CollectifSection;
