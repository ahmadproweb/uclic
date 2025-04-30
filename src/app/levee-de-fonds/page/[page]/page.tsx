import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getAllLevees } from '@/lib/wordpress';
import LeveesPage from '@/components/pages/levee-de-fonds/LeveesPage';
import Loading from '@/components/ui/Loading';
import { Metadata } from 'next';

interface PageProps {
  params: {
    page: string;
  };
}

export async function generateMetadata({ params }: { params: { page: string } }): Promise<Metadata> {
  const pageNumber = parseInt(params.page);
  const title = pageNumber > 1 
    ? `Levée de fonds startups françaises - Page ${pageNumber} | UCLIC`
    : "Levée de fonds startups françaises | UCLIC";

  return {
    title,
    description: "Découvrez les dernières levées de fonds des startups françaises. Restez informé des investissements dans l'écosystème startup.",
    alternates: {
      canonical: 'https://uclic.fr/levee-de-fonds'
    },
    openGraph: {
      title: "Levée de fonds startups françaises | UCLIC",
      description: "Découvrez les dernières levées de fonds des startups françaises. Restez informé des investissements dans l'écosystème startup.",
      url: 'https://uclic.fr/levee-de-fonds',
      type: "website",
      locale: "fr_FR",
      siteName: "Uclic",
    },
    twitter: {
      card: "summary_large_image",
      title: "Levée de fonds startups françaises | UCLIC",
      description: "Découvrez les dernières levées de fonds des startups françaises. Restez informé des investissements dans l'écosystème startup.",
      site: "@uclic_fr"
    }
  };
}

export const revalidate = 3600; // Revalidate every hour

export default async function LeveesPaginationPage({ params }: PageProps) {
  const pageNumber = parseInt(params.page);
  
  if (isNaN(pageNumber) || pageNumber < 1) {
    notFound();
  }

  const levees = await getAllLevees();
  const postsPerPage = 9;
  const totalPages = Math.ceil((levees.length - 1) / postsPerPage);

  if (pageNumber > totalPages) {
    notFound();
  }

  return (
    <Suspense fallback={<Loading />}>
      <LeveesPage posts={levees} initialPage={pageNumber} />
    </Suspense>
  );
} 