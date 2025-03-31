import { Metadata } from 'next';
import AboutPageClient from './AboutPageClient';

export const metadata: Metadata = {
  title: 'À propos - Uclic | Notre histoire et nos valeurs',
  description: 'Découvrez comment est né Uclic et ce qui nous anime au quotidien. Une agence digitale créée pour rendre le digital profondément humain.',
  openGraph: {
    title: 'À propos - Uclic | Notre histoire et nos valeurs',
    description: 'Découvrez comment est né Uclic et ce qui nous anime au quotidien. Une agence digitale créée pour rendre le digital profondément humain.',
    type: 'website',
    locale: 'fr_FR',
  },
};

export default function AboutPage() {
  return (
    <main className="w-full">
      <AboutPageClient />
    </main>
  );
} 