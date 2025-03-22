import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { CTAButton } from "@/components/ui/cta-button";

          <div className="flex items-center gap-4">
            <Link 
              href="/audit" 
              className={cn(
                "text-sm font-medium transition-colors",
                "text-black/80 hover:text-black",
                "dark:text-[#F5F5F1]/80 dark:hover:text-[#F5F5F1]"
              )}
            >
              Audit
            </Link>
            <CTAButton href="/audit" className="hidden sm:inline-flex">
              Audit
            </CTAButton>
          </div> 