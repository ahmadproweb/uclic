'use client';
import { useState, useEffect, memo } from 'react';
import { cn } from "@/lib/utils";
import { CTAButton } from "@/components/ui/cta-button";
import { useTheme } from "@/context/ThemeContext";

// Types
interface Step {
  title: string;
  subtitle: string;
  description: string;
  hasButton?: boolean;
}

interface ProcessExpertiseProps {
  expertiseFields: {
    processLittleTitle: string;
    processTitle: string;
    processDescription: string;
    processTitre1: string;
    processTitre2: string;
    processTitre3: string;
    descriptionTitre1: string;
    descriptionTitre2: string;
    descriptionTitre3: string;
    processBadge?: string;
    processCtaTitle?: string;
    processCtaDescription?: string;
    processCtaButton?: string;
  };
}

// Constants
const AUTOPLAY_INTERVAL = 5000;

const StepContent = memo(({ 
  step, 
  onPrev, 
  onNext, 
  isFirst, 
  isLast,
  isVisible,
  stepIndex,
  isDark,
  currentStep
}: { 
  step: Step;
  onPrev: () => void;
  onNext: () => void;
  isFirst: boolean;
  isLast: boolean;
  isVisible: boolean;
  stepIndex: number;
  isDark: boolean;
  currentStep: number;
}) => {
  // Calculer la position du bullet en fonction de l'étape active
  const bulletTopPosition = 32 + (currentStep * 200); // 32px initial + 200px par étape
  
  return (
  <div
    role="tabpanel"
    id={`step-${stepIndex}-content`}
    aria-labelledby={`step-${stepIndex}-tab`}
    className={cn(
      "absolute top-0 left-0 w-full transition-all duration-500",
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"
    )}
    hidden={!isVisible}
  >
      <div className={cn(
        "p-6 md:p-8 rounded-3xl backdrop-blur-md border transition-all duration-300 relative",
        isDark 
          ? "bg-black/40 border-white/10 hover:border-white/20" 
          : "bg-white/50 border-black/5 hover:border-black/10"
      )}>
      {/* Emoji dollar animé le long de la ligne - grossit à chaque étape */}
      {isVisible && (
        <div 
          className="hidden lg:block absolute transition-all duration-700 ease-in-out"
          style={{ 
            left: '-52px',
            top: `${bulletTopPosition}px`,
            transform: `scale(${1 + (currentStep * 0.15)})`
          }}
          aria-hidden="true"
        >
          <span className="text-3xl">💰</span>
        </div>
      )}
      <span className={cn("text-2xl md:text-4xl mb-2 md:mb-3 font-bold tracking-[-1px] block", isDark ? "text-white" : "text-black")}>
        {step.title}
      </span>
      <h3 className={cn("text-lg md:text-2xl mb-3 md:mb-5 font-bold leading-tight", isDark ? "text-white" : "text-black")}>
        {step.subtitle}
      </h3>
      <p className={cn("text-sm md:text-base mb-6 md:mb-8 leading-relaxed", isDark ? "text-white/70" : "text-black/70")}>
        {step.description}
      </p>
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 md:gap-4">
        {!isFirst && (
          <button 
            onClick={onPrev}
            aria-label="Aller à l'étape précédente"
            className={cn(
              "w-full md:w-auto group inline-flex items-center justify-center gap-2",
              "rounded-full py-3 px-6 border text-sm font-semibold",
              "transition-all duration-300 focus:outline-none focus:ring-2",
              isDark
                ? "text-white bg-black/60 border-white/10 hover:bg-white hover:text-black hover:border-white focus:ring-white/20"
                : "text-black bg-white/80 border-black/10 hover:bg-black hover:text-white hover:border-black focus:ring-black/20"
            )}
          >
            <i className="ri-arrow-left-s-line text-lg group-hover:-translate-x-1 transition-transform" />
            Étape précédente
          </button>
        )}
        {!isLast && (
          <button 
            onClick={onNext}
            aria-label="Aller à l'étape suivante"
            className={cn(
              "w-full md:w-auto group inline-flex items-center justify-center gap-2",
              "rounded-full py-3 px-6 border text-sm font-semibold",
              "transition-all duration-300 focus:outline-none focus:ring-2",
              isDark
                ? "text-white bg-black/60 border-white/10 hover:bg-white hover:text-black hover:border-white focus:ring-white/20"
                : "text-black bg-white/80 border-black/10 hover:bg-black hover:text-white hover:border-black focus:ring-black/20"
            )}
          >
            Étape suivante
            <i className="ri-arrow-right-s-line text-lg group-hover:translate-x-1 transition-transform" />
          </button>
        )}
      </div>
    </div>
  </div>
  );
});

