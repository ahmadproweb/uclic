"use client";

import PreFooter from "@/components/footer/PreFooter";
import Pagination from "@/components/ui/Pagination";
import { colors as theme } from "@/config/theme";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { PageInfo, ProductHunt } from "@/lib/wordpress";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ToolboxArchiveClientSideProps {
  tools: ProductHunt[];
  pageInfo: PageInfo;
  currentPage: number;
  totalCount: number;
  pageSize: number;
}

type ToolWithIdDate = ProductHunt & { id: string; date: string };

// Internal ToolCard component for this page
function ToolCard({ tool }: { tool: ToolWithIdDate }) {
  return (
    <Link
      href={`/toolbox/${tool.slug}`}
      className="group rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl backdrop-blur-sm p-6"
      style={{
        background: `linear-gradient(145deg, 
          #E0FF5C,
          #E0FF5C
        )`,
        boxShadow: `0 8px 32px -4px rgba(237 245 202, 0.25)`,
      }}
    >
      <div className="space-y-4">
        {/* Logo */}
        {tool.productHuntFields?.logo && (
          <div className="w-12 h-12 rounded-xl overflow-hidden bg-white/50 mb-4">
            <img
              src={tool.productHuntFields.logo}
              alt={`${tool.title} logo`}
              className="w-full h-full object-contain"
            />
          </div>
        )}

        {/* Title */}
        <h3 className="text-xl font-semibold text-black">{tool.title}</h3>

        {/* Tagline */}
        {tool.productHuntFields?.tagline && (
          <p className="text-sm text-black/70 line-clamp-2">
            {tool.productHuntFields.tagline}
          </p>
        )}

        {/* Date */}
        <div className="flex items-center gap-2 text-sm text-black/70">
          <div className="w-6 h-6 rounded-full bg-black/10 flex items-center justify-center">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          {new Date(tool.date).toLocaleDateString("fr-FR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>
    </Link>
  );
}

export default function ToolboxArchiveClientSide({
  tools,
  pageInfo,
  currentPage,
  totalCount,
  pageSize,
}: ToolboxArchiveClientSideProps) {
  // Patch tools to add id and date at the root for TS compatibility
  const patchedTools = tools.map((tool) => ({
    ...tool,
    id: (tool as any).id ?? tool.productHuntFields.id,
    date: (tool as any).date ?? tool.productHuntFields.day ?? "",
  }));

  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === "dark";
  const router = useRouter();

  // Calculate total pages based on total count and page size
  const totalPages = Math.max(
    Math.ceil(totalCount / pageSize),
    pageInfo.hasNextPage ? currentPage + 1 : currentPage // Ensure we show at least current page + 1 if there are more items
  );

  const handlePageChange = (page: number) => {
    router.push(`/toolbox?page=${page}`);
  };

  if (!patchedTools || patchedTools.length === 0) {
    return <div className="text-center py-20">Aucun outil trouvé.</div>;
  }

  return (
    <section className="w-full max-w-[100vw] pt-28 md:pt-32 pb-16 md:pb-24 relative overflow-hidden">
      {/* Base Background gradient */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: isDark
            ? `linear-gradient(180deg, ${theme.colors.common.black}, #E0FF5C)`
            : `linear-gradient(180deg, ${theme.colors.common.white}, #E0FF5C)`,
        }}
      />

      {/* Grain effect overlay */}
      <div
        className={cn(
          "absolute inset-0 z-0 mix-blend-soft-light",
          isDark ? "opacity-90" : "opacity-50"
        )}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.8'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "100px 100px",
        }}
      />

      {/* New overlay gradient - black to transparent */}
      <div
        className="absolute bottom-0 left-0 right-0 z-[1]"
        style={{
          background: isDark
            ? "linear-gradient(to top, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 1) 40%, rgba(0, 0, 0, 0) 100%)"
            : "linear-gradient(to top, rgb(243, 244, 246) 0%, rgba(243, 244, 246, 1) 40%, rgba(243, 244, 246, 0) 100%)",
          height: "25%",
        }}
      />

      <div className="max-w-[1250px] mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <span
            className={cn(
              "text-base mb-4 block font-semibold",
              isDark ? "text-[#E0FF5C]" : "text-black"
            )}
          >
            Toolbox
          </span>
          <h1
            className={cn(
              "text-3xl md:text-5xl font-normal mb-4",
              isDark ? "text-white" : "text-black"
            )}
          >
            Notre sélection d&apos;outils
            <br />
            pour votre croissance
          </h1>
          <div
            className={cn(
              "w-12 h-0.5 mx-auto mb-4",
              isDark ? "bg-[#E0FF5C]" : "bg-black"
            )}
          />
          <p
            className={cn(
              "text-base md:text-lg",
              isDark ? "text-white/100" : "text-black"
            )}
          >
            Découvrez les meilleurs outils pour développer
            <br />
            votre activité efficacement
          </p>
        </div>

        {/* Growth Hacking Tools Section */}
        <div className="mb-16">
          <h2
            className={cn(
              "text-2xl md:text-3xl font-bold mb-8 text-center",
              isDark ? "text-white" : "text-black"
            )}
          >
            Outils Growth Hacking
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Autres outils de Growth Hacking à ajouter ici */}
          </div>
        </div>

        {/* Tools grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 md:mb-16">
          {patchedTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>

        {/* Pagination - Always show if we have more than one page */}
        {totalPages > 1 && (
          <div className="mt-12 mb-16">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>

      <div className="max-w-[1250px] mx-auto px-4 relative z-10">
        <PreFooter noBgGradient />
      </div>
    </section>
  );
}
