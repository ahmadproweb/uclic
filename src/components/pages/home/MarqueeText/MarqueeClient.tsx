'use client';

import { memo } from 'react';
import Link from 'next/link';
import '@/styles/marquee-scroll.css';

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
        <span className="text-[40px] text-black dark:text-white font-normal tracking-[-0.02em] relative z-10 group-hover:text-white dark:group-hover:text-[#E0FF5C] transition-colors duration-300 will-change-transform">
          {word.text}
        </span>
        <div 
          className="absolute inset-0 bg-[#1A2E1A] rounded-[24px] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left will-change-transform"
          aria-hidden="true"
        />
      </div>
      <div className="relative z-10 ml-2" aria-hidden="true">
        <div className="w-[36px] h-[36px] rounded-full flex items-center justify-center bg-[#E0FF5C] transition-all duration-300 group-hover:-translate-y-1 will-change-transform">
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="transition-transform duration-300 group-hover:-rotate-45 will-change-transform"
            aria-hidden="true"
          >
            <path 
              d="M5 12H19M19 12L12 5M19 12L12 19" 
              stroke="black" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
});

MarqueeItem.displayName = 'MarqueeItem';

const MarqueeRow = memo(function MarqueeRow({ words, isReverse = false }: { words: ServiceLink[], isReverse?: boolean }) {
  return (
    <div className="marquee-container" aria-hidden="true">
      <div className={`marquee-scroll ${isReverse ? 'reverse' : ''}`}>
        {words.map((word, idx) => (
          <MarqueeItem key={`${isReverse ? 'reverse' : 'forward'}-${idx}`} word={word} />
        ))}
      </div>
      <div className={`marquee-scroll ${isReverse ? 'reverse' : ''}`}>
        {words.map((word, idx) => (
          <MarqueeItem key={`${isReverse ? 'reverse' : 'forward'}-duplicate-${idx}`} word={word} />
        ))}
      </div>
    </div>
  );
});

MarqueeRow.displayName = 'MarqueeRow';

export const MarqueeClient = memo(function MarqueeClient({ words }: MarqueeClientProps) {
  return (
    <div className="flex flex-col gap-4">
      <MarqueeRow words={words} />
      <MarqueeRow words={words} isReverse />
    </div>
  );
}); 