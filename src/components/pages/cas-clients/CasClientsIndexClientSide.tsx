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

// Define the portfolio post interface
export interface PortfolioPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  };
}

// Internal PortfolioCard component for this page
function PortfolioCard({ post }: { post: PortfolioPost }) {
  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === 'dark';
  
  return (
    <Link
      href={`/cas-clients/${post.slug}`}
      className="group rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1 border backdrop-blur-md relative"
      style={{
        background: "transparent",
        borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
        boxShadow: "none",
      }}
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 rounded-3xl z-0 pointer-events-none"
        style={{
          backgroundImage: `url(${require('@/lib/assets').backgroundEffectUrl})`,
          backgroundRepeat: "repeat",
          backgroundSize: "200px",
          opacity: isDark ? "0.4" : "0.04"
        }}
      />
      
      {/* Hover halo effect */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: isDark
            ? `linear-gradient(to right, rgba(212,237,49,0.08) 0%, rgba(212,237,49,0.08) 60%, rgba(212,237,49,0) 100%)`
            : `linear-gradient(to right, rgba(212,237,49,0.10) 0%, rgba(212,237,49,0.10) 60%, rgba(212,237,49,0) 100%)`,
          filter: 'blur(20px)',
        }}
      />
      
      {/* Featured Image */}
      <div className="relative w-full h-48 overflow-hidden">
        <img
          src={post.featuredImage?.node.sourceUrl || '/images/default-post.jpg'}
          alt={post.featuredImage?.node.altText || post.title}
          className="object-cover transition-transform duration-500 group-hover:scale-105 w-full h-full"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
        <span className="absolute bottom-4 left-4 inline-block px-3 py-1 bg-black text-[#E0FF5C] rounded-full text-sm z-20">
          Cas client
        </span>
      </div>

      <div className="p-6 space-y-3 relative z-10">
        <h3 className={cn("text-xl font-semibold", isDark ? "text-white" : "text-black")}>
          {post.title}
        </h3>

        <div className={cn("flex items-center gap-2 text-sm", isDark ? "text-white/70" : "text-black/70") }>
          <div className={cn("w-6 h-6 rounded-full flex items-center justify-center", isDark ? "bg-white/10" : "bg-black/10") }>
            <i className="ri-time-line text-sm" aria-hidden="true" style={{ color: isDark ? theme.colors.primary.main : undefined }} />
          </div>
          Uclic
        </div>
      </div>
    </Link>
  );
}

