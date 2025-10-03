"use client";

import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { memo } from "react";

// Données des meilleures agences Growth françaises
const growthAgencies = [
  {
    rank: 1,
    name: "UCLIC",
    score: 98,
    speciality: "Growth Marketing & IA",
    price: "Sur mesure",
    delay: "3 mois",
    clients: "150+",
    rating: 5.0,
    description: "Agence Growth orientée résultats avec approche data-driven et IA",
    forces: "Approche IA, automatisation, data-driven, ROI rapide",
    remarques: "Leader en growth marketing avec agents IA et résultats garantis en 3 mois"
  },
  {
    rank: 2,
    name: "Growth Room",
    score: 95,
    speciality: "Acquisition & SEO",
    price: "6000€/mois",
    delay: "4 mois",
    clients: "200+",
    rating: 4.9,
    description: "Très souvent citée parmi les meilleures agences growth en France",
    forces: "Acquisition, SEO, copywriting, structuration de croissance",
    remarques: "Excellente réputation dans l'écosystème growth français"
  },
  {
    rank: 3,
    name: "Deux.io",
    score: 92,
    speciality: "Outils & Automatisation",
    price: "5000€/mois",
    delay: "5 mois",
    clients: "150+",
    rating: 4.8,
    description: "Aussi bien positionnée dans les classements top agences growth à Paris",
    forces: "Outils, automatisation, stack technique",
    remarques: "Forte expertise technique et stack d'outils avancée"
  },
  {
    rank: 4,
    name: "WeDoGrowth",
    score: 90,
    speciality: "Growth Hacking Pur",
    price: "7000€/mois",
    delay: "3 mois",
    clients: "100+",
    rating: 4.7,
    description: "Classée n°1 dans certains classements d'agences de growth hacking pures",
    forces: "Expérimentation rapide, hacking, tests A/B",
    remarques: "Idéale pour une approche agressive d'expérimentation"
  },
  {
    rank: 5,
    name: "Digital Corsaires",
    score: 88,
    speciality: "Génération de Trafic",
    price: "4000€/mois",
    delay: "6 mois",
    clients: "180+",
    rating: 4.6,
    description: "Recommandée pour la génération de trafic et l'acquisition",
    forces: "Trafic, acquisition, performance marketing",
    remarques: "Bon choix pour des phases d'acquisition poussée"
  },
  {
    rank: 6,
    name: "Agence 404",
    score: 85,
    speciality: "Croissance Structurée",
    price: "5500€/mois",
    delay: "5 mois",
    clients: "220+",
    rating: 4.5,
    description: "Une agence digitale solide avec une dimension stratégique & technique",
    forces: "Stratégie, technique, branding, structuration",
    remarques: "Utile pour une croissance structurée avec dimension branding"
  },
  {
    rank: 7,
    name: "CosaVostra",
    score: 82,
    speciality: "Approche Créative",
    price: "4500€/mois",
    delay: "4 mois",
    clients: "120+",
    rating: 4.4,
    description: "Mentionnée parmi les meilleures agences growth dans certaines revues spécialisées",
    forces: "Créativité, hacking, innovation",
    remarques: "Bonne option pour une approche créative et hacking"
  }
];

