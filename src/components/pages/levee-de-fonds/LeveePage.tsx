'use client';

import { useTheme } from 'next-themes';
import { cn } from "@/lib/utils";
import { colors as theme } from '@/config/theme';
import Link from 'next/link';
import PreFooter from '@/components/footer/PreFooter';
import ScrollToTop from '@/components/ui/ScrollToTop';
import StickyShareButtons from '@/components/ui/StickyShareButtons';
import { useEffect, useRef, useState, useMemo } from 'react';
import { formatDate } from '@/services/wordpress';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { slugify } from '@/utils/string';

interface LeveePost {
  id: string;
  title: string;
  slug: string;
  date: string;
  content: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  };
}

interface LeveePageProps {
  post: LeveePost;
  relatedPosts: LeveePost[];
  latestPosts: LeveePost[];
}

// Internal RelatedLeveeCard component
function RelatedLeveeCard({ post }: { post: LeveePost }) {
  return (
    <Link href={`/levee-de-fonds/${post.slug}`} className="group rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl backdrop-blur-sm"
      style={{
        background: `linear-gradient(145deg, #E0FF5C, #E0FF5C)`,
        boxShadow: `0 8px 32px -4px rgba(224, 255, 92, 0.25)`
      }}
    >
      <div className="relative w-full h-48 overflow-hidden">
        <img
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
          Levée de fonds
        </span>
      </div>
      
      <div className="p-6 space-y-4">
        <h3 className="text-xl font-semibold text-black">
          {post.title}
        </h3>

        <div className="flex items-center gap-2 text-sm text-black/70">
          {formatDate(post.date)}
        </div>
      </div>
    </Link>
  );
}

// Composant pour les articles associés
function RelatedPosts({ 
  currentPost, 
  relatedPosts = [], 
  latestPosts = [] 
}: { 
  currentPost: LeveePost; 
  relatedPosts: LeveePost[];
  latestPosts: LeveePost[];
}) {
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
              Levées de fonds
            </span>
            <h4 className={cn(
              "text-xl font-bold mb-4 transition-colors duration-300",
              isDark ? "text-white" : "text-black"
            )}>
              Découvrez toutes nos levées de fonds
            </h4>
            <p className={cn(
              "mb-4 transition-colors duration-300",
              isDark ? "text-white/80" : "text-black/80"
            )}>
              Restez informé des investissements dans l&apos;écosystème Web3 et des dernières innovations.
            </p>
          </div>
          <Link href="/levee-de-fonds" className={cn(
            "inline-flex items-center text-sm font-medium hover:underline transition-colors duration-300",
            isDark ? "text-[#9FB832]" : "text-[#9FB832]"
          )}>
            <span className="mr-2">Explorer les levées de fonds</span>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>

        {/* Slider pour les derniers articles */}
        <div className="col-span-2 relative">
          {/* Articles visibles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            {visiblePosts.map((post) => (
              <Link href={`/levee-de-fonds/${post.slug}`} key={post.id} className="group rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl backdrop-blur-sm"
                style={{
                  background: `linear-gradient(145deg, #E0FF5C, #E0FF5C)`,
                  boxShadow: `0 8px 32px -4px rgba(224, 255, 92, 0.25)`
                }}
              >
                <div className="relative w-full h-48 overflow-hidden">
                  <img
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
                    Levée de fonds
                  </span>
                </div>
                
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-semibold text-black">
                    {post.title}
                  </h3>

                  <div className="flex items-center gap-2 text-sm text-black/70">
                    {formatDate(post.date)}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Navigation buttons */}
          <div className="flex items-center justify-between mt-6">
            {/* Bullets à gauche */}
            <div className="flex gap-1">
              {Array.from({ length: Math.ceil(latestPosts.length / 2) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300",
                    currentSlide === index
                      ? "bg-[#9FB832]"
                      : "bg-[#9FB832]/30"
                  )}
                />
              ))}
            </div>

            {/* Flèches à droite */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => changeSlide('prev')}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 hover:bg-[#9FB832]/10 text-[#9FB832]"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button
                onClick={() => changeSlide('next')}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 hover:bg-[#9FB832]/10 text-[#9FB832]"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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

// Interface pour les éléments de la table des matières
interface TocItem {
  id: string;
  text: string;
  level: number;
  isVisible?: boolean;
}

export default function LeveePage({ post, relatedPosts, latestPosts }: LeveePageProps) {
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
  const mainRef = useRef<HTMLElement>(null);
  const [activeHeading, setActiveHeading] = useState<string>('');
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

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
    if (!mounted) return;

    const processContent = (content: string) => {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = content;
      
      const headings = tempDiv.querySelectorAll('h2.wp-block-heading');
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
      return tempDiv.innerHTML;
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
    if (!mounted || !articleRef.current || tocItems.length === 0) return;

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
              src={post.featuredImage?.node.sourceUrl || '/images/default-post.jpg'}
              alt={post.featuredImage?.node.altText || post.title}
              className="object-cover w-full h-full"
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
                  <Link href="/levee-de-fonds" className="hover:text-white">Levées de fonds</Link>
                </nav>

                {/* Back button */}
                <Link 
                  href="/levee-de-fonds" 
                  className="inline-flex items-center text-xs sm:text-sm text-white/100 hover:text-white"
                >
                  <svg className="w-4 h-4 mr-2 transform rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Retour aux levées de fonds
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
                  <span className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4 shadow-sm
                    transition-all duration-200 hover:transform hover:scale-105"
                    style={{
                      backgroundColor: themeColors.primary.main,
                      color: themeColors.common.black
                    }}
                  >
                    Levée de fonds
                  </span>
                  
                  {/* Article meta */}
                  <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-sm text-white">
                    {/* Auteur */}
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <span>Uclic</span>
                    </div>

                    {/* Temps de lecture */}
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <span>5 min de lecture</span>
                    </div>

                    {/* Date */}
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M19 4H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2zM16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                <span>{formatDate(post.date)}</span>
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
              href="/levee-de-fonds"
              className={cn(
                "inline-flex items-center hover:underline transition-all",
                isDark ? "text-white hover:text-[#E0FF5C]" : "text-black hover:text-[#E0FF5C]"
              )}
            >
              <span className="mr-2">Voir toutes les levées de fonds</span>
              <svg className="w-4 h-4 transform rotate-45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>

        {/* Articles associés */}
        <RelatedPosts 
          currentPost={post}
          relatedPosts={relatedPosts}
          latestPosts={latestPosts}
        />
      </div>

      {/* Boutons de partage et retour en haut */}
      <StickyShareButtons title={post.title} url={`/levee-de-fonds/${post.slug}`} />
      <ScrollToTop />
      
      {/* PreFooter Section */}
      <div className="w-full relative overflow-hidden pt-32 pb-8">
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