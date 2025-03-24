'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Testimonial } from './types';

interface TestimonialClientProps {
  testimonials: Testimonial[];
}

const StarRating = ({ rating }: { rating: number }) => {
  const starsRef = useRef<(SVGSVGElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    starsRef.current.forEach((star, index) => {
      if (star) {
        gsap.from(star, {
          scale: 0,
          opacity: 0,
          delay: index * 0.1,
          scrollTrigger: {
            trigger: star,
            start: "top bottom",
            toggleActions: "play none none reverse"
          }
        });
      }
    });
  }, []);

  return (
    <div id="star-rating" className="flex gap-1 mb-4 group/stars">
      {[...Array(5)].map((_, i) => (
        <svg 
          key={i} 
          ref={el => starsRef.current[i] = el}
          width="20" 
          height="20" 
          viewBox="0 0 20 20" 
          className={`transition-colors duration-300 ${i < rating ? 'fill-[#E0FF5C]' : 'fill-gray-300'}`}
        >
          <path d="M10 0L12.2451 6.90983H19.5106L13.6327 11.1803L15.8779 18.0902L10 13.8197L4.12215 18.0902L6.36729 11.1803L0.489435 6.90983H7.75486L10 0Z"/>
        </svg>
      ))}
    </div>
  );
};

export default function TestimonialClient({ testimonials }: TestimonialClientProps) {
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
        <div className="text-center mb-8 md:mb-16">
          <h2 className={cn(
            "text-3xl md:text-5xl font-normal mb-2 md:mb-3 tracking-[-1px]",
            isDark ? "text-white" : "text-black"
          )}>
            Nos clients parlent de <span className="text-white bg-white/10 px-2 py-1 rounded-md">nous</span>
          </h2>
          <p className={cn(
            "text-sm md:text-base",
            isDark ? "text-white/70" : "text-black/70"
          )}>
            Découvrez ce que nos clients disent de nos services
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className={cn(
                "rounded-2xl md:rounded-[32px] p-5 md:p-6",
                "transition-all duration-300",
                "hover:-translate-y-1 hover:shadow-xl",
                "cursor-pointer group backdrop-blur-sm",
                isDark ? "border border-white/10" : "border border-black/5",
                isDark ? "bg-white/5" : "bg-white"
              )}
            >
              <StarRating rating={testimonial.reviewGivenStar} />
              <p className={cn(
                "text-sm md:text-base mb-4 md:mb-6",
                isDark ? "text-white/80" : "text-black/80"
              )}>
                "{testimonial.review}"
              </p>
              <div className="flex items-center gap-2 md:gap-3">
                <div className={cn(
                  "w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center",
                  isDark ? "bg-white/10" : "bg-black/10"
                )}>
                  {testimonial.imageTesti ? (
                    <img 
                      src={testimonial.imageTesti} 
                      alt={testimonial.title}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <svg 
                      viewBox="0 0 24 24" 
                      className={cn(
                        "w-4 h-4 md:w-5 md:h-5",
                        isDark ? "fill-white" : "fill-black"
                      )}
                    >
                      <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"/>
                    </svg>
                  )}
                </div>
                <div>
                  <p className={cn(
                    "font-medium text-sm md:text-base",
                    isDark ? "text-white" : "text-black"
                  )}>
                    {testimonial.title}
                  </p>
                  <p className={cn(
                    "text-xs md:text-sm",
                    isDark ? "text-white/60" : "text-black/60"
                  )}>
                    {testimonial.clientDesignation}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 