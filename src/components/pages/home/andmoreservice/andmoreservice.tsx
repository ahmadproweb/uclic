"use client";

import { useState, useEffect, useRef, ReactNode } from 'react';
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { colors } from '@/config/theme';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { CTAButton } from "@/components/ui/cta-button";

const services = [
  {
    id: 1,
    title: "Lorem ipsum dolor sit",
    description: "Lorem ipsum dolor sit amet consectetur adipiscing elit...",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 2,
    title: "Lorem ipsum dolor sit",
    description: "Lorem ipsum dolor sit amet consectetur adipiscing elit...",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 3,
    title: "Lorem ipsum dolor sit",
    description: "Lorem ipsum dolor sit amet consectetur adipiscing elit...",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 4,
    title: "Lorem ipsum dolor sit",
    description: "Lorem ipsum dolor sit amet consectetur adipiscing elit...",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 5,
    title: "Lorem ipsum dolor sit",
    description: "Lorem ipsum dolor sit amet consectetur adipiscing elit...",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 6,
    title: "Lorem ipsum dolor sit",
    description: "Lorem ipsum dolor sit amet consectetur adipiscing elit...",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 7,
    title: "Lorem ipsum dolor sit",
    description: "Lorem ipsum dolor sit amet consectetur adipiscing elit...",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 8,
    title: "Lorem ipsum dolor sit",
    description: "Lorem ipsum dolor sit amet consectetur adipiscing elit...",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 9,
    title: "Lorem ipsum dolor sit",
    description: "Lorem ipsum dolor sit amet consectetur adipiscing elit...",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

interface AndMoreServiceProps {
  children: ReactNode;
}

// Helper function to create slug from title
const createSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/--+/g, '-'); // Replace multiple - with single -
};

