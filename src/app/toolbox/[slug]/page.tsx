import ToolboxSingle from "@/components/pages/toolbox/ToolboxSingle";
import { getToolboxItem } from "@/lib/wordpress";
import { notFound } from "next/navigation";

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

    return <ToolboxSingle tool={tool} />;
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
}) {
  try {
    // Ensure params is properly typed and awaited
    const slug = params.slug;
    const tool = await getToolboxItem(slug);

    if (!tool) {
      console.error(
        `Tool not found for slug: ${slug} during metadata generation`
      );
      return {
        title: "Outil non trouvé",
        description: "Cet outil n'existe pas ou n'est plus disponible.",
      };
    }

    const description =
      tool.productHuntFields?.tagline ||
      `Découvrez ${tool.title} dans notre sélection d'outils pour développer votre activité.`;

    return {
      title: `${tool.title} | Toolbox Uclic`,
      description,
      openGraph: {
        title: `${tool.title} | Toolbox Uclic`,
        description,
        images: [
          {
            url:
              tool.productHuntFields?.screenshotUrl ||
              tool.productHuntFields?.logo ||
              "",
            width: 1200,
            height: 630,
            alt: tool.title,
          },
        ],
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Erreur",
      description: "Une erreur est survenue lors du chargement de l'outil.",
    };
  }
}
