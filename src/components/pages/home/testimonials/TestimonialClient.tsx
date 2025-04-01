'use client';

import { memo } from 'react';
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import type { Testimonial } from './types';
import Image from 'next/image';
import Script from 'next/script';

// Types
interface TestimonialClientProps {
  testimonials: Testimonial[];
}

// Memoized Components
const StarRating = memo(({ rating }: { rating: number }) => (
  <div className="flex gap-1 mb-4" role="img" aria-label={`Note de ${rating} sur 5 étoiles`}>
    {[...Array(5)].map((_, i) => (
      <svg 
        key={i} 
        width="20" 
        height="20" 
        viewBox="0 0 20 20" 
        className={cn(
          "transition-transform duration-300",
          "animate-fade-in-up hover:scale-110",
          i < rating ? 'fill-[#E0FF5C]' : 'fill-gray-300'
        )}
        style={{ animationDelay: `${i * 100}ms` }}
        aria-hidden="true"
      >
        <path d="M10 0L12.2451 6.90983H19.5106L13.6327 11.1803L15.8779 18.0902L10 13.8197L4.12215 18.0902L6.36729 11.1803L0.489435 6.90983H7.75486L10 0Z"/>
      </svg>
    ))}
  </div>
));

StarRating.displayName = 'StarRating';

const TestimonialCard = memo(({ testimonial, isDark, index }: { 
  testimonial: Testimonial; 
  isDark: boolean;
  index: number;
}) => (
  <article 
    className={cn(
      "rounded-2xl md:rounded-[32px] p-5 md:p-6",
      "hover:-translate-y-1 hover:shadow-xl backdrop-blur-sm",
      "animate-fade-in-up",
      isDark ? "bg-white/5 border border-white/10" : "bg-white border border-black/5",
      "hover:bg-white/10"
    )}
    style={{ animationDelay: `${index * 150}ms` }}
    itemScope 
    itemType="https://schema.org/Review"
  >
    <StarRating rating={testimonial.reviewGivenStar} />
    <blockquote 
      className={cn(
        "text-sm md:text-base mb-4",
        isDark ? "text-white" : "text-black"
      )}
      itemProp="reviewBody"
    >
      {testimonial.review}
    </blockquote>
    <footer className="flex items-center gap-2 md:gap-3">
      <figure className={cn(
        "w-9 h-9 md:w-10 md:h-10 rounded-full overflow-hidden",
        "flex items-center justify-center",
        isDark ? "bg-white/10" : "bg-black/10"
      )}>
        {testimonial.imageTesti ? (
          <Image 
            src={testimonial.imageTesti} 
            alt={`Photo de ${testimonial.title}`}
            width={40}
            height={40}
            className="w-full h-full object-cover"
            itemProp="image"
          />
        ) : (
          <svg 
            viewBox="0 0 24 24" 
            className={cn(
              "w-4 h-4 md:w-5 md:h-5",
              isDark ? "fill-white" : "fill-black"
            )}
            aria-hidden="true"
          >
            <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"/>
          </svg>
        )}
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

const TestimonialHeader = memo(({ isDark }: { isDark: boolean }) => (
  <header className="text-center mb-8 md:mb-16 animate-fade-in-up">
    <h2 className={cn(
      "text-3xl md:text-5xl font-normal mb-2 md:mb-3 tracking-[-1px]",
      isDark ? "text-white" : "text-black"
    )}>
      Nos clients parlent de nous
    </h2>
    <p className={cn(
      "text-base md:text-lg max-w-md mx-auto",
      isDark ? "text-white" : "text-black"
    )}>
      Découvrez ce que nos clients disent de leur expérience avec Uclic
    </p>
  </header>
));

TestimonialHeader.displayName = 'TestimonialHeader';

function TestimonialClient({ testimonials }: TestimonialClientProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const testimonialSchema = {
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

  return (
    <section 
      id="testimonials" 
      className={cn(
        "w-full pt-8 md:pt-16 pb-16 md:pb-16 relative overflow-hidden",
        isDark ? "bg-black/95" : "bg-white"
      )}
      aria-label="Témoignages clients"
    >
      <Script id="testimonial-schema" type="application/ld+json">
        {JSON.stringify(testimonialSchema)}
      </Script>

      <div className="max-w-[1250px] mx-auto px-4 relative z-10">
        <TestimonialHeader isDark={isDark} />
        
        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4"
          role="feed"
          aria-label="Liste des témoignages"
        >
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              isDark={isDark}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(TestimonialClient); 