'use client';

import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export default function Pagination({ 
  currentPage, 
  totalPages, 
  onPageChange,
  className 
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

  return (
    <div className={cn("flex justify-center items-center space-x-2", className)}>
      {/* Previous page button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center transition-all",
          isDark ? "text-white hover:bg-white/10" : "text-black hover:bg-black/10",
          currentPage === 1 && "opacity-50 cursor-not-allowed"
        )}
        aria-label="Page précédente"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      
      {/* Page numbers */}
      {getPageNumbers().map((pageNumber, index) => (
        pageNumber === '...' ? (
          <span 
            key={`ellipsis-${index}`}
            className={cn(
              "w-10 h-10 flex items-center justify-center",
              isDark ? "text-white" : "text-black"
            )}
          >
            ...
          </span>
        ) : (
          <button
            key={`page-${pageNumber}`}
            onClick={() => onPageChange(Number(pageNumber))}
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center transition-all",
              Number(pageNumber) === currentPage 
                ? "bg-[#E0FF5C] text-black font-medium" 
                : isDark 
                  ? "text-white hover:bg-white/10" 
                  : "text-black hover:bg-black/10"
            )}
            aria-label={`Page ${pageNumber}`}
            aria-current={Number(pageNumber) === currentPage ? "page" : undefined}
          >
            {pageNumber}
          </button>
        )
      ))}
      
      {/* Next page button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center transition-all",
          isDark ? "text-white hover:bg-white/10" : "text-black hover:bg-black/10",
          currentPage === totalPages && "opacity-50 cursor-not-allowed"
        )}
        aria-label="Page suivante"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
} 