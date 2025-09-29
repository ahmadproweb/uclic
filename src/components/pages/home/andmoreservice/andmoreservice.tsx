"use client";

import { useState, useEffect, useRef, ReactNode, useMemo, memo } from 'react';
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { colors } from '@/config/theme';
import Link from 'next/link';
import { CTAButton } from "@/components/ui/cta-button";
import React from 'react';
import { getAllExpertiseGrowthCategoriesForMenu } from '@/lib/wordpress';

interface Category {
  name: string;
  slug: string;
  description?: string;
}

interface AndMoreServiceProps {
  children: ReactNode;
}

// Memoized decorative mouse SVG component
const DecorativeMouse = memo(({ fill }: { fill: string }) => (
  <i 
    className="ri-navigation-fill text-4xl md:text-5xl"
    style={{ color: fill }}
  />
));

DecorativeMouse.displayName = 'DecorativeMouse';

// Memoized service card component
const ServiceCard = memo(({ 
  service, 
  hoveredId, 
  onHover, 
  isDark, 
  themeColors,
  index 
}: { 
  service: Category, 
  hoveredId: string | null, 
  onHover: (id: string | null) => void,
  isDark: boolean,
  themeColors: typeof colors.colors,
  index: number
}) => {
  const cardStyle = useMemo(() => {
    const baseOpacity = isDark ? '1A' : '33';
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    
    const baseStyle = {
      backgroundColor: hoveredId === service.slug 
        ? themeColors.primary.main 
        : `${themeColors.primary.main}${index === 4 ? (isDark ? '40' : '60') : baseOpacity}`,
    };

    if (isMobile) return baseStyle;

    return {
      ...baseStyle,
      transform: index === 4 ? 'translateX(50px)' : 
                (index >= 3 && index <= 5) ? 'translateX(50px)' : 'none',
      zIndex: index === 4 ? 2 : 1
    };
  }, [service.slug, hoveredId, isDark, themeColors, index]);

  return (
    <Link
      href={service.slug === 'automatisation' ? '/expertise/growth-marketing' : `/expertise/${service.slug}`}
      className="block group/link h-full"
      aria-label={`En savoir plus sur ${service.name}`}
    >
      <div
        className={cn(
          "relative p-4 md:p-6 rounded-2xl md:rounded-3xl cursor-pointer",
          "transition-all duration-300 backdrop-blur-sm",
          "group h-full flex flex-col"
        )}
        style={{
          ...cardStyle,
          border: isDark ? 'none' : '1px solid rgba(0, 0, 0, 0.1)'
        }}
        onMouseEnter={() => onHover(service.slug)}
        onMouseLeave={() => onHover(null)}
        role="article"
      >
        <div className="flex items-start gap-3 md:gap-4 h-full">
          <div className={cn(
            "w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl",
            "flex items-center justify-center flex-shrink-0 transition-all duration-300"
          )}
          style={{
            backgroundColor: hoveredId === service.slug ? themeColors.common.black : themeColors.primary.main,
            color: hoveredId === service.slug ? themeColors.primary.main : themeColors.common.black
          }}>
            <i className="ri-gemini-fill text-xl md:text-2xl" aria-hidden="true" />
          </div>
          <div className="flex-1 min-w-0 flex flex-col h-full">
            <h3 className="text-lg md:text-xl font-medium mb-2 line-clamp-1 transition-colors duration-300"
              style={{
                color: hoveredId === service.slug ? themeColors.common.black : (isDark ? themeColors.common.white : themeColors.common.black)
              }}>
              <span className="sr-only">Freelance </span>{service.name}
            </h3>
            <p className="text-sm line-clamp-3 md:line-clamp-none transition-colors duration-300 flex-grow"
              style={{
                color: hoveredId === service.slug ? `${themeColors.common.black}B3` : (isDark ? `${themeColors.common.white}B3` : `${themeColors.common.black}B3`)
              }}>
              {service.description || `Découvrez nos services ${service.name}`}
            </p>
          </div>
          <div className={cn(
            "flex items-center justify-center",
            "w-8 h-8 md:w-10 md:h-10 rounded-full border",
            "transition-all duration-300",
            isDark 
              ? "text-white border-white group-hover/link:text-white group-hover/link:bg-black group-hover/link:border-black"
              : "text-black border-black group-hover/link:text-white group-hover/link:bg-black group-hover/link:border-black"
          )}>
            <i className={cn(
              "ri-arrow-right-line text-lg md:text-xl",
              "-rotate-45 group-hover/link:rotate-0 transition-all duration-300"
            )} aria-hidden="true" />
          </div>
        </div>
      </div>
    </Link>
  );
});

