import { Metadata } from 'next';
import { getLatestPosts, decodeHtmlEntitiesServer, getFeaturedImage, estimateReadingTime } from '@/services/wordpress';
import BlogIndexClientSide from '@/components/pages/blog/BlogIndexClientSide';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: "Blog Growth Marketing & Sales | Conseils d'Experts | Uclic",
  description: "Articles et conseils d'experts en Growth Marketing, Sales Ops et Product Marketing. Découvrez nos stratégies data-driven pour optimiser votre croissance.",
  alternates: {
    canonical: 'https://uclic.fr/blog'
  },
  openGraph: {
    title: "Blog Growth Marketing & Sales | Conseils d'Experts | Uclic",
    description: "Articles et conseils d'experts en Growth Marketing, Sales Ops et Product Marketing. Découvrez nos stratégies data-driven pour optimiser votre croissance.",
    url: 'https://uclic.fr/blog',
    type: "website",
    locale: "fr_FR",
    siteName: "Uclic",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog Growth Marketing & Sales | Conseils d'Experts | Uclic",
    description: "Articles et conseils d'experts en Growth Marketing, Sales Ops et Product Marketing. Découvrez nos stratégies data-driven pour optimiser votre croissance.",
    site: "@uclic_fr"
  }
};

export default async function BlogPage() {
  const POSTS_PER_PAGE = 9;
  const currentPage = 1;
  
  // Fetch posts with pagination
  const { posts, totalPages } = await getLatestPosts(POSTS_PER_PAGE, currentPage);
  
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
        totalPages={totalPages}
      />
    </Suspense>
  );
} 