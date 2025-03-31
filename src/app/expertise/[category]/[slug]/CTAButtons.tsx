'use client';

import Link from "next/link";
import { cn } from "@/lib/utils";

export default function CTAButtons() {
  return (
    <div className="flex flex-row items-center gap-4">
      <Link 
        href="/audit"
        className={cn(
          "group flex items-center gap-2 px-8 py-4 rounded-full",
          "bg-white text-black hover:bg-[#E0FF5C] transition-colors duration-200",
          "text-base font-medium"
        )}
      >
        <span>Audit Gratuit</span>
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-200 group-hover:translate-x-1"
        >
          <path 
            d="M5 12H19M19 12L12 5M19 12L12 19" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </Link>

      <Link 
        href="/contact"
        className={cn(
          "group flex items-center gap-2 px-8 py-4 rounded-full",
          "border border-white text-white hover:bg-white/10",
          "transition-colors duration-200",
          "text-base font-medium"
        )}
      >
        <span>Nous Contacter</span>
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-200 group-hover:translate-x-1"
        >
          <path 
            d="M5 12H19M19 12L12 5M19 12L12 19" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </Link>
    </div>
  );
} 