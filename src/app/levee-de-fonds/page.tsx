import LeveesPage from "@/components/pages/levee-de-fonds/LeveesPage";
import Loading from "@/components/ui/Loading";
import { getAllLevees } from "@/lib/wordpress";
import { Metadata } from "next";
import { Suspense } from "react";
import Script from "next/script";

export const revalidate = 3600; // Revalidate every hour

export const metadata: Metadata = {
  title: "Levées de fonds startups françaises | Actualités investissements UCLIC",
  description:
    "Découvrez les dernières levées de fonds des startups françaises. Restez informé des investissements dans l'écosystème startup français. Actualités, analyses et tendances.",
  keywords: "levée de fonds, startup, investissement, financement, france, écosystème startup, actualités, uclic, venture capital, fundraising",
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
    canonical: "https://www.uclic.fr/levee-de-fonds",
  },
  openGraph: {
    title: "Levées de fonds startups françaises | Actualités investissements UCLIC",
    description:
      "Découvrez les dernières levées de fonds des startups françaises. Restez informé des investissements dans l'écosystème startup français. Actualités, analyses et tendances.",
    url: "https://www.uclic.fr/levee-de-fonds",
    type: "website",
    locale: "fr_FR",
    siteName: "UCLIC",
  },
  twitter: {
    card: "summary_large_image",
    title: "Levées de fonds startups françaises | Actualités investissements UCLIC",
    description:
      "Découvrez les dernières levées de fonds des startups françaises. Restez informé des investissements dans l'écosystème startup français.",
    site: "@uclic_fr",
  },
};

export default async function Page() {
  const levees = await getAllLevees();
  return (
    <>
      {/* JSON-LD: BreadcrumbList */}
      <Script id="ld-breadcrumb-levees" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.uclic.fr/" },
            { "@type": "ListItem", position: 2, name: "Levée de fonds", item: "https://www.uclic.fr/levee-de-fonds" }
          ]
        })}
      </Script>
      {/* JSON-LD: CollectionPage for levees */}
      <Script id="ld-collection-levees" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Levées de fonds startups françaises",
          description: "Découvrez les dernières levées de fonds des startups françaises. Actualités, analyses et tendances de l'écosystème startup.",
          url: "https://www.uclic.fr/levee-de-fonds",
          mainEntity: {
            "@type": "ItemList",
            itemListElement: levees.slice(0, 20).map((p: any, idx: number) => ({
              "@type": "ListItem",
              position: idx + 1,
              url: `https://www.uclic.fr/levee-de-fonds/${p.slug}`,
              name: p.title
            }))
          },
          isPartOf: {
            "@type": "WebSite",
            name: "UCLIC",
            url: "https://www.uclic.fr"
          },
          about: {
            "@type": "Thing",
            name: "Levées de fonds startups",
            description: "Actualités et analyses sur les investissements dans l'écosystème startup français"
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
            }
          }
        })}
      </Script>
      <Suspense fallback={<Loading />}>
        <LeveesPage posts={levees} initialPage={1} />
      </Suspense>
    </>
  );
}
