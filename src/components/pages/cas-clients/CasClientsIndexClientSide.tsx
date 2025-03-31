'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';
import { colors as theme } from '@/config/theme';
import Link from 'next/link';
import Image from 'next/image';
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
  return (
    <Link
      href={`/cas-clients/${post.slug}`}
      className="group rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl backdrop-blur-sm"
      style={{
        background: `linear-gradient(145deg, 
          #E0FF5C,
          #E0FF5C
        )`,
        boxShadow: `0 8px 32px -4px rgba(224, 255, 92, 0.25)`
      }}
    >
      {/* Featured Image */}
      <div className="relative w-full h-48 overflow-hidden">
        <Image
          src={post.featuredImage?.node.sourceUrl || '/images/default-post.jpg'}
          alt={post.featuredImage?.node.altText || post.title}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          width={400}
          height={250}
          loading="lazy"
          sizes="(max-width: 768px) 100vw, 400px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
        <span className="absolute bottom-4 left-4 inline-block px-3 py-1 bg-black text-[#E0FF5C] rounded-full text-sm z-20">
          Cas client
        </span>
      </div>
      
      <div className="p-6 space-y-4">
        <h3 className="text-xl font-semibold text-black">
          {post.title}
        </h3>
        
        <p 
          className="text-black line-clamp-2"
          dangerouslySetInnerHTML={{ __html: post.excerpt || '' }}
          style={{ color: 'rgba(0, 0, 0, 0.9)' }}
        />
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
      "w-full max-w-[100vw] pt-28 md:pt-32 pb-16 md:pb-24 relative overflow-hidden",
      isDark ? "bg-black" : "bg-white"
    )}>
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

      {/* New overlay gradient - light to transparent */}
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
          )}>Cas Clients</span>
          <h1 className={cn(
            "text-3xl md:text-5xl font-normal mb-4",
            isDark ? "text-white" : "text-black"
          )}>
            Découvrez nos réalisations<br/>et succès clients
          </h1>
          <div className={cn(
            "w-12 h-0.5 mx-auto mb-4",
            isDark ? "bg-[#E0FF5C]" : "bg-black"
          )}/>
          <p className={cn(
            "text-base md:text-lg",
            isDark ? "text-white/100" : "text-black/80"
          )}>
            Explorez nos cas clients et découvrez comment<br/>nous aidons les entreprises à réussir
          </p>
        </div>
        
        {/* Hero section with featured image */}
        {featuredPost && (
          <div className="relative w-full h-[40vh] md:h-[50vh] mb-16 rounded-3xl overflow-hidden shadow-xl">
            <Image
              src={featuredPost.featuredImage?.node.sourceUrl || '/images/default-post.jpg'}
              alt={featuredPost.featuredImage?.node.altText || featuredPost.title}
              className="object-cover rounded-3xl"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1250px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
            
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 lg:p-12">
              <div className="max-w-3xl">
                <span className="inline-block px-3 py-1 bg-[#E0FF5C] text-black rounded-full text-sm mb-4">
                  Cas client
                </span>
                <Link href={`/cas-clients/${featuredPost.slug}`}>
                  <h2 className="text-2xl md:text-4xl font-semibold text-white mb-4 hover:text-[#E0FF5C] transition-colors duration-200">
                    {featuredPost.title}
                  </h2>
                </Link>
                <div 
                  className="text-white/90 text-base md:text-lg mb-4 line-clamp-2"
                  dangerouslySetInnerHTML={{ __html: featuredPost.excerpt }}
                />
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

      <ScrollToTop />
      <StickyShareButtons />
    </section>
  );
} 