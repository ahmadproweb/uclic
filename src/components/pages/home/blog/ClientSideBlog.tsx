'use client';

import Link from 'next/link';
import { memo } from 'react';
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
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
    <span className={cn(
      "text-base mb-4 block font-semibold",
      isDark ? "text-[#E0FF5C]" : "text-black"
    )}>Blog</span>
    <h2 className={cn(
      "text-3xl md:text-5xl font-normal mb-4",
      isDark ? "text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" : "text-black"
    )}>
      Découvrez nos dernières<br/>actualités
    </h2>
    <div className={cn(
      "w-12 h-0.5 mx-auto mb-4",
      isDark ? "bg-[#E0FF5C]" : "bg-black"
    )}/>
    <p className={cn(
      "text-base md:text-lg max-w-md mx-auto text-center",
      "transition-colors duration-300",
      isDark ? "text-white" : "text-black"
    )}>
      Découvrez nos derniers articles sur le Growth Marketing et la transformation digitale
    </p>
  </div>
));

BlogHeader.displayName = 'BlogHeader';

const BlogPostCard = memo(({ post, index }: { post: BlogPost; index: number }) => {
  const capitalizeTitle = (title: string) => {
    return title.charAt(0).toUpperCase() + title.slice(1).toLowerCase();
  };

  return (
    <article
      className={cn(
        "group rounded-3xl overflow-hidden",
        "transition-all duration-300",
        "hover:-translate-y-1 hover:shadow-xl",
        "bg-[#E0FF5C]",
        "animate-fade-in-up"
      )}
      style={{
        animationDelay: `${index * 100}ms`
      }}
    >
      <Link href={`/blog/${post.slug}`} className="block">
        <figure className="relative w-full h-48 overflow-hidden">
          <img
            src={`${post.featuredImage.url.replace(/\.(jpg|jpeg|png|gif)$/, '-400x250.$1')}.webp`}
            alt={post.featuredImage.alt}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            width={400}
            height={250}
            loading="lazy"
            decoding="async"
            onError={(e) => {
              const target = e.currentTarget as HTMLImageElement;
              const jpgFallback = post.featuredImage.url.replace(/\.(jpg|jpeg|png|gif)$/, '-400x250.$1');
              if (target.src !== jpgFallback) {
                target.src = jpgFallback;
              }
            }}
          />
          <figcaption className="absolute bottom-4 left-4 inline-block px-3 py-1 bg-black text-[#E0FF5C] rounded-full text-sm z-10">
            {post.category}
          </figcaption>
        </figure>
        
        <div className="p-6">
          <h3 className="text-xl font-semibold text-black normal-case">
            {capitalizeTitle(post.title)}
          </h3>
          
          <p className="text-black/80 mt-4 ">
            {post.description}
          </p>

          <time className="flex items-center text-xs text-black/60 mt-4">
            <span className="w-6 h-6 rounded-full bg-black/10 flex items-center justify-center mr-2">
              <i className="ri-time-line text-sm" aria-hidden="true" />
            </span>
            {post.readTime} min de lecture
          </time>
        </div>
      </Link>
    </article>
  );
});

BlogPostCard.displayName = 'BlogPostCard';

const BackgroundEffects = memo(({ isDark }: { isDark: boolean }) => (
  <>
    {/* Base Background gradient */}
    <div 
      className="absolute inset-0 z-0"
      style={{
        background: isDark 
          ? 'linear-gradient(180deg, #000000 0%, #88954e 30%, #acbf59 50%, rgb(143 157 81) 80%, #000000 100%)'
          : 'linear-gradient(180deg, #ffffff 0%, #E3FC76 30%, #E3FC76 50%, rgb(230 255 119) 80%, #ffffff 100%)'
      }}
    />

    {/* Grain effect overlay */}
    <div 
      className={cn(
        "absolute inset-0 z-0 mix-blend-soft-light",
        isDark ? "opacity-90" : "opacity-50"
      )}
      style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.7\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'0.8\'/%3E%3C/svg%3E")',
        backgroundRepeat: 'repeat',
        backgroundSize: '100px 100px'
      }}
    />

    {/* New overlay gradient - black to transparent */}
    <div 
      className="absolute bottom-0 left-0 right-0 h-[25%] z-[2]"
      style={{
        background: isDark
          ? 'linear-gradient(to top, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 1) 10%, rgba(0, 0, 0, 0) 100%)'
          : 'linear-gradient(to top, rgb(243, 244, 246) 0%, rgba(243, 244, 246, 1) 40%, rgba(243, 244, 246, 0) 100%)'
      }}
    />
  </>
));

BackgroundEffects.displayName = 'BackgroundEffects';

function ClientSideBlog({ blogPosts }: ClientSideBlogProps) {
  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === 'dark';

  return (
    <section className="w-full pt-16 md:pt-20 pb-16 md:pb-24 relative overflow-hidden">
      <BackgroundEffects isDark={isDark} />

      <div className="max-w-[1250px] mx-auto px-4 relative z-10">
        <BlogHeader isDark={isDark} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 md:mb-16" role="feed" aria-label="Articles de blog récents">
          {blogPosts.map((post, index) => (
            <BlogPostCard
              key={post.id}
              post={post}
              index={index}
            />
          ))}
        </div>

        <div className="text-center mb-24">
          <CTAButton 
            href="/blog" 
            className={cn(
              isDark 
                ? "!bg-white !text-black hover:!bg-[#E0FF5C] [&_svg]:!stroke-black [&_span]:border-black hover:[&_span]:border-black hover:[&_svg]:!stroke-black"
                : "!bg-black hover:!bg-white !text-white hover:!text-black [&_svg]:!text-white [&_svg]:!stroke-white hover:[&_svg]:!text-black hover:[&_svg]:!stroke-black [&_span]:border-white hover:[&_span]:border-black"
            )}
          >
            Voir tous les articles
          </CTAButton>
        </div>
      </div>

      <LogoGrid />
      <PreFooter />
    </section>
  );
}

export default memo(ClientSideBlog); 