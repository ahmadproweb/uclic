import AuditContent from "@/components/pages/audit/AuditContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Audit Growth & Sales | Diagnostic Performance Marketing",
  description:
    "Audit complet de votre stratégie Growth Marketing et Sales. Analysez vos processus commerciaux, CRM et marketing pour identifier les leviers de croissance.",
  alternates: {
    canonical: "https://uclic.fr/audit",
  },
  openGraph: {
    title: "Audit Growth & Sales | Diagnostic Performance Marketing",
    description:
      "Audit complet de votre stratégie Growth Marketing et Sales. Analysez vos processus commerciaux, CRM et marketing pour identifier les leviers de croissance.",
    url: "https://uclic.fr/audit",
    type: "website",
    locale: "fr_FR",
    siteName: "Uclic",
  },
  twitter: {
    card: "summary_large_image",
    title: "Audit Growth & Sales | Diagnostic Performance Marketing",
    description:
      "Audit complet de votre stratégie Growth Marketing et Sales. Analysez vos processus commerciaux, CRM et marketing pour identifier les leviers de croissance.",
    site: "@uclic_fr",
  },
};

export default function AuditPage() {
  return (
    <main className="w-full">
      <AuditContent />
    </main>
  );
}
