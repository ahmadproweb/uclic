'use client';

import { memo } from 'react';
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import type { Testimonial } from './types';
import Script from 'next/script';

// Types
interface TestimonialClientProps {
  testimonials: Testimonial[];
}

// Memoized Components
const StarRating = memo(({ rating }: { rating: number }) => (
  <div className="flex gap-1 mb-4" role="img" aria-label={`Note de ${rating} sur 5 étoiles`}>
    {[...Array(5)].map((_, i) => (
      <i 
        key={i} 
        className={cn(
          "ri-star-fill text-xl transition-transform duration-300",
          "animate-fade-in-up hover:scale-110",
          i < rating ? 'text-[#E0FF5C]' : 'text-gray-300'
        )}
        style={{ animationDelay: `${i * 100}ms` }}
        aria-hidden="true"
      />
    ))}
  </div>
));

StarRating.displayName = 'StarRating';

const TestimonialCard = memo(({ testimonial, isDark, index, isMasonry = false }: { 
  testimonial: Testimonial; 
  isDark: boolean;
  index: number;
  isMasonry?: boolean;
}) => (
  <article 
    className={cn(
      "rounded-2xl md:rounded-[32px] p-4 md:p-5",
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
      <blockquote 
        className={cn(
          "text-sm md:text-base mb-4 flex-1",
          isDark ? "text-white" : "text-black",
          isMasonry && "line-clamp-3"
        )}
        itemProp="reviewBody"
      >
        {testimonial.review}
      </blockquote>
    </div>
    <footer className="flex items-center gap-2 md:gap-3 mt-auto">
      <figure className={cn(
        "w-9 h-9 md:w-10 md:h-10 rounded-full overflow-hidden relative",
        "flex items-center justify-center",
        isDark ? "bg-white/10" : "bg-black/10"
      )}>
        {testimonial.imageTesti && (
          <img 
            src={testimonial.imageTesti} 
            alt={`Photo de ${testimonial.title}`}
            className="w-full h-full object-cover"
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
      </figure>
      <div itemProp="author" itemScope itemType="https://schema.org/Person">
        <cite 
          className={cn(
            "text-sm md:text-base font-medium not-italic",
            isDark ? "text-white" : "text-black"
          )}
          itemProp="name"
        >
          {testimonial.title}
        </cite>
        <div 
          className={cn(
            "text-xs md:text-sm",
            isDark ? "text-white/60" : "text-black/60"
          )}
          itemProp="jobTitle"
        >
          {testimonial.clientDesignation}
        </div>
      </div>
    </footer>
  </article>
));

TestimonialCard.displayName = 'TestimonialCard';

const TestimonialHeader = memo(({ isDark, average, reviewCount }: { isDark: boolean; average: number; reviewCount: number }) => (
  <header className="text-center">
    <h2 className={cn(
      "max-w-5xl mx-auto text-center mb-16 md:mb-20 pt-8 md:pt-0",
      "text-3xl sm:text-4xl md:text-5xl lg:text-[50px]",
      "font-medium tracking-[-1px]",
      isDark ? "text-white/90" : "text-black/90",
      "leading-[1.1]"
    )}>
      Ils nous confient leur croissance
    </h2>
    <p className={cn(
      "text-center text-black/70 dark:text-white/70 max-w-3xl mx-auto -mt-10 mb-12 md:mb-16"
    )}>
      Note moyenne {average.toFixed(1)}/5 sur {reviewCount} avis · IA & Growth orientés résultats (MQL, CAC, MRR, rétention).
    </p>
    <div className="flex flex-wrap gap-2 justify-center -mt-6 mb-8 md:mb-10">
      <span className="px-3 py-1 rounded-full text-xs font-medium bg-black/10 dark:bg-white/10 text-black/80 dark:text-white/80 border border-black/10 dark:border-white/10">+35% MQL</span>
      <span className="px-3 py-1 rounded-full text-xs font-medium bg-black/10 dark:bg-white/10 text-black/80 dark:text-white/80 border border-black/10 dark:border-white/10">-22% CAC</span>
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

  return (
    <section 
      id="testimonials" 
      className={cn(
        "w-full relative overflow-hidden pt-20 pb-12 md:pt-20 md:pb-16 px-4 sm:px-6 border-b border-black/5 dark:border-white/10",
        isDark ? "bg-black" : "bg-white"
      )}
      aria-label="Témoignages clients"
    >
      {/* Fixed halo background effect */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 right-0 h-[45vh] z-0"
        style={{
          background: isDark
            ? `radial-gradient(ellipse at center 20%, rgba(212,237,49,0.20) 0%, rgba(212,237,49,0.12) 15%, rgba(212,237,49,0.06) 35%, rgba(0,0,0,0.1) 55%, rgba(0,0,0,0) 75%)`
            : `radial-gradient(ellipse at center 20%, rgba(212,237,49,0.25) 0%, rgba(212,237,49,0.15) 18%, rgba(212,237,49,0.08) 38%, rgba(255,255,255,0.1) 58%, rgba(255,255,255,0) 78%)`,
          filter: 'blur(20px)'
        }}
      />

      <Script id="testimonial-schema" type="application/ld+json">
        {JSON.stringify(testimonialSchema)}
      </Script>

      {/* Section-level background pattern */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: 'url("https://framerusercontent.com/images/g0QcWrxr87K0ufOxIUFBakwYA8.png")',
          backgroundRepeat: 'repeat',
          backgroundSize: '200px',
          opacity: isDark ? 0.25 : 0.04
        }}
        aria-hidden="true"
      />

      <div className="max-w-[1250px] mx-auto px-4 sm:px-6 relative z-10">

        <TestimonialHeader isDark={isDark} average={average} reviewCount={reviewCount} />
        
        {/* Marquee container - full width outside the main container */}
      </div>
      
      {/* Full width marquee section with multi-row masonry layout */}
      <div className="w-full overflow-hidden relative -mx-4 sm:-mx-6">
        {/* Row 1 */}
        <div className="group">
          <div className="flex animate-marquee gap-4" style={{ animationDuration: '28s' }}>
            {[...testimonials, ...testimonials].map((testimonial, index) => {
              return (
                <div key={`r1-${testimonial.id}-${index}`} className={`flex-shrink-0 w-72`}>
                  <TestimonialCard testimonial={testimonial} isDark={isDark} index={index} isMasonry={true} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Row 2 - reverse direction, offset */}
        <div className="group mt-6">
          <div className="flex animate-marquee gap-4" style={{ animationDuration: '34s', animationDirection: 'reverse' }}>
            {[...testimonials, ...testimonials].map((testimonial, index) => {
              return (
                <div key={`r2-${testimonial.id}-${index}`} className={`flex-shrink-0 w-72`}>
                  <TestimonialCard testimonial={testimonial} isDark={isDark} index={index} isMasonry={true} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Row 3 */}
        <div className="group mt-6">
          <div className="flex animate-marquee gap-4" style={{ animationDuration: '31s' }}>
            {[...testimonials, ...testimonials].map((testimonial, index) => {
              return (
                <div key={`r3-${testimonial.id}-${index}`} className={`flex-shrink-0 w-72`}>
                  <TestimonialCard testimonial={testimonial} isDark={isDark} index={index} isMasonry={true} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Reopen container for any additional content */}
      <div className="max-w-[1250px] mx-auto px-4 sm:px-6 py-8 md:py-12 relative z-10" />
    </section>
  );
}

export default memo(TestimonialClient); 