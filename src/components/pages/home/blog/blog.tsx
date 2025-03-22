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
  return <ClientSideBlog blogPosts={blogPosts} />;
} 