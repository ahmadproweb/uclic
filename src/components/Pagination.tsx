import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export default function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  // Fonction pour générer l'URL SEO-friendly
  const getPageUrl = (page: number) => {
    if (page === 1) return basePath;
    return `${basePath}/page/${page}`;
  };
  
  // Fonction pour générer les numéros de page à afficher
  const getPageNumbers = () => {
    const pages = [];
    
    // Toujours afficher la première page
    pages.push(1);
    
    // Afficher les pages autour de la page courante
    if (currentPage <= 3) {
      // Si on est proche du début, afficher les premières pages
      for (let i = 2; i <= 4; i++) {
        if (i < totalPages) pages.push(i);
      }
    } else if (currentPage >= totalPages - 2) {
      // Si on est proche de la fin, afficher les dernières pages
      for (let i = totalPages - 3; i < totalPages; i++) {
        if (i > 1) pages.push(i);
      }
    } else {
      // Sinon, afficher la page courante et ses voisines
      pages.push(currentPage - 1);
      pages.push(currentPage);
      pages.push(currentPage + 1);
    }
    
    // Toujours afficher la dernière page si différente de la première
    if (totalPages > 1 && !pages.includes(totalPages)) {
      pages.push(totalPages);
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();
  const showEllipsis = totalPages > 5 && (currentPage > 3 || currentPage < totalPages - 2);

  return (
    <div 
      className="flex justify-center items-center space-x-2"
      role="navigation"
      aria-label="Pagination"
    >
      {/* Previous Page */}
      {currentPage > 1 ? (
        <Link
          href={getPageUrl(currentPage - 1)}
          className="w-10 h-10 rounded-full flex items-center justify-center transition-all text-white hover:bg-white/10"
          aria-label="Page précédente"
          rel="prev"
        >
          <ChevronLeft className="w-5 h-5" />
        </Link>
      ) : (
        <span 
          className="w-10 h-10 rounded-full flex items-center justify-center opacity-50 text-white"
          aria-disabled="true"
        >
          <ChevronLeft className="w-5 h-5" />
        </span>
      )}

      {/* Page Numbers */}
      {pageNumbers.map((page, index) => {
        const isCurrentPage = page === currentPage;
        const showEllipsisBefore = index === 1 && page > 2;
        const showEllipsisAfter = index === pageNumbers.length - 2 && page < totalPages - 1;

        return (
          <span key={page}>
            {showEllipsisBefore && <span className="w-10 h-10 flex items-center justify-center text-white">...</span>}
            <Link
              href={getPageUrl(page)}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                isCurrentPage
                  ? 'bg-[#E0FF5C] text-black font-medium'
                  : 'text-white hover:bg-white/10'
              }`}
              aria-label={`Page ${page}`}
              aria-current={isCurrentPage ? 'page' : undefined}
            >
              {page}
            </Link>
            {showEllipsisAfter && <span className="w-10 h-10 flex items-center justify-center text-white">...</span>}
          </span>
        );
      })}

      {/* Next Page */}
      {currentPage < totalPages ? (
        <Link
          href={getPageUrl(currentPage + 1)}
          className="w-10 h-10 rounded-full flex items-center justify-center transition-all text-white hover:bg-white/10"
          aria-label="Page suivante"
          rel="next"
        >
          <ChevronRight className="w-5 h-5" />
        </Link>
      ) : (
        <span 
          className="w-10 h-10 rounded-full flex items-center justify-center opacity-50 text-white"
          aria-disabled="true"
        >
          <ChevronRight className="w-5 h-5" />
        </span>
      )}
    </div>
  );
} 