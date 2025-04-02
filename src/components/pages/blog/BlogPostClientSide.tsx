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
  const themeColors = theme.colors;

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
        <h3 className="text-xl md:text-2xl font-medium mb-6 transition-colors duration-300"
          style={{ color: isDark ? themeColors.common.white : themeColors.common.black }}>
          Articles associés
        </h3>
        <p style={{ color: isDark ? `${themeColors.common.white}99` : `${themeColors.common.black}99` }}
           className="transition-colors duration-300">
          Impossible de charger les articles associés.
        </p>
      </div>
    );
  }

  if (loading) {
    console.log("[RelatedPosts] Loading state...");
    return (
      <div className="animate-pulse">
        <h3 className="text-xl md:text-2xl font-medium mb-6 transition-colors duration-300"
          style={{ color: isDark ? themeColors.common.white : themeColors.common.black }}>
          Articles récents
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-[320px] rounded-xl transition-colors duration-300"
              style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mb-16">
      <h3 className="text-xl md:text-2xl font-medium mb-6 transition-colors duration-300"
        style={{ color: isDark ? themeColors.common.white : themeColors.common.black }}>
        Articles récents
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Carte colorée selon la charte graphique */}
        <div className={cn(
          "rounded-xl overflow-hidden relative p-8 flex flex-col justify-between h-[320px] transition-colors duration-300",
          isDark 
            ? "bg-[#9FB832]/10 border-[#9FB832] border"
            : "bg-[#9FB832]/10 border-[#9FB832] border"
        )}>
          <div>
            <div className={cn(
              "absolute top-6 right-6 opacity-20 transition-colors duration-300",
              isDark ? "text-[#9FB832]" : "text-[#9FB832]"
            )}>
              <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className={cn(
              "inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 transition-colors duration-300",
              isDark 
                ? "bg-[#9FB832] text-white"
                : "bg-[#9FB832] text-white"
            )}>
              Blog UCLIC
            </span>
            <h4 className={cn(
              "text-xl font-bold mb-4 transition-colors duration-300",
              isDark ? "text-white" : "text-black"
            )}>
              Découvrez tous nos articles
            </h4>
            <p className={cn(
              "mb-4 transition-colors duration-300",
              isDark ? "text-white/80" : "text-black/80"
            )}>
              Notre blog couvre l&apos;actualité digitale, le développement web, et les dernières innovations UI/UX.
            </p>
          </div>
          <Link href="/blog" className={cn(
            "inline-flex items-center text-sm font-medium hover:underline transition-colors duration-300",
            isDark ? "text-[#9FB832]" : "text-[#9FB832]"
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
                  <div key={post.id} className="group">
                    <Link href={`/blog/${post.slug}`}>
                      <div className="rounded-xl overflow-hidden h-[250px] relative mb-4">
                        <img
                          src={`${image.url.replace(/\.(jpg|jpeg|png|gif)$/, '-400x250.$1')}.webp`}
                          alt={image.alt}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          width="400"
                          height="250"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors"></div>
                        {category && (
                          <span className="absolute top-3 left-3 px-3 py-1 bg-[#E0FF5C] text-black rounded-full text-xs font-medium">
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
                    </Link>
                    <div className={cn(
                      "flex items-center text-xs",
                      isDark ? "text-white/70" : "text-black/70"
                    )}>
                      <Link 
                        href={`/blog/author/${slugify(post._embedded?.author?.[0]?.name || '')}`}
                        className="mr-3 hover:text-[#E0FF5C] transition-colors duration-200"
                      >
                        {post._embedded?.author?.[0]?.name}
                      </Link>
                      <span className="mr-3">{date}</span>
                      <span>{readingTime} min de lecture</span>
                    </div>
                  </div>
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
                      ? (isDark ? "bg-[#E0FF5C]" : "bg-[#E0FF5C]") 
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
                <div key={post.id} className="group">
                  <Link href={`/blog/${post.slug}`}>
                    <div className="rounded-xl overflow-hidden h-[250px] relative mb-4">
                      <img
                        src={`${image.url.replace(/\.(jpg|jpeg|png|gif)$/, '-400x250.$1')}.webp`}
                        alt={image.alt}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        width="400"
                        height="250"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors"></div>
                      {category && (
                        <span className="absolute top-3 left-3 px-3 py-1 bg-[#E0FF5C] text-black rounded-full text-xs font-medium">
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
                  </Link>
                  <div className={cn(
                    "flex items-center text-xs",
                    isDark ? "text-white/70" : "text-black/70"
                  )}>
                    <Link 
                      href={`/blog/author/${slugify(post._embedded?.author?.[0]?.name || '')}`}
                      className="mr-3 hover:text-[#E0FF5C] transition-colors duration-200"
                    >
                      {post._embedded?.author?.[0]?.name}
                    </Link>
                    <span className="mr-3">{date}</span>
                    <span>{readingTime} min de lecture</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// Interface pour les éléments de la table des matières
interface TocItem {
  id: string;
  text: string;
  level: number;
  isVisible?: boolean;
}

export default function BlogPostClientSide({ post, preloadedRelatedPosts = [], preloadedLatestPosts = [] }: BlogPostProps) {
  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === 'dark';
  const themeColors = theme.colors;
  const [mounted, setMounted] = useState(false);
  const articleRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [processedContent, setProcessedContent] = useState(post.content);
  const [sidebarStyle, setSidebarStyle] = useState<React.CSSProperties>({});

  // Gestionnaire du comportement sticky
  useEffect(() => {
    if (!mounted) return;

    const handleScroll = () => {
      if (!containerRef.current || !sidebarRef.current) return;

      const container = containerRef.current;
      const sidebar = sidebarRef.current;
      const containerRect = container.getBoundingClientRect();
      const sidebarRect = sidebar.getBoundingClientRect();
      
      if (containerRect.top <= 120) {
        // Si le conteneur est au-dessus de la zone de vue
        if (containerRect.bottom - 120 >= sidebarRect.height) {
          // Si le conteneur est assez grand pour la sidebar
          setSidebarStyle({
            position: 'fixed',
            top: '120px',
            width: '18rem', // équivalent à w-72
          });
        } else {
          // Si on atteint le bas du conteneur
          setSidebarStyle({
            position: 'absolute',
            bottom: '0',
            width: '18rem',
          });
        }
      } else {
        // Réinitialiser la position
        setSidebarStyle({
          position: 'relative',
          top: '0',
          width: '18rem',
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Appel initial

    return () => window.removeEventListener('scroll', handleScroll);
  }, [mounted]);

  // Traiter le contenu HTML pour ajouter les IDs aux titres
  useEffect(() => {
    if (!mounted || typeof window === 'undefined') return;

    const processContent = (content: string) => {
      try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(content, 'text/html');
        
        const headings = doc.querySelectorAll('h2.wp-block-heading');
        const items: TocItem[] = [];
        const usedIds = new Set<string>();

        headings.forEach((heading) => {
          const text = heading.textContent || '';
          const id = slugify(text);
          
          // S'assurer que l'ID est unique
          let counter = 1;
          let uniqueId = id;
          while (usedIds.has(uniqueId)) {
            uniqueId = `${id}-${counter}`;
            counter++;
          }
          usedIds.add(uniqueId);
          
          // Ajouter l'ID à l'élément heading
          heading.id = uniqueId;

          items.push({
            id: uniqueId,
            text,
            level: 2,
          });
        });

        setTocItems(items);
        return doc.body.innerHTML;
      } catch (error) {
        console.error('Error processing content:', error);
        return content;
      }
    };

    const newContent = processContent(post.content);
    setProcessedContent(newContent);
  }, [mounted, post.content]);

  // Générer la table des matières
  useEffect(() => {
    if (!mounted || !articleRef.current) return;

    const generateTableOfContents = () => {
      const headings = articleRef.current?.querySelectorAll('h2, h3, h4');
      const items: TocItem[] = [];
      const usedIds = new Set<string>();

      headings?.forEach((heading) => {
        const level = parseInt(heading.tagName[1]);
        const text = heading.textContent || '';
        const id = slugify(text);
        
        // S'assurer que l'ID est unique
        let counter = 1;
        let uniqueId = id;
        while (usedIds.has(uniqueId)) {
          uniqueId = `${id}-${counter}`;
          counter++;
        }
        usedIds.add(uniqueId);
        
        // Assigner l'ID à l'élément heading
        heading.setAttribute('id', uniqueId);

        items.push({
          id: uniqueId,
          text,
          level,
        });
      });

      if (items.length > 0) {
        setTocItems(items);
      }
    };

    generateTableOfContents();
  }, [mounted, post.content]);

  // Observer pour suivre les sections visibles
  useEffect(() => {
    if (!mounted || !articleRef.current || tocItems.length === 0 || typeof window === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0% -35% 0%'
      }
    );

    // Observer tous les titres
    const headings = articleRef.current.querySelectorAll('h2, h3, h4');
    headings?.forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
  }, [mounted, tocItems, post.content]);

  // S'assurer que le thème est appliqué au montage
  useEffect(() => {
    setMounted(true);
  }, []);

  // Déterminer les classes de thème de manière cohérente
  const themeClasses = useMemo(() => {
    // Par défaut, on utilise le thème clair pour le SSR
    if (!mounted) {
      return {
        wrapper: "wp-content-wrapper flex-1 order-1 lg:order-2 overflow-hidden light",
        content: "[&>h2]:text-black [&>h3]:text-black [&>h4]:text-black [&>p]:text-black/80 [&>ul]:text-black/80 [&>ol]:text-black/80 [&_strong]:text-black [&_td]:text-black [&_td]:p-0 [&_td]:align-top [&_td]:space-y-1 [&_td_p]:m-0 [&_td_p]:p-0 [&_td_p]:text-base [&_td_strong]:m-0 [&_td_strong]:p-0 [&_td_p]:first-of-type:mb-1 [&_table_td_strong]:first-of-type:mb-1 [&_td_ul]:m-0 [&_td_ul]:p-0 [&_td_ul]:space-y-1 [&_td_li]:m-0 [&_td_li]:p-0 [&_td_li]:pl-0 [&_td_li]:text-base"
      };
    }
    
    return {
      wrapper: cn(
        "wp-content-wrapper flex-1 order-1 lg:order-2 overflow-hidden",
        isDark ? "dark" : "light"
      ),
      content: isDark 
        ? "[&>h2]:text-white [&>h3]:text-white [&>h4]:text-white [&>p]:text-white/100 [&>ul]:text-white/100 [&>ol]:text-white/100 [&_strong]:text-white [&_td]:text-white [&_td]:p-0 [&_td]:align-top [&_td]:space-y-1 [&_td_p]:m-0 [&_td_p]:p-0 [&_td_p]:text-base [&_td_strong]:m-0 [&_td_strong]:p-0 [&_td_p]:first-of-type:mb-1 [&_table_td_strong]:first-of-type:mb-1 [&_td_ul]:m-0 [&_td_ul]:p-0 [&_td_ul]:space-y-1 [&_td_li]:m-0 [&_td_li]:p-0 [&_td_li]:pl-0 [&_td_li]:text-base"
        : "[&>h2]:text-black [&>h3]:text-black [&>h4]:text-black [&>p]:text-black/80 [&>ul]:text-black/80 [&>ol]:text-black/80 [&_strong]:text-black [&_td]:text-black [&_td]:p-0 [&_td]:align-top [&_td]:space-y-1 [&_td_p]:m-0 [&_td_p]:p-0 [&_td_p]:text-base [&_td_strong]:m-0 [&_td_strong]:p-0 [&_td_p]:first-of-type:mb-1 [&_table_td_strong]:first-of-type:mb-1 [&_td_ul]:m-0 [&_td_ul]:p-0 [&_td_ul]:space-y-1 [&_td_li]:m-0 [&_td_li]:p-0 [&_td_li]:pl-0 [&_td_li]:text-base"
    };
  }, [isDark, mounted]);

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
    if (!mounted || typeof window === 'undefined' || !articleRef.current) return;
    
    const articleContent = articleRef.current;

    // Fonction utilitaire pour ajouter plusieurs classes
    const addClasses = (element: Element, classes: string) => {
      classes.split(' ').forEach(className => {
        if (className) element.classList.add(className);
      });
    };

    // Force le style des strong dans les cellules de tableau EN BREF
    const tables = articleContent.querySelectorAll('table');
    tables.forEach(table => {
      const firstStrong = table.querySelector('strong');
      if (firstStrong?.textContent?.includes('EN BREF')) {
        const allStrong = table.querySelectorAll('td strong');
        allStrong.forEach(strong => {
          if (strong instanceof HTMLElement) {
            strong.style.display = 'contents';
            if (!strong.textContent?.endsWith(':')) {
              strong.textContent = strong.textContent + ' :';
            }
          }
        });
      }
    });

    // Améliorer les tableaux WordPress (sauf EN BREF)
    const allTables = articleContent.querySelectorAll('table');
    allTables.forEach(table => {
      const firstStrong = table.querySelector('strong:first-child');
      // On ignore complètement les tableaux EN BREF
      if (firstStrong?.textContent?.includes('EN BREF')) {
        return;
      }

      // Style pour les autres tableaux qui changent avec le thème
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
        addClasses(th, 'bg-[#E0FF5C]/20 text-left p-4 font-semibold');
      });

      // Styliser les cellules du tableau
      const cells = table.querySelectorAll('td');
      cells.forEach(td => {
        addClasses(td, 'p-4 border-t');
        if (isDark) {
          td.classList.add('border-white/10');
          td.classList.add('text-white/100');
        } else {
          td.classList.add('border-black/10');
          td.classList.add('text-black/80');
        }
      });
    });

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
        // Ajout du background avec opacité selon le thème
        figure.className = cn(
          'my-10 w-full p-4 rounded-xl',
          isDark ? 'bg-white/5' : 'bg-black/5'
        );
        if (parent) {
          parent.insertBefore(figure, img);
          figure.appendChild(img);
        }
      } else if (img.closest('figure')) {
        // Si l'image est déjà dans une figure, ajouter le style à la figure existante
        const figure = img.closest('figure');
        if (figure) {
          addClasses(figure, 'p-4 rounded-xl');
          if (isDark) {
            addClasses(figure, 'bg-white/5');
          } else {
            addClasses(figure, 'bg-black/5');
          }
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
          if (isDark) {
            item.classList.add('text-white/100');
          } else {
            item.classList.add('text-black/80');
          }
        }
      });
    });

    // Améliorer les titres WordPress
    const headings = articleContent.querySelectorAll('h2, h3, h4, h5, h6');
    headings.forEach(heading => {
      if (heading.tagName === 'H2') {
        addClasses(heading, 'text-2xl md:text-3xl mt-8 mb-4 font-medium');
        addClasses(heading, isDark ? 'text-white' : 'text-black');
      } else if (heading.tagName === 'H3') {
        addClasses(heading, 'text-xl md:text-2xl mt-12 mb-4 font-medium');
        addClasses(heading, isDark ? 'text-white' : 'text-black');
      } else if (heading.tagName === 'H4') {
        addClasses(heading, 'text-lg md:text-xl mt-8 mb-3 font-medium');
        addClasses(heading, isDark ? 'text-white' : 'text-black');
      }
    });

    // Traiter les paragraphes
    const paragraphs = articleContent.querySelectorAll('p');
    paragraphs.forEach(p => {
      // Ne pas modifier les paragraphes qui sont à l'intérieur d'autres éléments comme les listes
      if (!p.closest('li, blockquote, figure')) {
        addClasses(p, 'mb-6 leading-relaxed text-base md:text-lg');
        if (isDark) {
          p.classList.add('text-white/100');
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
        addClasses(quote, 'border-[#E0FF5C]/70 text-white/80');
      } else {
        addClasses(quote, 'border-[#E0FF5C]/70 text-black/70');
      }
    });

    // Améliorer les liens
    const links = articleContent.querySelectorAll('a');
    links.forEach(link => {
      if (!link.closest('figure, nav')) {
        addClasses(link, 'font-medium transition-colors duration-200 underline decoration-1 underline-offset-2');
        if (isDark) {
          addClasses(link, 'text-[#E0FF5C] hover:text-[#E0FF5C]/80 decoration-[#E0FF5C]/30');
        } else {
          addClasses(link, 'text-[#E0FF5C] hover:text-[#E0FF5C]/80 decoration-[#E0FF5C]/30');
        }
      }
    });

  }, [post.content, isDark, mounted]);

  return (
    <article className={cn(
      "w-full min-h-screen relative overflow-hidden pt-28 md:pt-36 lg:pt-36 pb-16",
      isDark ? "bg-black" : "bg-white"
    )}>
      {/* Base Background gradient */}
      <div 
        className="absolute inset-0 z-0 transition-colors duration-300"
        style={{
          background: isDark 
            ? `linear-gradient(180deg, ${themeColors.common.black}, rgba(225, 255, 92, 0.31))`
            : `linear-gradient(180deg, ${themeColors.common.white}, rgba(225, 255, 92, 0.31))`
        }}
      />

      {/* Grain effect overlay */}
      <div 
        className={cn(
          "absolute inset-0 z-0 mix-blend-soft-light transition-opacity duration-300",
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
        className="absolute bottom-0 left-0 right-0 z-[1] transition-colors duration-300"
        style={{
          background: isDark
            ? 'linear-gradient(to top, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 1) 40%, rgba(0, 0, 0, 0) 100%)'
            : 'linear-gradient(to top, rgb(243, 244, 246) 0%, rgba(243, 244, 246, 1) 40%, rgba(243, 244, 246, 0) 100%)',
          height: '25%'
        }}
      />

      <div className="mx-auto px-4 sm:px-6 relative z-10 max-w-[1250px] overflow-hidden">
        {/* Hero section */}
        <div className="mb-6 md:mb-8 lg:mb-12 relative">
          {/* Featured image */}
          <div className="w-full h-[45vh] sm:h-[50vh] md:h-[60vh] relative rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden">
            <img
              src={post.featured_image_url}
              alt={post.title}
              className="absolute inset-0 w-full h-full object-cover"
              width="1200"
              height="800"
              loading="eager"
            />
            {/* Gradient overlay plus fort en bas pour le texte */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30"></div>
            
            {/* Contenu superposé */}
            <div className="absolute inset-0 p-4 sm:p-6 md:p-8 flex flex-col justify-between z-10">
              {/* Navigation row */}
              <div className="flex justify-between items-center">
                {/* Breadcrumb */}
                <nav className="hidden sm:flex items-center space-x-2 text-xs text-white/100">
                  <Link href="/" className="hover:text-white">Accueil</Link>
                  <span>/</span>
                  <Link href="/blog" className="hover:text-white">Blog</Link>
                  {post.category && (
                    <>
                      <span>/</span>
                      <Link 
                        href={`/blog/category/${slugify(post.category)}`}
                        className="hover:text-white"
                      >
                        {post.category}
                      </Link>
                    </>
                  )}
                </nav>

                {/* Back button */}
                <Link 
                  href="/blog" 
                  className="inline-flex items-center text-xs sm:text-sm text-white/100 hover:text-white"
                >
                  <svg className="w-4 h-4 mr-2 transform rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Retour au blog
                </Link>
              </div>

              {/* Contenu bas de l'image */}
              <div>
                {/* Title */}
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-white leading-tight">
                  {post.title}
                </h1>

                {/* Category badge et métadonnées */}
                <div>
                  {post.category && (
                    <Link 
                      href={`/blog/category/${slugify(post.category)}`}
                      className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4 shadow-sm
                        transition-all duration-200 hover:transform hover:scale-105"
                      style={{
                        backgroundColor: themeColors.primary.main,
                        color: themeColors.common.black
                      }}
                    >
                      {post.category}
                    </Link>
                  )}
                  
                  {/* Article meta */}
                  <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-sm text-white">
                    <Link 
                      href={`/blog/author/${slugify(post.author)}`}
                      className="flex items-center gap-2 hover:text-[#E0FF5C] transition-colors duration-200"
                    >
                      <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white/20">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <span className="font-medium">{post.author}</span>
                    </Link>
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
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content with sidebar */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 mt-6 sm:mt-8">
          {/* Sidebar */}
          {tocItems.length > 0 && (
            <div ref={containerRef} className="w-full lg:w-72 shrink-0 order-2 lg:order-1 relative">
              <div ref={sidebarRef} className="hidden lg:block" style={sidebarStyle}>
                <div className={cn(
                  "p-3 sm:p-4 rounded-lg sm:rounded-xl",
                  isDark ? "bg-white/5" : "bg-black/5"
                )}>
                  <h4 className={cn(
                    "text-sm sm:text-base font-medium mb-2 sm:mb-3",
                    isDark ? "text-white" : "text-black"
                  )}>
                    Table des matières
                  </h4>
                  <nav className={cn(
                    "space-y-1 sm:space-y-1.5 max-h-[60vh] overflow-y-auto",
                    "scrollbar-thin scrollbar-track-transparent",
                    isDark 
                      ? "scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20" 
                      : "scrollbar-thumb-black/10 hover:scrollbar-thumb-black/20"
                  )}>
                    {tocItems.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          const element = document.getElementById(item.id);
                          if (element) {
                            const headerOffset = 120;
                            const elementPosition = element.getBoundingClientRect().top;
                            const offsetPosition = window.scrollY + elementPosition - headerOffset;
                            
                            window.scrollTo({
                              top: offsetPosition,
                              behavior: "smooth"
                            });
                          }
                        }}
                        className={cn(
                          "block text-sm transition-colors duration-200 cursor-pointer",
                          item.level === 2 ? "ml-0" : item.level === 3 ? "ml-3" : "ml-6",
                          activeId === item.id
                            ? (isDark ? "text-[#E0FF5C]" : "text-[#9FB832]")
                            : (isDark ? "text-white/70 hover:text-white" : "text-black/70 hover:text-black"),
                        )}
                      >
                        {item.text}
                      </a>
                    ))}
                  </nav>
                </div>
              </div>
            </div>
          )}

          {/* Main content */}
          <div className={themeClasses.wrapper}>
            <article
              ref={articleRef}
              className={cn(
                "max-w-none mb-8 sm:mb-12 overflow-x-hidden",
                "[&_h1,&_h2,&_h3,&_h4,&_h5,&_h6]:all-unset [&_h1,&_h2,&_h3,&_h4,&_h5,&_h6]:break-words",
                "[&>h2]:block [&>h2]:text-xl sm:[&>h2]:text-2xl md:[&>h2]:text-3xl [&>h2]:mt-6 sm:[&>h2]:mt-8 [&>h2]:mb-3 sm:[&>h2]:mb-4 [&>h2]:font-medium [&>h2]:break-words",
                "[&>h3]:block [&>h3]:text-lg sm:[&>h3]:text-xl md:[&>h3]:text-2xl [&>h3]:font-semibold [&>h3]:mb-3 sm:[&>h3]:mb-4 [&>h3]:mt-6 sm:[&>h3]:mt-8 [&>h3]:break-words",
                "[&>h4]:block [&>h4]:text-base sm:[&>h4]:text-lg md:[&>h4]:text-xl [&>h4]:font-medium [&>h4]:mb-3 sm:[&>h4]:mb-4 [&>h4]:mt-4 sm:[&>h4]:mt-6 [&>h4]:break-words",
                "[&>p]:mb-4 sm:[&>p]:mb-6 [&>p]:leading-relaxed [&>p]:text-sm sm:[&>p]:text-base md:[&>p]:text-lg [&>p]:break-words",
                "[&>ul]:list-disc [&>ul]:ml-4 sm:[&>ul]:ml-6 [&>ul]:space-y-1.5 sm:[&>ul]:space-y-2 [&>ul]:mb-4 sm:[&>ul]:mb-6 [&>ul]:break-words",
                "[&>ol]:list-decimal [&>ol]:ml-4 sm:[&>ol]:ml-6 [&>ol]:space-y-1.5 sm:[&>ol]:space-y-2 [&>ol]:mb-4 sm:[&>ol]:mb-6 [&>ol]:break-words",
                "[&_strong]:font-semibold [&_strong]:break-words",
                "[&_a]:underline [&_a]:decoration-1 sm:[&_a]:decoration-2 [&_a]:break-words",
                "[&_br]:block [&_br]:mb-3 sm:[&_br]:mb-4",
                "[&_figure]:mb-8 sm:[&_figure]:mb-12",
                "[&_li]:mb-1.5 sm:[&_li]:mb-2 [&_li]:whitespace-normal [&_li]:flex [&_li]:items-start",
                "[&_table]:w-full [&_table]:border-collapse",
                "[&_td]:space-y-0 [&_td]:p-0 [&_td]:align-top",
                "[&_td_p]:m-0 [&_td_p]:p-0 [&_td_p]:text-base [&_td_p]:leading-normal [&_td_p]:whitespace-pre-wrap [&_td_p]:break-words",
                "[&_td_strong]:m-0 [&_td_strong]:p-0 [&_td_strong]:text-base [&_td_strong]:leading-normal [&_td_strong]:whitespace-pre-wrap [&_td_strong]:break-words [&_td_strong]:inline-block",
                "[&_td_p]:first-of-type:mb-0 [&_td_p]:first-of-type:inline-block",
                "[&_table_td_strong]:first-of-type:mb-0 [&_table_td_strong]:first-of-type:!inline-block [&_table_td_strong]:first-of-type:!contents",
                "[&_td_ul]:m-0 [&_td_ul]:p-0 [&_td_ul]:space-y-0",
                "[&_td_li]:m-0 [&_td_li]:p-0 [&_td_li]:pl-0 [&_td_li]:text-base [&_td_li]:leading-normal [&_td_li]:whitespace-pre-wrap [&_td_li]:break-words",
                themeClasses.content,
                "[&>figure.wp-block-table]:mb-3 sm:[&>figure.wp-block-table]:mb-4 [&>figure.wp-block-table]:mt-3 sm:[&>figure.wp-block-table]:mt-4 [&>figure]:mb-8 sm:[&>figure]:mb-12"
              )}
              dangerouslySetInnerHTML={{ __html: processedContent }}
            />
          </div>
        </div>

        {/* Share & Related Posts */}
        <div className="border-t py-6 sm:py-8 mb-12 sm:mb-16 transition-colors duration-300"
          style={{ borderColor: isDark ? `${themeColors.common.white}1a` : `${themeColors.common.black}1a` }}>
          <div className="flex justify-between items-center">
            <div>
              <h3 className={cn(
                "text-lg font-medium mb-2",
                isDark ? "text-white" : "text-black"
              )}>Partager cet article</h3>
              <div className="flex space-x-3">
                <button className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200", 
                  isDark 
                    ? "bg-white/10 hover:bg-white/20 text-white" 
                    : "bg-[#9FB832]/10 hover:bg-[#9FB832]/20 text-[#9FB832]"
                )}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3V2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200", 
                  isDark 
                    ? "bg-white/10 hover:bg-white/20 text-white" 
                    : "bg-[#9FB832]/10 hover:bg-[#9FB832]/20 text-[#9FB832]"
                )}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200", 
                  isDark 
                    ? "bg-white/10 hover:bg-white/20 text-white" 
                    : "bg-[#9FB832]/10 hover:bg-[#9FB832]/20 text-[#9FB832]"
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
                isDark ? "text-white hover:text-[#E0FF5C]" : "text-black hover:text-[#E0FF5C]"
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
              ? `linear-gradient(180deg, ${themeColors.primary.main} 0%, ${themeColors.common.black} 100%)`
              : `linear-gradient(180deg, transparent 0%, #F3F4F6 100%)`,
            height: '50%'
          }}
        />

        {/* Bande grise en bas */}
        <div 
          className="absolute bottom-0 left-0 right-0 z-[1]"
          style={{
            background: isDark
              ? themeColors.common.black
              : '#F3F4F6',
            height: '50%'
          }}
        />
        
        <div className="max-w-[1250px] mx-auto px-4 relative z-10">
          <PreFooter noBgGradient />
        </div>
      </div>
    </article>
  );
} 