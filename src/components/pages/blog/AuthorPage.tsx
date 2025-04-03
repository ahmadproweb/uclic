'use client';

import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { colors as theme } from '@/config/theme';
import Link from 'next/link';
import { Author } from '@/lib/wordpress';
import { formatDate, estimateReadingTime } from '@/services/wordpress';
import PreFooter from '@/components/footer/PreFooter';
import ScrollToTop from '@/components/ui/ScrollToTop';
import StickyShareButtons from '@/components/ui/StickyShareButtons';

interface AuthorPageProps {
  author: Author;
}

// Internal BlogCard component for this page
function BlogCard({ post }: { post: any }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl backdrop-blur-sm"
      style={{
        background: `linear-gradient(145deg, #E0FF5C, #E0FF5C)`,
        boxShadow: `0 8px 32px -4px rgba(224, 255, 92, 0.25)`
      }}
    >
      <div className="relative w-full h-48 overflow-hidden">
        <img
          src={`${(post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/images/default-post.jpg').replace(/\.(jpg|jpeg|png|gif)$/, '-400x250.$1')}.webp`}
          alt={post._embedded?.['wp:featuredmedia']?.[0]?.alt_text || post.title.rendered}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
        {post._embedded?.['wp:term']?.[0]?.[0] && (
          <span className="absolute bottom-4 left-4 inline-block px-3 py-1 bg-black text-[#E0FF5C] rounded-full text-sm z-20">
            {post._embedded['wp:term'][0][0].name}
          </span>
        )}
      </div>
      
      <div className="p-6 space-y-4">
        <h3 className="text-xl font-semibold text-black" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
        
        <div 
          className="text-black line-clamp-2"
          dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
          style={{ color: 'rgba(0, 0, 0, 0.9)' }}
        />

        <div className="flex items-center gap-2 text-sm text-black/70">
          <div className="w-6 h-6 rounded-full bg-black/10 flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          {formatDate(post.date)} • {estimateReadingTime(post.content.rendered)} min de lecture
        </div>
      </div>
    </Link>
  );
}

export default function AuthorPage({ author }: AuthorPageProps) {
  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === 'dark';
  const themeColors = theme.colors;

  // Get featured post (first post)
  const featuredPost = author.posts && author.posts.length > 0 ? author.posts[0] : null;
  const remainingPosts = author.posts?.slice(1) || [];

  return (
    <section className={cn(
      "w-full max-w-[100vw] pt-28 md:pt-32 pb-16 md:pb-24 relative overflow-hidden",
      isDark ? "bg-black" : "bg-white"
    )}>
      {/* Base Background gradient */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: isDark 
            ? `linear-gradient(180deg, ${theme.colors.common.black}, #E0FF5C)`
            : `linear-gradient(180deg, ${theme.colors.common.white}, #E0FF5C)`
        }}
      />

      {/* Grain effect overlay */}
      <div 
        className={cn(
          "absolute inset-0 z-0 mix-blend-soft-light",
          isDark ? "opacity-90" : "opacity-50"
        )}
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.7\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'0.8\'/%3E%3C/svg%3E")',
          backgroundRepeat: 'repeat',
          backgroundSize: '100px 100px'
        }}
      />

      {/* New overlay gradient - light to transparent */}
      <div 
        className="absolute bottom-0 left-0 right-0 z-[1]"
        style={{
          background: isDark
            ? 'linear-gradient(to top, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 1) 40%, rgba(0, 0, 0, 0) 100%)'
            : 'linear-gradient(to top, rgb(243, 244, 246) 0%, rgba(243, 244, 246, 1) 40%, rgba(243, 244, 246, 0) 100%)',
          height: '25%'
        }}
      />
      
      <div className="max-w-[1250px] mx-auto px-4 relative z-10">
        {/* Author Profile Section */}
        <div className="text-center mb-12 md:mb-16">
          <div className="flex flex-col items-center justify-center mb-6">
            <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-[#E0FF5C] mb-6">
              <img
                src={author.avatar_urls?.['96'] || '/images/default-avatar.png'}
                alt={author.name}
                className="object-cover w-full h-full"
                loading="eager"
              />
            </div>
            <h1 className={cn(
              "text-3xl md:text-5xl font-normal mb-4",
              isDark ? "text-white" : "text-black"
            )}>
              {author.name}
            </h1>
            <div className={cn(
              "w-12 h-0.5 mx-auto mb-4",
              isDark ? "bg-[#E0FF5C]" : "bg-black"
            )}/>
            {author.description && (
              <p className={cn(
                "text-base md:text-lg max-w-2xl mx-auto",
                isDark ? "text-white/100" : "text-black/80"
              )}>
                {author.description}
              </p>
            )}
            <div className="flex gap-4 mt-6">
              {author.meta?.linkedin && (
                <a 
                  href={author.meta.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "transition-colors duration-200",
                    isDark ? "text-white hover:text-[#E0FF5C]" : "text-black hover:text-[#E0FF5C]"
                  )}
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 9h4v12H2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              )}
              {author.meta?.twitter && (
                <a 
                  href={author.meta.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "transition-colors duration-200",
                    isDark ? "text-white hover:text-[#E0FF5C]" : "text-black hover:text-[#E0FF5C]"
                  )}
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <div className="relative w-full h-[40vh] md:h-[50vh] mb-16 rounded-3xl overflow-hidden shadow-xl">
            <img
              src={featuredPost._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/images/default-post.jpg'}
              alt={featuredPost._embedded?.['wp:featuredmedia']?.[0]?.alt_text || featuredPost.title.rendered}
              className="object-cover w-full h-full rounded-3xl"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-14">
              <div className="max-w-5xl mx-auto w-full">
                <div className="mb-4 flex gap-2">
                  {featuredPost._embedded?.['wp:term']?.[0]?.[0] && (
                    <span className="inline-block px-3 py-1 bg-black text-[#E0FF5C] rounded-full text-sm">
                      {featuredPost._embedded['wp:term'][0][0].name}
                    </span>
                  )}
                  <span className="text-sm uppercase tracking-wider font-semibold inline-block px-3 py-1 rounded-full bg-[#E0FF5C] text-black">
                    Article le plus récent
                  </span>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold max-w-3xl mb-4 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]" dangerouslySetInnerHTML={{ __html: featuredPost.title.rendered }} />
                <div className="text-white/80 flex flex-wrap items-center text-sm space-x-4 mt-4">
                  <span>{formatDate(featuredPost.date)}</span>
                  <span>•</span>
                  <span>{estimateReadingTime(featuredPost.content.rendered)} min de lecture</span>
                </div>
                <Link 
                  href={`/blog/${featuredPost.slug}`}
                  className="px-6 py-2 rounded-full text-sm font-medium mt-8 inline-block transition-all
                    bg-[#E0FF5C] text-black hover:bg-[#E0FF5C]/90"
                >
                  Lire l&apos;article
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Blog Grid */}
        {remainingPosts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 md:mb-16">
            {remainingPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>

      <ScrollToTop />
      <StickyShareButtons />
    </section>
  );
} 