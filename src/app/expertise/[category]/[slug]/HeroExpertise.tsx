'use client';

import React from 'react';
import { CTAButton } from "@/components/ui/cta-button";
import ExpertiseContactForm from './ExpertiseContactForm';
import HeroBackgroundExpertise from './HeroBackgroundExpertise';
import { useTheme } from "@/context/ThemeContext";

interface HeroExpertiseProps {
  expertise: {
    expertiseFields?: {
      tag?: string;
      h1?: string;
      subtitle?: string;
    };
    title: string;
  };
}

export default function HeroExpertise({ expertise }: HeroExpertiseProps) {
  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === 'dark';

  return (
    <section className="relative min-h-[calc(70vh-var(--header-height))] flex items-center pt-28 sm:pt-32 md:pt-36 overflow-hidden">
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="max-w-2xl">
            {expertise.expertiseFields?.tag && (
              <h1 className="inline-flex px-3 sm:px-4 py-1.5 bg-[#9FB832]/10 dark:bg-[#E0FF5C]/10 rounded-full text-[#9FB832] dark:text-[#E0FF5C] text-sm sm:text-base font-medium relative z-10 mb-4 sm:mb-6 md:mb-8">
                {expertise.expertiseFields.tag}
              </h1>
            )}
            <h2 className="text-4xl sm:text-4xl md:text-5xl lg:text-[64px] font-semibold mb-4 sm:mb-6 leading-[1.1] tracking-[-0.04em] text-rendering-optimizeLegibility will-change-transform text-[#000] dark:text-[#F5F5F1] whitespace-pre-line">
              {expertise.expertiseFields?.h1 || expertise.title}
            </h2>
            {expertise.expertiseFields?.subtitle && (
              <p className="text-base md:text-lg mt-6 mb-8 md:mb-2 max-w-xl pr-4 leading-relaxed tracking-[-0.01em] font-absans font-normal text-rendering-optimizeLegibility subpixel-antialiased text-[#000] dark:text-[#F5F5F1]">
                {expertise.expertiseFields.subtitle}
              </p>
            )}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
              <div className="flex items-center">
                <CTAButton 
                  href="/contact" 
                  variant={isDark ? "mainCTA" : "shiny"}
                  className="group"
                >
                  Nous Contacter
                </CTAButton>
              </div>
            </div>
          </div>

          <div className="relative flex flex-col items-center justify-center w-full h-full">
            <ExpertiseContactForm />
          </div>
        </div>
      </div>
      
      <HeroBackgroundExpertise />
    </section>
  );
} 