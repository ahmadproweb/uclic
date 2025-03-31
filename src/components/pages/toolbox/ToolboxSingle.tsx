'use client';

import { Metadata } from 'next';
import Image from 'next/image';
import { ProductHunt } from '@/lib/wordpress';
import { formatDate } from '@/lib/utils';
import { ExternalLink, Twitter } from 'lucide-react';
import Link from 'next/link';
import PreFooter from '@/components/footer/PreFooter';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';
import { colors as theme } from '@/config/theme';
import ScrollToTop from '@/components/ui/ScrollToTop';
import StickyShareButtons from '@/components/ui/StickyShareButtons';
import React from 'react';

interface ProductHuntExtended extends ProductHunt {
  content?: {
    rendered: string;
  };
  relatedTools?: ProductHunt[];
  productHuntFields: ProductHunt['productHuntFields'] & {
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
export async function generateMetadata({ tool }: ToolboxSingleProps): Promise<Metadata> {
  return {
    title: `${tool.title} - Toolbox UCLIC`,
    description: tool.productHuntFields?.tagline || '',
    openGraph: {
      title: `${tool.title} - Toolbox UCLIC`,
      description: tool.productHuntFields?.tagline || '',
      images: tool.productHuntFields?.logo ? [tool.productHuntFields.logo] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${tool.title} - Toolbox UCLIC`,
      description: tool.productHuntFields?.tagline || '',
      images: tool.productHuntFields?.logo ? [tool.productHuntFields.logo] : [],
    }
  };
}

// Server Component
export default function ToolboxSingle({ tool }: ToolboxSingleProps) {
  return <DynamicToolboxContent tool={tool} />;
}

// Client Component
function DynamicToolboxContent({ tool }: ToolboxSingleProps) {
  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === 'dark';
  
  const {
    title,
    productHuntFields,
    content,
  } = tool;

  const hasContent = content?.rendered || content;
  const contentToDisplay = React.useMemo(() => {
    if (typeof content === 'string') return content;
    if (content?.rendered) return content.rendered;
    return '';
  }, [content]);

  return (
    <section className="w-full max-w-[100vw] relative overflow-hidden pt-28 md:pt-32">
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

      {/* New overlay gradient - black to transparent */}
      <div 
        className="absolute bottom-0 left-0 right-0 z-[1]"
        style={{
          background: isDark
            ? 'linear-gradient(to top, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 1) 40%, rgba(0, 0, 0, 0) 100%)'
            : 'linear-gradient(to top, rgb(243, 244, 246) 0%, rgba(243, 244, 246, 1) 40%, rgba(243, 244, 246, 0) 100%)',
          height: '25%'
        }}
      />

      <div className={cn(
        "max-w-[1250px] mx-auto px-4 md:px-6 relative z-10 rounded-2xl",
        isDark 
          ? "bg-black/40 backdrop-blur-md border border-white/10 shadow-[0_0_0_1px_rgba(255,255,255,0.05)]" 
          : "bg-white/40 backdrop-blur-md border border-black/5 shadow-[0_0_0_1px_rgba(0,0,0,0.03)]"
      )}>
        {/* Navigation row */}
        <div className="flex justify-between items-center mb-10 pt-8">
          {/* Breadcrumb */}
          <nav className={cn(
            "flex items-center space-x-2 text-xs",
            isDark ? "text-white" : "text-black"
          )}>
            <Link href="/" className="hover:underline">Accueil</Link>
            <span>/</span>
            <Link href="/toolbox" className="hover:underline">Toolbox</Link>
          </nav>

          {/* Back button */}
          <Link 
            href="/toolbox" 
            className={cn(
              "inline-flex items-center text-sm hover:underline transition-all",
              isDark ? "text-white hover:text-white/80" : "text-black hover:text-black/80"
            )}
          >
            <svg className="w-4 h-4 mr-2 transform rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Retour à la Toolbox
          </Link>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left Column */}
          <div className="md:col-span-8">
            {/* Header Card */}
            <div className="rounded-3xl overflow-hidden transition-all duration-300 backdrop-blur-sm p-8 mb-8"
              style={{
                background: `linear-gradient(145deg, 
                  #E0FF5C,
                  #E0FF5C
                )`,
                boxShadow: `0 8px 32px -4px rgba(224, 255, 92, 0.25)`
              }}>
              <div className="space-y-6">
                {/* Logo */}
        {productHuntFields?.logo && (
                  <div className="flex justify-center">
                    <div className="w-24 h-24 rounded-xl overflow-hidden bg-white/50 p-4">
            <Image
              src={productHuntFields.logo}
              alt={title}
                        width={96}
                        height={96}
                        className="w-full h-full object-contain"
                      />
                    </div>
          </div>
        )}
        
                {/* Title and Tagline */}
                <div className="text-center space-y-4">
                  <h1 className={cn(
                    "text-3xl md:text-5xl font-bold leading-tight",
                    "text-black drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)]"
                  )}>
                    {title}
                  </h1>
        
        {productHuntFields?.tagline && (
                    <p className="text-xl text-black/80">
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
                      className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-xl hover:bg-black/90 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
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
                      className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-xl hover:bg-black/90 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                    >
                      <Twitter size={20} />
                      Twitter
                    </a>
                  )}
                </div>
        </div>
      </div>

            {/* Description Section */}
            {hasContent && (
              <div className={cn(
                "mb-8 p-8 rounded-xl transition-all duration-300",
                isDark 
                  ? "bg-white/10 hover:bg-white/15 border border-white/10" 
                  : "bg-white hover:bg-gray-50 border border-black/5 shadow-sm"
              )}>
                <h2 className={cn(
                  "text-2xl font-bold mb-6",
                  isDark ? "text-white" : "text-black"
                )}>Description</h2>
                <div 
                  className={cn(
                    "prose max-w-none",
                    isDark ? "prose-invert" : "",
                    "prose-p:text-base prose-p:leading-relaxed",
                    isDark ? "prose-p:text-white/90" : "prose-p:text-black [&_*]:text-black",
                    "prose-headings:text-lg prose-headings:font-semibold prose-headings:mb-4",
                    isDark ? "prose-headings:text-white" : "prose-headings:text-black",
                    "prose-ul:list-disc prose-ul:pl-6 prose-li:mb-2",
                    isDark ? "prose-li:text-white/90" : "prose-li:text-black",
                    "prose-strong:font-semibold",
                    isDark ? "prose-strong:text-white" : "prose-strong:text-black",
                    "prose-a:underline prose-a:font-medium hover:prose-a:no-underline",
                    isDark ? "prose-a:text-[#E0FF5C]" : "prose-a:text-black",
                    "prose-code:text-sm prose-code:bg-black/5 prose-code:px-1 prose-code:py-0.5 prose-code:rounded",
                    "prose-pre:bg-black/5 prose-pre:p-4 prose-pre:rounded-lg"
                  )}
                  style={!isDark ? { color: 'black' } : undefined}
                  dangerouslySetInnerHTML={{ __html: contentToDisplay }}
                />
              </div>
            )}

            {/* Screenshot */}
      {productHuntFields?.screenshotUrl && (
              <figure className="mb-8 relative h-[300px] md:h-[500px] w-full rounded-2xl overflow-hidden shadow-xl">
            <Image
              src={productHuntFields.screenshotUrl}
              alt={`Capture d'écran de ${title}`}
              fill
              className="object-cover"
            />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
              </figure>
            )}

            {/* Reviews Section */}
            {productHuntFields?.commentaire && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className={cn(
                    "text-2xl font-bold",
                    isDark ? "text-white" : "text-black"
                  )}>Avis des utilisateurs</h2>
                  {productHuntFields?.productUrl && (
                    <a
                      href={productHuntFields.productUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "inline-flex items-center gap-2 px-4 py-2 text-sm rounded-lg transition-all duration-300",
                        isDark 
                          ? "bg-white/5 hover:bg-white/10 text-white" 
                          : "bg-black/5 hover:bg-black/10 text-black"
                      )}
                    >
                      <span>Voir sur Product Hunt</span>
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>

                <div className="grid gap-6">
                  {Array.isArray(productHuntFields.commentaire) 
                    ? productHuntFields.commentaire.map((comment, index) => (
                        <div
                          key={index}
                          className={cn(
                            "p-6 rounded-xl transition-all duration-300",
                            isDark 
                              ? "bg-white/10 hover:bg-white/15 border border-white/10" 
                              : "bg-white hover:bg-gray-50 border border-black/5 shadow-sm"
                          )}
                        >
                          {comment.content && (
                            <div className={cn(
                              "mb-4 text-base leading-relaxed",
                              isDark ? "text-white/90" : "text-black/90"
                            )}>
                              {comment.content}
                            </div>
                          )}
                          
                          <div className="flex items-center gap-3">
                            {comment.userAvatar && (
                              <div className="w-8 h-8 rounded-full overflow-hidden bg-black/5">
                                <Image
                                  src={comment.userAvatar}
                                  alt={comment.userName || "User avatar"}
                                  width={32}
                                  height={32}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            )}
                            <div>
                              {comment.userName && (
                                <div className={cn(
                                  "font-medium",
                                  isDark ? "text-white" : "text-black"
                                )}>
                                  {comment.userName}
                                </div>
                              )}
                              {comment.date && (
                                <div className={cn(
                                  "text-sm",
                                  isDark ? "text-white/70" : "text-black/70"
                                )}>
                                  {formatDate(comment.date)}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    : (
                        <div className={cn(
                          "p-6 rounded-xl transition-all duration-300",
                          isDark 
                            ? "bg-white/10 hover:bg-white/15 border border-white/10" 
                            : "bg-white hover:bg-gray-50 border border-black/5 shadow-sm"
                        )}>
                          <div className={cn(
                            "text-base",
                            isDark ? "text-white/90" : "text-black/90"
                          )}>
                            <div dangerouslySetInnerHTML={{ __html: productHuntFields.commentaire }} />
                          </div>
                        </div>
                      )
                  }
                </div>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="md:col-span-4 space-y-8">
            {/* Share Section */}
            <div className={cn(
              "border-b pb-8",
              isDark ? "border-white/10" : "border-black/10"
            )}>
              <div className="flex justify-between items-center">
                <h3 className={cn(
                  "text-lg font-medium",
                  isDark ? "text-white" : "text-black"
                )}>Partager cet outil</h3>
                <div className="flex space-x-3">
                  <button className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center transition-colors", 
                    isDark 
                      ? "bg-white/10 hover:bg-white/20 text-white" 
                      : "bg-[#E0FF5C]/20 hover:bg-[#E0FF5C]/30 text-black"
                  )}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3V2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <button className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center transition-colors", 
                    isDark 
                      ? "bg-white/10 hover:bg-white/20 text-white" 
                      : "bg-[#E0FF5C]/20 hover:bg-[#E0FF5C]/30 text-black"
                  )}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <button className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center transition-colors", 
                    isDark 
                      ? "bg-white/10 hover:bg-white/20 text-white" 
                      : "bg-[#E0FF5C]/20 hover:bg-[#E0FF5C]/30 text-black"
                  )}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2 9h4v12H2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Info Cards - Now stacked vertically */}
            <div className="space-y-4">
              {/* Product State Card */}
              {productHuntFields?.productState && (
                <div className={cn(
                  "p-6 rounded-xl transition-all duration-300",
                  isDark 
                    ? "bg-white/10 hover:bg-white/15 border border-white/10" 
                    : "bg-white hover:bg-gray-50 border border-black/5 shadow-sm"
                )}>
                  <h3 className={cn(
                    "text-lg font-semibold mb-3",
                    isDark ? "text-white" : "text-black"
                  )}>État du produit</h3>
                  <p className={cn(
                    "text-base",
                    isDark ? "text-white/90" : "text-black/90"
                  )}>{productHuntFields.productState}</p>
                </div>
              )}
              
              {/* Votes Card */}
              {(productHuntFields?.votesCount || productHuntFields?.ranking) && (
                <div className={cn(
                  "p-6 rounded-xl transition-all duration-300",
                  isDark 
                    ? "bg-white/10 hover:bg-white/15 border border-white/10" 
                    : "bg-white hover:bg-gray-50 border border-black/5 shadow-sm"
                )}>
                  <h3 className={cn(
                    "text-lg font-semibold mb-3",
                    isDark ? "text-white" : "text-black"
                  )}>Votes sur Product Hunt</h3>
                  <div className="space-y-2">
                    {productHuntFields?.votesCount && (
                      <p className={cn(
                        "text-base",
                        isDark ? "text-white/90" : "text-black/90"
                      )}>
                        <span className="text-2xl font-bold">{productHuntFields.votesCount}</span> votes
                      </p>
                    )}
                    {productHuntFields?.ranking && (
                      <p className={cn(
                        "text-sm",
                        isDark ? "text-white/70" : "text-black/70"
                      )}>
                        #{productHuntFields.ranking} du jour
                      </p>
                    )}
          </div>
        </div>
      )}

              {/* Date Card */}
              {productHuntFields?.day && (
                <div className={cn(
                  "p-6 rounded-xl transition-all duration-300",
                  isDark 
                    ? "bg-white/10 hover:bg-white/15 border border-white/10" 
                    : "bg-white hover:bg-gray-50 border border-black/5 shadow-sm"
                )}>
                  <h3 className={cn(
                    "text-lg font-semibold mb-3",
                    isDark ? "text-white" : "text-black"
                  )}>Date de mise en avant</h3>
                  <p className={cn(
                    "text-base",
                    isDark ? "text-white/90" : "text-black/90"
                  )}>{formatDate(productHuntFields.day)}</p>
                </div>
              )}
        </div>
        
            {/* Additional Info Cards - Now stacked vertically */}
            <div className="space-y-4">
              {/* Pricing Card */}
              {(productHuntFields?.pricingType || productHuntFields?.priceMin || productHuntFields?.priceMax) && (
                <div className={cn(
                  "p-6 rounded-xl transition-all duration-300",
                  isDark 
                    ? "bg-white/10 hover:bg-white/15 border border-white/10" 
                    : "bg-white hover:bg-gray-50 border border-black/5 shadow-sm"
                )}>
                  <h3 className={cn(
                    "text-lg font-semibold mb-3",
                    isDark ? "text-white" : "text-black"
                  )}>Prix & Modèle</h3>
                  <div className="space-y-3">
                    {productHuntFields?.pricingType && (
                      <p className={cn(
                        "text-base",
                        isDark ? "text-white/90" : "text-black/90"
                      )}>
                        <span className="font-medium">Type :</span> {productHuntFields.pricingType}
                      </p>
                    )}
                    {productHuntFields?.priceMin && (
                      <p className={cn(
                        "text-base",
                        isDark ? "text-white/90" : "text-black/90"
                      )}>
                        <span className="font-medium">À partir de :</span> {productHuntFields.priceMin}$
                      </p>
                    )}
                    {productHuntFields?.priceMax && (
                      <p className={cn(
                        "text-base",
                        isDark ? "text-white/90" : "text-black/90"
                      )}>
                        <span className="font-medium">Jusqu&apos;à :</span> {productHuntFields.priceMax}$
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Topics & Categories Card */}
              {(productHuntFields?.topics || productHuntFields?.categories) && (
                <div className={cn(
                  "p-6 rounded-xl transition-all duration-300",
                  isDark 
                    ? "bg-white/10 hover:bg-white/15 border border-white/10" 
                    : "bg-white hover:bg-gray-50 border border-black/5 shadow-sm"
                )}>
                  <h3 className={cn(
                    "text-lg font-semibold mb-3",
                    isDark ? "text-white" : "text-black"
                  )}>Catégories & Sujets</h3>
                  <div className="space-y-3">
                    {productHuntFields?.topics && (
                      <div className="flex flex-wrap gap-2">
                        {productHuntFields.topics.split(',').map((topic, index) => (
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
                        {productHuntFields.categories.split(',').map((category, index) => (
                          <span
                            key={index}
                            className={cn(
                              "px-3 py-1 text-sm rounded-full",
                              isDark 
                                ? "bg-[#E0FF5C]/20 text-[#E0FF5C]" 
                                : "bg-[#E0FF5C]/20 text-black"
                            )}
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
              {productHuntFields?.platforms && productHuntFields.platforms.trim() && (
                <div className={cn(
                  "p-6 rounded-xl transition-all duration-300",
                  isDark 
                    ? "bg-white/10 hover:bg-white/15 border border-white/10" 
                    : "bg-white hover:bg-gray-50 border border-black/5 shadow-sm"
                )}>
                  <h3 className={cn(
                    "text-lg font-semibold mb-3",
                    isDark ? "text-white" : "text-black"
                  )}>Plateformes disponibles</h3>
                  <div className="flex flex-wrap gap-2">
                    {productHuntFields.platforms.split(',').map((platform, index) => (
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
              {productHuntFields?.mediaGallery && productHuntFields.mediaGallery.trim() && (
                <div className={cn(
                  "p-6 rounded-xl transition-all duration-300",
                  isDark 
                    ? "bg-white/10 hover:bg-white/15 border border-white/10" 
                    : "bg-white hover:bg-gray-50 border border-black/5 shadow-sm"
                )}>
                  <h3 className={cn(
                    "text-lg font-semibold mb-3",
                    isDark ? "text-white" : "text-black"
                  )}>Galerie média</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {productHuntFields.mediaGallery.split(',').map((imageUrl, index) => (
                      <div key={index} className="relative aspect-video rounded-lg overflow-hidden">
                        <Image
                          src={imageUrl.trim()}
                          alt={`${title} gallery image ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
        </div>
                </div>
              )}
      </div>

            {/* Makers Section */}
      {(productHuntFields?.makersname || productHuntFields?.makersname1 || productHuntFields?.makersname2) && (
              <div className="space-y-4">
                <h2 className={cn(
                  "text-2xl font-bold",
                  isDark ? "text-white" : "text-black"
                )}>Créateurs</h2>
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
            ].filter(maker => maker.name).map((maker, index) => (
                  <div key={index} className={cn(
                    "p-6 rounded-xl transition-all duration-300",
                    isDark 
                      ? "bg-white/10 hover:bg-white/15 border border-white/10" 
                      : "bg-white hover:bg-gray-50 border border-black/5 shadow-sm"
                  )}>
                    <h3 className={cn(
                      "text-lg font-semibold mb-3",
                      isDark ? "text-white" : "text-black"
                    )}>{maker.name}</h3>
                    {maker.headline && <p className={cn(
                      "mb-4 text-base",
                      isDark ? "text-white/90" : "text-black/90"
                    )}>{maker.headline}</p>}
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
        <div className="w-full relative overflow-hidden py-12">
          <div className="max-w-[1250px] mx-auto px-0 relative z-10">
            <div className={cn(
              "rounded-2xl p-8",
              isDark 
              ? "bg-black/40 backdrop-blur-md border border-white/10 shadow-[0_0_0_1px_rgba(255,255,255,0.05)]" 
              : "bg-white/40 backdrop-blur-md border border-black/5 shadow-[0_0_0_1px_rgba(0,0,0,0.03)]"
            )}>
              <h2 className={cn(
                "text-2xl font-bold mb-8",
                isDark ? "text-white" : "text-black"
              )}>
                Autres outils qui pourraient vous intéresser
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tool.relatedTools.map((relatedTool: ProductHunt) => (
                  <Link
                    key={relatedTool.slug}
                    href={`/toolbox/${relatedTool.slug}`}
                    className={cn(
                      "group p-6 rounded-xl transition-all duration-300",
                      isDark 
                      ? "bg-black/40 backdrop-blur-md border border-white/10 shadow-[0_0_0_1px_rgba(255,255,255,0.05)]" 
                      : "bg-white/40 backdrop-blur-md border border-black/5 shadow-[0_0_0_1px_rgba(0,0,0,0.03)]"
                    )}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      {relatedTool.productHuntFields?.logo && (
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-white/50 p-2 shrink-0">
                          <Image
                            src={relatedTool.productHuntFields.logo}
                            alt={relatedTool.title}
                            width={48}
                            height={48}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      )}
                      <div>
                        <h3 className={cn(
                          "font-semibold mb-1 group-hover:text-[#E0FF5C] transition-colors",
                          isDark ? "text-white" : "text-black"
                        )}>{relatedTool.title}</h3>
                        {relatedTool.productHuntFields?.tagline && (
                          <p className={cn(
                            "text-sm line-clamp-2",
                            isDark ? "text-white/70" : "text-black/70"
                          )}>{relatedTool.productHuntFields.tagline}</p>
                        )}
                      </div>
                    </div>
                    {relatedTool.productHuntFields?.categories && (
                      <div className="flex flex-wrap gap-2">
                        {relatedTool.productHuntFields.categories.split(',').slice(0, 2).map((category: string, index: number) => (
                          <span
                            key={index}
                            className={cn(
                              "px-2 py-1 text-xs rounded-full",
                              isDark 
                                ? "bg-[#E0FF5C]/20 text-[#E0FF5C]" 
                                : "bg-[#E0FF5C]/20 text-black"
                            )}
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

      {/* PreFooter Section */}
      <div className="w-full relative overflow-hidden pt-32 pb-8">
        {/* Gradient transparent vers gris en haut */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            background: isDark 
              ? `linear-gradient(180deg, transparent 0%, ${theme.colors.common.black} 100%)`
              : `linear-gradient(180deg, transparent 0%, #F3F4F6 100%)`,
            height: '50%'
          }}
        />

        {/* Bande grise en bas */}
        <div 
          className="absolute bottom-0 left-0 right-0 z-[1]"
          style={{
            background: isDark
              ? theme.colors.common.black
              : '#F3F4F6',
            height: '50%'
          }}
        />
        
        <div className="max-w-[1250px] mx-auto px-4 relative z-10">
          <PreFooter noBgGradient />
        </div>
      </div>
    </section>
  );
} 