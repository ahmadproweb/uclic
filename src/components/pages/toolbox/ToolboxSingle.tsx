"use client";

import PreFooter from "@/components/footer/PreFooter";
import ScrollToTop from "@/components/ui/ScrollToTop";
import StickyShareButtons from "@/components/ui/StickyShareButtons";
import { colors as theme } from "@/config/theme";
import { useTheme } from "@/context/ThemeContext";
import { cn, formatDate } from "@/lib/utils";
import { ProductHunt } from "@/lib/wordpress";
import { ExternalLink, Twitter } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

interface ProductHuntExtended extends ProductHunt {
  content?: {
    rendered: string;
  };
  relatedTools?: ProductHunt[];
  productHuntFields: ProductHunt["productHuntFields"] & {
    ranking?: string;
    productUrl?: string;
    pricingType?: string;
    priceMin?: string;
    priceMax?: string;
    topics?: string;
    categories?: string;
    platforms?: string;
    mediaGallery?: string;
    makersTwitterUrl?: string;
  };
}

interface ToolboxSingleProps {
  tool: ProductHuntExtended;
}

// Metadata generation for SEO
export async function generateMetadata({
  tool,
}: ToolboxSingleProps): Promise<Metadata> {
  return {
    title: `${tool.title} - Toolbox UCLIC`,
    description: tool.productHuntFields?.tagline || "",
    openGraph: {
      title: `${tool.title} - Toolbox UCLIC`,
      description: tool.productHuntFields?.tagline || "",
      images: tool.productHuntFields?.logo ? [tool.productHuntFields.logo] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${tool.title} - Toolbox UCLIC`,
      description: tool.productHuntFields?.tagline || "",
      images: tool.productHuntFields?.logo ? [tool.productHuntFields.logo] : [],
    },
  };
}

// Server Component
export default function ToolboxSingle({ tool }: ToolboxSingleProps) {
  return <DynamicToolboxContent tool={tool} />;
}

// Client Component
function DynamicToolboxContent({ tool }: ToolboxSingleProps) {
  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === "dark";

  const { title, productHuntFields, content } = tool;

  const hasContent = content?.rendered || content;
  const contentToDisplay = React.useMemo(() => {
    if (typeof content === "string") return content;
    if (content?.rendered) return content.rendered;
    return "";
  }, [content]);

  // Schema JSON-LD pour SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": title,
    "description": productHuntFields?.tagline || "",
    "url": `https://uclic.fr/toolbox/${tool.slug}`,
    "image": productHuntFields?.logo || productHuntFields?.screenshotUrl || "",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": productHuntFields?.platforms || "",
    "offers": {
      "@type": "Offer",
      "price": productHuntFields?.priceMin || "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "aggregateRating": productHuntFields?.votesCount ? {
      "@type": "AggregateRating",
      "ratingValue": "4.5",
      "ratingCount": productHuntFields.votesCount
    } : undefined,
    "author": {
      "@type": "Organization",
      "name": "Uclic"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Uclic",
      "url": "https://uclic.fr"
    },
    "datePublished": productHuntFields?.day || new Date().toISOString(),
    "dateModified": new Date().toISOString()
  };

  return (
    <div className={cn("min-h-screen", isDark ? "bg-black" : "bg-white")}>
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

      {/* Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto px-4 sm:px-6 relative z-10 max-w-[1250px] overflow-hidden pt-40 pb-16">
        <div
          className="p-8 md:p-12 relative z-10 rounded-2xl"
          style={{
            boxShadow: isDark
              ? "0 0 0 1px rgba(255,255,255,0.05), 0 8px 32px -4px rgba(0,0,0,0.3)"
              : "0 0 0 1px rgba(0,0,0,0.03), 0 8px 32px -4px rgba(0,0,0,0.1)",
            position: "relative"
          }}
        >
        {/* Navigation row */}
        <div className="flex justify-between items-center mb-10 pt-8">
          {/* Breadcrumb */}
          <nav
            className={cn(
              "flex items-center space-x-2 text-xs",
              isDark ? "text-white" : "text-black"
            )}
          >
            <Link href="/" className="hover:underline">
              Accueil
            </Link>
            <span>/</span>
            <Link href="/toolbox" className="hover:underline">
              Toolbox
            </Link>
          </nav>

          {/* Back button */}
          <Link
            href="/toolbox"
            className={cn(
              "inline-flex items-center text-sm hover:underline transition-all",
              isDark
                ? "text-white hover:text-white/80"
                : "text-black hover:text-black/80"
            )}
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
            Retour à la Toolbox
          </Link>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left Column */}
          <div className="md:col-span-8">
            {/* Header Section */}
            <div className={cn(
              "mb-8 p-8 rounded-2xl backdrop-blur-md border",
              isDark 
                ? "bg-black/40" 
                : "bg-white/40"
            )}
            style={{
              borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"
            }}>
              {/* Logo */}
              {productHuntFields?.logo && (
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-white/50 p-3">
                    <img
                      src={productHuntFields.logo}
                      alt={title}
                      className="w-full h-full object-contain"
                      loading="eager"
                    />
                  </div>
                </div>
              )}

              {/* Title and Tagline */}
              <div className="text-center space-y-4 mb-8">
                <h1
                  className={cn(
                    "text-3xl md:text-5xl font-bold leading-tight",
                    isDark ? "text-white" : "text-black"
                  )}
                >
                  {title}
                </h1>

                {productHuntFields?.tagline && (
                  <p className={cn(
                    "text-xl",
                    isDark ? "text-white/80" : "text-black/80"
                  )}>
                    {productHuntFields.tagline}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center gap-4">
                {productHuntFields?.makerswebsiteUrl && (
                  <a
                    href={productHuntFields.makerswebsiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "inline-flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 hover:-translate-y-1",
                      isDark
                        ? "bg-[#E0FF5C] text-black hover:bg-[#D9FF4B]"
                        : "bg-[#E0FF5C] text-black hover:bg-[#D9FF4B]"
                    )}
                  >
                    <ExternalLink size={20} />
                    Visiter le site
                  </a>
                )}

                {productHuntFields?.makersTwitterUrl && (
                  <a
                    href={productHuntFields.makersTwitterUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "inline-flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 hover:-translate-y-1",
                      isDark
                        ? "bg-white/10 text-white hover:bg-white/20"
                        : "bg-black/10 text-black hover:bg-black/20"
                    )}
                  >
                    <Twitter size={20} />
                    Twitter
                  </a>
                )}
              </div>
            </div>

            {/* Description Section */}
            {hasContent && (
              <div
                className={cn(
                  "mb-8 p-6 rounded-xl transition-all duration-300 border backdrop-blur-md",
                  isDark
                    ? "bg-black/40"
                    : "bg-white/40"
                )}
                style={{
                  borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"
                }}
              >
                  <h2
                    className={cn(
                      "text-2xl font-bold mb-6",
                      isDark ? "text-white" : "text-black"
                    )}
                  >
                    Description
                  </h2>
                <div
                  className={cn(
                    "prose max-w-none",
                    isDark ? "prose-invert" : "",
                    "prose-p:text-base prose-p:leading-relaxed",
                    isDark
                      ? "prose-p:text-white/90"
                      : "prose-p:text-black/90",
                    "prose-headings:text-lg prose-headings:font-semibold prose-headings:mb-4",
                    isDark
                      ? "prose-headings:text-white"
                      : "prose-headings:text-black",
                    "prose-ul:list-disc prose-ul:pl-6 prose-li:mb-2",
                    isDark ? "prose-li:text-white/90" : "prose-li:text-black/90",
                    "prose-strong:font-semibold",
                    isDark
                      ? "prose-strong:text-white"
                      : "prose-strong:text-black",
                    "prose-a:underline prose-a:font-medium hover:prose-a:no-underline",
                    isDark ? "prose-a:text-[#E0FF5C]" : "prose-a:text-black",
                    "prose-code:text-sm prose-code:px-1 prose-code:py-0.5 prose-code:rounded",
                    isDark
                      ? "prose-code:bg-white/10 prose-code:text-white"
                      : "prose-code:bg-black/5 prose-code:text-black",
                    "prose-pre:p-4 prose-pre:rounded-lg",
                    isDark
                      ? "prose-pre:bg-white/10 prose-pre:text-white"
                      : "prose-pre:bg-black/5 prose-pre:text-black"
                  )}
                  dangerouslySetInnerHTML={{ __html: contentToDisplay }}
                />
              </div>
            )}

            {/* Screenshot */}
            {productHuntFields?.screenshotUrl && (
              <figure className="mb-8 relative h-[300px] md:h-[500px] w-full rounded-2xl overflow-hidden">
                <img
                  src={productHuntFields.screenshotUrl}
                  alt={`Capture d'écran de ${title}`}
                  className="object-cover w-full h-full"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
              </figure>
            )}

            {/* Reviews Section */}
            {productHuntFields?.commentaire && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2
                    className={cn(
                      "text-2xl font-bold",
                      isDark ? "text-white" : "text-black"
                    )}
                  >
                    Avis des utilisateurs
                  </h2>
                  {productHuntFields?.productUrl && (
                    <a
                      href={productHuntFields.productUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "inline-flex items-center gap-2 px-4 py-2 text-sm rounded-lg transition-all duration-300 border backdrop-blur-md",
                        isDark
                          ? "bg-black/40 text-white"
                          : "bg-white/40 text-black"
                      )}
                    >
                      <span>Voir sur Product Hunt</span>
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>

                <div className="grid gap-6">
                  {Array.isArray(productHuntFields.commentaire) ? (
                    productHuntFields.commentaire.map((comment, index) => (
                      <div
                        key={index}
                        className={cn(
                        "p-6 rounded-xl transition-all duration-300 border backdrop-blur-md",
                        isDark
                          ? "bg-black/40 hover:bg-black/60"
                          : "bg-black/40 hover:bg-black/60"
                        )}
                      >
                        {comment.content && (
                          <div
                            className={cn(
                              "mb-4 text-base leading-relaxed",
                              isDark ? "text-white/90" : "text-black/90"
                            )}
                          >
                            {comment.content}
                          </div>
                        )}

                        <div className="flex items-center gap-3">
                          {comment.userAvatar && (
                            <div className="w-8 h-8 rounded-full overflow-hidden bg-black/5">
                              <img
                                src={comment.userAvatar}
                                alt={comment.userName || "User avatar"}
                                className="w-full h-full object-cover"
                                loading="lazy"
                              />
                            </div>
                          )}
                          <div>
                            {comment.userName && (
                              <div
                                className={cn(
                                  "font-medium",
                                  isDark ? "text-white" : "text-black"
                                )}
                              >
                                {comment.userName}
                              </div>
                            )}
                            {comment.date && (
                              <div
                                className={cn(
                                  "text-sm",
                                  isDark ? "text-white/70" : "text-black/70"
                                )}
                              >
                                {formatDate(comment.date)}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div
                      className={cn(
                        "p-6 rounded-xl transition-all duration-300 border backdrop-blur-md",
                        isDark
                          ? "bg-black/40"
                          : "bg-white/40 hover:bg-white/60"
                      )}
                    >
                      <div
                        className={cn(
                          "text-base",
                          isDark ? "text-white/90" : "text-black/90"
                        )}
                      >
                        <div
                          dangerouslySetInnerHTML={{
                            __html: productHuntFields.commentaire,
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="md:col-span-4 space-y-8">
            {/* Share Section */}
            <div
              className={cn(
                "border-b pb-8",
                isDark ? "border-white/10" : "border-black/10"
              )}
            >
              <div className="flex justify-between items-center">
                <h3
                  className={cn(
                    "text-lg font-medium",
                    isDark ? "text-white" : "text-black"
                  )}
                >
                  Partager cet outil
                </h3>
                <button
                  onClick={async () => {
                    console.log('Share button clicked');
                    if (navigator.share) {
                      try {
                        await navigator.share({
                          title: title,
                          text: productHuntFields?.tagline || "",
                          url: window.location.href,
                        });
                      } catch (err) {
                        console.log('Error sharing:', err);
                      }
                    } else {
                      // Fallback: copy to clipboard
                      await navigator.clipboard.writeText(window.location.href);
                      alert('Lien copié dans le presse-papiers !');
                    }
                  }}
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                    isDark
                      ? "bg-white/10 hover:bg-white/20 text-white"
                      : "bg-[#E0FF5C]/20 hover:bg-[#E0FF5C]/30 text-black"
                  )}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Info Cards - Now stacked vertically */}
            <div className="space-y-4">
              {/* Product State Card */}
              {productHuntFields?.productState && (
                <div
                  className={cn(
                    "p-6 rounded-xl transition-all duration-300 border backdrop-blur-md",
                    isDark
                      ? "bg-black/40"
                      : "bg-white/40"
                  )}
                >
                  <h3
                    className={cn(
                      "text-lg font-semibold mb-3",
                      isDark ? "text-white" : "text-black"
                    )}
                  >
                    État du produit
                  </h3>
                  <p
                    className={cn(
                      "text-base",
                      isDark ? "text-white/90" : "text-black/90"
                    )}
                  >
                    {productHuntFields.productState}
                  </p>
                </div>
              )}

              {/* Votes Card */}
              {(productHuntFields?.votesCount ||
                productHuntFields?.ranking) && (
                <div
                  className={cn(
                    "p-6 rounded-xl transition-all duration-300 border backdrop-blur-md",
                    isDark
                      ? "bg-black/40"
                      : "bg-white/40"
                  )}
                >
                  <h3
                    className={cn(
                      "text-lg font-semibold mb-3",
                      isDark ? "text-white" : "text-black"
                    )}
                  >
                    Votes sur Product Hunt
                  </h3>
                  <div className="space-y-2">
                    {productHuntFields?.votesCount && (
                      <p
                        className={cn(
                          "text-base",
                          isDark ? "text-white/90" : "text-black/90"
                        )}
                      >
                        <span className="text-2xl font-bold">
                          {productHuntFields.votesCount}
                        </span>{" "}
                        votes
                      </p>
                    )}
                    {productHuntFields?.ranking && (
                      <p
                        className={cn(
                          "text-sm",
                          isDark ? "text-white/70" : "text-black/70"
                        )}
                      >
                        #{productHuntFields.ranking} du jour
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Date Card */}
              {productHuntFields?.day && (
                <div
                  className={cn(
                    "p-6 rounded-xl transition-all duration-300 border backdrop-blur-md",
                    isDark
                      ? "bg-black/40"
                      : "bg-white/40"
                  )}
                >
                  <h3
                    className={cn(
                      "text-lg font-semibold mb-3",
                      isDark ? "text-white" : "text-black"
                    )}
                  >
                    Date de mise en avant
                  </h3>
                  <p
                    className={cn(
                      "text-base",
                      isDark ? "text-white/90" : "text-black/90"
                    )}
                  >
                    {formatDate(productHuntFields.day)}
                  </p>
                </div>
              )}
            </div>

            {/* Additional Info Cards - Now stacked vertically */}
            <div className="space-y-4">
              {/* Pricing Card */}
              {(productHuntFields?.pricingType ||
                productHuntFields?.priceMin ||
                productHuntFields?.priceMax) && (
                <div
                  className={cn(
                    "p-6 rounded-xl transition-all duration-300 border backdrop-blur-md",
                    isDark
                      ? "bg-black/40"
                      : "bg-white/40"
                  )}
                >
                  <h3
                    className={cn(
                      "text-lg font-semibold mb-3",
                      isDark ? "text-white" : "text-black"
                    )}
                  >
                    Prix & Modèle
                  </h3>
                  <div className="space-y-3">
                    {productHuntFields?.pricingType && (
                      <p
                        className={cn(
                          "text-base",
                          isDark ? "text-white/90" : "text-black/90"
                        )}
                      >
                        <span className="font-medium">Type :</span>{" "}
                        {productHuntFields.pricingType}
                      </p>
                    )}
                    {productHuntFields?.priceMin && (
                      <p
                        className={cn(
                          "text-base",
                          isDark ? "text-white/90" : "text-black/90"
                        )}
                      >
                        <span className="font-medium">À partir de :</span>{" "}
                        {productHuntFields.priceMin}$
                      </p>
                    )}
                    {productHuntFields?.priceMax && (
                      <p
                        className={cn(
                          "text-base",
                          isDark ? "text-white/90" : "text-black/90"
                        )}
                      >
                        <span className="font-medium">Jusqu&apos;à :</span>{" "}
                        {productHuntFields.priceMax}$
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Topics & Categories Card */}
              {(productHuntFields?.topics || productHuntFields?.categories) && (
                <div
                  className={cn(
                    "p-6 rounded-xl transition-all duration-300 border backdrop-blur-md",
                    isDark
                      ? "bg-black/40"
                      : "bg-white/40"
                  )}
                >
                  <h3
                    className={cn(
                      "text-lg font-semibold mb-3",
                      isDark ? "text-white" : "text-black"
                    )}
                  >
                    Catégories & Sujets
                  </h3>
                  <div className="space-y-3">
                    {productHuntFields?.topics && (
                      <div className="flex flex-wrap gap-2">
                        {productHuntFields.topics
                          .split(",")
                          .map((topic, index) => (
                            <span
                              key={index}
                              className={cn(
                                "px-3 py-1 text-sm rounded-full",
                                isDark
                                  ? "bg-white/5 text-white"
                                  : "bg-black/5 text-black"
                              )}
                            >
                              {topic.trim()}
                            </span>
                          ))}
                      </div>
                    )}
                    {productHuntFields?.categories && (
                      <div className="flex flex-wrap gap-2">
                        {productHuntFields.categories
                          .split(",")
                          .map((category, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 text-sm rounded-full bg-[#E0FF5C]/20 text-[#E0FF5C]"
                            >
                              {category.trim()}
                            </span>
                          ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Platform Card */}
              {productHuntFields?.platforms &&
                productHuntFields.platforms.trim() && (
                  <div
                    className={cn(
                      "p-6 rounded-xl transition-all duration-300 border backdrop-blur-md",
                      isDark
                        ? "bg-black/40"
                        : "bg-white/40 hover:bg-white/60"
                    )}
                  >
                    <h3
                      className={cn(
                        "text-lg font-semibold mb-3",
                        isDark ? "text-white" : "text-black"
                      )}
                    >
                      Plateformes disponibles
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {productHuntFields.platforms
                        .split(",")
                        .map((platform, index) => (
                          <span
                            key={index}
                            className={cn(
                              "px-3 py-1 text-sm rounded-full",
                              isDark
                                ? "bg-white/5 text-white"
                                : "bg-black/5 text-black"
                            )}
                          >
                            {platform.trim()}
                          </span>
                        ))}
                    </div>
                  </div>
                )}

              {/* Gallery Card */}
              {productHuntFields?.mediaGallery &&
                productHuntFields.mediaGallery.trim() && (
                  <div
                    className={cn(
                      "p-6 rounded-xl transition-all duration-300 border backdrop-blur-md",
                      isDark
                        ? "bg-black/40"
                        : "bg-white/40 hover:bg-white/60"
                    )}
                  >
                    <h3
                      className={cn(
                        "text-lg font-semibold mb-3",
                        isDark ? "text-white" : "text-black"
                      )}
                    >
                      Galerie média
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      {productHuntFields.mediaGallery
                        .split(",")
                        .map((imageUrl, index) => (
                          <div
                            key={index}
                            className="relative aspect-video rounded-lg overflow-hidden"
                          >
                            <img
                              src={imageUrl.trim()}
                              alt={`${title} gallery image ${index + 1}`}
                              className="object-cover w-full h-full"
                              loading="lazy"
                            />
                          </div>
                        ))}
                    </div>
                  </div>
                )}
            </div>

            {/* Makers Section */}
            {(productHuntFields?.makersname ||
              productHuntFields?.makersname1 ||
              productHuntFields?.makersname2) && (
              <div className="space-y-4">
                <h2
                  className={cn(
                    "text-2xl font-bold",
                    isDark ? "text-white" : "text-black"
                  )}
                >
                  Créateurs
                </h2>
                {[
                  {
                    name: productHuntFields.makersname,
                    headline: productHuntFields.makersheadline,
                    twitter: productHuntFields.makerstwitterUsername,
                    website: productHuntFields.makerswebsiteUrl,
                  },
                  {
                    name: productHuntFields.makersname1,
                    headline: productHuntFields.makersheadline1,
                    twitter: productHuntFields.makerstwitterUsername1,
                    website: productHuntFields.makerswebsiteUrl1,
                  },
                  {
                    name: productHuntFields.makersname2,
                    headline: productHuntFields.makersheadline2,
                    twitter: productHuntFields.makerstwitterUsername2,
                    website: productHuntFields.makerswebsiteUrl2,
                  },
                ]
                  .filter((maker) => maker.name)
                  .map((maker, index) => (
                    <div
                      key={index}
                      className={cn(
                        "p-6 rounded-xl transition-all duration-300 border backdrop-blur-md",
                        isDark
                          ? "bg-black/40"
                          : "bg-white/40 hover:bg-white/60"
                      )}
                    >
                      <h3
                        className={cn(
                          "text-lg font-semibold mb-3",
                          isDark ? "text-white" : "text-black"
                        )}
                      >
                        {maker.name}
                      </h3>
                      {maker.headline && (
                        <p
                          className={cn(
                            "mb-4 text-base",
                            isDark ? "text-white/90" : "text-black/90"
                          )}
                        >
                          {maker.headline}
                        </p>
                      )}
                      <div className="flex gap-3">
                        {maker.twitter && (
                          <a
                            href={`https://twitter.com/${maker.twitter}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(
                              "p-2 rounded-lg transition-all duration-300",
                              isDark
                                ? "bg-white/5 hover:bg-white/10 text-white"
                                : "bg-black/5 hover:bg-black/10 text-black"
                            )}
                          >
                            <Twitter size={18} />
                          </a>
                        )}
                        {maker.website && (
                          <a
                            href={maker.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(
                              "p-2 rounded-lg transition-all duration-300",
                              isDark
                                ? "bg-white/5 hover:bg-white/10 text-white"
                                : "bg-black/5 hover:bg-black/10 text-black"
                            )}
                          >
                            <ExternalLink size={18} />
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Boutons de partage et retour en haut */}
      <StickyShareButtons title={title} url={`/toolbox/${tool.slug}`} />
      <ScrollToTop />

      {/* Related Tools Section */}
      {tool.relatedTools && tool.relatedTools.length > 0 && (
        <div className="w-full relative overflow-hidden py-6">
          <div className="max-w-[1250px] mx-auto px-0 relative z-10">
            <div
              className={cn(
                "rounded-2xl p-8 border backdrop-blur-md",
                isDark
                  ? "bg-black/40"
                  : "bg-white/40"
              )}
            >
              <h2
                className={cn(
                  "text-2xl font-bold mb-8",
                  isDark ? "text-white" : "text-black"
                )}
              >
                Autres outils qui pourraient vous intéresser
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tool.relatedTools.map((relatedTool: ProductHunt) => (
                  <Link
                    key={relatedTool.slug}
                    href={`/toolbox/${relatedTool.slug}`}
                    className={cn(
                      "group p-6 rounded-xl transition-all duration-300 border backdrop-blur-md",
                      isDark
                        ? "bg-black/40 border-white/10"
                        : "bg-white/40 border-black/5"
                    )}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      {relatedTool.productHuntFields?.logo && (
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-white/50 p-2 shrink-0">
                          <img
                            src={relatedTool.productHuntFields.logo}
                            alt={relatedTool.title}
                            width={48}
                            height={48}
                            className="w-full h-full object-contain"
                            loading="lazy"
                          />
                        </div>
                      )}
                      <div>
                        <h3
                          className={cn(
                            "font-semibold mb-1 group-hover:text-[#E0FF5C] transition-colors",
                            isDark ? "text-white" : "text-black"
                          )}
                        >
                          {relatedTool.title}
                        </h3>
                        {relatedTool.productHuntFields?.tagline && (
                          <p
                            className={cn(
                              "text-sm line-clamp-2",
                              isDark ? "text-white/70" : "text-black/70"
                            )}
                          >
                            {relatedTool.productHuntFields.tagline}
                          </p>
                        )}
                      </div>
                    </div>
                    {relatedTool.productHuntFields?.categories && (
                      <div className="flex flex-wrap gap-2">
                        {relatedTool.productHuntFields.categories
                          .split(",")
                          .slice(0, 2)
                          .map((category: string, index: number) => (
                            <span
                              key={index}
                              className="px-2 py-1 text-xs rounded-full bg-[#E0FF5C]/20 text-[#E0FF5C]"
                            >
                              {category.trim()}
                            </span>
                          ))}
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      </div>

      {/* PreFooter Section */}
      <div className="relative z-10 w-full overflow-hidden pt-8 pb-16">
        <div className="max-w-[1250px] mx-auto px-4 sm:px-6">
          <PreFooter noBgGradient />
        </div>
      </div>
    </div>
  );
}
