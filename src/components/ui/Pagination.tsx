'use client';

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import { ChevronLeft, ChevronRight } from 'lucide-react';

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

  // Fonction pour générer l'URL SEO-friendly
  const getPageUrl = (page: number) => {
    if (page === 1) return basePath;
    return `${basePath}/page/${page}`;
  };

  // Fonction pour générer les numéros de page à afficher
  const getPageNumbers = () => {
    const pages = [];
    
    if (totalPages <= 7) {
      // Si moins de 7 pages, afficher toutes les pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Toujours afficher la première page
      pages.push(1);
      
      if (currentPage <= 4) {
        // Proche du début
        for (let i = 2; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        // Proche de la fin
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Au milieu
        pages.push('...');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('...');
        pages.push(totalPages);
      }
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
      {currentPage > 1 ? (
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
      ) : (
        <span 
          className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center opacity-50",
            isDark ? "text-white" : "text-black"
          )}
          aria-disabled="true"
        >
          <ChevronLeft className="w-5 h-5" />
        </span>
      )}

      {/* Page Numbers */}
      {pageNumbers.map((page, index) => {
        if (page === '...') {
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
      {currentPage < totalPages ? (
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
      ) : (
        <span 
          className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center opacity-50",
            isDark ? "text-white" : "text-black"
          )}
          aria-disabled="true"
        >
          <ChevronRight className="w-5 h-5" />
        </span>
      )}
    </div>
  );
} 