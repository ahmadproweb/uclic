'use client';

import { useEffect, useRef } from 'react';

interface ImageOptimizerProps {
  enableLazyLoading?: boolean;
  enableWebP?: boolean;
  enableAVIF?: boolean;
  enableBlurPlaceholder?: boolean;
  intersectionThreshold?: number;
  rootMargin?: string;
}

export default function ImageOptimizer({
  enableLazyLoading = true,
  enableWebP = true,
  enableAVIF = true,
  enableBlurPlaceholder = true,
  intersectionThreshold = 0.1,
  rootMargin = '50px'
}: ImageOptimizerProps) {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!enableLazyLoading || !('IntersectionObserver' in window)) return;

    // Créer l'observateur d'intersection
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            loadOptimizedImage(img);
            observerRef.current?.unobserve(img);
          }
        });
      },
      {
        threshold: intersectionThreshold,
        rootMargin
      }
    );

    // Observer toutes les images avec data-src
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => observerRef.current?.observe(img));

    // Observer les images avec loading="lazy"
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    lazyImages.forEach(img => observerRef.current?.observe(img));

    return () => {
      observerRef.current?.disconnect();
    };
  }, [enableLazyLoading, intersectionThreshold, rootMargin]);

  const loadOptimizedImage = (img: HTMLImageElement) => {
    const dataSrc = img.getAttribute('data-src');
    if (!dataSrc) return;

    // Créer un placeholder blur si activé
    if (enableBlurPlaceholder) {
      createBlurPlaceholder(img);
    }

    // Charger l'image optimisée
    const optimizedSrc = getOptimizedImageSrc(dataSrc);
    
    img.onload = () => {
      img.style.opacity = '1';
      img.style.transition = 'opacity 0.3s ease-in-out';
    };

    img.onerror = () => {
      // Fallback vers l'image originale
      img.src = dataSrc;
    };

    img.src = optimizedSrc;
    img.removeAttribute('data-src');
  };

  const getOptimizedImageSrc = (originalSrc: string): string => {
    // Si c'est une image Next.js optimisée, laisser Next.js gérer
    if (originalSrc.includes('/_next/image')) {
      return originalSrc;
    }

    // Pour les images externes, ajouter des paramètres d'optimisation
    if (originalSrc.startsWith('http')) {
      const url = new URL(originalSrc);
      
      // Ajouter des paramètres d'optimisation selon le domaine
      if (url.hostname.includes('imgix.net')) {
        url.searchParams.set('auto', 'format,compress');
        url.searchParams.set('q', '85');
        if (enableWebP) url.searchParams.set('fm', 'webp');
        if (enableAVIF) url.searchParams.set('fm', 'avif');
      }
      
      return url.toString();
    }

    return originalSrc;
  };

  const createBlurPlaceholder = (img: HTMLImageElement) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;

    // Créer un placeholder simple
    canvas.width = 20;
    canvas.height = 20;
    
    const gradient = ctx.createLinearGradient(0, 0, 20, 20);
    gradient.addColorStop(0, '#f3f4f6');
    gradient.addColorStop(1, '#e5e7eb');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 20, 20);
    
    const dataURL = canvas.toDataURL();
    
    // Appliquer le placeholder
    img.style.backgroundImage = `url(${dataURL})`;
    img.style.backgroundSize = 'cover';
    img.style.backgroundPosition = 'center';
    img.style.opacity = '0.5';
  };

  return null;
}

// Hook pour optimiser les images dynamiquement
export function useImageOptimization() {
  const optimizeImage = (src: string, options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'webp' | 'avif' | 'jpeg' | 'png';
  } = {}) => {
    const { width, height, quality = 85, format = 'webp' } = options;
    
    // Si c'est une image Next.js, utiliser l'API Next.js
    if (src.startsWith('/') && !src.startsWith('//')) {
      const params = new URLSearchParams();
      if (width) params.set('w', width.toString());
      if (height) params.set('h', height.toString());
      if (quality) params.set('q', quality.toString());
      
      return `/_next/image?url=${encodeURIComponent(src)}&${params.toString()}`;
    }
    
    // Pour les images externes, utiliser des services d'optimisation
    if (src.startsWith('http')) {
      const url = new URL(src);
      
      if (url.hostname.includes('imgix.net')) {
        url.searchParams.set('auto', 'format,compress');
        url.searchParams.set('q', quality.toString());
        url.searchParams.set('fm', format);
        if (width) url.searchParams.set('w', width.toString());
        if (height) url.searchParams.set('h', height.toString());
      }
      
      return url.toString();
    }
    
    return src;
  };

  return { optimizeImage };
}
