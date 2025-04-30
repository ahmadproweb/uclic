import { notFound } from 'next/navigation';
import LeveesPage from '../page';
import { Metadata } from 'next';

interface PageProps {
  params: {
    page: string;
  };
}

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

export default function LeveesPaginationPage({ params }: PageProps) {
  const pageNumber = parseInt(params.page);
  
  if (isNaN(pageNumber) || pageNumber < 1) {
    notFound();
  }

  return <LeveesPage initialPage={pageNumber} />;
} 