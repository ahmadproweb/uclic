"use client";

import PreFooter from "@/components/footer/PreFooter";
import Pagination from "@/components/ui/Pagination";
import ScrollToTop from "@/components/ui/ScrollToTop";
import StickyShareButtons from "@/components/ui/StickyShareButtons";
import { colors as theme } from "@/config/theme";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { BlogPost } from "@/types/blog";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

// Fonction pour décoder les caractères HTML
function decodeHTMLEntities(text: string) {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = text;
  return textarea.value;
}

interface BlogCategoryClientSideProps {
  posts: BlogPost[];
  category: {
    name: string;
    description?: string;
  };
  initialPage?: number;
  totalPages: number;
}

export default function BlogCategoryClientSide({
  posts: blogPosts,
  category,
  initialPage = 1,
  totalPages,
}: BlogCategoryClientSideProps) {
  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === "dark";
  const router = useRouter();

  const featuredPost = blogPosts && blogPosts.length > 0 ? blogPosts[0] : null;

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [isLoading, setIsLoading] = useState(false);

  // Ajout de logs pour le débogage
  console.log("Total posts:", blogPosts.length);
  console.log("Total pages:", totalPages);
  console.log("Current page:", currentPage);

  // Construire l'URL de base pour la pagination
  const baseUrl = `/blog/category/${category.name
    .toLowerCase()
    .replace(/\s+/g, "-")}`;

  // Gérer le changement de page
  const handlePageChange = useCallback(
    async (newPage: number) => {
      setIsLoading(true);
      window.scrollTo({ top: 0, behavior: "smooth" });

      try {
        router.push(newPage === 1 ? baseUrl : `${baseUrl}/page/${newPage}`);
        setCurrentPage(newPage);
      } catch (error) {
        console.error("Error changing page:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [router, baseUrl]
  );

  if (!blogPosts || blogPosts.length === 0) {
    return (
      <div className="text-center py-20">
        Aucun article trouvé dans cette catégorie.
      </div>
    );
  }

  return (
    <section className="w-full max-w-[100vw] pt-28 md:pt-32 pb-16 md:pb-24 relative overflow-hidden">
      {/* Base Background gradient */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: isDark
            ? `linear-gradient(180deg, ${theme.colors.common.black}, #E0FF5C)`
            : `linear-gradient(180deg, ${theme.colors.common.white}, #E0FF5C)`,
        }}
      />

      {/* Grain effect overlay */}
      <div
        className={cn(
          "absolute inset-0 z-0 mix-blend-soft-light",
          isDark ? "opacity-90" : "opacity-50"
        )}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.8'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "100px 100px",
        }}
      />

      {/* Overlay gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 z-[1]"
        style={{
          background: isDark
            ? "linear-gradient(to top, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 1) 40%, rgba(0, 0, 0, 0) 100%)"
            : "linear-gradient(to top, rgb(243, 244, 246) 0%, rgba(243, 244, 246, 1) 40%, rgba(243, 244, 246, 0) 100%)",
          height: "25%",
        }}
      />

      <div className="max-w-[1250px] mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <span
            className={cn(
              "text-base mb-4 block font-semibold",
              isDark ? "text-[#E0FF5C]" : "text-black"
            )}
          >
            Agence {category.name}
          </span>
          <h1
            className={cn(
              "text-3xl md:text-5xl font-normal mb-4",
              isDark ? "text-white" : "text-black"
            )}
          >
            L&apos;actualité {category.name}
            <br />
            de notre agence
          </h1>
          <div
            className={cn(
              "w-12 h-0.5 mx-auto mb-4",
              isDark ? "bg-[#E0FF5C]" : "bg-black"
            )}
          />
          {category.description && (
            <p
              className={cn(
                "text-base md:text-lg",
                isDark ? "text-white/100" : "text-black"
              )}
            >
              {category.description}
            </p>
          )}
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <div className="relative w-full h-[40vh] md:h-[50vh] mb-16 rounded-3xl overflow-hidden shadow-xl">
            <img
              src={featuredPost.featured_image_url}
              alt={featuredPost.title}
              className="object-cover w-full h-full rounded-3xl"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-14">
              <div className="max-w-5xl mx-auto w-full">
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-black text-[#E0FF5C] rounded-full text-sm z-10">
                    {featuredPost.category}
                  </span>
                  <span
                    className={cn(
                      "text-sm uppercase tracking-wider font-semibold inline-block px-3 py-1 rounded-full",
                      isDark
                        ? "bg-[#E0FF5C] text-black"
                        : "bg-black text-[#E0FF5C]"
                    )}
                  >
                    À la une
                  </span>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold max-w-3xl mb-4 text-white">
                  {decodeHTMLEntities(
                    featuredPost.title.rendered || featuredPost.title
                  )}
                </h2>
                <div className="text-white/80 flex flex-wrap items-center text-sm space-x-4 mt-4">
                  <span>{featuredPost.author}</span>
                  <span>•</span>
                  <span>{featuredPost.reading_time} min de lecture</span>
                </div>
                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="px-6 py-2 rounded-full text-sm font-medium mt-8 inline-block bg-[#E0FF5C] text-black"
                >
                  Lire l&apos;article
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Blog grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 md:mb-16">
          {blogPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group rounded-3xl overflow-hidden shadow-lg bg-[#E0FF5C]"
            >
              {/* Image */}
              <div className="relative w-full h-[250px] overflow-hidden">
                <img
                  src={`${post.featured_image_url.replace(
                    /\.(jpg|jpeg|png|gif)$/,
                    "-400x250.$1"
                  )}.webp`}
                  alt={post.title}
                  className="object-cover w-full h-full"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    const originalUrl = post.featured_image_url;
                    const jpgFallback = originalUrl.replace(/\.(jpg|jpeg|png|gif)$/, '-400x250.$1');
                    if (target.src !== jpgFallback) {
                      target.src = jpgFallback;
                    }
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                {post.category && (
                  <span className="absolute bottom-4 left-4 inline-block px-3 py-1 bg-black text-[#E0FF5C] rounded-full text-sm z-10">
                    {post.category}
                  </span>
                )}
              </div>

              <div className="p-6 space-y-4">
                <h3 className="text-xl font-semibold text-black">
                  {decodeHTMLEntities(post.title.rendered || post.title)}
                </h3>

                <div
                  className="text-black line-clamp-2"
                  dangerouslySetInnerHTML={{ __html: post.excerpt }}
                  style={{ color: "rgba(0, 0, 0, 0.9)" }}
                />

                <div className="flex items-center gap-2 text-sm text-black/70">
                  <div className="w-6 h-6 rounded-full bg-black/10 flex items-center justify-center">
                    <i className="ri-time-line text-sm" aria-hidden="true" />
                  </div>
                  {post.reading_time} min de lecture
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination avec support progressif */}
        {totalPages > 1 && (
          <div className="mb-16">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <>
                {console.log("Rendering pagination with:", {
                  totalPages,
                  currentPage,
                  hasNextPage: currentPage < totalPages,
                  hasPrevPage: currentPage > 1,
                  postsCount: blogPosts.length,
                })}
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  basePath={baseUrl}
                />
              </>
            )}
          </div>
        )}
      </div>

      {/* PreFooter Section */}
      <div className="max-w-[1250px] mx-auto px-4 relative z-10">
        <PreFooter noBgGradient />
      </div>

      <ScrollToTop />
      <StickyShareButtons url="" title={`${category.name} | Blog UCLIC`} />
    </section>
  );
}
