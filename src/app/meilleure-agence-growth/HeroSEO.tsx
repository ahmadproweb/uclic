"use client";

import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import React, { memo } from "react";
import HeroBackground from "@/components/pages/home/hero/HeroBackground";

// Memoized main heading component
const MainHeading = memo(function MainHeading() {
  return (
    <h1 className="inline-flex items-center px-3 sm:px-4 py-1.5 bg-[#9FB832]/10 dark:bg-[#E0FF5C]/10 rounded-full text-[#9FB832] dark:text-[#E0FF5C] text-sm sm:text-base font-medium relative z-10 mb-2">
      <span className="w-2 h-2 bg-[#9FB832] dark:bg-[#E0FF5C] rounded-full mr-2 animate-pulse"></span>
      Classement Agences Growth 2024
    </h1>
  );
});

// Memoized vision text component
const VisionText = memo(function VisionText() {
  return (
    <h2
      className={cn(
        "text-4xl sm:text-4xl md:text-5xl lg:text-[64px]",
        "font-semibold mb-4 sm:mb-6 leading-[1.1]",
        "tracking-[-0.04em]",
        "text-rendering-optimizeLegibility",
        "will-change-transform",
        "text-[#000] dark:text-[#F5F5F1]",
        "whitespace-pre-line"
      )}
    >
      {`Top 7 Meilleures\n`}
      {`Agences Growth\n`}
      {`France 2024`}
    </h2>
  );
});

// Memoized description component
const Description = memo(function Description() {
  return (
    <p
      className={cn(
        "text-base md:text-lg mt-6 mb-8 md:mb-2 max-w-2xl mx-auto text-center",
        "leading-relaxed tracking-[-0.01em]",
        "text-rendering-optimizeLegibility",
        "subpixel-antialiased",
        "text-[#000] dark:text-[#F5F5F1]"
      )}
    >
      Découvrez le classement complet des meilleures agences Growth de France.
      Comparatif exclusif avec scores, spécialités et avis clients.
    </p>
  );
});

const HeroSEO = () => {
  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === "dark";

  return (
    <section className={cn(
      "relative z-10 min-h-[calc(70vh-var(--header-height))] flex items-center pt-28 sm:pt-32 md:pt-36 overflow-hidden",
      isDark ? "bg-black" : "bg-white"
    )}>
      <div className="relative z-10 w-full max-w-[1250px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center text-center">
          <div className="w-full">
            <MainHeading />
            <VisionText />
            <Description />
          </div>
        </div>
      </div>

      <HeroBackground />
    </section>
  );
};

export default memo(HeroSEO);
