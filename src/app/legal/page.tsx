import { getLegalPages } from "@/services/wordpress";
import { Metadata } from "next";
import LegalPagesClient from "./LegalPagesClient";

export const metadata: Metadata = {
  title: "Documents Légaux",
  description: "Documents légaux et conditions générales de Uclic",
};

export default async function LegalPages() {
  const pages = await getLegalPages();

  return <LegalPagesClient />;
}