export default function CasClientsIndexClientSide({ 
  posts: portfolioPosts,
  initialPage = 1 
}: { 
  posts: PortfolioPost[];
  initialPage?: number;
}) {
  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === 'dark';

  // Récupérer le premier article pour l'affichage à la une
  const featuredPost = portfolioPosts && portfolioPosts.length > 0 ? portfolioPosts[0] : null;
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [displayedPosts, setDisplayedPosts] = useState<PortfolioPost[]>([]);
  const postsPerPage = 9;  // Afficher 9 articles par page dans la grille
  const totalPages = Math.ceil((portfolioPosts.length - 1) / postsPerPage); // Exclure l'article à la une du calcul
  
  useEffect(() => {
    const startIndex = 1 + (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    setDisplayedPosts(portfolioPosts.slice(startIndex, endIndex));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage, portfolioPosts]);

  const initialPosts = portfolioPosts.slice(1, 1 + postsPerPage);
  const postsToRender = displayedPosts.length > 0 ? displayedPosts : initialPosts;

  if (!portfolioPosts || portfolioPosts.length === 0) {
    return <div className="text-center py-20 text-black">Aucun cas client trouvé.</div>;
  }

  return (
    <section className={cn(
      "w-full relative overflow-hidden pt-32 pb-16 md:pb-24 px-4 sm:px-6",
      isDark ? "bg-black" : "bg-white"
    )}>
      {/* Fixed halo background */}
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
      
      <div
        className={cn(
          "max-w-[1250px] mx-auto px-4 sm:px-6 py-8 md:py-12 relative z-10 rounded-2xl border",
          isDark ? "border-white/10" : "border-black/5"
        )}
      >
        {/* Background pattern */}
        <div className="absolute inset-0 rounded-2xl -z-10">
          <div
            className="absolute inset-0 rounded-2xl"
            style={{
              backgroundImage: `url(${require('@/lib/assets').backgroundEffectUrl})`,
              backgroundRepeat: "repeat",
              backgroundSize: "200px",
              opacity: isDark ? "0.25" : "0.04"
            }}
          />
        </div>
        {/* Header */}
        <div className="text-center mb-8 xs:mb-10 sm:mb-12 md:mb-16">
          <span
            className={cn(
              "text-sm xs:text-base mb-3 xs:mb-4 block font-semibold",
              isDark ? "text-[#E0FF5C]" : "text-black"
            )}
          >
            Cas Clients
          </span>
          <h1
            className={cn(
              "text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-normal mb-3 xs:mb-4",
              isDark ? "text-white" : "text-black"
            )}
          >
            Découvrez nos réalisations
            <br className="hidden xs:block" /> et succès clients
          </h1>
          <div
            className={cn(
              "w-10 xs:w-12 h-0.5 mx-auto mb-3 xs:mb-4",
              isDark ? "bg-[#E0FF5C]" : "bg-black"
            )}
          />
          <p
            className={cn(
              "text-sm xs:text-base md:text-lg",
              isDark ? "text-white/100" : "text-black/80"
            )}
          >
            Explorez nos cas clients et découvrez comment
            <br className="hidden xs:block" /> nous aidons les entreprises à réussir
          </p>
        </div>
        
        {/* Hero section with featured post */}
        {featuredPost && (
          <div className="relative w-full h-[35vh] xs:h-[40vh] sm:h-[45vh] md:h-[50vh] mb-12 xs:mb-14 sm:mb-16 rounded-2xl xs:rounded-3xl overflow-hidden shadow-xl">
            <img
              src={featuredPost.featuredImage?.node.sourceUrl || '/images/default-post.jpg'}
              alt={featuredPost.featuredImage?.node.altText || featuredPost.title}
              className="object-cover rounded-2xl xs:rounded-3xl w-full h-full"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/60" />
            <div className="absolute inset-0 flex flex-col justify-end p-4 xs:p-6 sm:p-8 md:p-14">
              <div className="max-w-5xl mx-auto w-full">
                <div className="mb-3 xs:mb-4 flex flex-wrap gap-2">
                  <span className="inline-block px-2 xs:px-3 py-1 bg-black/80 text-[#E0FF5C] rounded-full text-[11px] xs:text-xs tracking-wide">
                    Cas client
                  </span>
                  <span className="text-[11px] xs:text-xs uppercase tracking-wider font-semibold inline-block px-2 xs:px-3 py-1 rounded-full bg-[#E0FF5C] text-black">
                    À la une
                  </span>
                </div>
                <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold max-w-4xl mb-4 text-white leading-tight">
                  {featuredPost.title}
                </h2>
                <div className="text-white/85 flex flex-wrap items-center text-[12px] xs:text-sm gap-2 xs:gap-4 mt-2">
                  <span>Uclic</span>
                </div>
                <Link
                  href={`/cas-clients/${featuredPost.slug}`}
                  className="px-4 xs:px-6 py-1.5 xs:py-2 rounded-full text-xs xs:text-sm font-medium mt-4 xs:mt-6 sm:mt-8 inline-block transition-colors
                    bg-[#E0FF5C] text-black hover:bg-[#D9FF4B]"
                >
                  Voir le cas client
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Grid of posts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 md:mb-16">
          {postsToRender.map((post) => (
            <PortfolioCard key={post.id} post={post} />
          ))}
        </div>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 mb-16">
            <Pagination 
              currentPage={currentPage} 
              totalPages={totalPages} 
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>

      <StickyShareButtons />

      <div className="relative z-10 w-full overflow-hidden mt-10 md:mt-16 pt-8 pb-16 md:pt-12 md:pb-24 px-4 sm:px-6">
        <div className="max-w-[1250px] mx-auto">
          <PreFooter />
        </div>
      </div>
      <ScrollToTop />
    </section>
  );
} 