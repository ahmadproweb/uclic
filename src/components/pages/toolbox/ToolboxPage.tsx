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

interface ToolboxPost {
  id: string;
  title: string;
  slug: string;
  date: string;
  productHuntFields: {
    tagline: string;
    logo: string;
  };
}

interface ToolboxCardProps {
  post: ToolboxPost;
  index: number;
}

function ToolboxCard({ post, index }: ToolboxCardProps) {
  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === "dark";

  return (
    <Link
      href={`/toolbox/${post.slug}`}
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
          backgroundImage: "url('https://framerusercontent.com/images/g0QcWrxr87K0ufOxIUFBakwYA8.png')",
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
        {post.productHuntFields?.logo ? (
          <Image
            src={post.productHuntFields.logo}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={index < 3}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#E0FF5C] to-[#B8D44A]">
            <span className="text-4xl font-bold text-black/80">
              {post.title
                .split(" ")
                .map((word) => word[0])
                .join("")
                .slice(0, 3)
                .toUpperCase()}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
        <span className="absolute bottom-4 left-4 inline-block px-3 py-1 bg-black text-[#E0FF5C] rounded-full text-sm z-20">
          Outil
        </span>
      </div>

      <div className="p-6 space-y-3 relative z-10">
        <h3 className={cn("text-xl font-semibold", isDark ? "text-white" : "text-black")}>
          {post.title}
        </h3>
        
        <p className={cn(
          "line-clamp-2",
          isDark ? "text-white/80" : "text-black/80"
        )}>
          {post.productHuntFields?.tagline}
        </p>

        <div className={cn("flex items-center gap-2 text-sm", isDark ? "text-white/70" : "text-black/70") }>
          <div className={cn("w-6 h-6 rounded-full flex items-center justify-center", isDark ? "bg-white/10" : "bg-black/10") }>
            <i className="ri-tools-line text-sm" aria-hidden="true" style={{ color: isDark ? theme.colors.primary.main : undefined }} />
          </div>
          {formatDate(post.date)}
        </div>
      </div>
    </Link>
  );
}

export default function ToolboxPage({
  posts: toolboxPosts,
  initialPage = 1,
}: {
  posts: ToolboxPost[];
  initialPage?: number;
}) {
  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === "dark";
  const router = useRouter();
  const pathname = usePathname();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [displayedPosts, setDisplayedPosts] = useState<ToolboxPost[]>([]);
  const postsPerPage = 21;
  const totalPages = Math.ceil(toolboxPosts.length / postsPerPage);

  useEffect(() => {
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    setDisplayedPosts(toolboxPosts.slice(startIndex, endIndex));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage, toolboxPosts]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (page === 1) {
      router.push("/toolbox", { scroll: false });
    } else {
      router.push(`/toolbox/page/${page}`, { scroll: false });
    }
  };

  if (!toolboxPosts || toolboxPosts.length === 0) {
    return (
      <div className="text-center py-20 text-black">Aucun outil trouvé.</div>
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
              backgroundImage: "url('https://framerusercontent.com/images/g0QcWrxr87K0ufOxIUFBakwYA8.png')",
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
            Boîte à outils
          </span>
          <h1
            className={cn(
              "text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-normal mb-3 xs:mb-4",
              isDark ? "text-white" : "text-black"
            )}
          >
            Découvrez notre sélection
            <br className="hidden xs:block" /> d&apos;outils pour startups
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
            Des ressources essentielles pour
            <br className="hidden xs:block" /> développer votre entreprise
          </p>
        </div>

        {/* Growth Hacking Tools Section */}
        <div className="mb-16">
          <h2 className={cn(
            "text-2xl md:text-3xl font-bold mb-8 text-center",
            isDark ? "text-white" : "text-black"
          )}>
            Outils Growth Hacking
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {displayedPosts.map((post, index) => (
              <ToolboxCard key={post.id} post={post} index={index} />
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-12 mb-16">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            basePath="/toolbox"
          />
        </div>
      </div>

      <StickyShareButtons
        url={`https://www.uclic.fr${pathname}`}
        title="Boîte à outils startups"
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
