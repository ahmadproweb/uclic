'use client';

import React from 'react';
import { CTAButton } from "@/components/ui/cta-button";
import ExpertiseContactForm from './ExpertiseContactForm';
import HeroBackgroundExpertise from './HeroBackgroundExpertise';
import { useTheme } from "@/context/ThemeContext";
import { ExpertiseCategoryFields } from '@/lib/wordpress';
import { cn } from '@/lib/utils';

interface HeroExpertiseProps {
  categoryName: string;
  category: string;
  expertiseFields: ExpertiseCategoryFields;
}

const HeroExpertise: React.FC<HeroExpertiseProps> = ({ 
  categoryName, 
  category,
  expertiseFields 
}) => {
  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === 'dark';

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      <HeroBackgroundExpertise />
      
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="max-w-2xl">
            {expertiseFields.tag && (
              <h1 className={cn(
                "inline-flex px-3 sm:px-4 py-1.5 bg-[#9FB832]/10 dark:bg-[#E0FF5C]/10 rounded-full text-[#9FB832] dark:text-[#E0FF5C] text-sm sm:text-base font-medium relative z-10 mb-4 sm:mb-6 md:mb-8"
              )}>
                {expertiseFields.tag}
              </h1>
            )}

            <h1 className={cn(
              "text-4xl sm:text-4xl md:text-5xl lg:text-[64px] font-semibold mb-4 sm:mb-6 leading-[1.1] tracking-[-0.04em] text-rendering-optimizeLegibility will-change-transform text-[#000] dark:text-[#F5F5F1] whitespace-pre-line"
            )}>
              {expertiseFields.h1 || categoryName}
            </h1>

            {expertiseFields.subtitle && (
              <p className={cn(
                "text-base md:text-lg mt-6 mb-8 md:mb-2 max-w-xl pr-4 leading-relaxed tracking-[-0.01em] font-absans font-normal text-rendering-optimizeLegibility subpixel-antialiased text-[#000] dark:text-[#F5F5F1]"
              )}>
                {expertiseFields.subtitle}
              </p>
            )}

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
              <CTAButton 
                href={`/contact`}
                className="bg-[#E0FF5C] text-black hover:bg-black hover:text-white dark:bg-white dark:text-black dark:hover:bg-[#E0FF5C]"
              >
                Nous contacter
              </CTAButton>
             
            </div>
          </div>

          <div className="w-full max-w-xl mx-auto lg:max-w-none">
            <ExpertiseContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroExpertise; 