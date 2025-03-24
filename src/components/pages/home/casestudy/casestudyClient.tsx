'use client';

import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { colors as theme } from '@/config/theme';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getPortfolios } from '@/services/wordpress';
import { CTAButton } from '@/components/ui/cta-button';

// Fonction pour décoder les caractères HTML
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

export default function CaseStudy({ portfolios: initialPortfolios }: CaseStudyProps) {
  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === 'dark';
  const [portfolios, setPortfolios] = useState(initialPortfolios || []);
  const [isLoading, setIsLoading] = useState(!initialPortfolios);

  const mouse1Ref = useRef(null);
  const mouse2Ref = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Animation pour le premier mouse
    gsap.to(mouse1Ref.current, {
      x: 100,
      y: 60,
      rotation: -35,
      scrollTrigger: {
        trigger: "#casestudy",
        start: "top bottom",
        end: "bottom top",
        scrub: 0.3,
      }
    });

    // Animation pour le deuxième mouse
    gsap.to(mouse2Ref.current, {
      x: -80,
      y: 90,
      rotation: 60,
      scrollTrigger: {
        trigger: "#casestudy",
        start: "top bottom",
        end: "bottom top",
        scrub: 0.4
      }
    });
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
    <section id="casestudy" className={cn(
      "w-full py-12 md:py-16 relative transition-colors duration-300",
      isDark ? "bg-black/90" : "bg-[#F5F5F5]"
    )}>
      {/* Éléments décoratifs - Mouse */}
      <div ref={mouse1Ref} className="absolute top-20 left-[10%] w-[46px] h-[45px] transform rotate-[-15deg] hidden md:block" style={{ zIndex: 1 }}>
        <svg width="46" height="45" viewBox="0 0 46 45" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M45.0146 35.3088C46.9298 40.5262 41.8604 45.5956 36.643 43.6804L3.84584 31.6409C-0.995415 29.8637 -0.872338 22.9743 4.0293 21.3712L14.5981 17.9146C17.6999 16.9001 20.0918 14.406 20.9756 11.2644L23.0275 3.9706C24.4554 -1.10461 31.5466 -1.3798 33.3634 3.5695L45.0146 35.3088Z" fill={isDark ? theme.colors.primary.main : theme.colors.primary.main}/>
        </svg>
      </div>
      <div ref={mouse2Ref} className="absolute bottom-20 right-[10%] w-[92px] h-[90px] transform rotate-[25deg] hidden md:block" style={{ zIndex: 1 }}>
        <svg width="92" height="90" viewBox="0 0 46 45" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M45.0146 35.3088C46.9298 40.5262 41.8604 45.5956 36.643 43.6804L3.84584 31.6409C-0.995415 29.8637 -0.872338 22.9743 4.0293 21.3712L14.5981 17.9146C17.6999 16.9001 20.0918 14.406 20.9756 11.2644L23.0275 3.9706C24.4554 -1.10461 31.5466 -1.3798 33.3634 3.5695L45.0146 35.3088Z" fill={isDark ? theme.colors.primary.main : theme.colors.primary.main}/>
        </svg>
      </div>

      {/* Titre principal */}
      <div className="max-w-[1250px] mx-auto px-4">
        <h2 className={cn(
          "text-3xl md:text-5xl font-normal text-center mb-8 md:mb-16 tracking-[-1px]",
          isDark ? "text-white" : "text-black"
        )}>
          Découvrez comment nos équipes ont
          <br className="hidden md:block" />
          performé avec nos clients
        </h2>

        {/* Grille des cartes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {portfolios.map((portfolio: Portfolio) => (
            <div 
              key={portfolio.id}
              className={cn(
                "rounded-2xl md:rounded-[32px] p-6 md:p-8 flex flex-col h-full",
                "transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group",
                isDark 
                  ? "bg-white/5 hover:bg-[#E0FF5C]/20" 
                  : "bg-white hover:bg-white border border-black/5"
              )}
            >
              <div className={cn(
                "aspect-video w-full rounded-xl md:rounded-2xl mb-6 md:mb-8 transition-colors duration-300 relative overflow-hidden",
                isDark ? "bg-white/10" : "bg-gray-100"
              )}>
                {portfolio.featuredImage?.node.sourceUrl && (
                  <img
                    src={`${portfolio.featuredImage.node.sourceUrl.replace(/\.(jpg|jpeg|png|gif)$/, '-400x250.$1')}${portfolio.featuredImage.node.sourceUrl.endsWith('.webp') ? '' : '.webp'}`}
                    alt={portfolio.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                    width={400}
                    height={250}
                  />
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
            </div>
          ))}
        </div>

        <div className="mt-8 md:mt-16 text-center">
          <CTAButton
            href="/portfolio"
            variant="simple"
            className="!bg-white !text-black hover:!bg-[#E0FF5C]"
          >
            Voir tous les cas clients
          </CTAButton>
        </div>
      </div>
    </section>
  );
} 