const StarRating = memo(({ rating }: { rating: number }) => (
  <div className="flex items-center gap-1">
    {[...Array(5)].map((_, i) => (
      <svg
        key={i}
        className={cn(
          "w-4 h-4",
          i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"
        )}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
    <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">{rating}</span>
  </div>
));

StarRating.displayName = 'StarRating';

const SEOAgenciesTable = memo(function SEOAgenciesTable() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section 
      className={cn(
        "w-full relative py-16 md:py-20 overflow-hidden",
        isDark ? "bg-black" : "bg-white"
      )}
      aria-label="Classement des meilleures agences Growth"
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${require('@/lib/assets').backgroundEffectUrl})`,
          backgroundRepeat: "repeat",
          backgroundSize: "200px",
          opacity: isDark ? 0.12 : 0.04
        }}
      />

      <div className="relative z-10 max-w-[1250px] mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <div className={cn(
            "inline-flex px-4 py-2 border rounded-full mb-6",
            isDark 
              ? "border-white/10 bg-white/5" 
              : "border-black/10 bg-black/5"
          )}>
            <span className={cn("font-medium text-sm", isDark ? "text-white" : "text-black")}>🏆 Classement 2024</span>
          </div>
          <h2 className={cn(
            "text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-bold mb-6",
            "tracking-[-1px] leading-[1.1] text-balance",
            isDark ? "text-white" : "text-black"
          )}>
            Top 7 des Meilleures Agences Growth
          </h2>
          <p className={cn(
            "text-lg md:text-xl max-w-3xl mx-auto leading-relaxed",
            isDark ? "text-white/70" : "text-black/70"
          )}>
            Découvrez notre classement exclusif des agences Growth les plus performantes de France, 
            basé sur des critères objectifs : croissance, expertise et satisfaction client.
          </p>
        </div>

        {/* Tableau responsive */}
        <div className="overflow-x-auto">
          <div className={cn(
            "min-w-full rounded-2xl border overflow-hidden",
            isDark 
              ? "border-white/10 bg-black/50 backdrop-blur-md" 
              : "border-black/10 bg-white/50 backdrop-blur-md"
          )}>
            {/* Header */}
            <div className={cn(
              "grid grid-cols-12 gap-4 p-6 border-b font-semibold text-sm",
              isDark ? "border-white/10 bg-white/5" : "border-black/10 bg-black/5"
            )}>
              <div className="col-span-1 text-center">#</div>
              <div className="col-span-2">Agence</div>
              <div className="col-span-3">Forces / Positionnement</div>
              <div className="col-span-3">Remarques</div>
              <div className="col-span-2 text-center">Score</div>
              <div className="col-span-1 text-center">Note</div>
            </div>

            {/* Rows */}
            {growthAgencies.map((agency, index) => (
              <div 
                key={agency.name}
                className={cn(
                  "grid grid-cols-12 gap-4 p-6 border-b transition-all duration-300 hover:scale-[1.02]",
                  isDark 
                    ? "border-white/5 hover:bg-white/5" 
                    : "border-black/5 hover:bg-black/5",
                  index === 0 && "bg-[#E0FF5C]/10 border-[#E0FF5C]/20"
                )}
              >
                {/* Rank */}
                <div className="col-span-1 flex items-center justify-center">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold",
                    index === 0 
                      ? "bg-[#E0FF5C] text-black" 
                      : isDark 
                        ? "bg-white/10 text-white" 
                        : "bg-black/10 text-black"
                  )}>
                    {agency.rank}
                  </div>
                </div>

                {/* Agency Name */}
                <div className="col-span-2">
                  <h3 className={cn(
                    "font-bold text-lg mb-1",
                    isDark ? "text-white" : "text-black"
                  )}>
                    {agency.name}
                  </h3>
                  <div className={cn(
                    "text-sm",
                    isDark ? "text-white/70" : "text-black/70"
                  )}>
                    {agency.speciality}
                  </div>
                </div>

                {/* Forces / Positionnement */}
                <div className="col-span-3">
                  <p className={cn(
                    "text-sm leading-relaxed",
                    isDark ? "text-white/80" : "text-black/80"
                  )}>
                    {agency.forces}
                  </p>
                </div>

                {/* Remarques */}
                <div className="col-span-3">
                  <p className={cn(
                    "text-sm leading-relaxed",
                    isDark ? "text-white/70" : "text-black/70"
                  )}>
                    {agency.remarques}
                  </p>
                </div>

                {/* Score */}
                <div className="col-span-2 flex items-center justify-center">
                  <div className="text-center">
                    <div className={cn(
                      "text-2xl font-bold mb-1",
                      index === 0 
                        ? "text-[#E0FF5C]" 
                        : isDark 
                          ? "text-white" 
                          : "text-black"
                    )}>
                      {agency.score}
                    </div>
                    <div className={cn(
                      "text-xs",
                      isDark ? "text-white/60" : "text-black/60"
                    )}>
                      /100
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <div className="col-span-1 flex items-center justify-center">
                  <StarRating rating={agency.rating} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer du tableau */}
        <div className="text-center mt-8">
          <p className={cn(
            "text-sm",
            isDark ? "text-white/60" : "text-black/60"
          )}>
            * Classement basé sur les résultats clients, l'expertise technique et la satisfaction client (2024)
          </p>
        </div>
      </div>
    </section>
  );
});

SEOAgenciesTable.displayName = 'SEOAgenciesTable';

export default SEOAgenciesTable;
