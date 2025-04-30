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

export const metadata: Metadata = {
  title: "Levée de Fonds | Growth Marketing pour Startups | Uclic",
  description: "Optimisez votre levée de fonds grâce au Growth Marketing. Nos freelances experts vous accompagnent dans l'optimisation de vos KPIs et processus commerciaux.",
  alternates: {
    canonical: 'https://uclic.fr/levee-de-fonds'
  },
  openGraph: {
    title: "Levée de Fonds | Growth Marketing pour Startups | Uclic",
    description: "Optimisez votre levée de fonds grâce au Growth Marketing. Nos freelances experts vous accompagnent dans l'optimisation de vos KPIs et processus commerciaux.",
    url: 'https://uclic.fr/levee-de-fonds',
    type: "website",
    locale: "fr_FR",
    siteName: "Uclic",
  },
  twitter: {
    card: "summary_large_image",
    title: "Levée de Fonds | Growth Marketing pour Startups | Uclic",
    description: "Optimisez votre levée de fonds grâce au Growth Marketing. Nos freelances experts vous accompagnent dans l'optimisation de vos KPIs et processus commerciaux.",
    site: "@uclic_fr"
  }
};

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