import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

async function generateSitemapIndex() {
  const headersList = headers();
  const host = headersList.get('host') || 'localhost:3000';
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
  const baseUrl = `${protocol}://${host}`;
  
  const sitemaps = [
    '/static-sitemap.xml',      // Pages fixes et légales
    '/expertise-sitemap.xml',   // Pages d'expertise
    '/blog-sitemap.xml',        // Articles de blog
    '/levee-sitemap.xml',       // Levées de fonds
    '/toolbox-sitemap.xml',     // Outils
    '/team-sitemap.xml',        // Équipe
    '/portfolio-sitemap.xml',   // Cas clients
    '/news-sitemap.xml',        // Sitemap Google News
    '/discover-sitemap.xml',    // Sitemap Google Discover
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${sitemaps.map(sitemap => `
        <sitemap>
          <loc>${baseUrl}${sitemap}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
        </sitemap>
      `).join('')}
    </sitemapindex>`;

  return xml;
}

export async function GET() {
  try {
    const sitemap = await generateSitemapIndex();
    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Error generating sitemap index:', error);
    return new NextResponse('Error generating sitemap index', { status: 500 });
  }
} 