'use client';

import { memo, useEffect, useRef, useState, Fragment, useMemo } from 'react';
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { CTAButton } from "@/components/ui/cta-button";
import Script from 'next/script';
import type { Testimonial } from './types';
import '@/styles/testimonials-columns.css';

// Types
interface TestimonialClientProps {
  testimonials: Testimonial[];
}

// Memoized Components
const StarRating = memo(({ rating }: { rating: number }) => null);

StarRating.displayName = 'StarRating';

const TestimonialCard = memo(({ testimonial, isDark, index, isMasonry = false }: { 
  testimonial: Testimonial; 
  isDark: boolean;
  index: number;
  isMasonry?: boolean;
}) => {
  return (
  <article 
    className={cn(
      "rounded-3xl p-5 md:p-6",
      "hover:-translate-y-1 backdrop-blur-md border",
      "animate-fade-in-up group h-full flex flex-col transition-all duration-300 relative",
      isDark 
        ? "bg-black/40 border-white/10 hover:border-white/20" 
        : "bg-white/40 border-black/5 hover:border-black/10",
      isMasonry && "justify-between"
    )}
    style={{ animationDelay: `${index * 150}ms` }}
    itemScope 
    itemType="https://schema.org/Review"
  >
    <div className="flex-1 flex flex-col">
      <StarRating rating={testimonial.reviewGivenStar} />
     {testimonial.commentUrl ? (
     <a  
    href={testimonial.commentUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="no-underline"
    aria-label="Voir la preuve du commentaire"
  >
    <blockquote 
      className={cn(
        "text-sm md:text-[15px] leading-relaxed mb-4 flex-1",
        isDark ? "text-white" : "text-black",
        isMasonry && "md:line-clamp-4"
      )}
      itemProp="reviewBody"
    >
      {testimonial.review}
    </blockquote>
  </a>
) : (
  <blockquote 
    className={cn(
      "text-sm md:text-[15px] leading-relaxed mb-4 flex-1",
      isDark ? "text-white" : "text-black",
      isMasonry && "md:line-clamp-4"
    )}
    itemProp="reviewBody"
  >
    {testimonial.review}
  </blockquote>
)}
    </div>
    <footer className="flex items-center gap-2 md:gap-3 mt-auto">
      {testimonial.authorProfileUrl ? (
      <a
        href={testimonial.authorProfileUrl ?? undefined}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "w-10 h-10 md:w-12 md:h-12 aspect-square rounded-full overflow-hidden relative shrink-0",
          "flex items-center justify-center",
          isDark ? "bg-white/10 ring-1 ring-white/15" : "bg-black/10 ring-1 ring-black/10"
        )}
        aria-label={`Voir le profil de ${testimonial.title}`}
      >
        {testimonial.imageTesti && (
          <img
            src={require('@/lib/assets').getAssetUrl(`/${testimonial.imageTesti}`)} 
            alt={`Photo de ${testimonial.title}`}
            className="w-full h-full object-cover rounded-full block"
            loading="lazy"
            itemProp="image"
          />
        )}
        <i 
          className={cn(
            "ri-user-line text-xl md:text-2xl absolute inset-0 flex items-center justify-center",
            isDark ? "text-white/80" : "text-black/80",
            testimonial.imageTesti ? "opacity-0 group-hover:opacity-100 transition-opacity duration-300" : ""
          )}
          aria-hidden="true"
        />
      </a>
) : (
  <div itemProp="author" itemScope itemType="https://schema.org/Person">
        <cite 
          className={cn(
            "text-sm md:text-[15px] font-medium not-italic",
            isDark ? "text-white" : "text-black"
          )}
          itemProp="name"
        >
          {testimonial.title}
        </cite>
        <div 
          className={cn(
            "text-[11px] md:text-xs line-clamp-1",
            isDark ? "text-white/60" : "text-black/70"
          )}
          itemProp="jobTitle"
        >
          {testimonial.clientDesignation}
        </div>
      </div>
)}

     
    </footer>
  </article>
)});

