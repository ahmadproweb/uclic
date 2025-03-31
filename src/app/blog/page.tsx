import { 
  getLatestPosts, 
  estimateReadingTime, 
  getFeaturedImage, 
  decodeHtmlEntitiesServer 
} from '@/services/wordpress';
import BlogIndexClientSide from '@/components/pages/blog/BlogIndexClientSide';
import { Suspense } from 'react';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic'; // Ensure fresh data on each request

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Blog - UCLIC`,
    description: `Découvrez nos dernières actualités et conseils pour améliorer votre présence digitale`,
  };
}

// Définis le paramètre de page pour l'URL
interface BlogPageProps {
  searchParams?: { page?: string };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  // Get pagination from URL query params
  const currentPage = searchParams?.page ? parseInt(searchParams.page) : 1;
  
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
    tags: [],
    category: post._embedded?.['wp:term']?.[0]?.[0]?.name || 'Blog'
  }));

  return (
    <Suspense fallback={<div className="p-12 text-center">Chargement des articles...</div>}>
      <BlogIndexClientSide 
        posts={transformedPosts} 
        initialPage={currentPage} 
      />
    </Suspense>
  );
} 