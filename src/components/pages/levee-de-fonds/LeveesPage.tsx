"use client";

import Pagination from "@/components/ui/Pagination";
import ScrollToTop from "@/components/ui/ScrollToTop";
import StickyShareButtons from "@/components/ui/StickyShareButtons";
import PreFooter from "@/components/footer/PreFooter";
import { colors as theme } from "@/config/theme";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { formatDate } from "@/services/wordpress";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Define the levee post interface
interface LeveePost {
  id: string;
  title: string;
  slug: string;
  date: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  };
}

interface LeveeCardProps {
  post: LeveePost;
  index: number;
}

// Internal LeveeCard component for this page
function LeveeCard({ post, index }: LeveeCardProps) {
  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === "dark";

  return (
    <Link
      href={`/levee-de-fonds/${post.slug}`}
      className="group rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1 border backdrop-blur-md relative"
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
          backgroundImage: "url('/backgroundeffect.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "200px",
          opacity: isDark ? "0.4" : "0.04"
        }}
      />
      
      {/* Hover halo effect */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: isDark
            ? `linear-gradient(to right, rgba(212,237,49,0.08) 0%, rgba(212,237,49,0.08) 60%, rgba(212,237,49,0) 100%)`
            : `linear-gradient(to right, rgba(212,237,49,0.10) 0%, rgba(212,237,49,0.10) 60%, rgba(212,237,49,0) 100%)`,
          filter: 'blur(20px)',
        }}
      />
      {/* Featured Image */}
      <div className="relative w-full h-48 overflow-hidden">
        <Image
          src={post.featuredImage?.node?.sourceUrl || "/images/default-post.jpg"}
          alt={post.featuredImage?.node?.altText || post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={index < 3}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
        <span className="absolute bottom-4 left-4 inline-block px-3 py-1 bg-black text-[#E0FF5C] rounded-full text-sm z-20">
          Levée de fonds
        </span>
      </div>

      <div className="p-6 space-y-3 relative z-10">
        <h3 className={cn("text-xl font-semibold", isDark ? "text-white" : "text-black")}>
          {post.title}
        </h3>

        <div className={cn("flex items-center gap-2 text-sm", isDark ? "text-white/70" : "text-black/70") }>
          <div className={cn("w-6 h-6 rounded-full flex items-center justify-center", isDark ? "bg-white/10" : "bg-black/10") }>
            <i className="ri-time-line text-sm" aria-hidden="true" style={{ color: isDark ? theme.colors.primary.main : undefined }} />
          </div>
          {formatDate(post.date)}
        </div>
      </div>
    </Link>
  );
}

