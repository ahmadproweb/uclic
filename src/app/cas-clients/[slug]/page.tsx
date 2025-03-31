import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getPortfolioBySlug, getRelatedPortfolios, getLatestPortfolios } from '@/lib/wordpress';
import LeveePage from '@/components/pages/levee-de-fonds/LeveePage';
import Loading from '@/components/ui/Loading';
import { Metadata } from 'next';

interface PortfolioPostParams {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PortfolioPostParams) {
  const post = await getPortfolioBySlug(params.slug);

  if (!post) {
    return {
      title: 'Cas client non trouvé | UCLIC',
      description: 'Le cas client que vous recherchez n\'existe pas.',
    };
  }

  return {
    title: `${post.title} | UCLIC`,
    description: `Découvrez les détails du cas client : ${post.title}`,
  };
}

export const revalidate = 3600; // Revalidate every hour

export default async function Page({ params }: PortfolioPostParams) {
  const post = await getPortfolioBySlug(params.slug);

  if (!post) {
    notFound();
  }

  // Fetch related and latest posts in parallel
  const [relatedPosts, latestPosts] = await Promise.all([
    getRelatedPortfolios(post.id),
    getLatestPortfolios(3, [post.id]) // Exclude current post
  ]);

  return (
    <Suspense fallback={<Loading />}>
      <LeveePage 
        post={post}
        relatedPosts={relatedPosts}
        latestPosts={latestPosts}
      />
    </Suspense>
  );
} 