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
    question: "Pourquoi choisir un freelance Growth Marketing pour votre croissance ?",
    answer: "Un freelance Growth Marketing vous apporte une expertise pointue, une grande réactivité et une approche sur-mesure pour accélérer vos résultats. Chez Uclic, nos freelances sont sélectionnés pour leur expérience en Growth Hacking et leur capacité à générer une croissance rapide et durable pour votre entreprise."
  },
  {
    id: 2,
    question: "Qu'est-ce que le Growth Hacking et comment Uclic l'applique ?",
    answer: "Le Growth Hacking consiste à utiliser des techniques innovantes et des outils digitaux pour booster rapidement l'acquisition et la rétention client. Uclic combine l'expertise de freelances spécialisés et des stratégies de Growth Marketing éprouvées pour maximiser votre ROI à chaque étape du funnel."
  },
  {
    id: 3,
    question: "Quels sont les avantages d'une équipe de freelances Growth Marketing ?",
    answer: "Faire appel à une équipe de freelances Growth Marketing, c'est bénéficier d'une flexibilité totale, d'une expertise multi-canal et d'une capacité à s'adapter rapidement à vos enjeux business. Nos experts Uclic interviennent sur le SEO, SEA, Social Ads, Emailing, Automation et bien plus pour une croissance à 360°."
  },
  {
    id: 4,
    question: "Comment se déroule une mission Growth Marketing avec Uclic ?",
    answer: "Après un audit de vos besoins, nous constituons une équipe de freelances Growth Marketing adaptée à vos objectifs. Nous définissons ensemble la stratégie, mettons en place les actions prioritaires et suivons les résultats avec des reportings réguliers pour optimiser en continu."
  },
  {
    id: 5,
    question: "Quels résultats attendre d'une stratégie Growth Hacking ?",
    answer: "Une stratégie Growth Hacking bien menée permet d'obtenir des résultats rapides : acquisition de leads qualifiés, augmentation du trafic, amélioration du taux de conversion et croissance du chiffre d'affaires. Nos freelances Uclic s'engagent sur la performance et l'innovation."
  },
  {
    id: 6,
    question: "Pourquoi Uclic est la référence du freelance Growth Marketing en France ?",
    answer: "Uclic sélectionne les meilleurs freelances Growth Marketing et Growth Hackers du marché. Notre méthodologie, notre réseau d'experts et notre culture de la performance font de nous le partenaire idéal pour accélérer votre croissance digitale."
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
      Toutes les réponses à vos questions sur le freelance Growth Marketing, le Growth Hacking et l'accompagnement Uclic pour booster votre acquisition et votre croissance digitale.
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