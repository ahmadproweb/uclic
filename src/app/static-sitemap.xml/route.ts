import { headers } from "next/headers";
import { NextResponse } from "next/server";

async function generateStaticSitemap() {
  const headersList = await headers();
  const host = headersList.get("host") || "localhost:3000";
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const baseUrl = `${protocol}://${host}`;

  // Pages fixes avec leurs priorités SEO
  const staticPages = [
    { url: "/", priority: "1.0", changefreq: "daily" },
    { url: "/a-propos", priority: "0.8", changefreq: "monthly" },
    { url: "/contact", priority: "0.8", changefreq: "monthly" },
    { url: "/services", priority: "0.9", changefreq: "weekly" },
    { url: "/charte-freelance", priority: "0.6", changefreq: "monthly" },
    { url: "/audit", priority: "0.8", changefreq: "monthly" },
  ];

  // Pages légales
  const legalPages = [
    { url: "/legal/mentions-legales", priority: "0.3", changefreq: "yearly" },
    {
      url: "/legal/politique-de-confidentialite",
      priority: "0.3",
      changefreq: "yearly",
    },
    {
      url: "/legal/conditions-generales-de-vente",
      priority: "0.3",
      changefreq: "yearly",
    },
    { url: "/legal/cookies", priority: "0.3", changefreq: "yearly" },
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticPages
        .map(
          (page) => `
        <url>
          <loc>${baseUrl}${page.url}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>${page.changefreq}</changefreq>
          <priority>${page.priority}</priority>
        </url>
      `
        )
        .join("")}
      ${legalPages
        .map(
          (page) => `
        <url>
          <loc>${baseUrl}${page.url}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>${page.changefreq}</changefreq>
          <priority>${page.priority}</priority>
        </url>
      `
        )
        .join("")}
    </urlset>`;

  return xml;
}

export async function GET() {
  try {
    const sitemap = await generateStaticSitemap();
    return new NextResponse(sitemap, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control":
          "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Error generating static sitemap:", error);
    return new NextResponse("Error generating sitemap", { status: 500 });
  }
}
