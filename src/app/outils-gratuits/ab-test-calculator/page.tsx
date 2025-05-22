import { Metadata } from "next";
import ABTestCalculatorClient from "./ABTestCalculatorClient";
import { metadata as sharedMetadata } from "./metadata";

export const metadata: Metadata = sharedMetadata;

// Server component
export default function Page() {
  return (
    <>
      {/* SSR Content */}
      <div className="hidden">
        <h1>Calculateur A/B Test - Test de Signification Statistique</h1>
        <p>
          Calculez la signification statistique de vos tests A/B avec notre
          calculateur gratuit. Analysez les taux de conversion, les intervalles
          de confiance et la probabilité bayésienne pour prendre des décisions
          data-driven.
        </p>

        <h2>Comment utiliser le calculateur A/B Test ?</h2>
        <p>
          Notre calculateur vous aide à déterminer la signification statistique
          de vos tests A/B en analysant :
        </p>
        <ul>
          <li>Les taux de conversion des groupes contrôle et variante</li>
          <li>La différence absolue et relative entre les variantes</li>
          <li>La p-value et le niveau de confiance</li>
          <li>La probabilité bayésienne de succès</li>
        </ul>

        <h2>Pourquoi la signification statistique est-elle importante ?</h2>
        <p>
          La signification statistique vous permet de déterminer si les
          différences observées entre vos variantes sont réelles ou dues au
          hasard. Un test statistiquement significatif vous donne la confiance
          nécessaire pour prendre des décisions basées sur les données.
        </p>

        <h2>Questions Fréquentes sur les Tests A/B</h2>
        <h3>Qu'est-ce que la signification statistique ?</h3>
        <p>
          La signification statistique indique si les différences observées
          entre vos variantes sont dues au hasard ou représentent un véritable
          effet. Un résultat est généralement considéré comme significatif
          lorsque la p-value est inférieure à 0,05.
        </p>

        <h3>Comment interpréter la p-value ?</h3>
        <p>
          La p-value représente la probabilité d'observer une différence aussi
          grande ou plus grande que celle observée, si en réalité il n'y avait
          aucune différence. Plus la p-value est petite, plus le résultat est
          statistiquement significatif.
        </p>

        <h3>Qu'est-ce que l'analyse bayésienne ?</h3>
        <p>
          L'analyse bayésienne fournit une approche alternative à l'analyse
          fréquentiste traditionnelle. Elle calcule directement la probabilité
          qu'une variante soit meilleure que l'autre, en tenant compte des
          données observées et des connaissances préalables.
        </p>

        <h3>Quel niveau de confiance choisir ?</h3>
        <p>
          Un niveau de confiance de 95% est généralement recommandé pour les
          tests A/B. Cela signifie que vous avez 95% de chances que vos
          résultats soient statistiquement significatifs et non dus au hasard.
        </p>
      </div>

      {/* Client Component */}
      <ABTestCalculatorClient />
    </>
  );
}