// (Deprecated grid-masonry) — we fallback to CSS columns masonry for reliability

TestimonialCard.displayName = 'TestimonialCard';

const TestimonialHeader = memo(({ isDark, average, reviewCount }: { isDark: boolean; average: number; reviewCount: number }) => (
  <header className="text-center mb-12 md:mb-16 animate-fade-in-up">
    <div className={cn(
      "inline-flex px-4 py-2 border rounded-full mb-6",
      isDark 
        ? "border-white/10 bg-white/5" 
        : "border-black/10 bg-black/5"
    )}>
      <span className={cn("font-medium text-sm", isDark ? "text-white" : "text-black")}>💡 Tips & Réactions</span>
    </div>
    
    <h2 className={cn(
      "max-w-5xl mx-auto text-center mb-6",
      "text-2xl sm:text-3xl md:text-4xl lg:text-5xl",
      "font-bold tracking-[-1px]",
      isDark ? "text-white" : "text-black",
      "leading-[1.1]"
    )}>
      +30.000 professionnels réagissent<br/>aux tips Growth & IA de Wladimir
    </h2>
    
    <p className={cn(
      "text-center max-w-3xl mx-auto mb-6 text-base md:text-lg leading-relaxed",
      isDark ? "text-white/80" : "text-black/80"
    )}>
      Fondateur d'Uclic, Wladimir partage quotidiennement ses stratégies de croissance et d'automatisation IA sur LinkedIn. Ci-dessous, découvrez les <strong className={cn("font-semibold", isDark ? "text-white" : "text-black")}>réactions vérifiées de CMOs, founders et Growth Hackers</strong> qui appliquent ses conseils — chaque commentaire est cliquable.
    </p>
    
    <div className="flex flex-wrap gap-2 justify-center mb-10 md:mb-12">
      <span className={cn(
        "px-4 py-2 rounded-full text-xs font-semibold border backdrop-blur-md",
        isDark 
          ? "bg-black/40 border-white/10 text-white" 
          : "bg-white/40 border-black/5 text-black"
      )}>📈 +20M de vues LinkedIn</span>
      <span className={cn(
        "px-4 py-2 rounded-full text-xs font-semibold border backdrop-blur-md",
        isDark 
          ? "bg-black/40 border-white/10 text-white" 
          : "bg-white/40 border-black/5 text-black"
      )}>💬 +10.000 commentaires positifs</span>
      <span className={cn(
        "px-4 py-2 rounded-full text-xs font-semibold border backdrop-blur-md",
        isDark 
          ? "bg-black/40 border-white/10 text-white" 
          : "bg-white/40 border-black/5 text-black"
      )}>👥 +30.000 Followers</span>
    </div>
  </header>
));

TestimonialHeader.displayName = 'TestimonialHeader';

