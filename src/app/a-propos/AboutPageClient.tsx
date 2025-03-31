"use client";

import { cn } from "@/lib/utils";
import PreFooter from '@/components/footer/PreFooter';
import { useEffect, useState } from 'react';

export default function AboutPageClient() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <main className="w-full min-h-screen relative">
      {/* Base Background gradient */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-white to-[#E0FF5C] dark:from-black dark:to-[#E0FF5C]" />

      {/* Grain effect overlay */}
      <div 
        className="absolute inset-0 z-0 mix-blend-soft-light opacity-50 dark:opacity-90"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.7\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'0.8\'/%3E%3C/svg%3E")',
          backgroundRepeat: 'repeat',
          backgroundSize: '100px 100px'
        }}
      />

      {/* Overlay gradient */}
      <div className="absolute bottom-0 left-0 right-0 z-[1] h-[25%] bg-gradient-to-t from-[#F3F4F6] via-[#F3F4F6] to-transparent dark:from-black dark:via-black dark:to-transparent" />

      <section className="relative z-10 w-full max-w-[100vw] pt-28 md:pt-32 pb-16 md:pb-24 overflow-hidden">
        <div className="max-w-[800px] mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <span className="text-base mb-4 block font-semibold text-black dark:text-[#E0FF5C]">
              À propos
            </span>
            <h1 className="text-3xl md:text-5xl font-normal mb-4 text-black dark:text-white dark:drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
              Notre Histoire
            </h1>
            <div className="w-12 h-0.5 mx-auto mb-4 bg-black dark:bg-[#E0FF5C]" />
            <p className="text-base md:text-lg text-black/70 dark:text-white/80">
              Découvrez comment est né Uclic<br/>et ce qui nous anime au quotidien
            </p>
          </div>

          {/* Letter Content */}
          <div
            className={cn(
              "vintage-letter font-serif space-y-8 transition-opacity duration-1000 rounded-3xl p-8",
              isVisible ? "opacity-100" : "opacity-0",
              "bg-white/10 dark:bg-black/10 backdrop-blur-sm"
            )}
            style={{
              boxShadow: '0 8px 32px -4px rgba(0,0,0,0.1)'
            }}
          >
            <p className="text-xl md:text-2xl leading-relaxed typewriter-text delay-0 text-[#2C1810] dark:text-white">
              Cher lecteur,
            </p>

            <p className="text-lg md:text-xl leading-relaxed typewriter-text delay-1 text-[#2C1810] dark:text-white/90">
              Laissez-moi vous conter l&apos;histoire d&apos;une révolution silencieuse dans le monde digital. Une histoire qui commence par une frustration partagée face aux agences traditionnelles et leurs promesses creuses.
            </p>

            <p className="text-lg md:text-xl leading-relaxed typewriter-text delay-2 text-[#2C1810] dark:text-white/90">
              Nous rêvions d&apos;un monde où le digital serait enfin accessible, où l&apos;expertise ne se cacherait plus derrière un jargon incompréhensible, où la valeur l&apos;emporterait sur le superflu.
            </p>

            <p className="text-lg md:text-xl leading-relaxed typewriter-text delay-3 text-[#2C1810] dark:text-white/90">
              C&apos;est ainsi qu&apos;est né Uclic. Non pas comme une simple agence, mais comme un collectif d&apos;âmes passionnées, unies par une vision commune : rendre le digital profondément humain.
            </p>

            <p className="text-lg md:text-xl leading-relaxed typewriter-text delay-4 text-[#2C1810] dark:text-white/90">
              Notre approche ? La simplicité dans sa forme la plus pure. Pas de processus complexes, pas de promesses démesurées. Juste une expertise authentique, mise au service de votre réussite.
            </p>

            <p className="text-lg md:text-xl leading-relaxed typewriter-text delay-5 text-[#2C1810] dark:text-white/90">
              Chaque jour, nous sélectionnons méticuleusement les meilleurs talents freelances, créant ainsi une communauté d&apos;experts dévoués à transformer vos ambitions en réalités tangibles.
            </p>

            <div className="text-right mt-12 typewriter-text delay-6 text-[#2C1810] dark:text-white">
              <p className="text-xl">Sincèrement vôtre,</p>
              <p className="text-2xl font-bold mt-2">L&apos;équipe Uclic</p>
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

        .delay-0 { animation-delay: 0.5s; }
        .delay-1 { animation-delay: 1.5s; }
        .delay-2 { animation-delay: 3s; }
        .delay-3 { animation-delay: 4.5s; }
        .delay-4 { animation-delay: 6s; }
        .delay-5 { animation-delay: 7.5s; }
        .delay-6 { animation-delay: 9s; }

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
    </main>
  );
} 