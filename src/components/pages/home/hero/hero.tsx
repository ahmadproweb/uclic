"use client";

import { CTAButton } from "@/components/ui/cta-button";
import SocialProof from "@/components/ui/SocialProof";
import { useTheme } from "@/context/ThemeContext";
import { useVideoPopup } from "@/context/VideoPopupContext";
import { cn } from "@/lib/utils";
import React, { memo } from "react";
import HeroBackground from "./HeroBackground";
// Simple typewriter component
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


// Memoized main heading component
const MainHeading = memo(function MainHeading() {
  return (
    <>
      <div className="inline-flex px-3 sm:px-4 py-1.5 bg-[#9FB832]/10 dark:bg-[#E0FF5C]/10 rounded-full text-[#9FB832] dark:text-[#E0FF5C] text-sm sm:text-base font-medium relative z-10 mb-2">
        Agence Growth & IA orientée revenus
      </div>
    </>
  );
});

// Memoized vision text component
const VisionText = memo(function VisionText() {
  return (
    <p
      className={cn(
        "text-4xl sm:text-4xl md:text-5xl lg:text-[64px]",
        "font-semibold mb-4 sm:mb-6 leading-[1.1]",
        "tracking-[-0.04em]",
        "text-rendering-optimizeLegibility",
        "will-change-transform",
        "text-[#000] dark:text-[#F5F5F1]",
        "whitespace-pre-line"
      )}
    >
      {`Agence Growth & IA\n`}
      {`sur‑mesure pour gagner\n`}
      {`des `}
      <span className="font-bold text-[#9FB832] dark:text-[#E0FF5C] whitespace-nowrap">
        <Typewriter phrases={["visites", "prospects", "ventes", "revenus"]} typingSpeed={75} deletingSpeed={45} pauseMs={1200} />
      </span>
    </p>
  );
});

// Memoized description component
const Description = memo(function Description() {
  const { openVideoPopup } = useVideoPopup();
  return (
    <p
      className={cn(
        "text-base md:text-lg mt-6 mb-8 md:mb-2 max-w-2xl mx-auto text-center",
        "leading-relaxed tracking-[-0.01em]",
        "text-rendering-optimizeLegibility",
        "subpixel-antialiased",
        "text-[#000] dark:text-[#F5F5F1]"
      )}
    >
      Stratégie, automatisations et agents IA.
      Nous testons et industrialisons les leviers rentables: productivité ↑, CAC ↓, MRR ↑.
      Plan d’actions en 48 h.
      {" "}
      <button
        type="button"
        onClick={() =>
          openVideoPopup(
            "GRlZO8KtB7A",
            "Wladimir Delcros Founder de Uclic invité Podcast avec Benoit Dubos de Scalezia"
          )
        }
        className={cn(
          "underline underline-offset-4",
          "decoration-[#9FB832] dark:decoration-[#E0FF5C]",
          "hover:opacity-80"
        )}
      >
        Voir la vidéo
      </button>
    </p>
  );
});

// Memoized CTA buttons component
const CTAButtons = memo(function CTAButtons({ isDark }: { isDark: boolean }) {
  const { openVideoPopup } = useVideoPopup();

  return (
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
      <div className="flex items-center">
        <CTAButton href="/audit" variant={isDark ? "mainCTA" : "shiny"}>
          Audit Gratuit
        </CTAButton>
      </div>
      <div className="flex items-center gap-6">
        <SocialProof />
      </div>
    </div>
  );
});

const Hero = () => {
  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === "dark";

  return (
    <section className={cn(
      "relative min-h-[calc(70vh-var(--header-height))] flex items-center pt-28 sm:pt-32 md:pt-36",
      isDark ? "bg-black" : "bg-white"
    )}>
      <div className="relative z-10 w-full max-w-[1250px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center text-center">
          <div className="w-full">
            <MainHeading />
            <VisionText />
            <Description />
            <div className="flex justify-center mt-4 md:mt-6">
              <CTAButtons isDark={isDark} />
            </div>
          </div>
        </div>
      </div>

      <HeroBackground />
    </section>
  );
};

export default memo(Hero);
