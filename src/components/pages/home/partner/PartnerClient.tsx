"use client";

import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";

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

export function PartnerClient({ row1, row2, forceBlackLogos = false }: PartnerClientProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const getLogoFilter = () => {
    if (forceBlackLogos) return "[filter:brightness(0)]";
    return isDark ? "[filter:brightness(0)_invert(1)]" : "[filter:brightness(0)]";
  };

  return (
    <div className="flex flex-col space-y-12 group/logos">
      {/* Première ligne */}
      <div className="logo-container">
        <div className="logo-scroll group-hover/logos:pause">
          <div className="logo-scroll__wrapper">
            {[...row1, ...row1].map((partner, idx) => (
              <div key={idx} className="logo-item group">
                <img
                  src={partner.image}
                  alt={partner.alt}
                  className={cn(
                    "h-[35px] w-auto max-w-[120px] object-contain transition-all duration-300",
                    getLogoFilter(),
                    "hover:opacity-80"
                  )}
                />
              </div>
            ))}
          </div>
          <div className="logo-scroll__wrapper">
            {[...row1, ...row1].map((partner, idx) => (
              <div key={`dup1-${idx}`} className="logo-item group">
                <img
                  src={partner.image}
                  alt={partner.alt}
                  className={cn(
                    "h-[35px] w-auto max-w-[120px] object-contain transition-all duration-300",
                    getLogoFilter(),
                    "hover:opacity-80"
                  )}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Deuxième ligne */}
      <div className="logo-container">
        <div className="logo-scroll group-hover/logos:pause">
          <div className="logo-scroll__wrapper">
            {[...row2, ...row2].map((partner, idx) => (
              <div key={idx} className="logo-item group">
                <img
                  src={partner.image}
                  alt={partner.alt}
                  className={cn(
                    "h-[35px] w-auto max-w-[120px] object-contain transition-all duration-300",
                    getLogoFilter(),
                    "hover:opacity-80"
                  )}
                />
              </div>
            ))}
          </div>
          <div className="logo-scroll__wrapper">
            {[...row2, ...row2].map((partner, idx) => (
              <div key={`dup2-${idx}`} className="logo-item group">
                <img
                  src={partner.image}
                  alt={partner.alt}
                  className={cn(
                    "h-[35px] w-auto max-w-[120px] object-contain transition-all duration-300",
                    getLogoFilter(),
                    "hover:opacity-80"
                  )}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 