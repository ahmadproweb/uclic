import AuditContent from "@/components/pages/audit/AuditContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Audit Growth & Sales | Diagnostic Performance Marketing",
  description:
    "Audit complet de votre stratégie Growth Marketing et Sales. Analysez vos processus commerciaux, CRM et marketing pour identifier les leviers de croissance. Gratuit pour les 10 premiers.",
  keywords: [
    "audit marketing",
    "audit growth",
    "audit sales",
    "diagnostic performance",
    "stratégie marketing",
    "optimisation commerciale",
    "CRM audit",
    "marketing digital",
    "growth hacking",
    "automatisation marketing",
    "Uclic"
  ],
  authors: [{ name: "Uclic" }],
  creator: "Uclic",
  publisher: "Uclic",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Audit Growth & Sales | Diagnostic Performance Marketing",
    description:
      "Audit complet de votre stratégie Growth Marketing et Sales. Analysez vos processus commerciaux, CRM et marketing pour identifier les leviers de croissance. Gratuit pour les 10 premiers.",
    url: "https://uclic.fr/audit",
    type: "website",
    locale: "fr_FR",
    siteName: "Uclic",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Uclic - Audit Growth & Sales",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Audit Growth & Sales | Diagnostic Performance Marketing",
    description:
      "Audit complet de votre stratégie Growth Marketing et Sales. Analysez vos processus commerciaux, CRM et marketing pour identifier les leviers de croissance. Gratuit pour les 10 premiers.",
    creator: "@uclic_fr",
    site: "@uclic_fr",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Uclic - Audit Growth & Sales",
      },
    ],
  },
  alternates: {
    canonical: "https://uclic.fr/audit",
  },
};

export default function AuditPage() {
  return (
    <main className="w-full">
      <AuditContent />
    </main>
  );
}
