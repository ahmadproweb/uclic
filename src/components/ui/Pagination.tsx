'use client';

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
  basePath?: string;
  disabled?: boolean;
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
  const pathname = usePathname();
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  // Fonction pour générer l'URL SEO-friendly
  const getPageUrl = (page: number) => {
    const path = basePath || (pathname ? pathname.split('/page/')[0] : '/blog');
    if (page === 1) return path;
    return `${path}/page/${page}`;
  };

  // Fonction pour générer les numéros de page à afficher
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();

  const handlePageClick = (page: number) => {
    if (page !== currentPage && !disabled) {
      onPageChange(page);
    }
  };

  return (
    <div 
      className={cn(
        "flex justify-center items-center space-x-2",
        className,
        disabled && "opacity-50"
      )}
      role="navigation"
      aria-label="Pagination"
    >
      {/* Previous Page */}
      {!isFirstPage && (
        <Link
          href={getPageUrl(currentPage - 1)}
          onClick={(e) => {
            e.preventDefault();
            handlePageClick(currentPage - 1);
          }}
          className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center transition-all",
            isDark
              ? "text-white hover:bg-white/10"
              : "text-black hover:bg-black/10",
            disabled && "cursor-not-allowed"
          )}
          aria-label="Page précédente"
          rel="prev"
        >
          <ChevronLeft className="w-5 h-5" />
        </Link>
      )}

      {/* Page Numbers */}
      {pageNumbers.map((page, index) => {
        const isCurrentPage = page === currentPage;
        return (
          <Link
            key={page}
            href={getPageUrl(page as number)}
            onClick={(e) => {
              e.preventDefault();
              handlePageClick(page as number);
            }}
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center transition-all",
              isCurrentPage
                ? "bg-[#E0FF5C] text-black font-medium"
                : isDark
                  ? "text-white hover:bg-white/10"
                  : "text-black hover:bg-black/10",
              disabled && "cursor-not-allowed"
            )}
            aria-label={`Page ${page}`}
            aria-current={isCurrentPage ? "page" : undefined}
          >
            {page}
          </Link>
        );
      })}

      {/* Next Page */}
      {!isLastPage && (
        <Link
          href={getPageUrl(currentPage + 1)}
          onClick={(e) => {
            e.preventDefault();
            handlePageClick(currentPage + 1);
          }}
          className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center transition-all",
            isDark
              ? "text-white hover:bg-white/10"
              : "text-black hover:bg-black/10",
            disabled && "cursor-not-allowed"
          )}
          aria-label="Page suivante"
          rel="next"
        >
          <ChevronRight className="w-5 h-5" />
        </Link>
      )}
    </div>
  );
} 