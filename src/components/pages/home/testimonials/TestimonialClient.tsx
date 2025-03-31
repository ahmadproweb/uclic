'use client';

import { memo } from 'react';
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import type { Testimonial } from './types';
import Image from 'next/image';

// Types
interface TestimonialClientProps {
  testimonials: Testimonial[];
}

// Memoized Components
const StarRating = memo(({ rating }: { rating: number }) => (
  <div className="flex gap-1 mb-4 group/stars">
    {[...Array(5)].map((_, i) => (
      <svg 
        key={i} 
        width="20" 
        height="20" 
        viewBox="0 0 20 20" 
        className={cn(
          "transition-all duration-300 transform",
          "animate-fade-in-up",
          "hover:scale-110",
          i < rating ? 'fill-[#E0FF5C]' : 'fill-gray-300'
        )}
        style={{
          animationDelay: `${i * 100}ms`
        }}
        aria-label={`${i < rating ? 'Étoile remplie' : 'Étoile vide'}`}
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
  <div 
    className={cn(
      "rounded-2xl md:rounded-[32px] p-5 md:p-6",
      "transition-all duration-300",
      "hover:-translate-y-1 hover:shadow-xl",
      "cursor-pointer group backdrop-blur-sm",
      "animate-fade-in-up",
      isDark ? "bg-white/5 border border-white/10" : "bg-white border border-black/5",
      "hover:bg-white/10"
    )}
    style={{
      animationDelay: `${index * 150}ms`
    }}
  >
    <StarRating rating={testimonial.reviewGivenStar} />
    <p className={cn(
      "text-sm md:text-base max-w-md mb-4",
      "transition-colors duration-300",
      isDark ? "text-white" : "text-black"
    )}>
      &ldquo;{testimonial.review}&rdquo;
    </p>
    <div className="flex items-center gap-2 md:gap-3">
      <div className={cn(
        "w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center overflow-hidden",
        isDark ? "bg-white/10" : "bg-black/10"
      )}>
        {testimonial.imageTesti ? (
          <Image 
            src={testimonial.imageTesti} 
            alt={testimonial.title}
            width={40}
            height={40}
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <svg 
            viewBox="0 0 24 24" 
            className={cn(
              "w-4 h-4 md:w-5 md:h-5",
              isDark ? "fill-white" : "fill-black"
            )}
            aria-label="Avatar par défaut"
          >
            <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"/>
          </svg>
        )}
      </div>
      <div>
        <div className={cn(
          "text-sm md:text-base font-medium",
          "transition-colors duration-300",
          isDark ? "text-white" : "text-black"
        )}>
          {testimonial.title}
        </div>
        <div className={cn(
          "text-xs md:text-sm",
          "transition-colors duration-300",
          isDark ? "text-white/60" : "text-black/60"
        )}>
          {testimonial.clientDesignation}
        </div>
      </div>
    </div>
  </div>
));

TestimonialCard.displayName = 'TestimonialCard';

const TestimonialHeader = memo(({ isDark }: { isDark: boolean }) => (
  <div className={cn(
    "text-center mb-8 md:mb-16",
    "animate-fade-in-up"
  )}>
    <h2 className={cn(
      "text-3xl md:text-5xl font-normal mb-2 md:mb-3 tracking-[-1px]",
      isDark ? "text-white" : "text-black"
    )}>
      Nos clients parlent de nous
    </h2>
    <p className={cn(
      "text-base md:text-lg max-w-md mx-auto",
      "transition-colors duration-300",
      isDark ? "text-white" : "text-black"
    )}>
      Découvrez ce que nos clients disent de leur expérience avec Uclic
    </p>
  </div>
));

TestimonialHeader.displayName = 'TestimonialHeader';

function TestimonialClient({ testimonials }: TestimonialClientProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section 
      id="testimonials" 
      className={cn(
        "w-full pt-8 md:pt-16 pb-16 md:pb-16 relative overflow-hidden",
        isDark ? "bg-black/95 hover:bg-black" : "bg-white hover:bg-gray-50"
      )}
    >
      <div className="max-w-[1250px] mx-auto px-4 relative z-10">
        <TestimonialHeader isDark={isDark} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
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