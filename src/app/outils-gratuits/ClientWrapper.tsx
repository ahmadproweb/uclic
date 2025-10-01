'use client';

import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';
import { colors as theme } from '@/config/theme';
import Link from 'next/link';
import PreFooter from '@/components/footer/PreFooter';

export default function ClientWrapper() {
  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === 'dark';

  return (
    <section className="w-full max-w-[100vw] pt-28 md:pt-32 pb-16 md:pb-24 relative overflow-hidden">
      {/* Base Background gradient */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: isDark 
            ? `linear-gradient(180deg, ${theme.colors.common.black}, #E0FF5C)`
            : `linear-gradient(180deg, ${theme.colors.common.white}, #E0FF5C)`
        }}
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

      {/* New overlay gradient - black to transparent */}
      <div 
        className="absolute bottom-0 left-0 right-0 z-[1]"
        style={{
          background: isDark
            ? 'linear-gradient(to top, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 1) 40%, rgba(0, 0, 0, 0) 100%)'
            : 'linear-gradient(to top, rgb(243, 244, 246) 0%, rgba(243, 244, 246, 1) 40%, rgba(243, 244, 246, 0) 100%)',
          height: '25%'
        }}
      />
      
      <div className="max-w-[1250px] mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className={cn(
            "text-base mb-4 block font-semibold",
            isDark ? "text-[#E0FF5C]" : "text-black"
          )}>Outils Gratuits</span>
          <h1 className={cn(
            "text-3xl md:text-5xl font-normal mb-4",
            isDark ? "text-white" : "text-black"
          )}>
            Nos outils gratuits<br/>pour votre croissance
          </h1>
          <div className={cn(
            "w-12 h-0.5 mx-auto mb-4",
            isDark ? "bg-[#E0FF5C]" : "bg-black"
          )}/>
          <p className={cn(
            "text-base md:text-lg",
            isDark ? "text-white/100" : "text-black"
          )}>
            Découvrez nos outils gratuits pour développer<br/>votre activité efficacement
          </p>
        </div>

        {/* Growth Hacking Tools Section */}
        <div className="mb-16">
          <h2 className={cn(
            "text-2xl md:text-3xl font-bold mb-8 text-center",
            isDark ? "text-white" : "text-black"
          )}>
            Outils Growth Hacking
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/outils-gratuits/mde-calculator"
              className="group rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl backdrop-blur-sm p-6"
              style={{
                background: `linear-gradient(145deg, 
                  #E0FF5C,
                  #E0FF5C
                )`,
                boxShadow: `0 8px 32px -4px rgba(237 245 202, 0.25)`
              }}
            >
              <div className="space-y-4">
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-white/50 mb-4 flex items-center justify-center">
                  <svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                
                {/* Title */}
                <h3 className="text-xl font-semibold text-black">
                  A/B Testing Confidence
                </h3>
                
                {/* Description */}
                <p className="text-sm text-black/70 line-clamp-2">
                  Calculez la taille d'échantillon optimale pour vos tests A/B et déterminez le niveau de confiance statistique nécessaire.
                </p>
              </div>
            </Link>
            {/* Autres outils de Growth Hacking à ajouter ici */}
          </div>
        </div>

        {/* PreFooter Section */}
      <div className={cn("relative z-10 w-full overflow-hidden pt-8 pb-16 md:pt-12 md:pb-24 px-4 sm:px-6")}>
        <div className="max-w-[1250px] mx-auto">
          <PreFooter noBgGradient />
        </div>
      </div>
      </div>
    </section>
  );
} 