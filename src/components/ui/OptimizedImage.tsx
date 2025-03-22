'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import CloudinaryImage from './CloudinaryImage';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  width?: number;
  height?: number;
}

export default function OptimizedImage({
  src,
  alt,
  className = '',
  priority = false,
  width = 800,
  height = 600,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const isWordPressImage = src.includes('uclic.fr/wp-content');

  if (!isWordPressImage) {
    return (
      <CloudinaryImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        priority={priority}
      />
    );
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Effet de flou pendant le chargement */}
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse" />
      )}
      
      <img
        src={src}
        alt={alt}
        className={cn(
          "w-full h-full object-cover transition-opacity duration-300 ease-in-out",
          isLoading ? "opacity-0" : "opacity-100"
        )}
        onLoad={() => setIsLoading(false)}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
      />
    </div>
  );
} 