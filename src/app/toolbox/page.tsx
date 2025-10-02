import ToolboxPage from "@/components/pages/toolbox/ToolboxPage";
import Loading from "@/components/ui/Loading";
import { fetchToolboxData } from "@/lib/wordpress";
import { Metadata } from "next";
import { Suspense } from "react";
import Script from "next/script";

export const revalidate = 3600; // Revalidate every hour

export const metadata: Metadata = {
  title: "Toolbox Startups | Outils & Ressources pour Développer votre Entreprise",
  description:
    "Découvrez notre sélection d'outils essentiels pour startups et entrepreneurs. Des ressources gratuites et payantes pour développer votre entreprise, optimiser votre productivité et accélérer votre croissance.",
  keywords: "toolbox startups, outils entrepreneurs, ressources startup, outils productivité, développement entreprise, outils marketing, outils sales, outils ops, uclic, startup tools",
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
    canonical: "https://www.uclic.fr/toolbox",
  },
  openGraph: {
    title: "Toolbox Startups | Outils & Ressources pour Développer votre Entreprise",
    description:
      "Découvrez notre sélection d'outils essentiels pour startups et entrepreneurs. Des ressources gratuites et payantes pour développer votre entreprise, optimiser votre productivité et accélérer votre croissance.",
    url: "https://www.uclic.fr/toolbox",
    type: "website",
    locale: "fr_FR",
    siteName: "UCLIC",
    images: [{
      url: "https://static.uclic.fr/toolbox-og.png",
      width: 1200,
      height: 630,
      alt: "Toolbox Startups UCLIC - Outils & Ressources",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Toolbox Startups | Outils & Ressources pour Développer votre Entreprise",
    description:
      "Découvrez notre sélection d'outils essentiels pour startups et entrepreneurs. Des ressources gratuites et payantes pour développer votre entreprise.",
    site: "@uclic_fr",
    images: ["https://static.uclic.fr/toolbox-og.png"],
  },
};

export default async function Page() {
  const toolboxData = await fetchToolboxData();

  // Map ProductHunt[] to ToolboxPost[]
  const toolboxPosts = toolboxData.nodes.map((tool) => ({
    id: (tool as any).id ?? tool.productHuntFields.id,
    title: tool.title,
    slug: tool.slug,
    date: (tool as any).date ?? tool.productHuntFields.day ?? "",
    productHuntFields: {
      tagline: tool.productHuntFields.tagline ?? "",
      logo: tool.productHuntFields.logo ?? "",
    },
  }));

  return (
    <>
      {/* JSON-LD: BreadcrumbList */}
      <Script id="ld-breadcrumb-toolbox" type="application/ld+json">
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
            }
          ]
        })}
      </Script>
      
      {/* JSON-LD: CollectionPage for toolbox */}
      <Script id="ld-collection-toolbox" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Toolbox Startups UCLIC",
          description: "Sélection d'outils essentiels pour startups et entrepreneurs. Des ressources gratuites et payantes pour développer votre entreprise.",
          url: "https://www.uclic.fr/toolbox",
          mainEntity: {
            "@type": "ItemList",
            itemListElement: toolboxPosts.slice(0, 20).map((tool, index) => ({
              "@type": "ListItem",
              position: index + 1,
              url: `https://www.uclic.fr/toolbox/${tool.slug}`,
              name: tool.title
            }))
          },
          isPartOf: {
            "@type": "WebSite",
            name: "UCLIC",
            url: "https://www.uclic.fr"
          },
          about: {
            "@type": "Thing",
            name: "Outils startups",
            description: "Ressources et outils pour entrepreneurs et startups"
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
      
      <Suspense fallback={<Loading />}>
        <ToolboxPage posts={toolboxPosts} initialPage={1} />
      </Suspense>
    </>
  );
}
