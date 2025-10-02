import ToolboxSingle from "@/components/pages/toolbox/ToolboxSingle";
import { getToolboxItem } from "@/lib/wordpress";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Script from "next/script";

export default async function ToolPage({
  params,
}: {
  params: { slug: string };
}) {
  try {
    const tool = await getToolboxItem(params.slug);

    if (!tool) {
      console.error(`Tool not found for slug: ${params.slug}`);
      notFound();
    }

    return (
      <>
        {/* JSON-LD: BreadcrumbList for tool */}
        <Script id="ld-breadcrumb-tool" type="application/ld+json">
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
                name: "Toolbox",
                item: "https://www.uclic.fr/toolbox"
              },
              {
                "@type": "ListItem",
                position: 3,
                name: tool.title,
                item: `https://www.uclic.fr/toolbox/${tool.slug}`
              }
            ]
          })}
        </Script>
        
        {/* JSON-LD: SoftwareApplication for tool */}
        <Script id="ld-software-tool" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: tool.title,
            description: tool.productHuntFields?.tagline || `Découvrez ${tool.title} dans notre sélection d'outils pour développer votre activité.`,
            url: `https://www.uclic.fr/toolbox/${tool.slug}`,
            applicationCategory: "BusinessApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "EUR",
              availability: "https://schema.org/InStock"
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
            },
            image: tool.productHuntFields?.logo || tool.productHuntFields?.screenshotUrl || "https://www.uclic.fr/logo.png",
            keywords: tool.productHuntFields?.categories?.split(",").map(c => c.trim()) || [],
            inLanguage: "fr-FR",
            isAccessibleForFree: true
          })}
        </Script>
        
        <ToolboxSingle tool={tool as any} />
      </>
    );
  } catch (error) {
    console.error("Error loading tool:", error);
    throw error; // Let Next.js error boundary handle it
  }
}

// Génération des métadonnées dynamiques
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  try {
    // Ensure params is properly typed and awaited
    const slug = params.slug;
    const tool = await getToolboxItem(slug);

    if (!tool) {
      console.error(
        `Tool not found for slug: ${slug} during metadata generation`
      );
      return {
        title: "Outil non trouvé | Toolbox Uclic",
        description: "Cet outil n'existe pas ou n'est plus disponible.",
      };
    }

    const description =
      tool.productHuntFields?.tagline ||
      `Découvrez ${tool.title} dans notre sélection d'outils pour développer votre activité.`;

    const imageUrl = tool.productHuntFields?.screenshotUrl || 
                     tool.productHuntFields?.logo || 
                     "/logo.png";

    // Generate enhanced keywords
    const enhancedKeywords = [
      tool.title,
      "outil startup",
      "toolbox",
      "productivité",
      "développement entreprise",
      "outil entrepreneur",
      "ressource startup",
      "uclic",
      ...(tool.productHuntFields?.categories?.split(",").map(c => c.trim()) || [])
    ].join(', ');

    return {
      title: `${tool.title} | Toolbox Startups UCLIC`,
      description: description.length > 160 ? description.substring(0, 157) + '...' : description,
      keywords: enhancedKeywords,
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
        canonical: `https://www.uclic.fr/toolbox/${slug}`,
      },
      openGraph: {
        type: "article",
        title: `${tool.title} | Toolbox Startups UCLIC`,
        description,
        url: `https://www.uclic.fr/toolbox/${slug}`,
        siteName: "UCLIC",
        locale: "fr_FR",
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: tool.title,
          },
        ],
        section: "Toolbox",
        tags: tool.productHuntFields?.categories?.split(",").map(c => c.trim()) || [],
      },
      twitter: {
        card: "summary_large_image",
        title: `${tool.title} | Toolbox Startups UCLIC`,
        description,
        images: [imageUrl],
        creator: "@uclic_fr",
        site: "@uclic_fr",
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Erreur | Toolbox Uclic",
      description: "Une erreur est survenue lors du chargement de l'outil.",
    };
  }
}
