'use client';

import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { colors as theme } from '@/config/theme';
import { useEffect, useRef, useState, memo } from 'react';
import { getPortfolios } from '@/services/wordpress';
import { CTAButton } from '@/components/ui/cta-button';
import Link from 'next/link';
import type { Portfolio } from './types';

// Utils
const decodeHTMLEntities = (text: string): string => {
  return text
    .replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec))
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#39;/g, "'")
    .replace(/&rsquo;/g, "'")
    .replace(/&lsquo;/g, "'")
    .replace(/&ndash;/g, "–")
    .replace(/&mdash;/g, "—");
};

interface CaseStudyProps {
  portfolios: Portfolio[];
}

// Memoized Components
const DecorativeMouse = memo(({ 
  ref, 
  position, 
  isDark,
  isVisible
}: { 
  ref: React.RefObject<HTMLDivElement>;
  position: 'left' | 'right';
  isDark: boolean;
  isVisible: boolean;
}) => (
  <div 
    ref={ref} 
    className={cn(
      "absolute hidden md:block transition-transform duration-1000 ease-out",
      position === 'left' 
        ? "top-20 left-[10%] rotate-[-15deg]" 
        : "bottom-20 right-[10%] rotate-[25deg]",
      isVisible && (position === 'left' 
        ? "translate-x-[100px] translate-y-[60px] -rotate-[35deg]" 
        : "translate-x-[-80px] translate-y-[90px] rotate-[60deg]")
    )} 
    aria-hidden="true"
  >
    <i 
      className={cn(
        "ri-navigation-fill",
        position === 'left' ? "text-4xl" : "text-6xl"
      )}
      style={{ color: theme.colors.primary.main }}
    />
  </div>
));

DecorativeMouse.displayName = 'DecorativeMouse';

const DecorativeNavigation = memo(({ position, isDark, isVisible }: { 
  position: 'topleft' | 'bottomright'; 
  isDark: boolean;
  isVisible: boolean;
}) => (
  <div 
    className={cn(
      "absolute hidden md:block transition-all duration-1000 ease-out",
      position === 'topleft' 
        ? "top-[25%] left-[15%] rotate-[-45deg] opacity-0" 
        : "bottom-[25%] right-[15%] rotate-[45deg] opacity-0",
      isVisible && (position === 'topleft'
        ? "translate-x-[100px] translate-y-[100px] rotate-[15deg] opacity-100"
        : "translate-x-[-100px] translate-y-[-100px] rotate-[-15deg] opacity-100")
    )}
    aria-hidden="true"
  >
    <i 
      className={cn(
        "ri-navigation-fill text-4xl md:text-5xl",
        isDark ? "text-white/20" : "text-black/20"
      )}
    />
  </div>
));

DecorativeNavigation.displayName = 'DecorativeNavigation';

