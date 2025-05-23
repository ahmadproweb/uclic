"use client";

import PreFooter from "@/components/footer/PreFooter";
import ScrollToTop from "@/components/ui/ScrollToTop";
import { cn } from "@/lib/utils";

export default function CharteFreelancePage() {
  return (
    <main className="w-full min-h-screen relative">
      {/* Base Background gradient */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-white to-[#E0FF5C] dark:from-black dark:to-[#E0FF5C]" />

      {/* Grain effect overlay */}
      <div
        className="absolute inset-0 z-0 mix-blend-soft-light opacity-50 dark:opacity-90"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.8'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "100px 100px",
        }}
      />

      {/* Overlay gradient */}
      <div className="absolute bottom-0 left-0 right-0 z-[1] h-[25%] bg-gradient-to-t from-[#F3F4F6] via-[#F3F4F6] to-transparent dark:from-black dark:via-black dark:to-transparent" />

      <section className="relative z-10 pt-28 md:pt-32 pb-16 md:pb-24">
        <div className="max-w-[800px] mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <span className="text-base mb-4 block font-semibold text-black dark:text-[#E0FF5C]">
              Notre charte
            </span>
            <h1 className="text-3xl md:text-5xl font-normal mb-4 text-black dark:text-white dark:drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
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
              "opacity-100",
              "bg-white/10 dark:bg-black/10 backdrop-blur-sm"
            )}
            style={{
              boxShadow: "0 8px 32px -4px rgba(0,0,0,0.1)",
            }}
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
      </section>

      {/* PreFooter Section */}
      <div className="relative z-10 w-full overflow-hidden pt-32 pb-8">
        <div className="max-w-[1250px] mx-auto px-4">
          <PreFooter noBgGradient />
        </div>
      </div>

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
    </main>
  );
}