const SpotifyEpisodeCard = memo(({ isDark }: { isDark: boolean }) => (
  <div className="mb-12 md:mb-16 animate-fade-in-up">
    <div className={cn(
      "rounded-3xl p-6 md:p-8 backdrop-blur-md border relative overflow-hidden",
      "transition-all duration-300 hover:scale-[1.02]",
      isDark 
        ? "bg-[#1DB954]/10 border-[#1DB954]/30 shadow-lg shadow-[#1DB954]/10" 
        : "bg-[#1DB954]/10 border-[#1DB954]/30 shadow-lg shadow-[#1DB954]/10"
    )}>
      {/* Halo Spotify vert */}
      <div
        className="pointer-events-none absolute inset-0 z-0 rounded-3xl"
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(29,185,84,0.15) 0%, rgba(29,185,84,0.05) 50%, rgba(0,0,0,0) 100%)`,
          filter: 'blur(20px)'
        }}
      />
      
      <div className="relative z-10">
        <img 
          src="https://cdn.prod.website-files.com/6356415ed6b8bbc9002c05ff/636299de87c6ff697d22ed29_WMlogo-black.svg"
          alt="Logo Wild Marketer"
          className={cn("h-6 w-auto mb-4", isDark && "brightness-0 invert")}
        />
        <div className="inline-flex px-3 py-1 bg-[#1DB954]/20 border border-[#1DB954]/30 rounded-full mb-3">
          <span className="text-[#1DB954] font-semibold text-xs">🎙️ Podcast Spotify</span>
        </div>
        <h3 className={cn("text-lg md:text-xl font-bold mb-2", isDark ? "text-white" : "text-black")}>
          Wladimir Delcros avec Alexandre Brengues : Automatiser à 100% sa Lead Generation B2B
        </h3>
        <p className={cn("text-sm mb-4 leading-relaxed", isDark ? "text-white/70" : "text-black/70")}>
          Head of Growth chez CodinGame partage tout son workflow d'automatisation avec des outils No-Code avec Alexandre Brengues (Wild Marketer). 
          1h06 de stratégies actionnables.
        </p>
        
        {/* Spotify Embed */}
        <div className="mb-4 rounded-2xl overflow-hidden">
          <iframe 
            src="https://open.spotify.com/embed/episode/6oN7OBOaooqdFnT0czddrc?utm_source=generator&theme=0" 
            width="100%" 
            height="232" 
            frameBorder="0" 
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
            loading="lazy"
            className="rounded-2xl"
          />
        </div>
        
        {/* Invité par */}
        <div className="flex items-center gap-3 pl-1">
          <span className={cn("text-xs font-medium", isDark ? "text-white/60" : "text-black/60")}>
            Invité par :
          </span>
          <div className="flex items-center gap-2">
            <div className="relative">
              <img 
                   src="/images/alexandre-brengues.jpg"
                alt="Alexandre Brengues"
                   width="40"
        height="40"
          loading="lazy"
                className="w-10 h-10 rounded-full border-2 border-[#1DB954]/30 object-cover"
              />
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-[#1DB954] rounded-full border-2 border-white dark:border-black" />
            </div>
            <span className={cn("text-sm font-semibold", isDark ? "text-white" : "text-black")}>
              Alexandre Brengues
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
));

SpotifyEpisodeCard.displayName = 'SpotifyEpisodeCard';

const YouTubeVideoCard = memo(({ isDark }: { isDark: boolean }) => (
  <div className="mb-4 break-inside-avoid animate-fade-in-up">
    <div className={cn(
      "rounded-3xl p-6 md:p-8 backdrop-blur-md border relative overflow-hidden",
      "transition-all duration-300 hover:scale-[1.02]",
      isDark 
        ? "bg-[#FF0000]/10 border-[#FF0000]/30 shadow-lg shadow-[#FF0000]/10" 
        : "bg-[#FF0000]/10 border-[#FF0000]/30 shadow-lg shadow-[#FF0000]/10"
    )}>
      {/* Halo YouTube rouge */}
      <div
        className="pointer-events-none absolute inset-0 z-0 rounded-3xl"
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(255,0,0,0.15) 0%, rgba(255,0,0,0.05) 50%, rgba(0,0,0,0) 100%)`,
          filter: 'blur(20px)'
        }}
      />
      
      <div className="relative z-10">
        <img 
          src="https://cdn.prod.website-files.com/644bc804ad8e925fa8a932d1/644fa08cb2061af9c7c8ebdb_logo-scalezia.svg"
          alt="Logo Scalezia"
          className={cn("h-6 w-auto mb-4", isDark && "brightness-0 invert")}
        />
        <div className="inline-flex px-3 py-1 bg-[#FF0000]/20 border border-[#FF0000]/30 rounded-full mb-3">
          <span className="text-[#FF0000] font-semibold text-xs">🎱 Vidéo YouTube</span>
        </div>
        <h3 className={cn("text-lg md:text-xl font-bold mb-2", isDark ? "text-white" : "text-black")}>
          Wladimir Delcros avec Benoit Dubos : Contacter les prospects au bon moment
        </h3>
        <p className={cn("text-sm mb-4 leading-relaxed", isDark ? "text-white/70" : "text-black/70")}>
          Wladimir Delcros et Benoit Dubos (Scalezia) partagent leurs stratégies pour automatiser votre prospection et contacter vos leads au moment optimal.
        </p>
        
        {/* YouTube Embed */}
        <div className="mb-4 rounded-2xl overflow-hidden">
          <iframe 
            width="100%" 
            height="315" 
            src="https://www.youtube.com/embed/GRlZO8KtB7A" 
            title="Wladimir Delcros avec Benoit Dubos : Contacter les prospects au bon moment" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerPolicy="strict-origin-when-cross-origin" 
            allowFullScreen
            className="rounded-2xl aspect-video"
          />
        </div>
        
        {/* Invité par */}
        <div className="flex items-center gap-3 pl-1">
          <span className={cn("text-xs font-medium", isDark ? "text-white/60" : "text-black/60")}>
            Invité par :
          </span>
          <div className="flex items-center gap-2">
            <div className="relative">
              <img 
           src="/images/benoit-dubos.jpg"
        alt="Benoit Dubos"
        width="40"
        height="40"
        className="w-10 h-10 rounded-full border-2 border-[#FF0000]/30 object-cover"
        loading="lazy"
              />
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-[#FF0000] rounded-full border-2 border-white dark:border-black" />
            </div>
            <span className={cn("text-sm font-semibold", isDark ? "text-white" : "text-black")}>
              Benoit Dubos
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
));

