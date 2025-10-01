'use client';

import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';
import { colors as theme } from '@/config/theme';
import MDECalculator from '@/components/calculators/MDECalculator';
import PreFooter from '@/components/footer/PreFooter';
import ScrollToTop from '@/components/ui/ScrollToTop';
import StickyShareButtons from '@/components/ui/StickyShareButtons';
import { useEffect, useState } from 'react';

export default function MDECalculatorClient() {
  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === 'dark';
  const [shareUrl, setShareUrl] = useState('');
  useEffect(() => {
    setShareUrl(window.location.href);
  }, []);

  return (
    <div className={cn("min-h-screen", isDark ? "bg-black" : "bg-white")}>
      {/* Fixed halo background */}
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

      <section className="w-full max-w-[100vw] pt-40 pb-0 md:pb-0 relative overflow-hidden">
      
      <div
        className={cn(
          "max-w-[1250px] mx-auto py-8 md:py-12 relative z-10 rounded-2xl border",
          isDark ? "border-white/10" : "border-black/5"
        )}
        style={{ width: '100%' }}
      >
        {/* Background pattern to match parent page */}
        <div className="absolute inset-0 rounded-2xl -z-10">
          <div
            className="absolute inset-0 rounded-2xl"
            style={{
              backgroundImage: "url('https://framerusercontent.com/images/g0QcWrxr87K0ufOxIUFBakwYA8.png')",
              backgroundRepeat: "repeat",
              backgroundSize: "200px",
              opacity: isDark ? "0.25" : "0.04"
            }}
          />
        </div>
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

      </div>

      {/* PreFooter Section */}
      <div className="relative z-10 w-full overflow-hidden pt-16 pb-16">
        <div className="max-w-[1250px] mx-auto px-4">
          <PreFooter noBgGradient />
        </div>
      </div>

      {/* UI Elements */}
      <ScrollToTop />
      <StickyShareButtons url={shareUrl} title="A/B Testing Confidence" />
      </section>
    </div>
  );
} 