export default function AndMoreService({ children }: AndMoreServiceProps) {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === 'dark';
  const themeColors = colors.colors;
  
  const mouse1Ref = useRef(null);
  const mouse2Ref = useRef(null);
  const mouse3Ref = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Animation pour le premier mouse (petit)
    gsap.to(mouse1Ref.current, {
      x: 100,
      y: 80,
      rotation: -45,
      scrollTrigger: {
        trigger: "#plus-de-service",
        start: "top bottom",
        end: "bottom top",
        scrub: 10
      }
    });

    // Animation pour le deuxième mouse (grand)
    gsap.to(mouse2Ref.current, {
      x: -80,
      y: 120,
      rotation: 65,
      scrollTrigger: {
        trigger: "#plus-de-service",
        start: "top bottom",
        end: "bottom top",
        scrub: 1.2
      }
    });

    // Animation pour le troisième mouse (moyen)
    gsap.to(mouse3Ref.current, {
      x: 90,
      y: -100,
      rotation: 85,
      scrollTrigger: {
        trigger: "#plus-de-service",
        start: "top bottom",
        end: "bottom top",
        scrub: 0.8
      }
    });
  }, []);

  // Fonction pour obtenir l'opacité de la carte basée sur sa position
  const getCardStyle = (id: number) => {
    const baseOpacity = isDark ? '1A' : '33';
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    
    const baseStyle = {
      backgroundColor: hoveredId === id 
        ? themeColors.primary.main 
        : `${themeColors.primary.main}${id === 5 ? (isDark ? '40' : '60') : baseOpacity}`,
    };

    if (isMobile) {
      return baseStyle;
    }

    // Carte du milieu en surbrillance (id 5)
    if (id === 5) {
      return {
        ...baseStyle,
        transform: 'translateX(50px)',
        zIndex: 2
      };
    }

    return {
      ...baseStyle,
      transform: id >= 4 && id <= 6 ? 'translateX(50px)' : 'none',
      zIndex: 1
    };
  };

  // Ajout d'un effet pour détecter le changement de taille d'écran
  useEffect(() => {
    const handleResize = () => {
      // Force un re-render quand la taille de l'écran change
      setHoveredId(null);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section id="plus-de-service" className="w-full relative py-12 md:py-10 overflow-hidden">
      {/* Decorative Mouse Elements */}
      <div ref={mouse1Ref} className="absolute top-20 left-[10%] w-[46px] h-[45px] transform rotate-[-15deg] hidden md:block" style={{ zIndex: 1 }}>
        <svg width="46" height="45" viewBox="0 0 46 45" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M45.0146 35.3088C46.9298 40.5262 41.8604 45.5956 36.643 43.6804L3.84584 31.6409C-0.995415 29.8637 -0.872338 22.9743 4.0293 21.3712L14.5981 17.9146C17.6999 16.9001 20.0918 14.406 20.9756 11.2644L23.0275 3.9706C24.4554 -1.10461 31.5466 -1.3798 33.3634 3.5695L45.0146 35.3088Z" fill={`${themeColors.primary.main}93`}/>
        </svg>
      </div>
      <div ref={mouse2Ref} className="absolute top-[20%] right-[10%] w-[92px] h-[90px] transform rotate-[25deg] hidden md:block" style={{ zIndex: 1 }}>
        <svg width="92" height="90" viewBox="0 0 46 45" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M45.0146 35.3088C46.9298 40.5262 41.8604 45.5956 36.643 43.6804L3.84584 31.6409C-0.995415 29.8637 -0.872338 22.9743 4.0293 21.3712L14.5981 17.9146C17.6999 16.9001 20.0918 14.406 20.9756 11.2644L23.0275 3.9706C24.4554 -1.10461 31.5466 -1.3798 33.3634 3.5695L45.0146 35.3088Z" fill={`${themeColors.primary.main}73`}/>
        </svg>
      </div>
      <div ref={mouse3Ref} className="absolute bottom-200 left-[15%] w-[69px] h-[67.5px] transform rotate-[45deg] hidden md:block" style={{ zIndex: 1 }}>
        <svg width="69" height="67.5" viewBox="0 0 46 45" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M45.0146 35.3088C46.9298 40.5262 41.8604 45.5956 36.643 43.6804L3.84584 31.6409C-0.995415 29.8637 -0.872338 22.9743 4.0293 21.3712L14.5981 17.9146C17.6999 16.9001 20.0918 14.406 20.9756 11.2644L23.0275 3.9706C24.4554 -1.10461 31.5466 -1.3798 33.3634 3.5695L45.0146 35.3088Z" fill={`${themeColors.primary.main}83`}/>
        </svg>
      </div>

      {/* Gradient background */}
      <div 
        className="absolute inset-0 z-0 transition-colors duration-300"
        style={{
          background: isDark 
            ? `linear-gradient(to bottom, ${themeColors.common.black}, ${themeColors.primary.main}33, ${themeColors.primary.main})`
            : `linear-gradient(to bottom, ${themeColors.common.white}, ${themeColors.primary.main}1A, ${themeColors.primary.main})`
        }}
      />

      {/* Grain effect overlay */}
      <div 
        className={cn(
          "absolute inset-0 z-0 mix-blend-soft-light",
          isDark ? "opacity-90" : "opacity-50"
        )}
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.7\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'0.8\'/%3E%3C/svg%3E")',
          backgroundRepeat: 'repeat',
          backgroundSize: '100px 100px'
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-[1250px] mx-auto px-4">
        <h2 className={cn(
          "text-3xl sm:text-4xl md:text-5xl lg:text-[50px]",
          "font-medium tracking-[-1px]",
          "text-black/90 dark:text-white/90",
          "leading-[1.1]",
          "mb-12 md:mb-20 text-center transition-colors duration-300"
        )}>
          Et bien plus
        </h2>
        <div className="relative w-full mb-8 md:mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-4">
            {services.map((service) => {
              const cardStyle = getCardStyle(service.id);
              const slug = createSlug(service.title);
              return (
                <Link
                  key={service.id}
                  href={`/services/${slug}`}
                  className="block group/link"
                >
                  <div
                    className={cn(
                      "relative p-4 md:p-6 rounded-2xl md:rounded-3xl cursor-pointer",
                      "transition-all duration-300 backdrop-blur-sm",
                      "group"
                    )}
                    style={{
                      ...cardStyle,
                      border: isDark ? 'none' : '1px solid rgba(0, 0, 0, 0.1)'
                    }}
                    onMouseEnter={() => setHoveredId(service.id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    <div className="flex items-start gap-3 md:gap-4">
                      <div className={cn(
                        "w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl",
                        "flex items-center justify-center flex-shrink-0 transition-all duration-300"
                      )}
                      style={{
                        backgroundColor: hoveredId === service.id ? themeColors.common.black : themeColors.primary.main,
                        color: hoveredId === service.id ? themeColors.primary.main : themeColors.common.black
                      }}>
                        {service.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg md:text-xl font-medium mb-2 line-clamp-1 transition-colors duration-300"
                          style={{
                            color: hoveredId === service.id ? themeColors.common.black : (isDark ? themeColors.common.white : themeColors.common.black)
                          }}>
                          {service.title}
                        </h3>
                        <p className="text-sm line-clamp-3 md:line-clamp-none transition-colors duration-300"
                          style={{
                            color: hoveredId === service.id ? `${themeColors.common.black}B3` : (isDark ? `${themeColors.common.white}B3` : `${themeColors.common.black}B3`)
                          }}>
                          {service.description}
                        </p>
                      </div>
                      <div className={cn(
                        "w-8 h-8 md:w-10 md:h-10 rounded-full border flex items-center justify-center flex-shrink-0",
                        "transition-all duration-300"
                      )}
                      style={{
                        borderColor: hoveredId === service.id 
                          ? themeColors.common.black
                          : isDark 
                            ? `${themeColors.common.white}4D`
                            : `${themeColors.common.black}4D`,
                        backgroundColor: hoveredId === service.id 
                          ? themeColors.common.black
                          : 'transparent'
                      }}>
                        <svg 
                          width="16" 
                          height="16" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          xmlns="http://www.w3.org/2000/svg"
                          className={cn(
                            "w-4 h-4 md:w-5 md:h-5 transition-all duration-300",
                            hoveredId === service.id ? "rotate-[-45deg]" : ""
                          )}
                          style={{
                            stroke: hoveredId === service.id 
                              ? themeColors.primary.main
                              : isDark 
                                ? themeColors.common.white
                                : themeColors.common.black
                          }}
                        >
                          <path 
                            d="M5 12H19M19 12L12 5M19 12L12 19" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Team Section */}
        <div id="team-section">
          {children}
        </div>

        {/* CTA Section */}
        <div className="flex justify-center mt-8 md:mt-12">
          <CTAButton 
            href="/equipe" 
            variant="simple"
            simpleVariant="secondary"
            className={cn(
              "!bg-black hover:!bg-white",
              "!text-white hover:!text-black",
              "[&_svg]:!text-white [&_svg]:!stroke-white hover:[&_svg]:!text-black hover:[&_svg]:!stroke-black",
              "[&_span]:border-white hover:[&_span]:border-black"
            )}
          >
            Rejoignez Uclic
          </CTAButton>
        </div>
      </div>
    </section>
  );
} 