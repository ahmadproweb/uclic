'use client';

import { useState, memo, useRef, useEffect } from 'react';
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { colors as theme } from '@/config/theme';
import { CTAButton } from '@/components/ui/cta-button';
import Script from 'next/script';

// Types
interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

// Constants
const faqItems: FAQItem[] = [
  {
    id: 1,
    question: "Quels résultats concrets puis-je attendre ?",
    answer: "Nos clients voient des améliorations mesurables sur leurs KPIs clés : plus de leads qualifiés, réduction du coût d'acquisition client et augmentation des revenus récurrents. Nous mesurons chaque KPI et vous fournissons des reportings réguliers pour garantir la transparence totale sur vos résultats."
  },
  {
    id: 2,
    question: "Combien coûte votre service ?",
    answer: "Nos missions démarrent à partir de 2 500€/mois. Contrairement aux agences traditionnelles qui facturent 8-15k€/mois, nous offrons des tarifs transparents sans engagement long terme. Nos clients voient généralement un retour sur investissement positif rapidement grâce à nos méthodes optimisées."
  },
  {
    id: 3,
    question: "Comment l'IA va-t-elle révolutionner mon marketing ?",
    answer: "L'IA automatise une grande partie des tâches manuelles (segmentation, personnalisation, optimisation) pour vous faire gagner du temps précieux. Nos outils IA analysent des milliers de points de données pour prédire les meilleures actions marketing et générer plus de conversions que les méthodes traditionnelles."
  },
  {
    id: 4,
    question: "Pourquoi choisir Uclic plutôt qu'une agence traditionnelle ?",
    answer: "Agences traditionnelles : tarifs élevés (8-15k€/mois), délais longs (3-6 mois), équipes généralistes. Uclic : tarifs compétitifs (à partir de 2.5k€/mois), résultats rapides, experts IA spécialisés. Notre équipe est plus réactive, moins chère et transparente sur les KPIs. Pas d'engagement long terme."
  },
  {
    id: 5,
    question: "Quel est votre processus de mise en place ?",
    answer: "Semaine 1 : Audit IA gratuit + stratégie personnalisée. Semaine 2-3 : Mise en place des outils et campagnes. Semaine 4+ : Optimisation continue et reporting régulier. Premiers résultats visibles rapidement, retour sur investissement positif généralement obtenu dans les premières semaines."
  },
  {
    id: 6,
    question: "Pourquoi Uclic est la référence de l'agence Growth Marketing en France ?",
    answer: "Uclic sélectionne les meilleurs experts Growth Marketing et Growth Hackers du marché. Notre méthodologie, notre réseau d'experts et notre culture de la performance font de nous le partenaire idéal pour accélérer votre croissance digitale."
  },
  {
    id: 7,
    question: "Comment l'Intelligence Artificielle booste-t-elle vos ventes ?",
    answer: "L'Intelligence Artificielle automatise l'analyse de données, prédit les tendances et optimise vos campagnes en temps réel. Notre équipe d'experts en IA utilise ces outils d'automatisation pour multiplier vos résultats par 3x. L'IA remplace les méthodes manuelles par des stratégies data-driven."
  },
  {
    id: 8,
    question: "Pourquoi adopter l'automatisation IA maintenant ?",
    answer: "Chaque jour d'attente, vos concurrents gagnent du terrain. L'Intelligence Artificielle ne fait que s'améliorer, et ceux qui adoptent l'automatisation IA maintenant créent un avantage concurrentiel décisif. Notre équipe d'experts vous accompagne dans cette transformation."
  },
  {
    id: 9,
    question: "Quelle est la différence entre une agence traditionnelle et Uclic ?",
    answer: "Contrairement aux agences traditionnelles, notre équipe d'experts en Intelligence Artificielle offre plus de flexibilité, d'expertise spécialisée et de réactivité. Chaque expert maîtrise son domaine (IA, automatisation, Growth Marketing) et nous montons des équipes sur mesure pour vos projets."
  },
  {
    id: 10,
    question: "Comment l'automatisation IA transforme-t-elle le Growth Marketing ?",
    answer: "L'automatisation IA révolutionne le Growth Marketing en remplaçant les tâches manuelles par des processus intelligents. Notre équipe utilise l'Intelligence Artificielle pour automatiser l'analyse de données, la création de campagnes, l'optimisation et le scaling. L'automatisation permet une croissance 24/7."
  },
  {
    id: 11,
    question: "Pourquoi choisir des experts spécialisés en Intelligence Artificielle ?",
    answer: "Les experts spécialisés en Intelligence Artificielle maîtrisent les outils d'automatisation les plus avancés. Notre équipe sélectionne des experts qui combinent expertise technique et vision stratégique pour maximiser l'impact de l'IA sur votre croissance marketing."
  },
  {
    id: 12,
    question: "Comment mesurez-vous l'efficacité de l'automatisation IA ?",
    answer: "Nous mesurons l'efficacité de l'automatisation IA à travers des KPIs précis : réduction du temps de traitement des données, amélioration du taux de conversion, optimisation du ROI des campagnes et scaling automatique. Notre équipe d'experts vous fournit des reportings détaillés sur l'impact de l'Intelligence Artificielle."
  }
];

