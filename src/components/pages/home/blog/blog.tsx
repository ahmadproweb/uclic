// Since we're using SSR, this is a server component
import { getLatestPosts, getPostCategory, formatDate, estimateReadingTime, getFeaturedImage, decodeHtmlEntitiesServer } from '@/services/wordpress';
import ClientSideBlog from './ClientSideBlog';

export default async function Blog() {
  // Fetch latest posts from WordPress API
  const posts = await getLatestPosts(3);
  
  // Transform WordPress posts to our format
  const blogPosts = posts.map(post => ({
    id: post.id,
    category: getPostCategory(post),
    title: decodeHtmlEntitiesServer(post.title.rendered),
    description: decodeHtmlEntitiesServer(post.excerpt.rendered.replace(/<[^>]*>/g, '')), // Strip HTML tags and decode
    author: post._embedded?.author?.[0]?.name || 'Uclic',
    date: formatDate(post.date),
    readTime: estimateReadingTime(post.content.rendered),
    link: post.link,
    slug: post.slug,
    featuredImage: getFeaturedImage(post)
  }));

  // Use the client side component to handle theme
  return (
    <div className="relative">
      {/* Grain effect overlay */}
      <div 
        className="absolute inset-0 z-0 mix-blend-soft-light opacity-50"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.7\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'0.8\'/%3E%3C/svg%3E")',
          backgroundRepeat: 'repeat',
          backgroundSize: '100px 100px'
        }}
      />
      <ClientSideBlog blogPosts={blogPosts} />
    </div>
  );
} 