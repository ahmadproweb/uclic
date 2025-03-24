import { Metadata } from 'next'
import { getLegalPages } from '@/services/wordpress'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { WordPressPage } from '@/types/wordpress'

export const metadata: Metadata = {
  title: 'Documents Légaux | Uclic',
  description: 'Documents légaux et conditions générales de Uclic',
}

export default async function LegalPages() {
  const pages = await getLegalPages()
  
  return (
    <section className="w-full max-w-[100vw] relative overflow-hidden pt-28 pb-16 md:pt-32 md:pb-20">
      {/* Base Background */}
      <div className="absolute inset-0 z-0 bg-white dark:bg-black" />

      <div className="max-w-[900px] mx-auto px-4 md:px-6 relative z-10">
        {/* Navigation row */}
        <div className="flex justify-between items-center mb-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm mb-8">
            <Link 
              href="/" 
              className="text-gray-600 dark:text-white/60 hover:text-[#E0FF5C] transition-colors"
            >
              Accueil
            </Link>
            <span className="text-gray-400 dark:text-white/40">/</span>
            <span className="text-gray-900 dark:text-white">Documents Légaux</span>
          </div>

          {/* Back button */}
          <Link 
            href="/" 
            className="inline-flex items-center text-sm hover:underline text-black/70 hover:text-black dark:text-white/80 dark:hover:text-white transition-all"
          >
            <svg className="w-4 h-4 mr-2 transform rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Retour à l'accueil
          </Link>
        </div>

        {/* Page header */}
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-12 text-gray-900 dark:text-white">
            Documents Légaux
          </h1>
        </header>

        {/* Grid of legal documents */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link 
            href="/legal/rgpd" 
            className="group p-6 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors relative overflow-hidden"
          >
            <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-[#E0FF5C] dark:group-hover:text-[#E0FF5C] transition-colors">
              RGPD
            </h2>
            <p className="text-gray-700 dark:text-gray-300 line-clamp-2">
              Chez Uclic.fr, la protection des données personnelles de nos utilisateurs est une priorité absolue. Nous nous...
            </p>
          </Link>

          <Link 
            href="/legal/conditions-generales-de-vente" 
            className="group p-6 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors relative overflow-hidden"
          >
            <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-[#E0FF5C] dark:group-hover:text-[#E0FF5C] transition-colors">
              Conditions Générales de Vente
            </h2>
            <p className="text-gray-700 dark:text-gray-300 line-clamp-2">
              Article 1 : Objet Les présentes Conditions Générales de Vente (CGV) définissent les termes et conditions selo...
            </p>
          </Link>

          <Link 
            href="/legal/mentions-legales" 
            className="group p-6 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors relative overflow-hidden"
          >
            <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-[#E0FF5C] dark:group-hover:text-[#E0FF5C] transition-colors">
              Mentions légales
            </h2>
            <p className="text-gray-700 dark:text-gray-300 line-clamp-2">
              Mentions Légales Éditeur du site Nom commercial : UCLICEntreprise individuelle : DELCROS...
            </p>
          </Link>
        </div>

        {(!pages || pages.length === 0) && (
          <div className="text-center py-12">
            <p className="text-black/70 dark:text-white/70">
              Aucun document légal n'est disponible pour le moment.
            </p>
          </div>
        )}
      </div>
    </section>
  )
} 