import { Suspense } from 'react';
import { getAllLevees } from '@/lib/wordpress';
import LeveesPage from '@/components/pages/levee-de-fonds/LeveesPage';
import Loading from '@/components/ui/Loading';
import { Metadata } from 'next';

export const revalidate = 3600; // Revalidate every hour

export const metadata: Metadata = {
  title: 'Levées de fonds | UCLIC',
  description: 'Découvrez les dernières levées de fonds dans l\'écosystème Web3',
};

export default async function Page() {
  const levees = await getAllLevees();
  return (
    <Suspense fallback={<Loading />}>
      <LeveesPage posts={levees} initialPage={1} />
    </Suspense>
  );
} 