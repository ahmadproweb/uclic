'use client';

import Link from 'next/link';
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import PreFooter from '@/components/footer/PreFooter';
import { CTAButton } from '@/components/ui/cta-button';
import LogoGrid from './LogoGrid';

// Define the blog post interface
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

export default function ClientSideBlog({ blogPosts }: ClientSideBlogProps) {
  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === 'dark';

  return (
    <section className="w-full pt-16 md:pt-20 pb-16 md:pb-24 relative overflow-hidden">
      {/* Background gradient */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[25%] z-0 block dark:hidden"
        style={{
          background: 'linear-gradient(180deg, rgba(243, 244, 246, 0) 0%, rgb(243, 244, 246) 100%)'
        }}
      />
      <div 
        className="absolute bottom-0 left-0 right-0 h-[25%] z-0 hidden dark:block"
        style={{
          background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 100%)'
        }}
      />

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
          "absolute inset-0 z-[1] mix-blend-soft-light",
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
        className="absolute bottom-0 left-0 right-0 z-[2]"
        style={{
          background: isDark
            ? 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 100%)'
            : 'linear-gradient(180deg, rgba(243, 244, 246, 0) 0%, rgb(243, 244, 246) 100%)',
          height: '25%'
        }}
      />

      <div className="max-w-[1250px] mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
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

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 md:mb-16">
          {blogPosts.map((post) => (
            <Link
              href={`/blog/${post.slug}`}
              key={post.id}
              className="group rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl bg-[#E0FF5C]"
            >
              {/* Featured Image */}
              <div className="relative w-full h-48 overflow-hidden">
                <img
                  src={`${post.featuredImage.url.replace(/\.(jpg|jpeg|png|gif)$/, '-400x250.$1')}.webp`}
                  alt={post.featuredImage.alt}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  width={400}
                  height={250}
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute bottom-4 left-4 inline-block px-3 py-1 bg-black text-[#E0FF5C] rounded-full text-sm z-10">
                  {post.category}
                </span>
              </div>
              
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-semibold text-black">
                  {post.title}
                </h3>
                
                <p className="text-black/80">
                  {post.description}
                </p>

                <div className="flex items-center text-xs text-black/60">
                  <div className="w-6 h-6 rounded-full bg-black/10 flex items-center justify-center mr-2">
                    <svg 
                      className="w-3 h-3" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path 
                        d="M12 8v4l3 3M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  {post.readTime} min de lecture
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* See all button */}
        <div className="text-center mb-24">
          <CTAButton 
            href="/blog"
            variant="simple"
            className={cn(
              isDark 
                ? "!bg-white !text-black hover:!bg-[#E0FF5C] [&_svg]:!stroke-black [&_span]:border-black hover:[&_span]:border-black hover:[&_svg]:!stroke-black"
                : "!bg-black hover:!bg-white !text-white hover:!text-black [&_svg]:!text-white [&_svg]:!stroke-white hover:[&_svg]:!text-black hover:[&_svg]:!stroke-black [&_span]:border-white hover:[&_span]:border-black"
            )}
          >
            Voir tout
          </CTAButton>
        </div>
      </div>

      {/* Partners Section with black background */}
      <div className="w-full bg-black">
        <LogoGrid />
      </div>

      {/* PreFooter Section avec conteneur similaire à BlogPostClientSide */}
      <div className="w-full relative overflow-hidden pt-32 pb-8">
        {/* Gradient transparent vers gris en haut - RENDU TRANSPARENT */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            background: 'transparent',
            height: '50%'
          }}
        />

        {/* Bande grise en bas - RENDUE TRANSPARENTE */}
        <div 
          className="absolute bottom-0 left-0 right-0 z-[1]"
          style={{
            background: 'transparent',
            height: '50%'
          }}
        />
        
        <div className="max-w-[1250px] mx-auto px-4 relative z-10">
          <PreFooter noBgGradient />
        </div>
      </div>
    </section>
  );
} 