'use client';

import { memo } from 'react';
import Link from 'next/link';
import '@/styles/marquee-scroll.css';
import { cn } from '@/lib/utils';
import { ArrowIcon } from '@/components/ui/icons/ArrowIcon';

interface ServiceLink {
  text: string;
  href: string;
  description: string;
}

interface MarqueeClientProps {
  words: ServiceLink[];
}

const MarqueeItem = memo(function MarqueeItem({ word }: { word: ServiceLink }) {
  return (
    <Link 
      href={word.href}
      className="flex items-center group mx-2 cursor-pointer will-change-transform"
      aria-label={`${word.text} - ${word.description}`}
    >
      <div className="relative px-4 py-2">
        <span className="text-[40px] text-black dark:text-white font-normal tracking-[-0.02em] relative z-10 group-hover:text-white dark:group-hover:text-[#E0FF5C] transition-colors duration-300">
          {word.text}
        </span>
        <div 
          className="absolute inset-0 bg-[#1A2E1A] rounded-[24px] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
          aria-hidden="true"
        />
      </div>
      <ArrowIcon className="relative z-10 ml-2 group-hover:-translate-y-1 group-hover:translate-x-0.5 transition-all duration-300 transform-gpu" />
    </Link>
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

export const MarqueeClient = memo(function MarqueeClient({ words }: MarqueeClientProps) {
  const displayedWords = words.slice(0, 8);
  
  return (
    <div className="flex flex-col gap-4">
      <MarqueeRow words={displayedWords} />
      <MarqueeRow words={displayedWords} isReverse />
    </div>
  );
}); 