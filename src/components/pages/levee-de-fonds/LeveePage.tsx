import { cn } from "@/lib/utils";
import { formatDate } from "@/services/wordpress";
import "@/styles/wordpress-content.css";
import Link from "next/link";
import LeveePageClient from "./LeveePageClient";

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

interface LeveePageProps {
  post: LeveePost;
  relatedPosts: LeveePost[];
  latestPosts: LeveePost[];
}

interface TocItem {
  id: string;
  text: string;
  level: number;
}

function extractTocItems(content: string): TocItem[] {
  // SSR: parse headings from HTML
  if (!content) return [];
  const tempDiv = globalThis?.document ? document.createElement("div") : null;
  if (!tempDiv) {
    // fallback for SSR: use regex
    const matches = Array.from(content.matchAll(/<h2[^>]*>(.*?)<\/h2>/gi));
    return matches.map((m, i) => ({
      id: slugifySSR(m[1]),
      text: m[1].replace(/<[^>]+>/g, ""),
      level: 2,
    }));
  }
  tempDiv.innerHTML = content;
  const headings = tempDiv.querySelectorAll("h2.wp-block-heading");
  const items: TocItem[] = [];
  const usedIds = new Set<string>();
  headings.forEach((heading) => {
    const text = heading.textContent || "";
    const id = slugifySSR(text);
    let counter = 1;
    let uniqueId = id;
    while (usedIds.has(uniqueId)) {
      uniqueId = `${id}-${counter}`;
      counter++;
    }
    usedIds.add(uniqueId);
    items.push({ id: uniqueId, text, level: 2 });
  });
  return items;
}

function slugifySSR(text: string) {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-]/g, "")
    .replace(/\-+/g, "-")
    .replace(/^\-+|\-+$/g, "");
}

