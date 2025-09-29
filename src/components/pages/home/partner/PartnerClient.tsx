"use client";

import { memo } from 'react';
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import './partner.css';

interface Partner {
  name: string;
  image: string;
  alt: string;
}

interface PartnerClientProps {
  row1: Partner[];
  row2: Partner[];
  forceBlackLogos?: boolean;
}

const PartnerLogo = memo(function PartnerLogo({ 
  partner, 
  index, 
  totalLogos,
  filter 
}: { 
  partner: Partner;
  index: number;
  totalLogos: number;
  filter: string;
}) {
  return (
    <div 
      className="partner-item"
      role="img"
      aria-label={partner.name}
    >
      <img
        src={partner.image}
        alt={partner.alt}
        width={120}
        height={36}
        loading={index < totalLogos ? "eager" : "lazy"}
        className={cn(
          "object-contain transition-all duration-300",
          filter,
          "hover:opacity-90"
        )}
      />
    </div>
  );
});

PartnerLogo.displayName = 'PartnerLogo';

const PartnerRow = memo(function PartnerRow({ 
  partners, 
  isReverse = false,
  filter
}: { 
  partners: Partner[];
  isReverse?: boolean;
  filter: string;
}) {
  return (
    <div className="partner-container">
      <div 
        className={cn(
          "partner-scroll",
          isReverse ? "animate-marquee-right" : "animate-marquee-left"
        )}
      >
        {[...partners, ...partners].map((partner, idx) => (
          <PartnerLogo 
            key={`${isReverse ? 'reverse' : 'forward'}-${idx}`}
            partner={partner}
            index={idx}
            totalLogos={partners.length}
            filter={filter}
          />
        ))}
      </div>
    </div>
  );
});

PartnerRow.displayName = 'PartnerRow';

export const PartnerClient = memo(function PartnerClient({ 
  row1, 
  row2, 
  forceBlackLogos = false 
}: PartnerClientProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const getLogoFilter = () => {
    if (forceBlackLogos) return "[filter:brightness(0)]";
    return isDark ? "[filter:brightness(0)_invert(1)]" : "[filter:brightness(0)]";
  };

  return (
    <div className="w-full">
      <div className="max-w-[1250px] mx-auto px-4">
        <h2 className="text-2xl md:text-4xl font-normal text-center mb-4 text-black dark:text-white">
          Nos partenaires de confiance
        </h2>
        <p className="text-center text-lg text-black dark:text-gray-300 max-w-2xl mx-auto mb-8">
          Ils ont fait confiance à nos services <strong>Growth</strong>, <strong>automatisation</strong> & <strong>IA</strong>
        </p>
      </div>
      <div className="flex flex-col space-y-6">
        <PartnerRow partners={row1} filter={getLogoFilter()} />
        <PartnerRow partners={row2} isReverse filter={getLogoFilter()} />
      </div>
    </div>
  );
}); 