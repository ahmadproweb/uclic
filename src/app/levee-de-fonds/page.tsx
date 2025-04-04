import { Suspense } from 'react';
import { getAllLevees } from '@/lib/wordpress';
import LeveesPage from '@/components/pages/levee-de-fonds/LeveesPage';
import Loading from '@/components/ui/Loading';
import { Metadata } from 'next';

export const metadata = {
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

export default async function Page() {
  const levees = await getAllLevees();

  return (
    <Suspense fallback={<Loading />}>
      <LeveesPage posts={levees} />
    </Suspense>
  );
} 