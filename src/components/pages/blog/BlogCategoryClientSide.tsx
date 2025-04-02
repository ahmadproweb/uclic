'use client';

import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { colors as theme } from '@/config/theme';
import BlogCard from '@/components/cards/BlogCard';
import PreFooter from '@/components/footer/PreFooter';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { BlogPost } from '@/types/blog';
import Link from 'next/link';
import Image from 'next/image';
import Pagination from '@/components/ui/Pagination';
import ScrollToTop from '@/components/ui/ScrollToTop';
import StickyShareButtons from '@/components/ui/StickyShareButtons';

// Fonction pour décoder les caractères HTML
function decodeHTMLEntities(text: string) {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  return textarea.value;
}

interface BlogCategoryClientSideProps {
  posts: BlogPost[];
  category: {
    name: string;
    description?: string;
  };
  initialPage?: number;
}

export default function BlogCategoryClientSide({ 
  posts: blogPosts, 
  category,
  initialPage = 1 
}: BlogCategoryClientSideProps) {
  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === 'dark';
  
  const featuredPost = blogPosts && blogPosts.length > 0 ? blogPosts[0] : null;
  
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [displayedPosts, setDisplayedPosts] = useState<BlogPost[]>([]);
  const postsPerPage = 9;
  const totalPages = Math.ceil((blogPosts.length - 1) / postsPerPage);
  
  useEffect(() => {
    const startIndex = 1 + (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    setDisplayedPosts(blogPosts.slice(startIndex, endIndex));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage, blogPosts]);

  // Pour les utilisateurs sans JavaScript, calculer les posts à afficher initialement
  const initialStartIndex = 1 + (initialPage - 1) * postsPerPage;
  const initialEndIndex = initialStartIndex + postsPerPage;
  const initialPosts = blogPosts.slice(initialStartIndex, initialEndIndex);
  
  // Utiliser les posts du state s'ils sont définis, sinon utiliser les posts initiaux
  const postsToRender = displayedPosts.length > 0 ? displayedPosts : initialPosts;

  if (!blogPosts || blogPosts.length === 0) {
    return (
      <div className="text-center py-20">
        Aucun article trouvé dans cette catégorie.
      </div>
    );
  }

  // Construire l'URL de base pour la pagination
  const baseUrl = `/blog/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <section className="w-full max-w-[100vw] pt-28 md:pt-32 pb-16 md:pb-24 relative overflow-hidden">
      {/* Base Background gradient */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: isDark 
            ? `linear-gradient(180deg, ${theme.colors.common.black}, #E0FF5C)`
            : `linear-gradient(180deg, ${theme.colors.common.white}, #E0FF5C)`
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

      {/* Overlay gradient */}
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
            isDark ? "text-[#E0FF5C]" : "text-black"
          )}>{category.name}</span>
          <h1 className={cn(
            "text-3xl md:text-5xl font-normal mb-4",
            isDark ? "text-white" : "text-black"
          )}>
            Nos articles sur<br/>{category.name}
          </h1>
          <div className={cn(
            "w-12 h-0.5 mx-auto mb-4",
            isDark ? "bg-[#E0FF5C]" : "bg-black"
          )}/>
          {category.description && (
            <p className={cn(
              "text-base md:text-lg",
              isDark ? "text-white/100" : "text-black"
            )}>
              {category.description}
            </p>
          )}
        </div>
        
        {/* Featured Post */}
        {featuredPost && (
          <div className="relative w-full h-[40vh] md:h-[50vh] mb-16 rounded-3xl overflow-hidden shadow-xl">
            <Image
              src={featuredPost.featured_image_url}
              alt={featuredPost.title}
              className="object-cover rounded-3xl"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1250px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-14">
              <div className="max-w-5xl mx-auto w-full">
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-black text-[#E0FF5C] rounded-full text-sm z-10">
                    {featuredPost.category}
                  </span>
                  <span className={cn(
                    'text-sm uppercase tracking-wider font-semibold inline-block px-3 py-1 rounded-full',
                    isDark ? 'bg-[#E0FF5C] text-black' : 'bg-black text-[#E0FF5C]'
                  )}>
                    À la une
                  </span>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold max-w-3xl mb-4 text-white">
                  {decodeHTMLEntities(featuredPost.title.rendered || featuredPost.title)}
                </h2>
                <div className="text-white/80 flex flex-wrap items-center text-sm space-x-4 mt-4">
                  <span>{featuredPost.author}</span>
                  <span>•</span>
                  <span>{featuredPost.reading_time} min de lecture</span>
                </div>
                <Link 
                  href={`/blog/${featuredPost.slug}`}
                  className="px-6 py-2 rounded-full text-sm font-medium mt-8 inline-block bg-[#E0FF5C] text-black"
                >
                  Lire l&apos;article
                </Link>
              </div>
            </div>
          </div>
        )}
      
        {/* Blog grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 md:mb-16">
          {postsToRender.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group rounded-3xl overflow-hidden shadow-lg bg-[#E0FF5C]"
            >
              {/* Image */}
              <div className="relative w-full h-48 overflow-hidden">
                <Image
                  src={post.featured_image_url}
                  alt={post.title}
                  className="object-cover"
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                {post.category && (
                  <span className="absolute bottom-4 left-4 inline-block px-3 py-1 bg-black text-[#E0FF5C] rounded-full text-sm z-10">
                    {post.category}
                  </span>
                )}
              </div>
              
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-semibold text-black">
                  {decodeHTMLEntities(post.title.rendered || post.title)}
                </h3>
                
                <div 
                  className="text-black line-clamp-2"
                  dangerouslySetInnerHTML={{ __html: post.excerpt }}
                  style={{ color: 'rgba(0, 0, 0, 0.9)' }}
                />

                <div className="flex items-center gap-2 text-sm text-black/70">
                  <div className="w-6 h-6 rounded-full bg-black/10 flex items-center justify-center">
                    <i className="ri-time-line text-sm" aria-hidden="true" />
                  </div>
                  {post.reading_time} min de lecture
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {/* Pagination avec support progressif */}
        {totalPages > 1 && (
          <div className="mb-16">
            <Pagination 
              currentPage={currentPage} 
              totalPages={totalPages} 
              onPageChange={setCurrentPage}
              basePath={baseUrl}
            />
          </div>
        )}
      </div>

      {/* PreFooter Section */}
      <div className="max-w-[1250px] mx-auto px-4 relative z-10">
        <PreFooter noBgGradient />
      </div>
      
      <ScrollToTop />
      <StickyShareButtons 
        url=""
        title={`${category.name} - Blog UCLIC`}
      />
    </section>
  );
} 