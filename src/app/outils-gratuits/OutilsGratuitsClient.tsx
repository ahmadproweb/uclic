'use client';

import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';
import { colors as theme } from '@/config/theme';
import Link from 'next/link';
import PreFooter from '@/components/footer/PreFooter';
import { ChartBar, Calculator } from 'lucide-react';

export default function OutilsGratuitsClient() {
  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === 'dark';

  return (
    <section className={cn(
      "w-full relative overflow-hidden pt-32 pb-0 md:pb-0 px-4 sm:px-6",
      isDark ? "bg-black" : "bg-white"
    )}>
      {/* Subtle top halo background */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 right-0 h-[45vh] z-0"
        style={{
          background: isDark
            ? `radial-gradient(ellipse at center 20%, rgba(212,237,49,0.20) 0%, rgba(212,237,49,0.12) 15%, rgba(212,237,49,0.06) 35%, rgba(0,0,0,0.1) 55%, rgba(0,0,0,0) 75%)`
            : `radial-gradient(ellipse at center 20%, rgba(212,237,49,0.25) 0%, rgba(212,237,49,0.15) 18%, rgba(212,237,49,0.08) 38%, rgba(255,255,255,0.1) 58%, rgba(255,255,255,0) 78%)`,
          filter: 'blur(20px)'
        }}
      />
      
      <div
        className={cn(
          "max-w-[1250px] mx-auto px-4 sm:px-6 py-8 md:py-12 relative z-10 rounded-2xl border",
          isDark ? "border-white/10" : "border-black/5"
        )}
      >
        {/* Background pattern */}
        <div className="absolute inset-0 rounded-2xl -z-10">
          <div
            className="absolute inset-0 rounded-2xl"
            style={{
              backgroundImage: "url('/backgroundeffect.png')",
              backgroundRepeat: "repeat",
              backgroundSize: "200px",
              opacity: isDark ? "0.25" : "0.04"
            }}
          />
        </div>
        {/* Header */}
        <div className="text-center mb-8 xs:mb-10 sm:mb-12 md:mb-16">
          <span
            className={cn(
              "text-sm xs:text-base mb-3 xs:mb-4 block font-semibold",
              isDark ? "text-[#E0FF5C]" : "text-black"
            )}
          >
            Outils Gratuits
          </span>
          <h1
            className={cn(
              "text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-normal mb-3 xs:mb-4",
              isDark ? "text-white" : "text-black"
            )}
          >
            Nos outils gratuits
            <br className="hidden xs:block" /> pour votre croissance
          </h1>
          <div
            className={cn(
              "w-10 xs:w-12 h-0.5 mx-auto mb-3 xs:mb-4",
              isDark ? "bg-[#E0FF5C]" : "bg-black"
            )}
          />
          <p
            className={cn(
              "text-sm xs:text-base md:text-lg",
              isDark ? "text-white/100" : "text-black/80"
            )}
          >
            Découvrez nos outils gratuits pour développer
            <br className="hidden xs:block" /> votre activité efficacement
          </p>
        </div>

        {/* Growth Hacking Tools Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 md:mb-16">
          {/* MDE Calculator */}
          <Link
            href="/outils-gratuits/mde-calculator"
            className="group rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1 border backdrop-blur-md relative"
            style={{
              background: "transparent",
              borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
              boxShadow: "none",
            }}
          >
            {/* Background pattern */}
            <div
              className="absolute inset-0 rounded-3xl z-0 pointer-events-none"
              style={{
                backgroundImage: "url('/backgroundeffect.png')",
                backgroundRepeat: "repeat",
                backgroundSize: "200px",
                opacity: isDark ? "0.4" : "0.04"
              }}
            />
            
            {/* Hover halo effect */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{
                background: isDark
                  ? `linear-gradient(to right, rgba(212,237,49,0.08) 0%, rgba(212,237,49,0.08) 60%, rgba(212,237,49,0) 100%)`
                  : `linear-gradient(to right, rgba(212,237,49,0.10) 0%, rgba(212,237,49,0.10) 60%, rgba(212,237,49,0) 100%)`,
                filter: 'blur(20px)',
              }}
            />
            {/* Featured Image */}
            <div className="relative w-full h-48 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#E0FF5C] to-[#B8D44A] flex items-center justify-center">
                <Calculator className="w-16 h-16 text-black/80" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
              <span className="absolute bottom-4 left-4 inline-block px-3 py-1 bg-black text-[#E0FF5C] rounded-full text-sm z-20">
                Outil gratuit
              </span>
            </div>

            <div className="p-6 space-y-3 relative z-10">
              <h3 className={cn("text-xl font-semibold", isDark ? "text-white" : "text-black")}>
                A/B Testing Confidence
              </h3>

              <div className={cn("flex items-center gap-2 text-sm", isDark ? "text-white/70" : "text-black/70") }>
                <div className={cn("w-6 h-6 rounded-full flex items-center justify-center", isDark ? "bg-white/10" : "bg-black/10") }>
                  <i className="ri-calculator-line text-sm" aria-hidden="true" style={{ color: isDark ? theme.colors.primary.main : undefined }} />
                </div>
                Calculateur
              </div>
            </div>
          </Link>

          {/* A/B Test Calculator */}
          <Link
            href="/outils-gratuits/ab-test-calculator"
            className="group rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1 border backdrop-blur-md relative"
            style={{
              background: "transparent",
              borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
              boxShadow: "none",
            }}
          >
            {/* Background pattern */}
            <div
              className="absolute inset-0 rounded-3xl z-0 pointer-events-none"
              style={{
                backgroundImage: "url('/backgroundeffect.png')",
                backgroundRepeat: "repeat",
                backgroundSize: "200px",
                opacity: isDark ? "0.4" : "0.04"
              }}
            />
            
            {/* Hover halo effect */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{
                background: isDark
                  ? `linear-gradient(to right, rgba(212,237,49,0.08) 0%, rgba(212,237,49,0.08) 60%, rgba(212,237,49,0) 100%)`
                  : `linear-gradient(to right, rgba(212,237,49,0.10) 0%, rgba(212,237,49,0.10) 60%, rgba(212,237,49,0) 100%)`,
                filter: 'blur(20px)',
              }}
            />
            {/* Featured Image */}
            <div className="relative w-full h-48 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#E0FF5C] to-[#B8D44A] flex items-center justify-center">
                <ChartBar className="w-16 h-16 text-black/80" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
              <span className="absolute bottom-4 left-4 inline-block px-3 py-1 bg-black text-[#E0FF5C] rounded-full text-sm z-20">
                Outil gratuit
              </span>
            </div>

            <div className="p-6 space-y-3 relative z-10">
              <h3 className={cn("text-xl font-semibold", isDark ? "text-white" : "text-black")}>
                A/B Test Calculator
              </h3>

              <div className={cn("flex items-center gap-2 text-sm", isDark ? "text-white/70" : "text-black/70") }>
                <div className={cn("w-6 h-6 rounded-full flex items-center justify-center", isDark ? "bg-white/10" : "bg-black/10") }>
                  <i className="ri-bar-chart-line text-sm" aria-hidden="true" style={{ color: isDark ? theme.colors.primary.main : undefined }} />
                </div>
                Analyse
              </div>
            </div>
          </Link>
        </div>

      </div>
      {/* PreFooter Section */}
      <div className="relative z-10 w-full overflow-hidden mt-10 md:mt-16 pt-8 pb-16 md:pt-12 md:pb-24 px-4 sm:px-6">
        <div className="max-w-[1250px] mx-auto">
          <PreFooter />
        </div>
      </div>
    </section>
  );
} 