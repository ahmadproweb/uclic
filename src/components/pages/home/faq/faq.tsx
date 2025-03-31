'use client';

import { useState, memo } from 'react';
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { colors as theme } from '@/config/theme';
import { CTAButton } from '@/components/ui/cta-button';

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
  <div className="space-y-6 animate-fade-in-up">
    <h2 className={cn(
      "text-5xl md:text-6xl lg:text-7xl font-normal",
      "transition-colors duration-300",
      isDark ? "text-white" : "text-black"
    )}>FAQ</h2>
    <p className={cn(
      "text-base md:text-lg max-w-md",
      "transition-colors duration-300",
      isDark ? "text-white" : "text-black"
    )}>
      Nous répondons à vos <br/>questions sur le Growth <br/> et comment bien choisir <br/>votre partenaire <br/>de croissance
    </p>
    <CTAButton 
      href="/contact"
      variant="mainCTA"
      className={cn(
        "group",
        isDark 
          ? "!bg-[#E0FF5C] !text-black hover:!bg-[#E0FF5C]/90 [&_span]:!border-black [&_svg]:!stroke-black"
          : "!bg-[#E0FF5C] !text-black hover:!bg-[#E0FF5C]/90 [&_span]:!border-black [&_svg]:!stroke-black"
      )}
    >
      Discutons de votre projet
    </CTAButton>
  </div>
));

FAQTitle.displayName = 'FAQTitle';

const BackgroundSpiral = memo(({ isDark }: { isDark: boolean }) => (
  <div 
    className={cn(
      "absolute left-[50px] -top-[100px] w-[408px] h-[628px]",
      "transition-all duration-300",
      "animate-fade-in-up"
    )}
    style={{
      WebkitMaskImage: 'url("/spiral.svg")',
      maskImage: 'url("/spiral.svg")',
      WebkitMaskSize: 'contain',
      maskSize: 'contain',
      WebkitMaskRepeat: 'no-repeat',
      maskRepeat: 'no-repeat',
      backgroundColor: isDark ? theme.colors.primary.main : 'black',
      transform: 'scale(0.9)'
    }}
  />
));

BackgroundSpiral.displayName = 'BackgroundSpiral';

const FAQItem = memo(({ 
  item, 
  isOpen, 
  onToggle, 
  isDark,
  index 
}: { 
  item: typeof faqItems[0];
  isOpen: boolean;
  onToggle: () => void;
  isDark: boolean;
  index: number;
}) => (
  <div 
    className={cn(
      "faq-item rounded-2xl overflow-hidden relative",
      "transition-all duration-300 backdrop-blur-2xl",
      "hover:-translate-y-1 hover:shadow-xl",
      "cursor-pointer group",
      "animate-fade-in-up"
    )}
    style={{
      background: isDark 
        ? 'rgba(255, 255, 255, 0.05)' 
        : 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(16px) saturate(180%)',
      WebkitBackdropFilter: 'blur(16px) saturate(180%)',
      border: isDark 
        ? '1px solid rgba(255, 255, 255, 0.1)' 
        : '1px solid rgba(0, 0, 0, 0.1)',
      animationDelay: `${index * 100}ms`
    }}
  >
    <button
      className={cn(
        "w-full py-4 md:py-5 px-5 md:px-6",
        "flex items-center justify-between",
        "transition-colors duration-300",
        isDark ? "text-white" : "text-black"
      )}
      onClick={onToggle}
      aria-expanded={isOpen}
    >
      <span className="text-lg md:text-xl font-medium pr-4">{item.question}</span>
      <div className={cn(
        "w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0",
        "transition-all duration-300 transform",
        isOpen ? "rotate-45" : "rotate-0",
        isDark 
          ? "bg-[#E0FF5C] text-black" 
          : "bg-black text-white group-hover:bg-[#E0FF5C] group-hover:text-black"
      )}>
        +
      </div>
    </button>
    <div 
      className={cn(
        "overflow-hidden transition-all duration-300",
        isOpen ? "max-h-96" : "max-h-0"
      )}
    >
      <div className={cn(
        "p-5 md:p-6 pt-0",
        "whitespace-pre-line text-base",
        "transition-colors duration-300",
        isDark ? "text-white" : "text-black"
      )}>
        {item.answer}
      </div>
    </div>
  </div>
));

FAQItem.displayName = 'FAQItem';

function FAQ() {
  const [openItem, setOpenItem] = useState<number | null>(1);
  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === 'dark';

  return (
    <section 
      className={cn(
        "w-full pt-16 md:pt-24 pb-8 md:pb-12 relative overflow-hidden",
        "transition-colors duration-300",
        isDark ? "bg-black/95" : "bg-white"
      )}
    >
      <div className="max-w-[1250px] mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative">
          <BackgroundSpiral isDark={isDark} />

          {/* Colonne de gauche */}
          <div className="col-span-1 lg:col-span-5 lg:sticky lg:top-8 lg:self-start relative z-10">
            <FAQTitle isDark={isDark} />
          </div>

          {/* Colonne de droite - Questions */}
          <div className="col-span-1 lg:col-span-7 relative z-10">
            <div className="space-y-4 relative">
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