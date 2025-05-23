import {
  getExpertiseCategories,
  getExpertisesByCategory,
} from "@/lib/wordpress";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

async function generateExpertiseSitemap() {
  const headersList = await headers();
  const host = headersList.get("host") || "localhost:3000";
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const baseUrl = `${protocol}://${host}`;

  // Fetch all categories first
  const categories = await getExpertiseCategories();

  // For each category, fetch its expertises
  const expertisesByCategory = await Promise.all(
    categories.map(async (category) => {
      const expertises = await getExpertisesByCategory(category.slug);
      return {
        category,
        expertises,
      };
    })
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${expertisesByCategory
        .map(
          ({ category, expertises }) => `
        <url>
          <loc>${baseUrl}/expertise/${category.slug}</loc>
          <changefreq>weekly</changefreq>
          <priority>0.9</priority>
        </url>
        ${expertises
          .map(
            (expertise) => `
          <url>
            <loc>${baseUrl}/expertise/${category.slug}/${expertise.slug}</loc>
            <lastmod>${new Date(expertise.date).toISOString()}</lastmod>
            <changefreq>monthly</changefreq>
            <priority>1.0</priority>
          </url>
        `
          )
          .join("")}
      `
        )
        .join("")}
    </urlset>`;

  return xml;
}

export async function GET() {
  try {
    const sitemap = await generateExpertiseSitemap();
    return new NextResponse(sitemap, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control":
          "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Error generating expertise sitemap:", error);
    return new NextResponse("Error generating sitemap", { status: 500 });
  }
}
