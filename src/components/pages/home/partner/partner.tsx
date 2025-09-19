import { PartnerClient } from './PartnerClient';

// Données statiques avec descriptions SEO
const row1 = [
  { name: "Jobgether", image: "/partners/jobgether.png", alt: "Logo Jobgether, plateforme de recrutement flexible" },
  { name: "Le Monde", image: "/partners/lemonde.png", alt: "Logo Le Monde, groupe média de référence" },
  { name: "Tehtris", image: "/partners/tehtris.png", alt: "Logo Tehtris, expert en cybersécurité" },
  { name: "Muzzo", image: "/partners/muzzo.png", alt: "Logo Muzzo, startup fintech innovante" },
  { name: "Deepki", image: "/partners/deepki.png", alt: "Logo Deepki, solution ESG pour l'immobilier" },
  { name: "Agicap", image: "/partners/agicap.png", alt: "Logo Agicap, solution de gestion de trésorerie" },
  { name: "CodinGame", image: "/partners/codingame.png", alt: "Logo CodinGame, plateforme d'évaluation technique" },
  { name: "Louis Vuitton", image: "/partners/louisvuitton.png", alt: "Logo Louis Vuitton, maison de luxe" },
  { name: "Floa", image: "/partners/floa.png", alt: "Logo Floa, services financiers innovants" },
  { name: "Summit Partners", image: "/partners/summit-partner.png", alt: "Logo Summit Partners, fonds d'investissement international" }
];

const row2 = [
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
  { name: "BUT", image: "/partners/but.png", alt: "Logo BUT, enseigne de mobilier et électroménager" }
];

interface PartnersProps {
  forceBlackLogos?: boolean;
}

export default function Partners({ forceBlackLogos = false }: PartnersProps) {
  return (
    <div 
      className="w-full flex flex-col gap-0 pt-8 md:pt-12 bg-[#F3F4F6] dark:bg-black/100 overflow-hidden"
      aria-label="Nos partenaires de confiance"
    >
      <PartnerClient row1={row1} row2={row2} forceBlackLogos={forceBlackLogos} />
    </div>
  );
} 