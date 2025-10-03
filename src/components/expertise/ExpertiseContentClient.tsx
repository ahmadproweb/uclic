'use client';

import { cn } from '@/lib/utils';
import { cleanHtmlEntities } from '@/utils/string';

interface ExpertiseContentClientProps {
  content: string;
  className?: string;
}

export default function ExpertiseContentClient({ content, className }: ExpertiseContentClientProps) {
  const cleanedContent = cleanHtmlEntities(content);
  
  console.log("🔍 RENDERING CONTENT2 CLIENT:");
  console.log("Raw content:", content);
  console.log("Cleaned content:", cleanedContent);
  console.log("Content length:", content.length);
  console.log("Has HTML tags:", /<[^>]+>/.test(content));
  console.log("CSS class applied:", "wp-content-styles");
  
  return (
    <div
      className={cn(
        "wp-content-styles",
        "text-base md:text-lg",
        "leading-relaxed",
        "text-black/70 dark:text-white/70",
        "text-pretty",
        // Styles Tailwind pour le HTML WordPress
        "[&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mb-4 [&_h2]:mt-8 [&_h2]:text-black dark:[&_h2]:text-white",
        "[&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mb-3 [&_h3]:mt-6 [&_h3]:text-black dark:[&_h3]:text-white",
        "[&_p]:mb-4 [&_p]:leading-relaxed",
        "[&_ul]:mb-4 [&_ul]:pl-6",
        "[&_li]:mb-2 [&_li]:list-disc",
        "[&_strong]:font-semibold",
        "[&_a]:text-blue-600 dark:[&_a]:text-blue-400 [&_a]:underline [&_a]:hover:text-blue-800 dark:[&_a]:hover:text-blue-300",
        className
      )}
      dangerouslySetInnerHTML={{
        __html: cleanedContent
      }}
    />
  );
}
