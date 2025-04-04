import { memo } from 'react';
import { MarqueeClient } from './MarqueeClient';
import Link from 'next/link';
import { getExpertisesByCategory } from '@/lib/wordpress';

interface ServiceLink {
  text: string;
  href: string;
  description: string;
}

const ServicesList = memo(function ServicesList({ services }: { services: ServiceLink[] }) {
  return (
    <nav className="sr-only" aria-label="Services navigation">
      <h2>Nos services marketing</h2>
      <ul role="list">
        {services.map((service) => (
          <li key={service.href} role="listitem">
            <Link href={service.href} aria-label={`${service.text} - ${service.description}`}>
              {service.text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
});

ServicesList.displayName = 'ServicesList';

async function getMarqueeServices() {
  // Récupérer les expertises pour les deux catégories
  const [aiServices, growthServices] = await Promise.all([
    getExpertisesByCategory('agence-intelligence-artificielle'),
    getExpertisesByCategory('growth-marketing')
  ]);

  // Transformer les expertises en format ServiceLink
  const formatExpertise = (expertise: any, category: string): ServiceLink => ({
    text: expertise.title,
    href: `/expertise/${category}/${expertise.slug}`,
    description: expertise.expertiseFields?.subtitle || expertise.title // Utiliser le sous-titre ou le titre si pas de sous-titre
  });

  // Formater les services
  const aiServiceLinks = aiServices.map(exp => formatExpertise(exp, 'agence-intelligence-artificielle'));
  const growthServiceLinks = growthServices.map(exp => formatExpertise(exp, 'growth-marketing'));

  // Log pour debug
  console.log('AI Services:', aiServices);
  console.log('Growth Services:', growthServices);

  return {
    aiServiceLinks,
    growthServiceLinks
  };
}

export default async function MarqueeText() {
  const { aiServiceLinks, growthServiceLinks } = await getMarqueeServices();
  
  // Créer deux lignes de services
  const firstLineServices = [...aiServiceLinks, ...growthServiceLinks.slice(0, Math.floor(growthServiceLinks.length / 2))];
  const secondLineServices = [...growthServiceLinks.slice(Math.floor(growthServiceLinks.length / 2))];

  const allServices = [...firstLineServices, ...secondLineServices];

  return (
    <section 
      className="w-full bg-white dark:bg-black overflow-hidden py-8 will-change-transform"
      aria-label="Nos services marketing"
    >
      <ServicesList services={allServices} />
      <MarqueeClient firstLine={firstLineServices} secondLine={secondLineServices} />
    </section>
  );
}; 