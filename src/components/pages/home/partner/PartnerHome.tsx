"use client";

import { PartnerClient } from "./PartnerClient";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import Partners from "./partner";

// Duplicate minimal, textless partners section for Home only
export default function PartnerHome() {
  return (
    <div className="w-full relative overflow-hidden">
      {/* Reuse the same data/logic via Partners but hide its heading by overriding styles */}
      <style jsx global>{`
        /* Hide headings only within PartnerHome scope */
        .partner-home-scope h2, .partner-home-scope p { display: none !important; }
      `}</style>
      <div className="partner-home-scope">
        <Partners noTopBorder />
      </div>
    </div>
  );
}


