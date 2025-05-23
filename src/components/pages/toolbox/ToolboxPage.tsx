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
  // Extraire les initiales du titre
  const initials = post.title
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();

  return (
    <Link
      href={`/toolbox/${post.slug}`}
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
            <span className="text-4xl font-bold text-black/80">{initials}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
        <span className="absolute bottom-4 left-4 inline-block px-3 py-1 bg-black text-[#E0FF5C] rounded-full text-sm z-20">
          Outil
        </span>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-black mb-2">{post.title}</h3>
        <p className="text-black/70 text-sm mb-4">
          {post.productHuntFields?.tagline}
        </p>
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
            Boîte à outils
          </span>
          <h1
            className={cn(
              "text-3xl md:text-5xl font-normal mb-4",
              isDark ? "text-white" : "text-black"
            )}
          >
            {`Découvrez notre sélection`}
            <br />
            {`d'outils pour startups`}
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
            Des ressources essentielles pour
            <br />
            développer votre entreprise
          </p>
        </div>

        {/* Tools grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 md:mb-16">
          {displayedPosts.map((post, index) => (
            <ToolboxCard key={post.id} post={post} index={index} />
          ))}
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

      <ScrollToTop />
      <StickyShareButtons
        url={`https://uclic.fr${pathname}`}
        title="Boîte à outils startups"
      />
    </section>
  );
}
