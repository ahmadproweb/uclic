"use client";

import Pagination from "@/components/ui/Pagination";
import ScrollToTop from "@/components/ui/ScrollToTop";
import StickyShareButtons from "@/components/ui/StickyShareButtons";
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
  // Extraire les initiales du titre
  const initials = post.title
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();

  return (
    <Link
      href={`/levee-de-fonds/${post.slug}`}
      className="group rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl backdrop-blur-sm"
      style={{
        background: `linear-gradient(145deg, 
          #E0FF5C,
          #E0FF5C
        )`,
        boxShadow: `0 8px 32px -4px rgba(224, 255, 92, 0.25)`,
      }}
    >
      {/* Featured Image or Text Placeholder */}
      <div className="relative h-48 overflow-hidden">
        {post.featuredImage?.node?.sourceUrl ? (
          <Image
            src={post.featuredImage.node.sourceUrl}
            alt={post.featuredImage.node.altText || post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={index < 3}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#E0FF5C] to-[#B8D44A]">
            <span className="text-4xl font-bold text-black/80">{initials}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
        <span className="absolute bottom-4 left-4 inline-block px-3 py-1 bg-black text-[#E0FF5C] rounded-full text-sm z-20">
          Levée de fonds
        </span>
      </div>

      <div className="p-6 space-y-4">
        <h3 className="text-xl font-semibold text-black">{post.title}</h3>

        <div className="flex items-center gap-2 text-sm text-black/70">
          <div className="w-6 h-6 rounded-full bg-black/10 flex items-center justify-center">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
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
        "w-full max-w-[100vw] pt-28 md:pt-32 pb-16 md:pb-24 relative overflow-hidden",
        isDark ? "bg-black" : "bg-white"
      )}
    >
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

      {/* New overlay gradient - light to transparent */}
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
            Levées de fonds
          </span>
          <h1
            className={cn(
              "text-3xl md:text-5xl font-normal mb-4",
              isDark ? "text-white" : "text-black"
            )}
          >
            Découvrez les dernières
            <br />
            levées de fonds
          </h1>
          <div
            className={cn(
              "w-12 h-0.5 mx-auto mb-4",
              isDark ? "bg-[#E0FF5C]" : "bg-black"
            )}
          />
          <p
            className={cn(
              "text-base md:text-lg",
              isDark ? "text-white/100" : "text-black/80"
            )}
          >
            Restez informé des investissements
            <br />
            dans l&apos;écosystème startup
          </p>
        </div>

        {/* Hero section with featured post */}
        {featuredPost && (
          <div className="relative w-full h-[35vh] sm:h-[40vh] md:h-[50vh] lg:h-[60vh] mb-8 sm:mb-12 md:mb-16 rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl">
            <Image
              src={
                featuredPost.featuredImage?.node.sourceUrl ||
                "/images/default-post.jpg"
              }
              alt={
                featuredPost.featuredImage?.node.altText || featuredPost.title
              }
              fill
              className="object-cover rounded-2xl sm:rounded-3xl"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 md:p-8 lg:p-14">
              <div className="max-w-5xl mx-auto w-full">
                <div className="mb-2 sm:mb-4 flex flex-wrap gap-2">
                  <span className="inline-block px-2 sm:px-3 py-1 bg-black text-[#E0FF5C] rounded-full text-xs sm:text-sm">
                    Levée de fonds
                  </span>
                  <span className="text-xs sm:text-sm uppercase tracking-wider font-semibold inline-block px-2 sm:px-3 py-1 rounded-full bg-[#E0FF5C] text-black">
                    À la une
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold max-w-3xl mb-2 sm:mb-4 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
                  {featuredPost.title}
                </h2>
                <div className="text-white/80 flex flex-wrap items-center text-xs sm:text-sm space-x-2 sm:space-x-4 mt-2 sm:mt-4">
                  <span>{formatDate(featuredPost.date)}</span>
                </div>
                <Link
                  href={`/levee-de-fonds/${featuredPost.slug}`}
                  className="px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium mt-4 sm:mt-8 inline-block transition-all
                    bg-[#E0FF5C] text-black hover:bg-[#E0FF5C]/90"
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

      <ScrollToTop />
      <StickyShareButtons
        url={`https://www.uclic.fr${pathname}`}
        title="Levées de fonds"
      />
    </section>
  );
}
