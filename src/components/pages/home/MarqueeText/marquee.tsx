import { MarqueeClient } from './MarqueeClient';

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
];

export default function MarqueeText() {
  return (
    <section 
      className="w-full bg-white dark:bg-black overflow-hidden py-8"
      aria-label="Nos services marketing"
    >
      {/* Liste de services accessible aux lecteurs d'écran */}
      <div className="sr-only">
        <h2>Nos services marketing</h2>
        <ul>
          {services.map((service, idx) => (
            <li key={idx}>
              <a href={service.href}>{service.text} - {service.description}</a>
            </li>
          ))}
        </ul>
      </div>

      {/* Composant visuel avec animation */}
      <MarqueeClient words={services} />
    </section>
  );
} 