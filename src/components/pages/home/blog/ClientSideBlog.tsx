'use client';

import Link from 'next/link';
import { memo } from 'react';
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { cleanHtmlEntities } from "@/utils/string";
import PreFooter from '@/components/footer/PreFooter';
import { CTAButton } from '@/components/ui/cta-button';
import LogoGrid from './LogoGrid';

// Types
interface BlogPost {
  id: number;
  category: string;
  title: string;
  description: string;
  author: string;
  date: string;
  readTime: string;
  link: string;
  slug: string;
  featuredImage: {
    url: string;
    alt: string;
  };
}

interface ClientSideBlogProps {
  blogPosts: BlogPost[];
}

// Memoized Components
const BlogHeader = memo(({ isDark }: { isDark: boolean }) => (
  <div className="text-center mb-12 md:mb-16 animate-fade-in-up">
    <div className={cn(
      "inline-flex px-4 py-2 border rounded-full mb-6",
      isDark 
        ? "border-white/10 bg-white/5" 
        : "border-black/10 bg-black/5"
    )}>
      <span className={cn("font-medium text-sm", isDark ? "text-white" : "text-black")}>📝 Blog Growth & IA</span>
    </div>
    <h2 className={cn(
      "text-3xl md:text-5xl font-bold mb-6",
      isDark ? "text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" : "text-black"
    )}>
      Les stratégies qui font<br/>vraiment croître les startups
    </h2>
    <p className={cn(
      "text-base md:text-lg max-w-2xl mx-auto text-center leading-relaxed",
      "transition-colors duration-300",
      isDark ? "text-white/90" : "text-black/80"
    )}>
      Growth Marketing, IA et automatisation : notre agence partage les tactiques concrètes 
      qui font x3 le trafic, -60% le CAC et exploser le MRR. Du concret, pas de blabla.
    </p>
  </div>
));

BlogHeader.displayName = 'BlogHeader';

const BlogPostCard = memo(({ post, index, isDark }: { post: BlogPost; index: number; isDark: boolean }) => {
  const capitalizeTitle = (title: string) => {
    return title.charAt(0).toUpperCase() + title.slice(1).toLowerCase();
  };

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "group rounded-3xl overflow-hidden",
        "transition-all duration-300",
        "hover:-translate-y-1 border backdrop-blur-md relative",
        "animate-fade-in-up"
      )}
      style={{
        animationDelay: `${index * 100}ms`,
        background: "transparent",
        borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
        boxShadow: "none"
      }}
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 rounded-3xl z-0 pointer-events-none"
        style={{
          backgroundImage: "url('/backgroundeffect.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "200px",
          opacity: isDark ? "0.4" : "0.04"
        }}
      />
      {/* Hover halo effect */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"
        style={{
          background: isDark
            ? `linear-gradient(to right, rgba(212,237,49,0.08) 0%, rgba(212,237,49,0.08) 60%, rgba(212,237,49,0) 100%)`
            : `linear-gradient(to right, rgba(212,237,49,0.12) 0%, rgba(212,237,49,0.12) 60%, rgba(212,237,49,0) 100%)`,
          filter: 'blur(20px)',
        }}
      />
      
      <div className="relative w-full h-48 overflow-hidden">
        <img
          src={`${post.featuredImage.url.replace(/\.(jpg|jpeg|png|gif)$/, '-400x250.$1')}.webp`}
          alt={post.featuredImage.alt}
          className="object-cover transition-transform duration-500 group-hover:scale-105 w-full h-full"
          loading="lazy"
          decoding="async"
          onError={(e) => {
            const target = e.currentTarget as HTMLImageElement;
            const originalUrl = post.featuredImage.url;
            const jpgFallback = originalUrl.replace(/\.(jpg|jpeg|png|gif)$/, '-400x250.$1');
            if (target.src !== jpgFallback) {
              target.src = jpgFallback;
            }
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
        <span className="absolute bottom-4 left-4 inline-block px-3 py-1 bg-black text-[#E0FF5C] rounded-full text-sm z-20">
          {post.category}
        </span>
      </div>
      
      <div className="p-6 space-y-3 relative z-10">
        <h3 className={cn("text-xl font-semibold", isDark ? "text-white" : "text-black")}>
          {cleanHtmlEntities(capitalizeTitle(post.title))}
        </h3>

        <div className={cn("flex items-center gap-2 text-sm", isDark ? "text-white/70" : "text-black/70")}>
          <div className={cn("w-6 h-6 rounded-full flex items-center justify-center", isDark ? "bg-white/10" : "bg-black/10")}>
            <i className="ri-time-line text-sm" aria-hidden="true" />
          </div>
          {post.readTime} min de lecture
        </div>
      </div>
    </Link>
  );
});

BlogPostCard.displayName = 'BlogPostCard';

const BackgroundEffects = memo(({ isDark }: { isDark: boolean }) => null);

BackgroundEffects.displayName = 'BackgroundEffects';

function ClientSideBlog({ blogPosts }: ClientSideBlogProps) {
  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === 'dark';

  return (
    <section className={cn(
      "w-full pt-16 md:pt-20 pb-16 md:pb-20 relative overflow-hidden border-b border-black/5 dark:border-white/10",
      isDark ? "bg-black" : "bg-white"
    )}>
      {/* Section-level background pattern */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: "url('/backgroundeffect.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "200px",
          opacity: isDark ? 0.25 : 0.04
        }}
        aria-hidden="true"
      />
      
      <div className="max-w-[1250px] mx-auto px-4 relative z-10">
        <BlogHeader isDark={isDark} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 md:mb-16" role="feed" aria-label="Articles de blog récents">
          {blogPosts.map((post, index) => (
            <BlogPostCard
              key={post.id}
              post={post}
              index={index}
              isDark={isDark}
            />
          ))}
        </div>

        <div className="text-center mb-20">
          <CTAButton 
            href="/blog" 
            className={cn(
              "group",
              isDark 
                ? "!bg-[#E0FF5C] !text-black hover:!bg-[#E0FF5C]/90 [&_span]:!border-black [&_svg]:!stroke-black"
                : "!bg-black !text-white hover:!bg-[#E0FF5C] hover:!text-black [&_span]:!border-white hover:[&_span]:!border-black [&_svg]:!stroke-white hover:[&_svg]:!stroke-black"
            )}
          >
            Lire tous nos articles Growth & IA
          </CTAButton>
        </div>
      </div>

      <LogoGrid />
      <PreFooter />
    </section>
  );
}

export default memo(ClientSideBlog); 