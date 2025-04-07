import { NextResponse } from 'next/server';
import { fetchToolboxData } from '@/lib/wordpress';
import { headers } from 'next/headers';

async function generateToolboxSitemap() {
  const headersList = headers();
  const host = headersList.get('host') || 'localhost:3000';
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
  const baseUrl = `${protocol}://${host}`;

  const { nodes: tools } = await fetchToolboxData(100);

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${tools.map(tool => `
        <url>
          <loc>${baseUrl}/toolbox/${tool.slug}</loc>
          <lastmod>${new Date(tool.date).toISOString()}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.7</priority>
        </url>
      `).join('')}
    </urlset>`;

  return xml;
}

export async function GET() {
  return new NextResponse(await generateToolboxSitemap(), {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
} 