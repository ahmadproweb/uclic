'use client';

import { memo, useState } from 'react';
import Link from 'next/link';
import '@/styles/marquee-scroll.css';
import { cn } from '@/lib/utils';
import { ArrowIcon } from '@/components/ui/icons/ArrowIcon';

interface ServiceLink {
  text: string;
  href: string;
  description: string;
  items?: Array<{
    title: string;
    href: string;
  }>;
}

interface MarqueeClientProps {
  firstRow: ServiceLink[];
  secondRow: ServiceLink[];
}

const MarqueeItem = memo(function MarqueeItem({ word }: { word: ServiceLink }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link 
        href={word.href}
        className="flex items-center group mx-2 cursor-pointer will-change-transform"
        aria-label={`${word.text} - ${word.description}`}
      >
        <div className="relative px-4 py-2">
          <span className="text-[50px] text-black dark:text-white font-normal tracking-[-0.02em] relative z-10 group-hover:text-white dark:group-hover:text-[#E0FF5C] transition-colors duration-300">
            {word.text}
          </span>
          <div 
            className="absolute inset-0 bg-[#1A2E1A] rounded-[24px] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
            aria-hidden="true"
          />
        </div>
        <ArrowIcon className="relative z-10 ml-2 text-black dark:text-white group-hover:text-[#1A2E1A] dark:group-hover:text-[#E0FF5C] -rotate-45 group-hover:rotate-0 group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-300 transform-gpu" />
      </Link>
      
      {isHovered && word.items && word.items.length > 0 && (
        <div className="absolute top-full left-0 mt-2 bg-white dark:bg-black border border-black/5 dark:border-white/10 rounded-lg shadow-lg p-4 z-50">
          <ul className="space-y-2">
            {word.items.map((item) => (
              <li key={item.href}>
                <Link 
                  href={item.href}
                  className="text-sm text-black/80 dark:text-white/80 hover:text-black dark:hover:text-white transition-colors duration-200 flex items-center gap-2"
                >
                  <span>{item.title}</span>
                  <ArrowIcon className="w-3 h-3 -rotate-45" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});

MarqueeItem.displayName = 'MarqueeItem';

const MarqueeRow = memo(function MarqueeRow({ words, isReverse = false }: { words: ServiceLink[], isReverse?: boolean }) {
  const copies = 2;

  return (
    <div className="marquee-container">
      <div 
        className={cn(
          "marquee-scroll",
          isReverse ? "animate-marquee-right" : "animate-marquee-left"
        )}
      >
        {Array.from({ length: copies }).map((_, copyIndex) => (
          words.map((word, idx) => (
            <MarqueeItem 
              key={`${isReverse ? 'reverse' : 'forward'}-${copyIndex}-${idx}`} 
              word={word} 
            />
          ))
        ))}
      </div>
    </div>
  );
});

MarqueeRow.displayName = 'MarqueeRow';

export const MarqueeClient = memo(function MarqueeClient({ firstRow, secondRow }: MarqueeClientProps) {
  // Créer un tableau unique de tous les items (sous-catégories uniquement)
  const allItems = [...firstRow, ...secondRow].reduce((acc, service) => {
    if (service.items) {
      // Ne prendre qu'une partie des items pour réduire la longueur
      const selectedItems = service.items.slice(0, 2); // Prendre seulement 2 items par catégorie
      acc.push(...selectedItems.map(item => ({
        text: item.title,
        href: item.href,
        description: item.title
      })));
    }
    return acc;
  }, [] as ServiceLink[]);

  // Diviser les items en deux rangées de manière équilibrée
  const midPoint = Math.ceil(allItems.length / 2);
  const itemsFirstRow = allItems.slice(0, midPoint);
  const itemsSecondRow = allItems.slice(midPoint);

  return (
    <div className="flex flex-col gap-0">
      <MarqueeRow words={itemsFirstRow} />
      <MarqueeRow words={itemsSecondRow} isReverse />
    </div>
  );
}); 