import { Metadata } from "next";
import MDECalculatorClient from "./MDECalculatorClient";

export const metadata: Metadata = {
  title: "A/B Testing Confidence - Calculateur Taille d'échantillon",
  description:
    "Calculez la taille d'échantillon optimale pour vos tests A/B et déterminez le niveau de confiance statistique nécessaire. Optimisez vos expérimentations avec des résultats fiables.",
  keywords: [
    "A/B testing confidence",
    "calculateur taille échantillon",
    "test A/B",
    "confiance statistique",
    "puissance statistique",
    "MDE",
    "minimum detectable effect",
    "optimisation conversion",
    "growth hacking",
  ],
  openGraph: {
    title: "A/B Testing Confidence - Calculateur Taille d'échantillon",
    description:
      "Calculez la taille d'échantillon optimale pour vos tests A/B et déterminez le niveau de confiance statistique nécessaire. Optimisez vos expérimentations avec des résultats fiables.",
    type: "website",
    locale: "fr_FR",
  },
  alternates: {
    canonical: "https://uclic.fr/outils-gratuits/mde-calculator",
  },
};

// Server component
export default function Page() {
  return (
    <>
      {/* SSR Content */}
      <div className="hidden">
        <h1>A/B Testing Confidence - Calculateur Taille d'échantillon</h1>
        <p>
          Calculez la taille d'échantillon optimale pour vos tests A/B et
          déterminez le niveau de confiance statistique nécessaire. Optimisez
          vos expérimentations avec des résultats fiables.
        </p>

        <h2>Comment utiliser le calculateur ?</h2>
        <p>
          Notre calculateur vous aide à déterminer la taille d'échantillon
          nécessaire pour vos tests A/B en fonction de :
        </p>
        <ul>
          <li>Votre taux de conversion actuel</li>
          <li>L'effet minimum que vous souhaitez détecter (MDE)</li>
          <li>Le niveau de confiance souhaité</li>
          <li>La puissance statistique</li>
        </ul>

        <h2>Pourquoi la taille d'échantillon est-elle importante ?</h2>
        <p>
          Une taille d'échantillon insuffisante peut conduire à des résultats
          non significatifs, tandis qu'un échantillon trop grand peut être
          coûteux et inefficace. Notre calculateur vous aide à trouver le juste
          équilibre.
        </p>

        <h2>Questions Fréquentes</h2>
        <h3>Qu'est-ce que le MDE ?</h3>
        <p>
          Le Minimum Detectable Effect (MDE) est la plus petite différence que
          vous souhaitez détecter entre vos variantes de test avec un niveau de
          confiance statistique donné.
        </p>

        <h3>Quel niveau de confiance choisir ?</h3>
        <p>
          Un niveau de confiance de 95% est généralement recommandé pour les
          tests A/B. Cela signifie que vous avez 95% de chances que vos
          résultats soient statistiquement significatifs.
        </p>
      </div>

      {/* Client Component */}
      <MDECalculatorClient />
    </>
  );
}
