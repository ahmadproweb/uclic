import ToolboxPage from "@/components/pages/toolbox/ToolboxPage";
import Loading from "@/components/ui/Loading";
import { fetchToolboxData } from "@/lib/wordpress";
import { Metadata } from "next";
import { Suspense } from "react";
import Script from "next/script";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    page: string;
  };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const currentPage = parseInt(params.page);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.uclic.fr";

  if (isNaN(currentPage) || currentPage < 1) {
    return {
      title: "Page non trouvée | Toolbox UCLIC",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const isFirstPage = currentPage === 1;
  const baseTitle = "Toolbox Startups | Outils & Ressources pour Développer votre Entreprise";
  const pageTitle = isFirstPage ? baseTitle : `${baseTitle} - Page ${currentPage}`;
  const description = isFirstPage 
    ? "Découvrez notre sélection d'outils essentiels pour startups et entrepreneurs. Des ressources gratuites et payantes pour développer votre entreprise, optimiser votre productivité et accélérer votre croissance."
    : `Page ${currentPage} de notre toolbox startups. Découvrez des outils essentiels pour entrepreneurs et startups.`;

  return {
    title: pageTitle,
    description: description,
    keywords: "toolbox startups, outils entrepreneurs, ressources startup, outils productivité, développement entreprise, outils marketing, outils sales, outils ops, uclic, startup tools, page " + currentPage,
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
      canonical: currentPage === 1 ? `${baseUrl}/toolbox` : `${baseUrl}/toolbox/page/${currentPage}`,
    },
    openGraph: {
      title: pageTitle,
      description: description,
      url: currentPage === 1 ? `${baseUrl}/toolbox` : `${baseUrl}/toolbox/page/${currentPage}`,
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
      title: pageTitle,
      description: description,
      site: "@uclic_fr",
      images: ["https://static.uclic.fr/toolbox-og.png"],
    },
  };
}

export const revalidate = 3600;

export default async function Page({ params }: PageProps) {
  const currentPage = parseInt(params.page);
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

  // Calculate total pages
  const postsPerPage = 9;
  const totalPages = Math.ceil(toolboxPosts.length / postsPerPage);

  // Validate page number
  if (isNaN(currentPage) || currentPage < 1 || currentPage > totalPages) {
    notFound();
  }

  return (
    <>
      {/* JSON-LD: BreadcrumbList for pagination */}
      <Script id="ld-breadcrumb-toolbox-pagination" type="application/ld+json">
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
            ...(currentPage > 1 ? [{
              "@type": "ListItem",
              position: 3,
              name: `Page ${currentPage}`,
              item: `https://www.uclic.fr/toolbox/page/${currentPage}`
            }] : [])
          ]
        })}
      </Script>
      
      {/* JSON-LD: CollectionPage for pagination */}
      <Script id="ld-collection-toolbox-pagination" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: currentPage === 1 ? "Toolbox Startups UCLIC" : `Toolbox Startups UCLIC - Page ${currentPage}`,
          description: "Sélection d'outils essentiels pour startups et entrepreneurs. Des ressources gratuites et payantes pour développer votre entreprise.",
          url: `https://www.uclic.fr/toolbox${currentPage > 1 ? `/page/${currentPage}` : ''}`,
          mainEntity: {
            "@type": "ItemList",
            itemListElement: toolboxPosts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage).map((tool, index) => ({
              "@type": "ListItem",
              position: (currentPage - 1) * postsPerPage + index + 1,
              url: `https://www.uclic.fr/toolbox/${tool.slug}`,
              name: tool.title
            }))
          },
          isPartOf: {
            "@type": "WebSite",
            name: "UCLIC",
            url: "https://www.uclic.fr"
          },
          ...(currentPage > 1 && {
            "pagination": {
              "@type": "Pagination",
              "currentPage": currentPage,
              "totalPages": totalPages,
              "hasNextPage": currentPage < totalPages,
              "hasPreviousPage": currentPage > 1,
              "nextPage": currentPage < totalPages ? `https://www.uclic.fr/toolbox/page/${currentPage + 1}` : undefined,
              "previousPage": currentPage > 1 ? `https://www.uclic.fr/toolbox/page/${currentPage - 1}` : undefined
            }
          })
        })}
      </Script>
      
      <Suspense fallback={<Loading />}>
        <ToolboxPage posts={toolboxPosts} initialPage={currentPage} />
      </Suspense>
    </>
  );
}
