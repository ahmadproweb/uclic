'use client';

import { cn } from "@/lib/utils";
import HeroClient from './HeroClient';
import HeroAnimation from './HeroAnimation';
import { CTAButton } from "@/components/ui/cta-button";
import HeroBackground from './HeroBackground';
import { useTheme } from "@/context/ThemeContext";
import { Suspense, memo } from 'react';

// Memoized badge component
const Badge = memo(function Badge() {
  return (
    <span className="inline-block px-4 py-1.5 bg-[#9FB832]/10 dark:bg-[#E0FF5C]/10 rounded-full text-[#9FB832] dark:text-[#E0FF5C] text-sm font-medium mb-6 md:mb-8">
      Freelance Growth
    </span>
  );
});

// Memoized heading component
const Heading = memo(function Heading() {
  return (
    <h1 className={cn(
      "text-4xl sm:text-4xl md:text-5xl lg:text-[64px]",
      "font-semibold mb-4 sm:mb-6 leading-[1.1]",
      "text-[#000] dark:text-[#F5F5F1]",
      "tracking-[-0.04em]",
      "text-rendering-optimizeLegibility"
    )}>
      <span className="block text-[#000] dark:text-[#F5F5F1]">Une vision 360°,</span>
      <span className="block text-[#000] dark:text-[#F5F5F1]">des actions là où</span>
      <span className="block text-[#000] dark:text-[#F5F5F1]">
        l&apos;impact est{' '}
        <span className="inline-block font-bold relative">
          <span className="relative z-10 text-[#9FB832] dark:text-[#E0FF5C]">maximal</span>
          <span className="absolute bottom-[-8px] left-[10%] w-[80%] h-[6px] -z-10 bg-[#9FB832]/20 dark:bg-[#E0FF5C]/20" />
        </span>
      </span>
    </h1>
  );
});

// Memoized subheading component
const Subheading = memo(function Subheading() {
  return (
    <h2 className={cn(
      "text-base md:text-lg mt-6 mb-8 md:mb-12 max-w-xl pr-4",
      "text-[#000] dark:text-[#F5F5F1]",
      "leading-relaxed tracking-[-0.01em]",
      "font-absans font-normal",
      "text-rendering-optimizeLegibility",
      "will-change-auto",
      "[text-wrap:balance]",
      "subpixel-antialiased"
    )}
    aria-label="Description principale"
    >
      <span 
        className="text-[#000] dark:text-[#F5F5F1] block"
        style={{ contentVisibility: 'auto' }}
      >
        Nous convertissons vos défis en leviers de croissance avec des stratégies data-driven, des outils IA avancés et les meilleurs freelances sélectionnés pour vos besoins.
      </span>
    </h2>
  );
});

// Memoized CTA buttons component
const CTAButtons = memo(function CTAButtons({ isDark }: { isDark: boolean }) {
  return (
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
  );
});

export default function Hero() {
  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === 'dark';

  return (
    <section 
      className="relative w-full min-h-[calc(60vh-var(--header-height))] flex items-center justify-center overflow-hidden pt-16 md:pt-24"
      aria-labelledby="hero-title"
    >
      <HeroBackground />

      <div className="relative z-10 w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-6 lg:gap-8 items-center mt-4 sm:mt-6 md:mt-0 px-4 sm:px-6 lg:px-8 pt-20 pb-24 sm:pb-0 sm:pt-24 md:pt-12">
        <div className="max-w-full lg:max-w-2xl text-left">
          <Badge />
          <Heading />
          <Subheading />
          <CTAButtons isDark={isDark} />
        </div>

        <Suspense 
          fallback={
            <div className="h-full w-full flex items-center justify-center">
              <div className="w-full h-full bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg" />
            </div>
          }
        >
          <div className="relative">
            <div className="mx-auto lg:mx-0 lg:ml-auto">
              <HeroAnimation />
            </div>
          </div>
        </Suspense>
      </div>

      <Suspense>
        <HeroClient />
      </Suspense>
    </section>
  );
} 