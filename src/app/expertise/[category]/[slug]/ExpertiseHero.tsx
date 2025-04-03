'use client';

import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";

import { memo, Suspense } from 'react';
import { CTAButton } from "@/components/ui/cta-button";
import HeroAnimation from "@/components/pages/home/hero/HeroAnimation";
import HeroBackground from "@/components/pages/home/hero/HeroBackground";

interface ExpertiseHeroProps {
  title: string;
  description: string;
  category: string;
  categoryDescription?: string;
}

// Memoized main heading component
const MainHeading = memo(function MainHeading({ category }: { category: string }) {
  return (
    <h1 className="inline-flex px-3 sm:px-4 py-1.5 bg-[#9FB832]/10 dark:bg-[#E0FF5C]/10 rounded-full text-[#9FB832] dark:text-[#E0FF5C] text-sm sm:text-base font-medium relative z-10 mb-4 sm:mb-6 md:mb-8">
      {category}
    </h1>
  );
});

// Memoized vision text component
const VisionText = memo(function VisionText({ title }: { title: string }) {
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
      {title}
    </p>
  );
});

// Memoized description component
const Description = memo(function Description({ description }: { description: string }) {
  return (
    <p className={cn(
      "text-base md:text-lg mt-6 mb-8 md:mb-2 max-w-xl pr-4",
      "leading-relaxed tracking-[-0.01em]",
      "font-absans font-normal",
      "text-rendering-optimizeLegibility",
      "subpixel-antialiased",
      "text-[#000] dark:text-[#F5F5F1]"
    )}>
      {description}
    </p>
  );
});

// Memoized CTA buttons component
const CTAButtons = memo(function CTAButtons({ isDark }: { isDark: boolean }) {
  return (
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
      <div className="flex items-center">
        <CTAButton href="/audit" variant={isDark ? "mainCTA" : "shiny"}>
          Audit Gratuit
        </CTAButton>
      </div>
      <div className="flex items-center">
        <CTAButton href="/contact" variant="simple">
          Nous Contacter
        </CTAButton>
      </div>
    </div>
  );
});

const ExpertiseHero = memo(function ExpertiseHero({ 
  title, 
  description, 
  category,
  categoryDescription 
}: ExpertiseHeroProps) {
  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === 'dark';

  return (
    <section className="relative min-h-[calc(100vh-var(--header-height))] flex items-center pt-28 sm:pt-32 md:pt-36">
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="max-w-2xl">
            <MainHeading category={category} />
            <VisionText title={title} />
            <Description description={description} />
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
});

export default ExpertiseHero; 