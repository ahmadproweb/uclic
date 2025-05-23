import {
  getExpertiseCategories,
  getExpertisesByCategory,
} from "@/lib/wordpress";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const categories = await getExpertiseCategories();

    const expertisesByCategory = await Promise.all(
      categories.map(async (category) => {
        const expertises = await getExpertisesByCategory(category.slug);
        return {
          category,
          expertises,
        };
      })
    );

    // En-têtes pour les mots-clés
    const csvHeaders = [
      "Campaign",
      "Ad Group",
      "Labels",
      "Keyword",
      "Criterion Type",
      "Max CPC",
      "Max CPM",
      "Max CPV",
      "First page bid",
      "Top of page bid",
      "First position bid",
      "Quality score",
      "Landing page experience",
      "Expected CTR",
      "Ad relevance",
      "Final URL",
      "Final mobile URL",
      "Tracking template",
      "Final URL suffix",
      "Custom parameters",
      "Campaign Status",
      "Ad Group Status",
      "Status",
      "Approval Status",
      "Comment",
    ];

    // Générer les lignes pour les mots-clés
    const rows = expertisesByCategory.flatMap(({ category, expertises }) => {
      return expertises.flatMap((expertise) => {
        const baseUrl =
          process.env.NEXT_PUBLIC_SITE_URL || "https://www.uclic.fr";
        const finalUrl = `${baseUrl}/expertise/${category.slug}/${expertise.slug}`;

        // Créer des mots-clés basés sur le titre de l'expertise
        const keywords = [
          expertise.title,
          `${expertise.title} agence`,
          `agence ${expertise.title}`,
          `${expertise.title} expert`,
          `expert ${expertise.title}`,
        ];

        return keywords.map((keyword) => [
          `Uclic - Agence Intelligence Artificielle - ${expertise.title}`, // Campaign
          `Groupe d'annonces ${expertise.title}`, // Ad Group
          "", // Labels
          keyword, // Keyword
          "Broad", // Criterion Type
          "", // Max CPC
          "", // Max CPM
          "", // Max CPV
          "0.00", // First page bid
          "0.00", // Top of page bid
          "0.00", // First position bid
          "", // Quality score
          "-", // Landing page experience
          "-", // Expected CTR
          "-", // Ad relevance
          finalUrl, // Final URL
          "", // Final mobile URL
          "", // Tracking template
          `expertise/${category.slug}/${expertise.slug}`, // Final URL suffix
          "", // Custom parameters
          "Enabled", // Campaign Status
          "Enabled", // Ad Group Status
          "Enabled", // Status
          "Pending review", // Approval Status
          "", // Comment
        ]);
      });
    });

    // Convertir en CSV avec encodage UTF-8
    const csvContent = [
      csvHeaders.join("\t"),
      ...rows.map((row) =>
        row
          .map((cell) => {
            // Échapper les guillemets et entourer de guillemets si nécessaire
            const escaped = cell.replace(/"/g, '""');
            return /[\t"\n]/.test(cell) ? `"${escaped}"` : cell;
          })
          .join("\t")
      ),
    ].join("\n");

    // Ajouter le BOM UTF-8 pour Excel
    const utf8BOM = "\uFEFF";

    return new NextResponse(utf8BOM + csvContent, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition":
          'attachment; filename="uclic-google-ads-keywords.tsv"',
      },
    });
  } catch (error) {
    console.error("Error generating keywords CSV:", error);
    return new NextResponse("Error generating keywords CSV", { status: 500 });
  }
}
