import { Metadata } from 'next';
import AboutContent from '@/components/pages/about/AboutContent';

export const metadata: Metadata = {
  title: 'À propos - Uclic | Notre histoire et notre équipe',
  description: 'Découvrez l\'histoire d\'Uclic, notre mission et notre équipe passionnée. Nous accompagnons les entreprises dans leur transformation numérique avec expertise et innovation.',
  openGraph: {
    title: 'À propos - Uclic | Notre histoire et notre équipe',
    description: 'Découvrez l\'histoire d\'Uclic, notre mission et notre équipe passionnée. Nous accompagnons les entreprises dans leur transformation numérique avec expertise et innovation.',
    type: 'website',
    locale: 'fr_FR',
  },
};

export default function AboutPage() {
  return (
    <main className="w-full">
      <AboutContent />
    </main>
  );
} 