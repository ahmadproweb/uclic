"use client";

import PreFooter from "@/components/footer/PreFooter";
import ScrollToTop from "@/components/ui/ScrollToTop";
import StickyShareButtons from "@/components/ui/StickyShareButtons";
import { colors as theme } from "@/config/theme";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { formatDate } from "@/services/wordpress";
import Link from "next/link";
import { useMemo, useState } from "react";

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

interface LeveePageClientProps {
  post: LeveePost;
  relatedPosts: LeveePost[];
  latestPosts: LeveePost[];
}

function RelatedLeveeCard({ post }: { post: LeveePost }) {
  return (
    <Link
      href={`/levee-de-fonds/${post.slug}`}
      className="group rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl backdrop-blur-sm"
      style={{
        background: `linear-gradient(145deg, #E0FF5C, #E0FF5C)`,
        boxShadow: `0 8px 32px -4px rgba(224, 255, 92, 0.25)`,
      }}
    >
      <div className="relative w-full h-48 overflow-hidden">
        <img
          src={post.featuredImage?.node.sourceUrl || "/images/default-post.jpg"}
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
        <h3 className="text-xl font-semibold text-black">{post.title}</h3>
        <div className="flex items-center gap-2 text-sm text-black/70">
          {formatDate(post.date)}
        </div>
      </div>
    </Link>
  );
}

function RelatedPosts({ latestPosts = [] }: { latestPosts: LeveePost[] }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === "dark";
  const themeColors = theme.colors;

  // Calculer les articles à afficher dans le slide actuel
  const visiblePosts = useMemo(() => {
    const startIdx = currentSlide * 2;
    return latestPosts.slice(startIdx, startIdx + 2);
  }, [latestPosts, currentSlide]);

  // Fonction pour changer de slide
  const changeSlide = (direction: "next" | "prev") => {
    if (direction === "next") {
      setCurrentSlide(
        currentSlide === Math.ceil(latestPosts.length / 2) - 1
          ? 0
          : currentSlide + 1
      );
    } else {
      setCurrentSlide(
        currentSlide === 0
          ? Math.ceil(latestPosts.length / 2) - 1
          : currentSlide - 1
      );
    }
  };

  return (
    <div className="mb-16">
      <h3
        className="text-xl md:text-2xl font-medium mb-6 transition-colors duration-300"
        style={{
          color: isDark ? themeColors.common.white : themeColors.common.black,
        }}
      >
        Articles récents
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Carte colorée selon la charte graphique */}
        <div
          className={cn(
            "rounded-xl overflow-hidden relative p-8 flex flex-col justify-between h-[320px] transition-colors duration-300",
            isDark
              ? "bg-[#9FB832]/10 border-[#9FB832] border"
              : "bg-[#9FB832]/10 border-[#9FB832] border"
          )}
        >
          <div>
            <div
              className={cn(
                "absolute top-6 right-6 opacity-20 transition-colors duration-300",
                isDark ? "text-[#9FB832]" : "text-[#9FB832]"
              )}
            >
              <svg
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span
              className={cn(
                "inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 transition-colors duration-300",
                isDark ? "bg-[#9FB832] text-white" : "bg-[#9FB832] text-white"
              )}
            >
              Levées de fonds
            </span>
            <h4
              className={cn(
                "text-xl font-bold mb-4 transition-colors duration-300",
                isDark ? "text-white" : "text-black"
              )}
            >
              Découvrez toutes nos levées de fonds
            </h4>
            <p
              className={cn(
                "mb-4 transition-colors duration-300",
                isDark ? "text-white/80" : "text-black/80"
              )}
            >
              Restez informé des investissements dans l&apos;écosystème Web3 et
              des dernières innovations.
            </p>
          </div>
          <Link
            href="/levee-de-fonds"
            className={cn(
              "inline-flex items-center text-sm font-medium hover:underline transition-colors duration-300",
              isDark ? "text-[#9FB832]" : "text-[#9FB832]"
            )}
          >
            <span className="mr-2">Explorer les levées de fonds</span>
            <svg
              className="w-4 h-4"
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
        {/* Slider pour les derniers articles */}
        <div className="col-span-2 relative">
          {/* Articles visibles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            {visiblePosts.map((post) => {
              const imageUrl = post.featuredImage?.node.sourceUrl;
              const optimizedImageUrl = imageUrl
                ? `${imageUrl.replace(/\.(jpg|jpeg|png|gif)$/, "-400x250.$1")}${
                    imageUrl.endsWith(".webp") ? "" : ".webp"
                  }`
                : "/images/default-post.jpg";
              return (
                <Link
                  href={`/levee-de-fonds/${post.slug}`}
                  key={post.id}
                  className="group rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl backdrop-blur-sm"
                  style={{
                    background: `linear-gradient(145deg, #E0FF5C, #E0FF5C)`,
                    boxShadow: `0 8px 32px -4px rgba(224, 255, 92, 0.25)`,
                  }}
                >
                  <div className="relative w-full h-48 overflow-hidden">
                    <img
                      src={optimizedImageUrl}
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
            })}
          </div>
          {/* Navigation buttons */}
          <div className="flex items-center justify-between mt-6">
            {/* Bullets à gauche */}
            <div className="flex gap-1">
              {Array.from({ length: Math.ceil(latestPosts.length / 2) }).map(
                (_, index) => (
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
                )
              )}
            </div>
            {/* Flèches à droite */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => changeSlide("prev")}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 hover:bg-[#9FB832]/10 text-[#9FB832]"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    d="M15 19l-7-7 7-7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                onClick={() => changeSlide("next")}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 hover:bg-[#9FB832]/10 text-[#9FB832]"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    d="M9 5l7 7-7 7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LeveePageClient({
  post,
  relatedPosts,
  latestPosts,
}: LeveePageClientProps) {
  return (
    <>
      {/* Share & Related Posts */}
      <div className="border-t py-6 sm:py-8 mb-12 sm:mb-16 transition-colors duration-300 border-black/10">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium mb-2 text-black">
              Partager cet article
            </h3>
            <div className="flex space-x-3">
              {/* Social share buttons (static for SSR) */}
              <button className="w-10 h-10 rounded-full flex items-center justify-center bg-[#9FB832]/10 text-[#9FB832]">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3V2z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button className="w-10 h-10 rounded-full flex items-center justify-center bg-[#9FB832]/10 text-[#9FB832]">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button className="w-10 h-10 rounded-full flex items-center justify-center bg-[#9FB832]/10 text-[#9FB832]">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 9h4v12H2z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="4"
                    cy="4"
                    r="2"
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
            href="/levee-de-fonds"
            className="inline-flex items-center hover:underline text-black hover:text-[#E0FF5C]"
          >
            <span className="mr-2">Voir toutes les levées de fonds</span>
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
      {/* Articles associés slider */}
      <RelatedPosts latestPosts={latestPosts} />
      {/* Sticky share and scroll to top */}
      <StickyShareButtons
        title={post.title}
        url={`/levee-de-fonds/${post.slug}`}
      />
      <ScrollToTop />
      {/* PreFooter Section */}
      <div className="relative z-10 w-full overflow-hidden pt-32 pb-8">
        <div className="max-w-[1250px] mx-auto px-4">
          <PreFooter noBgGradient />
        </div>
      </div>
    </>
  );
}
