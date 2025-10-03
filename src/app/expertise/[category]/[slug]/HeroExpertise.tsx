"use client";

import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import ExpertiseContactForm from "./ExpertiseContactForm";
import React, { memo } from "react";

// Composant HeroBackground identique à la page d'accueil
const HeroBackground = memo(function HeroBackground() {
  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === 'dark';
  
  return (
    <>
      {/* Dotted background pattern (same as PartnerHome), scrolls with content */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${require('@/lib/assets').backgroundEffectUrl})`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px',
          opacity: isDark ? 0.12 : 0.04
        }}
      />
      {/* Halo gradient overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 right-0 h-[45vh] z-[1]"
        style={{
          background: isDark
            ? `radial-gradient(ellipse at center 20%, rgba(212,237,49,0.20) 0%, rgba(212,237,49,0.12) 15%, rgba(212,237,49,0.06) 35%, rgba(0,0,0,0.1) 55%, rgba(0,0,0,0) 75%)`
            : `radial-gradient(ellipse at center 20%, rgba(212,237,49,0.25) 0%, rgba(212,237,49,0.15) 18%, rgba(212,237,49,0.08) 38%, rgba(255,255,255,0.1) 58%, rgba(255,255,255,0) 78%)`,
          filter: 'blur(20px)'
        }}
      />
    </>
  );
});

// Composant Typewriter identique à la page d'accueil
const Typewriter = memo(function Typewriter({
  phrases,
  typingSpeed = 50,
  deletingSpeed = 30,
  pauseMs = 1000,
  loop = true,
}: {
  phrases: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseMs?: number;
  loop?: boolean;
}) {
  const [phraseIndex, setPhraseIndex] = React.useState(0);
  const [displayText, setDisplayText] = React.useState("");
  const [isDeleting, setIsDeleting] = React.useState(false);

  React.useEffect(() => {
    const current = phrases[phraseIndex] || "";
    const speed = isDeleting ? deletingSpeed : typingSpeed;

    const tick = () => {
      const nextLength = displayText.length + (isDeleting ? -1 : 1);
      const nextText = current.slice(0, Math.max(0, nextLength));
      setDisplayText(nextText);

      if (!isDeleting && nextText === current) {
        setTimeout(() => setIsDeleting(true), pauseMs);
        return;
      }

      if (isDeleting && nextText === "") {
        setIsDeleting(false);
        setPhraseIndex((prev) => {
          const next = prev + 1;
          return loop ? next % phrases.length : Math.min(next, phrases.length - 1);
        });
        return;
      }
    };

    const t = setTimeout(tick, speed);
    return () => clearTimeout(t);
  }, [displayText, isDeleting, phraseIndex, phrases, typingSpeed, deletingSpeed, pauseMs, loop]);

  return (
    <span className="relative inline-flex items-baseline">
      <span aria-live="polite" aria-atomic="true">{displayText}</span>
      <span className="ml-[2px] w-[2px] h-[1em] bg-current/70 animate-caret" aria-hidden="true" />
      <style jsx global>{`
        @keyframes caret {
          0%, 49% { opacity: 0; }
          50%, 100% { opacity: 1; }
        }
        .animate-caret { animation: caret 1s step-end infinite; }
      `}</style>
    </span>
  );
});

interface HeroExpertiseProps {
  expertise: {
    expertiseFields?: {
      tag?: string;
      h1?: string;
      subtitle?: string;
    };
    title: string;
  };
}

export default function HeroExpertise({ expertise }: HeroExpertiseProps) {
  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === "dark";

  return (
    <section className={cn(
      "relative z-10 min-h-[calc(70vh-var(--header-height))] flex items-center pt-28 sm:pt-32 md:pt-36 overflow-hidden",
      isDark ? "bg-black" : "bg-white"
    )}>
      <div className="relative z-10 w-full max-w-[1250px] mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Contenu à gauche - style hero page d'accueil */}
          <div className="flex flex-col">
            {/* Tag contenant le H1 avec point clignotant */}
            {expertise.expertiseFields?.tag && (
              <div className="w-fit inline-flex items-center px-3 sm:px-4 py-1.5 bg-[#9FB832]/10 dark:bg-[#E0FF5C]/10 rounded-full text-[#9FB832] dark:text-[#E0FF5C] text-sm sm:text-base font-medium relative z-10 mb-2">
                <span className="w-2 h-2 bg-[#9FB832] dark:bg-[#E0FF5C] rounded-full mr-2 animate-pulse"></span>
                {expertise.expertiseFields.tag}
              </div>
            )}
            
            {/* H1 avec typewriter sur le dernier mot */}
            <h1 className={cn(
              "text-4xl sm:text-4xl md:text-5xl lg:text-[64px]",
              "font-semibold mb-2 sm:mb-3 leading-[1.1]",
              "tracking-[-0.04em]",
              "text-rendering-optimizeLegibility",
              "will-change-transform",
              "text-[#000] dark:text-[#F5F5F1]",
              "whitespace-pre-line"
            )}>
              {(() => {
                const title = expertise.expertiseFields?.h1;
                if (!title) return expertise.title;
                
                const words = title.split(' ');
                const lastWord = words.pop() || '';
                const restOfTitle = words.join(' ');
                
                return (
                  <>
                    {restOfTitle && `${restOfTitle} `}
                    <span className="font-bold text-[#9FB832] dark:text-[#E0FF5C] whitespace-nowrap">
                      <Typewriter 
                        phrases={[lastWord]} 
                        typingSpeed={150} 
                        deletingSpeed={100} 
                        pauseMs={800}
                        loop={false}
                      />
                    </span>
                  </>
                );
              })()}
            </h1>
            
            {/* Description - harmonisée avec la page d'accueil */}
            {expertise.expertiseFields?.subtitle && (
              <p className={cn(
                "text-base md:text-lg mt-6 mb-8 md:mb-2 max-w-2xl",
                "leading-relaxed tracking-[-0.01em]",
                "text-rendering-optimizeLegibility",
                "subpixel-antialiased",
                "text-[#000] dark:text-[#F5F5F1]"
              )}>
                {expertise.expertiseFields.subtitle}
              </p>
            )}
          </div>

          {/* Formulaire à droite */}
          <div className="relative flex flex-col items-center justify-center w-full h-full">
            <ExpertiseContactForm />
          </div>
        </div>
      </div>

      <HeroBackground />
    </section>
  );
}
