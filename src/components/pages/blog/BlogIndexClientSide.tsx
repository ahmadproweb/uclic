'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';
import { colors as theme } from '@/config/theme';
import Link from 'next/link';
import PreFooter from '@/components/footer/PreFooter';
import Pagination from '@/components/ui/Pagination';
import ScrollToTop from '@/components/ui/ScrollToTop';
import StickyShareButtons from '@/components/ui/StickyShareButtons';

// Define the blog post interface
export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  author_link?: string;
  featured_image_url: string;
  reading_time: string;
  tags?: string[];
}

// Internal BlogCard component for this page
function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
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
          src={post.featured_image_url}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>
      
      <div className="p-6 space-y-4">
        <h3 className="text-xl font-semibold text-black">
          {post.title}
        </h3>
        
        <p 
          className="text-black/80 line-clamp-2"
          dangerouslySetInnerHTML={{ __html: post.excerpt }}
        />

        <div className="flex items-center gap-2 text-sm text-black/70">
          <div className="w-6 h-6 rounded-full bg-black/10 flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          {post.author} • {post.reading_time} min read
        </div>
      </div>
    </Link>
  );
}

export default function BlogIndexClientSide({ posts: blogPosts }: { posts: BlogPost[] }) {
  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === 'dark';
  
  // Récupérer le premier article pour l'affichage à la une
  const featuredPost = blogPosts && blogPosts.length > 0 ? blogPosts[0] : null;
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedPosts, setDisplayedPosts] = useState<BlogPost[]>([]);
  const postsPerPage = 9;  // Afficher 9 articles par page dans la grille
  const totalPages = Math.ceil((blogPosts.length - 1) / postsPerPage); // Exclure l'article à la une du calcul
  
  useEffect(() => {
    // Mise à jour des articles affichés quand la page change
    // On commence toujours à l'index 1 pour exclure l'article à la une
    const startIndex = 1 + (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    setDisplayedPosts(blogPosts.slice(startIndex, endIndex));
    
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage, blogPosts]);

  if (!blogPosts || blogPosts.length === 0) {
    return <div className="text-center py-20">No blog posts found.</div>;
  }

  return (
    <section className="w-full max-w-[100vw] pt-28 md:pt-32 pb-16 md:pb-24 relative overflow-hidden">
      {/* Base Background gradient */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: isDark 
            ? `linear-gradient(180deg, ${theme.colors.common.black}, ${theme.colors.primary.main})`
            : `linear-gradient(180deg, ${theme.colors.common.white}, ${theme.colors.primary.main})`
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
          <h1 className={cn(
            "text-3xl md:text-5xl font-normal mb-4",
            isDark ? "text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" : "text-black"
          )}>
            Découvrez nos dernières<br/>actualités
          </h1>
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
        
        {/* Hero section with featured image */}
        {featuredPost && (
          <div className="relative w-full h-[40vh] md:h-[50vh] mb-16 rounded-3xl overflow-hidden shadow-xl p-4 md:p-0">
            <img
              src={featuredPost.featured_image_url}
              alt={featuredPost.title}
              className="absolute inset-0 w-full h-full object-cover rounded-3xl"
            />
            {/* Overlay with gradient */}
            <div
              className={cn(
                'absolute inset-0 bg-gradient-to-t rounded-3xl',
                isDark
                  ? 'from-black/90 to-black/30'
                  : 'from-black/70 to-transparent'
              )}
            />
            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-14">
              <div className="max-w-5xl mx-auto w-full">
                <div className="mb-4">
                  <span 
                    className={cn(
                      'text-sm uppercase tracking-wider font-semibold inline-block px-3 py-1 rounded-full',
                      isDark ? 'bg-[#D9FF4B] text-black' : 'bg-black text-[#D9FF4B]'
                    )}
                  >
                    À la une
                  </span>
                </div>
                <h2 
                  className={cn(
                    'text-3xl md:text-5xl font-bold max-w-3xl mb-4',
                    'text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]'
                  )}
                >
                  {featuredPost.title}
                </h2>
                <div 
                  className="text-white/80 flex flex-wrap items-center text-sm space-x-4 mt-4"
                >
                  <span>{featuredPost.author}</span>
                  <span>•</span>
                  <span>{featuredPost.reading_time} min read</span>
                  <span>•</span>
                  <span>{new Date(featuredPost.date).toLocaleDateString()}</span>
                </div>
                <Link 
                  href={`/blog/${featuredPost.slug}`}
                  className="px-6 py-2 rounded-full text-sm font-medium mt-8 inline-block transition-all
                    bg-[#D9FF4B] text-black hover:bg-[#D9FF4B]/90"
                >
                  Lire l&apos;article
                </Link>
              </div>
            </div>
          </div>
        )}
      
        {/* Blog grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 md:mb-16">
          {displayedPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
        
        {/* Pagination */}
        <div className="mt-12 mb-16">
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={setCurrentPage} 
          />
        </div>
      </div>

      <StickyShareButtons 
        url=""
        title="Blog Uclic - Découvrez nos dernières actualités"
      />

<div className="max-w-[1250px] mx-auto px-4 relative z-10">
          <PreFooter noBgGradient />
        </div>
      <ScrollToTop />
    </section>
  );
} 