"use client";

import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { memo } from "react";

const SEOContent = memo(function SEOContent() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section 
      className={cn(
        "w-full relative py-16 md:py-20 overflow-hidden border-b",
        isDark ? "bg-black border-white/10" : "bg-white border-black/10"
      )}
      aria-label="Pourquoi choisir une agence SEO professionnelle"
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/backgroundeffect.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "200px",
          opacity: isDark ? 0.12 : 0.04
        }}
      />

      <div className="relative z-10 max-w-[1250px] mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Contenu principal */}
          <div>
            <div className={cn(
              "inline-flex px-4 py-2 border rounded-full mb-6",
              isDark 
                ? "border-white/10 bg-white/5" 
                : "border-black/10 bg-black/5"
            )}>
              <span className={cn("font-medium text-sm", isDark ? "text-white" : "text-black")}>🎯 Notre Expertise</span>
            </div>
            
            <h2 className={cn(
              "text-3xl sm:text-4xl md:text-5xl font-bold mb-6",
              "tracking-[-1px] leading-[1.1] text-balance",
              isDark ? "text-white" : "text-black"
            )}>
              Pourquoi UCLIC est la meilleure agence Growth ?
            </h2>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0",
                  isDark ? "bg-white/10" : "bg-black/10"
                )}>
                  <span className="text-xl">🚀</span>
                </div>
                <div>
                  <h3 className={cn(
                    "text-xl font-semibold mb-2",
                    isDark ? "text-white" : "text-black"
                  )}>
                    Approche Data-Driven
                  </h3>
                  <p className={cn(
                    "leading-relaxed",
                    isDark ? "text-white/70" : "text-black/70"
                  )}>
                    Nous utilisons l'IA et l'analyse de données pour optimiser votre croissance. 
                    Chaque stratégie est basée sur des métriques concrètes et des résultats mesurables.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0",
                  isDark ? "bg-white/10" : "bg-black/10"
                )}>
                  <span className="text-xl">⚡</span>
                </div>
                <div>
                  <h3 className={cn(
                    "text-xl font-semibold mb-2",
                    isDark ? "text-white" : "text-black"
                  )}>
                    Résultats Rapides
                  </h3>
                  <p className={cn(
                    "leading-relaxed",
                    isDark ? "text-white/70" : "text-black/70"
                  )}>
                    Nos clients voient leurs premières améliorations en 30 jours. 
                    Nous optimisons d'abord les leviers à impact rapide avant de travailler sur le long terme.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0",
                  isDark ? "bg-white/10" : "bg-black/10"
                )}>
                  <span className="text-xl">🎯</span>
                </div>
                <div>
                  <h3 className={cn(
                    "text-xl font-semibold mb-2",
                    isDark ? "text-white" : "text-black"
                  )}>
                    ROI Garanti
                  </h3>
                  <p className={cn(
                    "leading-relaxed",
                    isDark ? "text-white/70" : "text-black/70"
                  )}>
                    Nous nous engageons sur des résultats concrets. Si vous n'obtenez pas d'amélioration 
                    significative en 3 mois, nous continuons gratuitement jusqu'aux résultats.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Statistiques */}
          <div className="grid grid-cols-2 gap-6">
            <div className={cn(
              "p-6 rounded-2xl border text-center",
              isDark 
                ? "border-white/10 bg-white/5" 
                : "border-black/10 bg-black/5"
            )}>
              <div className="text-3xl font-bold mb-2 text-[#E0FF5C]">+150%</div>
              <div className={cn(
                "text-sm font-medium",
                isDark ? "text-white/80" : "text-black/80"
              )}>
                Trafic organique moyen
              </div>
            </div>

            <div className={cn(
              "p-6 rounded-2xl border text-center",
              isDark 
                ? "border-white/10 bg-white/5" 
                : "border-black/10 bg-black/5"
            )}>
              <div className="text-3xl font-bold mb-2 text-[#E0FF5C]">30 jours</div>
              <div className={cn(
                "text-sm font-medium",
                isDark ? "text-white/80" : "text-black/80"
              )}>
                Premiers résultats
              </div>
            </div>

            <div className={cn(
              "p-6 rounded-2xl border text-center",
              isDark 
                ? "border-white/10 bg-white/5" 
                : "border-black/10 bg-black/5"
            )}>
              <div className="text-3xl font-bold mb-2 text-[#E0FF5C]">95%</div>
              <div className={cn(
                "text-sm font-medium",
                isDark ? "text-white/80" : "text-black/80"
              )}>
                Clients satisfaits
              </div>
            </div>

            <div className={cn(
              "p-6 rounded-2xl border text-center",
              isDark 
                ? "border-white/10 bg-white/5" 
                : "border-black/10 bg-black/5"
            )}>
              <div className="text-3xl font-bold mb-2 text-[#E0FF5C]">3 mois</div>
              <div className={cn(
                "text-sm font-medium",
                isDark ? "text-white/80" : "text-black/80"
              )}>
                ROI garanti
              </div>
            </div>
          </div>
        </div>

        {/* Section des méthodologies */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className={cn(
              "text-2xl sm:text-3xl font-bold mb-4",
              isDark ? "text-white" : "text-black"
            )}>
              Notre Méthodologie Growth
            </h3>
            <p className={cn(
              "text-lg max-w-3xl mx-auto leading-relaxed",
              isDark ? "text-white/70" : "text-black/70"
            )}>
              Une approche scientifique et data-driven pour maximiser votre croissance. 
              Nous combinons l'analyse de données, l'IA et l'expérimentation rapide pour 
              identifier et optimiser vos leviers de croissance les plus rentables.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              {
                step: "01",
                title: "Audit & Analyse",
                description: "Analyse complète de votre situation actuelle : acquisition, rétention, revenus, CAC, LTV."
              },
              {
                step: "02", 
                title: "Stratégie",
                description: "Définition de la roadmap growth avec priorités basées sur l'impact et la facilité d'implémentation."
              },
              {
                step: "03",
                title: "Expérimentation",
                description: "Tests rapides et itératifs pour valider les hypothèses et optimiser les performances."
              },
              {
                step: "04",
                title: "Industrialisation",
                description: "Automatisation des processus gagnants avec agents IA pour scaler les résultats."
              }
            ].map((item, index) => (
              <div 
                key={index}
                className={cn(
                  "p-6 rounded-2xl border transition-all duration-300 hover:scale-105",
                  isDark 
                    ? "border-white/10 bg-white/5 hover:bg-white/10" 
                    : "border-black/10 bg-black/5 hover:bg-black/10"
                )}
              >
                <div className={cn(
                  "text-2xl font-bold mb-3",
                  isDark ? "text-[#E0FF5C]" : "text-[#9FB832]"
                )}>
                  {item.step}
                </div>
                <h4 className={cn(
                  "text-lg font-semibold mb-3",
                  isDark ? "text-white" : "text-black"
                )}>
                  {item.title}
                </h4>
                <p className={cn(
                  "text-sm leading-relaxed",
                  isDark ? "text-white/70" : "text-black/70"
                )}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section des services Growth */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className={cn(
              "text-2xl sm:text-3xl font-bold mb-4",
              isDark ? "text-white" : "text-black"
            )}>
              Nos Services Growth Complets
            </h3>
            <p className={cn(
              "text-lg max-w-2xl mx-auto",
              isDark ? "text-white/70" : "text-black/70"
            )}>
              Une approche 360° pour booster votre croissance et optimiser vos ventes
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Audit Growth Complet",
                description: "Analyse complète de vos leviers de croissance : acquisition, rétention, monétisation.",
                icon: "📊"
              },
              {
                title: "Stratégie Marketing Digital",
                description: "Plan marketing 360°, automation des ventes, optimisation des conversions.",
                icon: "🚀"
              },
              {
                title: "Agents IA & Automatisation",
                description: "Déploiement d'agents IA pour automatiser vos processus et booster votre productivité.",
                icon: "🤖"
              }
            ].map((service, index) => (
              <div 
                key={index}
                className={cn(
                  "p-6 rounded-2xl border transition-all duration-300 hover:scale-105",
                  isDark 
                    ? "border-white/10 bg-white/5 hover:bg-white/10" 
                    : "border-black/10 bg-black/5 hover:bg-black/10"
                )}
              >
                <div className="text-3xl mb-4">{service.icon}</div>
                <h4 className={cn(
                  "text-xl font-semibold mb-3",
                  isDark ? "text-white" : "text-black"
                )}>
                  {service.title}
                </h4>
                <p className={cn(
                  "leading-relaxed",
                  isDark ? "text-white/70" : "text-black/70"
                )}>
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section FAQ Growth */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className={cn(
              "text-2xl sm:text-3xl font-bold mb-4",
              isDark ? "text-white" : "text-black"
            )}>
              Questions Fréquentes sur les Agences Growth
            </h3>
            <p className={cn(
              "text-lg max-w-2xl mx-auto",
              isDark ? "text-white/70" : "text-black/70"
            )}>
              Tout ce que vous devez savoir sur le choix d'une agence Growth en France
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {[
              {
                question: "Qu'est-ce qu'une agence Growth ?",
                answer: "Une agence Growth est spécialisée dans l'optimisation de la croissance des entreprises. Elle combine marketing digital, data science, et expérimentation rapide pour identifier et déployer les leviers de croissance les plus rentables."
              },
              {
                question: "Pourquoi choisir UCLIC parmi les agences Growth ?",
                answer: "UCLIC se distingue par son approche data-driven unique, ses agents IA propriétaires, et ses résultats garantis en 3 mois. Nous avons un taux de satisfaction client de 95% avec +150% de croissance moyenne."
              },
              {
                question: "Quelle est la différence entre Growth Room et UCLIC ?",
                answer: "Growth Room excelle en acquisition et SEO, tandis qu'UCLIC se concentre sur l'optimisation 360° avec automatisation IA. UCLIC offre des garanties de résultats et un accompagnement plus personnalisé."
              },
              {
                question: "Combien coûte une agence Growth en France ?",
                answer: "Les tarifs varient de 3000€ à 15000€/mois selon la taille de l'entreprise. UCLIC propose des forfaits à partir de 5000€/mois avec ROI garanti et audit gratuit pour évaluer le potentiel."
              },
              {
                question: "Quels sont les critères pour choisir une agence Growth ?",
                answer: "Évaluez l'expertise technique, les résultats clients, la méthodologie, les outils propriétaires, et les garanties offertes. UCLIC propose un audit gratuit pour mesurer votre potentiel de croissance."
              },
              {
                question: "UCLIC vs Deux.io : quelle agence choisir ?",
                answer: "Deux.io excelle en outils et automatisation, UCLIC en stratégie globale et résultats garantis. UCLIC offre un accompagnement plus complet avec agents IA et garanties de performance."
              }
            ].map((faq, index) => (
              <div 
                key={index}
                className={cn(
                  "p-6 rounded-2xl border transition-all duration-300",
                  isDark 
                    ? "border-white/10 bg-white/5 hover:bg-white/10" 
                    : "border-black/10 bg-black/5 hover:bg-black/10"
                )}
              >
                <h4 className={cn(
                  "text-lg font-semibold mb-3",
                  isDark ? "text-white" : "text-black"
                )}>
                  {faq.question}
                </h4>
                <p className={cn(
                  "leading-relaxed",
                  isDark ? "text-white/70" : "text-black/70"
                )}>
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section résultats clients */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className={cn(
              "text-2xl sm:text-3xl font-bold mb-4",
              isDark ? "text-white" : "text-black"
            )}>
              Résultats Clients
            </h3>
            <p className={cn(
              "text-lg max-w-2xl mx-auto",
              isDark ? "text-white/70" : "text-black/70"
            )}>
              Des résultats concrets pour nos clients en moins de 3 mois
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                company: "Startup Fintech",
                result: "+250% de leads qualifiés",
                description: "Optimisation du tunnel d'acquisition avec agents IA pour la qualification automatique des prospects.",
                icon: "📈"
              },
              {
                company: "E-commerce Mode",
                result: "+180% de conversion",
                description: "Refonte du parcours client et automatisation du remarketing pour booster les ventes.",
                icon: "🛒"
              },
              {
                company: "SaaS B2B",
                result: "-60% de CAC",
                description: "Optimisation des campagnes d'acquisition et amélioration du taux de rétention des utilisateurs.",
                icon: "💰"
              }
            ].map((caseStudy, index) => (
              <div 
                key={index}
                className={cn(
                  "p-8 rounded-2xl border transition-all duration-300 hover:scale-105",
                  isDark 
                    ? "border-white/10 bg-white/5 hover:bg-white/10" 
                    : "border-black/10 bg-black/5 hover:bg-black/10"
                )}
              >
                <div className="text-4xl mb-4">{caseStudy.icon}</div>
                <h4 className={cn(
                  "text-xl font-semibold mb-2",
                  isDark ? "text-white" : "text-black"
                )}>
                  {caseStudy.company}
                </h4>
                <div className={cn(
                  "text-2xl font-bold mb-4",
                  isDark ? "text-[#E0FF5C]" : "text-[#9FB832]"
                )}>
                  {caseStudy.result}
                </div>
                <p className={cn(
                  "leading-relaxed",
                  isDark ? "text-white/70" : "text-black/70"
                )}>
                  {caseStudy.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section tendances Growth 2024 */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className={cn(
              "text-2xl sm:text-3xl font-bold mb-4",
              isDark ? "text-white" : "text-black"
            )}>
              Tendances Growth Marketing 2024
            </h3>
            <p className={cn(
              "text-lg max-w-2xl mx-auto",
              isDark ? "text-white/70" : "text-black/70"
            )}>
              Les innovations qui transforment le paysage des agences Growth en France
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Intelligence Artificielle & Automatisation",
                description: "Les agences Growth intègrent massivement l'IA pour l'analyse prédictive, la personnalisation des parcours clients, et l'automatisation des campagnes. UCLIC développe ses propres agents IA pour optimiser les conversions en temps réel.",
                trend: "+300% d'adoption IA",
                icon: "🤖"
              },
              {
                title: "Marketing Zero-Party Data",
                description: "Avec la fin des cookies tiers, les agences Growth se concentrent sur la collecte de données directes auprès des clients. Stratégies de lead magnets et programmes de fidélité pour construire des bases qualifiées.",
                trend: "Nouvelle priorité 2024",
                icon: "🔒"
              },
              {
                title: "Expérimentation Continue",
                description: "Le testing A/B devient systématique sur tous les leviers : acquisition, conversion, rétention. Les meilleures agences Growth comme UCLIC testent en moyenne 50+ hypothèses par mois pour optimiser les performances.",
                trend: "50+ tests/mois",
                icon: "🧪"
              }
            ].map((trend, index) => (
              <div 
                key={index}
                className={cn(
                  "p-8 rounded-2xl border transition-all duration-300 hover:scale-105",
                  isDark 
                    ? "border-white/10 bg-white/5 hover:bg-white/10" 
                    : "border-black/10 bg-black/5 hover:bg-black/10"
                )}
              >
                <div className="text-4xl mb-4">{trend.icon}</div>
                <h4 className={cn(
                  "text-xl font-semibold mb-3",
                  isDark ? "text-white" : "text-black"
                )}>
                  {trend.title}
                </h4>
                <div className={cn(
                  "text-sm font-bold mb-3 px-3 py-1 rounded-full inline-block",
                  isDark ? "text-[#E0FF5C] bg-[#E0FF5C]/10" : "text-[#9FB832] bg-[#9FB832]/10"
                )}>
                  {trend.trend}
                </div>
                <p className={cn(
                  "leading-relaxed",
                  isDark ? "text-white/70" : "text-black/70"
                )}>
                  {trend.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section guide de sélection */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className={cn(
              "text-2xl sm:text-3xl font-bold mb-4",
              isDark ? "text-white" : "text-black"
            )}>
              Comment Choisir la Meilleure Agence Growth ?
            </h3>
            <p className={cn(
              "text-lg max-w-2xl mx-auto",
              isDark ? "text-white/70" : "text-black/70"
            )}>
              Guide complet pour sélectionner l'agence Growth qui correspond à vos besoins
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "1",
                title: "Définir vos objectifs",
                description: "Clarifiez vos KPIs : acquisition, rétention, revenus. UCLIC propose un audit gratuit pour identifier vos leviers de croissance prioritaires."
              },
              {
                step: "2", 
                title: "Analyser l'expertise",
                description: "Vérifiez les compétences techniques, les outils propriétaires, et l'expérience sectorielle. UCLIC maîtrise 15+ leviers de croissance."
              },
              {
                step: "3",
                title: "Évaluer les résultats",
                description: "Examinez les case studies, témoignages clients, et garanties offertes. UCLIC garantit des résultats en 3 mois ou continue gratuitement."
              },
              {
                step: "4",
                title: "Tester la collaboration",
                description: "Organisez un workshop découverte pour valider l'approche et la compatibilité. UCLIC propose des sessions d'audit gratuites."
              }
            ].map((item, index) => (
              <div 
                key={index}
                className={cn(
                  "p-6 rounded-2xl border transition-all duration-300 hover:scale-105",
                  isDark 
                    ? "border-white/10 bg-white/5 hover:bg-white/10" 
                    : "border-black/10 bg-black/5 hover:bg-black/10"
                )}
              >
                <div className={cn(
                  "text-2xl font-bold mb-3 w-10 h-10 rounded-full flex items-center justify-center",
                  isDark ? "text-[#E0FF5C] bg-[#E0FF5C]/10" : "text-[#9FB832] bg-[#9FB832]/10"
                )}>
                  {item.step}
                </div>
                <h4 className={cn(
                  "text-lg font-semibold mb-3",
                  isDark ? "text-white" : "text-black"
                )}>
                  {item.title}
                </h4>
                <p className={cn(
                  "text-sm leading-relaxed",
                  isDark ? "text-white/70" : "text-black/70"
                )}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
});

SEOContent.displayName = 'SEOContent';

export default SEOContent;