// Memoized Components
interface FAQItemProps {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
  isDark: boolean;
  index: number;
}

const FAQTitle = memo(({ isDark }: { isDark: boolean }) => (
  <header className="animate-fade-in-up">
    <div className={cn(
      "inline-flex px-4 py-2 border rounded-full mb-6",
      isDark 
        ? "border-white/10 bg-white/5" 
        : "border-black/10 bg-black/5"
    )}>
      <span className={cn("font-medium text-sm", isDark ? "text-white" : "text-black")}>❓ Questions fréquentes</span>
    </div>
    
    <h2
      className={cn(
        "mb-6 pt-0",
        "text-2xl sm:text-3xl md:text-4xl",
        "font-bold tracking-[-1px] leading-[1.2]",
        isDark ? "text-white" : "text-black"
      )}
    >
      Tout ce que vous devez<br/>savoir sur notre agence
    </h2>
    
    <p
      className={cn(
        "text-sm md:text-base max-w-lg mb-8 leading-relaxed",
        isDark ? "text-white/80" : "text-black/80"
      )}
    >
      Notre agence mobilise les meilleurs experts IA et Growth Marketing pour automatiser votre acquisition et multiplier vos revenus.
    </p>

    <div className="mt-6">
      <CTAButton
        href="/audit"
        className={cn(
          "group",
          isDark 
            ? "!bg-[#E0FF5C] !text-black hover:!bg-[#E0FF5C]/90 [&_span]:!border-black [&_svg]:!stroke-black"
            : "!bg-black !text-white hover:!bg-[#E0FF5C] hover:!text-black [&_span]:!border-white hover:[&_span]:!border-black [&_svg]:!stroke-white hover:[&_svg]:!stroke-black"
        )}
      >
        Démarrer mon audit IA gratuit
      </CTAButton>
      <p className={cn(
        "text-xs mt-3 text-left",
        isDark ? "text-white/60" : "text-black/60"
      )}>
        ✅ Gratuit · ✅ 30 min · ✅ Conseils actionnables
      </p>
    </div>
  </header>
));

FAQTitle.displayName = 'FAQTitle';

const BackgroundSpiral = memo(({ isDark }: { isDark: boolean }) => (
  <div 
    className={cn(
      "absolute left-[50px] -top-[100px] w-[408px] h-[628px]",
      "animate-fade-in-up"
    )}
    style={{
      maskImage: `url(${require('@/lib/assets').getAssetUrl('/spiral.svg')})`,
      maskSize: 'contain',
      maskRepeat: 'no-repeat',
      backgroundColor: isDark ? theme.colors.primary.main : 'black',
      transform: 'scale(0.9)'
    }}
    aria-hidden="true"
  />
));

BackgroundSpiral.displayName = 'BackgroundSpiral';

