import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { fetchToolboxData } from '@/lib/wordpress';
import ToolboxPage from '@/components/pages/toolbox/ToolboxPage';
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
    ? `Boîte à outils startups - Page ${pageNumber} | UCLIC`
    : "Boîte à outils startups | UCLIC";

  return {
    title,
    description: "Découvrez notre sélection d'outils essentiels pour startups. Des ressources pour développer votre entreprise efficacement.",
    alternates: {
      canonical: 'https://uclic.fr/toolbox'
    },
    openGraph: {
      title: "Boîte à outils startups | UCLIC",
      description: "Découvrez notre sélection d'outils essentiels pour startups. Des ressources pour développer votre entreprise efficacement.",
      url: 'https://uclic.fr/toolbox',
      type: "website",
      locale: "fr_FR",
      siteName: "Uclic",
    },
    twitter: {
      card: "summary_large_image",
      title: "Boîte à outils startups | UCLIC",
      description: "Découvrez notre sélection d'outils essentiels pour startups. Des ressources pour développer votre entreprise efficacement.",
      site: "@uclic_fr"
    }
  };
}

export const revalidate = 3600; // Revalidate every hour

export default async function ToolboxPaginationPage({ params }: PageProps) {
  const pageNumber = parseInt(params.page);
  
  if (isNaN(pageNumber) || pageNumber < 1) {
    notFound();
  }

  const toolboxData = await fetchToolboxData();
  const postsPerPage = 21;
  const totalPages = Math.ceil(toolboxData.nodes.length / postsPerPage);

  if (pageNumber > totalPages) {
    notFound();
  }

  return (
    <Suspense fallback={<Loading />}>
      <ToolboxPage posts={toolboxData.nodes} initialPage={pageNumber} />
    </Suspense>
  );
} 