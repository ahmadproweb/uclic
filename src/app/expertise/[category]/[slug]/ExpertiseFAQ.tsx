'use client';

import { useState, memo } from 'react';
import { cn } from "@/lib/utils";
import { colors as theme } from '@/config/theme';

interface FAQProps {
  subtitle: string;
  items: Array<{
    id: number;
    question: string;
    answer: string;
  }>;
}

const BackgroundSpiral = memo(() => (
  <div 
    className={cn(
      "absolute left-[250px] top-[50px] w-[408px] h-[628px]",
      "animate-fade-in-up"
    )}
    style={{
      maskImage: 'url("/spiral.svg")',
      maskSize: 'contain',
      maskRepeat: 'no-repeat',
      backgroundColor: theme.colors.primary.main,
      transform: 'scale(0.9)'
    }}
    aria-hidden="true"
  />
));

BackgroundSpiral.displayName = 'BackgroundSpiral';

export default function ExpertiseFAQ({ subtitle, items }: FAQProps) {
  const [openItem, setOpenItem] = useState<number | null>(1);

  return (
    <section className="w-full pt-16 md:pt-24 pb-8 md:pb-12 relative overflow-hidden bg-[#f4f4f0] dark:bg-black/95 rounded-3xl">
      <BackgroundSpiral />
      <div className="max-w-[1250px] mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="col-span-1 lg:col-span-5 lg:sticky lg:top-8 lg:self-start relative z-10">
            <header className="space-y-6 animate-fade-in-up">
              <span className="text-base mb-4 block font-semibold text-[#E0FF5C]">
                {subtitle}
              </span>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-normal text-black dark:text-white">
                Questions fréquentes
              </h2>
            </header>
          </div>

          <div className="col-span-1 lg:col-span-7 relative z-10">
            <div 
              className="space-y-4"
              role="list"
              aria-label="Questions fréquemment posées"
            >
              {items.map((item, index) => (
                <div 
                  key={item.id}
                  className="animate-fade-in-up rounded-2xl overflow-hidden backdrop-blur-2xl hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(16px) saturate(180%)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  <h3>
                    <button
                      className="w-full py-4 md:py-5 px-5 md:px-6 flex items-center justify-between group text-black dark:text-white"
                      onClick={() => setOpenItem(openItem === item.id ? null : item.id)}
                      aria-expanded={openItem === item.id}
                      aria-controls={`faq-answer-${item.id}`}
                    >
                      <span className="text-lg md:text-xl font-medium pr-4">
                        {item.question}
                      </span>
                      <span 
                        className={cn(
                          "w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0",
                          "transition-transform duration-300",
                          openItem === item.id ? "rotate-45" : "rotate-0",
                          "bg-[#E0FF5C] text-black"
                        )}
                        aria-hidden="true"
                      >
                        +
                      </span>
                    </button>
                  </h3>
                  <div 
                    id={`faq-answer-${item.id}`}
                    className={cn(
                      "overflow-hidden transition-all duration-300",
                      openItem === item.id ? "max-h-96" : "max-h-0"
                    )}
                    role="region"
                    aria-labelledby={`faq-question-${item.id}`}
                  >
                    <div className="p-5 md:p-6 pt-0 whitespace-pre-line text-base text-black/80 dark:text-white/80">
                      {item.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 