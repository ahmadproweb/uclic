interface Service {
  icon: string;
  title: string;
  text: string;
  description: string;
  keywords: string[];
  badges?: string[];
}

export const serviceData: Service[] = [
  {
    icon: "ri-crosshair-line",
    title: "Acquisition: outbound 24/7 + inbound rentable",
    text: "Quand un prospect montre un signal d’intention (visite pricing, job change, install), la machine part: triggers, scoring, messages ultra‑pertinents. En parallèle, nous captons la demande avec un SEO/SEA orienté revenu et des landing pages qui convertissent.",
    description: "Automatisation de l’outbound (intent data, triggers, scoring, séquences sales) + inbound SEO/SEA. Pipeline prévisible, coût d’acquisition en baisse et meilleure qualité de leads.",
    keywords: [
      "outbound automation",
      "intent data",
      "trigger",
      "scoring",
      "sales sequence",
      "SEO",
      "SEA",
      "landing page",
      "lead gen",
      "pipeline",
      "CAC"
    ],
    badges: ["+35% MQL", "-22% CAC", "Intent signals"]
  },
  {
    icon: "ri-flashlight-line",
    title: "Activation: onboarding, UX, séquences qui convertissent",
    text: "On raconte la valeur, pas les features. Onboarding clair, tutoriels qui guident, emails d’activation copywrités (JTBD). Nous instrumentons les funnels, supprimons les frictions et shippons les features qui font passer à l’action.",
    description: "Product‑led growth data‑driven: recherche utilisateur, optimisation de l’onboarding et de l’UX, séquences multicanales d’activation, priorisation de features utiles. Taux d’activation en nette hausse.",
    keywords: [
      "product led growth",
      "onboarding",
      "activation rate",
      "JTBD",
      "UX",
      "funnels",
      "email activation",
      "feature prioritization",
      "conversion",
      "research"
    ],
    badges: ["+18% activation", "-28% time‑to‑value", "JTBD emails"]
  },
  {
    icon: "ri-heart-line",
    title: "Rétention: cohorte, anti‑churn, expansion MRR",
    text: "Garder, regagner, étendre. Nous lisons vos cohortes, détectons l’attrition avant qu’elle n’arrive (health scores, signaux d’usage), déployons des playbooks de rétention, de win‑back et d’upsell/cross‑sell.",
    description: "Cohorte & lifecycle marketing: détection d’attrition, campagnes de rétention/win‑back personnalisées, expansion par offres d’upgrade. Voix du client pour nourrir la roadmap. MRR durablement en hausse.",
    keywords: [
      "retention",
      "churn reduction",
      "cohorts",
      "health score",
      "win back",
      "upsell",
      "cross sell",
      "expansion",
      "MRR",
      "voice of customer"
    ],
    badges: ["-17% churn", "+12% NRR", "Cohorts"]
  }
]; 