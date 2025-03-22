import { Metadata } from 'next';
import BlogCategoryClientSide from '@/components/pages/blog/BlogCategoryClientSide';
import { getPostsByCategory, getCategoryBySlug } from '@/services/wordpress';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const category = await getCategoryBySlug(params.slug);
  
  return {
    title: `${category.name} - Blog UCLIC`,
    description: `Découvrez tous nos articles sur ${category.name}`,
  };
}

export default async function BlogCategoryPage({ params }: { params: { slug: string } }) {
  const posts = await getPostsByCategory(params.slug);
  const category = await getCategoryBySlug(params.slug);

  return <BlogCategoryClientSide posts={posts} category={category} />;
} 