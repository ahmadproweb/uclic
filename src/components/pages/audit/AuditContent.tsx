'use client';

import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { UnderlinedText } from '@/components/ui/underlined-text';
import { colors as theme } from '@/config/theme';
import Partners from '@/components/pages/home/partner/partner';
import { CTAButton } from '@/components/ui/cta-button';

export default function AuditContent() {
  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === 'dark';

  return (
    <>
      <section className={cn(
        "w-full relative overflow-hidden pt-40 pb-16 md:pb-24"
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
                <h1 className={cn(
                  "text-3xl sm:text-4xl md:text-5xl lg:text-[50px]",
                  "font-bold tracking-[-1px]",
                  "text-black dark:text-white",
                  "leading-[1.1]",
                  "mb-6"
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
                  "mb-8"
                )}>
                  Découvrez comment optimiser votre présence digitale et maximiser votre impact en ligne avec nos recommandations personnalisées.
                </p>

                <div className="space-y-6 mb-8">
                  {/* Features Grid */}
                  <div className="grid grid-cols-1 gap-4">
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
                    "border backdrop-blur-sm",
                    isDark ? "border-white/10 bg-white/5" : "border-black/5 bg-black/5"
                  )}
                >
                  <div className="flex items-start gap-4">
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

            {/* Right Column - Audit Form */}
            <div className="lg:sticky lg:top-32">
              <div className={cn(
                "w-full rounded-[32px] overflow-hidden border p-8",
                isDark ? "bg-[#161616]" : "bg-white",
                isDark ? "shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]" : ""
              )}
              style={{
                borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
              }}>
                <form className="space-y-6">
                  {/* Nom */}
                  <div>
                    <label 
                      htmlFor="name" 
                      className={cn(
                        "block text-sm font-medium mb-2",
                        isDark ? "text-white/90" : "text-black/90"
                      )}
                    >
                      Nom complet
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className={cn(
                        "w-full px-4 py-3 rounded-xl border",
                        "focus:outline-none focus:ring-2 transition-all",
                        isDark 
                          ? "border-white/10 focus:border-white/20 focus:ring-[#E0FF5C]/20 text-white bg-white/5" 
                          : "border-black/10 focus:border-black/20 focus:ring-[#E0FF5C]/40 text-black bg-black/5"
                      )}
                      placeholder="John Doe"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label 
                      htmlFor="email" 
                      className={cn(
                        "block text-sm font-medium mb-2",
                        isDark ? "text-white/90" : "text-black/90"
                      )}
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className={cn(
                        "w-full px-4 py-3 rounded-xl border",
                        "focus:outline-none focus:ring-2 transition-all",
                        isDark 
                          ? "border-white/10 focus:border-white/20 focus:ring-[#E0FF5C]/20 text-white bg-white/5" 
                          : "border-black/10 focus:border-black/20 focus:ring-[#E0FF5C]/40 text-black bg-black/5"
                      )}
                      placeholder="john@example.com"
                    />
                  </div>

                  {/* Site web */}
                  <div>
                    <label 
                      htmlFor="website" 
                      className={cn(
                        "block text-sm font-medium mb-2",
                        isDark ? "text-white/90" : "text-black/90"
                      )}
                    >
                      Site web
                    </label>
                    <input
                      type="url"
                      id="website"
                      name="website"
                      className={cn(
                        "w-full px-4 py-3 rounded-xl border",
                        "focus:outline-none focus:ring-2 transition-all",
                        isDark 
                          ? "border-white/10 focus:border-white/20 focus:ring-[#E0FF5C]/20 text-white bg-white/5" 
                          : "border-black/10 focus:border-black/20 focus:ring-[#E0FF5C]/40 text-black bg-black/5"
                      )}
                      placeholder="https://example.com"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label 
                      htmlFor="message" 
                      className={cn(
                        "block text-sm font-medium mb-2",
                        isDark ? "text-white/90" : "text-black/90"
                      )}
                    >
                      Objectifs principaux
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      className={cn(
                        "w-full px-4 py-3 rounded-xl border",
                        "focus:outline-none focus:ring-2 transition-all",
                        isDark 
                          ? "border-white/10 focus:border-white/20 focus:ring-[#E0FF5C]/20 text-white bg-white/5 placeholder:text-white/50" 
                          : "border-black/10 focus:border-black/20 focus:ring-[#E0FF5C]/40 text-black bg-black/5 placeholder:text-black/50"
                      )}
                      placeholder="Quels sont vos objectifs principaux ?"
                    />
                  </div>

                  {/* Submit Button */}
                  <div>
                    <button type="submit">
                      <CTAButton 
                        variant="mainCTA"
                        className={cn(
                          "w-full justify-center",
                          !isDark && "!bg-[#E0FF5C] hover:!bg-black hover:!text-white"
                        )}
                      >
                        Obtenir mon audit gratuit
                      </CTAButton>
                    </button>
                  </div>

                  <p className={cn(
                    "text-sm text-center",
                    isDark ? "text-white/60" : "text-black/60"
                  )}>
                    En soumettant ce formulaire, vous acceptez notre politique de confidentialité
                  </p>
                </form>
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
    </>
  );
} 