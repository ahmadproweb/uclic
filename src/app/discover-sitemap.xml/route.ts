import { getAllLevees } from "@/lib/wordpress";
import { getLatestPosts } from "@/services/wordpress";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

async function generateDiscoverSitemap() {
  const headersList = await headers();
  const host = (await headersList.get("host")) || "localhost:3000";
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const baseUrl = `${protocol}://${host}`;

  console.log("Generating discover sitemap...");

  // Récupérer le contenu de haute qualité
  const [posts, levees] = await Promise.all([
    getLatestPosts(50), // Articles de blog récents
    getAllLevees(), // Levées de fonds
  ]);

  console.log(`Found ${posts.length} posts and ${levees.length} levees`);

  // Log some sample data
  if (posts.length > 0) {
    console.log("Sample post:", {
      title: posts[0].title.rendered,
      date: posts[0].date,
      hasImage: !!posts[0]._embedded?.["wp:featuredmedia"]?.[0]?.source_url,
    });
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
            xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
      ${posts
        .map((post) => {
          const imageUrl =
            post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
          return `
          <url>
            <loc>${baseUrl}/blog/${post.slug}</loc>
            <lastmod>${new Date(post.date).toISOString()}</lastmod>
            ${
              imageUrl
                ? `
              <image:image>
                <image:loc>${imageUrl}</image:loc>
                <image:title>${post.title.rendered
                  .replace(/&/g, "&amp;")
                  .replace(/</g, "&lt;")
                  .replace(/>/g, "&gt;")}</image:title>
              </image:image>
            `
                : ""
            }
          </url>
        `;
        })
        .join("")}
      ${levees
        .map((levee) => {
          const imageUrl = levee.featuredImage?.node?.sourceUrl;
          return `
          <url>
            <loc>${baseUrl}/levee-de-fonds/${levee.slug}</loc>
            <lastmod>${new Date(levee.date).toISOString()}</lastmod>
            ${
              imageUrl
                ? `
              <image:image>
                <image:loc>${imageUrl}</image:loc>
                <image:title>${levee.title
                  .replace(/&/g, "&amp;")
                  .replace(/</g, "&lt;")
                  .replace(/>/g, "&gt;")}</image:title>
              </image:image>
            `
                : ""
            }
          </url>
        `;
        })
        .join("")}
    </urlset>`;

  return xml;
}

export async function GET() {
  try {
    const sitemap = await generateDiscoverSitemap();
    console.log("Discover sitemap generated successfully");
    return new NextResponse(sitemap, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control":
          "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Error generating discover sitemap:", error);
    return new NextResponse("Error generating discover sitemap", {
      status: 500,
    });
  }
}
