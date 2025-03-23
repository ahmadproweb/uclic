'use client';

import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { colors as theme } from '@/config/theme';
import Link from 'next/link';
import PreFooter from '@/components/footer/PreFooter';
import ScrollToTop from '@/components/ui/ScrollToTop';
import StickyShareButtons from '@/components/ui/StickyShareButtons';
import { useEffect, useRef, useState } from 'react';
import { formatDate, getPortfolios } from '@/services/wordpress';
import Image from 'next/image';

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

  useEffect(() => {
    const fetchRelatedPortfolios = async () => {
      try {
        const portfolios = await getPortfolios();
        // Filtrer pour exclure le portfolio actuel et prendre les 2 premiers
        const filteredPortfolios = portfolios
          .filter((p: PortfolioPostProps['portfolio']) => p.id !== currentPortfolio.id)
          .slice(0, 2);
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
          isDark ? "bg-[#D9FF4B]/10 border border-[#D9FF4B]/30" : "bg-[#97BE11]/10 border border-[#97BE11]/30"
        )}>
          <div>
            <div className={cn(
              "absolute top-6 right-6 opacity-20",
              isDark ? "text-[#D9FF4B]" : "text-[#97BE11]"
            )}>
              <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className={cn(
              "inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4",
              isDark ? "bg-[#D9FF4B] text-black" : "bg-[#97BE11] text-white"
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
          <Link href="/cas-clients" className={cn(
            "inline-flex items-center text-sm font-medium hover:underline",
            isDark ? "text-[#D9FF4B]" : "text-[#97BE11]"
          )}>
            <span className="mr-2">Explorer les cas clients</span>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>

        {/* Derniers portfolios */}
        <div className="col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              // Actual portfolio items
              relatedPortfolios.map((portfolio) => (
                <Link 
                  key={portfolio.id} 
                  href={`/cas-clients/${portfolio.slug}`}
                  className="group"
                >
                  <div className="rounded-xl overflow-hidden h-[160px] relative mb-4">
                    {portfolio.featuredImage?.node.sourceUrl ? (
                      <Image
                        src={portfolio.featuredImage.node.sourceUrl}
                        alt={portfolio.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className={cn(
                        "w-full h-full bg-gray-200",
                        isDark ? "bg-gray-800" : "bg-gray-200"
                      )} />
                    )}
                  </div>
                  <h4 className={cn(
                    "text-lg font-bold mb-2 group-hover:underline",
                    isDark ? "text-white" : "text-black"
                  )}
                    dangerouslySetInnerHTML={{ __html: portfolio.title }}
                  />
                  <p className={cn(
                    "text-sm",
                    isDark ? "text-white/70" : "text-black/70"
                  )}
                    dangerouslySetInnerHTML={{ __html: portfolio.excerpt }}
                  />
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PortfolioPostClientSide({ portfolio }: PortfolioPostProps) {
  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === 'dark';
  const articleRef = useRef<HTMLDivElement>(null);
  const isMounted = useRef(false);

  // Fonction pour nettoyer et améliorer le contenu WordPress après le rendu
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return; // Skip first render to avoid hydration mismatch
    }
    
    if (!articleRef.current) return;
    
    const articleContent = articleRef.current;

    // Fonction utilitaire pour ajouter plusieurs classes
    const addClasses = (element: Element, classes: string) => {
      classes.split(' ').forEach(className => {
        if (className) element.classList.add(className);
      });
    };

    // Traitement des images WordPress
    const images = articleContent.querySelectorAll('img');
    images.forEach(img => {
      if (!img.classList.contains('rounded-xl')) {
        addClasses(img, 'rounded-xl shadow-lg my-8 max-w-full h-auto');
      }
      
      if (img.parentElement?.tagName !== 'FIGURE' && !img.closest('figure')) {
        const parent = img.parentElement;
        const figure = document.createElement('figure');
        figure.className = 'my-10 w-full';
        if (parent) {
          parent.insertBefore(figure, img);
          figure.appendChild(img);
        }
      }
    });

    // Traitement des iframes
    const iframes = articleContent.querySelectorAll('iframe');
    iframes.forEach(iframe => {
      if (!iframe.parentElement?.classList.contains('video-container')) {
        const container = document.createElement('div');
        container.className = 'video-container relative pt-[56.25%] my-10 rounded-xl overflow-hidden shadow-lg';
        const parent = iframe.parentElement;
        if (parent) {
          parent.insertBefore(container, iframe);
          addClasses(iframe, 'absolute inset-0 w-full h-full');
          container.appendChild(iframe);
        }
      }
    });

    // Améliorer les tableaux
    const tables = articleContent.querySelectorAll('table');
    tables.forEach(table => {
      addClasses(table, 'my-8 w-full border-collapse');
      if (!table.parentElement?.classList.contains('table-container')) {
        const container = document.createElement('div');
        container.className = 'table-container overflow-x-auto my-10 rounded-lg shadow-md';
        const parent = table.parentElement;
        if (parent) {
          parent.insertBefore(container, table);
          container.appendChild(table);
        }
      }

      const headers = table.querySelectorAll('th');
      headers.forEach(th => {
        addClasses(th, 'bg-[#D9FF4B]/20 text-left p-4 font-semibold');
      });

      const cells = table.querySelectorAll('td');
      cells.forEach(td => {
        addClasses(td, 'p-4 border-t');
        if (isDark) {
          td.classList.add('border-white/10');
        } else {
          td.classList.add('border-black/10');
        }
      });
    });

    // Améliorer les listes
    const lists = articleContent.querySelectorAll('ul, ol');
    lists.forEach(list => {
      if (!list.classList.contains('pl-6')) {
        addClasses(list, 'pl-6 my-8');
        list.classList.add(list.tagName === 'UL' ? 'list-disc' : 'list-decimal');
      }
      
      const items = list.querySelectorAll('li');
      items.forEach(item => {
        if (!item.classList.contains('mb-3')) {
          addClasses(item, 'mb-3 pl-2');
        }
      });
    });

    // Améliorer les titres
    const headings = articleContent.querySelectorAll('h2, h3, h4, h5, h6');
    headings.forEach(heading => {
      if (heading.tagName === 'H2') {
        addClasses(heading, 'text-2xl md:text-3xl mt-16 mb-6 pb-2 font-medium');
        if (isDark) {
          addClasses(heading, 'border-b border-white/10');
        } else {
          addClasses(heading, 'border-b border-black/10');
        }
      } else if (heading.tagName === 'H3') {
        addClasses(heading, 'text-xl md:text-2xl mt-12 mb-4 font-medium');
      } else if (heading.tagName === 'H4') {
        addClasses(heading, 'text-lg md:text-xl mt-8 mb-3 font-medium');
      }
    });

    // Traiter les paragraphes
    const paragraphs = articleContent.querySelectorAll('p');
    paragraphs.forEach(p => {
      if (!p.closest('li, blockquote, figure')) {
        addClasses(p, 'mb-6 leading-relaxed text-base md:text-lg');
        if (isDark) {
          p.classList.add('text-white/90');
        } else {
          p.classList.add('text-black/80');
        }
      }
    });

    // Améliorer les citations
    const quotes = articleContent.querySelectorAll('blockquote');
    quotes.forEach(quote => {
      addClasses(quote, 'border-l-4 pl-6 italic my-10 py-1 text-lg md:text-xl');
      if (isDark) {
        addClasses(quote, 'border-[#D9FF4B]/70 text-white/80');
      } else {
        addClasses(quote, 'border-[#97BE11]/70 text-black/70');
      }
    });

    // Améliorer les liens
    const links = articleContent.querySelectorAll('a');
    links.forEach(link => {
      if (!link.closest('figure, nav')) {
        addClasses(link, 'font-medium transition-colors duration-200 underline decoration-1 underline-offset-2');
        if (isDark) {
          addClasses(link, 'text-[#D9FF4B] hover:text-[#D9FF4B]/80 decoration-[#D9FF4B]/30');
        } else {
          addClasses(link, 'text-[#97BE11] hover:text-[#97BE11]/80 decoration-[#97BE11]/30');
        }
      }
    });

  }, [portfolio.content, isDark]);

  return (
    <>
      <section className="w-full max-w-[100vw] relative overflow-hidden pt-28 md:pt-32">
        {/* Base Background */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            background: isDark 
              ? `${theme.colors.common.black}`
              : `${theme.colors.common.white}`
          }}
        />

        <div className="max-w-[900px] mx-auto px-4 md:px-6 relative z-10">
          {/* Navigation row */}
          <div className="flex justify-between items-center mb-10">
            {/* Breadcrumb */}
            <nav className={cn(
              "flex items-center space-x-2 text-xs",
              isDark ? "text-white/50" : "text-black/50"
            )}>
              <Link href="/" className="hover:underline">Accueil</Link>
              <span>/</span>
              <Link href="/cas-clients" className="hover:underline">Cas clients</Link>
            </nav>

            {/* Back button */}
            <Link 
              href="/cas-clients" 
              className={cn(
                "inline-flex items-center text-sm hover:underline transition-all",
                isDark ? "text-white/80 hover:text-white" : "text-black/70 hover:text-black"
              )}
            >
              <svg className="w-4 h-4 mr-2 transform rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Retour aux cas clients
            </Link>
          </div>

          {/* Portfolio header */}
          <header className="mb-12">
            {/* Portfolio title */}
            <h1 className={cn(
              "text-3xl md:text-5xl font-bold mb-6 leading-tight",
              isDark ? "text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" : "text-black"
            )}
              dangerouslySetInnerHTML={{ __html: portfolio.title }}
            />
            
            {/* Portfolio meta */}
            <div className={cn(
              "flex flex-wrap items-center gap-6 text-sm",
              isDark ? "text-white/80" : "text-black/70"
            )}>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 4H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2zM16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>{formatDate(new Date().toISOString())}</span>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          {portfolio.featuredImage?.node.sourceUrl && (
            <figure className="mb-16 relative h-[300px] md:h-[500px] w-full rounded-2xl overflow-hidden shadow-xl">
              <img
                src={portfolio.featuredImage.node.sourceUrl}
                alt={portfolio.title}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
            </figure>
          )}

          {/* Content */}
          <article
            ref={articleRef}
            className={cn(
              "prose prose-lg max-w-none mb-16 mx-auto wp-content",
              // Headings
              "prose-headings:font-medium prose-headings:mb-6 prose-headings:leading-tight",
              "prose-h1:text-3xl prose-h1:md:text-4xl prose-h1:font-bold prose-h1:mb-8 prose-h1:mt-16",
              "prose-h2:text-2xl prose-h2:md:text-3xl prose-h2:mt-16 prose-h2:mb-6 prose-h2:pb-2",
              isDark ? "prose-h2:border-b prose-h2:border-white/10" : "prose-h2:border-b prose-h2:border-black/10",
              "prose-h3:text-xl prose-h3:md:text-2xl prose-h3:mt-12 prose-h3:mb-4",
              "prose-h4:text-lg prose-h4:md:text-xl prose-h4:mt-8 prose-h4:mb-3 prose-h4:font-medium",
              
              // Paragraphs, lists and spacing
              "prose-p:mb-6 prose-p:leading-relaxed prose-p:text-base md:prose-p:text-lg",
              "prose-ul:pl-6 prose-ol:pl-6 prose-li:mb-3 prose-li:pl-2",
              "prose-ul:my-8 prose-ol:my-8 prose-ul:list-disc prose-ol:list-decimal",
              
              // Quotes and special elements
              "prose-blockquote:border-l-4 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:my-10 prose-blockquote:py-1 prose-blockquote:text-lg md:prose-blockquote:text-xl",
              
              // Media
              "prose-img:rounded-xl prose-img:shadow-lg prose-img:my-10",
              
              // Links and inline elements
              "prose-a:font-medium prose-a:transition-colors prose-a:duration-200 prose-a:underline prose-a:decoration-1 prose-a:underline-offset-2",
              "prose-pre:rounded-xl prose-pre:p-6 prose-pre:overflow-x-auto prose-pre:my-8 prose-pre:text-sm",
              "prose-code:text-sm prose-code:rounded prose-code:px-1.5 prose-code:py-0.5",
              "prose-strong:font-semibold prose-em:italic",
              "prose-hr:my-16 prose-hr:border-t-2",
              
              // Theme specific styles
              isDark 
                ? "prose-invert prose-headings:text-white prose-headings:drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] prose-p:text-white/90 prose-li:text-white/90 prose-a:text-[#D9FF4B] prose-a:hover:text-[#D9FF4B]/80 prose-a:decoration-[#D9FF4B]/30 prose-blockquote:border-[#D9FF4B]/70 prose-blockquote:text-white/80 prose-code:bg-white/10 prose-pre:bg-black/30 prose-hr:border-white/10" 
                : "prose-h1:text-[#111] prose-h2:text-[#111] prose-h3:text-[#111] prose-h4:text-[#111] prose-h5:text-[#111] prose-h6:text-[#111] prose-headings:font-semibold prose-p:text-black/80 prose-li:text-black/80 prose-a:text-[#97BE11] prose-a:hover:text-[#97BE11]/80 prose-a:decoration-[#97BE11]/30 prose-blockquote:border-[#97BE11]/70 prose-blockquote:text-black/70 prose-code:bg-black/5 prose-pre:bg-black/5 prose-hr:border-black/10"
            )}
            dangerouslySetInnerHTML={{ __html: portfolio.content }}
          />

          {/* Share & Related Posts */}
          <div className={cn(
            "border-t py-8 mb-16",
            isDark ? "border-white/10" : "border-black/10"
          )}>
            <div className="flex justify-between items-center">
              <div>
                <h3 className={cn(
                  "text-lg font-medium mb-2",
                  isDark ? "text-white" : "text-black"
                )}>Partager cette réalisation</h3>
                <div className="flex space-x-3">
                  <button className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center transition-colors", 
                    isDark ? "bg-white/10 hover:bg-white/20" : "bg-black/5 hover:bg-black/10"
                  )}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3V2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <button className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center transition-colors", 
                    isDark ? "bg-white/10 hover:bg-white/20" : "bg-black/5 hover:bg-black/10"
                  )}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <button className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center transition-colors", 
                    isDark ? "bg-white/10 hover:bg-white/20" : "bg-black/5 hover:bg-black/10"
                  )}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2 9h4v12H2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
              <Link
                href="/cas-clients"
                className={cn(
                  "inline-flex items-center hover:underline transition-all",
                  isDark ? "text-white hover:text-[#D9FF4B]" : "text-black hover:text-[#97BE11]"
                )}
              >
                <span className="mr-2">Voir tous les cas clients</span>
                <svg className="w-4 h-4 transform rotate-45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
          </div>

          {/* Related Portfolios */}
          <RelatedPortfolios currentPortfolio={portfolio} />
        </div>
      </section>

      {/* Boutons de partage et retour en haut */}
      <StickyShareButtons title={portfolio.title} url={`/cas-clients/${portfolio.slug}`} />
      <ScrollToTop />
      
      {/* PreFooter Section */}
      <div className="w-full relative overflow-hidden pt-32 pb-8">
        {/* Gradient transparent vers gris en haut */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            background: isDark 
              ? `linear-gradient(180deg, ${theme.colors.primary.main} 0%, ${theme.colors.common.black} 100%)`
              : `linear-gradient(180deg, transparent 0%, #F3F4F6 100%)`,
            height: '50%'
          }}
        />

        {/* Bande grise en bas */}
        <div 
          className="absolute bottom-0 left-0 right-0 z-[1]"
          style={{
            background: isDark
              ? theme.colors.common.black
              : '#F3F4F6',
            height: '50%'
          }}
        />
        
        <div className="max-w-[1250px] mx-auto px-4 relative z-10">
          <PreFooter noBgGradient />
        </div>
      </div>
    </>
  );
} 