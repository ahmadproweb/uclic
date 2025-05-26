import { fetchToolboxData } from "@/lib/wordpress";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

async function generateToolboxSitemap() {
  const headersList = await headers();
  const host = headersList.get("host") || "localhost:3000";
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const baseUrl = `${protocol}://${host}`;

  const { nodes: tools } = await fetchToolboxData(100);

  // Patch tools to ensure date is at the root
  const patchedTools = tools.map((tool) => ({
    ...tool,
    date: (tool as any).date ?? tool.productHuntFields.day ?? "",
  }));

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${patchedTools
        .map(
          (tool) => `
        <url>
          <loc>${baseUrl}/toolbox/${tool.slug}</loc>
          <lastmod>${new Date(tool.date).toISOString()}</lastmod>
          <changefreq>daily</changefreq>
          <priority>0.7</priority>
        </url>
      `
        )
        .join("")}
    </urlset>`;

  return xml;
}

export async function GET() {
  return new NextResponse(await generateToolboxSitemap(), {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
