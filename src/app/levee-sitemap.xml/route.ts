import { getAllLevees } from "@/lib/wordpress";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

async function generateLeveeSitemap() {
  const headersList = await headers();
  const host = headersList.get("host") || "localhost:3000";
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const baseUrl = `${protocol}://${host}`;

  const levees = await getAllLevees();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${levees
        .map(
          (levee) => `
        <url>
          <loc>${baseUrl}/levee-de-fonds/${levee.slug}</loc>
          <lastmod>${new Date(levee.date).toISOString()}</lastmod>
          <changefreq>monthly</changefreq>
          <priority>0.8</priority>
        </url>
      `
        )
        .join("")}
    </urlset>`;

  return xml;
}

export async function GET() {
  return new NextResponse(await generateLeveeSitemap(), {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
