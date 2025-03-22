import { cn } from "@/lib/utils";
import HeroClient from './HeroClient';
import HeroAnimation from './HeroAnimation';
import { CTAButton } from "@/components/ui/cta-button";
import { UnderlinedText } from "@/components/ui/underlined-text";

export default function Hero() {
  return (
    <section className="relative w-full min-h-[calc(100vh-var(--header-height))] flex items-center justify-center overflow-hidden bg-[#F5F5F1] dark:bg-black pt-16 pb-20 sm:pb-0 sm:pt-20 md:pt-8 px-4 sm:px-6 lg:px-8">
      {/* Contenu principal */}
      <div className="relative z-10 w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-6 lg:gap-8 items-center mt-4 sm:mt-6 md:mt-0">
        {/* Colonne de gauche - Texte */}
        <div className="max-w-full lg:max-w-2xl text-left">
          <div className="inline-block px-4 py-1.5 bg-[#97BE11]/10 dark:bg-[#DAFF47]/10 rounded-full mb-4 mt-16">
            <span className="text-[#97BE11] dark:text-[#DAFF47] text-sm font-medium">Freelance Growth</span>
          </div>
          <h1 className={cn(
            "text-4xl sm:text-4xl md:text-5xl lg:text-[64px]",
            "font-semibold mb-4 sm:mb-6 leading-[1.1]",
            "text-[#000000] dark:text-[#F5F5F1]",
            "tracking-[-0.04em]",
            "text-rendering-optimizeLegibility"
          )}>
            <span className="block mb-0.5 text-[#000000] dark:text-[#F5F5F1]">Une vision 360°,</span>
            <span className="block mb-0.5 text-[#000000] dark:text-[#F5F5F1]">des actions là où</span>
            <span className="block text-[#000000] dark:text-[#F5F5F1]">
              l&apos;impact est{' '}
              <UnderlinedText text="maximal" />
            </span>
          </h1>

          <p className="text-base md:text-lg text-black/70 dark:text-white/70 mt-6 mb-8 md:mb-12 max-w-xl pr-4">
            Nous convertissons vos défis en leviers{' '}
            <br className="block md:hidden" />
            de croissance avec des stratégies{' '}
            <br className="block md:hidden" />
            data-driven, des outils IA avancés{' '}
            <br className="block md:hidden" />
            et les meilleurs freelances{' '}
            <br className="block md:hidden" />
            sélectionnés pour vos besoins.
          </p>

          <div className="flex flex-row gap-3">
            <CTAButton href="/audit" variant="mainCTA" size="l">
              Audit Gratuit
            </CTAButton>

            <CTAButton href="/contact" variant="simple" simpleVariant="secondary" size="l" className="px-4 [&>svg]:hidden md:[&>svg]:inline-flex [&>span]:hidden md:[&>span]:inline-flex">
              Nous Contacter
            </CTAButton>
          </div>
        </div>

        {/* Colonne de droite - Animation */}
        <div className="relative w-full lg:w-full lg:ml-[150px]">
          <div className="w-[500px] lg:w-[600px] mx-auto lg:mx-0 lg:ml-auto lg:mr-[150px]">
            <HeroAnimation />
          </div>
        </div>
      </div>

      {/* HeroClient pour les animations */}
      <HeroClient />
    </section>
  );
} 