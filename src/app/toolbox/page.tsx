import { Suspense } from 'react';
import { fetchToolboxData } from '@/lib/wordpress';
import ToolboxPage from '@/components/pages/toolbox/ToolboxPage';
import Loading from '@/components/ui/Loading';
import { Metadata } from 'next';

export const revalidate = 3600; // Revalidate every hour

export const metadata: Metadata = {
  title: "Boîte à outils startups | UCLIC",
  description: "Découvrez notre sélection d'outils pour startups. Des ressources essentielles pour développer votre entreprise.",
  alternates: {
    canonical: 'https://uclic.fr/toolbox'
  },
  openGraph: {
    title: "Boîte à outils startups | UCLIC",
    description: "Découvrez notre sélection d'outils pour startups. Des ressources essentielles pour développer votre entreprise.",
    url: 'https://uclic.fr/toolbox',
    type: "website",
    locale: "fr_FR",
    siteName: "Uclic",
  },
  twitter: {
    card: "summary_large_image",
    title: "Boîte à outils startups | UCLIC",
    description: "Découvrez notre sélection d'outils pour startups. Des ressources essentielles pour développer votre entreprise.",
    site: "@uclic_fr"
  }
};

export default async function Page() {
  const toolboxData = await fetchToolboxData();
  
  return (
    <Suspense fallback={<Loading />}>
      <ToolboxPage posts={toolboxData.nodes} initialPage={1} />
    </Suspense>
  );
} 