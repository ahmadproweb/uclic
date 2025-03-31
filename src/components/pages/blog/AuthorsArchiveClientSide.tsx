'use client';

import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { colors as theme } from '@/config/theme';
import Image from 'next/image';
import Link from 'next/link';
import { Author } from '@/lib/wordpress';
import PreFooter from '@/components/footer/PreFooter';
import { slugify } from '@/utils/string';

interface AuthorsArchiveClientSideProps {
  authors: Author[];
}

export default function AuthorsArchiveClientSide({ authors }: AuthorsArchiveClientSideProps) {
  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === 'dark';
  const themeColors = theme.colors;

  return (
    <div className={cn(
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

      <div className="mx-auto px-4 sm:px-6 relative z-10 max-w-[1250px]">
        {/* Header */}
        <div className="mb-12">
          <h1 className={cn(
            "text-3xl md:text-4xl lg:text-5xl font-bold mb-4",
            isDark ? "text-white" : "text-black"
          )}>
            Nos auteurs
          </h1>
          <p className={cn(
            "text-lg md:text-xl",
            isDark ? "text-white/80" : "text-black/80"
          )}>
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
                "group p-6 rounded-xl transition-colors duration-200",
                isDark 
                  ? "bg-white/5 hover:bg-white/10" 
                  : "bg-black/5 hover:bg-black/10"
              )}
            >
              <div className="flex items-start gap-4">
                {/* Author Avatar */}
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#E0FF5C]">
                  <Image
                    src={author.avatar_urls?.['96'] || '/images/default-avatar.png'}
                    alt={author.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Author Info */}
                <div className="flex-1">
                  <h2 className={cn(
                    "text-xl font-semibold mb-2 group-hover:text-[#E0FF5C] transition-colors duration-200",
                    isDark ? "text-white" : "text-black"
                  )}>
                    {author.name}
                  </h2>
                  {author.description && (
                    <p className={cn(
                      "text-sm line-clamp-2",
                      isDark ? "text-white/70" : "text-black/70"
                    )}>
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
      <div className="w-full relative overflow-hidden pt-32 pb-8">
        <div className="max-w-[1250px] mx-auto px-4 relative z-10">
          <PreFooter noBgGradient />
        </div>
      </div>
    </div>
  );
} 