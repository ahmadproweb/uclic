import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { getAuthor } from '@/lib/wordpress';
import AuthorPage from '@/components/pages/blog/AuthorPage';

interface PageProps {
  params: {
    slug: string;
  };
}

// Mapping of old slugs to new slugs
const SLUG_REDIRECTS = {
  'wladimir-delcros': 'admin'
};

// Generate metadata for the page
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const slug = await Promise.resolve(params.slug);
  
  // Check if we need to redirect
  const redirectSlug = SLUG_REDIRECTS[slug as keyof typeof SLUG_REDIRECTS];
  const finalSlug = redirectSlug || slug;
  
  const author = await getAuthor(finalSlug);

  if (!author) {
    return {
      title: 'Auteur non trouvé - Blog UCLIC',
      description: 'L\'auteur que vous recherchez n\'existe pas.'
    };
  }

  return {
    title: `${author.name} - Blog UCLIC`,
    description: author.description || `Articles de ${author.name} sur le blog UCLIC`
  };
}

// Main page component
export default async function Page({ params }: PageProps) {
  const slug = await Promise.resolve(params.slug);
  
  // Check if we need to redirect
  const redirectSlug = SLUG_REDIRECTS[slug as keyof typeof SLUG_REDIRECTS];
  if (redirectSlug) {
    redirect(`/blog/author/${redirectSlug}`);
  }
  
  const author = await getAuthor(slug);

  if (!author) {
    notFound();
  }

  return <AuthorPage author={author} />;
} 