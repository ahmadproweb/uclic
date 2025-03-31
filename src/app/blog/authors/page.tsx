import { Metadata } from 'next';
import { Suspense } from 'react';
import { getAllAuthors } from '@/lib/wordpress';
import AuthorsArchiveClientSide from '@/components/pages/blog/AuthorsArchiveClientSide';

export const metadata: Metadata = {
  title: 'Nos auteurs - Blog UCLIC',
  description: 'Découvrez les experts qui partagent leur savoir sur le blog UCLIC.',
};

export default async function AuthorsPage() {
  const authors = await getAllAuthors();

  return (
    <Suspense fallback={<div className="p-12 text-center">Chargement des auteurs...</div>}>
      <AuthorsArchiveClientSide authors={authors} />
    </Suspense>
  );
} 