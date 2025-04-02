'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface CloudinaryImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
}

export default function CloudinaryImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
}: CloudinaryImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  // Transforme le chemin local en URL Cloudinary avec optimisations
  const cloudinarySrc = src.startsWith('/')
    ? `https://res.cloudinary.com/uclic/image/upload/f_auto,q_auto${src}`
    : src;

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse" />
      )}
      
      <img
        src={cloudinarySrc}
        alt={alt}
        width={width}
        height={height}
        className={cn(
          "w-full h-full object-cover transition-opacity duration-300 ease-in-out",
          isLoading ? "opacity-0" : "opacity-100"
        )}
        onLoad={() => setIsLoading(false)}
        loading={priority ? "eager" : "lazy"}
      />
    </div>
  );
} 