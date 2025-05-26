import { getTeamMembers } from "@/lib/wordpress";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

async function generateTeamSitemap() {
  const headersList = await headers();
  const host = headersList.get("host") || "localhost:3000";
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const baseUrl = `${protocol}://${host}`;

  const teamMembers = await getTeamMembers();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${teamMembers
        .map(
          (member) => `
        <url>
          <loc>${baseUrl}/equipe/${member.slug}</loc>
          <changefreq>daily</changefreq>
          <priority>0.6</priority>
        </url>
      `
        )
        .join("")}
    </urlset>`;

  return xml;
}

export async function GET() {
  return new NextResponse(await generateTeamSitemap(), {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