export default function LeveePage({
  post,
  relatedPosts,
  latestPosts,
}: LeveePageProps) {
  // SSR: extract ToC
  const tocItems = extractTocItems(post.content);
  // Add IDs to headings in content for SSR ToC
  let processedContent = post.content;
  tocItems.forEach((item) => {
    // Replace <h2>...</h2> with <h2 id="...">...</h2>
    processedContent = processedContent.replace(
      new RegExp(`<h2([^>]*)>(\\s*)${item.text}(\\s*)<\\/h2>`, "i"),
      `<h2$1 id="${item.id}">$2${item.text}$3</h2>`
    );
  });

  return (
    <div className="w-full max-w-[100vw] pt-28 md:pt-32 pb-16 md:pb-24 relative overflow-hidden bg-white dark:bg-black">
      {/* Base Background gradient */}
      <div className="absolute inset-0 z-0 transition-colors duration-300 bg-gradient-to-b from-white to-[#E0FF5C] dark:from-black dark:to-[#E0FF5C]" />
      {/* Grain effect overlay */}
      <div
        className="absolute inset-0 z-0 mix-blend-soft-light opacity-50 dark:opacity-90"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.8'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "100px 100px",
        }}
      />
      {/* New overlay gradient - black to transparent */}
      <div
        className="absolute bottom-0 left-0 right-0 z-[1] transition-colors duration-300 bg-gradient-to-t from-[#F3F4F6] via-[#F3F4F6] to-transparent dark:from-black dark:via-black dark:to-transparent"
        style={{
          height: "25%",
        }}
      />
      <div className="max-w-[1250px] mx-auto px-4 relative z-10">
        {/* Hero section */}
        <div className="mb-6 md:mb-8 lg:mb-12 relative">
          {/* Featured image */}
          <div className="w-full h-[45vh] sm:h-[50vh] md:h-[60vh] relative rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden">
            <img
              src={
                post.featuredImage?.node.sourceUrl || "/images/default-post.jpg"
              }
              alt={post.featuredImage?.node.altText || post.title}
              className="object-cover w-full h-full"
              loading="eager"
            />
            {/* Gradient overlay plus fort en bas pour le texte */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
            {/* Contenu superposé */}
            <div className="absolute inset-0 p-4 sm:p-6 md:p-8 flex flex-col justify-between z-10">
              {/* Navigation row */}
              <div className="flex justify-between items-center">
                {/* Breadcrumb */}
                <nav className="hidden sm:flex items-center space-x-2 text-xs text-white dark:text-[#E0FF5C]">
                  <Link
                    href="/"
                    className="hover:text-white dark:hover:text-[#E0FF5C]"
                  >
                    Accueil
                  </Link>
                  <span>/</span>
                  <Link
                    href="/levee-de-fonds"
                    className="hover:text-white dark:hover:text-[#E0FF5C]"
                  >
                    Levées de fonds
                  </Link>
                </nav>
                {/* Back button */}
                <Link
                  href="/levee-de-fonds"
                  className="inline-flex items-center text-xs sm:text-sm text-white dark:text-[#E0FF5C] hover:text-white dark:hover:text-[#E0FF5C]"
                >
                  <svg
                    className="w-4 h-4 mr-2 transform rotate-180"
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
                  Retour aux levées de fonds
                </Link>
              </div>
              {/* Contenu bas de l'image */}
              <div>
                {/* Title */}
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-white dark:text-white leading-tight">
                  {post.title}
                </h1>
                {/* Category badge et métadonnées */}
                <div>
                  <span
                    className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4 shadow-sm transition-all duration-200 hover:transform hover:scale-105"
                    style={{ backgroundColor: "#E0FF5C", color: "#000" }}
                  >
                    Levée de fonds
                  </span>
                  {/* Article meta */}
                  <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-sm text-white dark:text-[#E0FF5C]">
                    {/* Auteur */}
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
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
                      <span>Uclic</span>
                    </div>
                    {/* Temps de lecture */}
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <span>5 min de lecture</span>
                    </div>
                    {/* Date */}
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M19 4H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2zM16 2v4M8 2v4M3 10h18"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <span>{formatDate(post.date)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Content with sidebar */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 mt-6 sm:mt-8">
          {/* Sidebar ToC (static SSR) */}
          {tocItems.length > 0 && (
            <div className="w-full lg:w-72 shrink-0 order-2 lg:order-1 relative">
              <div className="hidden lg:block">
                <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-black/5 dark:bg-white/5">
                  <h4 className="text-sm sm:text-base font-medium mb-2 sm:mb-3 text-black dark:text-white">
                    Table des matières
                  </h4>
                  <nav className="space-y-1 sm:space-y-1.5 max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-black/10 hover:scrollbar-thumb-black/20 dark:scrollbar-thumb-white/10 dark:hover:scrollbar-thumb-white/20">
                    {tocItems.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className={cn(
                          "block text-sm transition-colors duration-200 cursor-pointer",
                          item.level === 2
                            ? "ml-0"
                            : item.level === 3
                            ? "ml-3"
                            : "ml-6",
                          "text-black/70 hover:text-black dark:text-white/80 dark:hover:text-white"
                        )}
                      >
                        {item.text}
                      </a>
                    ))}
                  </nav>
                </div>
              </div>
            </div>
          )}
          {/* Main content */}
          <div className="wp-content-wrapper flex-1 order-1 lg:order-2 overflow-hidden light dark:dark">
            <div className="wp-content-wrapper overflow-hidden light dark:dark">
              <article
                className="max-w-none wp-content-styles text-black dark:text-white"
                dangerouslySetInnerHTML={{ __html: processedContent }}
              />
            </div>
          </div>
        </div>
        {/* Share & Related Posts, RelatedPosts slider, sticky share, scroll to top, PreFooter: client enhancements */}
        <LeveePageClient
          post={post}
          relatedPosts={relatedPosts}
          latestPosts={latestPosts}
        />
      </div>
    </div>
  );
}