function FAQItem({ item, isOpen, onToggle, isDark, index }: FAQItemProps) {
  return (
    <div 
      className={cn(
        "rounded-3xl p-4 md:p-5 mb-4",
        "backdrop-blur-md border transition-all duration-300",
        "hover:-translate-y-1",
        isDark 
          ? "bg-black/40 border-white/10 hover:bg-black/50 hover:border-white/20" 
          : "bg-white/40 border-black/5 hover:bg-white/50 hover:border-black/10",
        "animate-fade-in-up"
      )}
      style={{ animationDelay: `${index * 100}ms` }}
      role="listitem"
    >
      <h3>
        <button
          id={`faq-question-${item.id}`}
          aria-expanded={isOpen}
          aria-controls={`faq-answer-${item.id}`}
          onClick={onToggle}
          className={cn(
            "group flex w-full items-center justify-between py-2 text-left",
            isDark ? "text-white" : "text-black"
          )}
        >
          <span className="text-base md:text-lg font-semibold pr-4 flex-1">{item.question}</span>
          <span className={cn(
            "ml-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
            "border transition-all duration-200 text-xl font-light",
            isDark 
              ? "bg-black/40 border-white/10 hover:bg-white/10 text-white" 
              : "bg-white/40 border-black/10 hover:bg-black/10 text-black",
            "transform transition-transform duration-200",
            isOpen && "rotate-45"
          )}>
            +
          </span>
        </button>
      </h3>
      <div
        id={`faq-answer-${item.id}`}
        role="region"
        aria-labelledby={`faq-question-${item.id}`}
        className={cn(
          "overflow-hidden transition-all duration-300",
          isOpen ? "max-h-96 mt-2" : "max-h-0"
        )}
      >
        <div className={cn(
          "prose max-w-none pt-0",
          isDark ? "prose-invert" : "",
          "text-base leading-relaxed",
          isDark ? "text-white/70" : "text-black/70"
        )}>
          {item.answer}
        </div>
      </div>
    </div>
  );
}

function FAQ() {
  const [openItem, setOpenItem] = useState<number | null>(1);
  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === 'dark';
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  // Auto-scroll effect
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || isPaused) return;

    let animationId: number;
    let scrollSpeed = 0.5; // pixels par frame

    const autoScroll = () => {
      if (container && !isPaused) {
        container.scrollTop += scrollSpeed;
        
        // Quand on arrive en bas, revenir en haut
        if (container.scrollTop >= container.scrollHeight - container.clientHeight) {
          container.scrollTop = 0;
        }
      }
      animationId = requestAnimationFrame(autoScroll);
    };

    animationId = requestAnimationFrame(autoScroll);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isPaused]);

  return (
    <section
      id="faq"
      className={cn(
        "w-full relative overflow-hidden pt-20 pb-20 md:pt-20 md:pb-20 px-4 sm:px-6 border-b border-black/5 dark:border-white/10 z-10",
        isDark ? "bg-black" : "bg-white"
      )}
      aria-label="Questions fréquemment posées"
      style={{
        backgroundColor: isDark ? '#000000' : '#ffffff'
      }}
    >
      <Script id="faq-schema" type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </Script>

      <div className="max-w-[1250px] mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <BackgroundSpiral isDark={isDark} />

          <div className="col-span-1 lg:col-span-5 lg:sticky lg:top-8 lg:self-start relative z-10">
            <div className={cn(
              "rounded-3xl p-6 md:p-8",
              "backdrop-blur-md border",
              "transition-all duration-300",
              isDark 
                ? "bg-black/40 border-white/10 hover:border-white/20" 
                : "bg-white/40 border-black/5 hover:border-black/10",
              "animate-fade-in-up"
            )}>
              <FAQTitle isDark={isDark} />
            </div>
          </div>

          <div className="col-span-1 lg:col-span-7 relative z-10">
            <div 
              ref={scrollContainerRef}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              className={cn(
                "h-[400px] md:h-[500px] overflow-y-auto pr-2",
                "scrollbar-thin scrollbar-track-transparent",
                "transition-all duration-300",
                isDark 
                  ? "scrollbar-thumb-white/30 hover:scrollbar-thumb-white/50" 
                  : "scrollbar-thumb-black/30 hover:scrollbar-thumb-black/50"
              )}
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: isDark ? 'rgba(255,255,255,0.3) transparent' : 'rgba(0,0,0,0.3) transparent',
                scrollBehavior: isPaused ? 'smooth' : 'auto'
              }}
              role="list"
              aria-label="Questions fréquemment posées"
            >
              <div>
                {faqItems.map((item, index) => (
                  <FAQItem
                    key={item.id}
                    item={item}
                    isOpen={openItem === item.id}
                    onToggle={() => setOpenItem(openItem === item.id ? null : item.id)}
                    isDark={isDark}
                    index={index}
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

export default memo(FAQ); 