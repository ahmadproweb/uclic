"use client";

import PreFooter from "@/components/footer/PreFooter";
import { useTheme } from "@/context/ThemeContext";
import { colors as theme } from "@/config/theme";
import { cn } from "@/lib/utils";

export default function AboutPageClient() {
  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === "dark";

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

      <main className="w-full min-h-screen relative">
        <section className="relative z-10 w-full overflow-hidden bg-transparent pt-32 pb-0 md:pb-0 px-4 sm:px-6">
          <div className={cn(
            "max-w-[1250px] mx-auto px-4 sm:px-6 py-8 md:py-12 relative z-10 rounded-2xl border",
            isDark ? "border-white/10" : "border-black/5"
          )}>
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
            
            <div className="max-w-[800px] mx-auto px-4 py-8 rounded-2xl bg-transparent">
              {/* Header */}
              <div className="text-center mb-12 md:mb-16">
                <span className="text-base mb-4 block font-semibold text-black dark:text-[#E0FF5C]">
                  À propos
                </span>
                <h1 className="text-3xl md:text-5xl font-normal mb-4 text-black dark:text-white">
                  Notre Histoire
                </h1>
                <div className="w-12 h-0.5 mx-auto mb-4 bg-black dark:bg-[#E0FF5C]" />
                <p className="text-base md:text-lg text-black/70 dark:text-white/80">
                  Découvrez comment est né Uclic
                  <br />
                  et ce qui nous anime au quotidien
                </p>
              </div>

              {/* Letter Content */}
              <div
                className={cn(
                  "space-y-8 transition-opacity duration-1000 rounded-3xl p-8",
                  "opacity-100"
                )}
              >
                <p className="text-xl md:text-2xl leading-relaxed typewriter-text delay-0 text-[#2C1810] dark:text-white">
                  Cher visiteur,
                </p>

                <p className="text-lg md:text-xl leading-relaxed typewriter-text delay-1 text-[#2C1810] dark:text-white/90">
                  Uclic est né d&apos;une conviction simple : le digital doit être profondément humain. 
                  Dans un monde où la technologie évolue à vitesse grand V, nous avons choisi de 
                  remettre l&apos;humain au centre de chaque projet.
                </p>

                <p className="text-lg md:text-xl leading-relaxed typewriter-text delay-2 text-[#2C1810] dark:text-white/90">
                  Notre équipe d'experts s&apos;unit autour d&apos;une vision commune : 
                  créer des solutions digitales qui ont du sens, qui touchent et qui transforment 
                  réellement les entreprises et leurs utilisateurs.
                </p>

                <p className="text-lg md:text-xl leading-relaxed typewriter-text delay-3 text-[#2C1810] dark:text-white/90">
                  Chaque projet est une nouvelle aventure, une nouvelle opportunité de prouver 
                  que la technologie, quand elle est bien pensée et bien utilisée, peut être un 
                  formidable levier de croissance et d&apos;épanouissement.
                </p>

                <p className="text-lg md:text-xl leading-relaxed typewriter-text delay-4 text-[#2C1810] dark:text-white/90">
                  Nous croyons en la transparence, en la collaboration et en la valeur ajoutée 
                  réelle. C&apos;est pourquoi nous ne prélevons aucune commission sur l&apos;apport 
                  d&apos;affaires et privilégions toujours la qualité à la quantité.
                </p>

                <p className="text-lg md:text-xl leading-relaxed typewriter-text delay-5 text-[#2C1810] dark:text-white/90">
                  Rejoignez-nous dans cette aventure où le digital rencontre l&apos;humain, 
                  où chaque ligne de code a un but, et où chaque projet est une nouvelle 
                  étape vers un monde digital plus humain.
                </p>

                <div className="text-right mt-12 typewriter-text delay-6 text-[#2C1810] dark:text-white">
                  <p className="text-xl">Avec passion,</p>
                  <p className="text-2xl font-bold mt-2">L&apos;équipe Uclic</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PreFooter Section */}
        <div className="relative z-10 w-full overflow-hidden mt-10 md:mt-16 pt-8 pb-16 md:pt-12 md:pb-24 px-4 sm:px-6">
          <div className="max-w-[1250px] mx-auto">
            <PreFooter noBgGradient />
          </div>
        </div>
      </main>

      <style jsx>{`
        .typewriter-text {
          opacity: 0;
          animation: fadeIn 1s ease-out forwards;
        }

        .delay-0 {
          animation-delay: 0.5s;
        }
        .delay-1 {
          animation-delay: 1.5s;
        }
        .delay-2 {
          animation-delay: 3s;
        }
        .delay-3 {
          animation-delay: 4.5s;
        }
        .delay-4 {
          animation-delay: 6s;
        }
        .delay-5 {
          animation-delay: 7.5s;
        }
        .delay-6 {
          animation-delay: 9s;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}