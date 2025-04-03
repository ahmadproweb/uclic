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

interface FAQExpertiseProps {
  expertiseFields: {
    faqSubtitle: string;
    faqTitle1: string;
    faqDesc1: string;
    faqTitle2: string;
    faqDesc2: string;
    faqTitle3: string;
    faqDesc3: string;
    faqTitle4: string;
    faqDesc4: string;
    faqTitle5: string;
    faqDesc5: string;
    faqTitle6: string;
    faqDesc6: string;
  };
}

// Memoized Components
const FAQTitle = memo(({ isDark, subtitle }: { isDark: boolean; subtitle: string }) => (
  <header className="space-y-6 animate-fade-in-up">
    <h2 className={cn(
      "text-5xl md:text-6xl lg:text-7xl font-normal",
      isDark ? "text-white" : "text-black"
    )}>FAQ</h2>
    <p className={cn(
      "text-base md:text-lg w-1/2",
      isDark ? "text-white" : "text-black"
    )}>
      {subtitle}
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

const FAQItem = memo(({ 
  item, 
  isOpen, 
  onToggle, 
  isDark,
  index 
}: { 
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
  isDark: boolean;
  index: number;
}) => (
  <div 
    className={cn(
      "animate-fade-in-up rounded-2xl overflow-hidden",
      "backdrop-blur-2xl hover:-translate-y-1 hover:shadow-xl"
    )}
    style={{
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(16px) saturate(180%)',
      border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
      animationDelay: `${index * 100}ms`
    }}
  >
    <button
      className={cn(
        "w-full py-4 md:py-5 px-5 md:px-6",
        "flex items-center justify-between group",
        isDark ? "text-white" : "text-black"
      )}
      onClick={onToggle}
      aria-expanded={isOpen}
      aria-controls={`faq-answer-${item.id}`}
    >
      <span className="text-lg md:text-xl font-medium pr-4">{item.question}</span>
      <span 
        className={cn(
          "w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0",
          "transition-transform duration-300",
          isOpen ? "rotate-45" : "rotate-0",
          isDark 
            ? "bg-[#E0FF5C] text-black" 
            : "bg-black text-white group-hover:bg-[#E0FF5C] group-hover:text-black"
        )}
        aria-hidden="true"
      >
        +
      </span>
    </button>
    <div 
      id={`faq-answer-${item.id}`}
      className={cn(
        "overflow-hidden transition-all duration-300",
        isOpen ? "max-h-96" : "max-h-0"
      )}
      role="region"
      aria-labelledby={`faq-question-${item.id}`}
    >
      <div className={cn(
        "p-5 md:p-6 pt-0 whitespace-pre-line text-base",
        isDark ? "text-white" : "text-black"
      )}>
        {item.answer}
      </div>
    </div>
  </div>
));

FAQItem.displayName = 'FAQItem';

function FAQExpertise({ expertiseFields }: FAQExpertiseProps) {
  const [openItem, setOpenItem] = useState<number | null>(1);
  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === 'dark';

  const faqItems: FAQItem[] = [
    {
      id: 1,
      question: expertiseFields.faqTitle1,
      answer: expertiseFields.faqDesc1,
    },
    {
      id: 2,
      question: expertiseFields.faqTitle2,
      answer: expertiseFields.faqDesc2,
    },
    {
      id: 3,
      question: expertiseFields.faqTitle3,
      answer: expertiseFields.faqDesc3,
    },
    {
      id: 4,
      question: expertiseFields.faqTitle4,
      answer: expertiseFields.faqDesc4,
    },
    {
      id: 5,
      question: expertiseFields.faqTitle5,
      answer: expertiseFields.faqDesc5,
    },
    {
      id: 6,
      question: expertiseFields.faqTitle6,
      answer: expertiseFields.faqDesc6,
    }
  ];

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
            <FAQTitle isDark={isDark} subtitle={expertiseFields.faqSubtitle} />
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

export default memo(FAQExpertise); 