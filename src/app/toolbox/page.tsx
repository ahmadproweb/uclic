import ToolboxPage from "@/components/pages/toolbox/ToolboxPage";
import Loading from "@/components/ui/Loading";
import { fetchToolboxData } from "@/lib/wordpress";
import { Metadata } from "next";
import { Suspense } from "react";

export const revalidate = 3600; // Revalidate every hour

export const metadata: Metadata = {
  title: "Boîte à outils startups",
  description:
    "Découvrez notre sélection d'outils pour startups. Des ressources essentielles pour développer votre entreprise.",
  alternates: {
    canonical: "https://www.uclic.fr/toolbox",
  },
  openGraph: {
    title: "Boîte à outils startups",
    description:
      "Découvrez notre sélection d'outils pour startups. Des ressources essentielles pour développer votre entreprise.",
    url: "https://www.uclic.fr/toolbox",
    type: "website",
    locale: "fr_FR",
    siteName: "Uclic",
  },
  twitter: {
    card: "summary_large_image",
    title: "Boîte à outils startups",
    description:
      "Découvrez notre sélection d'outils pour startups. Des ressources essentielles pour développer votre entreprise.",
    site: "@uclic_fr",
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
    <Suspense fallback={<Loading />}>
      <ToolboxPage posts={toolboxPosts} initialPage={1} />
    </Suspense>
  );
}