StepContent.displayName = 'StepContent';

const PreviewStep = memo(({ step, isVisible, stepIndex }: { 
  step: Step;
  isVisible: boolean;
  stepIndex: number;
}) => (
  <div
    role="tabpanel"
    id={`step-${stepIndex}-preview`}
    aria-labelledby={`step-${stepIndex}-tab`}
    className={cn(
      "hidden md:block absolute top-[350px] left-0 w-full pl-12 pointer-events-none transition-all duration-500",
      isVisible ? "opacity-30 translate-y-12" : "opacity-0 translate-y-24"
    )}
    hidden={!isVisible}
  >
    <div className="p-8">
      <div 
        className="absolute left-0 top-10 w-4 h-4 rounded-full bg-black"
        aria-hidden="true"
      />
      <h3 className="text-5xl text-black mb-6 font-bold">
        {step.title}
      </h3>
      <h4 className="text-3xl text-black mb-6 font-bold">
        {step.subtitle}
      </h4>
    </div>
  </div>
));

PreviewStep.displayName = 'PreviewStep';

function ProcessExpertise({ expertiseFields }: ProcessExpertiseProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAutoPlayEnabled, setIsAutoPlayEnabled] = useState(true);
  const [mounted, setMounted] = useState(false);
  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === 'dark';

  // Créer les steps dynamiquement à partir des données
  const steps: Step[] = [
    {
      title: "Étape 1",
      subtitle: expertiseFields.processTitre1,
      description: expertiseFields.descriptionTitre1,
      hasButton: false
    },
    {
      title: "Étape 2",
      subtitle: expertiseFields.processTitre2,
      description: expertiseFields.descriptionTitre2,
    },
    {
      title: "Étape 3",
      subtitle: expertiseFields.processTitre3,
      description: expertiseFields.descriptionTitre3,
    }
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isAutoPlayEnabled) return;

    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev === steps.length - 1 ? 0 : prev + 1));
    }, AUTOPLAY_INTERVAL);
    
    return () => clearInterval(interval);
  }, [isAutoPlayEnabled]);

  const handleNext = () => {
    setIsAutoPlayEnabled(false);
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    setIsAutoPlayEnabled(false);
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <section 
      id="process-steps"
      className={cn(
        "w-full pt-20 pb-0 md:pt-20 relative border-t z-10",
        "hidden md:block",
        isDark ? "bg-black border-white/10" : "bg-white border-black/5"
      )}
      style={{
        backgroundColor: isDark ? '#000000' : '#ffffff',
        backgroundImage: isDark ? 'none' : `url(/backgroundstep.svg)`,
        backgroundPosition: 'right top',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '30% auto'
      }}
    >
      {/* Overlay pour rendre la souris visible en dark */}
      {isDark && (
        <div 
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            backgroundImage: `url(/backgroundstep.svg)`,
            backgroundPosition: 'right top',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '30% auto',
            opacity: 0.4,
            filter: 'invert(1) brightness(1.5)'
          }}
          aria-hidden="true"
        />
      )}
      
      <div className="max-w-[1250px] mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className={cn(
            "inline-flex px-4 py-2 border rounded-full mb-6",
            isDark 
              ? "border-white/10 bg-white/5" 
              : "border-black/10 bg-black/5"
          )}>
            <span className={cn("font-medium text-sm", isDark ? "text-white" : "text-black")}>
              {expertiseFields.processBadge || "🚀 Notre Processus"}
            </span>
          </div>
          <h2 className={cn(
            "max-w-5xl mx-auto text-center mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-bold tracking-[-1px] leading-[1.1]",
            isDark ? "text-white" : "text-black"
          )}>
            {expertiseFields.processTitle}
          </h2>
          <p className={cn(
            "text-center max-w-3xl mx-auto mb-12 text-base md:text-lg leading-relaxed",
            isDark ? "text-white/70" : "text-black/70"
          )}>
            {expertiseFields.processDescription}
          </p>
        </div>

        <div className="relative max-w-[1400px] mx-auto pb-12 md:pb-16">
          {/* Ligne verticale centrale qui continue jusqu'en bas */}
          <div className="hidden lg:block absolute left-1/2 top-0 -translate-x-1/2 z-0" style={{ height: 'calc(100% + 100px)' }}>
            <div 
              className="w-px h-full"
              style={{
                backgroundImage: isDark
                  ? 'linear-gradient(to bottom, #E0FF5C 4px, transparent 4px)'
                  : 'linear-gradient(to bottom, #9FB832 4px, transparent 4px)',
                backgroundSize: '1px 20px'
              }}
            />
          </div>

          {/* 2 colonnes égales */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start relative z-10">
            
            {/* Colonne gauche - Carte résumé sticky */}
            <div className="flex justify-end">
              <div className={cn(
                "rounded-3xl p-6 md:p-10 sticky top-24 w-full max-w-[500px]",
                isDark ? "bg-white text-black" : "bg-black text-white"
              )}>
                <p className={cn("text-sm md:text-base mb-2", isDark ? "text-black/70" : "text-white/70")}>
                  {expertiseFields.processLittleTitle}
                </p>
                <h3 className="text-xl md:text-2xl font-bold mb-4">
                  {expertiseFields.processCtaTitle || "De l'audit au scale : 48h pour démarrer"}
                </h3>
                <p className={cn("text-sm md:text-base leading-relaxed mb-6", isDark ? "text-black/80" : "text-white/80")}>
                  {expertiseFields.processCtaDescription || "Notre agence ne vend pas du conseil. Nous déployons votre machine de croissance IA : diagnostic express, campagnes automatisées 24/7, et industrialisation pour scaler sans limite."}
                </p>
                {/* Proof tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className={cn(
                    "px-4 py-2 rounded-full text-xs font-semibold backdrop-blur-md",
                    isDark 
                      ? "bg-black/10 text-black border border-black/20" 
                      : "bg-white/10 text-white border border-white/20"
                  )}>📈 +300% MQL</span>
                  <span className={cn(
                    "px-4 py-2 rounded-full text-xs font-semibold backdrop-blur-md",
                    isDark 
                      ? "bg-black/10 text-black border border-black/20" 
                      : "bg-white/10 text-white border border-white/20"
                  )}>💰 -60% CAC</span>
                  <span className={cn(
                    "px-4 py-2 rounded-full text-xs font-semibold backdrop-blur-md",
                    isDark 
                      ? "bg-black/10 text-black border border-black/20" 
                      : "bg-white/10 text-white border border-white/20"
                  )}>⚡ Scale 24/7</span>
                </div>
                <CTAButton 
                  href="/contact" 
                  variant="mainCTA" 
                  size="l"
                  className={cn(
                    isDark
                      ? "!bg-black !text-white hover:!bg-[#E0FF5C] hover:!text-black [&_svg]:!stroke-white hover:[&_svg]:!stroke-black [&_span]:border-white hover:[&_span]:border-black"
                      : "!bg-white !text-black hover:!bg-[#E0FF5C] hover:!text-black [&_svg]:!stroke-black [&_span]:border-black hover:[&_span]:border-black"
                  )}
                >
                  {expertiseFields.processCtaButton || "Démarrer en 48h"}
                </CTAButton>
              </div>
            </div>

            {/* Colonne droite - Timeline des étapes */}
            <div 
              className="relative"
              role="tablist"
              aria-label="Étapes du processus"
            >
              <div className="relative max-w-[500px]">
                {steps.map((step, index) => (
                  <StepContent
                    key={step.title}
                    step={step}
                    onPrev={handlePrev}
                    onNext={handleNext}
                    isFirst={index === 0}
                    isLast={index === steps.length - 1}
                    isVisible={currentStep === index}
                    stepIndex={index}
                    isDark={isDark}
                    currentStep={currentStep}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(ProcessExpertise); 