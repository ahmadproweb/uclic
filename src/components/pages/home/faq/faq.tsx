'use client';

import { useState, memo } from 'react';
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
    question: "Comment fonctionne Uclic ?",
    answer: "Uclic est une agence Growth 360° qui accompagne les entreprises dans leur stratégie de croissance digitale. Notre approche se base sur une méthodologie en 4 étapes : audit initial, définition de la stratégie, mise en place des actions, et optimisation continue des performances."
  },
  {
    id: 2,
    question: "Pourquoi faire confiance à des experts Uclic ?",
    answer: "Nos experts sont certifiés dans leurs domaines respectifs et cumulent plusieurs années d'expérience en growth marketing. Nous avons accompagné avec succès de nombreuses entreprises, de la startup à la grande entreprise, dans l'atteinte de leurs objectifs de croissance."
  },
  {
    id: 3,
    question: "Pourquoi faire appel à une agence Growth 360° ?",
    answer: `Externaliser sa stratégie growth avec Uclic permet de couvrir l'ensemble des leviers d'acquisitions tout en ayant un référent au sein de la même agence.

    Chez Uclic, quand on vous met à disposition une équipe, nous nous assurons de travailler les leviers d'acquisitions et de faire en sorte que l'ensemble de l'équipe projet travaille vers un objectif de croissance pour votre entreprise.
    
    Le cas échéant, nous vous mettons à disposition un chef de projet expert dans son domaine qui sera votre point de contact et qui s'assurera que la roadmap et les performances sont en adéquation avec vos objectifs.`
  },
  {
    id: 4,
    question: "Quels sont les services proposés par Uclic ?",
    answer: "Uclic propose une gamme complète de services en growth marketing : SEO, SEA, Social Media, Content Marketing, Email Marketing, CRO, Analytics et Data Science. Nous adaptons notre offre en fonction de vos besoins et objectifs spécifiques."
  },
  {
    id: 5,
    question: "Comment se déroule une collaboration avec Uclic ?",
    answer: "La collaboration débute par une phase de découverte où nous analysons vos besoins et objectifs. Ensuite, nous établissons ensemble un plan d'action personnalisé. Un chef de projet dédié vous accompagne tout au long de la mission et des points réguliers sont organisés pour suivre l'avancement et les résultats."
  },
  {
    id: 6,
    question: "Quelle est la durée minimale d'engagement ?",
    answer: "Nous privilégions les engagements sur 6 mois minimum pour permettre la mise en place d'une stratégie efficace et mesurer des résultats concrets. Cependant, nous adaptons nos conditions en fonction de la nature du projet et des objectifs."
  }
];

// Memoized Components
const FAQTitle = memo(({ isDark }: { isDark: boolean }) => (
  <header className="space-y-6 animate-fade-in-up">
    <h2 className={cn(
      "text-5xl md:text-6xl lg:text-7xl font-normal",
      isDark ? "text-white" : "text-black"
    )}>FAQ</h2>
    <p className={cn(
      "text-base md:text-lg w-1/2",
      isDark ? "text-white" : "text-black"
    )}>
      Nous répondons à vos questions sur le Growth et comment bien choisir votre partenaire de croissance
    </p>
    <CTAButton 
      href="/contact"
      className={cn(
        "!bg-[#E0FF5C] !text-black hover:!bg-[#E0FF5C]/90",
        "[&_span]:!border-black [&_svg]:!stroke-black"
      )}
    >
      Discutons de votre projet
    </CTAButton>
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
      maskImage: 'url("/spiral.svg")',
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
        "border-b border-black/10 dark:border-white/10 pb-4",
        isOpen && "pb-6"
      )}
      role="listitem"
    >
      <h3>
        <button
          id={`faq-question-${item.id}`}
          aria-expanded={isOpen}
          aria-controls={`faq-answer-${item.id}`}
          onClick={onToggle}
          className={cn(
            "group flex w-full items-center justify-between py-6 text-left",
            isDark ? "text-white" : "text-black"
          )}
        >
          <span className="text-xl font-medium pr-6">{item.question}</span>
          <span className={cn(
            "ml-6 flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
            isDark ? "bg-white/10" : "bg-black/10",
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
          isOpen ? "max-h-96" : "max-h-0"
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

  return (
    <section 
      className={cn(
        "w-full pt-16 md:pt-24 pb-8 md:pb-12 relative overflow-hidden",
        isDark ? "bg-black/95" : "bg-white"
      )}
    >
      <Script id="faq-schema" type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </Script>

      <div className="max-w-[1250px] mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <BackgroundSpiral isDark={isDark} />

          <div className="col-span-1 lg:col-span-5 lg:sticky lg:top-8 lg:self-start relative z-10">
            <FAQTitle isDark={isDark} />
          </div>

          <div className="col-span-1 lg:col-span-7 relative z-10">
            <div 
              className="space-y-4"
              role="list"
              aria-label="Questions fréquemment posées"
            >
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
    </section>
  );
}

export default memo(FAQ); 