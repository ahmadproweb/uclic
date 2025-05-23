import { getLegalPages } from "@/services/wordpress";
import { Metadata } from "next";
import LegalPagesClient from "./LegalPagesClient";

export const metadata: Metadata = {
  title: "Documents Légaux",
  description: "Documents légaux et conditions générales de Uclic",
  alternates: {
    canonical: "https://www.uclic.fr/legal",
  },
  openGraph: {
    title: "Documents Légaux",
    description: "Documents légaux et conditions générales de Uclic",
    url: "https://www.uclic.fr/legal",
    type: "website",
    locale: "fr_FR",
    siteName: "Uclic",
  },
  twitter: {
    card: "summary_large_image",
    title: "Documents Légaux",
    description: "Documents légaux et conditions générales de Uclic",
    site: "@uclic_fr",
  },
};

export default async function LegalPages() {
  const pages = await getLegalPages();

  return <LegalPagesClient />;
}
