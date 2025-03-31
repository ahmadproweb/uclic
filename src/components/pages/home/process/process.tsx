'use client';
import { useState, useEffect, memo, useCallback } from 'react';
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

// Constants
const AUTOPLAY_INTERVAL = 5000;

const steps: Step[] = [
  {
    title: "Étape 1",
    subtitle: "Identification des leviers à fort impact de croissance",
    description: "Nous élaborons d'abord une stratégie marketing basée sur une compréhension approfondie de votre audience cible. En utilisant le Bullseye Framework, nous passons en revue les 20 canaux de traction pour constituer une combinaison initiale de 4 à 6 canaux à tester.",
    hasButton: true
  },
  {
    title: "Étape 2",
    subtitle: "Tests et validation des hypothèses",
    description: "Nous mettons en place des expérimentations rapides pour valider ou invalider chaque canal. Notre approche data-driven nous permet d'identifier rapidement les canaux les plus prometteurs et d'optimiser nos ressources."
  },
  {
    title: "Étape 3",
    subtitle: "Optimisation et mise à l'échelle",
    description: "Une fois les canaux validés, nous intensifions nos efforts sur les plus performants. Nous optimisons chaque aspect pour maximiser le ROI et mettons en place des processus d'amélioration continue."
  }
];

// Memoized Background Components
const GrainEffect = memo(() => (
  <div 
    className="absolute inset-0 mix-blend-soft-light opacity-50"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 150 150' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      backgroundRepeat: 'repeat',
      backgroundSize: '100px 100px'
    }}
  />
));

GrainEffect.displayName = 'GrainEffect';

// Memoized Navigation Button
const NavigationButton = memo(({ 
  onClick, 
  direction, 
  children 
}: { 
  onClick: () => void; 
  direction: 'prev' | 'next';
  children: React.ReactNode;
}) => (
  <button 
    onClick={onClick}
    className="w-full md:w-auto group flex items-center justify-center text-black bg-black/5 rounded-full py-3 md:py-4 px-4 md:px-6 text-sm md:text-base hover:bg-black hover:text-white transition-all duration-300"
  >
    {direction === 'prev' && (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" 
        className="mr-2 w-4 h-4 md:w-5 md:h-5 group-hover:-translate-x-1 transition-transform duration-300">
        <path d="M20 12H4M4 12L10 6M4 12L10 18" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )}
    {children}
    {direction === 'next' && (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" 
        className="ml-2 w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform duration-300">
        <path d="M4 12H20M20 12L14 6M20 12L14 18" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )}
  </button>
));

NavigationButton.displayName = 'NavigationButton';

