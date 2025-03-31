import { Metadata } from 'next';
import BlogCategoryClientSide from '@/components/pages/blog/BlogCategoryClientSide';
import { getPostsByCategory, getCategoryBySlug } from '@/services/wordpress';
import { Suspense } from 'react';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const slug = await Promise.resolve(params.slug);
  const category = await getCategoryBySlug(slug);
  
  return {
    title: `${category.name} - Blog UCLIC`,
    description: `Découvrez tous nos articles sur ${category.name}`,
  };
}

// Définis le paramètre de page pour l'URL
interface CategoryPageProps {
  params: { slug: string };
  searchParams?: { page?: string };
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const slug = await Promise.resolve(params.slug);
  const currentPage = searchParams?.page ? parseInt(searchParams.page) : 1;
  
  const [category, posts] = await Promise.all([
    getCategoryBySlug(slug),
    getPostsByCategory(slug)
  ]);

  if (!category) {
    notFound();
  }

  return (
    <Suspense fallback={<div className="p-12 text-center">Chargement des articles...</div>}>
      <BlogCategoryClientSide 
        posts={posts} 
        category={category}
        initialPage={currentPage}
      />
    </Suspense>
  );
} 