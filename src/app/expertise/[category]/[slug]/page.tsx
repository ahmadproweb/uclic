import AndMoreService from "@/components/pages/home/andmoreservice/andmoreservice";
import Blog from "@/components/pages/home/blog/blog";
import CaseStudyWrapper from "@/components/pages/home/casestudy";
import Partners from "@/components/pages/home/partner/partner";
import TeamSection from "@/components/pages/home/team/team-section";
import Testimonials from "@/components/pages/home/testimonials/testimonials";
import { cn } from "@/lib/utils";
import { getExpertise, getExpertisePostsByCategory } from "@/lib/wordpress";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import ExpertiseBenefits from "./ExpertiseBenefits";
import ExpertiseMarquee from "./ExpertiseMarquee";
import FAQExpertise from "./FAQExpertise";
import HeroExpertise from "./HeroExpertise";
import ProcessExpertise from "./ProcessExpertise";

interface ExpertisePageProps {
  params: {
    category: string;
    slug: string;
  };
}

export async function generateMetadata(
  { params }: ExpertisePageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const previousMetadata = await parent;
  const category = await Promise.resolve(params?.category);
  const slug = await Promise.resolve(params?.slug);
  if (!category || !slug) return notFound();

  const expertise = await getExpertise(slug);
  if (!expertise) return notFound();

  const expertiseCategory =
    expertise.expertiseGrowthCategories?.nodes?.[0]?.slug;
  if (expertiseCategory !== category) return notFound();

  return {
    ...previousMetadata,
    title:
      (expertise.expertiseFields?.metaTitle || expertise.title) +
      " | Agence Growth",
    description:
      expertise.expertiseFields?.metaDescription ||
      expertise.expertiseFields?.subtitle ||
      "Découvrez nos expertises en création de site web, branding, et développement digital.",
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
  };
}

export default async function ExpertisePage({ params }: ExpertisePageProps) {
  const category = await Promise.resolve(params?.category);
  const slug = await Promise.resolve(params?.slug);
  if (!category || !slug) return notFound();

  const expertise = await getExpertise(slug);
  if (!expertise) return notFound();

  const expertiseCategory =
    expertise.expertiseGrowthCategories?.nodes?.[0]?.slug;
  if (expertiseCategory !== category) return notFound();

  // Récupérer les expertises de la même catégorie
  const relatedExpertises = await getExpertisePostsByCategory(category);

  // Transformer les expertises en format pour le marquee
  const marqueeItems = relatedExpertises
    .filter(
      (exp) => exp.slug !== slug && exp.title && exp.expertiseFields?.subtitle
    ) // Exclure l'expertise actuelle et vérifier les champs requis
    .map((exp) => ({
      text: exp.title,
      href: `/expertise/${category}/${exp.slug}`,
      description: exp.expertiseFields.subtitle || exp.title, // Fallback au titre si pas de sous-titre
    }));

  // S'assurer qu'il y a au moins un élément
  if (marqueeItems.length === 0) {
    console.log("No related expertises found for marquee");
    return (
      <main className="flex flex-col">
        <HeroExpertise expertise={expertise} />
        <Partners />
        <ExpertiseBenefits {...expertise.expertiseFields} />
        <AndMoreService>
          <Suspense
            fallback={
              <div className="w-full h-[400px] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            }
          >
            <TeamSection />
          </Suspense>
        </AndMoreService>
        <section
          className={cn(
            "w-full relative py-8 md:py-16",
            "bg-[#f4f4f0] dark:bg-black/95"
          )}
        >
          <div className="max-w-[1250px] mx-auto px-4">
            <div className="text-center">
              <h2
                className={cn(
                  "text-3xl sm:text-4xl md:text-5xl lg:text-[50px]",
                  "font-medium tracking-[-1px]",
                  "text-black/90 dark:text-white/90",
                  "leading-[1.1]",
                  "mb-8 md:mb-16"
                )}
              >
                {expertise.expertiseFields?.h22}
              </h2>

              <div className="max-w-[800px] mx-auto">
                <p
                  className={cn(
                    "text-base md:text-lg",
                    "leading-relaxed",
                    "text-black/70 dark:text-white/70",
                    "whitespace-pre-line"
                  )}
                >
                  {expertise.expertiseFields?.content2}
                </p>
              </div>
            </div>
          </div>
        </section>
        <ProcessExpertise expertiseFields={expertise.expertiseFields} />
        <CaseStudyWrapper />
        <Testimonials />
        <FAQExpertise expertiseFields={expertise.expertiseFields} />
        <Blog />
      </main>
    );
  }

  return (
    <main className="flex flex-col">
      <HeroExpertise expertise={expertise} />
      <Partners />
      <ExpertiseBenefits {...expertise.expertiseFields} />
      <ExpertiseMarquee words={marqueeItems} />

      <AndMoreService>
        <Suspense
          fallback={
            <div className="w-full h-[400px] flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          }
        >
          <TeamSection />
        </Suspense>
      </AndMoreService>
      <section
        className={cn(
          "w-full relative py-8 md:py-16",
          "bg-[#f4f4f0] dark:bg-black/95"
        )}
      >
        <div className="max-w-[1250px] mx-auto px-4">
          <div className="text-center">
            <h2
              className={cn(
                "text-3xl sm:text-4xl md:text-5xl lg:text-[50px]",
                "font-medium tracking-[-1px]",
                "text-black/90 dark:text-white/90",
                "leading-[1.1]",
                "mb-8 md:mb-16"
              )}
            >
              {expertise.expertiseFields?.h22}
            </h2>

            <div className="max-w-[800px] mx-auto">
              <p
                className={cn(
                  "text-base md:text-lg",
                  "leading-relaxed",
                  "text-black/70 dark:text-white/70",
                  "whitespace-pre-line"
                )}
              >
                {expertise.expertiseFields?.content2}
              </p>
            </div>
          </div>
        </div>
      </section>
      <ProcessExpertise expertiseFields={expertise.expertiseFields} />
      <CaseStudyWrapper />
      <Testimonials />
      <FAQExpertise expertiseFields={expertise.expertiseFields} />
      <Blog />
    </main>
  );
}
