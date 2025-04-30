import { Metadata } from 'next';
import BlogCategoryClientSide from '@/components/pages/blog/BlogCategoryClientSide';
import { getPostsByCategory, getCategoryBySlug } from '@/services/wordpress';
import { Suspense } from 'react';
import { notFound } from 'next/navigation';

interface PageProps {
  params: {
    slug: string;
    page: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const category = await getCategoryBySlug(params.slug);
  
  if (!category) {
    return {
      title: 'Catégorie non trouvée - Blog UCLIC',
    };
  }

  const page = parseInt(params.page);
  
  return {
    title: `L'actualité ${category.name} de notre agence - Page ${page} | UCLIC`,
    description: `Découvrez notre expertise en ${category.name}. Articles, guides et conseils par notre agence spécialisée pour optimiser votre stratégie ${category.name.toLowerCase()} - Page ${page}.`,
    openGraph: {
      title: `L'actualité ${category.name} de notre agence - Page ${page} | UCLIC`,
      description: `Découvrez notre expertise en ${category.name}. Articles, guides et conseils par notre agence spécialisée pour optimiser votre stratégie ${category.name.toLowerCase()} - Page ${page}.`,
      type: 'website',
      locale: 'fr_FR',
      siteName: 'UCLIC',
    },
    twitter: {
      card: 'summary_large_image',
      title: `L'actualité ${category.name} de notre agence - Page ${page} | UCLIC`,
      description: `Découvrez notre expertise en ${category.name}. Articles, guides et conseils par notre agence spécialisée pour optimiser votre stratégie ${category.name.toLowerCase()} - Page ${page}.`,
    }
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const slug = params.slug;
  const currentPage = parseInt(params.page);
  
  if (isNaN(currentPage) || currentPage < 1) {
    notFound();
  }

  const category = await getCategoryBySlug(slug);
  if (!category) {
    notFound();
  }

  const { posts, totalPages } = await getPostsByCategory(slug, currentPage);

  if (currentPage > totalPages) {
    notFound();
  }

  return (
    <Suspense fallback={<div className="p-12 text-center">Chargement des articles...</div>}>
      <BlogCategoryClientSide 
        posts={posts} 
        category={category}
        initialPage={currentPage}
        totalPages={totalPages}
      />
    </Suspense>
  );
} 