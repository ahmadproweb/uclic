'use client';

import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { colors as theme } from '@/config/theme';
import Link from 'next/link';
import PreFooter from '@/components/footer/PreFooter';
import ScrollToTop from '@/components/ui/ScrollToTop';
import StickyShareButtons from '@/components/ui/StickyShareButtons';
import { useEffect, useRef, useState, useMemo } from 'react';
import { WordPressPost, getRelatedPosts, getPostCategory, getFeaturedImage, formatDate, estimateReadingTime, getLatestPosts } from '@/services/wordpress';
import { slugify } from '@/utils/string';

interface BlogPostProps {
  post: {
    id: number;
    title: string;
    content: string;
    excerpt: string;
    date: string;
    reading_time: string;
    category?: string;
    author: string;
    featured_image_url: string;
    slug: string;
  };
  preloadedRelatedPosts?: WordPressPost[];
  preloadedLatestPosts?: WordPressPost[];
}

// Composant pour les articles associés
function RelatedPosts({ 
  currentPost, 
  initialRelatedPosts = [], 
  initialLatestPosts = [] 
}: { 
  currentPost: WordPressPost; 
  initialRelatedPosts?: WordPressPost[];
  initialLatestPosts?: WordPressPost[];
}) {
  const [relatedPosts, setRelatedPosts] = useState<WordPressPost[]>(initialRelatedPosts);
  const [latestPosts, setLatestPosts] = useState<WordPressPost[]>(initialLatestPosts);
  const [loading, setLoading] = useState(initialRelatedPosts.length === 0 && initialLatestPosts.length === 0);
  const [error, setError] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === 'dark';

  // Calculer les articles à afficher dans le slide actuel
  const visiblePosts = useMemo(() => {
    const startIdx = currentSlide * 2;
    return latestPosts.slice(startIdx, startIdx + 2);
  }, [latestPosts, currentSlide]);

  // Fonction pour changer de slide
  const changeSlide = (direction: 'next' | 'prev') => {
    if (direction === 'next') {
      setCurrentSlide(currentSlide === Math.ceil(latestPosts.length / 2) - 1 ? 0 : currentSlide + 1);
    } else {
      setCurrentSlide(currentSlide === 0 ? Math.ceil(latestPosts.length / 2) - 1 : currentSlide - 1);
    }
  };

  useEffect(() => {
    // Si nous avons déjà des données préchargées et pas besoin de charger davantage
    if (initialRelatedPosts.length > 0 && initialLatestPosts.length > 0) {
      console.log("[RelatedPosts] Using preloaded data");
      setLoading(false);
      return;
    }

    async function fetchPosts() {
      try {
        setLoading(true);
        
        // Charger les articles associés seulement si nous n'en avons pas déjà
        let related = initialRelatedPosts;
        if (initialRelatedPosts.length === 0) {
          related = await getRelatedPosts(currentPost, 3);
          console.log("[RelatedPosts] Related posts fetched:", related.length);
        }
        setRelatedPosts(related);
        
        // Charger les derniers articles seulement si nous n'en avons pas déjà
        let latest = initialLatestPosts;
        if (initialLatestPosts.length === 0) {
          latest = await getLatestPosts(6);
          console.log("[RelatedPosts] Latest posts fetched:", latest.length);
          
          // Filtrer pour exclure l'article en cours
          latest = latest.filter(post => post.id !== currentPost.id).slice(0, 6);
        }
        setLatestPosts(latest);
      } catch (err) {
        console.error("[RelatedPosts] Error fetching posts:", err);
        setError("Erreur lors du chargement des articles");
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [currentPost, initialRelatedPosts, initialLatestPosts]);

  if (error) {
    console.error("[RelatedPosts] Error:", error);
    return (
      <div className="mb-16">
        <h3 className={cn(
          "text-xl md:text-2xl font-medium mb-6",
          isDark ? "text-white" : "text-black"
        )}>Articles associés</h3>
        <p className={isDark ? "text-white/70" : "text-black/70"}>
          Impossible de charger les articles associés.
        </p>
      </div>
    );
  }

  if (loading) {
    console.log("[RelatedPosts] Loading state...");
    return (
      <div className="animate-pulse">
        <h3 className={cn(
          "text-xl md:text-2xl font-medium mb-6",
          isDark ? "text-white" : "text-black"
        )}>Articles récents</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-[320px] rounded-xl bg-gray-200 dark:bg-gray-800"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mb-16">
      <h3 className={cn(
        "text-xl md:text-2xl font-medium mb-6",
        isDark ? "text-white" : "text-black"
      )}>Articles récents</h3>
      
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
              Blog UCLIC
            </span>
            <h4 className={cn(
              "text-xl font-bold mb-4",
              isDark ? "text-white" : "text-black"
            )}>
              Découvrez tous nos articles
            </h4>
            <p className={cn(
              "mb-4",
              isDark ? "text-white/80" : "text-black/80"
            )}>
              Notre blog couvre l&apos;actualité digitale, le développement web, et les dernières innovations UI/UX.
            </p>
          </div>
          <Link href="/blog" className={cn(
            "inline-flex items-center text-sm font-medium hover:underline",
            isDark ? "text-[#DAFF47]" : "text-[#97BE11]"
          )}>
            <span className="mr-2">Explorer le blog</span>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>

        {/* Slider pour les derniers articles */}
        <div className="col-span-2 relative">
          {/* Articles visibles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            {visiblePosts.length > 0 ? (
              visiblePosts.map((post) => {
                const category = getPostCategory(post);
                const image = getFeaturedImage(post);
                const title = post.title.rendered;
                const date = formatDate(post.date);
                const readingTime = estimateReadingTime(post.content.rendered);

                return (
                  <Link href={`/blog/${post.slug}`} key={post.id} className="group">
                    <div className="rounded-xl overflow-hidden h-[160px] relative mb-4">
                      <img
                        src={image.url}
                        alt={image.alt}
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors"></div>
                      {category && (
                        <span className="absolute top-3 left-3 px-3 py-1 bg-[#DAFF47] text-black rounded-full text-xs font-medium">
                          {category}
                        </span>
                      )}
                    </div>
                    <h4 className={cn(
                      "text-base font-semibold line-clamp-2 mb-2 group-hover:underline",
                      isDark ? "text-white" : "text-black"
                    )}
                      dangerouslySetInnerHTML={{ __html: title }}
                    />
                    <div className={cn(
                      "flex items-center text-xs",
                      isDark ? "text-white/70" : "text-black/70"
                    )}>
                      <span className="mr-3">{date}</span>
                      <span>{readingTime} min de lecture</span>
                    </div>
                  </Link>
                );
              })
            ) : (
              <div className={cn(
                "rounded-xl overflow-hidden relative p-8 col-span-2",
                isDark ? "bg-gray-800" : "bg-gray-100"
              )}>
                <p className={isDark ? "text-white/70" : "text-black/70"}>
                  Chargement des articles...
                </p>
              </div>
            )}
          </div>

          {/* Contrôles de navigation */}
          <div className="flex justify-between items-center">
            {/* Indicateurs de slides */}
            <div className="flex space-x-1">
              {Array.from({ length: Math.ceil(latestPosts.length / 2) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-colors",
                    currentSlide === index 
                      ? (isDark ? "bg-[#DAFF47]" : "bg-[#97BE11]") 
                      : (isDark ? "bg-white/20" : "bg-black/20")
                  )}
                  aria-label={`Voir page ${index + 1}`}
                />
              ))}
            </div>

            {/* Boutons de navigation */}
            <div className="flex space-x-2">
              <button
                onClick={() => changeSlide('prev')}
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center",
                  isDark 
                    ? "bg-white/10 hover:bg-white/20 text-white" 
                    : "bg-black/5 hover:bg-black/10 text-black"
                )}
                aria-label="Article précédent"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button
                onClick={() => changeSlide('next')}
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center",
                  isDark 
                    ? "bg-white/10 hover:bg-white/20 text-white" 
                    : "bg-black/5 hover:bg-black/10 text-black"
                )}
                aria-label="Article suivant"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Articles associés de la même catégorie */}
      {relatedPosts.length > 0 && (
        <div className="mt-16">
          <h3 className={cn(
            "text-xl md:text-2xl font-medium mb-6",
            isDark ? "text-white" : "text-black"
          )}>Dans la même catégorie</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.slice(0, 3).map((post) => {
              const category = getPostCategory(post);
              const image = getFeaturedImage(post);
              const title = post.title.rendered;
              const date = formatDate(post.date);
              const readingTime = estimateReadingTime(post.content.rendered);

              return (
                <Link href={`/blog/${post.slug}`} key={post.id} className="group">
                  <div className="rounded-xl overflow-hidden h-[200px] relative mb-4">
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors"></div>
                    {category && (
                      <span className="absolute top-3 left-3 px-3 py-1 bg-[#DAFF47] text-black rounded-full text-xs font-medium">
                        {category}
                      </span>
                    )}
                  </div>
                  <h4 className={cn(
                    "text-lg font-semibold line-clamp-2 mb-2 group-hover:underline",
                    isDark ? "text-white" : "text-black"
                  )}
                    dangerouslySetInnerHTML={{ __html: title }}
                  />
                  <div className={cn(
                    "flex items-center text-xs",
                    isDark ? "text-white/70" : "text-black/70"
                  )}>
                    <span className="mr-3">{date}</span>
                    <span>{readingTime} min de lecture</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default function BlogPostClientSide({ post, preloadedRelatedPosts = [], preloadedLatestPosts = [] }: BlogPostProps) {
  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === 'dark';
  const articleRef = useRef<HTMLDivElement>(null);
  const isMounted = useRef(false);

  // Convertir post au format WordPressPost pour RelatedPosts
  const wordpressPostAdapter = useMemo(() => {
    return {
      id: post.id,
      date: post.date,
      title: {
        rendered: post.title
      },
      excerpt: {
        rendered: post.excerpt
      },
      content: {
        rendered: post.content
      },
      _embedded: {
        'wp:term': post.category ? [
          [{ taxonomy: 'category', name: post.category, id: 0 }]
        ] : undefined,
        'wp:featuredmedia': post.featured_image_url ? [
          { source_url: post.featured_image_url }
        ] : undefined,
        author: post.author ? [{ name: post.author }] : undefined
      },
      slug: post.slug,
      link: `/blog/${post.slug}`
    } as WordPressPost;
  }, [post]);

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
      // Ajouter des classes pour les images responsives si elles n'en ont pas
      if (!img.classList.contains('rounded-xl')) {
        addClasses(img, 'rounded-xl shadow-lg my-8 max-w-full h-auto');
      }
      
      // S'assurer que les images sont dans un conteneur approprié
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

    // Traitement des iframes (vidéos YouTube, etc.)
    const iframes = articleContent.querySelectorAll('iframe');
    iframes.forEach(iframe => {
      // Créer un conteneur responsive pour les iframes
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

    // Améliorer les tableaux WordPress
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

      // Styliser l'en-tête du tableau
      const headers = table.querySelectorAll('th');
      headers.forEach(th => {
        addClasses(th, 'bg-[#DAFF47]/20 text-left p-4 font-semibold');
      });

      // Styliser les cellules du tableau
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

    // Améliorer les listes WordPress
    const lists = articleContent.querySelectorAll('ul, ol');
    lists.forEach(list => {
      if (!list.classList.contains('pl-6')) {
        addClasses(list, 'pl-6 my-8');
        list.classList.add(list.tagName === 'UL' ? 'list-disc' : 'list-decimal');
      }
      
      // Styliser les éléments de liste
      const items = list.querySelectorAll('li');
      items.forEach(item => {
        if (!item.classList.contains('mb-3')) {
          addClasses(item, 'mb-3 pl-2');
        }
      });
    });

    // Améliorer les titres WordPress
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
      // Ne pas modifier les paragraphes qui sont à l'intérieur d'autres éléments comme les listes
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
        addClasses(quote, 'border-[#DAFF47]/70 text-white/80');
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
          addClasses(link, 'text-[#DAFF47] hover:text-[#DAFF47]/80 decoration-[#DAFF47]/30');
        } else {
          addClasses(link, 'text-[#97BE11] hover:text-[#97BE11]/80 decoration-[#97BE11]/30');
        }
      }
    });

  }, [post.content, isDark]); // Relancer quand le contenu change ou le thème change

  return (
    <>
      <section className="w-full max-w-[100vw] relative overflow-hidden pt-28 md:pt-32">
        {/* Base Background */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            background: isDark 
              ? `${theme.colors.common.black}` // Full black in dark mode
              : `${theme.colors.common.white}` // Full white in light mode
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
              <Link href="/blog" className="hover:underline">Blog</Link>
              {post.category && (
                <>
                  <span>/</span>
                  <Link 
                    href={`/blog/category/${slugify(post.category)}`}
                    className="hover:underline"
                  >
                    {post.category}
                  </Link>
                </>
              )}
            </nav>

            {/* Back button */}
            <Link 
              href="/blog" 
              className={cn(
                "inline-flex items-center text-sm hover:underline transition-all",
                isDark ? "text-white/80 hover:text-white" : "text-black/70 hover:text-black"
              )}
            >
              <svg className="w-4 h-4 mr-2 transform rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Retour au blog
            </Link>
          </div>

          {/* Article header */}
          <header className="mb-12">
            {/* Category badge */}
            {post.category && (
              <Link 
                href={`/blog/category/${slugify(post.category)}`}
                className={cn(
                  "inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-6 shadow-sm",
                  "transition-all duration-200 hover:transform hover:scale-105",
                  "bg-[#DAFF47] text-black hover:bg-[#E2FF47]"
                )}
              >
                {post.category}
              </Link>
            )}
            
            {/* Article title */}
            <h1 className={cn(
              "text-3xl md:text-5xl font-bold mb-6 leading-tight",
              isDark ? "text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" : "text-black"
            )}>
              {post.title}
            </h1>
            
            {/* Article meta */}
            <div className={cn(
              "flex flex-wrap items-center gap-6 text-sm",
              isDark ? "text-white/80" : "text-black/70"
            )}>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#DAFF47]/20 flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="font-medium">{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>{post.reading_time} min de lecture</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 4H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2zM16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>{new Date(post.date).toLocaleDateString('fr-FR', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          {post.featured_image_url && (
            <figure className="mb-16 relative h-[300px] md:h-[500px] w-full rounded-2xl overflow-hidden shadow-xl">
              <img
                src={post.featured_image_url}
                alt={post.title}
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
                ? "prose-invert prose-headings:text-white prose-headings:drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] prose-p:text-white/90 prose-li:text-white/90 prose-a:text-[#DAFF47] prose-a:hover:text-[#DAFF47]/80 prose-a:decoration-[#DAFF47]/30 prose-blockquote:border-[#DAFF47]/70 prose-blockquote:text-white/80 prose-code:bg-white/10 prose-pre:bg-black/30 prose-hr:border-white/10" 
                : "prose-h1:text-[#111] prose-h2:text-[#111] prose-h3:text-[#111] prose-h4:text-[#111] prose-h5:text-[#111] prose-h6:text-[#111] prose-headings:font-semibold prose-p:text-black/80 prose-li:text-black/80 prose-a:text-[#97BE11] prose-a:hover:text-[#97BE11]/80 prose-a:decoration-[#97BE11]/30 prose-blockquote:border-[#97BE11]/70 prose-blockquote:text-black/70 prose-code:bg-black/5 prose-pre:bg-black/5 prose-hr:border-black/10"
            )}
            dangerouslySetInnerHTML={{ __html: post.content }}
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
                )}>Partager cet article</h3>
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
                href="/blog"
                className={cn(
                  "inline-flex items-center hover:underline transition-all",
                  isDark ? "text-white hover:text-[#DAFF47]" : "text-black hover:text-[#97BE11]"
                )}
              >
                <span className="mr-2">Voir tous les articles</span>
                <svg className="w-4 h-4 transform rotate-45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
          </div>

          {/* Articles associés */}
          <RelatedPosts 
            currentPost={wordpressPostAdapter} 
            initialRelatedPosts={preloadedRelatedPosts}
            initialLatestPosts={preloadedLatestPosts}
          />
        </div>
      </section>

      {/* Boutons de partage et retour en haut */}
      <StickyShareButtons title={post.title} url={`/blog/${post.slug}`} />
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