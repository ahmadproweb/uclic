import { 
  getLatestPosts, 
  estimateReadingTime, 
  getFeaturedImage, 
  decodeHtmlEntitiesServer 
} from '@/services/wordpress';
import BlogIndexClientSide from '@/components/pages/blog/BlogIndexClientSide';

export default async function BlogPage() {
  // Fetch more posts for pagination (increase from 12 to 30)
  const posts = await getLatestPosts(30);
  
  // Transform WordPress posts to our format
  const transformedPosts = posts.map(post => ({
    id: post.id,
    title: decodeHtmlEntitiesServer(post.title.rendered),
    slug: post.slug,
    excerpt: post.excerpt.rendered,
    content: post.content.rendered,
    date: post.date,
    author: post._embedded?.author?.[0]?.name || 'Uclic',
    author_link: '',
    featured_image_url: getFeaturedImage(post).url,
    reading_time: estimateReadingTime(post.content.rendered),
    tags: []
  }));

  return <BlogIndexClientSide posts={transformedPosts} />;
} 