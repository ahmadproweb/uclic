import { NextResponse } from 'next/server';
import { getLatestPortfolios } from '@/lib/wordpress';
import { headers } from 'next/headers';

async function generatePortfolioSitemap() {
  const headersList = headers();
  const host = headersList.get('host') || 'localhost:3000';
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
  const baseUrl = `${protocol}://${host}`;

  // Fetch a large number of portfolios to ensure we get all of them
  const portfolios = await getLatestPortfolios(100);

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${portfolios.map(portfolio => `
        <url>
          <loc>${baseUrl}/cas-clients/${portfolio.slug}</loc>
          <lastmod>${new Date(portfolio.date).toISOString()}</lastmod>
          <changefreq>monthly</changefreq>
          <priority>0.8</priority>
        </url>
      `).join('')}
    </urlset>`;

  return xml;
}

export async function GET() {
  return new NextResponse(await generatePortfolioSitemap(), {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
} 