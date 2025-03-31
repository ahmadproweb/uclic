'use client';

import { UnderlinedText } from '@/components/ui/underlined-text';

const logos = [
  // Row 1
  { name: "Jobgether", image: "/partners/jobgether.png", alt: "Logo Jobgether, plateforme de recrutement flexible" },
  { name: "Le Monde", image: "/partners/lemonde.png", alt: "Logo Le Monde, groupe média de référence" },
  { name: "Tehtris", image: "/partners/tehtris.png", alt: "Logo Tehtris, expert en cybersécurité" },
  { name: "Muzzo", image: "/partners/muzzo.png", alt: "Logo Muzzo, startup fintech innovante" },
  { name: "Deepki", image: "/partners/deepki.png", alt: "Logo Deepki, solution ESG pour l'immobilier" },
  { name: "Agicap", image: "/partners/agicap.png", alt: "Logo Agicap, solution de gestion de trésorerie" },
  { name: "CodinGame", image: "/partners/codingame.png", alt: "Logo CodinGame, plateforme d'évaluation technique" },
  { name: "ISAI", image: "/partners/isai.png", alt: "Logo ISAI, fonds d'investissement tech" },
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
  { name: "BUT", image: "/partners/but.png", alt: "Logo BUT, enseigne de mobilier et électroménager" }
];

export default function LogoGrid() {
  return (
    <div className="w-full py-0 md:py-0 relative overflow-hidden">
      <div className="max-w-[1250px] mx-auto px-4">
        {/* Titre */}
        <h2 className="text-2xl md:text-4xl font-normal text-center mb-8 text-black">
          Nos partenaires de{' '}
          <UnderlinedText text="confiance" className="text-black" />
        </h2>

        {/* Grille de logos */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {logos.map((logo) => (
            <div
              key={logo.name}
              className="aspect-[3/2] rounded-2xl p-8 flex items-center justify-center bg-black/5"
            >
              <img
                src={logo.image}
                alt={logo.alt}
                className="w-full h-full object-contain brightness-0"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 