"use client";
import { getAssetUrl } from '../../../../lib/assets';

import { PartnerClient } from './PartnerClient';
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";

// Données statiques avec descriptions SEO
const row1 = [
  { name: "Jobgether", image: getAssetUrl('/partners/jobgether.png'), alt: "Logo Jobgether, plateforme de recrutement flexible" },
  { name: "Le Monde", image: getAssetUrl('/partners/lemonde.png'), alt: "Logo Le Monde, groupe média de référence" },
  { name: "Tehtris", image: getAssetUrl('/partners/tehtris.png'), alt: "Logo Tehtris, expert en cybersécurité" },
  { name: "Muzzo", image: getAssetUrl('/partners/muzzo.png'), alt: "Logo Muzzo, startup fintech innovante" },
  { name: "Deepki", image: getAssetUrl('/partners/deepki.png'), alt: "Logo Deepki, solution ESG pour l'immobilier" },
  { name: "Agicap", image: getAssetUrl('/partners/agicap.png'), alt: "Logo Agicap, solution de gestion de trésorerie" },
  { name: "CodinGame", image: getAssetUrl('/partners/codingame.png'), alt: "Logo CodinGame, plateforme d'évaluation technique" },
  { name: "Louis Vuitton", image: getAssetUrl('/partners/louisvuitton.png'), alt: "Logo Louis Vuitton, maison de luxe" },
  { name: "Floa", image: getAssetUrl('/partners/floa.png'), alt: "Logo Floa, services financiers innovants" },
  { name: "Summit Partners", image: getAssetUrl('/partners/summit-partner.png'), alt: "Logo Summit Partners, fonds d'investissement international" }
];

const row2 = [
  { name: "L'Oréal", image: getAssetUrl('/partners/oreal.png'), alt: "Logo L'Oréal, leader mondial des cosmétiques" },
  { name: "Bonpoint", image: getAssetUrl('/partners/bonpoint.png'), alt: "Logo Bonpoint, marque de luxe pour enfants" },
  { name: "CoderPad", image: getAssetUrl('/partners/coderpad.png'), alt: "Logo CoderPad, plateforme de développement logiciel" },
  { name: "Obat", image: getAssetUrl('/partners/obat.png'), alt: "Logo Obat, partenaire de recrutement tech" },
  { name: "France Pare-brise", image: getAssetUrl('/partners/france-parebrise.png'), alt: "Logo France Pare-brise, expert en réparation de pare-brise" },
  { name: "CybelAngel", image: getAssetUrl('/partners/cybelangel.png'), alt: "Logo CybelAngel, expert en cybersécurité" },
  { name: "Expanders", image: getAssetUrl('/partners/expanders.png'), alt: "Logo Expanders, cabinet de recrutement tech" },
  { name: "Paris Turf", image: getAssetUrl('/partners/paris-turf.png'), alt: "Logo Paris Turf, expert des paris hippiques" },
  { name: "MSC Cruises", image: getAssetUrl('/partners/msc.png'), alt: "Logo MSC Cruises, compagnie de croisières" },
  { name: "Beertime", image: getAssetUrl('/partners/beertime.png'), alt: "Logo Beertime, partenaire de recrutement tech" },
  { name: "Breega", image: getAssetUrl('/partners/breega.png'), alt: "Logo Breega, fonds d'investissement tech" },
  { name: "ESG", image: getAssetUrl('/partners/esg.png'), alt: "Logo ESG, école supérieure de gestion" },
  { name: "BUT", image: getAssetUrl('/partners/but.png'), alt: "Logo BUT, enseigne de mobilier et électroménager" }
];

interface PartnersProps {
  forceBlackLogos?: boolean;
  noTopBorder?: boolean;
  hideText?: boolean;
}

export default function Partners({ forceBlackLogos = false, noTopBorder = false, hideText = false }: PartnersProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div 
      className={cn(
        "w-full flex flex-col gap-0 pt-8 md:pt-12 pb-12 md:pb-16 overflow-hidden relative",
        noTopBorder ? "border-b" : "border-y",
        isDark ? "bg-black border-white/10" : "bg-white border-black/5"
      )}
      aria-label="Nos partenaires de confiance"
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${getAssetUrl('/backgroundeffect.png')})`,
          backgroundRepeat: "repeat",
          backgroundSize: "200px",
          opacity: isDark ? 0.12 : 0.04
        }}
      />
      <PartnerClient row1={row1} row2={row2} forceBlackLogos={forceBlackLogos} hideText={hideText} />
    </div>
  );
} 