'use client';

import { cn } from "@/lib/utils";
import HeroAnimation from './HeroAnimation';
import { CTAButton } from "@/components/ui/cta-button";
import HeroBackground from './HeroBackground';
import { useTheme } from "@/context/ThemeContext";
import { Suspense, memo } from 'react';
import { useVideoPopup } from '@/context/VideoPopupContext';
import SocialProof from '@/components/ui/SocialProof';

// Memoized main heading component
const MainHeading = memo(function MainHeading() {
  return (
    <h1 className="inline-flex px-3 sm:px-4 py-1.5 bg-[#9FB832]/10 dark:bg-[#E0FF5C]/10 rounded-full text-[#9FB832] dark:text-[#E0FF5C] text-sm sm:text-base font-medium relative z-10 mb-4 sm:mb-6 md:mb-8">
      Freelance Growth
    </h1>
  );
});

// Memoized vision text component
const VisionText = memo(function VisionText() {
  return (
    <p className={cn(
      "text-4xl sm:text-4xl md:text-5xl lg:text-[64px]",
      "font-semibold mb-4 sm:mb-6 leading-[1.1]",
      "tracking-[-0.04em]",
      "text-rendering-optimizeLegibility",
      "will-change-transform",
      "text-[#000] dark:text-[#F5F5F1]",
      "whitespace-pre-line"
    )}>
      {`Une vision 360°,
des actions là où
l'impact est `}
      <span className="inline-block font-bold relative">
        <span className="relative z-10 text-[#9FB832] dark:text-[#E0FF5C]">maximal</span>
        <span className="absolute bottom-[-8px] left-[10%] w-[80%] h-[6px] -z-10 bg-[#9FB832]/20 dark:bg-[#E0FF5C]/20" />
      </span>
    </p>
  );
});

// Memoized description component
const Description = memo(function Description() {
  return (
    <p
      className={cn(
        "text-base md:text-lg mt-6 mb-8 md:mb-2 max-w-xl pr-4",
        "leading-relaxed tracking-[-0.01em]",
        "font-absans font-normal",
        "text-rendering-optimizeLegibility",
        "subpixel-antialiased",
        "text-[#000] dark:text-[#F5F5F1]"
      )}
    >
      Nous convertissons vos défis en leviers de croissance avec des stratégies data-driven, des outils IA avancés et les meilleurs freelances sélectionnés pour vos besoins.
    </p>
  );
});

// Memoized CTA buttons component
const CTAButtons = memo(function CTAButtons({ isDark }: { isDark: boolean }) {
  const { openVideoPopup } = useVideoPopup();

  return (
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
      <div className="flex items-center">
        <CTAButton href="/audit" variant={isDark ? "mainCTA" : "shiny"}>
          Audit Gratuit
        </CTAButton>
      </div>
      <div className="flex items-center gap-6">
        <CTAButton 
          variant="simple" 
          onClick={() => openVideoPopup(
            "GRlZO8KtB7A",
            "Wladimir Delcros Founder de Uclic invité Podcast avec Benoit Dubos de Scalezia"
          )}
        >
          Voir la vidéo
        </CTAButton>
        <SocialProof />
      </div>
    </div>
  );
});

const Hero = () => {
  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === 'dark';

  return (
    <section className="relative min-h-[calc(100vh-var(--header-height))] flex items-center pt-28 sm:pt-32 md:pt-36">
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="max-w-2xl">
            <MainHeading />
            <VisionText />
            <Description />
            <CTAButtons isDark={isDark} />
          </div>

          <div className="relative flex flex-col items-center justify-center w-full h-full">
            <div className="w-full max-w-[600px] mx-auto relative">
              <Suspense fallback={
                <div className="w-full aspect-square bg-black/5 dark:bg-white/5 rounded-3xl animate-pulse" />
              }>
                <HeroAnimation />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
      
      <HeroBackground />
    </section>
  );
};

export default memo(Hero); 