// Memoized Step Content
const StepContent = memo(({ 
  step, 
  onPrev, 
  onNext, 
  isFirst, 
  isLast,
  isVisible
}: { 
  step: Step;
  onPrev: () => void;
  onNext: () => void;
  isFirst: boolean;
  isLast: boolean;
  isVisible: boolean;
}) => (
  <div
    className={cn(
      "absolute top-0 left-0 w-full pl-0 md:pl-12 transition-all duration-500",
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"
    )}
  >
    <div className="p-4 md:p-8">
      <div className="hidden md:block absolute left-0 top-10 w-4 h-4 rounded-full bg-black"></div>
      <h3 className="text-3xl md:text-5xl text-black mb-4 md:mb-6 font-bold tracking-[-1px]">{step.title}</h3>
      <h4 className="text-xl md:text-3xl text-black mb-4 md:mb-6 font-bold">{step.subtitle}</h4>
      <p className="text-sm md:text-lg text-black/70 mb-6 md:mb-8 leading-relaxed">
        {step.description}
      </p>
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 md:gap-4">
        {!isFirst && (
          <NavigationButton onClick={onPrev} direction="prev">
            Précédent
          </NavigationButton>
        )}
        {step.hasButton && (
          <button className="w-full md:w-auto group flex items-center justify-center text-black bg-black/5 rounded-full py-3 md:py-4 px-4 md:px-6 text-sm md:text-base hover:bg-black hover:text-white transition-all duration-300">
            Le Bullseye Framework expliqué
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" 
              className="ml-2 w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform duration-300">
              <path d="M4 12H20M20 12L14 6M20 12L14 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}
        {!isLast && (
          <NavigationButton onClick={onNext} direction="next">
            Suivant
          </NavigationButton>
        )}
      </div>
    </div>
  </div>
));

StepContent.displayName = 'StepContent';

// Memoized Preview Step
const PreviewStep = memo(({ step, isVisible }: { 
  step: Step;
  isVisible: boolean;
}) => (
  <div
    className={cn(
      "hidden md:block absolute top-[350px] left-0 w-full pl-12 pointer-events-none transition-all duration-500",
      isVisible ? "opacity-30 translate-y-12" : "opacity-0 translate-y-24"
    )}
  >
    <div className="p-8">
      <div className="absolute left-0 top-10 w-4 h-4 rounded-full bg-black"></div>
      <h3 className="text-5xl text-black mb-6 font-bold">{step.title}</h3>
      <h4 className="text-3xl text-black mb-6 font-bold">{step.subtitle}</h4>
    </div>
  </div>
));

PreviewStep.displayName = 'PreviewStep';

function ProcessSteps() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAutoPlayEnabled, setIsAutoPlayEnabled] = useState(true);
  const [mounted, setMounted] = useState(false);
  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === 'dark';

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

  const handleNext = useCallback(() => {
    setIsAutoPlayEnabled(false);
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  }, [currentStep]);

  const handlePrev = useCallback(() => {
    setIsAutoPlayEnabled(false);
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  return (
    <section id="process-steps"
      className={cn(
        "w-full py-16 md:py-32 relative",
        "display: none md:block"
      )}
      style={{
        backgroundImage: `url(/backgroundstep.svg), linear-gradient(180deg, #E1FD6C 0%, #E6F98B 100%)`,
        backgroundPosition: 'right top, center',
        backgroundRepeat: 'no-repeat, no-repeat',
        backgroundSize: '30% auto, cover',
        backgroundBlendMode: 'normal',
      }}
    >
      <GrainEffect />
      
      <div className="max-w-[1250px] mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start relative z-10">
          {/* Carte noire */}
          <div className="col-span-1 lg:col-span-5 mb-8 lg:mb-0">
            <div className="bg-black rounded-2xl md:rounded-[32px] p-6 md:p-12 text-white">
              <p className="text-white/70 text-sm md:text-base mb-2">Du sur-mesure pour vos performances</p>
              <h2 className="text-2xl md:text-3xl font-normal mb-4">Une approche systémique, taillée pour l&apos;impact.</h2>
              <p className="text-white/80 text-base md:text-lg leading-relaxed mb-6">
                Nous mobilisons les bonnes ressources, au bon moment, avec une précision chirurgicale. Chaque étape de notre processus est optimisée pour des actions, mesurables et alignées sur vos objectifs. Pas de place pour l&apos;improvisation, des stratégies exécutées avec méthode et agilité.
              </p>
              <CTAButton 
                href="/contact" 
                variant="mainCTA" 
                size="l"
                className={cn(
                  mounted && !isDark
                    ? "!bg-white !text-black hover:!bg-[#E0FF5C] hover:!text-black [&_svg]:!stroke-black [&_span]:border-black hover:[&_span]:border-black"
                    : ""
                )}
              >
                Contactez un expert
              </CTAButton>
            </div>
          </div>

          {/* Timeline */}
          <div className="col-span-1 lg:col-span-7 relative min-h-[600px]">
            <div className="relative">
              {steps.map((step, index) => (
                <StepContent
                  key={step.title}
                  step={step}
                  onPrev={handlePrev}
                  onNext={handleNext}
                  isFirst={index === 0}
                  isLast={index === steps.length - 1}
                  isVisible={currentStep === index}
                />
              ))}
              {steps.map((step, index) => (
                <PreviewStep
                  key={`preview-${step.title}`}
                  step={step}
                  isVisible={currentStep + 1 === index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

ProcessSteps.displayName = 'ProcessSteps';

export default memo(ProcessSteps); 