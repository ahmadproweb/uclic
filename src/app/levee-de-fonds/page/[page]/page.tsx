import { Metadata } from 'next';
import { Suspense } from 'react';
import { getAllLevees } from '@/lib/wordpress';
import LeveesPage from '@/components/pages/levee-de-fonds/LeveesPage';
import Loading from '@/components/ui/Loading';

interface PageProps {
  params: {
    page: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const currentPage = parseInt(params.page);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://uclic.fr';
  
  return {
    title: `Levées de fonds - Page ${currentPage} | UCLIC`,
    description: `Découvrez les dernières levées de fonds des startups françaises - Page ${currentPage}`,
    alternates: {
      canonical: currentPage === 1 
        ? `${baseUrl}/levee-de-fonds`
        : `${baseUrl}/levee-de-fonds/page/${currentPage}`,
    },
    openGraph: {
      title: `Levées de fonds - Page ${currentPage} | UCLIC`,
      description: `Découvrez les dernières levées de fonds des startups françaises - Page ${currentPage}`,
      url: currentPage === 1 
        ? `${baseUrl}/levee-de-fonds`
        : `${baseUrl}/levee-de-fonds/page/${currentPage}`,
    },
    robots: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  };
}

export const revalidate = 3600;

export default async function Page({ params }: PageProps) {
  const currentPage = parseInt(params.page);
  const levees = await getAllLevees();
  
  return (
    <Suspense fallback={<Loading />}>
      <LeveesPage posts={levees} initialPage={currentPage} />
    </Suspense>
  );
} 