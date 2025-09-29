'use client';

import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { UnderlinedText } from '@/components/ui/underlined-text';
import { colors as theme } from '@/config/theme';
import Partners from '@/components/pages/home/partner/partner';
import { CTAButton } from '@/components/ui/cta-button';
import PreFooter from "@/components/footer/PreFooter";

export default function AuditContent() {
  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === 'dark';

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
      <section className={cn(
        "w-full relative overflow-hidden pt-32 pb-10 md:pb-16 px-4 sm:px-6"
      )}>

        {/* Main content container with backdrop blur and halo */}
         <div
           className={cn(
             "max-w-[1250px] mx-auto px-4 sm:px-6 py-14 md:py-18 relative z-10 rounded-2xl border",
             isDark ? "border-white/10" : "border-black/5"
           )}
         >
          {/* Background pattern (no extra border to avoid double border) */}
          <div className={cn("absolute inset-0 rounded-2xl -z-10")}> 
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                backgroundImage: "url('https://framerusercontent.com/images/g0QcWrxr87K0ufOxIUFBakwYA8.png')",
                backgroundRepeat: "repeat",
                backgroundSize: "200px",
                opacity: isDark ? "0.35" : "0.04"
              }}
            />
          </div>
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Left Column - Content */}
            <div className="flex items-start">
              <div className={cn(
                "max-w-xl p-0 md:p-8 rounded-2xl",
                "bg-transparent"
              )}>
                <h1 className={cn(
                  "text-3xl sm:text-4xl md:text-5xl lg:text-[50px]",
                  "font-bold tracking-[-1px]",
                  "text-black dark:text-white",
                  "leading-[1.1]",
                  "mb-8"
                )}>
                  <span className="block">Obtenez un audit stratégique</span>
                  <span className="block">
                    <span className="font-bold" style={{ 
                      color: isDark ? theme.colors.primary.main : theme.colors.primary.dark 
                    }}>
                      <UnderlinedText text="gratuit" className="font-bold" />
                    </span>
                  </span>
                </h1>
                
                <p className={cn(
                  "text-lg md:text-xl",
                  "text-black dark:text-white",
                  "mb-10"
                )}>
                  Découvrez comment optimiser votre présence digitale et maximiser votre impact en ligne avec nos recommandations personnalisées.
                </p>

                <div className="space-y-8 mb-10">
                  {/* Features Grid */}
                  <div className="grid grid-cols-1 gap-6">
                    {/* Feature 1 */}
                    <div className="flex items-start gap-4">
                      <div 
                        className="mt-1 p-2 rounded-lg"
                        style={{
                          backgroundColor: isDark ? 'rgba(217, 255, 75, 0.1)' : 'rgba(217, 255, 75, 0.15)',
                          color: isDark ? theme.colors.primary.light : theme.colors.primary.dark
                        }}
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className={cn(
                          "text-lg font-medium mb-1",
                          isDark ? "text-white" : "text-black"
                        )}>Analyse approfondie</h3>
                        <p className={cn(
                          "text-base",
                          isDark ? "text-white/70" : "text-black/70"
                        )}>
                          Évaluation détaillée de votre présence en ligne actuelle
                        </p>
                      </div>
                    </div>

                    {/* Feature 2 */}
                    <div className="flex items-start gap-4">
                      <div 
                        className="mt-1 p-2 rounded-lg"
                        style={{
                          backgroundColor: isDark ? 'rgba(217, 255, 75, 0.1)' : 'rgba(217, 255, 75, 0.15)',
                          color: isDark ? theme.colors.primary.light : theme.colors.primary.dark
                        }}
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className={cn(
                          "text-lg font-medium mb-1",
                          isDark ? "text-white" : "text-black"
                        )}>Recommandations concrètes</h3>
                        <p className={cn(
                          "text-base",
                          isDark ? "text-white/70" : "text-black/70"
                        )}>
                          Des solutions pratiques et adaptées à vos objectifs
                        </p>
                      </div>
                    </div>

                    {/* Feature 3 */}
                    <div className="flex items-start gap-4">
                      <div 
                        className="mt-1 p-2 rounded-lg"
                        style={{
                          backgroundColor: isDark ? 'rgba(217, 255, 75, 0.1)' : 'rgba(217, 255, 75, 0.15)',
                          color: isDark ? theme.colors.primary.light : theme.colors.primary.dark
                        }}
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className={cn(
                          "text-lg font-medium mb-1",
                          isDark ? "text-white" : "text-black"
                        )}>Réponse rapide</h3>
                        <p className={cn(
                          "text-base",
                          isDark ? "text-white/70" : "text-black/70"
                        )}>
                          Recevez votre audit sous 48h maximum
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                 <div 
                   className={cn(
                     "rounded-2xl p-6",
                     "border backdrop-blur-md relative overflow-hidden",
                     "bg-transparent"
                   )}
                 >
                   {/* Halo effect inside the card */}
                   <div
                     className="pointer-events-none absolute inset-0 rounded-2xl"
                     style={{
                       background: isDark
                         ? `linear-gradient(to right, rgba(212,237,49,0.08) 0%, rgba(212,237,49,0.08) 60%, rgba(212,237,49,0) 100%)`
                         : `linear-gradient(to right, rgba(212,237,49,0.10) 0%, rgba(212,237,49,0.10) 60%, rgba(212,237,49,0) 100%)`,
                       filter: 'blur(20px)'
                     }}
                   />
                  <div className="flex items-start gap-4 relative z-10">
                    <div 
                      className="p-3 rounded-xl"
                      style={{
                        backgroundColor: isDark ? 'rgba(217, 255, 75, 0.1)' : 'rgba(217, 255, 75, 0.15)',
                        color: isDark ? theme.colors.primary.light : theme.colors.primary.dark
                      }}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
                          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className={cn(
                        "text-lg font-semibold mb-2",
                        isDark ? "text-white" : "text-black"
                      )}>
                        Valeur : 497€
                      </h3>
                      <p className={cn(
                        "text-base leading-relaxed",
                        isDark ? "text-white/70" : "text-black/70"
                      )}>
                        Offert gratuitement aux 10 premiers inscrits du mois
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Calendly Integration */}
            <div className={cn(
              "w-full rounded-[32px] overflow-hidden border backdrop-blur-md",
              isDark ? "bg-black border-white/10" : "bg-white border-black/5"
            )}>
              <iframe
                src="https://calendly.com/hello-uclic"
                width="100%"
                height="650"
                frameBorder="0"
                className="rounded-none"
                style={{
                  minHeight: '650px',
                  backgroundColor: isDark ? 'transparent' : 'transparent'
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Partner Section */}
      <div
        className={cn("pt-0 pb-8 md:pt-0 md:pb-12", isDark ? "bg-black" : "bg-white")}
      >
        <Partners />
      </div>

      {/* PreFooter Section */}
      <div className={cn("relative z-10 w-full overflow-hidden pt-8 pb-16 md:pt-12 md:pb-24 px-4 sm:px-6")}>
        <div className="max-w-[1250px] mx-auto">
          <PreFooter noBgGradient />
        </div>
      </div>
    </div>
  );
} 