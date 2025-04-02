interface Service {
  icon: string;
  title: string;
  text: string;
  description: string;
  keywords: string[];
}

export const serviceData: Service[] = [
  {
    icon: "ri-team-line",
    title: "Des talents d'élite à chaque mission",
    text: "Nous ne laissons rien au hasard. Chaque expert, freelance ou équipe est rigoureusement sélectionné(e) et validé(e) pour répondre à vos besoins précis. Nous combinons notre expertise avec une technologie qui assemble l'équipe parfaite pour chaque mission.",
    description: "Sélection rigoureuse d'experts et d'équipes pour vos projets. Expertise technique et méthodologique garantie.",
    keywords: ["expert", "freelance", "équipe", "sélection", "expertise", "technologie"]
  },
  {
    icon: "ri-focus-3-line",
    title: "Des solutions sur mesure, zéro compromis",
    text: "Nos experts prennent le temps d'écouter votre vision, d'analyser vos objectifs et de comprendre votre équipe existante. Ensuite, nous élaborons un plan stratégique personnalisé et choisissons les talents adéquats pour exécuter avec précision, efficacité et résultats.",
    description: "Solutions personnalisées adaptées à vos besoins spécifiques. Stratégie sur mesure et exécution précise.",
    keywords: ["personnalisation", "stratégie", "expertise", "efficacité", "résultats"]
  },
  {
    icon: "ri-flashlight-line",
    title: "Une flexibilité taillée pour vos ambitions",
    text: "Nous vous proposons les talents qu'il vous faut en 48 heures. Grâce à nos processus optimisés, nous intégrons rapidement des experts à votre équipe, en assurant une montée en puissance rapide et efficace.",
    description: "Intégration rapide d'experts en 48h. Processus optimisé pour une montée en puissance efficace.",
    keywords: ["rapidité", "flexibilité", "intégration", "efficacité", "processus"]
  }
]; 