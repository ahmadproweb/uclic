'use client';

import React from 'react';
import { CTAButton } from "@/components/ui/cta-button";
import ExpertiseContactForm from './[slug]/ExpertiseContactForm';
import HeroBackgroundExpertise from './HeroBackgroundExpertise';
import { useTheme } from "@/context/ThemeContext";
import Link from 'next/link';

interface HeroExpertiseProps {
  categoryName: string;
  category: string;
}

export default function HeroExpertise({ categoryName, category }: HeroExpertiseProps) {
  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === 'dark';

  return (
    <section className="relative min-h-[calc(70vh-var(--header-height))] flex items-center pt-28 sm:pt-32 md:pt-36 overflow-hidden">
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="max-w-2xl">
            <nav className="mb-8">
              <ol className="flex items-center space-x-4 text-sm">
                <li>
                  <Link href="/expertise" className="text-gray-600 dark:text-gray-400 hover:text-[#E0FF5C] dark:hover:text-[#E0FF5C]">
                    Expertises
                  </Link>
                </li>
                <li className="text-gray-400 dark:text-gray-600">/</li>
                <li className="text-[#E0FF5C]">{categoryName}</li>
              </ol>
            </nav>
            <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-[64px] font-semibold mb-4 sm:mb-6 leading-[1.1] tracking-[-0.04em] text-rendering-optimizeLegibility will-change-transform text-[#000] dark:text-[#F5F5F1]">
              {categoryName}
            </h1>
            <div className="w-12 h-0.5 mb-6 bg-gray-900 dark:bg-[#E0FF5C]"/>
            <p className="text-base md:text-lg mt-6 mb-8 md:mb-2 max-w-xl pr-4 leading-relaxed tracking-[-0.01em] font-absans font-normal text-rendering-optimizeLegibility subpixel-antialiased text-[#000] dark:text-[#F5F5F1]">
              Découvrez nos expertises en {categoryName} et comment nous pouvons vous aider à atteindre vos objectifs.
            </p>
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