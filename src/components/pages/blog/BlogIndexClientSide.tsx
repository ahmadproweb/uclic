"use client";

import Pagination from "@/components/ui/Pagination";
import ScrollToTop from "@/components/ui/ScrollToTop";
import StickyShareButtons from "@/components/ui/StickyShareButtons";
import { colors as theme } from "@/config/theme";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { cleanHtmlEntities } from "@/utils/string";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { memo, useCallback, useEffect, useMemo, useState } from "react";

// Chargement dynamique des composants non-essentiels
const PreFooter = dynamic(() => import("@/components/footer/PreFooter"), {
  ssr: false,
  loading: () => (
    <div className="h-[300px] animate-pulse bg-gray-100 dark:bg-gray-800 rounded-lg" />
  ),
});

// Define the blog post interface
export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  author_link?: string;
  featured_image_url: string;
  reading_time: string;
  tags?: string[];
  category?: string;
}

// Fonction pour capitaliser la première lettre
const capitalizeTitle = (title: string) => {
  if (!title) return "";
  return title.charAt(0).toUpperCase() + title.slice(1);
};

// Remove HTML tags to render deterministic text excerpts (avoids hydration diffs)
const stripHtmlTags = (html: string) => html.replace(/<[^>]*>/g, "").trim();

// Séparer le BlogCard en composant mémoïsé
const BlogCard = memo(
  ({ post }: { post: BlogPost }) => {
    const { theme: currentTheme } = useTheme();
    const isDark = currentTheme === "dark";
    const cleanExcerpt = stripHtmlTags(post.excerpt || "");
    return (
      <Link
        href={`/blog/${post.slug}`}
        className="group rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1 border backdrop-blur-md relative"
        style={{
          background: isDark ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.4)",
          borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
          boxShadow: "none",
        }}
      >
        {/* Hover halo effect */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: isDark
              ? `radial-gradient(ellipse at center, rgba(212,237,49,0.08) 0%, rgba(212,237,49,0.04) 40%, transparent 70%)`
              : `radial-gradient(ellipse at center, rgba(212,237,49,0.12) 0%, rgba(212,237,49,0.06) 40%, transparent 70%)`,
            filter: 'blur(12px)',
          }}
        />
        {/* Featured Image */}
        <div className="relative w-full h-48 overflow-hidden">
          <img
            src={`${post.featured_image_url.replace(/\.(jpg|jpeg|png|gif)$/,'-400x250.$1')}.webp`}
            alt={cleanHtmlEntities(capitalizeTitle(post.title))}
            className="object-cover transition-transform duration-500 group-hover:scale-105 w-full h-full"
            onError={(e) => {
              const target = e.currentTarget as HTMLImageElement;
              const originalUrl = post.featured_image_url;
              const jpgFallback = originalUrl.replace(/\.(jpg|jpeg|png|gif)$/,'-400x250.$1');
              if (target.src !== jpgFallback) {
                target.src = jpgFallback;
              }
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
          <span className="absolute bottom-4 left-4 inline-block px-3 py-1 bg-black text-[#E0FF5C] rounded-full text-sm z-20">
            {post.category || "Blog"}
          </span>
        </div>

        <div className="p-6 space-y-3">
          <h3 className={cn("text-xl font-semibold", isDark ? "text-white" : "text-black")}>
            {cleanHtmlEntities(capitalizeTitle(post.title))}
          </h3>

          <div className={cn("flex items-center gap-2 text-sm", isDark ? "text-white/70" : "text-black/70") }>
            <div className={cn("w-6 h-6 rounded-full flex items-center justify-center", isDark ? "bg-white/10" : "bg-black/10") }>
              <i className="ri-time-line text-sm" aria-hidden="true" style={{ color: isDark ? theme.colors.primary.main : undefined }} />
            </div>
            {post.reading_time} min de lecture
          </div>
        </div>
      </Link>
    );
  },
  (prevProps, nextProps) => prevProps.post.id === nextProps.post.id
);

BlogCard.displayName = "BlogCard";

