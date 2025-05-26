import { getLatestPosts, type WordPressPost } from "@/services/wordpress";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

async function generateBlogSitemap() {
  console.log("[SITEMAP] Generating blog sitemap...");
  const headersList = await headers();
  const host = headersList.get("host") || "localhost:3000";
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const baseUrl = `${protocol}://${host}`;

  // Fetch a large number of posts to ensure we get most of them
  let posts: WordPressPost[] = [];
  try {
    const result = await getLatestPosts(100);
    posts = Array.isArray(result) ? result : result.posts || [];
    console.log(`[SITEMAP] Fetched ${posts.length} posts for sitemap.`);
  } catch (err) {
    console.error("[SITEMAP] Error fetching posts:", err);
    posts = [];
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${posts
        .map((post: WordPressPost) => {
          // Ensure we have a valid date
          const postDate = post.date ? new Date(post.date) : new Date();
          // Extract slug from link if slug is not available
          const slug =
            post.slug || post.link?.split("/").filter(Boolean).pop() || "";
          return `
          <url>
            <loc>${baseUrl}/blog/${slug}</loc>
            <lastmod>${postDate.toISOString()}</lastmod>
            <changefreq>daily</changefreq>
            <priority>0.7</priority>
          </url>
        `;
        })
        .join("")}
    </urlset>`;

  return xml;
}

export async function GET() {
  try {
    console.log("[SITEMAP] GET /blog-sitemap.xml called");
    const sitemap = await generateBlogSitemap();
    return new NextResponse(sitemap, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control":
          "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("[SITEMAP] Error generating blog sitemap:", error);
    return new NextResponse("Error generating sitemap", { status: 500 });
  }
}
