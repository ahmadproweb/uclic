import { Suspense } from 'react';
import { getAllLevees } from '@/lib/wordpress';
import LeveesPage from '@/components/pages/levee-de-fonds/LeveesPage';
import Loading from '@/components/ui/Loading';
import { Metadata } from 'next';

export const metadata = {
  title: 'Levées de fonds Web3 | UCLIC',
  description: 'Découvrez les dernières levées de fonds dans l\'écosystème Web3. Restez informé des investissements et des projets prometteurs.',
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