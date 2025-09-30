'use client';

import { memo, useEffect, useRef } from 'react';
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import type { Testimonial } from './types';
import Script from 'next/script';

// Types
interface TestimonialClientProps {
  testimonials: Testimonial[];
}

// Memoized Components
const StarRating = memo(({ rating }: { rating: number }) => null);

StarRating.displayName = 'StarRating';

const TestimonialCard = memo(({ testimonial, isDark, index, isMasonry = false }: { 
  testimonial: Testimonial; 
  isDark: boolean;
  index: number;
  isMasonry?: boolean;
}) => {
  return (
  <article 
    className={cn(
      "rounded-2xl md:rounded-[24px] p-4 md:p-5",
      "hover:-translate-y-1 hover:shadow-xl backdrop-blur-sm",
      "animate-fade-in-up group h-full flex flex-col",
      isDark ? "bg-white/5 border border-white/10" : "bg-white border border-black/5",
      "hover:bg-white/10",
      isMasonry && "justify-between"
    )}
    style={{ animationDelay: `${index * 150}ms` }}
    itemScope 
    itemType="https://schema.org/Review"
  >
    <div className="flex-1 flex flex-col">
      <StarRating rating={testimonial.reviewGivenStar} />
      <a
        href={testimonial.commentUrl ?? undefined}
        target="_blank"
        rel="noopener noreferrer"
        className="no-underline"
        aria-label="Voir la preuve du commentaire"
      >
      <blockquote 
        className={cn(
          "text-sm md:text-[15px] leading-relaxed mb-4 flex-1",
          isDark ? "text-white" : "text-black",
          isMasonry && "md:line-clamp-4"
        )}
        itemProp="reviewBody"
      >
        {testimonial.review}
      </blockquote>
      </a>
    </div>
    <footer className="flex items-center gap-2 md:gap-3 mt-auto">
      <a
        href={testimonial.authorProfileUrl ?? undefined}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "w-10 h-10 md:w-12 md:h-12 aspect-square rounded-full overflow-hidden relative shrink-0",
          "flex items-center justify-center",
          isDark ? "bg-white/10 ring-1 ring-white/15" : "bg-black/10 ring-1 ring-black/10"
        )}
        aria-label={`Voir le profil de ${testimonial.title}`}
      >
        {testimonial.imageTesti && (
          <img 
            src={testimonial.imageTesti} 
            alt={`Photo de ${testimonial.title}`}
            className="w-full h-full object-cover rounded-full block"
            loading="lazy"
            itemProp="image"
          />
        )}
        <i 
          className={cn(
            "ri-user-line text-xl md:text-2xl absolute inset-0 flex items-center justify-center",
            isDark ? "text-white/80" : "text-black/80",
            testimonial.imageTesti ? "opacity-0 group-hover:opacity-100 transition-opacity duration-300" : ""
          )}
          aria-hidden="true"
        />
      </a>
      <div itemProp="author" itemScope itemType="https://schema.org/Person">
        <cite 
          className={cn(
            "text-sm md:text-[15px] font-medium not-italic",
            isDark ? "text-white" : "text-black"
          )}
          itemProp="name"
        >
          {testimonial.title}
        </cite>
        <div 
          className={cn(
            "text-[11px] md:text-xs line-clamp-1",
            isDark ? "text-white/60" : "text-black/70"
          )}
          itemProp="jobTitle"
        >
          {testimonial.clientDesignation}
        </div>
      </div>
    </footer>
  </article>
)});

// (Deprecated grid-masonry) — we fallback to CSS columns masonry for reliability

TestimonialCard.displayName = 'TestimonialCard';

const TestimonialHeader = memo(({ isDark, average, reviewCount }: { isDark: boolean; average: number; reviewCount: number }) => (
  <header className="text-center">
    <h2 className={cn(
      "max-w-5xl mx-auto text-center mb-10 md:mb-14 pt-6 md:pt-0",
      "text-2xl sm:text-3xl md:text-4xl lg:text-[40px]",
      "font-medium tracking-[-1px]",
      isDark ? "text-white/90" : "text-black/90",
      "leading-[1.1]"
    )}>
      Une communauté de +23.000 personnes suit Uclic pour parler Growth
    </h2>
    <p className={cn(
      "text-center text-black/70 dark:text-white/70 max-w-3xl mx-auto -mt-6 mb-10 md:mb-12"
    )}>
      Réservez un audit et repartez avec des tips de croissance actionnables (IA & Growth) pour booster MQL, baisser le CAC et augmenter le MRR.
    </p>
    <div className="flex flex-wrap gap-2 justify-center -mt-6 mb-8 md:mb-10">
      <span className="px-3 py-1 rounded-full text-xs font-medium bg-black/10 dark:bg-white/10 text-black/80 dark:text-white/80 border border-black/10 dark:border-white/10">+35% MQL moyen</span>
      <span className="px-3 py-1 rounded-full text-xs font-medium bg-black/10 dark:bg-white/10 text-black/80 dark:text-white/80 border border-black/10 dark:border-white/10">−22% CAC</span>
      <span className="px-3 py-1 rounded-full text-xs font-medium bg-black/10 dark:bg-white/10 text-black/80 dark:text-white/80 border border-black/10 dark:border-white/10">+12% NRR</span>
    </div>
  </header>
));