YouTubeVideoCard.displayName = 'YouTubeVideoCard';

const LinkedInVideoCard = memo(({ isDark }: { isDark: boolean }) => (
  <div className="mb-4 break-inside-avoid animate-fade-in-up">
    <div className={cn(
      "rounded-3xl p-6 md:p-8 backdrop-blur-md border relative overflow-hidden",
      "transition-all duration-300 hover:scale-[1.02]",
      isDark 
        ? "bg-[#0A66C2]/10 border-[#0A66C2]/30 shadow-lg shadow-[#0A66C2]/10" 
        : "bg-[#0A66C2]/10 border-[#0A66C2]/30 shadow-lg shadow-[#0A66C2]/10"
    )}>
      {/* Halo LinkedIn bleu */}
      <div
        className="pointer-events-none absolute inset-0 z-0 rounded-3xl"
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(10,102,194,0.15) 0%, rgba(10,102,194,0.05) 50%, rgba(0,0,0,0) 100%)`,
          filter: 'blur(20px)'
        }}
      />
      
      <div className="relative z-10">
        <div className="inline-flex px-3 py-1 bg-[#0A66C2]/20 border border-[#0A66C2]/30 rounded-full mb-3">
          <span className="text-[#0A66C2] font-semibold text-xs">📹 Vidéo LinkedIn</span>
        </div>
        <h3 className={cn("text-lg md:text-xl font-bold mb-2", isDark ? "text-white" : "text-black")}>
          Jean Bonnenfant parle de Wladimir Delcros et son expertise Growth
        </h3>
        <p className={cn("text-sm mb-4 leading-relaxed", isDark ? "text-white/70" : "text-black/70")}>
          Jean Bonnenfant partage son retour d'expérience sur l'expertise de Wladimir en automatisation et Growth Marketing.
        </p>
        
        {/* Video Player */}
        <div className="mb-4 rounded-2xl overflow-hidden">
          {/* Lazy video */}
          {(() => {
            const LazyVideo = require('../../../optimization/LazyVideo').default;
            return (
              <LazyVideo
            src="/webinar-growthhacking-linkedin-linkedintips-linkedin-wladimir-delcros.mp4#t=0.1"
            className="w-full aspect-video object-cover"
            preload="none"
            poster="/open.png"
            onVisiblePlay={false}
              />
            );
          })()}
        </div>
        
        {/* Publié par */}
        <div className="flex items-center gap-3 pl-1">
          <span className={cn("text-xs font-medium", isDark ? "text-white/60" : "text-black/60")}>
            Publié par :
          </span>
          <div className="flex items-center gap-2">
            <div className="relative">
              <img 
           src="/images/jean-bonnenfant.jpg"
        alt="Jean Bonnenfant"
        width="40"
        height="40"
        className="w-10 h-10 rounded-full border-2 border-[#0A66C2]/30 object-cover"
        loading="lazy"
              />
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-[#0A66C2] rounded-full border-2 border-white dark:border-black" />
            </div>
            <span className={cn("text-sm font-semibold", isDark ? "text-white" : "text-black")}>
              Jean Bonnenfant
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
));

LinkedInVideoCard.displayName = 'LinkedInVideoCard';

const LaGrowthMachineVideoCard = memo(({ isDark }: { isDark: boolean }) => (
  <div className="mb-4 break-inside-avoid animate-fade-in-up">
    <div className={cn(
      "rounded-3xl p-6 md:p-8 backdrop-blur-md border relative overflow-hidden",
      "transition-all duration-300 hover:scale-[1.02]",
      isDark 
        ? "bg-purple-600/10 border-purple-500/30 shadow-lg shadow-purple-500/10" 
        : "bg-purple-600/10 border-purple-500/30 shadow-lg shadow-purple-500/10"
    )}>
      {/* Halo violet La Growth Machine */}
      <div
        className="pointer-events-none absolute inset-0 z-0 rounded-3xl"
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(147,51,234,0.15) 0%, rgba(147,51,234,0.05) 50%, rgba(0,0,0,0) 100%)`,
          filter: 'blur(20px)'
        }}
      />
      
      <div className="relative z-10">
        <div className="inline-flex px-3 py-1 bg-purple-600/20 border border-purple-500/30 rounded-full mb-3">
          <span className="text-purple-600 dark:text-purple-400 font-semibold text-xs">🎬 Interview exclusive</span>
        </div>
        <h3 className={cn("text-lg md:text-xl font-bold mb-2", isDark ? "text-white" : "text-black")}>
          Brice Maurin (CEO La Growth Machine) parle de Wladimir Delcros
        </h3>
        <p className={cn("text-sm mb-4 leading-relaxed", isDark ? "text-white/70" : "text-black/70")}>
          Le CEO de La Growth Machine partage son retour d'expérience sur l'expertise de Wladimir en automatisation et Growth.
        </p>
        
        {/* Video Player */}
        <div className="mb-4 rounded-2xl overflow-hidden">
          {(() => {
            const LazyVideo = require('../../../optimization/LazyVideo').default;
            return (
              <LazyVideo
            src="/lagrowthmachine-wladimir-delcros.mp4#t=20"
            className="w-full aspect-video object-cover"
            preload="none"
            poster="/open.png"
            onVisiblePlay={false}
              />
            );
          })()}
        </div>
        
        {/* Présenté par */}
        <div className="flex items-center gap-3 pl-1">
          <span className={cn("text-xs font-medium", isDark ? "text-white/60" : "text-black/60")}>
            Présenté par :
          </span>
          <div className="flex items-center gap-2">
            <div className="relative">
              <img 
                src="/hero/brice-maurin.webp"
                alt="Brice Maurin"
                className="w-10 h-10 rounded-full border-2 border-purple-500/30 object-cover"
              />
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-purple-600 rounded-full border-2 border-white dark:border-black" />
            </div>
            <span className={cn("text-sm font-semibold", isDark ? "text-white" : "text-black")}>
              Brice Maurin
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
));

