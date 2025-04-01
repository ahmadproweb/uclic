'use client';

import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { colors as theme } from '@/config/theme';
import { useEffect, useRef, useState, memo, useCallback } from 'react';
import { getPortfolios } from '@/services/wordpress';
import { CTAButton } from '@/components/ui/cta-button';
import Link from 'next/link';

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

// Types
interface Portfolio {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
    }
  }
}

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
      "absolute w-[46px] h-[45px] transform hidden md:block transition-transform duration-1000 ease-out",
      position === 'left' 
        ? "top-20 left-[10%] rotate-[-15deg]" 
        : "bottom-20 right-[10%] rotate-[25deg] w-[92px] h-[90px]",
      isVisible && (position === 'left' 
        ? "translate-x-[100px] translate-y-[60px] -rotate-[35deg]" 
        : "translate-x-[-80px] translate-y-[90px] rotate-[60deg]")
    )} 
    style={{ zIndex: 1 }}
  >
    <svg width={position === 'left' ? "46" : "92"} height={position === 'left' ? "45" : "90"} viewBox="0 0 46 45" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M45.0146 35.3088C46.9298 40.5262 41.8604 45.5956 36.643 43.6804L3.84584 31.6409C-0.995415 29.8637 -0.872338 22.9743 4.0293 21.3712L14.5981 17.9146C17.6999 16.9001 20.0918 14.406 20.9756 11.2644L23.0275 3.9706C24.4554 -1.10461 31.5466 -1.3798 33.3634 3.5695L45.0146 35.3088Z" fill={theme.colors.primary.main}/>
    </svg>
  </div>
));

DecorativeMouse.displayName = 'DecorativeMouse';

// Memoized Portfolio Card
const PortfolioCard = memo(({ portfolio, isDark }: { portfolio: Portfolio; isDark: boolean }) => {
  const imageUrl = portfolio.featuredImage?.node.sourceUrl;
  const optimizedImageUrl = imageUrl 
    ? `${imageUrl.replace(/\.(jpg|jpeg|png|gif)$/, '-400x250.$1')}${imageUrl.endsWith('.webp') ? '' : '.webp'}`
    : '';

  return (
    <Link 
      href={`/cas-clients/${portfolio.slug}`}
      className={cn(
        "rounded-2xl md:rounded-[32px] p-5 md:p-6",
        "transition-all duration-300",
        "hover:-translate-y-1 hover:shadow-xl",
        "cursor-pointer group backdrop-blur-sm",
        isDark ? "bg-white/5 border border-white/10" : "bg-white border border-black/5",
        "hover:bg-white/10"
      )}
    >
      <div className={cn(
        "aspect-video w-full rounded-xl md:rounded-2xl mb-6 md:mb-8 transition-colors duration-300 relative overflow-hidden",
        isDark ? "bg-white/10" : "bg-gray-100"
      )}>
        {imageUrl && (
          <div className="relative w-full h-full">
            <img
              src={optimizedImageUrl}
              alt={portfolio.title}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        )}
      </div>
      <h3 className={cn(
        "text-xl md:text-2xl font-medium mb-3 md:mb-4 transition-colors duration-300",
        isDark 
          ? "text-white group-hover:text-[#E0FF5C]" 
          : "text-black group-hover:text-black"
      )}>
        {decodeHTMLEntities(portfolio.title)}
      </h3>
      <div 
        className={cn(
          "text-sm md:text-base mb-6 md:mb-8 flex-1 line-clamp-3",
          isDark ? "text-white/80" : "text-black/70"
        )}
      >
        {decodeHTMLEntities(portfolio.excerpt.replace(/<[^>]*>/g, ''))}
      </div>
      <div className={cn(
        "group flex items-center transition-colors duration-300 text-sm md:text-base mt-auto",
        isDark 
          ? "text-[#E0FF5C]" 
          : "text-[#9FB832] group-hover:text-black"
      )}>
        Découvrir
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" 
          className="ml-2 group-hover:translate-x-1 transition-transform duration-300 w-4 h-4 md:w-5 md:h-5">
          <path d="M4 12H20M20 12L14 6M20 12L14 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </Link>
  );
});

PortfolioCard.displayName = 'PortfolioCard';

// Main Component
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
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1
      }
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
        "w-full py-12 md:py-16 relative transition-colors duration-300",
        isDark ? "bg-black/90" : "bg-[#F5F5F5]"
      )}
    >
      <DecorativeMouse ref={mouse1Ref} position="left" isDark={isDark} isVisible={isVisible} />
      <DecorativeMouse ref={mouse2Ref} position="right" isDark={isDark} isVisible={isVisible} />

      <div className="max-w-[1250px] mx-auto px-4">
        <h2 className={cn(
          "text-3xl md:text-5xl font-normal text-center mb-8 md:mb-16 tracking-[-1px]",
          isDark ? "text-white" : "text-black"
        )}>
          Découvrez comment nos équipes ont
          <br className="hidden md:block" />
          performé avec nos clients
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {portfolios.map((portfolio: Portfolio) => (
            <PortfolioCard 
              key={portfolio.id} 
              portfolio={portfolio} 
              isDark={isDark} 
            />
          ))}
        </div>

        <div className="mt-8 md:mt-16 text-center">
          <CTAButton
            href="/cas-clients"
            variant="simple"
            className={cn(
              isDark 
                ? "!bg-white !text-black hover:!bg-[#E0FF5C] [&_svg]:!stroke-black [&_span]:border-black hover:[&_span]:border-black hover:[&_svg]:!stroke-black"
                : "!bg-black hover:!bg-white !text-white hover:!text-black [&_svg]:!text-white [&_svg]:!stroke-white hover:[&_svg]:!text-black hover:[&_svg]:!stroke-black [&_span]:border-white hover:[&_span]:border-black"
            )}
          >
            Voir tous les cas clients
          </CTAButton>
        </div>
      </div>
    </section>
  );
}

export default memo(CaseStudy); 