TestimonialHeader.displayName = 'TestimonialHeader';

function TestimonialClient({ testimonials }: TestimonialClientProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const ratings = testimonials.map(t => t.reviewGivenStar).filter((v) => typeof v === 'number');
  const reviewCount = ratings.length;
  const average = reviewCount > 0 ? ratings.reduce((a, b) => a + b, 0) / reviewCount : 0;

  const testimonialSchema: Record<string, any> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Uclic",
    "review": testimonials.map(testimonial => ({
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": testimonial.reviewGivenStar,
        "bestRating": "5"
      },
      "author": {
        "@type": "Person",
        "name": testimonial.title
      },
      "reviewBody": testimonial.review
    }))
  };

  if (reviewCount > 0) {
    testimonialSchema.aggregateRating = {
      "@type": "AggregateRating",
      "ratingValue": Number(average.toFixed(2)),
      "reviewCount": reviewCount,
      "bestRating": 5
    };
  }

  // Build three distinct rows by rotating the base array
  const rotate = <T,>(arr: T[], offset: number): T[] => {
    if (arr.length === 0) return arr;
    const k = ((offset % arr.length) + arr.length) % arr.length;
    return arr.slice(k).concat(arr.slice(0, k));
  };
  const len = testimonials.length;
  const row1 = testimonials;

  return (
    <section 
      id="testimonials" 
      className={cn(
        "w-full relative z-[10] overflow-hidden pt-20 pb-20 md:pt-20 md:pb-20 px-4 sm:px-6 border-b border-black/5 dark:border-white/10",
        isDark ? "bg-black" : "bg-white"
      )}
      aria-label="Témoignages clients"
    >
      {/* Local halo disabled */}

      <Script id="testimonial-schema" type="application/ld+json">
        {JSON.stringify(testimonialSchema)}
      </Script>

      {/* Background repeat disabled */}

      <div className="max-w-[1250px] mx-auto px-4 sm:px-6 relative z-10">

        <TestimonialHeader isDark={isDark} average={average} reviewCount={reviewCount} />
        
        {/* Marquee container - full width outside the main container */}
      </div>
      
      {/* Full width marquee section with multi-row masonry layout */}
      <div className="w-full overflow-visible relative px-4 sm:px-6 marquee-wrapper">
        {/* Row 1 */}
        <div className="overflow-visible">
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 2xl:columns-6 [column-gap:1rem] w-full pr-4 sm:pr-6">
            {row1.map((testimonial, index) => (
              <div key={`r1-${testimonial.id}-${index}`} className="mb-4 break-inside-avoid">
                <TestimonialCard testimonial={testimonial} isDark={isDark} index={index} isMasonry={true} />
              </div>
            ))}
          </div>
        </div>

        {/* Single block only – other rows removed */}
        {/* Strong vignette overlay applied only over sliders */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20 hidden md:block"
          style={{
            background: isDark
              ? 'radial-gradient(ellipse at center, rgba(0,0,0,0) 35%, rgba(0,0,0,0.45) 72%, rgba(0,0,0,0.75) 96%), linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0) 28%, rgba(0,0,0,0) 72%, rgba(0,0,0,0.25) 100%)'
              : 'radial-gradient(ellipse at center, rgba(255,255,255,0) 35%, rgba(255,255,255,0.35) 72%, rgba(255,255,255,0.6) 96%), linear-gradient(to bottom, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 28%, rgba(255,255,255,0) 72%, rgba(255,255,255,0.2) 100%)'
          }}
        />
      </div>
      
      {/* Reopen container for any additional content */}
      <div className="max-w-[1250px] mx-auto px-4 sm:px-6 py-4 md:py-6 relative z-10" />
    </section>
  );
}

export default memo(TestimonialClient); 