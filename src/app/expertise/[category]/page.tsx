import Blog from "@/components/pages/home/blog/blog";
import CaseStudyWrapper from "@/components/pages/home/casestudy";
import Partners from "@/components/pages/home/partner/partner";
import ExpertisePartners from "./ExpertisePartners";
import Testimonials from "@/components/pages/home/testimonials/testimonials";
import { cn } from "@/lib/utils";
import {
  getExpertiseCategory,
  getExpertisePostsByCategory,
} from "@/lib/wordpress";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import ExpertiseBenefits from "./ExpertiseBenefits";
import ExpertiseMarquee from "./ExpertiseMarquee";
import FAQExpertise from "./FAQExpertise";
import HeroExpertise from "./HeroExpertise";
import ProcessExpertise from "./ProcessExpertise";
import SectionWithBackground from "./SectionWithBackground";
import Script from "next/script";

function formatFr(input: string | undefined): string {
  if (!input) return "";
  return input
    .replace(/\s([;:!?])/g, "\u00A0$1")
    .replace(/ \?/g, "\u00A0?");
}

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export async function generateMetadata(
  props: CategoryPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const params = await props.params;
  const category = params?.category;
  if (!category) return notFound();

  const categoryData = await getExpertiseCategory(category);
  if (!categoryData) return notFound();

  // Generate enhanced keywords
  const categoryKeywords = [
    categoryData.name.toLowerCase(),
    "expertise",
    "growth marketing",
    "sales ops",
    "product marketing",
    "agence uclic",
    "stratégies data-driven",
    "optimisation croissance",
    "uclic"
  ].join(', ');

  return {
    title: categoryData.expertiseFields.metaTitle || `${categoryData.name} | Expertises UCLIC`,
    description: categoryData.expertiseFields.metaDescription || `Découvrez nos expertises en ${categoryData.name}. Services professionnels d'optimisation de croissance et de stratégies data-driven par UCLIC.`,
    keywords: categoryKeywords,
    authors: [{ name: "UCLIC" }],
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: `https://www.uclic.fr/expertise/${category}`,
    },
    openGraph: {
      title: categoryData.expertiseFields.metaTitle || `${categoryData.name} | Expertises UCLIC`,
      description: categoryData.expertiseFields.metaDescription || `Découvrez nos expertises en ${categoryData.name}. Services professionnels d'optimisation de croissance et de stratégies data-driven par UCLIC.`,
      url: `https://www.uclic.fr/expertise/${category}`,
      type: "website",
      locale: "fr_FR",
      siteName: "UCLIC",
      images: [{
        url: "https://static.uclic.fr/open.png",
        width: 1200,
        height: 630,
        alt: `${categoryData.name} - Expertises UCLIC`,
      }],
    },
    twitter: {
      card: "summary_large_image",
      title: categoryData.expertiseFields.metaTitle || `${categoryData.name} | Expertises UCLIC`,
      description: categoryData.expertiseFields.metaDescription || `Découvrez nos expertises en ${categoryData.name}. Services professionnels d'optimisation de croissance par UCLIC.`,
      site: "@uclic_fr",
      images: ["https://static.uclic.fr/open.png"],
    },
  };
}

export default async function CategoryPage(props: CategoryPageProps) {
  const params = await props.params;
  const category = params?.category;
  console.log("🔍 Category slug:", category);

  if (!category) {
    console.error("❌ No category slug provided");
    return notFound();
  }

  try {
    const [categoryData, posts] = await Promise.all([
      getExpertiseCategory(category),
      getExpertisePostsByCategory(category),
    ]);

    console.log("📦 Category data:", categoryData);
    console.log("📦 Posts:", posts);

    if (!categoryData) {
      console.error("❌ No category data found");
      return notFound();
    }

    if (!posts || posts.length === 0) {
      console.error("❌ No posts found for category");
      return notFound();
    }

    // Transformer les posts en format pour le marquee
    const marqueeItems = posts.map((post) => ({
      text: post.title,
      href: `/expertise/${category}/${post.slug}`,
      description: post.expertiseFields?.subtitle || post.title,
    }));

    const formattedH22 = formatFr(categoryData.expertiseFields.h22);
    const formattedContent2 = formatFr(categoryData.expertiseFields.content2);

    return (
      <>
        {/* JSON-LD: BreadcrumbList for category */}
        <Script id="ld-breadcrumb-expertise-category" type="application/ld+json">
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
                name: categoryData.name,
                item: `https://www.uclic.fr/expertise/${category}`
              }
            ]
          })}
        </Script>
        
        {/* JSON-LD: CollectionPage for category */}
        <Script id="ld-collection-expertise-category" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: `${categoryData.name} - Expertises UCLIC`,
            description: `Découvrez nos expertises en ${categoryData.name}. Services professionnels d'optimisation de croissance et de stratégies data-driven par UCLIC.`,
            url: `https://www.uclic.fr/expertise/${category}`,
            mainEntity: {
              "@type": "ItemList",
              itemListElement: posts.slice(0, 10).map((post, index) => ({
                "@type": "ListItem",
                position: index + 1,
                url: `https://www.uclic.fr/expertise/${category}/${post.slug}`,
                name: post.title
              }))
            },
            isPartOf: {
              "@type": "WebSite",
              name: "UCLIC",
              url: "https://www.uclic.fr"
            },
            about: {
              "@type": "Thing",
              name: categoryData.name,
              description: `Expertises et services en ${categoryData.name}`
            },
            publisher: {
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
            }
          })}
        </Script>
        
        <main className="flex flex-col">
        <HeroExpertise
          categoryName={categoryData.name}
          expertiseFields={categoryData.expertiseFields}
        />
        <Partners noTopBorder />
        <ExpertiseBenefits {...categoryData.expertiseFields} />
        <ExpertiseMarquee words={marqueeItems} />


        <ExpertisePartners 
          title={categoryData.expertiseFields.h22}
          subtitle={categoryData.expertiseFields.content2}
        />
        <ProcessExpertise expertiseFields={categoryData.expertiseFields} />
        <CaseStudyWrapper />
        <Testimonials />
        <FAQExpertise expertiseFields={categoryData.expertiseFields} />
        <Blog />
      </main>
      </>
    );
  } catch (error) {
    console.error("🚨 Error in CategoryPage:", error);
    return notFound();
  }
}
