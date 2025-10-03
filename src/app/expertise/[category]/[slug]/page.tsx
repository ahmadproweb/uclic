import Blog from "@/components/pages/home/blog/blog";
import CaseStudyWrapper from "@/components/pages/home/casestudy";
import Partners from "@/components/pages/home/partner/partner";
import ExpertisePartners from "./ExpertisePartners";
import Testimonials from "@/components/pages/home/testimonials/testimonials";
import { cn } from "@/lib/utils";
import { getExpertise, getExpertisePostsByCategory } from "@/lib/wordpress";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import ExpertiseBenefits from "./ExpertiseBenefits";
import ExpertiseMarquee from "./ExpertiseMarquee";
import FAQExpertise from "./FAQExpertise";
import HeroExpertise from "./HeroExpertise";
import ProcessExpertise from "./ProcessExpertise";
import Script from "next/script";
import { cleanHtmlEntities } from "@/utils/string";

function formatFr(input?: string) {
  if (!input) return "";
  return input.replace(/\s([;:!?])/g, "\u00A0$1").replace(/ \?/g, "\u00A0?");
}

interface ExpertisePageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

export async function generateMetadata(
  { params }: ExpertisePageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const previousMetadata = await parent;
  const { category, slug } = await params;
  if (!category || !slug) return notFound();

  const expertise = await getExpertise(slug);
  if (!expertise) return notFound();

  const expertiseCategory =
    expertise.expertiseGrowthCategories?.nodes?.[0]?.slug;
  if (expertiseCategory !== category) return notFound();

  // Generate enhanced keywords
  const expertiseKeywords = [
    expertise.title.toLowerCase(),
    "expertise",
    "growth marketing",
    "sales ops",
    "product marketing",
    "agence uclic",
    "stratégies data-driven",
    "optimisation croissance",
    "uclic",
    ...(expertise.expertiseGrowthCategories?.nodes?.[0]?.name ? [expertise.expertiseGrowthCategories.nodes[0].name.toLowerCase()] : [])
  ].join(', ');

  const title = expertise.expertiseFields?.metaTitle || expertise.title;
  const description = expertise.expertiseFields?.metaDescription || expertise.expertiseFields?.subtitle || "Découvrez nos expertises en création de site web, branding, et développement digital.";

  return {
    title: `${title} | Expertises UCLIC`,
    description: description.length > 160 ? description.substring(0, 157) + '...' : description,
    keywords: expertiseKeywords,
    authors: [{ name: "UCLIC" }],
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: `https://www.uclic.fr/expertise/${category}/${slug}`,
    },
    openGraph: {
      title: `${title} | Expertises UCLIC`,
      description: description,
      url: `https://www.uclic.fr/expertise/${category}/${slug}`,
      type: "article",
      locale: "fr_FR",
      siteName: "UCLIC",
      images: [{
        url: "https://static.uclic.fr/open.png",
        width: 1200,
        height: 630,
        alt: `${title} - Expertises UCLIC`,
      }],
      section: "Expertises",
      tags: expertise.expertiseGrowthCategories?.nodes?.map(cat => cat.name) || [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Expertises UCLIC`,
      description: description,
      site: "@uclic_fr",
      images: ["https://static.uclic.fr/open.png"],
    },
  };
}

export default async function ExpertisePage({ params }: ExpertisePageProps) {
  const { category, slug } = await params;
  if (!category || !slug) return notFound();

  const expertise = await getExpertise(slug);
  if (!expertise) return notFound();

  // Debug: Vérifier les données de l'expertise
  console.log("🔍 EXPERTISE DATA DEBUG:");
  console.log("Expertise title:", expertise.title);
  console.log("Expertise fields:", expertise.expertiseFields);
  console.log("Content2 raw:", expertise.expertiseFields?.content2);
  console.log("Content2 type:", typeof expertise.expertiseFields?.content2);
  console.log("Content2 length:", expertise.expertiseFields?.content2?.length || 0);

  const expertiseCategory =
    expertise.expertiseGrowthCategories?.nodes?.[0]?.slug;
  if (expertiseCategory !== category) return notFound();

  // Récupérer les expertises de la même catégorie
  const relatedExpertises = await getExpertisePostsByCategory(category);

  // Transformer les expertises en format pour le marquee
  const marqueeItems = relatedExpertises
    .filter(
      (exp) => exp.slug !== slug && exp.title && exp.expertiseFields?.subtitle
    ) // Exclure l'expertise actuelle et vérifier les champs requis
    .map((exp) => ({
      text: exp.title,
      href: `/expertise/${category}/${exp.slug}`,
      description: exp.expertiseFields.subtitle || exp.title, // Fallback au titre si pas de sous-titre
    }));

  // S'assurer qu'il y a au moins un élément
  if (marqueeItems.length === 0) {
    console.log("No related expertises found for marquee");
    return (
      <main className="flex flex-col">
        <HeroExpertise expertise={expertise} />
        <Partners />
        <ExpertiseBenefits {...expertise.expertiseFields} />
        <section
          className={cn(
            "w-full relative py-8 md:py-16",
            "bg-[#f4f4f0] dark:bg-black/95"
          )}
        >
          <div className="max-w-[1250px] mx-auto px-4">
            <div className="text-center">
              <h2
                className={cn(
                  "text-3xl sm:text-4xl md:text-5xl lg:text-[50px]",
                  "font-medium tracking-[-1px]",
                  "text-black/90 dark:text-white/90",
                  "leading-[1.1]",
                  "mb-8 md:mb-16",
                  "text-balance"
                )}
              >
                {formatFr(expertise.expertiseFields?.h22)}
              </h2>
            </div>
          </div>
          
          {/* Content2 en pleine largeur */}
          <div className="w-full px-4">
                <div className={cn(
                  "w-full rounded-3xl border backdrop-blur-md relative p-6 sm:p-8 bg-transparent",
                  "border-black/5 dark:border-white/10"
                )}>
                  {/* Background pattern */}
                  <div
                    className="absolute inset-0 rounded-3xl -z-10"
                    style={{
                      backgroundImage: `url(${require('@/lib/assets').backgroundEffectUrl})`,
                      backgroundRepeat: "repeat",
                      backgroundSize: "200px",
                      opacity: "0.04"
                    }}
                  />
                  {/* Halo effect */}
                  <div 
                    className="absolute inset-0 opacity-60 hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"
                    style={{
                      background: `radial-gradient(ellipse at top, rgba(212,237,49,0.25) 0%, rgba(212,237,49,0.15) 40%, transparent 70%)`,
                      filter: 'blur(8px)',
                    }}
                  />
                  <article
                    className={cn(
                      "max-w-none wp-content-styles relative z-20",
                      "text-base md:text-lg",
                      "leading-relaxed",
                      "text-black/70 dark:text-white/70",
                      "text-pretty",
                      // Styles Tailwind pour le HTML WordPress
                      "[&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mb-4 [&_h2]:mt-8 [&_h2]:text-black dark:[&_h2]:text-white",
                      "[&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mb-3 [&_h3]:mt-6 [&_h3]:text-black dark:[&_h3]:text-white",
                      "[&_p]:mb-4 [&_p]:leading-relaxed",
                      "[&_ul]:mb-4 [&_ul]:pl-6",
                      "[&_li]:mb-2 [&_li]:list-disc",
                      "[&_strong]:font-semibold",
                      "[&_a]:text-blue-600 dark:[&_a]:text-blue-400 [&_a]:underline [&_a]:hover:text-blue-800 dark:[&_a]:hover:text-blue-300"
                    )}
                    dangerouslySetInnerHTML={{
                      __html: cleanHtmlEntities(expertise.expertiseFields?.content2 || "")
                    }}
                  />
                </div>
          </div>
        </section>
        <ProcessExpertise expertiseFields={expertise.expertiseFields} />
        <CaseStudyWrapper />
        <Testimonials />
        <FAQExpertise expertiseFields={expertise.expertiseFields} />
        <Blog />
      </main>
    );
  }

  return (
    <>
      {/* JSON-LD: BreadcrumbList for expertise */}
      <Script id="ld-breadcrumb-expertise-single" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Accueil",
              item: "https://www.uclic.fr/"
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Expertises",
              item: "https://www.uclic.fr/expertise"
            },
            {
              "@type": "ListItem",
              position: 3,
              name: expertise.expertiseGrowthCategories?.nodes?.[0]?.name || "Expertise",
              item: `https://www.uclic.fr/expertise/${category}`
            },
            {
              "@type": "ListItem",
              position: 4,
              name: expertise.title,
              item: `https://www.uclic.fr/expertise/${category}/${slug}`
            }
          ]
        })}
      </Script>
      
      {/* JSON-LD: Service for expertise */}
      <Script id="ld-service-expertise" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: expertise.title,
          description: expertise.expertiseFields?.metaDescription || expertise.expertiseFields?.subtitle || "Découvrez nos expertises en création de site web, branding, et développement digital.",
          url: `https://www.uclic.fr/expertise/${category}/${slug}`,
          provider: {
            "@type": "Organization",
            name: "UCLIC",
            url: "https://www.uclic.fr",
            logo: {
              "@type": "ImageObject",
              url: "https://www.uclic.fr/logo.png",
              width: 200,
              height: 60
            },
            sameAs: [
              "https://www.linkedin.com/company/uclic-growth-marketing/",
              "https://x.com/delcros_w/"
            ]
          },
          serviceType: expertise.expertiseGrowthCategories?.nodes?.[0]?.name || "Expertise",
          areaServed: "France",
          availableLanguage: "fr",
          offers: {
            "@type": "Offer",
            description: "Service d'expertise professionnel",
            priceCurrency: "EUR"
          }
        })}
      </Script>
      
      {/* JSON-LD: FAQPage for expertise - Dynamic from API */}
      {(expertise.expertiseFields as any)?.faq && (expertise.expertiseFields as any).faq.length > 0 && (
        <Script id="ld-faq-expertise" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: (expertise.expertiseFields as any).faq.map((faq: any, index: number) => ({
              "@type": "Question",
              name: faq.question || `Question ${index + 1}`,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer || ""
              }
            }))
          })}
        </Script>
      )}
      
      {/* JSON-LD: HowTo for expertise process - Dynamic from API */}
      {(expertise.expertiseFields as any)?.process && (expertise.expertiseFields as any).process.length > 0 && (
        <Script id="ld-howto-expertise" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: `Comment optimiser votre ${expertise.title} avec UCLIC`,
            description: expertise.expertiseFields?.metaDescription || `Guide complet pour optimiser votre ${expertise.title} avec les méthodes UCLIC`,
            image: "https://static.uclic.fr/open.png",
            totalTime: (expertise.expertiseFields as any)?.duration || "P30D",
            estimatedCost: {
              "@type": "MonetaryAmount",
              currency: "EUR",
              value: (expertise.expertiseFields as any)?.price || "Contactez-nous pour un devis personnalisé"
            },
            step: (expertise.expertiseFields as any).process.map((step: any, index: number) => ({
              "@type": "HowToStep",
              name: step.title || `Étape ${index + 1}`,
              text: step.description || "",
              image: step.image || "https://static.uclic.fr/open.png"
            })),
            author: {
              "@type": "Organization",
              name: "UCLIC",
              url: "https://www.uclic.fr",
              sameAs: [
                "https://www.linkedin.com/company/uclic-growth-marketing/",
                "https://x.com/delcros_w/"
              ]
            }
          })}
        </Script>
      )}
      
      <main className="flex flex-col">
      <HeroExpertise expertise={expertise} />
      <Partners />
      <ExpertiseBenefits {...expertise.expertiseFields} />
      <ExpertiseMarquee words={marqueeItems} />

      <ExpertisePartners 
        title={formatFr(expertise.expertiseFields?.h22)}
        subtitle={expertise.expertiseFields?.content2 || ""}
      />
      <ProcessExpertise expertiseFields={expertise.expertiseFields} />
      <CaseStudyWrapper />
      <Testimonials />
      <FAQExpertise expertiseFields={expertise.expertiseFields} />
      <Blog />
    </main>
    </>
  );
}
