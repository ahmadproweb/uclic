'use client';

import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { colors as theme } from '@/config/theme';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState, useMemo } from 'react';
import { WordPressPost, getRelatedPosts, getPostCategory, getFeaturedImage, formatDate, estimateReadingTime, getLatestPosts } from '@/services/wordpress';
import { slugify, cleanHtmlEntities } from '@/utils/string';
import '@/styles/wordpress-content.css';

// Chargement dynamique des composants non-critiques
const ScrollToTop = dynamic(() => import('@/components/ui/ScrollToTop'), {
  ssr: false,
  loading: () => null
});

const StickyShareButtons = dynamic(() => import('@/components/ui/StickyShareButtons'), {
  ssr: false,
  loading: () => null
});

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

// Fonction pour capitaliser la première lettre
const capitalizeTitle = (title: string) => {
  if (!title) return '';
  return title.charAt(0).toUpperCase() + title.slice(1);
};

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

  // Memoize les posts visibles pour éviter les re-renders inutiles
  const visiblePosts = useMemo(() => {
    const startIdx = currentSlide * 2;
    return latestPosts.slice(startIdx, startIdx + 2);
  }, [latestPosts, currentSlide]);

  useEffect(() => {
    let isMounted = true;

    // Si nous avons déjà des données préchargées, pas besoin de charger davantage
    if (initialRelatedPosts.length > 0 && initialLatestPosts.length > 0) {
      return;
    }

    async function fetchPosts() {
      try {
        setLoading(true);
        
        // Charger en parallèle pour de meilleures performances
        const [related, latest] = await Promise.all([
          initialRelatedPosts.length === 0 ? getRelatedPosts(currentPost, 3) : Promise.resolve(initialRelatedPosts),
          initialLatestPosts.length === 0 ? getLatestPosts(6) : Promise.resolve(initialLatestPosts)
        ]);

        if (!isMounted) return;

        setRelatedPosts(related);
        const latestArray = Array.isArray(latest) ? latest : latest.posts;
        setLatestPosts(latestArray.filter((post: WordPressPost) => post.id !== currentPost.id).slice(0, 6));
      } catch (err) {
        if (!isMounted) return;
        console.error("[RelatedPosts] Error fetching posts:", err);
        setError("Erreur lors du chargement des articles");
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchPosts();

    return () => {
      isMounted = false;
    };
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
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {/* Carte colorée selon la charte graphique */}
        <div className={cn(
          "w-full rounded-xl overflow-hidden relative p-6 md:p-8 flex flex-col justify-between h-[320px] transition-colors duration-300",
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
                const title = cleanHtmlEntities(post.title.rendered);
                const date = formatDate(post.date);
                const readingTime = estimateReadingTime(post.content.rendered);

                return (
                  <div key={post.id} className="group">
                    <Link 
                      href={`/blog/${post.slug}`}
                      className="block w-full rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1 border backdrop-blur-md relative"
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
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"
                        style={{
                          background: isDark
                            ? `linear-gradient(to right, rgba(212,237,49,0.08) 0%, rgba(212,237,49,0.08) 60%, rgba(212,237,49,0) 100%)`
                            : `linear-gradient(to right, rgba(212,237,49,0.10) 0%, rgba(212,237,49,0.10) 60%, rgba(212,237,49,0) 100%)`,
                          filter: 'blur(20px)',
                        }}
                      />
                      
                      <div className="relative w-full h-48 overflow-hidden">
                        <img
                          src={`${image.url.replace(/\.(jpg|jpeg|png|gif)$/, '-400x250.$1')}.webp`}
                          alt={capitalizeTitle(title)}
                          className="object-cover transition-transform duration-500 group-hover:scale-105 w-full h-full"
                          width="400"
                          height="250"
                          loading="lazy"
                          onError={(e) => {
                            const target = e.currentTarget as HTMLImageElement;
                            const jpgFallback = image.url.replace(/\.(jpg|jpeg|png|gif)$/, '-400x250.$1');
                            if (target.src !== jpgFallback) {
                              target.src = jpgFallback;
                            }
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                        {category && (
                          <span className="absolute bottom-4 left-4 inline-block px-3 py-1 bg-black text-[#E0FF5C] rounded-full text-sm z-20">
                            {category}
                          </span>
                        )}
                      </div>
                      
                      <div className="p-6 space-y-3">
                        <h4 className={cn(
                          "text-xl font-semibold",
                          isDark ? "text-white" : "text-black"
                        )}>
                          {capitalizeTitle(title)}
                        </h4>
                        
                        <div className={cn(
                          "flex items-center gap-2 text-sm",
                          isDark ? "text-white/70" : "text-black/70"
                        )}>
                          <div className={cn("w-6 h-6 rounded-full flex items-center justify-center", isDark ? "bg-white/10" : "bg-black/10")}>
                            <i className="ri-time-line text-sm" aria-hidden="true" style={{ color: isDark ? theme.colors.primary.main : undefined }} />
                          </div>
                          {readingTime} min de lecture
                        </div>
                      </div>
                    </Link>
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
                onClick={() => setCurrentSlide(currentSlide === 0 ? Math.ceil(latestPosts.length / 2) - 1 : currentSlide - 1)}
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
                onClick={() => setCurrentSlide(currentSlide === Math.ceil(latestPosts.length / 2) - 1 ? 0 : currentSlide + 1)}
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
              const title = cleanHtmlEntities(post.title.rendered);
              const date = formatDate(post.date);
              const readingTime = estimateReadingTime(post.content.rendered);

              return (
                <div key={post.id} className="group">
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="block w-full rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1 border backdrop-blur-md relative"
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
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"
                      style={{
                        background: isDark
                          ? `linear-gradient(to right, rgba(212,237,49,0.08) 0%, rgba(212,237,49,0.08) 60%, rgba(212,237,49,0) 100%)`
                          : `linear-gradient(to right, rgba(212,237,49,0.10) 0%, rgba(212,237,49,0.10) 60%, rgba(212,237,49,0) 100%)`,
                        filter: 'blur(20px)',
                      }}
                    />
                    
                    <div className="relative w-full h-48 overflow-hidden">
                      <img
                        src={`${image.url.replace(/\.(jpg|jpeg|png|gif)$/, '-400x250.$1')}.webp`}
                        alt={capitalizeTitle(title)}
                        className="object-cover transition-transform duration-500 group-hover:scale-105 w-full h-full"
                        width="400"
                        height="250"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.currentTarget as HTMLImageElement;
                          const jpgFallback = image.url.replace(/\.(jpg|jpeg|png|gif)$/, '-400x250.$1');
                          if (target.src !== jpgFallback) {
                            target.src = jpgFallback;
                          }
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                      {category && (
                        <span className="absolute bottom-4 left-4 inline-block px-3 py-1 bg-black text-[#E0FF5C] rounded-full text-sm z-20">
                          {category}
                        </span>
                      )}
                    </div>
                    
                    <div className="p-6 space-y-3">
                      <h4 className={cn(
                        "text-xl font-semibold",
                        isDark ? "text-white" : "text-black"
                      )}>
                        {capitalizeTitle(title)}
                      </h4>
                      
                      <div className={cn(
                        "flex items-center gap-2 text-sm",
                        isDark ? "text-white/70" : "text-black/70"
                      )}>
                        <div className={cn("w-6 h-6 rounded-full flex items-center justify-center", isDark ? "bg-white/10" : "bg-black/10")}>
                          <i className="ri-time-line text-sm" aria-hidden="true" style={{ color: isDark ? theme.colors.primary.main : undefined }} />
                        </div>
                        {readingTime} min de lecture
                      </div>
                    </div>
                  </Link>
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
        
        const headings = doc.querySelectorAll('h2, h3, h4');
        const items: TocItem[] = [];
        const usedIds = new Set<string>();

        headings.forEach((heading) => {
          const text = heading.textContent || '';
          const id = slugify(text);
          const level = parseInt(heading.tagName[1]);
          
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
            level,
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
    setProcessedContent(cleanHtmlEntities(newContent));
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

    // Traitement des images WordPress pour le lazy loading
    const images = articleContent.querySelectorAll('img');
    images.forEach(img => {
      const dataSrc = img.getAttribute('data-src');
      if (dataSrc) {
        const newImg = new Image();
        newImg.onload = () => {
          img.src = dataSrc;
          img.classList.remove('bricks-lazy-hidden');
          img.classList.add('bricks-lazy-loaded');
        };
        newImg.src = dataSrc;
      }
    });

  }, [post.content, isDark, mounted]);

  return (
    <article className={cn(
      "w-full min-h-screen relative overflow-hidden pt-32 pb-16 md:pb-24 px-4 sm:px-6",
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
          "max-w-[1250px] mx-auto px-4 sm:px-6 py-8 md:py-12 relative z-10 rounded-2xl border overflow-hidden",
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
        {/* Hero section */}
        <div className="mb-6 md:mb-8 lg:mb-12 relative">
          {/* Featured image */}
          <div 
            className="w-full h-[35vh] sm:h-[40vh] md:h-[45vh] relative rounded-3xl overflow-hidden border backdrop-blur-md mb-8"
            style={{
              borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
            }}
          >
            <img
              src={post.featured_image_url}
              alt={cleanHtmlEntities(post.title)}
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
                  {cleanHtmlEntities(post.title)}
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
                          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 00 0 8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
                  "p-6 rounded-3xl border backdrop-blur-md relative bg-transparent",
                  isDark ? "border-white/10" : "border-black/5"
                )}>
                  {/* Background pattern */}
                  <div
                    className="absolute inset-0 rounded-3xl -z-10"
                    style={{
                      backgroundImage: `url(${require('@/lib/assets').backgroundEffectUrl})`,
                      backgroundRepeat: "repeat",
                      backgroundSize: "200px",
                      opacity: isDark ? "0.4" : "0.04"
                    }}
                  />
                  {/* Hover halo effect */}
                  <div 
                    className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"
                    style={{
                      background: isDark
                        ? `radial-gradient(ellipse at center, rgba(212,237,49,0.08) 0%, rgba(212,237,49,0.04) 40%, transparent 70%)`
                        : `radial-gradient(ellipse at center, rgba(212,237,49,0.12) 0%, rgba(212,237,49,0.06) 40%, transparent 70%)`,
                      filter: 'blur(12px)',
                    }}
                  />
                  <h4 className={cn(
                    "text-sm sm:text-base font-medium mb-2 sm:mb-3 relative z-20",
                    isDark ? "text-white" : "text-black"
                  )}>
                    Table des matières
                  </h4>
                  <nav className={cn(
                    "space-y-1 sm:space-y-1.5 max-h-[60vh] overflow-y-auto relative z-20",
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
                            // Ajuster l'offset pour tenir compte du header et du padding
                            const headerOffset = 140;
                            const elementPosition = element.getBoundingClientRect().top;
                            const offsetPosition = window.scrollY + elementPosition - headerOffset;
                            
                            // Scroll vers l'élément
                            window.scrollTo({
                              top: Math.max(0, offsetPosition),
                              behavior: "smooth"
                            });
                            
                            // Mettre à jour l'ID actif après un court délai
                            setTimeout(() => {
                              setActiveId(item.id);
                            }, 100);
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
          <div className={cn(
            themeClasses.wrapper,
            "rounded-3xl border backdrop-blur-md relative p-6 sm:p-8 bg-transparent",
            isDark ? "border-white/10" : "border-black/5"
          )}>
            {/* Background pattern */}
            <div
              className="absolute inset-0 rounded-3xl -z-10"
              style={{
                backgroundImage: `url(${require('@/lib/assets').backgroundEffectUrl})`,
                backgroundRepeat: "repeat",
                backgroundSize: "200px",
                opacity: isDark ? "0.4" : "0.04"
              }}
            />
            {/* Hover halo effect */}
            <div 
              className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"
              style={{
                background: isDark
                  ? `radial-gradient(ellipse at center, rgba(212,237,49,0.08) 0%, rgba(212,237,49,0.04) 40%, transparent 70%)`
                  : `radial-gradient(ellipse at center, rgba(212,237,49,0.12) 0%, rgba(212,237,49,0.06) 40%, transparent 70%)`,
                filter: 'blur(12px)',
              }}
            />
            <article
              ref={articleRef}
              className="max-w-none wp-content-styles relative z-20"
              dangerouslySetInnerHTML={{ __html: processedContent }}
            />
          </div>
        </div>

        {/* Share Section */}
        <div className="max-w-[1250px] mx-auto px-0 py-16">
          <div 
            className={cn(
              "relative rounded-2xl overflow-hidden border backdrop-blur-md p-8",
              isDark ? "border-white/10" : "border-black/5"
            )}
            style={{
              background: isDark ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.4)"
            }}
          >
            {/* Hover halo effect */}
            <div 
              className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"
              style={{
                background: `radial-gradient(ellipse at center, rgba(212,237,49,0.08) 0%, rgba(212,237,49,0.04) 40%, transparent 70%)`,
                filter: 'blur(12px)',
              }}
            />
          <div className="flex justify-between items-center relative z-20">
            <div>
              <h3 className="text-lg font-medium mb-2 text-black dark:text-white">
                Partager cet article
              </h3>
              <div className="flex space-x-3">
                {/* Native share button */}
                <button 
                  onClick={async () => {
                    console.log('Share button clicked');
                    if (navigator.share) {
                      try {
                        await navigator.share({
                          title: cleanHtmlEntities(post.title),
                          text: post.excerpt,
                          url: window.location.href,
                        });
                      } catch (err) {
                        console.log('Error sharing:', err);
                      }
                    } else {
                      // Fallback: copy to clipboard
                      await navigator.clipboard.writeText(window.location.href);
                      alert('Lien copié dans le presse-papiers !');
                    }
                  }}
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-[#9FB832]/10 text-[#9FB832] hover:bg-[#9FB832]/20 transition-colors cursor-pointer relative z-30"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center hover:underline hover:text-[#E0FF5C] text-black dark:text-white"
            >
              <span className="mr-2">Voir tous les articles</span>
              <svg
                className="w-4 h-4 transform rotate-45"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  d="M5 12h14M12 5l7 7-7 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
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
      <StickyShareButtons title={cleanHtmlEntities(post.title)} url={`/blog/${post.slug}`} />
      <ScrollToTop />
    </article>
  );
} 