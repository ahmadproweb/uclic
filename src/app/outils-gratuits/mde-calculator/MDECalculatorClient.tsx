'use client';

import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';
import { colors as theme } from '@/config/theme';
import MDECalculator from '@/components/calculators/MDECalculator';
import PreFooter from '@/components/footer/PreFooter';
import ScrollToTop from '@/components/ui/ScrollToTop';
import StickyShareButtons from '@/components/ui/StickyShareButtons';

export default function MDECalculatorClient() {
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
          )}>A/B Testing Confidence</span>
          <h1 className={cn(
            "text-3xl md:text-5xl font-normal mb-4",
            isDark ? "text-white" : "text-black"
          )}>
            Calculez la taille d'échantillon<br/>optimale pour vos tests A/B
          </h1>
          <div className={cn(
            "w-12 h-0.5 mx-auto mb-4",
            isDark ? "bg-[#E0FF5C]" : "bg-black"
          )}/>
          <p className={cn(
            "text-base md:text-lg",
            isDark ? "text-white/100" : "text-black"
          )}>
            Déterminez le niveau de confiance statistique nécessaire<br/>pour vos expérimentations
          </p>
        </div>

        {/* Calculator Section */}
        <div className="mb-16">
          <MDECalculator isDark={isDark} />
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className={cn(
            "text-2xl md:text-3xl font-bold mb-8 text-center",
            isDark ? "text-white" : "text-black"
          )}>
            Questions Fréquentes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={cn(
              "rounded-3xl p-6",
              isDark ? "bg-black/50" : "bg-white/50"
            )}>
              <h3 className={cn(
                "text-xl font-semibold mb-4",
                isDark ? "text-white" : "text-black"
              )}>
                Qu'est-ce que le MDE ?
              </h3>
              <p className={cn(
                "text-base",
                isDark ? "text-white/70" : "text-black/70"
              )}>
                Le Minimum Detectable Effect (MDE) est la plus petite différence que vous souhaitez détecter entre vos variantes de test avec un niveau de confiance statistique donné.
              </p>
            </div>
            <div className={cn(
              "rounded-3xl p-6",
              isDark ? "bg-black/50" : "bg-white/50"
            )}>
              <h3 className={cn(
                "text-xl font-semibold mb-4",
                isDark ? "text-white" : "text-black"
              )}>
                Combien de temps dure un test A/B ?
              </h3>
              <p className={cn(
                "text-base",
                isDark ? "text-white/70" : "text-black/70"
              )}>
                La durée dépend de votre taux de conversion actuel, du trafic et de la taille d'échantillon nécessaire. Notre calculateur vous aide à déterminer la durée optimale.
              </p>
            </div>
            <div className={cn(
              "rounded-3xl p-6",
              isDark ? "bg-black/50" : "bg-white/50"
            )}>
              <h3 className={cn(
                "text-xl font-semibold mb-4",
                isDark ? "text-white" : "text-black"
              )}>
                Quel niveau de confiance choisir ?
              </h3>
              <p className={cn(
                "text-base",
                isDark ? "text-white/70" : "text-black/70"
              )}>
                Un niveau de confiance de 95% est généralement recommandé pour les tests A/B. Cela signifie que vous avez 95% de chances que vos résultats soient statistiquement significatifs.
              </p>
            </div>
            <div className={cn(
              "rounded-3xl p-6",
              isDark ? "bg-black/50" : "bg-white/50"
            )}>
              <h3 className={cn(
                "text-xl font-semibold mb-4",
                isDark ? "text-white" : "text-black"
              )}>
                Qu'est-ce que la puissance statistique ?
              </h3>
              <p className={cn(
                "text-base",
                isDark ? "text-white/70" : "text-black/70"
              )}>
                La puissance statistique (80% par défaut) représente la probabilité de détecter un effet réel s'il existe. Une puissance plus élevée nécessite un échantillon plus grand.
              </p>
            </div>
          </div>
        </div>

        {/* PreFooter Section */}
        <div className="relative z-10">
          <PreFooter noBgGradient />
        </div>
      </div>

      {/* UI Elements */}
      <ScrollToTop />
      <StickyShareButtons />
    </section>
  );
} 