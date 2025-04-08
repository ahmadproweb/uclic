'use client';

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
  basePath?: string; // For static links when JS is disabled
  disabled?: boolean; // Pour désactiver les boutons pendant le chargement
}

export default function Pagination({ 
  currentPage, 
  totalPages, 
  onPageChange,
  className,
  basePath = '/blog',
  disabled = false
}: PaginationProps) {
  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === 'dark';

  // Generate page numbers to display with ellipsis for large page counts
  const getPageNumbers = () => {
    const pageNumbers = [];
    
    if (totalPages <= 7) {
      // Show all pages if there are 7 or fewer
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always show first page
      pageNumbers.push(1);
      
      if (currentPage > 3) {
        // Add ellipsis if current page is far from start
        pageNumbers.push('...');
      }
      
      // Calculate range around current page
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
      
      if (currentPage < totalPages - 2) {
        // Add ellipsis if current page is far from end
        pageNumbers.push('...');
      }
      
      // Always show last page
      pageNumbers.push(totalPages);
    }
    
    return pageNumbers;
  };

  const handlePageClick = (pageNumber: number) => {
    if (pageNumber !== currentPage && !disabled) {
      onPageChange(pageNumber);
    }
  };

  // Client-side rendering: button version
  const renderPageButton = (pageNumber: number | string, index: number) => {
    if (pageNumber === '...') {
      return (
        <span 
          key={`ellipsis-${index}`}
          className={cn(
            "w-10 h-10 flex items-center justify-center",
            isDark ? "text-white" : "text-black"
          )}
        >
          ...
        </span>
      );
    }
    
    return (
      <button
        key={`page-${pageNumber}`}
        onClick={() => handlePageClick(Number(pageNumber))}
        disabled={disabled}
        className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center transition-all",
          Number(pageNumber) === currentPage 
            ? "bg-[#E0FF5C] text-black font-medium" 
            : isDark
              ? "text-white hover:bg-white/10"
              : "text-black hover:bg-black/10",
          disabled && "opacity-50 cursor-not-allowed"
        )}
        aria-label={`Page ${pageNumber}`}
        aria-current={Number(pageNumber) === currentPage ? "page" : undefined}
      >
        {pageNumber}
      </button>
    );
  };

  return (
    <div className={cn(
      "flex justify-center items-center space-x-2",
      className,
      disabled && "opacity-50"
    )}>
      {/* Previous page button */}
      {currentPage > 1 ? (
        <button
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={disabled}
          className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center transition-all",
            isDark
              ? "text-white hover:bg-white/10"
              : "text-black hover:bg-black/10",
            disabled && "cursor-not-allowed"
          )}
          aria-label="Page précédente"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      ) : (
        <span
          className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center opacity-50",
            isDark ? "text-white" : "text-black"
          )}
          aria-disabled="true"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      )}
      
      {/* Page numbers */}
      {getPageNumbers().map((pageNumber, index) => 
        renderPageButton(pageNumber, index)  
      )}
      
      {/* Next page button */}
      {currentPage < totalPages ? (
        <button
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={disabled}
          className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center transition-all",
            isDark
              ? "text-white hover:bg-white/10"
              : "text-black hover:bg-black/10",
            disabled && "cursor-not-allowed"
          )}
          aria-label="Page suivante"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      ) : (
        <span
          className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center opacity-50",
            isDark ? "text-white" : "text-black"
          )}
          aria-disabled="true"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      )}

      {/* Hidden noscript links for non-JS fallback */}
      <noscript>
        <div className="absolute bottom-0 left-0 w-full flex justify-center py-4 bg-white">
          <div className="flex gap-2">
            {currentPage > 1 && (
              <Link 
                href={`${basePath}?page=${currentPage - 1}`} 
                className="px-4 py-2 bg-[#E0FF5C] text-black rounded-lg"
              >
                Précédent
              </Link>
            )}
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <Link
                key={`nojs-page-${page}`}
                href={`${basePath}?page=${page}`}
                className={cn(
                  "px-4 py-2 rounded-lg",
                  page === currentPage 
                    ? "bg-[#E0FF5C] text-black font-medium" 
                    : "bg-gray-200 text-black hover:bg-gray-300"
                )}
              >
                {page}
              </Link>
            ))}
            
            {currentPage < totalPages && (
              <Link 
                href={`${basePath}?page=${currentPage + 1}`} 
                className="px-4 py-2 bg-[#E0FF5C] text-black rounded-lg"
              >
                Suivant
              </Link>
            )}
          </div>
        </div>
      </noscript>
    </div>
  );
} 