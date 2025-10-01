"use client";

import PreFooter from "@/components/footer/PreFooter";
import { colors as theme } from "@/config/theme";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { Author } from "@/lib/wordpress";
import { slugify } from "@/utils/string";
import Link from "next/link";

interface AuthorsArchiveClientSideProps {
  authors: Author[];
}

export default function AuthorsArchiveClientSide({
  authors,
}: AuthorsArchiveClientSideProps) {
  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === "dark";
  const themeColors = theme.colors;

  return (
    <div
      className={cn(
        "w-full min-h-screen relative overflow-hidden pt-32 pb-16 md:pb-24 px-4 sm:px-6",
        isDark ? "bg-black" : "bg-white"
      )}
    >
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
              backgroundImage: "url('https://framerusercontent.com/images/g0QcWrxr87K0ufOxIUFBakwYA8.png')",
              backgroundRepeat: "repeat",
              backgroundSize: "200px",
              opacity: isDark ? "0.25" : "0.04"
            }}
          />
        </div>
        {/* Header */}
        <div className="mb-12">
          <h1
            className={cn(
              "text-3xl md:text-4xl lg:text-5xl font-bold mb-4",
              isDark ? "text-white" : "text-black"
            )}
          >
            Nos auteurs
          </h1>
          <p
            className={cn(
              "text-lg md:text-xl",
              isDark ? "text-white/80" : "text-black/80"
            )}
          >
            Découvrez les experts qui partagent leur savoir sur notre blog
          </p>
        </div>

        {/* Authors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {authors.map((author) => (
            <Link
              key={author.id}
              href={`/blog/author/${slugify(author.name)}`}
              className={cn(
                "group p-6 rounded-xl transition-all duration-300 hover:-translate-y-1 border backdrop-blur-md relative",
                isDark
                  ? "bg-transparent border-white/10 hover:bg-white/5"
                  : "bg-transparent border-black/5 hover:bg-black/5"
              )}
            >
              {/* Background pattern */}
              <div
                className="absolute inset-0 rounded-xl -z-10"
                style={{
                  backgroundImage: "url('https://framerusercontent.com/images/g0QcWrxr87K0ufOxIUFBakwYA8.png')",
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
                    ? `radial-gradient(ellipse at center, rgba(212,237,49,0.08) 0%, rgba(212,237,49,0.04) 40%, transparent 70%)`
                    : `radial-gradient(ellipse at center, rgba(212,237,49,0.12) 0%, rgba(212,237,49,0.06) 40%, transparent 70%)`,
                  filter: 'blur(12px)',
                }}
              />
              <div className="flex items-start gap-4 relative z-20">
                {/* Author Avatar */}
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#E0FF5C]">
                  <img
                    src={
                      author.avatar_urls?.["96"] || "/images/default-avatar.png"
                    }
                    alt={author.name}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Author Info */}
                <div className="flex-1">
                  <h2
                    className={cn(
                      "text-xl font-semibold mb-2 group-hover:text-[#E0FF5C] transition-colors duration-200",
                      isDark ? "text-white" : "text-black"
                    )}
                  >
                    {author.name}
                  </h2>
                  {author.description && (
                    <p
                      className={cn(
                        "text-sm line-clamp-2",
                        isDark ? "text-white/70" : "text-black/70"
                      )}
                    >
                      {author.description}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* PreFooter Section */}
      <div className="relative z-10 w-full overflow-hidden pt-16 pb-16">
        <div className="max-w-[1250px] mx-auto px-4 sm:px-6">
          <PreFooter noBgGradient />
        </div>
      </div>
    </div>
  );
}
