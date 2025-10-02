import LeveesPage from "@/components/pages/levee-de-fonds/LeveesPage";
import Loading from "@/components/ui/Loading";
import { getAllLevees } from "@/lib/wordpress";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Script from "next/script";

interface Props {
  params: {
    page: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const pageNumber = parseInt(params.page, 10);

  if (isNaN(pageNumber) || pageNumber < 1) {
    return {
      title: "Page non trouvée | Levées de fonds UCLIC",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const isFirstPage = pageNumber === 1;
  const baseTitle = "Levées de fonds startups françaises | Actualités investissements UCLIC";
  const pageTitle = isFirstPage ? baseTitle : `${baseTitle} - Page ${pageNumber}`;
  const description = isFirstPage 
    ? "Découvrez les dernières levées de fonds des startups françaises. Restez informé des investissements dans l'écosystème startup français. Actualités, analyses et tendances."
    : `Page ${pageNumber} des levées de fonds startups françaises. Découvrez les dernières actualités sur les investissements dans l'écosystème startup.`;

  return {
    title: pageTitle,
    description: description,
    keywords: "levée de fonds, startup, investissement, financement, france, écosystème startup, actualités, uclic, venture capital, fundraising, page " + pageNumber,
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
      canonical: `https://www.uclic.fr/levee-de-fonds${pageNumber > 1 ? `/page/${pageNumber}` : ''}`,
    },
    openGraph: {
      title: pageTitle,
      description: description,
      url: `https://www.uclic.fr/levee-de-fonds${pageNumber > 1 ? `/page/${pageNumber}` : ''}`,
      type: "website",
      locale: "fr_FR",
      siteName: "UCLIC",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: description,
      site: "@uclic_fr",
    },
  };
}

export default async function Page({ params }: Props) {
  const pageNumber = parseInt(params.page, 10);
  const levees = await getAllLevees();

  // Calculate total pages
  const postsPerPage = 9;
  const totalPages = Math.ceil(levees.length / postsPerPage);

  // Validate page number
  if (isNaN(pageNumber) || pageNumber < 1 || pageNumber > totalPages) {
    notFound();
  }

  return (
    <>
      {/* JSON-LD: BreadcrumbList for pagination */}
      <Script id="ld-breadcrumb-levees-pagination" type="application/ld+json">
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
              name: "Levées de fonds",
              item: "https://www.uclic.fr/levee-de-fonds"
            },
            ...(pageNumber > 1 ? [{
              "@type": "ListItem",
              position: 3,
              name: `Page ${pageNumber}`,
              item: `https://www.uclic.fr/levee-de-fonds/page/${pageNumber}`
            }] : [])
          ]
        })}
      </Script>
      
      {/* JSON-LD: CollectionPage for pagination */}
      <Script id="ld-collection-levees-pagination" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: pageNumber === 1 ? "Levées de fonds startups françaises" : `Levées de fonds startups françaises - Page ${pageNumber}`,
          description: "Découvrez les dernières levées de fonds des startups françaises. Actualités, analyses et tendances de l'écosystème startup.",
          url: `https://www.uclic.fr/levee-de-fonds${pageNumber > 1 ? `/page/${pageNumber}` : ''}`,
          mainEntity: {
            "@type": "ItemList",
            itemListElement: levees.slice((pageNumber - 1) * postsPerPage, pageNumber * postsPerPage).map((post: any, index: number) => ({
              "@type": "ListItem",
              position: (pageNumber - 1) * postsPerPage + index + 1,
              url: `https://www.uclic.fr/levee-de-fonds/${post.slug}`,
              name: post.title
            }))
          },
          isPartOf: {
            "@type": "WebSite",
            name: "UCLIC",
            url: "https://www.uclic.fr"
          },
          ...(pageNumber > 1 && {
            "pagination": {
              "@type": "Pagination",
              "currentPage": pageNumber,
              "totalPages": totalPages,
              "hasNextPage": pageNumber < totalPages,
              "hasPreviousPage": pageNumber > 1,
              "nextPage": pageNumber < totalPages ? `https://www.uclic.fr/levee-de-fonds/page/${pageNumber + 1}` : undefined,
              "previousPage": pageNumber > 1 ? `https://www.uclic.fr/levee-de-fonds/page/${pageNumber - 1}` : undefined
            }
          })
        })}
      </Script>
      
      <Suspense fallback={<Loading />}>
        <LeveesPage posts={levees} initialPage={pageNumber} />
      </Suspense>
    </>
  );
}
