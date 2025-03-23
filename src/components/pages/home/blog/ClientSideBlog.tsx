'use client';

import Link from 'next/link';
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { colors as theme } from '@/config/theme';
import PreFooter from '@/components/footer/PreFooter';

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
      {/* Base Background gradient */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: isDark 
            ? `linear-gradient(180deg, ${theme.colors.common.black}, ${theme.colors.primary.main})`
            : `linear-gradient(180deg, ${theme.colors.common.white}, ${theme.colors.primary.main})`
        }}
      />

      {/* New overlay gradient - black to transparent */}
      <div 
        className="absolute bottom-0 left-0 right-0 z-[1]"
        style={{
          background: isDark
            ? 'linear-gradient(to top, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 1) 40%, rgba(0, 0, 0, 0) 100%)'
            : 'linear-gradient(to top, rgb(243, 244, 246) 0%, rgba(243, 244, 246, 1) 40%, rgba(243, 244, 246, 0) 100%)',
          height: '25%'
        }}
      />

      <div className="max-w-[1250px] mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className={cn(
            "text-base mb-4 block font-semibold",
            isDark ? "text-[#D9FF4B]" : "text-black"
          )}>Blog</span>
          <h2 className={cn(
            "text-3xl md:text-5xl font-normal mb-4",
            isDark ? "text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" : "text-black"
          )}>
            Découvrez nos dernières<br/>actualités
          </h2>
          <div className={cn(
            "w-12 h-0.5 mx-auto mb-4",
            isDark ? "bg-[#D9FF4B]" : "bg-black"
          )}/>
          <p className={cn(
            "text-base md:text-lg",
            isDark ? "text-white/80" : "text-black/70"
          )}>
            Devenez un vrai couteau suisse avec les conseils<br/>des experts Uclic
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 md:mb-16">
          {blogPosts.map((post) => (
            <Link
              href={`/blog/${post.slug}`}
              key={post.id}
              className="group rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl backdrop-blur-sm"
              style={{
                background: `linear-gradient(145deg, 
                  ${theme.colors.primary.main}CC,
                  ${theme.colors.primary.main}99
                )`,
                backdropFilter: 'blur(10px)',
                boxShadow: `0 8px 32px -4px ${theme.colors.primary.main}40`
              }}
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
                <span className="absolute bottom-4 left-4 inline-block px-3 py-1 bg-black text-[#D9FF4B] rounded-full text-sm z-10">
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

                <div className="flex items-center gap-2 text-sm text-black/70">
                  <div className="w-6 h-6 rounded-full bg-black/10 flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  {post.author} • {post.readTime}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* See all button */}
        <div className="text-center mb-24">
          <Link
            href="/blog"
            className="inline-flex items-center px-6 py-3 bg-black text-white rounded-full hover:bg-[#D9FF4B] hover:text-black transition-all duration-300"
          >
            <span className="mr-2">Voir tout</span>
            <svg className="w-4 h-4 transform rotate-45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
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