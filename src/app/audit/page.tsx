import { Metadata } from 'next';
import AuditContent from '@/components/pages/audit/AuditContent';

export const metadata: Metadata = {
  title: 'Audit Stratégique Gratuit - Uclic | Optimisez votre présence digitale',
  description: 'Obtenez un audit gratuit de votre présence en ligne. Nos experts analysent votre site et vous proposent des recommandations concrètes pour maximiser votre impact digital.',
  openGraph: {
    title: 'Audit Stratégique Gratuit - Uclic | Optimisez votre présence digitale',
    description: 'Obtenez un audit gratuit de votre présence en ligne. Nos experts analysent votre site et vous proposent des recommandations concrètes pour maximiser votre impact digital.',
    type: 'website',
    locale: 'fr_FR',
  },
};

export default function AuditPage() {
  return (
    <main className="w-full">
      <AuditContent />
    </main>
  );
}