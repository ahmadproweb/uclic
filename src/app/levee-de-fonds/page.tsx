import LeveesPage from "@/components/pages/levee-de-fonds/LeveesPage";
import Loading from "@/components/ui/Loading";
import { getAllLevees } from "@/lib/wordpress";
import { Metadata } from "next";
import { Suspense } from "react";
import Script from "next/script";

export const revalidate = 3600; // Revalidate every hour

export const metadata: Metadata = {
  title: "Levée de fonds startups françaises",
  description:
    "Découvrez les dernières levées de fonds des startups françaises. Restez informé des investissements dans l'écosystème startup.",
  openGraph: {
    title: "Levée de fonds startups françaises",
    description:
      "Découvrez les dernières levées de fonds des startups françaises. Restez informé des investissements dans l'écosystème startup.",
    url: "https://www.uclic.fr/levee-de-fonds",
    type: "website",
    locale: "fr_FR",
    siteName: "Uclic",
  },
  twitter: {
    card: "summary_large_image",
    title: "Levée de fonds startups françaises",
    description:
      "Découvrez les dernières levées de fonds des startups françaises. Restez informé des investissements dans l'écosystème startup.",
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
      {/* JSON-LD: ItemList of levees */}
      <Script id="ld-itemlist-levees" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: levees.slice(0, 20).map((p: any, idx: number) => ({
            "@type": "ListItem",
            position: idx + 1,
            url: `https://www.uclic.fr/levee-de-fonds/${p.slug}`,
            name: p.title
          }))
        })}
      </Script>
      <Suspense fallback={<Loading />}>
        <LeveesPage posts={levees} initialPage={1} />
      </Suspense>
    </>
  );
}