ServiceCard.displayName = 'ServiceCard';

export default function AndMoreService({ children }: AndMoreServiceProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === 'dark';
  const themeColors = colors.colors;
  
  const sectionRef = useRef<HTMLElement>(null);
  const mouse1Ref = useRef(null);
  const mouse2Ref = useRef(null);
  const mouse3Ref = useRef(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const cats = await getAllExpertiseGrowthCategoriesForMenu();
      // Ajouter la catégorie Automatisation
      const allCategories = [...cats, {
        name: "Automatisation",
        slug: "automatisation",
        description: "Optimisez vos processus avec nos solutions d'automatisation"
      }];
      setCategories(allCategories);
    };
    fetchCategories();
  }, []);

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
      className="w-full relative py-16 md:py-20 overflow-hidden"
      aria-label="Services supplémentaires"
    >
      {/* Decorative Mouse Elements with proper aria-hidden */}
      <div 
        ref={mouse1Ref}
        className={cn(
          "absolute top-20 left-[10%] transform rotate-[-15deg] hidden md:block transition-transform duration-1000 ease-out",
          isVisible && "translate-x-[100px] translate-y-[80px] -rotate-[45deg]"
        )} 
        style={{ zIndex: 1 }}
        aria-hidden="true"
      >
        <i className="ri-navigation-fill text-4xl" style={{ color: `${themeColors.primary.main}93` }} />
      </div>
      <div 
        ref={mouse2Ref}
        className={cn(
          "absolute top-[20%] right-[10%] transform rotate-[25deg] hidden md:block transition-transform duration-1000 ease-out",
          isVisible && "translate-x-[-80px] translate-y-[120px] rotate-[65deg]"
        )} 
        style={{ zIndex: 1 }}
        aria-hidden="true"
      >
        <i className="ri-navigation-fill text-6xl" style={{ color: `${themeColors.primary.main}73` }} />
      </div>
      <div 
        ref={mouse3Ref}
        className={cn(
          "absolute bottom-200 left-[15%] transform rotate-[45deg] hidden md:block transition-transform duration-1000 ease-out",
          isVisible && "translate-x-[90px] translate-y-[-100px] rotate-[85deg]"
        )} 
        style={{ zIndex: 1 }}
        aria-hidden="true"
      >
        <i className="ri-navigation-fill text-5xl" style={{ color: `${themeColors.primary.main}83` }} />
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
        <span className={cn(
          "block text-2xl md:text-3xl mx-auto text-center",
          "font-medium tracking-[-1px]",
          "text-black/90 dark:text-white/90",
          "leading-[1.1]",
          "mb-6 md:mb-10 transition-colors duration-300"
        )}>
          Et bien plus
        </span>
        <div className="relative w-full mb-8 md:mb-16">
          <div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-4"
            role="list"
          >
            {categories.map((category, index) => (
              <div key={category.slug} role="listitem" className="h-full">
                <ServiceCard
                  service={category}
                  hoveredId={hoveredId}
                  onHover={setHoveredId}
                  isDark={isDark}
                  themeColors={themeColors}
                  index={index}
                />
              </div>
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