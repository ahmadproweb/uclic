import { Suspense } from 'react';
import { getAllLevees } from '@/lib/wordpress';
import LeveesPage from '@/components/pages/levee-de-fonds/LeveesPage';
import Loading from '@/components/ui/Loading';
import { Metadata } from 'next';

export const revalidate = 3600; // Revalidate every hour

export const metadata: Metadata = {
  title: "Levée de fonds startups françaises | UCLIC",
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

export default async function Page() {
  const levees = await getAllLevees();
  return (
    <Suspense fallback={<Loading />}>
      <LeveesPage posts={levees} initialPage={1} />
    </Suspense>
  );
} 