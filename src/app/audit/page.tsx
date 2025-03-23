"use client";

import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { UnderlinedText } from '@/components/ui/underlined-text';
import { colors as theme } from '@/config/theme';
import Partners from '@/components/pages/home/partner/partner';

export default function AuditPage() {
  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === 'dark';

  return (
    <main className="w-full min-h-screen">
      <section className={cn(
        "w-full relative overflow-hidden pt-32 pb-16 md:pb-24"
      )}>
        {/* Base Background gradient */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            background: isDark 
              ? `linear-gradient(180deg, ${theme.colors.common.black} 0%, ${theme.colors.common.black} 30%, ${theme.colors.primary.main}80)`
              : `linear-gradient(180deg, ${theme.colors.common.white}, ${theme.colors.primary.main})`
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

        <div className="max-w-[1250px] mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Left Column - Content */}
            <div className="flex items-start">
              <div className="max-w-xl">
                <div 
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm font-medium"
                  style={{
                    backgroundColor: isDark ? 'rgba(217, 255, 75, 0.1)' : 'rgba(217, 255, 75, 0.15)',
                    color: isDark ? theme.colors.primary.light : theme.colors.primary.dark
                  }}
                >
                  <span className="relative flex h-2 w-2">
                    <span 
                      className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                      style={{ backgroundColor: theme.colors.primary.main }}
                    ></span>
                    <span 
                      className="relative inline-flex rounded-full h-2 w-2"
                      style={{ backgroundColor: isDark ? theme.colors.primary.light : theme.colors.primary.dark }}
                    ></span>
                  </span>
                  Derniers créneaux disponibles cette semaine
                </div>

                <h1 className={cn(
                  "text-3xl sm:text-4xl md:text-5xl lg:text-[50px]",
                  "font-bold tracking-[-1px]",
                  "text-black dark:text-white",
                  "leading-[1.1]",
                  "mb-6"
                )}>
                  <span className="block">Débloquez votre</span>
                  <span className="block">
                    audit stratégique <UnderlinedText text="gratuit" />
                    <span 
                      className="text-base align-top px-3 py-1.5 rounded-md inline-flex items-center mt-2"
                      style={{
                        backgroundColor: isDark ? 'rgba(217, 255, 75, 0.1)' : 'rgba(217, 255, 75, 0.15)',
                        color: isDark ? theme.colors.primary.light : theme.colors.primary.dark
                      }}
                    >
                      <span className="line-through opacity-75">Valeur : 497€</span>
                      <span className="ml-2 font-medium px-2 py-0.5 rounded-md" style={{
                        backgroundColor: isDark ? 'rgba(217, 255, 75, 0.2)' : 'rgba(217, 255, 75, 0.3)'
                      }}>GRATUIT</span>
                    </span>
                  </span>
                </h1>
                
                <p className={cn(
                  "text-lg md:text-xl",
                  "text-black dark:text-white",
                  "mb-6"
                )}>
                  En seulement 30 minutes, nos experts analysent vos défis actuels et vous livrent une feuille de route personnalisée pour multiplier votre impact digital.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <div 
                      className="mt-1"
                      style={{ color: isDark ? theme.colors.primary.light : theme.colors.primary.dark }}
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-black dark:text-white">Diagnostic complet de votre présence digitale</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div 
                      className="mt-1"
                      style={{ color: isDark ? theme.colors.primary.light : theme.colors.primary.dark }}
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-black dark:text-white">Plan d&apos;action concret et applicable immédiatement</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div 
                      className="mt-1"
                      style={{ color: isDark ? theme.colors.primary.light : theme.colors.primary.dark }}
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-black dark:text-white">Identification des opportunités de croissance inexploitées</p>
                  </div>
                </div>

                <div 
                  className="text-sm p-4 rounded-xl mb-6"
                  style={{
                    backgroundColor: isDark ? 'rgba(217, 255, 75, 0.1)' : 'rgba(217, 255, 75, 0.15)',
                    color: isDark ? theme.colors.primary.light : theme.colors.primary.dark
                  }}
                >
                  <p className="font-medium">🔥 Déjà +50 entreprises accompagnées ce mois-ci</p>
                  <p className="mt-1 text-black dark:text-white">Les créneaux se remplissent rapidement. Réservez le vôtre maintenant.</p>
                </div>

                <p className={cn(
                  "text-sm",
                  "text-black dark:text-white"
                )}>
                  En réservant un créneau, vous acceptez nos conditions d&apos;utilisation et notre politique de confidentialité.
                </p>
              </div>
            </div>

            {/* Right Column - Calendly */}
            <div className="lg:sticky lg:top-32 h-[600px] lg:h-[calc(100vh-140px)]">
              <div className={cn(
                "w-full h-full rounded-[32px] overflow-hidden border shadow-xl",
                "bg-white"
              )}
              style={{
                borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
              }}>
                <iframe
                  src="https://calendly.com/hello-uclic"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Section */}
      <div className={cn(
        "py-12 md:py-16",
        isDark ? "bg-black" : "bg-[#F3F4F6]"
      )}>
        <Partners />
    </div>
    </main>
  );
} 