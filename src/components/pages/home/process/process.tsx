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

// Constants
const AUTOPLAY_INTERVAL = 5000;

const steps: Step[] = [
  {
    title: "Étape 1",
    subtitle: "Intelligence Artificielle : automatisation de l'analyse de données",
    description: "Notre collectif de freelances experts en Intelligence Artificielle automatise l'analyse de vos données marketing. Contrairement aux agences traditionnelles qui se contentent d'intuitions, notre IA analyse 50 000+ points de données pour identifier vos leviers de croissance les plus rentables. L'automatisation remplace les suppositions par des prédictions précises basées sur l'Intelligence Artificielle. Cette approche data-driven permet d'optimiser votre ROI marketing et d'identifier les opportunités de croissance cachées que les méthodes traditionnelles manquent.",
    hasButton: true
  },
  {
    title: "Étape 2",
    subtitle: "Automatisation IA des campagnes Growth Marketing",
    description: "Notre collectif de freelances Growth Marketing utilise l'Intelligence Artificielle pour automatiser vos campagnes. Contrairement au marketing traditionnel qui crée manuellement, notre IA automatise la création, l'optimisation et le déploiement de vos campagnes. L'automatisation identifie les messages qui convertissent et les déploie instantanément grâce à l'Intelligence Artificielle. Cette automatisation IA permet une personnalisation à grande échelle et une optimisation continue des performances, générant des résultats supérieurs aux méthodes manuelles des agences traditionnelles.",
  },
  {
    title: "Étape 3",
    subtitle: "Intelligence Artificielle : automatisation 24/7 de votre croissance",
    description: "Notre collectif de freelances experts en Intelligence Artificielle automatise votre croissance 24h/24. Contrairement au marketing traditionnel qui s'arrête le soir, notre IA optimise vos campagnes en continu et maximise vos conversions pendant que vous dormez. L'automatisation ne prend jamais de pause : vos concurrents s'arrêtent, votre Intelligence Artificielle continue de travailler. Cette automatisation permanente garantit une croissance constante et une optimisation continue de vos performances marketing, créant un avantage concurrentiel durable grâce à l'Intelligence Artificielle.",
  }
];

// Memoized Components
const GrainEffect = memo(() => (
  <div 
    className="absolute inset-0 mix-blend-soft-light opacity-50"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 150 150' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      backgroundRepeat: 'repeat',
      backgroundSize: '100px 100px'
    }}
    aria-hidden="true"
  />
));

GrainEffect.displayName = 'GrainEffect';

const NavigationButton = memo(({ 
  onClick, 
  direction, 
  children,
  ariaLabel
}: { 
  onClick: () => void; 
  direction: 'prev' | 'next';
  children: React.ReactNode;
  ariaLabel: string;
}) => (
  <button 
    onClick={onClick}
    aria-label={ariaLabel}
    className={cn(
      "w-full md:w-auto group flex items-center justify-center",
      "text-black bg-black/5 rounded-full py-3 md:py-4 px-4 md:px-6",
      "text-sm md:text-base hover:bg-black hover:text-white",
      "transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-black/20"
    )}
  >
    {direction === 'prev' && (
      <i className="ri-arrow-left-s-line text-xl mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
    )}
    {children}
    {direction === 'next' && (
      <i className="ri-arrow-right-s-line text-xl ml-2 group-hover:translate-x-1 transition-transform duration-300" />
    )}
  </button>
));

NavigationButton.displayName = 'NavigationButton';

const StepContent = memo(({ 
  step, 
  onPrev, 
  onNext, 
  isFirst, 
  isLast,
  isVisible,
  stepIndex
}: { 
  step: Step;
  onPrev: () => void;
  onNext: () => void;
  isFirst: boolean;
  isLast: boolean;
  isVisible: boolean;
  stepIndex: number;
}) => (
  <div
    role="tabpanel"
    id={`step-${stepIndex}-content`}
    aria-labelledby={`step-${stepIndex}-tab`}
    className={cn(
      "absolute top-0 left-0 w-full pl-0 md:pl-12 transition-all duration-500",
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"
    )}
    hidden={!isVisible}
  >
    <div className="p-4 md:p-8">
      <div 
        className="hidden md:block absolute left-0 top-10 w-4 h-4 rounded-full bg-black"
        aria-hidden="true"
      />
      {/* Ligne pointillée verticale */}
      <div 
        className="hidden md:block absolute left-[7px] top-[60px] w-[2px] h-[400px] bg-transparent"
        style={{
          backgroundImage: 'linear-gradient(to bottom, black 2px, transparent 2px)',
          backgroundSize: '2px 16px'
        }}
        aria-hidden="true"
      />
      <span className="text-3xl md:text-5xl text-black mb-2 md:mb-4 font-bold tracking-[-1px] block">
        {step.title}
      </span>
      <h3 className="text-xl md:text-3xl text-black mb-4 md:mb-6 font-bold">
        {step.subtitle}
      </h3>
      <p className="text-sm md:text-lg text-black/70 mb-6 md:mb-8 leading-relaxed">
        {step.description}
      </p>
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 md:gap-4">
        {!isFirst && (
          <NavigationButton 
            onClick={onPrev} 
            direction="prev"
            ariaLabel="Aller à l'étape précédente"
          >
            Précédent
          </NavigationButton>
        )}
        {step.hasButton && (
          <button 
            className={cn(
              "w-full md:w-auto group flex items-center justify-center",
              "text-black bg-black/5 rounded-full py-3 md:py-4 px-4 md:px-6",
              "text-sm md:text-base hover:bg-black hover:text-white",
              "transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-black/20"
            )}
            aria-label="En savoir plus sur le Bullseye Framework"
          >
            Le Bullseye Framework expliqué
            <i className="ri-arrow-right-s-line text-xl ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        )}
        {!isLast && (
          <NavigationButton 
            onClick={onNext} 
            direction="next"
            ariaLabel="Aller à l'étape suivante"
          >
            Suivant
          </NavigationButton>
        )}
      </div>
    </div>
  </div>
));

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
        "w-full py-16 md:pt-32 md:pb-16 relative",
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
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                L'Intelligence Artificielle révolutionne le Growth Marketing
              </h2>
              <p className="text-white/70 text-sm md:text-base mb-4">
                Le marketing traditionnel promet de la notoriété mais échoue à générer des ventes. L'Intelligence Artificielle change tout : elle automatise vos campagnes, analyse vos données et transforme vos efforts marketing en générateurs de revenus. L'automatisation IA remplace les méthodes dépassées par des stratégies data-driven qui génèrent des résultats mesurables et un ROI supérieur.
              </p>
              <p className="text-white/80 text-base md:text-lg leading-relaxed mb-6">
                Uclic est à l'avant-garde de cette transformation. Notre collectif de freelances experts en Intelligence Artificielle a fait de l'automatisation son ADN. Nous combinons expertise technique spécialisée et vision stratégique pour faire du marketing votre premier générateur de revenu. L'IA automatise tout : analyse de données, création de campagnes, optimisation continue et scaling automatique. Pendant que les agences traditionnelles utilisent des méthodes manuelles, nous automatisons avec l'Intelligence Artificielle pour créer un avantage concurrentiel durable et une croissance exponentielle.
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
                Découvrez nos services IA
              </CTAButton>
            </div>
          </div>

          {/* Timeline */}
          <div 
            className="col-span-1 lg:col-span-7 relative min-h-[700px]"
            role="tablist"
            aria-label="Étapes du processus"
          >
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
                  stepIndex={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(ProcessSteps); 