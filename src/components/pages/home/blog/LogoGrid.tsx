'use client';

import { memo } from 'react';
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";

// Types
interface Logo {
  name: string;
  image: string;
  alt: string;
}

// Constants
const logos: Logo[] = [
  // Row 1
  { name: "Jobgether", image: "/partners/jobgether.png", alt: "Logo Jobgether, plateforme de recrutement flexible" },
  { name: "Le Monde", image: "/partners/lemonde.png", alt: "Logo Le Monde, groupe média de référence" },
  { name: "Tehtris", image: "/partners/tehtris.png", alt: "Logo Tehtris, expert en cybersécurité" },
  { name: "Muzzo", image: "/partners/muzzo.png", alt: "Logo Muzzo, startup fintech innovante" },
  { name: "Deepki", image: "/partners/deepki.png", alt: "Logo Deepki, solution ESG pour l'immobilier" },
  { name: "Agicap", image: "/partners/agicap.png", alt: "Logo Agicap, solution de gestion de trésorerie" },
  { name: "CodinGame", image: "/partners/codingame.png", alt: "Logo CodinGame, plateforme d'évaluation technique" },
  { name: "Louis Vuitton", image: "/partners/louisvuitton.png", alt: "Logo Louis Vuitton, maison de luxe" },
  { name: "Floa", image: "/partners/floa.png", alt: "Logo Floa, services financiers innovants" },
  { name: "Summit Partners", image: "/partners/summit-partner.png", alt: "Logo Summit Partners, fonds d'investissement international" },
  // Row 2
  { name: "L'Oréal", image: "/partners/oreal.png", alt: "Logo L'Oréal, leader mondial des cosmétiques" },
  { name: "Bonpoint", image: "/partners/bonpoint.png", alt: "Logo Bonpoint, marque de luxe pour enfants" },
  { name: "CoderPad", image: "/partners/coderpad.png", alt: "Logo CoderPad, plateforme de développement logiciel" },
  { name: "Obat", image: "/partners/obat.png", alt: "Logo Obat, partenaire de recrutement tech" },
  { name: "France Pare-brise", image: "/partners/france-parebrise.png", alt: "Logo France Pare-brise, expert en réparation de pare-brise" },
  { name: "CybelAngel", image: "/partners/cybelangel.png", alt: "Logo CybelAngel, expert en cybersécurité" },
  { name: "Expanders", image: "/partners/expanders.png", alt: "Logo Expanders, cabinet de recrutement tech" },
  { name: "Paris Turf", image: "/partners/paris-turf.png", alt: "Logo Paris Turf, expert des paris hippiques" },
  { name: "MSC Cruises", image: "/partners/msc.png", alt: "Logo MSC Cruises, compagnie de croisières" },
  { name: "Beertime", image: "/partners/beertime.png", alt: "Logo Beertime, partenaire de recrutement tech" },
  { name: "Breega", image: "/partners/breega.png", alt: "Logo Breega, fonds d'investissement tech" },
  { name: "ESG", image: "/partners/esg.png", alt: "Logo ESG, école supérieure de gestion" },
  { name: "BUT", image: "/partners/but.png", alt: "Logo BUT, enseigne de mobilier et électroménager" },
  { name: "Isai", image: "/partners/isai.png", alt: "Logo Isai, fonds d'investissement" }
];

const LogoGrid = memo(function LogoGrid() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section className={cn(
      "w-full pt-16 md:pt-20 pb-16 md:pb-24 relative overflow-hidden border-t",
      isDark ? "border-white/10" : "border-black/5"
    )}>
      <div className="max-w-[1250px] mx-auto px-4">
        <div className="text-center mb-12 md:mb-14 animate-fade-in-up">
          <div className={cn(
            "inline-flex px-4 py-2 border rounded-full mb-6",
            isDark 
              ? "bg-[#E0FF5C]/10 border-[#E0FF5C]/20" 
              : "bg-[#E0FF5C]/20 border-[#E0FF5C]/30"
          )}>
            <span className={cn("font-medium text-sm", isDark ? "text-[#E0FF5C]" : "text-[#9FB832]")}>🤝 Ils nous font confiance</span>
          </div>
          <h2 className={cn(
            "text-2xl md:text-4xl font-bold text-center mb-6",
            isDark ? "text-white" : "text-black"
          )}>
            Scale-ups et grands groupes<br/>qui nous font confiance
          </h2>
          <p className={cn(
            "text-center text-base md:text-lg max-w-2xl mx-auto leading-relaxed",
            isDark ? "text-white/90" : "text-black/80"
          )}>
            De Louis Vuitton à Agicap : ils ont choisi notre agence pour <strong>automatiser leur croissance avec l'IA</strong> et multiplier leurs résultats
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6" role="list">
          {logos.map((logo, index) => (
            <div
              key={logo.name}
              className="aspect-[3/2] rounded-2xl p-8 flex items-center justify-center bg-black/5 dark:bg-white/5 animate-fade-in-up"
              style={{ animationDelay: `${index * 50}ms` }}
              role="listitem"
            >
              <img
                src={logo.image}
                alt={logo.alt}
                className="w-full h-full object-contain brightness-0 dark:invert"
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default LogoGrid; 