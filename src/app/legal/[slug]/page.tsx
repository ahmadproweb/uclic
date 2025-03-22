import { Metadata } from 'next'
import { getLegalPages } from '@/services/wordpress'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { WordPressPage } from '@/types/wordpress'

type Props = {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const pages = await getLegalPages()
  const page = pages.find(p => p.slug === params.slug)
  
  if (!page) {
    return {
      title: 'Page non trouvée | Uclic'
    }
  }

  return {
    title: `${page.title} | Uclic`,
    description: page.content ? page.content.replace(/<[^>]*>/g, '').slice(0, 155) : undefined
  }
}

export default async function LegalPage({ params }: Props) {
  const pages = await getLegalPages()
  const page = pages.find((p: WordPressPage) => p.slug === params.slug)
  
  if (!page) {
    notFound()
  }

  return (
    <section className="w-full max-w-[100vw] relative overflow-hidden pt-28 pb-16 md:pt-32 md:pb-20">
      {/* Base Background */}
      <div className="absolute inset-0 z-0 bg-white dark:bg-black" />

      <div className="max-w-[900px] mx-auto px-4 md:px-6 relative z-10">
        {/* Navigation row */}
        <div className="flex justify-between items-center mb-10">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-xs text-black/50 dark:text-white/50">
            <Link href="/" className="hover:underline">Accueil</Link>
            <span>/</span>
            <Link href="/legal" className="hover:underline">Documents Légaux</Link>
            <span>/</span>
            <span>{page.title}</span>
          </nav>
          
          <Link 
            href="/legal"
            className="inline-flex items-center text-sm hover:underline text-black/70 hover:text-black dark:text-white/80 dark:hover:text-white transition-all"
          >
            <svg className="w-4 h-4 mr-2 transform rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Retour aux documents légaux
          </Link>
        </div>

        {/* Content */}
        <article
          className={cn(
            "prose max-w-none",
            "text-black dark:text-white",
            "[&>h1]:text-4xl [&>h1]:md:text-5xl [&>h1]:font-bold [&>h1]:mb-8",
            "[&>h2]:text-2xl [&>h2]:md:text-3xl [&>h2]:font-semibold [&>h2]:mt-12 [&>h2]:mb-4",
            "[&>h3]:text-xl [&>h3]:md:text-2xl [&>h3]:font-medium [&>h3]:mt-8 [&>h3]:mb-4",
            "[&>p]:text-base [&>p]:md:text-lg [&>p]:leading-relaxed [&>p]:mb-4 [&>p]:text-black/80 [&>p]:dark:text-white/90",
            "[&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-4",
            "[&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-4",
            "[&>li]:mb-2 [&>li]:text-black/80 [&>li]:dark:text-white/90",
            "[&>a]:text-[#97BE11] [&>a]:dark:text-[#DAFF47] [&>a]:underline"
          )}
          dangerouslySetInnerHTML={{ 
            __html: page.content
          }} 
        />
      </div>
    </section>
  )
} 