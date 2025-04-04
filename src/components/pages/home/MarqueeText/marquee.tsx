import { memo } from 'react';
import { MarqueeClient } from './MarqueeClient';
import Link from 'next/link';
import { getAllExpertiseGrowthCategoriesForMenu, getExpertisesByCategory } from '@/lib/wordpress';

interface ServiceLink {
  text: string;
  href: string;
  description: string;
  items?: Array<{
    title: string;
    href: string;
  }>;
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
            {service.items && service.items.length > 0 && (
              <ul role="list">
                {service.items.map((item) => (
                  <li key={item.href} role="listitem">
                    <Link href={item.href}>
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
});

ServicesList.displayName = 'ServicesList';

async function getServices() {
  try {
    const categories = await getAllExpertiseGrowthCategoriesForMenu();
    const servicesWithItems = await Promise.all(
      categories.map(async (category) => {
        const expertises = await getExpertisesByCategory(category.slug);
        return {
          text: category.name,
          href: `/expertise/${category.slug}`,
          description: category.description || `Services ${category.name}`,
          items: expertises.map(expertise => ({
            title: expertise.title,
            href: `/expertise/${category.slug}/${expertise.slug}`
          }))
        };
      })
    );
    return servicesWithItems;
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
}

export default async function MarqueeText() {
  const services = await getServices();

  // Répartition optimisée des services
  const firstRow = [];
  const secondRow = [];
  let firstRowLength = 0;
  let secondRowLength = 0;

  // Répartir les services en fonction de la longueur du texte
  services.forEach((service) => {
    if (firstRowLength <= secondRowLength) {
      firstRow.push(service);
      firstRowLength += service.text.length;
    } else {
      secondRow.push(service);
      secondRowLength += service.text.length;
    }
  });

  return (
    <section 
      className="w-full bg-white dark:bg-black overflow-hidden py-8 will-change-transform"
      aria-label="Nos services marketing"
    >
      <ServicesList services={services} />
      <MarqueeClient firstRow={firstRow} secondRow={secondRow} />
    </section>
  );
} 