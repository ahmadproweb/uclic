import { memo } from 'react';
import { MarqueeClient } from './MarqueeClient';
import Link from 'next/link';

interface ServiceLink {
  text: string;
  href: string;
  description: string;
}

// Données structurées pour les services avec descriptions SEO
const services: ServiceLink[] = [
  { text: "Growth Hacking", href: "/services/growth-hacking", description: "Stratégies de croissance rapide et acquisition client innovante" },
  { text: "Marketing Automation", href: "/services/marketing-automation", description: "Automatisation des processus marketing pour plus d'efficacité" },
  { text: "Lead Generation", href: "/services/lead-generation", description: "Génération de prospects qualifiés et conversion optimisée" },
  { text: "Social Selling", href: "/services/social-selling", description: "Vente sociale et développement de réseau professionnel" },
  { text: "Content Marketing", href: "/services/content-marketing", description: "Création de contenu stratégique et marketing de contenu" },
  { text: "AI Copywriting", href: "/services/ai-copywriting", description: "Rédaction optimisée par l'intelligence artificielle" },
  { text: "Sales Automation", href: "/services/sales-automation", description: "Automatisation des processus de vente et CRM" },
  { text: "Outbound & AI", href: "/services/outbound-ai", description: "Prospection assistée par l'IA et outbound marketing" },
  { text: "Digital Strategy", href: "/services/digital-strategy", description: "Stratégie digitale globale et transformation numérique" },
  { text: "SEO Optimization", href: "/services/seo", description: "Optimisation pour les moteurs de recherche et visibilité web" },
  { text: "Email Marketing", href: "/services/email-marketing", description: "Campagnes email personnalisées et automation marketing" },
  { text: "Conversion Rate", href: "/services/conversion-rate", description: "Optimisation du taux de conversion et UX" },
  { text: "Data Analytics", href: "/services/data-analytics", description: "Analyse de données et insights business" },
  { text: "Brand Strategy", href: "/services/brand-strategy", description: "Stratégie de marque et positionnement" },
  { text: "Marketing AI", href: "/services/marketing-ai", description: "Solutions marketing basées sur l'intelligence artificielle" },
  { text: "Social Media", href: "/services/social-media", description: "Gestion des réseaux sociaux et stratégie social media" }
] as const;

const ServicesList = memo(function ServicesList() {
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

export default memo(function MarqueeText() {
  return (
    <section 
      className="w-full bg-white dark:bg-black overflow-hidden py-8 will-change-transform"
      aria-label="Nos services marketing"
    >
      <ServicesList />
      <MarqueeClient words={services} />
    </section>
  );
}); 