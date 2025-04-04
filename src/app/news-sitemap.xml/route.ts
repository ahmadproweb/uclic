import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { getLatestPosts } from '@/services/wordpress';
import { getAllLevees } from '@/lib/wordpress';

async function generateNewsSitemap() {
  const headersList = headers();
  const host = headersList.get('host') || 'localhost:3000';
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
  const baseUrl = `${protocol}://${host}`;

  console.log('Generating news sitemap...');

  // Récupérer uniquement les articles de blog et levées de fonds récents (48h max pour Google News)
  const [posts, levees] = await Promise.all([
    getLatestPosts(100),
    getAllLevees()
  ]);

  console.log(`Found ${posts.length} posts and ${levees.length} levees`);

  // Filtrer pour n'avoir que le contenu des dernières 48h
  const twoDaysAgo = new Date();
  twoDaysAgo.setHours(twoDaysAgo.getHours() - 48);

  const recentPosts = posts.filter(post => new Date(post.date) > twoDaysAgo);
  const recentLevees = levees.filter(levee => new Date(levee.date) > twoDaysAgo);

  console.log(`After filtering: ${recentPosts.length} recent posts and ${recentLevees.length} recent levees`);

  // Log a sample post if available
  if (recentPosts.length > 0) {
    console.log('Sample post:', {
      title: recentPosts[0].title.rendered,
      date: recentPosts[0].date,
      slug: recentPosts[0].slug
    });
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
            xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
      ${recentPosts.map(post => `
        <url>
          <loc>${baseUrl}/blog/${post.slug}</loc>
          <news:news>
            <news:publication>
              <news:name>Uclic</news:name>
              <news:language>fr</news:language>
            </news:publication>
            <news:publication_date>${new Date(post.date).toISOString()}</news:publication_date>
            <news:title>${post.title.rendered.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</news:title>
          </news:news>
        </url>
      `).join('')}
      ${recentLevees.map(levee => `
        <url>
          <loc>${baseUrl}/levee-de-fonds/${levee.slug}</loc>
          <news:news>
            <news:publication>
              <news:name>Uclic</news:name>
              <news:language>fr</news:language>
            </news:publication>
            <news:publication_date>${new Date(levee.date).toISOString()}</news:publication_date>
            <news:title>${levee.title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</news:title>
          </news:news>
        </url>
      `).join('')}
    </urlset>`;

  return xml;
}

export async function GET() {
  try {
    const sitemap = await generateNewsSitemap();
    console.log('Sitemap generated successfully');
    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=1800, s-maxage=1800, stale-while-revalidate=3600',
      },
    });
  } catch (error) {
    console.error('Error generating news sitemap:', error);
    return new NextResponse('Error generating news sitemap', { status: 500 });
  }
} 