"use client";

import { useState, useEffect, useRef, ReactNode, useMemo, memo } from 'react';
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { colors } from '@/config/theme';
import Link from 'next/link';
import { CTAButton } from "@/components/ui/cta-button";
import { ArrowIcon } from "@/components/ui/icons/ArrowIcon";
import { CheckmarksIcon } from "@/components/ui/icons/CheckmarksIcon";
import React from 'react';
import 'remixicon/fonts/remixicon.css';

const services = [
  {
    id: 1,
    title: "Lorem ipsum dolor sit",
    description: "Lorem ipsum dolor sit amet consectetur adipiscing elit...",
    icon: <CheckmarksIcon />,
  },
  {
    id: 2,
    title: "Lorem ipsum dolor sit",
    description: "Lorem ipsum dolor sit amet consectetur adipiscing elit...",
    icon: <CheckmarksIcon />,
  },
  {
    id: 3,
    title: "Lorem ipsum dolor sit",
    description: "Lorem ipsum dolor sit amet consectetur adipiscing elit...",
    icon: <CheckmarksIcon />,
  },
  {
    id: 4,
    title: "Lorem ipsum dolor sit",
    description: "Lorem ipsum dolor sit amet consectetur adipiscing elit...",
    icon: <CheckmarksIcon />,
  },
  {
    id: 5,
    title: "Lorem ipsum dolor sit",
    description: "Lorem ipsum dolor sit amet consectetur adipiscing elit...",
    icon: <CheckmarksIcon />,
  },
  {
    id: 6,
    title: "Lorem ipsum dolor sit",
    description: "Lorem ipsum dolor sit amet consectetur adipiscing elit...",
    icon: <CheckmarksIcon />,
  },
  {
    id: 7,
    title: "Lorem ipsum dolor sit",
    description: "Lorem ipsum dolor sit amet consectetur adipiscing elit...",
    icon: <CheckmarksIcon />,
  },
  {
    id: 8,
    title: "Lorem ipsum dolor sit",
    description: "Lorem ipsum dolor sit amet consectetur adipiscing elit...",
    icon: <CheckmarksIcon />,
  },
  {
    id: 9,
    title: "Lorem ipsum dolor sit",
    description: "Lorem ipsum dolor sit amet consectetur adipiscing elit...",
    icon: <CheckmarksIcon />,
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

// Memoized decorative mouse SVG component
const DecorativeMouse = memo(({ fill }: { fill: string }) => (
  <svg width="46" height="45" viewBox="0 0 46 45" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M45.0146 35.3088C46.9298 40.5262 41.8604 45.5956 36.643 43.6804L3.84584 31.6409C-0.995415 29.8637 -0.872338 22.9743 4.0293 21.3712L14.5981 17.9146C17.6999 16.9001 20.0918 14.406 20.9756 11.2644L23.0275 3.9706C24.4554 -1.10461 31.5466 -1.3798 33.3634 3.5695L45.0146 35.3088Z" fill={fill}/>
  </svg>
));

DecorativeMouse.displayName = 'DecorativeMouse';

// Memoized service card component
const ServiceCard = memo(({ 
  service, 
  hoveredId, 
  onHover, 
  isDark, 
  themeColors 
}: { 
  service: typeof services[0], 
  hoveredId: number | null, 
  onHover: (id: number | null) => void,
  isDark: boolean,
  themeColors: typeof colors.colors
}) => {
  const cardStyle = useMemo(() => {
    const baseOpacity = isDark ? '1A' : '33';
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    
    const baseStyle = {
      backgroundColor: hoveredId === service.id 
        ? themeColors.primary.main 
        : `${themeColors.primary.main}${service.id === 5 ? (isDark ? '40' : '60') : baseOpacity}`,
    };

    if (isMobile) return baseStyle;

    return {
      ...baseStyle,
      transform: service.id === 5 ? 'translateX(50px)' : 
                (service.id >= 4 && service.id <= 6) ? 'translateX(50px)' : 'none',
      zIndex: service.id === 5 ? 2 : 1
    };
  }, [service.id, hoveredId, isDark, themeColors]);

  const slug = useMemo(() => createSlug(service.title), [service.title]);

              return (
                <Link
                  key={service.id}
                  href={`/services/${slug}`}
                  className="block group/link"
      aria-label={`En savoir plus sur ${service.title}`}
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
        onMouseEnter={() => onHover(service.id)}
        onMouseLeave={() => onHover(null)}
        role="article"
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
                      <ArrowIcon 
                        className={cn(
                          "w-8 h-8 md:w-10 md:h-10 flex-shrink-0 transition-all duration-300",
                          hoveredId === service.id ? "rotate-[-45deg]" : "",
                          hoveredId === service.id 
                            ? "[&_circle]:fill-black [&_path]:stroke-white"
                            : isDark 
                              ? "[&_circle]:fill-transparent [&_path]:stroke-white"
                              : "[&_circle]:fill-transparent [&_path]:stroke-black"
                        )}
                      />
                    </div>
                  </div>
                </Link>
              );
});

ServiceCard.displayName = 'ServiceCard';

export default function AndMoreService({ children }: AndMoreServiceProps) {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === 'dark';
  const themeColors = colors.colors;
  
  const sectionRef = useRef<HTMLElement>(null);
  const mouse1Ref = useRef(null);
  const mouse2Ref = useRef(null);
  const mouse3Ref = useRef(null);

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

  // Memoize background gradient style
  const backgroundStyle = useMemo(() => ({
    background: isDark 
      ? `linear-gradient(to bottom, ${themeColors.common.black}, ${themeColors.primary.main}33, ${themeColors.primary.main})`
      : `linear-gradient(to bottom, ${themeColors.common.white}, ${themeColors.primary.main}1A, ${themeColors.primary.main})`
  }), [isDark, themeColors]);

  return (
    <section 
      ref={sectionRef} 
      id="plus-de-service" 
      className="w-full relative py-12 md:py-10 overflow-hidden"
      aria-label="Services supplémentaires"
    >
      {/* Decorative Mouse Elements with proper aria-hidden */}
      <div 
        ref={mouse1Ref} 
        className={cn(
          "absolute top-20 left-[10%] w-[46px] h-[45px] transform rotate-[-15deg] hidden md:block transition-transform duration-1000 ease-out",
          isVisible && "translate-x-[100px] translate-y-[80px] -rotate-[45deg]"
        )} 
        style={{ zIndex: 1 }}
        aria-hidden="true"
      >
        <DecorativeMouse fill={`${themeColors.primary.main}93`} />
      </div>
      <div 
        ref={mouse2Ref} 
        className={cn(
          "absolute top-[20%] right-[10%] w-[92px] h-[90px] transform rotate-[25deg] hidden md:block transition-transform duration-1000 ease-out",
          isVisible && "translate-x-[-80px] translate-y-[120px] rotate-[65deg]"
        )} 
        style={{ zIndex: 1 }}
      >
        <svg width="92" height="90" viewBox="0 0 46 45" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M45.0146 35.3088C46.9298 40.5262 41.8604 45.5956 36.643 43.6804L3.84584 31.6409C-0.995415 29.8637 -0.872338 22.9743 4.0293 21.3712L14.5981 17.9146C17.6999 16.9001 20.0918 14.406 20.9756 11.2644L23.0275 3.9706C24.4554 -1.10461 31.5466 -1.3798 33.3634 3.5695L45.0146 35.3088Z" fill={`${themeColors.primary.main}73`}/>
        </svg>
      </div>
      <div 
        ref={mouse3Ref} 
        className={cn(
          "absolute bottom-200 left-[15%] w-[69px] h-[67.5px] transform rotate-[45deg] hidden md:block transition-transform duration-1000 ease-out",
          isVisible && "translate-x-[90px] translate-y-[-100px] rotate-[85deg]"
        )} 
        style={{ zIndex: 1 }}
      >
        <svg width="69" height="67.5" viewBox="0 0 46 45" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M45.0146 35.3088C46.9298 40.5262 41.8604 45.5956 36.643 43.6804L3.84584 31.6409C-0.995415 29.8637 -0.872338 22.9743 4.0293 21.3712L14.5981 17.9146C17.6999 16.9001 20.0918 14.406 20.9756 11.2644L23.0275 3.9706C24.4554 -1.10461 31.5466 -1.3798 33.3634 3.5695L45.0146 35.3088Z" fill={`${themeColors.primary.main}83`}/>
        </svg>
      </div>

      {/* Gradient background with memoized style */}
      <div 
        className="absolute inset-0 z-0 transition-colors duration-300"
        style={backgroundStyle}
        aria-hidden="true"
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
          <div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-4"
            role="list"
          >
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                hoveredId={hoveredId}
                onHover={setHoveredId}
                isDark={isDark}
                themeColors={themeColors}
              />
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div id="team-section" role="region" aria-label="Notre équipe">
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