LaGrowthMachineVideoCard.displayName = 'LaGrowthMachineVideoCard';

function TestimonialClient({ testimonials }: TestimonialClientProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [displayCount, setDisplayCount] = useState(40);
  const [numColumns, setNumColumns] = useState(1);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);

  const ratings = testimonials.map(t => t.reviewGivenStar).filter((v) => typeof v === 'number');
  const reviewCount = ratings.length;
  const average = reviewCount > 0 ? ratings.reduce((a, b) => a + b, 0) / reviewCount : 0;

  const testimonialSchema: Record<string, any> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Uclic",
    "review": testimonials.map(testimonial => ({
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": testimonial.reviewGivenStar,
        "bestRating": "5"
      },
      "author": {
        "@type": "Person",
        "name": testimonial.title
      },
      "reviewBody": testimonial.review
    }))
  };

  if (reviewCount > 0) {
    testimonialSchema.aggregateRating = {
      "@type": "AggregateRating",
      "ratingValue": Number(average.toFixed(2)),
      "reviewCount": reviewCount,
      "bestRating": 5
    };
  }

  // Build three distinct rows by rotating the base array
  const rotate = <T,>(arr: T[], offset: number): T[] => {
    if (arr.length === 0) return arr;
    const k = ((offset % arr.length) + arr.length) % arr.length;
    return arr.slice(k).concat(arr.slice(0, k));
  };
  const len = testimonials.length;
  const row1 = testimonials.slice(0, displayCount);
  const hasMore = displayCount < testimonials.length;
  
  const loadMore = () => {
    setDisplayCount((prev) => Math.min(prev + 20, testimonials.length));
  };

  // Build mixed items (testimonials + video cards) in a single sequence
  type MixedItem = 
    | { type: 'testimonial'; data: Testimonial }
    | { type: 'video'; data: 'lagrowth' | 'linkedin' | 'spotify' | 'youtube' };

  const mixedItems: MixedItem[] = useMemo(() => {
    const items: MixedItem[] = [];
    const insertAfter: Record<number, MixedItem> = {
      4: { type: 'video', data: 'lagrowth' },
      11: { type: 'video', data: 'linkedin' },
      21: { type: 'video', data: 'spotify' },
      31: { type: 'video', data: 'youtube' }
    };
    for (let i = 0; i < row1.length; i++) {
      items.push({ type: 'testimonial', data: row1[i] });
      if (insertAfter[i]) items.push(insertAfter[i]);
    }
    return items;
  }, [row1]);

  // Determine number of columns based on viewport width
  useEffect(() => {
    const computeColumns = () => {
      const width = window.innerWidth;
      if (width >= 1280) return 5;
      if (width >= 1024) return 4;
      if (width >= 768) return 3;
      if (width >= 640) return 2;
      return 1;
    };
    const handleResize = () => setNumColumns(computeColumns());
    setNumColumns(computeColumns());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Masonry grid row span calculation using ResizeObserver
  useEffect(() => {
    const rowHeight = 8; // Must match CSS grid-auto-rows
    const gap = 12; // Must match CSS gap
    const updateSpan = (el: HTMLDivElement) => {
      const content = el.querySelector('[data-masonry-content]') as HTMLElement | null;
      const target = content ?? el;
      const height = target.getBoundingClientRect().height;
      const span = Math.ceil((height + gap) / (rowHeight + gap));
      el.style.gridRowEnd = `span ${span}`;
    };

    const ro = new ResizeObserver(() => {
      itemRefs.current.forEach((el) => el && updateSpan(el));
    });
    itemRefs.current.forEach((el) => el && ro.observe(el));
    window.addEventListener('load', () => {
      itemRefs.current.forEach((el) => el && updateSpan(el));
    });
    const onResize = () => {
      itemRefs.current.forEach((el) => el && updateSpan(el));
    };
    window.addEventListener('resize', onResize);
    // Initial calc
    setTimeout(() => itemRefs.current.forEach((el) => el && updateSpan(el)), 0);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', onResize);
    };
  }, [mixedItems]);

  return (
    <section 
      id="testimonials" 
      className={cn(
        "w-full relative z-[10] overflow-hidden pt-20 pb-20 md:pt-20 md:pb-20 px-4 sm:px-6 border-b border-black/5 dark:border-white/10",
        isDark ? "bg-black" : "bg-white"
      )}
      aria-label="Témoignages clients"
    >
      {/* Dotted background pattern (same as Hero), scrolls with content */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${require('@/lib/assets').backgroundEffectUrl})`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px',
          opacity: isDark ? 0.12 : 0.04
        }}
      />
      {/* Halo gradient overlay (same as Hero) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 right-0 h-[45vh] z-[1]"
        style={{
          background: isDark
            ? `radial-gradient(ellipse at center 20%, rgba(212,237,49,0.20) 0%, rgba(212,237,49,0.12) 15%, rgba(212,237,49,0.06) 35%, rgba(0,0,0,0.1) 55%, rgba(0,0,0,0) 75%)`
            : `radial-gradient(ellipse at center 20%, rgba(212,237,49,0.25) 0%, rgba(212,237,49,0.15) 18%, rgba(212,237,49,0.08) 38%, rgba(255,255,255,0.1) 58%, rgba(255,255,255,0) 78%)`,
          filter: 'blur(20px)'
        }}
      />

      <Script id="testimonial-schema" type="application/ld+json">
        {JSON.stringify(testimonialSchema)}
      </Script>

      <div className="max-w-[1250px] mx-auto px-4 sm:px-6 relative z-10">

        <TestimonialHeader isDark={isDark} average={average} reviewCount={reviewCount} />
        
        {/* Marquee container - full width outside the main container */}
      </div>
      
      {/* True Masonry section without visual columns; videos wider */}
      <div className="w-full overflow-visible relative px-4 sm:px-6 marquee-wrapper">
        <div ref={gridRef} className="masonry-grid">
          {mixedItems.map((item, i) => (
            <div
              key={`masonry-item-${i}`}
              ref={(el) => { itemRefs.current[i] = el; }}
              className={cn(
                "masonry-item",
                item.type === 'video' && "masonry-item-wide"
              )}
            >
              <div data-masonry-content>
                {item.type === 'testimonial' ? (
                  <TestimonialCard 
                    testimonial={item.data}
                    isDark={isDark}
                    index={i}
                    isMasonry={true}
                  />
                ) : item.data === 'lagrowth' ? (
                  <LaGrowthMachineVideoCard isDark={isDark} />
                ) : item.data === 'linkedin' ? (
                  <LinkedInVideoCard isDark={isDark} />
                ) : item.data === 'spotify' ? (
                  <SpotifyEpisodeCard isDark={isDark} />
                ) : (
                  <YouTubeVideoCard isDark={isDark} />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Load more CTA */}
      {hasMore && (
        <div className="max-w-[1250px] mx-auto px-4 sm:px-6 pt-8 md:pt-12 relative z-10">
          <div className="text-center">
            <CTAButton 
              onClick={loadMore}
              className={cn(
                "group",
                isDark 
                  ? "!bg-[#E0FF5C] !text-black hover:!bg-[#E0FF5C]/90 [&_span]:!border-black [&_svg]:!stroke-black"
                  : "!bg-black !text-white hover:!bg-[#E0FF5C] hover:!text-black [&_span]:!border-white hover:[&_span]:!border-black [&_svg]:!stroke-white hover:[&_svg]:!stroke-black"
              )}
            >
              Voir plus de témoignages (+{testimonials.length - displayCount})
            </CTAButton>
          </div>
        </div>
      )}
    </section>
  );
}

export default memo(TestimonialClient); 