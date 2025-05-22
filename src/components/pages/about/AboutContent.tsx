"use client";

import Partners from "@/components/pages/home/partner/partner";
import { CTAButton } from "@/components/ui/cta-button";
import { UnderlinedText } from "@/components/ui/underlined-text";
import { colors as theme } from "@/config/theme";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";

export default function AboutContent() {
  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === "dark";

  return (
    <>
      <section
        className={cn("w-full relative overflow-hidden pt-40 pb-16 md:pb-24")}
      >
        {/* Base Background gradient */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background: isDark
              ? `linear-gradient(180deg, ${theme.colors.common.black} 0%, ${theme.colors.common.black} 30%, ${theme.colors.primary.main}80)`
              : `linear-gradient(180deg, ${theme.colors.common.white}, ${theme.colors.primary.main})`,
          }}
        />

        {/* Grain effect overlay */}
        <div
          className={cn(
            "absolute inset-0 z-0 mix-blend-soft-light",
            isDark ? "opacity-90" : "opacity-50"
          )}
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.8'/%3E%3C/svg%3E\")",
            backgroundRepeat: "repeat",
            backgroundSize: "100px 100px",
          }}
        />

        <div className="max-w-[1250px] mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Left Column - Content */}
            <div className="flex items-start">
              <div className="max-w-xl">
                <h1
                  className={cn(
                    "text-3xl sm:text-4xl md:text-5xl lg:text-[50px]",
                    "font-bold tracking-[-1px]",
                    "text-black dark:text-white",
                    "leading-[1.1]",
                    "mb-6"
                  )}
                >
                  <span className="block">Notre histoire</span>
                  <span className="block">
                    <span
                      className="font-bold"
                      style={{
                        color: isDark
                          ? theme.colors.primary.main
                          : theme.colors.primary.dark,
                      }}
                    >
                      <UnderlinedText text="commence" className="font-bold" />
                    </span>
                  </span>
                </h1>

                <p
                  className={cn(
                    "text-lg md:text-xl",
                    "text-black dark:text-white",
                    "mb-8"
                  )}
                >
                  Uclic est née d'une vision simple : rendre le digital
                  accessible à tous. Notre mission est d'accompagner les
                  entreprises dans leur transformation numérique avec des
                  solutions sur mesure et une expertise humaine.
                </p>

                <div className="space-y-6 mb-8">
                  {/* Values Grid */}
                  <div className="grid grid-cols-1 gap-4">
                    {/* Value 1 */}
                    <div className="flex items-start gap-4">
                      <div
                        className="mt-1 p-2 rounded-lg"
                        style={{
                          backgroundColor: isDark
                            ? "rgba(217, 255, 75, 0.1)"
                            : "rgba(217, 255, 75, 0.15)",
                          color: isDark
                            ? theme.colors.primary.light
                            : theme.colors.primary.dark,
                        }}
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3
                          className={cn(
                            "text-lg font-medium mb-1",
                            isDark ? "text-white" : "text-black"
                          )}
                        >
                          Innovation
                        </h3>
                        <p
                          className={cn(
                            "text-base",
                            isDark ? "text-white/70" : "text-black/70"
                          )}
                        >
                          Nous repoussons les limites du possible pour créer des
                          solutions digitales innovantes
                        </p>
                      </div>
                    </div>

                    {/* Value 2 */}
                    <div className="flex items-start gap-4">
                      <div
                        className="mt-1 p-2 rounded-lg"
                        style={{
                          backgroundColor: isDark
                            ? "rgba(217, 255, 75, 0.1)"
                            : "rgba(217, 255, 75, 0.15)",
                          color: isDark
                            ? theme.colors.primary.light
                            : theme.colors.primary.dark,
                        }}
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3
                          className={cn(
                            "text-lg font-medium mb-1",
                            isDark ? "text-white" : "text-black"
                          )}
                        >
                          Collaboration
                        </h3>
                        <p
                          className={cn(
                            "text-base",
                            isDark ? "text-white/70" : "text-black/70"
                          )}
                        >
                          Nous travaillons main dans la main avec nos clients
                          pour des résultats exceptionnels
                        </p>
                      </div>
                    </div>

                    {/* Value 3 */}
                    <div className="flex items-start gap-4">
                      <div
                        className="mt-1 p-2 rounded-lg"
                        style={{
                          backgroundColor: isDark
                            ? "rgba(217, 255, 75, 0.1)"
                            : "rgba(217, 255, 75, 0.15)",
                          color: isDark
                            ? theme.colors.primary.light
                            : theme.colors.primary.dark,
                        }}
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3
                          className={cn(
                            "text-lg font-medium mb-1",
                            isDark ? "text-white" : "text-black"
                          )}
                        >
                          Excellence
                        </h3>
                        <p
                          className={cn(
                            "text-base",
                            isDark ? "text-white/70" : "text-black/70"
                          )}
                        >
                          Nous nous engageons pour la qualité et l'excellence
                          dans chaque projet
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className={cn(
                    "rounded-2xl p-6",
                    "border backdrop-blur-sm",
                    isDark
                      ? "border-white/10 bg-white/5"
                      : "border-black/5 bg-black/5"
                  )}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="p-3 rounded-xl"
                      style={{
                        backgroundColor: isDark
                          ? "rgba(217, 255, 75, 0.1)"
                          : "rgba(217, 255, 75, 0.15)",
                        color: isDark
                          ? theme.colors.primary.light
                          : theme.colors.primary.dark,
                      }}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3
                        className={cn(
                          "text-lg font-semibold mb-2",
                          isDark ? "text-white" : "text-black"
                        )}
                      >
                        Notre engagement
                      </h3>
                      <p
                        className={cn(
                          "text-base leading-relaxed",
                          isDark ? "text-white/70" : "text-black/70"
                        )}
                      >
                        Nous nous engageons à vous accompagner dans votre
                        réussite digitale avec passion et expertise.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Team */}
            <div className="lg:sticky lg:top-32">
              <div
                className={cn(
                  "w-full rounded-[32px] overflow-hidden border p-8",
                  isDark ? "bg-[#161616]" : "bg-white",
                  isDark ? "shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]" : ""
                )}
                style={{
                  borderColor: isDark
                    ? "rgba(255,255,255,0.1)"
                    : "rgba(0,0,0,0.1)",
                }}
              >
                <div className="space-y-8">
                  <h2
                    className={cn(
                      "text-2xl font-bold",
                      isDark ? "text-white" : "text-black"
                    )}
                  >
                    Notre équipe
                  </h2>

                  {/* Team Members */}
                  <div className="space-y-6">
                    {/* Team Member 1 */}
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-full overflow-hidden">
                        <img
                          src="/team/member1.jpg"
                          alt="Membre de l'équipe 1"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3
                          className={cn(
                            "text-lg font-semibold",
                            isDark ? "text-white" : "text-black"
                          )}
                        >
                          Jean Dupont
                        </h3>
                        <p
                          className={cn(
                            "text-sm",
                            isDark ? "text-white/70" : "text-black/70"
                          )}
                        >
                          Fondateur & CEO
                        </p>
                      </div>
                    </div>

                    {/* Team Member 2 */}
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-full overflow-hidden">
                        <img
                          src="/team/member2.jpg"
                          alt="Membre de l'équipe 2"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3
                          className={cn(
                            "text-lg font-semibold",
                            isDark ? "text-white" : "text-black"
                          )}
                        >
                          Marie Martin
                        </h3>
                        <p
                          className={cn(
                            "text-sm",
                            isDark ? "text-white/70" : "text-black/70"
                          )}
                        >
                          Directrice Technique
                        </p>
                      </div>
                    </div>

                    {/* Team Member 3 */}
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-full overflow-hidden">
                        <img
                          src="/team/member3.jpg"
                          alt="Membre de l'équipe 3"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3
                          className={cn(
                            "text-lg font-semibold",
                            isDark ? "text-white" : "text-black"
                          )}
                        >
                          Pierre Durand
                        </h3>
                        <p
                          className={cn(
                            "text-sm",
                            isDark ? "text-white/70" : "text-black/70"
                          )}
                        >
                          Lead Designer
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="pt-4">
                    <CTAButton
                      variant="mainCTA"
                      className={cn(
                        "w-full justify-center",
                        !isDark &&
                          "!bg-[#E0FF5C] hover:!bg-black hover:!text-white"
                      )}
                    >
                      Rejoignez notre équipe
                    </CTAButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Section */}
      <div
        className={cn("py-12 md:py-16", isDark ? "bg-black" : "bg-[#F3F4F6]")}
      >
        <Partners />
      </div>
    </>
  );
}
