'use client';

import { cn } from "@/lib/utils";
import HeroClient from './HeroClient';
import HeroAnimation from './HeroAnimation';
import { CTAButton } from "@/components/ui/cta-button";
import HeroBackground from './HeroBackground';
import { useTheme } from "@/context/ThemeContext";

export default function Hero() {
  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === 'dark';

  return (
    <section className="relative w-full min-h-[calc(60vh-var(--header-height))] flex items-center justify-center overflow-hidden">
      <HeroBackground />

      {/* Contenu principal */}
      <div className="relative z-10 w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-6 lg:gap-8 items-center mt-4 sm:mt-6 md:mt-0 px-4 sm:px-6 lg:px-8 pt-20 pb-24 sm:pb-0 sm:pt-24 md:pt-12">
        {/* Colonne de gauche - Texte */}
        <div className="max-w-full lg:max-w-2xl text-left">
          <div className="inline-block px-4 py-1.5 bg-[#9FB832]/10 dark:bg-[#E0FF5C]/10 rounded-full mb-4 mt-16">
            <span className="text-[#9FB832] dark:text-[#E0FF5C] text-sm font-medium">Freelance Growth</span>
          </div>
          <h1 className={cn(
            "text-4xl sm:text-4xl md:text-5xl lg:text-[64px]",
            "font-semibold mb-4 sm:mb-6 leading-[1.1]",
            "text-[#000000] dark:text-[#F5F5F1]",
            "tracking-[-0.04em]",
            "text-rendering-optimizeLegibility"
          )}>
            <span className="block mb-0.5 text-[#000000] dark:text-[#F5F5F1]">Une vision 360°,</span>
            <span className="block mb-0.5 text-[#000000] dark:text-[#F5F5F1]">des actions là où</span>
            <span className="block text-[#000000] dark:text-[#F5F5F1]">
              l&apos;impact est{' '}
              <span className="inline-block font-bold relative">
                <span className="relative z-10 text-[#9FB832] dark:text-[#E0FF5C]">
                  maximal
                </span>
                <span 
                  className="absolute bottom-[-8px] left-[10%] w-[80%] h-[6px] -z-10 bg-[#9FB832]/20 dark:bg-[#E0FF5C]/20"
                />
              </span>
            </span>
          </h1>

          <p className={cn(
            "text-base md:text-lg mt-6 mb-8 md:mb-12 max-w-xl pr-4",
            "text-black dark:text-white font-[450]",
            "leading-relaxed tracking-[-0.01em]"
          )}>
            Nous convertissons vos défis en leviers
            de croissance avec des stratégies
            data-driven, des outils IA avancés
            et les meilleurs freelances
            sélectionnés pour vos besoins.
          </p>

          <div className="flex flex-row gap-3">
            <CTAButton 
              href="/audit" 
              className={cn(
                "text-base sm:text-lg",
                isDark 
                  ? "bg-[#fff] text-black hover:bg-[#E0FF5C]/90 hover:text-black [&_svg]:stroke-black hover:[&_svg]:stroke-black [&_span]:border-black hover:[&_span]:border-black"
                  : "bg-[#E0FF5C] text-black hover:bg-black hover:text-white"
              )}
            >
              Audit Gratuit
            </CTAButton>

            <CTAButton 
              href="/contact" 
              variant="simple" 
              simpleVariant="secondary" 
              size="l" 
              className={cn(
                "px-4",
                isDark 
                  ? "!bg-transparent !text-white hover:!bg-black/80 [&_svg]:!block [&_svg]:!text-white [&_svg]:!stroke-white [&_span]:border-white hover:[&_span]:border-white"
                  : "[&>svg]:hidden md:[&>svg]:inline-flex [&>span]:hidden md:[&>span]:inline-flex hover:text-white hover:bg-black"
              )}
            >
              Nous Contacter
            </CTAButton>
          </div>
        </div>

        {/* Colonne de droite - Animation */}
        <div className="relative">
          <div className="mx-auto lg:mx-0 lg:ml-auto">
            <HeroAnimation />
          </div>
        </div>
      </div>

      {/* HeroClient pour les animations */}
      <HeroClient />
    </section>
  );
} 