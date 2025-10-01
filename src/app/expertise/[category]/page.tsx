import AndMoreService from "@/components/pages/home/andmoreservice/andmoreservice";
import Blog from "@/components/pages/home/blog/blog";
import CaseStudyWrapper from "@/components/pages/home/casestudy";
import Partners from "@/components/pages/home/partner/partner";
import ExpertisePartners from "./ExpertisePartners";
import TeamSection from "@/components/pages/home/team/team-section";
import Testimonials from "@/components/pages/home/testimonials/testimonials";
import { cn } from "@/lib/utils";
import {
  getExpertiseCategory,
  getExpertisePostsByCategory,
} from "@/lib/wordpress";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import ExpertiseBenefits from "./ExpertiseBenefits";
import ExpertiseMarquee from "./ExpertiseMarquee";
import FAQExpertise from "./FAQExpertise";
import HeroExpertise from "./HeroExpertise";
import ProcessExpertise from "./ProcessExpertise";
import SectionWithBackground from "./SectionWithBackground";

function formatFr(input: string | undefined): string {
  if (!input) return "";
  return input
    .replace(/\s([;:!?])/g, "\u00A0$1")
    .replace(/ \?/g, "\u00A0?");
}

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export async function generateMetadata(
  props: CategoryPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const params = await props.params;
  const category = params?.category;
  if (!category) return notFound();

  const categoryData = await getExpertiseCategory(category);
  if (!categoryData) return notFound();

  return {
    title:
      categoryData.expertiseFields.metaTitle ||
      `${categoryData.name} | Agence Growth`,
    description:
      categoryData.expertiseFields.metaDescription ||
      `Découvrez nos expertises en ${categoryData.name}. Services de création de site web, branding, et développement digital.`,
  };
}

export default async function CategoryPage(props: CategoryPageProps) {
  const params = await props.params;
  const category = params?.category;
  console.log("🔍 Category slug:", category);

  if (!category) {
    console.error("❌ No category slug provided");
    return notFound();
  }

  try {
    const [categoryData, posts] = await Promise.all([
      getExpertiseCategory(category),
      getExpertisePostsByCategory(category),
    ]);

    console.log("📦 Category data:", categoryData);
    console.log("📦 Posts:", posts);

    if (!categoryData) {
      console.error("❌ No category data found");
      return notFound();
    }

    if (!posts || posts.length === 0) {
      console.error("❌ No posts found for category");
      return notFound();
    }

    // Transformer les posts en format pour le marquee
    const marqueeItems = posts.map((post) => ({
      text: post.title,
      href: `/expertise/${category}/${post.slug}`,
      description: post.expertiseFields?.subtitle || post.title,
    }));

    const formattedH22 = formatFr(categoryData.expertiseFields.h22);
    const formattedContent2 = formatFr(categoryData.expertiseFields.content2);

    return (
      <main className="flex flex-col">
        <HeroExpertise
          categoryName={categoryData.name}
          expertiseFields={categoryData.expertiseFields}
        />
        <Partners />
        <ExpertiseBenefits {...categoryData.expertiseFields} />
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

        <ExpertisePartners 
          title={categoryData.expertiseFields.h22}
          subtitle={categoryData.expertiseFields.content2}
        />
        <ProcessExpertise expertiseFields={categoryData.expertiseFields} />
        <CaseStudyWrapper />
        <Testimonials />
        <FAQExpertise expertiseFields={categoryData.expertiseFields} />
        <Blog />
      </main>
    );
  } catch (error) {
    console.error("🚨 Error in CategoryPage:", error);
    return notFound();
  }
}
