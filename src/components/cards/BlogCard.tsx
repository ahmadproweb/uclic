'use client';

import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { BlogPost } from "@/types/blog";
import { slugify } from '@/utils/string';
import OptimizedImage from '@/components/ui/OptimizedImage';

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === 'dark';

  return (
    <Link 
      href={`/blog/${post.slug}`}
      className="group block rounded-xl overflow-hidden transition-all duration-300 hover:transform hover:scale-[1.02]"
    >
      {/* Image */}
      <div className="relative aspect-[16/9] overflow-hidden">
        <OptimizedImage
          src={post.featured_image_url}
          alt={post.title}
          width={600}
          height={338}
          className="w-full h-full"
          objectFit="cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Category badge */}
        {post.category && (
          <Link 
            href={`/blog/category/${slugify(post.category)}`}
            className={cn(
              "absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium",
              "transition-all duration-200 hover:transform hover:scale-105",
              "bg-[#D9FF4B] text-black hover:bg-[#E2FF47]"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {post.category}
          </Link>
        )}
      </div>

      {/* Content */}
      <div className={cn(
        "p-6",
        isDark ? "bg-white/5" : "bg-black/5"
      )}>
        <h3 className={cn(
          "text-xl font-semibold mb-3 line-clamp-2 group-hover:underline",
          isDark ? "text-white" : "text-black"
        )}>
          {post.title}
        </h3>
        
        <p className={cn(
          "text-sm mb-4 line-clamp-2",
          isDark ? "text-white/70" : "text-black/70"
        )}>
          {post.excerpt}
        </p>

        <div className={cn(
          "flex items-center text-xs space-x-4",
          isDark ? "text-white/60" : "text-black/60"
        )}>
          <span>{post.author}</span>
          <span>•</span>
          <span>{post.reading_time} min de lecture</span>
          <span>•</span>
          <span>{new Date(post.date).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
          })}</span>
        </div>
      </div>
    </Link>
  );
} 