'use client';

import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import Link from 'next/link';
import PreFooter from '@/components/footer/PreFooter';
import ScrollToTop from '@/components/ui/ScrollToTop';
import StickyShareButtons from '@/components/ui/StickyShareButtons';
import { useEffect, useState, useMemo } from 'react';
import { getPortfolios } from '@/services/wordpress';
import { getOptimizedImageUrl } from '@/services/image';

interface PortfolioPostProps {
  portfolio: {
    id: string;
    title: string;
    content: string;
    excerpt: string;
    slug: string;
    featuredImage: {
      node: {
        sourceUrl: string;
      };
    } | null;
  };
}

// Composant pour les portfolios similaires
function RelatedPortfolios({ currentPortfolio }: { currentPortfolio: PortfolioPostProps['portfolio'] }) {
  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === 'dark';
  const [relatedPortfolios, setRelatedPortfolios] = useState<PortfolioPostProps['portfolio'][]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Calculer les portfolios à afficher dans le slide actuel
  const visiblePortfolios = useMemo(() => {
    const startIdx = currentSlide * 2;
    return relatedPortfolios.slice(startIdx, startIdx + 2);
  }, [relatedPortfolios, currentSlide]);

  // Fonction pour changer de slide
  const changeSlide = (direction: 'next' | 'prev') => {
    if (direction === 'next') {
      setCurrentSlide(currentSlide === Math.ceil(relatedPortfolios.length / 2) - 1 ? 0 : currentSlide + 1);
    } else {
      setCurrentSlide(currentSlide === 0 ? Math.ceil(relatedPortfolios.length / 2) - 1 : currentSlide - 1);
    }
  };

  useEffect(() => {
    const fetchRelatedPortfolios = async () => {
      try {
        const portfolios = await getPortfolios();
        // Filtrer pour exclure le portfolio actuel et prendre les 6 premiers
        const filteredPortfolios = portfolios
          .filter((p: PortfolioPostProps['portfolio']) => p.id !== currentPortfolio.id)
          .slice(0, 6);
        setRelatedPortfolios(filteredPortfolios);
      } catch (error) {
        console.error('Error fetching related portfolios:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRelatedPortfolios();
  }, [currentPortfolio.id]);

  return (
    <div className="mb-16">
      <h3 className={cn(
        "text-xl md:text-2xl font-medium mb-6",
        isDark ? "text-white" : "text-black"
      )}>Vous pourriez aimer</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Carte colorée selon la charte graphique */}
        <div className={cn(
          "rounded-xl overflow-hidden relative p-8 flex flex-col justify-between h-[320px]",
          isDark ? "bg-[#DAFF47]/10 border border-[#DAFF47]/30" : "bg-[#97BE11]/10 border border-[#97BE11]/30"
        )}>
          <div>
            <div className={cn(
              "absolute top-6 right-6 opacity-20",
              isDark ? "text-[#DAFF47]" : "text-[#97BE11]"
            )}>
              <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className={cn(
              "inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4",
              isDark ? "bg-[#DAFF47] text-black" : "bg-[#97BE11] text-white"
            )}>
              Portfolio UCLIC
            </span>
            <h4 className={cn(
              "text-xl font-bold mb-4",
              isDark ? "text-white" : "text-black"
            )}>
              Découvrez toutes nos réalisations
            </h4>
            <p className={cn(
              "mb-4",
              isDark ? "text-white/80" : "text-black/80"
            )}>
              Notre portfolio regorge de projets innovants et de solutions digitales sur mesure.
            </p>
          </div>
          <Link href="/portfolio" className={cn(
            "inline-flex items-center text-sm font-medium hover:underline",
            isDark ? "text-[#DAFF47]" : "text-[#97BE11]"
          )}>
            <span className="mr-2">Explorer le portfolio</span>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>

        {/* Slider pour les portfolios similaires */}
        <div className="col-span-2 relative">
          {/* Portfolios visibles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            {isLoading ? (
              // Skeleton loading state
              [1, 2].map((i) => (
                <div key={i} className="group">
                  <div className="rounded-xl overflow-hidden h-[160px] relative mb-4">
                    <div className={cn(
                      "w-full h-full bg-gray-200 animate-pulse",
                      isDark ? "bg-gray-800" : "bg-gray-200"
                    )} />
                  </div>
                  <div className={cn(
                    "h-4 w-3/4 bg-gray-200 rounded animate-pulse mb-2",
                    isDark ? "bg-gray-800" : "bg-gray-200"
                  )} />
                  <div className={cn(
                    "h-3 w-1/2 bg-gray-200 rounded animate-pulse",
                    isDark ? "bg-gray-800" : "bg-gray-200"
                  )} />
                </div>
              ))
            ) : (
              visiblePortfolios.map((portfolio) => (
                <Link 
                  key={portfolio.id} 
                  href={`/portfolio/${portfolio.slug}`}
                  className="group"
                >
                  <div className="rounded-xl overflow-hidden h-[160px] relative mb-4">
                    {portfolio.featuredImage?.node.sourceUrl ? (
                      <img
                        src={portfolio.featuredImage.node.sourceUrl}
                        alt={portfolio.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      <div className={cn(
                        "w-full h-full bg-gray-200",
                        isDark ? "bg-gray-800" : "bg-gray-200"
                      )} />
                    )}
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors"></div>
                  </div>
                  <h4 className={cn(
                    "text-base font-semibold line-clamp-2 mb-2 group-hover:underline",
                    isDark ? "text-white" : "text-black"
                  )}
                    dangerouslySetInnerHTML={{ __html: portfolio.title }}
                  />
                  <p className={cn(
                    "text-sm line-clamp-2",
                    isDark ? "text-white/70" : "text-black/70"
                  )}
                    dangerouslySetInnerHTML={{ __html: portfolio.excerpt }}
                  />
                </Link>
              ))
            )}
          </div>

          {/* Contrôles de navigation */}
          <div className="flex justify-between items-center">
            {/* Indicateurs de slides */}
            <div className="flex space-x-1">
              {Array.from({ length: Math.ceil(relatedPortfolios.length / 2) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all",
                    currentSlide === index
                      ? isDark ? "bg-[#DAFF47]" : "bg-[#97BE11]"
                      : isDark ? "bg-white/20" : "bg-black/20"
                  )}
                  aria-label={`Aller au slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Boutons de navigation */}
            <div className="flex space-x-2">
              <button
                onClick={() => changeSlide('prev')}
                className={cn(
                  "p-2 rounded-full transition-colors",
                  isDark
                    ? "hover:bg-white/10 text-white"
                    : "hover:bg-black/10 text-black"
                )}
                aria-label="Slide précédent"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button
                onClick={() => changeSlide('next')}
                className={cn(
                  "p-2 rounded-full transition-colors",
                  isDark
                    ? "hover:bg-white/10 text-white"
                    : "hover:bg-black/10 text-black"
                )}
                aria-label="Slide suivant"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PortfolioPostClientSide({ portfolio }: PortfolioPostProps) {
  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === 'dark';

  return (
    <section className="w-full max-w-[100vw] relative overflow-hidden pt-28 md:pt-32">
      {/* Background gradient */}
      <div className={cn(
        "absolute inset-0 z-0",
        isDark 
          ? "bg-gradient-to-b from-black via-black to-[#1a1a1a]" 
          : "bg-gradient-to-b from-white via-white to-[#f5f5f5]"
      )} />

      {/* Background pattern */}
      <div className={cn(
        "absolute inset-0 z-0 opacity-[0.02]",
        isDark ? "bg-[url('/images/pattern-dark.svg')]" : "bg-[url('/images/pattern-light.svg')]"
      )} />

      <div className="max-w-[900px] mx-auto px-4 md:px-6 relative z-10">
        {/* Navigation */}
        <div className="mb-12 md:mb-16">
          <nav className={cn(
            "flex items-center space-x-2 text-xs",
            isDark ? "text-white/50" : "text-black/50"
          )}>
            <Link href="/" className="hover:underline">Accueil</Link>
            <span>/</span>
            <Link href="/portfolio" className="hover:underline">Portfolio</Link>
          </nav>

          {/* Back button */}
          <Link 
            href="/portfolio" 
            className={cn(
              "inline-flex items-center text-sm hover:underline transition-all",
              isDark ? "text-white/80 hover:text-white" : "text-black/70 hover:text-black"
            )}
          >
            <svg className="w-4 h-4 mr-2 transform rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Retour au portfolio
          </Link>
        </div>

        {/* Header */}
        <header className="mb-12 md:mb-16">
          {/* Featured Image */}
          {portfolio.featuredImage?.node.sourceUrl && (
            <div className="w-full aspect-video relative rounded-xl md:rounded-2xl overflow-hidden mb-8 md:mb-12">
              <img
                src={portfolio.featuredImage.node.sourceUrl}
                alt={portfolio.title}
                className="w-full h-full object-cover"
                loading="eager"
                decoding="async"
              />
            </div>
          )}

          {/* Title */}
          <h1 className={cn(
            "text-3xl md:text-4xl lg:text-5xl font-bold mb-6",
            isDark ? "text-white" : "text-black"
          )}
            dangerouslySetInnerHTML={{ __html: portfolio.title }}
          />
        </header>

        {/* Content */}
        <div className={cn(
          "prose max-w-none mb-12 md:mb-16",
          isDark 
            ? "prose-invert prose-p:text-white/80 prose-li:text-white/80" 
            : "prose-p:text-black/80 prose-li:text-black/80"
        )}
          dangerouslySetInnerHTML={{ __html: portfolio.content }}
        />

        {/* Share & Related Posts */}
        <div className={cn(
          "border-t py-8 mb-16",
          isDark ? "border-white/10" : "border-black/10"
        )}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className={cn(
                "text-sm",
                isDark ? "text-white/50" : "text-black/50"
              )}>
                Partager
              </span>
              <div className="flex items-center gap-2">
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`https://uclic.fr/portfolio/${portfolio.slug}`)}&text=${encodeURIComponent(portfolio.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "p-2 rounded-full transition-colors duration-300",
                    isDark 
                      ? "hover:bg-white/10" 
                      : "hover:bg-black/10"
                  )}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(`https://uclic.fr/portfolio/${portfolio.slug}`)}&title=${encodeURIComponent(portfolio.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "p-2 rounded-full transition-colors duration-300",
                    isDark 
                      ? "hover:bg-white/10" 
                      : "hover:bg-black/10"
                  )}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
            <Link
              href="/portfolio"
              className={cn(
                "inline-flex items-center hover:underline transition-all",
                isDark ? "text-white hover:text-[#DAFF47]" : "text-black hover:text-[#97BE11]"
              )}
            >
              <span className="mr-2">Voir toutes les réalisations</span>
              <svg className="w-4 h-4 transform rotate-45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>

        {/* Related Portfolios */}
        <RelatedPortfolios currentPortfolio={portfolio} />
      </div>

      {/* Boutons de partage et retour en haut */}
      <StickyShareButtons title={portfolio.title} url={`/portfolio/${portfolio.slug}`} />
      <ScrollToTop />
      
      {/* Pre-footer */}
      <PreFooter />
    </section>
  );
} 