export default function LeveesPage({
  posts: leveePosts,
  initialPage = 1,
}: {
  posts: LeveePost[];
  initialPage?: number;
}) {
  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === "dark";
  const router = useRouter();
  const pathname = usePathname();

  // Get featured post (first post)
  const featuredPost =
    leveePosts && leveePosts.length > 0 ? leveePosts[0] : null;

  // Pagination state
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [displayedPosts, setDisplayedPosts] = useState<LeveePost[]>([]);
  const postsPerPage = 9;
  const totalPages = Math.ceil((leveePosts.length - 1) / postsPerPage);

  useEffect(() => {
    const startIndex = 1 + (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    setDisplayedPosts(leveePosts.slice(startIndex, endIndex));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage, leveePosts]);

  const initialPosts = leveePosts.slice(1, 1 + postsPerPage);
  const postsToRender =
    displayedPosts.length > 0 ? displayedPosts : initialPosts;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (page === 1) {
      router.push("/levee-de-fonds", { scroll: false });
    } else {
      router.push(`/levee-de-fonds/page/${page}`, { scroll: false });
    }
  };

  if (!leveePosts || leveePosts.length === 0) {
    return (
      <div className="text-center py-20 text-black">
        Aucune levée de fonds trouvée.
      </div>
    );
  }

  return (
    <section
      className={cn(
        "w-full relative overflow-hidden pt-32 pb-16 md:pb-24 px-4 sm:px-6",
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

      <div
        className={cn(
          "max-w-[1250px] mx-auto px-4 sm:px-6 py-8 md:py-12 relative z-10 rounded-2xl border",
          isDark ? "border-white/10" : "border-black/5"
        )}
      >
        {/* Background pattern */}
        <div className="absolute inset-0 rounded-2xl -z-10">
          <div
            className="absolute inset-0 rounded-2xl"
            style={{
              backgroundImage: "url('/backgroundeffect.png')",
              backgroundRepeat: "repeat",
              backgroundSize: "200px",
              opacity: isDark ? "0.25" : "0.04"
            }}
          />
        </div>
        {/* Header */}
        <div className="text-center mb-8 xs:mb-10 sm:mb-12 md:mb-16">
          <span
            className={cn(
              "text-sm xs:text-base mb-3 xs:mb-4 block font-semibold",
              isDark ? "text-[#E0FF5C]" : "text-black"
            )}
          >
            Levées de fonds
          </span>
          <h1
            className={cn(
              "text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-normal mb-3 xs:mb-4",
              isDark ? "text-white" : "text-black"
            )}
          >
            Découvrez les dernières
            <br className="hidden xs:block" /> levées de fonds
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
            Restez informé des investissements
            <br className="hidden xs:block" /> dans l&apos;écosystème startup
          </p>
        </div>

        {/* Hero section with featured post */}
        {featuredPost && (
          <div className="relative w-full h-[35vh] xs:h-[40vh] sm:h-[45vh] md:h-[50vh] mb-12 xs:mb-14 sm:mb-16 rounded-2xl xs:rounded-3xl overflow-hidden shadow-xl">
            <Image
              src={
                featuredPost.featuredImage?.node.sourceUrl ||
                "/images/default-post.jpg"
              }
              alt={
                featuredPost.featuredImage?.node.altText || featuredPost.title
              }
              fill
              className="object-cover rounded-2xl xs:rounded-3xl"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/60" />
            <div className="absolute inset-0 flex flex-col justify-end p-4 xs:p-6 sm:p-8 md:p-14">
              <div className="max-w-5xl mx-auto w-full">
                <div className="mb-3 xs:mb-4 flex flex-wrap gap-2">
                  <span className="inline-block px-2 xs:px-3 py-1 bg-black/80 text-[#E0FF5C] rounded-full text-[11px] xs:text-xs tracking-wide">
                    Levée de fonds
                  </span>
                  <span className="text-[11px] xs:text-xs uppercase tracking-wider font-semibold inline-block px-2 xs:px-3 py-1 rounded-full bg-[#E0FF5C] text-black">
                    À la une
                  </span>
                </div>
                <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold max-w-4xl mb-4 text-white leading-tight">
                  {featuredPost.title}
                </h2>
                <div className="text-white/85 flex flex-wrap items-center text-[12px] xs:text-sm gap-2 xs:gap-4 mt-2">
                  <span>{formatDate(featuredPost.date)}</span>
                </div>
                <Link
                  href={`/levee-de-fonds/${featuredPost.slug}`}
                  className="px-4 xs:px-6 py-1.5 xs:py-2 rounded-full text-xs xs:text-sm font-medium mt-4 xs:mt-6 sm:mt-8 inline-block transition-colors
                    bg-[#E0FF5C] text-black hover:bg-[#D9FF4B]"
                >
                  Lire l&apos;article
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Levees grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 md:mb-16">
          {postsToRender.map((post, index) => (
            <LeveeCard key={post.id} post={post} index={index} />
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-12 mb-16">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            basePath="/levee-de-fonds"
          />
        </div>
      </div>

      <StickyShareButtons
        url={`https://www.uclic.fr${pathname}`}
        title="Levées de fonds"
      />

      <div className="relative z-10 w-full overflow-hidden mt-10 md:mt-16 pt-8 pb-16 md:pt-12 md:pb-24 px-4 sm:px-6">
        <div className="max-w-[1250px] mx-auto">
          <PreFooter />
        </div>
      </div>
      <ScrollToTop />
    </section>
  );
}
