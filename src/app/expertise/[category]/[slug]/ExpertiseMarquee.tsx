'use client';

import React, { memo } from 'react';
import { MarqueeClient } from '@/components/pages/home/MarqueeText/MarqueeClient';

interface ServiceLink {
  text: string;
  href: string;
  description: string;
}

interface ExpertiseMarqueeProps {
  words: ServiceLink[];
}

export default memo(function ExpertiseMarquee({ words }: ExpertiseMarqueeProps) {
  return (
    <section 
      className="w-full bg-white dark:bg-black overflow-hidden py-8 will-change-transform"
      aria-label="Expertises connexes"
    >
      <MarqueeClient words={words} />
    </section>
  );
}); 