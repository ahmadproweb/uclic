import { Metadata } from "next";
import OutilsGratuitsClient from "./OutilsGratuitsClient";

export const metadata: Metadata = {
  title: "Outils Gratuits Growth Hacking",
  description:
    "Découvrez nos outils gratuits pour optimiser votre croissance. Des calculateurs et ressources essentielles pour vos tests A/B, analyses statistiques et stratégie marketing.",
  keywords: [
    "outils gratuits growth hacking",
    "calculateurs marketing",
    "A/B testing",
    "analyse statistique",
    "optimisation conversion",
    "outils marketing gratuits",
    "growth hacking",
    "marketing digital",
  ],
  openGraph: {
    title: "Outils Gratuits Growth Hacking",
    description:
      "Découvrez nos outils gratuits pour optimiser votre croissance. Des calculateurs et ressources essentielles pour vos tests A/B, analyses statistiques et stratégie marketing.",
    type: "website",
    locale: "fr_FR",
  },
  alternates: {
    canonical: "https://www.uclic.fr/outils-gratuits",
  },
};

// Server component
export default function Page() {
  return (
    <>
      {/* SSR Content */}
      <div className="hidden">
        <h1>Outils Gratuits Growth Hacking</h1>
        <p>
          Découvrez notre collection d'outils gratuits spécialement conçus pour
          optimiser votre croissance. Des calculateurs et ressources
          essentielles pour vos tests A/B, analyses statistiques et stratégie
          marketing.
        </p>

        <h2>Nos Outils Growth Hacking</h2>
        <p>
          Nous mettons à votre disposition des outils gratuits pour vous aider
          dans vos expérimentations et analyses marketing :
        </p>

        <h3>A/B Testing Confidence</h3>
        <p>
          Un calculateur avancé pour déterminer la taille d'échantillon optimale
          de vos tests A/B. Optimisez vos expérimentations avec des résultats
          statistiquement significatifs.
        </p>

        <h2>Pourquoi utiliser nos outils gratuits ?</h2>
        <ul>
          <li>Des outils professionnels accessibles gratuitement</li>
          <li>
            Des calculs précis basés sur des méthodes statistiques éprouvées
          </li>
          <li>Une interface intuitive et facile à utiliser</li>
          <li>Des résultats fiables pour prendre les bonnes décisions</li>
        </ul>
      </div>

      {/* Client Component */}
      <OutilsGratuitsClient />
    </>
  );
}