// Séparer le FeaturedPost en composant mémoïsé
const FeaturedPost = memo(({ post }: { post: BlogPost }) => {
  if (!post) return null;
  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === "dark";

  return (
    <div
      className="relative w-full h-[35vh] xs:h-[40vh] sm:h-[45vh] md:h-[50vh] mb-12 xs:mb-14 sm:mb-16 rounded-2xl xs:rounded-3xl overflow-hidden border backdrop-blur-md group hover:-translate-y-1 transition-all duration-300"
      style={{
        background: isDark ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.4)",
        borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
      }}
    >
      {/* Hover halo effect */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"
        style={{
          background: isDark
            ? `radial-gradient(ellipse at center, rgba(212,237,49,0.08) 0%, rgba(212,237,49,0.04) 40%, transparent 70%)`
            : `radial-gradient(ellipse at center, rgba(212,237,49,0.12) 0%, rgba(212,237,49,0.06) 40%, transparent 70%)`,
          filter: 'blur(12px)',
        }}
      />
      <img
        src={post.featured_image_url}
              alt={cleanHtmlEntities(capitalizeTitle(post.title))}
        className="object-cover rounded-2xl xs:rounded-3xl w-full h-full"
      />
      {/* Readability overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/60" />
      <div className="absolute inset-0 flex flex-col justify-end p-4 xs:p-6 sm:p-8 md:p-14">
        <div className="max-w-5xl mx-auto w-full">
          <div className="mb-3 xs:mb-4 flex flex-wrap gap-2">
            <span className="inline-block px-2 xs:px-3 py-1 bg-black/80 text-[#E0FF5C] rounded-full text-[11px] xs:text-xs tracking-wide">
              {post.category || "Blog"}
            </span>
            <span className="text-[11px] xs:text-xs uppercase tracking-wider font-semibold inline-block px-2 xs:px-3 py-1 rounded-full bg-[#E0FF5C] text-black">
              À la une
            </span>
          </div>
          <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold max-w-4xl mb-4 text-white leading-tight">
            {cleanHtmlEntities(capitalizeTitle(post.title))}
          </h2>
          <div className="text-white/85 flex flex-wrap items-center text-[12px] xs:text-sm gap-2 xs:gap-4 mt-2">
            <span>{post.author}</span>
            <span className="opacity-70">•</span>
            <div className="flex items-center gap-1">
              <i className="ri-time-line text-sm" aria-hidden="true" style={{ color: '#E0FF5C' }} />
              <span>{post.reading_time} min de lecture</span>
            </div>
            <span className="opacity-70">•</span>
            <span>{new Date(post.date).toLocaleDateString("fr-FR")}</span>
          </div>
          <Link
            href={`/blog/${post.slug}`}
            className="px-4 xs:px-6 py-1.5 xs:py-2 rounded-full text-xs xs:text-sm font-medium mt-4 xs:mt-6 sm:mt-8 inline-block transition-colors
              bg-[#E0FF5C] text-black hover:bg-[#D9FF4B]"
          >
            Lire l&apos;article
          </Link>
        </div>
      </div>
    </div>
  );
});

FeaturedPost.displayName = "FeaturedPost";

export default function BlogIndexClientSide({
  posts: initialPosts,
  initialPage = 1,
  totalPages,
}: {
  posts: BlogPost[];
  initialPage?: number;
  totalPages: number;
}) {
  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === "dark";
  const router = useRouter();

  // États pour la gestion des posts et du chargement
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [displayedPosts, setDisplayedPosts] =
    useState<BlogPost[]>(initialPosts);
  const [isLoading, setIsLoading] = useState(false);

  // Featured post est toujours le premier article de la première page
  const featuredPost = useMemo(
    () =>
      currentPage === 1 && initialPosts.length > 0 ? initialPosts[0] : null,
    [currentPage, initialPosts]
  );

  // Gérer le changement de page
  const handlePageChange = useCallback(
    async (newPage: number) => {
      setIsLoading(true);
      window.scrollTo({ top: 0, behavior: "smooth" });

      try {
        router.push(newPage === 1 ? "/blog" : `/blog/page/${newPage}`);
        setCurrentPage(newPage);
      } catch (error) {
        console.error("Error changing page:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [router]
  );

  // Mettre à jour les posts affichés quand initialPosts change
  useEffect(() => {
    setDisplayedPosts(initialPosts);
  }, [initialPosts]);

  if (!initialPosts?.length) {
    return (
      <div className="text-center py-20 text-black dark:text-white">
        Aucun article trouvé.
      </div>
    );
  }

  return (
    <section
      className={cn(
        "w-full max-w-[100vw] pt-28 md:pt-32 pb-16 md:pb-24 relative overflow-hidden",
        isDark ? "bg-black" : "bg-white"
      )}
    >
      {/* Subtle top halo background */}
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
 
 
      <div className="max-w-[1250px] mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-8 xs:mb-10 sm:mb-12 md:mb-16">
          <span
            className={cn(
              "text-sm xs:text-base mb-3 xs:mb-4 block font-semibold",
              isDark ? "text-[#E0FF5C]" : "text-black"
            )}
          >
            Blog
          </span>
          <h1
            className={cn(
              "text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-normal mb-3 xs:mb-4",
              isDark ? "text-white" : "text-black"
            )}
          >
            Découvrez nos dernières
            <br className="hidden xs:block" /> actualités
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
            Devenez un vrai couteau suisse avec les conseils
            <br className="hidden xs:block" /> des experts Uclic
          </p>
        </div>

        {/* Hero section with featured image */}
        {featuredPost && (
          <div className="relative w-full h-[35vh] xs:h-[40vh] sm:h-[45vh] md:h-[50vh] mb-12 xs:mb-14 sm:mb-16 rounded-2xl xs:rounded-3xl overflow-hidden shadow-xl">
            <img
              src={featuredPost.featured_image_url}
              alt={cleanHtmlEntities(capitalizeTitle(featuredPost.title))}
              className="object-cover rounded-2xl xs:rounded-3xl w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-4 xs:p-6 sm:p-8 md:p-14">
              <div className="max-w-5xl mx-auto w-full">
                <div className="mb-3 xs:mb-4 flex flex-wrap gap-2">
                  <span className="inline-block px-2 xs:px-3 py-1 bg-black text-[#E0FF5C] rounded-full text-xs xs:text-sm">
                    {featuredPost.category || "Blog"}
                  </span>
                  <span className="text-xs xs:text-sm uppercase tracking-wider font-semibold inline-block px-2 xs:px-3 py-1 rounded-full bg-[#E0FF5C] text-black">
                    À la une
                  </span>
                </div>
                <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold max-w-3xl mb-3 xs:mb-4 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
                  {cleanHtmlEntities(capitalizeTitle(featuredPost.title))}
                </h2>
                <div className="text-white/80 flex flex-wrap items-center text-xs xs:text-sm space-x-2 xs:space-x-4 mt-3 xs:mt-4">
                  <span>{featuredPost.author}</span>
                  <span>•</span>
                  <span>{featuredPost.reading_time} min de lecture</span>
                  <span>•</span>
                  <span>
                    {new Date(featuredPost.date).toLocaleDateString("fr-FR")}
                  </span>
                </div>
                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="px-4 xs:px-6 py-1.5 xs:py-2 rounded-full text-xs xs:text-sm font-medium mt-4 xs:mt-6 sm:mt-8 inline-block transition-all
                    bg-[#E0FF5C] text-black hover:bg-[#E0FF5C]/90"
                >
                  Lire l&apos;article
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Blog grid avec état de chargement */}
        <div className="relative">
          {isLoading && (
            <div className="absolute inset-0 bg-black/5 dark:bg-white/5 backdrop-blur-sm z-10 flex items-center justify-center rounded-xl">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#E0FF5C] rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-[#E0FF5C] rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 bg-[#E0FF5C] rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}
          <div
            className={cn(
              "grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 md:mb-16",
              isLoading && "opacity-50"
            )}
          >
            {displayedPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-12 mb-16">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            disabled={isLoading}
          />
        </div>
      </div>

      <StickyShareButtons
        url=""
        title="Blog Uclic - Découvrez nos dernières actualités"
      />

      <div className="max-w-[1250px] mx-auto px-4 relative z-10">
        <PreFooter/>
      </div>
      <ScrollToTop />
    </section>
  );
}


