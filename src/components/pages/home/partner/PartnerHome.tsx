"use client";

import Partners from "./partner";

// Duplicate minimal, textless partners section for Home only
export default function PartnerHome() {
  return (
    <div className="w-full relative overflow-hidden">
      <Partners noTopBorder hideText />
    </div>
  );
}


