import ToolboxSingle from "@/components/pages/toolbox/ToolboxSingle";
import { getToolboxItem } from "@/lib/wordpress";
import { notFound } from "next/navigation";
import { Metadata } from "next";

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

    return <ToolboxSingle tool={tool as any} />;
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

    return {
      title: `${tool.title} | Toolbox Uclic`,
      description,
      keywords: [
        "outil",
        "toolbox",
        "productivité",
        "développement",
        tool.title,
        ...(tool.productHuntFields?.categories?.split(",").map(c => c.trim()) || [])
      ],
      authors: [{ name: "Uclic" }],
      creator: "Uclic",
      publisher: "Uclic",
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
      openGraph: {
        type: "article",
        title: `${tool.title} | Toolbox Uclic`,
        description,
        url: `https://uclic.fr/toolbox/${slug}`,
        siteName: "Uclic",
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: tool.title,
          },
        ],
        locale: "fr_FR",
      },
      twitter: {
        card: "summary_large_image",
        title: `${tool.title} | Toolbox Uclic`,
        description,
        images: [imageUrl],
        creator: "@uclic_fr",
        site: "@uclic_fr",
      },
      alternates: {
        canonical: `https://uclic.fr/toolbox/${slug}`,
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
