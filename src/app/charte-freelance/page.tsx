"use client";

import PreFooter from "@/components/footer/PreFooter";
import ScrollToTop from "@/components/ui/ScrollToTop";
import { useTheme } from "@/context/ThemeContext";
import { colors as theme } from "@/config/theme";
import { cn } from "@/lib/utils";

export default function CharteFreelancePage() {
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
                Notre charte
              </span>
              <h1 className="text-3xl md:text-5xl font-normal mb-4 text-black dark:text-white">
                La charte du Freelance
              </h1>
              <div className="w-12 h-0.5 mx-auto mb-4 bg-black dark:bg-[#E0FF5C]" />
              <p className="text-base md:text-lg text-black/70 dark:text-white/80">
                Découvrez les valeurs qui font d&apos;Uclic
                <br />
                un collectif unique et transparent
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
              Cher futur membre du collectif,
            </p>

            <p className="text-lg md:text-xl leading-relaxed typewriter-text delay-1 text-[#2C1810] dark:text-white/90">
              Bienvenue dans l&apos;univers d&apos;Uclic, un collectif pas comme
              les autres. Nous avons créé cet espace unique où la collaboration
              et la transparence ne sont pas de simples mots, mais des
              engagements quotidiens.
            </p>

            <p className="text-lg md:text-xl leading-relaxed typewriter-text delay-2 text-[#2C1810] dark:text-white/90">
              Notre force réside dans la complémentarité de nos expertises.
              Chaque membre apporte sa pierre à l&apos;édifice, permettant ainsi
              de relever des défis toujours plus ambitieux. C&apos;est cette
              diversité qui nous rend uniques et efficaces.
            </p>

            <p className="text-lg md:text-xl leading-relaxed typewriter-text delay-3 text-[#2C1810] dark:text-white/90">
              La transparence est notre maître-mot. Pas de zones d&apos;ombre,
              pas de surprises : nous communiquons clairement sur tous les
              aspects de notre collaboration, des projets aux tarifs. Et
              surtout, nous ne prélevons aucune commission sur l&apos;apport
              d&apos;affaires.
            </p>

            <p className="text-lg md:text-xl leading-relaxed typewriter-text delay-4 text-[#2C1810] dark:text-white/90">
              En rejoignant Uclic, vous intégrez un environnement où
              l&apos;indépendance se conjugue avec la force du collectif.
              Ensemble, nous pouvons entreprendre des projets plus ambitieux
              tout en conservant notre liberté d&apos;action.
            </p>

            <p className="text-lg md:text-xl leading-relaxed typewriter-text delay-5 text-[#2C1810] dark:text-white/90">
              Si ces valeurs résonnent en vous, si vous croyez comme nous en la
              puissance de la collaboration transparente, alors vous êtes au bon
              endroit. Uclic n&apos;attend que vous pour écrire ensemble les
              prochains chapitres de son histoire.
            </p>

            <div className="text-right mt-12 typewriter-text delay-6 text-[#2C1810] dark:text-white">
              <p className="text-xl">Avec enthousiasme,</p>
              <p className="text-2xl font-bold mt-2">Le collectif Uclic</p>
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
        .vintage-letter {
          position: relative;
        }

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
      <ScrollToTop />
    </div>
  );
}