const PortfolioCard = memo(({ portfolio, isDark }: { portfolio: Portfolio; isDark: boolean }) => {
  const imageUrl = portfolio.featuredImage?.node.sourceUrl;
  const optimizedImageUrl = imageUrl 
    ? `${imageUrl.replace(/\.(jpg|jpeg|png|gif)$/, '-400x250.$1')}${imageUrl.endsWith('.webp') ? '' : '.webp'}`
    : '';

  return (
    <Link
      href={`/cas-clients/${portfolio.slug}`}
      className={cn(
        "group rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1 border backdrop-blur-md relative block w-full",
        isDark 
          ? "bg-black/40 border-white/10 hover:border-white/20" 
          : "bg-white/50 border-black/8 hover:border-black/10"
      )}
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 rounded-3xl z-0 pointer-events-none"
        style={{
          backgroundImage: "url('https://framerusercontent.com/images/g0QcWrxr87K0ufOxIUFBakwYA8.png')",
          backgroundRepeat: 'repeat',
          backgroundSize: '200px',
          opacity: isDark ? '0.25' : '0.04'
        }}
      />
      {/* Hover halo effect */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: isDark
            ? `linear-gradient(to right, rgba(212,237,49,0.08) 0%, rgba(212,237,49,0.08) 60%, rgba(212,237,49,0) 100%)`
            : `linear-gradient(to right, rgba(212,237,49,0.12) 0%, rgba(212,237,49,0.12) 60%, rgba(212,237,49,0) 100%)`,
          filter: 'blur(20px)',
        }}
      />

      {/* Featured Image */}
      <div className="relative w-full h-48 overflow-hidden">
        {imageUrl && (
          <img
            src={optimizedImageUrl}
            alt={decodeHTMLEntities(portfolio.title)}
            className="object-cover transition-transform duration-500 group-hover:scale-105 w-full h-full"
            loading="lazy"
            decoding="async"
            onError={(e) => {
              const target = e.currentTarget as HTMLImageElement;
              const jpgFallback = imageUrl.replace(/\.(jpg|jpeg|png|gif)$/, '-400x250.$1');
              if (target.src !== jpgFallback) {
                target.src = jpgFallback;
              }
            }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
        <span className={cn(
          "absolute bottom-4 left-4 inline-block px-3 py-1 rounded-full text-sm z-20 font-semibold",
          isDark 
            ? "bg-white text-black" 
            : "bg-black text-[#E0FF5C]"
        )}>
          Cas client
        </span>
      </div>

      {/* Content */}
      <div className="p-6 space-y-3">
        <h3 className={cn("text-xl font-semibold", isDark ? "text-white" : "text-black")}>
          {decodeHTMLEntities(portfolio.title)}
        </h3>

        <p className={cn("text-sm line-clamp-2", isDark ? "text-white/80" : "text-black/80")}>
          {decodeHTMLEntities(portfolio.excerpt.replace(/<[^>]*>/g, ''))}
        </p>
      </div>
    </Link>
  );
});

PortfolioCard.displayName = 'PortfolioCard';

function CaseStudy({ portfolios: initialPortfolios }: CaseStudyProps) {
  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === 'dark';
  const [portfolios, setPortfolios] = useState(initialPortfolios || []);
  const [isLoading, setIsLoading] = useState(!initialPortfolios);
  const [isVisible, setIsVisible] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const mouse1Ref = useRef<HTMLDivElement>(null);
  const mouse2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!initialPortfolios) {
      const fetchPortfolios = async () => {
        try {
          const data = await getPortfolios();
          setPortfolios(data);
        } catch (error) {
          console.error('Error fetching portfolios:', error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchPortfolios();
    }
  }, [initialPortfolios]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" role="status" aria-label="Chargement des études de cas">
        {[1, 2, 3].map((i) => (
          <div key={i} className="aspect-[4/3] rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <section 
      ref={sectionRef}
      id="casestudy" 
      className={cn(
        "w-full relative overflow-hidden pt-20 pb-12 md:pt-20 md:pb-16 px-4 sm:px-6 border-t border-b z-10",
        isDark ? "bg-black border-white/10" : "bg-white border-black/5"
      )}
      style={{ backgroundColor: isDark ? '#000000' : '#ffffff' }}
      aria-label="Études de cas"
    >
      {/* Section-level background pattern */}
      <div 
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: 'url("https://framerusercontent.com/images/g0QcWrxr87K0ufOxIUFBakwYA8.png")',
          backgroundRepeat: 'repeat',
          backgroundSize: '200px',
          opacity: isDark ? 0.25 : 0.04
        }}
        aria-hidden="true"
      />

      <DecorativeMouse ref={mouse1Ref} position="left" isDark={isDark} isVisible={isVisible} />
      <DecorativeMouse ref={mouse2Ref} position="right" isDark={isDark} isVisible={isVisible} />
      <DecorativeNavigation position="topleft" isDark={isDark} isVisible={isVisible} />
      <DecorativeNavigation position="bottomright" isDark={isDark} isVisible={isVisible} />

      {/* Invisible width container with background pattern */}
      <div className="max-w-[1250px] mx-auto px-4 sm:px-6 relative z-10">

      <header className="text-center">
          <div className={cn(
            "inline-flex px-4 py-2 border rounded-full mb-6",
            isDark 
              ? "border-white/10 bg-white/5" 
              : "border-black/10 bg-black/5"
          )}>
            <span className={cn("font-medium text-sm", isDark ? "text-white" : "text-black")}>📊 Portfolio Clients</span>
          </div>
          <h2 className={cn(
            "max-w-5xl mx-auto text-center mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-bold tracking-[-1px]",
            isDark ? "text-white" : "text-black"
          )}>
            Notre agence Growth IA a transformé<br/>
            leur acquisition et multiplié leurs résultats
          </h2>
          <p className={cn(
            "text-center max-w-3xl mx-auto mb-12 md:mb-16 text-base md:text-lg leading-relaxed",
            isDark ? "text-white/70" : "text-black/70"
          )}>
            De +300% de trafic qualifié à -60% de CAC : découvrez comment notre agence Growth Marketing a aidé nos clients à dominer leur marché avec l'IA. Stratégies actionnables, automatisation complète, ROI mesurable.
          </p>
      </header>

      <div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
        role="feed"
        aria-label="Liste des études de cas"
      >
        {portfolios.map((portfolio: Portfolio) => (
          <PortfolioCard 
            key={portfolio.id} 
            portfolio={portfolio} 
            isDark={isDark} 
          />
        ))}
      </div>

      <footer className="mt-6 md:mt-10 text-center">
        <CTAButton
          href="/cas-clients"
          className={cn(
            isDark 
              ? "!bg-white !text-black hover:!bg-[#E0FF5C] hover:!text-black [&_svg]:!stroke-black [&_span]:border-black hover:[&_span]:border-black"
              : "!bg-black hover:!bg-[#E0FF5C] !text-white hover:!text-black [&_svg]:!text-white [&_svg]:!stroke-white hover:[&_svg]:!text-black hover:[&_svg]:!stroke-black [&_span]:border-white hover:[&_span]:border-black"
          )}
        >
          Voir tous les cas clients
        </CTAButton>
      </footer>
      </div>
    </section>
  );
}

export default memo(CaseStudy); 