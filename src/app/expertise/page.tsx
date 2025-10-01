import { getExpertiseCategories } from "@/lib/wordpress";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Expertise Growth Marketing & Sales | Agence Growth",
  description:
    "Découvrez nos expertises en Growth Marketing, Sales Ops et Product Marketing. Notre agence d'experts certifiés optimise votre croissance et vos processus commerciaux.",
  alternates: {
    canonical: "https://www.uclic.fr/expertise",
  },
  openGraph: {
    title: "Expertise Growth Marketing & Sales | Agence Growth",
    description:
      "Découvrez nos expertises en Growth Marketing, Sales Ops et Product Marketing. Notre agence d'experts certifiés optimise votre croissance et vos processus commerciaux.",
    url: "https://www.uclic.fr/expertise",
    type: "website",
    locale: "fr_FR",
    siteName: "Uclic",
  },
  twitter: {
    card: "summary_large_image",
    title: "Expertise Growth Marketing & Sales | Agence Growth",
    description:
      "Découvrez nos expertises en Growth Marketing, Sales Ops et Product Marketing. Notre agence d'experts certifiés optimise votre croissance et vos processus commerciaux.",
    site: "@uclic_fr",
  },
};

export default async function ExpertisePage() {
  const categories = await getExpertiseCategories();

  return (
    <section className="w-full max-w-[100vw] pt-28 md:pt-32 pb-16 md:pb-24 relative overflow-hidden bg-gray-50 dark:bg-black">
      {/* Base Background gradient */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-white to-[#E0FF5C] dark:from-black dark:to-[#E0FF5C]" />

      {/* Grain effect overlay */}
      <div
        className="absolute inset-0 z-0 mix-blend-soft-light opacity-50 dark:opacity-30"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.8'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "100px 100px",
        }}
      />

      {/* New overlay gradient - adaptive to dark/light mode */}
      <div className="absolute bottom-0 left-0 right-0 z-[1] h-[25%] bg-gradient-to-t from-gray-50 via-gray-50 to-transparent dark:from-black dark:via-black dark:to-transparent" />

      <div className="max-w-[1250px] mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="text-base mb-4 block font-semibold text-gray-900 dark:text-[#E0FF5C]">
            Expertises
          </span>
          <h1 className="text-3xl md:text-5xl font-normal mb-4 text-gray-900 dark:text-white">
            Découvrez nos domaines
            <br />
            d&apos;expertise
          </h1>
          <div className="w-12 h-0.5 mx-auto mb-4 bg-gray-900 dark:bg-[#E0FF5C]" />
          <p className="text-base md:text-lg text-gray-700 dark:text-gray-300">
            Explorez nos solutions innovantes et notre
            <br />
            savoir-faire technologique
          </p>
        </div>

        {/* Expert Section */}
        <div className="mb-16 md:mb-24 bg-white dark:bg-black/40 rounded-3xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-900 dark:text-white">
                Experts Certifiés en
                <br />
                <span className="text-[#E0FF5C] dark:text-[#E0FF5C]">
                  Growth Marketing & Sales
                </span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Notre équipe d'experts combine expertise technique
                et vision stratégique pour maximiser votre croissance. Certifiés
                par les plus grands acteurs du marché, ils maîtrisent les
                derniers outils et méthodologies du Growth Marketing.
              </p>
              <ul className="space-y-3">
                {[
                  "Growth Marketing & Automation",
                  "Sales Operations & CRM",
                  "Product Marketing & Analytics",
                  "Performance Marketing & Paid Acquisition",
                  "Marketing Automation & Lead Generation",
                ].map((skill, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 text-gray-700 dark:text-gray-300"
                  >
                    <svg
                      className="w-5 h-5 text-[#E0FF5C]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-[#E0FF5C] to-[#c7e052]">
                <div className="absolute inset-0 bg-gray-900/10 dark:bg-black/20" />
                {/* Vous pouvez ajouter une image ici si nécessaire */}
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white dark:bg-black/60 rounded-2xl p-6 shadow-xl">
                <div className="text-4xl font-bold text-[#E0FF5C] mb-2">
                  +50
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Experts
                  <br />
                  certifiés
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 md:mb-16">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/expertise/${category.slug}`}
              className="group rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl backdrop-blur-sm
                bg-white dark:bg-black/40 hover:bg-gray-50 dark:hover:bg-black/60"
            >
              <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-[#E0FF5C] to-[#c7e052] dark:from-[#E0FF5C] dark:to-[#c7e052]">
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent dark:from-black/90 dark:via-black/50" />
                <span className="absolute bottom-4 left-4 inline-block px-3 py-1 bg-gray-900 dark:bg-black text-[#E0FF5C] rounded-full text-sm z-20">
                  {category.count} expertises
                </span>
              </div>

              <div className="p-6 space-y-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-[#E0FF5C] dark:group-hover:text-[#E0FF5C] transition-colors">
                  {category.name}
                </h3>

                {category.description && (
                  <div className="text-gray-600 dark:text-gray-400 line-clamp-2">
                    {category.description}
                  </div>
                )}

                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <div className="w-6 h-6 rounded-full bg-gray-100 dark:bg-black/60 flex items-center justify-center">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  Voir les détails
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
